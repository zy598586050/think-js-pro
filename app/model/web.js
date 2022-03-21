/*
 * @Author: zhangyu
 * @Date: 2021-04-15 21:18:51
 * @LastEditTime: 2021-04-29 12:14:40
 */
const Model = require('think-js-lib').Model
const wxConfig = require('@config/wx.js')

class WebModel extends Model{

    // 获取ACCESS_TOKEN
    async getAccessToken(){
        // 判断缓存里是否有ACCESS_TOKEN
        const ACCESS_TOKEN = await this.RDb().get('THINKJS_ACCESS_TOKEN')
        if(ACCESS_TOKEN){
            return ACCESS_TOKEN
        }else{
            const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${wxConfig.wechat.appid}&secret=${wxConfig.wechat.secret}`
            const result = await this.Fetch({url})
            this.RDb().set('THINKJS_ACCESS_TOKEN',result.access_token,7200)
            return result.access_token
        }
    }

    // 获取JSAPI_TICKET
    async getJsapiTicket(){
        // 判断缓存里是否有JSAPI_TICKET
        const JSAPI_TICKET = await this.RDb().get('THINKJS_JSAPI_TICKET')
        const ACCESS_TOKEN = await this.getAccessToken()
        if(JSAPI_TICKET){
            return JSAPI_TICKET
        }else{
            const url = `https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${ACCESS_TOKEN}&type=jsapi`
            const result = await this.Fetch({url})
            this.RDb().set('THINKJS_JSAPI_TICKET',result.ticket,7200)
            return result.ticket
        }
    }

    // 获取js-sdk注入的配置信息
    async getJsSdkConfig(url){
        let obj = {
            jsapi_ticket: await this.getJsapiTicket(),
            nonceStr: this.Utils.getNonceStr(32),
            timestamp: String(Math.floor(Date.now()/1000)),
            url
        }
        let str = this.Utils.raw(obj)
        obj.signature = this.Utils.sha1(str)
        obj.appId = wxConfig.wechat.appid
        obj.jsApiList = ['chooseWXPay']
        obj.debug = false
        delete obj.url
        return obj
    }

    // 获取支付台所需参数
    async getWxPayConfig(code){
        // 获取openid
        let url = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${wxConfig.wechat.appid}&secret=${wxConfig.wechat.secret}&code=${code}&grant_type=authorization_code`
        let result = await this.Fetch({url})
        let prepay_id = await this.getPrepayId(result.openid)
        let obj = {
            appId: wxConfig.wechat.appid,
            timeStamp: String(Math.floor(Date.now()/1000)),
            nonceStr: this.Utils.getNonceStr(32),
            package: `prepay_id=${prepay_id}`,
            signType: 'RSA'
        }
        let str = `${obj.appId}\n${obj.timeStamp}\n${obj.nonceStr}\n${obj.package}\n`
        obj.paySign = this.Utils.rsaSign(str,wxConfig.wechat.private_key)
        return obj
    }

    // 微信内支付获取prepay_id
    async getPrepayId(openid){
        let result = await this.WxPay().jsapi({
            description: 'ThinkJS实战', // 商品描述
            out_trade_no: this.Utils.orderCode(), // 商户订单号
            amount: {
                total: 100, // 总金额
                currency: 'CNY' // 人民币
            },
            payer: {
                openid
            }
        })
        if(result.status == 200){
            return JSON.parse(result.data).prepay_id
        }else{
            return null
        }
    }

    // 微信外支付获取跳转链接
    async getPayUrl(ctx){
        let result = await this.WxPay().h5({
            description: 'ThinkJS实战', // 商品描述
            out_trade_no: this.Utils.orderCode(), // 商户订单号
            amount: {
                total: 100, // 总金额
                currency: 'CNY' // 人民币
            },
            scene_info: {
                payer_client_ip: this.Utils.getIP(ctx), // 用户终端IP
                h5_info: {
                    type: 'Wap' // 场景类型
                }
            }
        })
        if(result.status == 200){
            return JSON.parse(result.data)
        }else{
            return null
        }
    }
}

module.exports = WebModel
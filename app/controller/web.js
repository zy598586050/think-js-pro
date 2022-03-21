/*
 * @Author: zhangyu
 * @Date: 2021-04-15 21:18:51
 * @LastEditTime: 2021-04-29 12:14:40
 */
const Controller = require('think-js-lib').Controller
const fs = require('fs')

class WebController extends Controller{

    // 获取js-sdk注入的配置信息
    async getJsSdkConfig(ctx){
        const params = this.getParams(ctx)
        let obj = await this.M('web').getJsSdkConfig(params.url)
        return this.showSuccess(obj)
    }

    // 微信内支付
    async goWxPay(ctx){
        const params = this.getParams(ctx)
        const config = await this.M('web').getWxPayConfig(params.code)
        return this.showSuccess(config)
    }

    // 微信外H5支付
    async goH5Pay(ctx){
        const url = await this.M('web').getPayUrl(ctx)
        return this.showSuccess(url)
    }

    // 支付宝支付
    async goAliPay(){
        const formData = this.Utils.AlipayFormData()
        formData.setMethod('get')
        formData.addField('notifyUrl', 'http://www.com/notify') // 当支付完成后，支付宝主动向我们的服务器发送回调的地址
        formData.addField('returnUrl', 'http://www.com/return') // 当支付完成后，当前页面跳转的地址
        formData.addField('bizContent',{
            productCode: 'QUICK_WAP_WAY',
            subject: 'ThinkJS实战', // 订单名称
            totalAmount: 1, // 支付金额
            outTradeNo: this.Utils.orderCode(), // 订单号
        })
        const result = await this.AliPay().exec('alipay.trade.wap.pay',{},{formData})
        return this.showSuccess(result)
    }

    // 下发短信验证码
    async sendSms(){
        let result = await this.SMS().sendSMS({
            PhoneNumbers: 17610086895, // 要发送的手机号
            SignName: '馋么', // 认证签名
            TemplateCode: 'SMS_193870822', // 模板ID
            TemplateParam: JSON.stringify({
                code: this.Utils.getValidateCode()
            })
        })
        if(result.Code == 'OK'){
            return this.showSuccess()
        }else{
            return this.ApiException('发送失败')
        }
    }

    // 上传图片到OSS
    async putStream(ctx){
        // 读取图片成流
        const reader = fs.createReadStream(ctx.request.files.file.path)
        let result = this.OSS().putStream('1.png',reader)
        return this.showSuccess(result)
    }
}

module.exports = WebController
import request from "../utils/request";

export default {
    // 获取jssdk配置
    jssdk(params){
        return request({
            url: '/jssdk',
            method: 'post',
            data: params,
        })
    },
    // 微信内支付
    wxpay(params){
        return request({
            url: '/wxpay',
            method: 'post',
            data: params,
        })
    },
    // 微信外H5支付
    h5pay(){
        return request({
            url: '/h5pay',
            method: 'post',
            data: {}
        })
    },
    // 支付宝支付
    alipay(){
        return request({
            url: '/alipay',
            method: 'post',
            data: {}
        })
    },
    // 短信下发
    sendSms(){
        return request({
            url: '/sendsms',
            method: 'post',
            data: {}
        })
    }
}
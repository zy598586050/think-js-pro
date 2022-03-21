/*
 * @Author: zhangyu
 * @Date: 2021-04-15 22:02:16
 * @LastEditTime: 2021-04-29 11:00:31
 */

const checkLogin = require('@/middleware/checkLogin.js')

module.exports = (route) => {
    // 路由配置演示
    route.group('/api/v1',(router) => {
        // 获取js-sdk所需参数
        router.post('/jssdk','hello/getJsSdkConfig')
        // 微信内支付
        router.post('/wxpay','hello/goWxPay')
        // 微信外H5支付
        router.post('/h5pay','hello/goH5Pay')
        // 下发短信验证码
        router.post('/sendsms','hello/sendSms')
        // 上传到oss
        router.post('/upload','hello/putStream')
        // 登录
        router.post('/login','user/login')
    })

    // hello接口
    route.get('/hello','web/sayHello')

    route.group('/api/v1',(router) => {
        // 刷新用户菜单和权限
        router.post('/get_menu_auth','user/getMenuAuth')
        // 退出登录
        router.post('/logout','user/logout')
        // 部门列表
    },checkLogin)
}
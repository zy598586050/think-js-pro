/*
 * @Author: zhangyu
 * @Date: 2021-04-15 21:18:51
 * @LastEditTime: 2021-04-29 12:14:40
 */

// 路由中间件,登录登录校验
const checkLogin = async (ctx,next,error) => {
    const token = ctx.header?.authorization?.split('Bearer ')[1] || ''
    const userInfo = ctx.validateToken(token)
    if(userInfo){
        next()
    }else{
        error('非法请求,或Token过期')
    }
}

module.exports = checkLogin
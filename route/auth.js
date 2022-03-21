/*
 * @Author: zhangyu
 * @Date: 2021-04-15 22:02:16
 * @LastEditTime: 2021-04-29 11:00:31
 */

const checkLogin = require('@/middleware/checkLogin.js')

module.exports = (route) => {
    // 分组路由，这组路由需要TOKEN校验
    route.group('/api/v1',(router) => {
        // 权限列表
        router.post('/auth_list','auth/auth_list')
        // 新增/编辑权限
        router.post('/auth_create_or_edit','auth/auth_create_or_edit')
        // 删除权限
        router.post('/auth_delete','auth/auth_delete')
    },checkLogin)
}
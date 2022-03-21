/*
 * @Author: zhangyu
 * @Date: 2021-04-15 22:02:16
 * @LastEditTime: 2021-04-29 11:00:31
 */

const checkLogin = require('@/middleware/checkLogin.js')

module.exports = (route) => {
    route.group('/api/v1',(router) => {
        // 角色列表
        router.post('/role_list','role/role_list')
        // 新增/编辑角色
        router.post('/role_create_or_edit','role/role_create_or_edit')
        // 删除角色
        router.post('/role_delete','role/role_delete')
    },checkLogin)
}
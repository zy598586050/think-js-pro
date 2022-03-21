/*
 * @Author: zhangyu
 * @Date: 2021-04-15 22:02:16
 * @LastEditTime: 2021-04-29 11:00:31
 */

const checkLogin = require('@/middleware/checkLogin.js')

module.exports = (route) => {
    route.group('/api/v1',(router) => {
        // 部门列表
        router.post('/mech_list','mech/mech_list')
        // 新增/编辑部门
        router.post('/mech_create_or_edit','mech/mech_create_or_edit')
        // 删除部门
        router.post('/mech_delete','mech/mech_delete')
    },checkLogin)
}
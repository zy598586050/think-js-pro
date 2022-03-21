/*
 * @Author: zhangyu
 * @Date: 2021-04-15 22:02:16
 * @LastEditTime: 2021-04-29 11:00:31
 */

const checkLogin = require('@/middleware/checkLogin.js')

module.exports = (route) => {
    route.group('/api/v1',(router) => {
        // 根据部门查询用户
        router.post('/get_user_by_mech','user/getUserByMech')
        // 编辑或新增用户
        router.post('/user_create_or_edit','user/user_create_or_edit')
        // 删除用户
        router.post('/user_delete','user/user_delete')
    },checkLogin)
}
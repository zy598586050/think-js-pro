/*
 * @Author: zhangyu
 * @Date: 2021-04-21 20:42:27
 * @LastEditTime: 2021-04-29 12:39:22
 */

// 验证器
const userValidate = {
    rule: {
        account: 'require',
        password: 'require'
    },
    message: {
        account: '账号不能为空',
        password: '密码不能为空'
    },
    scene: {
        login: ['account','password']
    }
}

module.exports = userValidate
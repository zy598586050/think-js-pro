const Controller = require('think-js-lib').Controller

class UserController extends Controller {
    // 登录
    async login(ctx) {
        const params = this.getParams(ctx, true)
        const result = await this.Db('user')
            .where('account', params.account)
            .find()
        if (result) {
            // 查询用户信息
            const user = await this.Db('user').alias('A')
                .join('role B', 'A.role_id = B.id')
                .where('A.account', params.account)
                .where('A.password', this.Utils.MD5(params.password))
                .field('A.id,A.name,A.avatar,B.auth_ids')
                .find()
            if (user) {
                // 缓存登录信息,生成JWT TOKEN
                const token = this.getToken({
                    id: user.id,
                    name: user.name
                })
                // 查询用户角色下的权限
                const auth = await this.Db('auth')
                    .where('id', 'in', user.auth_ids)
                    .select()
                // 拆分成菜单权限和按钮权限
                const menuArray = auth.filter(v => [1, 2].includes(v.type))
                const authArray = auth.filter(v => v.type == 3)
                let menuTree = this.Utils.arrayToTree(menuArray)
                const deep = (array) => {
                    array.forEach((item, index) => {
                        let obj = {
                            type: item.type,
                            sort: item.sort,
                            icon: item.icon,
                            name: item.router_name,
                            path: item.router_url,
                            meta: {
                                title: item.name,
                                layout: Boolean(item.layout)
                            },
                            children: item.children,
                            component: item.component_url
                        }
                        array[index] = obj
                        if (item.children.length > 0) {
                            deep(item.children)
                        }
                    })
                }
                deep(menuTree)
                return this.showSuccess({
                    name: user.name,
                    avatar: user.avatar,
                    auth_array: authArray.map(v => v.auth_name),
                    menu_tree: menuTree,
                    token
                })
            } else {
                this.ApiException('密码不正确')
            }
        } else {
            this.ApiException('账号不存在')
        }
    }

    // 退出登录
    logout(ctx) {
        const token = ctx.header?.authorization?.split('Bearer ')[1] || ''
        // JWT不可清空
        this.showSuccess([], '退出登录成功')
    }

    // 获取用户菜单和权限
    async getMenuAuth(ctx) {
        const token = ctx.header?.authorization?.split('Bearer ')[1] || ''
        const userInfo = this.validateToken(token)
        const user = await this.Db('user').alias('A')
            .join('role B', 'A.role_id = B.id')
            .where('A.id', userInfo.id)
            .field('B.auth_ids')
            .find()
        if (user) {
            // 查询用户角色下的权限
            const auth = await this.Db('auth')
                .where('id', 'in', user.auth_ids)
                .select()
            // 拆分成菜单权限和按钮权限
            const menuArray = auth.filter(v => [1, 2].includes(v.type))
            const authArray = auth.filter(v => v.type == 3)
            let menuTree = this.Utils.arrayToTree(menuArray)
            const deep = (array) => {
                array.forEach((item, index) => {
                    let obj = {
                        type: item.type,
                        sort: item.sort,
                        icon: item.icon,
                        name: item.router_name,
                        path: item.router_url,
                        meta: {
                            title: item.name
                        },
                        children: item.children,
                        component: item.component_url
                    }
                    array[index] = obj
                    if (item.children.length > 0) {
                        deep(item.children)
                    }
                })
            }
            deep(menuTree)
            return this.showSuccess({
                auth_array: authArray.map(v => v.auth_name),
                menu_tree: menuTree
            })
        } else {
            this.ApiException('查询异常')
        }
    }

    // 根据部门查询用户
    async getUserByMech(ctx) {
        const params = this.getParams(ctx)
        const model = this.Db('user').alias('A')
            .join('mech B', 'A.mech_id = B.id')
            .field('A.id,A.name,A.account,B.name as mech_name,A.role_id')
            .where('A.mech_id', params.mech_id)
        if (params.name) {
            model.where('A.name', params.name)
        }
        if (params.account) {
            model.where('A.account', params.account)
        }
        const list = await model.page(params.current, params.size).select()
        const totalCount = await model.count()
        return this.showSuccess({
            list,
            totalCount
        })
    }

    // 新增或修改用户
    user_create_or_edit(ctx) {
        const params = this.getParams(ctx)
        if (params.id) {
            // 编辑
            this.Db('user').where('id', params.id).update({
                mech_id: params.mech_id.pop(),
                name: params.name,
                account: params.account,
                role_id: params.role_id
            }, true)
            return this.showSuccess([], '修改成功')
        } else {
            // 新增
            this.Db('user').insert({
                mech_id: params.mech_id?.length > 0 ? params.mech_id.pop() : params.mech_id,
                name: params.name,
                account: params.account,
                role_id: params.role_id,
                password: this.Utils.MD5('admin')
            }, true)
            return this.showSuccess([], '新增成功')
        }
    }

    // 删除用户
    user_delete(ctx) {
        const params = this.getParams(ctx)
        this.Db('user').where('id', params.id).delete()
        return this.showSuccess([], '删除成功')
    }
}

module.exports = UserController
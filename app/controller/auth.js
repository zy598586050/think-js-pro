const Controller = require('think-js-lib').Controller

class AuthController extends Controller{

    // 权限列表
    async auth_list(){
        const result = await this.Db('auth').select()
        return this.showSuccess(this.Utils.arrayToTree(result))
    }

    // 添加/编辑角色
    auth_create_or_edit(ctx){
        const params = this.getParams(ctx)
        if(params.id){
            // 编辑
            this.Db('auth').where('id',params.id).update({
                type: params.type,
                pid: params.pid.pop(),
                name: params.name,
                icon: params.icon,
                auth_name: params.auth_name,
                router_name: params.router_name,
                router_url: params.router_url,
                component_url: params.component_url,
                sort: params.sort
            },true)
            return this.showSuccess([],'修改成功')
        }else{
            // 新增
            this.Db('auth').insert({
                type: params.type,
                pid: params.pid.pop(),
                name: params.name,
                icon: params.icon,
                auth_name: params.auth_name,
                router_name: params.router_name,
                router_url: params.router_url,
                component_url: params.component_url,
                sort: params.sort
            },true)
            return this.showSuccess([],'新增成功')
        }
    }

    // 删除部门
    auth_delete(ctx){
        const params = this.getParams(ctx)
        this.Db('auth').where('id',params.id).delete()
        return this.showSuccess([],'删除成功')
    }
    
}

module.exports = AuthController
const Controller = require('think-js-lib').Controller

class RoleController extends Controller{
    // 角色列表
    async role_list(ctx){
        const params = this.getParams(ctx)
        const model = this.Db('role')
        if(params.name){
            model.where('name','like',`%${params.name}%`)
        }
        const result = await model.select()
        return this.showSuccess(result)
    }

    // 添加/编辑角色
    role_create_or_edit(ctx){
        const params = this.getParams(ctx)
        if(params.id){
            // 编辑
            this.Db('role').where('id',params.id).update({
                name: params.name,
                remarks: params.remarks,
                auth_ids: params.auth_ids
            },true)
            return this.showSuccess([],'修改成功')
        }else{
            // 新增
            this.Db('role').insert({
                name: params.name,
                remarks: params.remarks,
                auth_ids: params.auth_ids
            },true)
            return this.showSuccess([],'新增成功')
        }
    }

    // 删除部门
    role_delete(ctx){
        const params = this.getParams(ctx)
        this.Db('role').where('id',params.id).delete()
        return this.showSuccess([],'删除成功')
    }
}

module.exports = RoleController
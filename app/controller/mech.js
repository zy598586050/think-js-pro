const Controller = require('think-js-lib').Controller

class MechController extends Controller{
    // 部门列表
    async mech_list(ctx){
        const params = this.getParams(ctx)
        const model = this.Db('mech')
        if(params.mechName){
            model.where('name','like',`%${params.mechName}%`)
        }
        if(params.mechCode){
            model.where('code','like',`%${params.mechCode}%`)
        }
        if(params.mechPhone){
            model.where('phone','like',`%${params.mechPhone}%`)
        }
        const result = await model.select()
        return this.showSuccess(result)
    }

    // 添加/编辑部门
    mech_create_or_edit(ctx){
        const params = this.getParams(ctx)
        if(params.id){
            // 编辑
            this.Db('mech').where('id',params.id).update({
                pid: params.pid.pop(),
                code: params.code,
                name: params.name,
                phone: params.phone
            },true)
            return this.showSuccess([],'修改成功')
        }else{
            // 新增
            this.Db('mech').insert({
                pid: params.pid.pop(),
                code: params.code,
                name: params.name,
                phone: params.phone
            },true)
            return this.showSuccess([],'新增成功')
        }
    }

    // 删除部门
    mech_delete(ctx){
        const params = this.getParams(ctx)
        this.Db('mech').where('id',params.id).delete()
        return this.showSuccess([],'删除成功')
    }
}

module.exports = MechController
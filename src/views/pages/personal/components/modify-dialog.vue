<template>
    <el-dialog
  title="修改订单"
  :visible.sync="dialogVisible"
  >
  <span>这是一段信息</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="controlDialog(false)">取 消</el-button>
    <el-button type="primary" @click="comfirmForm">确 定</el-button>
  </span>
</el-dialog>
</template>
<script>
export default {
    name:'modifyDialog',
    data()
    {
        return {
            dialogVisible:false,
            formData:{}
        }
    },
    methods:{
        controlDialog(obj)
        {
            this.dialogVisible = obj.flag
            this.formData = obj.data
        },
        comfirmForm()
        {
            this.$message({
                message:'修改成功',
                type:'success'
            })
            this.dialogVisible = false

        }
    }
}
</script>
<style lang="scss" scoped>

</style>




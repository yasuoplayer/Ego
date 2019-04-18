<template>
    <el-dialog
  title="给商品评个分吧"
  :visible.sync="dialogVisible"
  >
  <el-form ref="form" :model="formData" label-position="left" label-width="80px">
              <el-form-item label="留言">
    <el-input
  type="textarea"
  placeholder="请输入评论"
  v-model="formData.comment">
</el-input>
  </el-form-item>
        <el-form-item label="分数">
    <el-rate v-model="formData.rate" class="rate"></el-rate>
  </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="cancel">取 消</el-button>
    <el-button type="primary" @click="comfirmForm" :disabled='formData.rate<0'>确 定</el-button>
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
            formData:{
                comment:'',
                rate:''
            }
        }
    },
    methods:{
        controlDialog(obj)
        {
            this.dialogVisible = obj.flag
            this.formData = obj.data
        },
        cancel(){
            this.dialogVisible = false
            this.formData = {}
        },
        comfirmForm()
        {
            this.formData.arrive = true
            this.$message({
                message:'评论成功',
                type:'success'
            })
            this.dialogVisible = false

        }
    }
}
</script>
<style lang="scss" scoped>
.rate{
    height: 40px;
    line-height: 40px
}
</style>




<template>
    <el-dialog
  title="给商品评个分吧"
  :visible.sync="dialogVisible"
  v-loading='loading'
  >
  <el-form ref="form" :model="formData" label-position="left" label-width="80px">
              <el-form-item label="留言">
    <el-input
  type="textarea"
  placeholder="请输入评论"
  v-model="formData.comment"
    maxlength="30"
  show-word-limit>
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
            },
            loading:false
        }
    },
    methods:{
        controlDialog(obj)
        {
            this.dialogVisible = obj.flag
            this.formData = {...obj.data}
        },
        cancel(){
            this.dialogVisible = false
            this.formData = {}
        },
        comfirmForm()
        {
            if(!this.formData.comment||!this.formData.rate)
            {
                this.$message({
                    type:'warning',
                    message:'请填写完整信息'
                })
                return
            }
            this.formData.commentTime=new Date().getTime()
            this.formData.isArrive=true
            this.loading = true
            this.$axios({
                url:'/ego/record/signFor',
                method:'post',
                data:this.formData
            }).then(res=>{
                if(res.data.code)
                {
                    this.loading=false
                    this.$emit('update')
                    this.$message({
                        message:'评论成功',
                        type:'success'
                    })
                    this.dialogVisible = false
                }
            })


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




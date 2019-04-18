<template>
    <el-dialog
  title="修改订单"
  :visible.sync="dialogVisible"
  >
    <el-form label-position="left" label-width="70px" :model="formData">
        <el-form-item label="商品名称">
            <el-input v-model="formData.name" disabled></el-input>
        </el-form-item>        
      <el-form-item label="会员价">
        <div class="price">
          ￥
          <span class="price-number">{{formData.price*formData.number}}</span>.00
        </div>
      </el-form-item>
      <el-form-item label="颜色">
        <el-radio-group v-model="formData.color" size="small">
          <el-radio label="red" border>红</el-radio>
          <el-radio label="black" border>蓝</el-radio>
          <el-radio label="yellow" border>黄</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="内存">
        <el-radio-group v-model="formData.memory" size="small">
          <el-radio label="16g" border>16g</el-radio>
          <el-radio label="32g" border>32g</el-radio>
          <el-radio label="64g" border>64g</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="数量">
        <el-input-number v-model="formData.number" :min="1" :max="10" :step="1" :precision="0"></el-input-number>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
    <el-button @click="cancel">取 消</el-button>
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
                cancel(){
            this.dialogVisible = false
            this.formData = {}
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




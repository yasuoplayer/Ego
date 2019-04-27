<template>
  <div class="table-dialog">
    <el-dialog :title="title" append-to-body :visible.sync="dialogVisible">
      <el-form ref="form" :model="formData" label-width="80px">
        <el-form-item label="颜色">
          <el-input v-model="formData.color" clearable></el-input>
        </el-form-item>
        <el-form-item label="内存">
          <el-input-number v-model="formData.memory" :min="8" :max="64" :step="8" :precision="0"></el-input-number>
        </el-form-item>
        <el-form-item label="价格">
          <el-input-number v-model="formData.price" :min="1" :max="10000" :precision="0"></el-input-number>
        </el-form-item>
        <el-form-item label="数量">
          <el-input-number v-model="formData.number" :min="1" :max="1000" :precision="0"></el-input-number>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="comfirmForm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "tableDialog",
  data() {
    return {
      formData: {
        color: "",
        memory: "8",
        price: "",
        number: "1"
      },
      index:-1,
      dialogVisible: false,
      mode:'add',
      title:'新增参数'
    };
  },
  methods: {
    controlDialog(obj) {
      this.dialogVisible = obj.flag;
      this.formData = obj.data;
      this.mode = obj.mode
      this.index = obj.index
      if(obj.mode=='add')
      {
          this.title = '新增参数'
      }
      else{
          this.title = '修改参数'
      }
    },
    cancel() {
      this.resetFrom();
      this.dialogVisible = false;
    },
    comfirmForm() {
      this.$message({
        message: "操作成功",
        type: "success"
      });
      if(this.formData.number<10)
      {
        this.formData.state = 'warning'
      }
      else{
        delete this.formData.state
      }
      this.$emit('addRow',{
        data:this.formData,
        index:this.index
      })
      this.dialogVisible = false;
    },
    resetFrom()
    {
      this.formData = {
        color: "",
        memory: "8",
        price: "",
        number: "1"
      }
      this.index = -1
    }
  }
};
</script>
<style lang="scss" scoped>
</style>



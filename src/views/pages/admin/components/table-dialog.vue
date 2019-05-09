<template>
  <div class="table-dialog">
    <el-dialog :title="title" append-to-body :visible.sync="dialogVisible">
      <el-form ref="form" :model="formData" label-width="80px" :rules="rules">
        <el-form-item label="颜色" prop="color">
          <el-input v-model="formData.color" clearable></el-input>
        </el-form-item>
        <el-form-item label="内存" prop="memory">
          <el-input-number v-model="formData.memory" :min="16" :max="512" :precision="0"></el-input-number>
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input-number v-model="formData.price" :min="1" :max="100000" :precision="0"></el-input-number>
        </el-form-item>
        <el-form-item label="数量" prop="number">
          <el-input-number v-model="formData.number" :min="0" :max="1000" :precision="0"></el-input-number>
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
    var validateMemory = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入手机内存"));
      } else {
        for (let i = 3; i < 10; i++) {
          if (Math.pow(2, i) == value) {
            callback();
            return;
          }
        }
        callback(new Error("手机内存必须为2的正整数幂次方"));
      }
    };
    var checkNumber = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('商品数量不能为空'));
        }
        else if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            if (value<0||value>10000) {
              callback(new Error('数量必须在0-10000之间'));
            } else {
              callback();
            }
          }
      };
    var checkPrice = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('商品价格不能为空'));
        }
        else if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            if (value<0||value>100000) {
              callback(new Error('价格必须在0-100000之间'));
            } else {
              callback();
            }
          }
      };   
    return {
      formData: {
        color: "",
        memory: 8,
        price: 1,
        number: 1
      },
      index: -1,
      dialogVisible: false,
      mode: "add",
      title: "新增参数",
      rules: {
        color: [{ required: true, message: "请输入商品颜色", trigger: "blur" }],
        price: [{ required: true, validator: checkPrice, trigger: "blur" }],
        memory: [
          { required: true, validator: validateMemory, trigger: "blur" }
        ],
        number: [{ required: true,validator: checkNumber, trigger: "blur" }]
      }
    };
  },
  methods: {
    controlDialog(obj) {
      this.dialogVisible = obj.flag;
      this.formData = obj.data;
      this.mode = obj.mode;
      this.index = obj.index;
      if (obj.mode == "add") {
        this.title = "新增参数";
      } else {
        this.title = "修改参数";
      }
    },
    cancel() {
      this.resetFrom();
      this.$refs.form.resetFields();
      this.dialogVisible = false;
    },
    comfirmForm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.sendData();
        }
      });
    },
    sendData() {
      this.$message({
        message: "操作成功",
        type: "success"
      });
      if (this.formData.number < 10) {
        this.formData.state = "warning";
      } else {
        delete this.formData.state;
      }
      this.$emit("addRow", {
        data: this.formData,
        index: this.index
      });
      this.dialogVisible = false;
    },
    resetFrom() {
      this.formData = {
        color: "",
        memory: 8,
        price: 1,
        number: 1
      };
      this.index = -1;
    }
  }
};
</script>
<style lang="scss" scoped>
</style>



<template>
  <el-dialog
    title="编辑商品"
    :visible.sync="dialogVisible"
    width="70%"
    @close="reset"
    v-loading="loading"
  >
    <el-form ref="form" :model="formData" label-width="80px" :rules="rules">
      <el-form-item label="商品名称" prop="name">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="商品类型" prop="isPhone">
        <el-switch
          v-model="formData.isPhone"
          active-color="#13ce66"
          inactive-color="#ff4949"
          :disabled="disable"
          active-text="手机"
          @change="isPhoneChange"
          inactive-text="配件"
        ></el-switch>
      </el-form-item>
      <el-form-item label="商品品牌" class="selection" prop="brand">
        <el-select v-model="formData.brand" placeholder="请选择">
          <el-option
            v-for="(item,index) in options"
            :key="index"
            :label="item.label"
            :value='item.value'
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品标签" prop="type">
        <el-radio-group v-model="formData.type" size="medium">
          <el-radio-button
            v-for="(item,index) in options1"
            :key="index"
            :label="item"
          ></el-radio-button>
        </el-radio-group>
      </el-form-item>
            <el-form-item label="商品价格" prop="price" v-show="!formData.isPhone">
        <el-input v-model.number="formData.price"></el-input>
      </el-form-item> 
      <el-form-item label="商品数量" prop="number" v-show="!formData.isPhone">
        <el-input-number v-model="formData.number" :precision="0" :min="0"  :max="10000"></el-input-number>
      </el-form-item>
              
      <el-form-item label="商品图片" required>
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :auto-upload="false"
          :on-change="handleAvatarChange"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="商品配置" v-if="formData.isPhone" required>
        <el-table :data="tableData" border stripe :row-class-name="tableRowClassName">
          <el-table-column prop="color" label="颜色" width="180"></el-table-column>
          <el-table-column prop="memory" label="内存" width="180"></el-table-column>
          <el-table-column prop="price" label="价格"></el-table-column>
          <el-table-column prop="number" label="数量"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <div class="row-ctrl">
                <el-button size="mini" @click="handleEdit(scope.row,scope.$index)">编辑</el-button>
                <el-button size="mini" type="danger" @click="handleDelete(scope.index)">删除</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
    </el-form>
    <tableDialog ref="tableDialog" @addRow="addTable"/>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button @click="addConfig" v-if="formData.isPhone">新增配置</el-button>
      <el-button type="primary" @click="comfirmForm">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import tableDialog from "./table-dialog";
export default {
  name: "modifyDialog",
  data() {
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
      dialogVisible: false,
      loading: false,
      disable: false,
      formData: {
        name: "",
        brand: "",
        img: "",
        isPhone: false,
        index:'',
        type:'',
        number:0,
        price:0
      },
      rules: {
        name: [{ required: true, message: "请输入商品名称", trigger: "blur" }],
        brand: [{ required: true, message: "请选择商品品牌", trigger: "blur" }],
        type: [{ required: true, message: "请选择商品类型", trigger: "blur" }],
        number: [{ validator: checkNumber, trigger: "blur",required: true }],
        price: [{ validator: checkPrice, trigger: "blur",required: true }]
      },
            rules1: {
        name: [{ required: true, message: "请输入商品名称", trigger: "blur" }],
        brand: [{ required: true, message: "请选择商品品牌", trigger: "blur" }],
        type: [{ required: true, message: "请选择商品类型", trigger: "blur" }],
        number: [{ validator: checkNumber, trigger: "blur",required: true }],
        price: [{ validator: checkPrice, trigger: "blur",required: true }]
      },
            rules2: {
        name: [{ required: true, message: "请输入商品名称", trigger: "blur" }],
        brand: [{ required: true, message: "请选择商品品牌", trigger: "blur" }],
        type: [{ required: true, message: "请选择商品类型", trigger: "blur" }],
        
      },      
      changeImg: false,
      imageUrl: "",
      tableData: [],
      options: [
        {
          lable: "华为",
          value: "华为"
        },
        {
          lable: "小米",
          value: "小米"
        },
        {
          lable: "苹果",
          value: "苹果"
        },
        {
          lable: "荣耀",
          value: "荣耀"
        },
        {
          lable: "vivo",
          value: "vivo"
        },
        {
          lable: "oppo",
          value: "oppo"
        },
        {
          lable: "其他",
          value: "其他"
        }
      ],
      options1: [
        '手机壳膜',
        '充电线材',
        '手机支架',
        '耳机音响',
        '智能穿戴',
        '新奇特'
      ]
    };
  },
  watch:{
    'formData.isPhone'(val){
      if(val)
      {
        this.rules = this.rules2
      }
      else{
        this.rules = this.rules1
      }
    }
  },
  components: {
    tableDialog
  },
  mounted() {},
  methods: {
    isPhoneChange(flag) {
      if(flag)
      {
        this.options1 = ['游戏手机','拍照手机','女性手机','老人手机','全面屏']
      }
      else{
        this.options1 = [
        '手机壳膜',
        '充电线材',
        '手机支架',
        '耳机音响',
        '智能穿戴',
        '新奇特'
      ]
      }
    },
    reset() {
      this.formData = {
        isPhone: false
      };
      this.tableData = [];
      this.imageUrl = "";
      this.disable = false;
      
    },
    handleDelete(i) {
      this.tableData.splice(i, 1);
    },
    emitUpdate() {
      this.$emit("update");
    },
    handleEdit(data, index) {
      this.$refs.tableDialog.controlDialog({
        flag: true,
        data: { ...data },
        mode: "modify",
        index: index
      });
    },
    controlDialog(obj) {
      this.dialogVisible = obj.flag;
      this.formData = { ...obj.data };
      if (this.formData._id) {
        this.imageUrl = "http://localhost:3000/" + this.formData.img;
        if(this.formData.config)
        {
this.tableData = this.handleData([...this.formData.config]);
        }
        
      }
      if (this.formData.config) {
        this.formData.isPhone = true
        this.disable = true;
      }
      if(this.formData.number)
      {
        this.disable = true;
      }
      if(this.formData.config)
      {
        this.options1 = ['游戏手机','拍照手机','女性手机','老人手机','全面屏']
      }
      else{
        this.options1 = [
        '手机壳膜',
        '充电线材',
        '手机支架',
        '耳机音响',
        '智能穿戴',
        '新奇特'
      ]        
      }
    },
    handleData(data) {
      for (var n = 0; n < data.length; n++) {
        if (data[n].number < 10) {
          data[n].state = "warning";
          break;
        }
      }
      return data;
    },
    tableRowClassName({ row }) {
      if (row.state == "warning") {
        return "warning-row";
      } else {
        return "";
      }
    },
    cancel() {
      this.reset();
      this.$refs.form.resetFields();
      this.dialogVisible = false;
    },
    comfirmForm() {
      this.$refs.form.validate((valid,obj) => {
        if (valid) {
          if (this.formData.img || this.imageUrl) {
            this.setData();
          }
        } else {
          this.$message({
            message: "请填写完整信息",
            type: "error"
          });
          return false;
        }
      });
    },
    setData() {
      let formData = new FormData();
      if (this.formData._id) {
        formData.append("_id", this.formData._id);
      } else {
        formData.append("salesVolume", 0);
        formData.append("average", 0);
      }
      if (this.changeImg) {
        formData.append("img", this.formData.img);
      }
      formData.append("name", this.formData.name);
      formData.append("brand", this.formData.brand);

      for (var n = 0; n < this.tableData.length; n++) {
        if (this.tableData[n].state) {
          delete this.tableData[n].state;
        }
      }
      formData.append("type", this.formData.type);
      var url = "/ego/parts/add";
      if (this.formData.isPhone) {
        if(this.tableData.length==0)
        {
          this.$message({
            type:'warning',
            message:'请填写手机配置'
          })
          return 
        }
        formData.append("config", JSON.stringify(this.tableData));
        url = "/ego/good/add";
      }
      else{
        formData.append("number", this.formData.number);
        formData.append("price", this.formData.price);
      }
      this.loading = true;
      this.$axios({
        url,
        method: "post",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" }
      }).then(res => {
        if (res.data.code) {
          this.loading = false;
          this.$emit("update");
          this.$message({
            message: "操作成功",
            type: "success"
          });
          this.reset();
          this.dialogVisible = false;
        }
      });
    },
    addConfig() {
      this.$refs.tableDialog.controlDialog({
        flag: true,
        data: {},
        mode: "add"
      });
    },
    addTable(obj) {
      if (obj.index > -1) {
        this.tableData.splice(obj.index, 1, obj.data);
      } else {
        this.tableData.push({
          ...obj.data
        });
      }
    },
    handleAvatarChange(file) {
      this.changeImg = true;
      var _this = this;
      var fr = new FileReader();
      fr.readAsDataURL(file.raw);
      fr.onload = function() {
        _this.imageUrl = this.result;
      };
      this.formData.img = file.raw;
    }
  }
};
</script>
<style lang="scss" scoped>
.row-ctrl {
  text-align: center;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.selection {
  width: 100%;
}
</style>




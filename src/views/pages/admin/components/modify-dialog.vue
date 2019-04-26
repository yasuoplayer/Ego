<template>
  <el-dialog title="编辑商品" :visible.sync="dialogVisible" width="70%" @close="reset">
    <el-form ref="form" :model="formData" label-width="80px">
      <el-form-item label="商品名称">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="商品品牌" class="selection">
        <el-select v-model="formData.brand" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品图片">
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
      <el-form-item label="商品配置">
        <el-table :data="tableData" border stripe style="width: 100%">
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
      <el-button @click="addConfig">新增配置</el-button>
      <el-button type="primary" @click="comfirmForm">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import tableDialog from "./table-dialog";
export default {
  name: "modifyDialog",
  data() {
    return {
      dialogVisible: false,
      formData: {
        name: "",
        
        brand: "",
        img: ""
      },
      changeImg:false,
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
          lable: "其他",
          value: "其他"
        }
      ]
    };
  },
  components: {
    tableDialog
  },
  mounted() {
  },
  methods: {
    reset() {
      this.formData = {};
      this.tableData = [];
      this.imageUrl = ''
    },
    handleDelete(i) {
      this.tableData.splice(i, 1);
    },
    emitUpdate() {
      this.$emit("update");
    },
    handleEdit(data,index) {
      this.$refs.tableDialog.controlDialog({
        flag: true,
        data:{...data},
        mode: "modify",
        index:index
      });
    },
    controlDialog(obj) {
      this.dialogVisible = obj.flag;
      this.formData = { ...obj.data };
      if (this.formData._id) {
        this.imageUrl = "http://localhost:3000/" + this.formData.img;
        this.tableData = [...this.formData.config]
      }
    },
    cancel() {
      this.reset();
      this.dialogVisible = false;
    },
    comfirmForm() {
      let formData = new FormData();
      if (this.formData._id) {
        formData.append("_id", this.formData._id);
      } else {
        
        formData.append("salesVolume", 0);
        formData.append("average", 0);
      }
      if(this.changeImg)
      {
        formData.append("img", this.formData.img);
      }
      formData.append("name", this.formData.name);
      formData.append("brand", this.formData.brand);

      // var arr = []
      // for(var n=this.tableData.length-1;n>-1;n--)
      // {
      //   var color  = this.tableData[n].color
      //   if(arr.indexOf(color)>-1)
      //   {
      //       this.tableData.splice(n,1)
      //   }
      //   else{
      //     arr.push(color)
      //   }
      // }


      formData.append("config", JSON.stringify(this.tableData));
      this.$axios({
        url: "/ego/good/add",
        method: "post",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" }
      }).then(res => {
        if (res.data.code) {
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
      if(obj.index>-1)
      {
        this.tableData.splice(obj.index,1,obj.data)
      }
      else{
      this.tableData.push({
        ...obj.data
      })
      }

    },
    handleAvatarChange(file, fileList) {
      this.changeImg = true
      var _this = this
      var fr = new FileReader()
      fr.readAsDataURL(file.raw); 
      fr.onload = function()
      {
        _this.imageUrl = this.result
      }
      this.formData.img = file.raw
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




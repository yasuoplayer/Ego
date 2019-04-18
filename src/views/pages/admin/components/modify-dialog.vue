<template>
    <el-dialog
  title="编辑商品"
  :visible.sync="dialogVisible"
  width="70%"
  >
  <el-form ref="form" :model="formData" label-width="80px">
  <el-form-item label="商品名称">
    <el-input v-model="formData.name"></el-input>
  </el-form-item>
    <el-form-item label="商品品牌">
    <el-input v-model="formData.brand"></el-input>
  </el-form-item>
      <el-form-item label="商品图片">
 <el-upload
  class="avatar-uploader"
  action="https://jsonplaceholder.typicode.com/posts/"
  :show-file-list="false"
  :auto-upload="false"
  :on-change="handleAvatarChange"
  >
  <img v-if="formData.imageUrl" :src="formData.imageUrl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>         
  </el-form-item>
  <el-form-item label="商品配置">
          <el-table
      :data="tableData"
       border
       stripe
      style="width: 100%">
      <el-table-column
        prop="color"
        label="颜色"
        width="180">
      </el-table-column>
      <el-table-column
        prop="memory"
        label="内存"
        width="180">
      </el-table-column>
      <el-table-column
        prop="price"
        label="价格">
      </el-table-column>
            <el-table-column
        prop="number"
        label="数量">
      </el-table-column>
          <el-table-column label="操作">
      <template slot-scope="scope">
       <div class="row-ctrl">
            <el-button
          size="mini"
          @click="handleEdit(scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.index,scope.row)">删除</el-button>
       </div>
      </template>
    </el-table-column>
    </el-table>
  </el-form-item>
  </el-form>
  <tableDialog ref="tableDialog"/>
  <span slot="footer" class="dialog-footer">
    <el-button @click="cancel">取 消</el-button>
    <el-button @click="addConfig">新增配置</el-button>
    <el-button type="primary" @click="comfirmForm" >确 定</el-button>
  </span>
</el-dialog>
</template>
<script>
import tableDialog from './table-dialog'
export default {
    name:'modifyDialog',
    data()
    {
        return {
            dialogVisible:false,
            formData:{
                name:'',
                imageUrl:'',
                brand:'',
                
            },
            tableData:[
                {
                    color:'红色',
                    memory:16,
                    number:100,
                    price:1000
                }
            ]
        }
    },
    components:{
        tableDialog
    },
    methods:{
        handleDelete(i)
        {
            this.tableData.splice(i,1)
        },
        handleEdit(data)
        {
            this.$refs.tableDialog.controlDialog({
                flag:true,
                data,
                mode:'modify'
            })
        },
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
            this.formData.arrive = true
            this.$message({
                message:'评论成功',
                type:'success'
            })
            this.dialogVisible = false

        },
        addConfig()
        {
            this.$refs.tableDialog.controlDialog({
                flag:true,
                data:{},
                mode:'add'
            })            
        },
        handleAvatarChange(file,fileList) {
        this.formData.imageUrl = URL.createObjectURL(file.raw);
      },
    }
}
</script>
<style lang="scss" scoped>
.row-ctrl{
    text-align: center
}
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
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
</style>




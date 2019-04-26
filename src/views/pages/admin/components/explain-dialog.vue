<template>
  <div class="expain-dialog">
    <el-dialog :title="title" :visible.sync="dialogVisible" @close='reset'>
<el-table
    :data="tableData"
    border
    stripe
    >
    <el-table-column
      label="属性"
      >
      <template slot-scope="scope">
          <el-input v-model="scope.row.attribute" size="mini" clearable placeholder="请输入内容"></el-input>
        <!-- {{ scope.row.attribute}} -->
      </template>
    </el-table-column>
    <el-table-column
      label="属性值"
     >
      <template slot-scope="scope">
        <el-input v-model="scope.row.val" size="mini" clearable placeholder="请输入内容"></el-input>
      </template>
    </el-table-column>
        <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>        
      <el-form ref="form" :model="formData" label-width="80px">

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button @click="addOneRow">添加一行</el-button>
        <el-button type="primary" @click="comfirmForm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "expainDialog",
  data() {
    return {
        tableData:[],
      formData: {
      },
      dialogVisible: false,
      title:'参数说明'
    };
  },
  methods: {
    reset()
    {
      this.tableData =[]
      this.formData={}
    },
      handleDelete(index)
      {
        this.tableData.splice(index,1)
      },
    controlDialog(obj) {
      this.dialogVisible = obj.flag;
      this.formData = {...obj.data}
      this.getData(this.formData._id)
    },
    getData(goodId)
    {
      this.$axios({
        method:'post',
        url:'/ego/config/getByGoodId',
        data:{
          goodId
        }
      }).then(res=>{
        this.tableData = res.data.data.config || []
      })
    },
    cancel() {
      this.dialogVisible = false;
    },
    comfirmForm() {
      var arr = []
      for(var n=this.tableData.length-1;n>-1;n--)
      {
        var attribute  = this.tableData[n].attribute
        if(arr.indexOf(attribute)>-1)
        {
            this.tableData.splice(n,1)
        }
        else{
          arr.push(attribute)
        }
      }

      this.$axios({
        url:'/ego/config/add',
        method:'post',
        data:{
          goodId:this.formData._id,
          config:this.tableData
        }
      }).then(res=>{
        if(res.data.code)
        {
      this.$message({
        message: res.data.msg,
        type: "success"
      })
        }
        else{
       this.$message({
        message: '系统繁忙，请稍后再试',
        type: "error"
      })         
        }

      this.dialogVisible = false;
      })
    },
    addOneRow()
    {
        var obj = {
            attribute:'',
            val:''
        }
        this.tableData.push(obj)
    }
  }
};
</script>
<style lang="scss" scoped>
</style>



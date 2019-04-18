<template>
  <div class="expain-dialog">
    <el-dialog :title="title" :visible.sync="dialogVisible">
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
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
      handleDelete()
      {},
    controlDialog(obj) {
      this.dialogVisible = obj.flag;
      this.formData = {...obj.data}
    },
    cancel() {
      this.resetFrom();
      this.dialogVisible = false;
    },
    comfirmForm() {
      this.$message({
        message: "修改成功",
        type: "success"
      });
      this.dialogVisible = false;
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



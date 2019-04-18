<template>
  <div class="goods">
    <div class="title">已上架商品</div>
    <el-table
      :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      border
      stripe
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="商品名称" prop="name"></el-table-column>
      <el-table-column label="销售数量" prop="saleNumber"></el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索"/>
        </template>
        <template slot-scope="scope">
          <div class="row-ctrl">
            <el-button size="mini" @click="handleExplain(scope.row)">商品说明</el-button>
            <el-button size="mini" @click="handleEdit(scope.row)">编辑商品</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">下架商品</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="btns">
        <el-button type="text" @click="addGoods">上架新商品</el-button>
        <el-button type="text" @click="deleteAll">下架所有商品</el-button>
    </div>
    <el-pagination
      class="pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <explainDialog ref="explainDialog"/>
    <modifyDialog ref="modifyDialog"/>
  </div>
</template>
<script>
import modifyDialog from './modify-dialog'
import explainDialog from './explain-dialog'
export default {
  name: "goods",
  data() {
    return {
      pageSizes: [5, 10, 20, 40],
      pageSize: 5,
      currentPage: 1,
      total: 40,
      tableData: [
        {
          name: "华为手机",
          saleNumber: "100",
          brand:'',
          imageUrl:'',

        }
      ],
      search: "",
      selections: []
    };
  },
  components:{
      modifyDialog,
      explainDialog
  },
  methods: {
    handleExplain()
    {
      this.$refs.explainDialog.controlDialog({
        flag:true,
        data:{}
      })
    },
      deleteAll()
      {
                  this.$confirm('确认下架所有商品吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.tableData = []
          this.$message({
            type: 'success',
            message: '下架成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
          
      },
    handleSizeChange() {},
    handleCurrentChange() {},
    handleEdit(data) {
        this.$refs.modifyDialog.controlDialog({
            flag:true,
            data
        })
    },
    handleDelete() {},
    handleSelectionChange(selections) {
      this.selections = selections;
    },
    addGoods()
    {
         this.$refs.modifyDialog.controlDialog({
            flag:true,
            data:{}
        })       
    }
  }
};
</script>
<style lang="scss" scoped>
.btns{
    margin: 10px;
}
.goods {
  padding: 10px;
}
.title {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
  padding-left: 10px;
  text-align: center;
}
.pagination {
  text-align: center;
  margin: 10px 0;
}
.row-ctrl {
  text-align: center;
}
</style>


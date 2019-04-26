<template>
  <div class="goods">
    <div class="title">已上架商品</div>
    <el-table :data="tableData" border stripe @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="商品名称" prop="name"></el-table-column>
      <el-table-column label="商品品牌" prop="brand"></el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input v-model="key" size="mini" placeholder="输入关键字搜索" clearable @keyup.enter.native="getData"/>
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
      <el-button type="text" @click="deleteSelestions" :disabled="!selections.length">下架所选商品</el-button>
      <el-button type="text" @click="deleteAll" :disabled="!tableData.length">下架所有商品</el-button>
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
    <modifyDialog ref="modifyDialog" @update="getData"/>
  </div>
</template>
<script>
import modifyDialog from "./modify-dialog";
import explainDialog from "./explain-dialog";
export default {
  name: "goods",
  data() {
    return {
      pageSizes: [5, 10, 20, 40],
      pageSize: 5,
      currentPage: 1,
      total: 40,
      tableData: [],
      key: "",
      selections: []
    };
  },
  components: {
    modifyDialog,
    explainDialog
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.$axios({
        url: "/ego/good/all",
        params: {
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          key: this.key
        }
      }).then(res => {
        this.tableData = res.data.data;
        this.total = res.data.total;
      });
    },
    handleExplain(data) {
      this.$refs.explainDialog.controlDialog({
        flag: true,
        data
      });
    },
    deleteSelestions() {
              this.$confirm('确定下架所选商品吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
      this.$axios({
        url: "/ego/good/deleteByIds",
        method: "post",
        data: {
          ids: this.selections
        }
      }).then(res => {
        if (res.data.code) {
          this.getData();
          this.$message({
            type: "success",
            message: "下架成功!"
          });
        }
      });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消下架'
          });          
        });

    },
    deleteAll() {
      this.$confirm("确认下架所有商品吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios({
            url: "/ego/good/deleteAll"
          }).then(res => {
            if (res.data.code == 1) {
              this.currentPage = 1;
              this.getData();
              this.$message({
                type: "success",
                message: "下架成功!"
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消下架"
          });
        });
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.getData();
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.getData();
    },
    handleEdit(data,index) {
      this.$refs.modifyDialog.controlDialog({
        flag: true,
        data:{...data},
      });
    },
    handleDelete(data) {
      this.$confirm("确定下架该商品吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios({
            url: "/ego/good/deleteById",
            method: "post",
            data: {
              _id: data._id
            }
          }).then(res => {
            if (res.data.code) {
              this.getData();
              this.$message({
                type: "success",
                message: "下架成功!"
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消下架"
          });
        });
    },
    handleSelectionChange(selections) {
      var arr = [];
      for (var n = 0; n < selections.length; n++) {
        arr.push(selections[n]._id);
      }
      this.selections = arr;
    },
    addGoods() {
      this.$refs.modifyDialog.controlDialog({
        flag: true,
        data: {}
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.btns {
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


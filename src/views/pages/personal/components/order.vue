<template>
  <div class="order">
    <div class="title">所有订单</div>
    <el-table :data="tableData" stripe border class="table">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left">
            <el-row :gutter="10">
              <el-col :span="12">
                <el-form-item label="商品名称:">
                  <span>{{ props.row.name }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="商品颜色:">
                  <span>{{ props.row.color }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="商品内存:">
                  <span>{{ props.row.memory }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="商品数量:">
                  <span>{{ props.row.number }}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="订单号" prop="_id"></el-table-column>
      <el-table-column label="下单时间" prop="time"></el-table-column>
      <el-table-column label="商品品牌" prop="brand"></el-table-column>
      <el-table-column label="商品名称" prop="name"></el-table-column>
      <el-table-column label="商品数量" prop="number"></el-table-column>
      <el-table-column label="总价" prop="price"></el-table-column>
      <el-table-column align="right" min-width="150">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="key"
            size="mini"
            clearable
            placeholder="输入关键字搜索"
            @keyup.enter.native="getData"
          ></el-input>
        </template>
        <template slot-scope="scope">
          <div class="table-row-ctrl" v-if="!scope.row.isArrive">
            <el-button type="text" size="mini" @click="signFor(scope.row)">签收</el-button>
          </div>
          <div v-else>
            <el-rate
              class="rate"
              v-model="scope.row.rate"
              disabled
              text-color="#ff9900"
            ></el-rate>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="pageSizes"
      :page-size="5"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <rateDialog ref="dialog" @update='getData'/>
  </div>
</template>
<script>
import rateDialog from "./rate-dialog";
export default {
  name: "order",
  data() {
    return {
      tableData: [
      ],
      key: "",
      pageSizes: [5, 10, 20, 40],
      currentPage: 1,
      total: 0,
      pageSize: 5
    };
  },
  components: {
    rateDialog
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      const pageSize = this.pageSize;
      const currentPage = this.currentPage;
      const key = this.key;
      const user = this.$store.state.userMsg.user
      this.$axios({
        url: "/ego/record/getOrder",
        method: "get",
        params: {
          pageSize,
          currentPage,
          key,
          user
        }
      }).then(res => {
        if (res.data.code) {
          this.total = res.data.total;
          this.tableData = res.data.data;
        }
      });
    },
    signFor(data) {
      this.$refs.dialog.controlDialog({
        flag: true,
        data
      });
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize
      this.getData()
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage
      this.getData()
    }
  }
};
</script>
<style lang="scss" scoped>
.table {
  width: 100%;
}
.pagination {
  text-align: center;
  padding: 4px 0;
}
.order {
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
.table-row-ctrl {
  text-align: center;
}
.rate {
  text-align: center;
}
</style>


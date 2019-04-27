<template>
  <div class="order" v-loading='loading'>
    <div class="title">所有订单</div>
            <div class="search-wrap">
          <el-input placeholder="请输入内容" v-model="key" >
    <el-select v-model="state" slot="prepend" placeholder="请选择">
      <el-option label="已发货" value="已发货"></el-option>
      <el-option label="未发货" value="未发货"></el-option>
      <el-option label="已签收" value="已签收"></el-option>
      <el-option label="未签收" value="未签收"></el-option>
      <el-option label="全部" value="全部"></el-option>
    </el-select>
    <el-button slot="append" icon="el-icon-search" @click="getData" ></el-button>
  </el-input>

        </div>
    <el-table :data="tableData" stripe border class="table" >
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
      <el-table-column label="下单时间" >
              <template slot-scope="scope">
        <span>{{ formatTime(scope.row.time) }}</span>
      </template>
      </el-table-column>
      <el-table-column label="商品品牌" prop="brand"></el-table-column>
      <el-table-column label="商品名称" prop="name"></el-table-column>
      <el-table-column label="商品数量" prop="number"></el-table-column>
      <el-table-column label="总价" prop="price"></el-table-column>
      <el-table-column align="right" min-width="150">
        <template slot-scope="scope">
          <div class="table-row-ctrl" v-if="!scope.row.isArrive">
            <el-button type="text" size="mini" @click="signFor(scope.row)" v-if="scope.row.isSend">签收</el-button>
            <el-tag v-if="!scope.row.isSend">正在准备发货</el-tag>
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
      pageSize: 5,
      state:'',
      loading:false
    };
  },
  components: {
    rateDialog
  },
  watch:{
    '$route'(to)
    {
          switch(to.params.command)
    {
      case '1':
      this.state = '已发货'
      break;
      case '2':
      this.state = '未发货'
      break;
      case '3':
      this.state = '已签收'
      break;
      case '4':
      this.state = '未签收'
      break;  
      case '5':
      this.state = '全部'
      break;  
      default:
           this.state = '全部'
           break;                   
    }
    this.getData();
    }
  },
  mounted() {
    
    switch(this.$route.params.command)
    {
      case '1':
      this.state = '已发货'
      break;
      case '2':
      this.state = '未发货'
      break;
      case '3':
      this.state = '已签收'
      break;
      case '4':
      this.state = '未签收'
      break;  
      case '5':
      this.state = '全部'
      break;    
            default:
           this.state = '全部'
           break;                            
    }
    this.getData();
  },
  methods: {
              formatTime(time) {
      function add0(m) {
        return m < 10 ? "0" + m : m;
      }
      var date;
      if (time) {
        date = new Date(time);
      } else {
        date = new Date();
      }

      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      var d = date.getDate();
      var h = date.getHours();
      var mm = date.getMinutes();
      var s = date.getSeconds();
      return (
        y +
        "-" +
        add0(m) +
        "-" +
        add0(d) +
        " " +
        add0(h) +
        ":" +
        add0(mm) +
        ":" +
        add0(s)
      );
    },
    getData() {
      const pageSize = this.pageSize;
      const currentPage = this.currentPage;
      const key = this.key;
      const user = this.$store.state.userMsg.user
      this.loading=true
      this.$axios({
        url: "/ego/record/getOrder",
        method: "get",
        params: {
          pageSize,
          currentPage,
          key,
          user,
          state:this.state
        }
      }).then(res => {
        if (res.data.code) {
          this.total = res.data.total;
          this.tableData = res.data.data;
          this.loading=false
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
.search-wrap{
  width: 80%;
  margin: 10px auto
}
</style>


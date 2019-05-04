<template>
  <div class="cart">
    <div class="title">购物车</div>
    <el-table
      :data="tableData"
      tooltip-effect="dark"
      stripe
      border
      class="table"
      @selection-change="handleSelectionChange"
      v-loading="loading"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="商品名称" prop="name" width="120"></el-table-column>
      <el-table-column prop="color" label="颜色" width="120"></el-table-column>
      <el-table-column prop="memory" label="内存" width="120"></el-table-column>
      <el-table-column prop="number" label="数量" width="120"></el-table-column>
      <el-table-column prop="money" label="总价" width="120"></el-table-column>
      <el-table-column align="right">
        <template slot="header" >
          <el-input
            v-model="key"
            size="mini"
            clearable
            placeholder="输入关键字搜索"
            @keyup.native="getData"
            debounce
          ></el-input>
        </template>
        <template slot-scope="scope">
          <div class="table-row-ctrl">
            <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="accounts clearfix">
      <div class="cart-ctrl">
        <el-button type="text" @click="deleteSelections" :disabled="!selections.length">删除所选</el-button>
        <el-button type="text" @click="clearCart" :disabled="!tableData.length">清空购物车</el-button>
      </div>
      <div class="number-ctrl">
        <div class="price">
          总价:￥
          <span class="price-number">{{totalPrice}}</span>.00
        </div>
        <div class="buy">
          <el-button type="primary" @click="buy" :disabled="!selections.length" :loading="loading">结账</el-button>
        </div>
      </div>
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
    <modifyDialog ref="dialog" @update="getData"/>
  </div>
</template>
<script>
import modifyDialog from "./modify-dialog";
export default {
  name: "cart",
  data() {
    return {
      tableData: [],
      currentPage: 1,
      pageSizes: [5, 10, 15, 20],
      total: 0,
      key: "",
      totalPrice: 0,
      pageSize: 5,
      selections: [],
      loading:false,
      goodIdArr:[],
      orderConfigArr:[]
    };
  },
  components: {
    modifyDialog
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.loading=true
      this.$axios({
        url: "/ego/record/getCart",
        method: "get",
        params: {
          user: this.$store.state.userMsg.user,
          key: this.key,
          currentPage:this.currentPage,
          pageSize:this.pageSize
        }
      }).then(res => {
        this.tableData = res.data.data;
        this.total = res.data.total
        this.loading=false
      });
    },
    handleSelectionChange(selections) {
      var arr = [];
      var totalPrice = 0
      var goodIdArr =[]
      var orderConfigArr = []
      for (var n = 0; n < selections.length; n++) {    //新建对象
        totalPrice+=selections[n].money
        arr.push(selections[n]._id)
        orderConfigArr.push({
          color:selections[n].color,
          memory:selections[n].memory,
          price:selections[n].price,
          number:selections[n].number
        })
        if(goodIdArr.indexOf(selections[n].goodId)!=-1)
        {
          goodIdArr.push(selections[n].goodId)
        }
      }
      this.totalPrice = totalPrice  //总价格
      this.selections = arr;
      this.goodIdArr = goodIdArr
      this.orderConfigArr=orderConfigArr
    },
    handleEdit(obj) {
      this.$refs.dialog.controlDialog({
        flag: true,
        data: obj
      });
    },
    deleteSelections() {
      this.$confirm("确认删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.loading=true
          this.$axios({
            url: "/ego/record/deleteByIds",
            method: "post",
            data: {
              ids: this.selections
            }
          }).then(res => {
            if (res.data.code == 1) {
              this.loading=false
              this.getData();
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    clearCart() {
      this.$confirm("确认清空购物车吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.loading=true
          this.$axios({
            url:'/ego/record/deleteAll',
            method:'get',
            params:{
              user:this.$store.state.userMsg.user
            }
          }).then(res=>{
            if(res.data.code)
            {
              this.loading=false
              this.$message({
                type: "success",
                message: "清空成功!"
              })
            }
            this.currentPage = 1
            this.getData()
          })

        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消清空操作"
          });
        });
    },
    handleDelete(data) {
      this.$confirm("确认删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.loading=true
          this.$axios({
            url: "/ego/record/deleteById",
            method: "post",
            data: {
              _id: data._id
            }
          }).then(res => {
            if (res.data.code) {
              this.loading = true
              this.currentPage = 1
              this.getData();
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            }
          });
        })
        .catch(() => {
          this.loading= false
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize
      this.getData()
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage
      this.getData()
    },
    buy() {
      var userMsg = this.$store.state.userMsg
      if(!userMsg.user||!userMsg.province||!userMsg.city||!userMsg.area||!userMsg.more||!userMsg.phone)
      {
        this.$alert('请先填写完整个人信息！', '提示', {
          confirmButtonText: '确定',
          callback: () => {
            this.$router.push('/personal/personalData')
          }
        })
      }
      this.$confirm(`${userMsg.user} ${userMsg.province} ${userMsg.city} ${userMsg.area} ${userMsg.more} ${userMsg.phone}`, "当前收货人信息是", {
        distinguishCancelAndClose: true,
        confirmButtonText: "信息无误，确认购买",
        cancelButtonText: "信息有误，前往修改"
      })
        .then(() => {
          this.loading = true
          this.$axios({
            url:'/ego/record/pay',
            method:'post',
            data:{
              ids:this.selections,
              money:this.totalPrice,
              user:this.$store.state.userMsg.user,
              goodIdArr:this.goodIdArr,
              orderConfigArr:this.orderConfigArr
            }
          }).then(res=>{
            if(res.data.code)
            {
              this.loading = false
              this.selections = []
              this.currentPage = 1
              this.getData()
              this.$store.commit('setUserMsg',res.data.data)
              if(this.$store.state.socket)
              {
                this.$store.state.socket.emit('getOrder')
              }
              this.$message({
                type: "success",
                message: "已经成功购买"
              });
            }
            else{
              this.loading = false
              this.$message({
                type: "error",
                message:res.data.msg
              });
            }
          })

        })
        .catch(action => {
          if (action == "cancel") {
            this.$router.push("/personal/personalData");
          } else {
            this.$message({
              type: "info",
              message: "已取消购买"
            });
          }
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.table {
  width: 100%;
}
.buy {
  padding-left: 10px;
}
.price {
  color: red;
  font-size: 13px;
  line-height: 40px;
}
.price-number {
  font-size: 28px;
}
.number-ctrl {
  display: flex;
  float: right;
  padding: 10px 0;
}
.cart-ctrl {
  height: 40px;
  width: 300px;
  line-height: 40px;
  color: #666;
  float: left;
}
.cart {
  padding: 10px;
}
.pagination {
  text-align: center;
}
.table-row-ctrl {
  text-align: center;
}
.title {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
  padding-left: 10px;
  text-align: center;
}
</style>



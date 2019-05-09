<template>
    <div class="order-management" v-loading='loading'> 
        <div class="title">订单管理</div>
        <div class="search-wrap">
          <el-input placeholder="请输入内容" v-model="key" class="input-with-select">
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

          <el-table
          border
          stripe
    :data="tableData"
    
    >
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline>
            <el-row :gutter="10">
                <el-col :span="12">
                        <el-form-item label="下单时间">
                        <span>{{ formatTime(props.row.time) }}</span>
                        </el-form-item>
                </el-col>
                                <el-col :span="12">
                        <el-form-item label="商品品牌">
                        <span>{{ props.row.brand }}</span>
                        </el-form-item>
                </el-col>
                <el-col :span="12" v-if="props.row.color">
                        <el-form-item label="商品颜色">
                        <span>{{ props.row.color }}</span>
                        </el-form-item>
                </el-col>  
                <el-col :span="12"  v-if="props.row.memory">
                        <el-form-item label="商品内存">
                        <span>{{ props.row.memory }}</span>
                        </el-form-item>
                </el-col> 
                <el-col :span="12">
                        <el-form-item label="商品单价">
                        <span>{{ props.row.price }}</span>
                        </el-form-item>
                </el-col> 
                <el-col :span="12">
                        <el-form-item label="交易金额">
                        <span>{{ props.row.money }}</span>
                        </el-form-item>
                </el-col> 
                <el-col :span="12">
                        <el-form-item label="买家名称">
                        <span>{{ props.row.user }}</span>
                        </el-form-item>
                </el-col>   
                                <el-col :span="12">
                        <el-form-item label="买家评分">
                            <span>{{ props.row.rate }}</span>
                        </el-form-item>
                </el-col>                                                                                                                                 
            </el-row>
            <el-row>
                <el-col :span="12">
                                    <el-col :span="12">
                        <el-form-item label="买家评论" class="rate">
                        <span>{{ props.row.comment }}</span>
                        </el-form-item>
                </el-col>
                </el-col>
            </el-row>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      label='订单号'
      prop="_id">
    </el-table-column>
    <el-table-column
      label="商品名称"
      prop="name">
    </el-table-column>
    <el-table-column
      label="商品数量"
      prop="number">
    </el-table-column>
        <el-table-column
      label="交易金额"
      prop="money">
    </el-table-column>
        <el-table-column
      label="操作"
      >
      <template slot-scope="scope">
        <div class="bts">
          <el-button type="text" size="small" @click="handleClick(scope.row)" v-if="!scope.row.isSend">发货</el-button>
          <el-tag v-if="scope.row.isArrive">完成交易</el-tag>
          <el-tag v-if="scope.row.isSend&&!scope.row.isArrive">已发货</el-tag>
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
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    </div>
</template>
<script>
export default {
    name:'orderManagement',
    data()
    {
        return {
            tableData: [],
        total:0,
        pageSize:5,
        pageSizes:[5,10,20,40],
        currentPage:1,
        state:'',
        key:'',
        loading:false
        }
        
    },
    mounted()
    {
      this.getData()
    },
    methods:{
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
      handleClick(data)
      {
        var _id = data._id
        this.$axios({
          url:'/ego/record/updateById',
          method:'post',
          data:{
            _id
          }
        }).then(res=>{
          if(res.data.code)
          {
            this.getData()
            this.$message({
              type:'success',
              message:'发货成功'
            })
          }
        })
      },
      getData()
      {
        this.loading = true
        this.$axios({
          url:'/ego/record/all',
          params:{
            pageSize:this.pageSize,
            currentPage:this.currentPage,
            key:this.key,
            state:this.state
          }
        }).then(res=>{
          if(res.data.code)
          {
            this.tableData = res.data.data
            this.total = res.data.total
            this.loading =false
          }
        })
      },
        handleCurrentChange(currentPage)
        {
          this.currentPage = currentPage
          this.getData()
        },
        handleSizeChange(pageSize)
        {
          this.pageSize = pageSize
          this.getData()
        }
    }
}
</script>
<style lang="scss" scoped>
.pagination{
    text-align: center;
    padding: 10px 0
}
.title{
    font-size: 24px;
    font-weight: bold;
    color: #333;
    margin-bottom: 10px;
    padding-left:10px;
    text-align: center
}
.order-management{
    padding: 10px;
}
.rate{
    vertical-align: middle
}
.bts{
  text-align: center
}
.search-wrap{
  width: 80%;
  margin: 10px auto
}
.bts{
  text-align: center
}
</style>


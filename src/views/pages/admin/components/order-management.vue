<template>
    <div class="order-management">
        <div class="title">订单管理</div>
          <el-table
          border
          stripe
    :data="tableData"
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline>
            <el-row :gutter="10">
                                <!-- <el-col :span="12">
                        <el-form-item label="订单号">
                        <span>{{ props.row.id }}</span>
                        </el-form-item>
                </el-col> -->
                <el-col :span="12">
                        <el-form-item label="下单时间">
                        <span>{{ props.row.time }}</span>
                        </el-form-item>
                </el-col>
                                <el-col :span="12">
                        <el-form-item label="商品品牌">
                        <span>{{ props.row.brand }}</span>
                        </el-form-item>
                </el-col>
                <el-col :span="12">
                        <el-form-item label="商品颜色">
                        <span>{{ props.row.color }}</span>
                        </el-form-item>
                </el-col>  
                <el-col :span="12">
                        <el-form-item label="商品内存">
                        <span>{{ props.row.memory }}</span>
                        </el-form-item>
                </el-col> 
                <el-col :span="12">
                        <el-form-item label="商品单价">
                        <span>{{ props.row.price }}</span>
                        </el-form-item>
                </el-col> 
                <!-- <el-col :span="12">
                        <el-form-item label="商品数量">
                        <span>{{ props.row.number }}</span>
                        </el-form-item>
                </el-col> -->
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
            tableData: [
                {
                _id:'001',
          name: '华为手机',
          brand: '华为',
          color: '红色',
          comment: '棒',
          rate: 3,
          price: 300,
          number: 2,
          money:600,
          memory:16,
          user:'aa'
        }],
        total:100,
        pageSize:5,
        pageSizes:[5,10,20,40],
        currentPage:1
        }
    },
    filters:{
      dataFilter(data)
      {
          return data.isBuy
      }
    },
    mounted()
    {
      this.getData()
    },
    methods:{
      getData()
      {
        this.$axios({
          url:'/ego/record/all'
        }).then(res=>{
          this.tableData = res.data
        })
      },
        handleCurrentChange()
        {

        },
        handleSizeChange()
        {

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
</style>


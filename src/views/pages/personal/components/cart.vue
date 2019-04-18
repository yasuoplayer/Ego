<template>
    <div class="cart">
        <div class="title">购物车</div>
          <el-table
    :data="tableData"
    tooltip-effect="dark"  
    stripe 
      border
      class="table"
    @selection-change="handleSelectionChange">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      label="商品名称"
      prop="name"
      width="120">
    </el-table-column>
    <el-table-column
      prop="color"
      label="颜色"
      width="120">
    </el-table-column>
        <el-table-column
      prop="memory"
      label="内存"
      width="120">
    </el-table-column>
    <el-table-column
      prop="number"
      label="数量"
      width="120">
    </el-table-column>
        <el-table-column
      prop="price"
      label="总价"
      width="120">
    </el-table-column>
    <el-table-column
      align="right">
      <template slot="header" slot-scope="scope">
        <el-input
          v-model="key"
          size="mini"
          clearable
          placeholder="输入关键字搜索">
        </el-input>
      </template>
      <template slot-scope="scope">
          <div class="table-row-ctrl">
                      <el-button
          size="mini"
          @click="handleEdit(scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.row)">删除</el-button>
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
                      总价:￥<span class="price-number">{{totalPrice}}</span>.00
                  </div>
                  <div class="buy">
                      <el-button type="primary" @click="buy">结账</el-button>
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
      :total="total">
    </el-pagination>
    <modifyDialog ref="dialog"/>
    </div>
</template>
<script>
import modifyDialog from './modify-dialog'
export default {
    name:'cart',
    data()
    {
        return {
            tableData:[
                {
                    name:'华为手机',
                    price:100,
                    color:'红色',
                    memory:'16g',
                    number:'1'
                }
               
            ],
             currentPage:1,
             pageSizes:[5,10,20,40],
             total:21,
             key:'',
             totalPrice:'100',
             pageSize:5,
             selections:[]
        }
    },
    components:{
modifyDialog
    },
    methods:{
        handleSelectionChange(selections)
        {
            this.selections = selections
        },
        handleEdit(obj)
        {
          var newData = {...obj}
          switch (newData.color) {
            case '红色':
              newData.color = 'red'
              break;
            case '蓝色':
              newData.color = 'blue'
              break;         
            default:
              newData.color = 'yellow'
              break;
          }
            this.$refs.dialog.controlDialog({
                flag:true,
                data:newData
            })
        },
        deleteSelections()
        {
            this.$confirm('确认删除吗?', '提示', {
                      confirmButtonText: '确定',
                      cancelButtonText: '取消',
                      type: 'warning'
                    }).then(() => {
                      this.$message({
                        type: 'success',
                        message: '删除成功!'
                      });
                    }).catch(() => {
                      this.$message({
                        type: 'info',
                        message: '已取消删除'
                      });          
                    })
        },
        clearCart()
        {
            this.$confirm('确认清空购物车吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.tableData = []
              this.$message({
                type: 'success',
                message: '清空成功!'
              });
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消清空操作'
              });          
            });
        },
        handleDelete(data)
        {
          console.log(data)
            this.$confirm('确认删除吗?', '提示', {
                      confirmButtonText: '确定',
                      cancelButtonText: '取消',
                      type: 'warning'
                    }).then(() => {
                      this.$message({
                        type: 'success',
                        message: '删除成功!'
                      });
                    }).catch(() => {
                      this.$message({
                        type: 'info',
                        message: '已取消删除'
                      });          
                    })
        },
        handleSizeChange()
        {

        },
        handleCurrentChange()
        {

        },
        buy()
        {
        this.$confirm('波记 广东深圳宝安 1341111111111', '当前收货人信息是', {
          distinguishCancelAndClose: true,
          confirmButtonText: '信息无误，确认购买',
          cancelButtonText: '信息有误，前往修改'
        })
          .then(() => {
            this.$message({
              type: 'success',
              message: '已经成功购买'
            });
          })
          .catch(action => {
              console.log(action)
              if(action == 'cancel')
              {
                  this.$router.push('/personal/personalData')
              }
              else{
            this.$message({
              type: 'info',
              message: '已取消购买'
            })
              }

          });            
        }
    }
}
</script>
<style lang="scss" scoped>
.table{
  width: 100%;
}
.buy{
    padding-left: 10px;
}
.price{
    color: red;
    font-size: 13px;
    line-height: 40px;
}
.price-number{
    font-size: 28px;
}
.number-ctrl{
    display: flex;
    float: right;
    padding: 10px 0;
}
.cart-ctrl{
    height: 40px;
    width: 300px;
    line-height: 40px;
    color: #666;
    float: left;
}
.cart{
    padding: 10px;
}
.pagination{
    text-align: center
}
.table-row-ctrl{
    text-align: center
}
.accounts{
    height: 40px;
    margin-bottom: 20px 0;
}
.title{
    font-size: 24px;
    font-weight: bold;
    color: #333;
    margin-bottom: 10px;
    padding-left:10px;
    text-align: center
}
</style>



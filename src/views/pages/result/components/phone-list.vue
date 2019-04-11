<template>
        <div class="phone-list">
        <el-row :gutter="4" >
              <el-col :span="6"  class="row" v-for="item in 4" :key="item">
            <el-card shadow="hover" class="card" >
            <img v-lazy="list[0].img"  class="img"/>
            <div class="name" :title="list[0].name">
                {{list[0].name}}
            </div>
            <div class="price">
                ￥<span class="price-number">{{list[0].price}}</span>.00
            </div>
              <el-row :gutter="2">
                <el-col :span="8">
                    <div class="sales-volume">
                        总销量:<span class="sales-volume-number">{{list[0].salesVolume}}</span>
                    </div>
                </el-col>
                                <el-col :span="8">
                    <div class="rate">
                        评分:<span class="rate-number">{{list[0].rate}}</span>
                    </div>
                </el-col>
                    <el-col :span="8">
                    <el-button round  type="text" size='mini' @click="showDetail(list[0].id)">查看详情</el-button>
                </el-col>
            </el-row>
            </el-card>

        </el-col>
        </el-row>
        <div class="pagination">
                        <el-pagination
                        background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="pageSizes"
      :page-size="5"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
        </div>

    </div>
</template>
<script>
export default {
    name:'phoneList',
    data()
    {
        return {
            list:[
                {
                    id:0,
                    img:require('../imgs/phone1.png'),
                    name:'【套餐版】Xiaomi/小米 小米Play 流光渐变AI双摄 4GB+64GB 梦幻蓝 移动联通电信全网通4G手机',
                    price:'1158',
                    salesVolume:'100',
                    rate:'4'
                }
            ],
            currentPage:1,
            total:40,
            pageSizes:[5, 10, 20, 40]
        }
    },
    methods:{
        handleSizeChange(val)
        {
            console.log(val)
        },
        handleCurrentChange(val)
        {
            console.log(val)
        },
        showDetail(id)
        {
            this.$router.push('/detail/'+id)
        }
    }
}
</script>
<style lang="scss" scoped>
.pagination{
    text-align: center;
    margin: 4px 0
}
.sales-volume-number,.rate-number{
    color: red;
    padding-left: 4px
}
.img{
    position: relative;
    left: 0;
    width: 80%;
    height: 250px;
    margin: 0 auto;
    display: block;
    transition: all .2s linear
}
.name{
    display: -webkit-box;
    color:#333;
    font-size: 12px;
    overflow: hidden;
    -webkit-line-clamp:2;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    line-height: 16px
}
.price{
    font-size: 12px;
    color: #F60
}
.price-number{
    font-size: 22px;
}
.card{
    margin-bottom: 4px;
}
.card:hover{
    cursor: pointer;
}
.sales-volume,.rate{
    font-size: 12px;
    color: #999;
    text-align: center
}
</style>



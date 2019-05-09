<template>
        <div class="phone-list" v-loading='loading'>
        <el-row :gutter="4" >
              <el-col :span="6"  class="row" v-for="(item,index) in list" :key="index" >
            <el-card shadow="hover" class="card"  @click.native="showDetail(item._id,item.price)">
            <img v-lazy="'http://localhost:3000/'+item.img"  class="img"/>
            <div class="name" :title="item.name">
                {{item.name}}
            </div>
            <div class="price">
                ￥<span class="price-number">{{item.minPrice}}</span>.00
            </div>
              <el-row :gutter="2">
                <el-col :span="8">
                    <div class="sales-volume">
                        总销量:<span class="sales-volume-number">{{item.salesVolume}}</span>
                    </div>
                </el-col>
                                <el-col :span="8">
                    <div class="rate">
                        评分:<span class="rate-number">{{item.average}}</span>
                    </div>
                </el-col>
                    <el-col :span="8">
                    <el-button round  type="text" size='mini' >查看详情</el-button>
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
      :page-size="pageSize"
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
            list:[],
            currentPage:1,
            total:40,
            pageSizes:[5, 10, 20, 40],
            pageSize:5,
            filterData:{},
            loading:false
        }
    },
    methods:{
        handleSizeChange(pageSize)
        {
            this.pageSize = pageSize
            this.getData()
        },
        handleCurrentChange(currentPage)
        {
            this.currentPage = currentPage
            this.getData()
        },
        showDetail(id,price)
        {
            var isPhone = true
            if(price)
            {
                isPhone = false
            }
            this.$router.push({
                path:'/detail',
                query:{
                id,
                isPhone
                }
            })
        },
        setData(obj)
        {
            this.filterData = {...obj}
            this.getData()
        },
        getData()
        {
            this.loading = true
            this.list=[]
            this.$axios({
                url:'/ego/good/find',
                method:'get',
                params:{
                    pageSize:this.pageSize,
                    currentPage:this.currentPage,
                    key:this.filterData.key,
                    type:this.filterData.type,
                    filter:this.filterData.filter
                }
            }).then(res=>{
                this.list = res.data.data.filter(item => item.minPrice != 999999)
                this.total = res.data.total
                this.loading = false
            })
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



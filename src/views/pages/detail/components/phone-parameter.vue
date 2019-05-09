<template>
  <div class="phone-parameter">
    <el-tabs tab-position="top" type="border-card">
      <el-tab-pane label="配置参数" >
        <parameterTable/>
      </el-tab-pane>
      <el-tab-pane label="用户评价" >
        <div class="evaluate">
          <div class="average">
            <p class="title">
              平均评分
            </p>
            <p class="rate-number">{{rate}}</p>
            <el-rate
          v-model="rate"
          disabled
          text-color="#ff9900"
          class="rate"
          >
        </el-rate>
          </div>
          <comment/>
        </div>
        
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import parameterTable from "./parameter-table"
import comment from './comment'
export default {
  name: "phoneParameter",
  data() {
    return {
      rate: 3.7
    };
  },
  components:{
      parameterTable,
      comment
  },
  mounted()
  {
    this.getData(this.$route.query.id,this.$route.query.isPhone)
  },
  methods:{
    getData(_id,isPhone)
    {
      var isPhone = isPhone==true?1:0
      this.$axios({
        url:'/ego/good/findById',
        method:'get',
        params:{
          _id,
          isPhone
        }
      }).then(res=>{
        this.rate = res.data.data.average
      })
    }
  }
};
</script>
<style lang="scss" scoped>
.a{
  height: 500px;
}
.evaluate{
  display: flex
}
.average{
  width: 200px;
  height: 167px;
}
.title{
  color: #404040;
    font-size: 18px;
    font-weight: 600;
    text-align: center
}
.rate{
  text-align: center
}
.rate-number{
  font-size: 30px;
  color: red;
  text-align: center
}
</style>


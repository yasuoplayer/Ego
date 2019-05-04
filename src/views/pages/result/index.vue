<template>
  <div class="result">
    <searchWrap @filterChange='filterChange' :filter='filter'/>
    <phoneList ref="resultList"/>
  </div>
</template>
<script>
import searchWrap from './components/search-wrap'
import phoneList from './components/phone-list'
var brandList = ["苹果", "小米", "华为","荣耀" ,"vivo" ,"oppo" ,"其他","全部品牌"]
export default {
  name: "result",
  data() {
    return {
      key:'',
      filter:{ brand: "全部品牌", price: "全部价格", sort: "默认排序" }
    };
  },
  components:{
    searchWrap,
    phoneList
  },
  watch:{
        '$route' (to) {
          this.key = to.params.key
          this.setResultParams()
    }
  },
  mounted() {
    this.key = this.$route.params.key 
    if(this.$route.query.brand)
    {
      if(brandList.indexOf(this.$route.query.brand)!=-1)
      {
        this.filter.brand = this.$route.query.brand
      }
      else{
        this.filter.brand ='其他'
      }
    }
    this.setResultParams()
  },
  methods: {
    filterChange()
    {
      this.setResultParams()
    },
    setResultParams()
    {
      this.$refs.resultList.setData(
        {
          filter:this.filter,
          key:this.key
        }
      )
    }
  }
};
</script>
<style lang="scss" scoped>
.result{
  padding: 10px 10%
}
</style>


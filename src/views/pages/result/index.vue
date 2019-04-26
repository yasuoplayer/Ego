<template>
  <div class="result">
    <searchWrap @filterChange='filterChange'/>
    <phoneList ref="resultList"/>
  </div>
</template>
<script>
import searchWrap from './components/search-wrap'
import phoneList from './components/phone-list'
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
        '$route' (to, from) {
          this.key = to.params.key
          this.setResultParams()
    }
  },
  mounted() {
    this.key = this.$route.params.key
    this.setResultParams()
  },
  methods: {
    filterChange(filter)
    {
      this.filter = filter
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


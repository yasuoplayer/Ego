<template>
  <div class="result">
    <searchWrap/>
    <phoneList/>
  </div>
</template>
<script>
import searchWrap from './components/search-wrap'
import phoneList from './components/phone-list'
export default {
  name: "result",
  data() {
    return {

    };
  },
  components:{
    searchWrap,
    phoneList
  },
  mounted() {
    // console.log(this.$route.params.key)
  },
  methods: {
  }
};
</script>
<style lang="scss" scoped>
.result{
  padding: 10px 10%
}
</style>


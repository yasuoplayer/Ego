<template>
  <div class="home clearfix">
    <toolBar/>
    <headerSearch/>
    <router-view></router-view>
    <foot/>
  </div>
</template>

<script>
import toolBar from '../../../components/tool-bar'
import foot from '../../../components/foot'
import headerSearch from './components/headerSearch'
export default {
  name: "home",
  components: {
    toolBar,
    foot,
    headerSearch,
  },
  data()
  {
    return {
      loginMsg:'登录/注册'
    }
  }
};
</script>
<style lang="scss" scoped>
.home{
  height: 100%;
  line-height: 35px;
  width: 100%
}
</style>


<template>
    <div class="personal-content">
      <navMenu/>
      <div class="content-right">
          <router-view class="router"></router-view>
      </div>
    </div>
</template>
<script>
import navMenu from './nav-menu'
export default {
    name:'personalContent',
    data()
    {
        return {
           
        }
    },
    components:{
        navMenu
    }
}
</script>
<style lang="scss" scoped>
.personal-content{
    padding: 10px 10%;
    background: #eee;
    display: flex;
}
.content-right{
    flex: 1;
    background: #fff;
    overflow: hidden;
}
.router{
    height:100%;
    width:100%;
}
</style>



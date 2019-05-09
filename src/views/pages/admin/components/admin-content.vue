<template>
    <div class="admin-content">
      <navMenu/>
      <div class="content-right">
          <router-view class="router"></router-view>
      </div>
    </div>
</template>
<script>
import navMenu from './nav-menu'
export default {
    name:'adminContent',
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
.admin-content{
    padding: 10px 10%;
    background: #eee;
    display: flex
}
.content-right{
    flex: 1;
    overflow: hidden;
    background: #fff
}
.router{
    height:100%;
    width:100%;
}
</style>



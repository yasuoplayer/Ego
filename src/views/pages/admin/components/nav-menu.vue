<template>
<div class="nav-menu">

<el-menu default-active="1-1" class="el-menu-vertical-demo" :collapse="isCollapse">
      <el-menu-item @click="toggleCollapse">
    <i :class="{'el-icon-caret-right':isCollapse,'el-icon-caret-left':!isCollapse}"></i>
    <span slot="title">{{isCollapse?'展开菜单':'收起菜单'}}</span>
  </el-menu-item>
  <el-submenu index="1">
    <template slot="title">
      <i class="el-icon-menu"></i>
      <span slot="title">商品仓库</span>
    </template>
      <el-menu-item index="1-1" @click="goTo('/admin/goods')">商品管理</el-menu-item>
  </el-submenu>
    <el-menu-item index="2" @click="goTo('/admin/orderManagement')" >
    <i class="el-icon-tickets"></i>
    <span slot="title">所有订单</span>
  </el-menu-item>
      <el-menu-item index="3" @click="goTo('/admin/goodData')" >
    <i class="el-icon-coin"></i>
    <span slot="title">数据统计</span>
  </el-menu-item>
</el-menu>
  </div>
</template>
<script>
export default {
  name: "navMenu",
  data() {
    return {
      isCollapse:false,
    }
  },
    methods: {
      toggleCollapse()
      {
        this.isCollapse = !this.isCollapse
      },
      goTo(url)
      {
        this.$router.push(url)
      }
    }  
};
</script>
<style lang="scss" scoped>
// .nav-menu{
// max-width: 250px;
// }
.bt{
  width: 100%;
}
.userImg{
  width: 20px;
  height: 18px;
}
</style>



<template>
<div class="nav-menu">

<el-menu :default-active="active" class="el-menu-vertical-demo" :collapse="isCollapse">
      <el-menu-item @click="toggleCollapse">
    <i :class="{'el-icon-caret-right':isCollapse,'el-icon-caret-left':!isCollapse}"></i>
    <span slot="title">{{isCollapse?'展开菜单':'收起菜单'}}</span>
  </el-menu-item>
  <el-submenu index="1">
    <template slot="title">
      <i class="el-icon-menu"></i>
      <span slot="title">个人中心</span>
    </template>
    <el-menu-item-group>
      <span slot="title">个人资料</span>
      <el-menu-item index="1-1" @click="goTo('/personal/personaldata')">帐号资料</el-menu-item>
    </el-menu-item-group>
  </el-submenu>
    <el-menu-item index="2" @click="goTo('/personal/order')">
    <i class="el-icon-tickets"></i>
    <span slot="title">所有订单</span>
  </el-menu-item>
    <el-menu-item index="3" @click="goTo('/personal/cart')">
    <i class="el-icon-goods"></i>
    <span slot="title">购物车</span>
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
      active:''
    }
  },
  watch:{
    '$route'(to)
    {
      switch (to.name) {
        case 'order':
          this.active = '2'
          break;
        case 'cart':
          this.active = '3'
          break;      
        default:
        this.active = '1-1'
          break;
      }
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
.nav-menu{
max-width: 200px;
}
.bt{
  width: 100%;
}
.userImg{
  width: 20px;
  height: 18px;
}
</style>



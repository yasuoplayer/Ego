<template>
  <ul class="tool-bar">
    <li class="tool-bar-item" @click="goHome">
      <span class="home-img"></span>
      <span class="home">主页</span>
    </li>
    <li class="tool-bar-item" v-if="userName">
      <span class="cancel" @click="cancellation">退出登录</span>
    </li>
    <li class="tool-bar-item" v-if="userName&&!isAdmin" @click="goCart">
      <span class="cart-img"></span>
      <span class="cart">购物车</span>
    </li>
    <li class="tool-bar-item" v-if="userName&&!isAdmin">
      <el-dropdown :show-timeout="50" :hide-timeout="50" @command="handleCommand">
        <span class="el-dropdown-link">
          我的订单
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="1">已发货</el-dropdown-item>
          <el-dropdown-item command='2'>未发货</el-dropdown-item>
          <el-dropdown-item command='3'>已签收</el-dropdown-item>
          <el-dropdown-item command='4'>未签收</el-dropdown-item>
          <el-dropdown-item command='5'>全部</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </li>
    <li class="tool-bar-item">
      <span class="account" @click="handleClick">{{userName||'登录 / 注册'}}</span>
    </li>
  </ul>
</template>
<script>
export default {
  name: "tool-bar",
  components: {},
  data() {
    return {};
  },
  computed: {
    isAdmin() {
      return this.$store.state.userMsg.root;
    },
    userName() {
      return this.$store.state.userMsg.user;
    }
  },
  methods: {
    cancellation() {
      localStorage.removeItem('egoUserMsg')
      this.$store.commit("cancellation");
      this.$router.push("/");
    },
    goHome() {
      this.$router.push("/home");
    },
    handleClick() {
      if (this.userName) {
        if (this.isAdmin) {
          this.$router.push("/admin");
        } else {
          this.$router.push("/personal/personalData");
        }
      } else {
        this.$router.push("/account");
      }
    },
    goCart()
    {
      this.$router.push("/personal/cart");
    },
    handleCommand(command)
    {
      this.$router.push("/personal/order/"+command);
    }
  }
};
</script>
<style lang="scss" scoped>
.account,
.cancel,
.cart {
  color: inherit;
}
.tool-bar:hover {
  cursor: pointer;
}
.home-img {
  height: 16px;
  width: 16px;
  display: inline-block;
  background: url("./imgs/home.png") no-repeat;
  vertical-align: text-bottom;
  margin-right: 5px;
}
.tool-bar-item:hover > .home-img {
  background: url("./imgs/home_active.png") no-repeat;
}
.cart-img {
  height: 16px;
  width: 16px;
  display: inline-block;
  background: url("./imgs/cart.png") no-repeat;
  vertical-align: text-bottom;
  margin-right: 5px;
}
.tool-bar-item:hover > .cart-img {
  background: url("./imgs/cart_active.png") no-repeat;
}
.tool-bar {
  color: #606266;
  width: 100%;
  border-bottom: 1px solid #eee;
  background: #f5f5f5;
  line-height: 35px;
  height: 35px;
  padding: 0 10%;
  list-style: none;
  margin: 0;
  .tool-bar-item {
    display: block;
    float: right;
    height: 100%;
    font-size: 14px;
    padding: 0 16px;
    text-align: center;
  }
  .tool-bar-item:first-of-type {
    float: left;
  }
  .tool-bar-item:hover,
  .el-dropdown:hover {
    color: #66b1ff;
    background-color: #fff;
  }
  .el-dropdown-link > .el-icon-arrow-down.el-icon--right {
    transform: rotateZ(0deg);
    transition: all 0.2s linear;
  }
  .el-dropdown-link:hover > .el-icon-arrow-down.el-icon--right {
    transform: rotateZ(-180deg);
    transition: all 0.2s linear;
  }
  .el-dropdown-link {
    height: 100%;
    width: 100%;
    display: inline-block;
  }
}
</style>



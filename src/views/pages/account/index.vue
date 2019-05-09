<template>
  <div class="account">
    <transition name="el-zoom-in-top">
      <login v-if="isLogin" :loginIcon="loginIcon" @toggleLogin='toggleLogin' :back='back'/>
    </transition>

    <transition name="el-zoom-in-top">
      <register v-if="!isLogin" :loginIcon="loginIcon" @toggleLogin='toggleLogin'/>
    </transition>
  </div>
</template>
<script>
import login from "./components/login";
import register from "./components/register";
export default {
  name: "loginOrRegister",
  data() {
    return {
      loginIcon: {
        user: require("./imgs/user.png"),
        psw: require("./imgs/lock.png")
      },
      isLogin: false,
      back:''
    };
  },
  components: {
    login,
    register
  },
  mounted() {
    this.isLogin = true;
    this.back = this.$route.query.back || 0
  },
  methods: {
    toggleLogin()
    {
      this.isLogin=!this.isLogin
    }
  }
};
</script>
<style lang="scss" scoped>
.bt {
  width: 100%;
}
.img {
  display: block;
  margin: 8px 0;
}
.label {
  color: #fff;
}
.title {
  height: 30%;
  font-size: 20px;
  font-weight: 400;
  line-height: 60px;
  color: #fff;
  text-align: center;
}
.account {
  height: 100%;
  width: 100%;
  background: url("./imgs/bg.jpg") no-repeat;
  background-size: 100% 100%;
}
.login-form {
  width: 400px;
  background: #fff;
  border-radius: 6px;
  position: absolute;
  top: 25%;
  left: 60%;
  background: rgba(0, 0, 0, 0.2);
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.register-form {
  width: 400px;
  background: #fff;
  border-radius: 6px;
  position: absolute;
  top: 25%;
  left: 60%;
  background: rgba(0, 0, 0, 0.2);
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.leftBt,
.rightBt {
  font-size: 12px;
  color: #fff;
}
.leftBt:hover,
.rightBt:hover {
  text-decoration: underline;
  cursor: pointer;
}
.leftBt {
  float: left;
}
.rightBt {
  float: right;
}
</style>



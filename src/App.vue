<template>
  <div id="app">
    <router-view/>
    <suspension/>
    <!-- <a class="service" target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=28449484&site=qq&menu=yes"><img border="0" src="http://wpa.qq.com/pa?p=2:28449484:53" alt="点击联系管理员" title="点击联系管理员"/></a> -->
  </div>
</template>
<script>
import io from "socket.io-client";
import suspension from './components/suspension'
export default {
  name: "app",
  data() {
    return {};
  },
  components:{
    suspension
  },
  mounted() {
    if (!this.$store.state.socket) {
      const socket = io("http://120.79.249.6:3000");
      socket.on("connect", () => {
        this.$store.commit("setSocket", socket);
        socket.on("getOrder", () => {
          if (this.$store.state.userMsg.root) {
            this.$notify({
              title: "提示",
              message: "收到新的订单，点击跳转查看",
              type: "success",
              onClick: () => {
                this.$router.push("/admin/orderManagement");
              }
            });
          }
        });
      });
    }
  }
};
</script>

<style lang="scss">
html,
body {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}
* {
  box-sizing: border-box;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  width: 100%;
}
a {
  text-decoration: none;
  color: inherit;
}
.clearfix::after {
  height: 0;
  display: block;
  content: "";
  clear: both;
  visibility: hidden;
}
.el-menu-vertical-demo {
  width: 250px;
  min-height: 570px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.search-wrap .el-input.el-input--suffix,
.search-form .el-input.el-input--suffix {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
.el-input.el-input--mini.el-input--suffix {
  width: 100%;
}
.el-table .warning-row {
  background: oldlace;
}
</style>

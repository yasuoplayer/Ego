<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
import io from "socket.io-client";
export default {
  name: "app",
  data() {
    return {};
  },
  mounted() {
    const socket = io("http://localhost:3000");
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
    })
    this.checkLocalStorage()
  },
  methods:{
    checkLocalStorage()
    {
      if(localStorage.getItem('egoUserMsg'))
      {
                  this.$axios({
            method: "post",
            url: "/ego/user/login",
            data: JSON.parse(localStorage.getItem('egoUserMsg'))
          }).then(res => {
            if (res.data.code) {
              this.$store.commit("setUserMsg", res.data.data);
              if (res.data.data.phone||res.data.data.root) {
                this.$router.push("/");
              } else {
                this.$message({
                  type: "warning",
                  message: "请先填写个人信息哦"
                });
                this.$router.push("/personal/personalData");
              }
            } else {
              this.$message({
                type: "error",
                message: res.data.msg
              });
            }
          });
      }
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

.search-wrap .el-input.el-input--suffix {
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

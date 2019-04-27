<template>
      <div class="register-form" v-loading='loading'>
        <div class="title">快速注册</div>
        <el-form :model="form" :rules="rules" ref="form" label-width="50px">
          <el-form-item prop="user">
            <div class="label" slot="label">帐号</div>
            <el-input type="text" v-model="form.user" clearable>
              <img slot="prefix" v-lazy="loginIcon.user" class="img">
            </el-input>
          </el-form-item>
          <el-form-item prop="psw">
            <div class="label" slot="label">密码</div>
            <el-input type="password" v-model="form.psw" autocomplete="off" clearable>
              <img slot="prefix" v-lazy="loginIcon.psw" class="img">
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm" class="bt">注册</el-button>
            <span class="leftBt" @click="toggleLogin">前往登录</span>
            <span class="rightBt" @click="goHome">返回主页</span>
          </el-form-item>
        </el-form>
      </div>
</template>
<script>
export default {
  name: "register",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };

    var validateUser = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    return {
      form: {
        psw: "",
        user: ""
      },
      rules: {
        psw: [{ validator: validatePass, trigger: "blur" }],
        user: [{ validator: validateUser, trigger: "blur" }]
      },
      loading:false
    };
  },
  mounted() {
    this.isLogin = true;
  },
    props:{
      loginIcon:{
          type:Object
      }
  },
  methods: {
    submitForm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading=true
          this.$axios({
            url:'/ego/user/register',
            method:'post',
            data:this.form
          }).then(res=>{
            if(res.data.code)
            {
              this.loading=false
              this.$message({
                type:'success',
                message:res.data.msg
              })
              this.toggleLogin()
            }
            else{
              this.loading=false
              this.$message({
                type:'error',
                message:res.data.msg
              })
            }
          })
        } else {
          return false;
        }
      });
    },
    toggleLogin() {
        this.$emit('toggleLogin')
    },
    goHome() {
      this.$router.push("/home");
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



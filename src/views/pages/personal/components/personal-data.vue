<template>
  <div class="personal-data">
    <el-form label-position="left" label-width="80px" :model="form" class="form">
      <div class="form-title">个人信息</div>
      <el-form-item label="用户帐号">
        <el-input v-model="form.user" disabled></el-input>
      </el-form-item>
      <el-form-item label="用户手机">
        <el-input v-model="form.phone" clearable></el-input>
      </el-form-item>
      <el-form-item label="用户邮箱">
        <el-input v-model="form.email" clearable></el-input>
      </el-form-item>
      <el-form-item label="用户密码">
        <el-input v-model="form.psw" type="password" clearable show-password></el-input>
      </el-form-item>
      <el-form-item label="用户地区">
        <mtv-province
          useElementUI
          ref="mtvProvince"
          :level="3"
          :province="form.province"
          :area="form.area"
          :city="form.city"
        ></mtv-province>
      </el-form-item>
      <el-form-item label="详细地点">
        <el-input
          type="textarea"
          :rows="3"
          resize="none"
          v-model="form.more"
          clearable
          :maxlength="30"
          placeholder="长度不得查过三十个字符"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
      </el-form-item>
    </el-form>
    <div class="money-wrap">
      <el-card shadow="hover">
        <div slot="header" class="clearfix">
          <span>账户余额</span>
        </div>
        <div class="money">
          <span class="symbol">￥</span>
          <span class="money-number">{{form.money}}</span>
          <span class="symbol">.00</span>
        </div>
        <div class="clearfix">
          <el-button type="text" class="fl" @click="handleMoney('+')">充值</el-button>
          <el-button type="text" class="fr" @click="handleMoney('-')">提现</el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
import MtvProvince from "moretv-province";
export default {
  name: "personalData",
  data() {
    return {
      form: {
        user: "",
        phone: "",
        email: "",
        psw: "",
        province: "",
        city: "",
        area: "",
        more: "",
        money: 0
      }
    };
  },
  components: { MtvProvince },
  created() {
    this.getUserMsg();
  },
  methods: {
    getUserMsg() {
      this.form = this.$store.state.userMsg;
    },
    handleMoney(flag) {
      this.$prompt("请输入金额", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^(0|[1-9][0-9]*)$/,
        inputErrorMessage: "请输入非0开头的正整数"
      })
        .then(({ value }) => {
          var money;
          if (flag == "+") {
            money = parseInt(this.form.money) + parseInt(value);
          } else {
            if (parseInt(value) > parseInt(this.form.money)) {
              this.$message({
                type: "error",
                message: "金额不足"
              });
              return;
            }
            money = parseInt(this.form.money) - parseInt(value);
          }
          this.$axios({
            url: "/ego/user/updateMoney",
            method: "post",
            data: {
              user: this.form.user,
              money
            }
          }).then(res => {
            if (res.data.code) {
              this.$message({
                type: "success",
                message: "操作成功"
              });
              this.$store.commit("setUserMsg", res.data.data);

              this.getUserMsg();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    save() {
      var data = this.$refs.mtvProvince.getData();
      this.form.area = data.area.name;
      this.form.city = data.city.name;
      this.form.province = data.province.name;
      var obj = {
        user: this.form.user,
        phone: this.form.phone,
        email: this.form.email,
        psw: this.form.psw,
        province: this.form.province,
        city: this.form.city,
        area: this.form.area,
        more: this.form.more
      };
      this.$axios({
        url: "/ego/user/update",
        method: "post",
        data: obj
      }).then(res => {
        if (res.data.code) {
          this.$message({
            message: "更新成功",
            type: "success"
          });
          this.$store.commit("setUserMsg", res.data.data);
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.fl {
  float: left;
}
.fr {
  float: right;
}
.symbol {
  color: red;
  font-size: 14px;
}

.money-number {
  color: red;
  font-size: 30px;
  font-weight: bold;
}
.personal-data {
  width: 100%;
  height: 100%;
  overflow: auto;
  display: flex;
}
.form {
  min-width: 600px;
  padding: 10px;
}
.money-wrap {
  flex: 1;
  padding: 10px;
}
.form-title {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
  padding-left: 10px;
  text-align: center;
}
.money-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  padding: 10px;
  padding-left: 10px;
  text-align: center;
  background: #ccc;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}
</style>



<template>
    <div class="personal-data"  >
        <el-form label-position="left" label-width="80px" :model="form" class="form">
        <div class="form-title">
            个人信息
        </div>
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
            <v-distpicker :province="form.address.province"  :city="form.address.city"  :area="form.address.area" ></v-distpicker>
        </el-form-item>
        <el-form-item label="详细地点">
            <el-input type="textarea" :rows='3' resize='none' v-model="form.address.more" clearable :maxlength='30' placeholder='长度不得查过三十个字符'></el-input>
        </el-form-item>
        <el-form-item >
            <el-button type="primary">保存</el-button>
        </el-form-item>
        </el-form>
        <div class="money-wrap">
            <el-card  shadow="hover">
            <div slot="header" class="clearfix">
                <span>账户余额</span>
            </div>
            <div class="money">
                <span class="symbol">￥</span>
                <span  class="money-number">{{form.money}}</span>
                <span class="symbol">.00</span>
            </div>
            <div class=" clearfix">
          <el-button type="text" class="fl">充值</el-button>
          <el-button type="text" class="fr">提现</el-button>
        </div>
            </el-card>
        </div>
    </div>
</template>
<script>
import VDistpicker from 'v-distpicker'
export default {
    name:'personalData',
    data()
    {
        return {
            form:{
                user:'',
                phone:'',
                email:'',
                psw:'',
                address:{
                    province:'省',
                    city:'市',
                    area:'区',
                    more:''
                },
                money:100
            },
            
        }
    },
    components: { VDistpicker },
    methods:{       
    }
}
</script>
<style lang="scss" scoped>
.fl{
    float: left;
}
.fr{
    float: right
}
.symbol
{
    color: red;
    font-size: 14px;
}

.money-number{
    color: red;
    font-size: 30px;
    font-weight: bold
}
.personal-data{
    width: 100%;
    height: 100%;
    overflow: auto;
    display: flex;
}
.form{
    min-width: 650px;
    padding: 10px;
}
.money-wrap{
    flex: 1;
    padding: 10px;
   
}
.form-title{
    font-size: 24px;
    font-weight: bold;
    color: #333;
    margin-bottom: 10px;
    padding-left:10px;
    text-align: center
}
.money-title{
    font-size: 18px;
    font-weight: bold;
    color: #333;
    padding: 10px;
    padding-left:10px;
    text-align: center;
    background: #ccc    
}
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }


</style>



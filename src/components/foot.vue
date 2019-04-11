<template>
  <div class="foot">
    <div class="imgs">
      <div class="img-box" v-for="(item,index) in footImg" :key="index">
        <img v-lazy="item.img" class="img">
        <div class="img-msg">
          <div class="msg1">{{item.msg1}}</div>
          <div class="msg2">{{item.msg2}}</div>
        </div>
      </div>
    </div>
    <div class="help">
      <el-row>
        <el-col :span="6" v-for="(listItem,index) in footMsg" :key="index">
          <ul class="help-type">
            <li class="help-item" v-for="(item,i) in listItem" :key="i">{{item}}</li>
          </ul>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
var footImg =[
  {
    img:require('./imgs/foot1.jpg'),
    msg1:'正品保障',
    msg2:'正品保障、提供发票'
  },
  {
    img:require('./imgs/foot2.jpg'),
    msg1:'急速物流',
    msg2:'如约送货、送货入户'
  },
  {
    img:require('./imgs/foot3.jpg'),
    msg1:'售后无忧',
    msg2:'30天包退、365天包换'
  },
  {
    img:require('./imgs/foot4.jpg'),
    msg1:'帮助中心',
    msg2:'您的购物指南'
  },
  {
    img:require('./imgs/foot5.jpg'),
    msg1:'正品保障',
    msg2:'正品保障、提供发票'
  }        
]
var footMsg =[
  [
    '购物指南',
    '导购演示',
    '免费注册',
    '会员等级',
    '常见问题',
    '品牌大全'
  ],
   [
    '支付方式',
    '网银支付',
    '快捷支付',
    '分期支付',
    '任性付支付',
    '货到付款',
  ],
    [
    '物流配送',
    '免运费政策',
    '物流配送服务',
    '签收验货',
    '物流查询',
  ],
    [
    '售后服务',
    '退换货政策',
    '贵就赔',
    '维修/安装',
    '订单修改',
    '退换货申请',
    '我的发票'
  ], 
]
export default {
  name: "foot",
  data() {
    return {
      footImg,
      footMsg
    };
  }
};
</script>
<style lang="scss" scoped>
.help-type {
  padding: 0;
  margin: 0;
  list-style: none;
}
.help-type > li {
  text-align: center;
}
.help-item{
  font-weight: 700;
  color: #545454;
  height: 30px;
  line-height: 30px;
  font-size: 14px;
}
.help-item:nth-of-type(n+2)  {
  font-size: 12px;
  color: #545454;
  height: 20px;
  line-height: 20px;
}
.help-item:nth-of-type(n+2):hover {
  color: #f60;
  cursor: pointer;
}

.msg1 {
  color: #333;
  font-weight: 700;
}
.msg1:hover {
  color: #3284e5;
  cursor: pointer;
}
.msg2 {
  color: #545454;
  font-size: 12px;
}
.foot {
  width: 100%;
  background: #f5f5f5;
  border-top: 1px solid #e7e7e7;
  padding: 10px 10%;
}
.imgs {
  display: flex;
  border-bottom: 1px solid #eaeaea;
  padding-bottom: 20px;
  padding-top: 20px;
  margin-bottom: 20px;
}
.img-box {
  display: flex;
  flex: 1;
}
.img {
  display: block;
  height: 48px;
  width: 48px;
  margin: 10px auto;
}
</style>



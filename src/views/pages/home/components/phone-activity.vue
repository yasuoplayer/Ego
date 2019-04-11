<template>
  <div class="phone-activity">
    <el-row :gutter="6">
    <el-col :span="6" v-for="(item,index) in list" :key="index">
      <el-card  class="card">
        <p class="name">{{item.name}}</p>
        <p class="desc">{{item.desc}}</p>
        <img v-lazy="item.src" class="phone-img">
      </el-card>
    </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "phone-activity",
  data() {
    return {
      list:[
        {
          name:'手机大牌狂欢',
          desc:'爆款五折起',
          src:require('../imgs/phone_active1.png')
        },
                {
          name:'手机新品专题',
          desc:'华为P30预定享多重礼',
          src:require('../imgs/phone_active2.png')
        },
                {
          name:'手机大牌正品好货狂欢',
          desc:'华为P30 0元试用',
          src:require('../imgs/phone_active3.png')
        },
                {
          name:'手机数码',
          desc:'每满500减50',
          src:require('../imgs/phone_active4.png')
        }
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
.card:hover{
    background: linear-gradient(to top, #3757fa ,#3284e5);
    cursor: pointer;
}
.card:hover .name,.card:hover .desc{
    color:#fff
}
.name {
  text-align: center;
  color: #333;
  font: bold 18px/25px "Microsoft Yahei", tahoma, arial, "Hiragino Sans GB";
  height: 25px;
}
.desc {
  height: 20px;
  color: #999;
  text-align: center;
  font: 14px/20px "Microsoft Yahei", tahoma, arial, "Hiragino Sans GB";
}
.phone-activity {
  padding: 30px 10%;
  background: #f2f2f2;
}
.phone-img {
  width: 80%;
  margin: 0 auto;
  display: block;
}
</style>



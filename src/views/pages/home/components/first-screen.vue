<template>
  <div class="first-screen">
    <div class="left-screen">
      <div class="classification">
        <span class="classification-img"></span>
        商品分类
      </div>
      <div class="classification-list">
        <div class="list-item">
          <div class="item-title">
            <span class="title-content">大牌畅销</span>
          </div>
          <ul class="phone-list clearfix">
            <li class="phone" v-for="(item,index) in phoneList" :key="index">
              <span class="phone-name" @click="goto(item)">{{item}}</span>
            </li>
          </ul>
        </div>
      </div>
            <div class="classification-list">
        <div class="list-item">
          <div class="item-title">
            <span class="title-content">搞机达人</span>
          </div>
          <ul class="phone-list clearfix">
            <li class="phone">
              <span class="phone-name">全部手机</span>
            </li>
            <li class="phone">
              <span class="phone-name">游戏手机</span>
            </li>
            <li class="phone">
              <span class="phone-name">拍照手机</span>
            </li>
            <li class="phone">
              <span class="phone-name">女性手机</span>
            </li>
            <li class="phone">
              <span class="phone-name">老人手机</span>
            </li>
            <li class="phone">
              <span class="phone-name">全面屏</span>
            </li>
          </ul>
        </div>
      </div>
            <div class="classification-list">
        <div class="list-item">
          <div class="item-title">
            <span class="title-content">手机配件</span>
          </div>
          <ul class="phone-list clearfix">
            <li class="phone">
              <span class="phone-name">手机贴膜</span>
            </li>
            <li class="phone">
              <span class="phone-name">数据线</span>
            </li>
            <li class="phone">
              <span class="phone-name">手机壳</span>
            </li>
            <li class="phone">
              <span class="phone-name">移动电源</span>
            </li>
            <li class="phone">
              <span class="phone-name">智能穿戴</span>
            </li>
            <li class="phone">
              <span class="phone-name">蓝牙耳机</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="right-screen">
            <el-carousel height="381px" >
            <el-carousel-item v-for="(item,index) in banner" :key="index">
            <img v-lazy='item' class="banner">
            </el-carousel-item>
        </el-carousel>
    </div>
  </div>
</template>
<script>
export default {
  name: "first-screen",
  data() {
    return {
      banner:[
        require('../imgs/banner1.png'),
        require('../imgs/banner2.png'),
        require('../imgs/banner3.png'),
        require('../imgs/banner4.png')
      ],
      phoneList:['苹果','小米','荣耀','华为','vivo','oppo',]
    };
  },
  methods:{
    goto(brand)
    {
      this.$router.push({
        path:'/result',
        query:{
          brand
        }
      })
    }
  }
};
</script>
<style lang="scss" scoped>
.item-title {
  height: 20px;
  line-height: 20px;
  font-size: 14px;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 5px;
  text-indent: 1em;
}
.phone-name:hover {
  cursor: pointer;
  color: #66b1ff;
}
.title-content:hover {
  color: red;
  cursor: pointer;
}
.phone {
  width: 80px;
  float: left;
  color: #666;
  padding-right: 15px;
  padding-bottom: 5px;
  text-align: center;
  font-size: 12px;
}
.phone-list {
  list-style: none;
  padding: 0;
  margin: 0;
  border-bottom: 1px dashed #ddd;
}
.phone-list:last-of-type{
    border-bottom:none;
}
.first-screen {
  display: flex;
  padding: 0 10%;
  background: #eee;
}
.left-screen {
  width: 240px;
  background-color: #fff;
  border-radius: 5px;
  overflow: hidden
}
.classification {
  background-color: #3284e5;
  height: 40px;
  line-height: 40px;
  padding-left: 16px;
  color: #fff;
  font-weight: 700;
  font-size: 14px;
}
.classification-img {
  height: 20px;
  width: 20px;
  display: inline-block;
  background: url("../imgs/classification.png") no-repeat 100% 100%;
  vertical-align: text-bottom;
  margin-right: 3px;
}
.right-screen{
    flex: 1;
    position: relative;
}
.banner{
    width: 100%;
    height: 100%;
}
</style>



<template>
  <div class="recommend">
    <div class="recommend-list" v-for='(listItem,index) in list1' :key="index">
      <div class="recommend-name">
        <span class="line1"></span>
        {{listItem.name}}
        <span class="line1"></span>
      </div>
      <div class="recomend-content">
        <div class="content-left">
          <img v-lazy="listItem.letfImg" class="recomend-item-box-left-img">
        </div>
        <div class="content-right">
          <el-carousel indicator-position="none" height="260px" :autoplay="false">
            <el-carousel-item v-for="(item,i) in listItem.rightImgs" :key="i">
              <div class="loop-wrap">
                <div class="loop-item" v-for="(img,i) in item" :key="i">
                  <img v-lazy="img.src" class="phone-img">
                  <div class="name" :title="item.name">{{img.name}}</div>
                  <div class="money">{{img.money||listItem.priceless}}</div>
                </div>
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
    </div>
    <div class="recommend-list">
      <div class="recommend-name">
        <span class="line3"></span>
        {{list2.name}}
        <span class="line3"></span>
      </div>
      <div class="recomend-content clearfix characteristic">
        <div class="recomend-item-box" v-for="(listItem,index) in list2.imgs" :key="index">
          <div class="recomend-item-box-left">
            <img v-lazy="listItem.leftImg" class="recomend-item-box-left-img">
          </div>
          <div class="recomend-item-box-right">
            <el-row :gutter="6">
              <el-col :span="12" v-for="(item,i) in listItem.rightImgs" :key="i">
                <div class="example-phone">
                  <img v-lazy="item.src" class="example-img">
                  <div class="name">{{item.name}}</div>
                  <div class="money">￥{{item.money}}</div>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="6">
              <el-col :span="12">
                <div class="example-phone example-bottom">
                  <img v-lazy="listItem.bottomImg" class="example-img-last">
                </div>
              </el-col>
              <el-col :span="12">
                <div class="example-phone example-bottom">
                  <p class="name">{{listItem.desc1}}</p>
                  <p class="desc">{{listItem.desc2}}</p>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
    </div>
    <div class="recommend-list">
      <div class="recommend-name">
        <span class="line4"></span>
        {{list3.title}}
        <span class="line4"></span>
      </div>
      <div class="parts">
        <el-row :gutter="10">
          <el-col :span="8" v-for='(listItem,index) in list3.items' :key="index" class="space">
            <div class="parts-item">
              <div class="parts-item-header">
                {{listItem.title}}
                <span class="more">
                  更多
                  <i class="el-icon-arrow-right"></i>
                </span>
              </div>
              <div class="shell">
                <el-row :gutter="2">
                  <el-col :span="12" v-for="(item,i) in listItem.items" :key="i" class="space">
                    <div class="shell-item">
                      <img v-lazy="item.img" class="shell-img">
                      <p class="name">{{item.name}}</p>
                      <div class="money">￥{{item.money}}</div>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
var list1 =[
  {
    name:'热卖爆款',
    letfImg:require('../imgs/phone-single-left1.jpg'),
    priceless:'售罄',
    rightImgs:[
        [
          {
            name: "iPhone Xr",
            src: require("../imgs/phone-single-1.jpg"),
            money: "",
            discount: "下单立省"
          },
          {
            name: "华为Mate20 Pro",
            src: require("../imgs/phone-single-2.jpg"),
            money: "￥4899.00",
            discount: "减500"
          },
          {
            name: "Redmi Note 7",
            src: require("../imgs/phone-single-3.jpg"),
            money: "￥1199.00",
            discount: "下单立省"
          },
          {
            name: "荣耀V20",
            src: require("../imgs/phone-single-4.jpg"),
            money: "￥2999.00",
            discount: "券100"
          }
        ],
        [
          {
            name: "OPPO K1",
            src: require("../imgs/phone-single-5.jpg"),
            money: "￥1599.00",
            discount: "优惠50"
          },
          {
            name: "vivo Z3",
            src: require("../imgs/phone-single-6.jpg"),
            money: "￥1648.00",
            discount: "买赠耳机"
          },
          {
            name: "华为Mate20",
            src: require("../imgs/phone-single-7.jpg"),
            money: "￥3999.00",
            discount: "减500"
          },
          {
            name: "荣耀10",
            src: require("../imgs/phone-single-8.jpg"),
            money: "￥2199.00",
            discount: "券200"
          }
        ]
      ]
  },
  {
    name:'新品抢先',
    leftImg:require('../imgs/phone-single-left2.jpg'),
    priceless:'待发布',
    rightImgs:[
        [
          {
            name: "华为P30",
            src: require("../imgs/phone-single-9.jpg"),
            money: "",
            discount: "抢先预定"
          },
          {
            name: "小米9",
            src: require("../imgs/phone-single-10.jpg"),
            money: "￥2999.00",
            discount: "新品预定"
          },
          {
            name: "三星S10",
            src: require("../imgs/phone-single-11.jpg"),
            money: "￥6999.00",
            discount: "分期免息"
          },
          {
            name: "小米9 SE",
            src: require("../imgs/phone-single-12.jpg"),
            money: "￥2299.00",
            discount: "新品预定"
          }
        ],
        [
          {
            name: "荣耀Magic2",
            src: require("../imgs/phone-single-13.jpg"),
            money: "￥3499.00",
            discount: "降300"
          }
        ]
      ]
  }
]
var list2 = {
        name:'特色馆',
        imgs:[
        {
          leftImg: require("../imgs/phone-characteristic-1.jpg"),
          rightImgs: [
            {
              src: require("../imgs/phone-characteristic-1-1.jpg"),
              name: "三星 S10",
              money: "6999.00"
            },
            {
              src: require("../imgs/phone-characteristic-1-2.jpg"),
              name: "vivo X27",
              money: "3598.00"
            }
          ],
          bottomImg: require("../imgs/phone-characteristic-1-3.jpg"),
          desc1: "剖析内芯，高性能手机差旅久续航",
          desc2: "剖析内芯，高性能手机差旅久续航"
        },
        {
          leftImg: require("../imgs/phone-characteristic-2.jpg"),
          rightImgs: [
            {
              src: require("../imgs/phone-characteristic-2-1.jpg"),
              name: "Redmi Note7",
              money: "1399.00"
            },
            {
              src: require("../imgs/phone-characteristic-2-2.jpg"),
              name: "荣耀V20",
              money: "3598.00"
            }
          ],
          bottomImg: require("../imgs/phone-characteristic-2-3.jpg"),
          desc1: "智能添妆，AI手机无惧仓促入镜",
          desc2: "智能添妆，AI手机无惧仓促入镜"
        },
        {
          leftImg: require("../imgs/phone-characteristic-3.jpg"),
          rightImgs: [
            {
              src: require("../imgs/phone-characteristic-3-1.jpg"),
              name: "华为Mate20",
              money: "3999.00"
            },
            {
              src: require("../imgs/phone-characteristic-3-2.jpg"),
              name: "iPhone X",
              money: "5938.00"
            }
          ],
          bottomImg: require("../imgs/phone-characteristic-3-3.jpg"),
          desc1: "当之无愧的性价比之王 Redmi Note 7 Pro和Redmi 7发布",
          desc2:
            "3月18日，小米正式发布Redmi Note 7 Pro及Redmi 7，两款手机的配置"
        },
        {
          leftImg: require("../imgs/phone-characteristic-4.jpg"),
          rightImgs: [
            {
              src: require("../imgs/phone-characteristic-4-1.jpg"),
              name: "RvivoZ3",
              money: "1648.00"
            },
            {
              src: require("../imgs/phone-characteristic-4-2.jpg"),
              name: "AirPods (配充电盒)",
              money: "1505.40"
            }
          ],
          bottomImg: require("../imgs/phone-characteristic-2-3.jpg"),
          desc1: "魅族Note9正式发布，再立千元手机新标杆！",
          desc2:
            "3 月 6 日，魅族科技（MEIZU）正式发布魅族 Note9 手机。3 月 11 日正式发售"
        }
      ]
      }

var list3 = {
  title:'手机配件',
  items:[
  {
    title:'手机壳膜',
    items:[
      {
        name:'倍思（Baseus） 苹果iPhoneXs钢化膜玻璃膜5.8寸全屏覆盖膜钢化玻璃膜苹果保护膜 防摔防指纹全玻璃钢化膜',
        money:'39.00',
        img:require('../imgs/phone-shell-1.jpg')
      },
      {
        name:'倍思（Baseus）iPhone(苹果)XS MAX防摔防指纹全玻璃钢化膜6.5寸全屏覆盖保护膜',
        money:'39.00',
        img:require('../imgs/phone-shell-2.jpg')
      },
            {
        name:'颖果 oppo find X钢化膜 findX曲面手机膜保护膜高清全屏贴膜',
        money:'39.00',
        img:require('../imgs/phone-shell-3.jpg')
      },
            {
        name:'【现货包邮】高端正品魔兽世界星球大战苹果（Iphone)X/XS魔兽世界系列 手机壳 原装正版',
        money:'39.00',
        img:require('../imgs/phone-shell-4.jpg')
      }      
    ]
  },
  {
    title:'充电线材',
    items:[
      {
        name:'新小米（mi）移动电源2 (10000mAh) 黑色 /充电宝 双向快充 （新版）聚合物锂离子电芯;铝合金金属外壳',
        money:'79.00',
        img:require('../imgs/phone-shell-5.jpg')
      },
      {
        name:'小米无线充电器 Qi充电协议 快充支持多种机型智能快充',
        money:'65.00',
        img:require('../imgs/phone-shell-6.jpg')
      },
            {
        name:'倍思BASEUS苹果8/X无线充电器适用iPhone8Plus/X 银色',
        money:'188.00',
        img:require('../imgs/phone-shell-7.jpg')
      },
            {
        name:'罗马仕（ROMOSS）sense6P升级版 LED数显屏 移动电源/充电宝 20000毫安 黑色 苹果/安卓/手机通用',
        money:'109.00',
        img:require('../imgs/phone-shell-8.jpg')
      }      
    ]
  },
  {
    title:'手机支架',
    items:[
      {
        name:'倍思(Baseus)车载手机架支架汽车用磁性出风口吸盘式钕磁铁磁吸万能通用导航出风口式黑色 安卓苹果通用手机座',
        money:'38.00',
        img:require('../imgs/phone-shell-9.jpg')
      },
      {
        name:'ESCASE 指环支架 猫咪指环扣 桌面支架 手机支架 平板支架 车载支架 便携支架 流光银',
        money:'9.90',
        img:require('../imgs/phone-shell-10.jpg')
      },
            {
        name:'洛克（ROCK）车载手机支架 手机汽车出风口卡扣式支架Pro款 深灰色',
        money:'29.00',
        img:require('../imgs/phone-shell-11.jpg')
      },
            {
        name:'洛克（ROCK）车载手机支架 出风口车载支架适用4到6英寸手机树脂版深空灰',
        money:'49.00',
        img:require('../imgs/phone-shell-12.jpg')
      }      
    ]
  },
  {
    title:'耳机音响',
    items:[
      {
        name:'Apple AirPods 蓝牙入耳式耳机iPhone无线手机耳机',
        money:'1345.40',
        img:require('../imgs/phone-shell-13.jpg')
      },
      {
        name:'【惊喜价299】小度 小度在家1S 百度AI人工智能带屏智能音箱 WIFI/蓝牙音响 白色款',
        money:'329.00',
        img:require('../imgs/phone-shell-14.jpg')
      },
            {
        name:'喜马拉雅好声音 小雅AI音箱 AI-001 蓝牙音箱/智能音箱/AI 音箱 红色',
        money:'957.10',
        img:require('../imgs/phone-shell-15.jpg')
      },
            {
        name:'Beats Solo3 Wireless 头戴式耳机 - 红色',
        money:'1688.00',
        img:require('../imgs/phone-shell-16.jpg')
      }      
    ]
  },
  {
    title:'智能穿戴',
    items:[
      {
        name:'Apple Watch Series3 智能手表GPS+蜂窝网络款 38毫米深空灰色铝金属表壳搭配黑色运动型表带',
        money:'2999.00',
        img:require('../imgs/phone-shell-17.jpg')
      },
      {
        name:'小天才儿童电话手表Y01A超长待机360度防水GPS定位智能手表 移动2G学生儿童手表手机手环 男女孩 浅紫色',
        money:'393.00',
        img:require('../imgs/phone-shell-18.jpg')
      },
            {
        name:'倍思BASEUS苹果8/X无线充电器适用iPhone8Plus/X 银色',
        money:'188.00',
        img:require('../imgs/phone-shell-19.jpg')
      },
            {
        name:'小米（MI）小米手环3代（黑色） 智能运动 心率监测 来电、微信、红包提醒 OLED显示屏 时间显示 防水计步器',
        money:'188.00',
        img:require('../imgs/phone-shell-20.jpg')
      }      
    ]
  },
  {
    title:'新奇特',
    items:[
      {
        name:'荣耀honor路由X1增强版白色系 1200Mbps双频优选高速家用盒子形态无线路由器wifi穿墙 中小户型优选',
        money:'129.00',
        img:require('../imgs/phone-shell-21.jpg')
      },
      {
        name:'骑客（CHIC）骑士 智能电动两轮平衡车双轮扭扭车思维车体感车 音速蓝',
        money:'1199.90',
        img:require('../imgs/phone-shell-22.jpg')
      },
            {
        name:'优必选（UBTECH）悟空智能机器人儿童教育陪伴学习4G通话拍照便携高端人形机器人',
        money:'4999.00',
        img:require('../imgs/phone-shell-23.jpg')
      },
            {
        name:'小米（MI）9号平衡车 白色 Ninebot 9号体感车 双轮长续航蓝牙遥控 轻小便携载重王 智能成人平衡车',
        money:'1899.00',
        img:require('../imgs/phone-shell-24.jpg')
      }      
    ]
  }      
]
}

export default {
  name: "recommend",
  data() {
    return {
      list1,
      list2,
      list3
    };
  }
};
</script>
<style lang="scss" scoped>
p.div {
  height: 10px;
}
.parts-item {
  border-radius: 5px;
  overflow: hidden;
}
.space {
  margin-bottom: 2px;
}
.shell-img {
  width: 70%;
  display: block;
  margin: 10px auto;
  transition: all 0.4s linear;
}
.shell-item {
  background: #fff;
  overflow: hidden;
}
.shell-item:hover {
  cursor: pointer;
}
.shell-item:hover .shell-img {
  transform: scale(1.1);
}
.more {
  float: right;
  font-size: 14px;
  margin-right: 6px;
}
.more:hover {
  cursor: pointer;
}
.more i {
  transition: all 0.1s linear;
  position: relative;
  left: 0;
}
.more:hover i {
  left: 6px;
}
.parts-item-header {
  background: rgb(242, 73, 90);
  width: 100%;
  height: 50px;
  color: #fff;
  font: 18px/50px "Microsoft Yahei", tahoma, arial, "Hiragino Sans GB";
  padding-left: 20px;
  overflow: hidden;
}
.parts-item-header:nth-of-type(2) {
  background: rgb(185, 204, 41);
}
.parts-item-header:nth-of-type(3) {
  background: rgb(242, 181, 48);
}
.parts-item-header:nth-of-type(4) {
  background: rgb(92, 204, 167);
}
.parts-item-header:nth-of-type(5) {
  background: rgb(31, 181, 204);
}
.parts-item-header:nth-of-type(6) {
  background: rgb(88, 99, 204);
}
p.name {
  height: 34px;
  color: #333;
  font: 12px/17px "Microsoft Yahei", tahoma, arial, "Hiragino Sans GB";
  margin: 10px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
p.desc {
  color: #999;
  font: 12px/16px "Microsoft Yahei", tahoma, arial, "Hiragino Sans GB";
  margin: 20px 10px;
  letter-spacing: 0.1px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.example-phone {
  background: #fff;
  overflow: hidden;
  height: 270px;
  margin-bottom: 4px;
}
.example-bottom.example-phone {
  height: 114px;
  margin-bottom: 0;
}
.example-img {
  width: 80%;
  height: 76%;
  display: block;
  margin: 10px auto;
}
.example-phone:hover,
.recomend-item-box-left:hover {
  cursor: pointer;
}
.example-phone:hover .example-img,
.example-phone:hover .example-img-last {
  transform: scale(1.1);
  transition: all 0.4s linear;
}
.recomend-item-box-left-img {
  height: 100%;
  width: 100%;
}
.recomend-item-box-right {
  flex: 1;
}
.recomend-content {
  border-radius: 5px;
  overflow: hidden;
  width: 100%;
  display: flex;
}
.characteristic.recomend-content {
  display: block;
}
.recomend-item-box {
  display: flex;
  width: 48%;
  float: left;
}
.recomend-item-box:nth-of-type(1),
.recomend-item-box:nth-of-type(3) {
  margin-right: 2%;
}
.recomend-item-box:nth-of-type(1),
.recomend-item-box:nth-of-type(2) {
  margin-bottom: 1%;
}
.recommend-list {
  padding: 10px 0;
}
.content-left:hover {
  cursor: pointer;
}
.phone-img {
  display: block;
  margin: 10px auto;
  transform: scale(0.9);
  transition: all 0.4s linear;
}
.loop-item:hover {
  cursor: pointer;
}
.loop-item:hover .phone-img {
  transform: scale(1);
}
div.name {
  font: 12px/17px "Microsoft Yahei", tahoma, arial, "Hiragino Sans GB";
  color: #666;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
div.money {
  text-align: center;
  color: #f40;
  font: 18px/25px "Microsoft Yahei", tahoma, arial, "Hiragino Sans GB";
}
.loop-wrap {
  display: flex;
}
.loop-item {
  width: 25%;
}
.content-right {
  flex: 1;
}
.recommend-content {
  background: #fff;
}
.recommend {
  background: #f2f2f2;
  padding: 0 10%;
}
.recommend-name {
  padding: 5px 0;
  height: 55px;
  line-height: 45px;
  text-align: center;
  color: #333;
  font: 30px/42px "Microsoft Yahei", tahoma, arial, "Hiragino Sans GB";
}
.line1 {
  display: inline-block;
  height: 40px;
  vertical-align: bottom;
  width: 3px;
  background: rgb(242, 73, 90);
  margin: 0 4px;
}
.line2 {
  display: inline-block;
  height: 40px;
  vertical-align: bottom;
  width: 3px;
  background: rgb(185, 204, 41);
  margin: 0 4px;
}
.line3 {
  display: inline-block;
  height: 40px;
  vertical-align: bottom;
  width: 3px;
  background: rgb(242, 181, 48);
  margin: 0 4px;
}
.line4 {
  display: inline-block;
  height: 40px;
  vertical-align: bottom;
  width: 3px;
  background: rgb(242, 181, 48);
  margin: 0 4px;
}
</style>


<template>
  <div class="good-data">
    <div>
      <div class="title">数据统计</div>
      <el-form :inline="true" :model="form" :rules="rules" ref="form" class="form">
        <el-form-item label="商品类型" prop="type">
          <el-select v-model="form.type" placeholder="请选择商品类型" class="form">
            <el-option label="手机" value="手机"></el-option>
            <el-option label="配件" value="配件"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="pics">
      <div>
        <div id="pic1"></div>
      </div>
      <div >
        <div id="pic2"></div>
      </div>
    </div>
  </div>
</template>
<script>
import echarts from "echarts";
export default {
  name: "goodData",
  data() {
    return {
      form: {
        type: ""
      },
      rules: {
        type: [
          { required: true, message: "请选择商品类型", trigger: "change" }
        ],
        brand: [
          { required: true, message: "请选择商品品牌", trigger: "change" }
        ]
      },
      myChart1: "",
      myChart2: "",
    };
  },
  mounted() {
    this.myChart1 = echarts.init(document.getElementById("pic1"));
    this.myChart2 = echarts.init(document.getElementById("pic2"));
  },
  methods: {
    getTagData(brand, type) {
      this.$axios({
        method: "get",
        url: "/ego/record/getTagData",
        params: {
          brand,
          type
        }
      }).then(res => {
        if (res.data.code) {
          this.setPic2(res.data.data);
        }
      });
    },
    getTypeData() {
      this.$axios({
        method: "get",
        url: "/ego/record/getTypeData",
        params: {
          type: this.form.type
        }
      }).then(res => {
        if (res.data.code) {
          this.setPic1(res.data.data);
        }
      });
    },
    onSubmit() {
      var _this = this;
      this.$refs.form.validate(valid => {
        if (valid) {
          this.getTypeData();
        } else {
          return false;
        }
      });
    },
    setPic2(data) {
      var _this = this;
      var title = ["游戏手机", "拍照手机", "女性手机", "老人手机", "全面屏"];
      if (this.form.type == "配件") {
        title = [
          "手机壳膜",
          "充电线材",
          "手机支架",
          "耳机音响",
          "智能穿戴",
          "新奇特"
        ];
      }
      var option = {
        title: {
          text: "销售情况",
          subtext: `总数：${data.total}台`,
          x: "center"
        },
        color: ["#3398DB"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: title,
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "直接访问",
            type: "bar",
            barWidth: "60%",
            data: data.data
          }
        ]
      };
      this.myChart2.setOption(option);
    },
    setPic1(data) {
      var _this = this;
      var option = {
        title: {
          text: "销售情况",
          subtext: `总数：${data.total}台`,
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: ["华为", "小米", "苹果", "荣耀", "vivo", "oppo", "其他"]
        },
        series: [
          {
            name: "销售数量",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: data.data,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };
      this.myChart1.setOption(option);
      this.myChart1.on("click", params => {
        this.getTagData(params.name, this.form.type);
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.title {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
  padding-left: 10px;
  text-align: center;
}
.form {
  text-align: center;
}
.good-data {
  display: flex;
  flex-direction: column;
}
.pics {
  flex: 1;
  overflow: hidden;
  display: flex;
  box-sizing: border-box;
}
.pics > div {
  flex: 1;
  padding: 10px;
}
.pics > div > div {
  height: 100%;
  width: 100%;
}
</style>

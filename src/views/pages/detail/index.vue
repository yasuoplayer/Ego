<template>
  <div class="detail">
    <div class="base">
      <vue-photo-zoom-pro class="img" :scale="1.5" :url="img"></vue-photo-zoom-pro>
      <commodityOption ref="commodityOption"/>
    </div>
    <phoneParameter/>
  </div>
</template>
<script>
import vue from "vue";
import VuePhotoZoomPro from "vue-photo-zoom-pro";
import commodityOption from "./components/commodity-option";
import phoneParameter from "./components/phone-parameter";
vue.use(VuePhotoZoomPro);
var img = require("./imgs/phone1.png");
export default {
  name: "detail",
  data() {
    return {
      img
    };
  },
  components: {
    commodityOption,
    phoneParameter
  },
  mounted() {
    this.id = this.$route.params.id;
    this.getData();
  },
  methods: {
    getData() {
      this.$axios({
        url: "/ego/good/findById",
        params: {
          _id: this.id
        }
      }).then(res => {
        this.img = "http://localhost:3000/" + res.data.data.img;
        this.$refs.commodityOption.setData(this.handleData(res.data.data));
      });
    },
    handleData(data) {
      var isDefult = false;
      var colors = [];
      var memorys = [];
      var config = data.config;
      var defaultOption = {};
      var minPrice = data.config[0].price;
      for (var n = 0; n < config.length; n++) {
        if (config[n].price <= minPrice && config[n].number > 0) {
          isDefult = true;
          minPrice = config[n].price;
          defaultOption = config[n]
        }
        if (colors.indexOf(config[n].color) == -1) {
          colors.push(config[n].color);
        }
        if (memorys.indexOf(config[n].memory) == -1) {
          memorys.push(config[n].memory);
        }
      }
      if (isDefult) {
        data.defaultOption = defaultOption;
      }
      data.memorys = memorys;
      data.colors = colors;
      return data;
    }
  }
};
</script>
<style lang="scss" scoped>
.base {
  display: flex;
}
.detail {
  padding: 10px 10%;
}
.img {
  width: 500px;
  height: 500px;
}
</style>



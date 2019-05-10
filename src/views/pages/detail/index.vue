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
export default {
  name: "detail",
  data() {
    return {
      img:'',
      id:-1,
      isPhone:true
    };
  },
  components: {
    commodityOption,
    phoneParameter
  },
  watch:{
    '$route'(to){
    this.id = to.query.id;
    this.isPhone = to.query.isPhone
    this.getData();      
    }
  },
  mounted() {
    this.id = this.$route.query.id;
    this.isPhone = this.$route.query.isPhone
    this.getData();
  },
  methods: {
    getData() {
      var params = {
          _id: this.id,
          isPhone:this.isPhone?1:0
        }
      this.$axios({
        url: "/ego/good/findById",
        params,
        method:'get'
      }).then(res => {
        if(res.data.code)
        {
        this.img = "http://120.79.249.6:3000/" + res.data.data.img;
        if(res.data.isPhone==1)
        {
          this.$refs.commodityOption.setData(this.handleData(res.data.data));
        }
        else{
          this.$refs.commodityOption.setData(res.data.data)
        }
        }

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



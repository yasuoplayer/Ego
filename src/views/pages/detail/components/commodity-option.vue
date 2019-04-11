<template>
  <div class="commodity-option">
    <div class="name">HUAWEI/华为Mate 20 Pro 亮黑色（UD）8GB+128GB 屏下指纹版麒麟980芯片全面屏徕卡三摄移动联通电信4G全网通手机</div>
    <el-form label-position="left" label-width="70px" :model="form">
      <el-form-item label="市场价">
        <div class="price">
          ￥
          <span class="price-number">{{form.price}}</span>.00
        </div>
      </el-form-item>
      <el-form-item label="会员价">
        <div class="price">
          ￥
          <span class="price-number">{{form.price-200}}</span>.00
          <el-popover placement="top" trigger="hover">
            <span>在本站历史消费不小于五千人民币即可成为会员哦</span>
            <el-button slot="reference" type="text" size="mini">如何成为会员？</el-button>
          </el-popover>
        </div>
      </el-form-item>

      <el-form-item label="颜色">
        <el-radio-group v-model="form.color" size="small">
          <el-radio label="red" border>红</el-radio>
          <el-radio label="black" border>蓝</el-radio>
          <el-radio label="yellow" border>黄</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="内存">
        <el-radio-group v-model="form.memory" size="small">
          <el-radio label="16g" border>16g</el-radio>
          <el-radio label="32g" border>32g</el-radio>
          <el-radio label="64g" border>64g</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="数量">
        <el-input-number v-model="form.num"  :min="1" :max="10" :step="1" :precision="0"></el-input-number>
      </el-form-item>      
      <el-form-item>
        <el-button>加入购物车</el-button>
        <el-button type="primary">立即购买</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "commodityOption",
  data() {
    return {
      form: {
        price: 5499,
        memory: "",
        num:1
      }
    };
  },
  props: {
    id: {
      require: true
    }
  },
  mounted() {
    console.log(this.id);
  }
};
</script>
<style lang="scss" scoped>
.commodity-option {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.name {
  font: 700 16px/1.5 \5fae\8f6f\96c5\9ed1;
  color: #222;
  word-break: break-all;
  min-height: 24px;
  margin-bottom: 10px;
}
.price-number {
  font: 700 30px Tahoma;
}
.price {
  height: 40px;
  line-height: 40px;
  font: 700 20px Tahoma;
  color: #e00;
}
</style>



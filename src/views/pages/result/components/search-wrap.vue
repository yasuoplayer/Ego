<template>
  <div class="search-wrap">
    <div class="title">
      筛选条件：
    </div>
    <ul class="filter">
      <li class="filter-list" v-for="(listItem,index) in fileterMsg" :key="index">
        <span class="filter-list-title">{{listItem.title}}</span>
        <el-radio-group
          v-model="filter[listItem.type]"
          v-if="listItem.type!='sort'"
          @change="change"
        >
          <el-radio v-for="(item,i) in listItem.list" :key="i" :label="item">{{item}}</el-radio>
        </el-radio-group>
        <el-radio-group
          v-model="filter[listItem.type]"
          size="small"
          v-else
          @change="change"
        >
          <el-radio-button v-for="(item,i) in listItem.list" :key="i" :label="item">{{item}}</el-radio-button>
        </el-radio-group>
      </li>
    </ul>
  </div>
</template>
<script>
var fileterMsg = [
  {
    title: "品牌",
    type: "brand",
    list: ["苹果", "小米", "华为","荣耀" ,"vivo" ,"oppo" ,"其他","全部品牌"]
  },
  {
    title: "价格",
    type: "price",
    list: ["0-2000", "2000-4000", "4000以上", "全部价格"]
  },
  {
    title: "排序",
    type: "sort",
    list: ["销量高到低", "好评高到低", "价格高到低", "价格低到高", "默认排序"]
  }
];
export default {
  name: "search-wrap",
  data() {
    return {
      fileterMsg,
    };
  },
  props:{
    filter:{
      type:Object,
      default:function()
      {
        return { brand: "全部品牌", price: "全部价格", sort: "默认排序" }
      }
    }
  },
  methods: {
    change() {
      this.$emit('filterChange')
      
    }
  }
};
</script>

<style lang="scss" scoped>
.tag {
  margin-right: 6px;
}
.title {
  color: #666;
  font-size: 14px;
}
.filter {
  margin: 0;
  padding: 0;
  list-style: none;
  border-top: 1px dotted #eee;
  margin-bottom: 10px;
}
.filter-list {
  border-bottom: 1px dotted #eee;
  padding: 2px 0;
}
.filter-list-title {
  display: inline-block;
  width: 100px;
  color: #999;
  font-size: 13px;
  line-height: 30px;
  height: 30px;
}
</style>

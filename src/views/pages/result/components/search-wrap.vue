<template>
  <div class="search-wrap">
    <div class="title">
      筛选条件：
      <el-tag class="tag" v-for="(tag,index) in tags" :key="index" closable @close='deleteTag(tag.type)'>{{tag.val}}</el-tag>
    </div>
    <ul class="filter">
      <li class="filter-list" v-for="(listItem,index) in fileterMsg" :key="index">
        <span class="filter-list-title">{{listItem.title}}</span>
        <el-radio-group
          v-model="filter[listItem.type]"
          v-if="listItem.type!='sort'"
          @change="change(listItem.type)"
        >
          <el-radio v-for="(item,i) in listItem.list" :key="i" :label="item">{{item}}</el-radio>
        </el-radio-group>
        <el-radio-group
          v-model="filter[listItem.type]"
          size="small"
          v-else
          @change="change(listItem.type)"
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
    list: ["苹果", "小米", "华为" ,"全部品牌"]
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
      filter: { brand: "全部品牌", price: "全部价格", sort: "默认排序" },
      fileterMsg,
      tags: []
    };
  },
  methods: {
    deleteTag(
      type //删除tag
    ) {
      for (var n = 0; n < this.tags.length; n++) {
        if (this.tags[n].type == type) {
          this.tags.splice(n, 1);
          break;
        }
      }
    },
    change(type) {
        // console.log(type, this.filter[type]);
      if (
        this.filter[type] == "全部价格" ||
        this.filter[type] == "默认排序" ||
        this.filter[type] == "全部品牌"
      ) {
        this.deleteTag(type);
        return;
      }
      var isFind = false; //当所选值不为全部的时候
      for (var n = 0; n < this.tags.length; n++) {
        if (this.tags[n].type == type) {
            this.tags.splice(n, 1);
          this.tags.push({
            type,
            val: this.filter[type]
          });
          isFind = true;
          break;
        }
      }
      if (isFind) return;
      else {
        this.tags.push({
          type,
          val: this.filter[type]
        });
      }
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

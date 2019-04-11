<template>
  <div class="headerSearch">
    <div class="logo">
      <img v-lazy="logo" class="logo-img">
      <span class="name">易购 · 手机馆</span>
    </div>
    <div class="search-form">
      <el-input placeholder="请输入内容" v-model="searchKey" prefix-icon="el-icon-search" class="search">
        <el-button slot="append" @click="search">搜索</el-button>
      </el-input>
      <div class="recommends clearfix">
        <span class="recommends-item" v-for="(tag,index) in tags" :key="index" :class="{'hot':tag.isHot}">
          {{tag.name}}
        </span>
      </div>
    </div>
  </div>
</template>
<script>
var tags = [
  {
    name:'三星 S10',
    isHot:false
  },
  {
    name:'华为 p30',
    isHot:false
  },
  {
    name:'荣耀 v20',
    isHot:true
  },
  {
    name:'iphone x',
    isHot:false
  },
  {
    name:'红米 note7pro',
    isHot:true
  }     ,
    {
    name:'小米8 青春版',
    isHot:false
  }      
]
export default {
  name: "headerSearch",
  data() {
    return {
      searchKey: "",
      logo:require('../imgs/logo.jpg'),
      tags,
    }
  },
  methods:{
    search()
    {
      this.$router.push('/result/'+this.searchKey)
    }
  }
};
</script>
<style lang="scss" scoped>
.recommends-item {
  float: left;
  white-space: nowrap;
  font-size: 13px;
  margin: 3px 0 3px -11px;
  padding: 0 20px 0 10px;
  border-left: 1px solid #ddd;
  height: 12px;
  line-height: 12px;
  color: #999;
}
.recommends-item:first-of-type {
  border-left: none;
}
.recommends-item:hover{
   color: #66b1ff;
   cursor: pointer;
}
.recommends-item.hot{
  color:red
}
.search {
  max-width: 70%;
  margin-left: 10%;
  height: auto;
}
.name {
  display: inline-block;
  line-height: 160px;
  height: 160px;
  vertical-align: text-bottom;
  color: transparent;
  background-color: black;
  text-shadow: rgba(255, 255, 255, 0.5) 0 5px 6px,
    rgba(255, 255, 255, 0.2) 1px 3px 3px;
  -webkit-background-clip: text;
  font-size: 32px;
}
.headerSearch {
  width: 100%;
  padding: 0 10%;
  display: flex;
  height: 160px;
}
.logo-img {
  height: 160px;
  vertical-align: text-bottom;
  display: inline-block;
}
.search-form {
  flex: 1;
  margin-top: 60px;
}
.recommends {
  padding-left: 10%;
  padding-top: 10px;
}
.el-tag {
  margin-right: 20px;
}
</style>



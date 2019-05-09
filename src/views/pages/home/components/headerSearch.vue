<template>
  <div class="headerSearch">
    <div class="logo">
      <img v-lazy="logo" class="logo-img">
      <span class="name">易购 · 手机馆</span>
    </div>
    <div class="search-form">
      <el-input placeholder="请输入内容" v-model="searchKey"  class="search input-with-select">
            <el-select v-model="type" slot="prepend" placeholder="请选择商品类型">
      <el-option label="手机" value="手机"></el-option>
      <el-option label="配件" value="配件"></el-option>
      <el-option label="全部" value="全部"></el-option>
    </el-select>
        <el-button slot="append" @click="search">搜索</el-button>
      </el-input>
      <div class="recommends clearfix" v-loading='loading'>
        <span class="recommends-item" v-for="(tag,index) in tags" :key="index" :class="{'hot':tag.salesVolume>10}" @click="showDetail(tag._id)">
          {{tag.name}}
        </span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "headerSearch",
  data() {
    return {
      searchKey: "",
      logo:require('../imgs/logo.jpg'),
      tags:[],
      loading:false,
      type:''
    }
  },
  mounted()
  {
    this.getHot()
  },
  methods:{
    search()
    {
      this.$router.push({
        path:'/result',
        query:{
          key:this.searchKey,
          type:this.type
        }
      })
    },
    getHot() {
      this.loading = true
      this.$axios({
        url: "/ego/good/getHotTag"
      }).then(res => {
          this.tags = res.data
          this.loading = false
      });
    },
    showDetail(id)
    {
      this.$router.push({
        path:'/detail',
        query:{
          id,
          isPhone:true
        }
      })
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



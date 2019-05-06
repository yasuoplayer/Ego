<template>
  <div class="comment" v-loading='loading'>
    <el-card class="box-card" v-for="(item,index) in data" :key="index" shadow="hover">
      <div class="text">{{item.comment }}</div>
      <div class="foot">
        <div class="rate">
          <el-rate v-model="item.rate" disabled show-score text-color="#ff9900" score-template="{value}"></el-rate>
        </div>
        <div class="userMsg">
          {{item.user}} <span class="time">{{formatTime(item.comentTime)}}</span>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  name: "comment",
  data() {
    return {
      rate: 3,
      loading:false,
      data:[]
    };
  },
  mounted()
  {
      this.getData(this.$route.params.id)
  },
  methods: {
    getData(goodId)
    {
      this.$axios({
        url:'/ego/record/getComment',
        method:'get',
        params:{
          goodId
        }
      }).then(res=>{
        this.data = res.data
      })
    },
    formatTime(time) {
      function add0(m) {
        return m < 10 ? "0" + m : m;
      }
      var date;
      if (time) {
        date = new Date(time);
      } else {
        date = new Date();
      }

      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      var d = date.getDate();
      var h = date.getHours();
      var mm = date.getMinutes();
      var s = date.getSeconds();
      return (
        y +
        "-" +
        add0(m) +
        "-" +
        add0(d) +
        " " +
        add0(h) +
        ":" +
        add0(mm) +
        ":" +
        add0(s)
      );
    }
  }
};
</script>
<style lang="scss" scoped>
.comment {
  flex: 1;
  overflow-y: auto;
  height: 167px;
}
.foot {
  display: flex;
}
.rate {
  width: 200px;
}
.userMsg {
  flex: 1;
  height: 20px;
  font-size: 14px;
  color: #666;
  line-height: 20px;
  text-align: right
}
.time{
    padding-left: 10px;
}
</style>



<template>
    <div class="parameter-table">
                <table border class="table">
          <tr v-for='(item,index) in tableData' :key='index'>
            <td class="title">{{item.attribute}}</td>
            <td class="msg">{{item.val}}</td>
          </tr>
        </table>
    </div>
</template>
<script>
export default {
    name:'parameter-table',
    data(){
        return {
          goodId:'',
          tableData:[]
        }
    },
    mounted()
    {
      this.goodId = this.$route.params.id
      this.getData()
    },
    methods:
    {
      getData()
      {
        this.$axios({
          url:'/ego/config/getByGoodId',
          method:'post',
          data:{
            goodId:this.goodId
          }
        }).then(res=>{
          console.log(res.data)
          this.tableData = res.data.data.config
        })
      }
    }
}
</script>
<style lang="scss" scoped>
.table {
  width: 100%;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-collapse: collapse;
}
.title {
  width: 20%;
  color: #666;
  background: #f0f0f0;
  text-indent: 1em;
  font-weight: 600;
}
.msg {
  width: 80%;
  color: #666;
  text-indent: 1em;
}
</style>



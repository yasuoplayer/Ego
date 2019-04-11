<template>
    <div class="parameter-table">
                <table border class="table">
          <tr>
            <td class="title">品牌</td>
            <td class="msg">华为</td>
          </tr>
          <tr>
            <td class="title">内存</td>
            <td class="msg">16g/32g/64g</td>
          </tr>
        </table>
    </div>
</template>
<script>
export default {
    name:'parameter-table',
    data(){
        return {}
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



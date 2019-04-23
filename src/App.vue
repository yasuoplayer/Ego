<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
html,body{
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}
*{
  box-sizing: border-box
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  width: 100%
}
a{
  text-decoration: none;
  color:inherit
}
.clearfix::after
{
  height: 0;
  display: block;
  content: '';
  clear: both;
  visibility: hidden;
}
  .el-menu-vertical-demo{
    width: 200px;
    min-height: 570px;
  }
    .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

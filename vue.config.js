
module.exports = {
  devServer: {
    proxy: {
      '/ego': {
        target: 'http://localhost:3000',
        ws: false,
        changeOrigin: true,
        pathRewrite: {
          '/ego': '/'    //代理的路径
        }
      }
    }
  }
}

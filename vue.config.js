const webpack = require("webpack");
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
  },
  configureWebpack: {
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            Popper: ['popper.js', 'default']
          })
    ]
  }  
}

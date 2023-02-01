// 开发环境配置文件
const { merge } = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const devWebpackConfig = merge(baseWebpackConfig,{
  // 这里是开发模式对应的配置
  mode:'development',
  plugins:[
    // Html的配置
    new HtmlWebpackPlugin({
      // 指定打包后的名称
      filename: 'index.html',
      // 用来指定生成HTML的模版
      template: '../src/index.ejs',
      // 指定HTML中使用的变量
      title: 'Webpack.Demo',
    }),
  ]
})

module.exports = devWebpackConfig
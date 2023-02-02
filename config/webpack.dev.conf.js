// 开发环境配置文件
const { merge } = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const devWebpackConfig = merge(baseWebpackConfig, {
  // 这里是开发模式对应的配置
  mode: 'development',
  plugins: [
    new webpack.DefinePlugin({
      // 开发环境下的接口地址
      // 变量值要求是一个代码片段
      API_BASE_API: JSON.stringify('https://api.example.com'),
    }),
    // Html的配置
    new HtmlWebpackPlugin({
      // 指定打包后的名称
      filename: 'index.html',
      // 用来指定生成HTML的模版
      template: './src/index.ejs',
      // 指定HTML中使用的变量
      title: 'Webpack.Demo',
      chunks:['index'] // 指定要加载的JS
    }),
  ],
});

module.exports = devWebpackConfig;

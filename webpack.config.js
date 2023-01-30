const { resolve } = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserWebpackPlugin = require('terser-webpack-plugin');
module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    // 输出文件的目标路径，必须要是绝对路径
    path: resolve(__dirname, 'webpack-study'),
    // 输出文件名称
    filename: 'index.js',
  },
  module: {
    rules: [
      {
        test: /\.s?[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'], // less-loader作用是将less转换成普通的css
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserWebpackPlugin({
      extractComments:false
    }), new CssMinimizerPlugin()],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css', // [name]的意思是保持打包之前的css名字
    }),
    require('autoprefixer'),
    new HTMLWebpackPlugin({
      // 指定打包后的名称
      filename: 'index.html',
      // 用来指定生成HTML的模版
      template: './public/index.html',
      // 指定HTML中使用的变量
      title: 'Webpack.Demo',
      // 压缩HTML
      minify: {
        collapseWhitespace: true, // 折叠空格
        keepClosingSlash: true,
        removeComments: true, // 删除注释
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
      },
    }),
  ],
};

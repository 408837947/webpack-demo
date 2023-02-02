// 生产环境配置文件
const { merge } = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const webpack = require('webpack');
const prodWebpackConfig = merge(baseWebpackConfig, {
  // 这里是生产模式对应的配置
  mode: 'production',
  plugins: [
    new webpack.DefinePlugin({
      // 生产环境下的接口地址
      // 变量值要求是一个代码片段
      API_BASE_API: JSON.stringify('https://apiprod.example.com'),
    }),
    // Html的配置
    new HtmlWebpackPlugin({
      // 指定打包后的名称
      filename: 'index.html',
      // 用来指定生成HTML的模版
      template: './src/index.ejs',
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
  optimization: {
    minimize: true,
    splitChunks: {
      chunks: 'all',
      name: false,
    },
    minimizer: [
      // JS压缩
      new TerserPlugin({
        test: /\.js(\?.*)?$/i, //匹配参与压缩的文件
        parallel: true, // 使用多进程并行运行
        extractComments: false, //将注释剥离到单独的文件中
        //Terser 压缩配置
        terserOptions: {
          format: {
            comments: false,
          },
          // 生产环境生效
          compress: {
            drop_console: true, //传true就是干掉所有的console.*这些函数的调用.
            drop_debugger: true, //干掉那些debugger;
            pure_funcs: ['console.log'], // 如果你要干掉特定的函数比如console.info ，又想删掉后保留其参数中的副作用，那用pure_funcs来处理
          },
        },
      }),
      // css压缩
      new CssMinimizerPlugin(),
    ],
  },
  // performance: {
  //   maxEntrypointSize: 10000000,
  //   maxAssetSize: 30000000,
  // },
});

module.exports = prodWebpackConfig;

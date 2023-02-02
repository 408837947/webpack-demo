const { resolve } = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin')
module.exports = {
  mode: process.env.NODE_ENV ? process.env.NODE_ENV : 'development',
  entry: './src/index.js',
  output: {
    // 输出文件的目标路径，必须要是绝对路径
    path: resolve(__dirname, 'webpack-study'),
    // 输出文件名称
    filename: 'index.js',
  },
  resolve:{
    alias:{
      "@":resolve(__dirname,'src')
    }
  },
  module: {
    rules: [
      {
        test: /\.s?[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'], // less-loader作用是将less转换成普通的css
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  // 按需加载
                  useBuiltIns: 'usage',
                  // corejs的版本
                  corejs: 3,
                  targets: {
                    browsers: ['last 1 version', '> 1%'],
                  },
                },
              ],
            ],
            plugins: [
              [
                '@babel/plugin-transform-runtime',
                {
                  corejs: false,
                },
              ],
            ],
          },
        },
      },
    ],
  },
  optimization: {
    minimize: true,
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
  plugins: [
    // Css压缩
    new MiniCssExtractPlugin({
      filename: 'css/[name].css', // [name]的意思是保持打包之前的css名字
    }),

    require('autoprefixer'),

    // Html的配置
    new HtmlWebpackPlugin({
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
    new ESLintPlugin({
      fix:true
    })
  ],
};

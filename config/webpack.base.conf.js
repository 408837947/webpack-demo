// 公共配置文件
const { resolve } = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const ESLintPlugin = require('eslint-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MyPlugin = require('../plugin/MyPlugin');
module.exports = {
  mode: process.env.NODE_ENV ? process.env.NODE_ENV : 'development',
  entry: './src/index.js',
  output: {
    // 输出文件的目标路径，必须要是绝对路径
    path: resolve(__dirname, '../webpackStudy'),
    // 输出文件名称
    filename: 'static/js/[name].js',
    chunkFilename: 'static/js/[name].chunk.js',
  },
  resolve: {
    alias: {
      '@': resolve('src'),
    },
  },
  module: {
    rules: [
      // 处理CSS和Sass或者scss
      {
        test: /\.s?[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // 默认css中的图片地址
              publicPath: '../',
            },
          },
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ], // less-loader作用是将less转换成普通的css
      },
      // 处理JS
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
            plugins: [['@babel/plugin-transform-runtime']],
          },
        },
      },
      // 处理图片
      {
        test: /\.(png|gif|jpe?g)$/i,
        // use: {
        //   loader: 'url-loader',
        //   options: {
        //     // 指定图片大小，小于该数值的图片会被转成base64
        //     limit: 8 * 1024, // 8kb
        //     // [name]保留图片原来的名称  [ext]是图片原来的后缀名
        //     name: 'image/[name].[ext]',
        //     // url-loader默认采用 ES Modules规范进行解析，但是html-loader引入图片使用CommonJS规范
        //     esModule: false, //关闭默认使用esModule语法
        //   },
        // },
        // type: 'javascript/auto', // 防止webpack打包图片后出现空白图片且不能正常使用

        // 使用资源模块
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024,
          },
        },
        generator: {
          filename: 'image/[name][ext]',
        },
      },
      // 处理html，会与html-webpack-plugin有冲突
      {
        test: /\.(htm|html)$/i,
        use: {
          loader: 'html-loader',
          options: {
            // webpack4中，只需要在url-loader中设置esModule:false即可
            // webpack5中需要html-loader也配置esModule:false
            esModule: false,
          },
        },
      },
      // 处理字体文件
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/i,

        // 使用loader
        // use: {
        //   loader: 'file-loader',
        //   options: {
        //     name: 'fonts/[name].[ext]',
        //     esModule: false,
        //   },
        // },
        // type: 'javascript/auto', // 防止webpack打包字体后出现空白文件且不能正常使用

        // 使用资源模块处理字体文件
        // asset可以在asset/resource 和 asset/inline 之间进行选择
        // 如果文件小于8kb（固定且默认），则使用inline，反之使用resource
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024,
          },
        },
        generator: {
          filename: 'fonts/[name][ext]',
        },
      },
      {
        test: /\.md$/i,
        use: {
          loader: './src/loader/markdown-loader',
          options: {
            size: 20,
          },
        },
      },
    ],
  },
  // 配置目标
  target: 'web',

  plugins: [
    // Css压缩
    new MiniCssExtractPlugin({
      filename: 'css/[name].css', // [name]的意思是保持打包之前的css名字
    }),

    require('autoprefixer'),
    // ESlint配置
    // new ESLintPlugin({
    //   fix: true,
    // }),
    // 将src中不需要处理的文件，直接输出到目录中
    new CopyWebpackPlugin({
      patterns: [{ from: 'src/public', to: 'public' }],
    }),
    // 打包之前，删除历史文件
    new CleanWebpackPlugin(),

    // 引入自定义插件
    new MyPlugin({
      target: '.css',
    }),
  ],
  devServer: {
    // 指定加载内容的路径
    // contentBase新版中已经被static替换
    static: resolve(__dirname, 'src'),

    //启用gzip压缩
    compress: true,

    // 指定端口号
    port: 9999,

    // 启用热更新
    liveReload: true,

    // 配置代理：解决接口跨域问题（整体模式固定）
    proxy: {
      // http://localhost:9999/api
      '/api': {
        // http://localhost:9999/api/users ==> https://api.github.com/api/users
        target: 'https://api.github.com',
        pathRewrite: {
          // 将api替换成空
          // 即 http://localhost:9999/api/users ==> https://api.github.com/users
          '^/api': '',
        },
        // 不能使用localhost:9999 作为github的主机名，也就是把原来的域名改成github去访问
        changeOrigin: true,
      },
    },

    // 运行serve命令后，立刻打开
    open: false,
  },
};

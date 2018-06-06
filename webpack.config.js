const resolve = require('path').resolve;
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const url = require('url');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const Stylish = require('eslint/lib/formatters/stylish');

const publicPath = '';

module.exports = (options = {}) => ({
  entry: {
    elementui: './src/elementui.js',
    vendor: './src/vendor.js',
    index: './src/main.js'
  },
  output: {
    path: resolve(__dirname, 'dist'),
    filename: options.dev ? 'commons-[name].js' : 'statics/commons[id]-[chunkhash:8].js',
    chunkFilename: options.dev ? 'chunks-[name].js' : 'statics/chunks[id]-[chunkhash:8].js',
    publicPath: options.dev ? '/assets/' : publicPath
  },
  module: {
    rules: [
      // eslint-loader设置
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre', // 是否在loader前监测
        include: [resolve(__dirname, 'src')], // 监测的文件夹或路径
        options: {
          // 默认
          formatter: Stylish // 错误输出格式
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            css: ExtractTextPlugin.extract({
              use: 'css-loader',
              // vue-style-loader是vue-loader的依赖
              // 使用npm3，则不需要显式安装
              fallback: 'vue-style-loader'
            })
          }
        }
      },
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [
          {
            loader: 'url-loader?limit=1024&name=statics/[hash:8].[ext]'
          }
        ]
      },
      {
        test: /\.(eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
        use: [
          {
            loader: 'url-loader?limit=10240&name=statics/[hash:8].[ext]'
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['elementui', 'vendor', 'manifest']
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false // 禁止压缩时候的警告信息
      }
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new ExtractTextPlugin('statics/[hash:8].css')
  ],
  resolve: {
    extensions: ['.css', '.js', '.vue', '.json'],
    alias: {
      '~': resolve(__dirname, 'src'),
      '@': resolve(__dirname, 'src')
    }
  },
  devServer: {
    host: 'localhost',
    port: 8090,
    proxy: {
      // '/api': {
      //     target: 'http://localhost:8089',
      //     secure: true,
      //     // pathRewrite: {
      //     //     '^/api': ''
      //     // }
      // }
    },
    historyApiFallback: {
      index: url.parse(options.dev ? '/assets/' : publicPath).pathname
    }
  },
  // 开启生成环境下的sourceMap
  // devtool: options.dev ? '#eval-source-map' : '#source-map'
  // 关闭生成环境下的sourceMap
  devtool: options.dev ? '#eval-source-map' : false
});

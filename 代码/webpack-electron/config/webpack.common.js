const path = require('path');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const smp = new SpeedMeasurePlugin();

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpackBar = require('webpackbar')

// 1、首先我们做代码分离，将css代码分离出来

module.exports = {
  resolve: {
    extensions: ['.tsx', '.ts','.js'],
    alias: {
      '@assets': path.join(__dirname, '../', 'assets'),
      '@common': path.join(__dirname, '../', 'common'),
      'react': path.resolve(__dirname,'../node_modules/react/umd/react.production.min.js'),
      'react-dom': path.resolve(__dirname,'../node_modules/react-dom/umd/react-dom.production.min.js')
    },
    modules: [path.resolve(__dirname, '../node_modules')]
  }, 
  cache: {
    type: "filesystem", // 使用文件缓存
  },
  // 抽离公共代码
  optimization: {
    runtimeChunk: {
      name: "manifest",
    },
    splitChunks: {
      cacheGroups: {
        vendor: {
          // 第三方依赖
          priority: 1, //设置优先级
          name: "vendor",
          test: /node_modules/,
          chunks: "initial",
          minSize: 0,
          minChunks: 1,
        },
        // 缓存组
        default: {
          // 公共模块
          name: "common",
          chunks: "initial",
          minChunks: 3,
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          {
            loader: 'less-loader',
          },
        ],
      },
      {
        test: /\.(jpg|png|jpeg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 2048,
              name: '[name]_[hash].[ext]',
              outputPath: 'images/',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
    }),
    new webpackBar()
  ],
}

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  mode: "development",
  entry: path.join(__dirname, "./index.js"),
  output: {
    path: path.join(__dirname, "./dist"),
    filename: "index.js",
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", '.less'],
  },
  devServer: {
    host: "127.0.0.1",
    port: 3333,
    hot: true, // 开启热更新
    historyApiFallback: true,
  },
  module: {
    rules: [
      // 配置babel-loader
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              singleton: true, // 单独的style
            },
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          {
            loader: 'less-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    // 将我们打包好的js代码动态的插入到html中
    new HtmlWebpackPlugin({
      template: "./index.html",
      filename: "index.html",
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development"),
      },
    }),
    // 热更新的插件
    new webpack.HotModuleReplacementPlugin(),
  ],
};

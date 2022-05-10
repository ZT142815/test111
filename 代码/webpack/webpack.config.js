const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist1"), //构建生成的文件所在路径
    filename: "bundle1.js", //构建生成的文件名
  },
  devServer: {
    static: path.resolve(__dirname, "dist1"),
  },
  resolve: {
    extensions: ['.js','.jsx','.css','.less','.json'],
    alias: {
        utils: path.resolve(__dirname,'src/utils')
    }
  },
  optimization: {
      splitChunks: {
          chunks: 'all',
          name: 'common'
      }
  },
  module: {
    rules: [
      {
        test: /\.js?/,
        include: [path.resolve(__dirname, "src")],
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.css/,
        include: [path.resolve(__dirname, "src")],
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.less/,
        use: [MiniCssExtractPlugin.loader, "css-loader",'less-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
    }),
    new MiniCssExtractPlugin(),
  ],
};

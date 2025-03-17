const webpack = require("webpack")
const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const dotenv = require("dotenv")
dotenv.config()

const rules = require("./rules")

module.exports = {
  entry: path.resolve(__dirname, "..", "./src/app/index.tsx"),
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".json", ".css", ".scss"],
  },
  module: {
    rules: rules,
  },
  output: {
    publicPath: "/",
    path: path.resolve(__dirname, "..", "./build"),
    filename: "bundle.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "..", "./public/index.html"),
    }),
    new BundleAnalyzerPlugin(),
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(process.env),
    }),
  ],
}

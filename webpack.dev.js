const merge = require("webpack-merge");
const path = require("path");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const common = require("./webpack.common");

module.exports = merge(common, {
  mode: "development",

  output: {
    crossOriginLoading: "anonymous",
    filename: "js/[name].[hash].js",
    chunkFilename: "css/[id].[hash].css"
  },

  devServer: {
    port: process.env.PORT || 3000,
    contentBase: path.join(process.cwd(), "./public"),
    watchContentBase: true,
    quiet: false,
    open: true,
    historyApiFallback: {
      rewrites: [{from: /./, to: "404.html"}]
    }
  },

  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        "resources/**/*.js",
        "resources/**/*.css",
        "content/webpack.json"
      ]}),

    new MiniCssExtractPlugin({
      filename: "css/[name].css",
      chunkFilename: "css/[id].css"
    }),
  ]
});

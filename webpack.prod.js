const merge = require("webpack-merge");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "production",

  output: {
    crossOriginLoading: "anonymous",
    filename: "js/[name].[hash].js",
    chunkFilename: "css/[id].[hash].css"
  },

  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),

      new MiniCssExtractPlugin({
        filename: "css/[name].[hash].css",
        chunkFilename: "css/[id].[hash].css"
      }),

      new OptimizeCssAssetsPlugin({})
    ]
  },

  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        "resources/**/*.js",
        "resources/**/*.css",
        "content/webpack.json"
      ]}),
  ]
});

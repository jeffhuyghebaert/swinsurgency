const webpack = require("webpack");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const AssetsPlugin = require("assets-webpack-plugin");
const SriPlugin = require("webpack-subresource-integrity");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
  entry: {
    app: path.join(__dirname, "resources/js", "app.js")
  },

  output: {
    crossOriginLoading: "anonymous",
    path: path.join(__dirname, "public")
  },

  module: {
    rules: [
      {
        test: /\.((png)|(eot)|(woff)|(woff2)|(ttf)|(svg)|(gif))(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file-loader?name=/[hash].[ext]"
      },

      {
        test: /\.json$/,
        loader: "json-loader"
      },

      {
        loader: "webpack-modernizr-loader",
        test: /\.modernizrrc\.js$/
      },

      {
        loader: "babel-loader",
        test: /\.js?$/,
        exclude: /node_modules/,
        query: {
          cacheDirectory: true
        }
      },

      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /node_modules/,
        use: ["style-loader", MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "sass-loader"]
      }
    ]
  },

  plugins: [
    new webpack.ProvidePlugin({
      fetch: "imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch"
    }),

    new SriPlugin({
      hashFuncNames: ["sha512"],
      enabled: true,
    }),

    new OptimizeCssAssetsPlugin({
      cssProcessor: require("cssnano"),
      cssProcessorPluginOptions: {
        preset: ["default", {
          discardComments: {
            removeAll: true
          }
        }],
      },
      canPrint: true
    }),

    new AssetsPlugin({
      integrity: true,
      filename: "assets.json",
      path: path.join(process.cwd(), "./data"),
      prettyPrint: true
    }),
  ],

  resolve: {
    alias: {
      modernizr$: path.resolve(__dirname, ".modernizrrc.js")
    }
  },
};

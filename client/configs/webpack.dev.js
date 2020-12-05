const paths = require("./paths");

const webpack = require("webpack");
const { merge } = require("webpack-merge");
const common = require("./webpack.common");

module.exports = merge(common, {
  mode: "development",

  devtool: "inline-source-map",

  devServer: {
    historyApiFallback: true,
    contentBase: paths.build,
    open: true,
    compress: true,
    hot: true,
    port: 1337,
    proxy: {
      "*": "http://localhost:3000",
    },
  },

  plugins: [new webpack.HotModuleReplacementPlugin()],
});

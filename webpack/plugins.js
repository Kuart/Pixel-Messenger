const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const { FILENAME, IS_PROD } = require('./const');

exports.PLUGINS = [
  new CleanWebpackPlugin(),
  new HtmlWebpackPlugin({
    template: './static/index.html',
    title: 'PixelChat',
    favicon: './static/assets/images/favicon.ico',
    minify: {
      collapseWhitespace: IS_PROD,
    },
  }),
  new MiniCssExtractPlugin({
    filename: `css/${FILENAME('.css', IS_PROD)}`,
  }),
];

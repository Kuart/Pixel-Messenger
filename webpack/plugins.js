const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

exports.PLUGINS = [
  new CleanWebpackPlugin(),
  new HtmlWebpackPlugin({
    template: './static/index.html',
    title: 'PixelChat',
    favicon: './static/assets/images/favicon.ico',
  }),
];

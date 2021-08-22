const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { FILENAME, IS_PROD } = require('./const');

const PROD_CSS_LOADER = {
  test: /\.css$/i,
  use: [MiniCssExtractPlugin.loader, 'css-loader'],
};

const DEV_CSS_LOADER = {
  test: /\.css$/i,
  use: ['style-loader', 'css-loader'],
};

const FILE_LOADER = {
  test: /\.(png|jpe?g|gif|svg)$/i,
  loader: 'file-loader',
  options: {
    filename: `./img/${FILENAME('[ext]', IS_PROD)}`,
  },
};

const TS_LOADER = {
  test: /\.ts$/,
  exclude: /(node_modules|bower_components)/,
  use: ['babel-loader'],
};

exports.PROD_LOADERS = [PROD_CSS_LOADER, TS_LOADER, FILE_LOADER];
exports.DEV_LOADERS = [DEV_CSS_LOADER, TS_LOADER, FILE_LOADER];

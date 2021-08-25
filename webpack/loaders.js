const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { FILENAME, IS_PROD } = require('./const');

const PROD_CSS_LOADER = {
  test: /\.css$/i,
  use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
};

const DEV_CSS_LOADER = {
  test: /\.css$/i,
  use: ['style-loader', 'css-loader', 'postcss-loader'],
};

const FILE_LOADER = {
  test: /\.(png|jpe?g|gif|svg)$/i,
  loader: 'file-loader',
  options: {
    name: `./img/${FILENAME('[ext]', IS_PROD)}`,
  },
};

const FONT_LOADER = {
  test: /\.(?:|ttf|woff2)$/i,
  loader: 'file-loader',
  options: {
    name: `./fonts/${FILENAME('[ext]', IS_PROD)}`,
  },
};

const URL_LOADER = {
  test: /\.(png|jpg)$/,
  loader: 'url-loader',
};

const TS_LOADER = {
  test: /\.ts$/,
  exclude: /(node_modules|bower_components)/,
  use: ['babel-loader'],
};

exports.PROD_LOADERS = [PROD_CSS_LOADER, TS_LOADER, FILE_LOADER, FONT_LOADER, URL_LOADER];
exports.DEV_LOADERS = [DEV_CSS_LOADER, TS_LOADER, FILE_LOADER, URL_LOADER];

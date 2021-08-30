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
  test: /\.(jpe?g|gif|svg)$/i,
  loader: 'file-loader',
  options: {
    name: `./img/${FILENAME('[ext]', IS_PROD)}`,
  },
};

const PNG_LOADER = {
  test: /\.png/,
  type: 'asset/resource',
};

const FONT_LOADER = {
  test: /\.(ttf|woff2)$/i,
  type: 'asset/resource',
};

const TS_LOADER = {
  test: /\.ts$/,
  exclude: /(node_modules|bower_components)/,
  use: ['babel-loader'],
};

exports.PROD_LOADERS = [PROD_CSS_LOADER, TS_LOADER, FILE_LOADER, PNG_LOADER, FONT_LOADER];
exports.DEV_LOADERS = [DEV_CSS_LOADER, TS_LOADER, FILE_LOADER, PNG_LOADER, FONT_LOADER];

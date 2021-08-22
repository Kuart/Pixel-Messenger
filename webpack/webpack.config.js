const { ROOT_FILE, BUILD_DIRECTORY, FILENAME, IS_PROD } = require('./const');
const { PROD_LOADERS, DEV_LOADERS } = require('./loaders');
const { PLUGINS } = require('./plugins');

module.exports = () => ({
  entry: ROOT_FILE,
  output: {
    path: BUILD_DIRECTORY,
    filename: `js/${FILENAME('.js', IS_PROD)}`,
  },
  devServer: {
    historyApiFallback: true,
    open: true,
    compress: true,
    hot: true,
    port: 3000,
  },
  mode: 'development',
  devtool: false,
  plugins: PLUGINS,
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: IS_PROD ? PROD_LOADERS : DEV_LOADERS,
  },
});

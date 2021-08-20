const { PLUGINS } = require('./plugins');

module.exports = () => ({
  mode: 'none',
  devtool: false,
  plugins: PLUGINS,
});

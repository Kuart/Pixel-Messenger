const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

exports.OPTIMIZATION = {
  splitChunks: {
    chunks: 'all',
  },
  minimizer: [new CssMinimizerPlugin(), new TerserWebpackPlugin()],
};

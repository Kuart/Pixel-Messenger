const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

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
  ...(IS_PROD
    ? [
        new ImageMinimizerPlugin({
          minimizerOptions: {
            plugins: [
              ['gifsicle', { interlaced: true }],
              ['jpegtran', { progressive: true }],
              ['optipng', { optimizationLevel: 5 }],
              [
                'svgo',
                {
                  plugins: [
                    {
                      name: 'preset-default',
                    },
                    {
                      name: 'removeViewBox',
                      active: false,
                    },
                  ],
                },
              ],
            ],
          },
        }),
      ]
    : []),
];

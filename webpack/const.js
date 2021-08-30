const { resolve } = require('path');

exports.ROOT_FOLDER = resolve(__dirname, '../');
exports.ROOT_FILE = resolve(__dirname, '../src/index.ts');
exports.BUILD_DIRECTORY = resolve(__dirname, '../dist');
exports.SOURCE_DIRECTORY = resolve(__dirname, '../src');

exports.FILENAME = (extention, isProd) => (isProd ? `[name].[contenthash].${extention}` : `[name].${extention}`);
exports.IS_PROD = process.env.NODE_ENV !== 'development';

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { webpack } = require('webpack');

const APP_DIR = path.resolve(__dirname, '../src');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: {
    app: './src/index.js',
  },
  resolve: {
    modules: [APP_DIR, 'node_modules'],
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.js|\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'New New',
      template: './resources/index.html',
      filename: './index.html',
      inject: true,
      minify: {
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
        minifyCSS: true,
        minifyURLs: true,
        minifyJS: true,
        removeComments: true,
        removeRedundantAttributes: true,
      },
    }),
    new Dotenv(),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    publicPath: '/'
  },
};

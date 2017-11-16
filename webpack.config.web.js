var path = require('path');
var webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

var BUILD_DIR = path.resolve(__dirname, 'assets');

var config = {
  entry: [
    'babel-polyfill',
    path.resolve(__dirname, 'clientWeb.jsx')
  ],
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['*','.js', '.jsx', '.css']
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          cacheDirectory: true
        }
      }
    },
    {
      test: /\.css$/,
       loader: ExtractTextPlugin.extract({
            loader: 'css-loader',
            query: {
              localIdentName: '[name]__[local]___[hash:base64:5]',
              modules: true
            }
          })
    },]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'styles.css',
      allChunks: true
    }),
  ],
  target: 'web',
  devtool: 'eval-source-map',
  devServer: {
    bonjour: true,
    clientLogLevel: 'error'
  }
};

module.exports = config;

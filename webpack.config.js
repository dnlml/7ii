const path = require('path');
const dist = path.resolve(__dirname, './dist');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: ['./src/styles/index.scss', './src/scripts/index.js'],
  watch: process.env.NODE_ENV === 'development',
  watchOptions: {
    ignored: /node_modules/
  },
  output: {
    path: dist,
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'style.css',
            },
          }, {
            loader: 'extract-loader',
          },
          {
            loader: 'css-loader?-url',
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [require('autoprefixer')]
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      }, {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      }
    ],
  },
  plugins: [new HtmlWebpackPlugin({
    template: "./src/index.html",
    filename: "index.html",
    files: {
      css: "./style.css",
    }
  })]
};
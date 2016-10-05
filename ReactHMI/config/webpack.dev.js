"use strict";

process.env.NODE_ENV = 'development';

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const env = require('./env');

// Prepare extracting CSS compiled from SASS to external file instead of
// bundled together with JS.
const extractCSS = new ExtractTextPlugin('static/css/[name].[contenthash:8].css');

module.exports = {
  // Watch files and rebundle if one changes
  watch: true,
  // Set source-map level for development, see https://webpack.github.io/docs/configuration.html#devtool
  devtool: "eval",
  // Set the entry points the bundler should follow
  entry: [
    require.resolve("./polyfills"),
    "./src/main.tsx"
  ],
  // Output to build folder
  output: {
    path: "build",
    filename: "static/js/[name].[chunkhash:8].js",
    publicPath: "/"
  },
  // Typescript compiler settings
  ts: { 
    configFileName: "./src/tsconfig.json",
    silent: true
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json", ""],
  },
  module: {  
    loaders: [
      // Typescript
      {
        test: /\.tsx?$/, 
        loader: "ts-loader" 
      },
      // SCSS
      {
        test: /\.scss$/,
        loader: extractCSS.extract(["css", "sass"])
      },
      // Assets: Bundle them with JS using Base64-encoding if file size below limit
      {
        test: /\.(ico|jpg|png|gif|eot|otf|webp|ttf|woff|woff2)(\?.*)?$/,
        exclude: /\/favicon.ico$/,
        loader: 'url',
        query: {
          limit: 4000,
          name: 'static/media/[name].[hash:8].[ext]'
        }
      },
      // Assets special case: Bundle SVG with JS if file size below limit but don't apply Base64-encoding
      {
        test: /\.svg/, 
        loader: 'svg-url-loader',
        query: {
          limit: 4000
        }
      },
      // Special case: Never bundle the favicon file
      {
        test: /\/favicon.ico$/,
        loader: 'file',
        query: {
          name: 'favicon.ico?[hash:8]'
        }
      },
      // HTML
      {
        test: /\.html$/,
        loader: 'html',
        query: {
          attrs: ['link:href'],
        }
      }
    ]
  },
  plugins: [
    // Generates an `index.html` file with the <script> injected.
    new HtmlWebpackPlugin({
      filename: "index.html", // Target server needs htm, not html
      inject: true,
      template: "./index.html"
    }),
    // Set environment variables
    new webpack.DefinePlugin(env),
    // Save CSS in dedicated file (don't bundle)
    extractCSS
  ]
};

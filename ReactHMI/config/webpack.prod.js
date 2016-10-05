"use strict";

process.env.NODE_ENV = 'production';

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const env = require('./env');

if (env['process.env.NODE_ENV'] !== '"production"') {
  throw new Error('Production builds must have NODE_ENV=production.');
}

// Prepare extracting CSS compiled from SASS to external file instead of
// bundled together with JS.
const extractCSS = new ExtractTextPlugin('static/css/[name].[contenthash:8].css');

module.exports = {
  // Don't attempt to continue if there are any errors.
  bail: true,
  // Set source-map level for production, see https://webpack.github.io/docs/configuration.html#devtool
  // devtool: "source-map",
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
  postcss: function() {
    return [
      autoprefixer({
        browsers: [
          '>1%',
          'last 4 versions',
          'Firefox ESR',
          'not ie < 9',
        ]
      }),
    ];
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
        loader: extractCSS.extract(["css", "postcss", "sass"])
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
      template: "./index.html",
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),
    // Set environment variables
    new webpack.DefinePlugin(env),
    // This helps ensure the builds are consistent if source hasn't changed:
    new webpack.optimize.OccurrenceOrderPlugin(),
    // Try to dedupe duplicated modules, if any:
    new webpack.optimize.DedupePlugin(),
    // Minify the code.
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true, // React doesn't support IE8
        warnings: false
      },
      mangle: {
        screw_ie8: true
      },
      output: {
        comments: false,
        screw_ie8: true
      }
    }),

    // Save CSS in dedicated file (don't bundle)
    extractCSS
  ]
};

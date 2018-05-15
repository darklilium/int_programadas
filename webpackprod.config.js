const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    bundle: [
      "react-hot-loader/patch",
      "./src/index.js"
    ]
  },
  output: {
    publicPath: "/",
    path: path.join(path.join(__dirname, 'dist'), 'js'),
    filename: 'bundle.js',
    libraryTarget: "amd"
  },
  resolve: {
    extensions: ['.scss', '.css', '.js', '.json','.webpack.js', '.web.js', '.js', '.jsx']
  },
  module: {
    rules: [
     {
       test: /(\.js|\.jsx)$/,
       loader: 'babel-loader',
       options: {
         presets: [
           ["es2015", { modules: false }],
           "stage-2", "stage-1", "stage-3",
           "react"
         ],
         plugins: [
           "transform-node-env-inline"
         ],
         env: {
           development: {
             plugins: ["react-hot-loader/babel"]
           }
         }
       }
     },
     {

        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
              sourceMap: true,
              importLoaders: 1,
              localIdentName: "[name]--[local]--[hash:base64:8]"
            }
          },
          "postcss-loader" // has separate config, see postcss.config.js nearby
        ]
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: '../mapafallas/css/images/',

        }
      }

   ]
 },
 externals: [
     function(context, request, callback) {
         if (/^dojo/.test(request) ||
             /^dojox/.test(request) ||
             /^dijit/.test(request) ||
             /^esri/.test(request)
         ) {
             return callback(null, "amd " + request);
         }
         callback();
     }
 ],
 plugins: [
   new ExtractTextPlugin({
     filename: '../css/myStyles[name].css',
     allChunks: true
   }),
   new webpack.HotModuleReplacementPlugin(),

   new UglifyJSPlugin({
    uglifyOptions: {
      ie8: false,
      ecma: 8,
      output: {
        comments: false,
        beautify: false,

      },
      compress: true,
      warnings: false
    }
  }),
   new webpack.DefinePlugin({
     'process.env.NODE_ENV': JSON.stringify('production')
   })
 ]
};

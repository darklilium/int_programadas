const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    bundle: [
      "react-hot-loader/patch",
      "./src/index.js"
    ]
  },
  devtool: 'inline-source-map',
  output: {
    publicPath: "/",
    path: path.join(path.join(__dirname, 'dist'), 'js'),
    filename: 'bundle.js',
    libraryTarget: "amd"
  },
  resolve: {
    //extensions: [".js", ".json", ".css"]
    extensions: ['.scss', '.css', '.js', '.json','.webpack.js', '.web.js', '.js', '.jsx']

  },
  devServer: {
    inline: true,
    port: 443,
    host: "127.0.0.1",
    hot: true
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
     /*{
        test: /(\.css|\.scss)$/,
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
      */
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
           use: [{
               loader: "style-loader" // creates style nodes from JS strings
           }, {
               loader: "css-loader" // translates CSS into CommonJS
           }, {
               loader: "sass-loader" // compiles Sass to CSS
           }]
       },
       {
         test: /\.(png|svg|jpg|gif)$/,
         use: [
           'file-loader'
         ]
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
   new webpack.NamedModulesPlugin(),
   new webpack.HotModuleReplacementPlugin(),
   new ExtractTextPlugin({
     filename: 'myStyles[name].css',
     allChunks: true
   })
 ]
};

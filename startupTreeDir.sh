echo "creating directory tree and subtrees"
mkdir "arcgis_js_api"
mkdir "dist"
mkdir "src"
mkdir "src/components"
mkdir "src/css"
mkdir "src/css/images"
mkdir "src/services"
mkdir "src/vendor"

echo "creating index.html"

cat <<EOF > "index.html"
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="author" content="Evelyn Hernández">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
    <title>My React APP</title>
    <link rel="stylesheet" type="text/css" href="arcgis_js_api/library/3.22/3.22/dijit/themes/tundra/tundra.css" />
    <link rel="stylesheet" href="arcgis_js_api/library/3.22/3.22//esri/css/esri.css">

  </head>
  <body>
    <script src="arcgis_js_api/library/3.22/3.22/init.js"></script>
    <div id="app"></div>
    <script type="text/javascript">require(["bundle.js"], function (bundle) {});</script>
  </body>
</html>

EOF

echo "creating webpack config for development"

cat <<EOF > "webpack.config.js"
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
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
EOF

echo "creating webpack config for production"

cat <<EOF > "webpackprod.config.js"
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
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
EOF

echo "creating postcss config file"

cat <<EOF > "postcss.config.js"
module.exports = {
  plugins: {
    'postcss-import': {
      root: __dirname,
    },
    'postcss-mixins': {},
    'postcss-each': {},
    'postcss-cssnext': {}
  },
};
EOF


echo "creating first component in react"

cat <<EOF > "src/index.js"
  import React from 'react';
  import ReactDOM from 'react-dom';
  import Main from './components/Main';

  const rootEl = document.getElementById('app');

  ReactDOM.render(<Main />, document.getElementById('app'));

EOF

cat <<EOF > "src/components/Main.js"
  import React from 'react';
  import ReactDOM from 'react-dom';

  class Main extends React.Component {
    render(){
      return (
        <div>Hola desde React Component</div>
      );
    }
  }

  export default Main;

EOF

echo "creating styles sheets"

mkdir "src/css/component1"

cat <<EOF > "src/css/myStyles.scss"
  @import "component1/styleComponent1";
EOF

cat <<EOF > "src/css/component1/styleComponent1.scss"
EOF

echo "creating gulpfile to handle css"

cat <<EOF > "gulpfile.js"

var gulp = require('gulp');
var sass = require('gulp-sass');
var swig = require('gulp-swig');
var notify = require("gulp-notify");


function defaultError(type){
  return function(err){
    console.log(type + ' error : ' + err);
  };
}

function dist(path){
  return './dist/' + path;
}

function realPath(xs){
  return './src/' + xs;
}

var reportError = function (error) {
    notify({
        title: 'Gulp Task Error',
        message: 'Check the console.'
    }).write(error);

    console.log(error.toString());

    this.emit('end');
}

gulp.task('sass', function(){
  return gulp.src('./src/css/*.scss')
    .pipe(sass({ outputStyle: 'compact' }))
    .on('error', reportError)
    .pipe(gulp.dest(dist('css')))
});

gulp.task('css', function(){
  return gulp.src('./src/css/*.css')
    .pipe(sass({ outputStyle: 'compact' }))
    .on('error', reportError)
    .pipe(gulp.dest(dist('css')))
});


gulp.task('images', function(){
  return gulp.src('./src/css/images/**/*.png')
    .on('error', reportError)
    .pipe(gulp.dest(dist('css/images')))

});
gulp.task('html', function(){
  return gulp.src('*.html')
    .on('error', reportError)
    .pipe(gulp.dest(dist('')))

});

gulp.task('watch', function(){
  gulp.watch(['css/*.scss'].map(realPath), ['sass'],['css']);
  gulp.watch(['*.html']);


});


gulp.task('default', ['sass', 'images','watch', 'css','html']);

EOF

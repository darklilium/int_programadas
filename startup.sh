#!/bin/bash
dependences[0]=react
dependences[1]=react-dom
dependences[2]=webpack

dev_dependences[0]=gulp
dev_dependences[1]=browserify
dev_dependences[2]=babelify
dev_dependences[3]=webpack-dev-server
dev_dependences[4]=babel-core
dev_dependences[5]=babel-loader
dev_dependences[6]=babel-preset-react
dev_dependences[7]=babel-preset-es2015
dev_dependences[8]=babel-preset-stage-2
dev_dependences[9]=highcharts
dev_dependences[10]=cookie-handler
dev_dependences[11]=lodash
dev_dependences[12]=moment
dev_dependences[13]=jquery
dev_dependences[14]=react-select
dev_dependences[15]=react-toolbox
dev_dependences[16]=css-loader
dev_dependences[17]=style-loader
dev_dependences[18]=postcss-loader
dev_dependences[19]=uglifyjs-webpack-plugin
dev_dependences[20]=babel-plugin-transform-node-env-inline
dev_dependences[21]=babel-preset-stage-1
dev_dependences[22]=react-hot-loader@next
dev_dependences[23]=gulp-sass
dev_dependences[24]=gulp-swig
dev_dependences[25]=gulp-notify
dev_dependences[26]=postcss-import
dev_dependences[27]=postcss-mixins
dev_dependences[28]=postcss-cssnext
dev_dependences[29]=cross-env
dev_dependences[30]=redux
dev_dependences[31]=semantic-ui-react
dev_dependences[32]=postcss-each
dev_dependences[33]=sass-importLoaders
dev_dependences[34]=react-redux
dev_dependences[35]=extract-text-webpack-plugin
dev_dependences[36]=webpack-cli
dev_dependences[37]=extract-text-webpack-plugin@next
dev_dependences[38]=rc-tooltip

echo "creating package.json"

cat <<EOF > "package.json"
{
  "name": "Sectores",
  "version": "1.0.0",
  "scripts": {
    "start": "start npm run dev:server",
    "dev:server": "webpack-dev-server --history-api-fallback",
    "build": "webpack --progress --colors",
    "gulp": "gulp",
    "prod:build": "cross-env NODE_ENV=production webpack -p --config webpackprod.config.js --optimize-minimize --progress --colors"  }
}
EOF

echo "creating main.js"

cat <<EOF > "main.js"
console.log('this is my 1st file');
EOF

echo "installing dependences"

for dependence in ${dependences[@]}
do
  echo "npm install --save $dependence"
  npm install --save $dependence
done

echo "installing dev dependences"

for dev in ${dev_dependences[@]}
do
  echo "npm install --save-dev $dev"
  npm install --save-dev $dev
done

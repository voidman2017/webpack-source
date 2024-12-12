#!/bin/bash

# 创建项目目录
mkdir webpack-externals-demo
cd webpack-externals-demo

# 创建目录结构
mkdir -p src public

# 创建 package.json
cat > package.json << EOL
{
  "name": "webpack-externals-demo",
  "version": "1.0.0",
  "scripts": {
    "build": "webpack --mode production"
  },
  "dependencies": {
    "element-ui": "^2.15.13",
    "vue": "^2.6.14"
  },
  "devDependencies": {
    "@babel/core": "^7.21.8",
    "@babel/preset-env": "^7.21.8",
    "babel-loader": "^9.1.2",
    "css-loader": "^6.7.3",
    "html-webpack-plugin": "^5.5.1",
    "vue-loader": "^15.10.1",
    "vue-template-compiler": "^2.6.14",
    "webpack": "^5.82.0",
    "webpack-cli": "^5.1.1"
  }
}
EOL

# 创建 src/App.vue
cat > src/App.vue << EOL
<template>
  <div id="app">
    <h1>{{ message }}</h1>
    <el-button type="primary">Element UI Button</el-button>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      message: 'Hello, Webpack Externals Demo!'
    }
  }
}
</script>
EOL

# 创建 src/main.js
cat > src/main.js << EOL
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'

Vue.use(ElementUI)

new Vue({
  render: h => h(App)
}).$mount('#app')
EOL

# 创建 public/index.html
cat > public/index.html << EOL
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Webpack Externals Demo</title>
</head>
<body>
  <div id="app"></div>
</body>
</html>
EOL

# 创建 webpack.config.js
cat > webpack.config.js << EOL
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new VueLoaderPlugin()
  ]
};
EOL

# 安装依赖
npm install

echo "项目创建完成！"
echo "运行 'npm run build' 来构建项目。"
echo "要使用 externals，请按照之前的说明修改 webpack.config.js 和 public/index.html。"
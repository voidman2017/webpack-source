const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require('webpack');

module.exports = {
	entry: "./src/index.js",
	context: path.resolve(__dirname, "."),
	// stats: "verbose",
	// profile: true,
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "dist")
	},
	mode: "development",
	devtool: "source-map",
	module: {
		rules: [
			{
				test: /\.js$/, // 匹配所有.js文件
				exclude: /node_modules/, // 排除node_modules目录
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env"] // 使用@babel/preset-env预设
					}
				}
			}
		]
	},
	optimization: {
		minimize: false // 禁用代码压缩
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./src/index.html"
		}),
		new webpack.HotModuleReplacementPlugin()
	],
	devServer: {
		static: {
			directory: path.join(__dirname, 'dist'),
		},
		compress: true,
		port: 2233,
		hot: 'only',
		open: true
	}
};

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	devtool: "none",
	entry: "./src/index.js", // 你的入口文件
	mode: "development",
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "bundle.js"
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./src/index.html" // 你的 HTML 模板文件
		})
	],
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader"
				}
			}
		]
	}
};

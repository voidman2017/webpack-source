const path = require("path");

module.exports = {
	entry: "./src/index.js",
	context: path.resolve(__dirname, "."),
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "dist")
	},
	mode: "production",
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
	plugins: []
};

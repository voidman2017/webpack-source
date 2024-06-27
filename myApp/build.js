const webpack = require("../lib/webpack");
const config = require("./webpack.config");

// 执行 webpack 函数有传回调函数
webpack(config, (err, stats) => {
	if (err) {
		console.log(err);
	}
});

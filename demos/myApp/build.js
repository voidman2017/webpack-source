const webpack = require("../../lib/webpack");
const config = require("./webpack.config");

// 执行 webpack 函数有传回调函数
const compiler = webpack(config);

compiler.run((err, stats) => {
	if (err) {
		console.error(err);
		return;
	}

	console.log(
		stats.toString({
			all: true, // 输出所有日志信息
			colors: true // 带颜色的输出
		})
	);

	/* console.log(
		stats.toString({
			all: false, // 只输出指定的日志内容
			timings: true, // 显示每个模块的构建时间
			performance: true, // 显示性能信息
			colors: true, // 彩色输出
			modules: true, // 显示模块信息
			moduleTrace: true // 显示模块的依赖关系
		})
	); */
});

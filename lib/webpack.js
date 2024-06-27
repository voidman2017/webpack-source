/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

"use strict";

const util = require("util");
const webpackOptionsSchemaCheck = require("../schemas/WebpackOptions.check.js");
const webpackOptionsSchema = require("../schemas/WebpackOptions.json");
const Compiler = require("./Compiler");
const MultiCompiler = require("./MultiCompiler");
const WebpackOptionsApply = require("./WebpackOptionsApply");
const {
	applyWebpackOptionsDefaults,
	applyWebpackOptionsBaseDefaults
} = require("./config/defaults");
const { getNormalizedWebpackOptions } = require("./config/normalization");
const NodeEnvironmentPlugin = require("./node/NodeEnvironmentPlugin");
const memoize = require("./util/memoize");

/** @typedef {import("../declarations/WebpackOptions").WebpackOptions} WebpackOptions */
/** @typedef {import("../declarations/WebpackOptions").WebpackPluginFunction} WebpackPluginFunction */
/** @typedef {import("./Compiler").WatchOptions} WatchOptions */
/** @typedef {import("./MultiCompiler").MultiCompilerOptions} MultiCompilerOptions */
/** @typedef {import("./MultiStats")} MultiStats */
/** @typedef {import("./Stats")} Stats */

const getValidateSchema = memoize(() => require("./validateSchema"));

/**
 * @template T
 * @callback Callback
 * @param {Error | null} err
 * @param {T=} stats
 * @returns {void}
 */

/**
 * @param {ReadonlyArray<WebpackOptions>} childOptions options array
 * @param {MultiCompilerOptions} options options
 * @returns {MultiCompiler} a multi-compiler
 */
const createMultiCompiler = (childOptions, options) => {
	const compilers = childOptions.map((options, index) =>
		createCompiler(options, index)
	);
	const compiler = new MultiCompiler(compilers, options);
	for (const childCompiler of compilers) {
		if (childCompiler.options.dependencies) {
			compiler.setDependencies(
				childCompiler,
				childCompiler.options.dependencies
			);
		}
	}
	return compiler;
};

/**
 * @param {WebpackOptions} rawOptions options object
 * @param {number} [compilerIndex] index of compiler
 * @returns {Compiler} a compiler
 */
const createCompiler = (rawOptions, compilerIndex) => {
	/*note: 格式化、初始化传入的参数（如 output、devserver、 plugin 给赋值一些默认的配置格式，防止后面使用时报错）
	getNormalizedWebpackOptions + applyWebpackOptionsBaseDefaults 合并出最终的 webpack 配置
	*/
	const options = getNormalizedWebpackOptions(rawOptions);
	applyWebpackOptionsBaseDefaults(options);

	/*note: 通过 Compiler 构造函数，创建一个 Compiler 对象，并调用 apply 方法，将 NodeEnvironmentPlugin 插件应用到 Compiler 对象上，*/
	const compiler = new Compiler(
		/** @type {string} */ (options.context),
		options
	);
	/*note: 把 NodeEnvironmentPlugin 插件挂载到compiler实例上
	NodeEnvironmentPlugin 插件主要是文件系统挂载到compiler对象上
	如 infrastructureLogger(log插件)、inputFileSystem(文件输入插件)、outputFileSystem(文件输出插件)、watchFileSystem(监听文件输入插件)*/
	new NodeEnvironmentPlugin({
		infrastructureLogging: options.infrastructureLogging
	}).apply(compiler);
	/*note: 注册所有的插件 */
	if (Array.isArray(options.plugins)) {
		for (const plugin of options.plugins) {
			if (typeof plugin === "function") {
				/** @type {WebpackPluginFunction} */
				/*note: 如果插件是一个函数，用 call 的形式调用该函数，并把 compiler 传递给该函数*/
				(plugin).call(compiler, compiler);
			} else if (plugin) {
				/*note: 如果插件是对象形式，那么插件都会有 apply 方法，调用插件的 apply 函数并把 compiler 当参数
				写一个 webpack 插件类似：class MyPlugin = { apply(compiler) {} }
				*/
				plugin.apply(compiler);
			}
		}
	}
	const resolvedDefaultOptions = applyWebpackOptionsDefaults(
		options,
		compilerIndex
	);
	if (resolvedDefaultOptions.platform) {
		compiler.platform = resolvedDefaultOptions.platform;
	}
	/*note []: 调用 compiler 的钩子函数，触发 environment 和 afterEnvironment 钩子函数*/
	compiler.hooks.environment.call();
	compiler.hooks.afterEnvironment.call();
	/*note []: 主要用于处理 config 文件中除了 plugins 之外的其他属性
	这里非常重要（lib/WebpackOptionsApply.js） ，会将配置的一些属性转换成插件注入到 webpack 中国呢
	例如：入口 entry 会被转换成插件注入到 webpack 中
	*/
	new WebpackOptionsApply().process(options, compiler);
	/*note []: 调用 initialize 钩子函数·*/
	compiler.hooks.initialize.call();
	/*note []: 返回 compiler */
	return compiler;
};

/**
 * @callback WebpackFunctionSingle
 * @param {WebpackOptions} options options object
 * @param {Callback<Stats>=} callback callback
 * @returns {Compiler} the compiler object
 */

/**
 * @callback WebpackFunctionMulti
 * @param {ReadonlyArray<WebpackOptions> & MultiCompilerOptions} options options objects
 * @param {Callback<MultiStats>=} callback callback
 * @returns {MultiCompiler} the multi compiler object
 */

/**
 * @template T
 * @param {Array<T> | T} options options
 * @returns {Array<T>} array of options
 */
const asArray = options =>
	Array.isArray(options) ? Array.from(options) : [options];

const webpack = /** @type {WebpackFunctionSingle & WebpackFunctionMulti} */ (
	/**
	 * @param {WebpackOptions | (ReadonlyArray<WebpackOptions> & MultiCompilerOptions)} options options
	 * @param {Callback<Stats> & Callback<MultiStats>=} callback callback
	 * @returns {Compiler | MultiCompiler | null} Compiler or MultiCompiler
	 */
	(options, callback) => {
		const create = () => {
			if (!asArray(options).every(webpackOptionsSchemaCheck)) {
				getValidateSchema()(webpackOptionsSchema, options);
				util.deprecate(
					() => {},
					"webpack bug: Pre-compiled schema reports error while real schema is happy. This has performance drawbacks.",
					"DEP_WEBPACK_PRE_COMPILED_SCHEMA_INVALID"
				)();
			}
			/*note: 1.定义 compiler、watch、watchOptions*/
			/** @type {MultiCompiler|Compiler} */
			let compiler;
			/** @type {boolean | undefined} */
			let watch = false;
			/** @type {WatchOptions|WatchOptions[]} */
			let watchOptions;
			if (Array.isArray(options)) {
				/** @type {MultiCompiler} */
				compiler = createMultiCompiler(
					options,
					/** @type {MultiCompilerOptions} */ (options)
				);
				watch = options.some(options => options.watch);
				watchOptions = options.map(options => options.watchOptions || {});
			} else {
				const webpackOptions = /** @type {WebpackOptions} */ (options);
				/** @type {Compiler} */
				/*note: 2.通过createCompiler 创建 compiler 对象*/
				compiler = createCompiler(webpackOptions);
				watch = webpackOptions.watch;
				watchOptions = webpackOptions.watchOptions || {};
			}
			return { compiler, watch, watchOptions };
		};

		/*note: 判断调用webpack是否传入 callback 回调函数。
		无论是否传入，最终均返回一个 compiler 对象。该对象由 create 方法返回
		*/
		if (callback) {
			try {
				const { compiler, watch, watchOptions } = create();
				if (watch) {
					compiler.watch(watchOptions, callback);
				} else {
					compiler.run((err, stats) => {
						compiler.close(err2 => {
							callback(
								err || err2,
								/** @type {options extends WebpackOptions ? Stats : MultiStats} */
								(stats)
							);
						});
					});
				}
				return compiler;
			} catch (err) {
				process.nextTick(() => callback(/** @type {Error} */ (err)));
				return null;
			}
		} else {
			const { compiler, watch } = create();
			if (watch) {
				util.deprecate(
					() => {},
					"A 'callback' argument needs to be provided to the 'webpack(options, callback)' function when the 'watch' option is set. There is no way to handle the 'watch' option without a callback.",
					"DEP_WEBPACK_WATCH_WITHOUT_CALLBACK"
				)();
			}
			return compiler;
		}
	}
);

module.exports = webpack;

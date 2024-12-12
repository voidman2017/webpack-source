(function (modules) {
	//  保存已经执行并且注册了的模块，区别于modules。起到缓存作用
	var installedModules = {};

	/*
	 * 动态加载指定模块的功能函数。
	 * 这个函数是Webpack运行时的核心部分，用于根据模块的ID动态地加载和执行模块。
	 *
	 * @param {string} moduleId 想要加载的模块的ID。
	 * @returns {any} 加载的模块所导出的变量或对象。
	 */
	/* 
	通过moduleId执行指定的模块，并获取该模块对外暴露的变量  
	这段代码是webpack的运行时代码，用于动态加载模块。
	具体来说，它的功能是根据模块ID加载对应的模块，并返回该模块的导出对象。
	如果模块已经被加载过，则直接返回该模块的导出对象；
	否则，创建一个新的模块对象，调用对应模块的加载函数，将模块导出对象设置为加载后的结果，并返回该模块的导出对象。 */
	function __webpack_require__(moduleId) {
		// 检查模块是否已经加载过，如果是，则直接返回该模块的导出对象。
		if (installedModules[moduleId]) {
			return installedModules[moduleId].exports;
		}

		// 初始化一个新的模块对象，并将其保存到installedModules中。
		var module = (installedModules[moduleId] = {
			i: moduleId, // 模块的ID。
			l: false, // 模块是否已经加载的标记。
			exports: {} // 模块的导出对象。
		});

		// 执行模块的加载函数，传入模块的导出对象、模块对象和__webpack_require__函数本身作为参数。
		modules[moduleId].call(
			module.exports,
			module,
			module.exports,
			__webpack_require__
		);

		// 标记模块为已经加载。
		module.l = true;

		// 返回模块的导出对象。
		return module.exports;
	}

	/* 这个属性包含所有模块定义的对象。每个键值对的键是模块 ID，值是模块定义函数。 */
	__webpack_require__.m = modules;
	/* 这个属性是一个对象，用于缓存已经加载的模块。每个模块的缓存对象包含模块的 exports 和一些元数据。 */
	__webpack_require__.c = installedModules;

	/* 这个方法用于在模块的导出对象上定义 getter 属性。常用于处理 ES 模块的导出。提供给具体的模块使用，模块通过该方法定义暴露的变量 */
	__webpack_require__.d = function (exports, name, getter) {
		if (!__webpack_require__.o(exports, name)) {
			Object.defineProperty(exports, name, { enumerable: true, get: getter });
		}
	};

	/* 这个方法用于标记模块为 ES 模块。它会在模块的导出对象上定义 __esModule 属性。 */
	__webpack_require__.r = function (exports) {
		if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
			Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		}
		Object.defineProperty(exports, "__esModule", { value: true });
	};

	/* 这个方法用于加载模块，并处理不同类型的模块（如 CommonJS 模块和 ES 模块）。它会根据模块类型返回不同的导出内容。 */
	__webpack_require__.t = function (value, mode) {
		if (mode & 1) value = __webpack_require__(value);
		if (mode & 8) return value;
		if (mode & 4 && typeof value === "object" && value && value.__esModule)
			return value;
		var ns = Object.create(null);
		__webpack_require__.r(ns);
		Object.defineProperty(ns, "default", { enumerable: true, value: value });
		if (mode & 2 && typeof value != "string")
			for (var key in value)
				__webpack_require__.d(
					ns,
					key,
					function (key) {
						return value[key];
					}.bind(null, key)
				);
		return ns;
	};

	/* 这个方法用于获取模块的默认导出。它返回一个函数，该函数返回模块的默认导出。 */
	__webpack_require__.n = function (module) {
		var getter =
			module && module.__esModule
				? function getDefault() {
						return module["default"];
					}
				: function getModuleExports() {
						return module;
					};
		__webpack_require__.d(getter, "a", getter);
		return getter;
	};

	/* 这个方法用于检查对象上是否存在某个属性。 */
	__webpack_require__.o = function (object, property) {
		return Object.prototype.hasOwnProperty.call(object, property);
	};

	/* 这个属性用于设置公共路径（public path），用于处理动态加载的资源。 */
	__webpack_require__.p = "";

	/* 最终调用 __webpack_require__ 方法，并传入入口模块的 ID，启动应用程序。 */
	return __webpack_require__((__webpack_require__.s = "./src/index.js"));
})({
	"./src/index.js": function (module, exports) {
		console.log("index.js");
		module.exports = "这是入口文件";
	}
});

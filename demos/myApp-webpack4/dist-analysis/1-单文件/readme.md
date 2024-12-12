# 产物代码结构

折叠产物 bundle.js 第一行代码，可以得到如下的代码 ：

```javascript
(function (modules) {
	// debugger this
	//...
})({
	"./src/index.js": function (module, exports) {
		console.log("index.js");
		module.exports = "";
	}
});

// 改造一下 =>

const modules = {
	"./src/index.js": function (module, exports) {
		console.log("index.js");
		module.exports = "";
	}
}(function (modules) {
	// debugger this
	//...
})(modules);
```

整个代码段通过IIFE的形式封装了模块加载器的核心逻辑，并立即执行了这个加载器，传入了一个包含至少一个模块（本例中为./src/index.js）的配置对象。这个设计模式在JavaScript模块化开发中非常常见，特别是在使用如Webpack这样的构建工具时，用于管理和执行模块化的代码。

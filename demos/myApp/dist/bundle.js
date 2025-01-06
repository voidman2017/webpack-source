/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/1.js":
/*!******************!*\
  !*** ./src/1.js ***!
  \******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _2_2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./2/2.js */ "./src/2/2.js");
/* harmony import */ var _2_2_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_2_2_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _2_3_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./2/3.js */ "./src/2/3.js");
/* harmony import */ var _2_3_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_2_3_js__WEBPACK_IMPORTED_MODULE_1__);
console.log(1111111);


window.aaa = 1111111;

/***/ }),

/***/ "./src/2/2.js":
/*!********************!*\
  !*** ./src/2/2.js ***!
  \********************/
/***/ (() => {

console.log(2222222);
window.aaa = 2222222;

/***/ }),

/***/ "./src/2/3.js":
/*!********************!*\
  !*** ./src/2/3.js ***!
  \********************/
/***/ (() => {

console.log(3333333);
window.aaa = 3333333;

/***/ }),

/***/ "./src/sum.js":
/*!********************!*\
  !*** ./src/sum.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   sum: () => (/* binding */ sum)
/* harmony export */ });
function sum(a, b) {
  return a + b;
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   name: () => (/* binding */ name)
/* harmony export */ });
/* harmony import */ var _sum_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sum.js */ "./src/sum.js");
/* harmony import */ var _1_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./1.js */ "./src/1.js");


Promise.resolve(/*! import() */).then(__webpack_require__.bind(__webpack_require__, /*! ./1.js */ "./src/1.js")).then(function (module) {
  console.log('1.js加载完成');
});
console.log("index.js");
console.log((0,_sum_js__WEBPACK_IMPORTED_MODULE_0__.sum)(1, 2));
var name = "这是入口文件";
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map
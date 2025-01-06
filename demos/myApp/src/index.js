import { sum } from "./sum.js";
import './1.js'

// 添加热更新接收代码
if (module.hot) {
	console.log("module.hot",module);
  module.hot.accept('./1.js', function() {
    console.log('1.js模块已更新');
    // 这里可以执行更新后的逻辑
  });
}

console.log("index.js");
console.log(sum(1, 2));

export const name = "这是入口文件";
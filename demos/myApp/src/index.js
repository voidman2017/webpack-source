import { sum } from "./sum.js";
import './1.js'
import('./1.js').then(module => {
	console.log('1.js加载完成')
})

console.log("index.js");
console.log(sum(1, 2));

export const name = "这是入口文件";

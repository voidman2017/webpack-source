/* https://juejin.cn/post/7040982789650382855 */
const {
	SyncHook,
	SyncBailHook,
	SyncWaterfallHook,
	SyncLoopHook,
	AsyncParallelHook,
	AsyncParallelBailHook,
	AsyncSeriesHook,
	AsyncSeriesBailHook,
	AsyncSeriesWaterfallHook
} = require("tapable");

// 初始化同步钩子
const hook = new SyncHook(["arg1", "arg2", "arg3"]);

// 注册事件
hook.tap("flag1", (arg1, arg2, arg3) => {
	console.log("flag1:", arg1, arg2, arg3);
});

hook.tap("flag2", (arg1, arg2, arg3) => {
	console.log("flag2:", arg1, arg2, arg3);
});

// 调用事件并传递执行参数
hook.call("aaa", "bbb", "ccc");

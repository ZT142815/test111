const { SyncHook } = require("tapable");

// 初始化同步钩子
const hook = new SyncHook(["arg1", "arg2", "arg3"]);

// 注册事件
hook.tap("test1", (arg1, arg2, arg3) => {
  console.log("test1:", arg1, arg2, arg3);
});

hook.tap("test2", (arg1, arg2, arg3) => {
    console.log("test2:", arg1, arg2, arg3);
});

// 调用事件并传递执行参数
hook.call('123','234','345')

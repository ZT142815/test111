// SyncBailHook 中如果任何事件有返回值的话，那么会立即中断后续事件函数的调用
const { SyncBailHook } = require("tapable");

const hook = new SyncBailHook(["arg1", "arg2", "arg3"]);

// 注册事件 
hook.tap("test1", (arg1, arg2, arg3) => {
  console.log("test1", arg1, arg2, arg3);
//   存在返回值的话 阻断test2事件的调用
  return true;
});

hook.tap("test2", (arg1, arg2, arg3) => {
    console.log("test1", arg1, arg2, arg3);
});

hook.call('123','123','123');

// 打印结果 test1 123 123 123
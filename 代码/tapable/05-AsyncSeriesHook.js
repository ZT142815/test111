// AsyncSeriesHook 钩子表示异步串联执行
const { AsyncSeriesHook } = require("tapable");

const hook = new AsyncSeriesHook(["arg1", "arg2", "arg3"]);

console.time("timer");

hook.tapAsync("test1", (arg1, arg2, arg3, callback) => {
  console.log("test1", arg1, arg2, arg3);
  setTimeout(() => {
    callback();
  }, 1000);
});

hook.tapPromise("test2", (arg1, arg2, arg3) => {
  console.log("test2", arg1, arg2, arg3);
  // tabPromise返回promise
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
});

hook.callAsync('123','234','345',()=>{
    console.log('全部执行完毕');
    console.timeEnd('timer')
})

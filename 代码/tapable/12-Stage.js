const { SyncHook } = require("tapable");

const hook = new SyncHook();

//stage这个属性的类型是数字，数字越大事件回调函数执行的越晚，不传的话默认为0
//before和stage同时使用的话，优先处理before
hook.tap(
  {
    name: "test1",
    stage: 10,
  },
  () => {
    console.log("我是test1，我的stage是10");
  }
);

hook.tap(
  {
    name: "test2",
    stage: 5,
  },
  () => {
    console.log("我是test2，我的stage是5");
  }
);

hook.call();

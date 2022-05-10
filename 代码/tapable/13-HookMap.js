const { HookMap, SyncHook } = require("tapable");

//创建hookmap实例
const keyHook = new HookMap((key) => new SyncHook(["arg"]));

//在keyhook中创建一个name为key1的hook，同时为该hook通过tap注册事件
keyHook.for('key1').tap('test1',(arg)=>{
    console.log('test1',arg)
})
//在keyhook中创建一个name为key2的hook，同时为该hook通过tap注册事件
keyHook.for('key2').tap('test2',(arg)=>{
    console.log('test2',arg)
})
//在keyhook中创建一个name为key3的hook，同时为该hook通过tap注册事件
keyHook.for('key3').tap('test3',(arg)=>{
    console.log('test3',arg)
})
//从hookmap中拿到name为key2的hook
const hook = keyHook.get('key2')

if(hook) {
    // 通过call触发hook
    hook.call('hello')
}
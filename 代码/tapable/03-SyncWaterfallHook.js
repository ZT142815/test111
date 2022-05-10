// SyncWaterfallHook 瀑布钩子会将上一个函数的返回值传递给下一个函数作为参数
// 当存在多个参数的时候，SyncWaterfallHook仅能修改第一个参数的返回值
const {SyncWaterfallHook} = require('tapable');

const hook = new SyncWaterfallHook(['arg1','arg2','arg3']);

// 注册事件
hook.tap('test1',(arg1,arg2,arg3)=>{
    console.log('test1',arg1,arg2,arg3)
    // 存在返回值
    return 'github'
})

hook.tap('test2',(arg1,arg2,arg3)=>{
    console.log('test2',arg1,arg2,arg3)
})

hook.tap('test3',(arg1,arg2,arg3)=>{
    console.log('test3',arg1,arg2,arg3)
})

// 调用事件并传递参数
hook.call('123','234','345')

// 输出结果
// test1 123 234 345
// test2 github 234 345
// test3 github 234 345
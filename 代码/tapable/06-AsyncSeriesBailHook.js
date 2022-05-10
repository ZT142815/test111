const {AsyncSeriesBailHook} = require('tapable');

const hook = new AsyncSeriesBailHook(['arg1','arg2','arg3']);

console.time('timer');

// 注册事件
hook.tapPromise('test1',(arg1,arg2,arg3,callback)=>{
    console.log('test1',arg1,arg2,arg3);
    return new Promise((resolve)=>{
        setTimeout(()=>{
            // resolve存在任何值表示存在返回值
            // 存在返回值，保险打开，中断后续执行
            resolve(true)
        },1000)
    })
})

hook.tapPromise('test2',(arg1,arg2,arg3,callback)=>{
    console.log('test2',arg1,arg2,arg3);
    return new Promise((resolve)=>{
        setTimeout(()=>{
            callback()
        },1000)
    })
})

hook.callAsync('123','234','345',()=>{
    console.log('全部执行完毕')
    console.timeEnd('timer')
})
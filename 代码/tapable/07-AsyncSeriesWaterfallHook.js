const {AsyncSeriesWaterfallHook} = require('tapable')

const hook = new AsyncSeriesWaterfallHook(['arg1','arg2','arg3']);

console.time('timer');

// 注册事件
hook.tapPromise('test1',(arg1,arg2,arg3)=>{
    console.log('test1',arg1,arg2,arg3);
    return new Promise((resolve)=>{
        setTimeout(() => {
            resolve(true)
        }, 1000);
    })
})

hook.tapAsync('test2',(arg1,arg2,arg3,callback)=>{
    console.log('test2',arg1,arg2,arg3);
    setTimeout(()=>{
        callback()
    },1000)
})

hook.callAsync('123','234','345',()=>{
    console.log('全部执行完毕')
    console.timeEnd('timer')
})
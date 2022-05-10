const {AsyncParallelBailHook} = require('tapable')

console.time('timer');

const hook = new AsyncParallelBailHook(['arg1','arg2','arg3']);

// 注册事件
hook.tapPromise('test1',(arg1,arg2,arg3)=>{
    
    return new Promise((resolve)=>{
        console.log('test1',arg1,arg2,arg3)
        // setTimeout(() => {
            resolve(true)
        // }, 1000);
    })
})

hook.tapAsync('test2',(arg1,arg2,arg3,callback)=>{
    
    setTimeout(() => {
        console.log('test2',arg1,arg2,arg3)
        callback()
    }, 3000);
})

hook.callAsync('123','234','345',()=>{
    console.log('全部执行完毕')
    console.timeEnd('timer')
})
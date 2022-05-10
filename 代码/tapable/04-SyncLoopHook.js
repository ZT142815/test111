// SyncLoopHook 钩子会在任意一个被监听的函数存在非undefined返回值的时候从头开始执行
const {SyncLoopHook} = require('tapable')

const hook = new SyncLoopHook(['arg1','arg2','arg3']);

let flag1 = 2;
let flag2 = 1;

// 注册事件
hook.tap('test1',(arg1,arg2,arg3)=>{
    console.log('test1');
    if (flag1 !== 3) {
        return flag1++
    }
})

hook.tap('test2',(arg1,arg2,arg3)=>{
    console.log('test2');
    if (flag2 !== 3) {
        return flag2++
    }
})

hook.call()

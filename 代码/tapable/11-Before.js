const {SyncHook} =require('tapable');

const hook = new SyncHook();

hook.tap('test1',()=>{
    console.log('我是test1');
})


//before属性可以传入一个数组或者字符串，值为注册事件对象的名称，可以修改当前事件函数在传入的事件名称对应的函数之前执行
hook.tap({
    name: 'test2',
    before: 'test1'
},()=>{
    console.log('我是test2')
})

hook.call()
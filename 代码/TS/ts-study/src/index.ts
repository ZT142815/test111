function greeter(person:string) {
    return "hello," + person;
}

const user = "Jane User";


// 基本数据类型
// 布尔
const isLoading:boolean = false;
// 数字
const num:number = 12;
// 字符串
const str:string = 'hello';
// 空值
// 表示没有任何类型，当一个函数没有返回值的是欧，通常返回值的类型是void
// 实际上只有undefinde可以赋给void
function warnUser(): void {
    console.log(213)
}
const a: void = undefined;
// null和undefinde
// null和undefinde是所有类型的子类
let b: null = null;
let c: undefined = undefined;
// symbol的值是唯一不变的
const sym1 = Symbol('key1')



// 非原始数据类型
// any
// 当我们要给一个还不清楚类型的变量指定一个类型的时候
// 通常情况下，我们不应该首先考虑使用次类型
let notSure:any = 4;
// unknown
// 和any类似，但是unknown在确定是某个类型之前，不能进行任何操作，比如实力化、getter、函数执行等
// nerver
// 表示永不存在的值，nerver类型也是任何类型的字类型
// 空数组，而且永远是空的
const empty: never[] = [];
// 数组：两种定义方式：
// 泛型
const list:Array<number> = [];
// 常用
const list1:number[] = [1,1];
// 元祖(tuple):和数组类似，表示一个已知元素数量和类型的数组，各元素的类型不必相同
let x: [string,number];
x=['234',123];
// Object:表示非原始数据类型
// 普通对象、枚举、数组、元祖都是object类型



// 枚举类型
// 数组枚举
enum Direction {
    Up,
    Down,
    Right,
    Left
}
// 没有赋值的话，默认是数字类型，而且默认从0开始；
Direction.Up === 0;
Direction.Down === 1;
Direction.Right === 2;
Direction.Left === 3;
// 字符串枚举
enum Direction1 {
    Up = 'UP',
    Dowm = 'Dowm',
    Right = 'Right',
    Left = 'Left'
}
// console.log(Direction1.Up)  Up 
// console.log(Direction1['Dowm'])   Dowm
// 异构枚举：就是混合使用
enum Direction2 {
    No = 0,
    Yes = 'yes'
}
// 接口Interface
// 接口的使用
const test = (test:Test) => test.name;
interface Test {
    name:string;
}
// 可选属性
interface Test1 {
    name?:string; //可选属性
}
// 只读属性
interface Test2 {
    readonly name:string;
}
// 函数类型怎么用接口表示呢：两种方式
// 第一种：
interface Test3 {
    func: (value:string) => string
}
// 第二种：
// 先定义函数接口
interface Func {
    (value:string) : string
}
// 再使用
interface Test4 {
    func: Func
}
// 属性检查
interface Config {
    width?: number;
}
const calc: (config:Config) => {area:number} = (config) => {
    let square = 100;
    if (config.width) {
        square = config.width * config.width;
    }
    return {area: square};
}
calc({widdth:3}); //类型“{ widdth: number; }”的参数不能赋给类型“Config”的参数。
// 三种处理方式
// 第一种:类型断言
// calc({widdth:5} as Config);
// 第二种：添加字符串索引签名
// interface Config {
//     width?: number;
//     [propName: string] : any;
// }
// 第三种
// 将字面量赋给另一个值
// const option: any = {widdth:4};
// calc(option);

// 可索引类型
interface Phone {
    [name:string]: string
}
interface User {
    name: string;
    age?: number;
    readonly isMale: boolean;
    say: () => string;
    phone: Phone;
}

// 继承接口
interface VipUser extends User {
    broadcast: () => void;
}

// Function(函数)
const add = (a:number,b:number) => a + b;
const add1: (a:number,b:number) => number = (a:number,b:number) => a + b;
const add2 = (a:number,b?:number) => a + (b ? b : 0);

function add3<T>(arr:Array<T>) {
    console.log(arr.length);
    return 123;
}



// 类型断言
const obj = {};
obj.name = 'zhoutao';
obj.age = 25;
// 报错，报错原因是没有先定义属性
interface Obj {
    name: string;
    age: number;
}
const obj1 = {} as Obj;
obj1.name = 'zhoutao';
obj1.age = 25;
// 双重断言
interface Person {
    name: string;
    age: number;
}
const person = 'zhoutao' as any as Person;



// 类型守卫
























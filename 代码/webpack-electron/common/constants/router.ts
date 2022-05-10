// 模块路径
const ROUTER = {
    login: '/',
    home: '/home',
    task: '/task',
    webview: '/webview'
}
export default ROUTER;

export const ROUTER_KEY = {
    login: 'login',
    home: 'home',
    task: 'task'
}

// 定义入口模块
export const ROUTER_ENTRY: TSRouter.Item[] = [
    {
        url: ROUTER.task,
        key: 'task',
        text: '任务管理'
    },
    {
        url: 'https://www.baidu.com',
        key: 'baidu',
        text: '百度'
    },
    {
        url: 'https://juejin.cn/',
        key: 'juejin',
        text: '掘金'
    }
]



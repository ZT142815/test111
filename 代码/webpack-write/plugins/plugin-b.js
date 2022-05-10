class PluginB {
    apply(compiler) {
        // 注册同步钩子
        // 这里的compiler对象就是我们new Compiler创建的实例
        compiler.hooks.done.tap("Plugin B", () => {
            console.log('PluginB')
        })
    }
}

module.exports = PluginB;
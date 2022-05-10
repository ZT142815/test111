const { SyncHook } = require("tapable");
const { toUnixPath } = require("./utils/index");
const path = require("path");
const fs = require("fs");
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generator = require('@babel/generator').default;
const t = require('@babel/types');
const tryExtensions = require('./utils/index')

class Compiler {
  constructor(options) {
    this.options = options;
    // 相对路径 context参数
    this.rootPath = this.options.context || toUnixPath(process.cwd());
    this.hooks = {
      //  开始编译时的钩子
      run: new SyncHook(),
      //  输出assets到output目录之前执行（写入文件之前）
      emit: new SyncHook(),
      //  在compilation完成时执行，全部编译完成执行
      done: new SyncHook(),
    };
    // 保存所有入口模块的对象
    this.entries = new Set();
    // 保存所有依赖模块的对象
    this.modules = new Set();
    // 保存所有代码块对象
    this.chunks = new Set();
    // 保存本次产出的文件对象
    this.assets = new Set();
    // 保存本次编译所有产出的文件名
    this.files = new Set();
  }
  run(callback) {
    // 当调用run方式时，触发开始编译的plugin
    this.hooks.run.call();
    // 获取入口配置对象
    const entry = this.getEntry();
    // 编译入口文件
    this.buildEntryModule(entry);
  }

  getEntry() {
    let entry = Object.create(null);
    const { entry: optionsEntry } = this.options;
    if (typeof optionsEntry === "string") {
      entry["main"] = optionsEntry;
    } else {
      entry = optionsEntry;
    }
    Object.keys(entry).forEach((key) => {
      const value = entry[key];
      if (!path.isAbsolute(value)) {
        // 转化为绝对路径的同时统一路径分隔符为 /
        entry[key] = toUnixPath(path.join(this.rootPath, value));
      }
    });
    return entry;
  }

  buildEntryModule(entry) {
    Object.keys(entry).forEach((entryName) => {
      const entryPath = entry[entryName];
      const entryObj = this.buildModule(entryName, entryPath);
      this.entries.add(entryObj)
    });
    console.log(123123,this.entries)
  }

  // 模块编译方法
  buildModule(moduleName, modulePath) {
    //   1、读取文件原始代码
    const originSourceCode = (this.originSourceCode = fs.readFileSync(
      modulePath,
      "utf-8"
    ));
    this.moduleCode = originSourceCode;
    //  2、调用loader来处理
    this.handleLoader(modulePath);
    // 3. 调用webpack 进行模块编译 获得最终的module对象
    const module = this.handleWebpackCompiler(moduleName, modulePath);
    // 4. 返回对应module
    return module

  }

  //   匹配loader处理
  handleLoader(modulePath) {
    const matchLoaders = [];
    // 获取所有的loader规则
    const rules = this.options.module.rules;
    rules.forEach((loader) => {
      const testRule = loader.test;
      if (testRule.test(modulePath)) {
        if (loader.loader) {
          matchLoaders.push(loader.loader);
        } else {
          matchLoaders.push(...loader.use);
        }
      }
      //   倒序执行loader传入源代码
      for (let i = matchLoaders.length - 1; i>=0; i--) {
          const loaderFn = require(matchLoaders[i])
          this.moduleCode = loaderFn(this.moduleCode);
      }
    });
    
  }

   // 调用webpack进行模块编译
   handleWebpackCompiler(moduleName, modulePath) {
    // 将当前模块相对于项目启动根目录计算出相对路径 作为模块ID
    const moduleId = './' + path.posix.relative(this.rootPath, modulePath);
    // 创建模块对象
    const module = {
      id: moduleId,
      dependencies: new Set(), // 该模块所依赖模块绝对路径地址
      name: [moduleName], // 该模块所属的入口文件
    };
    // 调用babel分析我们的代码
    const ast = parser.parse(this.moduleCode, {
      sourceType: 'module',
    });
    // 深度优先 遍历语法Tree
    traverse(ast, {
      // 当遇到require语句时
      CallExpression: (nodePath) => {
        const node = nodePath.node;
        if (node.callee.name === 'require') {
          // 获得源代码中引入模块相对路径
          const requirePath = node.arguments[0].value;
          // 寻找模块绝对路径 当前模块路径+require()对应相对路径
          const moduleDirName = path.posix.dirname(requirePath);
          const absolutePath = tryExtensions(
            path.posix.join(moduleDirName, requirePath),
            this.options.resolve.extensions,
            moduleName,
            moduleDirName
          );
          // 生成moduleId - 针对于跟路径的模块ID 添加进入新的依赖模块路径
          const moduleId =
            './' + path.posix.relative(this.rootPath, absolutePath);
          // 通过babel修改源代码中的require变成__webpack_require__语句
          node.callee = t.identifier('__webpack_require__');
          // 修改源代码中require语句引入的模块 全部修改变为相对于跟路径来处理
          node.arguments = [t.stringLiteral(moduleId)];
          // 为当前模块添加require语句造成的依赖(内容为相对于根路径的模块ID)
          module.dependencies.add(moduleId);
        }
      },
    });
    // 遍历结束根据AST生成新的代码
    const { code } = generator(ast);
    // 为当前模块挂载新的生成的代码
    module._source = code;
    // 递归依赖深度遍历 存在依赖模块则加入
    module.dependencies.forEach((dependency) => {
      const depModule = this.buildModule(moduleName, dependency);
      // 将编译后的任何依赖模块对象加入到modules对象中去
      this.modules.add(depModule);
    });
    // 返回当前模块对象
    return module;
  }

}

module.exports = Compiler;

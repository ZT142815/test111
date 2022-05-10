const importModule = require("@babel/helper-module-imports");
// const template = require("@babel/template");
const generate = require("@babel/generator");
module.exports = function (api, options, filename) {
  // 包含各种babel的api
  console.log(api)
  // 插件配置项目
  console.log(options)
  // 文件名称
  console.log(filename)
  const {types,template} = api;
  return {
    pre() {
      console.log('----遍历前调用----')
    },
    post() {
      console.log('----遍历后调用----')
    },
    visitor: {
      Program: {
        enter(path, state) {
          path.traverse({
            // CallExpression(path) {
            //     console.log(path.node)
            //   if (
            //     types.isMemberExpression(path.node.callee) &&
            //     path.node.callee.object.name === "console" &&
            //     ["log", "info", "error", "debug"].includes(
            //       path.node.callee.property.name
            //     )
            //   ) {
            //     const { line, column } = path.node.loc.start;
            //     path.node.arguments.unshift(
            //       types.stringLiteral(`filename:(${line}, ${column})`)
            //     );
            //   }
            // },
            CallExpression: {
              exit(path, state) {},
              enter(path, state) {
                
                // path.stop()
                  if (path.node.isNew) return;
                  const targetsCalleeName = ["log", "info", "error", "debug"].map(
                    (item) => `console.${item}`
                  );
                  const calleeName = generate.default(path.node.callee).code;
                  if (targetsCalleeName.includes(calleeName)) {
                    const { line, column } = path.node.loc.start;
                    const newNode = template.expression(
                      `console.log("filename: (${line}, ${column})")`
                    )();
                    newNode.isNew = true;
                    if (path.findParent((path) => path.isJSXElement())) {
                      path.replaceWith(
                        types.arrayExpression([newNode, path.node])
                      );
                      path.skip();
                    } else {
                      path.insertBefore(newNode);
                    }
                  }
              },
            },
          });
        },
      },
    },
  };
};

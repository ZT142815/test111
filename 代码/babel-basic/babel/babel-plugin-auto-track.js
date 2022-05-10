const importModule = require("@babel/helper-module-imports");
const { declare } = require("@babel/helper-plugin-utils");
const { type } = require("os");
const path = require("path");

// module.exports = declare((api, options, dirname) => {
//   api.assertVersion(7);
//   return {
//     visitor: {
//       Program: {
//         enter(path, state) {
//           path.traverse({
//             ImportDeclaration(importPath,state) {
//               let node  = importPath.node;
//               let value = node.source.value;
//               if(value === "@tarojs/components") {
//                 console.log(123123)
//               }
//             }
//           }
//       }
//     }
//       // 'ClassMethod|ArrowFunctionExpression|FunctionExpression|FunctionDeclaration'(path, state) {
//       //     const bodyPath = path.get('body');
//       //     if (bodyPath.isBlockStatement()) {
//       //         bodyPath.node.body.unshift(state.trackerAST);
//       //     } else {
//       //         const ast = api.template.statement(`{${state.trackerImportId}();return PREV_BODY;}`)({PREV_BODY: bodyPath.node});
//       //         bodyPath.replaceWith(ast);
//       //     }
//       // }
//     },
//   };
// });

module.exports = declare((api, options, dirname) => {
  api.assertVersion(7);
  const { template, types } = api;

  return {
    visitor: {
      Program: {
        enter(path, state) {
          path.traverse({
            ImportDeclaration(importPath) {
              let value = types.isImportDeclaration(importPath.node, {
                end: 75,
              });
              if (importPath.node.source.value !== "@/common/scrollview") {
                const fn = template(`import %%name%% from %%fromName%%;`);
                const ast = fn({
                  name: types.identifier("ScrollView"),
                  fromName: "@/common/scrollview",
                });
                ast.isNew = true;
                importPath.insertBefore(ast);
              }
              // console.log(123123,importPath.node)
              // let node = importPath.node;
              // let value = node.source.value;
              // let specifiers = node.specifiers;
              // const importTpl = template(`import %%name%% from %%fromName%%;`);
              // if (value === "@tarojs/components") {
              //   let index = specifiers.findIndex(
              //     (item) => item.imported.name === "ScrollView"
              //   );
              //   if (index > -1) {
              //     // 去除引入
              //     specifiers.splice(index, 1);
              //     const imp = importTpl({
              //       name: types.identifier("ScrollView"),
              //       fromName: "@/common/scrollview",
              //     });
              //     importPath.insertBefore(imp);
              //   }
              // }
            },
          });
        },
      },
    },
  };
});

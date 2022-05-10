const { declare } = require("@babel/helper-plugin-utils");

module.exports = declare((api, options, dirname) => {
  api.assertVersion(7);
  let intlIndex = 0;
  function nextIntlKey() {
    ++intlIndex;
    return `intl${intlIndex}`;
  }

  function save(file, key, value) {
    let aaa;
  }

  return {
    pre(file) {},
    visitor: {
      Program: {
        enter(path, state) {
          let imported;
          path.traverse({
            ImportDeclaration(importPath) {
              const importSource = importPath.node.source.value;
              if (importSource === "intl") {
                imported = true;
              }
            },
          });
          if (!imported) {
            const uid = path.scope.generateUid("intl");
            const importAst = api.template.ast(`import ${uid} from "intl"`);
            path.node.body.unshift(importAst);
            state.intlUid = uid;
          }
          path.traverse({
            "StringLiteral|TemplateLiteral"(literalPath) {
              leadingComments = literalPath.node.leadingComments;
              if (leadingComments) {
                path.node.leadingComments = leadingComments.filter(
                  (item, index) => {
                    if (item.value.includes("i18n-disable")) {
                      path.node.skipTransform = true;
                      return false;
                    }
                    return true;
                  }
                );
              }
            },
          });
        },
      },
      StringLiteral(stringPath, stringState) {
        if (stringPath.node.skipTransform) {
          return;
        }
        let key = nextIntlKey();
        save(stringState.file, key, stringPath.node.value);
      },
    },
    post(file) {},
  };
});

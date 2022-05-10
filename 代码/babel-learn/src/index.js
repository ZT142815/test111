const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const generate = require("@babel/generator").default;
const types = require("@babel/types");
const template = require("@babel/template")

const sourceCode = `
    console.log(1);

    function func() {
        console.info(2);
    }

    export default class Clazz {
        say() {
            console.debug(3);
        }
        render() {
            return <div>{console.error(4)}</div>
        }
    }
`;

const ast = parser.parse(sourceCode,{
  sourceType: 'unambiguous',
  plugins: ['jsx']
})

const targetCallee = ['log','info','error','debug'].map(item => `console.${item}`);
traverse(ast,{
  CallExpression(path,state) {
    if(path.node.isNew) return;
    const calleeName = generate(path.node.callee).code;
    if(targetCallee.includes(calleeName)) {
      const {line,column} = path.node.loc.start;
      const newNode = template.expression(`console.log("filename: (${line}, ${column})")`)();
      newNode.isNew = true;
      // 判断父节点是否是jsx
      if(path.findParent(path => path.isJSXElement())) {
        path.replaceWith(types.arrayExpression([newNode,path.node]));
        path.skip()
      } else {
        path.insertBefore(newNode)
      }
    }
  }
})

const {code,map} = generate(ast);
console.log(code)

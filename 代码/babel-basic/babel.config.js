const path = require("path");
const presets = [
  [
    "@babel/preset-react",
    {
      targets: {
        edge: "17",
        chrome: "64",
        firefox: "60",
        safari: "11.1",
      },
      useBuiltIns: "usage",
      corejs: 3,
    },
  ],
];

const plugins = [
  // path.resolve(__dirname, "./babel/index.js"),
    path.resolve(__dirname, "./babel/babel-plugin-auto-track.js"),
  // [path.resolve(__dirname, "./babel/babel-plugin-auto-log.js"),{data: '123'}]
];

module.exports = { presets, plugins };

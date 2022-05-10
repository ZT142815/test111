import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { reslove, resolve } from "path";

export default defineConfig(({ command, mode }) => {
  const commonConfig = {
    plugins: [react()],
    base: "./",
    resolve: {
      alias: [{ find: "@", replacement: resolve(__dirname, "src") }], //别名
      extensions: [".js", ".ts", ".tsx", ".jsx", ".json"], //默认配置['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
    },
    assetsInclude: ["**/*.gltf"],
    clearScreen: false,
  };
  if (command === "serve") {
    return {
      ...commonConfig,
      mode: "development",
      server: {
        host: "127.0.0.1", // 指定服务器主机名
        port: 3000, // 指定服务器端口
        open: true, // 在服务器启动时自动在浏览器中打开应用程序
        strictPort: false, // 设为 false 时，若端口已被占用则会尝试下一个可用端口,而不是直接退出
        https: false, // 是否开启 https
        cors: true, // 为开发服务器配置 CORS。默认启用并允许任何源
        proxy: {
          // 为开发服务器配置自定义代理规则
          // 字符串简写写法
          "/foo": "http://192.168.xxx.xxx:xxxx",
          // 选项写法
          "/api": {
            target: "http://192.168.xxx.xxx:xxxx", //代理接口
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, ""),
          },
        },
      },
    };
  } else {
    return {
      ...commonConfig,
      mode: "production",
      build: {
        //浏览器兼容性  "esnext"|"modules"
        target: "modules",
        //指定输出路径
        outDir: "dist",
        //生成静态资源的存放路径
        assetsDir: "assets",
        //小于此阈值的导入或引用资源将内联为 base64 编码，以避免额外的 http 请求。设置为 0 可以完全禁用此项
        assetsInlineLimit: 4096,
        // 启用/禁用 CSS 代码拆分。当启用时，在异步 chunk 中导入的 CSS 将内联到异步 chunk 本身，并在其被加载时插入。
        cssCodeSplit: true,
      },
    };
  }
});

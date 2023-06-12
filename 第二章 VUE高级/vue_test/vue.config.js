const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,//关闭语法检查
  //开启代理服务器
  // devServer: {
  //   proxy: {
  //     '/student': {
  //       target: 'http://localhost:8081',
  //       ws: true,
  //       changeOrigin: true,
  //     }
  //   }
  // }
})

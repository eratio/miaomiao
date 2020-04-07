module.exports = {
  devServer: {
    // 代理规则
    proxy: {
      '/api': {
        // 代理的目标服务器地址(比如提供后台服务API的服务器)
        target: 'http://39.97.33.178',
        // 开启代理（在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收返回的数据）
        changeOrigin: true
      }
    }
  }
}

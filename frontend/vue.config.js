module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'https://news-search-system-rzotgorz.app.secoder.net/', // 修改为你的Django服务器地址
        changOrigin: true
      }
    }
  }
}

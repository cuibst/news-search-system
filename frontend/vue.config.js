module.exports = {
  devServer: {
    proxy: {
      '/index': {
        target: 'https://news-search-lucene-rzotgorz.app.secoder.net', // 修改为你的Django服务器地址
        changOrigin: true
      }
    }
  }
}

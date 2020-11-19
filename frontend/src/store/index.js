import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    username: ''
  },
  mutations: {
    // 保存口令
    set_token (state, data) {
      state.token = data.token
      state.username = data.username
      var exdate = new Date()
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000)
      window.document.cookie = 'token' + '=' + data.token + ';path=/;expires=' + exdate.toGMTString()
      window.document.cookie = 'username' + '=' + data.username + ';path=/;expires=' + exdate.toGMTString()
    },
    rm_token (state) {
      state.token = ''
      var exdate = new Date()
      exdate.setTime(exdate.getTime() - 1)
      window.document.cookie = 'token=' + ' ;expires=' + exdate
      window.document.cookie = 'username=' + ' ;expires=' + exdate
    }
  }
})

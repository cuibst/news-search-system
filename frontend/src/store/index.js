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
      sessionStorage.token = data.token
      sessionStorage.username = data.username
    },
    // 删除口令
    rm_token (state) {
      state.token = ''
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('username')
    }
  }
})

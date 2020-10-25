import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: ''
  },
  mutations: {
    // 保存口令
    set_token (state, token) {
      state.token = token
      sessionStorage.token = token
    },
    // 删除口令
    rm_token (state) {
      state.token = ''
      sessionStorage.removeItem('token')
    }
  }
})

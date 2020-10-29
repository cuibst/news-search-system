import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import axios from 'axios'
import store from './store'

Vue.use(Vuex)
Vue.prototype.$http = axios
Vue.prototype.$store = store
Vue.config.productionTip = false

axios.defaults.headers.common['Authentication-Token'] = store.state.token
// 添加请求拦截器，每次请求加入Token
axios.interceptors.request.use(config => {
  if (store.state.token) {
    config.headers.common['Authentication-Token'] = store.state.token
  }
  console.log(config)
  return config
}, error => {
  return Promise.reject(error)
})
axios.interceptors.response.use(res => {
  return res
}, error => {
  if (error.response && error.response.status === 401) {
    this.$store.commit('rm_token')
    router.push('/login')
  }
  return Promise.reject(error)
}
)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

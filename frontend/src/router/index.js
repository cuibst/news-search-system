import Vue from 'vue'
import VueRouter from 'vue-router'
import Sample from '../components/Sample.vue'
import LoginPage from '../views/LoginPage.vue'
import RegisterPage from '../views/RegisterPage.vue'
import SearchResult from '../views/SearchResult.vue'
import '../assets/styles/global.css'
import store from '../store'

Vue.use(VueRouter)
if (sessionStorage.getItem('token')) {
  store.commit('set_token',sessionStorage.getItem('token'))
}
const routes = [
  { path: '/', redirect: '/login' },
  { path: '/sample', component: Sample },
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage
  },
  {
    path: '/register',
    name: 'RegisterPage',
    component: RegisterPage
  },
  {
    path: '/searchresult/:keyword',
    name: 'SearchResult',
    component: SearchResult
  }
]

const router = new VueRouter({
  mode: "history",
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some( r => r.meta.requiredAuth)) {
    if (store.state.token) {
      next();
    } else {
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      })
    }
  }
  else next();
})
export default router

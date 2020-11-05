import Vue from 'vue'
import VueRouter from 'vue-router'
import Sample from '../components/Sample.vue'
import Home from '../components/home.vue'
import LoginPage from '../views/LoginPage.vue'
import RegisterPage from '../views/RegisterPage.vue'
import SearchResult from '../views/SearchResult.vue'
import '../assets/styles/global.css'
import store from '../store'

Vue.use(VueRouter)
if (sessionStorage.getItem('token')) {
  store.commit('set_token', sessionStorage.getItem('token'))
}
const routes = [
  {
    path: '/home',
    component: Home,
    meta: { requiredAuth: false }
  },
  { path: '/', redirect: '/home' },
  {
    path: '/userhome',
    component: Home,
    meta: { requiredAuth: true }
  },
  {
    path: '/sample',
    component: Sample,
    meta: { requiredAuth: true }
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage,
    meta: { requiredAuth: false }
  },
  {
    path: '/register',
    name: 'RegisterPage',
    component: RegisterPage,
    meta: { requiredAuth: false }
  },
  {
    path: '/searchresult/:keyword',
    name: 'SearchResult',
    component: SearchResult,
    meta: { requiredAuth: false }
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.requiredAuth)) {
    if (store.state.token) {
      next()
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    }
  } else next()
})

export default router

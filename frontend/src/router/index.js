import Vue from 'vue'
import VueRouter from 'vue-router'
import Sample from '../components/Sample.vue'
import LoginPage from '../views/LoginPage.vue'
import RegisterPage from '../views/RegisterPage.vue'
import SearchResult from '../views/SearchResult.vue'
import '../assets/styles/global.css'

Vue.use(VueRouter)

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
  routes
})

export default router

import Vue from 'vue'
import VueRouter from 'vue-router'
import Sample from '../components/Sample.vue'
import Home from '../components/homepage.vue'
import LoginPage from '../views/LoginPage.vue'
import RegisterPage from '../views/RegisterPage.vue'
import '../assets/styles/global.css'

Vue.use(VueRouter)

const routes = [
  { path: '/home', component: Home },
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
  }
]

const router = new VueRouter({
  routes
})

export default router

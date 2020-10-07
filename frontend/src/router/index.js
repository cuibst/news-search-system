import Vue from 'vue'
import VueRouter from 'vue-router'
import Sample from '../components/Sample.vue'
import LoginPage from '../views/LoginPage.vue'
import Register from '../components/Register.vue'
import '../assets/styles/global.css'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/sample' },
  { path: '/sample', component: Sample },
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage
  },
  { path: '/register', component: Register }
]

const router = new VueRouter({
  routes
})

export default router

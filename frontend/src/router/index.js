import Vue from 'vue'
import VueRouter from 'vue-router'
import Sample from '../components/Sample.vue'
import Home from '../components/Home.vue'
import Login from '../components/Login.vue'
import '../assets/styles/global.css'

Vue.use(VueRouter)

const routes = [
  { path: '/home', component: Home },
  { path: '/', redirect: '/login' },
  { path: '/sample', component: Sample },
  { path: '/login', component: Login }
]

const router = new VueRouter({
  routes
})

export default router

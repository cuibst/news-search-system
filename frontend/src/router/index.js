import Vue from 'vue'
import VueRouter from 'vue-router'
import Sample from '../components/Sample.vue'
import Login from '../components/Login.vue'
import '../assets/styles/global.css'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/sample', component: Sample },
  { path: '/login', component: Login }
]

const router = new VueRouter({
  routes
})

export default router

import Vue from 'vue'
import VueRouter from 'vue-router'
import Sample from '../components/Sample.vue'
import Home from '../components/Home.vue'
import '../assets/styles/global.css'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/sample', component: Sample },
  { path: '/home', component: Home }
]

const router = new VueRouter({
  routes
})

export default router

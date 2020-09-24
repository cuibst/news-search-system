import Vue from 'vue'
import VueRouter from 'vue-router'
import Sample from '../components/Sample.vue'
import '../assets/styles/global.css'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/sample' },
  { path: '/sample', component: Sample }
]

const router = new VueRouter({
  routes
})

export default router

import Vue from 'vue'
import VueRouter from 'vue-router'
import Sample from '../components/Sample.vue'
import Home from '../components/home.vue'
import LoginPage from '../views/LoginPage.vue'
import RegisterPage from '../views/RegisterPage.vue'
import SearchResult from '../views/SearchResult.vue'
import UserPage from '../views/UserPage.vue'
import '../assets/styles/global.css'
import store from '../store'

Vue.use(VueRouter)
if (sessionStorage.getItem('token')) {
  store.commit('set_token', {
    token: sessionStorage.getItem('token'),
    username: sessionStorage.getItem('username')
  })
}
const routes = [
  {
    path: '/home',
    component: Home,
    meta: {
      requiredAuth: false,
      title: 'tg新闻-发现全球新闻'
    }
  },
  { path: '/', redirect: '/home' },
  {
    path: '/userhome',
    component: Home,
    meta: {
      requiredAuth: true,
      title: 'tg新闻-发现全球新闻'
    }
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
    meta: {
      requiredAuth: false,
      title: '用户登录-tg新闻'
    }
  },
  {
    path: '/register',
    name: 'RegisterPage',
    component: RegisterPage,
    meta: {
      requiredAuth: false,
      title: '用户注册-tg新闻'
    }
  },
  {
    path: '/searchresult/:keyword',
    name: 'SearchResult',
    component: SearchResult,
    meta: {
      requiredAuth: false,
      title: 'tg新闻搜索结果-'
    }
  },
  {
    path: '/user',
    name: 'UserPage',
    component: UserPage,
    meta: {
      requiredAuth: true,
      title: 'tg新闻-用户信息'
    }
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
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

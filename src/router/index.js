import Vue from 'vue'
import VueRouter from 'vue-router'
import Activity from '../views/Activity.vue'
import Article from '../views/Article.vue'
import Home from '../views/Home.vue'
import Playground from '../views/Playground.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    // 重定向
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/article',
    name: 'article',
    component: Article,
  },
  {
    path: '/activity',
    name: 'Activity',
    component: Activity,
  },
  {
    path: '/playground',
    name: 'Playground',
    component: Playground,
  },
  // {
  //   path: '/home',
  //   name: 'Home',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
  // }
]

const router = new VueRouter({
  routes,
})

export default router

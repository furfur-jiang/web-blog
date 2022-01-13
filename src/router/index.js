import Vue from 'vue'
import VueRouter from 'vue-router'
import Activity from '../views/Activity.vue'
import Article from '../views/Article.vue'
import Author from '../views/Author.vue'
import ActivityManage from '../views/Author/ActivityManage.vue'
import ArticleManage from '../views/Author/ArticleManage.vue'
import ContentManage from '../views/Author/ContentManage.vue'
import FansManage from '../views/Author/FansManage.vue'
import Index from '../views/Author/Index.vue'
import Problems from '../views/Author/Problems.vue'
import CreateArticle from '../views/CreateArticle.vue'
import Home from '../views/Home.vue'
import MenuContent from '../views/MenuContent.vue'
import Mine from '../views/Mine.vue'
import Playground from '../views/Playground.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'MenuContent',
    component: MenuContent,
    redirect: '/home',
    children: [
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
      {
        path: '/author',
        name: 'Author',
        component: Author,
        redirect: '/index',
        children: [
          {
            path: '/index',
            name: 'Index',
            component: Index,
          },
          {
            path: '/articleManage',
            name: 'ArticleManage',
            component: ArticleManage,
          },
          {
            path: '/contentManage',
            name: 'ContentManage',
            component: ContentManage,
          },
          {
            path: '/fansManage',
            name: 'FansManage',
            component: FansManage,
          },
          {
            path: '/activityManage',
            name: 'ActivityManage',
            component: ActivityManage,
          },
          {
            path: '/problems',
            name: 'Problems',
            component: Problems,
          },
        ],
      },
      {
        path: '/mine',
        name: 'Mine',
        component: Mine,
      },
    ],
  },
  { path: '/carete-article', name: 'CreateArticle', component: CreateArticle },

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

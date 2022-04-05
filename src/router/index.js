import Vue from 'vue'
import VueRouter from 'vue-router'



// 首页
import Home from '../views/Home.vue'

// 页面承载
import MenuContent from '../views/Menu/MenuContent.vue'

// 个人中心
import Mine from '../views/Mine/Mine.vue'
import EditUserMessage from '../views/Mine/EditUserMessage.vue'
import ShowMine from '../views/ShowMine/ShowMine.vue'


// 创作者中心
import CreateArticle from '../views/Author/CreateArticle.vue'
import EditArticle from '../views/Author/EditArticle.vue'
import Author from '../views/Author/Author.vue'
import ActivityManage from '../views/Author/components/ActivityManage.vue'
import ArticleManage from '../views/Author/components/ArticleManage.vue'
import ContentManage from '../views/Author/components/ContentManage.vue'
import FansManage from '../views/Author/components/FansManage.vue'
import Index from '../views/Author/components/Index.vue'
import Problems from '../views/Author/components/Problems.vue'

// 活动
import Activity from '../views/Activity/Activity.vue'

// 文章
import Article from '../views/Article.vue'


// 登录/注册
import Login from '../views/Login.vue'

// 论坛
import Forum from '../views/Forum/Forum.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'MenuContent',
        component: MenuContent,
        redirect: '/home',
        children: [{
                path: '/home',
                name: 'Home',
                component: Home,
            },
            {
                path: '/login',
                name: 'Login',
                component: Login,
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
                path: '/forum',
                name: 'Forum',
                component: Forum,
            },
            {
                path: 'edit-user-message',
                name: 'EditUserMessage',
                component: EditUserMessage,
            },
            {
                path: '/author',
                name: 'Author',
                component: Author,
                redirect: '/index',
                children: [{
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
            {
                path: '/show-mine',
                name: 'ShowMine',
                component: ShowMine,
            },
        ],
    },
    { path: '/create-article', name: 'CreateArticle', component: CreateArticle },
    { path: '/edit-article', name: 'EditArticle', component: EditArticle },

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
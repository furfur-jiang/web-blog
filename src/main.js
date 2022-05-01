import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios'
import CommentEditor from 'comment-message-editor'
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(ViewUI);
Vue.component(CommentEditor.name, CommentEditor)

// var instance = axios.create({
//     // baseURL: 'http://localhost:8089/web_blog/',
//     baseURL: '/api',
//     timeout: 1000,
// });
axios.defaults.baseURL = '/api'
axios.interceptors.request.use((config) => {
    const url = config.url
    if (url === '/login/checkLogin' || url === '/web_blog/user/saveUser') {
        return config;
    }
    const token = localStorage.getItem('token')
    const phone = localStorage.getItem('phone')
        // 判断是否有token，没有的话需要先登录
    if (token) {
        config.headers['token'] = token
        config.headers['phone'] = phone
    } else {
        router.push('/login')
    }
    return Promise.resolve(config)
}, function(error) {
    router.push('/login')
    return Promise.reject(error)
})
Vue.prototype.URL = 'http://192.168.1.102:8089'
Vue.prototype.$http = axios
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
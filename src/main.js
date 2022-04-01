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
var instance = axios.create({
    baseURL: 'http://localhost:8089/web_blog/',
    timeout: 1000,
});
Vue.prototype.$http = instance
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
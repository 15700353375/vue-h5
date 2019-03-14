/**
 * @Author:      changh
 * @DateTime:    2019-01-16 22:07:55
 * @Description: main.js
 */

// 引入相关依赖
import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import storeMain from '@Src/store/storeMain';
import routes from '@Src/routers';
import App from '@Src/App';
import moment from 'moment';
import $ from "jquery";
import registerAxios from '@Util/registerAxios';

// import 'we-vue/lib/style.css'
// import { Toast } from 'we-vue'

// import { AlertPlugin } from 'vux'
Vue.use(Vuex);
Vue.use(VueRouter);
// Vue.use(AlertPlugin)
// Vue.use(ToastPlugin)

// Vue.prototype.Toast = Toast;

// 引入Vuex配置文件
const store = new Vuex.Store({
  modules: storeMain,
});

// 引入路由
const router = new VueRouter({
  linkActiveClass: 'red',
  routes
});

const app = new Vue({
  el: '#app',
  store,
  router,
  components:{
    App: App
  },
  template: '<App/>',
});

// 设置全局变量
window.$ = $;
window.Moment = moment;
window.app = app;


// 路由跳转之前，检测是否有token
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
})

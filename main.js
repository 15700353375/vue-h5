/**
 * @Author:      changh
 * @DateTime:    2019-01-16 22:07:55
 * @Description: main.js
 */

// 引入相关依赖
import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import storeMain from '@Src/store/storeMain'
import routes from '@Src/routers'
import App from '@Src/App'
import moment from 'moment'
import $ from 'jquery'
import _ from 'lodash';
/* eslint-disable */
import registerAxios from '@Util/registerAxios'
import { Toast } from 'we-vue'

// toast提示使用的是we-vue 的ui组件
// 加载中、时间筛选、select等 使用的是we-ui组件
Vue.use(Vuex)
Vue.use(VueRouter)

Vue.prototype.Toast = Toast

// 引入Vuex配置文件
const store = new Vuex.Store({
  modules: storeMain
})


// 引入路由
const router = new VueRouter({
  linkActiveClass: 'red',
  routes
})

const app = new Vue({
  el: '#app',
  store,
  router,
  components: {
    App: App
  },
  template: '<App/>'
})


// 设置全局变量
window.$ = $
window.Moment = moment
window.app = app
window._ = _;

// 封装loading
Vue.prototype.Loading = {
  start () {
    app.loading = weui.loading('loading', {
      className: 'custom-classname',
      content: '加载中...'
    });
  },
  end(){
    app.loading.hide();
  }
}

// 路由跳转顶部title设置
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

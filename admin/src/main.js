import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import qs from 'qs'
import store from './store/index';
import http from './http'

import * as echarts from 'echarts'

Vue.prototype.$echarts = echarts
Vue.config.productionTip = false
Vue.prototype.$http = http
Vue.prototype.$qs = qs


//存访问路由
router.afterEach((to, from) => {
  localStorage.setItem("new", to.path)
})
router.beforeEach((to, from, next) => {
  if (localStorage.token) { // 判断是否有token
    if (to.path === '/login_view') {
      next({ path: '/home' });
    } else {
      if (router.options.routes.length < 3 || !store.state.routes.length) {
        store.dispatch('getInfo').then(() => {
          store.dispatch('generateRoutes', router.options.asyncRoutes).then((res) => {
            res.forEach(item => {
              router.addRoute(item)
              router.options.routes.push(item);
            })
            next({ ...to, replace: true })
          })
        })
      } else {
        next()
      }
    }
  } else {
    if (to.path === '/login_view') {
      next();
    } else {
      next('/login_view');
    }
  }

})



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

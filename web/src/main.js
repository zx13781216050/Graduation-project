import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import qs from 'qs'
import store from './store/index';
import http from './http'
// import VueQuillEditor from 'vue-quill-editor'


// Vue.use(VueQuillEditor)

Vue.config.productionTip = false
Vue.prototype.$http = http
Vue.prototype.$qs = qs

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

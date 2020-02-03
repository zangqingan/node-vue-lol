import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'

Vue.config.productionTip = false

// 引入axios实例并注册为vue全局对象 $http,在任意组件就可以通过this.$http使用axios实例了。
import http from './http.js'
Vue.prototype.$http = http


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

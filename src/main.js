import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import scroller from '@/components/scroller'
import loading from '@/components/loading'

Vue.prototype.axios = axios

// 全局注册scroller
Vue.component('scroller', scroller)

// 全司注册loading
Vue.component('loading', loading)

// 全局过滤器（变换URL)
Vue.filter('setWH', (url, arg) => {
  return url.replace(/w\.h/, arg)
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

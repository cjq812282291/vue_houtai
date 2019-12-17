import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 导入全局样式表
import './assets/css/global.css'
// 导入字体图标
import './assets/fonts/iconfont.css'

import axios from 'axios'
// 配置请求的根路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
// request 请求拦截器
axios.interceptors.request.use(config => {
  // 在请求拦截头中获取 token 值
  config.headers.Authorization = window.sessionStorage.getItem('token')
  // 最后必须要 return config
  return config
})

// response 响应拦截器
axios.interceptors.response.use(config => {
  return config
})

// 给 axios 全局挂载 $http 属性
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

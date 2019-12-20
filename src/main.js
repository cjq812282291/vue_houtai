import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 导入全局样式表
import './assets/css/global.css'
// 导入字体图标
import './assets/fonts/iconfont.css'
// 第三方插件
import TreeTable from 'vue-table-with-tree-grid'
// 导入复文本编辑器
import VueQuillEditor from 'vue-quill-editor'
// require styles 导入复文本编辑器对应的样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

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

// 全局配置这个 tree-table 组件
Vue.component('tree-table', TreeTable)

// 将复文本编辑器注册为全局可用的组件
Vue.use(VueQuillEditor)

// 时间过滤器
Vue.filter('dateFormat', function (originVal) {
  const dt = new Date(originVal)

  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')

  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

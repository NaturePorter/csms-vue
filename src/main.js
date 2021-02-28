// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// 依赖
import Vue from 'vue'
import App from './App'
import router from './router'
// 导入全局样式表
import './assets/css/global.css'
//element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import {Message,Loading} from 'element-ui'
Vue.use(ElementUI);
//axios
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios);

//在main.js引入qs
import qs from 'qs'
//配全局属性配置，在任意组件内可以使用this.$qs获取qs对象
Vue.prototype.$qs = qs;

//配置请求的根路径
axios.defaults.baseURL = 'http://localhost:8888/csms_api/'
//axios拦截器，拦截请求使其带上 token 的令牌
axios.interceptors.request.use(config => {
  config.headers.token = window.sessionStorage.getItem('token');
  Loading.service({text:"Loading..."});
  return config
}, err => {
  Message.error({message: '请求超时!'});
  return Promise.resolve(err);
});

//axios响应拦截器
axios.interceptors.response.use(res => {
  Loading.service().close();
  //console.log(res.data.meta.status)
  if (res.data.meta && res.data.meta.status === 401) { // 401, token失效
    // clearLoginInfo()
    router.push({ name: 'login' })
  }
  return res;
}, err => {
  Loading.service().close();
  return Promise.reject(err);
})
// axios请求拦截
axios.interceptors.request.use(config => {
  // 为请求头对象，添加token验证的Authorization字段
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  el: '#app',
  components: { App },
  template: '<App/>'
})

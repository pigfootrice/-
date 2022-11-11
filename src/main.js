import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';  // 全局引入
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import store from '@/store'
import './api/mock' 
import Cookie from 'js-cookie'
Vue.config.productionTip = false
Vue.use(ElementUI);     // 全局引入

// 添加全局前置导航守卫
router.beforeEach((to, from, next) => {
  const token = Cookie.get('token')
  if (!token && to.name !== 'login') {
    // 如果token不存在，就说明未登录，直接跳转至登录页
    next({name:'login'})
  } else if(token && to.name === 'login') {   // token存在，说明已登录，此时跳转至首页
    next({name:'home'})
  } else {
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    store.commit('addMenu',router)
  }
}).$mount('#app')

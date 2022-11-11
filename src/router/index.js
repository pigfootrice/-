import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import User from '@/views/User.vue'
import Main from '@/views/Main.vue'
import Mall from '@/views/Mall.vue'
import PageOne from '@/views/PageOne.vue'
import PageTwo from '@/views/PageTwo.vue'
import Login from '@/views/Login.vue' 
Vue.use(VueRouter)

// 将路由与组件进行映射
const routes = [
    // 主路由
    {
        path: '/',
        component: Main,
        name:'Main',
        redirect:'/home',  // 路由重定向
        children: [
        // // 子路由
        // { path: '/home', name:'home',component: Home },  
        // { path: '/user', name:'user',component: User },    
        // { path: '/mall', name:'mall',component: Mall },
        // { path: '/page1',name:'page1', component: PageOne },
        // { path: '/page2', name:'page2',component: PageTwo },
        ]
    },
    {
        path: '/login',
        name:'login',
        component: Login
    }

]

const router = new VueRouter({
    routes  // 缩写，相当于 routes : routes
})


const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
 
const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace(location) {
    return originalReplace.call(this, location).catch(err => err)
}
// 暴露 routes 实例
export default router
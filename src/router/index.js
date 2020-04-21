import Vue from 'vue'
import VueRouter from 'vue-router'

// 相关懒加载引入组件
const Home = () => import('../views/home/home')
const Category = () => import('../views/category/category')
const Cart = () => import('../views/cart/cart')
const Profile = () => import('../views/profile/profile')
// 1、安装插件
Vue.use(VueRouter)


const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/category',
      component: Category
    },
    {
      path: '/cart',
      component: Cart
    },
    {
      path: '/profile',
      component: Profile
    }
    
  ],
  mode: 'history'
})

export default router
import Vue from 'vue'
import VueRouter from 'vue-router'
const Login = () => import('../components/Login')
const Home = () => import('../components/Home')
const Welcome = () => import('../components/Welcome')
const Users = () => import('../components/user/Users')
const Report = () => import('../components/report/Report')
const Order = () => import('../components/order/Order')
const Roles = () => import('../components/power/Roles')
const Rights = () => import('../components/power/Rights')
const List = () => import('../components/goods/List')
const Cate = () => import('../components/goods/Cate')
const Add = () => import('../components/goods/Add')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        component: Welcome
      },
      {
        path: '/users',
        component: Users
      },
      {
        path: '/reports',
        component: Report
      },
      {
        path: '/orders',
        component: Order
      },
      {
        path: '/rights',
        component: Rights
      },
      {
        path: '/roles',
        component: Roles
      },
      {
        path: '/goods',
        component: List
      },
      {
        path: '/goods/add',
        component: Add
      },
      {
        path: '/s',
        component: Cate
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 挂载路由导航守卫
// router.beforeEach((to, from, next) => {
//   // to 将要访问的路径
//   // from 代表从哪个路径跳转而来
//   // next 是一个函数 表示放行
//   // next() 放行
//   // next('/login') 代表强制跳转到某个路由
//   if (to.path === '/login') return next()
//   // 获取token
//   const tokenStr = window.sessionStorage.getItem('token')
//   如果没有获取不到 token 值 强制跳转到 login
//   if (!tokenStr) return next('/login')
//   否则放行进行下步操作
//   next()
// })

export default router

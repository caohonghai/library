import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      redirect: '/dashboard/bookManage',
      children: [{
        path: '/dashboard/bookManage',
        name: 'bookManage',
        meta: {
          title: '图书管理',
        },
        redirect: '/dashboard/bookManage/addBook',
        children: [{
          path: '/dashboard/bookManage/addBook',
          name: 'addBook',
          meta: {
            title: '录入新书',
          },
          component: () => import('../views/Dashboard/BookManage/AddBookView.vue')
        }, {
          path: '/dashboard/bookManage/addTag',
          name: 'addTag',
          meta: {
            title: '新建类别',
          },
          component: () => import('../views/Dashboard/BookManage/AddTagView.vue')
        }, {
          path: '/dashboard/bookManage/queryBook',
          name: 'queryBook',
          meta: {
            title: '查询图书',
          },
          component: () => import('../views/Dashboard/BookManage/QueryBookView.vue')
        }]
      }, {
        path: '/dashboard/profile',
        name: 'profile',
        meta: {
          title: '个人中心',
        },
        component: () => import('../views/Dashboard/ProfileView.vue')
      }]
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router

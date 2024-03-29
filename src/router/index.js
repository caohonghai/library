import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import DashboardView from '../views/DashboardView.vue';
import RegisterView from '../views/RegisterView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      redirect: '/dashboard/home',
      children: [
        {
          path: '/dashboard/home',
          name: 'home',
          meta: {
            title: '首页',
          },
          component: () =>
            import('../views/Dashboard/HomeView.vue'),
        },
        {
          path: '/dashboard/bookManage',
          name: 'bookManage',
          meta: {
            title: '图书管理',
          },
          redirect: '/dashboard/bookManage/addBook',
          children: [
            {
              path: '/dashboard/bookManage/addBook',
              name: 'addBook',
              meta: {
                title: '录入新书',
              },
              component: () =>
                import(
                  '../views/Dashboard/BookManage/AddBookView.vue'
                ),
            },
            {
              path: '/dashboard/bookManage/addTag',
              name: 'addTag',
              meta: {
                title: '新建类别',
              },
              component: () =>
                import(
                  '../views/Dashboard/BookManage/AddTagView.vue'
                ),
            },
            {
              path: '/dashboard/bookManage/queryBook',
              name: 'queryBook',
              meta: {
                title: '查询图书',
              },
              component: () =>
                import(
                  '../views/Dashboard/BookManage/QueryBookView.vue'
                ),
            },
          ],
        },
        {
          path: '/dashboard/userManage',
          name: 'userManage',
          meta: {
            title: '用户管理',
          },
          redirect: '/dashboard/userManage/addUser',
          children: [
            {
              path: '/dashboard/userManage/addUser',
              name: 'addUser',
              meta: {
                title: '添加用户',
              },
              component: () =>
                import(
                  '../views/Dashboard/UserManage/AddUserView.vue'
                ),
            },
            {
              path: '/dashboard/userManage/queryUser',
              name: 'queryUser',
              meta: {
                title: '查询用户',
              },
              component: () =>
                import(
                  '../views/Dashboard/UserManage/QueryUserView.vue'
                ),
            },
          ],
        },
        {
          path: '/dashboard/borrowInfo',
          name: 'borrowInfo',
          meta: {
            title: '借阅管理',
          },
          component: () =>
            import('../views/Dashboard/BorrowInfoView.vue'),
        },
        {
          path: '/dashboard/profile',
          name: 'profile',
          meta: {
            title: '个人中心',
          },
          component: () =>
            import('../views/Dashboard/ProfileView.vue'),
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  const NotAuth = ['/', '/register'];
  const token = localStorage.getItem('token');
  if (to.path === '/' && token) {
    next('/dashboard');
  } else if (!NotAuth.includes(to.path) && !token) {
    next('/');
  } else {
    next();
  }
});

export default router;

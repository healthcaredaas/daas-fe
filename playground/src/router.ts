import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('./views/Home.vue'),
    meta: { title: '首页' }
  },
  {
    path: '/components/table',
    name: 'TableDemo',
    component: () => import('./views/TableDemo.vue'),
    meta: { title: '表格组件' }
  },
  {
    path: '/components/dialog',
    name: 'DialogDemo',
    component: () => import('./views/DialogDemo.vue'),
    meta: { title: '对话框组件' }
  },
  {
    path: '/components/form',
    name: 'FormDemo',
    component: () => import('./views/FormDemo.vue'),
    meta: { title: '表单组件' }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('./views/About.vue'),
    meta: { title: '关于' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title || 'DataSphere'} - DataSphere FE`
  next()
})

export default router
<template>
  <AdminLayout
    :collapsed="collapsed"
    :app-name="appName"
    :menu-list="menuList"
    :username="username"
    @update:collapsed="collapsed = $event"
    @command="handleCommand"
  >
    <router-view />
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { AdminLayout } from '@daas-fe/components'
import { useUserStore } from '@daas-fe/core'

const router = useRouter()
const userStore = useUserStore()

const collapsed = ref(false)
const appName = ref('DataSphere FE')

// Mock menu data
const menuList = ref([
  {
    id: '1',
    name: '首页',
    path: '/home',
    icon: 'HomeFilled',
    meta: { title: '首页', icon: 'HomeFilled' }
  },
  {
    id: '2',
    name: '组件演示',
    path: '/components',
    icon: 'Menu',
    meta: { title: '组件演示', icon: 'Menu' },
    children: [
      {
        id: '2-1',
        name: '表格组件',
        path: '/components/table',
        icon: 'Grid',
        meta: { title: '表格组件', icon: 'Grid' }
      },
      {
        id: '2-2',
        name: '对话框组件',
        path: '/components/dialog',
        icon: 'MessageBox',
        meta: { title: '对话框组件', icon: 'MessageBox' }
      },
      {
        id: '2-3',
        name: '表单组件',
        path: '/components/form',
        icon: 'Document',
        meta: { title: '表单组件', icon: 'Document' }
      }
    ]
  },
  {
    id: '3',
    name: '关于',
    path: '/about',
    icon: 'InfoFilled',
    meta: { title: '关于', icon: 'InfoFilled' }
  }
])

const username = ref('Admin')

function handleCommand(command: string) {
  switch (command) {
    case 'profile':
      router.push('/profile')
      break
    case 'logout':
      userStore.logout()
      router.push('/login')
      break
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body, #app {
  height: 100%;
  width: 100%;
}
</style>
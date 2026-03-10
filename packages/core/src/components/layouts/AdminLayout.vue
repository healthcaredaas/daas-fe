<template>
  <div class="admin-layout">
    <el-container>
      <el-aside :width="sidebarWidth" class="admin-aside">
        <div class="logo-container">
          <img v-if="appLogo" :src="appLogo" alt="Logo" class="logo" />
          <span v-if="!collapsed" class="app-name">{{ appName }}</span>
        </div>
        <slot name="menu">
          <AsideMenu :menu-list="menuList" :collapsed="collapsed" />
        </slot>
      </el-aside>
      <el-container>
        <el-header class="admin-header">
          <div class="header-left">
            <el-icon class="collapse-btn" @click="toggleCollapse">
              <component :is="collapsed ? 'Expand' : 'Fold'" />
            </el-icon>
            <slot name="header-left"></slot>
          </div>
          <div class="header-right">
            <slot name="header-right">
              <el-dropdown @command="handleCommand">
                <span class="user-dropdown">
                  <el-avatar :size="32" :src="userAvatar">
                    <el-icon><User /></el-icon>
                  </el-avatar>
                  <span class="username">{{ username }}</span>
                  <el-icon><ArrowDown /></el-icon>
                </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item command="profile">
                      <el-icon><User /></el-icon>个人中心
                    </el-dropdown-item>
                    <el-dropdown-item command="password">
                      <el-icon><Lock /></el-icon>修改密码
                    </el-dropdown-item>
                    <el-dropdown-item divided command="logout">
                      <el-icon><SwitchButton /></el-icon>退出登录
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </slot>
          </div>
        </el-header>
        <el-main class="admin-main">
          <slot></slot>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { User, ArrowDown, Lock, SwitchButton } from '@element-plus/icons-vue'
import AsideMenu from '../menu/AsideMenu.vue'

interface Props {
  collapsed?: boolean
  appName?: string
  appLogo?: string
  menuList?: any[]
  username?: string
  userAvatar?: string
}

const props = withDefaults(defineProps<Props>(), {
  collapsed: false,
  appName: 'DataSphere',
  menuList: () => [],
  username: '',
  userAvatar: ''
})

const emit = defineEmits<{
  'update:collapsed': [value: boolean]
  'command': [command: string]
}>()

const sidebarWidth = computed(() => props.collapsed ? '64px' : '220px')

function toggleCollapse() {
  emit('update:collapsed', !props.collapsed)
}

function handleCommand(command: string) {
  emit('command', command)
}
</script>

<style scoped>
.admin-layout {
  height: 100vh;
  width: 100%;
}

.admin-layout .el-container {
  height: 100%;
}

.admin-aside {
  background-color: #304156;
  transition: width 0.3s;
  overflow: hidden;
}

.logo-container {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
  background-color: #2b3a4a;
}

.logo {
  width: 32px;
  height: 32px;
}

.app-name {
  margin-left: 12px;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  white-space: nowrap;
}

.admin-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}

.header-left {
  display: flex;
  align-items: center;
}

.collapse-btn {
  font-size: 20px;
  cursor: pointer;
  margin-right: 16px;
}

.header-right {
  display: flex;
  align-items: center;
}

.user-dropdown {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.username {
  margin: 0 8px;
}

.admin-main {
  background-color: #f0f2f5;
  padding: 16px;
  overflow: auto;
}
</style>
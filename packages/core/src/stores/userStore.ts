import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import request from '../lib/request'
import { removeToken } from '../utils/token'

export interface UserInfo {
  id: string | number
  username: string
  nickname?: string
  avatar?: string
  email?: string
  phone?: string
  roles?: string[]
  permissions?: string[]
  deptId?: string | number
  deptName?: string
  [key: string]: any
}

export const useUserStore = defineStore('user', () => {
  // State
  const user = ref<UserInfo>({} as UserInfo)
  const token = ref<string>('')

  // Getters
  const isLoggedIn = computed(() => !!token.value)
  const username = computed(() => user.value?.username || '')
  const nickname = computed(() => user.value?.nickname || user.value?.username || '')
  const avatar = computed(() => user.value?.avatar || '')
  const roles = computed(() => user.value?.roles || [])
  const permissions = computed(() => user.value?.permissions || [])

  // Actions
  function setUser(userInfo: UserInfo) {
    user.value = userInfo
  }

  function setToken(newToken: string) {
    token.value = newToken
  }

  async function getUserInfo() {
    try {
      const result = await request.get('/account/profile')
      setUser(result)
      return result
    } catch (error) {
      console.error('获取用户信息失败:', error)
      throw error
    }
  }

  function logout() {
    user.value = {} as UserInfo
    token.value = ''
    removeToken()
  }

  function hasPermission(permission: string): boolean {
    return permissions.value.includes(permission) || permissions.value.includes('*')
  }

  function hasRole(role: string): boolean {
    return roles.value.includes(role) || roles.value.includes('admin')
  }

  function hasAnyPermission(permissionList: string[]): boolean {
    return permissionList.some(p => hasPermission(p))
  }

  function hasAllPermissions(permissionList: string[]): boolean {
    return permissionList.every(p => hasPermission(p))
  }

  return {
    // State
    user,
    token,
    // Getters
    isLoggedIn,
    username,
    nickname,
    avatar,
    roles,
    permissions,
    // Actions
    setUser,
    setToken,
    getUserInfo,
    logout,
    hasPermission,
    hasRole,
    hasAnyPermission,
    hasAllPermissions
  }
})
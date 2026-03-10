import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import request from '../lib/request'

export interface MenuItem {
  id: string | number
  name: string
  path: string
  icon?: string
  component?: string
  redirect?: string
  hidden?: boolean
  keepAlive?: boolean
  external?: boolean
  children?: MenuItem[]
  meta?: {
    title?: string
    icon?: string
    hidden?: boolean
    keepAlive?: boolean
    permissions?: string[]
    [key: string]: any
  }
  parentId?: string | number | null
  sort?: number
}

export const useMenuStore = defineStore('menu', () => {
  // State
  const menuList = ref<MenuItem[]>([])
  const currentModule = ref<string>('')
  const collapsed = ref<boolean>(false)
  const activeMenu = ref<string>('')

  // Getters
  const visibleMenus = computed(() => {
    return filterHiddenMenus(menuList.value)
  })

  const sidebarMenus = computed(() => {
    if (currentModule.value) {
      const module = menuList.value.find(m => m.id === currentModule.value || m.path === currentModule.value)
      return module?.children || []
    }
    return menuList.value
  })

  // Actions
  function setMenuList(menus: MenuItem[]) {
    menuList.value = menus
  }

  function setCurrentModule(moduleId: string) {
    currentModule.value = moduleId
  }

  function toggleCollapsed() {
    collapsed.value = !collapsed.value
  }

  function setActiveMenu(path: string) {
    activeMenu.value = path
  }

  async function loadMenu() {
    try {
      const result = await request.get('/account/menu')
      setMenuList(result || [])
      return result
    } catch (error) {
      console.error('加载菜单失败:', error)
      return []
    }
  }

  function clearMenu() {
    menuList.value = []
    currentModule.value = ''
  }

  function findMenuByPath(path: string): MenuItem | undefined {
    return findMenu(menuList.value, path)
  }

  function findMenuById(id: string | number): MenuItem | undefined {
    return findMenuByIdRecursive(menuList.value, id)
  }

  return {
    // State
    menuList,
    currentModule,
    collapsed,
    activeMenu,
    // Getters
    visibleMenus,
    sidebarMenus,
    // Actions
    setMenuList,
    setCurrentModule,
    toggleCollapsed,
    setActiveMenu,
    loadMenu,
    clearMenu,
    findMenuByPath,
    findMenuById
  }
})

// Helper functions
function filterHiddenMenus(menus: MenuItem[]): MenuItem[] {
  return menus
    .filter(menu => !menu.hidden)
    .map(menu => ({
      ...menu,
      children: menu.children ? filterHiddenMenus(menu.children) : undefined
    }))
}

function findMenu(menus: MenuItem[], path: string): MenuItem | undefined {
  for (const menu of menus) {
    if (menu.path === path) {
      return menu
    }
    if (menu.children) {
      const found = findMenu(menu.children, path)
      if (found) return found
    }
  }
  return undefined
}

function findMenuByIdRecursive(menus: MenuItem[], id: string | number): MenuItem | undefined {
  for (const menu of menus) {
    if (menu.id === id) {
      return menu
    }
    if (menu.children) {
      const found = findMenuByIdRecursive(menu.children, id)
      if (found) return found
    }
  }
  return undefined
}
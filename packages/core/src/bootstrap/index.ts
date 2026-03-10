import { App } from 'vue'
import { createPinia } from 'pinia'
import { router, newRouter } from '../router'
import { setupRouterGuards } from '../router/helper'
import { useMainStore, useUserStore, useMenuStore } from '../stores'
import type { AppInfo, UserInfo, MenuItem } from '../types'

export interface BootstrapOptions {
  app: App
  appCode?: string
  appInfo?: AppInfo
  baseURL?: string
  routes?: any[]
  pages?: Record<string, () => Promise<any>> | any[]
  fetchApp?: boolean
  fetchMenu?: boolean
  loadUserInfo?: () => Promise<UserInfo>
  loadMenu?: () => Promise<MenuItem[]>
  onReady?: () => void
  onError?: (error: Error) => void
}

/**
 * Bootstrap application
 */
export async function bootstrap(options: BootstrapOptions) {
  const {
    app,
    appCode,
    appInfo,
    baseURL = '/',
    routes = [],
    fetchApp = true,
    fetchMenu = true,
    loadUserInfo,
    loadMenu,
    onReady,
    onError
  } = options

  try {
    // Setup Pinia
    const pinia = createPinia()
    app.use(pinia)

    // Setup router
    newRouter(baseURL, routes)
    app.use(router)

    // Setup router guards
    await setupRouterGuards()

    // Set app info
    if (appInfo) {
      const mainStore = useMainStore()
      mainStore.setApp(appInfo)
    }

    // Load user info if callback provided
    if (loadUserInfo) {
      const userStore = useUserStore()
      const userInfo = await loadUserInfo()
      userStore.setUser(userInfo)
    }

    // Load menu if callback provided
    if (loadMenu) {
      const menuStore = useMenuStore()
      const menuList = await loadMenu()
      menuStore.setMenuList(menuList)
    }

    // Call onReady callback
    if (onReady) {
      onReady()
    }

    return app
  } catch (error) {
    console.error('Bootstrap failed:', error)
    if (onError) {
      onError(error as Error)
    }
    throw error
  }
}

/**
 * Create application
 */
export function createApp(rootComponent: any, options?: Partial<BootstrapOptions>) {
  return {
    mount(container: string | Element) {
      // Implementation will be provided by the consuming app
    },
    use(plugin: any) {
      // Implementation will be provided by the consuming app
    }
  }
}
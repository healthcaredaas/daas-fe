import { RouteLocationNormalizedLoaded } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { useUserStore } from '../stores/userStore'
import { useMenuStore } from '../stores/menuStore'
import { getToken } from '../utils/token'

NProgress.configure({ showSpinner: false })

export interface RouterGuardOptions {
  whiteList?: string[]
  loginPath?: string
  homePath?: string
}

const defaultOptions: RouterGuardOptions = {
  whiteList: ['/login', '/404', '/403', '/500'],
  loginPath: '/login',
  homePath: '/home'
}

/**
 * Setup router guards
 */
export async function setupRouterGuards(options: RouterGuardOptions = {}) {
  const { whiteList, loginPath, homePath } = { ...defaultOptions, ...options }
  const { getRouter } = await import('./index')
  const router = getRouter()

  if (!router) return

  router.beforeEach(async (to: RouteLocationNormalizedLoaded, from, next) => {
    NProgress.start()

    const token = getToken()
    const userStore = useUserStore()
    const menuStore = useMenuStore()

    if (token) {
      if (to.path === loginPath) {
        // Already logged in, redirect to home
        next({ path: homePath })
        NProgress.done()
      } else {
        // Check if user info is loaded
        if (!userStore.user || !userStore.user.id) {
          try {
            // Fetch user info
            await userStore.getUserInfo()

            // Fetch menu if not loaded
            if (!menuStore.menuList || menuStore.menuList.length === 0) {
              await menuStore.loadMenu()
            }

            // Redirect to original path or continue
            next({ ...to, replace: true })
          } catch (error) {
            // Token invalid, redirect to login
            console.error('Failed to get user info:', error)
            next({ path: loginPath, query: { redirect: to.fullPath } })
            NProgress.done()
          }
        } else {
          next()
        }
      }
    } else {
      // No token
      if (whiteList?.includes(to.path)) {
        next()
      } else {
        next({ path: loginPath, query: { redirect: to.fullPath } })
        NProgress.done()
      }
    }
  })

  router.afterEach(() => {
    NProgress.done()
  })
}

/**
 * Check route permission
 */
export function hasPermission(route: any, permissions: string[]): boolean {
  if (route.meta?.permissions) {
    return route.meta.permissions.some((p: string) => permissions.includes(p))
  }
  return true
}

/**
 * Filter routes by permission
 */
export function filterRoutesByPermission(routes: any[], permissions: string[]): any[] {
  const result: any[] = []

  routes.forEach(route => {
    if (hasPermission(route, permissions)) {
      if (route.children) {
        route.children = filterRoutesByPermission(route.children, permissions)
      }
      result.push(route)
    }
  })

  return result
}
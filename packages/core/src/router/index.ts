import { Ref } from 'vue'
import { RouteLocationNormalizedLoaded, Router, createRouter, createWebHistory } from 'vue-router'

let router: Router

export interface RouteMeta {
  title?: string
  icon?: string
  hidden?: boolean
  keepAlive?: boolean
  permissions?: string[]
  roles?: string[]
}

export interface AppRoute {
  path: string
  name?: string
  component?: any
  redirect?: string
  meta?: RouteMeta
  children?: AppRoute[]
}

/**
 * Create a new router instance
 */
export const newRouter = (base: string, routes: AppRoute[]) => {
  router = createRouter({
    history: createWebHistory(base),
    routes: routes as any
  })
  return router
}

/**
 * Get current route
 */
export const getRoute = (): Ref<RouteLocationNormalizedLoaded> | undefined => {
  return router?.currentRoute
}

/**
 * Get router instance
 */
export const getRouter = (): Router | undefined => {
  return router
}

/**
 * Reset router (for logout)
 */
export const resetRouter = () => {
  const newRouterInstance = createRouter({
    history: createWebHistory(),
    routes: []
  })
  router = newRouterInstance
}

/**
 * Add dynamic routes
 */
export const addDynamicRoutes = (routes: AppRoute[], parentPath?: string) => {
  routes.forEach(route => {
    if (parentPath) {
      // Add as child route
      const parentRoute = router.getRoutes().find(r => r.path === parentPath)
      if (parentRoute) {
        router.addRoute(parentRoute.name as string, route as any)
      }
    } else {
      router.addRoute(route as any)
    }
  })
}

/**
 * Navigate to route
 */
export const navigateTo = (path: string, replace = false) => {
  if (router) {
    if (replace) {
      router.replace(path)
    } else {
      router.push(path)
    }
  }
}

/**
 * Go back
 */
export const goBack = () => {
  if (router) {
    router.back()
  }
}

export { router }
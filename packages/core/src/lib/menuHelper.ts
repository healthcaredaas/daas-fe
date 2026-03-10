import { MenuItem } from '../stores/menuStore'

export interface LoadMenuFunc {
  (): Promise<MenuItem[]>
}

let loadUserMenuFunc: LoadMenuFunc | null = null

/**
 * Set load user menu function
 */
export function setLoadUserMenuFunc(func: LoadMenuFunc) {
  loadUserMenuFunc = func
}

/**
 * Load user menu
 */
export async function loadUserMenu(): Promise<MenuItem[]> {
  if (!loadUserMenuFunc) {
    console.warn('loadUserMenuFunc is not set')
    return []
  }
  return loadUserMenuFunc()
}

/**
 * Transform menu data to routes
 */
export function transformMenuToRoutes(menus: MenuItem[]): any[] {
  return menus
    .filter(menu => !menu.hidden)
    .map(menu => ({
      path: menu.path,
      name: menu.name,
      component: menu.component,
      redirect: menu.redirect,
      meta: {
        title: menu.meta?.title || menu.name,
        icon: menu.meta?.icon || menu.icon,
        keepAlive: menu.meta?.keepAlive || menu.keepAlive
      },
      children: menu.children ? transformMenuToRoutes(menu.children) : undefined
    }))
}

/**
 * Find menu by path
 */
export function findMenuByPath(menus: MenuItem[], path: string): MenuItem | null {
  for (const menu of menus) {
    if (menu.path === path) {
      return menu
    }
    if (menu.children) {
      const found = findMenuByPath(menu.children, path)
      if (found) return found
    }
  }
  return null
}

/**
 * Get all menu paths
 */
export function getAllMenuPaths(menus: MenuItem[]): string[] {
  const paths: string[] = []
  menus.forEach(menu => {
    if (menu.path) {
      paths.push(menu.path)
    }
    if (menu.children) {
      paths.push(...getAllMenuPaths(menu.children))
    }
  })
  return paths
}

/**
 * Get breadcrumb by path
 */
export function getBreadcrumbByPath(menus: MenuItem[], path: string): MenuItem[] {
  const breadcrumb: MenuItem[] = []

  function find(menus: MenuItem[], path: string, parents: MenuItem[]): boolean {
    for (const menu of menus) {
      if (menu.path === path) {
        breadcrumb.push(...parents, menu)
        return true
      }
      if (menu.children && find(menu.children, path, [...parents, menu])) {
        return true
      }
    }
    return false
  }

  find(menus, path, [])
  return breadcrumb
}
import { useUserStore } from '../stores/userStore'

/**
 * Check if user has permission
 */
export function hasPermission(permission: string | string[]): boolean {
  const userStore = useUserStore()
  const permissions = userStore.permissions

  if (!permissions || permissions.length === 0) {
    return false
  }

  // Super admin has all permissions
  if (permissions.includes('*')) {
    return true
  }

  if (typeof permission === 'string') {
    return permissions.includes(permission)
  }

  // Array of permissions - check if user has any of them
  return permission.some(p => permissions.includes(p))
}

/**
 * Check if user has all permissions
 */
export function hasAllPermissions(permissions: string[]): boolean {
  const userStore = useUserStore()
  const userPermissions = userStore.permissions

  if (!userPermissions || userPermissions.length === 0) {
    return false
  }

  // Super admin has all permissions
  if (userPermissions.includes('*')) {
    return true
  }

  return permissions.every(p => userPermissions.includes(p))
}

/**
 * Check if user has role
 */
export function hasRole(role: string | string[]): boolean {
  const userStore = useUserStore()
  const roles = userStore.roles

  if (!roles || roles.length === 0) {
    return false
  }

  // Admin role has all permissions
  if (roles.includes('admin')) {
    return true
  }

  if (typeof role === 'string') {
    return roles.includes(role)
  }

  // Array of roles - check if user has any of them
  return role.some(r => roles.includes(r))
}

/**
 * Check if user has all roles
 */
export function hasAllRoles(roles: string[]): boolean {
  const userStore = useUserStore()
  const userRoles = userStore.roles

  if (!userRoles || userRoles.length === 0) {
    return false
  }

  // Admin role has all permissions
  if (userRoles.includes('admin')) {
    return true
  }

  return roles.every(r => userRoles.includes(r))
}

/**
 * Permission directive value type
 */
export type PermissionValue = string | string[] | { permission: string | string[]; mode?: 'any' | 'all' }

/**
 * Check permission for directive
 */
export function checkPermission(value: PermissionValue): boolean {
  if (typeof value === 'string') {
    return hasPermission(value)
  }

  if (Array.isArray(value)) {
    return hasPermission(value)
  }

  if (typeof value === 'object' && value.permission) {
    const { permission, mode = 'any' } = value
    if (mode === 'all') {
      return hasAllPermissions(Array.isArray(permission) ? permission : [permission])
    }
    return hasPermission(permission)
  }

  return false
}
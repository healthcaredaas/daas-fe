// Types index
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

export interface AppInfo {
  id: string
  name: string
  code: string
  logo?: string
  theme?: string
  layout?: string
  [key: string]: any
}

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

export interface PageResult<T> {
  records: T[]
  total: number
  size: number
  current: number
  pages: number
}

export interface ResponseData<T = any> {
  code: number
  message: string
  data: T
}

export type LayoutType = 'admin' | 'common' | 'blank'

export type DeviceType = 'desktop' | 'mobile'

export type ThemeType = 'light' | 'dark'
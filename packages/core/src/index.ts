// @daas-fe/core - Main entry point
// Core functionality and UI Components for DataSphere frontend applications

export { bootstrap } from './bootstrap'
export type { BootstrapOptions } from './bootstrap'

// Utilities
export { formatDate, parseDate, deepClone, deepMerge, required, email, phone, url, getDict, getDictLabel, getDictValue, clearDictCache, dictUtil, setToken, getToken, removeToken, hasPermission } from './utils'

// Router
export { router, newRouter, getRoute } from './router'
export { setupRouterGuards, filterRoutesByPermission } from './router/helper'
// Re-export route permission check with different name to avoid conflict
export { hasPermission as checkRoutePermission } from './router/helper'

// CRUD
export * from './crud'

// API
export { CrudApi } from './api/crud'
export type { PageResult } from './api/base'

// Stores
export * from './stores'

// Config
export * from './config'

// Enums
export * as enums from './enums'

// Lib
export { default as request, createRequest } from './lib/request'
export { default as dictRequest } from './lib/dictRequest'
export * from './lib/menuHelper'

// Types
export type { AppInfo, UserInfo, MenuItem } from './types'

// ==================== UI Components ====================

// Layout components
export { default as AdminLayout } from './components/layouts/AdminLayout.vue'
export { default as CommonLayout } from './components/layouts/CommonLayout.vue'
export { default as PageLayout } from './components/layouts/PageLayout.vue'

// Menu components
export { default as VerticalMenu } from './components/menu/VerticalMenu.vue'
export { default as AsideMenu } from './components/menu/AsideMenu.vue'
export { default as NavMenu } from './components/menu/NavMenu.vue'
export { default as ScrollMenuHorizontal } from './components/menu/ScrollMenuHorizontal.vue'
export { default as ScrollMenuItem } from './components/menu/ScrollMenuItem.vue'

// Icon components
export { default as SvgIcon } from './components/icon/SvgIcon.vue'
export { default as IconSelect } from './components/icon/IconSelect.vue'
export { default as RiIcon } from './components/icon/RiIcon.vue'

// Table components
export { default as PageTable } from './components/table/PageTable.vue'

// Dialog components
export { default as PageDialog } from './components/dialog/PageDialog.vue'

// Upload components
export { default as OssUploader } from './components/upload/OssUploader.vue'
export { default as Base64ImageUploader } from './components/upload/Base64ImageUploader.vue'

// Editor components
export { default as CodeEditor } from './components/editor/CodeEditor.vue'

// Data components
export { default as DataEmpty } from './components/data/DataEmpty.vue'

// Date components
export { default as DateRangePicker } from './components/date/DateRangePicker.vue'

// Install function for Vue app
import type { App } from 'vue'
import AdminLayout from './components/layouts/AdminLayout.vue'
import CommonLayout from './components/layouts/CommonLayout.vue'
import PageLayout from './components/layouts/PageLayout.vue'
import VerticalMenu from './components/menu/VerticalMenu.vue'
import AsideMenu from './components/menu/AsideMenu.vue'
import NavMenu from './components/menu/NavMenu.vue'
import ScrollMenuHorizontal from './components/menu/ScrollMenuHorizontal.vue'
import ScrollMenuItem from './components/menu/ScrollMenuItem.vue'
import SvgIcon from './components/icon/SvgIcon.vue'
import IconSelect from './components/icon/IconSelect.vue'
import RiIcon from './components/icon/RiIcon.vue'
import PageTable from './components/table/PageTable.vue'
import PageDialog from './components/dialog/PageDialog.vue'
import OssUploader from './components/upload/OssUploader.vue'
import Base64ImageUploader from './components/upload/Base64ImageUploader.vue'
import CodeEditor from './components/editor/CodeEditor.vue'
import DataEmpty from './components/data/DataEmpty.vue'
import DateRangePicker from './components/date/DateRangePicker.vue'

const components = [
  AdminLayout,
  CommonLayout,
  PageLayout,
  VerticalMenu,
  AsideMenu,
  NavMenu,
  ScrollMenuHorizontal,
  ScrollMenuItem,
  SvgIcon,
  IconSelect,
  RiIcon,
  PageTable,
  PageDialog,
  OssUploader,
  Base64ImageUploader,
  CodeEditor,
  DataEmpty,
  DateRangePicker
]

/**
 * Install all components to Vue app
 */
export function install(app: App) {
  components.forEach(component => {
    if (component.name) {
      app.component(component.name, component)
    }
  })
}

export default {
  install
}
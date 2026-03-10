import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface AppInfo {
  id: string
  name: string
  code: string
  logo?: string
  theme?: string
  layout?: string
  [key: string]: any
}

export const useMainStore = defineStore('main', () => {
  // State
  const app = ref<AppInfo>({} as AppInfo)
  const sidebarCollapsed = ref<boolean>(false)
  const device = ref<'desktop' | 'mobile'>('desktop')
  const theme = ref<'light' | 'dark'>('light')
  const size = ref<'default' | 'small' | 'large'>('default')
  const loading = ref<boolean>(false)

  // Getters
  const isDesktop = computed(() => device.value === 'desktop')
  const isMobile = computed(() => device.value === 'mobile')

  // Actions
  function setApp(appInfo: AppInfo) {
    app.value = appInfo
  }

  function toggleSidebar() {
    sidebarCollapsed.value = !sidebarCollapsed.value
  }

  function setSidebarCollapsed(collapsed: boolean) {
    sidebarCollapsed.value = collapsed
  }

  function setDevice(newDevice: 'desktop' | 'mobile') {
    device.value = newDevice
  }

  function setTheme(newTheme: 'light' | 'dark') {
    theme.value = newTheme
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
  }

  function setSize(newSize: 'default' | 'small' | 'large') {
    size.value = newSize
  }

  function setLoading(isLoading: boolean) {
    loading.value = isLoading
  }

  return {
    app,
    sidebarCollapsed,
    device,
    theme,
    size,
    loading,
    isDesktop,
    isMobile,
    setApp,
    toggleSidebar,
    setSidebarCollapsed,
    setDevice,
    setTheme,
    setSize,
    setLoading
  }
})
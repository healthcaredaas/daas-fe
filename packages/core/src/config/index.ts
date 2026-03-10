// Config index
import { ref, computed } from 'vue'

export interface AppConfig {
  id?: string
  code: string
  name: string
  logo?: string
  theme?: 'light' | 'dark'
  layout?: string
  loadUserMenuFunc?: () => Promise<any>
  [key: string]: any
}

const appConfigs = ref<Record<string, AppConfig>>({})
const defaultConfig: AppConfig = {
  code: 'default',
  name: 'DataSphere'
}

/**
 * Use default app config
 */
export function useDefaultAppConfig() {
  const config = computed(() => appConfigs.value['default'] || defaultConfig)
  return config
}

/**
 * Get config by app code
 */
export function getConfig(appCode: string, key?: string): any {
  const config = appConfigs.value[appCode]
  if (!config) return undefined
  if (key) return config[key]
  return config
}

/**
 * Set app config
 */
export function useAppConfig(appCode: string, config: Partial<AppConfig>) {
  const existing = appConfigs.value[appCode] || {}
  appConfigs.value[appCode] = {
    ...existing,
    ...config,
    code: appCode
  }
  return appConfigs.value[appCode]
}

/**
 * Get all app configs
 */
export function getAllConfigs(): Record<string, AppConfig> {
  return appConfigs.value
}

/**
 * Clear all configs
 */
export function clearConfigs() {
  appConfigs.value = {}
}
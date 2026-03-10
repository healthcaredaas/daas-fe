// Dictionary utility functions
import dictRequest from '../lib/dictRequest'

export interface DictItem {
  label: string
  value: string | number
  children?: DictItem[]
}

export interface DictConfig {
  url?: string
  params?: Record<string, any>
}

const dictCache = new Map<string, DictItem[]>()

/**
 * Get dictionary data by code
 */
export async function getDict(code: string, config?: DictConfig): Promise<DictItem[]> {
  // Check cache first
  if (dictCache.has(code)) {
    return dictCache.get(code)!
  }

  try {
    const url = config?.url || `/api/foundation/mgmt/dictItem/content`
    const data = await dictRequest.get(url, {
      params: {
        dictCode: code,
        ...config?.params
      }
    }) as DictItem[]

    // Cache the result
    dictCache.set(code, data)

    return data
  } catch (error) {
    console.error(`Failed to get dict: ${code}`, error)
    return []
  }
}

/**
 * Get dictionary label by value
 */
export function getDictLabel(dict: DictItem[], value: string | number): string {
  const item = dict.find(d => d.value === value)
  return item?.label || ''
}

/**
 * Get dictionary value by label
 */
export function getDictValue(dict: DictItem[], label: string): string | number | undefined {
  const item = dict.find(d => d.label === label)
  return item?.value
}

/**
 * Clear dict cache
 */
export function clearDictCache(code?: string) {
  if (code) {
    dictCache.delete(code)
  } else {
    dictCache.clear()
  }
}

/**
 * Dict utility for Avue
 */
export const dictUtil = {
  get: getDict,
  getLabel: getDictLabel,
  getValue: getDictValue,
  clearCache: clearDictCache
}

export default dictUtil
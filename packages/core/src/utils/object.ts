/**
 * Deep clone object
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime()) as T
  }

  if (obj instanceof Array) {
    return obj.map(item => deepClone(item)) as T
  }

  if (obj instanceof Object) {
    const copy = {} as T
    Object.keys(obj).forEach(key => {
      (copy as any)[key] = deepClone((obj as any)[key])
    })
    return copy
  }

  return obj
}

/**
 * Merge objects (deep merge)
 */
export function deepMerge<T extends Record<string, any>>(target: T, ...sources: Partial<T>[]): T {
  if (!sources.length) return target

  const source = sources.shift()

  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        if (!target[key]) {
          Object.assign(target, { [key]: {} })
        }
        deepMerge(target[key], source[key])
      } else {
        Object.assign(target, { [key]: source[key] })
      }
    })
  }

  return deepMerge(target, ...sources)
}

/**
 * Check if value is a plain object
 */
export function isObject(val: any): val is Record<string, any> {
  return val !== null && typeof val === 'object' && !Array.isArray(val)
}

/**
 * Check if object is empty
 */
export function isEmpty(obj: Record<string, any> | any[] | null | undefined): boolean {
  if (obj === null || obj === undefined) return true
  if (Array.isArray(obj)) return obj.length === 0
  if (isObject(obj)) return Object.keys(obj).length === 0
  return false
}

/**
 * Pick properties from object
 */
export function pick<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const result = {} as Pick<T, K>
  keys.forEach(key => {
    if (key in obj) {
      result[key] = obj[key]
    }
  })
  return result
}

/**
 * Omit properties from object
 */
export function omit<T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
  const result = { ...obj }
  keys.forEach(key => {
    delete result[key]
  })
  return result
}

/**
 * Get nested property value
 */
export function get<T = any>(obj: Record<string, any>, path: string, defaultValue?: T): T {
  const keys = path.split('.')
  let result: any = obj

  for (const key of keys) {
    if (result === null || result === undefined) {
      return defaultValue as T
    }
    result = result[key]
  }

  return result !== undefined ? result : defaultValue
}

/**
 * Set nested property value
 */
export function set(obj: Record<string, any>, path: string, value: any): void {
  const keys = path.split('.')
  let current = obj

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i]
    if (!current[key]) {
      current[key] = {}
    }
    current = current[key]
  }

  current[keys[keys.length - 1]] = value
}
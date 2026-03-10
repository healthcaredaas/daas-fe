import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { ElNotification } from 'element-plus'
import { getToken, removeToken } from '../utils/token'

export interface RequestConfig extends AxiosRequestConfig {
  baseURL?: string
  timeout?: number
  withCredentials?: boolean
  skipErrorHandler?: boolean
}

export interface ResponseData<T = any> {
  code: number
  message: string
  data: T
}

// Default request instance
let defaultRequest: AxiosInstance

/**
 * Create Axios request instance
 */
export function createRequest(config: RequestConfig = {}): AxiosInstance {
  const instance = axios.create({
    timeout: config.timeout || 60000,
    baseURL: config.baseURL || '',
    withCredentials: config.withCredentials ?? true,
    headers: {
      'Content-Type': 'application/json'
    }
  })

  // Request interceptor
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = getToken()
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
        config.headers['X-Token'] = `Bearer ${token}`
      }
      return config
    },
    (error) => {
      console.error('Request error:', error)
      return Promise.reject(error)
    }
  )

  // Response interceptor
  instance.interceptors.response.use(
    (response: AxiosResponse<ResponseData>) => {
      const { data, config } = response
      const customConfig = config as any

      // Handle response data
      if (data.code === 200 || data.code === 0) {
        return data.data as any
      }

      // Handle business error
      if (!customConfig?.skipErrorHandler) {
        ElNotification.error({
          title: '错误',
          message: data.message || '请求失败'
        })
      }

      return Promise.reject(new Error(data.message || '请求失败'))
    },
    (error) => {
      const { response, config } = error
      const customConfig = config as any

      if (customConfig?.skipErrorHandler) {
        return Promise.reject(error)
      }

      // Handle HTTP error
      if (response) {
        const { status, data } = response

        switch (status) {
          case 401:
            // Token expired or unauthorized
            removeToken()
            ElNotification.error({
              title: '认证失败',
              message: '登录已过期，请重新登录'
            })
            // Redirect to login
            window.location.href = '/login'
            break
          case 403:
            ElNotification.error({
              title: '权限不足',
              message: '您没有权限执行此操作'
            })
            break
          case 404:
            ElNotification.error({
              title: '资源不存在',
              message: '请求的资源不存在'
            })
            break
          case 500:
            ElNotification.error({
              title: '服务器错误',
              message: data?.message || '服务器内部错误'
            })
            break
          default:
            ElNotification.error({
              title: `请求错误 (${status})`,
              message: data?.message || error.message
            })
        }
      } else if (error.code === 'ECONNABORTED') {
        ElNotification.error({
          title: '请求超时',
          message: '请求超时，请稍后重试'
        })
      } else {
        ElNotification.error({
          title: '网络错误',
          message: '网络连接失败，请检查网络'
        })
      }

      return Promise.reject(error)
    }
  )

  return instance
}

/**
 * Get or create default request instance
 */
function getDefaultRequest(): AxiosInstance {
  if (!defaultRequest) {
    defaultRequest = createRequest()
  }
  return defaultRequest
}

/**
 * Default request instance with convenient methods
 */
const request = {
  get: <T = any>(url: string, config?: RequestConfig): Promise<T> => {
    return getDefaultRequest().get(url, config)
  },

  post: <T = any>(url: string, data?: any, config?: RequestConfig): Promise<T> => {
    return getDefaultRequest().post(url, data, config)
  },

  put: <T = any>(url: string, data?: any, config?: RequestConfig): Promise<T> => {
    return getDefaultRequest().put(url, data, config)
  },

  delete: <T = any>(url: string, config?: RequestConfig): Promise<T> => {
    return getDefaultRequest().delete(url, config)
  },

  patch: <T = any>(url: string, data?: any, config?: RequestConfig): Promise<T> => {
    return getDefaultRequest().patch(url, data, config)
  }
}

export default request
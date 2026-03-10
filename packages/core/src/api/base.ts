import request, { createRequest } from '../lib/request'
import type { AxiosInstance } from 'axios'

export interface PageParams {
  current?: number
  size?: number
  [key: string]: any
}

export interface PageResult<T> {
  records: T[]
  total: number
  size: number
  current: number
  pages: number
}

export interface BaseApiConfig {
  resource: string
  baseURL?: string
  request?: AxiosInstance
}

/**
 * Base API class for CRUD operations
 */
export class BaseApi<T = any> {
  protected resource: string
  protected baseURL: string
  protected request: AxiosInstance

  constructor(config: BaseApiConfig) {
    this.resource = config.resource
    this.baseURL = config.baseURL || ''
    this.request = config.request || createRequest({ baseURL: this.baseURL })
  }

  /**
   * Get paginated list
   */
  async page(params?: PageParams): Promise<PageResult<T>> {
    return this.request.get(`${this.resource}/page`, { params })
  }

  /**
   * Get all records (list)
   */
  async list(params?: Record<string, any>): Promise<T[]> {
    return this.request.get(`${this.resource}/list`, { params })
  }

  /**
   * Get tree structure
   */
  async tree(params?: Record<string, any>): Promise<T[]> {
    return this.request.get(`${this.resource}/tree`, { params })
  }

  /**
   * Get by ID
   */
  async getById(id: string | number): Promise<T> {
    return this.request.get(`${this.resource}/${id}`)
  }

  /**
   * Create new record
   */
  async add(data: Partial<T>): Promise<string> {
    return this.request.post(this.resource, data)
  }

  /**
   * Update record
   */
  async update(data: Partial<T> & { id: string | number }): Promise<string> {
    return this.request.put(this.resource, data)
  }

  /**
   * Delete by ID
   */
  async delete(id: string | number): Promise<string> {
    return this.request.delete(`${this.resource}/${id}`)
  }

  /**
   * Batch delete
   */
  async batchDel(ids: (string | number)[]): Promise<string> {
    return this.request.delete(`${this.resource}/batch`, { data: ids })
  }

  /**
   * Custom GET request
   */
  protected async get<R = any>(url: string, params?: Record<string, any>): Promise<R> {
    return this.request.get(`${this.resource}${url}`, { params })
  }

  /**
   * Custom POST request
   */
  protected async post<R = any>(url: string, data?: any): Promise<R> {
    return this.request.post(`${this.resource}${url}`, data)
  }

  /**
   * Custom PUT request
   */
  protected async put<R = any>(url: string, data?: any): Promise<R> {
    return this.request.put(`${this.resource}${url}`, data)
  }

  /**
   * Custom DELETE request
   */
  protected async del<R = any>(url: string, data?: any): Promise<R> {
    return this.request.delete(`${this.resource}${url}`, { data })
  }

  /**
   * Alias for get - getData
   */
  async getData<R = any>(url: string, params?: Record<string, any>): Promise<R> {
    return this.get(url, params)
  }

  /**
   * Alias for put - putData
   */
  async putData<R = any>(url: string, data?: any): Promise<R> {
    return this.put(url, data)
  }

  /**
   * Alias for post - postData
   */
  async postData<R = any>(url: string, data?: any): Promise<R> {
    return this.post(url, data)
  }
}
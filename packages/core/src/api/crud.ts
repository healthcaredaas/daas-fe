import { BaseApi, PageParams, PageResult } from './base'
import type { AxiosInstance } from 'axios'

export interface CrudApiConfig {
  resource: string
  baseURL?: string
  request?: AxiosInstance
}

/**
 * CRUD API class with extended functionality
 * Compatible with Avue CRUD operations
 */
export class CrudApi<T = any> extends BaseApi<T> {
  constructor(config: CrudApiConfig) {
    super(config)
  }

  /**
   * Avue compatible page query
   * @param params - Avue page params (current, size, etc.)
   */
  async page(params?: PageParams): Promise<PageResult<T>> {
    // Convert Avue params to backend format
    const queryParams = {
      current: params?.current || 1,
      size: params?.size || 10,
      ...params
    }
    return super.page(queryParams)
  }

  /**
   * Submit form (add or update based on id presence)
   */
  async submitForm(data: Partial<T> & { id?: string | number }): Promise<string> {
    if (data.id) {
      return this.update(data as any)
    }
    return this.add(data)
  }

  /**
   * Get form data by ID
   */
  async getForm(id: string | number): Promise<T> {
    return this.getById(id)
  }

  /**
   * Check if value exists (unique validation)
   */
  async checkUnique(field: string, value: any, excludeId?: string | number): Promise<boolean> {
    const result = await this.get<{ exists: boolean }>('/check-unique', {
      field,
      value,
      excludeId
    })
    return !result.exists
  }

  /**
   * Export data
   */
  async export(params?: Record<string, any>): Promise<Blob> {
    const response = await this.request.get(`${this.resource}/export`, {
      params,
      responseType: 'blob'
    })
    return response as unknown as Blob
  }

  /**
   * Import data
   */
  async importData(file: File): Promise<{ success: number; failed: number; message: string }> {
    const formData = new FormData()
    formData.append('file', file)
    return this.post('/import', formData)
  }

  /**
   * Download template
   */
  async downloadTemplate(): Promise<Blob> {
    const response = await this.request.get(`${this.resource}/template`, {
      responseType: 'blob'
    })
    return response as unknown as Blob
  }

  /**
   * Update status
   */
  async updateStatus(id: string | number, status: number | string): Promise<string> {
    return this.put(`/${id}/status`, { status })
  }

  /**
   * Sort records
   */
  async sort(ids: (string | number)[]): Promise<string> {
    return this.put('/sort', ids)
  }
}
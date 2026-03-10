import { Ref, ref, onMounted, onUnmounted, reactive } from 'vue'

export interface CrudOption {
  title?: string
  columns?: any[]
  searchMenu?: any
  addBtn?: boolean
  editBtn?: boolean
  delBtn?: boolean
  viewBtn?: boolean
  [key: string]: any
}

export interface CrudConfig {
  api: any
  option?: CrudOption
  params?: Record<string, any>
}

/**
 * CrudService - Avue compatible CRUD service class
 * Wraps API and provides reactive state for Avue CRUD operations
 */
export class CrudService<T = any> {
  api: any
  data: Ref<T[]>
  state: {
    loading: boolean
    page: {
      current: number
      size: number
      total: number
    }
  }

  constructor(api: any, data: Ref<T[]>) {
    this.api = api
    this.data = data
    this.state = reactive({
      loading: false,
      page: {
        current: 1,
        size: 10,
        total: 0
      }
    })
  }

  /**
   * Get list data
   */
  async getList(params: Record<string, any> = {}) {
    this.state.loading = true
    try {
      const result = await this.api.page({
        ...params,
        current: this.state.page.current,
        size: this.state.page.size
      })
      this.data.value = result.records || result || []
      this.state.page.total = result.total || this.data.value.length
    } catch (error) {
      console.error('Load data failed:', error)
    } finally {
      this.state.loading = false
    }
  }

  /**
   * Add record
   */
  async add(callback: () => void, row: T, done: () => void, loading: () => void) {
    try {
      await this.api.add(row)
      done()
      callback()
    } catch (error) {
      console.error('Add failed:', error)
      loading()
    }
  }

  /**
   * Update record
   */
  async update(callback: () => void, row: T & { id: string | number }, index: number, done: () => void, loading: () => void) {
    try {
      await this.api.update(row)
      done()
      callback()
    } catch (error) {
      console.error('Update failed:', error)
      loading()
    }
  }

  /**
   * Delete record
   */
  async del(callback: () => void, row: T & { id: string | number }, index: number) {
    try {
      await this.api.delete(row.id)
      callback()
    } catch (error) {
      console.error('Delete failed:', error)
    }
  }

  /**
   * Handle search change
   */
  searchChange(callback: () => void, params: Record<string, any>, done: () => void) {
    this.state.page.current = 1
    done()
    this.getList(params).then(callback)
  }

  /**
   * Handle refresh change
   */
  refreshChange(callback: () => void) {
    this.getList().then(callback)
  }

  /**
   * Handle size change
   */
  sizeChange(callback: () => void, size: number) {
    this.state.page.size = size
    this.state.page.current = 1
    this.getList().then(callback)
  }

  /**
   * Handle current change
   */
  currentChange(callback: () => void, current: number) {
    this.state.page.current = current
    this.getList().then(callback)
  }
}

/**
 * CRUD Service Hook
 * Provides common CRUD operations for Avue
 */
export function useCrud<T = any>(config: CrudConfig) {
  const { api, option = {}, params = {} } = config

  const loading = ref(false)
  const tableData = ref<T[]>([]) as Ref<T[]>
  const page = ref({
    current: 1,
    size: 10,
    total: 0
  })

  /**
   * Load data
   */
  async function loadData(searchParams = {}) {
    loading.value = true
    try {
      const result = await api.page({
        ...params,
        ...searchParams,
        current: page.value.current,
        size: page.value.size
      })
      tableData.value = result.records || []
      page.value.total = result.total || 0
    } catch (error) {
      console.error('Load data failed:', error)
    } finally {
      loading.value = false
    }
  }

  /**
   * Refresh data
   */
  function refresh() {
    loadData()
  }

  /**
   * Handle page change
   */
  function handlePageChange(current: number, size: number) {
    page.value.current = current
    page.value.size = size
    loadData()
  }

  /**
   * Handle size change
   */
  function handleSizeChange(size: number) {
    page.value.size = size
    page.value.current = 1
    loadData()
  }

  /**
   * Handle search
   */
  function handleSearch(params: Record<string, any>) {
    page.value.current = 1
    loadData(params)
  }

  /**
   * Handle reset
   */
  function handleReset() {
    page.value.current = 1
    loadData()
  }

  /**
   * Add record
   */
  async function handleAdd(row: Partial<T>) {
    return api.add(row)
  }

  /**
   * Update record
   */
  async function handleUpdate(row: Partial<T> & { id: string | number }) {
    return api.update(row)
  }

  /**
   * Delete record
   */
  async function handleDelete(id: string | number) {
    return api.delete(id)
  }

  /**
   * Batch delete
   */
  async function handleBatchDelete(ids: (string | number)[]) {
    return api.batchDel(ids)
  }

  /**
   * Get Avue option with CRUD config
   */
  function getAvueOption(): CrudOption {
    return {
      ...option,
      addBtn: option.addBtn !== false,
      editBtn: option.editBtn !== false,
      delBtn: option.delBtn !== false,
      viewBtn: option.viewBtn !== false
    }
  }

  return {
    loading,
    tableData,
    page,
    loadData,
    refresh,
    handlePageChange,
    handleSizeChange,
    handleSearch,
    handleReset,
    handleAdd,
    handleUpdate,
    handleDelete,
    handleBatchDelete,
    getAvueOption
  }
}

/**
 * Calculate table height dynamically
 */
export function useCrudTableHeight(offset = 200): Ref<number> {
  const tableHeight = ref(500)

  const calculateHeight = () => {
    tableHeight.value = window.innerHeight - offset
  }

  onMounted(() => {
    calculateHeight()
    window.addEventListener('resize', calculateHeight)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', calculateHeight)
  })

  return tableHeight
}
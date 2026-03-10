<template>
  <div class="page-table">
    <el-table
      ref="tableRef"
      :data="data"
      :height="height"
      :max-height="maxHeight"
      :stripe="stripe"
      :border="border"
      :size="size"
      :fit="fit"
      :show-header="showHeader"
      :highlight-current-row="highlightCurrentRow"
      :row-key="rowKey as any"
      :empty-text="emptyText"
      :default-expand-all="defaultExpandAll"
      :expand-row-keys="expandRowKeys"
      :default-sort="defaultSort"
      :tooltip-effect="tooltipEffect"
      :show-summary="showSummary"
      :sum-text="sumText"
      :summary-method="summaryMethod as any"
      :span-method="spanMethod as any"
      :select-on-indeterminate="selectOnIndeterminate"
      :indent="indent"
      :lazy="lazy"
      :load="load as any"
      :tree-props="treeProps"
      @select="handleSelect"
      @select-all="handleSelectAll"
      @selection-change="handleSelectionChange"
      @cell-mouse-enter="handleCellMouseEnter"
      @cell-mouse-leave="handleCellMouseLeave"
      @cell-click="handleCellClick"
      @cell-dblclick="handleCellDblclick"
      @row-click="handleRowClick"
      @row-contextmenu="handleRowContextmenu"
      @row-dblclick="handleRowDblclick"
      @header-click="handleHeaderClick"
      @header-contextmenu="handleHeaderContextmenu"
      @sort-change="handleSortChange"
      @filter-change="handleFilterChange"
      @current-change="handleCurrentChange"
      @header-dragend="handleHeaderDragend"
      @expand-change="handleExpandChange"
    >
      <slot></slot>
      <template #empty>
        <slot name="empty">
          <DataEmpty :description="emptyText || '暂无数据'" />
        </slot>
      </template>
      <template #append>
        <slot name="append"></slot>
      </template>
    </el-table>
    <div class="pagination-wrapper" v-if="showPagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="pageSizes"
        :total="total"
        :layout="paginationLayout"
        :background="paginationBackground"
        :small="paginationSmall"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { ElTable } from 'element-plus'
import DataEmpty from '../data/DataEmpty.vue'

interface Props {
  data: any[]
  height?: string | number
  maxHeight?: string | number
  stripe?: boolean
  border?: boolean
  size?: 'large' | 'default' | 'small'
  fit?: boolean
  showHeader?: boolean
  highlightCurrentRow?: boolean
  rowKey?: string | ((row: any) => string)
  emptyText?: string
  defaultExpandAll?: boolean
  expandRowKeys?: any[]
  defaultSort?: { prop: string; order: 'ascending' | 'descending' }
  tooltipEffect?: 'dark' | 'light'
  showSummary?: boolean
  sumText?: string
  summaryMethod?: (data: { columns: any[]; data: any[] }) => (string | number)[]
  spanMethod?: (data: { row: any; rowIndex: number; column: any; columnIndex: number }) => number[] | { rowspan: number; colspan: number } | undefined
  selectOnIndeterminate?: boolean
  indent?: number
  lazy?: boolean
  load?: (row: any, treeNode: any, resolve: (data: any[]) => void) => void
  treeProps?: { hasChildren?: string; children?: string }
  // Pagination
  showPagination?: boolean
  total?: number
  page?: number
  limit?: number
  pageSizes?: number[]
  paginationLayout?: string
  paginationBackground?: boolean
  paginationSmall?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  data: () => [],
  stripe: false,
  border: true,
  size: 'default',
  fit: true,
  showHeader: true,
  highlightCurrentRow: false,
  emptyText: '暂无数据',
  selectOnIndeterminate: true,
  indent: 16,
  treeProps: () => ({ hasChildren: 'hasChildren', children: 'children' }),
  showPagination: true,
  total: 0,
  page: 1,
  limit: 10,
  pageSizes: () => [10, 20, 50, 100],
  paginationLayout: 'total, sizes, prev, pager, next, jumper',
  paginationBackground: true,
  paginationSmall: false
})

const emit = defineEmits<{
  'update:page': [value: number]
  'update:limit': [value: number]
  'select': [selection: any[], row: any]
  'select-all': [selection: any[]]
  'selection-change': [selection: any[]]
  'cell-mouse-enter': [row: any, column: any, cell: HTMLTableCellElement, event: MouseEvent]
  'cell-mouse-leave': [row: any, column: any, cell: HTMLTableCellElement, event: MouseEvent]
  'cell-click': [row: any, column: any, cell: HTMLTableCellElement, event: MouseEvent]
  'cell-dblclick': [row: any, column: any, cell: HTMLTableCellElement, event: MouseEvent]
  'row-click': [row: any, column: any, event: MouseEvent]
  'row-contextmenu': [row: any, column: any, event: MouseEvent]
  'row-dblclick': [row: any, column: any, event: MouseEvent]
  'header-click': [column: any, event: MouseEvent]
  'header-contextmenu': [column: any, event: MouseEvent]
  'sort-change': [sort: { prop: string; order: string | null }]
  'filter-change': [filters: Record<string, any>]
  'current-change': [currentRow: any, oldCurrentRow: any]
  'header-dragend': [newWidth: number, oldWidth: number, column: any, event: MouseEvent]
  'expand-change': [row: any, expandedRows: any[]]
  'pagination': [{ page: number; limit: number }]
}>()

const tableRef = ref<InstanceType<typeof ElTable>>()
const currentPage = computed({
  get: () => props.page,
  set: (val) => emit('update:page', val)
})
const pageSize = computed({
  get: () => props.limit,
  set: (val) => emit('update:limit', val)
})

function handleSizeChange(size: number) {
  emit('pagination', { page: currentPage.value, limit: size })
}

function handleCurrentChange(page: number) {
  emit('pagination', { page, limit: pageSize.value })
}

// Table event handlers
function handleSelect(selection: any[], row: any) {
  emit('select', selection, row)
}

function handleSelectAll(selection: any[]) {
  emit('select-all', selection)
}

function handleSelectionChange(selection: any[]) {
  emit('selection-change', selection)
}

function handleCellMouseEnter(row: any, column: any, cell: HTMLTableCellElement, event: MouseEvent) {
  emit('cell-mouse-enter', row, column, cell, event)
}

function handleCellMouseLeave(row: any, column: any, cell: HTMLTableCellElement, event: MouseEvent) {
  emit('cell-mouse-leave', row, column, cell, event)
}

function handleCellClick(row: any, column: any, cell: HTMLTableCellElement, event: MouseEvent) {
  emit('cell-click', row, column, cell, event)
}

function handleCellDblclick(row: any, column: any, cell: HTMLTableCellElement, event: MouseEvent) {
  emit('cell-dblclick', row, column, cell, event)
}

function handleRowClick(row: any, column: any, event: MouseEvent) {
  emit('row-click', row, column, event)
}

function handleRowContextmenu(row: any, column: any, event: MouseEvent) {
  emit('row-contextmenu', row, column, event)
}

function handleRowDblclick(row: any, column: any, event: MouseEvent) {
  emit('row-dblclick', row, column, event)
}

function handleHeaderClick(column: any, event: MouseEvent) {
  emit('header-click', column, event)
}

function handleHeaderContextmenu(column: any, event: MouseEvent) {
  emit('header-contextmenu', column, event)
}

function handleSortChange(sort: { prop: string; order: string | null }) {
  emit('sort-change', sort)
}

function handleFilterChange(filters: Record<string, any>) {
  emit('filter-change', filters)
}

function handleExpandChange(row: any, expandedRows: any[]) {
  emit('expand-change', row, expandedRows)
}

function handleHeaderDragend(newWidth: number, oldWidth: number, column: any, event: MouseEvent) {
  emit('header-dragend', newWidth, oldWidth, column, event)
}

// Expose table methods
defineExpose({
  clearSelection: () => tableRef.value?.clearSelection(),
  toggleRowSelection: (row: any, selected?: boolean) => tableRef.value?.toggleRowSelection(row, selected),
  toggleAllSelection: () => tableRef.value?.toggleAllSelection(),
  toggleRowExpansion: (row: any, expanded?: boolean) => tableRef.value?.toggleRowExpansion(row, expanded),
  setCurrentRow: (row: any) => tableRef.value?.setCurrentRow(row),
  clearSort: () => tableRef.value?.clearSort(),
  clearFilter: (columnKeys?: string[]) => tableRef.value?.clearFilter(columnKeys),
  doLayout: () => tableRef.value?.doLayout(),
  sort: (prop: string, order: string) => tableRef.value?.sort(prop, order)
})
</script>

<style scoped>
.page-table {
  width: 100%;
}

.pagination-wrapper {
  padding: 16px 0;
  display: flex;
  justify-content: flex-end;
}
</style>
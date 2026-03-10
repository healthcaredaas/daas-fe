<template>
  <div class="date-range-picker">
    <el-date-picker
      v-model="dateRange"
      type="daterange"
      :range-separator="rangeSeparator"
      :start-placeholder="startPlaceholder"
      :end-placeholder="endPlaceholder"
      :format="format"
      :value-format="valueFormat"
      :disabled="disabled"
      :clearable="clearable"
      :editable="editable"
      :size="size"
      :shortcuts="shortcuts"
      @change="handleChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import type { DatePickType } from 'element-plus'

interface Props {
  modelValue?: [string, string] | [Date, Date] | null
  startPlaceholder?: string
  endPlaceholder?: string
  rangeSeparator?: string
  format?: string
  valueFormat?: string
  disabled?: boolean
  clearable?: boolean
  editable?: boolean
  size?: 'large' | 'default' | 'small'
  showShortcuts?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
  startPlaceholder: '开始日期',
  endPlaceholder: '结束日期',
  rangeSeparator: '至',
  format: 'YYYY-MM-DD',
  valueFormat: 'YYYY-MM-DD',
  disabled: false,
  clearable: true,
  editable: true,
  size: 'default',
  showShortcuts: true
})

const emit = defineEmits<{
  'update:modelValue': [value: [string, string] | null]
  'change': [value: [string, string] | null]
}>()

const dateRange = ref<[string, string] | [Date, Date] | null>(props.modelValue)

// Shortcuts
const shortcuts = computed(() => {
  if (!props.showShortcuts) return []

  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

  return [
    {
      text: '今天',
      value: () => {
        const end = new Date(today)
        const start = new Date(today)
        return [start, end]
      }
    },
    {
      text: '昨天',
      value: () => {
        const end = new Date(today)
        end.setTime(end.getTime() - 3600 * 1000 * 24)
        const start = new Date(end)
        return [start, end]
      }
    },
    {
      text: '最近7天',
      value: () => {
        const end = new Date(today)
        const start = new Date(today)
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
        return [start, end]
      }
    },
    {
      text: '最近30天',
      value: () => {
        const end = new Date(today)
        const start = new Date(today)
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
        return [start, end]
      }
    },
    {
      text: '本周',
      value: () => {
        const end = new Date(today)
        const start = new Date(today)
        const day = start.getDay() || 7
        start.setTime(start.getTime() - 3600 * 1000 * 24 * (day - 1))
        return [start, end]
      }
    },
    {
      text: '本月',
      value: () => {
        const end = new Date(today)
        const start = new Date(today.getFullYear(), today.getMonth(), 1)
        return [start, end]
      }
    }
  ]
})

watch(
  () => props.modelValue,
  (val) => {
    dateRange.value = val
  }
)

function handleChange(val: [string, string] | null) {
  emit('update:modelValue', val)
  emit('change', val)
}
</script>

<style scoped>
.date-range-picker {
  display: inline-block;
}
</style>
<template>
  <div class="icon-select">
    <el-input
      v-model="searchText"
      placeholder="搜索图标"
      clearable
      @input="handleSearch"
    >
      <template #prefix>
        <el-icon><Search /></el-icon>
      </template>
    </el-input>
    <div class="icon-list">
      <div
        v-for="icon in filteredIcons"
        :key="icon"
        class="icon-item"
        :class="{ 'is-active': modelValue === icon }"
        @click="handleSelect(icon)"
      >
        <el-icon :size="24">
          <component :is="icon" />
        </el-icon>
        <span class="icon-name">{{ icon }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Search } from '@element-plus/icons-vue'
import * as ElementPlusIcons from '@element-plus/icons-vue'

interface Props {
  modelValue?: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'change': [value: string]
}>()

const searchText = ref('')
const allIcons = Object.keys(ElementPlusIcons)

const filteredIcons = computed(() => {
  if (!searchText.value) return allIcons
  return allIcons.filter(icon => icon.toLowerCase().includes(searchText.value.toLowerCase()))
})

function handleSearch() {
  // Search is reactive
}

function handleSelect(icon: string) {
  emit('update:modelValue', icon)
  emit('change', icon)
}
</script>

<style scoped>
.icon-select {
  width: 100%;
}

.icon-list {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 8px;
  max-height: 300px;
  overflow-y: auto;
  margin-top: 12px;
  padding: 8px;
  border: 1px solid #e8e8e8;
  border-radius: 4px;
}

.icon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s;
}

.icon-item:hover {
  background-color: #f5f7fa;
}

.icon-item.is-active {
  background-color: #ecf5ff;
  color: #409eff;
}

.icon-name {
  font-size: 12px;
  margin-top: 4px;
  text-align: center;
  word-break: break-all;
}
</style>
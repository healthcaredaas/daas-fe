<template>
  <div
    class="scroll-menu-item"
    :class="{ 'is-active': active }"
    @click="handleClick"
  >
    <el-icon v-if="icon" class="item-icon">
      <component :is="icon" />
    </el-icon>
    <span class="item-title">{{ title }}</span>
    <el-icon v-if="closable" class="item-close" @click.stop="handleClose">
      <Close />
    </el-icon>
  </div>
</template>

<script setup lang="ts">
import { Close } from '@element-plus/icons-vue'

interface Props {
  title: string
  icon?: string
  active?: boolean
  closable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  active: false,
  closable: false
})

const emit = defineEmits<{
  click: []
  close: []
}>()

function handleClick() {
  emit('click')
}

function handleClose() {
  emit('close')
}
</script>

<style scoped>
.scroll-menu-item {
  display: inline-flex;
  align-items: center;
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 4px;
  margin-right: 4px;
  transition: all 0.3s;
  background-color: #fff;
  border: 1px solid #e8e8e8;
}

.scroll-menu-item:hover {
  background-color: #f5f7fa;
}

.scroll-menu-item.is-active {
  background-color: #409eff;
  color: #fff;
  border-color: #409eff;
}

.item-icon {
  margin-right: 6px;
  font-size: 14px;
}

.item-title {
  font-size: 14px;
  white-space: nowrap;
}

.item-close {
  margin-left: 6px;
  font-size: 12px;
  border-radius: 50%;
  transition: background-color 0.2s;
}

.item-close:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

.is-active .item-close:hover {
  background-color: rgba(255, 255, 255, 0.2);
}
</style>
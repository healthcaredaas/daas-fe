<template>
  <div class="data-empty">
    <el-empty :image-size="imageSize" :description="description">
      <template #image>
        <slot name="image">
          <el-icon :size="imageSize" color="#c0c4cc">
            <component :is="icon" />
          </el-icon>
        </slot>
      </template>
      <template #default>
        <slot>
          <span class="empty-text">{{ description }}</span>
        </slot>
      </template>
      <template #footer v-if="showFooter">
        <slot name="footer">
          <el-button type="primary" @click="handleAction">{{ actionText }}</el-button>
        </slot>
      </template>
    </el-empty>
  </div>
</template>

<script setup lang="ts">
import { Box } from '@element-plus/icons-vue'

interface Props {
  description?: string
  imageSize?: number
  icon?: any
  showFooter?: boolean
  actionText?: string
}

withDefaults(defineProps<Props>(), {
  description: '暂无数据',
  imageSize: 120,
  icon: Box,
  showFooter: false,
  actionText: '添加数据'
})

const emit = defineEmits<{
  action: []
}>()

function handleAction() {
  emit('action')
}
</script>

<style scoped>
.data-empty {
  padding: 40px 0;
}

.empty-text {
  color: #909399;
  font-size: 14px;
}
</style>
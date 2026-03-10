<template>
  <div class="page-layout">
    <div class="page-header" v-if="showHeader">
      <div class="header-left">
        <el-page-header v-if="showBack" @back="handleBack">
          <template #content>
            <span class="page-title">{{ title }}</span>
          </template>
        </el-page-header>
        <span v-else class="page-title">{{ title }}</span>
      </div>
      <div class="header-right">
        <slot name="header-right"></slot>
      </div>
    </div>
    <div class="page-content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title?: string
  showHeader?: boolean
  showBack?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  showHeader: true,
  showBack: false
})

const emit = defineEmits<{
  back: []
}>()

function handleBack() {
  emit('back')
}
</script>

<style scoped>
.page-layout {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  background-color: #fff;
  border-bottom: 1px solid #e8e8e8;
}

.page-title {
  font-size: 16px;
  font-weight: 500;
  color: #303133;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 8px;
}

.page-content {
  flex: 1;
  padding: 16px;
  overflow: auto;
}
</style>
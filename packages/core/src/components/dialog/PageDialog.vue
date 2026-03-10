<template>
  <div class="page-dialog">
    <el-dialog
      v-model="visible"
      :title="title"
      :width="width"
      :fullscreen="fullscreen"
      :modal="modal"
      :modal-class="modalClass"
      :close-on-click-modal="closeOnClickModal"
      :close-on-press-escape="closeOnPressEscape"
      :show-close="showClose"
      :destroy-on-close="destroyOnClose"
      @open="handleOpen"
      @opened="handleOpened"
      @close="handleClose"
      @closed="handleClosed"
    >
      <slot></slot>
      <template #footer v-if="showFooter">
        <slot name="footer">
          <el-button @click="handleCancel">{{ cancelText }}</el-button>
          <el-button type="primary" :loading="loading" @click="handleConfirm">
            {{ confirmText }}
          </el-button>
        </slot>
      </template>
      <template #header>
        <slot name="header">
          <span class="dialog-title">{{ title }}</span>
        </slot>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  modelValue: boolean
  title?: string
  width?: string | number
  fullscreen?: boolean
  modal?: boolean
  modalClass?: string
  closeOnClickModal?: boolean
  closeOnPressEscape?: boolean
  showClose?: boolean
  destroyOnClose?: boolean
  showFooter?: boolean
  loading?: boolean
  confirmText?: string
  cancelText?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  width: '50%',
  fullscreen: false,
  modal: true,
  closeOnClickModal: false,
  closeOnPressEscape: true,
  showClose: true,
  destroyOnClose: true,
  showFooter: true,
  loading: false,
  confirmText: '确定',
  cancelText: '取消'
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'open': []
  'opened': []
  'close': []
  'closed': []
  'confirm': []
  'cancel': []
}>()

const visible = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

function handleOpen() {
  emit('open')
}

function handleOpened() {
  emit('opened')
}

function handleClose() {
  emit('close')
}

function handleClosed() {
  emit('closed')
}

function handleConfirm() {
  emit('confirm')
}

function handleCancel() {
  visible.value = false
  emit('cancel')
}
</script>

<style scoped>
.page-dialog :deep(.el-dialog__header) {
  padding: 16px 20px;
  border-bottom: 1px solid #e8e8e8;
  margin-right: 0;
}

.page-dialog :deep(.el-dialog__body) {
  padding: 20px;
}

.page-dialog :deep(.el-dialog__footer) {
  padding: 16px 20px;
  border-top: 1px solid #e8e8e8;
}

.dialog-title {
  font-size: 16px;
  font-weight: 500;
  color: #303133;
}
</style>
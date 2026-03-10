<template>
  <div class="oss-uploader">
    <el-upload
      ref="uploadRef"
      :action="action"
      :headers="headers"
      :multiple="multiple"
      :data="uploadData"
      :name="fieldName"
      :with-credentials="withCredentials"
      :show-file-list="showFileList"
      :drag="drag"
      :accept="accept"
      :limit="limit"
      :auto-upload="autoUpload"
      :list-type="listType"
      :disabled="disabled"
      :before-upload="handleBeforeUpload"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
      :on-error="handleError"
      :on-progress="handleProgress"
      :on-change="handleChange"
      :on-exceed="handleExceed"
    >
      <slot>
        <el-button type="primary">
          <el-icon><Upload /></el-icon>
          <span>点击上传</span>
        </el-button>
      </slot>
      <template #tip>
        <div class="el-upload__tip" v-if="tip">{{ tip }}</div>
      </template>
    </el-upload>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Upload } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { getToken } from '../../utils/token'
import type { UploadFile, UploadFiles, UploadInstance } from 'element-plus'

interface Props {
  action?: string
  headers?: Record<string, string>
  multiple?: boolean
  uploadData?: Record<string, any>
  fieldName?: string
  withCredentials?: boolean
  showFileList?: boolean
  drag?: boolean
  accept?: string
  limit?: number
  autoUpload?: boolean
  listType?: 'text' | 'picture' | 'picture-card'
  disabled?: boolean
  tip?: string
  maxSize?: number // in MB
  fileTypes?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  action: '/api/oss/upload',
  multiple: false,
  fieldName: 'file',
  withCredentials: true,
  showFileList: true,
  drag: false,
  autoUpload: true,
  listType: 'text',
  disabled: false,
  maxSize: 10,
  fileTypes: () => []
})

const emit = defineEmits<{
  'preview': [file: UploadFile]
  'remove': [file: UploadFile, fileList: UploadFiles]
  'success': [response: any, file: UploadFile, fileList: UploadFiles]
  'error': [error: Error, file: UploadFile, fileList: UploadFiles]
  'progress': [event: ProgressEvent, file: UploadFile, fileList: UploadFiles]
  'change': [file: UploadFile, fileList: UploadFiles]
  'exceed': [files: File[], fileList: UploadFiles]
}>()

const uploadRef = ref<UploadInstance>()

const headers = computed(() => ({
  Authorization: `Bearer ${getToken()}`,
  ...props.headers
}))

function handleBeforeUpload(file: File) {
  // Check file size
  if (props.maxSize && file.size > props.maxSize * 1024 * 1024) {
    ElMessage.error(`文件大小不能超过 ${props.maxSize}MB`)
    return false
  }

  // Check file type
  if (props.fileTypes && props.fileTypes.length > 0) {
    const fileType = file.name.split('.').pop()?.toLowerCase()
    if (!props.fileTypes.includes(fileType || '')) {
      ElMessage.error(`只支持 ${props.fileTypes.join(', ')} 格式的文件`)
      return false
    }
  }

  return true
}

function handlePreview(file: UploadFile) {
  emit('preview', file)
}

function handleRemove(file: UploadFile, fileList: UploadFiles) {
  emit('remove', file, fileList)
}

function handleSuccess(response: any, file: UploadFile, fileList: UploadFiles) {
  emit('success', response, file, fileList)
}

function handleError(error: Error, file: UploadFile, fileList: UploadFiles) {
  emit('error', error, file, fileList)
}

function handleProgress(event: ProgressEvent, file: UploadFile, fileList: UploadFiles) {
  emit('progress', event, file, fileList)
}

function handleChange(file: UploadFile, fileList: UploadFiles) {
  emit('change', file, fileList)
}

function handleExceed(files: File[], fileList: UploadFiles) {
  emit('exceed', files, fileList)
}

// Expose upload methods
defineExpose({
  submit: () => uploadRef.value?.submit(),
  abort: (file: UploadFile) => uploadRef.value?.abort(file),
  clearFiles: () => uploadRef.value?.clearFiles()
})
</script>

<style scoped>
.oss-uploader {
  width: 100%;
}

.el-upload__tip {
  color: #909399;
  font-size: 12px;
  margin-top: 8px;
}
</style>
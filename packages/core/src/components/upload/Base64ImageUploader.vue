<template>
  <div class="base64-image-uploader">
    <el-upload
      ref="uploadRef"
      :auto-upload="false"
      :show-file-list="false"
      :accept="accept"
      :disabled="disabled"
      :on-change="handleChange"
    >
      <div class="image-container" v-if="imageUrl">
        <img :src="imageUrl" class="preview-image" />
        <div class="image-actions">
          <el-icon class="action-icon" @click.stop="handlePreview"><ZoomIn /></el-icon>
          <el-icon class="action-icon" @click.stop="handleRemove"><Delete /></el-icon>
        </div>
      </div>
      <div class="upload-placeholder" v-else>
        <el-icon class="upload-icon"><Plus /></el-icon>
        <span class="upload-text">{{ placeholder }}</span>
      </div>
    </el-upload>
    <el-dialog v-model="previewVisible" title="图片预览" width="600px">
      <img :src="imageUrl" style="width: 100%;" />
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { Plus, ZoomIn, Delete } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import type { UploadFile, UploadInstance } from 'element-plus'

interface Props {
  modelValue?: string
  placeholder?: string
  accept?: string
  disabled?: boolean
  maxSize?: number // in MB
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  placeholder: '点击上传图片',
  accept: 'image/jpeg,image/png,image/gif,image/webp',
  disabled: false,
  maxSize: 2
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'change': [value: string]
}>()

const uploadRef = ref<UploadInstance>()
const imageUrl = ref(props.modelValue)
const previewVisible = ref(false)

watch(
  () => props.modelValue,
  (val) => {
    imageUrl.value = val
  }
)

function handleChange(file: UploadFile) {
  if (!file.raw) return

  // Check file size
  if (props.maxSize && file.raw.size > props.maxSize * 1024 * 1024) {
    ElMessage.error(`图片大小不能超过 ${props.maxSize}MB`)
    return
  }

  // Convert to base64
  const reader = new FileReader()
  reader.onload = (e) => {
    const base64 = e.target?.result as string
    imageUrl.value = base64
    emit('update:modelValue', base64)
    emit('change', base64)
  }
  reader.readAsDataURL(file.raw)
}

function handlePreview() {
  previewVisible.value = true
}

function handleRemove() {
  imageUrl.value = ''
  emit('update:modelValue', '')
  emit('change', '')
}

defineExpose({
  clear: handleRemove
})
</script>

<style scoped>
.base64-image-uploader {
  display: inline-block;
}

.image-container {
  position: relative;
  width: 148px;
  height: 148px;
  border: 1px solid #dcdfe6;
  border-radius: 6px;
  overflow: hidden;
}

.preview-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-actions {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  opacity: 0;
  transition: opacity 0.3s;
}

.image-container:hover .image-actions {
  opacity: 1;
}

.action-icon {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
}

.action-icon:hover {
  color: #409eff;
}

.upload-placeholder {
  width: 148px;
  height: 148px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: border-color 0.3s;
}

.upload-placeholder:hover {
  border-color: #409eff;
}

.upload-icon {
  font-size: 28px;
  color: #8c939d;
}

.upload-text {
  font-size: 12px;
  color: #8c939d;
  margin-top: 8px;
}
</style>
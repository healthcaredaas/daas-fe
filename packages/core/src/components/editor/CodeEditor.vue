<template>
  <div class="code-editor">
    <div class="editor-toolbar" v-if="showToolbar">
      <el-select v-model="currentLanguage" size="small" style="width: 120px" @change="handleLanguageChange">
        <el-option v-for="lang in languages" :key="lang.value" :label="lang.label" :value="lang.value" />
      </el-select>
      <el-button-group style="margin-left: 12px">
        <el-button size="small" @click="handleFormat">
          <el-icon><MagicStick /></el-icon>
          格式化
        </el-button>
        <el-button size="small" @click="handleCopy">
          <el-icon><CopyDocument /></el-icon>
          复制
        </el-button>
      </el-button-group>
    </div>
    <div ref="editorRef" class="editor-content" :style="{ height: height }"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { MagicStick, CopyDocument } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

interface Props {
  modelValue?: string
  language?: string
  height?: string
  readonly?: boolean
  showToolbar?: boolean
  theme?: 'light' | 'dark'
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  language: 'javascript',
  height: '300px',
  readonly: false,
  showToolbar: true,
  theme: 'light'
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'change': [value: string]
  'language-change': [language: string]
}>()

const editorRef = ref<HTMLElement>()
const currentLanguage = ref(props.language)

// Available languages
const languages = [
  { label: 'JavaScript', value: 'javascript' },
  { label: 'TypeScript', value: 'typescript' },
  { label: 'HTML', value: 'html' },
  { label: 'CSS', value: 'css' },
  { label: 'JSON', value: 'json' },
  { label: 'XML', value: 'xml' },
  { label: 'SQL', value: 'sql' },
  { label: 'Java', value: 'java' },
  { label: 'Python', value: 'python' },
  { label: 'Markdown', value: 'markdown' },
  { label: 'YAML', value: 'yaml' },
  { label: 'Shell', value: 'shell' }
]

// Simple code editor implementation
// For production, consider using CodeMirror or Monaco Editor
let editor: any = null

onMounted(async () => {
  await nextTick()
  initEditor()
})

onUnmounted(() => {
  if (editor) {
    editor = null
  }
})

function initEditor() {
  if (!editorRef.value) return

  // Create a simple textarea-based editor
  // In production, replace with CodeMirror or Monaco Editor
  const textarea = document.createElement('textarea')
  textarea.value = props.modelValue
  textarea.style.width = '100%'
  textarea.style.height = '100%'
  textarea.style.border = 'none'
  textarea.style.outline = 'none'
  textarea.style.resize = 'none'
  textarea.style.padding = '12px'
  textarea.style.fontFamily = 'Monaco, Menlo, "Ubuntu Mono", monospace'
  textarea.style.fontSize = '14px'
  textarea.style.lineHeight = '1.5'
  textarea.style.backgroundColor = props.theme === 'dark' ? '#1e1e1e' : '#fafafa'
  textarea.style.color = props.theme === 'dark' ? '#d4d4d4' : '#333'
  textarea.readOnly = props.readonly

  textarea.addEventListener('input', () => {
    emit('update:modelValue', textarea.value)
    emit('change', textarea.value)
  })

  editorRef.value.appendChild(textarea)
  editor = textarea
}

watch(() => props.modelValue, (val) => {
  if (editor && editor.value !== val) {
    editor.value = val
  }
})

watch(() => props.readonly, (val) => {
  if (editor) {
    editor.readOnly = val
  }
})

watch(() => props.theme, (val) => {
  if (editor) {
    editor.style.backgroundColor = val === 'dark' ? '#1e1e1e' : '#fafafa'
    editor.style.color = val === 'dark' ? '#d4d4d4' : '#333'
  }
})

function handleLanguageChange(lang: string) {
  emit('language-change', lang)
}

function handleFormat() {
  // Simple JSON formatting
  if (currentLanguage.value === 'json' && editor) {
    try {
      const formatted = JSON.stringify(JSON.parse(editor.value), null, 2)
      editor.value = formatted
      emit('update:modelValue', formatted)
      emit('change', formatted)
    } catch (e) {
      ElMessage.error('JSON 格式错误')
    }
  }
}

function handleCopy() {
  if (editor) {
    navigator.clipboard.writeText(editor.value)
    ElMessage.success('已复制到剪贴板')
  }
}

defineExpose({
  getValue: () => editor?.value || '',
  setValue: (val: string) => {
    if (editor) {
      editor.value = val
    }
  },
  focus: () => editor?.focus()
})
</script>

<style scoped>
.code-editor {
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  overflow: hidden;
}

.editor-toolbar {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  background-color: #f5f7fa;
  border-bottom: 1px solid #dcdfe6;
}

.editor-content {
  overflow: auto;
}
</style>
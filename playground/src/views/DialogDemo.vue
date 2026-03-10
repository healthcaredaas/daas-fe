<template>
  <div class="dialog-demo">
    <PageLayout title="对话框组件演示">
      <el-card>
        <el-button type="primary" @click="dialog1 = true">打开对话框</el-button>
        <el-button type="success" @click="dialog2 = true">自定义对话框</el-button>
      </el-card>
    </PageLayout>

    <PageDialog v-model="dialog1" title="基础对话框" @confirm="handleConfirm1">
      <el-form :model="form1" label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="form1.name" placeholder="请输入名称" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form1.desc" type="textarea" placeholder="请输入描述" />
        </el-form-item>
      </el-form>
    </PageDialog>

    <PageDialog
      v-model="dialog2"
      title="自定义对话框"
      width="800px"
      :show-footer="false"
    >
      <el-descriptions :column="2" border>
        <el-descriptions-item label="用户名">admin</el-descriptions-item>
        <el-descriptions-item label="手机号">13800138000</el-descriptions-item>
        <el-descriptions-item label="邮箱">admin@example.com</el-descriptions-item>
        <el-descriptions-item label="部门">技术部</el-descriptions-item>
        <el-descriptions-item label="角色" :span="2">管理员</el-descriptions-item>
      </el-descriptions>
      <div style="text-align: right; margin-top: 16px">
        <el-button @click="dialog2 = false">关闭</el-button>
      </div>
    </PageDialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { PageLayout, PageDialog } from '@daas-fe/components'
import { ElMessage } from 'element-plus'

const dialog1 = ref(false)
const dialog2 = ref(false)

const form1 = reactive({
  name: '',
  desc: ''
})

function handleConfirm1() {
  ElMessage.success('确认成功')
  dialog1.value = false
}
</script>

<style scoped>
.dialog-demo {
  height: 100%;
}
</style>
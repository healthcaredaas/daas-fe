<template>
  <div class="form-demo">
    <PageLayout title="表单组件演示">
      <el-card>
        <el-form :model="form" :rules="rules" ref="formRef" label-width="100px" style="max-width: 600px">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="form.username" placeholder="请输入用户名" />
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="form.email" placeholder="请输入邮箱" />
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="form.phone" placeholder="请输入手机号" />
          </el-form-item>
          <el-form-item label="日期范围" prop="dateRange">
            <DateRangePicker v-model="form.dateRange" />
          </el-form-item>
          <el-form-item label="头像">
            <Base64ImageUploader v-model="form.avatar" />
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-radio-group v-model="form.status">
              <el-radio :value="1">启用</el-radio>
              <el-radio :value="0">禁用</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="form.remark" type="textarea" rows="3" placeholder="请输入备注" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSubmit">提交</el-button>
            <el-button @click="handleReset">重置</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </PageLayout>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { PageLayout, DateRangePicker, Base64ImageUploader } from '@daas-fe/components'
import { required, email, phone } from '@daas-fe/core/utils/validator'
import { ElMessage, type FormInstance } from 'element-plus'

const formRef = ref<FormInstance>()

const form = reactive({
  username: '',
  email: '',
  phone: '',
  dateRange: null as [string, string] | null,
  avatar: '',
  status: 1,
  remark: ''
})

const rules = {
  username: [required('请输入用户名')],
  email: [required('请输入邮箱'), email()],
  phone: [required('请输入手机号'), phone()],
  status: [required('请选择状态')]
}

function handleSubmit() {
  formRef.value?.validate((valid) => {
    if (valid) {
      ElMessage.success('表单验证通过')
      console.log('Form data:', form)
    }
  })
}

function handleReset() {
  formRef.value?.resetFields()
}
</script>

<style scoped>
.form-demo {
  height: 100%;
}
</style>
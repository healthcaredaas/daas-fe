<template>
  <div class="about-page">
    <PageLayout title="关于">
      <el-card>
        <el-descriptions :column="2" border>
          <el-descriptions-item label="项目名称">DataSphere FE</el-descriptions-item>
          <el-descriptions-item label="版本">1.0.0</el-descriptions-item>
          <el-descriptions-item label="Vue 版本">3.5.x</el-descriptions-item>
          <el-descriptions-item label="Element Plus">2.9.x</el-descriptions-item>
          <el-descriptions-item label="TypeScript">5.7.x</el-descriptions-item>
          <el-descriptions-item label="构建工具">Vite 6.x</el-descriptions-item>
          <el-descriptions-item label="包管理器">pnpm 9.x</el-descriptions-item>
          <el-descriptions-item label="许可证">Apache-2.0</el-descriptions-item>
        </el-descriptions>
      </el-card>

      <el-card style="margin-top: 20px">
        <template #header>
          <span>技术栈</span>
        </template>
        <el-tag v-for="tech in technologies" :key="tech" style="margin: 4px">{{ tech }}</el-tag>
      </el-card>

      <el-card style="margin-top: 20px">
        <template #header>
          <span>组件列表</span>
        </template>
        <el-table :data="components" border>
          <el-table-column prop="name" label="组件名" />
          <el-table-column prop="description" label="描述" />
          <el-table-column prop="category" label="分类" width="120" />
        </el-table>
      </el-card>
    </PageLayout>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { PageLayout } from '@daas-fe/components'

const technologies = ref([
  'Vue 3', 'TypeScript', 'Vite', 'Element Plus', 'Pinia', 'Vue Router',
  'Axios', 'Avue', 'Tailwind CSS', 'SCSS', 'CodeMirror'
])

const components = ref([
  { name: 'AdminLayout', description: '管理后台布局组件', category: '布局' },
  { name: 'CommonLayout', description: '通用布局组件', category: '布局' },
  { name: 'PageLayout', description: '页面布局组件', category: '布局' },
  { name: 'AsideMenu', description: '侧边栏菜单组件', category: '菜单' },
  { name: 'NavMenu', description: '导航菜单组件', category: '菜单' },
  { name: 'VerticalMenu', description: '垂直菜单组件', category: '菜单' },
  { name: 'PageTable', description: '分页表格组件', category: '表格' },
  { name: 'PageDialog', description: '页面对话框组件', category: '对话框' },
  { name: 'SvgIcon', description: 'SVG 图标组件', category: '图标' },
  { name: 'IconSelect', description: '图标选择器组件', category: '图标' },
  { name: 'OssUploader', description: 'OSS 文件上传组件', category: '上传' },
  { name: 'Base64ImageUploader', description: 'Base64 图片上传组件', category: '上传' },
  { name: 'CodeEditor', description: '代码编辑器组件', category: '编辑器' },
  { name: 'DateRangePicker', description: '日期范围选择器组件', category: '日期' },
  { name: 'DataEmpty', description: '空数据展示组件', category: '数据展示' }
])
</script>

<style scoped>
.about-page {
  height: 100%;
}
</style>
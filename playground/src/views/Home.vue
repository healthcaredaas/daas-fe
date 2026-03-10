<template>
  <div class="home-page">
    <el-card>
      <template #header>
        <span class="card-title">欢迎使用 DataSphere FE 组件库</span>
      </template>
      <el-row :gutter="20">
        <el-col :span="8" v-for="item in features" :key="item.title">
          <el-card shadow="hover" class="feature-card">
            <el-icon :size="40" :color="item.color">
              <component :is="item.icon" />
            </el-icon>
            <h3>{{ item.title }}</h3>
            <p>{{ item.description }}</p>
          </el-card>
        </el-col>
      </el-row>
    </el-card>

    <el-card style="margin-top: 20px">
      <template #header>
        <span class="card-title">快速开始</span>
      </template>
      <el-steps :active="1" finish-status="success">
        <el-step title="安装依赖" description="pnpm install" />
        <el-step title="引入组件" description="import { AdminLayout } from '@daas-fe/components'" />
        <el-step title="开始使用" description="在项目中使用组件" />
      </el-steps>
    </el-card>

    <el-card style="margin-top: 20px">
      <template #header>
        <span class="card-title">统计信息</span>
      </template>
      <el-row :gutter="20">
        <el-col :span="6" v-for="stat in stats" :key="stat.label">
          <el-statistic :title="stat.label" :value="stat.value">
            <template #prefix>
              <el-icon><component :is="stat.icon" /></el-icon>
            </template>
          </el-statistic>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Grid, Document, MessageBox, Upload, Edit, Setting } from '@element-plus/icons-vue'

const features = ref([
  {
    title: '丰富的组件',
    description: '提供 18+ 个高质量 UI 组件',
    icon: Grid,
    color: '#409eff'
  },
  {
    title: 'TypeScript',
    description: '完整的 TypeScript 类型支持',
    icon: Document,
    color: '#67c23a'
  },
  {
    title: 'Vue 3',
    description: '基于 Vue 3 Composition API',
    icon: Edit,
    color: '#e6a23c'
  }
])

const stats = ref([
  { label: '组件数量', value: 18, icon: Grid },
  { label: '下载量', value: 1234, icon: Upload },
  { label: 'GitHub Stars', value: 567, icon: Setting },
  { label: '贡献者', value: 12, icon: MessageBox }
])
</script>

<style scoped>
.home-page {
  padding: 20px;
}

.card-title {
  font-size: 16px;
  font-weight: 500;
}

.feature-card {
  text-align: center;
  padding: 20px;
}

.feature-card h3 {
  margin: 16px 0 8px;
  font-size: 16px;
}

.feature-card p {
  color: #909399;
  font-size: 14px;
}
</style>
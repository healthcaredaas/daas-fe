<template>
  <div class="table-demo">
    <PageLayout title="表格组件演示">
      <el-card>
        <PageTable
          :data="tableData"
          :total="total"
          :page="queryParams.current"
          :limit="queryParams.size"
          @pagination="handlePagination"
        >
          <el-table-column prop="id" label="ID" width="80" />
          <el-table-column prop="name" label="名称" />
          <el-table-column prop="age" label="年龄" width="100" />
          <el-table-column prop="email" label="邮箱" />
          <el-table-column prop="status" label="状态" width="100">
            <template #default="{ row }">
              <el-tag :type="row.status === 1 ? 'success' : 'danger'">
                {{ row.status === 1 ? '启用' : '禁用' }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" width="180" />
          <el-table-column label="操作" width="200" fixed="right">
            <template #default="{ row }">
              <el-button type="primary" link @click="handleEdit(row)">编辑</el-button>
              <el-button type="danger" link @click="handleDelete(row)">删除</el-button>
            </template>
          </el-table-column>
        </PageTable>
      </el-card>
    </PageLayout>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { PageLayout, PageTable } from '@daas-fe/components'
import { ElMessage, ElMessageBox } from 'element-plus'

const queryParams = reactive({
  current: 1,
  size: 10
})

const total = ref(100)

const tableData = ref([
  { id: 1, name: '张三', age: 28, email: 'zhangsan@example.com', status: 1, createTime: '2024-01-01 10:00:00' },
  { id: 2, name: '李四', age: 32, email: 'lisi@example.com', status: 1, createTime: '2024-01-02 11:00:00' },
  { id: 3, name: '王五', age: 25, email: 'wangwu@example.com', status: 0, createTime: '2024-01-03 12:00:00' },
  { id: 4, name: '赵六', age: 30, email: 'zhaoliu@example.com', status: 1, createTime: '2024-01-04 13:00:00' },
  { id: 5, name: '钱七', age: 27, email: 'qianqi@example.com', status: 0, createTime: '2024-01-05 14:00:00' }
])

function handlePagination({ page, limit }: { page: number; limit: number }) {
  queryParams.current = page
  queryParams.size = limit
}

function handleEdit(row: any) {
  ElMessage.info(`编辑: ${row.name}`)
}

function handleDelete(row: any) {
  ElMessageBox.confirm(`确定删除 ${row.name} 吗？`, '提示', {
    type: 'warning'
  }).then(() => {
    ElMessage.success('删除成功')
  })
}
</script>

<style scoped>
.table-demo {
  height: 100%;
}
</style>
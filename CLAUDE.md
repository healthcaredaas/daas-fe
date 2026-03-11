# daas-fe - 前端组件库

## 项目概述

daas-fe 是 DataSphere 项目的前端组件库，提供 @daas-fe/core 核心包，包含通用组件、工具函数、API 封装等。

## 模块结构

```
daas-fe/
├── packages/
│   └── core/               # @daas-fe/core 核心包
│       ├── src/
│       │   ├── api/        # API 封装
│       │   ├── components/ # UI 组件
│       │   ├── crud/       # CRUD 服务
│       │   ├── stores/     # 状态管理
│       │   ├── utils/      # 工具函数
│       │   ├── router/     # 路由配置
│       │   └── index.ts    # 入口文件
│       └── package.json
│
└── playground/             # 开发调试
```

## 核心导出

### API 封装

```typescript
import { CrudApi, request } from '@daas-fe/core'

// CrudApi 使用
const userApi = new CrudApi({ resource: '/api/v1/users' })

// 基础 CRUD 方法
await userApi.page({ current: 1, size: 10 })
await userApi.list()
await userApi.getById('xxx')
await userApi.add(data)
await userApi.update(data)
await userApi.delete('xxx')
await userApi.batchDel(['id1', 'id2'])
```

### CRUD 服务

```typescript
import { CrudService, useCrud, useCrudTableHeight } from '@daas-fe/core'

// CrudService 类
const data = ref([])
const service = new CrudService(userApi, data)

service.getList()
service.add(callback, row, done, loading)
service.update(callback, row, index, done, loading)
service.del(callback, row, index)

// useCrud Hook
const { loading, tableData, page, loadData, handleSearch, handlePageChange } = useCrud({
  api: userApi,
  option: {}
})
```

### 权限控制

```typescript
import { hasPermission } from '@daas-fe/core'

// 检查单个权限
if (hasPermission('user:create')) {
  // 有权限
}

// 检查多个权限（任一）
if (hasPermission(['user:create', 'user:update'])) {
  // 有权限
}
```

### UI 组件

```typescript
// 布局组件
import { AdminLayout, CommonLayout, PageLayout } from '@daas-fe/core'

// 菜单组件
import { VerticalMenu, AsideMenu, NavMenu } from '@daas-fe/core'

// 表格组件
import { PageTable } from '@daas-fe/core'

// 对话框组件
import { PageDialog } from '@daas-fe/core'

// 上传组件
import { OssUploader, Base64ImageUploader } from '@daas-fe/core'

// 图标组件
import { SvgIcon, IconSelect, RiIcon } from '@daas-fe/core'
```

### 工具函数

```typescript
import {
  formatDate,
  parseDate,
  deepClone,
  deepMerge,
  required,
  email,
  phone,
  url,
  getDict,
  getDictLabel,
  getDictValue,
  setToken,
  getToken,
  removeToken
} from '@daas-fe/core'
```

## 组件使用

### AdminLayout

```vue
<template>
  <AdminLayout
    :menu-data="menuData"
    :user-info="userInfo"
    @logout="handleLogout"
  >
    <router-view />
  </AdminLayout>
</template>
```

### PageTable

```vue
<template>
  <PageTable
    :data="tableData"
    :columns="columns"
    :loading="loading"
    :total="total"
    @page-change="handlePageChange"
  >
    <template #status="{ row }">
      <el-tag :type="row.status === '1' ? 'success' : 'danger'">
        {{ row.status === '1' ? '有效' : '无效' }}
      </el-tag>
    </template>
  </PageTable>
</template>
```

## 开发指南

### 安装依赖

```bash
cd daas-fe
pnpm install
```

### 开发调试

```bash
# 启动 playground
pnpm dev

# 访问 http://localhost:5173
```

### 构建

```bash
# 构建 core 包
pnpm build
```

### 新增组件

1. 在 `packages/core/src/components/` 下创建组件目录
2. 编写 `.vue` 组件文件
3. 在 `packages/core/src/index.ts` 中导出组件

### 新增工具函数

1. 在 `packages/core/src/utils/` 下创建文件
2. 导出函数
3. 在 `packages/core/src/index.ts` 中导出

## 代码规范

### 组件命名

- 使用 PascalCase 命名
- 组件文件使用 PascalCase.vue

### 类型定义

```typescript
// Props 类型
interface Props {
  title: string
  count?: number
}

// Emits 类型
interface Emits {
  change: [value: string]
}
```

### 样式规范

- 使用 scoped 样式
- 遵循 BEM 命名规范

## 发布流程

```bash
# 1. 更新版本号
npm version patch/minor/major

# 2. 构建
pnpm build

# 3. 发布
npm publish
```

## 注意事项

1. 修改 core 后需要重新 build 才能在其他项目中生效
2. 组件样式使用 scoped 避免污染
3. 导出的函数和组件需要类型定义
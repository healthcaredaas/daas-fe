# @daas-fe/core

DataSphere Frontend Core - 核心功能包

## 安装

```bash
pnpm add @daas-fe/core
```

## 功能模块

### 请求封装

```typescript
import { request, createRequest } from '@daas-fe/core'

// 使用默认请求实例
const data = await request.get('/api/users')

// 创建自定义请求实例
const customRequest = createRequest({
  baseURL: 'https://api.example.com',
  timeout: 30000
})
```

### API 基类

```typescript
import { BaseApi, CrudApi } from '@daas-fe/core'

// 基础 API
class UserApi extends BaseApi<User> {
  constructor() {
    super({ resource: '/api/users' })
  }
}

// CRUD API (兼容 Avue)
class UserCrudApi extends CrudApi<User> {
  constructor() {
    super({ resource: '/api/users' })
  }
}
```

### 状态管理

```typescript
import { useUserStore, useMenuStore, useMainStore } from '@daas-fe/core'

const userStore = useUserStore()
const menuStore = useMenuStore()
const mainStore = useMainStore()
```

### 路由管理

```typescript
import { router, newRouter, setupRouterGuards } from '@daas-fe/core'

// 创建路由
const router = newRouter('/', routes)

// 设置路由守卫
setupRouterGuards()
```

### CRUD 工具

```typescript
import { useCrud, useCrudTableHeight } from '@daas-fe/core'

const {
  loading,
  tableData,
  page,
  loadData,
  handleSearch,
  handleAdd,
  handleUpdate,
  handleDelete
} = useCrud({
  api: new UserApi(),
  option: {
    title: '用户管理'
  }
})
```

### 工具函数

```typescript
import {
  getToken,
  setToken,
  formatDate,
  hasPermission,
  required,
  email
} from '@daas-fe/core'

// Token 管理
setToken('your-token')
const token = getToken()

// 日期处理
formatDate(new Date(), 'YYYY-MM-DD')

// 权限检查
if (hasPermission('user:edit')) {
  // 有权限
}

// 表单验证
const rules = {
  username: [required('请输入用户名')],
  email: [required('请输入邮箱'), email()]
}
```

## 配置

```typescript
import { useAppConfig, getConfig } from '@daas-fe/core'

// 设置应用配置
useAppConfig('my-app', {
  name: 'My Application',
  layout: AdminLayout
})

// 获取配置
const appConfig = getConfig('my-app')
```

## 枚举

```typescript
import { enums } from '@daas-fe/core'

// 使用枚举
const status = enums.Status.ENABLED
const dataType = enums.DataType.STRING
```
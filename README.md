# DataSphere FE - 数据中台前端组件库

<p align="center">
  <a href="#">
    <img src="https://img.shields.io/badge/Vue-3.5.x-brightgreen" alt="Vue">
  </a>
  <a href="#">
    <img src="https://img.shields.io/badge/TypeScript-5.7.x-blue" alt="TypeScript">
  </a>
  <a href="#">
    <img src="https://img.shields.io/badge/Vite-6.x-green" alt="Vite">
  </a>
  <a href="#">
    <img src="https://img.shields.io/badge/Element%20Plus-2.9.x-409eff" alt="Element Plus">
  </a>
  <a href="#">
    <img src="https://img.shields.io/badge/license-Apache%202.0-green" alt="License">
  </a>
</p>

## 简介

DataSphere FE 是一个基于 Vue 3 + TypeScript + Element Plus 的前端组件库，专为数据中台项目设计。提供了一套完整的 UI 组件、核心功能模块和工具函数，帮助开发者快速构建企业级管理后台应用。

## 特性

- 🚀 **Vue 3** - 基于 Vue 3 Composition API
- 💪 **TypeScript** - 完整的 TypeScript 类型支持
- 🎨 **Element Plus** - 基于 Element Plus 二次封装
- 📦 **Monorepo** - 使用 pnpm workspace 管理多包
- 🔧 **Vite** - 极速的开发体验
- 📝 **CRUD 封装** - 兼容 Avue 的 CRUD 操作

## 包结构

| 包名 | 描述 |
|------|------|
| [@daas-fe/core](./packages/core/README.md) | 核心功能包：请求封装、API 基类、状态管理、路由、工具函数 |
| [@daas-fe/components](./packages/components/README.md) | UI 组件包：布局、菜单、表格、对话框、上传、编辑器等 |

## 安装

```bash
# 安装核心包
pnpm add @daas-fe/core

# 安装组件包
pnpm add @daas-fe/components
```

## 快速开始

### 1. 安装依赖

```bash
pnpm install
```

### 2. 启动开发服务器

```bash
pnpm dev
```

### 3. 构建组件库

```bash
pnpm build
```

## 组件列表

### 布局组件
- `AdminLayout` - 管理后台布局
- `CommonLayout` - 通用布局
- `PageLayout` - 页面布局

### 菜单组件
- `AsideMenu` - 侧边栏菜单
- `NavMenu` - 导航菜单
- `VerticalMenu` - 垂直菜单
- `ScrollMenuHorizontal` - 水平滚动菜单

### 表格组件
- `PageTable` - 分页表格

### 对话框组件
- `PageDialog` - 页面对话框

### 图标组件
- `SvgIcon` - SVG 图标
- `IconSelect` - 图标选择器
- `RiIcon` - Remix 图标

### 上传组件
- `OssUploader` - OSS 文件上传
- `Base64ImageUploader` - Base64 图片上传

### 编辑器组件
- `CodeEditor` - 代码编辑器

### 日期组件
- `DateRangePicker` - 日期范围选择器

### 数据展示组件
- `DataEmpty` - 空数据展示

## 核心功能

### 请求封装

```typescript
import { request, createRequest } from '@daas-fe/core'

// 使用默认请求实例
const data = await request.get('/api/users')

// 创建自定义请求实例
const customRequest = createRequest({ baseURL: 'https://api.example.com' })
```

### API 基类

```typescript
import { CrudApi } from '@daas-fe/core'

class UserApi extends CrudApi<User> {
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

### CRUD 工具

```typescript
import { useCrud } from '@daas-fe/core'

const { loading, tableData, loadData, handleSearch } = useCrud({
  api: new UserApi()
})
```

## 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| Vue | 3.5.x | 渐进式 JavaScript 框架 |
| TypeScript | 5.7.x | JavaScript 的超集 |
| Vite | 6.x | 下一代前端构建工具 |
| Element Plus | 2.9.x | Vue 3 UI 组件库 |
| Pinia | 2.3.x | Vue 状态管理 |
| Vue Router | 4.5.x | Vue 路由管理 |
| Axios | 1.x | HTTP 请求库 |
| Avue | 3.7.x | CRUD 框架 |
| Tailwind CSS | 4.x | 原子化 CSS 框架 |

## 开发指南

### 项目结构

```
daas-fe/
├── packages/
│   ├── core/                    # 核心功能包
│   │   ├── src/
│   │   │   ├── api/            # API 封装
│   │   │   ├── config/         # 配置管理
│   │   │   ├── crud/           # CRUD 封装
│   │   │   ├── lib/            # 工具库
│   │   │   ├── router/         # 路由管理
│   │   │   ├── stores/         # 状态管理
│   │   │   ├── types/          # TypeScript 类型
│   │   │   ├── utils/          # 工具函数
│   │   │   └── enums/          # 枚举定义
│   │   └── package.json
│   │
│   └── components/              # UI 组件包
│       ├── src/
│       │   ├── components/     # 组件源码
│       │   └── styles/         # 组件样式
│       └── package.json
│
├── playground/                  # 组件演示项目
├── docs/                        # 文档
├── package.json                 # 根 package.json
├── pnpm-workspace.yaml          # pnpm workspace 配置
└── tsconfig.json                # TypeScript 配置
```

### 常用命令

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建所有包
pnpm build

# 构建 core 包
pnpm build:core

# 构建 components 包
pnpm build:components

# 运行测试
pnpm test

# 代码检查
pnpm lint

# 类型检查
pnpm type-check
```

## 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 许可证

本项目采用 Apache License 2.0 开源许可证。

## 联系方式

- 作者: DataSphere Team
- 邮箱: chenpan.ai@qq.com
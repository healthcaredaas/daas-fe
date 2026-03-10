# daas-fe 项目结构

## 目录结构

```
daas-fe/
├── .vscode/                          # VS Code 配置
│   ├── extensions.json               # 推荐扩展
│   └── settings.json                 # 编辑器设置
│
├── docs/                             # 文档目录
│
├── packages/
│   ├── core/                         # @daas-fe/core 核心功能包
│   │   ├── src/
│   │   │   ├── api/                 # API 封装
│   │   │   │   ├── base.ts          # BaseApi 基类
│   │   │   │   ├── crud.ts          # CrudApi 类
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── bootstrap/           # 启动引导
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── config/              # 配置管理
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── crud/                # CRUD 封装
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── enums/               # 枚举定义
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── lib/                 # 工具库
│   │   │   │   ├── request.ts       # Axios 请求封装
│   │   │   │   ├── dictRequest.ts   # 字典请求实例
│   │   │   │   ├── menuHelper.ts    # 菜单帮助函数
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── router/              # 路由管理
│   │   │   │   ├── index.ts         # 路由创建
│   │   │   │   └── helper.ts        # 路由守卫
│   │   │   │
│   │   │   ├── stores/              # 状态管理 (Pinia)
│   │   │   │   ├── mainStore.ts     # 应用状态
│   │   │   │   ├── userStore.ts     # 用户状态
│   │   │   │   ├── menuStore.ts     # 菜单状态
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── types/               # TypeScript 类型
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── utils/               # 工具函数
│   │   │   │   ├── token.ts         # Token 管理
│   │   │   │   ├── date.ts          # 日期处理
│   │   │   │   ├── object.ts        # 对象操作
│   │   │   │   ├── permission.ts    # 权限检查
│   │   │   │   ├── validator.ts     # 表单验证
│   │   │   │   ├── dict.ts          # 字典工具
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   └── index.ts             # 主入口
│   │   │
│   │   ├── package.json
│   │   ├── vite.config.ts
│   │   └── README.md
│   │
│   └── components/                   # @daas-fe/components UI 组件包
│       ├── src/
│       │   ├── components/          # 组件源码
│       │   │   ├── data/           # 数据展示
│       │   │   │   └── DataEmpty.vue
│       │   │   │
│       │   │   ├── date/           # 日期组件
│       │   │   │   └── DateRangePicker.vue
│       │   │   │
│       │   │   ├── dialog/         # 对话框
│       │   │   │   └── PageDialog.vue
│       │   │   │
│       │   │   ├── editor/         # 编辑器
│       │   │   │   └── CodeEditor.vue
│       │   │   │
│       │   │   ├── icon/           # 图标
│       │   │   │   ├── SvgIcon.vue
│       │   │   │   ├── IconSelect.vue
│       │   │   │   └── RiIcon.vue
│       │   │   │
│       │   │   ├── layouts/        # 布局
│       │   │   │   ├── AdminLayout.vue
│       │   │   │   ├── CommonLayout.vue
│       │   │   │   └── PageLayout.vue
│       │   │   │
│       │   │   ├── menu/           # 菜单
│       │   │   │   ├── AsideMenu.vue
│       │   │   │   ├── AsideMenuItem.vue
│       │   │   │   ├── NavMenu.vue
│       │   │   │   ├── NavMenuItem.vue
│       │   │   │   ├── VerticalMenu.vue
│       │   │   │   ├── VerticalMenuItem.vue
│       │   │   │   ├── ScrollMenuHorizontal.vue
│       │   │   │   └── ScrollMenuItem.vue
│       │   │   │
│       │   │   ├── table/          # 表格
│       │   │   │   └── PageTable.vue
│       │   │   │
│       │   │   └── upload/         # 上传
│       │   │       ├── OssUploader.vue
│       │   │       └── Base64ImageUploader.vue
│       │   │
│       │   ├── styles/             # 样式
│       │   └── index.ts            # 主入口
│       │
│       ├── package.json
│       ├── vite.config.ts
│       └── README.md
│
├── playground/                       # 组件演示项目
│   ├── src/
│   │   ├── views/                  # 页面
│   │   │   ├── Home.vue
│   │   │   ├── TableDemo.vue
│   │   │   ├── DialogDemo.vue
│   │   │   ├── FormDemo.vue
│   │   │   └── About.vue
│   │   │
│   │   ├── router/                 # 路由
│   │   │   └── index.ts
│   │   │
│   │   ├── App.vue                 # 根组件
│   │   └── main.ts                 # 入口文件
│   │
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   ├── tsconfig.app.json
│   ├── tsconfig.node.json
│   └── env.d.ts
│
├── .editorconfig                    # EditorConfig 配置
├── .gitignore                       # Git 忽略文件
├── .prettierrc                      # Prettier 配置
├── .prettierrc.json
├── eslint.config.js                 # ESLint 配置
├── package.json                     # 根 package.json
├── pnpm-workspace.yaml              # pnpm workspace 配置
├── tsconfig.json                    # TypeScript 配置
├── vitest.config.ts                 # Vitest 配置
└── README.md                        # 项目文档
```

## 文件统计

- 总文件数: 78+
- TypeScript 文件: 45+
- Vue 组件: 20+
- 配置文件: 13+

## 快速开始

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建所有包
pnpm build

# 构建核心包
pnpm build:core

# 构建组件包
pnpm build:components

# 运行测试
pnpm test

# 代码检查
pnpm lint

# 格式化代码
pnpm format
```

## 技术栈

- Vue 3.5.x
- TypeScript 5.7.x
- Vite 6.x
- Element Plus 2.9.x
- Pinia 2.3.x
- Vue Router 4.5.x
- Axios 1.x
- Avue 3.7.x
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    vue(),
    dts({
      include: ['src/**/*.ts', 'src/**/*.vue'],
      outDir: 'dist',
      tsconfigPath: resolve(__dirname, './tsconfig.json'),
      skipDiagnostics: true
    })
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'DaasFeCore',
      formats: ['es'],
      fileName: 'index'
    },
    rollupOptions: {
      external: [
        'vue',
        'vue-router',
        'pinia',
        'axios',
        'element-plus',
        'element-plus/es',
        'element-plus/es/components/notification/style/css',
        '@element-plus/icons-vue',
        '@smallwei/avue',
        'nprogress',
        'dayjs'
      ],
      output: {
        globals: {
          vue: 'Vue',
          'vue-router': 'VueRouter',
          pinia: 'Pinia',
          axios: 'Axios',
          'element-plus': 'ElementPlus',
          '@element-plus/icons-vue': 'ElementPlusIconsVue',
          '@smallwei/avue': 'Avue',
          nprogress: 'NProgress',
          dayjs: 'dayjs'
        },
        preserveModules: true,
        preserveModulesRoot: 'src'
      }
    },
    sourcemap: true,
    cssCodeSplit: false
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
})
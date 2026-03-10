<template>
  <div class="common-layout">
    <el-container>
      <el-header class="common-header">
        <div class="header-content">
          <slot name="header">
            <div class="logo-area">
              <img v-if="logo" :src="logo" alt="Logo" class="logo" />
              <span class="title">{{ title }}</span>
            </div>
            <div class="header-right">
              <slot name="header-right"></slot>
            </div>
          </slot>
        </div>
      </el-header>
      <el-main class="common-main">
        <slot></slot>
      </el-main>
      <el-footer class="common-footer" v-if="showFooter">
        <slot name="footer">
          <span>{{ footerText }}</span>
        </slot>
      </el-footer>
    </el-container>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title?: string
  logo?: string
  showFooter?: boolean
  footerText?: string
}

withDefaults(defineProps<Props>(), {
  title: 'DataSphere',
  showFooter: false,
  footerText: '© 2026 DataSphere Team'
})
</script>

<style scoped>
.common-layout {
  min-height: 100vh;
  width: 100%;
}

.common-layout .el-container {
  min-height: 100vh;
  flex-direction: column;
}

.common-header {
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  padding: 0;
  height: auto;
}

.header-content {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
}

.logo-area {
  display: flex;
  align-items: center;
}

.logo {
  width: 32px;
  height: 32px;
  margin-right: 12px;
}

.title {
  font-size: 18px;
  font-weight: bold;
  color: #303133;
}

.header-right {
  display: flex;
  align-items: center;
}

.common-main {
  flex: 1;
  background-color: #f0f2f5;
  padding: 24px;
}

.common-footer {
  background-color: #fff;
  text-align: center;
  color: #909399;
  font-size: 14px;
  height: 48px;
  line-height: 48px;
  padding: 0;
}
</style>
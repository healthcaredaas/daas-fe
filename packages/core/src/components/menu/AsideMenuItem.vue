<template>
  <template v-if="!item.hidden">
    <!-- Has children -->
    <el-sub-menu v-if="item.children && item.children.length > 0" :index="item.path">
      <template #title>
        <el-icon v-if="item.icon || item.meta?.icon">
          <component :is="item.icon || item.meta?.icon" />
        </el-icon>
        <span>{{ item.meta?.title || item.name }}</span>
      </template>
      <AsideMenuItem
        v-for="child in item.children"
        :key="child.id || child.path"
        :item="child"
        :collapsed="collapsed"
      />
    </el-sub-menu>

    <!-- No children -->
    <el-menu-item v-else :index="item.path">
      <el-icon v-if="item.icon || item.meta?.icon">
        <component :is="item.icon || item.meta?.icon" />
      </el-icon>
      <template #title>
        <span>{{ item.meta?.title || item.name }}</span>
      </template>
    </el-menu-item>
  </template>
</template>

<script setup lang="ts">
interface MenuItem {
  id?: string | number
  name: string
  path: string
  icon?: string
  children?: MenuItem[]
  hidden?: boolean
  meta?: {
    title?: string
    icon?: string
    hidden?: boolean
  }
}

interface Props {
  item: MenuItem
  collapsed?: boolean
}

defineProps<Props>()
</script>

<style scoped>
/* Menu item styles */
</style>
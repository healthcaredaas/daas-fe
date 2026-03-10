<template>
  <div class="vertical-menu">
    <template v-for="item in menuList" :key="item.id || item.path">
      <VerticalMenuItem :item="item" :level="0" />
    </template>
  </div>
</template>

<script setup lang="ts">
import VerticalMenuItem from './VerticalMenuItem.vue'

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
  menuList?: MenuItem[]
}

withDefaults(defineProps<Props>(), {
  menuList: () => []
})
</script>

<style scoped>
.vertical-menu {
  width: 100%;
}
</style>
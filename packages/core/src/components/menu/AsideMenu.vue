<template>
  <el-menu
    :default-active="activeMenu"
    :collapse="collapsed"
    :unique-opened="true"
    :collapse-transition="false"
    class="aside-menu"
    @select="handleSelect"
  >
    <template v-for="item in menuList" :key="item.id || item.path">
      <AsideMenuItem :item="item" :collapsed="collapsed" />
    </template>
  </el-menu>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AsideMenuItem from './AsideMenuItem.vue'

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
  collapsed?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  menuList: () => [],
  collapsed: false
})

const emit = defineEmits<{
  select: [index: string]
}>()

const route = useRoute()
const activeMenu = computed(() => route.path)

function handleSelect(index: string) {
  emit('select', index)
}
</script>

<style scoped>
.aside-menu {
  border-right: none;
  background-color: transparent;
  height: calc(100% - 60px);
}

.aside-menu:not(.el-menu--collapse) {
  width: 220px;
}
</style>
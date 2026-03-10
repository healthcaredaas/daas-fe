<template>
  <el-menu
    :default-active="activeMenu"
    mode="horizontal"
    class="nav-menu"
    @select="handleSelect"
  >
    <template v-for="item in menuList" :key="item.id || item.path">
      <NavMenuItem :item="item" />
    </template>
  </el-menu>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import NavMenuItem from './NavMenuItem.vue'

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

const props = withDefaults(defineProps<Props>(), {
  menuList: () => []
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
.nav-menu {
  border-bottom: none;
  background-color: transparent;
}

.nav-menu.el-menu--horizontal {
  height: 60px;
}
</style>
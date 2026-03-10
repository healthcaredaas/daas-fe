<template>
  <template v-if="!item.hidden">
    <div
      class="vertical-menu-item"
      :class="{ 'is-active': isActive, 'has-children': hasChildren }"
      :style="{ paddingLeft: level * 16 + 'px' }"
      @click="handleClick"
    >
      <el-icon v-if="item.icon || item.meta?.icon" class="menu-icon">
        <component :is="item.icon || item.meta?.icon" />
      </el-icon>
      <span class="menu-title">{{ item.meta?.title || item.name }}</span>
      <el-icon v-if="hasChildren" class="expand-icon" :class="{ 'is-expanded': expanded }">
        <ArrowRight />
      </el-icon>
    </div>
    <div v-if="hasChildren" class="vertical-menu-children" v-show="expanded">
      <VerticalMenuItem
        v-for="child in item.children"
        :key="child.id || child.path"
        :item="child"
        :level="level + 1"
      />
    </div>
  </template>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowRight } from '@element-plus/icons-vue'

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
  level?: number
}

const props = withDefaults(defineProps<Props>(), {
  level: 0
})

const route = useRoute()
const router = useRouter()
const expanded = ref(false)

const hasChildren = computed(() => props.item.children && props.item.children.length > 0)
const isActive = computed(() => route.path === props.item.path)

// Auto expand if child is active
watch(
  () => route.path,
  (path) => {
    if (hasChildren.value && isChildActive(props.item, path)) {
      expanded.value = true
    }
  },
  { immediate: true }
)

function isChildActive(item: MenuItem, path: string): boolean {
  if (item.path === path) return true
  if (item.children) {
    return item.children.some(child => isChildActive(child, path))
  }
  return false
}

function handleClick() {
  if (hasChildren.value) {
    expanded.value = !expanded.value
  } else {
    router.push(props.item.path)
  }
}
</script>

<style scoped>
.vertical-menu-item {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  cursor: pointer;
  transition: all 0.3s;
  color: #bfcbd9;
}

.vertical-menu-item:hover {
  background-color: rgba(0, 0, 0, 0.2);
}

.vertical-menu-item.is-active {
  color: #409eff;
  background-color: rgba(64, 158, 255, 0.1);
}

.menu-icon {
  margin-right: 8px;
  font-size: 16px;
}

.menu-title {
  flex: 1;
  font-size: 14px;
}

.expand-icon {
  transition: transform 0.3s;
}

.expand-icon.is-expanded {
  transform: rotate(90deg);
}

.vertical-menu-children {
  background-color: rgba(0, 0, 0, 0.1);
}
</style>
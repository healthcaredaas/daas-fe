<template>
  <div class="ri-icon">
    <i :class="iconClass" :style="{ fontSize: size + 'px', color: color }"></i>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  name: string
  size?: number | string
  color?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 16,
  color: 'currentColor'
})

const iconClass = computed(() => `ri-${props.name}`)
</script>

<style scoped>
.ri-icon {
  display: inline-block;
  vertical-align: middle;
}
</style>
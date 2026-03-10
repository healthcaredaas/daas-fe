<template>
  <div class="svg-icon" :style="{ width: size + 'px', height: size + 'px' }">
    <svg
      aria-hidden="true"
      :class="['svg-icon-content', spin && 'is-spin']"
      :style="{ fill: color, width: size + 'px', height: size + 'px' }"
    >
      <use :xlink:href="symbolId" />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  name: string
  prefix?: string
  color?: string
  size?: number | string
  spin?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  prefix: 'icon',
  color: 'currentColor',
  size: 16,
  spin: false
})

const symbolId = computed(() => `#${props.prefix}-${props.name}`)
</script>

<style scoped>
.svg-icon {
  display: inline-block;
  vertical-align: middle;
}

.svg-icon-content {
  display: block;
  overflow: hidden;
}

.svg-icon-content.is-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
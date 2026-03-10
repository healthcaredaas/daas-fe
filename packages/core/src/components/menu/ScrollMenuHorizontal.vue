<template>
  <div class="scroll-menu-horizontal" ref="scrollContainer">
    <div class="scroll-wrapper" ref="scrollWrapper">
      <div class="scroll-content" :style="{ transform: `translateX(${offset}px)` }">
        <slot></slot>
      </div>
    </div>
    <div class="scroll-btn left" v-show="showLeftBtn" @click="scrollLeft">
      <el-icon><ArrowLeft /></el-icon>
    </div>
    <div class="scroll-btn right" v-show="showRightBtn" @click="scrollRight">
      <el-icon><ArrowRight /></el-icon>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue'

const scrollContainer = ref<HTMLElement>()
const scrollWrapper = ref<HTMLElement>()
const offset = ref(0)
const showLeftBtn = ref(false)
const showRightBtn = ref(false)

const scrollStep = 200

function updateButtons() {
  if (!scrollWrapper.value) return
  const { scrollWidth, clientWidth } = scrollWrapper.value
  showLeftBtn.value = offset.value < 0
  showRightBtn.value = scrollWidth > clientWidth && Math.abs(offset.value) < scrollWidth - clientWidth
}

function scrollLeft() {
  offset.value = Math.min(offset.value + scrollStep, 0)
  updateButtons()
}

function scrollRight() {
  if (!scrollWrapper.value) return
  const { scrollWidth, clientWidth } = scrollWrapper.value
  const maxOffset = clientWidth - scrollWidth
  offset.value = Math.max(offset.value - scrollStep, maxOffset)
  updateButtons()
}

onMounted(() => {
  nextTick(() => {
    updateButtons()
  })
  window.addEventListener('resize', updateButtons)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateButtons)
})
</script>

<style scoped>
.scroll-menu-horizontal {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.scroll-wrapper {
  overflow: hidden;
  width: 100%;
}

.scroll-content {
  display: flex;
  white-space: nowrap;
  transition: transform 0.3s;
}

.scroll-btn {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0));
  cursor: pointer;
  z-index: 10;
}

.scroll-btn.left {
  left: 0;
}

.scroll-btn.right {
  right: 0;
  background: linear-gradient(-90deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0));
}

.scroll-btn:hover {
  color: #409eff;
}
</style>
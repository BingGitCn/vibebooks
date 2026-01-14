<template>
  <div class="relative min-h-screen">
    <!-- 纹理层 -->
    <div class="texture-overlay"></div>

    <!-- 鼠标光晕效果 -->
    <div
      ref="cursorGlow"
      class="cursor-glow hidden md:block"
      :style="{ left: mouseX + 'px', top: mouseY + 'px' }"
    ></div>

    <!-- 粒子容器 -->
    <div ref="particleContainer" class="particle-container"></div>

    <!-- 主内容区 -->
    <div class="relative z-10">
      <router-view v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useMouse } from '@vueuse/core'

const { x: mouseX, y: mouseY } = useMouse()
const cursorGlow = ref(null)
const particleContainer = ref(null)

onMounted(() => {
  // 初始化任何全局效果
})

onUnmounted(() => {
  // 清理
})
</script>

<script setup>
import { ref, onMounted } from 'vue'
import { useMouse } from '@vueuse/core'
import gsap from 'gsap'

const props = defineProps({
  book: {
    type: Object,
    required: true
  }
})

const cardRef = ref(null)
const isHovered = ref(false)

const { x: mouseX, y: mouseY } = useMouse()

const handleMouseMove = (e) => {
  if (!cardRef.value) return

  const rect = cardRef.value.getBoundingClientRect()
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2

  const rotateX = (mouseY.value - centerY) / 30
  const rotateY = (centerX - mouseX.value) / 30

  gsap.to(cardRef.value, {
    rotateX: rotateX,
    rotateY: rotateY,
    duration: 0.5,
    ease: 'power2.out'
  })
}

const handleMouseLeave = () => {
  gsap.to(cardRef.value, {
    rotateX: 0,
    rotateY: 0,
    duration: 0.5,
    ease: 'power2.out'
  })
  isHovered.value = false
}

const handleMouseEnter = () => {
  isHovered.value = true
  // 设置当前书的情绪色
  document.documentElement.style.setProperty('--color-mood', props.book.moodColor)
}

const handleClick = () => {
  if (props.book.immersivePage) {
    window.open(props.book.immersivePage, '_blank')
  }
}
</script>

<template>
  <div
    ref="cardRef"
    class="book-wrapper relative"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
    @mouseenter="handleMouseEnter"
    @click="handleClick"
  >
    <div
      class="book-card relative w-64 h-96 cursor-pointer transition-all duration-500"
      :class="{ 'scale-110': isHovered }"
      :style="{ '--color-mood': book.moodColor }"
    >
      <!-- 书籍封面 -->
      <div class="absolute inset-0 bg-gradient-to-br from-gray-900 to-black border-2 mood-border rounded-lg overflow-hidden">
        <!-- 书名 -->
        <div class="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
          <h3 class="font-serif text-3xl font-bold mb-2 mood-text">{{ book.title }}</h3>
          <p class="text-gray-400 text-sm mb-6">{{ book.author }}</p>
          <p class="text-gray-300 text-lg italic leading-relaxed">"{{ book.quote }}"</p>
        </div>

        <!-- 情绪光晕 -->
        <div
          class="absolute inset-0 mood-glow opacity-0 transition-opacity duration-500"
          :class="{ 'opacity-20': isHovered }"
        ></div>
      </div>

      <!-- 描述标签 -->
      <div
        class="absolute -bottom-16 left-1/2 -translate-x-1/2 w-80 text-center opacity-0 transition-all duration-500"
        :class="{ 'opacity-100 translate-y-2': isHovered }"
      >
        <p class="text-gray-400 text-sm">{{ book.description }}</p>
        <p v-if="book.immersivePage" class="mood-text text-xs mt-2">点击进入沉浸式体验 →</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.book-wrapper {
  perspective: 1000px;
}

.book-card {
  transform-style: preserve-3d;
  will-change: transform;
}
</style>

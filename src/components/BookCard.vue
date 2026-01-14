<template>
  <div
    class="book-card-wrapper"
    :style="cardStyle"
    @mouseenter="onHover"
    @mouseleave="onLeave"
  >
    <div class="book-card">
      <!-- 装饰元素 -->
      <div :class="`decoration decoration-${book.visualStyle.decoration}`" :style="decorationStyle">
        <component :is="decorationComponent" />
      </div>

      <!-- 书籍内容 -->
      <div class="book-content">
        <!-- 情绪标签 -->
        <div class="mood-tag font-mono text-xs" :style="{ color: book.color }">
          {{ book.moodLabel }}
        </div>

        <!-- 标题 -->
        <h3 class="book-title font-display text-3xl md:text-4xl font-bold mb-3">
          {{ book.title }}
        </h3>

        <!-- 作者和年份 -->
        <div class="book-meta font-body text-sm text-gray-500 mb-4">
          <span>{{ book.author }}</span>
          <span class="mx-2">·</span>
          <span>{{ book.year }}</span>
        </div>

        <!-- 描述 -->
        <p class="book-description font-body text-base text-gray-700 leading-relaxed mb-6">
          {{ book.description }}
        </p>

        <!-- 标签 -->
        <div class="book-tags flex flex-wrap gap-2 mb-6">
          <span
            v-for="tag in book.tags"
            :key="tag"
            class="tag font-mono text-xs px-3 py-1 border border-gray-200"
          >
            {{ tag }}
          </span>
        </div>

        <!-- 探索按钮 -->
        <button
          class="explore-button font-mono text-sm tracking-wider flex items-center gap-2 group"
          :style="{ color: book.color }"
        >
          <span>探索氛围</span>
          <span class="transform group-hover:translate-x-1 transition-transform">→</span>
        </button>
      </div>

      <!-- 情绪色线条 -->
      <div class="mood-line" :style="{ background: book.color }"></div>

      <!-- 角标装饰 -->
      <div class="corner-decoration top-left" :style="{ borderColor: book.color }"></div>
      <div class="corner-decoration bottom-right" :style="{ borderColor: book.color }"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, h } from 'vue'
import gsap from 'gsap'

const props = defineProps({
  book: {
    type: Object,
    required: true
  }
})

const isHovered = ref(false)

const cardStyle = computed(() => ({
  '--book-scale': `var(--book-scale, 1)`,
  '--book-rotation': `var(--book-rotation, 0deg)`,
}))

const decorationStyle = computed(() => ({
  color: props.book.color,
}))

// 装饰组件映射
const decorationComponents = {
  stars: () => h('div', { class: 'stars-decoration' },
    Array.from({ length: 5 }, (_, i) =>
      h('span', {
        class: 'star',
        style: {
          left: `${20 + i * 15}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${i * 0.3}s`,
        }
      }, '✦')
    )
  ),

  lines: () => h('div', { class: 'lines-decoration' },
    Array.from({ length: 3 }, (_, i) =>
      h('div', {
        class: 'line',
        style: { width: `${30 + i * 20}%`, left: `${i * 25}%` }
      })
    )
  ),

  frame: () => h('div', { class: 'frame-decoration' }),

  sparkles: () => h('div', { class: 'sparkles-decoration' },
    Array.from({ length: 6 }, (_, i) =>
      h('span', {
        class: 'sparkle',
        style: {
          left: `${10 + i * 18}%`,
          top: `${20 + (i % 3) * 30}%`,
          animationDelay: `${i * 0.2}s`,
        }
      }, '◆')
    )
  ),

  circuit: () => h('div', { class: 'circuit-decoration' },
    Array.from({ length: 4 }, (_, i) =>
      h('div', {
        class: 'circuit-line',
        style: {
          left: `${i * 25}%`,
          animationDelay: `${i * 0.4}s`,
        }
      })
    )
  ),

  petals: () => h('div', { class: 'petals-decoration' },
    Array.from({ length: 5 }, (_, i) =>
      h('span', {
        class: 'petal',
        style: {
          left: `${15 + i * 20}%`,
          top: `${10 + (i % 2) * 40}%`,
          animationDelay: `${i * 0.5}s`,
        }
      }, '❀')
    )
  ),

  dots: () => h('div', { class: 'dots-decoration' },
    Array.from({ length: 8 }, (_, i) =>
      h('span', {
        class: 'dot',
        style: {
          left: `${10 + (i % 4) * 25}%`,
          top: `${Math.floor(i / 4) * 60 + 20}%`,
        }
      })
    )
  ),

  spirals: () => h('div', { class: 'spirals-decoration' },
    Array.from({ length: 2 }, (_, i) =>
      h('div', {
        class: 'spiral',
        style: {
          left: `${i * 60 + 20}%`,
          top: `${30 - i * 10}%`,
          animationDelay: `${i * 0.8}s`,
        }
      })
    )
  ),

  leaves: () => h('div', { class: 'leaves-decoration' },
    Array.from({ length: 4 }, (_, i) =>
      h('span', {
        class: 'leaf',
        style: {
          left: `${10 + i * 25}%`,
          top: `${i % 2 === 0 ? 15 : 60}%`,
          animationDelay: `${i * 0.6}s`,
          transform: `rotate(${i % 2 === 0 ? 45 : -45}deg)`,
        }
      }, '🍃')
    )
  ),
}

const decorationComponent = computed(() => {
  return decorationComponents[props.book.visualStyle.decoration] || decorationComponents.dots
})

const onHover = () => {
  isHovered.value = true
}

const onLeave = () => {
  isHovered.value = false
}
</script>

<style scoped>
.book-card-wrapper {
  position: relative;
  transform: scale(var(--book-scale, 1)) rotate(var(--book-rotation, 0deg));
  transition: transform 0.5s cubic-bezier(0.23, 1, 0.32, 1);
}

.book-card-wrapper:hover {
  transform: scale(calc(var(--book-scale, 1) * 1.05)) rotate(0deg);
  z-index: 10;
}

.book-card {
  position: relative;
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.08);
  padding: 3rem 2.5rem;
  min-height: 450px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
}

.book-card-wrapper:hover .book-card {
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.12);
  border-color: rgba(0, 0, 0, 0.15);
}

/* 装饰层 */
.decoration {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.15;
  overflow: hidden;
}

/* 星星装饰 */
.stars-decoration .star {
  position: absolute;
  font-size: 1.5rem;
  animation: twinkle 2s ease-in-out infinite;
}

@keyframes twinkle {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.2); }
}

/* 线条装饰 */
.lines-decoration .line {
  position: absolute;
  height: 1px;
  background: currentColor;
  top: 15%;
}

/* 边框装饰 */
.frame-decoration {
  border: 2px solid currentColor;
  margin: 1rem;
  border-radius: 4px;
}

/* 闪光装饰 */
.sparkles-decoration .sparkle {
  position: absolute;
  font-size: 1rem;
  animation: sparkle 1.5s ease-in-out infinite;
}

@keyframes sparkle {
  0%, 100% { opacity: 0.2; }
  50% { opacity: 1; }
}

/* 电路装饰 */
.circuit-decoration .circuit-line {
  position: absolute;
  width: 2px;
  height: 40px;
  background: currentColor;
  top: 10%;
  animation: circuit 3s ease-in-out infinite;
}

.circuit-decoration .circuit-line::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 8px;
  height: 8px;
  border: 1px solid currentColor;
  border-radius: 50%;
}

@keyframes circuit {
  0%, 100% { height: 40px; }
  50% { height: 60px; }
}

/* 花瓣装饰 */
.petals-decoration .petal {
  position: absolute;
  font-size: 1.5rem;
  animation: petal-float 4s ease-in-out infinite;
}

@keyframes petal-float {
  0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.3; }
  50% { transform: translateY(-15px) rotate(10deg); opacity: 0.8; }
}

/* 点装饰 */
.dots-decoration .dot {
  position: absolute;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: currentColor;
}

/* 螺旋装饰 */
.spirals-decoration .spiral {
  position: absolute;
  width: 40px;
  height: 40px;
  border: 2px solid currentColor;
  border-radius: 50%;
  animation: spiral-rotate 8s linear infinite;
}

@keyframes spiral-rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* 叶子装饰 */
.leaves-decoration .leaf {
  position: absolute;
  font-size: 1.8rem;
  animation: leaf-sway 3s ease-in-out infinite;
}

@keyframes leaf-sway {
  0%, 100% { transform: rotate(var(--leaf-rotation, 45deg)) translateY(0); }
  50% { transform: rotate(var(--leaf-rotation, 45deg)) translateY(-10px); }
}

/* 书籍内容 */
.book-content {
  position: relative;
  z-index: 2;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.mood-tag {
  margin-bottom: 1rem;
  opacity: 0.8;
  letter-spacing: 0.1em;
}

.book-title {
  line-height: 1.2;
  margin-bottom: 1rem;
}

.book-description {
  flex: 1;
  opacity: 0.8;
}

/* 标签 */
.tag {
  transition: all 0.3s ease;
  cursor: default;
}

.tag:hover {
  background: rgba(0, 0, 0, 0.05);
}

/* 探索按钮 */
.explore-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  text-align: left;
  transition: all 0.3s ease;
  margin-top: auto;
}

.explore-button:hover {
  transform: translateX(5px);
}

/* 情绪色线条 */
.mood-line {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  width: 100%;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.5s cubic-bezier(0.23, 1, 0.32, 1);
}

.book-card-wrapper:hover .mood-line {
  transform: scaleX(1);
}

/* 角标装饰 */
.corner-decoration {
  position: absolute;
  width: 20px;
  height: 20px;
  border-color: var(--book-color, #000);
  border-style: solid;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.book-card-wrapper:hover .corner-decoration {
  opacity: 1;
}

.top-left {
  top: 1rem;
  left: 1rem;
  border-width: 2px 0 0 2px;
}

.bottom-right {
  bottom: 1rem;
  right: 1rem;
  border-width: 0 2px 2px 0;
}

/* 响应式 */
@media (max-width: 768px) {
  .book-card {
    min-height: 400px;
    padding: 2rem 1.5rem;
  }

  .book-title {
    font-size: 1.75rem;
  }
}
</style>

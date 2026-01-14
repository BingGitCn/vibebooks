<template>
  <div class="book-card-wrapper">
    <div
      class="book-card"
      :style="cardStyle"
      @mouseenter="onHover"
      @mouseleave="onLeave"
    >
      <!-- 装饰元素层 -->
      <div class="decoration-layer" :style="{ color: book.color }">
        <component :is="decorationComponent" />
      </div>

      <!-- 书籍内容 -->
      <div class="book-content">
        <!-- 情绪标签 -->
        <div class="mood-tag font-mono text-xs tracking-widest" :style="{ color: book.color }">
          {{ book.moodLabel }}
        </div>

        <!-- 标题 -->
        <h3 class="book-title font-display text-3xl font-bold mb-3">
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
            class="tag font-mono text-xs px-3 py-1"
            :style="{ borderColor: `${book.color}20` }"
          >
            {{ tag }}
          </span>
        </div>

        <!-- 探索按钮 -->
        <button
          class="explore-button font-mono text-sm tracking-wider flex items-center gap-2"
          :style="{ color: book.color }"
          @click="handleExplore"
        >
          <span>探索</span>
          <span class="arrow">→</span>
        </button>
      </div>

      <!-- 情绪色线条 -->
      <div class="mood-line" :style="{ background: book.color }"></div>

      <!-- 边框高亮 -->
      <div class="border-glow" :style="{ borderColor: book.color }"></div>
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
  width: '100%',
  background: props.book.layout.background,
}))

// 装饰组件映射
const decorationComponents = {
  // 小王子 - 星星
  stars: () => h('div', { class: 'stars-decoration' },
    Array.from({ length: 8 }, (_, i) =>
      h('span', {
        class: 'star',
        style: {
          left: `${10 + Math.random() * 80}%`,
          top: `${10 + Math.random() * 80}%`,
          animationDelay: `${i * 0.4}s`,
          fontSize: `${0.8 + Math.random() * 0.8}rem`,
        }
      }, '✦')
    )
  ),

  // 我与地坛 - 古柏年轮
  'ancient-cypress': () => h('div', { class: 'cypress-decoration' },
    // 年轮圈
    h('div', { class: 'tree-rings' },
      Array.from({ length: 4 }, (_, i) =>
        h('div', {
          class: 'ring',
          style: {
            width: `${100 + i * 60}px`,
            height: `${100 + i * 60}px`,
            animationDelay: `${i * 0.5}s`,
          }
        })
      )
    ),
    // 柏树叶
    ...Array.from({ length: 6 }, (_, i) =>
      h('span', {
        class: 'cypress-leaf',
        style: {
          left: `${10 + Math.random() * 80}%`,
          top: `${10 + Math.random() * 80}%`,
          animationDelay: `${i * 0.6}s`,
          animationDuration: `${4 + Math.random() * 3}s`,
        }
      }, '🌿')
    )
  ),

  // 1984 - 监控眼
  surveillance: () => h('div', { class: 'surveillance-decoration' },
    h('div', { class: 'eye' },
      h('div', { class: 'pupil' })
    )
  ),

  // 追忆似水年华 - 华丽边框
  'ornate-frame': () => h('div', { class: 'ornate-frame-decoration' },
    h('div', { class: 'corner corner-tl' }),
    h('div', { class: 'corner corner-tr' }),
    h('div', { class: 'corner corner-bl' }),
    h('div', { class: 'corner corner-br' })
  ),

  // 盖茨比 - 香槟气泡
  champagne: () => h('div', { class: 'champagne-decoration' },
    Array.from({ length: 12 }, (_, i) =>
      h('span', {
        class: 'bubble',
        style: {
          left: `${5 + (i % 6) * 18}%`,
          animationDelay: `${i * 0.3}s`,
          animationDuration: `${3 + Math.random() * 2}s`,
        }
      })
    )
  ),

  // 三体 - 科技网格
  'tech-grid': () => h('div', { class: 'tech-grid-decoration' },
    Array.from({ length: 6 }, (_, i) =>
      h('div', {
        class: 'grid-line',
        style: {
          left: `${i * 20}%`,
          animationDelay: `${i * 0.2}s`,
        }
      })
    )
  ),

  // 红楼梦 - 飘落花瓣
  'falling-petals': () => h('div', { class: 'petals-decoration' },
    Array.from({ length: 6 }, (_, i) =>
      h('span', {
        class: 'petal',
        style: {
          left: `${10 + i * 16}%`,
          animationDelay: `${i * 0.7}s`,
          animationDuration: `${4 + Math.random() * 2}s`,
        }
      }, '❀')
    )
  ),

  // 局外人 - 简约点
  'minimal-dots': () => h('div', { class: 'dots-decoration' },
    Array.from({ length: 6 }, (_, i) =>
      h('span', {
        class: 'dot',
        style: {
          left: `${10 + (i % 3) * 40}%`,
          top: `${Math.floor(i / 3) * 40 + 15}%`,
        }
      })
    )
  ),

  // 百年孤独 - 螺旋
  spirals: () => h('div', { class: 'spirals-decoration' },
    h('div', { class: 'spiral spiral-1' }),
    h('div', { class: 'spiral spiral-2' })
  ),

  // 1Q84 - 双月
  moons: () => h('div', { class: 'moons-decoration' },
    h('div', { class: 'moon moon-large' }),
    h('div', { class: 'moon moon-small' })
  ),

  // 白夜行 - 夜空繁星
  'night-stars': () => h('div', { class: 'night-stars-decoration' },
    ...Array.from({ length: 20 }, (_, i) =>
      h('span', {
        class: 'night-star',
        style: {
          left: `${5 + Math.random() * 90}%`,
          top: `${5 + Math.random() * 90}%`,
          animationDelay: `${i * 0.2}s`,
          animationDuration: `${2 + Math.random() * 3}s`,
        }
      }, '✦')
    )
  ),

  // 月亮与六便士 - 月光
  moonlight: () => h('div', { class: 'moonlight-decoration' },
    h('div', { class: 'moon-glow' }),
    ...Array.from({ length: 5 }, (_, i) =>
      h('div', {
        class: 'moon-ray',
        style: {
          left: `${30 + i * 10}%`,
          animationDelay: `${i * 0.3}s`,
        }
      })
    )
  ),

  // 岛上书店 - 书籍堆叠
  books: () => h('div', { class: 'books-decoration' },
    h('div', { class: 'book-stack book-1' }),
    h('div', { class: 'book-stack book-2' }),
    h('div', { class: 'book-stack book-3' })
  ),

  // 困于沙丘 - 沙丘波纹
  dune: () => h('div', { class: 'dune-decoration' },
    ...Array.from({ length: 5 }, (_, i) =>
      h('div', {
        class: 'sand-dune',
        style: {
          bottom: `${i * 20}%`,
          animationDelay: `${i * 0.4}s`,
        }
      })
    )
  ),

  // 莫斯科绅士 - 华丽边框
  'ornate-border': () => h('div', { class: 'ornate-border-decoration' },
    h('div', { class: 'border-corner tl' }),
    h('div', { class: 'border-corner tr' }),
    h('div', { class: 'border-corner bl' }),
    h('div', { class: 'border-corner br' })
  ),

  // 夜晚的潜水艇 - 潜艇
  submarine: () => h('div', { class: 'submarine-decoration' },
    h('div', { class: 'submarine-body' }),
    h('div', { class: 'periscope' }),
    ...Array.from({ length: 8 }, (_, i) =>
      h('span', {
        class: 'bubble',
        style: {
          left: `${20 + i * 10}%`,
          animationDelay: `${i * 0.4}s`,
        }
      }, '○')
    )
  ),

  // 刺杀骑士团长 - 隐喻壶
  metaphor: () => h('div', { class: 'metaphor-decoration' },
    h('div', { class: 'idea-vase' },
      h('div', { class: 'idea-stream stream-1' }),
      h('div', { class: 'idea-stream stream-2' }),
      h('div', { class: 'idea-stream stream-3' })
    )
  ),

  // 失落的卫星 - 卫星轨道
  satellite: () => h('div', { class: 'satellite-decoration' },
    h('div', { class: 'orbit orbit-1' },
      h('div', { class: 'sat' })
    ),
    h('div', { class: 'orbit orbit-2' })
  ),

  // 额尔古纳河右岸 - 河流
  river: () => h('div', { class: 'river-decoration' },
    h('div', { class: 'river-flow' }),
    ...Array.from({ length: 3 }, (_, i) =>
      h('div', {
        class: 'river-wave',
        style: {
          animationDelay: `${i * 0.5}s`,
        }
      })
    )
  ),

  // 山月记 - 老虎与月亮
  'tiger-moon': () => h('div', { class: 'tiger-moon-decoration' },
    h('div', { class: 'tm-moon' },
      h('div', { class: 'tm-tiger-silhouette' })
    )
  ),

  // 我的阿勒泰 - 草原
  grassland: () => h('div', { class: 'grassland-decoration' },
    ...Array.from({ length: 12 }, (_, i) =>
      h('span', {
        class: 'grass-blade',
        style: {
          left: `${5 + i * 8}%`,
          bottom: `${5 + (i % 3) * 3}%`,
          height: `${20 + Math.random() * 30}px`,
          animationDelay: `${i * 0.15}s`,
        }
      })
    )
  ),

  // 人生海海 - 海浪
  waves: () => h('div', { class: 'waves-decoration' },
    h('div', { class: 'wave wave-1' }),
    h('div', { class: 'wave wave-2' }),
    h('div', { class: 'wave wave-3' })
  ),

  // 马可瓦尔多 - 四季
  seasons: () => h('div', { class: 'seasons-decoration' },
    h('span', { class: 'season-icon spring' }, '🌸'),
    h('span', { class: 'season-icon summer' }, '☀️'),
    h('span', { class: 'season-icon autumn' }, '🍂'),
    h('span', { class: 'season-icon winter' }, '❄️')
  ),

  // 基督山伯爵 - 十字架
  cross: () => h('div', { class: 'cross-decoration' },
    h('div', { class: 'cross-vertical' }),
    h('div', { class: 'cross-horizontal' })
  ),

  // 无人生还 - 士兵
  soldiers: () => h('div', { class: 'soldiers-decoration' },
    ...Array.from({ length: 10 }, (_, i) =>
      h('span', {
        class: 'soldier',
        style: {
          left: `${5 + (i % 5) * 20}%`,
          top: `${10 + Math.floor(i / 5) * 40}%`,
          opacity: i < 5 ? 1 - i * 0.15 : 0.3 + (i - 5) * 0.15,
        }
      }, '●')
    )
  ),

  // 嫌疑人X的献身 - 爱心拼图
  'heart-puzzle': () => h('div', { class: 'heart-puzzle-decoration' },
    h('div', { class: 'puzzle-piece piece-1' }),
    h('div', { class: 'puzzle-piece piece-2' }),
    h('div', { class: 'puzzle-piece piece-3' })
  ),

  // 桃花源记 - 花瓣
  blossoms: () => h('div', { class: 'blossoms-decoration' },
    ...Array.from({ length: 8 }, (_, i) =>
      h('span', {
        class: 'blossom',
        style: {
          left: `${10 + i * 11}%`,
          animationDelay: `${i * 0.5}s`,
          animationDuration: `${4 + Math.random() * 2}s`,
        }
      }, '🌸')
    )
  ),

  // 保留原有的落叶装饰
  'falling-leaves': () => h('div', { class: 'leaves-decoration' },
    Array.from({ length: 5 }, (_, i) =>
      h('span', {
        class: 'leaf',
        style: {
          left: `${10 + i * 22}%`,
          animationDelay: `${i * 0.8}s`,
          animationDuration: `${5 + Math.random() * 2}s`,
        }
      }, '🍂')
    )
  ),
}

const decorationComponent = computed(() => {
  return decorationComponents[props.book.decoration] || decorationComponents['minimal-dots']
})

const onHover = () => {
  isHovered.value = true
}

const onLeave = () => {
  isHovered.value = false
}

const handleExplore = () => {
  // 如果是小王子，在新标签页打开沉浸式体验
  if (props.book.title === '小王子') {
    window.open('/little-prince', '_blank')
  }
  // 其他书籍暂时不处理
}
</script>

<style scoped>
.book-card-wrapper {
  transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1);
}

.book-card {
  position: relative;
  border: 1px solid rgba(0, 0, 0, 0.06);
  padding: 2.5rem 2rem;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.04);
  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  min-height: 420px;
}

.book-card-wrapper:hover .book-card {
  box-shadow: 0 25px 80px rgba(0, 0, 0, 0.12);
  border-color: rgba(0, 0, 0, 0.12);
  transform: translateY(-8px) scale(1.02);
}

/* 装饰层 */
.decoration-layer {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.12;
  overflow: hidden;
}

/* 星星装饰 */
.stars-decoration .star {
  position: absolute;
  animation: twinkle 3s ease-in-out infinite;
}

@keyframes twinkle {
  0%, 100% { opacity: 0.2; transform: scale(0.8); }
  50% { opacity: 1; transform: scale(1.2); }
}

/* 古柏年轮 */
.cypress-decoration {
  position: relative;
  width: 100%;
  height: 100%;
}

.cypress-decoration .tree-rings {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.cypress-decoration .ring {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1.5px solid currentColor;
  border-radius: 50%;
  opacity: 0;
  animation: ring-expand 6s ease-out infinite;
}

.cypress-decoration .ring:nth-child(1) { animation-delay: 0s; }
.cypress-decoration .ring:nth-child(2) { animation-delay: 1.5s; }
.cypress-decoration .ring:nth-child(3) { animation-delay: 3s; }
.cypress-decoration .ring:nth-child(4) { animation-delay: 4.5s; }

@keyframes ring-expand {
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.8);
  }
  20% {
    opacity: 0.3;
  }
  80% {
    opacity: 0.3;
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(1.2);
  }
}

.cypress-decoration .cypress-leaf {
  position: absolute;
  font-size: 1rem;
  opacity: 0;
  animation: leaf-sway ease-in-out infinite;
}

@keyframes leaf-sway {
  0%, 100% {
    opacity: 0;
    transform: translateY(0) rotate(0deg);
  }
  20% {
    opacity: 0.5;
  }
  50% {
    opacity: 0.5;
    transform: translateY(-20px) rotate(10deg);
  }
  80% {
    opacity: 0.5;
  }
  100% {
    opacity: 0;
    transform: translateY(-40px) rotate(0deg);
  }
}

/* 监控眼 */
.surveillance-decoration .eye {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  border: 2px solid currentColor;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: watch 4s ease-in-out infinite;
}

.surveillance-decoration .pupil {
  width: 12px;
  height: 12px;
  background: currentColor;
  border-radius: 50%;
  animation: look 8s ease-in-out infinite;
}

@keyframes watch {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

@keyframes look {
  0%, 100% { transform: translate(0, 0); }
  25% { transform: translate(3px, 0); }
  50% { transform: translate(0, 0); }
  75% { transform: translate(-3px, 0); }
}

/* 华丽边框 */
.ornate-frame-decoration .corner {
  position: absolute;
  width: 30px;
  height: 30px;
  border-style: solid;
  border-width: 0;
}

.ornate-frame-decoration .corner-tl {
  top: 15px;
  left: 15px;
  border-top-width: 2px;
  border-left-width: 2px;
}

.ornate-frame-decoration .corner-tr {
  top: 15px;
  right: 15px;
  border-top-width: 2px;
  border-right-width: 2px;
}

.ornate-frame-decoration .corner-bl {
  bottom: 15px;
  left: 15px;
  border-bottom-width: 2px;
  border-left-width: 2px;
}

.ornate-frame-decoration .corner-br {
  bottom: 15px;
  right: 15px;
  border-bottom-width: 2px;
  border-right-width: 2px;
}

/* 香槟气泡 */
.champagne-decoration .bubble {
  position: absolute;
  bottom: -10px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
  animation: bubble-rise linear infinite;
  opacity: 0;
}

@keyframes bubble-rise {
  0% {
    transform: translateY(0) scale(0);
    opacity: 0;
  }
  10% {
    opacity: 0.6;
  }
  90% {
    opacity: 0.6;
  }
  100% {
    transform: translateY(-450px) scale(1);
    opacity: 0;
  }
}

/* 科技网格 */
.tech-grid-decoration .grid-line {
  position: absolute;
  top: 0;
  width: 1px;
  height: 100%;
  background: linear-gradient(to bottom, transparent, currentColor 20%, currentColor 80%, transparent);
  animation: grid-pulse 3s ease-in-out infinite;
}

@keyframes grid-pulse {
  0%, 100% { opacity: 0.1; }
  50% { opacity: 0.4; }
}

/* 花瓣 */
.petals-decoration .petal {
  position: absolute;
  font-size: 1.2rem;
  animation: petal-fall linear infinite;
  opacity: 0;
}

@keyframes petal-fall {
  0% {
    transform: translateY(-20px) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 0.8;
  }
  90% {
    opacity: 0.8;
  }
  100% {
    transform: translateY(450px) rotate(360deg);
    opacity: 0;
  }
}

/* 简约点 */
.dots-decoration .dot {
  position: absolute;
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: currentColor;
}

/* 螺旋 */
.spirals-decoration .spiral {
  position: absolute;
  width: 50px;
  height: 50px;
  border: 2px solid currentColor;
  border-radius: 50%;
  opacity: 0.3;
}

.spiral-1 {
  top: 20px;
  left: 20px;
  animation: spiral-rotate 12s linear infinite;
}

.spiral-2 {
  bottom: 20px;
  right: 20px;
  animation: spiral-rotate 15s linear infinite reverse;
}

@keyframes spiral-rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* 落叶 */
.leaves-decoration .leaf {
  position: absolute;
  font-size: 1.5rem;
  animation: leaf-fall linear infinite;
  opacity: 0;
}

@keyframes leaf-fall {
  0% {
    transform: translateY(-20px) rotate(0deg) translateX(0);
    opacity: 0;
  }
  10% {
    opacity: 0.7;
  }
  90% {
    opacity: 0.7;
  }
  100% {
    transform: translateY(450px) rotate(180deg) translateX(30px);
    opacity: 0;
  }
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
  opacity: 0.7;
}

.book-title {
  line-height: 1.2;
  margin-bottom: 1rem;
  font-family: 'Playfair Display', serif;
}

.book-description {
  flex: 1;
  opacity: 0.8;
  line-height: 1.7;
}

/* 标签 */
.tag {
  border-width: 1px;
  border-style: solid;
  transition: all 0.3s ease;
}

.tag:hover {
  background: rgba(0, 0, 0, 0.03);
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

.explore-button:hover .arrow {
  transform: translateX(5px);
}

.arrow {
  transition: transform 0.3s ease;
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
  transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1);
}

.book-card-wrapper:hover .mood-line {
  transform: scaleX(1);
}

/* 边框高光 */
.border-glow {
  position: absolute;
  inset: 0;
  border: 1px solid transparent;
  opacity: 0;
  transition: opacity 0.5s ease;
  pointer-events: none;
}

.book-card-wrapper:hover .border-glow {
  opacity: 0.3;
}

/* 响应式 */
@media (max-width: 768px) {
  .book-card {
    min-height: 380px;
    padding: 2rem 1.5rem;
  }

  .book-title {
    font-size: 1.75rem;
  }
}

/* ==================== 新装饰样式 ==================== */

/* 1Q84 - 双月 */
.moons-decoration .moon {
  position: absolute;
  border-radius: 50%;
  border: 2px solid currentColor;
}

.moons-decoration .moon-large {
  width: 60px;
  height: 60px;
  top: 20px;
  right: 30px;
  animation: moon-glow 4s ease-in-out infinite;
}

.moons-decoration .moon-small {
  width: 30px;
  height: 30px;
  top: 30px;
  right: 100px;
  animation: moon-glow 4s ease-in-out infinite 1s;
}

@keyframes moon-glow {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.7; }
}

/* 白夜行 - 夜空繁星 */
.night-stars-decoration .night-star {
  position: absolute;
  font-size: 0.6rem;
  animation: star-twinkle 3s ease-in-out infinite;
}

@keyframes star-twinkle {
  0%, 100% { opacity: 0.1; }
  50% { opacity: 0.8; }
}

/* 月亮与六便士 - 月光 */
.moonlight-decoration .moon-glow {
  position: absolute;
  top: -20px;
  right: -20px;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: radial-gradient(circle, currentColor 0%, transparent 70%);
  opacity: 0.15;
  animation: moon-pulse 4s ease-in-out infinite;
}

.moonlight-decoration .moon-ray {
  position: absolute;
  top: 0;
  right: 20px;
  width: 1px;
  height: 100%;
  background: linear-gradient(to bottom, currentColor, transparent);
  opacity: 0.1;
  animation: ray-shimmer 3s ease-in-out infinite;
}

@keyframes moon-pulse {
  0%, 100% { transform: scale(1); opacity: 0.15; }
  50% { transform: scale(1.1); opacity: 0.25; }
}

@keyframes ray-shimmer {
  0%, 100% { opacity: 0.05; }
  50% { opacity: 0.15; }
}

/* 岛上书店 - 书籍堆叠 */
.books-decoration .book-stack {
  position: absolute;
  border: 1.5px solid currentColor;
  border-radius: 2px;
}

.books-decoration .book-1 {
  width: 40px;
  height: 50px;
  bottom: 20px;
  right: 20px;
  transform: rotate(-5deg);
}

.books-decoration .book-2 {
  width: 35px;
  height: 45px;
  bottom: 25px;
  right: 30px;
  transform: rotate(3deg);
}

.books-decoration .book-3 {
  width: 38px;
  height: 48px;
  bottom: 30px;
  right: 25px;
  transform: rotate(-2deg);
}

/* 困于沙丘 - 沙丘波纹 */
.dune-decoration .sand-dune {
  position: absolute;
  width: 120%;
  left: -10%;
  height: 30px;
  border: 1px solid currentColor;
  border-radius: 50%;
  opacity: 0;
  animation: dune-ripple 4s ease-out infinite;
}

@keyframes dune-ripple {
  0% { opacity: 0; transform: scaleX(0.8); }
  50% { opacity: 0.2; }
  100% { opacity: 0; transform: scaleX(1); }
}

/* 莫斯科绅士 - 华丽边框 */
.ornate-border-decoration .border-corner {
  position: absolute;
  width: 40px;
  height: 40px;
  border-style: solid;
  border-color: currentColor;
}

.ornate-border-decoration .tl {
  top: 20px;
  left: 20px;
  border-width: 2px 0 0 2px;
}

.ornate-border-decoration .tr {
  top: 20px;
  right: 20px;
  border-width: 2px 2px 0 0;
}

.ornate-border-decoration .bl {
  bottom: 20px;
  left: 20px;
  border-width: 0 0 2px 2px;
}

.ornate-border-decoration .br {
  bottom: 20px;
  right: 20px;
  border-width: 0 2px 2px 0;
}

/* 夜晚的潜水艇 - 潜艇 */
.submarine-decoration .submarine-body {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 25px;
  border: 2px solid currentColor;
  border-radius: 12px;
  opacity: 0.2;
}

.submarine-decoration .periscope {
  position: absolute;
  bottom: 55px;
  left: 50%;
  transform: translateX(-50%);
  width: 2px;
  height: 20px;
  background: currentColor;
  opacity: 0.2;
}

.submarine-decoration .bubble {
  position: absolute;
  font-size: 0.6rem;
  opacity: 0;
  animation: bubble-rise 3s ease-in infinite;
}

@keyframes bubble-rise {
  0% { transform: translateY(0); opacity: 0; }
  50% { opacity: 0.3; }
  100% { transform: translateY(-100px); opacity: 0; }
}

/* 刺杀骑士团长 - 隐喻壶 */
.metaphor-decoration .idea-vase {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50px;
  height: 60px;
  border: 2px solid currentColor;
  border-radius: 4px;
  opacity: 0.15;
}

.metaphor-decoration .idea-stream {
  position: absolute;
  width: 2px;
  height: 20px;
  background: currentColor;
  top: -25px;
  opacity: 0;
  animation: stream-flow 2s ease-out infinite;
}

.metaphor-decoration .stream-1 { left: 40%; animation-delay: 0s; }
.metaphor-decoration .stream-2 { left: 50%; animation-delay: 0.5s; }
.metaphor-decoration .stream-3 { left: 60%; animation-delay: 1s; }

@keyframes stream-flow {
  0% { opacity: 0; transform: translateY(0); }
  50% { opacity: 0.3; }
  100% { opacity: 0; transform: translateY(-30px); }
}

/* 失落的卫星 - 卫星轨道 */
.satellite-decoration .orbit {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid currentColor;
  border-radius: 50%;
  opacity: 0.15;
}

.satellite-decoration .orbit-1 {
  width: 80px;
  height: 80px;
  animation: orbit-rotate 10s linear infinite;
}

.satellite-decoration .orbit-2 {
  width: 120px;
  height: 120px;
  opacity: 0.08;
}

.satellite-decoration .sat {
  position: absolute;
  top: -4px;
  left: 50%;
  transform: translateX(-50%);
  width: 8px;
  height: 8px;
  background: currentColor;
  border-radius: 50%;
}

@keyframes orbit-rotate {
  from { transform: translate(-50%, -50%) rotate(0deg); }
  to { transform: translate(-50%, -50%) rotate(360deg); }
}

/* 额尔古纳河右岸 - 河流 */
.river-decoration .river-flow {
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 40px;
  transform: translateY(-50%);
  border-top: 1px solid currentColor;
  border-bottom: 1px solid currentColor;
  opacity: 0.1;
}

.river-decoration .river-wave {
  position: absolute;
  width: 100%;
  height: 2px;
  background: currentColor;
  opacity: 0;
  animation: wave-flow 3s ease-in-out infinite;
}

.river-decoration .river-wave:nth-child(2) { top: 45%; animation-delay: 1s; }
.river-decoration .river-wave:nth-child(3) { top: 55%; animation-delay: 2s; }

@keyframes wave-flow {
  0%, 100% { opacity: 0; transform: translateX(-10%); }
  50% { opacity: 0.15; transform: translateX(10%); }
}

/* 山月记 - 老虎与月亮 */
.tiger-moon-decoration .tm-moon {
  position: absolute;
  top: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 2px solid currentColor;
  opacity: 0.2;
}

.tiger-moon-decoration .tm-tiger-silhouette {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 2rem;
  opacity: 0.15;
}

/* 我的阿勒泰 - 草原 */
.grassland-decoration .grass-blade {
  position: absolute;
  width: 2px;
  background: linear-gradient(to top, currentColor, transparent);
  opacity: 0.12;
  animation: grass-sway 4s ease-in-out infinite;
}

.grassland-decoration .grass-blade:nth-child(even) {
  animation-delay: 0.5s;
}

@keyframes grass-sway {
  0%, 100% { transform: rotate(-5deg); }
  50% { transform: rotate(5deg); }
}

/* 人生海海 - 海浪 */
.waves-decoration .wave {
  position: absolute;
  width: 150%;
  left: -25%;
  height: 30px;
  border: 1px solid currentColor;
  border-radius: 50%;
  opacity: 0;
  animation: wave-crest 3s ease-out infinite;
}

.waves-decoration .wave-1 { bottom: 20px; animation-delay: 0s; }
.waves-decoration .wave-2 { bottom: 30px; animation-delay: 1s; }
.waves-decoration .wave-3 { bottom: 40px; animation-delay: 2s; }

@keyframes wave-crest {
  0% { opacity: 0; transform: translateX(-10%) scaleX(0.9); }
  50% { opacity: 0.15; }
  100% { opacity: 0; transform: translateX(10%) scaleX(1.1); }
}

/* 马可瓦尔多 - 四季 */
.seasons-decoration .season-icon {
  position: absolute;
  font-size: 1.2rem;
  opacity: 0;
  animation: season-fade 4s ease-in-out infinite;
}

.seasons-decoration .spring { top: 20px; left: 20px; animation-delay: 0s; }
.seasons-decoration .summer { top: 20px; right: 20px; animation-delay: 1s; }
.seasons-decoration .autumn { bottom: 20px; left: 20px; animation-delay: 2s; }
.seasons-decoration .winter { bottom: 20px; right: 20px; animation-delay: 3s; }

@keyframes season-fade {
  0%, 80%, 100% { opacity: 0; }
  20%, 60% { opacity: 0.3; }
}

/* 基督山伯爵 - 十字架 */
.cross-decoration .cross-vertical {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 2px;
  height: 60px;
  background: currentColor;
  opacity: 0.15;
}

.cross-decoration .cross-horizontal {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 2px;
  background: currentColor;
  opacity: 0.15;
}

/* 无人生还 - 士兵 */
.soldiers-decoration .soldier {
  position: absolute;
  font-size: 0.8rem;
  animation: soldier-fade 3s ease-in-out infinite;
}

@keyframes soldier-fade {
  0%, 100% { opacity: 0.1; }
  50% { opacity: 0.5; }
}

/* 嫌疑人X的献身 - 爱心拼图 */
.heart-puzzle-decoration .puzzle-piece {
  position: absolute;
  width: 20px;
  height: 20px;
  border: 1px solid currentColor;
  opacity: 0.12;
}

.heart-puzzle-decoration .piece-1 {
  top: 30px;
  right: 30px;
  border-radius: 50% 50% 50% 0;
  transform: rotate(-45deg);
}

.heart-puzzle-decoration .piece-2 {
  bottom: 30px;
  left: 30px;
  border-radius: 50%;
  animation: puzzle-pulse 3s ease-in-out infinite;
}

.heart-puzzle-decoration .piece-3 {
  bottom: 40px;
  right: 40px;
  width: 0;
  height: 0;
  border: none;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 15px solid currentColor;
  opacity: 0.1;
  transform: rotate(180deg);
}

@keyframes puzzle-pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

/* 桃花源记 - 花瓣 */
.blossoms-decoration .blossom {
  position: absolute;
  font-size: 1rem;
  opacity: 0;
  animation: blossom-fall linear infinite;
}

@keyframes blossom-fall {
  0% {
    opacity: 0;
    transform: translateY(-10px) rotate(0deg);
  }
  20% {
    opacity: 0.5;
  }
  80% {
    opacity: 0.5;
  }
  100% {
    opacity: 0;
    transform: translateY(400px) rotate(180deg);
  }
}

</style>

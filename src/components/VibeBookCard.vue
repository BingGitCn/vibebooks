<template>
  <div
    class="vibe-book-card"
    :class="[`size-${book.layoutSize || 'normal'}`, `anim-${book.vibeAnimation || 'pulse-circle'}`]"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @click="readBook"
  >
    <!-- 背景渐变 -->
    <div class="card-bg" :style="backgroundStyle"></div>

    <!-- 中央 Vibe 动画装置 -->
    <div class="vibe-device">
      <VibeAnimation
        :animationType="book.vibeAnimation || 'pulse-circle'"
        :vibeColor="book.vibeColor || book.accentColor"
        :vibeColorEnd="book.vibeColorEnd"
      />
    </div>

    <!-- 封面纹理（缩小版，右下角） -->
    <div v-if="book.cover" class="cover-texture">
      <img :src="book.cover" :alt="book.title" />
    </div>

    <!-- Vibe 标签（底部） -->
    <div class="vibe-tags">
      <span v-for="(tag, index) in book.vibeTags" :key="index" class="vibe-tag">
        {{ tag }}
      </span>
    </div>

    <!-- 通感文案（Hover 显示） -->
    <transition name="quote-fade">
      <div v-if="showVibeQuote" class="vibe-quote">
        <p>{{ book.vibeQuote }}</p>
      </div>
    </transition>

    <!-- 书名（底部小字） -->
    <div class="book-info">
      <span class="book-title">{{ book.title }}</span>
      <span class="book-author">{{ book.author }}</span>
    </div>

    <!-- VOL. 编号（左上角） -->
    <div class="vol-label">VOL.{{ book.vol }}</div>

    <!-- 边缘光晕（Hover 时） -->
    <div class="card-glow" :style="glowStyle"></div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import VibeAnimation from './VibeAnimation.vue'
import { getVibeConfig } from '../data/vibeExtensions'

const router = useRouter()
const props = defineProps({
  book: {
    type: Object,
    required: true
  }
})

const showVibeQuote = ref(false)
let quoteTimeout = null

// 获取 Vibe 配置
const vibeConfig = computed(() => {
  return getVibeConfig(props.book.id) || {
    vibeColor: props.book.accentColor,
    vibeColorEnd: '#2d3748',
    vibeAnimation: 'pulse-circle',
    vibeTags: props.book.tags || [],
    vibeQuote: props.book.quote || '',
    layoutSize: 'normal'
  }
})

// 扩展书籍数据，添加 vibe 字段
const book = computed(() => ({
  ...props.book,
  ...vibeConfig.value
}))

// 背景渐变
const backgroundStyle = computed(() => {
  return {
    background: `linear-gradient(135deg, ${book.value.vibeColor} 0%, ${book.value.vibeColorEnd} 100%)`
  }
})

// 光晕样式
const glowStyle = computed(() => {
  return {
    '--glow-color': book.value.vibeColor
  }
})

// Mouse 事件
const handleMouseEnter = () => {
  // 300ms 后显示通感文案
  quoteTimeout = setTimeout(() => {
    showVibeQuote.value = true
  }, 300)
}

const handleMouseLeave = () => {
  showVibeQuote.value = false
  if (quoteTimeout) {
    clearTimeout(quoteTimeout)
  }
}

// 导航
const readBook = () => {
  if (book.value.worldComponent) {
    const routeMap = {
      'PrinceWorld': '/world/prince',
      'IslandBookstoreWorld': '/world/island-bookstore',
      'TrappedInDunesWorld': '/world/trapped-in-dunes',
      'NightSubmarineWorld': '/world/night-submarine',
      'MoscowGentlemanWorld': '/world/moscow-gentleman',
      'CrimeAndPunishmentWorld': '/world/crime-and-punishment',
      'SaharaWorld': '/world/sahara',
      'KillingCommendatoreWorld': '/world/killing-commendatore',
      'SmallIslandEconomicsWorld': '/world/small-island-economics',
      'MyAltayWorld': '/world/my-altay'
    }

    const route = routeMap[book.value.worldComponent]
    if (route) {
      router.push(route)
    }
  } else {
    router.push(`/book/${book.value.id}`)
  }
}
</script>

<style scoped>
.vibe-book-card {
  position: relative;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  border-radius: 8px;
}

/* 尺寸变体 */
.vibe-book-card.size-normal {
  width: 100%;
  aspect-ratio: 3/4;
}

.vibe-book-card.size-large {
  grid-column: span 2;
  grid-row: span 2;
  aspect-ratio: 1;
}

/* 背景层 */
.card-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

/* Vibe 动画装置（中央） */
.vibe-device {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70%;
  height: 70%;
  z-index: 2;
}

/* 封面纹理（右下角） */
.cover-texture {
  position: absolute;
  bottom: 60px;
  right: 10px;
  width: 40px;
  height: 50px;
  z-index: 3;
  opacity: 0.2;
}

.cover-texture img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
}

/* Vibe 标签（底部） */
.vibe-tags {
  position: absolute;
  bottom: 50px;
  left: 0;
  width: 100%;
  padding: 0 15px;
  display: flex;
  gap: 8px;
  z-index: 4;
  flex-wrap: wrap;
}

.vibe-tag {
  font-size: 10px;
  font-weight: 400;
  letter-spacing: 0.1em;
  color: rgba(255, 255, 255, 0.9);
  text-transform: uppercase;
}

/* 通感文案 */
.vibe-quote {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  z-index: 5;
  text-align: center;
  pointer-events: none;
}

.vibe-quote p {
  font-size: clamp(0.9rem, 2vw, 1.2rem);
  font-weight: 300;
  color: #ffffff;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.8);
  line-height: 1.6;
  letter-spacing: 0.15em;
  font-style: italic;
}

/* 书名信息（底部） */
.book-info {
  position: absolute;
  bottom: 15px;
  left: 0;
  width: 100%;
  padding: 0 15px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  z-index: 4;
}

.book-title {
  font-size: clamp(1rem, 2.5vw, 1.4rem);
  font-weight: 500;
  color: rgba(255, 255, 255, 0.95);
  letter-spacing: 0.1em;
  line-height: 1.2;
}

.book-author {
  font-size: clamp(0.75rem, 1.5vw, 0.9rem);
  font-weight: 300;
  color: rgba(255, 255, 255, 0.7);
  letter-spacing: 0.05em;
}

/* VOL. 编号（左上角） */
.vol-label {
  position: absolute;
  top: 12px;
  left: 12px;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.2em;
  color: rgba(255, 255, 255, 0.6);
  z-index: 4;
}

/* 边缘光晕 */
.card-glow {
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  border-radius: 10px;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 0;
  pointer-events: none;
  background: var(--glow-color, #4a7c9f);
  filter: blur(15px);
}

/* Hover 效果 */
.vibe-book-card:hover {
  transform: translateY(-8px);
}

.vibe-book-card:hover .card-glow {
  opacity: 0.6;
}

.vibe-book-card:hover .vibe-device {
  transform: translate(-50%, -50%) scale(1.05);
}

/* 转场动画 */
.quote-fade-enter-active,
.quote-fade-leave-active {
  transition: opacity 0.4s ease;
}

.quote-fade-enter-from,
.quote-fade-leave-to {
  opacity: 0;
}

/* 响应式 */
@media (max-width: 768px) {
  .vibe-book-card.size-large {
    grid-column: span 1;
    grid-row: span 1;
    aspect-ratio: 3/4;
  }

  .vibe-tags {
    bottom: 55px;
  }

  .vibe-tag {
    font-size: 9px;
  }
}

@media (max-width: 480px) {
  .vibe-device {
    width: 80%;
    height: 80%;
  }

  .book-info {
    bottom: 12px;
  }
}
</style>

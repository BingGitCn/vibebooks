<template>
  <div class="universe-container">
    <!-- 左侧氛围文字 -->
    <aside class="atmosphere-left">
      <div class="atmosphere-text-vertical">
        <span class="char" v-for="(char, index) in leftText" :key="index" :style="{ animationDelay: `${index * 0.1}s` }">
          {{ char }}
        </span>
      </div>
      <div class="atmosphere-quote">{{ leftQuote }}</div>
    </aside>

    <!-- 主内容区 -->
    <div class="universe-main">
      <!-- 页面标题区 -->
      <header class="universe-header">
        <div class="header-content">
          <h1 class="universe-title">A Library of Book Vibes </h1>
          <p class="universe-subtitle">Every Book Deserves to be Reinvented</p>
        </div>
        <!-- 返回首页按钮 -->
        <button class="back-btn" @click="goBack">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          <span>Return</span>
        </button>
      </header>

      <!-- 书籍网格 -->
      <main class="books-grid" :class="`columns-${columnCount}`">
        <div
          v-for="book in books"
          :key="book.id"
          class="grid-item"
        >
          <BookCard :book="book" />
        </div>
      </main>

      <!-- 页脚 -->
      <footer class="universe-footer">
        <div class="footer-content">
          <div class="archive-info">
            <span class="archive-count">{{ books.length }} VOLUMES</span>
            <span class="archive-divider">|</span>
            <span class="archive-status">ARCHIVED</span>
          </div>
          <div class="scroll-indicator">
            <span>Explore the Universe</span>
            <svg class="scroll-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 5v14M5 12l7 7 7-7"/>
            </svg>
          </div>
        </div>
      </footer>
    </div>

    <!-- 右侧氛围文字 -->
    <aside class="atmosphere-right">
      <div class="atmosphere-text-vertical">
        <span class="char" v-for="(char, index) in rightText" :key="index" :style="{ animationDelay: `${index * 0.1}s` }">
          {{ char }}
        </span>
      </div>
      <div class="atmosphere-quote">{{ rightQuote }}</div>
    </aside>

    <!-- 底部装饰线 -->
    <div class="bottom-decoration">
      <div class="decoration-line"></div>
      <div class="decoration-dots">
        <span v-for="i in 5" :key="i" class="dot"></span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import BookCard from '../components/BookCard.vue'
import booksData from '../data/books.js'

const router = useRouter()
const books = ref(booksData)
const windowWidth = ref(window.innerWidth)

// 左侧氛围文字
const leftText = 'STORIES BREATHE'
const leftQuote = 'Every book is a universe waiting to be explored'

// 右侧氛围文字
const rightText = 'WHERE IDEAS LIVE'
const rightQuote = 'In books, we find reflections of ourselves'

// 根据窗口宽度计算列数
const columnCount = computed(() => {
  if (windowWidth.value >= 1600) return 4
  if (windowWidth.value >= 1200) return 3
  if (windowWidth.value >= 768) return 2
  return 1
})

// 监听窗口大小变化
const handleResize = () => {
  windowWidth.value = window.innerWidth
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

const goBack = () => {
  router.push('/')
}
</script>

<style scoped>
.universe-container {
  min-height: 100vh;
  background: linear-gradient(180deg, #f7f5f2 0%, #f2efe9 100%);
  display: flex;
  position: relative;
  overflow-x: hidden;
}

/* === 左右氛围区 === */
.atmosphere-left,
.atmosphere-right {
  position: fixed;
  top: 0;
  height: 100vh;
  width: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1;
  pointer-events: none;
  transition: all 0.5s ease;
}

.atmosphere-left {
  left: 0;
  border-right: 1px solid rgba(26, 26, 26, 0.04);
}

.atmosphere-right {
  right: 0;
  border-left: 1px solid rgba(26, 26, 26, 0.04);
}

/* 竖排文字 */
.atmosphere-text-vertical {
  writing-mode: vertical-rl;
  text-orientation: mixed;
  font-family: 'Inter', sans-serif;
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.3em;
  color: rgba(26, 26, 26, 0.15);
  user-select: none;
}

.atmosphere-text-vertical .char {
  display: inline-block;
  opacity: 0;
  animation: char-fade-in 0.6s ease forwards;
}

@keyframes char-fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 氛围引用 */
.atmosphere-quote {
  position: absolute;
  bottom: 15%;
  width: 180px;
  text-align: center;
  font-family: 'Cormorant Garamond', serif;
  font-size: 0.7rem;
  font-style: italic;
  color: rgba(26, 26, 26, 0.2);
  line-height: 1.6;
  padding: 1rem;
  transform: rotate(-90deg);
  transform-origin: center;
}

.atmosphere-right .atmosphere-quote {
  transform: rotate(90deg);
}

/* === 主内容区 === */
.universe-main {
  flex: 1;
  margin: 0 80px;
  padding: 3rem 2rem;
  position: relative;
  z-index: 2;
  transition: margin 0.5s ease;
}

/* 顶部标题区 */
.universe-header {
  max-width: 1800px;
  margin: 0 auto 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-content {
  text-align: left;
}

.universe-title {
  font-family: 'Noto Serif SC', serif;
  font-size: clamp(2rem, 4vw, 3.5rem);
  font-weight: 300;
  letter-spacing: 0.1em;
  color: #1a1a1a;
  margin-bottom: 0.5rem;
  line-height: 1.3;
}

.universe-subtitle {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(1rem, 1.5vw, 1.25rem);
  font-style: italic;
  color: #666;
  letter-spacing: 0.15em;
}

/* 返回按钮 */
.back-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: rgba(26, 26, 26, 0.05);
  border: 1px solid rgba(26, 26, 26, 0.1);
  color: #1a1a1a;
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
}

.back-btn:hover {
  background: rgba(26, 26, 26, 0.9);
  color: #f7f5f2;
  transform: translateX(-3px);
}

.back-btn svg {
  width: 18px;
  height: 18px;
  stroke-width: 1.5;
}

/* 书籍网格 */
.books-grid {
  max-width: 1800px;
  margin: 0 auto;
  display: grid;
  gap: 2rem;
  padding-bottom: 3rem;
}

/* 响应式列数 */
.books-grid.columns-4 {
  grid-template-columns: repeat(4, 1fr);
}

.books-grid.columns-3 {
  grid-template-columns: repeat(3, 1fr);
}

.books-grid.columns-2 {
  grid-template-columns: repeat(2, 1fr);
}

.books-grid.columns-1 {
  grid-template-columns: 1fr;
  max-width: 500px;
}

.grid-item {
  opacity: 0;
  animation: fade-in 0.6s ease forwards;
}

/* 依次淡入动画 */
.grid-item:nth-child(1) { animation-delay: 0.05s; }
.grid-item:nth-child(2) { animation-delay: 0.1s; }
.grid-item:nth-child(3) { animation-delay: 0.15s; }
.grid-item:nth-child(4) { animation-delay: 0.2s; }
.grid-item:nth-child(5) { animation-delay: 0.25s; }
.grid-item:nth-child(6) { animation-delay: 0.3s; }
.grid-item:nth-child(7) { animation-delay: 0.35s; }
.grid-item:nth-child(8) { animation-delay: 0.4s; }
.grid-item:nth-child(9) { animation-delay: 0.45s; }
.grid-item:nth-child(10) { animation-delay: 0.5s; }
.grid-item:nth-child(n+11) { animation-delay: 0.55s; }

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 页脚 */
.universe-footer {
  max-width: 1800px;
  margin: 3rem auto 0;
  padding-top: 2rem;
  border-top: 1px solid rgba(26, 26, 26, 0.08);
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.archive-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-family: 'Inter', monospace;
  font-size: 0.7rem;
  letter-spacing: 0.15em;
  color: #666;
}

.archive-divider {
  opacity: 0.3;
}

.scroll-indicator {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  letter-spacing: 0.15em;
  color: #999;
  text-transform: uppercase;
}

.scroll-icon {
  width: 16px;
  height: 16px;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-5px);
  }
  60% {
    transform: translateY(-3px);
  }
}

/* === 底部装饰 === */
.bottom-decoration {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
  pointer-events: none;
}

.decoration-line {
  height: 1px;
  background: linear-gradient(90deg,
    transparent 0%,
    rgba(26, 26, 26, 0.1) 20%,
    rgba(26, 26, 26, 0.1) 80%,
    transparent 100%
  );
}

.decoration-dots {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 8px;
  padding-bottom: 16px;
}

.decoration-dots .dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: rgba(26, 26, 26, 0.15);
  animation: dot-pulse 2s infinite;
}

.decoration-dots .dot:nth-child(1) { animation-delay: 0s; }
.decoration-dots .dot:nth-child(2) { animation-delay: 0.2s; }
.decoration-dots .dot:nth-child(3) { animation-delay: 0.4s; }
.decoration-dots .dot:nth-child(4) { animation-delay: 0.6s; }
.decoration-dots .dot:nth-child(5) { animation-delay: 0.8s; }

@keyframes dot-pulse {
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.2);
  }
}

/* === 响应式设计 === */

/* 超大屏幕 (≥1920px) */
@media (min-width: 1920px) {
  .atmosphere-left,
  .atmosphere-right {
    width: 120px;
  }

  .universe-main {
    margin: 0 120px;
  }

  .atmosphere-text-vertical {
    font-size: 0.75rem;
  }

  .atmosphere-quote {
    width: 220px;
    font-size: 0.8rem;
  }
}

/* 大屏幕 (1600px - 1919px) */
@media (min-width: 1600px) and (max-width: 1919px) {
  .atmosphere-left,
  .atmosphere-right {
    width: 100px;
  }

  .universe-main {
    margin: 0 100px;
  }
}

/* 中等屏幕 (1200px - 1599px) */
@media (min-width: 1200px) and (max-width: 1599px) {
  .atmosphere-left,
  .atmosphere-right {
    width: 60px;
  }

  .universe-main {
    margin: 0 60px;
  }

  .atmosphere-quote {
    width: 140px;
    font-size: 0.65rem;
  }
}

/* 平板横屏 (992px - 1199px) */
@media (min-width: 992px) and (max-width: 1199px) {
  .atmosphere-left,
  .atmosphere-right {
    width: 50px;
  }

  .universe-main {
    margin: 0 50px;
    padding: 2.5rem 1.5rem;
  }

  .atmosphere-text-vertical {
    font-size: 0.55rem;
    letter-spacing: 0.25em;
  }

  .atmosphere-quote {
    display: none;
  }
}

/* 平板竖屏 (768px - 991px) */
@media (min-width: 768px) and (max-width: 991px) {
  .atmosphere-left,
  .atmosphere-right {
    width: 40px;
  }

  .universe-main {
    margin: 0 40px;
    padding: 2rem 1.5rem;
  }

  .atmosphere-text-vertical {
    font-size: 0.5rem;
    letter-spacing: 0.2em;
  }

  .atmosphere-quote {
    display: none;
  }

  .books-grid {
    gap: 1.5rem;
  }
}

/* 手机横屏 (600px - 767px) */
@media (min-width: 600px) and (max-width: 767px) {
  .atmosphere-left,
  .atmosphere-right {
    display: none;
  }

  .universe-main {
    margin: 0;
    padding: 2rem 1.5rem;
  }

  .universe-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.5rem;
    margin-bottom: 3rem;
  }

  .back-btn {
    align-self: flex-start;
  }
}

/* 手机竖屏 (<600px) */
@media (max-width: 599px) {
  .atmosphere-left,
  .atmosphere-right {
    display: none;
  }

  .universe-main {
    margin: 0;
    padding: 1.5rem 1rem;
  }

  .universe-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  .universe-title {
    font-size: 1.75rem;
  }

  .universe-subtitle {
    font-size: 0.85rem;
  }

  .back-btn {
    padding: 0.6rem 1.2rem;
    font-size: 0.65rem;
  }

  .books-grid {
    gap: 1.2rem;
  }

  .footer-content {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }

  .scroll-indicator {
    display: none;
  }

  .decoration-dots {
    gap: 6px;
    padding-bottom: 12px;
  }

  .decoration-dots .dot {
    width: 3px;
    height: 3px;
  }
}

/* 滚动条样式 */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: rgba(26, 26, 26, 0.02);
}

::-webkit-scrollbar-thumb {
  background: rgba(26, 26, 26, 0.15);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(26, 26, 26, 0.25);
}
</style>

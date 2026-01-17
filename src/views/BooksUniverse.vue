<template>
  <div class="monochrome-universe">
    <!-- 噪点纹理层 -->
    <div class="noise-texture"></div>

    <!-- 水平线纹理层 -->
    <div class="lines-texture"></div>

    <!-- 左侧装饰文字 -->
    <aside class="left-decoration">
      <div class="vertical-text">BOOK ARCHIVE</div>
      <div class="vertical-subtext">Every book has a soul</div>
    </aside>

    <!-- 右侧装饰文字 -->
    <aside class="right-decoration">
      <div class="vertical-text">STORIES LIVE</div>
      <div class="vertical-subtext">Where ideas breathe</div>
    </aside>

    <!-- 返回按钮（固定左上角） -->
    <button class="back-btn-fixed" @click="goBack">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M19 12H5M12 19l-7-7 7-7"/>
      </svg>
      <span>Return</span>
    </button>

    <!-- 主内容区 -->
    <main class="universe-main">
      <!-- 页面头部 -->
      <header class="universe-header">
        <!-- 极简框架 -->
        <div class="header-frame">
          <div class="frame-top"></div>
          <div class="frame-title">Book Archive</div>
          <div class="frame-bottom"></div>
        </div>

        <p class="universe-subtitle">Every book has a soul</p>
      </header>

      <!-- 书籍网格 -->
      <div class="books-grid">
        <div
          v-for="(book, index) in books"
          :key="book.id"
          class="grid-item"
          :style="{ animationDelay: `${index * 50}ms` }"
        >
          <BookCard :book="book" />
        </div>
      </div>

      <!-- 页脚 -->
      <footer class="universe-footer">
        <div class="archive-info">
          <span class="archive-count">{{ String(books.length).padStart(2, '0') }} VOLUMES</span>
          <span class="archive-divider">///</span>
          <span class="archive-status">ARCHIVED</span>
        </div>
      </footer>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import BookCard from '../components/BookCard.vue'
import booksData from '../data/books.js'
import { addMiddleEffectsToBooks } from '../data/middleEffectsConfig.js'

const router = useRouter()
const books = ref(addMiddleEffectsToBooks(booksData))

const goBack = () => {
  router.push('/')
}
</script>

<style scoped>
/* ========== 容器 ========== */
.monochrome-universe {
  min-height: 100vh;
  background: #f7f5f2;
  position: relative;
  overflow-x: hidden;
}

/* ========== 噪点纹理 ========== */
.noise-texture {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  opacity: 0.02;
}

/* ========== 水平线纹理 ========== */
.lines-texture {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 2;
  background-image: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 1px,
    #000 1px,
    #000 2px
  );
  background-size: 100% 4px;
  opacity: 0.015;
}

/* ========== 主内容区 ========== */
.universe-main {
  position: relative;
  z-index: 10;
  max-width: 1152px; /* max-w-6xl */
  margin: 0 auto;
  padding: 4rem 2rem;
}

/* ========== 左右装饰文字 ========== */
.left-decoration,
.right-decoration {
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  z-index: 5;
  pointer-events: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.left-decoration {
  left: 2rem;
}

.right-decoration {
  right: 2rem;
}

.vertical-text {
  writing-mode: vertical-rl;
  text-orientation: mixed;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.3em;
  color: #000000;
  opacity: 0.15;
  text-transform: uppercase;
}

.vertical-subtext {
  writing-mode: vertical-rl;
  text-orientation: mixed;
  font-family: 'Source Serif 4', Georgia, serif;
  font-size: 0.6rem;
  font-weight: 400;
  font-style: italic;
  letter-spacing: 0.15em;
  color: #525252;
  opacity: 0.2;
}

/* ========== 页面头部 ========== */
.universe-header {
  text-align: center;
  margin-bottom: 5rem;
  position: relative;
}

/* 极简框架 */
.header-frame {
  display: inline-block;
  position: relative;
  padding: 2rem 4rem;
  margin-bottom: 2rem;
}

.frame-top,
.frame-bottom {
  position: absolute;
  left: 0;
  right: 0;
  height: 1px;
  background: #1a1a1a;
  opacity: 0.3;
}

.frame-top {
  top: 0;
}

.frame-bottom {
  bottom: 0;
}

.frame-title {
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.4em;
  color: #1a1a1a;
  text-transform: uppercase;
  opacity: 0.8;
}

/* 副标题 */
.universe-subtitle {
  font-family: 'Source Serif 4', Georgia, serif;
  font-size: clamp(1rem, 2vw, 1.3rem);
  font-weight: 300;
  font-style: italic;
  letter-spacing: 0.15em;
  color: rgba(26, 26, 26, 0.5);
  margin-bottom: 3rem;
}

/* 返回按钮（固定左上角） */
.back-btn-fixed {
  position: fixed;
  top: 2rem;
  left: 2rem;
  z-index: 100;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1.5rem;
  background: rgba(247, 245, 242, 0.9);
  backdrop-filter: blur(10px);
  border: 1px solid #1a1a1a;
  color: #1a1a1a;
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
}

.back-btn-fixed:hover {
  background: #1a1a1a;
  color: #f7f5f2;
  box-shadow: 0 0 30px rgba(26, 26, 26, 0.15);
  transform: translateX(-3px);
}

.back-btn-fixed:focus-visible {
  outline: 2px solid #1a1a1a;
  outline-offset: 4px;
}

.back-btn-fixed svg {
  width: 16px;
  height: 16px;
}

/* ========== 书籍网格 ========== */
.books-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  border-top: 4px solid #000000;
  padding-top: 2rem;
}

.grid-item {
  opacity: 0;
  animation: fade-in-up 0.6s ease-out forwards;
}

/* 进入动画 */
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ========== 页脚 ========== */
.universe-footer {
  margin-top: 4rem;
  padding-top: 2rem;
  border-top: 4px solid #000000;
  display: flex;
  justify-content: center;
}

.archive-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.7rem;
  letter-spacing: 0.15em;
  color: #525252;
}

.archive-divider {
  color: #000000;
  opacity: 0.3;
}

/* ========== 响应式设计 ========== */

/* 平板 */
@media (max-width: 1024px) {
  .books-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }

  .universe-main {
    padding: 3rem 1.5rem;
  }
}

/* 手机 */
@media (max-width: 768px) {
  .books-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .left-decoration,
  .right-decoration {
    display: none;
  }

  .universe-title {
    font-size: clamp(2.5rem, 12vw, 4rem);
  }

  .universe-subtitle {
    font-size: 1rem;
  }

  .back-btn-fixed {
    top: 1rem;
    left: 1rem;
    padding: 0.75rem 1.25rem;
    font-size: 0.65rem;
  }

  .universe-main {
    padding: 2rem 1rem;
  }
}
</style>

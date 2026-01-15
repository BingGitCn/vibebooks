<template>
  <div class="universe-container">
    <!-- 页面标题区 -->
    <header class="universe-header">
      <div class="header-content">
        <h1 class="universe-title">书籍 Vibe 宇宙</h1>
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
    <main class="books-grid">
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
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import BookCard from '../components/BookCard.vue'
import booksData from '../data/books.js'

const router = useRouter()
const books = ref(booksData)

const goBack = () => {
  router.push('/')
}
</script>

<style scoped>
.universe-container {
  min-height: 100vh;
  background: linear-gradient(180deg, #f7f5f2 0%, #f2efe9 100%);
  padding: 3rem 2rem;
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
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  padding-bottom: 3rem;
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
.grid-item:nth-child(n+7) { animation-delay: 0.35s; }

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

/* 响应式设计 */
@media (max-width: 1400px) {
  .books-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 900px) {
  .universe-container {
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

@media (max-width: 768px) {
  .books-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .universe-title {
    font-size: 2rem;
  }

  .universe-subtitle {
    font-size: 0.9rem;
  }

  .footer-content {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }

  .scroll-indicator {
    display: none;
  }
}

/* 滚动条样式 */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(26, 26, 26, 0.02);
}

::-webkit-scrollbar-thumb {
  background: rgba(26, 26, 26, 0.15);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(26, 26, 26, 0.25);
}
</style>

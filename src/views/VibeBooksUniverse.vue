<template>
  <div class="vibe-universe">
    <header class="universe-header">
      <h1 class="universe-title">书籍 Vibe 宇宙</h1>
      <p class="universe-subtitle">Where stories breathe</p>
    </header>

    <!-- 不规则网格布局 -->
    <div class="books-grid">
      <VibeBookCard
        v-for="book in books"
        :key="book.id"
        :book="getBookWithVibe(book)"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { booksData } from '../data/books.js'
import VibeBookCard from '../components/VibeBookCard.vue'
import { getVibeConfig, getDefaultVibeConfig } from '../data/vibeExtensions.js'

const books = ref([])

// 扩展书籍数据，添加 vibe 配置
const getBookWithVibe = (book) => {
  const vibeConfig = getVibeConfig(book.id) || getDefaultVibeConfig(book)
  return {
    ...book,
    ...vibeConfig
  }
}

onMounted(() => {
  books.value = booksData // 显示所有书籍
})
</script>

<style scoped>
.vibe-universe {
  min-height: 100vh;
  background: #f7f5f2;
  padding: 4rem 2rem;
}

.universe-header {
  text-align: center;
  margin-bottom: 4rem;
}

.universe-title {
  font-size: clamp(2.5rem, 6vw, 5rem);
  font-weight: 300;
  color: #1a1a1a;
  letter-spacing: 0.3em;
  margin-bottom: 1rem;
}

.universe-subtitle {
  font-size: clamp(1rem, 2vw, 1.3rem);
  font-weight: 300;
  color: #666;
  letter-spacing: 0.2em;
  font-style: italic;
}

/* 不规则网格布局 */
.books-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  grid-auto-rows: 400px;
  gap: 2rem;
  grid-auto-flow: dense; /* 关键：允许元素填充空隙 */
}

/* 响应式 */
@media (max-width: 768px) {
  .vibe-universe {
    padding: 2rem 1rem;
  }

  .books-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-auto-rows: 300px;
    gap: 1.5rem;
  }

  .universe-header {
    margin-bottom: 2rem;
  }
}

@media (max-width: 480px) {
  .books-grid {
    grid-template-columns: 1fr;
    grid-auto-rows: 350px;
  }
}
</style>

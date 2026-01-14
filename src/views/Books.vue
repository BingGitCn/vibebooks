<template>
  <div class="books-page min-h-screen bg-white relative overflow-hidden">
    <!-- 环境光晕层 -->
    <div class="atmosphere-layer">
      <div
        v-for="book in books"
        :key="`glow-${book.id}`"
        class="book-atmosphere"
        :style="{
          left: `${getGlowPosition(book.id).x}%`,
          top: `${getGlowPosition(book.id).y}%`,
          background: book.atmosphere.glow,
        }"
      ></div>
    </div>

    <!-- 页面标题区 -->
    <header class="page-header">
      <button @click="goBack" class="back-button font-mono text-sm flex items-center gap-2 group">
        <span class="transform group-hover:-translate-x-1 transition-transform">←</span>
        <span>回归</span>
      </button>
      <div class="header-content">
        <h1 class="title font-display text-6xl md:text-8xl font-bold">
          <span class="title-part">{{ bookCountText }}</span>
          <span class="title-part title-accent">{{ collectionTitle }}</span>
        </h1>
        <p class="subtitle font-mono text-sm tracking-widest text-gray-400 mt-4">
          {{ subtitleText }}
        </p>
      </div>
    </header>

    <!-- 书籍网格展示区 -->
    <main class="books-grid">
      <div
        v-for="book in books"
        :key="book.id"
        class="book-grid-item"
        :class="`book-${book.displayType}`"
      >
        <div
          class="book-wrapper"
          :style="{
            transform: `rotate(${book.rotation}deg)`,
          }"
        >
          <BookCard :book="book" />
        </div>
      </div>
    </main>

    <!-- 底部信息 -->
    <footer class="page-footer font-mono text-xs text-gray-400">
      <div class="footer-content">
        <span>漂浮在文字的海洋里</span>
        <div class="divider"></div>
        <span>2025 · VIBEBOOKS</span>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import gsap from 'gsap'
import { books as booksData } from '../data/books.js'
import BookCard from '../components/BookCard.vue'

const router = useRouter()
const books = ref(booksData)

// 动态标题计算
const bookCountText = computed(() => {
  const count = books.value.length
  if (count === 1) return '一本'
  if (count === 2) return '两本'
  if (count === 3) return '三本'
  return `${count}本`
})

const collectionTitle = computed(() => {
  const count = books.value.length
  if (count === 1) return '心灵之书'
  if (count === 2) return '灵魂世界'
  if (count <= 5) return '情绪宇宙'
  return '书籍宇宙'
})

const subtitleText = computed(() => {
  const count = books.value.length
  const moods = books.value.map(b => b.moodLabel)

  if (count === 1) {
    return `关于${moods[0]}的故事`
  }
  if (count === 2) {
    return `一个关于${moods[0].split('与')[0]}，一个关于${moods[1].split('与')[0]}`
  }
  if (count <= 5) {
    return `每一本书都是一种未曾说破的心绪`
  }
  return `漂浮在文字的海洋里，探索无限可能`
})

// 计算光晕位置（基于网格布局）
const getGlowPosition = (bookId) => {
  const index = books.value.findIndex(b => b.id === bookId)
  const row = Math.floor(index / 4)
  const col = index % 4

  return {
    x: 15 + col * 23,
    y: 30 + row * 35
  }
}

const goBack = () => {
  router.push('/')
}

onMounted(() => {
  // 页面标题入场
  gsap.fromTo('.page-header',
    { opacity: 0, y: -40 },
    { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }
  )

  // 环境光晕渐入
  gsap.fromTo('.book-atmosphere',
    { opacity: 0, scale: 0.5 },
    {
      opacity: 1,
      scale: 1,
      duration: 2,
      stagger: 0.2,
      ease: 'power2.out',
      delay: 0.5
    }
  )

  // 书籍卡片入场
  gsap.fromTo('.book-wrapper',
    {
      opacity: 0,
      scale: 0.7,
      rotate: (index) => books.value[index].rotation * 2
    },
    {
      opacity: 1,
      scale: 1,
      rotate: (index) => books.value[index].rotation,
      duration: 1.2,
      stagger: 0.15,
      ease: 'back.out(1.2)',
      delay: 0.8
    }
  )

  // 底部信息渐入
  gsap.fromTo('.page-footer',
    { opacity: 0 },
    { opacity: 1, duration: 1, delay: 2, ease: 'power2.out' }
  )
})
</script>

<style scoped>
.books-page {
  padding: 3rem 2rem;
  min-height: 100vh;
}

/* 环境光晕层 */
.atmosphere-layer {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}

.book-atmosphere {
  position: absolute;
  width: 350px;
  height: 350px;
  border-radius: 50%;
  filter: blur(100px);
  transform: translate(-50%, -50%);
  animation: breathe 8s ease-in-out infinite;
}

@keyframes breathe {
  0%, 100% {
    opacity: 0.5;
    transform: translate(-50%, -50%) scale(1);
  }
  50% {
    opacity: 0.8;
    transform: translate(-50%, -50%) scale(1.2);
  }
}

/* 页面标题 */
.page-header {
  position: relative;
  z-index: 100;
  margin-bottom: 3rem;
}

.back-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem 0;
  margin-bottom: 2rem;
  transition: all 0.3s ease;
  opacity: 0.6;
}

.back-button:hover {
  opacity: 1;
  color: #000;
  transform: translateX(-5px);
}

.header-content {
  position: relative;
}

.title {
  line-height: 1.1;
}

.title-part {
  display: block;
  opacity: 0;
  animation: slideIn 1s ease forwards;
}

.title-part:nth-child(2) {
  animation-delay: 0.3s;
}

.title-accent {
  background: linear-gradient(135deg, #000 0%, #666 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.subtitle {
  opacity: 0;
  animation: fadeIn 1s ease forwards 0.8s;
}

@keyframes fadeIn {
  to { opacity: 1; }
}

/* 书籍网格布局 */
.books-grid {
  position: relative;
  z-index: 10;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: 3rem 2rem;
  max-width: 1800px;
  margin: 0 auto;
  padding: 2rem 0;
}

/* 网格项 */
.book-grid-item {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.book-wrapper {
  width: 100%;
  max-width: 380px;
  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  cursor: pointer;
}

.book-wrapper:hover {
  z-index: 100;
  transform: rotate(0deg) scale(1.05) !important;
}

/* 特色大卡片 */
.book-featured .book-wrapper {
  max-width: 420px;
}

/* 底部 */
.page-footer {
  position: relative;
  z-index: 10;
  margin-top: 6rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
}

.footer-content {
  display: flex;
  align-items: center;
  gap: 2rem;
  max-width: 1800px;
  margin: 0 auto;
}

.divider {
  flex: 1;
  height: 1px;
  background: linear-gradient(to right, rgba(0, 0, 0, 0.1), transparent);
}

/* 响应式 */
@media (max-width: 1400px) {
  .books-grid {
    grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
    gap: 2.5rem 1.5rem;
  }
}

@media (max-width: 1024px) {
  .books-grid {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem 1.5rem;
  }

  .book-wrapper {
    max-width: 100%;
  }
}

@media (max-width: 768px) {
  .books-page {
    padding: 2rem 1rem;
  }

  .title {
    font-size: 3rem;
  }

  .books-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding: 1rem 0;
  }

  .book-wrapper {
    max-width: 100%;
  }

  .footer-content {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }

  .divider {
    width: 100%;
    height: 1px;
  }

  .atmosphere-layer {
    display: none;
  }
}
</style>

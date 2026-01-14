<template>
  <div class="books-page min-h-screen bg-white relative">
    <!-- 页面标题区 -->
    <header class="page-header">
      <button @click="goBack" class="back-button font-mono text-sm flex items-center gap-2 group">
        <span class="transform group-hover:-translate-x-1 transition-transform">←</span>
        <span>返回</span>
      </button>
      <div class="header-content">
        <h1 class="title font-display text-6xl md:text-8xl font-bold">书籍氛围</h1>
        <p class="subtitle font-mono text-sm tracking-widest text-gray-400">
          {{ books.length }} 个独特的视觉宇宙
        </p>
      </div>
    </header>

    <!-- 书籍展示区 - 错落有致的排布 -->
    <main class="books-container">
      <!-- 第一行 -->
      <div class="book-row row-1">
        <BookCard
          v-for="book in row1Books"
          :key="book.id"
          :book="book"
          :style="getBookStyle(book, 0)"
        />
      </div>

      <!-- 第二行 -->
      <div class="book-row row-2">
        <BookCard
          v-for="book in row2Books"
          :key="book.id"
          :book="book"
          :style="getBookStyle(book, 1)"
        />
      </div>

      <!-- 第三行 -->
      <div class="book-row row-3">
        <BookCard
          v-for="book in row3Books"
          :key="book.id"
          :book="book"
          :style="getBookStyle(book, 2)"
        />
      </div>
    </main>

    <!-- 底部装饰 -->
    <footer class="page-footer font-mono text-xs text-gray-400">
      <div class="footer-content">
        <span>SCROLL TO EXPLORE MORE</span>
        <div class="divider"></div>
        <span>VISUAL UNIVERSE</span>
      </div>
    </footer>

    <!-- 动态光晕 -->
    <div
      v-for="(glow, index) in ambientGlows"
      :key="index"
      class="ambient-glow"
      :style="glow"
    ></div>
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

// 分割书籍到不同行，创造错落感
const row1Books = computed(() => books.value.slice(0, 3))
const row2Books = computed(() => books.value.slice(3, 6))
const row3Books = computed(() => books.value.slice(6, 9))

// 环境光晕
const ambientGlows = ref([
  {
    top: '15%',
    left: '10%',
    width: '400px',
    height: '400px',
    background: 'radial-gradient(circle, rgba(74, 93, 35, 0.1) 0%, transparent 70%)',
  },
  {
    top: '45%',
    right: '8%',
    width: '350px',
    height: '350px',
    background: 'radial-gradient(circle, rgba(0, 255, 136, 0.08) 0%, transparent 70%)',
  },
  {
    bottom: '20%',
    left: '15%',
    width: '450px',
    height: '450px',
    background: 'radial-gradient(circle, rgba(212, 175, 55, 0.12) 0%, transparent 70%)',
  },
])

// 获取每本书的独特样式
const getBookStyle = (book, rowIndex) => {
  const styles = {
    '--book-color': book.color,
    '--book-rotation': `${book.visualStyle.rotation}deg`,
    '--book-scale': book.visualStyle.size === 'large' ? 1.15 : book.visualStyle.size === 'small' ? 0.9 : 1,
  }
  return styles
}

const goBack = () => {
  router.push('/')
}

onMounted(() => {
  // 入场动画
  gsap.fromTo('.page-header',
    { opacity: 0, y: -30 },
    { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
  )

  gsap.fromTo('.book-card',
    { opacity: 0, y: 100, rotate: 0 },
    {
      opacity: 1,
      y: 0,
      rotate: (index) => {
        const book = books.value[index]
        return book.visualStyle.rotation
      },
      duration: 1.2,
      stagger: 0.15,
      ease: 'power3.out',
      delay: 0.3
    }
  )

  gsap.fromTo('.ambient-glow',
    { opacity: 0 },
    { opacity: 1, duration: 2, stagger: 0.3, ease: 'power2.out' }
  )

  gsap.fromTo('.page-footer',
    { opacity: 0 },
    { opacity: 1, duration: 1, delay: 1, ease: 'power2.out' }
  )
})
</script>

<style scoped>
.books-page {
  padding: 3rem 2rem;
  overflow-x: hidden;
}

/* 页面标题 */
.page-header {
  position: relative;
  z-index: 10;
  margin-bottom: 4rem;
}

.back-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem 0;
  margin-bottom: 2rem;
  transition: all 0.3s ease;
}

.back-button:hover {
  color: var(--hover-color, #000);
}

.header-content {
  position: relative;
}

.title {
  line-height: 1;
  margin-bottom: 1rem;
  font-family: 'Playfair Display', serif;
}

.subtitle {
  opacity: 0;
  animation: fadeIn 1s ease forwards 0.5s;
}

@keyframes fadeIn {
  to { opacity: 1; }
}

/* 书籍容器 - 错落排布 */
.books-container {
  position: relative;
  max-width: 1600px;
  margin: 0 auto;
}

.book-row {
  display: flex;
  justify-content: center;
  align-items: stretch;
  gap: 3rem;
  margin-bottom: 4rem;
  position: relative;
}

/* 每一行独特的偏移 */
.row-1 {
  transform: translateX(-5%);
}

.row-2 {
  transform: translateX(5%);
}

.row-3 {
  transform: translateX(-3%);
}

/* 书籍卡片样式由组件内部定义，但添加容器级别的过渡 */
.book-card {
  transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
}

/* 底部 */
.page-footer {
  position: relative;
  z-index: 10;
  margin-top: 6rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.footer-content {
  display: flex;
  align-items: center;
  gap: 2rem;
  max-width: 1600px;
  margin: 0 auto;
}

.divider {
  flex: 1;
  height: 1px;
  background: linear-gradient(to right, rgba(0, 0, 0, 0.1), transparent);
}

/* 环境光晕 */
.ambient-glow {
  position: fixed;
  border-radius: 50%;
  filter: blur(120px);
  pointer-events: none;
  z-index: 0;
  animation: pulse 8s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 0.6; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.05); }
}

/* 响应式 */
@media (max-width: 1024px) {
  .book-row {
    flex-wrap: wrap;
    transform: none !important;
  }

  .row-1, .row-2, .row-3 {
    transform: none;
  }
}

@media (max-width: 768px) {
  .books-page {
    padding: 2rem 1rem;
  }

  .title {
    font-size: 3rem;
  }

  .book-row {
    gap: 2rem;
    flex-direction: column;
    align-items: center;
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
}
</style>

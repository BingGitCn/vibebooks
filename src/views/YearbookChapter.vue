<template>
  <div class="yearbook-chapter swiss-grid-pattern swiss-noise" :class="`category-${categorySlug}`">
    <!-- Category-specific geometric decoration -->
    <div class="category-decoration">
      <component :is="getCategoryDecoration()" />
    </div>

    <div class="chapter-container swiss-container">
      <!-- Top navigation strip -->
      <nav class="top-strip swiss-border-bottom">
        <div class="strip-content">
          <button class="back-button" @click="goBack">
            <span class="arrow">←</span> BACK
          </button>
          <span class="separator"></span>
          <span class="volume-label">VOL. {{ currentYear }}</span>
        </div>
      </nav>

      <!-- Chapter header -->
      <header class="chapter-header swiss-border-bottom">
        <div class="header-left">
          <p class="chapter-number" data-number="chapter">
            {{ String(chapterId).padStart(2, '0') }} {{ category }}
          </p>
          <h1 class="chapter-title">{{ categoryTitle }}</h1>
          <p class="chapter-subtitle">{{ categorySubtitle }}</p>
        </div>
        <div class="header-right">
          <div class="entry-count">
            <span class="count-number">{{ books.length }}</span>
            <span class="count-label">ENTRIES</span>
          </div>
        </div>
      </header>

      <!-- Books grid -->
      <main class="chapter-main">
        <div class="books-grid">
          <article
            v-for="(book, index) in books"
            :key="book.id"
            class="book-entry swiss-border-bottom swiss-border-right"
            :class="[
              { 'featured': index < 2 },
              `entry-${categorySlug}`
            ]"
            @click="goToBook(book)"
          >
            <!-- Entry header -->
            <div class="entry-header swiss-border-bottom">
              <span class="entry-vol">{{ String(book.vol).padStart(3, '0') }}</span>
              <span class="entry-page">{{ String(index + 1).padStart(3, '0') }}</span>
            </div>

            <!-- Entry content -->
            <div class="entry-content">
              <h3 class="entry-title">{{ book.title }}</h3>
              <p v-if="book.subtitle" class="entry-subtitle">{{ book.subtitle }}</p>
              <p class="entry-author">{{ book.author }}</p>

              <p class="entry-quote">"{{ truncate(book.featuredQuote, 80) }}"</p>

              <!-- Tags -->
              <div class="entry-tags" v-if="book.tags && book.tags.length">
                <span v-for="(tag, i) in book.tags.slice(0, 3)" :key="i" class="entry-tag">
                  {{ tag }}
                </span>
              </div>
            </div>

            <!-- Entry footer -->
            <div class="entry-footer">
              <span class="entry-category">{{ book.category }}</span>
              <span class="entry-arrow">→</span>
            </div>
          </article>
        </div>
      </main>

      <!-- Chapter navigation -->
      <footer class="chapter-footer swiss-border-top">
        <div class="footer-left">
          <span class="page-info">PAGE {{ String(chapterId).padStart(2, '0') }} / 06</span>
        </div>
        <div class="footer-right">
          <button
            v-if="hasPrevious"
            class="nav-button prev"
            @click="goToPrevious"
          >
            <span class="arrow">←</span> PREV
          </button>
          <button
            v-if="hasNext"
            class="nav-button next"
            @click="goToNext"
          >
            NEXT <span class="arrow">→</span>
          </button>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import booksData from '../data/books'

const router = useRouter()
const route = useRoute()

const currentYear = ref(new Date().getFullYear())
const categorySlug = ref('')
const category = ref('')
const chapterId = ref(1)
const books = ref([])

const categoryMap = {
  'fiction': {
    name: 'FICTION',
    title: 'FICTION',
    subtitle: 'WHERE STORIES BREATHE',
    id: 1,
    pattern: 'diagonal',
    decoration: 'FictionDecoration',
    accentColor: '#FF3000'
  },
  'philosophy': {
    name: 'PHILOSOPHY',
    title: 'PHILOSOPHY',
    subtitle: 'THINKING ABOUT THINKING',
    id: 2,
    pattern: 'dots',
    decoration: 'PhilosophyDecoration',
    accentColor: '#FF3000'
  },
  'economics': {
    name: 'ECONOMICS',
    title: 'ECONOMICS',
    subtitle: 'THE DISMAL SCIENCE',
    id: 3,
    pattern: 'grid',
    decoration: 'EconomicsDecoration',
    accentColor: '#FF3000'
  },
  'mystery': {
    name: 'MYSTERY',
    title: 'MYSTERY',
    subtitle: 'UNSOLVED PUZZLES',
    id: 4,
    pattern: 'noise',
    decoration: 'MysteryDecoration',
    accentColor: '#FF3000'
  },
  'romance': {
    name: 'ROMANCE',
    title: 'ROMANCE',
    subtitle: 'MATTERS OF THE HEART',
    id: 5,
    pattern: 'dots',
    decoration: 'RomanceDecoration',
    accentColor: '#FF3000'
  },
  'classic': {
    name: 'CLASSIC',
    title: 'CLASSIC',
    subtitle: 'TIMELESS TALES',
    id: 6,
    pattern: 'grid',
    decoration: 'ClassicDecoration',
    accentColor: '#FF3000'
  }
}

const categoryTitle = computed(() => categoryMap[categorySlug.value]?.title || '')
const categorySubtitle = computed(() => categoryMap[categorySlug.value]?.subtitle || '')

const chapters = ['fiction', 'philosophy', 'economics', 'mystery', 'romance', 'classic']
const currentIndex = computed(() => chapters.indexOf(categorySlug.value))
const hasPrevious = computed(() => currentIndex.value > 0)
const hasNext = computed(() => currentIndex.value < chapters.length - 1)

const truncate = (text, length) => {
  if (text.length <= length) return text
  return text.substring(0, length) + '...'
}

const loadCategoryData = () => {
  categorySlug.value = route.params.category
  console.log('Loading category:', categorySlug.value)
  const catInfo = categoryMap[categorySlug.value]
  category.value = catInfo?.name || ''
  chapterId.value = catInfo?.id || 1

  // Filter books by category
  books.value = booksData.filter(b => b.category === catInfo?.name)
  console.log('Found books:', books.value.length)
}

onMounted(() => {
  loadCategoryData()
})

// Watch for route changes
watch(() => route.params.category, () => {
  loadCategoryData()
})

const goBack = () => {
  router.push('/yearbook')
}

const goToBook = (book) => {
  if (book.worldComponent) {
    const routeMap = {
      'IslandBookstoreWorld': '/world/island-bookstore',
      'MoscowGentlemanWorld': '/world/moscow-gentleman',
      'NightSubmarineWorld': '/world/night-submarine',
      'NorwegianWoodWorld': '/world/norwegian-wood',
      'MarcovaldoWorld': '/world/marcovaldo',
      'KillingCommendatoreWorld': '/world/killing-commendatore'
    }
    const route = routeMap[book.worldComponent]
    if (route) router.push(route)
  }
  // 没有 worldComponent 的书籍点击无效
}

const goToPrevious = () => {
  console.log('Previous clicked, hasPrevious:', hasPrevious.value, 'currentIndex:', currentIndex.value)
  if (hasPrevious.value) {
    const prevRoute = `/yearbook/${chapters[currentIndex.value - 1]}`
    console.log('Navigating to:', prevRoute)
    router.push(prevRoute)
  }
}

const goToNext = () => {
  console.log('Next clicked, hasNext:', hasNext.value, 'currentIndex:', currentIndex.value)
  if (hasNext.value) {
    const nextRoute = `/yearbook/${chapters[currentIndex.value + 1]}`
    console.log('Navigating to:', nextRoute)
    router.push(nextRoute)
  }
}

const getCategoryDecoration = () => {
  const decorations = {
    'fiction': 'FictionDecoration',
    'philosophy': 'PhilosophyDecoration',
    'economics': 'EconomicsDecoration',
    'mystery': 'MysteryDecoration',
    'romance': 'RomanceDecoration',
    'classic': 'ClassicDecoration'
  }
  return decorations[categorySlug.value] || 'DefaultDecoration'
}
</script>

<script>
import { h } from 'vue'

// Fiction Decoration - Flowing diagonal lines representing narrative
export const FictionDecoration = {
  render() {
    return h('div', { class: 'decoration-fiction' }, [
      h('div', { class: 'line-fiction line-1' }),
      h('div', { class: 'line-fiction line-2' }),
      h('div', { class: 'line-fiction line-3' })
    ])
  }
}

// Philosophy Decoration - Concentric circles representing deep thinking
export const PhilosophyDecoration = {
  render() {
    return h('div', { class: 'decoration-philosophy' }, [
      h('div', { class: 'circle-philosophy circle-outer' }),
      h('div', { class: 'circle-philosophy circle-middle' }),
      h('div', { class: 'circle-philosophy circle-inner' })
    ])
  }
}

// Economics Decoration - Bar chart elements representing data
export const EconomicsDecoration = {
  render() {
    return h('div', { class: 'decoration-economics' }, [
      h('div', { class: 'bar-economics bar-1' }),
      h('div', { class: 'bar-economics bar-2' }),
      h('div', { class: 'bar-economics bar-3' }),
      h('div', { class: 'line-economics' })
    ])
  }
}

// Mystery Decoration - Question mark and hidden elements
export const MysteryDecoration = {
  render() {
    return h('div', { class: 'decoration-mystery' }, [
      h('div', { class: 'question-mark' }, '?'),
      h('div', { class: 'dot-mystery dot-1' }),
      h('div', { class: 'dot-mystery dot-2' }),
      h('div', { class: 'dot-mystery dot-3' })
    ])
  }
}

// Romance Decoration - Intersecting curves representing connection
export const RomanceDecoration = {
  render() {
    return h('div', { class: 'decoration-romance' }, [
      h('div', { class: 'curve-romance curve-1' }),
      h('div', { class: 'curve-romance curve-2' }),
      h('div', { class: 'heart-geometric' })
    ])
  }
}

// Classic Decoration - Balanced geometric shapes
export const ClassicDecoration = {
  render() {
    return h('div', { class: 'decoration-classic' }, [
      h('div', { class: 'square-classic square-1' }),
      h('div', { class: 'square-classic square-2' }),
      h('div', { class: 'line-classic line-h' }),
      h('div', { class: 'line-classic line-v' })
    ])
  }
}

// Default fallback decoration
export const DefaultDecoration = {
  render() {
    return h('div', { class: 'decoration-default' }, [
      h('div', { class: 'dot-default' })
    ])
  }
}
</script>

<style scoped>
.yearbook-chapter {
  min-height: 100vh;
  background-color: var(--swiss-white);
}

.chapter-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* Top strip */
.top-strip {
  padding: 1rem 2rem;
  background-color: var(--swiss-black);
  color: var(--swiss-white);
  display: flex;
  align-items: center;
}

.strip-content {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.back-button {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  background: transparent;
  border: none;
  color: var(--swiss-white);
  cursor: pointer;
  padding: 0.5rem 1rem;
  transition: all 0.15s ease-out;
}

.back-button:hover {
  color: var(--swiss-accent);
}

.back-button .arrow {
  margin-right: 0.5rem;
}

.separator {
  width: 1px;
  height: 1rem;
  background-color: var(--swiss-white);
  opacity: 0.3;
}

.volume-label {
  font-family: 'Inter', sans-serif;
  font-weight: 900;
  font-size: 0.625rem;
  letter-spacing: 0.2em;
}

/* Chapter header */
.chapter-header {
  padding: 3rem 2rem;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 2rem;
  align-items: center;
}

.chapter-number {
  font-family: 'Inter', sans-serif;
  font-weight: 900;
  font-size: 0.875rem;
  letter-spacing: 0.2em;
  color: var(--swiss-accent);
  margin: 0 0 1rem 0;
}

.chapter-title {
  font-family: 'Inter', sans-serif;
  font-weight: 900;
  font-size: clamp(2rem, 5vw, 4rem);
  text-transform: uppercase;
  letter-spacing: -0.03em;
  line-height: 1;
  margin: 0 0 0.5rem 0;
}

.chapter-subtitle {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 0.875rem;
  letter-spacing: 0.25em;
  color: var(--swiss-text-secondary);
  margin: 0;
}

.entry-count {
  text-align: center;
}

.count-number {
  display: block;
  font-family: 'Inter', sans-serif;
  font-weight: 900;
  font-size: 3rem;
  line-height: 1;
}

.count-label {
  display: block;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 0.625rem;
  letter-spacing: 0.2em;
  color: var(--swiss-text-secondary);
}

/* Main content */
.chapter-main {
  flex: 1;
}

.books-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

.book-entry {
  cursor: pointer;
  transition: all 0.15s ease-out;
  display: flex;
  flex-direction: column;
}

.book-entry:hover {
  background-color: var(--swiss-muted);
}

/* Category-specific hover effects */
/* FICTION - 瑞士红反转 */
.entry-fiction:hover {
  background-color: var(--swiss-accent) !important;
  border-color: var(--swiss-accent) !important;
}

.entry-fiction:hover .entry-header,
.entry-fiction:hover .entry-footer {
  background-color: #CC0000 !important;
  border-color: #CC0000 !important;
}

.entry-fiction:hover * {
  color: var(--swiss-white) !important;
}

/* PHILOSOPHY - 深黑反转 */
.entry-philosophy:hover {
  background-color: #1a1a1a !important;
}

.entry-philosophy:hover .entry-header,
.entry-philosophy:hover .entry-footer {
  background-color: #000 !important;
  border-color: #000 !important;
}

.entry-philosophy:hover * {
  color: var(--swiss-white) !important;
}

/* ECONOMICS - 黑色反转 */
.entry-economics:hover {
  background-color: var(--swiss-black) !important;
}

.entry-economics:hover .entry-header,
.entry-economics:hover .entry-footer {
  background-color: #000 !important;
  border-color: var(--swiss-accent) !important;
}

.entry-economics:hover * {
  color: var(--swiss-white) !important;
}

/* MYSTERY - 瑞士红反转 */
.entry-mystery:hover {
  background-color: var(--swiss-accent) !important;
}

.entry-mystery:hover .entry-header,
.entry-mystery:hover .entry-footer {
  background-color: #CC0000 !important;
  border-color: #CC0000 !important;
}

.entry-mystery:hover * {
  color: var(--swiss-white) !important;
}

/* ROMANCE - 柔和的反转 */
.entry-romance:hover {
  background-color: var(--swiss-accent) !important;
}

.entry-romance:hover .entry-header {
  background-color: #FF6B6B !important;
  border-color: #FF6B6B !important;
}

.entry-romance:hover * {
  color: var(--swiss-white) !important;
}

/* CLASSIC - 严肃的黑色 */
.entry-classic:hover {
  background-color: var(--swiss-black) !important;
}

.entry-classic:hover .entry-header,
.entry-classic:hover .entry-footer {
  background-color: #1a1a1a !important;
}

.entry-classic:hover .entry-tag {
  background-color: var(--swiss-white) !important;
  color: var(--swiss-black) !important;
}

.entry-classic:hover * {
  color: var(--swiss-white) !important;
}

.book-entry.featured {
  grid-column: span 2;
}

/* Entry header */
.entry-header {
  padding: 0.75rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--swiss-muted);
}

.entry-vol,
.entry-page {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 0.625rem;
  letter-spacing: 0.15em;
  color: var(--swiss-text-secondary);
}

/* Entry content */
.entry-content {
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.entry-title {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 1.25rem;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  line-height: 1.3;
  margin: 0 0 0.5rem 0;
}

.book-entry.featured .entry-title {
  font-size: 1.75rem;
}

.entry-subtitle {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 0.875rem;
  font-style: italic;
  color: var(--swiss-text-secondary);
  margin: 0 0 0.75rem 0;
}

.entry-author {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  color: var(--swiss-text-secondary);
  margin: 0 0 1rem 0;
}

.entry-quote {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1.6;
  font-style: italic;
  margin: 0 0 1rem 0;
  flex: 1;
}

.entry-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: auto;
}

.entry-tag {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 0.625rem;
  letter-spacing: 0.1em;
  padding: 0.25rem 0.5rem;
  border: 1px solid var(--swiss-black);
}

/* Entry footer */
.entry-footer {
  padding: 0.75rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid var(--swiss-border);
}

.entry-category {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 0.625rem;
  letter-spacing: 0.15em;
}

.entry-arrow {
  font-family: 'Inter', sans-serif;
  font-size: 1.25rem;
  font-weight: 700;
  opacity: 0;
  transform: translateX(-8px);
  transition: all 0.15s ease-out;
}

.book-entry:hover .entry-arrow {
  opacity: 1;
  transform: translateX(0);
}

/* Footer */
.chapter-footer {
  padding: 1rem 2rem;
  background-color: var(--swiss-muted);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.page-info {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 0.625rem;
  letter-spacing: 0.15em;
  color: var(--swiss-text-secondary);
}

.footer-right {
  display: flex;
  gap: 1rem;
}

.nav-button {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  padding: 0.75rem 1.5rem;
  background-color: var(--swiss-black);
  color: var(--swiss-white);
  border: 2px solid var(--swiss-black);
  cursor: pointer;
  text-transform: uppercase;
  transition: all 0.15s ease-out;
}

.nav-button:hover {
  background-color: var(--swiss-accent);
  border-color: var(--swiss-accent);
}

.nav-button .arrow {
  margin: 0 0.5rem;
  display: inline-block;
}

/* Responsive */
@media (max-width: 1024px) {
  .books-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .book-entry.featured {
    grid-column: span 1;
  }
}

@media (max-width: 768px) {
  .chapter-header {
    grid-template-columns: 1fr;
    padding: 2rem 1rem;
  }

  .books-grid {
    grid-template-columns: 1fr;
  }

  .book-entry {
    border-top: 2px solid var(--swiss-black);
    border-left: 2px solid var(--swiss-black);
  }

  .entry-title {
    font-size: 1.125rem;
  }
}

/* ============================================
   CATEGORY-SPECIFIC DECORATIONS
   ============================================ */

/* Category decoration container */
.category-decoration {
  position: absolute;
  top: 50%;
  right: 5%;
  transform: translateY(-50%);
  width: 300px;
  height: 300px;
  pointer-events: none;
  z-index: 1;
}

/* FICTION - Flowing diagonal lines */
.decoration-fiction {
  position: relative;
  width: 100%;
  height: 100%;
}

.line-fiction {
  position: absolute;
  background-color: var(--swiss-black);
  opacity: 0.25;
  transition: all 0.3s ease-out;
}

.line-fiction.line-1 {
  width: 2px;
  height: 200px;
  top: 50px;
  left: 100px;
  transform: rotate(45deg);
}

.line-fiction.line-2 {
  width: 2px;
  height: 150px;
  top: 80px;
  left: 150px;
  transform: rotate(45deg);
}

.line-fiction.line-3 {
  width: 2px;
  height: 180px;
  top: 30px;
  left: 180px;
  transform: rotate(45deg);
}

/* PHILOSOPHY - Concentric circles */
.decoration-philosophy {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.circle-philosophy {
  position: absolute;
  border: 3px solid var(--swiss-black);
  border-radius: 50%;
  opacity: 0.25;
  transition: all 0.3s ease-out;
}

.circle-philosophy.circle-outer {
  width: 200px;
  height: 200px;
}

.circle-philosophy.circle-middle {
  width: 140px;
  height: 140px;
}

.circle-philosophy.circle-inner {
  width: 80px;
  height: 80px;
  background-color: var(--swiss-accent);
  opacity: 0.35;
}

/* ECONOMICS - Bar chart elements */
.decoration-economics {
  position: relative;
  width: 100%;
  height: 100%;
}

.bar-economics {
  position: absolute;
  background-color: var(--swiss-black);
  opacity: 0.25;
  bottom: 50px;
  transition: all 0.3s ease-out;
}

.bar-economics.bar-1 {
  width: 30px;
  height: 100px;
  left: 50px;
}

.bar-economics.bar-2 {
  width: 30px;
  height: 140px;
  left: 100px;
}

.bar-economics.bar-3 {
  width: 30px;
  height: 120px;
  left: 150px;
}

.line-economics {
  position: absolute;
  width: 200px;
  height: 2px;
  background-color: var(--swiss-accent);
  opacity: 0.35;
  bottom: 40px;
  left: 50px;
  transform: rotate(-10deg);
}

/* MYSTERY - Question mark and dots */
.decoration-mystery {
  position: relative;
  width: 100%;
  height: 100%;
}

.question-mark {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: 'Inter', sans-serif;
  font-weight: 900;
  font-size: 120px;
  color: var(--swiss-accent);
  opacity: 0.2;
}

.dot-mystery {
  position: absolute;
  width: 12px;
  height: 12px;
  background-color: var(--swiss-accent);
  border-radius: 50%;
  opacity: 0.3;
}

.dot-mystery.dot-1 {
  top: 80px;
  left: 80px;
}

.dot-mystery.dot-2 {
  top: 120px;
  right: 100px;
}

.dot-mystery.dot-3 {
  bottom: 100px;
  left: 120px;
}

/* ROMANCE - Intersecting curves and heart */
.decoration-romance {
  position: relative;
  width: 100%;
  height: 100%;
}

.curve-romance {
  position: absolute;
  width: 150px;
  height: 150px;
  border: 3px solid var(--swiss-black);
  border-radius: 50%;
  opacity: 0.25;
  transition: all 0.3s ease-out;
}

.curve-romance.curve-1 {
  top: 50px;
  left: 50px;
  clip-path: polygon(0 0, 100% 0, 100% 50%, 0 50%);
}

.curve-romance.curve-2 {
  bottom: 50px;
  right: 50px;
  clip-path: polygon(0 50%, 100% 50%, 100% 100%, 0 100%);
}

.heart-geometric {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 60px;
  background-color: var(--swiss-accent);
  opacity: 0.3;
  clip-path: polygon(
    50% 0%,
    100% 35%,
    100% 70%,
    50% 100%,
    0% 70%,
    0% 35%
  );
}

/* CLASSIC - Balanced geometric shapes */
.decoration-classic {
  position: relative;
  width: 100%;
  height: 100%;
}

.square-classic {
  position: absolute;
  border: 3px solid var(--swiss-black);
  opacity: 0.25;
  transition: all 0.3s ease-out;
}

.square-classic.square-1 {
  width: 80px;
  height: 80px;
  top: 60px;
  left: 80px;
}

.square-classic.square-2 {
  width: 60px;
  height: 60px;
  bottom: 80px;
  right: 100px;
}

.line-classic {
  position: absolute;
  background-color: var(--swiss-accent);
  opacity: 0.3;
}

.line-classic.line-h {
  width: 150px;
  height: 2px;
  top: 150px;
  left: 60px;
}

.line-classic.line-v {
  width: 2px;
  height: 100px;
  top: 100px;
  right: 80px;
}

/* Default decoration */
.decoration-default {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dot-default {
  width: 20px;
  height: 20px;
  background-color: var(--swiss-black);
  opacity: 0.1;
  border-radius: 50%;
}

/* Category-specific background patterns */
.category-fiction {
  background-image: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 19px,
    rgba(255, 48, 0, 0.02) 19px,
    rgba(255, 48, 0, 0.02) 20px
  );
}

.category-philosophy {
  background-image: radial-gradient(
    circle,
    rgba(0, 0, 0, 0.03) 1px,
    transparent 1px
  );
  background-size: 20px 20px;
}

.category-economics {
  background-image:
    linear-gradient(to right, rgba(0, 0, 0, 0.02) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(0, 0, 0, 0.02) 1px, transparent 1px);
  background-size: 30px 30px;
}

.category-mystery {
  background-image:
    radial-gradient(circle at 20% 30%, rgba(255, 48, 0, 0.03) 0%, transparent 50%),
    radial-gradient(circle at 80% 70%, rgba(255, 48, 0, 0.03) 0%, transparent 50%);
}

.category-romance {
  background-image: radial-gradient(
    circle,
    rgba(255, 48, 0, 0.02) 2px,
    transparent 2px
  );
  background-size: 25px 25px;
}

.category-classic {
  background-image:
    linear-gradient(to right, rgba(0, 0, 0, 0.025) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(0, 0, 0, 0.025) 1px, transparent 1px);
  background-size: 40px 40px;
}

/* Responsive decorations */
@media (max-width: 1024px) {
  .category-decoration {
    width: 200px;
    height: 200px;
    right: 3%;
  }

  .question-mark {
    font-size: 80px;
  }

  .circle-philosophy.circle-outer {
    width: 150px;
    height: 150px;
  }

  .circle-philosophy.circle-middle {
    width: 100px;
    height: 100px;
  }

  .circle-philosophy.circle-inner {
    width: 60px;
    height: 60px;
  }
}

@media (max-width: 768px) {
  .category-decoration {
    display: none;
  }
}
</style>

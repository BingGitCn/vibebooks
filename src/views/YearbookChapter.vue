<template>
  <div class="yearbook-chapter swiss-grid-pattern swiss-noise">
    <div class="chapter-container swiss-container">
      <!-- Top navigation strip -->
      <nav class="top-strip swiss-border-bottom">
        <div class="strip-content">
          <button class="back-button" @click="goBack">
            <span class="arrow">←</span> BACK
          </button>
          <span class="separator"></span>
          <span class="volume-label">VOL. 2025</span>
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
            :class="{ 'featured': index < 2 }"
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

const categorySlug = ref('')
const category = ref('')
const chapterId = ref(1)
const books = ref([])

const categoryMap = {
  'fiction': {
    name: 'FICTION',
    title: 'FICTION',
    subtitle: 'WHERE STORIES BREATHE',
    id: 1
  },
  'philosophy': {
    name: 'PHILOSOPHY',
    title: 'PHILOSOPHY',
    subtitle: 'THINKING ABOUT THINKING',
    id: 2
  },
  'economics': {
    name: 'ECONOMICS',
    title: 'ECONOMICS',
    subtitle: 'THE DISMAL SCIENCE',
    id: 3
  },
  'mystery': {
    name: 'MYSTERY',
    title: 'MYSTERY',
    subtitle: 'UNSOLVED PUZZLES',
    id: 4
  },
  'romance': {
    name: 'ROMANCE',
    title: 'ROMANCE',
    subtitle: 'MATTERS OF THE HEART',
    id: 5
  },
  'classic': {
    name: 'CLASSIC',
    title: 'CLASSIC',
    subtitle: 'TIMELESS TALES',
    id: 6
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
      'PrinceWorld': '/world/prince',
      'ThreeBodyWorld': '/world/three-body',
      'WhiteNightWorld': '/world/white-night',
      'SmallIslandEconomicsWorld': '/world/small-island-economics',
      'MyAltayWorld': '/world/my-altay',
      'BrightNightWorld': '/world/bright-night',
    }
    const route = routeMap[book.worldComponent]
    if (route) router.push(route)
  } else {
    router.push(`/book/${book.id}`)
  }
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

  .entry-title {
    font-size: 1.125rem;
  }
}
</style>

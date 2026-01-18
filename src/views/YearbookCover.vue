<template>
  <div class="yearbook-cover swiss-grid-pattern swiss-noise">
    <!-- Main geometric composition -->
    <div class="cover-container swiss-container">
      <!-- Top navigation strip -->
      <nav class="top-strip swiss-border-bottom">
        <div class="strip-content">
          <button class="home-link" @click="goHome">
            <span class="arrow">←</span> HOME
          </button>
          <span class="separator"></span>
          <span class="volume-label">VOL. {{ currentYear }}</span>
        </div>
      </nav>

      <!-- Main hero section -->
      <section class="hero-section">
        <!-- Left side: Massive typography -->
        <div class="hero-left">
          <!-- Geometric circle accent -->
          <div class="geometric-accent">
            <div class="circle-large"></div>
            <div class="circle-small"></div>
          </div>

          <!-- Main title -->
          <h1 class="main-title">
            <span class="title-line">BOOK</span>
            <span class="title-line accent">UNIVERSE</span>
          </h1>

          <!-- Chapter listing -->
          <div class="chapters-list">
            <div
              v-for="chapter in chapters"
              :key="chapter.id"
              class="chapter-item"
              @click="navigateToChapter(chapter.route)"
            >
              <span class="chapter-number" :style="{ color: chapter.accent }">
                {{ String(chapter.id).padStart(2, '0') }}.
              </span>
              <span class="chapter-name">{{ chapter.name }}</span>
              <span class="chapter-count">({{ chapter.count }})</span>
            </div>
          </div>
        </div>

        <!-- Right side: Geometric composition -->
        <div class="hero-right swiss-border-left">
          <div class="geometric-composition">
            <!-- Bauhaus-style composition -->
            <div class="geo-shape geo-circle-primary"></div>
            <div class="geo-shape geo-rect-vertical"></div>
            <div class="geo-shape geo-rect-horizontal"></div>
            <div class="geo-shape geo-line-1"></div>
            <div class="geo-shape geo-line-2"></div>
            <div class="geo-shape geo-circle-small"></div>

            <!-- Content info -->
            <div class="content-info">
              <div class="info-row">
                <span class="info-label">TOTAL ENTRIES</span>
                <span class="info-value">{{ totalBooks }}</span>
              </div>
              <div class="info-row">
                <span class="info-label">CATEGORIES</span>
                <span class="info-value">{{ chapters.length }}</span>
              </div>
              <div class="info-row">
                <span class="info-label">ISSUE DATE</span>
                <span class="info-value">{{ issueDate }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Bottom strip with page navigation -->
      <footer class="bottom-strip swiss-border-top">
        <div class="strip-left">
          <span class="page-indicator">COVER</span>
        </div>
        <div class="strip-right">
          <button class="nav-button swiss-hover-accent" @click="goToFirstChapter">
            ENTER <span class="arrow">→</span>
          </button>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import booksData from '../data/books'

const router = useRouter()

// Get unique categories and count booksData
const chapters = ref([
  { id: 1, name: 'FICTION', route: '/yearbook/fiction', count: 0, accent: '#FF3000' },
  { id: 2, name: 'PHILOSOPHY', route: '/yearbook/philosophy', count: 0, accent: '#FF3000' },
  { id: 3, name: 'ECONOMICS', route: '/yearbook/economics', count: 0, accent: '#FF3000' },
  { id: 4, name: 'MYSTERY', route: '/yearbook/mystery', count: 0, accent: '#FF3000' },
  { id: 5, name: 'ROMANCE', route: '/yearbook/romance', count: 0, accent: '#FF3000' },
  { id: 6, name: 'CLASSIC', route: '/yearbook/classic', count: 0, accent: '#FF3000' },
])

const currentYear = ref(new Date().getFullYear())
const issueDate = ref('')

onMounted(() => {
  // Count booksData per category
  booksData.forEach(book => {
    const chapter = chapters.value.find(c => c.name === book.category)
    if (chapter) {
      chapter.count++
    }
  })

  // Set issue date
  const now = new Date()
  issueDate.value = now.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).toUpperCase()
})

const totalBooks = computed(() => booksData.length)

const navigateToChapter = (route) => {
  router.push(route)
}

const goToFirstChapter = () => {
  router.push(chapters.value[0].route)
}

const goHome = () => {
  router.push('/')
}
</script>

<style scoped>
.yearbook-cover {
  min-height: 100vh;
  background-color: var(--swiss-white);
  position: relative;
}

.cover-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* Top strip */
.top-strip {
  padding: 1rem 2rem;
  background-color: var(--swiss-black);
  color: var(--swiss-white);
}

.strip-content {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.volume-label {
  font-family: 'Inter', sans-serif;
  font-weight: 900;
  font-size: 0.75rem;
  letter-spacing: 0.2em;
}

.home-link {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  background: transparent;
  border: none;
  color: var(--swiss-white);
  cursor: pointer;
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease-out;
}

.home-link:hover {
  color: var(--swiss-accent);
}

.home-link .arrow {
  display: inline-block;
  transition: transform 0.2s ease-out;
}

.home-link:hover .arrow {
  transform: translateX(-4px);
}

.separator {
  width: 1px;
  height: 1rem;
  background-color: var(--swiss-white);
  opacity: 0.3;
}

.archive-label {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 0.625rem;
  letter-spacing: 0.3em;
}

/* Hero section */
.hero-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  flex: 1;
  min-height: calc(100vh - 8rem);
}

.hero-left {
  padding: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
}

.geometric-accent {
  position: absolute;
  top: 3rem;
  left: 3rem;
  opacity: 0.1;
}

.circle-large {
  width: 120px;
  height: 120px;
  border: 3px solid var(--swiss-black);
  border-radius: 50%;
  position: relative;
}

.circle-small {
  width: 60px;
  height: 60px;
  border: 2px solid var(--swiss-accent);
  border-radius: 50%;
  position: absolute;
  top: -30px;
  right: -20px;
  background-color: var(--swiss-accent);
}

/* Main title */
.main-title {
  font-family: 'Inter', sans-serif;
  font-weight: 900;
  font-size: clamp(3rem, 10vw, 8rem);
  text-transform: uppercase;
  line-height: 0.85;
  letter-spacing: -0.05em;
  margin: 0 0 2rem 0;
}

.title-line {
  display: block;
}

.title-line.accent {
  color: var(--swiss-accent);
}

/* Chapters list */
.chapters-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.chapter-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 1rem;
  cursor: pointer;
  transition: all 0.15s ease-out;
  border-left: 2px solid transparent;
}

.chapter-item:hover {
  background-color: var(--swiss-muted);
  border-left-color: var(--swiss-accent);
  padding-left: 1.5rem;
}

.chapter-number {
  font-family: 'Inter', sans-serif;
  font-weight: 900;
  font-size: 0.875rem;
  letter-spacing: 0.1em;
  min-width: 2.5rem;
}

.chapter-name {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 0.75rem;
  letter-spacing: 0.2em;
  flex: 1;
}

.chapter-count {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 0.625rem;
  letter-spacing: 0.1em;
  color: var(--swiss-text-secondary);
}

/* Hero right */
.hero-right {
  padding: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--swiss-muted);
  position: relative;
}

.geometric-composition {
  position: relative;
  width: 100%;
  max-width: 400px;
  aspect-ratio: 1;
}

/* Geometric shapes */
.geo-shape {
  position: absolute;
  transition: all 0.3s ease-out;
}

.geo-circle-primary {
  width: 200px;
  height: 200px;
  border: 4px solid var(--swiss-black);
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.geo-rect-vertical {
  width: 60px;
  height: 180px;
  background-color: var(--swiss-black);
  top: 10%;
  right: 20%;
}

.geo-rect-horizontal {
  width: 180px;
  height: 60px;
  background-color: var(--swiss-accent);
  bottom: 15%;
  left: 10%;
}

.geo-line-1 {
  width: 2px;
  height: 250px;
  background-color: var(--swiss-black);
  top: 0;
  right: 35%;
  transform: rotate(15deg);
}

.geo-line-2 {
  width: 2px;
  height: 200px;
  background-color: var(--swiss-black);
  bottom: 0;
  left: 30%;
  transform: rotate(-20deg);
}

.geo-circle-small {
  width: 40px;
  height: 40px;
  border: 2px solid var(--swiss-black);
  border-radius: 50%;
  top: 15%;
  left: 20%;
}

/* Hover effects */
.geometric-composition:hover .geo-circle-primary {
  transform: translate(-50%, -50%) scale(1.05);
}

.geometric-composition:hover .geo-rect-horizontal {
  background-color: var(--swiss-black);
}

/* Content info */
.content-info {
  position: absolute;
  bottom: -60px;
  right: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.info-label {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 0.625rem;
  letter-spacing: 0.2em;
  color: var(--swiss-text-secondary);
}

.info-value {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 0.75rem;
  letter-spacing: 0.1em;
}

/* Bottom strip */
.bottom-strip {
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--swiss-muted);
}

.page-indicator {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 0.625rem;
  letter-spacing: 0.2em;
  color: var(--swiss-text-secondary);
}

.nav-button {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 0.75rem;
  letter-spacing: 0.2em;
  padding: 0.75rem 2rem;
  background-color: var(--swiss-black);
  color: var(--swiss-white);
  border: 2px solid var(--swiss-black);
  cursor: pointer;
  text-transform: uppercase;
}

.nav-button .arrow {
  margin-left: 0.5rem;
  display: inline-block;
  transition: transform 0.2s ease-out;
}

.nav-button:hover .arrow {
  transform: translateX(4px);
}

/* Responsive */
@media (max-width: 1024px) {
  .hero-section {
    grid-template-columns: 1fr;
  }

  .hero-right {
    display: none;
  }

  .main-title {
    font-size: clamp(2.5rem, 12vw, 5rem);
  }
}

@media (max-width: 768px) {
  .hero-left {
    padding: 2rem;
  }

  .geometric-accent {
    display: none;
  }

  .chapter-item {
    padding: 0.5rem 0.75rem;
  }

  .chapter-item:hover {
    padding-left: 1rem;
  }
}
</style>

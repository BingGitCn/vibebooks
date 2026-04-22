<template>
  <div :class="['swiss-book-world', `category-${category}`]" :style="backgroundColor">
    <!-- Exit Button -->
    <button class="exit-btn swiss-hover-invert" @click="exitWorld">
      <span class="exit-arrow">←</span> EXIT
    </button>

    <!-- Book Header -->
    <header class="book-header swiss-border-bottom">
      <div class="header-content">
        <p class="book-vol">{{ vol }}</p>
        <h1 class="book-title">{{ title }}</h1>
        <p class="book-subtitle" v-if="subtitle">{{ subtitle }}</p>
        <p class="book-author">{{ author }} · {{ year }}</p>
      </div>
      <div class="header-meta">
        <p class="meta-label">{{ categoryLabel }}</p>
        <p class="meta-years">{{ metaInfo }}</p>
      </div>
    </header>

    <!-- Section 01 -->
    <section class="section-01 swiss-border-bottom" v-if="section01">
      <div class="section-header">
        <p class="section-number">SECTION 01</p>
        <h2 class="section-title">{{ section01.title }}</h2>
        <p class="section-subtitle">{{ section01.subtitle }}</p>
      </div>

      <div :class="`${section01.gridClass}`">
        <div
          v-for="(item, index) in section01.items"
          :key="index"
          class="card swiss-border swiss-hover-accent clickable"
          :class="{ expanded: expandedSection01 === index }"
          @click="toggleSection01(index)"
        >
          <!-- Card Number -->
          <div class="card-number" v-if="item.number">{{ item.number }}</div>

          <!-- Card Icon (optional) -->
          <div class="card-icon" v-if="item.icon">
            <span :class="`icon-${item.icon}`"></span>
          </div>

          <!-- Card Info -->
          <div class="card-info">
            <h3 class="card-name">{{ item.name }}</h3>
            <p class="card-role" v-if="item.role">{{ item.role }}</p>
            <p class="card-desc" v-if="item.desc">{{ item.desc }}</p>
          </div>

          <!-- Card Quote (optional) -->
          <div class="card-quote swiss-dots" v-if="item.quote">
            {{ item.quote }}
          </div>

          <!-- Card Details (expanded) -->
          <div class="card-details" v-if="expandedSection01 === index && item.details">
            <div class="detail-section" v-for="(detail, idx) in item.details" :key="idx">
              <p class="detail-label">{{ detail.label }}</p>
              <p class="detail-text">{{ detail.text }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 02 -->
    <section class="section-02 swiss-border-bottom" v-if="section02">
      <div class="section-header">
        <p class="section-number">SECTION 02</p>
        <h2 class="section-title">{{ section02.title }}</h2>
        <p class="section-subtitle">{{ section02.subtitle }}</p>
      </div>

      <div :class="`${section02.gridClass}`">
        <div
          v-for="(item, index) in section02.items"
          :key="index"
          class="card swiss-border swiss-hover-accent clickable"
          :class="{ expanded: expandedSection02 === index }"
          @click="toggleSection02(index)"
        >
          <!-- Card Year/Period -->
          <p class="card-year" v-if="item.year">{{ item.year }}</p>

          <!-- Card Content -->
          <div class="card-content">
            <p class="card-title">{{ item.title }}</p>
            <p class="card-desc">{{ item.desc }}</p>

            <!-- Expanded Details -->
            <div class="card-details" v-if="expandedSection02 === index && item.details">
              <div class="detail-section" v-for="(detail, idx) in item.details" :key="idx">
                <p class="detail-label">{{ detail.label }}</p>
                <p class="detail-text">{{ detail.text }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 03: Quotes -->
    <section class="section-03" v-if="section03">
      <div class="section-header">
        <p class="section-number">SECTION 03</p>
        <h2 class="section-title">{{ section03.title || 'QUOTES' }}</h2>
        <p class="section-subtitle">{{ section03.subtitle }}</p>
      </div>

      <div class="quotes-grid">
        <div
          v-for="(quote, index) in section03.items"
          :key="index"
          class="quote-card"
        >
          <div class="quote-spine"></div>
          <div class="quote-border-top"></div>
          <p class="quote-text">{{ quote.text }}</p>
          <div class="quote-border-bottom"></div>
          <div class="quote-source">
            <span class="source-name">{{ quote.source }}</span>
            <span class="source-role">{{ quote.role }}</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  // 基础信息
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    default: ''
  },
  author: {
    type: String,
    required: true
  },
  year: {
    type: String,
    required: true
  },
  vol: {
    type: String,
    default: 'VOL.001'
  },
  category: {
    type: String,
    required: true,
    validator: (value) => [
      'fiction',
      'philosophy',
      'classic',
      'mystery',
      'memoir',
      'chinese',
      'modern',
      'economics',
      'science-fiction',
      'romance'
    ].includes(value)
  },
  categoryLabel: {
    type: String,
    required: true
  },
  metaInfo: {
    type: String,
    default: ''
  },
  backgroundColor: {
    type: String,
    default: 'background-color: var(--swiss-white)'
  },
  exitPath: {
    type: String,
    default: '/yearbook/fiction'
  },

  // Section 01 (人物/角色/房间/朋友等)
  section01: {
    type: Object,
    default: null
  },

  // Section 02 (时间线/事件/年代/地点等)
  section02: {
    type: Object,
    default: null
  },

  // Section 03 (金句)
  section03: {
    type: Object,
    default: null
  }
})

const router = useRouter()
const expandedSection01 = ref(null)
const expandedSection02 = ref(null)

const exitWorld = () => {
  router.push(props.exitPath)
}

const toggleSection01 = (index) => {
  if (expandedSection01.value === index) {
    expandedSection01.value = null
  } else {
    expandedSection01.value = index
    expandedSection02.value = null // 互斥
  }
}

const toggleSection02 = (index) => {
  if (expandedSection02.value === index) {
    expandedSection02.value = null
  } else {
    expandedSection02.value = index
    expandedSection01.value = null // 互斥
  }
}
</script>

<style scoped>
@import '@/styles/swiss-style.css';

/* Main Container */
.swiss-book-world {
  min-height: 100vh;
  background-color: var(--swiss-white);
}

/* Exit Button */
.exit-btn {
  position: fixed;
  top: 2rem;
  left: 2rem;
  z-index: 100;
  padding: 0.75rem 1.5rem;
  background-color: var(--swiss-black);
  color: var(--swiss-white);
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  border: 2px solid var(--swiss-black);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.15s ease-out;
}

.exit-arrow {
  font-size: 1.25rem;
}

/* Book Header */
.book-header {
  padding: 6rem 2rem 3rem 2rem;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 4rem;
  align-items: center;
}

.book-vol {
  font-family: 'Inter', sans-serif;
  font-weight: 900;
  font-size: 0.875rem;
  letter-spacing: 0.2em;
  color: var(--swiss-accent);
  margin: 0 0 1rem 0;
}

.book-title {
  font-family: 'Inter', sans-serif;
  font-weight: 900;
  font-size: clamp(2.5rem, 5vw, 4rem);
  text-transform: uppercase;
  letter-spacing: -0.03em;
  line-height: 1;
  margin: 0 0 0.5rem 0;
  color: var(--swiss-black);
}

.book-subtitle {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 1.125rem;
  font-style: italic;
  color: var(--swiss-text-secondary);
  margin: 0 0 0.5rem 0;
}

.book-author {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 0.875rem;
  letter-spacing: 0.1em;
  color: var(--swiss-text-secondary);
  margin: 0;
}

.header-meta {
  text-align: center;
}

.meta-label {
  font-family: 'Inter', sans-serif;
  font-weight: 900;
  font-size: 0.625rem;
  letter-spacing: 0.2em;
  color: var(--swiss-accent);
  margin: 0 0 0.5rem 0;
}

.meta-years {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  color: var(--swiss-text-secondary);
  margin: 0;
}

/* Section Headers */
.section-header {
  padding: 3rem 2rem 2rem 2rem;
}

.section-number {
  font-family: 'Inter', sans-serif;
  font-weight: 900;
  font-size: 0.875rem;
  letter-spacing: 0.2em;
  color: var(--swiss-accent);
  margin: 0 0 1rem 0;
}

.section-title {
  font-family: 'Inter', sans-serif;
  font-weight: 900;
  font-size: 2.5rem;
  text-transform: uppercase;
  letter-spacing: -0.03em;
  line-height: 1;
  margin: 0 0 0.5rem 0;
  color: var(--swiss-black);
}

.section-subtitle {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 0.875rem;
  letter-spacing: 0.25em;
  color: var(--swiss-text-secondary);
  margin: 0;
}

/* Section 01 & 02 Grids */
.grid-3-columns {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 2rem;
  padding-left: 12rem;
  gap: 0;
}

.grid-2-columns {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  padding: 2rem;
  padding-left: 12rem;
  gap: 0;
}

.grid-timeline {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  padding: 2rem;
  padding-left: 12rem;
  gap: 0;
}

/* Card Styles */
.card {
  padding: 2rem;
  background-color: var(--swiss-white);
  transition: all 0.15s ease-out;
  position: relative;
}

.card:not(.expanded):hover {
  background-color: var(--swiss-accent);
  border-color: var(--swiss-accent);
}

.card:not(.expanded):hover * {
  color: var(--swiss-white) !important;
}

.card.expanded {
  background-color: var(--swiss-muted) !important;
  border-color: var(--swiss-black) !important;
}

.card.expanded .card-number,
.card.expanded .card-name,
.card.expanded .card-year,
.card.expanded .card-title {
  color: var(--swiss-accent) !important;
}

.card.expanded .detail-label {
  color: var(--swiss-accent) !important;
}

.card-number {
  font-family: 'Inter', sans-serif;
  font-weight: 900;
  font-size: 2.5rem;
  line-height: 1;
  color: var(--swiss-accent);
  margin: 0 0 1rem 0;
}

.card-icon {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.card-icon span {
  font-size: 40px;
  color: var(--swiss-black);
}

.card-info {
  margin-bottom: 1.5rem;
}

.card-name {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 1.25rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0 0 0.5rem 0;
  color: var(--swiss-black);
}

.card-role {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  color: var(--swiss-text-secondary);
  margin: 0 0 0.5rem 0;
}

.card-desc {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 0.875rem;
  color: var(--swiss-text-secondary);
  margin: 0;
}

.card-quote {
  padding: 1.5rem;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  color: var(--swiss-black);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.card-year {
  font-family: 'Inter', sans-serif;
  font-weight: 900;
  font-size: 1rem;
  color: var(--swiss-accent);
  margin: 0 0 0.5rem 0;
}

.card-content {
  flex: 1;
}

.card-title {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 1.125rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0 0 0.5rem 0;
  color: var(--swiss-black);
}

/* Card Details */
.card-details {
  padding: 1.5rem 0 0 0;
  border-top: 2px solid var(--swiss-black);
  margin-top: 1.5rem;
  animation: expand 0.3s ease-out;
}

@keyframes expand {
  from {
    opacity: 0;
    max-height: 0;
  }
  to {
    opacity: 1;
    max-height: 500px;
  }
}

.detail-section {
  margin-bottom: 1rem;
}

.detail-section:last-child {
  margin-bottom: 0;
}

.detail-label {
  font-family: 'Inter', sans-serif;
  font-weight: 900;
  font-size: 0.625rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--swiss-accent);
  margin: 0 0 0.5rem 0;
}

.detail-text {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1.6;
  color: var(--swiss-text-secondary);
  margin: 0;
}

/* Section 03: Quotes Grid */
.quotes-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  padding: 2rem;
  padding-left: 12rem;
}

.quote-card {
  background-color: var(--swiss-white);
  border: 2px solid var(--swiss-black);
  padding: 2rem;
  position: relative;
  display: flex;
  flex-direction: column;
  transition: all 0.15s ease-out;
}

.quote-card:hover {
  border-color: var(--swiss-accent);
  transform: translateY(-2px);
}

.quote-spine {
  width: 12px;
  height: 16px;
  background-color: var(--swiss-accent);
  position: absolute;
  top: -1px;
  left: -1px;
}

.quote-border-top {
  height: 2px;
  background: linear-gradient(90deg,
    var(--swiss-black) 0%,
    var(--swiss-accent) 50%,
    var(--swiss-black) 100%
  );
  margin: 0 0 1.5rem 0;
}

.quote-border-bottom {
  height: 2px;
  background: linear-gradient(90deg,
    var(--swiss-black) 0%,
    var(--swiss-accent) 50%,
    var(--swiss-black) 100%
  );
  margin: 1.5rem 0 1rem 0;
}

.quote-text {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 0.9375rem;
  line-height: 1.7;
  color: var(--swiss-black);
  margin: 0;
  flex: 1;
}

.quote-source {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.75rem;
  padding-top: 0.5rem;
  border-top: 1px solid var(--swiss-border);
}

.source-name {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--swiss-black);
}

.source-role {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  color: var(--swiss-text-secondary);
}

/* Responsive */
@media (max-width: 1024px) {
  .book-header,
  .section-header,
  .grid-3-columns,
  .grid-2-columns,
  .grid-timeline,
  .quotes-grid {
    padding-left: 2rem;
  }

  .grid-3-columns,
  .grid-2-columns,
  .grid-timeline,
  .quotes-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .book-header {
    grid-template-columns: 1fr;
    padding: 4rem 1rem 2rem 1rem;
  }

  .header-meta {
    order: -1;
    margin-bottom: 1rem;
  }

  .section-header {
    padding: 2rem 1rem 1rem;
  }

  .grid-3-columns,
  .grid-2-columns,
  .grid-timeline,
  .quotes-grid {
    grid-template-columns: 1fr;
    padding: 1rem;
  }

  .exit-btn {
    top: 1rem;
    left: 1rem;
    padding: 0.5rem 1rem;
    font-size: 0.65rem;
  }
}
</style>

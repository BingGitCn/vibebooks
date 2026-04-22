<template>
  <div class="concept-page" v-if="concept && school">
    <!-- 导航 -->
    <nav class="top-bar">
      <router-link :to="`/school/${school.id}`" class="back-link">← {{ school.name }}</router-link>
      <span class="bar-code">{{ concept.nameEn }}</span>
    </nav>

    <div class="page-body">
      <!-- 概念头部 -->
      <header class="concept-header fade-up" :class="{ visible: show }" :style="{ '--accent': school.accent }">
        <p class="ch-school">{{ school.name }} · {{ school.period }}</p>
        <h1 class="ch-title">{{ concept.name }}</h1>
        <p class="ch-en">{{ concept.nameEn }}</p>
      </header>

      <!-- 描述 -->
      <section class="desc-block fade-up" :class="{ visible: secVis[0] }">
        <div class="sec-head">
          <span class="sec-dot"></span>
          <h2 class="sec-title">这个词语意味着</h2>
          <span class="sec-line"></span>
        </div>
        <p class="desc-text">{{ concept.description }}</p>
      </section>

      <!-- 生活中的例子 -->
      <section class="example-block fade-up" :class="{ visible: secVis[1] }">
        <div class="sec-head">
          <span class="sec-dot"></span>
          <h2 class="sec-title">它在你的生活里回响</h2>
          <span class="sec-line"></span>
        </div>
        <div class="example-card">
          <p class="example-text">{{ concept.example }}</p>
        </div>
      </section>

      <!-- 关联人物 -->
      <section class="related-block fade-up" :class="{ visible: secVis[2] }">
        <div class="sec-head">
          <span class="sec-dot"></span>
          <h2 class="sec-title">相邻的路标</h2>
          <span class="sec-line"></span>
        </div>
        <div class="related-list">
          <router-link
            v-for="rc in relatedConcepts"
            :key="rc.id"
            :to="`/concept/${rc.id}`"
            class="related-item"
            :style="{ '--accent': school.accent }"
          >
            <span class="ri-en">{{ rc.nameEn }}</span>
            <span class="ri-name">{{ rc.name }}</span>
            <span class="ri-arrow">→</span>
          </router-link>
        </div>
      </section>

      <!-- 返回流派 -->
      <div class="bottom-link">
        <router-link :to="`/school/${school.id}`" class="back-school-btn">
          ← 返回 {{ school.name }}
        </router-link>
        <router-link to="/" class="back-home-btn">回到入口</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { getSchool, getConcept, concepts as allConcepts } from '../data/psychology'

const route = useRoute()
const show = ref(false)
const secVis = ref([false, false, false])

const concept = computed(() => getConcept(route.params.id))
const school = computed(() => concept.value ? getSchool(concept.value.school) : null)
const relatedConcepts = computed(() =>
  concept.value ? allConcepts.filter(c => c.school === concept.value.school && c.id !== concept.value.id).slice(0, 6) : []
)

function toTop() {
  window.scrollTo({ top: 0, behavior: 'instant' })
  document.documentElement.scrollTop = 0
  document.body.scrollTop = 0
}

function init() {
  toTop()
  show.value = false
  secVis.value = [false, false, false]
  nextTick(() => {
    toTop()
    requestAnimationFrame(() => {
      show.value = true
      setTimeout(() => {
        const secs = document.querySelectorAll('.concept-page .fade-up')
        const obs = new IntersectionObserver(entries => {
          entries.forEach(e => {
            if (e.isIntersecting) {
              const idx = Array.from(secs).indexOf(e.target)
              if (idx >= 0) secVis.value[idx] = true
            }
          })
        }, { threshold: 0.1 })
        secs.forEach(s => obs.observe(s))
      }, 100)
    })
  })
}

onMounted(init)
watch(() => route.params.id, init)
</script>

<style scoped>
@import '../styles/psyche.css';

.concept-page {
  min-height: 100vh;
  background: var(--p-bg);
}

.top-bar {
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: rgba(250, 249, 246, 0.92);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--p-border);
}

.back-link {
  font-family: var(--font-sans);
  font-size: 0.6875rem;
  font-weight: 500;
  letter-spacing: 0.12em;
  color: var(--p-text-light);
  text-decoration: none;
  transition: color 0.2s;
}
.back-link:hover { color: var(--accent, var(--p-text)); }

.bar-code {
  font-family: var(--font-sans);
  font-size: 0.625rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  color: var(--accent, var(--p-text-light));
}

.page-body {
  max-width: 640px;
  margin: 0 auto;
  padding: 0 2rem 4rem;
}

/* === 头部 === */
.concept-header {
  padding: 3.5rem 0 2.5rem;
  border-bottom: 1px solid var(--p-border);
  margin-bottom: 2rem;
}

.ch-school {
  font-family: var(--font-sans);
  font-size: 0.6875rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  color: var(--accent, var(--p-text-light));
  margin-bottom: 1rem;
}

.ch-title {
  font-family: var(--font-serif);
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 700;
  margin-bottom: 0.25rem;
}

.ch-en {
  font-family: var(--font-sans);
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  color: var(--p-text-light);
}

/* === 区块通用 === */
.sec-head {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
}

.sec-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent, var(--p-text-light));
}

.sec-title {
  font-family: var(--font-sans);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  white-space: nowrap;
}

.sec-line {
  flex: 1;
  height: 1px;
  background: var(--p-border);
  transform-origin: left;
}

.desc-block.visible .sec-line,
.example-block.visible .sec-line,
.related-block.visible .sec-line {
  animation: line-reveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
}

@keyframes line-reveal {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}

/* === 概述 === */
.desc-block {
  margin-bottom: 2.5rem;
}

.desc-text {
  font-family: var(--font-serif);
  font-size: 1.0625rem;
  line-height: 2;
  color: var(--p-text);
}

/* === 例子 === */
.example-block {
  margin-bottom: 2.5rem;
}

.example-card {
  padding: 1.5rem;
  background: var(--p-surface);
  border-left: 3px solid var(--accent, var(--p-border));
  position: relative;
}
.example-card::after {
  content: '';
  position: absolute;
  bottom: 0; right: 0;
  width: 40px; height: 40px;
  border-right: 1px solid var(--accent, var(--p-border));
  border-bottom: 1px solid var(--accent, var(--p-border));
  opacity: 0.3;
}

.example-text {
  font-family: var(--font-serif);
  font-size: 0.9375rem;
  font-style: italic;
  line-height: 1.8;
  color: var(--p-text);
}

/* === 关联概念 === */
.related-block {
  margin-bottom: 2.5rem;
}

.related-list {
  display: flex;
  flex-direction: column;
}

.related-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.875rem 0;
  border-bottom: 1px solid var(--p-border);
  text-decoration: none;
  color: var(--p-text);
  cursor: pointer;
  transition: padding-left 0.25s var(--ease);
}

.related-item:last-child { border-bottom: none; }
.related-item:hover { padding-left: 0.5rem; }

.ri-en {
  font-family: var(--font-sans);
  font-size: 0.625rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  color: var(--accent, var(--p-text-light));
  min-width: 120px;
}

.ri-name {
  font-family: var(--font-serif);
  font-size: 0.9375rem;
  font-weight: 600;
  flex: 1;
}

.ri-arrow {
  font-family: var(--font-sans);
  font-size: 0.75rem;
  font-weight: 300;
  color: var(--p-text-light);
  opacity: 0;
  transform: translateX(-4px);
  transition: all 0.25s var(--ease);
}

.related-item:hover .ri-arrow {
  opacity: 1;
  transform: translateX(0);
}

/* === 底部 === */
.bottom-link {
  display: flex;
  justify-content: space-between;
  padding-top: 2rem;
  border-top: 1px solid var(--p-border);
}

.back-school-btn, .back-home-btn {
  font-family: var(--font-sans);
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  color: var(--p-text-light);
  text-decoration: none;
  transition: color 0.2s;
}

.back-school-btn:hover, .back-home-btn:hover {
  color: var(--accent, var(--p-text));
}

@media (max-width: 768px) {
  .page-body { padding: 0 1.25rem 3rem; }
  .top-bar { padding: 1rem 1.25rem; }
  .ri-en { min-width: auto; display: none; }
}
</style>

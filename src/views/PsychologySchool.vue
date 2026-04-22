<template>
  <div class="school-page" v-if="school">
    <!-- 导航 -->
    <nav class="top-bar">
      <router-link to="/" class="back-link">← ALL SCHOOLS</router-link>
      <span class="bar-code">{{ school.nameEn }}</span>
    </nav>

    <!-- 头部 -->
    <header class="school-header" :style="{ '--accent': school.accent }">
      <div class="header-inner">
        <p class="header-period fade-up" :class="{ visible: show }">{{ school.period }}</p>
        <h1 class="header-title fade-up" :class="{ visible: show }" :style="{ transitionDelay: '0.1s' }">
          {{ school.name }}
        </h1>
        <p class="header-en fade-up" :class="{ visible: show }" :style="{ transitionDelay: '0.15s' }">
          {{ school.nameEn }}
        </p>
        <p class="header-desc fade-up" :class="{ visible: show }" :style="{ transitionDelay: '0.2s' }">
          {{ school.description }}
        </p>
      </div>
    </header>

    <div class="page-body">
      <!-- 提灯者 -->
      <section class="section fade-up" v-if="schoolFigures.length" :class="{ visible: sectionsVis[0] }">
        <div class="sec-head clickable" @click="toggleSection(0)">
          <span class="sec-num">01</span>
          <h2 class="sec-title">提灯者</h2>
          <span class="sec-count">{{ schoolFigures.length }}人</span>
          <span class="sec-line"></span>
          <span class="sec-toggle" :class="{ open: openSections[0] }">+</span>
        </div>
        <div class="sec-body" :class="{ collapsed: !openSections[0] }">
          <div class="figures-list">
            <div
              v-for="fig in schoolFigures"
              :key="fig.id"
              class="fig-row"
              @click="toggleFigure(fig.id)"
            >
              <div class="fig-summary">
                <div class="fig-left">
                  <p class="fig-name">{{ fig.name }}</p>
                  <p class="fig-years">{{ fig.years }}</p>
                </div>
                <p class="fig-quote-short">{{ fig.quote }}</p>
                <span class="fig-toggle">{{ expandedFig === fig.id ? '−' : '+' }}</span>
              </div>
              <div class="fig-detail" v-if="expandedFig === fig.id">
                <div class="fig-detail-inner">
                  <p class="fig-en">{{ fig.nameEn }}</p>
                  <div class="fig-theories" v-if="fig.theories">
                    <span class="fig-label">留下的思想</span>
                    <div class="fig-tags">
                      <span v-for="t in fig.theories" :key="t" class="fig-tag">{{ t }}</span>
                    </div>
                  </div>
                  <p class="fig-contrib">{{ fig.contribution }}</p>
                  <div class="fig-works" v-if="fig.works">
                    <span class="fig-label">写过的书</span>
                    <ul class="fig-works-list">
                      <li v-for="w in fig.works" :key="w">{{ w }}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 他们留下的词语 -->
      <section class="section fade-up" v-if="schoolConcepts.length" :class="{ visible: sectionsVis[1] }">
        <div class="sec-head clickable" @click="toggleSection(1)">
          <span class="sec-num">02</span>
          <h2 class="sec-title">他们留下的词语</h2>
          <span class="sec-count">{{ schoolConcepts.length }}个</span>
          <span class="sec-line"></span>
          <span class="sec-toggle" :class="{ open: openSections[1] }">+</span>
        </div>
        <div class="sec-body" :class="{ collapsed: !openSections[1] }">
          <div class="concepts-list">
            <router-link
              v-for="c in schoolConcepts"
              :key="c.id"
              :to="`/concept/${c.id}`"
              class="concept-row"
            >
              <span class="concept-en">{{ c.nameEn }}</span>
              <span class="concept-name">{{ c.name }}</span>
              <span class="concept-arrow">→</span>
            </router-link>
          </div>
        </div>
      </section>

      <!-- 在控制与偶然之间 -->
      <section class="section fade-up" v-if="schoolExperiments.length" :class="{ visible: sectionsVis[2] }">
        <div class="sec-head clickable" @click="toggleSection(2)">
          <span class="sec-num">03</span>
          <h2 class="sec-title">在控制与偶然之间</h2>
          <span class="sec-count">{{ schoolExperiments.length }}个</span>
          <span class="sec-line"></span>
          <span class="sec-toggle" :class="{ open: openSections[2] }">+</span>
        </div>
        <div class="sec-body" :class="{ collapsed: !openSections[2] }">
          <div class="experiments-list">
            <div v-for="exp in schoolExperiments" :key="exp.id" class="experiment-card">
              <div class="exp-head">
                <span class="exp-year">{{ exp.year }}</span>
                <h3 class="exp-name">{{ exp.name }}</h3>
              </div>
              <p class="exp-en">{{ exp.nameEn }}</p>
              <p class="exp-desc">{{ exp.description }}</p>
              <div class="exp-sig">
                <span class="sig-label">它改变了什么</span>
                <span>{{ exp.significance }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- 底部导航到其他流派 -->
    <div class="bottom-nav">
      <div class="sec-head">
        <h2 class="sec-title">其他的门</h2>
        <span class="sec-line"></span>
      </div>
      <div class="other-schools">
        <router-link
          v-for="s in otherSchools"
          :key="s.id"
          :to="`/school/${s.id}`"
          class="other-card"
          :style="{ '--accent': s.accent }"
        >
          <span class="other-icon">{{ s.icon }}</span>
          <span class="other-name">{{ s.name }}</span>
          <span class="other-arrow">→</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { schools, figures, concepts as allConcepts, experiments as allExperiments, getSchool } from '../data/psychology'

const route = useRoute()
const show = ref(false)
const sectionsVis = ref([false, false, false])
const openSections = reactive([false, false, false])
const expandedFig = ref(null)

const school = computed(() => getSchool(route.params.id))

const schoolFigures = computed(() =>
  school.value ? figures.filter(f => f.school === school.value.id) : []
)
const schoolConcepts = computed(() =>
  school.value ? allConcepts.filter(c => c.school === school.value.id) : []
)
const schoolExperiments = computed(() =>
  school.value ? allExperiments.filter(e => e.school === school.value.id) : []
)
const otherSchools = computed(() =>
  school.value ? schools.filter(s => s.id !== school.value.id) : []
)

function toggleSection(idx) {
  openSections[idx] = !openSections[idx]
}

function toggleFigure(id) {
  expandedFig.value = expandedFig.value === id ? null : id
}

function init() {
  show.value = false
  sectionsVis.value = [false, false, false]
  openSections[0] = false
  openSections[1] = false
  openSections[2] = false
  expandedFig.value = null
  window.scrollTo(0, 0)

  requestAnimationFrame(() => {
    show.value = true
    setTimeout(() => {
      const secs = document.querySelectorAll('.section.fade-up')
      const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            const idx = Array.from(secs).indexOf(e.target)
            if (idx >= 0) sectionsVis.value[idx] = true
          }
        })
      }, { threshold: 0.1 })
      secs.forEach(s => obs.observe(s))
    }, 100)
  })
}

onMounted(init)
watch(() => route.params.id, init)
</script>

<style scoped>
@import '../styles/psyche.css';

.school-page {
  min-height: 100vh;
  background: var(--p-bg);
}

/* === 顶部栏 === */
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
  letter-spacing: 0.15em;
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

/* === 头部 === */
.school-header {
  border-bottom: 1px solid var(--p-border);
}

.header-inner {
  max-width: 720px;
  margin: 0 auto;
  padding: 4rem 2rem 3rem;
}

.header-period {
  font-family: var(--font-sans);
  font-size: 0.6875rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  color: var(--accent);
  margin-bottom: 1rem;
}

.header-title {
  font-family: var(--font-serif);
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 700;
  margin-bottom: 0.25rem;
}

.header-en {
  font-family: var(--font-sans);
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  color: var(--p-text-light);
  margin-bottom: 1.5rem;
}

.header-desc {
  font-family: var(--font-serif);
  font-size: 1.0625rem;
  line-height: 1.8;
  color: var(--p-text-light);
}

/* === 内容 === */
.page-body {
  max-width: 720px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* === 区块 === */
.section {
  padding: 2rem 0;
  border-bottom: 1px solid var(--p-border);
}

.sec-head {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0;
  transition: margin-bottom 0.35s var(--ease);
}

.sec-head.clickable {
  cursor: pointer;
  user-select: none;
  padding: 0.5rem 0;
}

.sec-head.clickable:hover .sec-title {
  color: var(--accent, var(--p-text));
}

.sec-num {
  font-family: var(--font-sans);
  font-size: 0.6875rem;
  font-weight: 700;
  color: var(--accent, var(--p-text-light));
  letter-spacing: 0.05em;
}

.sec-title {
  font-family: var(--font-sans);
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  transition: color 0.2s;
}

.sec-count {
  font-family: var(--font-sans);
  font-size: 0.625rem;
  font-weight: 500;
  color: var(--p-text-light);
  opacity: 0.5;
}

.sec-line {
  flex: 1;
  height: 1px;
  background: var(--p-border);
}

.sec-toggle {
  font-family: var(--font-sans);
  font-size: 0.875rem;
  font-weight: 300;
  color: var(--p-text-light);
  transition: transform 0.3s var(--ease);
  width: 1rem;
  text-align: center;
}

.sec-toggle.open {
  transform: rotate(45deg);
}

/* === 可折叠区块内容 === */
.sec-body {
  overflow: hidden;
  max-height: 2000px;
  opacity: 1;
  transition: max-height 0.5s var(--ease), opacity 0.35s ease, margin-top 0.35s var(--ease);
  margin-top: 1.25rem;
}

.sec-body.collapsed {
  max-height: 0;
  opacity: 0;
  margin-top: 0;
}

/* === 人物列表（折叠式） === */
.figures-list {
  display: flex;
  flex-direction: column;
}

.fig-row {
  border-bottom: 1px solid var(--p-border);
  cursor: pointer;
}

.fig-row:last-child { border-bottom: none; }

.fig-summary {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1rem 0;
  transition: padding-left 0.25s var(--ease);
}

.fig-row:hover .fig-summary {
  padding-left: 0.5rem;
}

.fig-left {
  min-width: 140px;
}

.fig-name {
  font-family: var(--font-serif);
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.125rem;
}

.fig-years {
  font-family: var(--font-sans);
  font-size: 0.625rem;
  font-weight: 500;
  color: var(--accent, var(--p-text-light));
  letter-spacing: 0.1em;
}

.fig-quote-short {
  flex: 1;
  font-family: var(--font-serif);
  font-size: 0.8125rem;
  font-style: italic;
  color: var(--p-text-light);
  line-height: 1.6;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-left: 0.75rem;
  border-left: 2px solid var(--accent, var(--p-border));
}

.fig-toggle {
  font-family: var(--font-sans);
  font-size: 0.8125rem;
  font-weight: 300;
  color: var(--p-text-light);
  opacity: 0;
  transition: opacity 0.25s;
}

.fig-row:hover .fig-toggle { opacity: 1; }

.fig-detail {
  padding: 0 0 1.25rem 0;
  animation: slide-down 0.3s var(--ease);
}

@keyframes slide-down {
  from { opacity: 0; transform: translateY(-8px); }
  to { opacity: 1; transform: translateY(0); }
}

.fig-detail-inner {
  padding: 1.25rem;
  margin-left: 0;
  background: var(--p-surface);
  border: 1px solid var(--p-border);
}

.fig-en {
  font-family: var(--font-sans);
  font-size: 0.6875rem;
  font-weight: 400;
  color: var(--p-text-light);
  letter-spacing: 0.05em;
  margin-bottom: 0.75rem;
}

.fig-label {
  display: block;
  font-family: var(--font-sans);
  font-size: 0.5625rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--accent, var(--p-text-light));
  margin-bottom: 0.5rem;
}

.fig-theories {
  margin-bottom: 1rem;
}

.fig-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
}

.fig-tag {
  font-family: var(--font-sans);
  font-size: 0.6875rem;
  font-weight: 500;
  padding: 0.25rem 0.625rem;
  background: rgba(107, 91, 149, 0.08);
  border: 1px solid rgba(107, 91, 149, 0.15);
  color: var(--p-text);
}

.fig-contrib {
  font-family: var(--font-serif);
  font-size: 0.8125rem;
  line-height: 1.7;
  color: var(--p-text-light);
  margin-bottom: 1rem;
}

.fig-works {
  padding-top: 0.75rem;
  border-top: 1px solid var(--p-border);
}

.fig-works-list {
  list-style: none;
  padding: 0;
}

.fig-works-list li {
  font-family: var(--font-serif);
  font-size: 0.8125rem;
  font-style: italic;
  color: var(--p-text-light);
  padding: 0.25rem 0;
  padding-left: 0.75rem;
  position: relative;
}

.fig-works-list li::before {
  content: '·';
  position: absolute;
  left: 0;
  color: var(--accent, var(--p-text-light));
}

/* === 概念列表（简化） === */
.concepts-list {
  display: flex;
  flex-direction: column;
}

.concept-row {
  display: flex;
  align-items: baseline;
  gap: 1rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--p-border);
  text-decoration: none;
  color: var(--p-text);
  cursor: pointer;
  transition: padding-left 0.3s var(--ease);
}

.concept-row:hover { padding-left: 0.5rem; }
.concept-row:last-child { border-bottom: none; }

.concept-en {
  font-family: var(--font-sans);
  font-size: 0.625rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  color: var(--accent, var(--p-text-light));
  min-width: 140px;
}

.concept-name {
  font-family: var(--font-serif);
  font-size: 0.9375rem;
  font-weight: 600;
  flex: 1;
}

.concept-arrow {
  font-family: var(--font-sans);
  font-weight: 300;
  font-size: 0.875rem;
  color: var(--p-text-light);
  opacity: 0;
  transform: translateX(-4px);
  transition: all 0.25s var(--ease);
}

.concept-row:hover .concept-arrow {
  opacity: 1;
  transform: translateX(0);
  color: var(--accent, var(--p-text));
}

/* === 实验卡片 === */
.experiments-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.experiment-card {
  padding: 1.5rem;
  background: var(--p-surface);
  border: 1px solid var(--p-border);
}

.exp-head {
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
  margin-bottom: 0.25rem;
}

.exp-year {
  font-family: var(--font-sans);
  font-size: 0.625rem;
  font-weight: 600;
  color: var(--accent, var(--p-text-light));
  letter-spacing: 0.1em;
}

.exp-name {
  font-family: var(--font-serif);
  font-size: 1.0625rem;
  font-weight: 600;
}

.exp-en {
  font-family: var(--font-sans);
  font-size: 0.6875rem;
  font-weight: 400;
  color: var(--p-text-light);
  letter-spacing: 0.05em;
  margin-bottom: 1rem;
}

.exp-desc {
  font-family: var(--font-serif);
  font-size: 0.875rem;
  line-height: 1.8;
  color: var(--p-text);
  margin-bottom: 1rem;
}

.exp-sig {
  font-family: var(--font-serif);
  font-size: 0.8125rem;
  line-height: 1.7;
  color: var(--p-text-light);
  padding-top: 1rem;
  border-top: 1px solid var(--p-border);
}

.sig-label {
  font-family: var(--font-sans);
  font-size: 0.5625rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  color: var(--accent, var(--p-text-light));
  margin-right: 0.5rem;
}

/* === 底部其他流派 === */
.bottom-nav {
  max-width: 720px;
  margin: 0 auto;
  padding: 3rem 2rem 4rem;
}

.other-schools {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 0.75rem;
}

.other-card {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: var(--p-card);
  border: 1px solid var(--p-border);
  text-decoration: none;
  color: var(--p-text);
  cursor: pointer;
  transition: all 0.25s var(--ease);
}

.other-card:hover {
  border-color: var(--accent);
  transform: translateY(-2px);
}

.other-icon { font-size: 1.125rem; }
.other-name {
  font-family: var(--font-serif);
  font-size: 0.875rem;
  font-weight: 600;
  flex: 1;
}
.other-arrow {
  font-family: var(--font-sans);
  font-size: 0.75rem;
  font-weight: 300;
  color: var(--p-text-light);
  opacity: 0;
  transition: all 0.25s var(--ease);
}
.other-card:hover .other-arrow { opacity: 1; }

/* === 响应式 === */
@media (max-width: 768px) {
  .top-bar { padding: 1rem 1.25rem; }
  .header-inner { padding: 2.5rem 1.25rem 2rem; }
  .page-body { padding: 0 1.25rem; }
  .fig-summary { flex-direction: column; align-items: flex-start; gap: 0.5rem; }
  .fig-left { min-width: auto; }
  .fig-quote-short { white-space: normal; }
  .concept-row { flex-direction: column; align-items: flex-start; gap: 0.25rem; }
  .concept-en { min-width: auto; }
  .bottom-nav { padding: 2rem 1.25rem 3rem; }
}
</style>

<template>
  <div class="school" v-if="school">
    <!-- 导航 -->
    <nav class="s-nav">
      <router-link to="/hall" class="s-back">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M12 8H4M4 8L7 5M4 8L7 11" stroke="currentColor" stroke-width="1"/>
        </svg>
        <span>BACK</span>
      </router-link>
      <span class="s-label">{{ school.nameEn }}</span>
      <span class="s-dot" :style="{ background: school.accent }"></span>
    </nav>

    <!-- 英雄区 -->
    <header class="s-hero" :style="{ '--accent': school.accent }">
      <div class="hero-glow"></div>
      <div class="hero-grain"></div>

      <div class="hero-inner fade-up" :class="{ visible: show }">
        <div class="hero-meta">
          <span class="hero-era">{{ school.period }}</span>
          <span class="hero-icon">{{ school.icon }}</span>
        </div>
        <h1 class="hero-name">{{ school.name }}</h1>
        <p class="hero-en">{{ school.nameEn }}</p>
        <div class="hero-divider"></div>
        <p class="hero-desc">{{ school.description }}</p>
      </div>
    </header>

    <!-- 内容流 -->
    <div class="s-flow" :style="{ '--accent': school.accent }">

      <!-- 提灯者 -->
      <section class="flow-section" v-if="schoolFigures.length">
        <div class="sec-header">
          <div class="sec-label">
            <span class="sec-num">01</span>
            <span class="sec-divider"></span>
            <span class="sec-title">提灯者</span>
          </div>
          <p class="sec-poem">他们举起火把，照进内心的暗处</p>
        </div>

        <div class="figures">
          <router-link
            v-for="(fig, i) in schoolFigures"
            :key="fig.id"
            :to="`/figure/${fig.id}`"
            class="figure-card fade-up"
            :class="{ visible: show }"
            :style="{ transitionDelay: (0.3 + i * 0.12) + 's' }"
          >
            <div class="fig-glow"></div>
            <p class="fig-quote">"{{ fig.quote }}"</p>
            <div class="fig-meta">
              <span class="fig-name">{{ fig.name }}</span>
              <span class="fig-arrow">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 7H11M11 7L8 4M11 7L8 10" stroke="currentColor" stroke-width="1"/>
                </svg>
              </span>
              <span class="fig-years">{{ fig.years }}</span>
            </div>
          </router-link>
        </div>
      </section>

      <!-- 词语 -->
      <section class="flow-section" v-if="schoolConcepts.length">
        <div class="sec-header">
          <div class="sec-label">
            <span class="sec-num">02</span>
            <span class="sec-divider"></span>
            <span class="sec-title">他们留下的词语</span>
          </div>
          <p class="sec-poem">每一个词，都是一扇被推开的门</p>
        </div>

        <div class="concepts-cloud">
          <router-link
            v-for="c in schoolConcepts"
            :key="c.id"
            :to="`/concept/${c.id}`"
            class="concept-word"
          >
            {{ c.name }}
          </router-link>
        </div>
      </section>

      <!-- 实验 -->
      <section class="flow-section" v-if="schoolExperiments.length">
        <div class="sec-header">
          <div class="sec-label">
            <span class="sec-num">03</span>
            <span class="sec-divider"></span>
            <span class="sec-title">在控制与偶然之间</span>
          </div>
          <p class="sec-poem">他们设计实验，像设计一场冒险</p>
        </div>

        <div class="experiments">
          <div v-for="exp in schoolExperiments" :key="exp.id" class="exp-block">
            <div class="exp-head">
              <span class="exp-year">{{ exp.year }}</span>
              <h3 class="exp-name">{{ exp.name }}</h3>
            </div>
            <p class="exp-name-en">{{ exp.nameEn }}</p>
            <p class="exp-body">{{ exp.description }}</p>
            <div class="exp-impact">
              <span class="impact-tag">它改变了什么</span>
              <span class="impact-text">{{ exp.significance }}</span>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- 其他的门 -->
    <div class="s-other" :style="{ '--accent': school.accent }">
      <p class="other-title">其他的门</p>
      <div class="other-grid">
        <router-link
          v-for="s in otherSchools"
          :key="s.id"
          :to="`/school/${s.id}`"
          class="other-door"
          :style="{ '--accent': s.accent }"
        >
          <span class="door-num">{{ s.icon }}</span>
          <span class="door-name">{{ s.name }}</span>
          <span class="door-go">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M3 6H9M9 6L7 4M9 6L7 8" stroke="currentColor" stroke-width="1"/>
            </svg>
          </span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { schools, figures, concepts as allConcepts, experiments as allExperiments, getSchool } from '../data/psychology'

const route = useRoute()
const show = ref(false)

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

function toTop() {
  window.scrollTo({ top: 0, behavior: 'instant' })
  document.documentElement.scrollTop = 0
  document.body.scrollTop = 0
}

function init() {
  toTop()
  show.value = false
  nextTick(() => {
    toTop()
    requestAnimationFrame(() => show.value = true)
  })
}

onMounted(init)
watch(() => route.params.id, init)
</script>

<style scoped>
.school { min-height: 100vh; background: var(--p-bg); }

/* ===== 导航 ===== */
.s-nav {
  position: sticky; top: 0; z-index: 100;
  display: flex; justify-content: space-between; align-items: center;
  padding: 1.25rem 2rem;
  background: rgba(10, 10, 11, 0.8);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border-bottom: 1px solid var(--p-border);
}

.s-back {
  display: flex; align-items: center; gap: 0.5rem;
  font-family: var(--font-mono); font-size: 0.5rem;
  letter-spacing: 0.2em;
  color: var(--p-text-ghost); text-decoration: none;
  transition: color 0.2s;
}
.s-back:hover { color: var(--p-text); }

.s-label {
  font-family: var(--font-mono);
  font-size: 0.5rem; font-weight: 400;
  letter-spacing: 0.4em; color: var(--p-text-ghost);
}

.s-dot {
  width: 6px; height: 6px; border-radius: 50%;
  animation: breathe 4s ease-in-out infinite;
}

/* ===== 英雄区 ===== */
.s-hero {
  position: relative;
  overflow: hidden;
  border-bottom: 1px solid var(--p-border);
}

.hero-glow {
  position: absolute;
  width: 700px; height: 700px;
  border-radius: 50%;
  background: radial-gradient(circle, var(--accent), transparent 70%);
  opacity: 0.05;
  top: -300px; right: -200px;
  animation: breathe-deep 10s ease-in-out infinite;
  filter: blur(60px);
}

.hero-grain {
  position: absolute; inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
  opacity: 0.4;
  pointer-events: none;
}

.hero-inner {
  position: relative; z-index: 1;
  max-width: 640px;
  margin: 0 auto;
  padding: 6rem 2rem 5rem;
}

.hero-meta {
  display: flex; align-items: center; gap: 0.75rem;
  margin-bottom: 2rem;
}

.hero-era {
  font-family: var(--font-mono);
  font-size: 0.5rem; font-weight: 400;
  letter-spacing: 0.25em; color: var(--accent);
}

.hero-icon {
  font-size: 0.75rem;
  animation: float 6s ease-in-out infinite;
}

.hero-name {
  font-family: var(--font-serif);
  font-size: clamp(3rem, 8vw, 5rem);
  font-weight: 200;
  letter-spacing: 0.12em;
  color: var(--p-text-bright);
  margin-bottom: 0.5rem;
}

.hero-en {
  font-family: var(--font-display);
  font-size: clamp(0.875rem, 1.5vw, 1.125rem);
  font-weight: 400;
  font-style: italic;
  letter-spacing: 0.08em;
  color: var(--p-text-ghost);
  margin-bottom: 2rem;
}

.hero-divider {
  width: 32px; height: 1px;
  background: var(--accent);
  opacity: 0.4;
  margin-bottom: 2rem;
  animation: line-grow 1.2s var(--ease) both;
  animation-delay: 0.5s;
}

.hero-desc {
  font-family: var(--font-serif);
  font-size: 1.0625rem;
  line-height: 2.2;
  color: var(--p-text-mid);
}

/* ===== 内容流 ===== */
.s-flow {
  max-width: 640px;
  margin: 0 auto;
  padding: 0 2rem;
}

.flow-section {
  padding: 4rem 0;
  border-bottom: 1px solid var(--p-border);
}

/* 区块标签 */
.sec-header { margin-bottom: 3rem; }

.sec-label {
  display: flex; align-items: center; gap: 0.75rem;
  margin-bottom: 0.5rem;
}

.sec-num {
  font-family: var(--font-mono);
  font-size: 1.5rem; font-weight: 400;
  color: var(--accent); opacity: 0.4;
}

.sec-divider {
  display: block;
  width: 16px; height: 1px;
  background: var(--accent);
  opacity: 0.3;
}

.sec-title {
  font-family: var(--font-mono);
  font-size: 0.5625rem; font-weight: 400;
  letter-spacing: 0.25em; text-transform: uppercase;
  color: var(--p-text-mid);
}

.sec-poem {
  font-family: var(--font-serif);
  font-size: 0.875rem;
  font-weight: 300;
  font-style: italic;
  color: var(--p-text-ghost);
}

/* ===== 人物 ===== */
.figures {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.figure-card {
  display: block;
  text-decoration: none;
  color: var(--p-text);
  cursor: pointer;
  padding: 2rem;
  background: var(--p-bg-card);
  border: 1px solid var(--p-border);
  position: relative;
  overflow: hidden;
  transition: border-color 0.4s, transform 0.4s var(--ease);
}

.figure-card:hover {
  border-color: var(--accent);
  transform: translateY(-2px);
}

.fig-glow {
  position: absolute;
  top: -50%; right: -50%;
  width: 200px; height: 200px;
  border-radius: 50%;
  background: radial-gradient(circle, var(--accent), transparent 70%);
  opacity: 0;
  filter: blur(40px);
  transition: opacity 0.5s;
  pointer-events: none;
}

.figure-card:hover .fig-glow { opacity: 0.08; }

.fig-quote {
  font-family: var(--font-serif);
  font-size: clamp(1rem, 2vw, 1.25rem);
  font-weight: 400;
  line-height: 2;
  color: var(--p-text);
  margin-bottom: 1.5rem;
  transition: color 0.3s;
}

.figure-card:hover .fig-quote { color: var(--accent); }

.fig-meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.fig-name {
  font-family: var(--font-serif);
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--p-text-mid);
}

.fig-arrow {
  color: var(--accent);
  opacity: 0;
  transform: translateX(-4px);
  transition: opacity 0.3s, transform 0.3s var(--ease);
}

.figure-card:hover .fig-arrow {
  opacity: 0.6;
  transform: translateX(0);
}

.fig-years {
  font-family: var(--font-mono);
  font-size: 0.5rem; font-weight: 400;
  letter-spacing: 0.15em;
  color: var(--p-text-ghost);
  margin-left: auto;
}

/* ===== 概念云 ===== */
.concepts-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 0.625rem;
}

.concept-word {
  display: inline-block;
  font-family: var(--font-serif);
  font-size: 0.875rem;
  font-weight: 400;
  color: var(--p-text-mid);
  text-decoration: none;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border: 1px solid var(--p-border-strong);
  transition: all 0.3s var(--ease);
}

.concept-word:hover {
  color: var(--accent);
  border-color: var(--accent);
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.02);
}

/* ===== 实验 ===== */
.experiments {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.exp-block {
  padding: 2rem;
  background: var(--p-bg-card);
  border-left: 2px solid var(--accent);
  border: 1px solid var(--p-border);
  border-left: 2px solid var(--accent);
  transition: background 0.3s;
}

.exp-block:hover {
  background: var(--p-bg-hover);
}

.exp-head {
  display: flex; align-items: baseline; gap: 1rem;
  margin-bottom: 0.25rem;
}

.exp-year {
  font-family: var(--font-mono);
  font-size: 0.5rem; font-weight: 400;
  letter-spacing: 0.2em; color: var(--accent);
}

.exp-name {
  font-family: var(--font-serif);
  font-size: 1.125rem; font-weight: 500;
  color: var(--p-text);
}

.exp-name-en {
  font-family: var(--font-display);
  font-size: 0.75rem; font-weight: 400;
  font-style: italic; color: var(--p-text-ghost);
  letter-spacing: 0.04em; margin-bottom: 1.25rem;
}

.exp-body {
  font-family: var(--font-serif);
  font-size: 0.9375rem;
  line-height: 2; color: var(--p-text-mid); margin-bottom: 1.25rem;
}

.exp-impact {
  padding-top: 1rem;
  border-top: 1px solid var(--p-border);
  font-family: var(--font-serif);
  font-size: 0.8125rem;
  line-height: 1.9; color: var(--p-text-mid);
}

.impact-tag {
  font-family: var(--font-mono);
  font-size: 0.4375rem; font-weight: 400;
  letter-spacing: 0.2em; color: var(--accent);
  margin-right: 0.5rem;
  text-transform: uppercase;
}

/* ===== 其他的门 ===== */
.s-other {
  max-width: 640px;
  margin: 0 auto;
  padding: 4rem 2rem 5rem;
}

.other-title {
  font-family: var(--font-serif);
  font-size: 0.875rem; font-weight: 300;
  font-style: italic; color: var(--p-text-ghost);
  margin-bottom: 1.5rem;
}

.other-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 0.75rem;
}

.other-door {
  display: flex; align-items: center; gap: 0.5rem;
  padding: 1rem;
  text-decoration: none; color: var(--p-text);
  cursor: pointer;
  border: 1px solid var(--p-border);
  transition: all 0.3s var(--ease);
}

.other-door:hover {
  border-color: var(--accent);
  transform: translateY(-2px);
  background: var(--p-bg-card);
}

.door-num {
  font-size: 0.75rem;
  opacity: 0.4;
}

.door-name {
  font-family: var(--font-serif);
  font-size: 0.875rem; font-weight: 400;
  flex: 1;
}

.door-go {
  color: var(--accent);
  opacity: 0; transition: opacity 0.3s;
}

.other-door:hover .door-go { opacity: 0.7; }

@media (max-width: 768px) {
  .hero-inner { padding: 3rem 1.25rem 2.5rem; }
  .s-flow { padding: 0 1.25rem; }
  .flow-section { padding: 2.5rem 0; }
  .figure-card { padding: 1.5rem; }
  .s-other { padding: 2.5rem 1.25rem 4rem; }
}
</style>

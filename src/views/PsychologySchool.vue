<template>
  <div class="school" v-if="school" :class="`school-${school.id}`" :style="{ '--accent': school.accent }">

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

    <!-- ===== 1. 沉浸式全屏 Hero ===== -->
    <header class="s-hero fade-up" :class="{ visible: show }">
      <!-- 流派特有大气效果 -->
      <div class="atmosphere" :class="`atmo-${school.id}`">
        <div class="atmo-layer atmo-a"></div>
        <div class="atmo-layer atmo-b"></div>
        <div class="atmo-layer atmo-c"></div>
      </div>

      <!-- 纹理叠加 -->
      <div class="atmo-grain"></div>

      <div class="hero-inner">
        <div class="hero-meta">
          <span class="hero-era">{{ school.period }}</span>
          <span class="hero-icon">{{ school.icon }}</span>
        </div>
        <h1 class="hero-name">
          <span v-for="(c, i) in schoolNameChars" :key="i"
                class="name-char"
                :class="{ visible: show }"
                :style="{ transitionDelay: (0.3 + i * 0.08) + 's' }"
          >{{ c }}</span>
        </h1>
        <p class="hero-en fade-up" :class="{ visible: show }" :style="{ transitionDelay: '1s' }">
          {{ school.nameEn }}
        </p>
        <div class="hero-divider fade-up" :class="{ visible: show }" :style="{ transitionDelay: '1.2s' }"></div>
        <p class="hero-desc fade-up" :class="{ visible: show }" :style="{ transitionDelay: '1.4s' }">
          {{ school.description }}
        </p>
      </div>

      <!-- 滚动提示 -->
      <div class="hero-scroll fade-up" :class="{ visible: show }" :style="{ transitionDelay: '2s' }">
        <span class="scroll-line"></span>
      </div>
    </header>

    <!-- ===== 2. 全屏引言插曲页 ===== -->
    <section class="s-verse" ref="verseSection" :class="{ visible: verseVisible }">
      <div class="verse-glow"></div>
      <div class="verse-content">
        <div class="verse-quote-mark">"</div>
        <p class="verse-text">{{ school.heroQuote.text }}</p>
        <div class="verse-line"></div>
        <p class="verse-author">{{ school.heroQuote.figure }}</p>
        <p class="verse-years">{{ school.heroQuote.years }}</p>
      </div>
    </section>

    <!-- ===== 3. 人物画廊 ===== -->
    <section class="s-section s-figures" v-if="schoolFigures.length">
      <div class="sec-header fade-up" :class="{ visible: secVis[0] }">
        <div class="sec-label">
          <span class="sec-num">01</span>
          <span class="sec-divider"></span>
          <span class="sec-title">提灯者</span>
        </div>
        <p class="sec-poem">他们举起火把，照进内心的暗处</p>
      </div>

      <div class="figures-grid">
        <router-link
          v-for="(fig, i) in schoolFigures"
          :key="fig.id"
          :to="`/figure/${fig.id}`"
          class="figure-card fade-up"
          :class="{ visible: secVis[0] }"
          :style="{ transitionDelay: (0.2 + i * 0.1) + 's' }"
        >
          <div class="fig-glow"></div>
          <p class="fig-quote">"{{ fig.quote }}"</p>
          <div class="fig-bottom">
            <div class="fig-info">
              <span class="fig-name">{{ fig.name }}</span>
              <span class="fig-years">{{ fig.years }}</span>
            </div>
            <span class="fig-go">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 7H11M11 7L8 4M11 7L8 10" stroke="currentColor" stroke-width="1"/>
              </svg>
            </span>
          </div>
        </router-link>
      </div>
    </section>

    <!-- ===== 4. 诗意过渡 ===== -->
    <section class="s-poem-bridge fade-up" :class="{ visible: secVis[1] }">
      <div class="bridge-line bridge-line-top"></div>
      <p class="bridge-text">{{ school.heroPoem }}</p>
      <div class="bridge-line bridge-line-bottom"></div>
    </section>

    <!-- ===== 5. 概念星座 ===== -->
    <section class="s-section s-concepts" v-if="schoolConcepts.length">
      <div class="sec-header fade-up" :class="{ visible: secVis[2] }">
        <div class="sec-label">
          <span class="sec-num">02</span>
          <span class="sec-divider"></span>
          <span class="sec-title">他们留下的词语</span>
        </div>
        <p class="sec-poem">每一个词，都是一扇被推开的门</p>
      </div>

      <div class="constellation">
        <router-link
          v-for="(c, i) in schoolConcepts"
          :key="c.id"
          :to="`/concept/${c.id}`"
          class="constellation-node fade-up"
          :class="[
            { visible: secVis[2], 'node-core': i < 3, 'node-satellite': i >= 3 },
          ]"
          :style="{
            transitionDelay: (0.1 + i * 0.06) + 's',
            '--node-size': i < 3 ? '1' : (0.7 + Math.random() * 0.3).toFixed(2),
          }"
        >
          {{ c.name }}
        </router-link>
      </div>
    </section>

    <!-- ===== 6. 实验剧场 ===== -->
    <section class="s-section s-experiments" v-if="schoolExperiments.length">
      <div class="sec-header fade-up" :class="{ visible: secVis[3] }">
        <div class="sec-label">
          <span class="sec-num">03</span>
          <span class="sec-divider"></span>
          <span class="sec-title">在控制与偶然之间</span>
        </div>
        <p class="sec-poem">他们设计实验，像设计一场冒险</p>
      </div>

      <div class="experiments">
        <div v-for="(exp, i) in schoolExperiments" :key="exp.id"
             class="exp-card fade-up"
             :class="{ visible: secVis[3] }"
             :style="{ transitionDelay: (0.2 + i * 0.15) + 's' }">
          <div class="exp-year-bg">{{ exp.year }}</div>
          <div class="exp-content">
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
      </div>
    </section>

    <!-- ===== 其他的门 ===== -->
    <section class="s-other">
      <p class="other-title fade-up" :class="{ visible: secVis[4] }">其他的门</p>
      <div class="other-grid">
        <router-link
          v-for="(s, i) in otherSchools"
          :key="s.id"
          :to="`/school/${s.id}`"
          class="other-door fade-up"
          :class="{ visible: secVis[4] }"
          :style="{ '--accent': s.accent, transitionDelay: (0.1 + i * 0.08) + 's' }"
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
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { schools, figures, concepts as allConcepts, experiments as allExperiments, getSchool } from '../data/psychology'

const route = useRoute()
const show = ref(false)
const verseVisible = ref(false)
const secVis = ref([false, false, false, false, false])
const verseSection = ref(null)

const school = computed(() => getSchool(route.params.id))
const schoolNameChars = computed(() => school.value ? school.value.name.split('') : [])
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
  verseVisible.value = false
  secVis.value = [false, false, false, false, false]
  nextTick(() => {
    toTop()
    requestAnimationFrame(() => {
      show.value = true
      setupObservers()
    })
  })
}

function setupObservers() {
  // 引言插曲页观察
  if (verseSection.value) {
    const verseObs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) verseVisible.value = true
    }, { threshold: 0.3 })
    verseObs.observe(verseSection.value)
  }

  // 各区块观察
  const secs = document.querySelectorAll('.school .s-section, .school .s-poem-bridge, .school .s-other')
  const secObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const idx = Array.from(secs).indexOf(e.target)
        if (idx >= 0 && idx < secVis.value.length) secVis.value[idx] = true
      }
    })
  }, { threshold: 0.1 })
  secs.forEach(s => secObs.observe(s))
}

onMounted(init)
watch(() => route.params.id, init)
</script>

<style scoped>
.school { min-height: 100vh; background: var(--p-bg); }

/* ===== 导航 ===== */
.s-nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 100;
  display: flex; justify-content: space-between; align-items: center;
  padding: 1.25rem 2rem;
  background: rgba(10, 10, 11, 0.7);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border-bottom: 1px solid var(--p-border);
  transition: background 0.4s;
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

/* ===== 1. 全屏 Hero ===== */
.s-hero {
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.atmosphere {
  position: absolute; inset: 0;
  pointer-events: none;
}

.atmo-layer {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
}

/* -- 精神分析：水下波纹 -- */
.atmo-psychoanalysis .atmo-a {
  width: 700px; height: 700px;
  background: radial-gradient(circle, var(--accent), transparent 70%);
  opacity: 0.07;
  top: -20%; right: -10%;
  animation: water-ripple 12s ease-in-out infinite;
}
.atmo-psychoanalysis .atmo-b {
  width: 400px; height: 400px;
  background: radial-gradient(circle, var(--accent), transparent 70%);
  opacity: 0.04;
  bottom: -10%; left: -5%;
  animation: water-ripple 9s ease-in-out infinite;
  animation-delay: 3s;
}
.atmo-psychoanalysis .atmo-c {
  width: 250px; height: 250px;
  background: radial-gradient(circle, #8B7BB4, transparent 70%);
  opacity: 0.03;
  top: 40%; left: 50%;
  animation: water-ripple 7s ease-in-out infinite;
  animation-delay: 5s;
}

/* -- 行为主义：金色刻度 -- */
.atmo-behaviorism .atmo-a {
  width: 500px; height: 500px;
  background: radial-gradient(circle, var(--accent), transparent 70%);
  opacity: 0.06;
  top: -15%; left: 30%;
  animation: breathe-deep 10s ease-in-out infinite;
}
.atmo-behaviorism .atmo-b {
  width: 300px; height: 300px;
  background: radial-gradient(circle, var(--accent), transparent 70%);
  opacity: 0.04;
  bottom: 10%; right: -5%;
  animation: breathe-deep 8s ease-in-out infinite;
  animation-delay: 2s;
}
.atmo-behaviorism .atmo-c { display: none; }
.school-behaviorism .s-hero::before {
  content: '';
  position: absolute;
  left: 3rem; top: 0; bottom: 0;
  width: 1px;
  background: repeating-linear-gradient(
    to bottom, var(--accent) 0px, var(--accent) 1px,
    transparent 1px, transparent 24px
  );
  opacity: 0.15;
  animation: ruler-grow 2s var(--ease) both;
  animation-delay: 0.5s;
  transform-origin: top;
}

/* -- 人本主义：森林光斑 -- */
.atmo-humanistic .atmo-a {
  width: 600px; height: 600px;
  background: radial-gradient(ellipse at 30% 40%, var(--accent), transparent 60%);
  opacity: 0.06;
  top: -10%; left: -5%;
  animation: forest-dapple 14s ease-in-out infinite;
}
.atmo-humanistic .atmo-b {
  width: 350px; height: 350px;
  background: radial-gradient(ellipse at 70% 60%, var(--accent), transparent 60%);
  opacity: 0.04;
  bottom: -5%; right: 0%;
  animation: forest-dapple 10s ease-in-out infinite;
  animation-delay: 4s;
}
.atmo-humanistic .atmo-c {
  width: 200px; height: 200px;
  background: radial-gradient(circle, #7DB89A, transparent 70%);
  opacity: 0.03;
  top: 50%; left: 60%;
  animation: forest-dapple 8s ease-in-out infinite;
  animation-delay: 6s;
}

/* -- 认知：蓝图网格 + 扫描线 -- */
.atmo-cognitive .atmo-a {
  width: 500px; height: 500px;
  background: radial-gradient(circle, var(--accent), transparent 70%);
  opacity: 0.05;
  top: -10%; right: -10%;
  animation: breathe-deep 10s ease-in-out infinite;
}
.atmo-cognitive .atmo-b {
  width: 300px; height: 300px;
  background: radial-gradient(circle, var(--accent), transparent 70%);
  opacity: 0.03;
  bottom: 5%; left: 10%;
  animation: breathe-deep 8s ease-in-out infinite;
  animation-delay: 3s;
}
.atmo-cognitive .atmo-c { display: none; }
.school-cognitive .s-hero {
  background-image:
    linear-gradient(rgba(74,144,164,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(74,144,164,0.03) 1px, transparent 1px);
  background-size: 40px 40px;
}
.school-cognitive .s-hero::after {
  content: '';
  position: absolute;
  left: 0; right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent 10%, var(--accent), transparent 90%);
  opacity: 0.2;
  animation: scan-down 6s linear infinite;
}

/* -- 发展：时间轴 + 里程碑 -- */
.atmo-developmental .atmo-a {
  width: 400px; height: 400px;
  background: radial-gradient(circle, var(--accent), transparent 70%);
  opacity: 0.05;
  top: -10%; right: 20%;
  animation: breathe-deep 10s ease-in-out infinite;
}
.atmo-developmental .atmo-b {
  width: 300px; height: 300px;
  background: radial-gradient(circle, var(--accent), transparent 70%);
  opacity: 0.03;
  bottom: 10%; left: 5%;
  animation: breathe-deep 8s ease-in-out infinite;
  animation-delay: 4s;
}
.atmo-developmental .atmo-c { display: none; }
.school-developmental .s-hero::before {
  content: '';
  position: absolute;
  left: 50%; top: 0; bottom: 0;
  width: 1px;
  background: linear-gradient(to bottom, transparent 10%, var(--accent) 30%, var(--accent) 70%, transparent 90%);
  opacity: 0.12;
}
.school-developmental .s-hero::after {
  content: '';
  position: absolute;
  width: 8px; height: 8px;
  border-radius: 50%;
  background: var(--accent);
  top: 30%; left: 50%;
  animation: milestone-pulse 4s ease-in-out infinite;
  box-shadow: 0 0 20px var(--accent);
}

/* -- 社会：多重聚光灯 -- */
.atmo-social .atmo-a {
  width: 400px; height: 400px;
  background: radial-gradient(circle at 20% 30%, var(--accent), transparent 60%);
  opacity: 0.06;
  top: -10%; left: -5%;
  animation: spotlight-pan 15s ease-in-out infinite;
}
.atmo-social .atmo-b {
  width: 350px; height: 350px;
  background: radial-gradient(circle at 80% 60%, var(--accent), transparent 60%);
  opacity: 0.05;
  bottom: -5%; right: -5%;
  animation: spotlight-pan 12s ease-in-out infinite;
  animation-delay: 3s;
}
.atmo-social .atmo-c {
  width: 250px; height: 250px;
  background: radial-gradient(circle at 50% 20%, var(--accent), transparent 60%);
  opacity: 0.03;
  top: 20%; left: 40%;
  animation: spotlight-pan 10s ease-in-out infinite;
  animation-delay: 7s;
}

/* 噪点纹理 */
.atmo-grain {
  position: absolute; inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
  opacity: 0.4;
  pointer-events: none;
}

.hero-inner {
  position: relative; z-index: 2;
  max-width: 640px;
  text-align: center;
  padding: 0 2rem;
}

.hero-meta {
  display: flex; align-items: center; gap: 0.75rem;
  justify-content: center;
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
  font-size: clamp(3.5rem, 10vw, 6rem);
  font-weight: 200;
  letter-spacing: 0.12em;
  line-height: 1.15;
  margin-bottom: 0.75rem;
}

.name-char {
  display: inline-block;
  color: var(--p-text-bright);
  opacity: 0;
  transform: translateY(30px) scale(0.95);
  filter: blur(6px);
  transition: opacity 0.8s var(--ease), transform 0.8s var(--ease), filter 0.8s var(--ease);
}
.name-char.visible {
  opacity: 1;
  transform: translateY(0) scale(1);
  filter: blur(0);
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
  margin: 0 auto 2rem;
}

.hero-desc {
  font-family: var(--font-serif);
  font-size: 1.0625rem;
  line-height: 2.2;
  color: var(--p-text-mid);
}

.hero-scroll {
  position: absolute;
  bottom: 2rem; left: 50%;
  transform: translateX(-50%);
}
.scroll-line {
  display: block;
  width: 1px; height: 40px;
  background: linear-gradient(to bottom, var(--p-text-ghost), transparent);
  animation: breathe 3s ease-in-out infinite;
}

/* ===== 2. 全屏引言插曲 ===== */
.s-verse {
  position: relative;
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.verse-glow {
  position: absolute;
  width: 500px; height: 500px;
  border-radius: 50%;
  background: radial-gradient(circle, var(--accent), transparent 70%);
  opacity: 0;
  filter: blur(80px);
  animation: breathe-deep 10s ease-in-out infinite;
  pointer-events: none;
  transition: opacity 1s var(--ease);
}
.s-verse.visible .verse-glow { opacity: 0.05; }

.verse-content {
  position: relative; z-index: 2;
  max-width: 640px;
  text-align: center;
  padding: 4rem 2rem;
  opacity: 0;
  transform: translateY(40px);
  filter: blur(12px);
  transition: opacity 1.5s var(--ease), transform 1.5s var(--ease), filter 1.5s var(--ease);
}
.s-verse.visible .verse-content {
  opacity: 1;
  transform: translateY(0);
  filter: blur(0);
}

.verse-quote-mark {
  font-family: var(--font-display);
  font-size: 6rem;
  line-height: 1;
  color: var(--accent);
  opacity: 0.12;
  margin-bottom: -1.5rem;
}

.verse-text {
  font-family: var(--font-serif);
  font-size: clamp(1.5rem, 3.5vw, 2.25rem);
  font-weight: 300;
  line-height: 2;
  color: var(--p-text);
  letter-spacing: 0.04em;
  margin-bottom: 2.5rem;
}

.verse-line {
  width: 32px; height: 1px;
  background: var(--accent);
  opacity: 0.3;
  margin: 0 auto 1.5rem;
}

.verse-author {
  font-family: var(--font-serif);
  font-size: 0.9375rem;
  font-weight: 500;
  color: var(--p-text-mid);
  margin-bottom: 0.25rem;
}

.verse-years {
  font-family: var(--font-mono);
  font-size: 0.5rem;
  letter-spacing: 0.2em;
  color: var(--p-text-ghost);
}

/* ===== 3. 人物画廊 ===== */
.s-section {
  max-width: 960px;
  margin: 0 auto;
  padding: 0 2rem;
}

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

.figures-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.25rem;
}

.figure-card {
  display: flex;
  flex-direction: column;
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
  transform: translateY(-3px);
}

.fig-glow {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
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
  font-size: clamp(0.9375rem, 1.5vw, 1.0625rem);
  font-weight: 400;
  font-style: italic;
  line-height: 2;
  color: var(--p-text);
  margin-bottom: 1.5rem;
  flex: 1;
  transition: color 0.3s;
}
.figure-card:hover .fig-quote { color: var(--accent); }

.fig-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.fig-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.fig-name {
  font-family: var(--font-serif);
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--p-text-mid);
}

.fig-years {
  font-family: var(--font-mono);
  font-size: 0.5rem; font-weight: 400;
  letter-spacing: 0.15em;
  color: var(--p-text-ghost);
}

.fig-go {
  color: var(--accent);
  opacity: 0;
  transform: translateX(-4px);
  transition: opacity 0.3s, transform 0.3s var(--ease);
}
.figure-card:hover .fig-go {
  opacity: 0.6;
  transform: translateX(0);
}

/* ===== 4. 诗意过渡 ===== */
.s-poem-bridge {
  max-width: 960px;
  margin: 0 auto;
  padding: 5rem 2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.bridge-line {
  width: 40px; height: 1px;
  background: linear-gradient(90deg, transparent, var(--p-text-ghost), transparent);
  opacity: 0.3;
}

.bridge-text {
  font-family: var(--font-serif);
  font-size: 0.9375rem;
  font-weight: 300;
  font-style: italic;
  color: var(--p-text-ghost);
  letter-spacing: 0.06em;
}

/* ===== 5. 概念星座 ===== */
.constellation {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: center;
}

.constellation-node {
  display: inline-block;
  text-decoration: none;
  cursor: pointer;
  font-family: var(--font-serif);
  font-weight: 400;
  color: var(--p-text-mid);
  border: 1px solid var(--p-border-strong);
  transition: all 0.3s var(--ease);
  position: relative;
}

.constellation-node.node-core {
  font-size: 1rem;
  padding: 0.625rem 1.25rem;
}

.constellation-node.node-satellite {
  font-size: calc(0.8rem * var(--node-size));
  padding: calc(0.4rem * var(--node-size)) calc(0.875rem * var(--node-size));
  opacity: calc(0.5 + var(--node-size) * 0.5);
}

.constellation-node:hover {
  color: var(--accent);
  border-color: var(--accent);
  transform: translateY(-3px);
  background: rgba(255, 255, 255, 0.02);
}

/* ===== 6. 实验剧场 ===== */
.experiments {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.exp-card {
  position: relative;
  padding: 3rem 2rem;
  background: var(--p-bg-card);
  border: 1px solid var(--p-border);
  overflow: hidden;
}

.exp-year-bg {
  position: absolute;
  top: -0.5rem; right: 1rem;
  font-family: var(--font-mono);
  font-size: clamp(4rem, 8vw, 7rem);
  font-weight: 400;
  color: var(--accent);
  opacity: 0.04;
  line-height: 1;
  pointer-events: none;
}

.exp-content {
  position: relative; z-index: 1;
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
  font-size: 1.25rem; font-weight: 500;
  color: var(--p-text);
}

.exp-name-en {
  font-family: var(--font-display);
  font-size: 0.75rem; font-weight: 400;
  font-style: italic; color: var(--p-text-ghost);
  letter-spacing: 0.04em; margin-bottom: 1.5rem;
}

.exp-body {
  font-family: var(--font-serif);
  font-size: 0.9375rem;
  line-height: 2.2;
  color: var(--p-text-mid);
  margin-bottom: 1.5rem;
  max-width: 600px;
}

.exp-impact {
  padding-top: 1.25rem;
  border-top: 1px solid var(--p-border);
  font-family: var(--font-serif);
  font-size: 0.8125rem;
  line-height: 1.9;
  color: var(--p-text-mid);
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
  max-width: 960px;
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

.door-num { font-size: 0.75rem; opacity: 0.4; }

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

/* ===== 响应式 ===== */
@media (max-width: 768px) {
  .s-nav { padding: 1rem 1.25rem; }
  .hero-inner { padding: 0 1.5rem; }
  .s-section { padding: 0 1.25rem; }
  .figures-grid { grid-template-columns: 1fr; }
  .verse-text { font-size: clamp(1.25rem, 4vw, 1.75rem); }
  .s-poem-bridge { padding: 3rem 1.25rem; }
  .s-other { padding: 3rem 1.25rem 4rem; }
  .exp-card { padding: 2rem 1.5rem; }
  .school-behaviorism .s-hero::before { left: 1.5rem; }
}

@media (max-width: 480px) {
  .hero-name { font-size: clamp(2.5rem, 12vw, 4rem); }
  .constellation { gap: 0.5rem; }
}
</style>

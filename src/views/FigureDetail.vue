<template>
  <div class="figure-page" v-if="figure && school">
    <!-- 导航 -->
    <nav class="top-bar">
      <router-link :to="`/school/${school.id}`" class="back-link">← {{ school.name }}</router-link>
      <span class="bar-code">{{ figure.nameEn }}</span>
    </nav>

    <div class="page-body">
      <!-- 头部 -->
      <header class="fig-header fade-up" :class="{ visible: show }" :style="{ '--accent': school.accent }">
        <p class="fig-school">{{ school.name }} · {{ school.period }}</p>
        <h1 class="fig-name">{{ figure.name }}</h1>
        <p class="fig-en">{{ figure.nameEn }}</p>
        <p class="fig-years">{{ figure.years }}</p>
      </header>

      <!-- 引言 -->
      <section class="fig-section fade-up" :class="{ visible: secVis[0] }">
        <div class="sec-head">
          <span class="sec-dot"></span>
          <h2 class="sec-title">TA 说过</h2>
          <span class="sec-line"></span>
        </div>
        <div class="quote-card">
          <p class="quote-text">{{ figure.quote }}</p>
        </div>
      </section>

      <!-- 留下的思想 -->
      <section class="fig-section fade-up" :class="{ visible: secVis[1] }">
        <div class="sec-head">
          <span class="sec-dot"></span>
          <h2 class="sec-title">留下的思想</h2>
          <span class="sec-line"></span>
        </div>
        <div class="fig-tags" v-if="figure.theories">
          <span v-for="t in figure.theories" :key="t" class="fig-tag">{{ t }}</span>
        </div>
        <p class="fig-contrib">{{ figure.contribution }}</p>
      </section>

      <!-- 写过的书 -->
      <section class="fig-section fade-up" :class="{ visible: secVis[2] }" v-if="figure.works">
        <div class="sec-head">
          <span class="sec-dot"></span>
          <h2 class="sec-title">写过的书</h2>
          <span class="sec-line"></span>
        </div>
        <ul class="fig-works-list">
          <li v-for="w in figure.works" :key="w">{{ w }}</li>
        </ul>
      </section>

      <!-- 同流派的其他人 -->
      <section class="fig-section fade-up" :class="{ visible: secVis[3] }">
        <div class="sec-head">
          <span class="sec-dot"></span>
          <h2 class="sec-title">同路人</h2>
          <span class="sec-line"></span>
        </div>
        <div class="related-figures">
          <router-link
            v-for="f in otherFigures"
            :key="f.id"
            :to="`/figure/${f.id}`"
            class="related-fig"
          >
            <span class="rf-name">{{ f.name }}</span>
            <span class="rf-years">{{ f.years }}</span>
            <span class="rf-arrow">→</span>
          </router-link>
        </div>
      </section>

      <!-- 底部 -->
      <div class="bottom-link">
        <router-link :to="`/school/${school.id}`" class="back-btn">← 返回 {{ school.name }}</router-link>
        <router-link to="/hall" class="back-btn">展馆</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { getSchool, figures } from '../data/psychology'

const route = useRoute()
const show = ref(false)
const secVis = ref([false, false, false, false])

const figure = computed(() => figures.find(f => f.id === route.params.id))
const school = computed(() => figure.value ? getSchool(figure.value.school) : null)
const otherFigures = computed(() =>
  figure.value ? figures.filter(f => f.school === figure.value.school && f.id !== figure.value.id) : []
)

function toTop() {
  window.scrollTo({ top: 0, behavior: 'instant' })
  document.documentElement.scrollTop = 0
  document.body.scrollTop = 0
}

function init() {
  toTop()
  show.value = false
  secVis.value = [false, false, false, false]
  nextTick(() => {
    toTop()
    requestAnimationFrame(() => {
      show.value = true
      setTimeout(() => {
        const secs = document.querySelectorAll('.figure-page .fade-up')
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

.figure-page { min-height: 100vh; background: var(--p-bg); }

.top-bar {
  position: sticky; top: 0; z-index: 100;
  display: flex; justify-content: space-between; align-items: center;
  padding: 1rem 2rem;
  background: rgba(250,249,246,0.92); backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--p-border);
}
.back-link {
  font-family: var(--font-sans); font-size: 0.6875rem; font-weight: 500;
  letter-spacing: 0.12em; color: var(--p-text-light); text-decoration: none; transition: color 0.2s;
}
.back-link:hover { color: var(--accent, var(--p-text)); }
.bar-code {
  font-family: var(--font-sans); font-size: 0.625rem; font-weight: 600;
  letter-spacing: 0.2em; color: var(--accent, var(--p-text-light));
}

.page-body { max-width: 640px; margin: 0 auto; padding: 0 2rem 4rem; }

/* 头部 */
.fig-header {
  padding: 3.5rem 0 2.5rem; border-bottom: 1px solid var(--p-border); margin-bottom: 2rem;
}
.fig-school {
  font-family: var(--font-sans); font-size: 0.6875rem; font-weight: 500;
  letter-spacing: 0.2em; color: var(--accent); margin-bottom: 1rem;
}
.fig-name {
  font-family: var(--font-serif); font-size: clamp(2rem, 5vw, 3rem); font-weight: 700; margin-bottom: 0.25rem;
}
.fig-en {
  font-family: var(--font-sans); font-size: 0.75rem; font-weight: 500;
  letter-spacing: 0.15em; color: var(--p-text-light); margin-bottom: 0.5rem;
}
.fig-years {
  font-family: var(--font-sans); font-size: 0.625rem; font-weight: 500;
  letter-spacing: 0.1em; color: var(--p-text-light); opacity: 0.6;
}

/* 区块 */
.fig-section { margin-bottom: 2.5rem; }

.sec-head { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.25rem; }
.sec-dot {
  width: 6px; height: 6px; border-radius: 50%; background: var(--accent, var(--p-text-light));
}
.sec-title {
  font-family: var(--font-sans); font-size: 0.75rem; font-weight: 600;
  letter-spacing: 0.15em; text-transform: uppercase; white-space: nowrap;
}
.sec-line { flex: 1; height: 1px; background: var(--p-border); transform-origin: left; }
.fig-section.visible .sec-line { animation: line-reveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) both; }

@keyframes line-reveal {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}

/* 引言卡片 */
.quote-card {
  padding: 1.5rem; background: var(--p-surface); border-left: 3px solid var(--accent, var(--p-border));
  position: relative;
}
.quote-card::after {
  content: '';
  position: absolute;
  bottom: 0; right: 0;
  width: 40px; height: 40px;
  border-right: 1px solid var(--accent, var(--p-border));
  border-bottom: 1px solid var(--accent, var(--p-border));
  opacity: 0.3;
}
.quote-text {
  font-family: var(--font-serif); font-size: 1.0625rem; font-style: italic;
  line-height: 2; color: var(--p-text);
}

/* 理论标签 */
.fig-tags { display: flex; flex-wrap: wrap; gap: 0.375rem; margin-bottom: 1rem; }
.fig-tag {
  font-family: var(--font-sans); font-size: 0.6875rem; font-weight: 500;
  padding: 0.25rem 0.625rem; border: 1px solid var(--p-border); color: var(--p-text);
}
.fig-contrib {
  font-family: var(--font-serif); font-size: 0.9375rem; line-height: 1.8; color: var(--p-text-light);
}

/* 著作 */
.fig-works-list { list-style: none; padding: 0; }
.fig-works-list li {
  font-family: var(--font-serif); font-size: 0.875rem; font-style: italic;
  color: var(--p-text-light); padding: 0.375rem 0 0.375rem 1rem; position: relative;
  border-bottom: 1px solid var(--p-border);
}
.fig-works-list li:last-child { border-bottom: none; }
.fig-works-list li::before {
  content: '·'; position: absolute; left: 0; color: var(--accent, var(--p-text-light));
}

/* 同路人 */
.related-figures { display: flex; flex-direction: column; }
.related-fig {
  display: flex; align-items: center; gap: 1rem; padding: 0.875rem 0;
  border-bottom: 1px solid var(--p-border); text-decoration: none; color: var(--p-text);
  cursor: pointer; transition: padding-left 0.25s var(--ease);
}
.related-fig:last-child { border-bottom: none; }
.related-fig:hover { padding-left: 0.5rem; }
.rf-name { font-family: var(--font-serif); font-size: 0.9375rem; font-weight: 600; }
.rf-years {
  font-family: var(--font-sans); font-size: 0.625rem; font-weight: 500;
  letter-spacing: 0.1em; color: var(--p-text-light); flex: 1;
}
.rf-arrow {
  font-family: var(--font-sans); font-size: 0.75rem; font-weight: 300;
  color: var(--p-text-light); opacity: 0; transform: translateX(-4px);
  transition: all 0.25s var(--ease);
}
.related-fig:hover .rf-arrow { opacity: 1; transform: translateX(0); color: var(--accent); }

/* 底部 */
.bottom-link {
  display: flex; justify-content: space-between; padding-top: 2rem;
  border-top: 1px solid var(--p-border);
}
.back-btn {
  font-family: var(--font-sans); font-size: 0.75rem; font-weight: 500;
  letter-spacing: 0.1em; color: var(--p-text-light); text-decoration: none; transition: color 0.2s;
}
.back-btn:hover { color: var(--accent, var(--p-text)); }

@media (max-width: 768px) {
  .page-body { padding: 0 1.25rem 3rem; }
  .top-bar { padding: 1rem 1.25rem; }
}
</style>

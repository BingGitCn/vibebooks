<template>
  <div class="portrait" v-if="figure && school" :class="`portrait-${school.id}`" :style="{ '--accent': school.accent }">
    <nav class="p-nav">
      <router-link :to="`/school/${school.id}`" class="p-back">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M12 8H4M4 8L7 5M4 8L7 11" stroke="currentColor" stroke-width="1"/>
        </svg>
        <span>{{ school.name }}</span>
      </router-link>
      <span class="p-dot" :style="{ background: school.accent }"></span>
    </nav>

    <div class="p-body" :style="{ '--accent': school.accent }">
      <!-- 人物名 -->
      <header class="p-hero fade-up" :class="{ visible: show }">
        <div class="p-glow"></div>
        <div class="p-from">
          <span class="p-from-school">{{ school.name }}</span>
          <span class="p-from-divider"></span>
          <span class="p-from-period">{{ school.period }}</span>
        </div>
        <h1 class="p-name">{{ figure.name }}</h1>
        <p class="p-en">{{ figure.nameEn }}</p>
        <p class="p-years">{{ figure.years }}</p>
      </header>

      <!-- 引言 -->
      <section class="p-quote-section fade-up" :class="{ visible: secVis[0] }">
        <div class="quote-mark">{{ school.icon }}</div>
        <p class="p-quote">{{ figure.quote }}</p>
        <div class="quote-line"></div>
      </section>

      <!-- 思想 -->
      <section class="p-section fade-up" :class="{ visible: secVis[1] }">
        <p class="p-label">留下的思想</p>
        <div class="p-tags" v-if="figure.theories">
          <span v-for="t in figure.theories" :key="t" class="p-tag">{{ t }}</span>
        </div>
        <p class="p-contrib">{{ figure.contribution }}</p>
      </section>

      <!-- 著作 -->
      <section class="p-section fade-up" :class="{ visible: secVis[2] }" v-if="figure.works">
        <p class="p-label">写过的书</p>
        <ul class="p-works">
          <li v-for="w in figure.works" :key="w">{{ w }}</li>
        </ul>
      </section>

      <!-- 同路人 -->
      <section class="p-section fade-up" :class="{ visible: secVis[3] }">
        <p class="p-label">同路人</p>
        <div class="p-peers">
          <router-link v-for="f in otherFigures" :key="f.id"
            :to="`/figure/${f.id}`" class="p-peer">
            <span class="peer-name">{{ f.name }}</span>
            <span class="peer-go">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M3 6H9M9 6L7 4M9 6L7 8" stroke="currentColor" stroke-width="1"/>
              </svg>
            </span>
          </router-link>
        </div>
      </section>

      <div class="p-foot">
        <router-link :to="`/school/${school.id}`" class="p-link">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M9 6H3M3 6L5 4M3 6L5 8" stroke="currentColor" stroke-width="1"/>
          </svg>
          {{ school.name }}
        </router-link>
        <router-link to="/hall" class="p-link">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <circle cx="6" cy="6" r="4" stroke="currentColor" stroke-width="1"/>
          </svg>
          展馆
        </router-link>
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
  document.documentElement.scrollTop = 0; document.body.scrollTop = 0
}

function init() {
  toTop(); show.value = false; secVis.value = [false, false, false, false]
  nextTick(() => {
    toTop()
    requestAnimationFrame(() => {
      show.value = true
      setTimeout(() => {
        const secs = document.querySelectorAll('.portrait .fade-up')
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
.portrait { min-height: 100vh; background: var(--p-bg); }

.p-nav {
  position: sticky; top: 0; z-index: 100;
  display: flex; justify-content: space-between; align-items: center;
  padding: 1.25rem 2rem;
  background: rgba(10, 10, 11, 0.8);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border-bottom: 1px solid var(--p-border);
}

.p-back {
  display: flex; align-items: center; gap: 0.5rem;
  font-family: var(--font-mono); font-size: 0.5rem;
  letter-spacing: 0.15em;
  color: var(--p-text-ghost); text-decoration: none;
  transition: color 0.2s;
}
.p-back:hover { color: var(--p-text); }

.p-dot {
  width: 6px; height: 6px; border-radius: 50%;
  animation: breathe 4s ease-in-out infinite;
}

.p-body { max-width: 560px; margin: 0 auto; padding: 0 2rem 4rem; }

/* 英雄 */
.p-hero {
  position: relative;
  padding: 5rem 0 3.5rem;
  border-bottom: 1px solid var(--p-border);
  margin-bottom: 2.5rem;
  overflow: hidden;
}

.p-glow {
  position: absolute;
  width: 400px; height: 400px;
  border-radius: 50%;
  background: radial-gradient(circle, var(--accent), transparent 70%);
  opacity: 0.04;
  top: -150px; left: -100px;
  filter: blur(60px);
  animation: breathe-deep 8s ease-in-out infinite;
}

.p-from {
  display: flex; align-items: center; gap: 0.75rem;
  margin-bottom: 2rem;
}

.p-from-school {
  font-family: var(--font-mono);
  font-size: 0.5rem; font-weight: 400;
  letter-spacing: 0.2em; color: var(--accent);
}

.p-from-divider {
  display: block;
  width: 12px; height: 1px;
  background: var(--p-text-ghost);
}

.p-from-period {
  font-family: var(--font-mono);
  font-size: 0.5rem; font-weight: 400;
  letter-spacing: 0.15em; color: var(--p-text-ghost);
}

.p-name {
  font-family: var(--font-serif);
  font-size: clamp(2.5rem, 7vw, 4rem);
  font-weight: 200;
  letter-spacing: 0.08em;
  color: var(--p-text-bright);
  margin-bottom: 0.5rem;
}

.p-en {
  font-family: var(--font-display);
  font-size: 0.875rem; font-weight: 400;
  font-style: italic; letter-spacing: 0.06em; color: var(--p-text-ghost);
  margin-bottom: 0.75rem;
}

.p-years {
  font-family: var(--font-mono);
  font-size: 0.5rem; font-weight: 400;
  letter-spacing: 0.2em; color: var(--p-text-ghost);
}

/* 引言 */
.p-quote-section {
  padding: 3rem 0;
  margin-bottom: 2rem;
  border-bottom: 1px solid var(--p-border);
  position: relative;
}

.quote-mark {
  font-family: var(--font-display);
  font-size: 5rem;
  line-height: 1;
  color: var(--accent);
  opacity: 0.15;
  position: absolute;
  top: 1rem;
  left: -0.5rem;
  pointer-events: none;
}

.p-quote {
  font-family: var(--font-serif);
  font-size: clamp(1.375rem, 3vw, 1.75rem);
  font-weight: 300;
  line-height: 2.2;
  color: var(--p-text);
  letter-spacing: 0.02em;
  position: relative;
}

.quote-line {
  width: 32px; height: 1px;
  background: var(--accent);
  opacity: 0.3;
  margin-top: 2rem;
}

/* 区块 */
.p-section { margin-bottom: 3rem; }

.p-label {
  font-family: var(--font-serif);
  font-size: 0.8125rem; font-weight: 300;
  font-style: italic; color: var(--p-text-ghost);
  margin-bottom: 1.25rem;
}

/* 标签 */
.p-tags { display: flex; flex-wrap: wrap; gap: 0.375rem; margin-bottom: 1.5rem; }

.p-tag {
  font-family: var(--font-mono);
  font-size: 0.5625rem;
  padding: 0.25rem 0.625rem;
  border: 1px solid var(--p-border-strong);
  color: var(--p-text-mid);
  letter-spacing: 0.05em;
}

.p-contrib {
  font-family: var(--font-serif); font-size: 0.9375rem;
  line-height: 2; color: var(--p-text-mid);
}

/* 著作 */
.p-works { list-style: none; }

.p-works li {
  font-family: var(--font-serif); font-size: 0.875rem;
  font-style: italic; color: var(--p-text-mid);
  padding: 0.75rem 0 0.75rem 1.5rem;
  position: relative;
  border-bottom: 1px solid var(--p-border);
}
.p-works li:last-child { border-bottom: none; }

.p-works li::before {
  content: '';
  position: absolute;
  left: 0; top: 50%;
  width: 4px; height: 4px;
  border-radius: 50%;
  background: var(--accent);
  opacity: 0.5;
  transform: translateY(-50%);
}

/* ===== 流派感知微调 ===== */
.portrait-psychoanalysis .quote-mark { font-size: 4rem; line-height: 1; }
.portrait-psychoanalysis .p-glow { animation: water-ripple 10s ease-in-out infinite; }

.portrait-behaviorism .quote-mark { font-family: var(--font-mono); font-size: 2rem; }
.portrait-behaviorism .p-quote { font-style: normal; font-family: var(--font-body); }
.portrait-behaviorism .p-hero::before {
  content: '';
  position: absolute;
  left: 2rem; top: 0; bottom: 0;
  width: 1px;
  background: repeating-linear-gradient(to bottom, var(--accent) 0px, var(--accent) 1px, transparent 1px, transparent 20px);
  opacity: 0.1;
}

.portrait-humanistic .quote-mark { font-size: 4rem; opacity: 0.2; }
.portrait-humanistic .p-glow { animation: forest-dapple 12s ease-in-out infinite; }
.portrait-humanistic .p-quote-section { border-radius: 0; }

.portrait-cognitive .quote-mark { font-family: var(--font-mono); font-size: 2rem; }
.portrait-cognitive .p-hero {
  background-image:
    linear-gradient(rgba(74,144,164,0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(74,144,164,0.02) 1px, transparent 1px);
  background-size: 40px 40px;
}

.portrait-developmental .p-hero::before {
  content: '';
  position: absolute;
  left: 50%; top: 0; bottom: 0;
  width: 1px;
  background: linear-gradient(to bottom, transparent 10%, var(--accent) 30%, var(--accent) 70%, transparent 90%);
  opacity: 0.08;
}

.portrait-social .quote-mark { font-size: 5rem; color: var(--accent); opacity: 0.2; }
.portrait-social .p-quote { letter-spacing: 0.02em; }

/* 同路人 */
.p-peers { display: flex; flex-direction: column; }

.p-peer {
  display: flex; justify-content: space-between; align-items: center;
  padding: 0.875rem 0;
  border-bottom: 1px solid var(--p-border);
  text-decoration: none; color: var(--p-text);
  cursor: pointer;
  transition: padding-left 0.35s var(--ease);
}
.p-peer:last-child { border-bottom: none; }
.p-peer:hover { padding-left: 0.75rem; }

.peer-name {
  font-family: var(--font-serif); font-size: 0.9375rem; font-weight: 400;
  transition: color 0.25s;
}
.p-peer:hover .peer-name { color: var(--accent); }

.peer-go {
  color: var(--accent);
  opacity: 0; transition: opacity 0.25s;
}
.p-peer:hover .peer-go { opacity: 0.7; }

.p-foot {
  display: flex; justify-content: space-between;
  padding-top: 2rem; border-top: 1px solid var(--p-border);
}

.p-link {
  display: flex; align-items: center; gap: 0.5rem;
  font-family: var(--font-mono); font-size: 0.5rem;
  letter-spacing: 0.15em;
  color: var(--p-text-ghost); text-decoration: none;
  transition: color 0.2s;
}
.p-link:hover { color: var(--accent); }

@media (max-width: 768px) {
  .p-body { padding: 0 1.25rem 3rem; }
  .p-nav { padding: 1rem 1.25rem; }
}
</style>

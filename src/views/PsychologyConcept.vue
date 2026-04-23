<template>
  <div class="concept" v-if="concept && school">
    <nav class="c-nav">
      <router-link :to="`/school/${school.id}`" class="c-back">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M12 8H4M4 8L7 5M4 8L7 11" stroke="currentColor" stroke-width="1"/>
        </svg>
        <span>{{ school.name }}</span>
      </router-link>
      <span class="c-dot" :style="{ background: school.accent }"></span>
    </nav>

    <div class="c-body" :style="{ '--accent': school.accent }">
      <!-- 概念名 -->
      <header class="c-hero fade-up" :class="{ visible: show }">
        <div class="c-glow"></div>
        <div class="c-from">
          <span class="c-from-school">{{ school.name }}</span>
          <span class="c-from-divider"></span>
          <span class="c-from-period">{{ school.period }}</span>
        </div>
        <h1 class="c-title">{{ concept.name }}</h1>
        <p class="c-en">{{ concept.nameEn }}</p>
      </header>

      <!-- 意味着什么 -->
      <section class="c-section fade-up" :class="{ visible: secVis[0] }">
        <p class="c-label">这个词语意味着</p>
        <p class="c-meaning">{{ concept.description }}</p>
      </section>

      <!-- 生活里的回响 -->
      <section class="c-section fade-up" :class="{ visible: secVis[1] }">
        <p class="c-label">它在你的生活里回响</p>
        <div class="c-echo">
          <div class="echo-glow"></div>
          <p class="c-echo-text">{{ concept.example }}</p>
        </div>
      </section>

      <!-- 相邻的路标 -->
      <section class="c-section fade-up" :class="{ visible: secVis[2] }">
        <p class="c-label">相邻的路标</p>
        <div class="c-related">
          <router-link v-for="rc in relatedConcepts" :key="rc.id"
            :to="`/concept/${rc.id}`" class="c-word">
            {{ rc.name }}
          </router-link>
        </div>
      </section>

      <div class="c-foot">
        <router-link :to="`/school/${school.id}`" class="c-link">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M9 6H3M3 6L5 4M3 6L5 8" stroke="currentColor" stroke-width="1"/>
          </svg>
          {{ school.name }}
        </router-link>
        <router-link to="/" class="c-link">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <circle cx="6" cy="6" r="4" stroke="currentColor" stroke-width="1"/>
          </svg>
          入口
        </router-link>
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
  toTop(); show.value = false; secVis.value = [false, false, false]
  nextTick(() => {
    toTop()
    requestAnimationFrame(() => {
      show.value = true
      setTimeout(() => {
        const secs = document.querySelectorAll('.concept .fade-up')
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
.concept { min-height: 100vh; background: var(--p-bg); }

.c-nav {
  position: sticky; top: 0; z-index: 100;
  display: flex; justify-content: space-between; align-items: center;
  padding: 1.25rem 2rem;
  background: rgba(10, 10, 11, 0.8);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border-bottom: 1px solid var(--p-border);
}

.c-back {
  display: flex; align-items: center; gap: 0.5rem;
  font-family: var(--font-mono); font-size: 0.5rem;
  letter-spacing: 0.15em;
  color: var(--p-text-ghost); text-decoration: none;
  transition: color 0.2s;
}
.c-back:hover { color: var(--p-text); }

.c-dot {
  width: 6px; height: 6px; border-radius: 50%;
  animation: breathe 4s ease-in-out infinite;
}

.c-body { max-width: 560px; margin: 0 auto; padding: 0 2rem 4rem; }

/* 英雄 */
.c-hero {
  position: relative;
  padding: 5rem 0 3.5rem;
  border-bottom: 1px solid var(--p-border);
  margin-bottom: 3rem;
  overflow: hidden;
}

.c-glow {
  position: absolute;
  width: 400px; height: 400px;
  border-radius: 50%;
  background: radial-gradient(circle, var(--accent), transparent 70%);
  opacity: 0.04;
  top: -150px; right: -100px;
  filter: blur(60px);
  animation: breathe-deep 8s ease-in-out infinite;
}

.c-from {
  display: flex; align-items: center; gap: 0.75rem;
  margin-bottom: 2rem;
}

.c-from-school {
  font-family: var(--font-mono);
  font-size: 0.5rem; font-weight: 400;
  letter-spacing: 0.2em; color: var(--accent);
}

.c-from-divider {
  display: block;
  width: 12px; height: 1px;
  background: var(--p-text-ghost);
}

.c-from-period {
  font-family: var(--font-mono);
  font-size: 0.5rem; font-weight: 400;
  letter-spacing: 0.15em; color: var(--p-text-ghost);
}

.c-title {
  font-family: var(--font-serif);
  font-size: clamp(3rem, 9vw, 5rem);
  font-weight: 200;
  letter-spacing: 0.08em;
  color: var(--p-text-bright);
  margin-bottom: 0.5rem;
}

.c-en {
  font-family: var(--font-display);
  font-size: 0.875rem; font-weight: 400;
  font-style: italic; letter-spacing: 0.06em; color: var(--p-text-ghost);
}

/* 区块 */
.c-section { margin-bottom: 3.5rem; }

.c-label {
  font-family: var(--font-serif);
  font-size: 0.8125rem; font-weight: 300;
  font-style: italic; color: var(--p-text-ghost);
  margin-bottom: 1.5rem;
}

.c-meaning {
  font-family: var(--font-serif);
  font-size: 1.0625rem;
  line-height: 2.4;
  color: var(--p-text);
}

/* 回响 */
.c-echo {
  position: relative;
  padding: 2rem;
  border: 1px solid var(--p-border-strong);
  border-left: 2px solid var(--accent);
  background: var(--p-bg-card);
  overflow: hidden;
}

.echo-glow {
  position: absolute;
  width: 150px; height: 150px;
  border-radius: 50%;
  background: radial-gradient(circle, var(--accent), transparent 70%);
  opacity: 0.04;
  bottom: -50px; right: -30px;
  filter: blur(30px);
  pointer-events: none;
}

.c-echo-text {
  font-family: var(--font-serif);
  font-size: 0.9375rem;
  font-style: italic;
  line-height: 2;
  color: var(--p-text-mid);
  position: relative; z-index: 1;
}

/* 相邻词语 */
.c-related { display: flex; flex-wrap: wrap; gap: 0.5rem; }

.c-word {
  font-family: var(--font-serif); font-size: 0.875rem;
  color: var(--p-text-mid); text-decoration: none; cursor: pointer;
  padding: 0.4rem 0.875rem; border: 1px solid var(--p-border-strong);
  transition: all 0.3s var(--ease);
}
.c-word:hover {
  color: var(--accent); border-color: var(--accent);
  transform: translateY(-2px);
}

.c-foot {
  display: flex; justify-content: space-between;
  padding-top: 2rem; border-top: 1px solid var(--p-border);
}

.c-link {
  display: flex; align-items: center; gap: 0.5rem;
  font-family: var(--font-mono); font-size: 0.5rem;
  letter-spacing: 0.15em;
  color: var(--p-text-ghost); text-decoration: none;
  transition: color 0.2s;
}
.c-link:hover { color: var(--accent); }

@media (max-width: 768px) {
  .c-body { padding: 0 1.25rem 3rem; }
  .c-nav { padding: 1rem 1.25rem; }
  .c-title { font-size: clamp(2.5rem, 10vw, 3.5rem); }
}
</style>

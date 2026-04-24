<template>
  <div class="hall" @mousemove="onMouse">
    <nav class="hall-nav">
      <router-link to="/" class="nav-back">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M12 8H4M4 8L7 5M4 8L7 11" stroke="currentColor" stroke-width="1"/>
        </svg>
      </router-link>
      <span class="nav-marker"></span>
    </nav>

    <!-- 一屏布局 -->
    <div class="hall-body" ref="bodyEl">
      <!-- 漂浮光晕 -->
      <div class="hero-inks" :style="inkParallax">
        <div class="ink ink-a"></div>
        <div class="ink ink-b"></div>
        <div class="ink ink-c"></div>
      </div>

      <!-- 漂浮粒子 -->
      <div class="particles">
        <span v-for="n in 8" :key="n" class="particle"
              :style="{
                left: (10 + Math.random() * 80) + '%',
                top: (10 + Math.random() * 80) + '%',
                animationDelay: (Math.random() * 6) + 's',
                animationDuration: (5 + Math.random() * 6) + 's'
              }"
        ></span>
      </div>

      <!-- 标题区 -->
      <div class="hall-top">
        <div class="hero-mark fade-up" :class="{ visible: show }">
          <span class="mark-line"></span>
          <span class="mark-text">PSYCHE</span>
          <span class="mark-line"></span>
        </div>

        <h1 class="hero-title">
          <span v-for="(c, i) in titleChars" :key="i"
                class="title-char fade-up"
                :class="{ visible: show }"
                :style="{ transitionDelay: (0.15 + i * 0.1) + 's' }"
          >{{ c }}</span>
        </h1>

        <p class="hero-en fade-up" :class="{ visible: show }" :style="{ transitionDelay: '0.6s' }">
          Something in you knows, before you do
        </p>
      </div>

      <!-- 六个流派 — 自由散布 -->
      <div class="paths">
        <router-link
          v-for="(school, i) in schools"
          :key="school.id"
          :to="`/school/${school.id}`"
          class="path"
          :class="[
            `path-${i}`,
            { visible: show }
          ]"
          :style="{ '--accent': school.accent, '--delay': (0.8 + i * 0.1) + 's' }"
          @mouseenter="hoverSchool = i"
          @mouseleave="hoverSchool = -1"
        >
          <div class="path-atmos" :class="{ active: hoverSchool === i }"></div>
          <span class="path-icon">{{ school.icon }}</span>
          <h2 class="path-name">{{ school.name }}</h2>
          <p class="path-sub">{{ school.subtitle }}</p>
          <span class="path-line"></span>
        </router-link>
      </div>

      <!-- 底部诗句 -->
      <div class="hall-foot fade-up" :class="{ visible: show }" :style="{ transitionDelay: '1.6s' }">
        <span class="foot-text">往下走，哪里都是入口</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, reactive } from 'vue'
import { schools } from '../data/psychology'

const show = ref(false)
const hoverSchool = ref(-1)
const bodyEl = ref(null)
const titleChars = computed(() => '无名之物'.split(''))

const inkParallax = reactive({ transform: '' })

function onMouse(e) {
  const cx = window.innerWidth / 2
  const cy = window.innerHeight / 2
  const dx = (e.clientX - cx) / cx
  const dy = (e.clientY - cy) / cy
  inkParallax.transform = `translate(${dx * 12}px, ${dy * 10}px)`
}

onMounted(() => {
  window.scrollTo({ top: 0, behavior: 'instant' })
  document.documentElement.scrollTop = 0
  requestAnimationFrame(() => show.value = true)
})
</script>

<style scoped>
.hall {
  height: 100vh;
  background: var(--p-bg);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* ===== 导航 ===== */
.hall-nav {
  position: relative; z-index: 100;
  display: flex; justify-content: space-between; align-items: center;
  padding: 1rem 2rem;
  flex-shrink: 0;
}

.nav-back {
  display: flex; align-items: center;
  color: var(--p-text-ghost);
  text-decoration: none;
  transition: color 0.2s;
}
.nav-back:hover { color: var(--p-text); }

.nav-marker {
  display: block;
  width: 4px; height: 4px;
  border-radius: 50%;
  background: var(--p-text-ghost);
  opacity: 0.4;
  animation: breathe 6s ease-in-out infinite;
}

/* ===== 主体 ===== */
.hall-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: 0 2rem 1rem;
  gap: 2rem;
}

/* 光晕 */
.hero-inks {
  position: absolute; inset: 0;
  pointer-events: none;
  transition: transform 0.6s var(--ease);
  will-change: transform;
}

.ink {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
}

.ink-a {
  width: 500px; height: 500px;
  background: radial-gradient(circle, var(--c-psychoanalysis), transparent 70%);
  opacity: 0.06;
  top: -15%; right: -5%;
  animation: breathe-deep 12s ease-in-out infinite;
}

.ink-b {
  width: 350px; height: 350px;
  background: radial-gradient(circle, var(--c-humanistic), transparent 70%);
  opacity: 0.05;
  bottom: 5%; left: -8%;
  animation: breathe-deep 10s ease-in-out infinite;
  animation-delay: 3s;
}

.ink-c {
  width: 250px; height: 250px;
  background: radial-gradient(circle, var(--c-cognitive), transparent 70%);
  opacity: 0.03;
  top: 40%; left: 55%;
  animation: breathe-deep 14s ease-in-out infinite;
  animation-delay: 6s;
}

/* 粒子 */
.particles {
  position: absolute; inset: 0;
  pointer-events: none;
}

.particle {
  position: absolute;
  width: 2px; height: 2px;
  background: var(--p-text);
  border-radius: 50%;
  opacity: 0;
  animation: flicker 5s ease-in-out infinite;
}

/* ===== 标题区 ===== */
.hall-top {
  position: relative; z-index: 2;
  text-align: center;
  flex-shrink: 0;
}

.hero-mark {
  display: flex; align-items: center; gap: 0.75rem;
  justify-content: center;
  margin-bottom: 1rem;
}

.mark-line {
  display: block;
  width: 30px; height: 1px;
  background: linear-gradient(90deg, transparent, var(--p-text-ghost), transparent);
}

.mark-text {
  font-family: var(--font-display);
  font-size: 0.625rem;
  font-weight: 400;
  letter-spacing: 0.5em;
  color: var(--p-text-ghost);
  font-style: italic;
}

.hero-title {
  line-height: 1.15;
  white-space: nowrap;
  margin-bottom: 0.625rem;
}

.title-char {
  display: inline-block;
  font-family: var(--font-serif);
  font-size: clamp(2.25rem, 6vw, 4rem);
  font-weight: 200;
  letter-spacing: 0.08em;
  color: var(--p-text-bright);
  opacity: 0;
  transform: translateY(25px) scale(0.95);
  filter: blur(6px);
  transition: opacity 0.8s var(--ease), transform 0.8s var(--ease), filter 0.8s var(--ease);
  margin: 0 0.02em;
}

.title-char.visible {
  opacity: 1;
  transform: translateY(0) scale(1);
  filter: blur(0);
}

.hero-en {
  font-family: var(--font-display);
  font-size: clamp(0.75rem, 1.2vw, 0.9375rem);
  font-weight: 400;
  font-style: italic;
  letter-spacing: 0.15em;
  color: var(--p-text-mid);
  opacity: 0;
  transform: translateY(10px);
  filter: blur(3px);
  transition: opacity 0.8s var(--ease), transform 0.8s var(--ease), filter 0.8s var(--ease);
}

.hero-en.visible {
  opacity: 1;
  transform: translateY(0);
  filter: blur(0);
}

/* ===== 六条路 — 自由散布 ===== */
.paths {
  position: relative; z-index: 2;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  width: 100%;
  max-width: 1000px;
  gap: 0;
  flex-shrink: 0;
}

.path {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 1.75rem 0.5rem;
  text-decoration: none;
  color: var(--p-text);
  cursor: pointer;
  overflow: hidden;
  opacity: 0;
  transform: translateY(20px);
  filter: blur(4px);
  transition: opacity 0.8s var(--ease), transform 0.8s var(--ease), filter 0.8s var(--ease);
}

.path.visible {
  opacity: 1;
  transform: translateY(0);
  filter: blur(0);
  transition-delay: var(--delay);
}

/* 每个流派独特的浮动姿态 */
.path-0 { animation: float 7s ease-in-out infinite; }
.path-1 { animation: float 8s ease-in-out infinite; animation-delay: 1s; }
.path-2 { animation: float 6s ease-in-out infinite; animation-delay: 2.5s; }
.path-3 { animation: float 9s ease-in-out infinite; animation-delay: 0.5s; }
.path-4 { animation: float 7.5s ease-in-out infinite; animation-delay: 3s; }
.path-5 { animation: float 8.5s ease-in-out infinite; animation-delay: 1.5s; }

.path-atmos {
  position: absolute;
  bottom: 0; left: 50%; right: 50%;
  height: 0;
  background: var(--accent);
  opacity: 0;
  border-radius: 50% 50% 0 0;
  filter: blur(25px);
  transition: all 0.6s var(--ease);
  pointer-events: none;
}

.path:hover .path-atmos,
.path-atmos.active {
  left: -20%;
  right: -20%;
  height: 60px;
  opacity: 0.08;
}

.path-icon {
  font-size: 1.25rem;
  opacity: 0.15;
  margin-bottom: 0.75rem;
  color: var(--p-text-ghost);
  transition: opacity 0.4s, transform 0.5s var(--ease), color 0.4s;
}

.path:hover .path-icon {
  opacity: 0.8;
  color: var(--accent);
  transform: scale(1.3) translateY(-2px);
}

.path-name {
  font-family: var(--font-serif);
  font-size: clamp(0.875rem, 1.3vw, 1.0625rem);
  font-weight: 500;
  letter-spacing: 0.1em;
  margin-bottom: 0.375rem;
  transition: color 0.3s, letter-spacing 0.4s var(--ease);
  white-space: nowrap;
}

.path:hover .path-name {
  color: var(--accent);
  letter-spacing: 0.15em;
}

.path-sub {
  font-family: var(--font-serif);
  font-size: 0.625rem;
  font-weight: 300;
  color: var(--p-text-ghost);
  font-style: italic;
  line-height: 1.5;
  opacity: 0;
  max-height: 0;
  transition: opacity 0.4s, max-height 0.5s var(--ease), margin 0.4s;
  overflow: hidden;
}

.path:hover .path-sub {
  opacity: 0.7;
  max-height: 40px;
  margin-top: 0.25rem;
}

.path-line {
  display: block;
  width: 0;
  height: 1px;
  background: var(--accent);
  margin-top: 0.625rem;
  transition: width 0.5s var(--ease), opacity 0.4s;
  opacity: 0;
}

.path:hover .path-line {
  width: 24px;
  opacity: 0.5;
}

/* ===== 底部 ===== */
.hall-foot {
  position: relative; z-index: 2;
  flex-shrink: 0;
  text-align: center;
}

.foot-text {
  font-family: var(--font-serif);
  font-size: 0.75rem;
  font-weight: 300;
  color: var(--p-text-ghost);
  font-style: italic;
  letter-spacing: 0.1em;
}

/* ===== 响应式 ===== */
@media (max-width: 900px) {
  .paths {
    grid-template-columns: repeat(3, 1fr);
  }
  .path { padding: 1.5rem 0.75rem; }
  .path-sub { opacity: 0.6; max-height: 40px; margin-top: 0.25rem; }
}

@media (max-width: 600px) {
  .hall-body { gap: 1.5rem; padding: 0 1.25rem 1rem; }
  .title-char { font-size: clamp(2rem, 9vw, 3rem); }
  .paths {
    grid-template-columns: repeat(2, 1fr);
    gap: 0;
  }
  .path { padding: 1.25rem 0.5rem; }
}
</style>

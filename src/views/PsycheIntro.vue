<template>
  <div class="hall">
    <nav class="hall-nav">
      <router-link to="/" class="nav-back">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M12 8H4M4 8L7 5M4 8L7 11" stroke="currentColor" stroke-width="1"/>
        </svg>
      </router-link>
      <span class="nav-marker"></span>
    </nav>

    <!-- 全屏诗意头图 -->
    <header class="hero">
      <!-- 漂浮光晕 -->
      <div class="hero-inks">
        <div class="ink ink-a"></div>
        <div class="ink ink-b"></div>
      </div>

      <div class="hero-inner">
        <!-- 序号标记 -->
        <div class="hero-mark fade-up" :class="{ visible: show }">
          <span class="mark-line"></span>
          <span class="mark-text">PSYCHE</span>
          <span class="mark-line"></span>
        </div>

        <!-- 大标题 - 每个字独立呼吸 -->
        <h1 class="hero-title">
          <span v-for="(c, i) in titleChars" :key="i"
                class="title-char fade-up"
                :class="{ visible: show }"
                :style="{ transitionDelay: (0.2 + i * 0.12) + 's' }"
          >{{ c }}</span>
        </h1>

        <!-- 英文 -->
        <p class="hero-en fade-up" :class="{ visible: show }" :style="{ transitionDelay: '0.9s' }">
          Something in you knows, before you do
        </p>

        <!-- 分隔 -->
        <div class="hero-divider fade-up" :class="{ visible: show }" :style="{ transitionDelay: '1.2s' }">
          <span class="div-dot"></span>
          <span class="div-line"></span>
          <span class="div-dot"></span>
        </div>

        <!-- 诗意正文 - 逐行浮现 -->
        <div class="hero-poem">
          <p class="poem-line fade-up" :class="{ visible: show }" :style="{ transitionDelay: '1.5s' }">
            有些东西在你意识到之前，就已经替你做了决定
          </p>
          <p class="poem-line fade-up" :class="{ visible: show }" :style="{ transitionDelay: '1.9s' }">
            他们试图给那种东西一个名字
          </p>
          <p class="poem-line poem-accent fade-up" :class="{ visible: show }" :style="{ transitionDelay: '2.3s' }">
            于是有了这些路
          </p>
        </div>
      </div>

      <!-- 向下指引 -->
      <div class="hero-scroll fade-up" :class="{ visible: show }" :style="{ transitionDelay: '2.8s' }">
        <div class="scroll-line"></div>
      </div>
    </header>

    <!-- 六个流派 -->
    <div class="paths">
      <router-link
        v-for="(school, i) in schools"
        :key="school.id"
        :to="`/school/${school.id}`"
        class="path"
        :style="{ '--accent': school.accent }"
        @mouseenter="hoverSchool = i"
        @mouseleave="hoverSchool = -1"
      >
        <!-- 背景光晕 -->
        <div class="path-glow" :class="{ active: hoverSchool === i }"></div>

        <!-- 左侧编号 -->
        <div class="path-left">
          <span class="path-icon">{{ school.icon }}</span>
        </div>

        <!-- 中间内容 -->
        <div class="path-core">
          <div class="path-names">
            <h2 class="path-name">{{ school.name }}</h2>
            <span class="path-name-en">{{ school.nameEn }}</span>
          </div>
          <p class="path-mood">{{ school.subtitle }}</p>
          <p class="path-reveal">{{ school.description }}</p>
        </div>

        <!-- 右侧时期 + 箭头 -->
        <div class="path-right">
          <span class="path-era">{{ school.period }}</span>
          <span class="path-go">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M4 9H14M14 9L10 5M14 9L10 13" stroke="currentColor" stroke-width="1"/>
            </svg>
          </span>
        </div>
      </router-link>
    </div>

    <footer class="hall-foot">
      <div class="foot-poem">
        <span class="foot-char">往</span>
        <span class="foot-char">下</span>
        <span class="foot-char">走</span>
        <span class="foot-comma">，</span>
        <span class="foot-char">哪</span>
        <span class="foot-char">里</span>
        <span class="foot-char">都</span>
        <span class="foot-char">是</span>
        <span class="foot-char">入</span>
        <span class="foot-char">口</span>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { schools } from '../data/psychology'

const show = ref(false)
const hoverSchool = ref(-1)
const titleChars = computed(() => '无名之物'.split(''))

onMounted(() => {
  window.scrollTo({ top: 0, behavior: 'instant' })
  document.documentElement.scrollTop = 0
  requestAnimationFrame(() => show.value = true)
})
</script>

<style scoped>
.hall {
  min-height: 100vh;
  background: var(--p-bg);
  display: flex;
  flex-direction: column;
}

/* ===== 导航 ===== */
.hall-nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 100;
  display: flex; justify-content: space-between; align-items: center;
  padding: 1.25rem 2rem;
  background: transparent;
  transition: background 0.4s;
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

/* ===== 全屏诗意头图 ===== */
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

/* 光晕 */
.hero-inks {
  position: absolute; inset: 0;
  pointer-events: none;
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
  top: -10%; right: -5%;
  animation: breathe-deep 12s ease-in-out infinite;
}

.ink-b {
  width: 350px; height: 350px;
  background: radial-gradient(circle, var(--c-humanistic), transparent 70%);
  opacity: 0.05;
  bottom: 10%; left: -8%;
  animation: breathe-deep 10s ease-in-out infinite;
  animation-delay: 3s;
}

.hero-inner {
  position: relative; z-index: 2;
  text-align: center;
  max-width: 600px;
  padding: 0 2rem;
}

/* 序号标记 */
.hero-mark {
  display: flex; align-items: center; gap: 1rem;
  justify-content: center;
  margin-bottom: 3rem;
}

.mark-line {
  display: block;
  width: 40px; height: 1px;
  background: linear-gradient(90deg, transparent, var(--p-text-ghost), transparent);
}

.mark-text {
  font-family: var(--font-display);
  font-size: 0.75rem;
  font-weight: 400;
  letter-spacing: 0.5em;
  color: var(--p-text-ghost);
  font-style: italic;
}

/* 大标题 */
.hero-title {
  margin-bottom: 1.5rem;
  line-height: 1.2;
  white-space: nowrap;
}

.title-char {
  display: inline-block;
  font-family: var(--font-serif);
  font-size: clamp(3.5rem, 12vw, 7rem);
  font-weight: 200;
  letter-spacing: 0.08em;
  color: var(--p-text-bright);
  opacity: 0;
  transform: translateY(40px) scale(0.95);
  filter: blur(8px);
  transition: opacity 1s var(--ease), transform 1s var(--ease), filter 1s var(--ease);
  margin: 0 0.02em;
}

.title-char.visible {
  opacity: 1;
  transform: translateY(0) scale(1);
  filter: blur(0);
}

/* 英文 */
.hero-en {
  font-family: var(--font-display);
  font-size: clamp(0.8125rem, 1.5vw, 1rem);
  font-weight: 400;
  font-style: italic;
  letter-spacing: 0.2em;
  color: var(--p-text-mid);
  margin-bottom: 3rem;
  opacity: 0;
  transform: translateY(15px);
  filter: blur(4px);
  transition: opacity 1s var(--ease), transform 1s var(--ease), filter 1s var(--ease);
}

.hero-en.visible {
  opacity: 1;
  transform: translateY(0);
  filter: blur(0);
}

/* 分隔线 */
.hero-divider {
  display: flex; align-items: center; gap: 0.75rem;
  justify-content: center;
  margin-bottom: 3rem;
  opacity: 0;
  transition: opacity 1s var(--ease);
}

.hero-divider.visible { opacity: 1; }

.div-dot {
  display: block;
  width: 3px; height: 3px;
  border-radius: 50%;
  background: var(--p-text-ghost);
}

.div-line {
  display: block;
  width: 60px; height: 1px;
  background: linear-gradient(90deg, transparent, var(--p-text-ghost), transparent);
}

/* 诗意正文 */
.hero-poem {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.poem-line {
  font-family: var(--font-serif);
  font-size: clamp(0.9375rem, 1.8vw, 1.125rem);
  font-weight: 300;
  line-height: 2.6;
  color: var(--p-text-mid);
  letter-spacing: 0.08em;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.8s var(--ease), transform 0.8s var(--ease);
}

.poem-line.visible {
  opacity: 1;
  transform: translateY(0);
}

.poem-accent {
  color: var(--c-psychoanalysis);
  font-weight: 400;
}

/* 向下指引 */
.hero-scroll {
  position: absolute;
  bottom: 3rem; left: 50%;
  transform: translateX(-50%);
}

.scroll-line {
  width: 1px; height: 40px;
  background: linear-gradient(to bottom, transparent, var(--p-text-ghost));
  animation: float 3s ease-in-out infinite;
}

/* ===== 六条路 ===== */
.paths {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 2rem;
}

.path {
  display: grid;
  grid-template-columns: 60px 1fr auto;
  align-items: center;
  gap: 1.5rem;
  padding: 2.5rem 1.75rem;
  text-decoration: none;
  color: var(--p-text);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  border-bottom: 1px solid var(--p-border);
  transition: background 0.5s var(--ease);
}

.path:first-child { border-top: 1px solid var(--p-border); }

/* 背景光晕 */
.path-glow {
  position: absolute; inset: 0;
  background: radial-gradient(ellipse at 20% 50%, var(--accent), transparent 70%);
  opacity: 0;
  transition: opacity 0.6s var(--ease);
  pointer-events: none;
  filter: blur(40px);
}

.path-glow.active { opacity: 0.06; }
.path:hover .path-glow { opacity: 0.06; }

.path:hover {
  background: var(--p-bg-elevated);
}

/* 左侧 */
.path-left {
  display: flex; align-items: center; justify-content: center;
}

.path-icon {
  font-size: 1.25rem;
  opacity: 0.25;
  transition: opacity 0.4s, transform 0.4s var(--ease), color 0.4s;
  color: var(--p-text-ghost);
}

.path:hover .path-icon {
  opacity: 0.8;
  color: var(--accent);
  transform: scale(1.15);
}

/* 中间 */
.path-core { position: relative; }

.path-names {
  display: flex; align-items: baseline; gap: 0.75rem;
  margin-bottom: 0.375rem;
}

.path-name {
  font-family: var(--font-serif);
  font-size: clamp(1.25rem, 2.5vw, 1.75rem);
  font-weight: 500;
  letter-spacing: 0.08em;
  transition: color 0.4s;
}

.path:hover .path-name { color: var(--accent); }

.path-name-en {
  font-family: var(--font-mono);
  font-size: 0.5rem;
  letter-spacing: 0.15em;
  color: var(--p-text-ghost);
  opacity: 0;
  transition: opacity 0.3s;
}

.path:hover .path-name-en { opacity: 0.6; }

.path-mood {
  font-family: var(--font-serif);
  font-size: 0.8125rem;
  font-weight: 300;
  color: var(--p-text-mid);
  font-style: italic;
  transition: opacity 0.3s;
}

/* hover 时浮现的描述 */
.path-reveal {
  font-family: var(--font-serif);
  font-size: 0.8125rem;
  line-height: 1.9;
  color: var(--p-text-mid);
  opacity: 0;
  max-height: 0;
  overflow: hidden;
  transform: translateY(4px);
  transition: opacity 0.4s 0.1s, transform 0.4s 0.1s, max-height 0.5s var(--ease);
  pointer-events: none;
}

.path:hover .path-mood { opacity: 0; }
.path:hover .path-reveal {
  opacity: 0.8;
  max-height: 100px;
  transform: translateY(0);
}

/* 右侧 */
.path-right {
  display: flex; align-items: center; gap: 1rem;
}

.path-era {
  font-family: var(--font-mono);
  font-size: 0.5rem; font-weight: 400;
  letter-spacing: 0.1em; color: var(--p-text-ghost);
  white-space: nowrap;
}

.path-go {
  display: flex; align-items: center;
  color: var(--accent);
  opacity: 0;
  transform: translateX(-6px);
  transition: opacity 0.3s, transform 0.3s var(--ease);
}

.path:hover .path-go {
  opacity: 0.7;
  transform: translateX(0);
}

/* 底部 */
.hall-foot {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 5rem 2rem 6rem;
}

.foot-poem {
  display: flex;
  gap: 0.5em;
}

.foot-char {
  font-family: var(--font-serif);
  font-size: 0.875rem;
  font-weight: 300;
  color: var(--p-text-ghost);
  font-style: italic;
  transition: color 0.3s, transform 0.3s var(--ease);
  cursor: default;
}

.foot-char:hover {
  color: var(--c-psychoanalysis);
  transform: translateY(-2px);
}

.foot-comma {
  font-family: var(--font-serif);
  font-size: 0.875rem;
  font-weight: 300;
  color: var(--p-text-ghost);
  font-style: italic;
}

@media (max-width: 768px) {
  .hero-inner { padding: 0 1.5rem; }
  .title-char { font-size: clamp(2.5rem, 14vw, 4rem); }
  .paths { padding: 0 1.25rem; }
  .path {
    grid-template-columns: 40px 1fr;
    gap: 1rem;
    padding: 1.75rem 1rem;
  }
  .path-right { display: none; }
  .path-reveal { display: none; }
  .hero-scroll { display: none; }
}
</style>

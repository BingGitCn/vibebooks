<template>
  <div class="swiss-intro swiss-grid-pattern swiss-noise" @click="enterYearbook">
    <!-- Atmospheric effects -->
    <div class="stardust-overlay"></div>
    <div ref="lightPointsContainer" class="light-points"></div>

    <!-- Geometric decoration - top left -->
    <div class="geo-decoration geo-top-left">
      <div class="geo-circle"></div>
      <div class="geo-line"></div>
    </div>

    <!-- Geometric decoration - bottom right -->
    <div class="geo-decoration geo-bottom-right">
      <div class="geo-square"></div>
      <div class="geo-circle-small"></div>
    </div>

    <!-- Main content -->
    <div class="intro-container">
      <!-- Volume indicator -->
      <div class="volume-indicator fade-in-gentle" style="--delay: 0s">
        <span class="volume-text">VOL. {{ currentYear }}</span>
        <span class="separator">|</span>
        <span class="issue-text">THOUGHT ARCHIVE</span>
      </div>

      <!-- Main title -->
      <h1 class="main-title fade-in-gentle" style="--delay: 0.2s">
        <span class="title-line">BOOK</span>
        <span class="title-line accent">UNIVERSE</span>
      </h1>

      <!-- Poetic subtitle -->
      <p class="subtitle fade-in-gentle" style="--delay: 0.4s">
        <span class="subtitle-main">每一本书，都值得被探索</span>
        <span class="subtitle-sub">Where stories breathe</span>
      </p>

      <!-- Poetic divider -->
      <div class="poetic-divider fade-in-gentle" style="--delay: 0.5s"></div>

      <!-- Stats -->
      <div class="stats-container fade-in-gentle" style="--delay: 0.6s">
        <div class="stat-item">
          <span class="stat-number">{{ totalBooks }}</span>
          <span class="stat-label">ENTRIES</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <span class="stat-number">6</span>
          <span class="stat-label">CHAPTERS</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <span class="stat-number">{{ currentYear }}</span>
          <span class="stat-label">EDITION</span>
        </div>
      </div>

      <!-- CTA Button -->
      <a href="/yearbook" class="enter-button fade-in-gentle" style="--delay: 0.8s" @click.stop>
        ENTER YEARBOOK →
      </a>
    </div>

    <!-- Bottom indicator -->
    <div class="bottom-indicator fade-in-gentle" style="--delay: 1s">
      <div class="indicator-dot"></div>
      <span class="indicator-text">SCROLL OR CLICK TO ENTER</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import booksData from '../data/books'
import { useAtmosphere } from '@/composables/useAtmosphere'

const router = useRouter()
const lightPointsContainer = ref(null)
const { createLightPoints, initScrollReveal } = useAtmosphere()

const currentYear = ref(new Date().getFullYear())
const totalBooks = computed(() => booksData.length)

const enterYearbook = () => {
  console.log('Entering yearbook...')
  router.push('/yearbook')
}

let lightPoints = []

onMounted(() => {
  // 创建光点粒子效果
  if (lightPointsContainer.value) {
    lightPoints = createLightPoints(lightPointsContainer.value, 12)
  }

  // 初始化滚动揭示效果
  initScrollReveal()
})

onUnmounted(() => {
  // 清理光点
  lightPoints.forEach(point => point.remove())
})
</script>

<style scoped>
@import '../styles/swiss-style.css';
@import '../styles/atmosphere.css';

.swiss-intro {
  min-height: 100vh;
  background: linear-gradient(135deg, #FFFEFC 0%, #FAFAFA 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  cursor: pointer;
}

/* 氛围光晕 */
.swiss-intro::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 80%;
  height: 80%;
  background: radial-gradient(
    circle,
    rgba(255, 48, 0, 0.03) 0%,
    transparent 70%
  );
  transform: translate(-50%, -50%);
  pointer-events: none;
  animation: gentle-breathe 6s ease-in-out infinite;
}

@keyframes gentle-breathe {
  0%, 100% {
    opacity: 0.5;
    transform: translate(-50%, -50%) scale(1);
  }
  50% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1.1);
  }
}

/* Geometric decorations */
.geo-decoration {
  position: absolute;
  pointer-events: none;
}

.geo-top-left {
  top: 10%;
  left: 10%;
}

.geo-bottom-right {
  bottom: 10%;
  right: 10%;
}

.geo-circle {
  width: 120px;
  height: 120px;
  border: 3px solid var(--swiss-black);
  border-radius: 50%;
  position: relative;
}

.geo-line {
  position: absolute;
  width: 2px;
  height: 80px;
  background-color: var(--swiss-accent);
  top: 140px;
  left: 59px;
}

.geo-square {
  width: 80px;
  height: 80px;
  border: 3px solid var(--swiss-black);
  position: relative;
}

.geo-circle-small {
  width: 40px;
  height: 40px;
  border: 2px solid var(--swiss-accent);
  border-radius: 50%;
  position: absolute;
  top: -20px;
  right: -20px;
  background-color: var(--swiss-accent);
}

/* Main container */
.intro-container {
  text-align: center;
  position: relative;
  z-index: 10;
  padding: 2rem;
}

/* Volume indicator */
.volume-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 3rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  color: var(--swiss-text-secondary);
}

.separator {
  color: var(--swiss-accent);
}

/* Main title - 诗意光晕 */
.main-title {
  font-family: 'Inter', sans-serif;
  font-weight: 900;
  font-size: clamp(4rem, 15vw, 12rem);
  text-transform: uppercase;
  line-height: 0.85;
  letter-spacing: -0.05em;
  margin: 0 0 2rem 0;
  cursor: pointer;
  transition: transform 0.3s ease-out;
  position: relative;
}

/* 标题光晕效果 */
.main-title .accent {
  position: relative;
  z-index: 1;
}

.main-title .accent::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 120%;
  height: 120%;
  background: radial-gradient(
    circle,
    rgba(255, 48, 0, 0.15) 0%,
    transparent 70%
  );
  transform: translate(-50%, -50%);
  z-index: -1;
  animation: title-glow 3s ease-in-out infinite;
}

@keyframes title-glow {
  0%, 100% {
    opacity: 0.6;
    transform: translate(-50%, -50%) scale(1);
  }
  50% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1.05);
  }
}

.main-title:hover {
  transform: scale(1.02);
}

.title-line {
  display: block;
}

.title-line.accent {
  color: var(--swiss-accent);
}

/* Subtitle - 诗意化 */
.subtitle {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin: 0 0 3rem 0;
}

.subtitle-main {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: clamp(1rem, 2.5vw, 1.5rem);
  letter-spacing: 0.2em;
  color: var(--swiss-black);
  margin: 0;
}

.subtitle-sub {
  font-family: 'Inter', sans-serif;
  font-weight: 300;
  font-size: clamp(0.75rem, 1.5vw, 0.875rem);
  letter-spacing: 0.4em;
  color: var(--swiss-text-secondary);
  font-style: italic;
  margin: 0;
  opacity: 0.7;
}

/* 诗意分隔线 */
.poetic-divider {
  width: 80px;
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent,
    var(--swiss-accent),
    transparent
  );
  margin: 0 auto 3rem;
  opacity: 0.3;
}

/* Stats */
.stats-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 4rem;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.stat-number {
  font-family: 'Inter', sans-serif;
  font-weight: 900;
  font-size: clamp(2rem, 5vw, 3.5rem);
  line-height: 1;
}

.stat-label {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 0.625rem;
  letter-spacing: 0.2em;
  color: var(--swiss-text-secondary);
}

.stat-divider {
  width: 1px;
  height: 3rem;
  background-color: var(--swiss-border);
  opacity: 0.2;
}

/* CTA Button - 诗意交互 */
.enter-button {
  display: inline-block;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 0.875rem;
  letter-spacing: 0.2em;
  padding: 1.25rem 3rem;
  background-color: var(--swiss-black);
  color: var(--swiss-white);
  border: 3px solid var(--swiss-black);
  text-decoration: none;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  user-select: none;
  -webkit-user-select: none;
  pointer-events: auto;
  position: relative;
  z-index: 100;
  overflow: hidden;
}

/* 按钮光晕效果 */
.enter-button::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: radial-gradient(
    circle,
    rgba(255, 48, 0, 0.3) 0%,
    transparent 70%
  );
  transform: translate(-50%, -50%);
  transition: width 0.5s ease, height 0.5s ease;
  z-index: -1;
}

.enter-button:hover::before {
  width: 300px;
  height: 300px;
}

.enter-button:hover {
  background-color: var(--swiss-accent);
  border-color: var(--swiss-accent);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(255, 48, 0, 0.25);
}

/* Bottom indicator */
.bottom-indicator {
  position: absolute;
  bottom: 3rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  z-index: 10;
}

.indicator-dot {
  width: 8px;
  height: 8px;
  border: 2px solid var(--swiss-black);
  animation: pulse-dot 2s ease-in-out infinite;
}

.indicator-text {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 0.625rem;
  letter-spacing: 0.2em;
  color: var(--swiss-text-secondary);
  pointer-events: auto;
}

@keyframes pulse-dot {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.5);
    opacity: 0.5;
  }
}

/* Hover effects on geometric elements */
.swiss-intro:hover .geo-circle {
  animation: rotate-circle 20s linear infinite;
}

.swiss-intro:hover .geo-square {
  animation: rotate-square 15s linear infinite reverse;
}

@keyframes rotate-circle {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes rotate-square {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .intro-container {
    padding: 1rem;
  }

  .volume-indicator {
    font-size: 0.625rem;
    gap: 1rem;
  }

  .stats-container {
    gap: 1rem;
  }

  .stat-number {
    font-size: 1.5rem;
  }

  .enter-button {
    padding: 1rem 2rem;
    font-size: 0.75rem;
  }

  .geo-circle {
    width: 80px;
    height: 80px;
  }

  .geo-square {
    width: 60px;
    height: 60px;
  }
}
</style>

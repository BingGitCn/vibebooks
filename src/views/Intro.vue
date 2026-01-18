<template>
  <div class="swiss-intro swiss-grid-pattern swiss-noise">
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
      <div class="volume-indicator">
        <span class="volume-text">VOL. 2025</span>
        <span class="separator">|</span>
        <span class="issue-text">THOUGHT ARCHIVE</span>
      </div>

      <!-- Main title -->
      <h1 class="main-title" @click="enterYearbook">
        <span class="title-line">BOOK</span>
        <span class="title-line accent">UNIVERSE</span>
      </h1>

      <!-- Subtitle -->
      <p class="subtitle">
        A SWISS-STYLE YEARBOOK OF IDEAS
      </p>

      <!-- Stats -->
      <div class="stats-container">
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
      <button class="enter-button" @click="enterYearbook">
        <span class="button-text">ENTER YEARBOOK</span>
        <span class="button-arrow">→</span>
      </button>
    </div>

    <!-- Bottom indicator -->
    <div class="bottom-indicator">
      <div class="indicator-dot"></div>
      <span class="indicator-text">SCROLL OR CLICK TO ENTER</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import booksData from '../data/books'

const router = useRouter()

const currentYear = ref(new Date().getFullYear())
const totalBooks = computed(() => booksData.length)

const enterYearbook = () => {
  console.log('Entering yearbook...')
  router.push('/yearbook')
}

onMounted(() => {
  // Add any initialization here
})
</script>

<style scoped>
@import '../styles/swiss-style.css';

.swiss-intro {
  min-height: 100vh;
  background-color: var(--swiss-white);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  cursor: pointer;
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

/* Main title */
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

/* Subtitle */
.subtitle {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: clamp(0.875rem, 2vw, 1.25rem);
  letter-spacing: 0.3em;
  color: var(--swiss-text-secondary);
  margin: 0 0 4rem 0;
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

/* CTA Button */
.enter-button {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 0.875rem;
  letter-spacing: 0.2em;
  padding: 1.25rem 3rem;
  background-color: var(--swiss-black);
  color: var(--swiss-white);
  border: 3px solid var(--swiss-black);
  cursor: pointer;
  text-transform: uppercase;
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  transition: all 0.2s ease-out;
}

.enter-button:hover {
  background-color: var(--swiss-accent);
  border-color: var(--swiss-accent);
  transform: translateY(-2px);
}

.button-arrow {
  display: inline-block;
  transition: transform 0.2s ease-out;
}

.enter-button:hover .button-arrow {
  transform: translateX(4px);
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

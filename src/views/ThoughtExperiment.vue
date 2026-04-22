<template>
  <div class="experiment-page" @mousemove="onMouseMove">
    <!-- 涟漪容器 -->
    <div ref="rippleContainer" class="ripple-container"></div>

    <!-- 顶部导航 -->
    <nav class="top-nav">
      <button class="back-btn" @click="goBack">
        <span class="arrow">←</span> RETURN
      </button>
      <span class="code-label">{{ concept.code }} / {{ concept.nameEn }}</span>
    </nav>

    <!-- 主内容 -->
    <div class="experiment-content">
      <!-- 场景描述（打字机效果） -->
      <div class="scenario-section">
        <p class="scenario-text">
          <span
            v-for="(char, i) in displayedScenario"
            :key="i"
            class="typewriter-char"
            :style="{ animationDelay: (i * 40) + 'ms' }"
          >{{ char }}</span>
          <span v-if="showCursor" class="cursor">|</span>
        </p>
      </div>

      <!-- 选择卡片 -->
      <div class="choices-area" :class="{ 'choices-visible': showChoices }">
        <div
          v-for="(choice, index) in concept.experiment.choices"
          :key="index"
          class="choice-card"
          :class="{
            'chosen': chosenIndex === index,
            'unchosen': chosenIndex !== null && chosenIndex !== index,
            'sinking': chosenIndex !== null && chosenIndex !== index,
          }"
          @click="chooseCard(index)"
        >
          <div class="choice-glass">
            <p class="choice-quote">"{{ choice.text }}"</p>
            <div class="choice-ring"></div>
          </div>
        </div>
      </div>

      <!-- 选择后的感受 -->
      <div
        class="feeling-reveal"
        :class="{ 'feeling-visible': showFeeling }"
        v-if="chosenIndex !== null"
      >
        <p class="feeling-text">{{ concept.experiment.choices[chosenIndex].feeling }}</p>
      </div>

      <!-- 揭示区域 -->
      <div
        class="reveal-section"
        :class="{ 'reveal-visible': showReveal }"
        v-if="showReveal"
      >
        <div class="reveal-divider"></div>
        <p class="reveal-text">{{ concept.experiment.reveal }}</p>

        <!-- 墨迹展开效果 -->
        <div class="concept-name-block ink-reveal">
          <h2 class="concept-name-en">{{ concept.nameEn }}</h2>
          <p class="concept-name-zh">{{ concept.name }}</p>
          <p class="concept-one-line">{{ concept.oneLine }}</p>
        </div>

        <!-- 继续探索按钮 -->
        <button class="explore-btn" @click="goToConcept">
          <span>继续探索这个概念</span>
          <span class="arrow-right">→</span>
        </button>
      </div>
    </div>

    <!-- 水面 -->
    <div class="water-surface"></div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getConceptBySlug } from '../data/concepts'

const router = useRouter()
const route = useRoute()
const rippleContainer = ref(null)

const concept = computed(() => {
  const slug = route.params.slug
  return getConceptBySlug(slug) || getConceptBySlug('cognitive-dissonance')
})

// 状态
const displayedScenario = ref([])
const showCursor = ref(true)
const showChoices = ref(false)
const chosenIndex = ref(null)
const showFeeling = ref(false)
const showReveal = ref(false)

let typewriterTimer = null

// 打字机效果
function startTypewriter() {
  const text = concept.value.experiment.scenario
  let index = 0
  displayedScenario.value = []

  typewriterTimer = setInterval(() => {
    if (index < text.length) {
      displayedScenario.value.push(text[index])
      index++
    } else {
      clearInterval(typewriterTimer)
      showCursor.value = false
      setTimeout(() => {
        showChoices.value = true
      }, 400)
    }
  }, 50)
}

function chooseCard(index) {
  if (chosenIndex.value !== null) return
  chosenIndex.value = index

  setTimeout(() => { showFeeling.value = true }, 600)
  setTimeout(() => { showReveal.value = true }, 1800)
}

function goBack() {
  router.push('/')
}

function goToConcept() {
  router.push(`/concept/${concept.value.slug}`)
}

function onMouseMove(e) {
  // 创建微弱涟漪
  if (Math.random() < 0.1 && rippleContainer.value) {
    const ripple = document.createElement('div')
    ripple.className = 'psyche-ripple'
    ripple.style.left = (e.clientX - 200) + 'px'
    ripple.style.top = (e.clientY - 200) + 'px'
    rippleContainer.value.appendChild(ripple)
    setTimeout(() => ripple.remove(), 2000)
  }
}

onMounted(() => {
  setTimeout(startTypewriter, 500)
})

onUnmounted(() => {
  if (typewriterTimer) clearInterval(typewriterTimer)
})
</script>

<style scoped>
@import '../styles/psyche.css';

.experiment-page {
  min-height: 100vh;
  background-color: var(--psyche-bg);
  position: relative;
  overflow: hidden;
}

.ripple-container {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 1;
}

/* === 顶部导航 === */
.top-nav {
  position: relative;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid var(--psyche-line);
}

.back-btn {
  font-family: var(--font-sans);
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  background: none;
  border: none;
  color: var(--psyche-text);
  cursor: pointer;
  padding: 0.5rem 0;
  transition: color 0.2s ease;
}

.back-btn:hover {
  color: var(--psyche-accent);
}

.back-btn .arrow {
  margin-right: 0.5rem;
  transition: transform 0.2s ease;
}

.back-btn:hover .arrow {
  transform: translateX(-3px);
}

.code-label {
  font-family: var(--font-sans);
  font-size: 0.625rem;
  font-weight: 500;
  letter-spacing: 0.25em;
  color: var(--psyche-muted);
}

/* === 主内容 === */
.experiment-content {
  position: relative;
  z-index: 2;
  max-width: 640px;
  margin: 0 auto;
  padding: 4rem 2rem 6rem;
}

/* === 场景文字 === */
.scenario-section {
  min-height: 80px;
  margin-bottom: 3rem;
}

.scenario-text {
  font-family: var(--font-serif);
  font-size: clamp(1.125rem, 2.5vw, 1.375rem);
  line-height: 1.8;
  color: var(--psyche-text);
}

.cursor {
  animation: blink 0.8s ease-in-out infinite;
  color: var(--psyche-accent);
  font-weight: 300;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

/* === 选择卡片 === */
.choices-area {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2rem;
  opacity: 0;
  transform: translateY(16px);
  transition: all 0.8s var(--ease-out-expo);
}

.choices-area.choices-visible {
  opacity: 1;
  transform: translateY(0);
}

.choice-card {
  flex: 1;
  cursor: pointer;
  transition: all 0.6s var(--ease-out-expo);
}

.choice-card.unchosen {
  opacity: 0.15;
  transform: translateY(30px) scale(0.95);
  pointer-events: none;
}

.choice-glass {
  background: var(--psyche-card-bg);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid var(--psyche-line);
  padding: 2rem 1.5rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  transition: all 0.4s var(--ease-out-expo);
  animation: breathe 4s ease-in-out infinite;
}

.choice-card:hover .choice-glass {
  border-color: rgba(74, 88, 153, 0.2);
  box-shadow: 0 4px 24px rgba(74, 88, 153, 0.08);
}

/* 震颤效果 */
.choice-card:hover .choice-quote {
  animation: tremor 0.6s ease-in-out;
}

@keyframes tremor {
  0%, 100% { transform: translateX(0); }
  20% { transform: translateX(-1px); }
  40% { transform: translateX(1px); }
  60% { transform: translateX(-0.5px); }
  80% { transform: translateX(0.5px); }
}

.choice-quote {
  font-family: var(--font-serif);
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.6;
  color: var(--psyche-text);
  margin-bottom: 1rem;
}

.choice-ring {
  width: 24px;
  height: 24px;
  border: 2px solid var(--psyche-muted);
  border-radius: 50%;
  margin: 0 auto;
  opacity: 0.3;
  transition: all 0.3s ease;
}

.choice-card:hover .choice-ring {
  border-color: var(--psyche-accent);
  opacity: 0.8;
}

.choice-card.chosen .choice-glass {
  border-color: var(--psyche-accent);
  background: rgba(74, 88, 153, 0.05);
  animation: none;
}

.choice-card.chosen .choice-ring {
  background: var(--psyche-accent);
  border-color: var(--psyche-accent);
  opacity: 1;
}

/* === 感受文字 === */
.feeling-reveal {
  opacity: 0;
  transform: translateY(8px);
  transition: all 0.8s var(--ease-out-expo);
}

.feeling-reveal.feeling-visible {
  opacity: 1;
  transform: translateY(0);
}

.feeling-text {
  font-family: var(--font-serif);
  font-size: 0.9375rem;
  font-style: italic;
  line-height: 1.7;
  color: var(--psyche-accent);
  padding-left: 1rem;
  border-left: 2px solid var(--psyche-accent);
}

/* === 揭示区域 === */
.reveal-section {
  margin-top: 3rem;
  opacity: 0;
  transform: translateY(16px);
  transition: all 1s var(--ease-out-expo);
}

.reveal-section.reveal-visible {
  opacity: 1;
  transform: translateY(0);
}

.reveal-divider {
  width: 40px;
  height: 1px;
  background: var(--psyche-reveal);
  opacity: 0.4;
  margin: 0 auto 2rem;
}

.reveal-text {
  font-family: var(--font-serif);
  font-size: clamp(0.9375rem, 2vw, 1.0625rem);
  line-height: 1.8;
  color: var(--psyche-muted);
  text-align: center;
  margin-bottom: 2.5rem;
}

/* === 概念名称块 === */
.concept-name-block {
  text-align: center;
  padding: 2.5rem 0;
  margin-bottom: 2rem;
}

.concept-name-en {
  font-family: var(--font-sans);
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  font-weight: 700;
  letter-spacing: 0.08em;
  color: var(--psyche-accent);
  margin-bottom: 0.5rem;
}

.concept-name-zh {
  font-family: var(--font-serif);
  font-size: clamp(1rem, 2vw, 1.25rem);
  color: var(--psyche-text);
  margin-bottom: 1rem;
}

.concept-one-line {
  font-family: var(--font-serif);
  font-size: 0.9375rem;
  font-style: italic;
  color: var(--psyche-muted);
  line-height: 1.7;
  max-width: 480px;
  margin: 0 auto;
}

/* === 继续探索 === */
.explore-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin: 0 auto;
  font-family: var(--font-sans);
  font-size: 0.8125rem;
  font-weight: 500;
  letter-spacing: 0.12em;
  background: none;
  border: 1px solid var(--psyche-text);
  color: var(--psyche-text);
  padding: 1rem 2.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.explore-btn:hover {
  background: var(--psyche-text);
  color: var(--psyche-bg);
}

.explore-btn:hover .arrow-right {
  transform: translateX(4px);
}

.arrow-right {
  transition: transform 0.3s ease;
}

/* === 响应式 === */
@media (max-width: 768px) {
  .top-nav {
    padding: 1rem 1.5rem;
  }

  .experiment-content {
    padding: 2.5rem 1.5rem 5rem;
  }

  .choices-area {
    flex-direction: column;
    gap: 1rem;
  }

  .choice-glass {
    padding: 1.5rem 1rem;
  }
}
</style>

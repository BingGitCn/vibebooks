<template>
  <div class="prince-world" :class="{ 'is-transitioning': isTransitioning }">
    <!-- 跃迁动画遮罩 -->
    <transition name="warp">
      <div v-if="showWarp" class="warp-overlay">
        <div class="warp-circle">
          <div class="warp-circle-inner"></div>
        </div>
        <div class="warp-text">B-612</div>
      </div>
    </transition>

    <!-- 返回按钮 -->
    <button class="exit-btn" @click="exitWorld">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M19 12H5M12 19l-7-7 7-7"/>
      </svg>
      <span>Return to Universe</span>
    </button>

    <!-- 滚动容器 - 七个场景 -->
    <div class="scroll-container" ref="scrollContainer">
      <!-- Section 1: 引言 -->
      <section class="story-section section-intro" :class="{ 'is-visible': sectionsVisible.intro }" data-section="intro">
        <div class="section-content">
          <div class="intro-text">
            <span class="line line-1">本质的东西</span>
            <span class="line line-2">用眼睛是</span>
            <span class="line line-3">看不见的</span>
            <span class="line line-4">What is essential is invisible to the eye</span>
          </div>
          <div class="scroll-hint">
            <span>Scroll to explore</span>
            <svg class="scroll-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
              <path d="M12 5v14M5 12l7 7 7-7"/>
            </svg>
          </div>
        </div>
      </section>

      <!-- Section 2: 星空 -->
      <section class="story-section section-stars" :class="{ 'is-visible': sectionsVisible.stars }" data-section="stars">
        <div class="stars-field" ref="starsField" @click="handleStarsClick">
          <canvas ref="starsCanvas"></canvas>
        </div>
        <div class="section-content">
          <blockquote class="section-quote">
            "星星发亮是为了让每一个人有一天都能找到属于自己的星星"
          </blockquote>
        </div>
      </section>

      <!-- Section 3: B612 小行星 -->
      <section class="story-section section-planet" :class="{ 'is-visible': sectionsVisible.planet }" data-section="planet">
        <div class="planet-wrapper">
          <div class="b612-planet">
            <svg viewBox="0 0 200 200" class="planet-svg">
              <!-- 小行星本体 -->
              <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" stroke-width="0.8" class="planet-circle"/>
              <!-- 火山口 -->
              <circle cx="85" cy="90" r="4" fill="currentColor" class="crater"/>
              <circle cx="115" cy="105" r="3" fill="currentColor" class="crater"/>
              <circle cx="95" cy="115" r="2.5" fill="currentColor" class="crater"/>
              <!-- 玫瑰位置标记 -->
              <circle cx="100" cy="70" r="2" fill="#f4d03f" class="rose-marker"/>
            </svg>
            <div class="planet-label">B-612</div>
          </div>
        </div>
        <div class="section-content">
          <p class="section-text">
            在那里，他看到了日出四十四次<br>
            <span class="text-small">There, he watched the sunset forty-four times</span>
          </p>
        </div>
      </section>

      <!-- Section 4: 玫瑰 -->
      <section class="story-section section-rose" :class="{ 'is-visible': sectionsVisible.rose }" data-section="rose">
        <div class="rose-wrapper">
          <svg viewBox="0 0 200 300" class="rose-svg">
            <!-- 茎 -->
            <line x1="100" y1="280" x2="100" y2="180" stroke="#1a1a1a" stroke-width="1" class="rose-stem"/>
            <!-- 叶 -->
            <path d="M100 240 Q 80 230 70 240 Q 85 245 100 240" fill="none" stroke="#1a1a1a" stroke-width="0.8" class="rose-leaf"/>
            <path d="M100 220 Q 120 210 130 220 Q 115 225 100 220" fill="none" stroke="#1a1a1a" stroke-width="0.8" class="rose-leaf"/>
            <!-- 花瓣 - 几何化 -->
            <g class="rose-petals">
              <circle cx="100" cy="160" r="25" fill="none" stroke="#f4d03f" stroke-width="1.5" class="petal-outer"/>
              <circle cx="100" cy="160" r="18" fill="none" stroke="#f4d03f" stroke-width="1.2" class="petal-middle"/>
              <circle cx="100" cy="160" r="10" fill="none" stroke="#f4d03f" stroke-width="0.8" class="petal-inner"/>
              <circle cx="100" cy="160" r="4" fill="#f4d03f" class="rose-center"/>
            </g>
          </svg>
        </div>
        <div class="section-content">
          <blockquote class="section-quote section-quote--gold">
            "你要永远为你驯服过的东西负责"
          </blockquote>
          <p class="section-text">
            正是你为你的玫瑰花费的时光<br>
            <span class="text-small">It is the time you have wasted for your rose that makes your rose so important</span>
          </p>
        </div>
      </section>

      <!-- Section 5: 狐狸 -->
      <section class="story-section section-fox" :class="{ 'is-visible': sectionsVisible.fox }" data-section="fox">
        <div class="fox-wrapper">
          <svg viewBox="0 0 300 200" class="fox-svg">
            <!-- 极简狐狸轮廓 -->
            <g class="fox-outline" stroke="#1a1a1a" stroke-width="1.5" fill="none">
              <!-- 耳朵 -->
              <path d="M 80 70 L 95 90 L 110 70" class="fox-ear-left"/>
              <path d="M 120 70 L 135 90 L 150 70" class="fox-ear-right"/>
              <!-- 头 -->
              <circle cx="115" cy="95" r="30" class="fox-head"/>
              <!-- 眼睛 -->
              <circle cx="105" cy="90" r="2" fill="#1a1a1a" class="fox-eye"/>
              <circle cx="125" cy="90" r="2" fill="#1a1a1a" class="fox-eye"/>
              <!-- 身体 -->
              <path d="M 145 100 Q 180 110 200 140 L 200 160 L 140 150 Q 130 130 145 100" class="fox-body"/>
              <!-- 尾巴 -->
              <path d="M 200 140 Q 250 120 260 150 Q 255 170 200 160" class="fox-tail"/>
            </g>
          </svg>
        </div>
        <div class="section-content">
          <p class="section-text">
            "请驯服我吧"<br>
          </p>
          <blockquote class="section-quote">
            "只有用心才能看清事物的本质"
          </blockquote>
        </div>
      </section>

      <!-- Section 6: 告别 -->
      <section class="story-section section-goodbye" :class="{ 'is-visible': sectionsVisible.goodbye }" data-section="goodbye">
        <div class="goodbye-content">
          <div class="final-constellation">
            <svg viewBox="0 0 400 400" class="constellation-svg">
              <!-- 星座连线 -->
              <g stroke="rgba(26,26,26,0.15)" stroke-width="0.5" fill="none">
                <line x1="100" y1="150" x2="150" y2="100"/>
                <line x1="150" y1="100" x2="250" y2="100"/>
                <line x1="250" y1="100" x2="300" y2="150"/>
                <line x1="100" y1="150" x2="100" y2="250"/>
                <line x1="100" y1="250" x2="150" y2="300"/>
                <line x1="300" y1="150" x2="300" y2="250"/>
                <line x1="300" y1="250" x2="250" y2="300"/>
                <line x1="150" y1="300" x2="250" y2="300"/>
                <line x1="150" y1="100" x2="100" y2="250"/>
                <line x1="250" y1="100" x2="300" y2="250"/>
              </g>
              <!-- 星星 -->
              <g fill="#f4d03f">
                <circle cx="100" cy="150" r="3" class="constellation-star"/>
                <circle cx="150" cy="100" r="2" class="constellation-star"/>
                <circle cx="250" cy="100" r="2" class="constellation-star"/>
                <circle cx="300" cy="150" r="3" class="constellation-star"/>
                <circle cx="100" cy="250" r="2" class="constellation-star"/>
                <circle cx="150" cy="300" r="2" class="constellation-star"/>
                <circle cx="300" cy="250" r="2" class="constellation-star"/>
                <circle cx="250" cy="300" r="2" class="constellation-star"/>
              </g>
            </svg>
          </div>
          <p class="final-text">
            所有的大人都曾经是小孩<br>
            <span class="text-small">虽然，只有少数人记得</span>
          </p>
          <p class="final-quote">
            "所有的大人都曾经是小孩，虽然，只有少数人记得"
          </p>
        </div>
      </section>

      <!-- Section 7: 结尾 -->
      <section class="story-section section-end" data-section="end">
        <div class="end-content">
          <div class="book-info">
            <span class="vol-number">VOL.006</span>
            <h2 class="book-title">小王子</h2>
            <p class="book-author">圣埃克苏佩里</p>
            <p class="book-subtitle">Le Petit Prince</p>
          </div>
        </div>
      </section>
    </div>

    <!-- 金句浮层 -->
    <transition name="quote-float">
      <div v-if="floatingQuote" class="floating-quote" @click="floatingQuote = null">
        <p>{{ floatingQuote }}</p>
        <span class="quote-hint">Click to dismiss</span>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const scrollContainer = ref(null)
const starsCanvas = ref(null)
const starsField = ref(null)
const isTransitioning = ref(false)
const showWarp = ref(true)
const floatingQuote = ref(null)

// 各个场景的可见性状态
const sectionsVisible = ref({
  intro: false,
  stars: false,
  planet: false,
  rose: false,
  fox: false,
  goodbye: false,
  end: false
})

// 小王子金句
const princeQuotes = [
  '本质的东西用眼睛是看不见的',
  '你要永远为你驯服过的东西负责',
  '只有用心才能看清事物的本质',
  '所有的大人都曾经是小孩，只是很少有人记得这一点',
  '你在你的玫瑰花身上耗费的时间使得你的玫瑰花变得如此重要',
  '只有孩子们知道他们在寻找什么',
  '语言是误解的源泉',
  '如果你四点钟来，那么三点钟我就开始感到幸福',
  '一个人只有用心去看，才能看到真实'
]

let scrollObserver = null
let starsAnimationId = null
let starsCtx = null
let stars = []

// 星星类
class Star {
  constructor(canvas) {
    this.canvas = canvas
    this.reset()
  }

  reset() {
    this.x = Math.random() * this.canvas.width
    this.y = Math.random() * this.canvas.height
    this.size = Math.random() * 1.5 + 0.5
    this.baseAlpha = Math.random() * 0.3 + 0.1
    this.twinkleSpeed = Math.random() * 0.015 + 0.005
    this.twinkleOffset = Math.random() * Math.PI * 2
  }

  update(time) {
    this.currentAlpha = this.baseAlpha + Math.sin(time * this.twinkleSpeed + this.twinkleOffset) * 0.1
  }

  draw(ctx) {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(26, 26, 26, ${this.currentAlpha})`
    ctx.fill()
  }
}

// 初始化星星画布
const initStarsCanvas = () => {
  const canvas = starsCanvas.value
  if (!canvas || !starsField.value) return

  starsCtx = canvas.getContext('2d')

  const resizeCanvas = () => {
    const rect = starsField.value.getBoundingClientRect()
    canvas.width = rect.width
    canvas.height = rect.height
    stars.forEach(star => star.reset())
  }

  resizeCanvas()

  // 创建星星
  stars = Array.from({ length: 80 }, () => new Star(canvas))

  let time = 0
  const animate = () => {
    time++
    starsCtx.clearRect(0, 0, canvas.width, canvas.height)

    stars.forEach(star => {
      star.update(time)
      star.draw(starsCtx)
    })

    starsAnimationId = requestAnimationFrame(animate)
  }

  animate()

  window.addEventListener('resize', resizeCanvas)
}

// 点击星星区域触发金句
const handleStarsClick = () => {
  const quote = princeQuotes[Math.floor(Math.random() * princeQuotes.length)]
  floatingQuote.value = quote

  setTimeout(() => {
    floatingQuote.value = null
  }, 4000)
}

// 初始化滚动监听
const initScrollObserver = () => {
  const options = {
    root: scrollContainer.value,
    threshold: 0.3
  }

  scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const sectionName = entry.target.dataset.section
      if (sectionName && entry.isIntersecting) {
        sectionsVisible.value[sectionName] = true
      }
    })
  }, options)

  // 观察所有场景
  const sections = scrollContainer.value?.querySelectorAll('.story-section')
  sections?.forEach(section => scrollObserver.observe(section))
}

// 退出世界
const exitWorld = async () => {
  isTransitioning.value = true
  await nextTick()
  setTimeout(() => {
    router.push('/universe')
  }, 800)
}

onMounted(async () => {
  // 跃迁动画：1.8秒后消失
  setTimeout(() => {
    showWarp.value = false
  }, 1800)

  await nextTick()

  // 初始化滚动监听
  initScrollObserver()

  // 立即标记第一个场景为可见
  setTimeout(() => {
    sectionsVisible.value.intro = true
  }, 2000)

  // 初始化星星画布
  initStarsCanvas()
})

onUnmounted(() => {
  if (scrollObserver) {
    scrollObserver.disconnect()
  }
  if (starsAnimationId) {
    cancelAnimationFrame(starsAnimationId)
  }
})
</script>

<style scoped>
.prince-world {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(180deg, #f7f5f2 0%, #efe8d9 50%, #e8dcc8 100%);
  overflow: hidden;
  z-index: 1000;
}

/* === 跃迁动画 === */
.warp-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #f7f5f2;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5000;
}

.warp-circle {
  width: 300px;
  height: 300px;
  border: 1px solid rgba(244, 208, 63, 0.3);
  border-radius: 50%;
  position: relative;
  animation: warp-expand 1.5s ease-out forwards;
}

.warp-circle-inner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 200px;
  border: 1px solid rgba(244, 208, 63, 0.5);
  border-radius: 50%;
  animation: warp-pulse 1s ease-in-out infinite;
}

.warp-text {
  position: absolute;
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  letter-spacing: 0.3em;
  color: rgba(244, 208, 63, 0.8);
  animation: warp-fade 1.5s ease-out forwards;
}

@keyframes warp-expand {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: scale(3);
    opacity: 0;
  }
}

@keyframes warp-pulse {
  0%, 100% {
    transform: translate(-50%, -50%) scale(1);
  }
  50% {
    transform: translate(-50%, -50%) scale(1.1);
  }
}

@keyframes warp-fade {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  50% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
  }
}

.warp-enter-active,
.warp-leave-active {
  transition: opacity 0.5s ease;
}

.warp-enter-from,
.warp-leave-to {
  opacity: 0;
}

/* === 返回按钮 === */
.exit-btn {
  position: absolute;
  top: 2rem;
  left: 2rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1.5rem;
  background: rgba(26, 26, 26, 0.03);
  border: 1px solid rgba(26, 26, 26, 0.08);
  color: #1a1a1a;
  backdrop-filter: blur(10px);
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 3000;
}

.exit-btn:hover {
  background: rgba(26, 26, 26, 0.9);
  color: #f7f5f2;
  transform: translateX(-3px);
}

.exit-btn svg {
  width: 16px;
  height: 16px;
}

/* === 滚动容器 === */
.scroll-container {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  scroll-behavior: smooth;
}

.scroll-container::-webkit-scrollbar {
  width: 4px;
}

.scroll-container::-webkit-scrollbar-track {
  background: rgba(26, 26, 26, 0.02);
}

.scroll-container::-webkit-scrollbar-thumb {
  background: rgba(244, 208, 63, 0.3);
  border-radius: 2px;
}

/* 占位内容 */
.placeholder-content {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Noto Serif SC', serif;
  font-size: 1.5rem;
  color: #1a1a1a;
}

/* === Section 通用样式 === */
.story-section {
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  opacity: 0;
  transform: translateY(40px);
  transition: all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.story-section.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.section-content {
  text-align: center;
  z-index: 2;
  padding: 0 2rem;
}

/* === Section 1: 引言 === */
.section-intro {
  background: transparent;
}

.intro-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.intro-text .line {
  font-family: 'Noto Serif SC', serif;
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 300;
  color: #1a1a1a;
  letter-spacing: 0.15em;
  opacity: 0;
  transform: translateY(20px);
}

.section-intro.is-visible .line-1 {
  animation: line-appear 0.8s ease forwards;
}

.section-intro.is-visible .line-2 {
  animation: line-appear 0.8s ease forwards 0.2s;
}

.section-intro.is-visible .line-3 {
  animation: line-appear 0.8s ease forwards 0.4s;
}

.section-intro.is-visible .line-4 {
  animation: line-appear 0.8s ease forwards 0.8s;
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-size: clamp(1rem, 2vw, 1.3rem);
  color: #666;
  letter-spacing: 0.1em;
  margin-top: 1rem;
}

@keyframes line-appear {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.scroll-hint {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin-top: 3rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  color: #999;
  opacity: 0;
  animation: fade-in 1s ease 2s forwards;
}

.scroll-arrow {
  width: 20px;
  height: 20px;
  animation: scroll-bounce 2s ease-in-out infinite;
}

@keyframes scroll-bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(8px);
  }
}

@keyframes fade-in {
  to {
    opacity: 1;
  }
}

/* === Section 2: 星空 === */
.section-stars {
  background: transparent;
}

.stars-field {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

.stars-field canvas {
  width: 100%;
  height: 100%;
}

.section-quote {
  font-family: 'Noto Serif SC', serif;
  font-size: clamp(1.2rem, 3vw, 1.8rem);
  font-weight: 300;
  color: #1a1a1a;
  line-height: 1.8;
  max-width: 800px;
  padding: 0 2rem;
  position: relative;
}

.section-quote::before,
.section-quote::after {
  content: '"';
  font-size: 3em;
  color: rgba(244, 208, 63, 0.3);
  position: absolute;
}

.section-quote::before {
  top: -0.3em;
  left: -0.2em;
}

.section-quote::after {
  bottom: -0.6em;
  right: -0.2em;
}

/* === 金句浮层 === */
.floating-quote {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(26, 26, 26, 0.95);
  color: #f4d03f;
  padding: 2rem 3rem;
  border-radius: 4px;
  max-width: 600px;
  text-align: center;
  z-index: 4000;
  cursor: pointer;
}

.floating-quote p {
  font-family: 'Noto Serif SC', serif;
  font-size: clamp(1.2rem, 2.5vw, 1.6rem);
  font-weight: 300;
  line-height: 1.8;
  letter-spacing: 0.1em;
  margin-bottom: 1rem;
}

.quote-hint {
  font-family: 'Inter', sans-serif;
  font-size: 0.65rem;
  letter-spacing: 0.2em;
  color: rgba(244, 208, 63, 0.6);
  text-transform: uppercase;
}

.quote-float-enter-active {
  animation: quote-appear 0.6s ease;
}

.quote-float-leave-active {
  animation: quote-disappear 0.4s ease;
}

@keyframes quote-appear {
  from {
    opacity: 0;
    transform: translate(-50%, -45%);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
}

@keyframes quote-disappear {
  from {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
  to {
    opacity: 0;
    transform: translate(-50%, -55%);
  }
}

/* === Section 3: B612 小行星 === */
.section-planet {
  background: transparent;
}

.planet-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.b612-planet {
  width: 300px;
  height: 300px;
  position: relative;
  animation: planet-float 20s ease-in-out infinite;
  color: #1a1a1a;
}

.planet-svg {
  width: 100%;
  height: 100%;
}

.planet-circle {
  animation: planet-glow 4s ease-in-out infinite;
}

.crater {
  opacity: 0.3;
}

.rose-marker {
  animation: rose-pulse 2s ease-in-out infinite;
}

.planet-label {
  position: absolute;
  bottom: 20%;
  left: 50%;
  transform: translateX(-50%);
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  letter-spacing: 0.3em;
  color: #666;
}

@keyframes planet-float {
  0%, 100% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  50% {
    transform: translate(-50%, -50%) rotate(180deg);
  }
}

@keyframes planet-glow {
  0%, 100% {
    opacity: 0.8;
  }
  50% {
    opacity: 1;
  }
}

@keyframes rose-pulse {
  0%, 100% {
    opacity: 0.5;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.3);
  }
}

/* === Section 4: 玫瑰 === */
.section-rose {
  background: rgba(244, 208, 63, 0.03);
}

.rose-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 250px;
  height: 350px;
}

.rose-svg {
  width: 100%;
  height: 100%;
}

.rose-stem {
  stroke-dasharray: 100;
  stroke-dashoffset: 100;
}

.rose-leaf {
  stroke-dasharray: 30;
  stroke-dashoffset: 30;
  opacity: 0;
}

.section-rose.is-visible .rose-stem {
  animation: draw-line 2s ease forwards 0.5s;
}

.section-rose.is-visible .rose-leaf:nth-of-type(1) {
  animation: draw-leaf 1s ease forwards 1.5s;
}

.section-rose.is-visible .rose-leaf:nth-of-type(2) {
  animation: draw-leaf 1s ease forwards 1.8s;
}

.rose-petals circle {
  opacity: 0;
}

.section-rose.is-visible .petal-outer {
  animation: petal-appear 1s ease forwards 2s;
}

.section-rose.is-visible .petal-middle {
  animation: petal-appear 1s ease forwards 2.3s;
}

.section-rose.is-visible .petal-inner {
  animation: petal-appear 1s ease forwards 2.6s;
}

.section-rose.is-visible .rose-center {
  animation: petal-appear 0.8s ease forwards 2.9s;
}

@keyframes draw-line {
  to {
    stroke-dashoffset: 0;
  }
}

@keyframes draw-leaf {
  to {
    stroke-dashoffset: 0;
    opacity: 1;
  }
}

@keyframes petal-appear {
  to {
    opacity: 1;
  }
}

.section-quote--gold {
  color: #f4d03f;
}

.section-quote--gold::before,
.section-quote--gold::after {
  color: rgba(244, 208, 63, 0.5);
}

/* === Section 5: 狐狸 === */
.section-fox {
  background: transparent;
}

.fox-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 300px;
}

.fox-svg {
  width: 100%;
  height: 100%;
}

.fox-outline path,
.fox-outline circle {
  stroke-dasharray: 500;
  stroke-dashoffset: 500;
  opacity: 0;
}

.section-fox.is-visible .fox-ear-left {
  animation: fox-draw 1.5s ease forwards 0.3s;
}

.section-fox.is-visible .fox-ear-right {
  animation: fox-draw 1.5s ease forwards 0.5s;
}

.section-fox.is-visible .fox-head {
  animation: fox-draw 1.5s ease forwards 0.7s;
}

.section-fox.is-visible .fox-eye {
  animation: fox-fill 0.5s ease forwards 1.2s;
}

.section-fox.is-visible .fox-body {
  animation: fox-draw 2s ease forwards 0.9s;
}

.section-fox.is-visible .fox-tail {
  animation: fox-draw 2s ease forwards 1.1s;
}

@keyframes fox-draw {
  to {
    stroke-dashoffset: 0;
    opacity: 1;
  }
}

@keyframes fox-fill {
  to {
    opacity: 1;
  }
}

/* === Section 6: 告别 === */
.section-goodbye {
  background: linear-gradient(180deg, rgba(244, 208, 63, 0.05) 0%, transparent 100%);
}

.goodbye-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.final-constellation {
  width: 300px;
  height: 300px;
  opacity: 0;
}

.section-goodbye.is-visible .final-constellation {
  animation: constellation-fade 2s ease forwards 0.5s;
}

.constellation-svg {
  width: 100%;
  height: 100%;
}

.constellation-star {
  opacity: 0;
}

.section-goodbye.is-visible .constellation-star:nth-child(odd) {
  animation: star-twinkle 3s ease-in-out infinite forwards;
  animation-delay: 0s;
}

.section-goodbye.is-visible .constellation-star:nth-child(even) {
  animation: star-twinkle 3s ease-in-out infinite forwards;
  animation-delay: 1.5s;
}

@keyframes constellation-fade {
  to {
    opacity: 1;
  }
}

@keyframes star-twinkle {
  0%, 100% {
    opacity: 0.3;
  }
  50% {
    opacity: 1;
  }
}

.final-text {
  font-family: 'Noto Serif SC', serif;
  font-size: clamp(1.5rem, 3vw, 2.2rem);
  font-weight: 300;
  color: #1a1a1a;
  letter-spacing: 0.1em;
  line-height: 1.8;
  opacity: 0;
}

.section-goodbye.is-visible .final-text {
  animation: text-fade 1.5s ease forwards 1s;
}

.final-quote {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(1rem, 2vw, 1.3rem);
  font-style: italic;
  color: #666;
  max-width: 600px;
  text-align: center;
  line-height: 1.6;
  opacity: 0;
}

.section-goodbye.is-visible .final-quote {
  animation: text-fade 1.5s ease forwards 1.5s;
}

@keyframes text-fade {
  to {
    opacity: 1;
  }
}

/* === Section 7: 结尾 === */
.section-end {
  background: #f7f5f2;
}

.end-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.book-info {
  text-align: center;
}

.vol-number {
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  letter-spacing: 0.3em;
  color: #f4d03f;
  display: block;
  margin-bottom: 1rem;
}

.book-title {
  font-family: 'Noto Serif SC', serif;
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 300;
  color: #1a1a1a;
  letter-spacing: 0.15em;
  margin-bottom: 0.5rem;
}

.book-author {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.2rem;
  font-style: italic;
  color: #666;
  margin-bottom: 0.5rem;
}

.book-subtitle {
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  letter-spacing: 0.2em;
  color: #999;
  text-transform: uppercase;
}

/* === 通用文本样式 === */
.section-text {
  font-family: 'Noto Serif SC', serif;
  font-size: clamp(1.2rem, 2.5vw, 1.5rem);
  font-weight: 300;
  color: #1a1a1a;
  line-height: 2;
  letter-spacing: 0.1em;
  margin-top: 2rem;
}

.text-small {
  display: block;
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(0.9rem, 1.5vw, 1.1rem);
  font-style: italic;
  color: #666;
  letter-spacing: 0.05em;
  margin-top: 0.5rem;
}

/* === 响应式设计 === */
@media (max-width: 768px) {
  .exit-btn {
    top: 1rem;
    left: 1rem;
    padding: 0.625rem 1rem;
    font-size: 0.6rem;
  }

  .warp-circle {
    width: 200px;
    height: 200px;
  }

  .warp-circle-inner {
    width: 140px;
    height: 140px;
  }

  .warp-text {
    font-size: 0.7rem;
  }

  .section-quote {
    font-size: clamp(1rem, 4vw, 1.3rem);
    padding: 0 1.5rem;
  }

  .b612-planet {
    width: 200px;
    height: 200px;
  }

  .rose-wrapper {
    width: 180px;
    height: 250px;
  }

  .fox-wrapper {
    width: 300px;
    height: 220px;
  }

  .final-constellation {
    width: 220px;
    height: 220px;
  }

  .floating-quote {
    padding: 1.5rem 2rem;
    max-width: 85%;
  }

  .floating-quote p {
    font-size: clamp(1rem, 4vw, 1.3rem);
  }
}

</style>

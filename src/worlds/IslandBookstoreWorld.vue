<template>
  <div class="island-bookstore-world" :class="{ 'is-transitioning': isTransitioning }">
    <!-- 跃迁动画遮罩 -->
    <transition name="warp">
      <div v-if="showWarp" class="warp-overlay">
        <div class="warp-circle">
          <div class="warp-circle-inner"></div>
        </div>
        <div class="warp-text">VOL.001</div>
      </div>
    </transition>

    <!-- 返回按钮 -->
    <button class="exit-btn" @click="exitWorld">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M19 12H5M12 19l-7-7 7-7"/>
      </svg>
      <span>Return to Universe</span>
    </button>

    <!-- 滚动容器 - 五个章节 -->
    <div class="scroll-container" ref="scrollContainer">
      <!-- Chapter 1: 孤岛 -->
      <section class="story-chapter chapter-1" :class="{ 'is-visible': chaptersVisible.chapter1 }" data-chapter="1">
        <div class="chapter-content">
          <div class="chapter1-wave-container" ref="waveCanvasContainer">
            <canvas ref="waveCanvas"></canvas>
          </div>
          <div class="chapter1-island">
            <svg viewBox="0 0 100 100" class="island-svg">
              <circle cx="50" cy="50" r="15" fill="#1a1a1a"/>
            </svg>
          </div>
          <div class="intro-text">
            <p class="intro-line-1">没有谁是一座孤岛</p>
            <p class="intro-line-2">No man is an island</p>
          </div>
        </div>
      </section>

      <!-- Chapter 2: 灯塔 -->
      <section class="story-chapter chapter-2" :class="{ 'is-visible': chaptersVisible.chapter2 }" data-chapter="2">
        <div class="chapter-content">
          <!-- 星空背景 -->
          <div class="lighthouse-stars" ref="lighthouseStars"></div>

          <!-- 灯塔主体 -->
          <div class="lighthouse-container">
            <svg viewBox="0 0 200 400" class="lighthouse-svg">
              <!-- 灯塔基座 -->
              <rect x="70" y="300" width="60" height="100" fill="#2d3748"/>
              <!-- 灯塔塔身 -->
              <polygon points="85,300 115,300 105,100 95,100" fill="#4a5568"/>
              <!-- 灯塔顶部 -->
              <rect x="90" y="90" width="20" height="10" fill="#1a202c"/>
              <!-- 灯塔光源 -->
              <circle cx="100" cy="95" r="8" fill="#f4d03f" class="lighthouse-light"/>
              <!-- 灯塔栏杆 -->
              <line x1="85" y1="100" x2="115" y2="100" stroke="#1a202c" stroke-width="2"/>
            </svg>

            <!-- 光束 -->
            <div class="lighthouse-beam" ref="lighthouseBeam">
              <div class="beam-inner"></div>
            </div>
          </div>

          <!-- 金句 -->
          <div class="lighthouse-quote">
            <p class="quote-text">我们在黑暗中并肩而行</p>
            <p class="quote-sub">We walk together in the dark</p>
          </div>
        </div>
      </section>

      <!-- Chapter 3: 书架 -->
      <section class="story-chapter chapter-3" :class="{ 'is-visible': chaptersVisible.chapter3 }" data-chapter="3">
        <div class="chapter-content">
          <!-- 粒子容器 -->
          <div class="bookshelf-particles" ref="bookshelfParticles"></div>

          <!-- 书架 -->
          <div class="bookshelf-container">
            <svg viewBox="0 0 400 300" class="bookshelf-svg">
              <!-- 书架主体 -->
              <rect x="50" y="50" width="300" height="15" fill="#8B7355" class="shelf-board"/>
              <rect x="50" y="150" width="300" height="15" fill="#8B7355" class="shelf-board"/>
              <rect x="50" y="250" width="300" height="15" fill="#8B7355" class="shelf-board"/>

              <!-- 书架侧板 -->
              <rect x="40" y="40" width="15" height="230" fill="#6B5345"/>
              <rect x="345" y="40" width="15" height="230" fill="#6B5345"/>

              <!-- 生长的书籍 - 第一层 -->
              <g class="books-row-1">
                <rect x="70" y="10" width="15" height="40" fill="#C9302C" class="growing-book" style="animation-delay: 0.2s"/>
                <rect x="88" y="5" width="12" height="45" fill="#2C3E50" class="growing-book" style="animation-delay: 0.4s"/>
                <rect x="103" y="8" width="18" height="42" fill="#27AE60" class="growing-book" style="animation-delay: 0.6s"/>
                <rect x="124" y="12" width="14" height="38" fill="#8E44AD" class="growing-book" style="animation-delay: 0.8s"/>
                <rect x="141" y="3" width="16" height="47" fill="#D35400" class="growing-book" style="animation-delay: 1s"/>
                <rect x="160" y="10" width="13" height="40" fill="#2980B9" class="growing-book" style="animation-delay: 1.2s"/>
              </g>

              <!-- 生长的书籍 - 第二层 -->
              <g class="books-row-2">
                <rect x="200" y="110" width="14" height="40" fill="#E74C3C" class="growing-book" style="animation-delay: 1.4s"/>
                <rect x="217" y="105" width="17" height="45" fill="#3498DB" class="growing-book" style="animation-delay: 1.6s"/>
                <rect x="237" y="108" width="15" height="42" fill="#1ABC9C" class="growing-book" style="animation-delay: 1.8s"/>
                <rect x="255" y="112" width="13" height="38" fill="#F39C12" class="growing-book" style="animation-delay: 2s"/>
                <rect x="271" y="103" width="16" height="47" fill="#9B59B6" class="growing-book" style="animation-delay: 2.2s"/>
              </g>

              <!-- 生长的书籍 - 第三层 -->
              <g class="books-row-3">
                <rect x="80" y="210" width="15" height="40" fill="#16A085" class="growing-book" style="animation-delay: 2.4s"/>
                <rect x="98" y="205" width="18" height="45" fill="#C0392B" class="growing-book" style="animation-delay: 2.6s"/>
                <rect x="119" y="208" width="14" height="42" fill="#7F8C8D" class="growing-book" style="animation-delay: 2.8s"/>
                <rect x="136" y="212" width="16" height="38" fill="#27AE60" class="growing-book" style="animation-delay: 3s"/>
                <rect x="155" y="203" width="15" height="47" fill="#8E44AD" class="growing-book" style="animation-delay: 3.2s"/>
                <rect x="173" y="210" width="13" height="40" fill="#D35400" class="growing-book" style="animation-delay: 3.4s"/>
              </g>
            </svg>
          </div>

          <!-- 金句 -->
          <div class="bookshelf-quote">
            <p class="quote-text">书籍是随身携带的避难所</p>
            <p class="quote-sub">Books are shelters we carry with us</p>
          </div>
        </div>
      </section>

      <!-- Chapter 4: 礼物 -->
      <section class="story-chapter chapter-4" :class="{ 'is-visible': chaptersVisible.chapter4 }" data-chapter="4">
        <div class="chapter-content">
          <!-- 礼物盒 -->
          <div class="gift-container">
            <svg viewBox="0 0 200 200" class="gift-svg">
              <!-- 礼物盒底部 -->
              <rect x="50" y="80" width="100" height="80" fill="#C9302C" class="gift-box"/>

              <!-- 礼物盒盖子 -->
              <rect x="45" y="60" width="110" height="25" fill="#E74C3C" class="gift-lid"/>

              <!-- 丝带 - 垂直 -->
              <rect x="95" y="60" width="10" height="100" fill="#F4D03F" class="gift-ribbon"/>

              <!-- 丝带 - 水平 -->
              <rect x="50" y="95" width="100" height="10" fill="#F4D03F" class="gift-ribbon"/>

              <!-- 蝴蝶结 -->
              <ellipse cx="100" cy="50" rx="20" ry="12" fill="#F4D03F" class="gift-bow"/>
              <ellipse cx="85" cy="48" rx="15" ry="10" fill="#F7DC6F" class="gift-bow-left"/>
              <ellipse cx="115" cy="48" rx="15" ry="10" fill="#F7DC6F" class="gift-bow-right"/>

              <!-- 发光效果 -->
              <circle cx="100" cy="50" r="40" fill="rgba(244, 208, 63, 0.2)" class="gift-glow"/>
            </svg>

            <!-- 连接线 -->
            <svg class="connection-lines" viewBox="0 0 400 300">
              <line x1="200" y1="150" x2="100" y2="100" stroke="rgba(74, 124, 159, 0.3)" stroke-width="1" stroke-dasharray="5,5" class="connection-line"/>
              <line x1="200" y1="150" x2="300" y2="100" stroke="rgba(74, 124, 159, 0.3)" stroke-width="1" stroke-dasharray="5,5" class="connection-line"/>
              <line x1="200" y1="150" x2="100" y2="200" stroke="rgba(74, 124, 159, 0.3)" stroke-width="1" stroke-dasharray="5,5" class="connection-line"/>
              <line x1="200" y1="150" x2="300" y2="200" stroke="rgba(74, 124, 159, 0.3)" stroke-width="1" stroke-dasharray="5,5" class="connection-line"/>

              <!-- 连接点 -->
              <circle cx="100" cy="100" r="8" fill="#4a7c9f" class="connection-point" style="animation-delay: 0.5s"/>
              <circle cx="300" cy="100" r="8" fill="#4a7c9f" class="connection-point" style="animation-delay: 1s"/>
              <circle cx="100" cy="200" r="8" fill="#4a7c9f" class="connection-point" style="animation-delay: 1.5s"/>
              <circle cx="300" cy="200" r="8" fill="#4a7c9f" class="connection-point" style="animation-delay: 2s"/>
            </svg>
          </div>

          <!-- 金句 -->
          <div class="gift-quote">
            <p class="quote-text">有些礼物会改变你的一生</p>
            <p class="quote-sub">Some gifts change your life</p>
          </div>
        </div>
      </section>

      <!-- Chapter 5: 群岛 -->
      <section class="story-chapter chapter-5" :class="{ 'is-visible': chaptersVisible.chapter5 }" data-chapter="5">
        <div class="chapter-content">
          <!-- 群岛背景 -->
          <div class="archipelago-container">
            <svg viewBox="0 0 600 400" class="archipelago-svg">
              <!-- 海洋背景 -->
              <rect width="600" height="400" fill="url(#oceanGradient)"/>

              <!-- 渐变定义 -->
              <defs>
                <linearGradient id="oceanGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style="stop-color:#e8f0f4;stop-opacity:1" />
                  <stop offset="100%" style="stop-color:#d4e4ed;stop-opacity:1" />
                </linearGradient>
              </defs>

              <!-- 连接桥梁 -->
              <g class="bridges">
                <line x1="150" y1="200" x2="300" y2="200" stroke="rgba(74, 124, 159, 0.4)" stroke-width="3" stroke-dasharray="10,5"/>
                <line x1="300" y1="200" x2="450" y2="150" stroke="rgba(74, 124, 159, 0.4)" stroke-width="3" stroke-dasharray="10,5"/>
                <line x1="300" y1="200" x2="350" y2="280" stroke="rgba(74, 124, 159, 0.4)" stroke-width="3" stroke-dasharray="10,5"/>
              </g>

              <!-- 岛屿 1 - 主岛 -->
              <g class="island-main">
                <circle cx="300" cy="200" r="50" fill="#1a1a1a" class="island-circle"/>
                <circle cx="300" cy="200" r="40" fill="none" stroke="#4a7c9f" stroke-width="2" class="island-ring"/>
                <text x="300" y="205" text-anchor="middle" fill="#f7f5f2" font-size="12" font-family="Inter">AJ</text>
              </g>

              <!-- 岛屿 2 - 玛雅 -->
              <g class="island-2">
                <circle cx="150" cy="200" r="35" fill="#2d3748" class="island-circle-small"/>
                <text x="150" y="205" text-anchor="middle" fill="#f7f5f2" font-size="10" font-family="Inter">M</text>
              </g>

              <!-- 岛屿 3 - 阿米莉娅 -->
              <g class="island-3">
                <circle cx="450" cy="150" r="35" fill="#2d3748" class="island-circle-small"/>
                <text x="450" y="155" text-anchor="middle" fill="#f7f5f2" font-size="10" font-family="Inter">A</text>
              </g>

              <!-- 岛屿 4 - 丹尼尔 -->
              <g class="island-4">
                <circle cx="350" cy="280" r="30" fill="#2d3748" class="island-circle-small"/>
                <text x="350" y="285" text-anchor="middle" fill="#f7f5f2" font-size="10" font-family="Inter">D</text>
              </g>

              <!-- 更多小岛 -->
              <circle cx="100" cy="120" r="20" fill="#4a5568" class="tiny-island"/>
              <circle cx="500" cy="250" r="25" fill="#4a5568" class="tiny-island"/>
              <circle cx="200" cy="320" r="18" fill="#4a5568" class="tiny-island"/>
            </svg>
          </div>

          <!-- 最终金句 -->
          <div class="archipelago-quote">
            <p class="quote-text-main">我们读书，因为我们孤单</p>
            <p class="quote-text-sub">我们孤单，因为我们读书</p>
            <p class="quote-text-eng">We read to know we're not alone</p>
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
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const scrollContainer = ref(null)
const waveCanvas = ref(null)
const waveCanvasContainer = ref(null)
const lighthouseStars = ref(null)
const lighthouseBeam = ref(null)
const bookshelfParticles = ref(null)
const isTransitioning = ref(false)
const showWarp = ref(true)
const floatingQuote = ref(null)

// 章节可见性状态
const chaptersVisible = ref({
  chapter1: false,
  chapter2: false,
  chapter3: false,
  chapter4: false,
  chapter5: false
})

let scrollObserver = null
let waveAnimationId = null
let waveCtx = null
let waves = []
let waveStartTime = 0
let lighthouseStarsInitialized = false
let bookshelfParticlesInitialized = false

// 海浪类
class Wave {
  constructor(y, amplitude, length, speed, phase) {
    this.y = y
    this.amplitude = amplitude
    this.length = length
    this.speed = speed
    this.phase = phase
  }

  draw(ctx, canvasWidth, time) {
    ctx.beginPath()
    for (let x = 0; x <= canvasWidth; x += 5) {
      const y = this.y + Math.sin(x / this.length + time * this.speed + this.phase) * this.amplitude
      if (x === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    }
    ctx.stroke()
  }
}


// 初始化海浪 Canvas
const initWaveCanvas = () => {
  if (!waveCanvas.value || !waveCanvasContainer.value) return

  const canvas = waveCanvas.value
  const container = waveCanvasContainer.value
  waveCtx = canvas.getContext('2d')

  // 设置 Canvas 尺寸
  const resizeCanvas = () => {
    const rect = container.getBoundingClientRect()
    canvas.width = rect.width
    canvas.height = rect.height
  }

  resizeCanvas()

  // 创建三层海浪
  waves = [
    new Wave(canvas.height * 0.5, 20, 150, 0.001, 0),           // 后层海浪
    new Wave(canvas.height * 0.55, 25, 120, 0.0015, Math.PI / 3), // 中层海浪
    new Wave(canvas.height * 0.6, 15, 100, 0.002, Math.PI / 2)    // 前层海浪
  ]

  // 设置样式
  waveCtx.strokeStyle = 'rgba(74, 124, 159, 0.4)'
  waveCtx.lineWidth = 2

  // 动画循环
  const animate = (timestamp) => {
    if (!waveStartTime) waveStartTime = timestamp
    const elapsed = timestamp - waveStartTime

    // 清空画布
    waveCtx.clearRect(0, 0, canvas.width, canvas.height)

    // 绘制所有海浪
    waves.forEach((wave, index) => {
      waveCtx.strokeStyle = `rgba(74, 124, 159, ${0.25 - index * 0.05})`
      waveCtx.lineWidth = 2.5 - index * 0.5
      wave.draw(waveCtx, canvas.width, elapsed)
    })

    waveAnimationId = requestAnimationFrame(animate)
  }

  waveAnimationId = requestAnimationFrame(animate)

  // 监听容器尺寸变化
  const resizeObserver = new ResizeObserver(() => {
    resizeCanvas()
    // 重新计算海浪位置
    waves[0].y = canvas.height * 0.5
    waves[1].y = canvas.height * 0.55
    waves[2].y = canvas.height * 0.6
  })

  resizeObserver.observe(container)

  // 保存 observer 用于清理
  waveCanvas._resizeObserver = resizeObserver
}

// 初始化星空背景（Chapter 2）
const initLighthouseStars = () => {
  if (!lighthouseStars.value) return

  const container = lighthouseStars.value
  const starCount = 50

  // 清空容器
  container.innerHTML = ''

  // 创建星星
  for (let i = 0; i < starCount; i++) {
    const star = document.createElement('div')
    star.className = 'star'

    // 随机位置
    const x = Math.random() * 100
    const y = Math.random() * 100

    // 随机大小
    const size = Math.random() * 2 + 1

    // 随机闪烁速度
    const duration = Math.random() * 3 + 2
    const delay = Math.random() * 3

    star.style.cssText = `
      position: absolute;
      left: ${x}%;
      top: ${y}%;
      width: ${size}px;
      height: ${size}px;
      background: rgba(255, 255, 255, ${Math.random() * 0.5 + 0.5});
      border-radius: 50%;
      animation: twinkle ${duration}s ease-in-out ${delay}s infinite;
    `

    container.appendChild(star)
  }
}

// 初始化知识粒子（Chapter 3）
const initBookshelfParticles = () => {
  if (!bookshelfParticles.value) return

  const container = bookshelfParticles.value
  const particleCount = 30

  // 清空容器
  container.innerHTML = ''

  // 创建粒子
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div')
    particle.className = 'knowledge-particle'

    // 随机位置（集中在书架周围）
    const x = 30 + Math.random() * 40
    const y = 20 + Math.random() * 60

    // 随机大小
    const size = Math.random() * 3 + 2

    // 随机动画
    const duration = Math.random() * 4 + 3
    const delay = Math.random() * 2

    particle.style.cssText = `
      position: absolute;
      left: ${x}%;
      top: ${y}%;
      width: ${size}px;
      height: ${size}px;
      background: rgba(74, 124, 159, ${Math.random() * 0.3 + 0.2});
      border-radius: 50%;
      animation: particle-float ${duration}s ease-in-out ${delay}s infinite;
    `

    container.appendChild(particle)
  }
}

// 初始化滚动监听
const initScrollObserver = () => {
  const options = {
    root: scrollContainer.value,
    threshold: 0.3
  }

  scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const chapterNum = entry.target.dataset.chapter
      if (chapterNum && entry.isIntersecting) {
        chaptersVisible.value[`chapter${chapterNum}`] = true

        // Chapter 2 可见时初始化星空
        if (chapterNum === '2' && !lighthouseStarsInitialized) {
          initLighthouseStars()
          lighthouseStarsInitialized = true
        }

        // Chapter 3 可见时初始化粒子
        if (chapterNum === '3' && !bookshelfParticlesInitialized) {
          initBookshelfParticles()
          bookshelfParticlesInitialized = true
        }
      }
    })
  }, options)

  // 观察所有章节
  const chapters = scrollContainer.value?.querySelectorAll('.story-chapter')
  chapters?.forEach(chapter => scrollObserver.observe(chapter))
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

  // 立即标记第一个章节为可见
  setTimeout(() => {
    chaptersVisible.value.chapter1 = true
    // 初始化海浪 Canvas
    initWaveCanvas()
  }, 2000)
})

onUnmounted(() => {
  if (scrollObserver) {
    scrollObserver.disconnect()
  }

  // 清理 Canvas 动画
  if (waveAnimationId) {
    cancelAnimationFrame(waveAnimationId)
  }

  // 清理 ResizeObserver
  if (waveCanvas.value?._resizeObserver) {
    waveCanvas.value._resizeObserver.disconnect()
  }
})
</script>

<style scoped>
.island-bookstore-world {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(180deg, #f7f5f2 0%, #e8f0f4 100%);
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
  border: 1px solid rgba(74, 124, 159, 0.3);
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
  border: 1px solid rgba(74, 124, 159, 0.5);
  border-radius: 50%;
  animation: warp-pulse 1s ease-in-out infinite;
}

.warp-text {
  position: absolute;
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  letter-spacing: 0.3em;
  color: rgba(74, 124, 159, 0.8);
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
  background: rgba(74, 124, 159, 0.3);
  border-radius: 2px;
}

/* === 金句浮层 === */
.floating-quote {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(26, 26, 26, 0.95);
  color: #4a7c9f;
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
  color: rgba(74, 124, 159, 0.6);
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

/* === 章节通用样式 === */
.story-chapter {
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

.story-chapter.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.chapter-content {
  text-align: center;
  z-index: 2;
  padding: 0 2rem;
}

.placeholder-text {
  font-family: 'Noto Serif SC', serif;
  font-size: clamp(1.5rem, 3vw, 2rem);
  color: #1a1a1a;
  opacity: 0.5;
}

/* === Chapter 1: 孤岛 === */
.chapter-1 {
  background: linear-gradient(180deg, #f7f5f2 0%, #e8f0f4 50%, #d4e4ed 100%);
}

.chapter1-wave-container {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60%;
  z-index: 1;
}

.chapter1-wave-container canvas {
  width: 100%;
  height: 100%;
  display: block;
}

.chapter1-island {
  position: absolute;
  bottom: 45%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  width: 120px;
  height: 120px;
  animation: island-float 6s ease-in-out infinite;
}

.island-svg {
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 4px 8px rgba(74, 124, 159, 0.2));
}

@keyframes island-float {
  0%, 100% {
    transform: translateX(-50%) translateY(0);
  }
  50% {
    transform: translateX(-50%) translateY(-10px);
  }
}

.chapter-1 .intro-text {
  position: absolute;
  bottom: 15%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
  text-align: center;
  opacity: 0;
  animation: intro-fade-in 2s ease-out 2.2s forwards;
}

.intro-line-1 {
  font-family: 'Noto Serif SC', serif;
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  font-weight: 300;
  color: #1a1a1a;
  letter-spacing: 0.3em;
  margin-bottom: 0.5rem;
}

.intro-line-2 {
  font-family: 'Inter', sans-serif;
  font-size: clamp(0.9rem, 2vw, 1.2rem);
  font-weight: 300;
  color: rgba(26, 26, 26, 0.6);
  letter-spacing: 0.2em;
  font-style: italic;
}

@keyframes intro-fade-in {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

/* === Chapter 2: 灯塔 === */
.chapter-2 {
  background: linear-gradient(180deg, #1a202c 0%, #2d3748 100%);
  overflow: hidden;
}

.lighthouse-stars {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 60%;
  z-index: 1;
}

.lighthouse-container {
  position: relative;
  width: 200px;
  height: 400px;
  margin: 0 auto;
  z-index: 2;
}

.lighthouse-svg {
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 0 20px rgba(244, 208, 63, 0.3));
}

.lighthouse-light {
  animation: light-pulse 2s ease-in-out infinite;
}

@keyframes light-pulse {
  0%, 100% {
    opacity: 1;
    filter: drop-shadow(0 0 10px #f4d03f);
  }
  50% {
    opacity: 0.7;
    filter: drop-shadow(0 0 20px #f4d03f);
  }
}

.lighthouse-beam {
  position: absolute;
  top: 50px;
  left: 50%;
  width: 300px;
  height: 300px;
  transform-origin: left center;
  opacity: 0;
  animation: beam-rotate 8s linear infinite;
}

.beam-inner {
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg,
    rgba(244, 208, 63, 0.4) 0%,
    rgba(244, 208, 63, 0.1) 50%,
    rgba(244, 208, 63, 0) 100%
  );
  clip-path: polygon(0 50%, 100% 0, 100% 100%);
  filter: blur(20px);
}

@keyframes beam-rotate {
  0% {
    transform: rotate(-45deg);
    opacity: 0;
  }
  10% {
    opacity: 0.6;
  }
  50% {
    transform: rotate(45deg);
    opacity: 0.6;
  }
  90% {
    opacity: 0.6;
  }
  100% {
    transform: rotate(-45deg);
    opacity: 0;
  }
}

.lighthouse-quote {
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
  text-align: center;
  opacity: 0;
  animation: quote-fade-in 2s ease-out 0.5s forwards;
}

.quote-text {
  font-family: 'Noto Serif SC', serif;
  font-size: clamp(1.6rem, 3.5vw, 2.2rem);
  font-weight: 300;
  color: #f7f5f2;
  letter-spacing: 0.25em;
  margin-bottom: 0.5rem;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
}

.quote-sub {
  font-family: 'Inter', sans-serif;
  font-size: clamp(0.8rem, 1.8vw, 1rem);
  font-weight: 300;
  color: rgba(247, 245, 242, 0.6);
  letter-spacing: 0.15em;
  font-style: italic;
}

@keyframes quote-fade-in {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

@keyframes twinkle {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.3;
    transform: scale(0.8);
  }
}

/* === Chapter 3: 书架 === */
.chapter-3 {
  background: linear-gradient(180deg, #f7f5f2 0%, #e8ddd4 100%);
}

.bookshelf-particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
}

.knowledge-particle {
  pointer-events: none;
}

@keyframes particle-float {
  0%, 100% {
    transform: translate(0, 0);
    opacity: 0.6;
  }
  50% {
    transform: translate(10px, -20px);
    opacity: 1;
  }
}

.bookshelf-container {
  position: relative;
  width: 400px;
  max-width: 90%;
  margin: 0 auto;
  z-index: 2;
}

.bookshelf-svg {
  width: 100%;
  height: auto;
  filter: drop-shadow(0 4px 12px rgba(139, 115, 85, 0.3));
}

.shelf-board {
  filter: brightness(1.1);
}

.growing-book {
  transform-origin: bottom center;
  opacity: 0;
  animation: book-grow 1s ease-out forwards;
}

.growing-book:hover {
  filter: brightness(1.1);
  cursor: pointer;
}

@keyframes book-grow {
  from {
    opacity: 0;
    transform: scaleY(0);
  }
  to {
    opacity: 1;
    transform: scaleY(1);
  }
}

.bookshelf-quote {
  position: absolute;
  bottom: 5%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
  text-align: center;
  opacity: 0;
  animation: quote-fade-in 2s ease-out 3.5s forwards;
}

.bookshelf-quote .quote-text {
  font-family: 'Noto Serif SC', serif;
  font-size: clamp(1.6rem, 3.5vw, 2.2rem);
  font-weight: 300;
  color: #1a1a1a;
  letter-spacing: 0.25em;
  margin-bottom: 0.5rem;
}

.bookshelf-quote .quote-sub {
  font-family: 'Inter', sans-serif;
  font-size: clamp(0.8rem, 1.8vw, 1rem);
  font-weight: 300;
  color: rgba(26, 26, 26, 0.6);
  letter-spacing: 0.15em;
  font-style: italic;
}

/* === Chapter 4: 礼物 === */
.chapter-4 {
  background: linear-gradient(180deg, #f7f5f2 0%, #fce4ec 100%);
}

.gift-container {
  position: relative;
  width: 400px;
  max-width: 90%;
  margin: 0 auto;
  z-index: 2;
}

.gift-svg {
  width: 200px;
  height: 200px;
  margin: 0 auto;
  display: block;
  animation: gift-float 4s ease-in-out infinite;
}

@keyframes gift-float {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-15px) rotate(2deg);
  }
}

.gift-glow {
  animation: glow-pulse 2s ease-in-out infinite;
}

@keyframes glow-pulse {
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.1);
  }
}

.connection-lines {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 300px;
  pointer-events: none;
}

.connection-line {
  animation: line-draw 2s ease-out forwards;
  stroke-dasharray: 300;
  stroke-dashoffset: 300;
}

@keyframes line-draw {
  to {
    stroke-dashoffset: 0;
  }
}

.connection-point {
  opacity: 0;
  animation: point-appear 0.5s ease-out forwards;
}

@keyframes point-appear {
  from {
    opacity: 0;
    transform: scale(0);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.gift-quote {
  position: absolute;
  bottom: 8%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
  text-align: center;
  opacity: 0;
  animation: quote-fade-in 2s ease-out 2.5s forwards;
}

.gift-quote .quote-text {
  font-family: 'Noto Serif SC', serif;
  font-size: clamp(1.6rem, 3.5vw, 2.2rem);
  font-weight: 300;
  color: #1a1a1a;
  letter-spacing: 0.25em;
  margin-bottom: 0.5rem;
}

.gift-quote .quote-sub {
  font-family: 'Inter', sans-serif;
  font-size: clamp(0.8rem, 1.8vw, 1rem);
  font-weight: 300;
  color: rgba(26, 26, 26, 0.6);
  letter-spacing: 0.15em;
  font-style: italic;
}

/* === Chapter 5: 群岛 === */
.chapter-5 {
  background: linear-gradient(180deg, #d4e4ed 0%, #e8f0f4 100%);
}

.archipelago-container {
  position: relative;
  width: 600px;
  max-width: 95%;
  margin: 0 auto;
  z-index: 2;
}

.archipelago-svg {
  width: 100%;
  height: auto;
}

.island-circle {
  animation: island-emerge 2s ease-out forwards;
}

.island-circle-small {
  opacity: 0;
  animation: small-island-appear 1s ease-out forwards;
}

.tiny-island {
  opacity: 0;
  animation: tiny-island-appear 0.8s ease-out forwards;
}

@keyframes island-emerge {
  from {
    transform: scale(0);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes small-island-appear {
  from {
    opacity: 0;
    transform: scale(0.5);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes tiny-island-appear {
  from {
    opacity: 0;
  }
  to {
    opacity: 0.6;
  }
}

.island-ring {
  opacity: 0;
  animation: ring-expand 2s ease-out 0.5s forwards;
}

@keyframes ring-expand {
  from {
    transform: scale(0.5);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.bridges line {
  stroke-dasharray: 10, 5;
  animation: bridge-build 3s ease-out 1s forwards;
  stroke-dashoffset: 300;
}

@keyframes bridge-build {
  to {
    stroke-dashoffset: 0;
  }
}

.archipelago-quote {
  position: absolute;
  bottom: 5%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
  text-align: center;
  opacity: 0;
  animation: final-quote-appear 3s ease-out 2s forwards;
}

.quote-text-main {
  font-family: 'Noto Serif SC', serif;
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  font-weight: 400;
  color: #1a1a1a;
  letter-spacing: 0.3em;
  margin-bottom: 0.8rem;
}

.quote-text-sub {
  font-family: 'Noto Serif SC', serif;
  font-size: clamp(1.6rem, 3.5vw, 2.2rem);
  font-weight: 300;
  color: rgba(26, 26, 26, 0.8);
  letter-spacing: 0.25em;
  margin-bottom: 1rem;
}

.quote-text-eng {
  font-family: 'Inter', sans-serif;
  font-size: clamp(0.9rem, 2vw, 1.2rem);
  font-weight: 300;
  color: rgba(26, 26, 26, 0.6);
  letter-spacing: 0.15em;
  font-style: italic;
}

@keyframes final-quote-appear {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
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

  .floating-quote {
    padding: 1.5rem 2rem;
    max-width: 85%;
  }

  .floating-quote p {
    font-size: clamp(1rem, 4vw, 1.3rem);
  }

  /* Chapter 1 响应式 */
  .chapter1-island {
    width: 80px;
    height: 80px;
  }

  .intro-line-1 {
    font-size: clamp(1.4rem, 5vw, 1.8rem);
  }

  .intro-line-2 {
    font-size: clamp(0.7rem, 2.5vw, 0.9rem);
  }

  /* Chapter 2 响应式 */
  .lighthouse-container {
    width: 150px;
    height: 300px;
  }

  .lighthouse-beam {
    width: 200px;
    height: 200px;
  }

  .quote-text {
    font-size: clamp(1.2rem, 4vw, 1.6rem);
  }

  .quote-sub {
    font-size: clamp(0.6rem, 2vw, 0.8rem);
  }

  /* Chapter 3 响应式 */
  .bookshelf-container {
    width: 300px;
  }

  .bookshelf-quote .quote-text {
    font-size: clamp(1.2rem, 4vw, 1.6rem);
  }

  .bookshelf-quote .quote-sub {
    font-size: clamp(0.6rem, 2vw, 0.8rem);
  }

  /* Chapter 4 响应式 */
  .gift-container {
    width: 300px;
  }

  .gift-svg {
    width: 150px;
    height: 150px;
  }

  .connection-lines {
    width: 300px;
    height: 225px;
  }

  .gift-quote .quote-text {
    font-size: clamp(1.2rem, 4vw, 1.6rem);
  }

  .gift-quote .quote-sub {
    font-size: clamp(0.6rem, 2vw, 0.8rem);
  }

  /* Chapter 5 响应式 */
  .archipelago-container {
    width: 100%;
  }

  .quote-text-main {
    font-size: clamp(1.4rem, 4vw, 1.8rem);
  }

  .quote-text-sub {
    font-size: clamp(1.2rem, 3.5vw, 1.6rem);
  }

  .quote-text-eng {
    font-size: clamp(0.7rem, 2vw, 0.9rem);
  }
}
</style>

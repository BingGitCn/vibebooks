<template>
  <div class="immersive-container" :class="`theme-${bookTheme}`">
    <!-- 动态背景 -->
    <canvas ref="canvas" class="immersive-canvas"></canvas>

    <!-- 内容层 -->
    <div class="content-layer">
      <!-- 返回按钮 -->
      <button class="back-btn" @click="goBack">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        <span>Back to Universe</span>
      </button>

      <!-- 书籍内容 -->
      <div class="book-immersive">
        <header class="immersive-header">
          <div class="header-badge">{{ book.category }}</div>
          <h1 class="immersive-title">{{ book.title }}</h1>
          <p v-if="book.subtitle" class="immersive-subtitle">{{ book.subtitle }}</p>
          <p class="immersive-author">{{ book.author }}</p>
        </header>

        <!-- 引用区域 -->
        <blockquote class="immersive-quote">
          "{{ book.quote }}"
        </blockquote>

        <!-- 标签 -->
        <div class="book-tags">
          <span v-for="tag in book.tags" :key="tag" class="tag">{{ tag }}</span>
        </div>

        <!-- 交互提示 -->
        <div class="interaction-hint">
          <p>移动鼠标探索{{ bookTitle }}的宇宙</p>
          <div class="hint-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import booksData from '../data/books.js'

const router = useRouter()
const route = useRoute()
const canvas = ref(null)

const bookId = parseInt(route.params.id)
const book = computed(() => booksData.find(b => b.id === bookId) || booksData[0])
const bookTitle = computed(() => book.value.title)

// 根据书籍类型确定主题
const bookTheme = computed(() => {
  const themeMap = {
    'FICTION': 'fiction',
    'PHILOSOPHY': 'philosophy',
    'SCIENCE FICTION': 'scifi',
    'CLASSIC': 'classic',
    'MYSTERY': 'mystery',
    'ROMANCE': 'romance',
    'ECONOMICS': 'economics',
    'DYSTOPIAN': 'dystopian',
    'WUXIA': 'wuxia',
    'ADVENTURE': 'adventure'
  }
  return themeMap[book.value.category] || 'default'
})

let animationId = null
let particles = []
let mouseX = 0
let mouseY = 0

// 粒子类
class Particle {
  constructor(w, h, theme) {
    this.w = w
    this.h = h
    this.theme = theme
    this.reset()
  }

  reset() {
    this.x = Math.random() * this.w
    this.y = Math.random() * this.h
    this.size = Math.random() * 3 + 1
    this.speedX = (Math.random() - 0.5) * 0.5
    this.speedY = (Math.random() - 0.5) * 0.5
    this.opacity = Math.random() * 0.5 + 0.2

    // 根据主题设置颜色
    const colors = {
      'scifi': [100, 200, 255],
      'philosophy': [200, 180, 100],
      'fiction': [150, 150, 180],
      'mystery': [100, 100, 120],
      'romance': [255, 150, 180],
      'classic': [180, 160, 140],
      'dystopian': [80, 100, 120],
      'wuxia': [200, 100, 100],
      'economics': [100, 150, 100],
      'default': [150, 150, 150]
    }

    this.color = colors[this.theme] || colors['default']
  }

  update() {
    this.x += this.speedX
    this.y += this.speedY

    // 鼠标交互
    const dx = this.x - mouseX
    const dy = this.y - mouseY
    const dist = Math.sqrt(dx * dx + dy * dy)

    if (dist < 150) {
      const force = (150 - dist) / 150
      this.x += (dx / dist) * force * 2
      this.y += (dy / dist) * force * 2
    }

    // 边界检测
    if (this.x < 0 || this.x > this.w) this.speedX *= -1
    if (this.y < 0 || this.y > this.h) this.speedY *= -1
  }

  draw(ctx) {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(${this.color[0]}, ${this.color[1]}, ${this.color[2]}, ${this.opacity})`
    ctx.fill()

    // 光晕
    if (this.size > 2) {
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2)
      const gradient = ctx.createRadialGradient(
        this.x, this.y, 0,
        this.x, this.y, this.size * 2
      )
      gradient.addColorStop(0, `rgba(${this.color[0]}, ${this.color[1]}, ${this.color[2]}, ${this.opacity * 0.3})`)
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
      ctx.fillStyle = gradient
      ctx.fill()
    }
  }
}

function initCanvas() {
  const cvs = canvas.value
  if (!cvs) return

  const ctx = cvs.getContext('2d')
  const resize = () => {
    cvs.width = window.innerWidth
    cvs.height = window.innerHeight
  }

  resize()
  window.addEventListener('resize', resize)

  // 创建粒子
  particles = Array.from({ length: 80 }, () => new Particle(cvs.width, cvs.height, bookTheme.value))

  // 鼠标跟踪
  const handleMouseMove = (e) => {
    mouseX = e.clientX
    mouseY = e.clientY
  }

  window.addEventListener('mousemove', handleMouseMove)

  // 动画循环
  const animate = () => {
    // 清除画布
    const gradient = ctx.createLinearGradient(0, 0, 0, cvs.height)

    const bgColors = {
      'scifi': ['#0a0a1a', '#1a1a3a'],
      'philosophy': ['#1a1a1a', '#2a2520'],
      'fiction': ['#1a1a2a', '#2a2a3a'],
      'mystery': ['#0a0a0a', '#1a1a1a'],
      'romance': ['#2a1a20', '#3a2a30'],
      'classic': ['#1a1915', '#2a2925'],
      'dystopian': ['#0a0a10', '#1a1a20'],
      'wuxia': ['#1a1010', '#2a2020'],
      'economics': ['#101a10', '#202a20'],
      'default': ['#1a1a1a', '#2a2a2a']
    }

    const colors = bgColors[bookTheme.value] || bgColors['default']
    gradient.addColorStop(0, colors[0])
    gradient.addColorStop(1, colors[1])

    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, cvs.width, cvs.height)

    // 更新和绘制粒子
    particles.forEach(p => {
      p.update()
      p.draw(ctx)
    })

    // 绘制连线
    particles.forEach((p1, i) => {
      particles.slice(i + 1).forEach(p2 => {
        const dx = p1.x - p2.x
        const dy = p1.y - p2.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < 120) {
          ctx.beginPath()
          ctx.moveTo(p1.x, p1.y)
          ctx.lineTo(p2.x, p2.y)
          ctx.strokeStyle = `rgba(${p1.color[0]}, ${p1.color[1]}, ${p1.color[2]}, ${0.15 * (1 - dist / 120)})`
          ctx.lineWidth = 0.5
          ctx.stroke()
        }
      })
    })

    animationId = requestAnimationFrame(animate)
  }

  animate()

  return () => {
    window.removeEventListener('resize', resize)
    window.removeEventListener('mousemove', handleMouseMove)
  }
}

const goBack = () => {
  router.push('/universe')
}

onMounted(() => {
  initCanvas()
})

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
})
</script>

<style scoped>
.immersive-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.immersive-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.content-layer {
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 返回按钮 */
.back-btn {
  position: absolute;
  top: 2rem;
  left: 2rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1.5rem;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #fff;
  backdrop-filter: blur(10px);
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
}

.back-btn:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.25);
  transform: translateX(-5px);
}

.back-btn svg {
  width: 18px;
  height: 18px;
}

/* 书籍沉浸式内容 */
.book-immersive {
  text-align: center;
  color: #fff;
  max-width: 900px;
  padding: 3rem;
}

.immersive-header {
  margin-bottom: 4rem;
}

.header-badge {
  display: inline-block;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  font-family: 'Inter', sans-serif;
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  margin-bottom: 2rem;
  backdrop-filter: blur(5px);
}

.immersive-title {
  font-family: 'Noto Serif SC', serif;
  font-size: clamp(2.5rem, 6vw, 5rem);
  font-weight: 300;
  letter-spacing: 0.15em;
  margin-bottom: 1rem;
  color: #fff;
  text-shadow: 0 0 40px rgba(255, 255, 255, 0.3);
  animation: title-glow 4s ease-in-out infinite;
}

@keyframes title-glow {
  0%, 100% {
    text-shadow: 0 0 40px rgba(255, 255, 255, 0.3);
  }
  50% {
    text-shadow: 0 0 60px rgba(255, 255, 255, 0.5);
  }
}

.immersive-subtitle {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.5rem;
  font-style: italic;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 0.5rem;
  letter-spacing: 0.15em;
}

.immersive-author {
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.6);
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.immersive-quote {
  font-family: 'Noto Serif SC', serif;
  font-size: clamp(1.5rem, 3vw, 2.2rem);
  font-weight: 300;
  line-height: 1.6;
  margin: 3rem 0;
  padding: 2rem;
  color: rgba(255, 255, 255, 0.9);
  border-left: 2px solid rgba(255, 255, 255, 0.3);
  position: relative;
  animation: fade-in-up 1.5s ease-out;
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 标签 */
.book-tags {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 3rem;
}

.tag {
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(5px);
  transition: all 0.3s ease;
}

.tag:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.25);
  transform: translateY(-2px);
}

/* 交互提示 */
.interaction-hint {
  margin-top: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.5);
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.hint-dots {
  display: flex;
  gap: 0.5rem;
}

.hint-dots span {
  width: 6px;
  height: 6px;
  background: rgba(255, 255, 255, 0.4);
  border-radius: 50%;
  animation: pulse-dot 1.5s ease-in-out infinite;
}

.hint-dots span:nth-child(2) {
  animation-delay: 0.2s;
}

.hint-dots span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes pulse-dot {
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
}

/* 不同主题的样式变体 */
.theme-scifi .immersive-title {
  text-shadow: 0 0 60px rgba(100, 200, 255, 0.5);
}

.theme-romance .immersive-title {
  text-shadow: 0 0 60px rgba(255, 150, 180, 0.5);
}

.theme-philosophy .immersive-title {
  text-shadow: 0 0 60px rgba(200, 180, 100, 0.5);
}

.theme-mystery .immersive-title {
  text-shadow: 0 0 60px rgba(100, 100, 120, 0.5);
}

/* 响应式 */
@media (max-width: 768px) {
  .book-immersive {
    padding: 2rem 1.5rem;
  }

  .immersive-quote {
    padding: 1.5rem;
    font-size: 1.3rem;
  }

  .back-btn {
    top: 1rem;
    left: 1rem;
    padding: 0.625rem 1rem;
    font-size: 0.65rem;
  }

  .book-tags {
    flex-direction: column;
    align-items: center;
  }
}
</style>

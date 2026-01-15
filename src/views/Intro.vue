<template>
  <div class="intro-container">
    <!-- 星空背景 -->
    <canvas ref="starsCanvas" class="stars-canvas"></canvas>

    <!-- 漂浮的几何体 -->
    <div class="geometric-layer">
      <div class="geo-shape triangle" :style="{ ...getTrianglePosition(0), ...getRotation(0) }">
        <svg viewBox="0 0 100 100"><polygon points="50,10 90,90 10,90" fill="none" stroke="rgba(26,26,26,0.08)" stroke-width="1"/></svg>
      </div>
      <div class="geo-shape circle" :style="{ ...getCirclePosition(0), ...getRotation(1) }">
        <svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="none" stroke="rgba(26,26,26,0.06)" stroke-width="1"/></svg>
      </div>
      <div class="geo-shape arc" :style="{ ...getArcPosition(0), ...getRotation(2) }">
        <svg viewBox="0 0 100 100"><path d="M 10 90 Q 50 10 90 90" fill="none" stroke="rgba(26,26,26,0.07)" stroke-width="1"/></svg>
      </div>
      <div class="geo-shape triangle" :style="{ ...getTrianglePosition(1), ...getRotation(3) }">
        <svg viewBox="0 0 100 100"><polygon points="50,10 90,90 10,90" fill="none" stroke="rgba(26,26,26,0.05)" stroke-width="1"/></svg>
      </div>
      <div class="geo-shape circle" :style="{ ...getCirclePosition(1), ...getRotation(4) }">
        <svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="none" stroke="rgba(26,26,26,0.04)" stroke-width="1"/></svg>
      </div>
    </div>

    <!-- 中心内容 -->
    <div class="center-content">
      <h1 class="main-title">每一本书，都值得被探索。</h1>
      <p class="subtitle">Where stories breathe</p>
      <button class="enter-btn" @click="enterUniverse">
        <span>Enter the Library</span>
      </button>
    </div>


  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const starsCanvas = ref(null)
let animationId = null
let stars = []

// 生成星星
class Star {
  constructor(canvas) {
    this.canvas = canvas
    this.reset()
  }

  reset() {
    this.x = Math.random() * this.canvas.width
    this.y = Math.random() * this.canvas.height
    this.size = Math.random() * 2 + 0.5
    this.baseAlpha = Math.random() * 0.5 + 0.2
    this.twinkleSpeed = Math.random() * 0.02 + 0.005
    this.twinkleOffset = Math.random() * Math.PI * 2
  }

  update(time) {
    this.currentAlpha = this.baseAlpha + Math.sin(time * this.twinkleSpeed + this.twinkleOffset) * 0.15
  }

  draw(ctx) {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(26, 26, 26, ${this.currentAlpha})`
    ctx.fill()
  }
}

function initStars() {
  const canvas = starsCanvas.value
  const ctx = canvas.getContext('2d')

  const resizeCanvas = () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    stars.forEach(star => star.reset())
  }

  resizeCanvas()
  window.addEventListener('resize', resizeCanvas)

  // 创建50颗星星
  stars = Array.from({ length: 50 }, () => new Star(canvas))

  let time = 0
  const animate = () => {
    time++
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    stars.forEach(star => {
      star.update(time)
      star.draw(ctx)
    })

    animationId = requestAnimationFrame(animate)
  }

  animate()
}

// 几何体位置计算
function getTrianglePosition(index) {
  const positions = [
    { top: '15%', left: '10%' },
    { bottom: '20%', right: '15%' }
  ]
  return positions[index] || positions[0]
}

function getCirclePosition(index) {
  const positions = [
    { top: '25%', right: '18%' },
    { bottom: '30%', left: '12%' }
  ]
  return positions[index] || positions[0]
}

function getArcPosition(index) {
  return { top: '60%', left: '20%' }
}

function getRotation(index) {
  const speeds = [120, 90, 150, 100, 80]
  return {
    animation: `float-rotate ${speeds[index]}s linear infinite`
  }
}

const enterUniverse = () => {
  router.push('/universe')
}

onMounted(() => {
  initStars()
})

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
})
</script>

<style scoped>
.intro-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(180deg, #f7f5f2 0%, #ebe8e3 100%);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stars-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.geometric-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  pointer-events: none;
}

.geo-shape {
  position: absolute;
  width: 120px;
  height: 120px;
  opacity: 0.6;
}

.geo-shape svg {
  width: 100%;
  height: 100%;
}

@keyframes float-rotate {
  0% {
    transform: translate(0, 0) rotate(0deg);
  }
  25% {
    transform: translate(10px, -15px) rotate(90deg);
  }
  50% {
    transform: translate(-5px, -25px) rotate(180deg);
  }
  75% {
    transform: translate(-15px, -10px) rotate(270deg);
  }
  100% {
    transform: translate(0, 0) rotate(360deg);
  }
}

.center-content {
  position: relative;
  z-index: 10;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.main-title {
  font-family: 'Noto Serif SC', serif;
  font-size: clamp(2rem, 5vw, 4rem);
  font-weight: 300;
  letter-spacing: 0.15em;
  color: #1a1a1a;
  margin-bottom: 0.5rem;
  animation: fade-up 1.2s ease-out;
}

.subtitle {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(1rem, 2vw, 1.5rem);
  font-weight: 300;
  font-style: italic;
  letter-spacing: 0.3em;
  color: #666;
  margin-bottom: 2rem;
  animation: fade-up 1.2s ease-out 0.3s backwards;
}

.enter-btn {
  position: relative;
  padding: 1rem 3rem;
  background: rgba(26, 26, 26, 0.85);
  border: 1px solid rgba(26, 26, 26, 0.1);
  color: #f7f5f2;
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  font-weight: 400;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.4s ease;
  backdrop-filter: blur(10px);
  animation: fade-up 1.2s ease-out 0.6s backwards;
}

.enter-btn:hover {
  background: rgba(26, 26, 26, 0.95);
  transform: translateY(-2px);
  box-shadow: 0 10px 40px rgba(26, 26, 26, 0.15);
}

.enter-btn:active {
  transform: translateY(0);
}

@keyframes fade-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .geo-shape {
    width: 80px;
    height: 80px;
  }

  .enter-btn {
    padding: 0.875rem 2rem;
    font-size: 0.8rem;
  }
}
</style>

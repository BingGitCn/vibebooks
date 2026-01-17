<template>
  <div class="vibe-animation" :style="{ background: background }">
    <!-- 倒计时 -->
    <div v-if="animationType === 'countdown'" class="countdown">
      <div class="countdown-number">{{ countdownNumber }}</div>
      <div class="pulse-line"></div>
    </div>

    <!-- 双月 -->
    <div v-else-if="animationType === 'two-moons'" class="two-moons">
      <div class="moon large"></div>
      <div class="moon small"></div>
    </div>

    <!-- 黄蝴蝶 -->
    <div v-else-if="animationType === 'butterfly'" class="butterfly">
      <div class="butterfly-wing left"></div>
      <div class="butterfly-wing right"></div>
    </div>

    <!-- 雪花 -->
    <div v-else-if="animationType === 'snowfall'" class="snowfall">
      <div v-for="i in 50" :key="i" class="snowflake" :style="getSnowflakeStyle(i)"></div>
    </div>

    <!-- 沙丘 -->
    <div v-else-if="animationType === 'dunes'" class="dunes">
      <div class="dune" v-for="i in 3" :key="i" :style="getDuneStyle(i)"></div>
    </div>

    <!-- 心跳 -->
    <div v-else-if="animationType === 'heartbeat'" class="heartbeat">
      <div class="heart-shape"></div>
      <div class="heartbeat-wave"></div>
    </div>

    <!-- 粒子系统 -->
    <div v-else-if="animationType === 'particles'" class="particles">
      <canvas ref="particleCanvas"></canvas>
    </div>

    <!-- 默认脉冲圆环 -->
    <div v-else class="pulse-circle">
      <div class="pulse-ring" v-for="i in 3" :key="i"></div>
      <div class="center-dot"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  animationType: {
    type: String,
    default: 'pulse-circle'
  },
  vibeColor: {
    type: String,
    default: '#4a7c9f'
  },
  vibeColorEnd: {
    type: String,
    default: '#2a4c5f'
  }
})

const countdownNumber = ref(470)
const particleCanvas = ref(null)

let interval = null
let animationFrame = null

// 计算背景渐变
const background = computed(() => {
  if (props.animationType === 'countdown') {
    return 'linear-gradient(180deg, #000000 0%, #001a1a 100%)'
  }
  return `linear-gradient(135deg, ${props.vibeColor} 0%, ${props.vibeColorEnd} 100%)`
})

// 倒计时逻辑
const startCountdown = () => {
  interval = setInterval(() => {
    countdownNumber.value--
    if (countdownNumber.value <= 0) {
      countdownNumber.value = 470
    }
  }, 100)
}

// 粒子系统
const startParticles = () => {
  if (!particleCanvas.value) return

  const canvas = particleCanvas.value
  const ctx = canvas.getContext('2d')
  canvas.width = 300
  canvas.height = 400

  const particles = []
  const particleCount = 50

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3 + 1,
      speedY: Math.random() * 2 + 1,
      opacity: Math.random()
    })
  }

  const animateParticles = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    particles.forEach(p => {
      p.y += p.speedY
      p.opacity -= 0.005

      if (p.y > canvas.height) {
        p.y = 0
        p.opacity = 1
      }

      ctx.beginPath()
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(212, 175, 55, ${p.opacity})`
      ctx.fill()
    })

    animationFrame = requestAnimationFrame(animateParticles)
  }

  animateParticles()
}

// 雪花样式
const getSnowflakeStyle = (index) => {
  return {
    left: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 3}s`,
    animationDuration: `${3 + Math.random() * 2}s`
  }
}

// 沙丘样式
const getDuneStyle = (index) => {
  const positions = [
    { bottom: '20%', left: '10%', width: '80%', opacity: 0.3 },
    { bottom: '30%', left: '30%', width: '60%', opacity: 0.5 },
    { bottom: '25%', left: '0%', width: '100%', opacity: 0.4 }
  ]
  return positions[index - 1]
}

onMounted(() => {
  if (props.animationType === 'countdown') {
    startCountdown()
  } else if (props.animationType === 'particles') {
    startParticles()
  }
})

onUnmounted(() => {
  if (interval) clearInterval(interval)
  if (animationFrame) cancelAnimationFrame(animationFrame)
})
</script>

<style scoped>
.vibe-animation {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}

/* 倒计时 */
.countdown {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #00ffff;
}

.countdown .countdown-number {
  font-size: clamp(2rem, 6vw, 5rem);
  font-weight: 200;
  letter-spacing: 0.3em;
  text-shadow: 0 0 20px rgba(0, 255, 255, 0.8);
  animation: numberPulse 0.5s ease-in-out infinite;
}

.countdown .pulse-line {
  width: 60%;
  height: 2px;
  background: #00ffff;
  margin-top: 1rem;
  box-shadow: 0 0 10px rgba(0, 255, 255, 0.8);
  animation: linePulse 2s ease-in-out infinite;
}

/* 双月 */
.two-moons {
  width: 100%;
  height: 100%;
  position: relative;
}

.moon {
  position: absolute;
  border-radius: 50%;
  background: #f0f0f0;
  box-shadow: 0 0 30px rgba(240, 240, 240, 0.5);
}

.moon.large {
  width: 80px;
  height: 80px;
  top: 20%;
  left: 30%;
  animation: moonFloat 8s ease-in-out infinite;
}

.moon.small {
  width: 40px;
  height: 40px;
  top: 40%;
  right: 25%;
  animation: moonFloat 6s ease-in-out infinite 2s;
}

/* 蝴蝶 */
.butterfly {
  width: 100%;
  height: 100%;
  position: relative;
}

.butterfly-wing {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 60px;
  height: 80px;
  background: #ffa500;
  border-radius: 50% 50% 50% 50%;
  transform-origin: center;
}

.butterfly-wing.left {
  animation: wingLeft 2s ease-in-out infinite;
}

.butterfly-wing.right {
  animation: wingRight 2s ease-in-out infinite;
}

/* 雪花 */
.snowfall {
  width: 100%;
  height: 100%;
  position: relative;
}

.snowflake {
  position: absolute;
  width: 4px;
  height: 4px;
  background: white;
  border-radius: 50%;
  animation: snowfall linear infinite;
  opacity: 0.8;
}

/* 沙丘 */
.dunes {
  width: 100%;
  height: 100%;
  position: relative;
}

.dune {
  position: absolute;
  height: 60%;
  background: linear-gradient(90deg, transparent, rgba(201, 169, 89, 0.5), transparent);
  border-radius: 50%;
  animation: duneShift 8s ease-in-out infinite;
}

/* 心跳 */
.heartbeat {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.heart-shape {
  width: 60px;
  height: 60px;
  background: #f4a460;
  clip-path: polygon(50% 0%, 100% 38%, 82% 100%, 50% 80%, 18% 100%, 0% 38%);
  animation: heartBeat 1s ease-in-out infinite;
}

.heartbeat-wave {
  position: absolute;
  width: 100px;
  height: 100px;
  border: 2px solid #f4a460;
  border-radius: 50%;
  animation: waveExpand 1s ease-out infinite;
}

/* 粒子 */
.particles {
  width: 100%;
  height: 100%;
}

.particles canvas {
  width: 100%;
  height: 100%;
}

/* 默认脉冲圆环 */
.pulse-circle {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pulse-ring {
  position: absolute;
  width: 40%;
  height: 40%;
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  animation: pulse 2s ease-out infinite;
}

.pulse-ring:nth-child(1) { animation-delay: 0s; }
.pulse-ring:nth-child(2) { animation-delay: 0.5s; }
.pulse-ring:nth-child(3) { animation-delay: 1s; }

.center-dot {
  width: 15%;
  height: 15%;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  animation: centerPulse 2s ease-in-out infinite;
}

/* 动画定义 */
@keyframes numberPulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(0.98); }
}

@keyframes linePulse {
  0%, 100% { width: 60%; opacity: 0.5; }
  50% { width: 70%; opacity: 1; }
}

@keyframes moonFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

@keyframes wingLeft {
  0%, 100% { transform: translate(-50%, -50%) rotateY(0deg); }
  50% { transform: translate(-50%, -50%) rotateY(60deg); }
}

@keyframes wingRight {
  0%, 100% { transform: translate(-50%, -50%) rotateY(0deg); }
  50% { transform: translate(-50%, -50%) rotateY(-60deg); }
}

@keyframes snowfall {
  0% { transform: translateY(-10px); }
  100% { transform: translateY(110%); }
}

@keyframes duneShift {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(20px); }
}

@keyframes heartBeat {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

@keyframes waveExpand {
  0% { transform: scale(1); opacity: 0.8; }
  100% { transform: scale(2); opacity: 0; }
}

@keyframes pulse {
  0% { transform: scale(0.3); opacity: 1; }
  100% { transform: scale(1.5); opacity: 0; }
}

@keyframes centerPulse {
  0%, 100% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(1.2); opacity: 1; }
}
</style>

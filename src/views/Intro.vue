<template>
  <div class="intro-container">
    <!-- 黑色粒子层 -->
    <div class="particles">
      <div
        v-for="particle in particles"
        :key="particle.id"
        class="particle"
        :style="{
          left: particle.x + '%',
          top: particle.y + '%',
          width: particle.size + 'px',
          height: particle.size + 'px',
          animationDelay: particle.delay + 's',
          animationDuration: particle.duration + 's'
        }"
      ></div>
    </div>

    <!-- 中心内容 -->
    <div class="center-content">
      <!-- 门 -->
      <div class="door-container" @click="enterUniverse">
        <!-- 年份标记 -->
        <div class="door-year">EST. 2026</div>

        <!-- 门框 -->
        <div class="door-frame">
          <!-- 左门 -->
          <div class="door door-left">
            <div class="door-inner"></div>
          </div>

          <!-- 右门 -->
          <div class="door door-right">
            <div class="door-inner"></div>
          </div>

          <!-- 门缝光芒 -->
          <div class="door-glow"></div>

          <!-- 门把手（星号） -->
          <div class="door-handle">✦</div>
        </div>

        <!-- 门槛 -->
        <div class="door-threshold"></div>
      </div>

      <!-- 副标题 -->
      <p class="subtitle">Where stories breathe</p>

      <!-- 按钮 -->
      <div class="button-group">
        <button class="enter-btn" @click="enterUniverse">
          Enter the Library
        </button>
        <button class="yearbook-btn" @click="enterYearbook">
          Open Yearbook
        </button>
      </div>
    </div>

    <!-- 底部装饰 -->
    <div class="bottom-decoration">
      <div class="deco-line"></div>
      <div class="deco-dot"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const particles = ref([])

// 生成粒子
function initParticles() {
  const particleCount = 30
  const newParticles = []

  for (let i = 0; i < particleCount; i++) {
    newParticles.push({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 8,
      duration: Math.random() * 4 + 6
    })
  }

  particles.value = newParticles
}

const enterUniverse = () => {
  router.push('/universe')
}

const enterYearbook = () => {
  console.log('Clicking Open Yearbook button')
  router.push('/yearbook').then(() => {
    console.log('Navigation successful')
  }).catch(err => {
    console.error('Navigation failed:', err)
  })
}

onMounted(() => {
  initParticles()
})
</script>

<style scoped>
/* ========== 容器 ========== */
.intro-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  background: #f7f5f2;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* ========== 粒子层 ========== */
.particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.particle {
  position: absolute;
  background: rgba(26, 26, 26, 0.15);
  border-radius: 50%;
  animation: particle-float ease-in-out infinite;
}

@keyframes particle-float {
  0%, 100% {
    transform: translateY(0) translateX(0);
    opacity: 0;
  }
  10% {
    opacity: 0.3;
  }
  50% {
    transform: translateY(-30px) translateX(10px);
    opacity: 0.5;
  }
  90% {
    opacity: 0.2;
  }
}

/* ========== 中心内容 ========== */
.center-content {
  position: relative;
  z-index: 10;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

/* ========== 门 ========== */
.door-container {
  position: relative;
  cursor: pointer;
  margin-bottom: 1rem;
}

.door-year {
  font-family: 'Inter', sans-serif;
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.3em;
  color: rgba(26, 26, 26, 0.4);
  text-align: center;
  margin-bottom: 2rem;
  text-transform: uppercase;
  opacity: 0;
  animation: fade-in 1s ease-out forwards;
}

.door-frame {
  position: relative;
  width: 200px;
  height: 300px;
  perspective: 1000px;
}

/* 门通用样式 */
.door {
  position: absolute;
  top: 0;
  width: 98px;
  height: 300px;
  background: rgba(26, 26, 26, 0.02);
  border: 1px solid #1a1a1a;
  transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: center;
  overflow: hidden;
}

.door-left {
  left: 0;
  transform-style: preserve-3d;
}

.door-right {
  right: 0;
  transform-style: preserve-3d;
}

/* 悬停时门打开 */
.door-container:hover .door-left {
  transform: rotateY(-10deg);
}

.door-container:hover .door-right {
  transform: rotateY(10deg);
}

/* 门内纹理 */
.door-inner {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    rgba(26, 26, 26, 0.03) 0%,
    rgba(26, 26, 26, 0.01) 50%,
    rgba(26, 26, 26, 0.03) 100%
  );
  opacity: 0;
  transition: opacity 0.8s ease;
}

.door-container:hover .door-inner {
  opacity: 1;
}

/* 门缝光芒 */
.door-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 4px;
  height: 280px;
  background: linear-gradient(
    to bottom,
    transparent,
    rgba(26, 26, 26, 0.3),
    transparent
  );
  opacity: 0.5;
  animation: glow-breathe 4s ease-in-out infinite;
}

@keyframes glow-breathe {
  0%, 100% {
    opacity: 0.3;
    width: 4px;
  }
  50% {
    opacity: 0.6;
    width: 6px;
  }
}

/* 悬停时门缝光芒增强 */
.door-container:hover .door-glow {
  opacity: 0.8;
  animation: glow-pulse 2s ease-in-out infinite;
}

@keyframes glow-pulse {
  0%, 100% {
    opacity: 0.7;
    width: 6px;
    filter: blur(2px);
  }
  50% {
    opacity: 1;
    width: 10px;
    filter: blur(4px);
  }
}

/* 门槛 */
.door-threshold {
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 216px;
  height: 2px;
  background: #1a1a1a;
  opacity: 0.6;
}

/* 门把手（星号） */
.door-handle {
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.5rem;
  color: rgba(26, 26, 26, 0.3);
  pointer-events: none;
  transition: all 0.4s ease;
}

.door-container:hover .door-handle {
  color: rgba(26, 26, 26, 0.6);
  transform: translate(-50%, -50%) scale(1.2);
}

/* ========== 副标题 ========== */
.subtitle {
  font-family: 'Source Serif 4', Georgia, serif;
  font-size: clamp(1rem, 2vw, 1.3rem);
  font-weight: 300;
  font-style: italic;
  letter-spacing: 0.15em;
  color: rgba(26, 26, 26, 0.6);
  margin: 0;
  opacity: 0;
  animation: fade-in 1s ease-out 0.5s forwards;
}

@keyframes fade-in {
  to {
    opacity: 1;
  }
}

/* ========== 按钮 ========== */
.button-group {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.enter-btn,
.yearbook-btn {
  padding: 1rem 2.5rem;
  background: transparent;
  border: 1px solid #1a1a1a;
  color: #1a1a1a;
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.4s ease;
  opacity: 0;
  animation: fade-in 1s ease-out 0.8s forwards;
}

.yearbook-btn {
  border-color: #FF3000;
  color: #FF3000;
}

.enter-btn:hover {
  background: #1a1a1a;
  color: #f7f5f2;
  box-shadow: 0 0 30px rgba(26, 26, 26, 0.2);
}

.yearbook-btn:hover {
  background: #FF3000;
  color: #f7f5f2;
  box-shadow: 0 0 30px rgba(255, 48, 0, 0.3);
}

.enter-btn:focus-visible,
.yearbook-btn:focus-visible {
  outline: 2px solid #1a1a1a;
  outline-offset: 4px;
}

/* ========== 底部装饰 ========== */
.bottom-decoration {
  position: absolute;
  bottom: 3rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 1rem;
  z-index: 10;
}

.deco-line {
  width: 60px;
  height: 1px;
  background: rgba(26, 26, 26, 0.2);
}

.deco-dot {
  width: 6px;
  height: 6px;
  border: 1px solid rgba(26, 26, 26, 0.3);
}

/* ========== 响应式 ========== */
@media (max-width: 768px) {
  .door-frame {
    width: 160px;
    height: 240px;
  }

  .door {
    width: 78px;
    height: 240px;
  }

  .door-glow {
    height: 220px;
  }

  .door-threshold {
    width: 174px;
  }

  .subtitle {
    font-size: 0.9rem;
  }

  .door-year {
    font-size: 0.55rem;
    margin-bottom: 1.5rem;
  }

  .door-handle {
    font-size: 1.2rem;
  }

  .button-group {
    flex-direction: column;
    gap: 0.75rem;
  }

  .enter-btn,
  .yearbook-btn {
    padding: 0.875rem 2rem;
    font-size: 0.65rem;
  }

  .particle {
    display: none;
  }
}

@media (max-width: 480px) {
  .door-frame {
    width: 140px;
    height: 200px;
  }

  .door {
    width: 68px;
    height: 200px;
  }

  .door-glow {
    height: 180px;
  }

  .door-threshold {
    width: 154px;
  }
}
</style>

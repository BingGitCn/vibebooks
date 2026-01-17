<template>
  <div class="intro-container">
    <!-- 金色粒子层 -->
    <div class="golden-particles">
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
      <!-- 金色的门 -->
      <div class="door-container" @click="enterUniverse">
        <!-- 门楣文字 -->
        <div class="door-header">书籍 Vibe 宇宙</div>

        <!-- 门框 -->
        <div class="door-frame">
          <!-- 左门 -->
          <div class="door door-left">
            <div class="door-light"></div>
          </div>

          <!-- 右门 -->
          <div class="door door-right">
            <div class="door-light"></div>
          </div>

          <!-- 门缝光芒 -->
          <div class="door-glow"></div>
        </div>

        <!-- 门槛 -->
        <div class="door-threshold"></div>
      </div>

      <!-- 副标题 -->
      <p class="subtitle">Where stories breathe</p>

      <!-- 按钮 -->
      <button class="enter-btn" @click="enterUniverse">
        推开这扇门
      </button>
    </div>

    <!-- 底部装饰线 -->
    <div class="bottom-decoration">
      <div class="deco-line"></div>
      <div class="deco-square"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const particles = ref([])

// 生成金色粒子
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

/* ========== 金色粒子层 ========== */
.golden-particles {
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
  background: rgba(212, 175, 55, 0.3);
  border-radius: 50%;
  animation: particle-float ease-in-out infinite;
}

@keyframes particle-float {
  0%, 100% {
    transform: translateY(0) translateX(0);
    opacity: 0;
  }
  10% {
    opacity: 0.5;
  }
  50% {
    transform: translateY(-30px) translateX(10px);
    opacity: 0.8;
  }
  90% {
    opacity: 0.3;
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

/* ========== 金色的门 ========== */
.door-container {
  position: relative;
  cursor: pointer;
  margin-bottom: 1rem;
}

.door-header {
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.4em;
  color: #d4af37;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  opacity: 0.8;
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
  background: linear-gradient(
    135deg,
    rgba(212, 175, 55, 0.05) 0%,
    rgba(212, 175, 55, 0.02) 50%,
    rgba(212, 175, 55, 0.05) 100%
  );
  border: 1px solid #d4af37;
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

/* 门内光芒 */
.door-light {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    circle at center,
    rgba(212, 175, 55, 0.3) 0%,
    rgba(212, 175, 55, 0.1) 50%,
    transparent 70%
  );
  opacity: 0;
  transition: opacity 0.8s ease;
}

.door-container:hover .door-light {
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
    rgba(212, 175, 55, 0.4),
    transparent
  );
  opacity: 0.6;
  animation: glow-breathe 4s ease-in-out infinite;
}

@keyframes glow-breathe {
  0%, 100% {
    opacity: 0.4;
    width: 4px;
  }
  50% {
    opacity: 0.8;
    width: 6px;
  }
}

/* 悬停时门缝光芒增强 */
.door-container:hover .door-glow {
  opacity: 1;
  animation: glow-pulse 2s ease-in-out infinite;
}

@keyframes glow-pulse {
  0%, 100% {
    opacity: 0.8;
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
  background: #d4af37;
  opacity: 0.6;
}

/* ========== 副标题 ========== */
.subtitle {
  font-family: 'Source Serif 4', Georgia, serif;
  font-size: clamp(1rem, 2vw, 1.3rem);
  font-weight: 300;
  font-style: italic;
  letter-spacing: 0.15em;
  color: rgba(212, 175, 55, 0.7);
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
.enter-btn {
  padding: 1rem 2.5rem;
  background: transparent;
  border: 1px solid #d4af37;
  color: #d4af37;
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

.enter-btn:hover {
  background: #d4af37;
  color: #f7f5f2;
  box-shadow: 0 0 30px rgba(212, 175, 55, 0.4);
}

.enter-btn:focus-visible {
  outline: 2px solid #d4af37;
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
  background: rgba(212, 175, 55, 0.3);
}

.deco-square {
  width: 6px;
  height: 6px;
  border: 1px solid rgba(212, 175, 55, 0.4);
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

  .door-header {
    font-size: 0.6rem;
    margin-bottom: 1rem;
  }

  .subtitle {
    font-size: 0.9rem;
  }

  .enter-btn {
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

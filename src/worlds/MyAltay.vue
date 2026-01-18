<template>
  <div class="altay-world">
    <!-- 跃迁动画遮罩 -->
    <transition name="warp">
      <div v-if="showWarp" class="warp-overlay">
        <div class="warp-yurt"></div>
        <div class="warp-text">我的阿勒泰</div>
      </div>
    </transition>

    <!-- 返回按钮 -->
    <button class="exit-btn" @click="exitWorld">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M19 12H5M12 19l-7-7 7-7"/>
      </svg>
      <span>Return</span>
    </button>

    <!-- 极简几何叙事 -->
    <div class="geometric-narrative" @click="nextStage">
      <!-- 阶段 1: 雪山 - 永恒凝视 -->
      <transition name="stage-fade">
        <div v-if="currentStage === 1" key="stage1" class="stage-container">
          <div class="mountain-stage">
            <svg class="mountain-svg" viewBox="0 0 200 200">
              <!-- 主雪山 -->
              <polygon class="mountain-main" points="100,40 60,160 140,160"/>
              <!-- 左侧小山 -->
              <polygon class="mountain-left" points="50,80 30,160 70,160"/>
              <!-- 右侧小山 -->
              <polygon class="mountain-right" points="150,80 130,160 170,160"/>
              <!-- 雪线 -->
              <line class="snow-line" x1="100" y1="40" x2="70" y2="100"/>
              <line class="snow-line" x2="130" y2="100" x1="100" y1="40"/>
            </svg>
          </div>
          <p class="stage-title">阿勒泰山脉</p>
          <p class="stage-subtitle">万年积雪覆盖的山峰</p>
          <p class="stage-quote">它们静默地矗立，看着我，也看着所有生灵</p>
        </div>
      </transition>

      <!-- 阶段 2: 草原 - 辽阔自由 -->
      <transition name="stage-fade">
        <div v-if="currentStage === 2" key="stage2" class="stage-container">
          <div class="grassland-stage">
            <div v-for="i in 3" :key="i"
                 class="grass-line"
                 :style="{
                   animationDelay: (i * 0.5) + 's',
                   top: (20 + i * 15) + '%'
                 }">
            </div>
          </div>
          <p class="stage-title">世界就在手边</p>
          <p class="stage-subtitle">躺倒就是睡眠</p>
          <p class="stage-quote">草原没有尽头，云也没有尽头</p>
        </div>
      </transition>

      <!-- 阶段 3: 毡房 - 温暖流动 -->
      <transition name="stage-fade">
        <div v-if="currentStage === 3" key="stage3" class="stage-container">
          <div class="yurt-stage">
            <div class="yurt-roof"></div>
            <div class="yurt-body"></div>
            <div class="smoke-dot"></div>
          </div>
          <p class="stage-title">我们的家</p>
          <p class="stage-subtitle">会移动的家</p>
          <p class="stage-quote">春天到夏牧场，秋天回冬窝子</p>
        </div>
      </transition>

      <!-- 阶段 4: 动物群 - 生命自在 -->
      <transition name="stage-fade">
        <div v-if="currentStage === 4" key="stage4" class="stage-container">
          <div class="animals-stage">
            <div v-for="(animal, i) in animalDots" :key="i"
                 class="animal-dot"
                 :style="{
                   left: animal.x + '%',
                   top: animal.y + '%',
                   animationDelay: (i * 0.3) + 's',
                   animationDuration: animal.speed + 's'
                 }">
            </div>
          </div>
          <p class="stage-title">马儿在吃草</p>
          <p class="stage-subtitle">牛羊在漫步</p>
          <p class="stage-quote">它们比我们更懂得，如何在这片土地上活着</p>
        </div>
      </transition>

      <!-- 阶段 5: 四季 - 时间轮回 -->
      <transition name="stage-fade">
        <div v-if="currentStage === 5" key="stage5" class="stage-container">
          <div class="seasons-stage">
            <svg class="seasons-circle" viewBox="0 0 200 200">
              <!-- 春 -->
              <circle class="season-dot season-spring" cx="100" cy="20" r="8"/>
              <!-- 夏 -->
              <circle class="season-dot season-summer" cx="180" cy="100" r="8"/>
              <!-- 秋 -->
              <circle class="season-dot season-autumn" cx="100" cy="180" r="8"/>
              <!-- 冬 -->
              <circle class="season-dot season-winter" cx="20" cy="100" r="8"/>
              <!-- 连接线 -->
              <circle class="season-ring" cx="100" cy="100" r="80" fill="none"/>
            </svg>
          </div>
          <p class="stage-title">一切都是循环</p>
          <p class="stage-subtitle">春→夏→秋→冬</p>
          <p class="stage-quote">春天雪融化，冬天雪又落</p>
        </div>
      </transition>

      <!-- 阶段 6: 我与大地 - 融合 -->
      <transition name="stage-fade">
        <div v-if="currentStage === 6" key="stage6" class="stage-container">
          <div class="unity-stage">
            <!-- 雪山 -->
            <svg class="mountain-small" viewBox="0 0 100 100">
              <polygon class="mountain-mini" points="50,20 30,80 70,80"/>
            </svg>
            <!-- 草原线 -->
            <div class="grass-lines-mini">
              <div v-for="i in 3" :key="i" class="grass-line-mini"></div>
            </div>
            <!-- 我 -->
            <div class="me-dot"></div>
          </div>
          <p class="stage-title">我不再是我</p>
          <p class="stage-subtitle">我是这片土地的一部分</p>
          <p class="stage-quote">世界就在手边，躺倒就是睡眠</p>
        </div>
      </transition>
    </div>

    <!-- 进度指示 -->
    <div class="progress-container">
      <p v-if="currentStage < 6" class="click-hint">点击继续</p>
      <div class="progress-indicator">
        <div
          v-for="i in 6"
          :key="i"
          class="progress-dot"
          :class="{ active: currentStage >= i }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const showWarp = ref(true)
const currentStage = ref(0)

// 动物点位置（模拟马/牛/羊在草原上）
const animalDots = [
  { x: 20, y: 30, speed: 12 },
  { x: 35, y: 45, speed: 15 },
  { x: 50, y: 35, speed: 10 },
  { x: 65, y: 50, speed: 14 },
  { x: 75, y: 40, speed: 11 },
  { x: 25, y: 60, speed: 13 },
  { x: 45, y: 65, speed: 16 },
  { x: 70, y: 70, speed: 12 }
]

const nextStage = () => {
  if (currentStage.value < 6) {
    currentStage.value++
  }
}

onMounted(() => {
  // 跃迁动画
  setTimeout(() => {
    showWarp.value = false
  }, 1800)

  // 初始阶段
  currentStage.value = 1
})

const exitWorld = () => {
  router.push('/universe')
}
</script>

<style scoped>
.altay-world {
  min-height: 100vh;
  background: #f7f5f2;
  position: relative;
  overflow: hidden;
}

/* ========== 跃迁动画 ========== */
.warp-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  background: #f7f5f2;
}

.warp-yurt {
  width: 150px;
  height: 75px;
  border: 3px solid #8ab4a4;
  border-radius: 150px 150px 0 0;
  position: relative;
  animation: warp-expand 1.5s ease-out forwards;
}

.warp-text {
  position: absolute;
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 0.9rem;
  letter-spacing: 0.3em;
  color: rgba(0, 0, 0, 0.8);
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

/* ========== 返回按钮 ========== */
.exit-btn {
  position: fixed;
  top: 2rem;
  left: 2rem;
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 2rem;
  background: #1a1a1a;
  border: none;
  color: #f7f5f2;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.1s;
  z-index: 100;
}

.exit-btn:hover {
  background: #f7f5f2;
  color: #1a1a1a;
  box-shadow: inset 0 0 0 2px #1a1a1a;
}

.exit-btn svg {
  width: 18px;
  height: 18px;
}

/* ========== 几何叙事容器 ========== */
.geometric-narrative {
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
}

.stage-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* 阶段过渡 */
.stage-fade-enter-active,
.stage-fade-leave-active {
  transition: all 1.2s cubic-bezier(0.23, 1, 0.32, 1);
}

.stage-fade-enter-from {
  opacity: 0;
  transform: translate(-50%, -50%) translateY(30px);
}

.stage-fade-leave-to {
  opacity: 0;
  transform: translate(-50%, -50%) translateY(-30px);
}

/* ========== 阶段 1: 雪山 ========== */
.mountain-stage {
  position: relative;
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mountain-svg {
  width: 100%;
  height: 100%;
  animation: mountain-breathe 8s ease-in-out infinite;
}

.mountain-main {
  fill: none;
  stroke: #8ab4a4;
  stroke-width: 2;
}

.mountain-left,
.mountain-right {
  fill: none;
  stroke: #c9b896;
  stroke-width: 1.5;
  opacity: 0.6;
}

.snow-line {
  stroke: #f7f5f2;
  stroke-width: 1;
  opacity: 0.8;
}

@keyframes mountain-breathe {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.02);
  }
}

/* ========== 阶段 2: 草原 ========== */
.grassland-stage {
  position: relative;
  width: 300px;
  height: 120px;
}

.grass-line {
  position: absolute;
  left: 10%;
  width: 80%;
  height: 1px;
  background: #8ab4a4;
  animation: grass-wave 6s ease-in-out infinite;
}

@keyframes grass-wave {
  0%, 100% {
    transform: translateY(0) scaleX(1);
    opacity: 0.6;
  }
  50% {
    transform: translateY(-4px) scaleX(1.03);
    opacity: 0.8;
  }
}

/* ========== 阶段 3: 毡房 ========== */
.yurt-stage {
  position: relative;
  width: 120px;
  height: 100px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

.yurt-roof {
  width: 80px;
  height: 40px;
  border: 2px solid #8ab4a4;
  border-radius: 80px 80px 0 0;
  border-bottom: none;
  position: absolute;
  bottom: 45px;
  animation: yurt-glow 6s ease-in-out infinite;
}

.yurt-body {
  width: 80px;
  height: 45px;
  border: 2px solid #8ab4a4;
  border-top: none;
  border-radius: 0 0 10px 10px;
  position: absolute;
  bottom: 0;
}

.smoke-dot {
  width: 4px;
  height: 4px;
  background: #c9b896;
  border-radius: 50%;
  position: absolute;
  bottom: 90px;
  opacity: 0.6;
  animation: smoke-rise 4s ease-in-out infinite;
}

@keyframes yurt-glow {
  0%, 100% {
    border-color: #8ab4a4;
  }
  50% {
    border-color: #a8c8b8;
  }
}

@keyframes smoke-rise {
  0% {
    transform: translateY(0);
    opacity: 0.6;
  }
  100% {
    transform: translateY(-20px);
    opacity: 0;
  }
}

/* ========== 阶段 4: 动物群 ========== */
.animals-stage {
  position: relative;
  width: 250px;
  height: 250px;
}

.animal-dot {
  width: 6px;
  height: 6px;
  background: #8ab4a4;
  border-radius: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
  animation: animal-graze 12s ease-in-out infinite;
}

@keyframes animal-graze {
  0%, 100% {
    transform: translate(-50%, -50%) scale(1);
  }
  25% {
    transform: translate(-45%, -48%) scale(1);
  }
  50% {
    transform: translate(-55%, -52%) scale(1);
  }
  75% {
    transform: translate(-50%, -50%) scale(1);
  }
}

/* ========== 阶段 5: 四季 ========== */
.seasons-stage {
  position: relative;
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.seasons-circle {
  width: 100%;
  height: 100%;
  animation: seasons-rotate 30s linear infinite;
}

.season-ring {
  stroke: #d4d4d4;
  stroke-width: 1;
}

.season-dot {
  animation: season-pulse 4s ease-in-out infinite;
}

.season-spring {
  fill: #8ab4a4;
  animation-delay: 0s;
}

.season-summer {
  fill: #a8d4a4;
  animation-delay: 1s;
}

.season-autumn {
  fill: #c9b896;
  animation-delay: 2s;
}

.season-winter {
  fill: #f7f5f2;
  stroke: #d4d4d4;
  stroke-width: 1;
  animation-delay: 3s;
}

@keyframes seasons-rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes season-pulse {
  0%, 100% {
    r: 8;
    opacity: 0.8;
  }
  50% {
    r: 10;
    opacity: 1;
  }
}

/* ========== 阶段 6: 我与大地 ========== */
.unity-stage {
  position: relative;
  width: 200px;
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: unity-breathe 10s ease-in-out infinite;
}

.mountain-small {
  position: absolute;
  width: 80px;
  height: 80px;
  top: 0;
}

.mountain-mini {
  fill: none;
  stroke: #8ab4a4;
  stroke-width: 1.5;
}

.grass-lines-mini {
  position: absolute;
  bottom: 40px;
  width: 100%;
  height: 30px;
}

.grass-line-mini {
  width: 70%;
  height: 1px;
  background: #8ab4a4;
  margin: 8px auto;
  opacity: 0.6;
}

.me-dot {
  width: 8px;
  height: 8px;
  background: #c9b896;
  border-radius: 50%;
  position: absolute;
  bottom: 30px;
  animation: me-pulse 6s ease-in-out infinite;
}

@keyframes unity-breathe {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.03);
  }
}

@keyframes me-pulse {
  0%, 100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(201, 184, 150, 0.4);
  }
  50% {
    transform: scale(1.2);
    box-shadow: 0 0 15px 5px rgba(201, 184, 150, 0.2);
  }
}

/* ========== 文本样式 ========== */
.stage-title {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 400;
  color: #1a1a1a;
  margin: 0;
  letter-spacing: 0.05em;
}

.stage-subtitle {
  font-family: 'Source Serif 4', Georgia, serif;
  font-size: clamp(0.9rem, 1.5vw, 1.1rem);
  font-style: italic;
  color: #525252;
  margin: 0;
}

.stage-quote {
  font-family: 'Source Serif 4', Georgia, serif;
  font-size: clamp(1rem, 2vw, 1.2rem);
  color: #1a1a1a;
  margin: 0;
  max-width: 400px;
  line-height: 1.6;
}

/* ========== 进度指示 ========== */
.progress-container {
  position: fixed;
  bottom: 3rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  z-index: 50;
}

.click-hint {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.6rem;
  letter-spacing: 0.2em;
  color: #1a1a1a;
  opacity: 0.4;
  margin: 0;
  text-transform: uppercase;
  animation: hint-pulse 2s ease-in-out infinite;
}

@keyframes hint-pulse {
  0%, 100% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.6;
  }
}

.progress-indicator {
  display: flex;
  gap: 8px;
}

.progress-dot {
  width: 6px;
  height: 6px;
  background: #d4d4d4;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.progress-dot.active {
  background: #8ab4a4;
  width: 20px;
  border-radius: 3px;
}

/* ========== 响应式 ========== */
@media (max-width: 768px) {
  .exit-btn {
    top: 1rem;
    left: 1rem;
    padding: 0.75rem 1.5rem;
    font-size: 0.65rem;
  }

  .stage-container {
    gap: 2rem;
    padding: 0 2rem;
  }

  .grassland-stage,
  .animals-stage {
    width: 250px;
  }

  .mountain-stage,
  .seasons-stage,
  .unity-stage {
    width: 180px;
  }
}
</style>

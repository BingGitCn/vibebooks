<template>
  <div class="island-economics-world">
    <!-- 跃迁动画遮罩 -->
    <transition name="warp">
      <div v-if="showWarp" class="warp-overlay">
        <div class="warp-rect"></div>
        <div class="warp-text">小岛经济学</div>
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
      <!-- 阶段 1: 钓鱼 - 原始劳动 -->
      <transition name="stage-fade">
        <div v-if="currentStage === 1" key="stage1" class="stage-container">
          <div class="fishing-dot"></div>
          <p class="stage-title">艾伯、贝克、查理</p>
          <p class="stage-subtitle">三个男人，三根鱼竿</p>
          <p class="stage-quote">我们每天只能钓一条鱼，刚刚够活命</p>
        </div>
      </transition>

      <!-- 阶段 2: 储蓄 - 延迟满足 -->
      <transition name="stage-fade">
        <div v-if="currentStage === 2" key="stage2" class="stage-container">
          <div class="savings-dot"></div>
          <p class="stage-title">艾伯决定</p>
          <p class="stage-subtitle">忍一天饿，储蓄</p>
          <p class="stage-quote">有了两条鱼，他可以做鱼网</p>
        </div>
      </transition>

      <!-- 阶段 3: 工具 - 资本形成 -->
      <transition name="stage-fade">
        <div v-if="currentStage === 3" key="stage3" class="stage-container">
          <div class="tool-stage">
            <div class="fish-net"></div>
            <div class="person-dot person-1"></div>
            <div class="person-dot person-2"></div>
            <div class="person-dot person-3"></div>
          </div>
          <p class="stage-title">鱼网改变游戏规则</p>
          <p class="stage-subtitle">一天能钓两条鱼</p>
          <p class="stage-quote">贝克和查理开始借鱼，做自己的网</p>
        </div>
      </transition>

      <!-- 阶段 4: 信贷 - 信任网络 -->
      <transition name="stage-fade">
        <div v-if="currentStage === 4" key="stage4" class="stage-container">
          <div class="credit-network">
            <svg class="credit-connections" viewBox="0 0 300 300">
              <!-- 信任连线 -->
              <line v-for="(line, i) in creditLines" :key="i"
                    :x1="line.x1" :y1="line.y1"
                    :x2="line.x2" :y2="line.y2"
                    class="credit-line gold-flow"
                    :style="{ animationDelay: (i * 0.3) + 's' }"/>
            </svg>
            <div v-for="(dot, i) in creditDots" :key="i"
                 class="credit-person-dot"
                 :style="{ left: dot.x + '%', top: dot.y + '%' }">
            </div>
          </div>
          <p class="stage-title">岛上的鱼越来越多</p>
          <p class="stage-subtitle">有人甚至不用储蓄也能借到鱼</p>
          <p class="stage-quote">"我明天一定会还"</p>
        </div>
      </transition>

      <!-- 阶段 5: 通胀 - 货币幻觉 -->
      <transition name="stage-fade">
        <div v-if="currentStage === 5" key="stage5" class="stage-container">
          <div class="inflation-stage">
            <div class="inflation-center"></div>
            <div v-for="i in 5" :key="i" class="inflation-wave" :style="{ animationDelay: (i * 0.4) + 's' }"></div>
            <div class="shrinking-dots">
              <div v-for="i in 8" :key="i"
                   class="shrinking-dot"
                   :style="{
                     left: dotPositions[i-1].x + '%',
                     top: dotPositions[i-1].y + '%',
                     animationDelay: (i * 0.2) + 's'
                   }">
              </div>
            </div>
          </div>
          <p class="stage-title">发行鱼券代替鱼</p>
          <p class="stage-subtitle">"这是一种更便捷的交易方式"</p>
          <p class="stage-quote">每个人都觉得自己更富了，直到去买鱼时才发现</p>
        </div>
      </transition>

      <!-- 阶段 6: 泡沫 - 系统脆弱 -->
      <transition name="stage-fade">
        <div v-if="currentStage === 6" key="stage6" class="stage-container">
          <div class="bubble-stage" :class="{ shaking: showBubbleEffect }">
            <div class="broken-rects">
              <div v-for="i in 6" :key="i"
                   class="broken-rect"
                   :style="{
                     left: rectPositions[i-1].x + '%',
                     top: rectPositions[i-1].y + '%',
                     transform: `rotate(${rectPositions[i-1].rotation}deg)`,
                     animationDelay: (i * 0.15) + 's'
                   }">
              </div>
            </div>
            <div class="fractured-lines">
              <svg viewBox="0 0 300 300">
                <line v-for="(line, i) in fractureLines" :key="i"
                      :x1="line.x1" :y1="line.y1"
                      :x2="line.x2" :y2="line.y2"
                      class="fracture-line red-alert"/>
              </svg>
            </div>
          </div>
          <p class="stage-title">泡沫破裂</p>
          <p class="stage-subtitle">当所有人都相信房价永远上涨</p>
          <p class="stage-quote">We build castles in the air</p>
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
const showBubbleEffect = ref(false)

// 信贷网络连线
const creditLines = [
  { x1: 150, y1: 150, x2: 80, y2: 80 },
  { x1: 150, y1: 150, x2: 220, y2: 80 },
  { x1: 150, y1: 150, x2: 80, y2: 220 },
  { x1: 150, y1: 150, x2: 220, y2: 220 },
  { x1: 80, y1: 80, x2: 220, y2: 80 },
  { x1: 80, y1: 220, x2: 220, y2: 220 }
]

// 信贷网络人员位置
const creditDots = [
  { x: 50, y: 27 },
  { x: 73, y: 27 },
  { x: 27, y: 50 },
  { x: 73, y: 50 },
  { x: 27, y: 73 },
  { x: 50, y: 73 },
  { x: 27, y: 27 },
  { x: 73, y: 73 }
]

// 缩小的小点位置（阶段 5）
const dotPositions = [
  { x: 50, y: 50 },
  { x: 35, y: 40 },
  { x: 65, y: 40 },
  { x: 30, y: 55 },
  { x: 70, y: 55 },
  { x: 40, y: 65 },
  { x: 60, y: 65 },
  { x: 50, y: 75 }
]

// 破碎矩形位置（阶段 6）
const rectPositions = [
  { x: 20, y: 15, rotation: 15 },
  { x: 65, y: 20, rotation: -20 },
  { x: 15, y: 55, rotation: 25 },
  { x: 70, y: 60, rotation: -15 },
  { x: 35, y: 75, rotation: 10 },
  { x: 60, y: 80, rotation: -25 }
]

// 断裂连线
const fractureLines = [
  { x1: 150, y1: 150, x2: 80, y2: 80 },
  { x1: 150, y1: 150, x2: 220, y2: 80 },
  { x1: 150, y1: 150, x2: 80, y2: 220 },
  { x1: 150, y1: 150, x2: 220, y2: 220 },
  { x1: 80, y1: 80, x2: 220, y2: 220 },
  { x1: 220, y1: 80, x2: 80, y2: 220 }
]

const nextStage = () => {
  if (currentStage.value < 6) {
    currentStage.value++
    // 阶段 6 触发震动效果
    if (currentStage.value === 6) {
      setTimeout(() => {
        showBubbleEffect.value = true
      }, 500)
    }
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
.island-economics-world {
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

.warp-rect {
  width: 200px;
  height: 150px;
  border: 3px solid #f4d03f;
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

/* ========== 阶段 1: 钓鱼 ========== */
.fishing-dot {
  width: 10px;
  height: 10px;
  background: #1a1a1a;
  border-radius: 50%;
  animation: fishing-bob 1s ease-in-out infinite;
}

@keyframes fishing-bob {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
}

/* ========== 阶段 2: 储蓄 ========== */
.savings-dot {
  width: 30px;
  height: 30px;
  background: #f4d03f;
  border-radius: 50%;
  animation: savings-grow 4s ease-in-out infinite;
}

@keyframes savings-grow {
  0%, 100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(244, 208, 63, 0.4);
  }
  50% {
    transform: scale(1.15);
    box-shadow: 0 0 20px 5px rgba(244, 208, 63, 0.2);
  }
}

/* ========== 阶段 3: 工具 ========== */
.tool-stage {
  position: relative;
  width: 150px;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.fish-net {
  width: 50px;
  height: 60px;
  border: 2px solid #f4d03f;
  position: absolute;
  animation: tool-rotate 20s linear infinite;
}

.fish-net::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: rgba(244, 208, 63, 0.3);
}

.fish-net::after {
  content: '';
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 1px;
  background: rgba(244, 208, 63, 0.3);
}

.person-dot {
  width: 8px;
  height: 8px;
  background: #1a1a1a;
  border-radius: 50%;
  position: absolute;
  animation: orbit-circle 15s linear infinite;
}

.person-1 {
  offset-path: circle(60px at 50% 50%);
  animation-delay: 0s;
}

.person-2 {
  offset-path: circle(60px at 50% 50%);
  animation-delay: -5s;
}

.person-3 {
  offset-path: circle(60px at 50% 50%);
  animation-delay: -10s;
}

@keyframes tool-rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes orbit-circle {
  from {
    offset-distance: 0%;
  }
  to {
    offset-distance: 100%;
  }
}

/* ========== 阶段 4: 信贷网络 ========== */
.credit-network {
  position: relative;
  width: 300px;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.credit-connections {
  position: absolute;
  width: 100%;
  height: 100%;
}

.credit-line {
  stroke-width: 1;
  opacity: 0.6;
  animation: credit-pulse 2s ease-in-out infinite;
}

.gold-flow {
  stroke: url(#gold-gradient);
  stroke-dasharray: 5, 5;
  animation: credit-flow 2s linear infinite, credit-pulse 2s ease-in-out infinite;
}

@keyframes credit-flow {
  from {
    stroke-dashoffset: 10;
  }
  to {
    stroke-dashoffset: 0;
  }
}

@keyframes credit-pulse {
  0%, 100% {
    opacity: 0.4;
  }
  50% {
    opacity: 0.8;
  }
}

.credit-person-dot {
  width: 6px;
  height: 6px;
  background: #1a1a1a;
  border-radius: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
  animation: person-pulse 3s ease-in-out infinite;
}

@keyframes person-pulse {
  0%, 100% {
    transform: translate(-50%, -50%) scale(1);
  }
  50% {
    transform: translate(-50%, -50%) scale(1.3);
  }
}

/* ========== 阶段 5: 通胀 ========== */
.inflation-stage {
  position: relative;
  width: 250px;
  height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.inflation-center {
  width: 4px;
  height: 4px;
  background: #e53e3e;
  border-radius: 50%;
  position: absolute;
}

.inflation-wave {
  position: absolute;
  border: 1px solid rgba(229, 62, 62, 0.3);
  border-radius: 50%;
  animation: inflation-expand 4s ease-out infinite;
}

@keyframes inflation-expand {
  0% {
    width: 10px;
    height: 10px;
    opacity: 0.8;
  }
  100% {
    width: 250px;
    height: 250px;
    opacity: 0;
  }
}

.shrinking-dots {
  position: absolute;
  width: 100%;
  height: 100%;
}

.shrinking-dot {
  width: 3px;
  height: 3px;
  background: #1a1a1a;
  border-radius: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
  animation: shrink-value 3s ease-in-out infinite;
}

@keyframes shrink-value {
  0%, 100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
  50% {
    transform: translate(-50%, -50%) scale(0.3);
    opacity: 0.5;
  }
}

/* ========== 阶段 6: 泡沫破裂 ========== */
.bubble-stage {
  position: relative;
  width: 300px;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bubble-stage.shaking {
  animation: bubble-shake 0.5s ease-in-out infinite;
}

@keyframes bubble-shake {
  0%, 100% {
    transform: translate(0, 0) rotate(0deg);
  }
  25% {
    transform: translate(-2px, 2px) rotate(-1deg);
  }
  50% {
    transform: translate(2px, -2px) rotate(1deg);
  }
  75% {
    transform: translate(-2px, -2px) rotate(-1deg);
  }
}

.broken-rects {
  position: absolute;
  width: 100%;
  height: 100%;
}

.broken-rect {
  width: 30px;
  height: 40px;
  border: 2px solid #e53e3e;
  position: absolute;
  transform-origin: center;
  animation: rect-fall 3s ease-in-out infinite;
}

@keyframes rect-fall {
  0% {
    transform: translate(0, 0) rotate(var(--rotation, 0deg));
    opacity: 1;
  }
  50% {
    transform: translate(10px, 20px) rotate(calc(var(--rotation, 0deg) + 45deg));
    opacity: 0.6;
  }
  100% {
    transform: translate(0, 0) rotate(var(--rotation, 0deg));
    opacity: 1;
  }
}

.fractured-lines {
  position: absolute;
  width: 100%;
  height: 100%;
  animation: fracture-flash 1s ease-in-out infinite;
}

.fracture-line {
  stroke-width: 1;
  stroke-dasharray: 3, 3;
}

.red-alert {
  stroke: #e53e3e;
  opacity: 0.6;
}

@keyframes fracture-flash {
  0%, 100% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
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
  background: #f4d03f;
  width: 20px;
  border-radius: 3px;
}

/* ========== SVG 渐变定义 ========== */
.island-economics-world::before {
  content: '';
  position: absolute;
  width: 0;
  height: 0;
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

  .credit-network,
  .inflation-stage,
  .bubble-stage {
    width: 250px;
    height: 250px;
  }

  .progress-indicator {
    bottom: 2rem;
  }
}
</style>

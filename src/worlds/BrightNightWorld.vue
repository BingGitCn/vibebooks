<template>
  <div class="bright-night-world">
    <!-- 跃迁动画遮罩 -->
    <transition name="warp">
      <div v-if="showWarp" class="warp-overlay">
        <div class="warp-circle">
          <div class="warp-circle-inner"></div>
        </div>
        <div class="warp-text">明亮的夜晚</div>
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
      <!-- 阶段 1: 曾祖母 - 独点 -->
      <transition name="stage-fade">
        <div v-if="currentStage === 1" key="stage1" class="stage-container">
          <div class="lonely-dot"></div>
          <p class="stage-title">曾祖母</p>
          <p class="stage-subtitle">1910年代的汉城</p>
          <p class="stage-quote">她的故事，从一盏煤油灯开始</p>
        </div>
      </transition>

      <!-- 阶段 2: 双星 - 曾祖母与祖母 -->
      <transition name="stage-fade">
        <div v-if="currentStage === 2" key="stage2" class="stage-container">
          <div class="dual-star-stage">
            <div class="star-dot star-1"></div>
            <div class="connection-line-2"></div>
            <div class="star-dot star-2"></div>
          </div>
          <p class="stage-title">曾祖母与祖母</p>
          <p class="stage-subtitle">母女间的秘密传承</p>
          <p class="stage-quote">有些话，只能在夜晚悄悄说</p>
        </div>
      </transition>

      <!-- 阶段 3: 三角 - 三代羁绊 -->
      <transition name="stage-fade">
        <div v-if="currentStage === 3" key="stage3" class="stage-container">
          <div class="triangle-stage">
            <svg class="triangle-connections" viewBox="0 0 200 200">
              <line x1="100" y1="30" x2="30" y2="170" class="tri-line line-1" />
              <line x1="30" y1="170" x2="170" y2="170" class="tri-line line-2" />
              <line x1="170" y1="170" x2="100" y2="30" class="tri-line line-3" />
            </svg>
            <div class="tri-dot dot-top"></div>
            <div class="tri-dot dot-left"></div>
            <div class="tri-dot dot-right"></div>
          </div>
          <p class="stage-title">母亲加入</p>
          <p class="stage-subtitle">三代女性的不同战场</p>
          <p class="stage-quote">我们都在逃离，却又回到同样的地方</p>
        </div>
      </transition>

      <!-- 阶段 4: 四芒 - 完整星系 -->
      <transition name="stage-fade">
        <div v-if="currentStage === 4" key="stage4" class="stage-container">
          <div class="four-star-stage">
            <svg class="four-star-connections" viewBox="0 0 200 200">
              <line x1="100" y1="20" x2="20" y2="100" class="four-line" />
              <line x1="20" y1="100" x2="100" y2="180" class="four-line" />
              <line x1="100" y1="180" x2="180" y2="100" class="four-line" />
              <line x1="180" y1="100" x2="100" y2="20" class="four-line" />
              <line x1="20" y1="100" x2="180" y2="100" class="four-line" />
              <line x1="100" y1="20" x2="100" y2="180" class="four-line" />
            </svg>
            <div class="four-dot dot-top"></div>
            <div class="four-dot dot-left"></div>
            <div class="four-dot dot-right"></div>
            <div class="four-dot dot-bottom"></div>
          </div>
          <p class="stage-title">"我"加入</p>
          <p class="stage-subtitle">四代女性的百年史诗</p>
          <p class="stage-quote">我终于看见，那些夜晚的光是从哪里来的</p>
        </div>
      </transition>

      <!-- 阶段 5: 发光 - 觉醒时刻 -->
      <transition name="stage-fade">
        <div v-if="currentStage === 5" key="stage5" class="stage-container">
          <div class="awakening-stage">
            <svg class="four-star-connections" viewBox="0 0 200 200">
              <line x1="100" y1="20" x2="20" y2="100" class="four-line glowing-line" />
              <line x1="20" y1="100" x2="100" y2="180" class="four-line glowing-line" />
              <line x1="100" y1="180" x2="180" y2="100" class="four-line glowing-line" />
              <line x1="180" y1="100" x2="100" y2="20" class="four-line glowing-line" />
              <line x1="20" y1="100" x2="180" y2="100" class="four-line glowing-line" />
              <line x1="100" y1="20" x2="100" y2="180" class="four-line glowing-line" />
            </svg>
            <div class="awake-dot dot-top"></div>
            <div class="awake-dot dot-left"></div>
            <div class="awake-dot dot-right"></div>
            <div class="awake-dot dot-bottom"></div>
          </div>
          <p class="stage-title">明亮的夜晚</p>
          <p class="stage-subtitle">伤痛被看见，就有了光</p>
          <p class="stage-quote">我们的坚韧，就是黑夜里的灯塔</p>
        </div>
      </transition>

      <!-- 阶段 6: 星河 - 永恒传承 -->
      <transition name="stage-fade">
        <div v-if="currentStage === 6" key="stage6" class="stage-container">
          <div class="galaxy-stage">
            <svg class="galaxy-connections" viewBox="0 0 300 300">
              <!-- 主要连线 -->
              <line x1="150" y1="30" x2="30" y2="150" class="galaxy-line warm-glow" />
              <line x1="30" y1="150" x2="150" y2="270" class="galaxy-line warm-glow" />
              <line x1="150" y1="270" x2="270" y2="150" class="galaxy-line warm-glow" />
              <line x1="270" y1="150" x2="150" y2="30" class="galaxy-line warm-glow" />
              <line x1="30" y1="150" x2="270" y2="150" class="galaxy-line warm-glow" />
              <line x1="150" y1="30" x2="150" y2="270" class="galaxy-line warm-glow" />
            </svg>

            <!-- 四个主星 -->
            <div class="galaxy-star galaxy-top">
              <div class="star-core"></div>
              <div class="star-halo"></div>
            </div>
            <div class="galaxy-star galaxy-left">
              <div class="star-core"></div>
              <div class="star-halo"></div>
            </div>
            <div class="galaxy-star galaxy-right">
              <div class="star-core"></div>
              <div class="star-halo"></div>
            </div>
            <div class="galaxy-star galaxy-bottom">
              <div class="star-core"></div>
              <div class="star-halo"></div>
            </div>

            <!-- 记忆碎片小点 -->
            <div class="memory-fragments">
              <div v-for="i in 12" :key="i"
                   class="fragment-dot"
                   :style="{
                     left: fragmentPositions[i-1].x + '%',
                     top: fragmentPositions[i-1].y + '%',
                     animationDelay: (i * 0.3) + 's'
                   }">
              </div>
            </div>
          </div>
          <p class="stage-title">我们不孤单</p>
          <p class="stage-subtitle">所有女性的夜晚，都是相连的</p>
          <p class="stage-quote">Your light is my light</p>
        </div>
      </transition>
    </div>

    <!-- 进度指示 -->
    <div class="progress-container">
      <p v-if="currentStage < 6" class="click-hint">点击继续探索</p>
      <div class="progress-indicator">
        <div
          v-for="i in 6"
          :key="i"
          class="progress-dot"
          :class="{ active: currentStage >= i }"
        ></div>
      </div>
    </div>

    <!-- 回味模式：阶段 6 点击显示每位女性的独白 -->
    <transition name="quote-fade">
      <div v-if="showQuote" class="woman-quote-modal" @click.stop>
        <p class="quote-title">{{ currentQuote.title }}</p>
        <p class="quote-text">{{ currentQuote.text }}</p>
        <p class="quote-hint">点击任意处关闭</p>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const showWarp = ref(true)
const currentStage = ref(0)
const showQuote = ref(false)
const currentQuote = ref({})

// 记忆碎片位置（12个小点）
const fragmentPositions = [
  { x: 25, y: 15 },
  { x: 75, y: 10 },
  { x: 90, y: 25 },
  { x: 85, y: 70 },
  { x: 95, y: 50 },
  { x: 80, y: 85 },
  { x: 60, y: 92 },
  { x: 40, y: 88 },
  { x: 20, y: 75 },
  { x: 10, y: 50 },
  { x: 15, y: 30 },
  { x: 35, y: 12 }
]

// 四位女性的独白
const womenQuotes = [
  {
    title: '曾祖母',
    text: '我活过的那个年代，女人只是某个人的女儿、妻子、母亲。但我想成为我自己。'
  },
  {
    title: '祖母',
    text: '母亲没有告诉我的事，我用自己的经历补全了。这是我们的秘密。'
  },
  {
    title: '母亲',
    text: '我逃离过，又回来过。最后我发现，这就是我们女性的命运——永远在逃离与回归之间。'
  },
  {
    title: '我',
    text: '我终于理解了她们。我们不是孤单的个体，而是一条奔流不息的河。'
  }
]

const nextStage = () => {
  if (currentStage.value < 6) {
    currentStage.value++
  } else if (currentStage.value === 6) {
    // 阶段 6 显示随机独白
    const randomIndex = Math.floor(Math.random() * womenQuotes.length)
    currentQuote.value = womenQuotes[randomIndex]
    showQuote.value = true
  }
}

// 点击关闭独白
const closeQuote = () => {
  showQuote.value = false
}

onMounted(() => {
  // 跃迁动画
  setTimeout(() => {
    showWarp.value = false
  }, 1800)

  // 初始阶段
  currentStage.value = 1

  // 监听点击关闭独白
  document.addEventListener('click', (e) => {
    if (showQuote.value) {
      const modal = document.querySelector('.woman-quote-modal')
      if (modal && !modal.contains(e.target)) {
        closeQuote()
      }
    }
  })
})

const exitWorld = () => {
  router.push('/universe')
}
</script>

<style scoped>
.bright-night-world {
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

.warp-circle {
  width: 300px;
  height: 300px;
  border: 1px solid rgba(0, 0, 0, 0.3);
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
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  animation: warp-pulse 1s ease-in-out infinite;
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

/* ========== 阶段 1: 曾祖母 ========== */
.lonely-dot {
  width: 12px;
  height: 12px;
  background: #1a1a1a;
  border-radius: 50%;
  animation: float-breathe 15s ease-in-out infinite;
}

@keyframes float-breathe {
  0%, 100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-12px) scale(1.05);
  }
}

/* ========== 阶段 2: 双星 ========== */
.dual-star-stage {
  position: relative;
  width: 150px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.star-dot {
  width: 10px;
  height: 10px;
  background: #1a1a1a;
  border-radius: 50%;
  position: absolute;
  animation: pulse-gentle 8s ease-in-out infinite;
}

.star-1 {
  left: 20px;
}

.star-2 {
  right: 20px;
  animation-delay: 0.5s;
}

.connection-line-2 {
  position: absolute;
  width: 70px;
  height: 2px;
  background: linear-gradient(90deg, #1a1a1a 0%, #f4d03f 100%);
  opacity: 0.5;
}

@keyframes pulse-gentle {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.15);
    opacity: 0.8;
  }
}

/* ========== 阶段 3: 三角 ========== */
.triangle-stage {
  position: relative;
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.triangle-connections {
  position: absolute;
  width: 100%;
  height: 100%;
  animation: triangle-rotate 25s linear infinite;
}

.tri-line {
  stroke-width: 1;
  stroke-linecap: round;
}

.line-1 {
  stroke: #1a1a1a;
  opacity: 0.3;
}

.line-2 {
  stroke: #f4d03f;
  opacity: 0.4;
}

.line-3 {
  stroke: #4a7c9f;
  opacity: 0.4;
}

.tri-dot {
  width: 10px;
  height: 10px;
  background: #1a1a1a;
  border-radius: 50%;
  position: absolute;
}

.dot-top {
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
}

.dot-left {
  bottom: 20px;
  left: 20px;
}

.dot-right {
  bottom: 20px;
  right: 20px;
}

@keyframes triangle-rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* ========== 阶段 4: 四芒 ========== */
.four-star-stage {
  position: relative;
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: gentle-sway 20s ease-in-out infinite;
}

.four-star-connections {
  position: absolute;
  width: 100%;
  height: 100%;
}

.four-line {
  stroke: #f4d03f;
  stroke-width: 1;
  opacity: 0.4;
}

.four-dot {
  width: 12px;
  height: 12px;
  background: #1a1a1a;
  border-radius: 50%;
  position: absolute;
}

.dot-top {
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
}

.dot-left {
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
}

.dot-right {
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
}

.dot-bottom {
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
}

@keyframes gentle-sway {
  0%, 100% {
    transform: rotate(-3deg);
  }
  50% {
    transform: rotate(3deg);
  }
}

/* ========== 阶段 5: 发光 ========== */
.awakening-stage {
  position: relative;
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: gentle-sway 20s ease-in-out infinite;
}

.glowing-line {
  stroke: #f4d03f !important;
  opacity: 0.6 !important;
  filter: drop-shadow(0 0 3px rgba(244, 208, 63, 0.5));
}

.awake-dot {
  width: 12px;
  height: 12px;
  background: #1a1a1a;
  border-radius: 50%;
  position: absolute;
  box-shadow: 0 0 15px rgba(244, 208, 63, 0.6);
  animation: glow-pulse 6s ease-in-out infinite;
}

.awake-dot:nth-child(odd) {
  animation-delay: 0.5s;
}

@keyframes glow-pulse {
  0%, 100% {
    box-shadow: 0 0 15px rgba(244, 208, 63, 0.6);
    transform: scale(1);
  }
  50% {
    box-shadow: 0 0 25px rgba(244, 208, 63, 0.9);
    transform: scale(1.1);
  }
}

/* ========== 阶段 6: 星河 ========== */
.galaxy-stage {
  position: relative;
  width: 300px;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: galaxy-rotate 30s linear infinite;
}

.galaxy-connections {
  position: absolute;
  width: 100%;
  height: 100%;
}

.galaxy-line {
  stroke-width: 1;
  opacity: 0.5;
}

.warm-glow {
  stroke: #f4d03f;
  filter: drop-shadow(0 0 4px rgba(244, 208, 63, 0.4));
}

.galaxy-star {
  position: absolute;
  width: 20px;
  height: 20px;
}

.star-core {
  width: 12px;
  height: 12px;
  background: #1a1a1a;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.star-halo {
  width: 100%;
  height: 100%;
  border: 2px solid #f4d03f;
  border-radius: 50%;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0.6;
  animation: halo-pulse 4s ease-in-out infinite;
}

.galaxy-top {
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
}

.galaxy-left {
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
}

.galaxy-right {
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
}

.galaxy-bottom {
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
}

.galaxy-star:nth-child(odd) .star-halo {
  animation-delay: 1s;
}

@keyframes halo-pulse {
  0%, 100% {
    opacity: 0.4;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.2);
  }
}

@keyframes galaxy-rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* 记忆碎片 */
.memory-fragments {
  position: absolute;
  width: 100%;
  height: 100%;
}

.fragment-dot {
  width: 4px;
  height: 4px;
  background: rgba(244, 208, 63, 0.6);
  border-radius: 50%;
  position: absolute;
  animation: fragment-twinkle 3s ease-in-out infinite;
}

@keyframes fragment-twinkle {
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.5);
  }
}

/* ========== 独白模态框 ========== */
.woman-quote-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(247, 245, 242, 0.98);
  border: 2px solid #f4d03f;
  padding: 3rem 4rem;
  max-width: 500px;
  text-align: center;
  box-shadow: 0 0 50px rgba(244, 208, 63, 0.2);
  z-index: 1000;
}

.quote-title {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 1.5rem;
  font-weight: 400;
  color: #f4d03f;
  margin: 0 0 1.5rem 0;
  letter-spacing: 0.1em;
}

.quote-text {
  font-family: 'Source Serif 4', Georgia, serif;
  font-size: 1.1rem;
  color: #1a1a1a;
  margin: 0 0 2rem 0;
  line-height: 1.8;
  font-style: italic;
}

.quote-hint {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.65rem;
  letter-spacing: 0.15em;
  color: #525252;
  opacity: 0.5;
  margin: 0;
  text-transform: uppercase;
}

.quote-fade-enter-active,
.quote-fade-leave-active {
  transition: all 0.4s ease;
}

.quote-fade-enter-from,
.quote-fade-leave-to {
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.95);
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

  .galaxy-stage {
    width: 250px;
    height: 250px;
  }

  .woman-quote-modal {
    padding: 2rem 2.5rem;
    max-width: 85%;
  }

  .progress-indicator {
    bottom: 2rem;
  }
}
</style>

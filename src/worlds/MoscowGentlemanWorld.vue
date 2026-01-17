<template>
  <div class="moscow-gentleman-world">
    <!-- 跃迁动画 -->
    <transition name="warp">
      <div v-if="showWarp" class="warp-overlay">
        <div class="warp-circle">
          <div class="warp-circle-inner"></div>
        </div>
        <div class="warp-text">莫斯科绅士</div>
      </div>
    </transition>

    <!-- 返回按钮 -->
    <button class="exit-btn" @click="exitWorld">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M19 12H5M12 19l-7-7 7-7"/>
      </svg>
      <span>Return</span>
    </button>

    <!-- 主容器 -->
    <div class="main-container" @click="nextStage">
      <!-- 金色背景装饰 -->
      <div class="golden-background">
        <!-- 阶段 1: 判诀（1922） -->
        <transition name="stage-transition">
          <div v-if="currentStage === 1" class="stage-wrapper stage-1">
            <div class="sentence-frame">
              <div class="frame-border frame-top"></div>
              <div class="frame-border frame-right"></div>
              <div class="frame-border frame-bottom"></div>
              <div class="frame-border frame-left"></div>
            </div>
            <!-- 收缩波纹 -->
            <div class="shrink-wave"></div>
          </div>
        </transition>

        <!-- 阶段 2: 阁楼 -->
        <transition name="stage-transition">
          <div v-if="currentStage === 2" class="stage-wrapper stage-2">
            <div class="attic-room">
              <svg class="room-plan" viewBox="0 0 300 200">
                <!-- 阁楼轮廓 -->
                <path class="room-outline" d="M50,150 L50,80 L150,30 L250,80 L250,150 Z" />
                <!-- 床 -->
                <rect class="furniture bed" x="60" y="110" width="60" height="30" />
                <!-- 椅子 -->
                <rect class="furniture chair" x="140" y="120" width="25" height="25" />
                <!-- 桌子 -->
                <rect class="furniture table" x="180" y="115" width="40" height="30" />
                <!-- 窗户 -->
                <rect class="furniture window" x="135" y="50" width="30" height="25" />
              </svg>
            </div>
            <!-- 绘制光效 -->
            <div class="draw-glow"></div>
          </div>
        </transition>

        <!-- 阶段 3: 大都会（电梯） -->
        <transition name="stage-transition">
          <div v-if="currentStage === 3" class="stage-wrapper stage-3">
            <div class="elevator-shaft">
              <!-- 电梯井 -->
              <div class="shaft-line"></div>
              <!-- 电梯 -->
              <div class="elevator-car elevator-1"></div>
              <div class="elevator-car elevator-2"></div>
              <div class="elevator-car elevator-3"></div>
            </div>
            <!-- 楼层标记 -->
            <div class="floor-markers">
              <span class="floor-dot"></span>
              <span class="floor-dot"></span>
              <span class="floor-dot"></span>
              <span class="floor-dot"></span>
              <span class="floor-dot"></span>
            </div>
          </div>
        </transition>

        <!-- 阶段 4: 餐厅（吊灯） -->
        <transition name="stage-transition">
          <div v-if="currentStage === 4" class="stage-wrapper stage-4">
            <div class="chandelier-container">
              <div class="chandelier-glow"></div>
              <!-- 光点 -->
              <div class="candle-light candle-1"></div>
              <div class="candle-light candle-2"></div>
              <div class="candle-light candle-3"></div>
              <div class="candle-light candle-4"></div>
              <div class="candle-light candle-5"></div>
              <div class="candle-light candle-6"></div>
              <div class="candle-light candle-7"></div>
              <div class="candle-light candle-8"></div>
            </div>
          </div>
        </transition>

        <!-- 阶段 5: 女儿（索菲亚） -->
        <transition name="stage-transition">
          <div v-if="currentStage === 5" class="stage-wrapper stage-5">
            <div class="orbit-system">
              <!-- 轨道 -->
              <div class="orbit-path"></div>
              <!-- 伯爵（大圆） -->
              <div class="planet planet-count">
                <span class="planet-label">伯爵</span>
              </div>
              <!-- 索菲亚（小圆） -->
              <div class="planet planet-sophia">
                <span class="planet-label">索菲亚</span>
              </div>
            </div>
          </div>
        </transition>

        <!-- 阶段 6: 自由（1954） -->
        <transition name="stage-transition">
          <div v-if="currentStage === 6" class="stage-wrapper stage-6">
            <div class="freedom-rays">
              <div class="ray ray-1"></div>
              <div class="ray ray-2"></div>
              <div class="ray ray-3"></div>
              <div class="ray ray-4"></div>
              <div class="ray ray-5"></div>
              <div class="ray ray-6"></div>
              <div class="ray ray-7"></div>
              <div class="ray ray-8"></div>
            </div>
            <!-- 温暖光晕 -->
            <div class="freedom-glow"></div>
          </div>
        </transition>
      </div>

      <!-- 金句层 -->
      <div class="quote-layer">
        <transition name="quote-transition" mode="out-in">
          <div :key="currentStage" class="quote-container">
            <!-- 金句单词逐个出现 -->
            <div class="quote-words">
              <span
                v-for="(word, index) in currentQuote.words"
                :key="index"
                class="quote-word"
                :style="{ animationDelay: index * 0.15 + 's' }"
              >
                {{ word }}
              </span>
            </div>

            <!-- 副标题 -->
            <p class="quote-subtitle">{{ currentQuote.subtitle }}</p>
          </div>
        </transition>
      </div>

      <!-- 进度指示 -->
      <div class="progress-container" v-if="currentStage < 6">
        <div class="progress-dots">
          <div
            v-for="i in 6"
            :key="i"
            class="dot"
            :class="{ active: currentStage >= i }"
          ></div>
        </div>
        <p class="click-hint">点击继续</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const showWarp = ref(true)
const currentStage = ref(1)

// 金句数据（拆分为单词）
const quotes = [
  {
    words: ['他不再是贵族', '他是一个', '被判终身监禁的人'],
    subtitle: '莫斯科 · 1922年'
  },
  {
    words: ['他的新家', '只有原来的十分之一', '但他的世界', '依然完整'],
    subtitle: '阁楼房间 · 三楼'
  },
  {
    words: ['在这个小小的世界里', '他找到了', '整个宇宙'],
    subtitle: '大都会酒店 · 熙熙攘攘'
  },
  {
    words: ['生活', '不是由我们遇到的事组成的', '而是由我们记住的事组成的'],
    subtitle: '波尔斯餐厅 · 岁月沉淀'
  },
  {
    words: ['一个人的价值', '不在于他拥有什么', '而在于他是什么'],
    subtitle: '索菲亚 · 父与女'
  },
  {
    words: ['如果我们没有选择', '我们可以选择', '我们面对的态度'],
    subtitle: '莫斯科 · 1954年'
  }
]

// 当前金句
const currentQuote = computed(() => {
  return quotes[currentStage.value - 1] || quotes[0]
})

// 下一阶段
const nextStage = () => {
  if (currentStage.value < 6) {
    currentStage.value++
  } else {
    exitWorld()
  }
}

// 退出
const exitWorld = () => {
  router.push('/universe')
}

onMounted(() => {
  setTimeout(() => {
    showWarp.value = false
  }, 1800)
})
</script>

<style scoped>
.moscow-gentleman-world {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #f7f5f2;
  overflow: hidden;
  font-family: 'Source Serif 4', Georgia, serif;
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
  border: 1px solid rgba(212, 175, 55, 0.3);
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
  border: 1px solid rgba(212, 175, 55, 0.4);
  border-radius: 50%;
}

.warp-text {
  position: absolute;
  font-family: 'Source Serif 4', serif;
  font-size: 0.9rem;
  letter-spacing: 0.5em;
  color: rgba(26, 26, 26, 0.8);
  animation: warp-fade 1.5s ease-out forwards;
}

@keyframes warp-expand {
  0% { transform: scale(0); opacity: 0; }
  50% { opacity: 1; }
  100% { transform: scale(3); opacity: 0; }
}

@keyframes warp-fade {
  0% { opacity: 0; transform: translateY(20px); }
  50% { opacity: 1; transform: translateY(0); }
  100% { opacity: 0; }
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
  background: rgba(212, 175, 55, 0.9);
  color: #f7f5f2;
  transform: translateX(-3px);
}

.exit-btn svg {
  width: 16px;
  height: 16px;
}

/* === 主容器 === */
.main-container {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

/* === 金色背景层 === */
.golden-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  pointer-events: none;
}

.stage-wrapper {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 阶段 1: 判诀（金色边框收缩） */
.sentence-frame {
  position: relative;
  width: 250px;
  height: 250px;
  animation: frame-shrink 4s ease-in-out infinite;
}

.frame-border {
  position: absolute;
  background: #d4af37;
}

.frame-top {
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  animation: border-contract-top 4s ease-in-out infinite;
}

.frame-right {
  top: 0;
  right: 0;
  bottom: 0;
  width: 2px;
  animation: border-contract-right 4s ease-in-out infinite;
}

.frame-bottom {
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  animation: border-contract-bottom 4s ease-in-out infinite;
}

.frame-left {
  top: 0;
  left: 0;
  bottom: 0;
  width: 2px;
  animation: border-contract-left 4s ease-in-out infinite;
}

@keyframes border-contract-top {
  0%, 100% { width: 100%; left: 0; }
  50% { width: 60%; left: 20%; }
}

@keyframes border-contract-right {
  0%, 100% { height: 100%; top: 0; }
  50% { height: 60%; top: 20%; }
}

@keyframes border-contract-bottom {
  0%, 100% { width: 100%; left: 0; }
  50% { width: 60%; left: 20%; }
}

@keyframes border-contract-left {
  0%, 100% { height: 100%; top: 0; }
  50% { height: 60%; top: 20%; }
}

@keyframes frame-shrink {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(0.85); }
}

.shrink-wave {
  position: absolute;
  width: 300px;
  height: 300px;
  border: 1px solid rgba(212, 175, 55, 0.2);
  animation: wave-pulse 3s ease-out infinite;
}

@keyframes wave-pulse {
  0% { transform: scale(1); opacity: 0.5; }
  100% { transform: scale(1.3); opacity: 0; }
}

/* 阶段 2: 阁楼（平面图） */
.attic-room {
  position: relative;
  width: 300px;
  height: 200px;
}

.room-plan {
  width: 100%;
  height: 100%;
}

.room-outline {
  stroke: #d4af37;
  stroke-width: 2;
  fill: none;
  stroke-dasharray: 600;
  stroke-dashoffset: 600;
  animation: room-draw 3s ease-out forwards;
}

.furniture {
  stroke: #d4af37;
  stroke-width: 1.5;
  fill: rgba(212, 175, 55, 0.05);
  opacity: 0;
  animation: furniture-appear 0.8s ease-out forwards;
}

.bed { animation-delay: 2.5s; }
.chair { animation-delay: 2.7s; }
.table { animation-delay: 2.9s; }
.window { animation-delay: 3.1s; }

@keyframes room-draw {
  to { stroke-dashoffset: 0; }
}

@keyframes furniture-appear {
  from { opacity: 0; transform: scale(0.8); }
  to { opacity: 1; transform: scale(1); }
}

.draw-glow {
  position: absolute;
  width: 320px;
  height: 220px;
  background: radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, transparent 70%);
  animation: draw-pulse 4s ease-in-out infinite;
}

@keyframes draw-pulse {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}

/* 阶段 3: 大都会（电梯） */
.elevator-shaft {
  position: relative;
  width: 60px;
  height: 300px;
}

.shaft-line {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 2px;
  height: 100%;
  background: linear-gradient(to bottom, transparent, #d4af37, transparent);
}

.elevator-car {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 30px;
  height: 40px;
  background: #d4af37;
  opacity: 0.8;
  box-shadow: 0 0 15px rgba(212, 175, 55, 0.4);
}

.elevator-1 {
  animation: elevator-move-1 5s ease-in-out infinite;
}

.elevator-2 {
  animation: elevator-move-2 5s ease-in-out infinite;
  animation-delay: 1.5s;
}

.elevator-3 {
  animation: elevator-move-3 5s ease-in-out infinite;
  animation-delay: 3s;
}

@keyframes elevator-move-1 {
  0%, 100% { top: 10%; }
  50% { top: 70%; }
}

@keyframes elevator-move-2 {
  0%, 100% { top: 70%; }
  50% { top: 10%; }
}

@keyframes elevator-move-3 {
  0%, 100% { top: 40%; }
  50% { top: 20%; }
}

.floor-markers {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  gap: 60px;
  margin-left: 60px;
}

.floor-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgba(212, 175, 55, 0.4);
}

/* 阶段 4: 餐厅（吊灯） */
.chandelier-container {
  position: relative;
  width: 200px;
  height: 200px;
}

.chandelier-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 180px;
  height: 180px;
  background: radial-gradient(circle, rgba(212, 175, 55, 0.2) 0%, transparent 70%);
  animation: glow-breathe 4s ease-in-out infinite;
}

.candle-light {
  position: absolute;
  width: 12px;
  height: 12px;
  background: #d4af37;
  border-radius: 50%;
  box-shadow: 0 0 20px rgba(212, 175, 55, 0.6);
}

.candle-1 {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: candle-flicker-1 2s ease-in-out infinite;
}

.candle-2 {
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: candle-flicker-2 2.2s ease-in-out infinite;
}

.candle-3 {
  top: 70%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: candle-flicker-3 1.8s ease-in-out infinite;
}

.candle-4 {
  top: 50%;
  left: 30%;
  transform: translate(-50%, -50%);
  animation: candle-flicker-1 2.1s ease-in-out infinite;
}

.candle-5 {
  top: 50%;
  left: 70%;
  transform: translate(-50%, -50%);
  animation: candle-flicker-2 1.9s ease-in-out infinite;
}

.candle-6 {
  top: 35%;
  left: 35%;
  transform: translate(-50%, -50%);
  animation: candle-flicker-3 2.3s ease-in-out infinite;
}

.candle-7 {
  top: 35%;
  left: 65%;
  transform: translate(-50%, -50%);
  animation: candle-flicker-1 2s ease-in-out infinite;
}

.candle-8 {
  top: 65%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: candle-flicker-2 2.2s ease-in-out infinite;
}

@keyframes candle-flicker-1 {
  0%, 100% { opacity: 0.6; transform: translate(-50%, -50%) scale(1); }
  50% { opacity: 1; transform: translate(-50%, -50%) scale(1.2); }
}

@keyframes candle-flicker-2 {
  0%, 100% { opacity: 0.7; transform: translate(-50%, -50%) scale(1); }
  50% { opacity: 0.9; transform: translate(-50%, -50%) scale(1.15); }
}

@keyframes candle-flicker-3 {
  0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
  50% { opacity: 1; transform: translate(-50%, -50%) scale(1.25); }
}

@keyframes glow-breathe {
  0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
  50% { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
}

/* 阶段 5: 女儿（轨道系统） */
.orbit-system {
  position: relative;
  width: 250px;
  height: 250px;
}

.orbit-path {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 200px;
  border: 1px solid rgba(212, 175, 55, 0.3);
  border-radius: 50%;
}

.planet {
  position: absolute;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Inter', sans-serif;
  font-size: 0.6rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  color: #f7f5f2;
}

.planet-count {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 60px;
  background: #d4af37;
  box-shadow: 0 0 30px rgba(212, 175, 55, 0.4);
  z-index: 2;
}

.planet-sophia {
  width: 30px;
  height: 30px;
  background: #c0c0c0;
  box-shadow: 0 0 20px rgba(192, 192, 192, 0.4);
  animation: orbit-rotate 6s linear infinite;
}

@keyframes orbit-rotate {
  from {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(0deg) translateX(100px) rotate(0deg);
  }
  to {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(360deg) translateX(100px) rotate(-360deg);
  }
}

.planet-label {
  position: absolute;
  white-space: nowrap;
}

/* 阶段 6: 自由（光芒） */
.freedom-rays {
  position: relative;
  width: 200px;
  height: 200px;
}

.ray {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 3px;
  height: 100px;
  background: linear-gradient(to top, #d4af37, transparent);
  transform-origin: bottom center;
  opacity: 0.6;
}

.ray-1 {
  transform: translate(-50%, -50%) rotate(0deg);
  animation: ray-expand-1 4s ease-in-out infinite;
}

.ray-2 {
  transform: translate(-50%, -50%) rotate(45deg);
  animation: ray-expand-2 4s ease-in-out infinite;
  animation-delay: 0.5s;
}

.ray-3 {
  transform: translate(-50%, -50%) rotate(90deg);
  animation: ray-expand-1 4s ease-in-out infinite;
  animation-delay: 1s;
}

.ray-4 {
  transform: translate(-50%, -50%) rotate(135deg);
  animation: ray-expand-2 4s ease-in-out infinite;
  animation-delay: 1.5s;
}

.ray-5 {
  transform: translate(-50%, -50%) rotate(180deg);
  animation: ray-expand-1 4s ease-in-out infinite;
  animation-delay: 2s;
}

.ray-6 {
  transform: translate(-50%, -50%) rotate(225deg);
  animation: ray-expand-2 4s ease-in-out infinite;
  animation-delay: 2.5s;
}

.ray-7 {
  transform: translate(-50%, -50%) rotate(270deg);
  animation: ray-expand-1 4s ease-in-out infinite;
  animation-delay: 3s;
}

.ray-8 {
  transform: translate(-50%, -50%) rotate(315deg);
  animation: ray-expand-2 4s ease-in-out infinite;
  animation-delay: 3.5s;
}

@keyframes ray-expand-1 {
  0%, 100% { height: 80px; opacity: 0.4; }
  50% { height: 120px; opacity: 0.8; }
}

@keyframes ray-expand-2 {
  0%, 100% { height: 70px; opacity: 0.3; }
  50% { height: 110px; opacity: 0.7; }
}

.freedom-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 150px;
  height: 150px;
  background: radial-gradient(circle, rgba(212, 175, 55, 0.3) 0%, transparent 70%);
  animation: freedom-breathe 5s ease-in-out infinite;
}

@keyframes freedom-breathe {
  0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
  50% { transform: translate(-50%, -50%) scale(1.2); opacity: 1; }
}

/* === 金句层 === */
.quote-layer {
  position: absolute;
  bottom: 25%;
  left: 0;
  right: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 2rem;
}

.quote-container {
  text-align: center;
  max-width: 900px;
}

.quote-words {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5em;
  margin-bottom: 2rem;
}

.quote-word {
  font-family: 'Source Serif 4', serif;
  font-size: clamp(1.8rem, 4vw, 3rem);
  font-weight: 300;
  line-height: 1.6;
  letter-spacing: 0.1em;
  color: #1a1a1a;
  opacity: 0;
  animation: word-fade-in 0.8s ease-out forwards;
}

@keyframes word-fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.quote-subtitle {
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  letter-spacing: 0.3em;
  color: rgba(212, 175, 55, 0.8);
  text-transform: uppercase;
  margin: 0;
  opacity: 0;
  animation: subtitle-fade-in 1s ease-out 0.5s forwards;
}

@keyframes subtitle-fade-in {
  to { opacity: 1; }
}

/* === 进度指示 === */
.progress-container {
  position: absolute;
  bottom: 8%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  z-index: 100;
}

.progress-dots {
  display: flex;
  gap: 8px;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(212, 175, 55, 0.3);
  transition: all 0.3s ease;
}

.dot.active {
  background: #d4af37;
  transform: scale(1.3);
  box-shadow: 0 0 10px rgba(212, 175, 55, 0.5);
}

.click-hint {
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  color: rgba(26, 26, 26, 0.4);
  text-transform: uppercase;
  margin: 0;
}

/* === 过渡动画 === */
.stage-transition-enter-active,
.stage-transition-leave-active {
  transition: all 0.8s ease;
}

.stage-transition-enter-from {
  opacity: 0;
  transform: scale(0.8);
}

.stage-transition-leave-to {
  opacity: 0;
  transform: scale(1.2);
}

.quote-transition-enter-active,
.quote-transition-leave-active {
  transition: all 0.6s ease;
}

.quote-transition-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.quote-transition-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.warp-enter-active,
.warp-leave-active {
  transition: opacity 0.5s ease;
}

.warp-enter-from,
.warp-leave-to {
  opacity: 0;
}

/* === 响应式 === */
@media (max-width: 1024px) {
  .quote-word {
    font-size: clamp(1.5rem, 3.5vw, 2.5rem);
  }

  .quote-layer {
    bottom: 30%;
  }

  .sentence-frame {
    width: 200px;
    height: 200px;
  }
}

@media (max-width: 768px) {
  .exit-btn {
    top: 1rem;
    left: 1rem;
    padding: 0.625rem 1rem;
    font-size: 0.6rem;
  }

  .quote-word {
    font-size: clamp(1.2rem, 4vw, 2rem);
    letter-spacing: 0.05em;
  }

  .quote-subtitle {
    font-size: 0.65rem;
    margin-top: 1.5rem;
  }

  .quote-layer {
    bottom: 35%;
  }

  .sentence-frame {
    width: 160px;
    height: 160px;
  }

  .attic-room {
    transform: scale(0.8);
  }

  .elevator-shaft {
    transform: scale(0.8);
  }

  .chandelier-container {
    transform: scale(0.8);
  }

  .orbit-system {
    transform: scale(0.7);
  }

  .freedom-rays {
    transform: scale(0.8);
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
}

@media (max-height: 600px) {
  .quote-layer {
    bottom: 40%;
  }

  .golden-background {
    top: 20%;
  }

  .quote-word {
    font-size: clamp(1rem, 2.5vw, 1.8rem);
  }
}
</style>

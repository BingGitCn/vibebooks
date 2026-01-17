<template>
  <div class="island-bookstore-world">
    <!-- 跃迁动画遮罩 -->
    <transition name="warp">
      <div v-if="showWarp" class="warp-overlay">
        <div class="warp-circle">
          <div class="warp-circle-inner"></div>
        </div>
        <div class="warp-text">岛上书店</div>
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
      <!-- 阶段 1: 孤独 -->
      <transition name="stage-fade">
        <div v-if="currentStage === 1" key="stage1" class="stage-container">
          <div class="lonely-dot"></div>
          <p class="stage-title">A.J. 费克里</p>
          <p class="stage-subtitle">爱丽丝岛上的书店老板</p>
          <p class="stage-quote">我不喜欢人，我喜欢书</p>
        </div>
      </transition>

      <!-- 阶段 2: 书 -->
      <transition name="stage-fade">
        <div v-if="currentStage === 2" key="stage2" class="stage-container">
          <div class="book-symbol">
            <div class="book-cover"></div>
            <div class="book-pages"></div>
          </div>
          <p class="stage-title">《帖木儿》</p>
          <p class="stage-subtitle">价值四十万美元的珍本</p>
          <p class="stage-quote">那是妻子留给我的最后记忆</p>
        </div>
      </transition>

      <!-- 阶段 3: 玛雅 -->
      <transition name="stage-fade">
        <div v-if="currentStage === 3" key="stage3" class="stage-container">
          <div class="connection-stage">
            <div class="dot-aj"></div>
            <div class="connection-line"></div>
            <div class="dot-maya"></div>
          </div>
          <p class="stage-title">玛雅出现</p>
          <p class="stage-subtitle">被遗弃在警察局门口的两岁女孩</p>
          <p class="stage-quote">我无法把她交给别人</p>
        </div>
      </transition>

      <!-- 阶段 4: 书店苏醒 -->
      <transition name="stage-fade">
        <div v-if="currentStage === 4" key="stage4" class="stage-container">
          <div class="awakening-stage">
            <div class="center-book"></div>
            <div class="orbiting-dots">
              <div class="orbit-dot dot-1"></div>
              <div class="orbit-dot dot-2"></div>
              <div class="orbit-dot dot-3"></div>
            </div>
          </div>
          <p class="stage-title">书店开始呼吸</p>
          <p class="stage-subtitle">岛上的人们因为书而聚集</p>
          <p class="stage-quote">书店不再是孤独的堡垒</p>
        </div>
      </transition>

      <!-- 阶段 5: 阿米莉娅 -->
      <transition name="stage-fade">
        <div v-if="currentStage === 5" key="stage5" class="stage-container">
          <div class="love-stage">
            <div class="dot-aj-large"></div>
            <div class="dot-amelia"></div>
            <div class="floating-books">
              <div class="mini-book book-1"></div>
              <div class="mini-book book-2"></div>
              <div class="mini-book book-3"></div>
            </div>
          </div>
          <p class="stage-title">阿米莉娅</p>
          <p class="stage-subtitle">出版社销售代表</p>
          <p class="stage-quote">我们不只是在讨论书，我们是在通过书认识彼此</p>
        </div>
      </transition>

      <!-- 阶段 6: 最终 -->
      <transition name="stage-fade">
        <div v-if="currentStage === 6" key="stage6" class="stage-container">
          <div class="final-stage">
            <div class="bookshelf-minimal">
              <div class="shelf-row row-1">
                <div class="mini-spine s-1"></div>
                <div class="mini-spine s-2"></div>
                <div class="mini-spine s-3"></div>
              </div>
              <div class="shelf-row row-2">
                <div class="mini-spine s-4"></div>
                <div class="mini-spine s-5"></div>
                <div class="mini-spine s-6"></div>
              </div>
            </div>
          </div>
          <p class="stage-title">我们读书</p>
          <p class="stage-subtitle">因为我们孤单，因为我们不孤单</p>
          <p class="stage-quote">We read to know we're not alone</p>
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
.island-bookstore-world {
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

/* ========== 阶段 1: 孤独 ========== */
.lonely-dot {
  width: 12px;
  height: 12px;
  background: #1a1a1a;
  border-radius: 50%;
  animation: float-breathe 8s ease-in-out infinite;
}

@keyframes float-breathe {
  0%, 100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-8px) scale(1.05);
  }
}

/* ========== 阶段 2: 书 ========== */
.book-symbol {
  position: relative;
  width: 80px;
  height: 100px;
  animation: book-sway 12s ease-in-out infinite;
}

.book-cover {
  position: absolute;
  left: 0;
  top: 0;
  width: 50px;
  height: 100px;
  background: #1a1a1a;
  border-radius: 2px 6px 6px 2px;
}

.book-pages {
  position: absolute;
  right: 0;
  top: 5px;
  width: 28px;
  height: 90px;
  background: #f7f5f2;
  border: 1px solid #1a1a1a;
  border-radius: 0 4px 4px 0;
}

@keyframes book-sway {
  0%, 100% {
    transform: rotate(-2deg);
  }
  50% {
    transform: rotate(2deg);
  }
}

/* ========== 阶段 3: 玛雅 ========== */
.connection-stage {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.dot-aj {
  width: 12px;
  height: 12px;
  background: #1a1a1a;
  border-radius: 50%;
}

.connection-line {
  width: 60px;
  height: 2px;
  background: linear-gradient(90deg, #1a1a1a 0%, #f4d03f 100%);
  position: relative;
}

.connection-line::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 4px;
  height: 4px;
  background: #f4d03f;
  border-radius: 50%;
  animation: pulse-glow 2s ease-in-out infinite;
}

@keyframes pulse-glow {
  0%, 100% {
    opacity: 0.5;
    transform: translate(-50%, -50%) scale(1);
  }
  50% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1.5);
  }
}

.dot-maya {
  width: 12px;
  height: 12px;
  background: #f4d03f;
  border-radius: 50%;
}

/* ========== 阶段 4: 书店苏醒 ========== */
.awakening-stage {
  position: relative;
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.center-book {
  width: 40px;
  height: 50px;
  background: #1a1a1a;
  border-radius: 2px 6px 6px 2px;
  position: relative;
  z-index: 2;
}

.orbiting-dots {
  position: absolute;
  width: 100%;
  height: 100%;
  animation: orbit-rotate 20s linear infinite;
}

.orbit-dot {
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  position: absolute;
}

.dot-1 {
  background: #f4d03f;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
}

.dot-2 {
  background: #4a7c9f;
  bottom: 40px;
  left: 20px;
}

.dot-3 {
  background: #2d3748;
  bottom: 40px;
  right: 20px;
}

@keyframes orbit-rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* ========== 阶段 5: 阿米莉娅 ========== */
.love-stage {
  position: relative;
  width: 200px;
  height: 150px;
}

.dot-aj-large {
  position: absolute;
  left: 40px;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  background: #1a1a1a;
  border-radius: 50%;
}

.dot-amelia {
  position: absolute;
  right: 40px;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  background: #4a7c9f;
  border-radius: 50%;
  animation: pulse-love 3s ease-in-out infinite;
}

@keyframes pulse-love {
  0%, 100% {
    transform: translateY(-50%) scale(1);
  }
  50% {
    transform: translateY(-50%) scale(1.15);
  }
}

.floating-books {
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
}

.mini-book {
  width: 20px;
  height: 28px;
  border-radius: 2px;
  position: relative;
}

.book-1 {
  background: #1a1a1a;
  animation: float-1 4s ease-in-out infinite;
}

.book-2 {
  background: #f4d03f;
  animation: float-2 4s ease-in-out infinite 0.5s;
}

.book-3 {
  background: #4a7c9f;
  animation: float-3 4s ease-in-out infinite 1s;
}

@keyframes float-1 {
  0%, 100% { transform: translateY(0) rotate(-5deg); }
  50% { transform: translateY(-10px) rotate(5deg); }
}

@keyframes float-2 {
  0%, 100% { transform: translateY(0) rotate(3deg); }
  50% { transform: translateY(-15px) rotate(-3deg); }
}

@keyframes float-3 {
  0%, 100% { transform: translateY(0) rotate(-2deg); }
  50% { transform: translateY(-12px) rotate(2deg); }
}

/* ========== 阶段 6: 最终 ========== */
.final-stage {
  display: flex;
  align-items: center;
  justify-content: center;
}

.bookshelf-minimal {
  width: 180px;
  border: 1px solid #1a1a1a;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  opacity: 0.9;
}

.shelf-row {
  display: flex;
  gap: 6px;
  justify-content: center;
}

.mini-spine {
  width: 10px;
  border-radius: 1px;
}

.s-1, s-4 { height: 35px; background: #1a1a1a; }
.s-2 { height: 40px; background: #f4d03f; }
.s-3 { height: 38px; background: #4a7c9f; }
.s-5 { height: 36px; background: #2d3748; }
.s-6 { height: 42px; background: #8b7355; }

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
  background: #1a1a1a;
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

  .bookshelf-minimal {
    width: 150px;
  }

  .progress-indicator {
    bottom: 2rem;
  }
}
</style>

<template>
  <div class="crime-and-punishment-world">
    <!-- 跃迁动画 -->
    <transition name="warp">
      <div v-if="showWarp" class="warp-overlay">
        <div class="warp-circle">
          <div class="warp-circle-inner"></div>
        </div>
        <div class="warp-text">罪与罚</div>
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
      <!-- 几何符号背景层 -->
      <div class="geometry-background">
        <!-- 阶段 1: 孤立的黑圆 -->
        <transition name="geometry-fade">
          <div v-if="currentStage === 1" class="geometry-stage stage-1">
            <div class="black-circle"></div>
          </div>
        </transition>

        <!-- 阶段 2: 黑圆 + 白点 -->
        <transition name="geometry-fade">
          <div v-if="currentStage === 2" class="geometry-stage stage-2">
            <div class="black-circle">
              <div class="white-dot"></div>
            </div>
          </div>
        </transition>

        <!-- 阶段 3: 黑圆 + 三角形（斧头） -->
        <transition name="geometry-fade">
          <div v-if="currentStage === 3" class="geometry-stage stage-3">
            <div class="black-circle"></div>
            <div class="axe-triangle"></div>
          </div>
        </transition>

        <!-- 阶段 4: 三角形刺入圆，红色裂痕 -->
        <transition name="geometry-fade">
          <div v-if="currentStage === 4" class="geometry-stage stage-4">
            <div class="cracked-circle">
              <svg class="crack-svg" viewBox="0 0 200 200">
                <path
                  d="M100,100 L100,20"
                  stroke="#8B0000"
                  stroke-width="0.5"
                  fill="none"
                  class="crack-line"
                />
                <path
                  d="M100,100 L60,40"
                  stroke="#8B0000"
                  stroke-width="0.5"
                  fill="none"
                  class="crack-line crack-delay-1"
                />
                <path
                  d="M100,100 L140,40"
                  stroke="#8B0000"
                  stroke-width="0.5"
                  fill="none"
                  class="crack-line crack-delay-2"
                />
              </svg>
            </div>
            <div class="axe-triangle axe-embedded"></div>
          </div>
        </transition>

        <!-- 阶段 5: 双圆对立 -->
        <transition name="geometry-fade">
          <div v-if="currentStage === 5" class="geometry-stage stage-5">
            <div class="dual-circle-container">
              <div class="circle-black"></div>
              <div class="circle-white"></div>
            </div>
          </div>
        </transition>

        <!-- 阶段 6: 双圆融合，灰蓝色 -->
        <transition name="geometry-fade">
          <div v-if="currentStage === 6" class="geometry-stage stage-6">
            <div class="merged-circle"></div>
          </div>
        </transition>
      </div>

      <!-- 金句层 -->
      <div class="quote-container">
        <transition name="quote-fade" mode="out-in">
          <div :key="currentStage" class="quote-content">
            <!-- 金句逐行显示 -->
            <p
              v-for="(line, index) in currentQuote.lines"
              :key="index"
              class="quote-line"
              :style="{ animationDelay: index * 0.3 + 's' }"
            >
              {{ line }}
            </p>

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
const currentStage = ref(0)

// 金句数据
const quotes = [
  {
    lines: [
      '你知道吗，杜尼娅，',
      '我是一个可怕的人。'
    ],
    subtitle: '圣彼得堡 · 闷热的夏天'
  },
  {
    lines: [
      '人分两类：',
      '平凡人只能繁衍同类，',
      '不平凡的人则有权力犯罪。'
    ],
    subtitle: '超人理论 · 理性的陷阱'
  },
  {
    lines: [
      '我在问自己：',
      '我是一只颤抖的生物，',
      '还是我有权？'
    ],
    subtitle: '老太婆 · 一个虱子'
  },
  {
    lines: [
      '那不是我杀了她，',
      '是我的理论杀了她。'
    ],
    subtitle: '心跳声 · 震耳欲聋'
  },
  {
    lines: [
      '最可怕的惩罚，',
      '不是流放西伯利亚，',
      '而是良心的谴责。'
    ],
    subtitle: '波尔菲里 · 心理博弈'
  },
  {
    lines: [
      '生命是上帝赐予的礼物，',
      '我们没有权利剥夺它，',
      '包括我们自己的。'
    ],
    subtitle: '西伯利亚 · 新生'
  }
]

// 当前金句
const currentQuote = computed(() => {
  if (currentStage.value === 0) return quotes[0]
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
    currentStage.value = 1
  }, 1800)
})
</script>

<style scoped>
.crime-and-punishment-world {
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
  border: 1px solid rgba(26, 26, 26, 0.2);
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
  border: 1px solid rgba(26, 26, 26, 0.3);
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
  background: rgba(26, 26, 26, 0.9);
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

/* === 几何背景层 === */
.geometry-background {
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

.geometry-stage {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 阶段 1: 孤立的黑圆 */
.black-circle {
  width: 100px;
  height: 100px;
  background: #1a1a1a;
  border-radius: 50%;
  animation: pulse-slow 4s ease-in-out infinite;
}

/* 阶段 2: 黑圆 + 白点 */
.white-dot {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20px;
  height: 20px;
  background: #f7f5f2;
  border-radius: 50%;
  animation: pulse-inner 2s ease-in-out infinite;
}

/* 阶段 3: 斧头（三角形） */
.axe-triangle {
  position: absolute;
  right: -40px;
  width: 0;
  height: 0;
  border-left: 30px solid transparent;
  border-right: 30px solid transparent;
  border-bottom: 50px solid #1a1a1a;
  transform: rotate(45deg);
  animation: float-slow 6s ease-in-out infinite;
}

/* 阶段 4: 裂痕圆 */
.cracked-circle {
  width: 100px;
  height: 100px;
  background: #1a1a1a;
  border-radius: 50%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.crack-svg {
  position: absolute;
  width: 200px;
  height: 200px;
  animation: crack-draw 1s ease-out forwards;
}

.crack-line {
  stroke-dasharray: 100;
  stroke-dashoffset: 100;
  animation: crack-appear 0.8s ease-out forwards;
}

.crack-delay-1 {
  animation-delay: 0.2s;
}

.crack-delay-2 {
  animation-delay: 0.4s;
}

@keyframes crack-appear {
  to {
    stroke-dashoffset: 0;
  }
}

.axe-embedded {
  position: absolute;
  border-bottom-color: #8B0000;
  right: -30px;
  transform: rotate(45deg) scale(0.8);
}

/* 阶段 5: 双圆对立 */
.dual-circle-container {
  position: relative;
  width: 200px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.circle-black {
  width: 80px;
  height: 80px;
  background: #1a1a1a;
  border-radius: 50%;
  animation: pulse-opposite 4s ease-in-out infinite;
}

.circle-white {
  width: 80px;
  height: 80px;
  background: #f7f5f2;
  border: 2px solid #1a1a1a;
  border-radius: 50%;
  animation: pulse-opposite 4s ease-in-out infinite reverse;
}

/* 阶段 6: 融合圆 */
.merged-circle {
  width: 120px;
  height: 120px;
  background: radial-gradient(circle, #4a7c9f 0%, #1a1a1a 100%);
  border-radius: 50%;
  animation: merge-pulse 6s ease-in-out infinite;
}

/* === 金句层 === */
.quote-container {
  position: relative;
  z-index: 10;
  max-width: 900px;
  padding: 2rem;
  text-align: center;
}

.quote-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.quote-line {
  font-family: 'Source Serif 4', serif;
  font-size: clamp(1.8rem, 4vw, 3rem);
  font-weight: 300;
  line-height: 1.6;
  letter-spacing: 0.1em;
  color: #1a1a1a;
  margin: 0;
  opacity: 0;
  animation: line-fade-in 1s ease-out forwards;
}

@keyframes line-fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
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
  color: rgba(26, 26, 26, 0.5);
  text-transform: uppercase;
  margin-top: 2rem;
  margin-bottom: 0;
  opacity: 0;
  animation: subtitle-fade-in 1s ease-out 0.5s forwards;
}

@keyframes subtitle-fade-in {
  to {
    opacity: 1;
  }
}

/* === 进度指示 === */
.progress-container {
  position: absolute;
  bottom: 10%;
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
  background: rgba(26, 26, 26, 0.2);
  transition: all 0.3s ease;
}

.dot.active {
  background: #1a1a1a;
  transform: scale(1.3);
}

.click-hint {
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  color: rgba(26, 26, 26, 0.4);
  text-transform: uppercase;
  margin: 0;
}

/* === 动画关键帧 === */
@keyframes pulse-slow {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

@keyframes pulse-inner {
  0%, 100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.8;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.2);
    opacity: 1;
  }
}

@keyframes float-slow {
  0%, 100% {
    transform: rotate(45deg) translateY(0);
  }
  50% {
    transform: rotate(45deg) translateY(-10px);
  }
}

@keyframes pulse-opposite {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

@keyframes merge-pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.9;
  }
  50% {
    transform: scale(1.1);
    opacity: 1;
  }
}

/* === 过渡动画 === */
.geometry-fade-enter-active,
.geometry-fade-leave-active {
  transition: all 0.8s ease;
}

.geometry-fade-enter-from {
  opacity: 0;
  transform: scale(0.8);
}

.geometry-fade-leave-to {
  opacity: 0;
  transform: scale(1.2);
}

.quote-fade-enter-active,
.quote-fade-leave-active {
  transition: all 0.6s ease;
}

.quote-fade-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.quote-fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* === 响应式 === */
@media (max-width: 1024px) {
  .quote-line {
    font-size: clamp(1.5rem, 3.5vw, 2.5rem);
  }

  .black-circle,
  .cracked-circle {
    width: 80px;
    height: 80px;
  }

  .circle-black,
  .circle-white {
    width: 60px;
    height: 60px;
  }

  .merged-circle {
    width: 100px;
    height: 100px;
  }
}

@media (max-width: 768px) {
  .exit-btn {
    top: 1rem;
    left: 1rem;
    padding: 0.625rem 1rem;
    font-size: 0.6rem;
  }

  .quote-line {
    font-size: clamp(1.2rem, 4vw, 2rem);
    letter-spacing: 0.05em;
  }

  .quote-subtitle {
    font-size: 0.65rem;
    margin-top: 1.5rem;
  }

  .black-circle,
  .cracked-circle {
    width: 60px;
    height: 60px;
  }

  .circle-black,
  .circle-white {
    width: 50px;
    height: 50px;
  }

  .merged-circle {
    width: 80px;
    height: 80px;
  }

  .axe-triangle {
    border-left-width: 20px;
    border-right-width: 20px;
    border-bottom-width: 35px;
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
</style>

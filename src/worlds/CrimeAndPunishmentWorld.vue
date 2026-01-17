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
      <!-- 创意几何背景 -->
      <div class="creative-background">
        <!-- 阶段 1: 深渊 -->
        <transition name="stage-transition">
          <div v-if="currentStage === 1" class="stage-wrapper stage-1">
            <div class="abyss-circle">
              <div class="abyss-inner"></div>
            </div>
            <!-- 呼吸光环 -->
            <div class="breath-ring"></div>
            <div class="breath-ring ring-delay-1"></div>
            <div class="breath-ring ring-delay-2"></div>
          </div>
        </transition>

        <!-- 阶段 2: 裂缝 -->
        <transition name="stage-transition">
          <div v-if="currentStage === 2" class="stage-wrapper stage-2">
            <div class="mirror-circle">
              <svg class="cracks-svg" viewBox="0 0 400 400">
                <path class="crack crack-1" d="M200,200 L200,50" />
                <path class="crack crack-2" d="M200,200 L80,80" />
                <path class="crack crack-3" d="M200,200 L320,80" />
                <path class="crack crack-4" d="M200,200 L50,200" />
                <path class="crack crack-5" d="M200,200 L350,200" />
                <path class="crack crack-6" d="M200,200 L100,320" />
                <path class="crack crack-7" d="M200,200 L300,320" />
              </svg>
            </div>
            <!-- 金色闪光 -->
            <div class="golden-flash"></div>
          </div>
        </transition>

        <!-- 阶段 3: 斧影 -->
        <transition name="stage-transition">
          <div v-if="currentStage === 3" class="stage-wrapper stage-3">
            <div class="falling-axe">
              <div class="axe-shadow"></div>
              <div class="axe-triangle"></div>
            </div>
            <!-- 红色残影轨迹 -->
            <div class="blood-trail"></div>
          </div>
        </transition>

        <!-- 阶段 4: 破碎 -->
        <transition name="stage-transition">
          <div v-if="currentStage === 4" class="stage-wrapper stage-4">
            <div class="shattered-container">
              <div class="shard shard-1"></div>
              <div class="shard shard-2"></div>
              <div class="shard shard-3"></div>
              <div class="shard shard-4"></div>
              <div class="shard shard-5"></div>
              <div class="shard shard-6"></div>
              <div class="shard shard-7"></div>
              <div class="shard shard-8"></div>
            </div>
            <!-- 红色雾气 -->
            <div class="blood-mist"></div>
          </div>
        </transition>

        <!-- 阶段 5: 对峙 -->
        <transition name="stage-transition">
          <div v-if="currentStage === 5" class="stage-wrapper stage-5">
            <div class="confrontation-container">
              <div class="confront-circle circle-theory">
                <span class="circle-label">理论</span>
              </div>
              <div class="confront-circle circle-conscience">
                <span class="circle-label">良知</span>
              </div>
            </div>
            <!-- 碰撞波纹 -->
            <div class="collision-wave"></div>
          </div>
        </transition>

        <!-- 阶段 6: 光芒 -->
        <transition name="stage-transition">
          <div v-if="currentStage === 6" class="stage-wrapper stage-6">
            <div class="redemption-container">
              <div class="light-ray ray-1"></div>
              <div class="light-ray ray-2"></div>
              <div class="light-ray ray-3"></div>
              <div class="light-ray ray-4"></div>
              <div class="light-ray ray-5"></div>
            </div>
            <!-- 温暖光晕 -->
            <div class="warm-glow"></div>
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
    words: ['我', '是一个', '可怕的人'],
    subtitle: '圣彼得堡 · 闷热的夏天'
  },
  {
    words: ['人分两类：', '平凡人', '只能', '繁衍同类'],
    subtitle: '超人理论 · 理性的陷阱'
  },
  {
    words: ['我', '是一只', '颤抖的生物', '还是', '我有权？'],
    subtitle: '老太婆 · 一个虱子'
  },
  {
    words: ['那不是我', '杀了她', '是我的', '理论', '杀了她'],
    subtitle: '心跳声 · 震耳欲聋'
  },
  {
    words: ['最可怕的惩罚', '是', '良心的谴责'],
    subtitle: '波尔菲里 · 心理博弈'
  },
  {
    words: ['生命', '是上帝', '赐予的礼物'],
    subtitle: '西伯利亚 · 新生'
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

/* === 创意背景层 === */
.creative-background {
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

/* 阶段 1: 深渊 */
.abyss-circle {
  width: 150px;
  height: 150px;
  background: #1a1a1a;
  border-radius: 50%;
  animation: abyss-pulse 3s ease-in-out infinite;
  box-shadow: 0 0 60px rgba(26, 26, 26, 0.3);
}

.abyss-inner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
  background: #0a0a0a;
  border-radius: 50%;
  animation: abyss-inner-pulse 3s ease-in-out infinite reverse;
}

.breath-ring {
  position: absolute;
  width: 200px;
  height: 200px;
  border: 1px solid rgba(26, 26, 26, 0.1);
  border-radius: 50%;
  animation: breath-expand 4s ease-out infinite;
}

.ring-delay-1 { animation-delay: 1s; }
.ring-delay-2 { animation-delay: 2s; }

@keyframes abyss-pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(0.85); }
}

@keyframes abyss-inner-pulse {
  0%, 100% { transform: translate(-50%, -50%) scale(1); }
  50% { transform: translate(-50%, -50%) scale(1.15); }
}

@keyframes breath-expand {
  0% { transform: scale(1); opacity: 0; }
  50% { opacity: 0.3; }
  100% { transform: scale(2); opacity: 0; }
}

/* 阶段 2: 裂缝 */
.mirror-circle {
  width: 150px;
  height: 150px;
  background: #1a1a1a;
  border-radius: 50%;
  position: relative;
  box-shadow: 0 0 40px rgba(212, 175, 55, 0.2);
}

.cracks-svg {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.crack {
  stroke: #d4af37;
  stroke-width: 1;
  fill: none;
  stroke-dasharray: 200;
  stroke-dashoffset: 200;
  animation: crack-draw 1.5s ease-out forwards;
}

.crack-1 { animation-delay: 0s; }
.crack-2 { animation-delay: 0.2s; }
.crack-3 { animation-delay: 0.4s; }
.crack-4 { animation-delay: 0.6s; }
.crack-5 { animation-delay: 0.8s; }
.crack-6 { animation-delay: 1s; }
.crack-7 { animation-delay: 1.2s; }

@keyframes crack-draw {
  to { stroke-dashoffset: 0; }
}

.golden-flash {
  position: absolute;
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, rgba(212, 175, 55, 0.3) 0%, transparent 70%);
  animation: flash-pulse 2s ease-in-out infinite;
}

@keyframes flash-pulse {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}

/* 阶段 3: 斧影 */
.falling-axe {
  position: relative;
  width: 100px;
  height: 150px;
}

.axe-triangle {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 40px solid transparent;
  border-right: 40px solid transparent;
  border-bottom: 70px solid #1a1a1a;
  animation: axe-fall 3s ease-in-out infinite;
  filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.3));
}

.axe-shadow {
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 40px solid transparent;
  border-right: 40px solid transparent;
  border-bottom: 70px solid rgba(0, 0, 0, 0.2);
  animation: axe-shadow-fall 3s ease-in-out infinite;
}

.blood-trail {
  position: absolute;
  top: -100px;
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  height: 200px;
  background: linear-gradient(to bottom, transparent, rgba(139, 0, 0, 0.3));
  animation: trail-drip 3s ease-in-out infinite;
}

@keyframes axe-fall {
  0%, 100% { transform: translateX(-50%) translateY(-50px); }
  50% { transform: translateX(-50%) translateY(50px); }
}

@keyframes axe-shadow-fall {
  0%, 100% { transform: translateX(-50%) translateY(-50px); opacity: 0.2; }
  50% { transform: translateX(-50%) translateY(50px); opacity: 0.4; }
}

@keyframes trail-drip {
  0%, 100% { opacity: 0; }
  50% { opacity: 1; }
}

/* 阶段 4: 破碎 */
.shattered-container {
  position: relative;
  width: 200px;
  height: 200px;
}

.shard {
  position: absolute;
  background: #1a1a1a;
  opacity: 0.9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.shard-1 {
  width: 40px;
  height: 40px;
  top: 30%;
  left: 30%;
  transform: rotate(0deg);
  animation: shard-fall-1 4s ease-in-out infinite;
}

.shard-2 {
  width: 30px;
  height: 50px;
  top: 20%;
  right: 25%;
  transform: rotate(45deg);
  animation: shard-fall-2 4.5s ease-in-out infinite;
}

.shard-3 {
  width: 35px;
  height: 35px;
  bottom: 30%;
  left: 20%;
  transform: rotate(-30deg);
  animation: shard-fall-3 5s ease-in-out infinite;
}

.shard-4 {
  width: 45px;
  height: 25px;
  bottom: 25%;
  right: 30%;
  transform: rotate(15deg);
  animation: shard-fall-4 4.2s ease-in-out infinite;
}

.shard-5 {
  width: 25px;
  height: 55px;
  top: 40%;
  left: 40%;
  transform: rotate(60deg);
  animation: shard-fall-5 5.5s ease-in-out infinite;
}

.shard-6 {
  width: 38px;
  height: 32px;
  top: 25%;
  left: 50%;
  transform: rotate(-15deg);
  animation: shard-fall-6 4.8s ease-in-out infinite;
}

.shard-7 {
  width: 28px;
  height: 42px;
  bottom: 35%;
  right: 40%;
  transform: rotate(30deg);
  animation: shard-fall-7 5.2s ease-in-out infinite;
}

.shard-8 {
  width: 33px;
  height: 38px;
  top: 35%;
  right: 20%;
  transform: rotate(-45deg);
  animation: shard-fall-8 4.6s ease-in-out infinite;
}

.blood-mist {
  position: absolute;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(139, 0, 0, 0.1) 0%, transparent 70%);
  animation: mist-pulse 6s ease-in-out infinite;
}

@keyframes shard-fall-1 {
  0%, 100% { transform: rotate(0deg) translateY(0); opacity: 0.9; }
  50% { transform: rotate(180deg) translateY(20px); opacity: 0.6; }
}

@keyframes shard-fall-2 {
  0%, 100% { transform: rotate(45deg) translateY(0); opacity: 0.9; }
  50% { transform: rotate(225deg) translateY(30px); opacity: 0.5; }
}

@keyframes shard-fall-3 {
  0%, 100% { transform: rotate(-30deg) translateY(0); opacity: 0.9; }
  50% { transform: rotate(-210deg) translateY(25px); opacity: 0.7; }
}

@keyframes shard-fall-4 {
  0%, 100% { transform: rotate(15deg) translateY(0); opacity: 0.9; }
  50% { transform: rotate(195deg) translateY(15px); opacity: 0.8; }
}

@keyframes shard-fall-5 {
  0%, 100% { transform: rotate(60deg) translateY(0); opacity: 0.9; }
  50% { transform: rotate(240deg) translateY(35px); opacity: 0.4; }
}

@keyframes shard-fall-6 {
  0%, 100% { transform: rotate(-15deg) translateY(0); opacity: 0.9; }
  50% { transform: rotate(-195deg) translateY(20px); opacity: 0.6; }
}

@keyframes shard-fall-7 {
  0%, 100% { transform: rotate(30deg) translateY(0); opacity: 0.9; }
  50% { transform: rotate(210deg) translateY(28px); opacity: 0.5; }
}

@keyframes shard-fall-8 {
  0%, 100% { transform: rotate(-45deg) translateY(0); opacity: 0.9; }
  50% { transform: rotate(-225deg) translateY(22px); opacity: 0.7; }
}

@keyframes mist-pulse {
  0%, 100% { opacity: 0.1; transform: scale(1); }
  50% { opacity: 0.3; transform: scale(1.1); }
}

/* 阶段 5: 对峙 */
.confrontation-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
}

.confront-circle {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.circle-theory {
  background: #1a1a1a;
  animation: confront-push-left 2s ease-in-out infinite;
}

.circle-conscience {
  background: #f7f5f2;
  border: 3px solid #1a1a1a;
  animation: confront-push-right 2s ease-in-out infinite;
}

.circle-label {
  font-family: 'Inter', sans-serif;
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: inherit;
  opacity: 0.8;
}

.circle-theory .circle-label {
  color: #f7f5f2;
}

.circle-conscience .circle-label {
  color: #1a1a1a;
}

.collision-wave {
  position: absolute;
  width: 50px;
  height: 50px;
  border: 2px solid rgba(139, 0, 0, 0.2);
  border-radius: 50%;
  animation: wave-expand 2s ease-out infinite;
}

@keyframes confront-push-left {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(20px); }
}

@keyframes confront-push-right {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(-20px); }
}

@keyframes wave-expand {
  0% { transform: scale(0.5); opacity: 0.5; }
  100% { transform: scale(3); opacity: 0; }
}

/* 阶段 6: 光芒 */
.redemption-container {
  position: relative;
  width: 200px;
  height: 200px;
}

.light-ray {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 2px;
  height: 100px;
  background: linear-gradient(to bottom, #4a7c9f, transparent);
  transform-origin: top center;
  opacity: 0.6;
}

.ray-1 { transform: translate(-50%, -50%) rotate(0deg); }
.ray-2 { transform: translate(-50%, -50%) rotate(72deg); }
.ray-3 { transform: translate(-50%, -50%) rotate(144deg); }
.ray-4 { transform: translate(-50%, -50%) rotate(216deg); }
.ray-5 { transform: translate(-50%, -50%) rotate(288deg); }

.light-ray {
  animation: ray-pulse 4s ease-in-out infinite;
}

.ray-1 { animation-delay: 0s; }
.ray-2 { animation-delay: 0.8s; }
.ray-3 { animation-delay: 1.6s; }
.ray-4 { animation-delay: 2.4s; }
.ray-5 { animation-delay: 3.2s; }

@keyframes ray-pulse {
  0%, 100% { opacity: 0.3; height: 80px; }
  50% { opacity: 0.8; height: 120px; }
}

.warm-glow {
  position: absolute;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(74, 124, 159, 0.2) 0%, transparent 70%);
  animation: warm-breathe 6s ease-in-out infinite;
}

@keyframes warm-breathe {
  0%, 100% { transform: scale(1); opacity: 0.5; }
  50% { transform: scale(1.2); opacity: 1; }
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
  color: rgba(26, 26, 26, 0.5);
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

  .abyss-circle,
  .mirror-circle {
    width: 120px;
    height: 120px;
  }

  .confront-circle {
    width: 80px;
    height: 80px;
    gap: 30px;
  }

  .breath-ring {
    width: 160px;
    height: 160px;
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

  .abyss-circle,
  .mirror-circle {
    width: 80px;
    height: 80px;
  }

  .abyss-inner {
    width: 60px;
    height: 60px;
  }

  .breath-ring {
    width: 120px;
    height: 120px;
  }

  .confront-circle {
    width: 60px;
    height: 60px;
    gap: 20px;
  }

  .confrontation-container {
    gap: 30px;
  }

  .circle-label {
    font-size: 0.55rem;
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

  .shard {
    transform: scale(0.6);
  }

  .shattered-container {
    width: 160px;
    height: 160px;
  }

  .blood-mist {
    width: 240px;
    height: 240px;
  }

  .falling-axe {
    transform: scale(0.8);
  }

  .redemption-container {
    width: 160px;
    height: 160px;
  }

  .light-ray {
    height: 80px;
  }

  .warm-glow {
    width: 240px;
    height: 240px;
  }
}

/* 处理页面缩放（zoom） */
@media (max-height: 600px) {
  .quote-layer {
    bottom: 40%;
  }

  .creative-background {
    top: 20%;
  }

  .quote-word {
    font-size: clamp(1rem, 2.5vw, 1.8rem);
  }
}
</style>

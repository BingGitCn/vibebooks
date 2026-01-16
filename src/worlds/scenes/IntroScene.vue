<template>
  <div class="intro-scene" @click="handleClick">
    <!-- 圣彼得堡街景背景 -->
    <div class="street-background">
      <svg viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
        <!-- 天空 -->
        <defs>
          <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:#ffd89b;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#19547b;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="1920" height="1080" fill="url(#skyGradient)"/>

        <!-- 夕阳 -->
        <circle cx="1400" cy="300" r="80" fill="#ff6b35" opacity="0.8"/>
        <circle cx="1400" cy="300" r="100" fill="#ff6b35" opacity="0.4"/>

        <!-- 远处的建筑轮廓 -->
        <g class="buildings-far" opacity="0.3">
          <rect x="0" y="600" width="1920" height="480" fill="#4a5568"/>
          <rect x="100" y="500" width="120" height="200" fill="#4a5568"/>
          <rect x="300" y="450" width="150" height="250" fill="#4a5568"/>
          <rect x="600" y="480" width="100" height="220" fill="#4a5568"/>
          <rect x="900" y="460" width="130" height="240" fill="#4a5568"/>
          <rect x="1200" y="490" width="110" height="210" fill="#4a5568"/>
          <rect x="1500" y="470" width="140" height="230" fill="#4a5568"/>
          <rect x="1700" y="500" width="120" height="200" fill="#4a5568"/>
        </g>

        <!-- 近处的建筑 -->
        <g class="buildings-near" opacity="0.5">
          <rect x="50" y="650" width="200" height="430" fill="#2d3748"/>
          <rect x="350" y="620" width="180" height="460" fill="#2d3748"/>
          <rect x="700" y="640" width="220" height="440" fill="#2d3748"/>
          <rect x="1100" y="630" width="190" height="450" fill="#2d3748"/>
          <rect x="1450" y="660" width="210" height="420" fill="#2d3748"/>
          <rect x="1750" y="640" width="170" height="440" fill="#2d3748"/>
        </g>

        <!-- 街道透视线 -->
        <g class="street-perspective" opacity="0.2">
          <line x1="960" y1="540" x2="0" y2="1080" stroke="#1a202c" stroke-width="2"/>
          <line x1="960" y1="540" x2="1920" y2="1080" stroke="#1a202c" stroke-width="2"/>
          <line x1="960" y1="540" x2="400" y2="1080" stroke="#1a202c" stroke-width="1"/>
          <line x1="960" y1="540" x2="1520" y2="1080" stroke="#1a202c" stroke-width="1"/>
        </g>

        <!-- 涅瓦河 -->
        <path d="M0 750 Q500 720 960 700 Q1420 720 1920 750 L1920 1080 L0 1080 Z"
              fill="#2980b9" opacity="0.15"/>
      </svg>
    </div>

    <!-- 热浪效果 -->
    <div class="heat-wave"></div>

    <!-- 滚动字幕 -->
    <transition name="fade-in">
      <div v-if="showTitle" class="opening-title">
        <div class="title-content">
          <h1 class="main-title">罪与罚</h1>
          <p class="subtitle">Преступление и наказание</p>
          <p class="author">费奥多尔·陀思妥耶夫斯基</p>
        </div>
      </div>
    </transition>

    <!-- 滚动文字 -->
    <transition name="scroll-up">
      <div v-if="showScroll" class="scrolling-text">
        <div class="scroll-content">
          <p class="scroll-line">圣彼得堡</p>
          <p class="scroll-line">1866年7月</p>
          <p class="scroll-line">一个炎热得让人窒息的夏天</p>
          <p class="scroll-line">&nbsp;</p>
          <p class="scroll-line">在S胡同的一间狭小阁楼里</p>
          <p class="scroll-line">住着一位年轻的大学生</p>
          <p class="scroll-line">罗德里昂·罗曼诺维奇·拉斯科尔尼科夫</p>
          <p class="scroll-line">&nbsp;</p>
          <p class="scroll-line">他正在构思一个可怕的计划</p>
          <p class="scroll-line">&nbsp;</p>
          <p class="scroll-line scroll-emphasis">"我是个颤抖的生物，还是我有权利..."</p>
        </div>
      </div>
    </transition>

    <!-- 点击继续提示 -->
    <transition name="fade-in">
      <div v-if="showHint" class="click-hint">
        <p>点击进入</p>
        <div class="arrow-bounce">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 5v14M19 12l-7 7-7-7"/>
          </svg>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const emit = defineEmits(['next'])
const showTitle = ref(false)
const showScroll = ref(false)
const showHint = ref(false)

const handleClick = () => {
  // 只有在提示出现后才响应点击
  if (showHint.value) {
    emit('next')
  }
}

onMounted(() => {
  // 时间线
  setTimeout(() => {
    showTitle.value = true
  }, 500)

  setTimeout(() => {
    showScroll.value = true
  }, 3000)

  setTimeout(() => {
    showHint.value = true
  }, 8000)
})
</script>

<style scoped>
.intro-scene {
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
}

/* === 街景背景 === */
.street-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.street-background svg {
  width: 100%;
  height: 100%;
}

/* === 热浪效果 === */
.heat-wave {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  background: linear-gradient(
    180deg,
    rgba(255, 216, 155, 0.1) 0%,
    rgba(255, 107, 53, 0.05) 50%,
    rgba(25, 84, 123, 0.1) 100%
  );
  animation: heatWave 3s ease-in-out infinite;
}

@keyframes heatWave {
  0%, 100% {
    opacity: 0.3;
    transform: scaleY(1);
  }
  50% {
    opacity: 0.5;
    transform: scaleY(1.02);
  }
}

/* === 开场标题 === */
.opening-title {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.3);
}

.title-content {
  text-align: center;
  color: #fff;
  text-shadow: 0 4px 12px rgba(0, 0, 0, 0.8);
}

.main-title {
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 700;
  margin-bottom: 1rem;
  letter-spacing: 0.3em;
  animation: titlePulse 2s ease-in-out infinite;
}

@keyframes titlePulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.02);
    opacity: 0.95;
  }
}

.subtitle {
  font-size: clamp(1.2rem, 3vw, 2rem);
  font-weight: 300;
  margin-bottom: 0.5rem;
  opacity: 0.9;
  font-style: italic;
}

.author {
  font-size: clamp(1rem, 2vw, 1.5rem);
  font-weight: 300;
  opacity: 0.8;
}

/* === 滚动文字 === */
.scrolling-text {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
}

.scroll-content {
  max-width: 900px;
  padding: 2rem;
  text-align: center;
  color: #fff;
  animation: scrollUp 15s linear forwards;
}

@keyframes scrollUp {
  0% {
    transform: translateY(100%);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(-50%);
    opacity: 0;
  }
}

.scroll-line {
  font-size: clamp(1.2rem, 3vw, 1.8rem);
  line-height: 2.5;
  font-weight: 300;
  margin: 0;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.8);
}

.scroll-emphasis {
  font-size: clamp(1.4rem, 3.5vw, 2.2rem);
  font-weight: 600;
  font-style: italic;
  color: #ff6b35;
  margin-top: 2rem;
}

/* === 点击提示 === */
.click-hint {
  position: absolute;
  bottom: 15%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 20;
  text-align: center;
  color: #fff;
  animation: hintFade 2s ease-in-out infinite;
}

@keyframes hintFade {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
}

.click-hint p {
  font-size: 1.2rem;
  font-weight: 300;
  margin-bottom: 0.5rem;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.8);
}

.arrow-bounce {
  animation: arrowBounce 1.5s ease-in-out infinite;
}

@keyframes arrowBounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(10px);
  }
}

.arrow-bounce svg {
  width: 40px;
  height: 40px;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5));
}

/* === 转场动画 === */
.fade-in-enter-active {
  transition: opacity 1s ease;
}

.fade-in-enter-from {
  opacity: 0;
}

.fade-in-enter-to {
  opacity: 1;
}

.scroll-up-enter-active {
  transition: all 0.8s ease;
}

.scroll-up-enter-from {
  opacity: 0;
  transform: translateY(50px);
}

.scroll-up-enter-to {
  opacity: 1;
  transform: translateY(0);
}

/* === 响应式设计 === */
@media (max-width: 768px) {
  .main-title {
    letter-spacing: 0.2em;
  }

  .scroll-line {
    line-height: 2;
  }

  .click-hint {
    bottom: 10%;
  }

  .click-hint p {
    font-size: 1rem;
  }
}
</style>

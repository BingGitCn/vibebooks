<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const currentStage = ref(0)

const stages = [
  {
    text: '我年轻时',
    subtext: '总觉得自己不是凡人',
    detail: '应该有所作为',
    note: ''
  },
  {
    text: '因为害怕自己并非明珠',
    subtext: '而不敢刻苦琢磨',
    detail: '',
    note: ''
  },
  {
    text: '又因为有几分相信自己是明珠',
    subtext: '而不能与瓦砾碌碌为伍',
    detail: '',
    note: ''
  },
  {
    text: '因为惧怕自己哪怕只有一点点的不凡',
    subtext: '所以才成为老虎',
    detail: '',
    note: ''
  },
  {
    text: '变成老虎之后',
    subtext: '我感到的是',
    detail: '一种可怕的安宁',
    note: ''
  }
]

function nextStage() {
  if (currentStage.value < stages.length - 1) {
    currentStage.value++
  }
}

function goBack() {
  router.push('/universe')
}

onMounted(() => {
  currentStage.value = 0
})
</script>

<template>
  <div class="mountain-moon-world" @click="nextStage">
    <!-- 装饰背景线 -->
    <div class="decorative-lines">
      <div class="line line-1"></div>
      <div class="line line-2"></div>
      <div class="line line-3"></div>
    </div>

    <!-- 背景月亮 -->
    <div class="moon-background" :class="{ visible: currentStage >= 4 }"></div>

    <!-- 主容器 -->
    <div class="main-container">
      <!-- 返回按钮 -->
      <button class="back-btn" @click.stop="goBack">← 返回</button>

      <!-- 变形视觉区 -->
      <div class="transformation-visual">
        <!-- 人形轮廓 -->
        <svg class="shape-svg" viewBox="0 0 200 200" :class="{ transforming: currentStage >= 1 }">
          <!-- 人的轮廓：圆头 + 身体 -->
          <g class="human-shape" v-if="currentStage < 3">
            <circle class="head" cx="100" cy="50" r="30" fill="none" stroke="#000" stroke-width="2" opacity="0.6"/>
            <line class="body" x1="100" y1="80" x2="100" y2="150" stroke="#000" stroke-width="2" opacity="0.6"/>
            <line class="arms" x1="70" y1="100" x2="130" y2="100" stroke="#000" stroke-width="2" opacity="0.6"/>
            <line class="legs" x1="80" y1="150" x2="80" y2="180" stroke="#000" stroke-width="2" opacity="0.6"/>
            <line class="legs" x1="120" y1="150" x2="120" y2="180" stroke="#000" stroke-width="2" opacity="0.6"/>
          </g>

          <!-- 过渡：条纹出现 -->
          <g class="transition-stripes" v-if="currentStage >= 1 && currentStage < 4">
            <line class="stripe stripe-1" x1="70" y1="50" x2="130" y2="130" stroke="#000" stroke-width="1.5" opacity="0.3"/>
            <line class="stripe stripe-2" x1="80" y1="50" x2="140" y2="130" stroke="#000" stroke-width="1.5" opacity="0.3"/>
            <line class="stripe stripe-3" x1="60" y1="60" x2="120" y2="140" stroke="#000" stroke-width="1.5" opacity="0.3"/>
          </g>

          <!-- 虎纹：三条斜纹 -->
          <g class="tiger-stripes" v-if="currentStage >= 4">
            <line class="stripe-final stripe-1" x1="50" y1="40" x2="150" y2="160" stroke="#000" stroke-width="3"/>
            <line class="stripe-final stripe-2" x1="65" y1="40" x2="165" y2="160" stroke="#000" stroke-width="3"/>
            <line class="stripe-final stripe-3" x1="80" y1="40" x2="180" y2="160" stroke="#000" stroke-width="3"/>
          </g>
        </svg>
      </div>

      <!-- 叙事内容 -->
      <transition name="stage-fade" mode="out-in">
        <div :key="currentStage" class="stage-content">
          <h1 class="main-text">{{ stages[currentStage].text }}</h1>
          <p class="sub-text">{{ stages[currentStage].subtext }}</p>
          <p v-if="stages[currentStage].detail" class="detail-text">{{ stages[currentStage].detail }}</p>
        </div>
      </transition>

      <!-- 底部金句（固定） -->
      <div class="fixed-quote">
        "人性这个东西，是很难消除的"
      </div>

      <!-- 点击提示 -->
      <div class="click-hint" v-if="currentStage < stages.length - 1">
        点击继续
      </div>
    </div>

    <!-- 页脚 -->
    <footer class="world-footer">
      <div class="footer-number">VOL.016</div>
      <div class="footer-dots">···</div>
    </footer>
  </div>
</template>

<style scoped>
.mountain-moon-world {
  min-height: 100vh;
  background: #fafafa;
  color: #1a1a1a;
  font-family: 'Noto Serif SC', 'Source Serif 4', serif;
  position: relative;
  overflow-x: hidden;
  padding: 60px 40px;
  cursor: pointer;
}

/* 装饰背景线 */
.decorative-lines {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 0;
}

.line {
  position: absolute;
  background: #000;
  opacity: 0.03;
}

.line-1 {
  width: 1px;
  height: 100%;
  left: 20%;
}

.line-2 {
  width: 1px;
  height: 100%;
  left: 50%;
}

.line-3 {
  width: 1px;
  height: 100%;
  left: 80%;
}

/* 背景月亮 */
.moon-background {
  position: fixed;
  top: 10%;
  right: 10%;
  width: 150px;
  height: 150px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.8), transparent);
  border-radius: 50%;
  opacity: 0;
  transition: opacity 2s ease;
  pointer-events: none;
  z-index: 0;
}

.moon-background.visible {
  opacity: 1;
}

/* 主容器 */
.main-container {
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

/* 返回按钮 */
.back-btn {
  position: absolute;
  top: 0;
  left: 0;
  background: transparent;
  border: 1px solid #000;
  color: #000;
  padding: 10px 20px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.back-btn:hover {
  background: #000;
  color: #fff;
}

/* 变形视觉区 */
.transformation-visual {
  margin: 120px 0 60px;
  min-height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.shape-svg {
  width: 100%;
  max-width: 300px;
  height: auto;
}

.human-shape {
  animation: human-fade 1s ease;
}

@keyframes human-fade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.transformation-visual.transforming .human-shape {
  opacity: 0.3;
  transition: opacity 1s ease;
}

.transition-stripes .stripe {
  animation: stripe-appear 0.5s ease forwards;
}

.transition-stripes .stripe-1 {
  animation-delay: 0s;
}

.transition-stripes .stripe-2 {
  animation-delay: 0.2s;
}

.transition-stripes .stripe-3 {
  animation-delay: 0.4s;
}

@keyframes stripe-appear {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 0.3;
    transform: translateX(0);
  }
}

.tiger-stripes .stripe-final {
  animation: tiger-emerge 1s ease forwards;
  stroke-dasharray: 200;
  stroke-dashoffset: 200;
}

.tiger-stripes .stripe-1 {
  animation-delay: 0s;
}

.tiger-stripes .stripe-2 {
  animation-delay: 0.2s;
}

.tiger-stripes .stripe-3 {
  animation-delay: 0.4s;
}

@keyframes tiger-emerge {
  from {
    stroke-dashoffset: 200;
  }
  to {
    stroke-dashoffset: 0;
  }
}

/* 内容区 */
.stage-content {
  text-align: center;
  margin: 60px 0;
}

.main-text {
  font-size: clamp(24px, 4vw, 32px);
  font-weight: 400;
  margin: 0 0 20px;
  letter-spacing: 0.2em;
  color: #000;
}

.sub-text {
  font-size: clamp(14px, 2.5vw, 18px);
  font-weight: 300;
  color: #666;
  margin: 0 0 15px;
  letter-spacing: 0.1em;
}

.detail-text {
  font-size: clamp(13px, 2vw, 16px);
  font-weight: 300;
  color: #999;
  margin: 0;
  font-style: italic;
  letter-spacing: 0.05em;
}

/* 底部金句 */
.fixed-quote {
  text-align: center;
  padding: 40px 0;
  margin: 60px 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  font-size: 15px;
  font-weight: 300;
  color: #666;
  letter-spacing: 0.15em;
  line-height: 1.8;
}

/* 点击提示 */
.click-hint {
  text-align: center;
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  color: #999;
  letter-spacing: 0.2em;
  animation: hint-pulse 2s ease-in-out infinite;
}

@keyframes hint-pulse {
  0%, 100% {
    opacity: 0.4;
  }
  50% {
    opacity: 1;
  }
}

/* 过渡动画 */
.stage-fade-enter-active,
.stage-fade-leave-active {
  transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
}

.stage-fade-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.stage-fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* 页脚 */
.world-footer {
  position: fixed;
  bottom: 40px;
  left: 40px;
  right: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  color: #999;
  letter-spacing: 0.2em;
  z-index: 10;
}

.footer-dots {
  opacity: 0.3;
}

/* 响应式 */
@media (max-width: 768px) {
  .main-container {
    padding: 40px 20px;
  }

  .back-btn {
    top: 0;
    left: 0;
  }

  .transformation-visual {
    margin: 80px 0 40px;
    min-height: 250px;
  }

  .moon-background {
    width: 100px;
    height: 100px;
  }

  .world-footer {
    bottom: 20px;
    left: 20px;
    right: 20px;
  }
}
</style>

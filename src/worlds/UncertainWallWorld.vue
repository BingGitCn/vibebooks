<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const currentStage = ref(0)

const stages = [
  {
    text: '我住在一座小城里',
    subtext: '小城被高墙围住',
    detail: '墙那边是什么，没人知道'
  },
  {
    text: '我在图书馆读梦',
    subtext: '老头说',
    detail: '有些墙是看不见的'
  },
  {
    text: '影子出现',
    subtext: '它说',
    detail: '穿过去，墙是幻觉'
  },
  {
    text: '我走到墙前',
    subtext: '闭上眼',
    detail: '穿过去了'
  },
  {
    text: '17岁的我',
    subtext: '第一次',
    detail: '走出了自己'
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
  <div class="wall-world" @click="nextStage">
    <!-- 装饰背景线 -->
    <div class="decorative-lines">
      <div class="line line-1"></div>
      <div class="line line-2"></div>
      <div class="line line-3"></div>
    </div>

    <!-- 主容器 -->
    <div class="main-container">
      <!-- 返回按钮 -->
      <button class="back-btn" @click.stop="goBack">← 返回</button>

      <!-- 墙的视觉 -->
      <div class="wall-visual" :class="{ fading: currentStage >= 4 }">
        <div class="wall-line"></div>
        <div class="wall-shadow" v-if="currentStage >= 2"></div>
      </div>

      <!-- 叙事内容 -->
      <transition name="stage-fade" mode="out-in">
        <div :key="currentStage" class="stage-content">
          <h1 class="main-text">{{ stages[currentStage].text }}</h1>
          <p class="sub-text">{{ stages[currentStage].subtext }}</p>
          <p class="detail-text">{{ stages[currentStage].detail }}</p>
        </div>
      </transition>

      <!-- 点击提示 -->
      <div class="click-hint" v-if="currentStage < stages.length - 1">
        点击继续
      </div>
    </div>

    <!-- 页脚 -->
    <footer class="world-footer">
      <div class="footer-number">VOL.014</div>
      <div class="footer-dots">···</div>
    </footer>
  </div>
</template>

<style scoped>
.wall-world {
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

/* 主容器 */
.main-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1;
}

/* 返回按钮 */
.back-btn {
  position: absolute;
  top: 40px;
  left: 40px;
  background: transparent;
  border: 1px solid #000;
  color: #000;
  padding: 10px 20px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;
}

.back-btn:hover {
  background: #000;
  color: #fff;
}

/* 墙的视觉 */
.wall-visual {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}

.wall-line {
  position: absolute;
  left: 50%;
  top: 10%;
  bottom: 10%;
  width: 3px;
  background: #000;
  opacity: 0.8;
}

.wall-shadow {
  position: absolute;
  left: calc(50% + 5px);
  top: 10%;
  bottom: 10%;
  width: 100px;
  background: linear-gradient(90deg, rgba(0, 0, 0, 0.1), transparent);
  filter: blur(10px);
}

.wall-visual.fading {
  opacity: 0;
  transition: opacity 2s ease;
}

/* 内容区 */
.stage-content {
  text-align: center;
  position: relative;
  z-index: 1;
  padding: 0 20px;
}

.main-text {
  font-size: clamp(24px, 5vw, 36px);
  font-weight: 400;
  margin: 0 0 20px;
  letter-spacing: 0.2em;
  color: #000;
}

.sub-text {
  font-size: clamp(14px, 3vw, 18px);
  font-weight: 300;
  color: #666;
  margin: 0 0 15px;
  letter-spacing: 0.15em;
}

.detail-text {
  font-size: clamp(13px, 2.5vw, 16px);
  font-weight: 300;
  color: #999;
  margin: 0;
  letter-spacing: 0.1em;
  font-style: italic;
}

/* 点击提示 */
.click-hint {
  position: absolute;
  bottom: 120px;
  left: 50%;
  transform: translateX(-50%);
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  color: #999;
  letter-spacing: 0.2em;
  animation: hint-pulse 2s ease-in-out infinite;
  z-index: 10;
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
  transition: all 1.2s cubic-bezier(0.4, 0, 0.2, 1);
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
    top: 20px;
    left: 20px;
  }

  .click-hint {
    bottom: 80px;
  }

  .world-footer {
    bottom: 20px;
    left: 20px;
    right: 20px;
  }
}
</style>

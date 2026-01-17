<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const currentStage = ref(0)

const stages = [
  {
    text: '文城',
    subtitle: '一个不存在的地方'
  },
  {
    text: '他找了一辈子',
    subtitle: '那个叫文城的地方'
  },
  {
    text: '后来才知道',
    subtitle: '文城从来不存在'
  },
  {
    text: '',
    subtitle: '只有雾'
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
  <div class="wencheng-world" @click="nextStage">
    <!-- 雾气层 -->
    <div class="fog-layer fog-1"></div>
    <div class="fog-layer fog-2"></div>
    <div class="fog-layer fog-3"></div>

    <!-- 主容器 -->
    <div class="main-container">
      <!-- 返回按钮 -->
      <button class="back-btn" @click.stop="goBack">← 返回</button>

      <!-- 内容区 -->
      <transition name="stage-fade" mode="out-in">
        <div :key="currentStage" class="stage-content">
          <h1 class="main-title">{{ stages[currentStage].text }}</h1>
          <p class="subtitle">{{ stages[currentStage].subtitle }}</p>
        </div>
      </transition>

      <!-- 提示 -->
      <div class="click-hint" v-if="currentStage < stages.length - 1">
        点击继续
      </div>
    </div>

    <!-- 页脚 -->
    <footer class="world-footer">
      <div class="footer-number">VOL.012</div>
      <div class="footer-dots">···</div>
    </footer>
  </div>
</template>

<style scoped>
.wencheng-world {
  min-height: 100vh;
  background: #fafafa;
  color: #1a1a1a;
  font-family: 'Noto Serif SC', 'Source Serif 4', serif;
  position: relative;
  overflow: hidden;
  cursor: pointer;
}

/* 雾气层 */
.fog-layer {
  position: absolute;
  width: 200%;
  height: 100%;
  top: 0;
  left: -50%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), transparent);
  opacity: 0.3;
  pointer-events: none;
}

.fog-1 {
  animation: fog-drift 20s ease-in-out infinite;
}

.fog-2 {
  animation: fog-drift 25s ease-in-out infinite reverse;
  animation-delay: -5s;
}

.fog-3 {
  animation: fog-drift 30s ease-in-out infinite;
  animation-delay: -10s;
}

@keyframes fog-drift {
  0%, 100% {
    transform: translateX(-20%);
    opacity: 0.2;
  }
  50% {
    transform: translateX(20%);
    opacity: 0.4;
  }
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
  padding: 60px 40px;
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

/* 内容区 */
.stage-content {
  text-align: center;
  position: relative;
}

.main-title {
  font-size: clamp(48px, 12vw, 120px);
  font-weight: 300;
  margin: 0 0 30px;
  letter-spacing: 0.5em;
  color: #000;
  transition: all 1.5s ease;
}

.main-title:hover {
  opacity: 0.3;
  filter: blur(2px);
}

.subtitle {
  font-size: clamp(14px, 3vw, 18px);
  font-weight: 300;
  color: #666;
  margin: 0;
  letter-spacing: 0.3em;
  line-height: 2;
}

/* 阶段2-4：文字消散 */
.stage-content:deep(:nth-child(2)) .main-title,
.stage-content:deep(:nth-child(3)) .main-title {
  opacity: 0.5;
  filter: blur(1px);
}

.stage-content:deep(:nth-child(4)) .main-title {
  opacity: 0.1;
  filter: blur(3px);
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
  transition: all 1.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.stage-fade-enter-from {
  opacity: 0;
  transform: translateY(30px);
  filter: blur(5px);
}

.stage-fade-leave-to {
  opacity: 0;
  transform: translateY(-30px);
  filter: blur(5px);
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

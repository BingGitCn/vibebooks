<template>
  <div class="sahara-world">
    <!-- 跃迁动画 -->
    <transition name="warp">
      <div v-if="showWarp" class="warp-overlay">
        <div class="warp-circle">
          <div class="warp-circle-inner"></div>
        </div>
        <div class="warp-text">撒哈拉的故事</div>
      </div>
    </transition>

    <!-- 返回按钮 -->
    <button class="exit-btn" @click="exitWorld">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M19 12H5M12 19l-7-7 7-7"/>
      </svg>
      <span>Return</span>
    </button>

    <!-- 主内容区 -->
    <div class="main-container">
      <!-- 阶段1：思念的开始 -->
      <div v-if="stage === 1" class="stage-container" @click="nextStage">
        <svg class="sand-grain" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="4" fill="#d97706" opacity="0.8"/>
        </svg>
        <p class="quote-text">"每想你一次，天上飘落一粒沙"</p>
        <p class="click-hint">点击继续</p>
        <div class="stage-progress">
          <div v-for="i in 6" :key="i" class="progress-dot" :class="{ active: stage >= i }"></div>
        </div>
      </div>

      <!-- 阶段2：沙漠的形成 -->
      <div v-if="stage === 2" class="stage-container" @click="nextStage">
        <svg class="dune-curves" viewBox="0 0 200 200">
          <path d="M0,120 Q50,80 100,100 T200,90" stroke="#d97706" stroke-width="1.5" fill="none" opacity="0.6"/>
          <path d="M0,140 Q50,100 100,120 T200,110" stroke="#d97706" stroke-width="1.5" fill="none" opacity="0.5"/>
          <path d="M0,160 Q50,120 100,140 T200,130" stroke="#d97706" stroke-width="1.5" fill="none" opacity="0.4"/>
        </svg>
        <p class="quote-text">"从此形成了撒哈拉"</p>
        <p class="click-hint">点击继续</p>
        <div class="stage-progress">
          <div v-for="i in 6" :key="i" class="progress-dot" :class="{ active: stage >= i }"></div>
        </div>
      </div>

      <!-- 阶段3：生命的力量 -->
      <div v-if="stage === 3" class="stage-container" @click="nextStage">
        <svg class="life-emerges" viewBox="0 0 200 200">
          <path d="M0,130 Q50,90 100,110 T200,100" stroke="#d97706" stroke-width="1.5" fill="none" opacity="0.5"/>
          <path d="M0,150 Q50,110 100,130 T200,120" stroke="#d97706" stroke-width="1.5" fill="none" opacity="0.4"/>
          <circle cx="70" cy="105" r="2" fill="#d97706" opacity="0.6"/>
          <circle cx="130" cy="95" r="2.5" fill="#d97706" opacity="0.55"/>
          <circle cx="100" cy="115" r="1.8" fill="#d97706" opacity="0.5"/>
        </svg>
        <p class="quote-text">"生命，在这样荒僻的地方，一样欣欣向荣"</p>
        <p class="click-hint">点击继续</p>
        <div class="stage-progress">
          <div v-for="i in 6" :key="i" class="progress-dot" :class="{ active: stage >= i }"></div>
        </div>
      </div>

      <!-- 阶段4：永恒的姿态 -->
      <div v-if="stage === 4" class="stage-container" @click="nextStage">
        <svg class="tree-eternal" viewBox="0 0 200 200">
          <line x1="100" y1="180" x2="100" y2="60" stroke="#d97706" stroke-width="2" opacity="0.6"/>
          <line x1="100" y1="140" x2="70" y2="110" stroke="#d97706" stroke-width="1.5" opacity="0.5"/>
          <line x1="100" y1="120" x2="130" y2="90" stroke="#d97706" stroke-width="1.5" opacity="0.5"/>
          <line x1="100" y1="100" x2="65" y2="75" stroke="#d97706" stroke-width="1.5" opacity="0.45"/>
          <line x1="100" y1="100" x2="135" y2="70" stroke="#d97706" stroke-width="1.5" opacity="0.45"/>
          <circle cx="100" cy="180" r="4" fill="#d97706" opacity="0.7"/>
        </svg>
        <p class="quote-text">"如果有来生，要做一棵树，站成永恒"</p>
        <p class="click-hint">点击继续</p>
        <div class="stage-progress">
          <div v-for="i in 6" :key="i" class="progress-dot" :class="{ active: stage >= i }"></div>
        </div>
      </div>

      <!-- 阶段5：时间的流逝 -->
      <div v-if="stage === 5" class="stage-container" @click="nextStage">
        <svg class="time-layers" viewBox="0 0 200 200">
          <path d="M0,80 Q50,100 100,90 T200,85" stroke="#d97706" stroke-width="1" fill="none" opacity="0.35"/>
          <path d="M0,100 Q50,120 100,110 T200,105" stroke="#d97706" stroke-width="1" fill="none" opacity="0.3"/>
          <path d="M0,120 Q50,140 100,130 T200,125" stroke="#d97706" stroke-width="1" fill="none" opacity="0.25"/>
          <path d="M0,140 Q50,160 100,150 T200,145" stroke="#d97706" stroke-width="1" fill="none" opacity="0.2"/>
        </svg>
        <p class="quote-text">"流去的种种，化为一层层沙漠"</p>
        <p class="click-hint">点击继续</p>
        <div class="stage-progress">
          <div v-for="i in 6" :key="i" class="progress-dot" :class="{ active: stage >= i }"></div>
        </div>
      </div>

      <!-- 阶段6：内心的宽广 -->
      <div v-if="stage === 6" class="stage-container">
        <svg class="vast-heart" viewBox="0 0 200 200">
          <line x1="100" y1="180" x2="100" y2="20" stroke="#d97706" stroke-width="0.5" opacity="0.15"/>
          <circle cx="100" cy="100" r="60" stroke="#d97706" stroke-width="0.5" fill="none" opacity="0.1"/>
        </svg>
        <p class="quote-text">"我的心地是这样宽敞，没有忧伤"</p>
        <button class="back-to-contents" @click="exitWorld">返回宇宙</button>
        <div class="stage-progress">
          <div v-for="i in 6" :key="i" class="progress-dot" :class="{ active: stage >= i }"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const showWarp = ref(true)
const stage = ref(1)

const nextStage = () => {
  if (stage.value < 6) {
    stage.value++
  }
}

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
.sahara-world {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #f7f5f2;
  overflow: hidden;
  font-family: 'Noto Serif SC', serif;
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
  font-family: 'Noto Serif SC', serif;
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
  position: fixed;
  top: 2rem;
  left: 2rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1.5rem;
  background: rgba(247, 245, 242, 0.9);
  backdrop-filter: blur(10px);
  border: 1px solid #1a1a1a;
  color: #1a1a1a;
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
  background: #1a1a1a;
  color: #f7f5f2;
  box-shadow: 0 0 30px rgba(26, 26, 26, 0.15);
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
}

.stage-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2.5rem;
  cursor: pointer;
  width: 100%;
  max-width: 600px;
  padding: 2rem;
  margin: 0 auto;
}

/* SVG 图形 */
.sand-grain,
.dune-curves,
.life-emerges,
.tree-eternal,
.time-layers,
.vast-heart {
  width: 280px;
  height: 280px;
  display: block;
  margin: 0 auto;
  flex-shrink: 0;
}

/* 金句文字 */
.quote-text {
  font-family: 'Noto Serif SC', serif;
  font-size: clamp(1.1rem, 2.8vw, 1.6rem);
  font-weight: 400;
  letter-spacing: 0.12em;
  line-height: 1.8;
  color: #1a1a1a;
  text-align: center;
  margin: 0;
}

/* 点击提示 */
.click-hint {
  font-family: 'Inter', sans-serif;
  font-size: 0.6rem;
  letter-spacing: 0.15em;
  color: rgba(26, 26, 26, 0.3);
  text-transform: uppercase;
  margin: 0;
}

/* 返回按钮 */
.back-to-contents {
  padding: 0.875rem 2rem;
  background: transparent;
  border: 1px solid #1a1a1a;
  color: #1a1a1a;
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.back-to-contents:hover {
  background: #1a1a1a;
  color: #f7f5f2;
}

/* 进度指示 */
.stage-progress {
  position: absolute;
  bottom: 2rem;
  display: flex;
  gap: 0.75rem;
}

.progress-dot {
  width: 6px;
  height: 6px;
  border: 1px solid rgba(26, 26, 26, 0.3);
  border-radius: 50%;
  transition: all 0.3s ease;
}

.progress-dot.active {
  background: #d97706;
  border-color: #d97706;
}

/* === 过渡动画 === */
.stage-fade-enter-active,
.stage-fade-leave-active {
  transition: opacity 0.6s ease;
}

.stage-fade-enter-from,
.stage-fade-leave-to {
  opacity: 0;
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
@media (max-width: 768px) {
  .stage-container {
    padding: 1.5rem;
    max-width: 100%;
  }

  .sand-grain,
  .dune-curves,
  .life-emerges,
  .tree-eternal,
  .time-layers,
  .vast-heart {
    width: 240px;
    height: 240px;
  }

  .exit-btn {
    top: 1rem;
    left: 1rem;
    padding: 0.75rem 1.25rem;
    font-size: 0.65rem;
  }
}

@media (max-width: 480px) {
  .quote-text {
    font-size: 1rem;
  }

  .sand-grain,
  .dune-curves,
  .life-emerges,
  .tree-eternal,
  .time-layers,
  .vast-heart {
    width: 200px;
    height: 200px;
  }
}
</style>

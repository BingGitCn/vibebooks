<template>
  <div class="murder-montage-scene" @click="attemptEscape" :class="{ 'is-flashing': isFlashing }">
    <!-- 快速闪回画面 -->
    <transition-group name="flash-frame" tag="div" class="montage-frames">
      <div v-for="(frame, index) in activeFrames" :key="frame.id" class="montage-frame" :style="{ background: frame.bg }">
        <div class="frame-content">
          <div v-if="frame.type === 'axe'" class="axe-symbol">
            <svg viewBox="0 0 100 150">
              <rect x="42" y="10" width="16" height="100" fill="#5d4e37"/>
              <polygon points="20,100 80,100 70,140 30,140" fill="#a0a0a0"/>
            </svg>
          </div>
          <div v-if="frame.type === 'blood'" class="blood-splatter"></div>
          <div v-if="frame.type === 'eyes'" class="eyes-wide">
            <div class="eye"></div>
            <div class="eye"></div>
          </div>
          <div v-if="frame.type === 'hand'" class="shaking-hand"></div>
        </div>
      </div>
    </transition-group>

    <!-- 逃离进度条 -->
    <div class="escape-progress" v-if="isFlashing">
      <div class="progress-fill" :style="{ width: escapeProgress + '%' }"></div>
      <p class="escape-text">快速点击逃离！( {{ clickCount }} / 5 )</p>
    </div>

    <!-- 结束后进入下一场景 -->
    <transition name="fade-next">
      <div v-if="showNextHint" class="next-hint" @click.stop="emit('next')">
        <p>...</p>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const emit = defineEmits(['next'])

const isFlashing = ref(false)
const escapeProgress = ref(0)
const clickCount = ref(0)
const showNextHint = ref(false)
const activeFrames = ref([])
const frameId = ref(0)

const frameTypes = [
  { type: 'axe', bg: '#8b0000' },
  { type: 'blood', bg: '#4a0000' },
  { type: 'eyes', bg: '#1a0000' },
  { type: 'hand', bg: '#2a0000' },
  { type: 'axe', bg: '#8b0000' },
  { type: 'blood', bg: '#4a0000' },
]

let flashInterval = null

onMounted(() => {
  // 开始蒙太奇
  setTimeout(() => {
    startMontage()
  }, 500)
})

const startMontage = () => {
  isFlashing.value = true
  flashInterval = setInterval(() => {
    const randomFrame = frameTypes[Math.floor(Math.random() * frameTypes.length)]
    activeFrames.value.push({
      id: frameId.value++,
      ...randomFrame
    })

    // 保持最多3帧
    if (activeFrames.value.length > 3) {
      activeFrames.value.shift()
    }
  }, 150)
}

const attemptEscape = () => {
  if (!isFlashing.value) return

  clickCount.value++
  escapeProgress.value = (clickCount.value / 5) * 100

  if (clickCount.value >= 5) {
    clearInterval(flashInterval)
    isFlashing.value = false
    activeFrames.value = []
    showNextHint.value = true
  }
}
</script>

<style scoped>
.murder-montage-scene {
  width: 100%;
  height: 100vh;
  background: #000;
  position: relative;
  overflow: hidden;
  cursor: pointer;
}

.montage-frames {
  width: 100%;
  height: 100%;
  position: relative;
}

.montage-frame {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.frame-content {
  text-align: center;
}

/* === 斧头符号 === */
.axe-symbol svg {
  width: 200px;
  height: 300px;
  filter: drop-shadow(0 0 30px rgba(255, 0, 0, 0.8));
  animation: axeSwing 0.3s ease-in-out infinite alternate;
}

@keyframes axeSwing {
  from {
    transform: rotate(-30deg);
  }
  to {
    transform: rotate(30deg);
  }
}

/* === 血溅 === */
.blood-splatter {
  width: 300px;
  height: 300px;
  background: radial-gradient(ellipse at center, #ff0000 0%, #8b0000 40%, transparent 70%);
  border-radius: 50%;
  animation: bloodPulse 0.2s ease-in-out infinite;
}

@keyframes bloodPulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.8;
  }
  50% {
    transform: scale(1.2);
    opacity: 1;
  }
}

/* === 惊恐的眼睛 === */
.eyes-wide {
  display: flex;
  gap: 40px;
}

.eye {
  width: 60px;
  height: 60px;
  background: radial-gradient(circle at center, #fff 20%, #fff 25%, #000 26%);
  border-radius: 50%;
  animation: eyeTwitch 0.15s ease-in-out infinite;
}

@keyframes eyeTwitch {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

/* === 颤抖的手 === */
.shaking-hand {
  width: 100px;
  height: 150px;
  background: #d4c4a8;
  border-radius: 10px;
  animation: handShake 0.1s ease-in-out infinite;
}

@keyframes handShake {
  0%, 100% {
    transform: translateX(0) rotate(0deg);
  }
  25% {
    transform: translateX(-10px) rotate(-5deg);
  }
  75% {
    transform: translateX(10px) rotate(5deg);
  }
}

/* === 逃离进度 === */
.escape-progress {
  position: fixed;
  bottom: 10%;
  left: 50%;
  transform: translateX(-50%);
  width: 300px;
  z-index: 100;
}

.progress-fill {
  height: 4px;
  background: #8b0000;
  transition: width 0.2s ease;
  box-shadow: 0 0 10px rgba(139, 0, 0, 0.8);
}

.escape-text {
  text-align: center;
  margin-top: 10px;
  color: #fff;
  font-size: 1rem;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.8);
}

/* === 下一场景提示 === */
.next-hint {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  cursor: pointer;
}

.next-hint p {
  font-size: 3rem;
  color: #fff;
  animation: hintFade 2s ease-in-out infinite;
}

@keyframes hintFade {
  0%, 100% {
    opacity: 0.3;
  }
  50% {
    opacity: 1;
  }
}

/* === 闪帧过渡 === */
.flash-frame-enter-active,
.flash-frame-leave-active {
  transition: all 0.15s ease;
}

.flash-frame-enter-from {
  opacity: 0;
  transform: scale(1.2);
}

.flash-frame-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

/* === 淡入动画 === */
.fade-next-enter-active {
  transition: opacity 1s ease;
}

.fade-next-enter-from {
  opacity: 0;
}
</style>

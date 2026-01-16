<template>
  <div class="staircase-scene" @click="goDown">
    <div class="staircase-container">
      <!-- 第一人称楼梯视角 -->
      <div class="stairs-perspective">
        <!-- 楼梯层级 -->
        <div class="stairs" :style="{ transform: `translateY(${stairPosition}px)` }">
          <div v-for="n in 10" :key="n" class="stair" :class="{ 'is-current': n === currentStair }">
            <div class="stair-top"></div>
            <div class="stair-front"></div>
          </div>
        </div>

        <!-- 墙壁 -->
        <div class="walls">
          <div class="wall-left"></div>
          <div class="wall-right"></div>
        </div>

        <!-- 扭曲的影子 -->
        <div class="shadows" :class="{ 'is-active': showShadows }">
          <div class="shadow shadow-1"></div>
          <div class="shadow shadow-2"></div>
          <div class="shadow shadow-3"></div>
        </div>
      </div>

      <!-- 心跳视觉反馈 -->
      <div class="heartbeat-overlay" :class="{ 'is-pounding': isPounding }"></div>

      <!-- 提示文字 -->
      <div class="hint-text" v-if="currentStair < 10">
        <p>点击继续下楼</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const emit = defineEmits(['next'])

const stairPosition = ref(0)
const currentStair = ref(1)
const showShadows = ref(false)
const isPounding = ref(false)

const goDown = () => {
  if (currentStair.value < 10) {
    currentStair.value++
    stairPosition.value += 80

    // 每3层显示影子
    if (currentStair.value % 3 === 0) {
      showShadows.value = true
      setTimeout(() => {
        showShadows.value = false
      }, 1000)
    }

    // 心跳加速
    isPounding.value = true
    setTimeout(() => {
      isPounding.value = false
    }, 500)
  } else {
    // 完成，进入下一场景
    setTimeout(() => {
      emit('next')
    }, 500)
  }
}
</script>

<style scoped>
.staircase-scene {
  width: 100%;
  height: 100vh;
  background: linear-gradient(180deg, #1a1a1a 0%, #0d0d0d 100%);
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.staircase-container {
  width: 100%;
  height: 100%;
  position: relative;
}

/* === 楼梯透视 === */
.stairs-perspective {
  width: 100%;
  height: 100%;
  perspective: 800px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stairs {
  position: relative;
  width: 400px;
  height: 600px;
  transform-style: preserve-3d;
  transition: transform 0.5s ease;
}

.stair {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 300px;
  height: 60px;
  transform-style: preserve-3d;
  opacity: 0.3;
  transition: opacity 0.3s ease;
}

.stair:nth-child(1) { transform: translateX(-50%) translateY(0) translateZ(0px); }
.stair:nth-child(2) { transform: translateX(-50%) translateY(-60px) translateZ(50px); }
.stair:nth-child(3) { transform: translateX(-50%) translateY(-120px) translateZ(100px); }
.stair:nth-child(4) { transform: translateX(-50%) translateY(-180px) translateZ(150px); }
.stair:nth-child(5) { transform: translateX(-50%) translateY(-240px) translateZ(200px); }
.stair:nth-child(6) { transform: translateX(-50%) translateY(-300px) translateZ(250px); }
.stair:nth-child(7) { transform: translateX(-50%) translateY(-360px) translateZ(300px); }
.stair:nth-child(8) { transform: translateX(-50%) translateY(-420px) translateZ(350px); }
.stair:nth-child(9) { transform: translateX(-50%) translateY(-480px) translateZ(400px); }
.stair:nth-child(10) { transform: translateX(-50%) translateY(-540px) translateZ(450px); }

.stair.is-current {
  opacity: 0.8;
}

.stair-top {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, #2a2a2a 0%, #1a1a1a 100%);
  transform: rotateX(90deg);
  transform-origin: top;
  border: 1px solid #333;
}

.stair-front {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 30px;
  background: linear-gradient(180deg, #1a1a1a 0%, #0d0d0d 100%);
  border: 1px solid #333;
}

/* === 墙壁 === */
.walls {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.wall-left,
.wall-right {
  position: absolute;
  top: 0;
  width: 30%;
  height: 100%;
  background: linear-gradient(90deg, transparent 0%, rgba(0, 0, 0, 0.8) 100%);
}

.wall-left {
  left: 0;
}

.wall-right {
  right: 0;
  background: linear-gradient(-90deg, transparent 0%, rgba(0, 0, 0, 0.8) 100%);
}

/* === 影子 === */
.shadows {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.5s ease;
}

.shadows.is-active {
  opacity: 1;
}

.shadow {
  position: absolute;
  background: radial-gradient(ellipse at center, rgba(139, 0, 0, 0.3) 0%, transparent 70%);
  border-radius: 50%;
  animation: shadowDance 2s ease-in-out infinite;
}

.shadow-1 {
  width: 200px;
  height: 300px;
  top: 20%;
  left: 20%;
  animation-delay: 0s;
}

.shadow-2 {
  width: 150px;
  height: 250px;
  top: 40%;
  right: 25%;
  animation-delay: 0.5s;
}

.shadow-3 {
  width: 180px;
  height: 280px;
  bottom: 20%;
  left: 30%;
  animation-delay: 1s;
}

@keyframes shadowDance {
  0%, 100% {
    transform: scale(1) rotate(0deg);
    opacity: 0.3;
  }
  50% {
    transform: scale(1.2) rotate(10deg);
    opacity: 0.6;
  }
}

/* === 心跳视觉反馈 === */
.heartbeat-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(ellipse at center, transparent 0%, rgba(139, 0, 0, 0) 100%);
  pointer-events: none;
  transition: all 0.3s ease;
}

.heartbeat-overlay.is-pounding {
  background: radial-gradient(ellipse at center, rgba(139, 0, 0, 0.3) 0%, transparent 70%);
  animation: heartbeatPound 0.5s ease;
}

@keyframes heartbeatPound {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

/* === 提示文字 === */
.hint-text {
  position: absolute;
  bottom: 15%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  text-align: center;
  animation: hintPulse 2s ease-in-out infinite;
}

.hint-text p {
  font-size: 1.2rem;
  color: #fff;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.8);
  margin: 0;
}

@keyframes hintPulse {
  0%, 100% {
    opacity: 0.7;
  }
  50% {
    opacity: 1;
  }
}

/* === 响应式设计 === */
@media (max-width: 768px) {
  .stairs {
    width: 280px;
  }

  .stair {
    width: 220px;
  }
}
</style>

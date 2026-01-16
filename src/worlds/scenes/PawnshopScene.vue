<template>
  <div class="pawnshop-scene">
    <div class="pawnshop-room">
      <!-- 货架 -->
      <div class="shelves">
        <div class="shelf shelf-1">
          <div class="shelf-item"></div>
          <div class="shelf-item"></div>
          <div class="shelf-item"></div>
        </div>
        <div class="shelf shelf-2">
          <div class="shelf-item"></div>
          <div class="shelf-item"></div>
        </div>
      </div>

      <!-- 老板娘背影 -->
      <div class="pawnbroker">
        <div class="figure-body-back"></div>
        <div class="figure-head-back"></div>
        <div class="counting-action">
          <div class="coin"></div>
          <div class="coin"></div>
        </div>
      </div>

      <!-- 桌子 -->
      <div class="table">
        <div class="table-surface"></div>
      </div>

      <!-- 斧头（核心交互元素） -->
      <div
        class="axe"
        @mouseenter="onAxeHover"
        @mouseleave="onAxeLeave"
        @click="onAxeClick"
        :class="{ 'is-hovered': isAxeHovered, 'is-shaking': isAxeShaking }"
      >
        <div class="axe-handle"></div>
        <div class="axe-blade"></div>
        <div class="axe-glow" v-if="isAxeHovered"></div>
        <div class="axe-prompt" v-if="!isAxeHovered && !hasClickedAxe">
          <p>...</p>
        </div>
      </div>

      <!-- 红色闪烁效果 -->
      <div class="red-flash" :class="{ 'is-active': isAxeHovered || isAxeShaking }"></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['next'])

const isAxeHovered = ref(false)
const isAxeShaking = ref(false)
const hasClickedAxe = ref(false)

const onAxeHover = () => {
  isAxeHovered.value = true
}

const onAxeLeave = () => {
  if (!hasClickedAxe.value) {
    isAxeHovered.value = false
  }
}

const onAxeClick = () => {
  hasClickedAxe.value = true
  isAxeShaking.value = true

  // 震动2秒后进入下一场景
  setTimeout(() => {
    emit('next')
  }, 2000)
}
</script>

<style scoped>
.pawnshop-scene {
  width: 100%;
  height: 100vh;
  background: linear-gradient(180deg, #8b7355 0%, #6b5344 100%);
  position: relative;
  overflow: hidden;
}

.pawnshop-room {
  width: 100%;
  height: 100%;
  position: relative;
}

/* === 货架 === */
.shelves {
  position: absolute;
  left: 10%;
  top: 20%;
  width: 250px;
  height: 60%;
}

.shelf {
  width: 100%;
  height: 150px;
  background: linear-gradient(180deg, #5d4e37 0%, #4a3f2f 100%);
  margin-bottom: 50px;
  border-radius: 3px;
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  padding: 0 20px 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.shelf-item {
  width: 40px;
  height: 60px;
  background: linear-gradient(180deg, #8b7355 0%, #6b5344 100%);
  border-radius: 3px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

/* === 老板娘 === */
.pawnbroker {
  position: absolute;
  right: 25%;
  bottom: 25%;
  width: 100px;
  height: 180px;
}

.figure-body-back {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 140px;
  background: linear-gradient(180deg, #2c3e50 0%, #1a252f 100%);
  border-radius: 10px 10px 0 0;
}

.figure-head-back {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 45px;
  background: #d4c4a8;
  border-radius: 50% 50% 45% 45%;
}

.counting-action {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 5px;
}

.coin {
  width: 12px;
  height: 12px;
  background: #d4af37;
  border-radius: 50%;
  animation: coinBounce 1s ease-in-out infinite;
}

.coin:nth-child(2) {
  animation-delay: 0.5s;
}

@keyframes coinBounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

/* === 桌子 === */
.table {
  position: absolute;
  right: 15%;
  bottom: 20%;
  width: 200px;
  height: 80px;
}

.table-surface {
  width: 100%;
  height: 15px;
  background: #8b7355;
  border-radius: 3px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

/* === 斧头 === */
.axe {
  position: absolute;
  right: 18%;
  bottom: 30%;
  width: 80px;
  height: 200px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.axe.is-shaking {
  animation: axeShake 0.1s ease-in-out infinite;
}

@keyframes axeShake {
  0%, 100% {
    transform: translateX(0) rotate(0deg);
  }
  25% {
    transform: translateX(-5px) rotate(-2deg);
  }
  75% {
    transform: translateX(5px) rotate(2deg);
  }
}

.axe-handle {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 15px;
  height: 150px;
  background: linear-gradient(90deg, #5d4e37 0%, #8b7355 50%, #5d4e37 100%);
  border-radius: 3px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.axe-blade {
  position: absolute;
  top: 120px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 50px;
  background: linear-gradient(135deg, #a0a0a0 0%, #707070 100%);
  clip-path: polygon(20% 0%, 80% 0%, 100% 50%, 80% 100%, 20% 100%, 0% 50%);
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.4);
}

.axe-glow {
  position: absolute;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 100px;
  background: radial-gradient(ellipse at center, rgba(139, 0, 0, 0.6) 0%, transparent 70%);
  border-radius: 50%;
  animation: glowPulse 1s ease-in-out infinite;
}

@keyframes glowPulse {
  0%, 100% {
    transform: translateX(-50%) scale(1);
    opacity: 0.6;
  }
  50% {
    transform: translateX(-50%) scale(1.2);
    opacity: 1;
  }
}

.axe-prompt {
  position: absolute;
  bottom: -30px;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
}

.axe-prompt p {
  font-size: 2rem;
  color: #fff;
  margin: 0;
  animation: ellipsisPulse 2s ease-in-out infinite;
}

@keyframes ellipsisPulse {
  0%, 100% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
}

/* === 红色闪烁 === */
.red-flash {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(ellipse at center, transparent 0%, transparent 100%);
  pointer-events: none;
  transition: all 0.3s ease;
}

.red-flash.is-active {
  background: radial-gradient(ellipse at center, rgba(139, 0, 0, 0.5) 0%, transparent 70%);
  animation: redFlashPulse 0.5s ease-in-out infinite;
}

@keyframes redFlashPulse {
  0%, 100% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.8;
  }
}

/* === 响应式设计 === */
@media (max-width: 768px) {
  .shelves {
    transform: scale(0.7);
    left: 5%;
  }

  .pawnbroker {
    transform: scale(0.8);
    right: 10%;
  }

  .table {
    transform: scale(0.8);
    right: 5%;
  }

  .axe {
    transform: scale(0.7);
    right: 8%;
  }
}
</style>

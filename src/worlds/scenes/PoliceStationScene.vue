<template>
  <div class="police-station-scene" @click="emit('next')">
    <div class="office">
      <!-- 明亮的窗户 -->
      <div class="windows">
        <div class="window-pane"></div>
        <div class="window-pane"></div>
      </div>

      <!-- 桌子 -->
      <div class="desk">
        <div class="desk-surface"></div>
        <!-- 茶杯（核心元素） -->
        <div class="teacup" @mouseenter="showFace = true" @mouseleave="showFace = false">
          <div class="cup-body"></div>
          <div class="cup-handle"></div>
          <!-- 蒸汽形成的面孔 -->
          <div class="steam-face" :class="{ 'is-visible': showFace }">
            <div class="face-eyes">
              <div class="eye"></div>
              <div class="eye"></div>
            </div>
            <div class="face-smile"></div>
          </div>
        </div>
      </div>

      <!-- 波尔菲里（轮廓） -->
      <div class="porfiry">
        <div class="chair"></div>
        <div class="figure"></div>
      </div>

      <!-- 对话框 -->
      <div class="dialogue-box">
        <p class="dialogue-text">"我想你知道我们来这里的原因..."</p>
        <p class="dialogue-subtext">— 波尔菲里·彼得罗维奇</p>
      </div>

      <!-- 点击提示 -->
      <div class="click-hint">
        <p>点击继续</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['next'])
const showFace = ref(false)
</script>

<style scoped>
.police-station-scene {
  width: 100%;
  height: 100vh;
  background: linear-gradient(180deg, #fafafa 0%, #f0f0f0 100%);
  position: relative;
  overflow: hidden;
  cursor: pointer;
}

.office {
  width: 100%;
  height: 100%;
  position: relative;
}

/* === 窗户（过度曝光的明亮感） === */
.windows {
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 30px;
}

.window-pane {
  width: 200px;
  height: 300px;
  background: linear-gradient(180deg, #fff 0%, #e8e8e8 100%);
  border: 15px solid #d0d0d0;
  box-shadow:
    0 0 50px rgba(255, 255, 255, 0.8),
    inset 0 0 30px rgba(255, 255, 255, 0.5);
}

/* === 桌子 === */
.desk {
  position: absolute;
  bottom: 30%;
  left: 50%;
  transform: translateX(-50%);
  width: 500px;
  height: 20px;
}

.desk-surface {
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, #c9a66b 0%, #a08050 100%);
  border-radius: 3px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
}

/* === 茶杯 === */
.teacup {
  position: absolute;
  top: -60px;
  left: 60%;
  width: 60px;
  height: 50px;
}

.cup-body {
  width: 50px;
  height: 40px;
  background: linear-gradient(180deg, #fff 0%, #e0e0e0 100%);
  border-radius: 0 0 25px 25px;
  position: relative;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
}

.cup-handle {
  position: absolute;
  top: 5px;
  right: -12px;
  width: 15px;
  height: 25px;
  border: 3px solid #e0e0e0;
  border-left: none;
  border-radius: 0 10px 10px 0;
}

/* === 蒸汽面孔（心理压力视觉化） === */
.steam-face {
  position: absolute;
  top: -80px;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 80px;
  opacity: 0;
  transition: opacity 0.5s ease;
}

.steam-face.is-visible {
  opacity: 0.6;
  animation: steamRise 3s ease-in-out infinite;
}

@keyframes steamRise {
  0%, 100% {
    transform: translateX(-50%) translateY(0) scale(1);
  }
  50% {
    transform: translateX(-50%) translateY(-20px) scale(1.1);
  }
}

.face-eyes {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 10px;
}

.face-eyes .eye {
  width: 15px;
  height: 15px;
  background: #2c3e50;
  border-radius: 50%;
}

.face-smile {
  width: 40px;
  height: 20px;
  border: 3px solid #2c3e50;
  border-top: none;
  border-radius: 0 0 20px 20px;
  margin: 0 auto;
}

/* === 波尔菲里 === */
.porfiry {
  position: absolute;
  bottom: 25%;
  right: 25%;
  width: 120px;
  height: 200px;
}

.chair {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 60px;
  background: #5d4e37;
  border-radius: 5px;
}

.figure {
  position: absolute;
  bottom: 60px;
  width: 100%;
  height: 140px;
  background: linear-gradient(180deg, #2c3e50 0%, #1a252f 100%);
  border-radius: 10px 10px 0 0;
}

/* === 对话框 === */
.dialogue-box {
  position: absolute;
  bottom: 15%;
  left: 50%;
  transform: translateX(-50%);
  max-width: 600px;
  text-align: center;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
}

.dialogue-text {
  font-size: 1.3rem;
  color: #1a1a1a;
  margin-bottom: 0.5rem;
  font-style: italic;
}

.dialogue-subtext {
  font-size: 0.9rem;
  color: #666;
  margin: 0;
}

/* === 点击提示 === */
.click-hint {
  position: absolute;
  bottom: 5%;
  left: 50%;
  transform: translateX(-50%);
  animation: hintPulse 2s ease-in-out infinite;
}

.click-hint p {
  font-size: 1rem;
  color: #666;
  margin: 0;
}

@keyframes hintPulse {
  0%, 100% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
}

/* === 响应式设计 === */
@media (max-width: 768px) {
  .windows {
    transform: translateX(-50%) scale(0.7);
  }

  .desk {
    transform: translateX(-50%) scale(0.8);
    width: 350px;
  }

  .dialogue-box {
    transform: translateX(-50%) scale(0.9);
    max-width: 90%;
  }

  .porfiry {
    transform: scale(0.8);
    right: 15%;
  }
}
</style>

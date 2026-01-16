<template>
  <div class="sonya-scene">
    <div class="room">
      <!-- 烛光背景 -->
      <div class="candlelight-glow"></div>

      <!-- 圣像画 -->
      <div class="icon-corner">
        <div class="icon-frame">
          <div class="icon-image">
            <svg viewBox="0 0 100 120">
              <circle cx="50" cy="35" r="20" fill="#d4af37"/>
              <rect x="30" y="55" width="40" height="50" fill="#d4af37"/>
            </svg>
          </div>
        </div>
      </div>

      <!-- 烛台 -->
      <div class="candle">
        <div class="flame"></div>
        <div class="candle-body"></div>
        <div class="candle-holder"></div>
      </div>

      <!-- 十字架（核心交互元素） -->
      <div
        class="cross-container"
        @click="onCrossClick"
        :class="{ 'is-kneeling': isKneeling }"
      >
        <div class="cross">
          <div class="cross-vertical"></div>
          <div class="cross-horizontal"></div>
        </div>
        <div class="cross-prompt" v-if="!isKneeling">
          <p>点击十字架</p>
        </div>
      </div>

      <!-- 索尼娅（轮廓） -->
      <div class="sonya">
        <div class="figure"></div>
        <div class="kerchief"></div>
      </div>

      <!-- 跪下后的圣经文字 -->
      <transition name="fade-bible">
        <div v-if="isKneeling" class="bible-text">
          <p class="bible-quote">"拉撒路出来！"</p>
          <p class="bible-ref">— 约翰福音 11:43</p>
          <p class="bible-context">接受苦难...通过苦难获得救赎...</p>
          <button class="continue-btn" @click="emit('next')">继续</button>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['next'])
const isKneeling = ref(false)

const onCrossClick = () => {
  isKneeling.value = true
}
</script>

<style scoped>
.sonya-scene {
  width: 100%;
  height: 100vh;
  background: linear-gradient(180deg, #ffa500 0%, #ff8c00 100%);
  position: relative;
  overflow: hidden;
}

.room {
  width: 100%;
  height: 100%;
  position: relative;
}

/* === 烛光背景 === */
.candlelight-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: 80%;
  background: radial-gradient(ellipse at center, rgba(255, 215, 0, 0.3) 0%, transparent 70%);
  animation: glowPulse 3s ease-in-out infinite;
}

@keyframes glowPulse {
  0%, 100% {
    opacity: 0.5;
    transform: translate(-50%, -50%) scale(1);
  }
  50% {
    opacity: 0.8;
    transform: translate(-50%, -50%) scale(1.1);
  }
}

/* === 圣像画 === */
.icon-corner {
  position: absolute;
  top: 15%;
  right: 15%;
  width: 120px;
  height: 150px;
}

.icon-frame {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #d4af37 0%, #aa8a2e 100%);
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.icon-image {
  width: 100%;
  height: 100%;
  background: #f4e4bc;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-image svg {
  width: 70%;
  height: 70%;
  opacity: 0.7;
}

/* === 烛台 === */
.candle {
  position: absolute;
  top: 20%;
  left: 20%;
  width: 60px;
  height: 120px;
}

.flame {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 30px;
  background: radial-gradient(ellipse at bottom, #fff 0%, #ffa500 50%, transparent 100%);
  border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
  animation: flameFlicker 0.5s ease-in-out infinite alternate;
}

@keyframes flameFlicker {
  0% {
    transform: translateX(-50%) scale(1) rotate(-2deg);
  }
  100% {
    transform: translateX(-50%) scale(1.1) rotate(2deg);
  }
}

.candle-body {
  position: absolute;
  top: 25px;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 60px;
  background: linear-gradient(90deg, #f0e68c 0%, #fff 50%, #f0e68c 100%);
  border-radius: 3px;
}

.candle-holder {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 50px;
  height: 35px;
  background: linear-gradient(180deg, #d4af37 0%, #aa8a2e 100%);
  border-radius: 0 0 25px 25px;
}

/* === 十字架 === */
.cross-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 150px;
  cursor: pointer;
  transition: all 0.5s ease;
}

.cross-container.is-kneeling {
  transform: translate(-50%, 0) scale(0.7);
  opacity: 0.3;
}

.cross {
  width: 100%;
  height: 100%;
  position: relative;
}

.cross-vertical {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 15px;
  height: 100%;
  background: linear-gradient(90deg, #d4af37 0%, #aa8a2e 100%);
  border-radius: 3px;
  box-shadow: 0 0 20px rgba(212, 175, 55, 0.5);
}

.cross-horizontal {
  position: absolute;
  top: 25%;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: 15px;
  background: linear-gradient(180deg, #d4af37 0%, #aa8a2e 100%);
  border-radius: 3px;
  box-shadow: 0 0 20px rgba(212, 175, 55, 0.5);
}

.cross-prompt {
  position: absolute;
  bottom: -40px;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  animation: promptBounce 2s ease-in-out infinite;
}

.cross-prompt p {
  font-size: 0.9rem;
  color: #fff;
  margin: 0;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
}

@keyframes promptBounce {
  0%, 100% {
    opacity: 0.7;
    transform: translateX(-50%) translateY(0);
  }
  50% {
    opacity: 1;
    transform: translateX(-50%) translateY(-5px);
  }
}

/* === 索尼娅 === */
.sonya {
  position: absolute;
  bottom: 20%;
  right: 30%;
  width: 80px;
  height: 150px;
}

.figure {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 130px;
  background: linear-gradient(180deg, #4a4a4a 0%, #2c2c2c 100%);
  border-radius: 10px 10px 0 0;
}

.kerchief {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 50px;
  height: 30px;
  background: #fff;
  border-radius: 50% 50% 0 0;
}

/* === 圣经文字 === */
.bible-text {
  position: absolute;
  bottom: 20%;
  left: 50%;
  transform: translateX(-50%);
  max-width: 600px;
  text-align: center;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
}

.bible-quote {
  font-size: 1.8rem;
  color: #1a1a1a;
  font-weight: 600;
  margin-bottom: 1rem;
  font-style: italic;
}

.bible-ref {
  font-size: 1rem;
  color: #666;
  margin-bottom: 1.5rem;
}

.bible-context {
  font-size: 1.1rem;
  color: #555;
  margin-bottom: 2rem;
  line-height: 1.8;
}

.continue-btn {
  padding: 0.75rem 2rem;
  background: #d4af37;
  border: none;
  border-radius: 8px;
  color: #fff;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.continue-btn:hover {
  background: #aa8a2e;
  transform: scale(1.05);
}

/* === 淡入动画 === */
.fade-bible-enter-active {
  transition: opacity 1s ease;
}

.fade-bible-enter-from {
  opacity: 0;
}

/* === 响应式设计 === */
@media (max-width: 768px) {
  .icon-corner {
    transform: scale(0.7);
    right: 5%;
  }

  .candle {
    transform: scale(0.8);
    left: 10%;
  }

  .cross-container {
    transform: translate(-50%, -50%) scale(0.8);
  }

  .sonya {
    transform: scale(0.8);
    right: 15%;
  }

  .bible-text {
    transform: translateX(-50%) scale(0.9);
    max-width: 90%;
    padding: 1.5rem;
  }

  .bible-quote {
    font-size: 1.4rem;
  }
}
</style>

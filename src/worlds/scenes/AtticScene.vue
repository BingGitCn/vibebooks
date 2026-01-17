<template>
  <div class="attic-scene">
    <div class="attic-room">
      <!-- 黄色壁纸背景 -->
      <div class="wallpaper"></div>

      <!-- 低天花板 -->
      <div class="ceiling">
        <div class="ceiling-texture"></div>
      </div>

      <!-- 破旧的沙发 -->
      <div class="sofa">
        <div class="sofa-back"></div>
        <div class="sofa-seat"></div>
        <div class="sofa-legs"></div>
      </div>

      <!-- 小桌子 -->
      <div class="table">
        <div class="table-top"></div>
        <div class="table-leg"></div>
      </div>

      <!-- 窗户（可交互） -->
      <div class="window" @click="showMonologue = true" :class="{ 'is-active': showMonologue }">
        <div class="window-frame"></div>
        <div class="window-glass"></div>
        <div class="window-light"></div>
        <div class="window-prompt" v-if="!showMonologue">
          <p>点击窗户</p>
        </div>
      </div>

      <!-- 拉斯科尔尼科夫踱步动画 -->
      <div class="raskolnikov">
        <div class="figure-shadow"></div>
        <div class="figure-body" :class="{ 'is-walking': isWalking }">
          <div class="head"></div>
          <div class="torso"></div>
          <div class="legs">
            <div class="leg left" :class="{ 'is-moving': isWalking }"></div>
            <div class="leg right" :class="{ 'is-moving': isWalking }"></div>
          </div>
        </div>
      </div>

      <!-- 内心独白模态框 -->
      <transition name="monologue-fade">
        <div v-if="showMonologue" class="monologue-overlay" @click="showMonologue = false">
          <div class="monologue-content" @click.stop>
            <button class="monologue-close" @click="showMonologue = false">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
            <div class="monologue-text">
              <p class="monologue-quote">"我是个颤抖的生物，还是我有权利..."</p>
              <p class="monologue-translation">— "Am I a trembling creature or have I the right..."</p>
              <p class="monologue-context">拉斯科尔尼科夫站在窗前，凝视着圣彼得堡的街道。这个想法在他脑海中盘旋，像一把斧头悬在空中。</p>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const showMonologue = ref(false)
const isWalking = ref(true)

onMounted(() => {
  // 模拟踱步：来回走动
  setInterval(() => {
    isWalking.value = !isWalking.value
  }, 4000)
})
</script>

<style scoped>
.attic-scene {
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
  perspective: 1000px;
}

.attic-room {
  width: 100%;
  height: 100%;
  position: relative;
  background: linear-gradient(180deg, #f4e4bc 0%, #e8d4a8 100%);
}

/* === 黄色壁纸 === */
.wallpaper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background:
    repeating-linear-gradient(
      90deg,
      transparent,
      transparent 100px,
      rgba(139, 115, 85, 0.1) 100px,
      rgba(139, 115, 85, 0.1) 102px
    ),
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 100px,
      rgba(139, 115, 85, 0.1) 100px,
      rgba(139, 115, 85, 0.1) 102px
    );
  opacity: 0.6;
}

/* === 低天花板（压迫感） === */
.ceiling {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 35%;
  background: linear-gradient(180deg, #d4c4a8 0%, #e8d4a8 100%);
  transform: perspective(500px) rotateX(10deg);
  transform-origin: top;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.ceiling-texture {
  width: 100%;
  height: 100%;
  background-image:
    repeating-linear-gradient(
      45deg,
      transparent,
      transparent 10px,
      rgba(0, 0, 0, 0.03) 10px,
      rgba(0, 0, 0, 0.03) 11px
    );
}

/* === 破旧的沙发 === */
.sofa {
  position: absolute;
  bottom: 25%;
  left: 15%;
  width: 200px;
  height: 80px;
}

.sofa-back {
  position: absolute;
  bottom: 40px;
  width: 100%;
  height: 50px;
  background: linear-gradient(180deg, #5d4e37 0%, #4a3f2f 100%);
  border-radius: 5px 5px 0 0;
  box-shadow: inset 0 -5px 10px rgba(0, 0, 0, 0.3);
}

.sofa-seat {
  position: absolute;
  bottom: 20px;
  width: 100%;
  height: 30px;
  background: linear-gradient(180deg, #6b5a45 0%, #5d4e37 100%);
  border-radius: 3px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.sofa-legs {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 20px;
}

.sofa-legs::before,
.sofa-legs::after {
  content: '';
  position: absolute;
  bottom: 0;
  width: 15px;
  height: 20px;
  background: #3d3426;
}

.sofa-legs::before {
  left: 20px;
}

.sofa-legs::after {
  right: 20px;
}

/* === 小桌子 === */
.table {
  position: absolute;
  bottom: 25%;
  right: 20%;
  width: 100px;
  height: 60px;
}

.table-top {
  position: absolute;
  top: 0;
  width: 100%;
  height: 10px;
  background: #8b7355;
  border-radius: 2px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
}

.table-leg {
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 8px;
  height: 50px;
  background: #6b5344;
}

/* === 窗户（交互元素） === */
.window {
  position: absolute;
  top: 20%;
  right: 10%;
  width: 150px;
  height: 180px;
  cursor: pointer;
  transition: all 0.4s ease;
}

.window:hover {
  transform: scale(1.05);
}

.window.is-active {
  transform: scale(1.1);
}

.window-frame {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 8px solid #5d4e37;
  box-sizing: border-box;
  box-shadow:
    inset 0 0 20px rgba(0, 0, 0, 0.3),
    0 10px 30px rgba(0, 0, 0, 0.3);
}

.window-glass {
  position: absolute;
  top: 8px;
  left: 8px;
  right: 8px;
  bottom: 8px;
  background: linear-gradient(180deg, #87ceeb 0%, #b0e0e6 100%);
  opacity: 0.7;
}

.window-light {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: 60%;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, transparent 100%);
  animation: lightPulse 4s ease-in-out infinite;
}

@keyframes lightPulse {
  0%, 100% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.6;
  }
}

.window-prompt {
  position: absolute;
  bottom: -30px;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  animation: promptBounce 2s ease-in-out infinite;
}

.window-prompt p {
  font-size: 0.85rem;
  color: #5d4e37;
  font-style: italic;
  margin: 0;
}

@keyframes promptBounce {
  0%, 100% {
    opacity: 0.6;
    transform: translateX(-50%) translateY(0);
  }
  50% {
    opacity: 1;
    transform: translateX(-50%) translateY(-5px);
  }
}

/* === 拉斯科尔尼科夫 === */
.raskolnikov {
  position: absolute;
  bottom: 20%;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 150px;
}

.figure-shadow {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 20px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 50%;
  filter: blur(5px);
}

.figure-body {
  position: relative;
  width: 100%;
  height: 100%;
  animation: pace 8s ease-in-out infinite;
}

.figure-body.is-walking {
  animation: paceWalking 8s ease-in-out infinite;
}

@keyframes pace {
  0%, 100% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(100px);
  }
}

@keyframes paceWalking {
  0%, 100% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(100px);
  }
}

.head {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 30px;
  height: 35px;
  background: #d4c4a8;
  border-radius: 50% 50% 45% 45%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.torso {
  position: absolute;
  top: 35px;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 60px;
  background: linear-gradient(180deg, #2c3e50 0%, #1a252f 100%);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.legs {
  position: absolute;
  top: 95px;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 55px;
}

.leg {
  position: absolute;
  bottom: 0;
  width: 12px;
  height: 55px;
  background: #1a252f;
  border-radius: 0 0 4px 4px;
  transition: transform 0.3s ease;
}

.leg.left {
  left: 5px;
}

.leg.right {
  right: 5px;
}

.leg.is-moving {
  animation: legMove 0.8s ease-in-out infinite alternate;
}

.leg.left.is-moving {
  animation-delay: 0s;
}

.leg.right.is-moving {
  animation-delay: 0.4s;
}

@keyframes legMove {
  from {
    transform: rotate(-15deg);
  }
  to {
    transform: rotate(15deg);
  }
}

/* === 内心独白模态框 === */
.monologue-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
}

.monologue-content {
  max-width: 700px;
  width: 100%;
  background: #fff;
  border-radius: 12px;
  padding: 3rem;
  position: relative;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
}

.monologue-close {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.05);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  color: #666;
}

.monologue-close:hover {
  background: rgba(0, 0, 0, 0.1);
  color: #1a1a1a;
  transform: rotate(90deg);
}

.monologue-text {
  text-align: center;
}

.monologue-quote {
  font-size: clamp(1.5rem, 4vw, 2rem);
  line-height: 1.8;
  color: #1a1a1a;
  font-weight: 600;
  margin-bottom: 1rem;
  font-style: italic;
}

.monologue-translation {
  font-size: 1rem;
  line-height: 1.6;
  color: #666;
  margin-bottom: 2rem;
  font-style: italic;
}

.monologue-context {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #555;
}

/* === 转场动画 === */
.monologue-fade-enter-active,
.monologue-fade-leave-active {
  transition: opacity 0.4s ease;
}

.monologue-fade-enter-from,
.monologue-fade-leave-to {
  opacity: 0;
}

/* === 响应式设计 === */
@media (max-width: 768px) {
  .ceiling {
    height: 30%;
  }

  .sofa {
    transform: scale(0.7);
    left: 5%;
  }

  .table {
    transform: scale(0.7);
    right: 5%;
  }

  .window {
    transform: scale(0.8);
    right: 5%;
  }

  .raskolnikov {
    transform: translateX(-50%) scale(0.8);
  }

  .monologue-content {
    padding: 2rem;
  }

  .monologue-quote {
    font-size: 1.3rem;
  }
}
</style>

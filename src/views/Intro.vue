<template>
  <div class="intro-container">
    <!-- 噪点纹理层 -->
    <div class="noise-texture"></div>

    <!-- 水平线纹理层 -->
    <div class="lines-texture"></div>

    <!-- 黑色方块点阵 (替代圆形星星) -->
    <div class="dot-matrix">
      <div
        v-for="dot in dots"
        :key="dot.id"
        class="dot"
        :style="{
          left: dot.x + '%',
          top: dot.y + '%',
          opacity: dot.currentAlpha,
          animationDelay: dot.delay + 's'
        }"
      ></div>
    </div>

    <!-- 几何线条装饰 -->
    <div class="geometric-lines">
      <div class="line line-1"></div>
      <div class="line line-2"></div>
      <div class="line line-3"></div>
      <div class="square-deco square-1"></div>
      <div class="square-deco square-2"></div>
    </div>

    <!-- 中心内容 -->
    <div class="center-content">
      <div class="decorative-ruler">
        <div class="thick-line"></div>
        <div class="small-square"></div>
      </div>

      <h1 class="main-title">每一本书，都值得被探索。</h1>

      <p class="subtitle">Where stories breathe</p>

      <button class="enter-btn" @click="enterUniverse">
        Enter the Library
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const dots = ref([])

// 生成黑色方块点阵
function initDots() {
  const dotCount = 50
  const newDots = []

  for (let i = 0; i < dotCount; i++) {
    newDots.push({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      baseAlpha: Math.random() * 0.15 + 0.05,
      currentAlpha: 0,
      delay: Math.random() * 3,
      duration: Math.random() * 2 + 2
    })
  }

  dots.value = newDots

  // 启动闪烁动画
  requestAnimationFrame(animateDots)
}

function animateDots() {
  const time = Date.now() / 1000

  dots.value.forEach(dot => {
    const phase = Math.sin(time * (1 / dot.duration) + dot.delay)
    dot.currentAlpha = dot.baseAlpha + phase * 0.05
  })

  requestAnimationFrame(animateDots)
}

const enterUniverse = () => {
  router.push('/universe')
}

onMounted(() => {
  initDots()
})
</script>

<style scoped>
/* ========== 容器 ========== */
.intro-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  background: #FFFFFF;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* ========== 噪点纹理 (全局纸张质感) ========== */
.noise-texture {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  opacity: 0.02;
}

/* ========== 水平线纹理 (核心视觉元素) ========== */
.lines-texture {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 2;
  background-image: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 1px,
    #000 1px,
    #000 2px
  );
  background-size: 100% 4px;
  opacity: 0.015;
}

/* ========== 黑色方块点阵 ========== */
.dot-matrix {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 3;
}

.dot {
  position: absolute;
  width: 3px;
  height: 3px;
  background: #000000;
  transition: opacity 0.1s;
}

/* ========== 几何线条装饰 ========== */
.geometric-lines {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 4;
}

.line {
  position: absolute;
  background: #000000;
  opacity: 0.08;
}

.line-1 {
  width: 1px;
  height: 200px;
  top: 10%;
  left: 15%;
  transform: rotate(15deg);
}

.line-2 {
  width: 150px;
  height: 1px;
  top: 70%;
  right: 20%;
}

.line-3 {
  width: 1px;
  height: 150px;
  bottom: 15%;
  right: 25%;
  transform: rotate(-10deg);
}

.square-deco {
  position: absolute;
  border: 1px solid #000000;
  opacity: 0.06;
}

.square-1 {
  width: 40px;
  height: 40px;
  top: 20%;
  right: 15%;
}

.square-2 {
  width: 25px;
  height: 25px;
  bottom: 25%;
  left: 12%;
}

/* ========== 中心内容 ========== */
.center-content {
  position: relative;
  z-index: 10;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 2rem;
}

/* ========== 装饰性标尺 ========== */
.decorative-ruler {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.thick-line {
  width: 80px;
  height: 4px;
  background: #000000;
}

.small-square {
  width: 8px;
  height: 8px;
  border: 2px solid #000000;
}

/* ========== 主标题 ========== */
.main-title {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(4rem, 12vw, 10rem);
  font-weight: 400;
  line-height: 1;
  letter-spacing: -0.03em;
  color: #000000;
  margin-bottom: 1.5rem;
  text-align: center;
  max-width: 90vw;
}

/* ========== 副标题 ========== */
.subtitle {
  font-family: 'Source Serif 4', Georgia, serif;
  font-size: clamp(1rem, 2vw, 1.5rem);
  font-weight: 400;
  font-style: italic;
  letter-spacing: 0.15em;
  color: #525252;
  margin-bottom: 3rem;
}

/* ========== 按钮 ========== */
.enter-btn {
  position: relative;
  padding: 1rem 2.5rem;
  background: #000000;
  border: none;
  color: #FFFFFF;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.1s;
}

.enter-btn:hover {
  background: #FFFFFF;
  color: #000000;
  box-shadow: inset 0 0 0 2px #000000;
}

.enter-btn:focus-visible {
  outline: 3px solid #000000;
  outline-offset: 3px;
}

/* ========== 移动端适配 ========== */
@media (max-width: 768px) {
  .main-title {
    font-size: clamp(3rem, 15vw, 5rem);
  }

  .subtitle {
    font-size: 1rem;
    margin-bottom: 2rem;
  }

  .enter-btn {
    padding: 0.875rem 2rem;
    font-size: 0.75rem;
  }

  .line,
  .square-deco {
    display: none;
  }
}
</style>

<template>
  <div class="crime-and-punishment-world">
    <!-- 开场文字 -->
    <transition name="fade-in">
      <div v-if="showIntro" class="intro-text">
        <h1 class="intro-title">罪与罚</h1>
        <p class="intro-subtitle">这不是一个故事</p>
        <p class="intro-subtitle">这是一场灵魂的审判</p>
      </div>
    </transition>

    <!-- 主画布（抽象视觉） -->
    <canvas ref="canvas" class="main-canvas"></canvas>

    <!-- 章节文字层 -->
    <transition name="text-fade">
      <div v-if="currentText" class="chapter-text">
        <p class="text-content" v-html="currentText"></p>
      </div>
    </transition>

    <!-- 继续/结束按钮 -->
    <transition name="btn-fade">
      <button
        v-if="showContinueBtn"
        @click="nextChapter"
        class="continue-btn"
        :class="{ 'is-end': isLastChapter }"
      >
        {{ isLastChapter ? '结束' : '继续' }}
      </button>
    </transition>

    <!-- 结尾文字 -->
    <transition name="fade-in">
      <div v-if="showOutro" class="outro-text">
        <p class="outro-line">罪与罚，不在外面</p>
        <p class="outro-line">而在里面</p>
        <p class="outro-author">陀思妥耶夫斯基</p>
        <p class="outro-year">1866</p>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const canvas = ref(null)

// 状态管理
const currentChapter = ref(0)
const showIntro = ref(true)
const showOutro = ref(false)
const showContinueBtn = ref(false)
const currentText = ref('')

// 动画控制
let animationFrame = null
let chapterTimeout = null
let canvasCtx = null
let animationStartTime = 0

// 章节配置
const chapters = [
  { name: '第一章：房间', duration: 15000, hasContinueBtn: false },
  { name: '第二章：理论', duration: 20000, hasContinueBtn: true },
  { name: '第三章：斧头', duration: 10000, hasContinueBtn: false },
  { name: '第四章：追逐', duration: 15000, hasContinueBtn: true },
  { name: '第五章：崩溃', duration: 20000, hasContinueBtn: false },
  { name: '第六章：相遇', duration: 15000, hasContinueBtn: true },
  { name: '第七章：复活', duration: 20000, hasContinueBtn: true }
]

// 计算属性
const isLastChapter = ref(false)

// 方法
const nextChapter = () => {
  if (isLastChapter.value) {
    // 结束体验
    endExperience()
  } else {
    currentChapter.value++
    startChapter()
  }
}

const startChapter = () => {
  // 清理之前的动画
  if (animationFrame) {
    cancelAnimationFrame(animationFrame)
  }
  if (chapterTimeout) {
    clearTimeout(chapterTimeout)
  }

  const chapterIndex = currentChapter.value
  const chapter = chapters[chapterIndex]

  // 更新状态
  showContinueBtn.value = chapter.hasContinueBtn
  isLastChapter.value = chapterIndex === chapters.length - 1

  // 开始动画
  animationStartTime = Date.now()
  animate()

  // 自动切换到下一章
  if (!chapter.hasContinueBtn && chapterIndex < chapters.length - 1) {
    chapterTimeout = setTimeout(() => {
      nextChapter()
    }, chapter.duration)
  }
}

const animate = () => {
  if (!canvasCtx || !canvas.value) return

  const chapterIndex = currentChapter.value
  const elapsed = Date.now() - animationStartTime
  const progress = Math.min(elapsed / chapters[chapterIndex].duration, 1)

  // 清空画布
  canvasCtx.fillStyle = '#000000'
  canvasCtx.fillRect(0, 0, canvas.value.width, canvas.value.height)

  // 根据章节绘制不同的抽象场景
  switch (chapterIndex) {
    case 0:
      drawChapter1Room(progress)
      break
    case 1:
      drawChapter2Theory(progress)
      break
    case 2:
      drawChapter3Axe(progress)
      break
    case 3:
      drawChapter4Chase(progress)
      break
    case 4:
      drawChapter5Breakdown(progress)
      break
    case 5:
      drawChapter6Encounter(progress)
      break
    case 6:
      drawChapter7Resurrection(progress)
      break
  }

  // 继续动画
  if (progress < 1) {
    animationFrame = requestAnimationFrame(animate)
  }
}

// 绘制第一章：房间
const drawChapter1Room = (progress) => {
  const { width, height } = canvas.value
  const centerX = width / 2
  const centerY = height / 2

  // 房间矩形（逐渐缩小）
  const baseSize = Math.min(width, height) * 0.5
  const shrinkProgress = progress * 0.6 // 缩小到 40%
  const size = baseSize * (1 - shrinkProgress)

  // 颤抖效果（progress 越大，颤抖越明显）
  const trembleIntensity = progress * 3
  const trembleX = Math.sin(Date.now() / 50) * trembleIntensity
  const trembleY = Math.cos(Date.now() / 50) * trembleIntensity

  // 绘制矩形
  canvasCtx.save()
  canvasCtx.translate(centerX + trembleX, centerY + trembleY)

  // 黄色边缘（霉菌般蔓延）
  const moldProgress = progress * 0.7
  if (moldProgress > 0) {
    canvasCtx.strokeStyle = `rgba(240, 230, 140, ${moldProgress * 0.5})`
    canvasCtx.lineWidth = 5 + moldProgress * 10
    canvasCtx.strokeRect(-size / 2, -size / 2, size, size)
  }

  // 矩形主体
  canvasCtx.fillStyle = '#1a1a1a'
  canvasCtx.fillRect(-size / 2, -size / 2, size, size)

  // 矩形边框
  canvasCtx.strokeStyle = `rgba(255, 255, 255, ${0.3 - progress * 0.2})`
  canvasCtx.lineWidth = 2
  canvasCtx.strokeRect(-size / 2, -size / 2, size, size)

  canvasCtx.restore()

  // 文字
  if (progress > 0.3) {
    const textOpacity = Math.min((progress - 0.3) / 0.2, 1)
    currentText.value = `<span style="opacity: ${textOpacity}">三尺见方的房间<br>装得下整个世界的罪恶</span>`
  }
}

// 绘制第二章：理论
const drawChapter2Theory = (progress) => {
  const { width, height } = canvas.value
  const centerX = width / 2
  const centerY = height / 2

  // 白色背景
  canvasCtx.fillStyle = '#ffffff'
  canvasCtx.fillRect(0, 0, width, height)

  // 完美的几何图形（正方形）
  const size = Math.min(width, height) * 0.25
  const rotation = progress * Math.PI * 2

  canvasCtx.save()
  canvasCtx.translate(centerX, centerY)
  canvasCtx.rotate(rotation)

  // 金色边框
  canvasCtx.strokeStyle = '#d4af37'
  canvasCtx.lineWidth = 3
  canvasCtx.strokeRect(-size / 2, -size / 2, size, size)

  // 裂痕
  if (progress > 0.5) {
    const crackProgress = (progress - 0.5) / 0.5
    canvasCtx.strokeStyle = `rgba(139, 0, 0, ${crackProgress})`
    canvasCtx.lineWidth = 2

    // 绘制裂痕
    for (let i = 0; i < 5; i++) {
      const angle = (i / 5) * Math.PI * 2
      const crackLength = crackProgress * size * 0.4
      const startX = Math.cos(angle) * size / 2
      const startY = Math.sin(angle) * size / 2
      const endX = Math.cos(angle) * (size / 2 + crackLength)
      const endY = Math.sin(angle) * (size / 2 + crackLength)

      canvasCtx.beginPath()
      canvasCtx.moveTo(startX, startY)
      canvasCtx.lineTo(endX, endY)
      canvasCtx.stroke()
    }
  }

  // 红色渗出
  if (progress > 0.7) {
    const bleedProgress = (progress - 0.7) / 0.3
    canvasCtx.fillStyle = `rgba(139, 0, 0, ${bleedProgress * 0.3})`
    canvasCtx.fillRect(-size / 2, -size / 2, size, size)
  }

  canvasCtx.restore()

  // 文字
  if (progress > 0.2) {
    const textOpacity = Math.min((progress - 0.2) / 0.3, 1)
    currentText.value = `<span style="color: #1a1a1a; opacity: ${textOpacity}">有些人有权越过法律<br>我就是这样的人吗？</span>`
  }
}

// 绘制第三章：斧头
const drawChapter3Axe = (progress) => {
  const { width, height } = canvas.value
  const centerX = width / 2
  const centerY = height / 2

  // 纯黑背景
  canvasCtx.fillStyle = '#000000'
  canvasCtx.fillRect(0, 0, width, height)

  // 金色线条
  const lineLength = Math.min(width, height) * 0.4
  const lineWidth = 3

  // 下降动画
  const dropProgress = Math.min(progress * 2, 1) // 前50%时间下降
  const y = -lineLength / 2 + dropProgress * lineLength

  // 断裂点（progress > 0.5）
  const isBroken = progress > 0.5
  const breakProgress = isBroken ? (progress - 0.5) / 0.5 : 0

  canvasCtx.save()
  canvasCtx.translate(centerX, centerY)

  if (!isBroken) {
    // 完整的金线
    canvasCtx.strokeStyle = '#d4af37'
    canvasCtx.lineWidth = lineWidth
    canvasCtx.beginPath()
    canvasCtx.moveTo(0, y - lineLength / 2)
    canvasCtx.lineTo(0, y + lineLength / 2)
    canvasCtx.stroke()
  } else {
    // 断裂的两段
    const gap = breakProgress * 50
    canvasCtx.strokeStyle = '#d4af37'
    canvasCtx.lineWidth = lineWidth

    // 上半段
    canvasCtx.beginPath()
    canvasCtx.moveTo(0, y - lineLength / 2)
    canvasCtx.lineTo(0, y - gap)
    canvasCtx.stroke()

    // 下半段
    canvasCtx.beginPath()
    canvasCtx.moveTo(0, y + gap)
    canvasCtx.lineTo(0, y + lineLength / 2)
    canvasCtx.stroke()

    // 红色脉冲
    if (breakProgress > 0) {
      const pulseRadius = breakProgress * Math.max(width, height)
      const pulseOpacity = breakProgress * 0.8

      const gradient = canvasCtx.createRadialGradient(0, y, 0, 0, y, pulseRadius)
      gradient.addColorStop(0, `rgba(139, 0, 0, ${pulseOpacity})`)
      gradient.addColorStop(1, 'rgba(139, 0, 0, 0)')

      canvasCtx.fillStyle = gradient
      canvasCtx.fillRect(-width / 2, -height / 2, width, height)

      // 黑屏（最后阶段）
      if (breakProgress > 0.8) {
        const blackProgress = (breakProgress - 0.8) / 0.2
        canvasCtx.fillStyle = `rgba(0, 0, 0, ${blackProgress})`
        canvasCtx.fillRect(-width / 2, -height / 2, width, height)
      }
    }
  }

  canvasCtx.restore()
}

// 绘制第四章：追逐
const drawChapter4Chase = (progress) => {
  const { width, height } = canvas.value
  const centerX = width / 2
  const centerY = height / 2

  // 黑色背景
  canvasCtx.fillStyle = '#000000'
  canvasCtx.fillRect(0, 0, width, height)

  // 眼睛数量逐渐增加
  const eyeCount = Math.floor(progress * 30) + 5

  // 屏幕收缩
  const shrinkProgress = progress * 0.4
  const currentWidth = width * (1 - shrinkProgress)
  const currentHeight = height * (1 - shrinkProgress)

  canvasCtx.save()
  canvasCtx.translate(centerX, centerY)

  // 绘制眼睛
  for (let i = 0; i < eyeCount; i++) {
    const angle = (i / eyeCount) * Math.PI * 2 + progress
    const distance = 100 + Math.random() * 200
    const x = Math.cos(angle) * distance
    const y = Math.sin(angle) * distance

    const eyeSize = 10 + Math.random() * 20

    // 眼睛外圈
    canvasCtx.beginPath()
    canvasCtx.arc(x, y, eyeSize, 0, Math.PI * 2)
    canvasCtx.fillStyle = `rgba(255, 255, 255, ${0.1 + Math.random() * 0.2})`
    canvasCtx.fill()

    // 眼睛中心（注视或闭合）
    if (Math.random() > 0.3) {
      canvasCtx.beginPath()
      canvasCtx.arc(x, y, eyeSize * 0.3, 0, Math.PI * 2)
      canvasCtx.fillStyle = `rgba(139, 0, 0, ${0.3 + Math.random() * 0.5})`
      canvasCtx.fill()
    }
  }

  // 屏幕收缩效果
  canvasCtx.fillStyle = `rgba(0, 0, 0, ${progress * 0.5})`
  canvasCtx.fillRect(-currentWidth / 2, -currentHeight / 2, currentWidth, currentHeight)

  canvasCtx.restore()

  // 文字（快速闪现）
  if (progress > 0.3 && progress < 0.8) {
    const texts = ['他知道', '他们都知道', '你无法隐藏', '你无法宽恕']
    const textIndex = Math.floor(progress * 10) % texts.length
    const showText = texts[textIndex]

    currentText.value = `<span style="opacity: ${0.7}">${showText}</span>`
  }
}

// 绘制第五章：崩溃
const drawChapter5Breakdown = (progress) => {
  const { width, height } = canvas.value

  // 混乱背景
  const chaosColors = ['#1a0000', '#000000', '#2a2a2a', '#3a0a0a']

  for (let i = 0; i < 20; i++) {
    canvasCtx.fillStyle = chaosColors[i % chaosColors.length]
    const x = Math.random() * width
    const y = Math.random() * height
    const w = Math.random() * 200 + 50
    const h = Math.random() * 200 + 50
    canvasCtx.fillRect(x, y, w, h)
  }

  // 破碎的镜子形状
  const shardCount = 10 + Math.floor(progress * 20)
  for (let i = 0; i < shardCount; i++) {
    canvasCtx.save()
    const x = Math.random() * width
    const y = Math.random() * height
    const rotation = Math.random() * Math.PI * 2
    const size = Math.random() * 100 + 50

    canvasCtx.translate(x, y)
    canvasCtx.rotate(rotation)

    canvasCtx.fillStyle = `rgba(139, 0, 0, ${0.1 + Math.random() * 0.3})`
    canvasCtx.fillRect(-size / 2, -size / 2, size, size)

    canvasCtx.strokeStyle = `rgba(255, 255, 255, ${0.1 + Math.random() * 0.2})`
    canvasCtx.lineWidth = 1
    canvasCtx.strokeRect(-size / 2, -size / 2, size, size)

    canvasCtx.restore()
  }

  // 闪烁的微光（中心）
  const centerX = width / 2
  const centerY = height / 2
  const flickerIntensity = 0.5 + Math.sin(Date.now() / 100) * 0.5

  canvasCtx.beginPath()
  canvasCtx.arc(centerX, centerY, 20, 0, Math.PI * 2)
  canvasCtx.fillStyle = `rgba(255, 255, 255, ${flickerIntensity * 0.3})`
  canvasCtx.fill()

  // 文字
  if (progress > 0.4) {
    const textOpacity = Math.min((progress - 0.4) / 0.3, 1)
    currentText.value = `<span style="opacity: ${textOpacity}">灵魂在尖叫<br>但没有人听见</span>`
  }
}

// 绘制第六章：相遇
const drawChapter6Encounter = (progress) => {
  const { width, height } = canvas.value
  const centerX = width / 2
  const centerY = height / 2

  // 从混乱到平静
  const chaosToPeace = progress

  // 背景（逐渐变暗）
  const bgOpacity = 1 - progress * 0.8
  canvasCtx.fillStyle = `rgba(26, 0, 0, ${bgOpacity})`
  canvasCtx.fillRect(0, 0, width, height)

  // 温暖的橙色曲线
  if (progress > 0) {
    const curveProgress = Math.min(progress * 2, 1)
    const curveIntensity = Math.sin(progress * Math.PI) * 20

    canvasCtx.beginPath()
    canvasCtx.strokeStyle = `rgba(255, 165, 0, ${curveProgress * 0.6})`
    canvasCtx.lineWidth = 5

    // 绘制心形曲线
    for (let i = 0; i < 360; i += 5) {
      const angle = (i * Math.PI) / 180
      const r = 50 + Math.sin(angle * 3) * 30 + curveIntensity
      const x = centerX + r * Math.cos(angle)
      const y = centerY + r * Math.sin(angle) * 0.8

      if (i === 0) {
        canvasCtx.moveTo(x, y)
      } else {
        canvasCtx.lineTo(x, y)
      }
    }

    canvasCtx.closePath()
    canvasCtx.stroke()

    // 填充（淡淡的橙色光晕）
    if (progress > 0.5) {
      canvasCtx.fillStyle = `rgba(255, 165, 0, ${curveProgress * 0.1})`
      canvasCtx.fill()
    }
  }

  // 文字
  if (progress > 0.3) {
    const textOpacity = Math.min((progress - 0.3) / 0.4, 1)
    currentText.value = `<span style="opacity: ${textOpacity}; color: #ffa500;">接受苦难<br>通过苦难获得救赎</span>`
  }
}

// 绘制第七章：复活
const drawChapter7Resurrection = (progress) => {
  const { width, height } = canvas.value
  const centerX = width / 2
  const centerY = height / 2

  // 蓝白色背景（逐渐出现）
  canvasCtx.fillStyle = `rgba(230, 243, 255, ${progress})`
  canvasCtx.fillRect(0, 0, width, height)

  // 地平线
  if (progress > 0) {
    const horizonY = height * 0.7
    canvasCtx.beginPath()
    canvasCtx.moveTo(0, horizonY)

    // 弯曲的地平线
    for (let x = 0; x <= width; x += 10) {
      const y = horizonY + Math.sin(x / 100 + progress * Math.PI) * 20
      canvasCtx.lineTo(x, y)
    }

    canvasCtx.strokeStyle = `rgba(44, 62, 80, ${0.3})`
    canvasCtx.lineWidth = 2
    canvasCtx.stroke()
  }

  // 不完美的圆
  if (progress > 0.3) {
    const circleProgress = (progress - 0.3) / 0.7
    const baseRadius = Math.min(width, height) * 0.15
    const radius = baseRadius * circleProgress

    // 圆形主体
    canvasCtx.beginPath()
    canvasCtx.arc(centerX, centerY, radius, 0, Math.PI * 2)
    canvasCtx.fillStyle = `rgba(255, 255, 255, ${circleProgress * 0.8})`
    canvasCtx.fill()
    canvasCtx.strokeStyle = `rgba(255, 255, 255, ${circleProgress})`
    canvasCtx.lineWidth = 3
    canvasCtx.stroke()

    // 缺口（透出光）
    if (circleProgress > 0.5) {
      const gapAngle = Math.PI / 6
      const gapStart = Math.PI
      const gapEnd = gapStart + gapAngle

      canvasCtx.save()
      canvasCtx.translate(centerX, centerY)

      // 光从缺口透出
      const gradient = canvasCtx.createRadialGradient(
        centerX + Math.cos(gapStart + gapAngle / 2) * radius,
        centerY + Math.sin(gapStart + gapAngle / 2) * radius,
        0,
        centerX + Math.cos(gapStart + gapAngle / 2) * radius,
        centerY + Math.sin(gapStart + gapAngle / 2) * radius,
        100
      )
      gradient.addColorStop(0, `rgba(255, 255, 200, ${circleProgress * 0.8})`)
      gradient.addColorStop(1, 'rgba(255, 255, 200, 0)')

      canvasCtx.fillStyle = gradient
      canvasCtx.fill()

      canvasCtx.restore()
    }
  }

  // 文字
  if (progress > 0.6) {
    const textOpacity = Math.min((progress - 0.6) / 0.3, 1)
    const mainText = `<span style="opacity: ${textOpacity}; font-size: 1.5em;">我复活了</span>`
    const russianText = `<span style="opacity: ${textOpacity * 0.7}; font-size: 1em; font-style: italic;">Воскресение</span>`

    currentText.value = `${mainText}<br><br>${russianText}`
  }
}

const endExperience = () => {
  // 显示结尾文字
  showOutro.value = true
  showContinueBtn.value = false

  // 8秒后返回
  setTimeout(() => {
    router.push('/universe')
  }, 8000)
}

const startExperience = () => {
  // 隐藏开场，开始第一章
  showIntro.value = false
  currentChapter.value = 0
  startChapter()
}

// 初始化Canvas
const initCanvas = () => {
  if (!canvas.value) return

  canvasCtx = canvas.value.getContext('2d')
  canvas.value.width = window.innerWidth
  canvas.value.height = window.innerHeight

  // 开场文字显示时间
  setTimeout(() => {
    startExperience()
  }, 5000)
}

onMounted(() => {
  initCanvas()

  window.addEventListener('resize', () => {
    if (canvas.value) {
      canvas.value.width = window.innerWidth
      canvas.value.height = window.innerHeight
    }
  })
})

onUnmounted(() => {
  if (animationFrame) {
    cancelAnimationFrame(animationFrame)
  }
  if (chapterTimeout) {
    clearTimeout(chapterTimeout)
  }
})
</script>

<style scoped>
.crime-and-punishment-world {
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  font-family: 'Inter', 'Microsoft YaHei', sans-serif;
  background: #000;
}

/* === 画布 === */
.main-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

/* === 开场文字 === */
.intro-text {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 10;
  background: #000;
}

.intro-title {
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 200;
  color: #fff;
  margin-bottom: 2rem;
  letter-spacing: 0.5em;
  animation: titleFadeIn 2s ease;
}

.intro-subtitle {
  font-size: clamp(1.2rem, 3vw, 1.8rem);
  font-weight: 300;
  color: #fff;
  margin-bottom: 0.5rem;
  opacity: 0;
  animation: subtitleFadeIn 1s ease 0.5s forwards;
}

.intro-subtitle:nth-child(3) {
  animation-delay: 1s;
}

@keyframes titleFadeIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes subtitleFadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 0.8;
  }
}

/* === 章节文字 === */
.chapter-text {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  max-width: 800px;
  text-align: center;
  pointer-events: none;
}

.text-content {
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  font-weight: 300;
  line-height: 2;
  color: #fff;
  text-shadow: 0 2px 20px rgba(0, 0, 0, 0.8);
}

/* === 继续按钮 === */
.continue-btn {
  position: fixed;
  bottom: 10%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  padding: 1rem 3rem;
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 50px;
  color: #1a1a1a;
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(255, 255, 255, 0.2);
}

.continue-btn:hover {
  background: #1a1a1a;
  color: #fff;
  transform: translateX(-50%) scale(1.05);
}

.continue-btn.is-end {
  background: rgba(255, 255, 255, 0.9);
}

/* === 结尾文字 === */
.outro-text {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 100;
  background: #000;
}

.outro-line {
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  font-weight: 300;
  color: #fff;
  margin-bottom: 1rem;
  opacity: 0;
  animation: outroFadeIn 1.5s ease forwards;
}

.outro-line:nth-child(1) {
  animation-delay: 0.5s;
}

.outro-line:nth-child(2) {
  animation-delay: 2s;
}

.outro-author {
  font-size: clamp(1rem, 2.5vw, 1.5rem);
  font-weight: 300;
  color: #fff;
  margin-bottom: 0.5rem;
  opacity: 0;
  animation: outroFadeIn 1.5s ease 3.5s forwards;
}

.outro-year {
  font-size: clamp(0.9rem, 2vw, 1.2rem);
  font-weight: 200;
  color: #888;
  opacity: 0;
  animation: outroFadeIn 1.5s ease 4.5s forwards;
}

@keyframes outroFadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* === 转场动画 === */
.fade-in-enter-active,
.fade-in-leave-active {
  transition: opacity 1s ease;
}

.fade-in-enter-from,
.fade-in-leave-to {
  opacity: 0;
}

.text-fade-enter-active,
.text-fade-leave-active {
  transition: opacity 0.5s ease;
}

.text-fade-enter-from,
.text-fade-leave-to {
  opacity: 0;
}

.btn-fade-enter-active,
.btn-fade-leave-active {
  transition: opacity 0.3s ease;
}

.btn-fade-enter-from,
.btn-fade-leave-to {
  opacity: 0;
}
</style>

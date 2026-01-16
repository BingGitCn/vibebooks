<template>
  <div class="sahara-world">
    <canvas ref="canvas"></canvas>

    <!-- 开场文字 -->
    <transition name="fade">
      <div v-if="showIntro" class="intro-text">
        <p class="quote">"每想你一次，天上飘落一粒沙"</p>
        <p class="quote-sub">从此形成了撒哈拉</p>
      </div>
    </transition>

    <!-- 章节文字 -->
    <transition name="fade">
      <div v-if="showChapterText && currentChapterText" class="chapter-text">
        <p v-html="currentChapterText"></p>
      </div>
    </transition>

    <!-- 继续/结束按钮 -->
    <transition name="fade">
      <button v-if="showButton" @click="handleButtonClick" class="continue-btn">
        {{ isLastChapter ? '重新开始' : '继续 →' }}
      </button>
    </transition>

    <!-- 结尾文字 -->
    <transition name="fade">
      <div v-if="showOutro" class="outro-text">
        <p class="quote">"不要问我从哪里来"</p>
        <p class="quote-sub">我的故乡在远方</p>
        <p class="author">— 三毛</p>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const canvas = ref(null)
let ctx = null
let animationId = null

// 状态管理
const showIntro = ref(true)
const showOutro = ref(false)
const showChapterText = ref(false)
const showButton = ref(false)
const currentChapterIndex = ref(0)
const currentChapterText = ref('')
const isLastChapter = ref(false)

// 章节配置
const chapters = [
  { name: '起风', duration: 15000, text: '风，从远方吹来', hasButton: false },
  { name: '流动', duration: 18000, text: '沙粒开始流动<br>形成大地的形状', hasButton: false },
  { name: '安家', duration: 15000, text: '在这片荒凉中<br>我们建起了家', hasButton: true },
  { name: '生活', duration: 20000, text: '生命的过程<br>无论是阳春白雪，还是青菜豆腐', hasButton: false },
  { name: '远行', duration: 18000, text: '为何流浪<br>远方有我的梦', hasButton: true },
  { name: '橄榄树', duration: 15000, text: '不要问我从哪里来<br>不要问我到哪里去', hasButton: false },
  { name: '归宿', duration: 20000, text: '', hasButton: true }
]

// 鼠标位置（用于沙粒跟随效果）
const mousePos = ref({ x: 0, y: 0 })

// 沙粒系统
let sandParticles = []
const SAND_COUNT = 500

// 脚印系统
let footprints = []

// 时间跟踪
let chapterStartTime = 0
let globalTime = 0

// 初始化沙粒
const initSandParticles = () => {
  sandParticles = []
  for (let i = 0; i < SAND_COUNT; i++) {
    sandParticles.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 2 + 1,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: Math.random() * 0.5 + 0.2,
      opacity: Math.random() * 0.5 + 0.3
    })
  }
}

// 调整 Canvas 大小
const resizeCanvas = () => {
  if (canvas.value) {
    canvas.value.width = window.innerWidth
    canvas.value.height = window.innerHeight
  }
}

// 绘制第一章：起风
const drawChapter1Falling = (progress) => {
  // 米色渐变背景
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.value.height)
  gradient.addColorStop(0, '#f5e6d3')
  gradient.addColorStop(1, '#d4a574')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, canvas.value.width, canvas.value.height)

  // 沙粒从天而降
  const fallingProgress = progress * 0.8
  const activeCount = Math.floor(SAND_COUNT * fallingProgress)

  for (let i = 0; i < activeCount; i++) {
    const p = sandParticles[i]
    const fallDistance = progress * canvas.value.height * 0.7
    const y = (p.y - fallDistance) % canvas.value.height

    ctx.beginPath()
    ctx.arc(p.x, y, p.size, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(139, 90, 43, ${p.opacity})`
    ctx.fill()
  }

  // 风的纹理
  if (progress > 0.3) {
    const windOpacity = (progress - 0.3) / 0.7 * 0.15
    ctx.strokeStyle = `rgba(139, 90, 43, ${windOpacity})`
    ctx.lineWidth = 1

    for (let i = 0; i < 20; i++) {
      const y = (i / 20) * canvas.value.height
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(canvas.value.width, y + Math.sin(globalTime / 1000 + i) * 20)
      ctx.stroke()
    }
  }
}

// 绘制第二章：流动
const drawChapter2Flowing = (progress) => {
  // 背景渐变
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.value.height)
  gradient.addColorStop(0, '#f5e6d3')
  gradient.addColorStop(1, '#c9a067')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, canvas.value.width, canvas.value.height)

  // 沙丘形状
  const duneProgress = Math.min(progress * 1.5, 1)
  const waveOffset = globalTime / 2000

  // 多层沙丘
  for (let layer = 0; layer < 3; layer++) {
    const layerOffset = layer * 100
    const layerOpacity = 0.3 - layer * 0.08
    const yBase = canvas.value.height * 0.6 + layer * 80

    ctx.beginPath()
    ctx.moveTo(0, canvas.value.height)

    for (let x = 0; x <= canvas.value.width; x += 10) {
      const wave = Math.sin((x + layerOffset) / 300 + waveOffset) * 50
      const y = yBase + wave * duneProgress
      ctx.lineTo(x, y)
    }

    ctx.lineTo(canvas.value.width, canvas.value.height)
    ctx.closePath()

    ctx.fillStyle = `rgba(180, 130, 70, ${layerOpacity})`
    ctx.fill()
  }

  // 沙粒流动效果
  const flowOpacity = progress * 0.6
  for (let i = 0; i < SAND_COUNT; i++) {
    const p = sandParticles[i]
    const flowX = (p.x + globalTime / 50) % (canvas.value.width + 100) - 50
    const flowY = p.y + Math.sin(globalTime / 1000 + i) * 20

    ctx.beginPath()
    ctx.arc(flowX, flowY, p.size, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(139, 90, 43, ${p.opacity * flowOpacity})`
    ctx.fill()
  }
}

// 绘制第三章：安家
const drawChapter3Home = (progress) => {
  // 沙漠背景
  ctx.fillStyle = '#d4a574'
  ctx.fillRect(0, 0, canvas.value.width, canvas.value.height)

  // 地平线
  ctx.fillStyle = '#c9965f'
  ctx.fillRect(0, canvas.value.height * 0.6, canvas.value.width, canvas.value.height * 0.4)

  // 太阳
  if (progress > 0.2) {
    const sunOpacity = Math.min((progress - 0.2) / 0.3, 1)
    const sunY = canvas.value.height * 0.3 - progress * 50

    const sunGradient = ctx.createRadialGradient(
      canvas.value.width * 0.7, sunY, 0,
      canvas.value.width * 0.7, sunY, 80
    )
    sunGradient.addColorStop(0, `rgba(255, 200, 100, ${sunOpacity})`)
    sunGradient.addColorStop(1, 'rgba(255, 200, 100, 0)')

    ctx.fillStyle = sunGradient
    ctx.beginPath()
    ctx.arc(canvas.value.width * 0.7, sunY, 80, 0, Math.PI * 2)
    ctx.fill()
  }

  // 几何小屋
  const houseOpacity = Math.min(progress * 2, 1)
  if (houseOpacity > 0) {
    const houseX = canvas.value.width * 0.4
    const houseY = canvas.value.height * 0.55
    const houseSize = 100

    // 房屋主体
    ctx.fillStyle = `rgba(255, 250, 240, ${houseOpacity})`
    ctx.fillRect(houseX - houseSize / 2, houseY - houseSize / 2, houseSize, houseSize)

    // 屋顶
    ctx.beginPath()
    ctx.moveTo(houseX - houseSize / 2 - 20, houseY - houseSize / 2)
    ctx.lineTo(houseX, houseY - houseSize / 2 - 60)
    ctx.lineTo(houseX + houseSize / 2 + 20, houseY - houseSize / 2)
    ctx.closePath()
    ctx.fillStyle = `rgba(200, 150, 100, ${houseOpacity})`
    ctx.fill()

    // 窗户
    ctx.fillStyle = `rgba(255, 165, 0, ${houseOpacity * 0.8})`
    ctx.fillRect(houseX - 20, houseY - 10, 40, 40)
  }

  // 沙粒细节
  for (let i = 0; i < 100; i++) {
    const p = sandParticles[i]
    ctx.beginPath()
    ctx.arc(p.x, p.y + canvas.value.height * 0.6, p.size * 0.8, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(139, 90, 43, ${p.opacity * 0.3})`
    ctx.fill()
  }
}

// 绘制第四章：生活
const drawChapter4Life = (progress) => {
  // 温暖的橙色背景
  const gradient = ctx.createRadialGradient(
    canvas.value.width / 2, canvas.value.height / 2, 0,
    canvas.value.width / 2, canvas.value.height / 2, canvas.value.width / 2
  )
  const warmIntensity = progress * 0.5
  gradient.addColorStop(0, `rgba(255, 200, 150, ${warmIntensity})`)
  gradient.addColorStop(1, '#d4a574')

  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, canvas.value.width, canvas.value.height)

  // 温暖的光晕
  const lightCount = 5
  for (let i = 0; i < lightCount; i++) {
    const lightProgress = Math.min((progress - i * 0.15) * 2, 1)
    if (lightProgress > 0) {
      const x = canvas.value.width * (0.3 + i * 0.15)
      const y = canvas.value.height * (0.4 + Math.sin(i) * 0.2)
      const radius = 100 + Math.sin(globalTime / 1500 + i) * 30

      const lightGradient = ctx.createRadialGradient(x, y, 0, x, y, radius)
      lightGradient.addColorStop(0, `rgba(255, 165, 0, ${lightProgress * 0.4})`)
      lightGradient.addColorStop(1, 'rgba(255, 165, 0, 0)')

      ctx.fillStyle = lightGradient
      ctx.beginPath()
      ctx.arc(x, y, radius, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  // 生活物品的抽象几何
  const items = [
    { type: 'circle', x: 0.25, y: 0.35, size: 30 },
    { type: 'rect', x: 0.65, y: 0.45, size: 40 },
    { type: 'triangle', x: 0.45, y: 0.6, size: 35 }
  ]

  items.forEach((item, index) => {
    const itemOpacity = Math.min((progress - index * 0.1) * 3, 1) * 0.6
    if (itemOpacity > 0) {
      ctx.fillStyle = `rgba(255, 250, 240, ${itemOpacity})`
      const x = item.x * canvas.value.width
      const y = item.y * canvas.value.height

      if (item.type === 'circle') {
        ctx.beginPath()
        ctx.arc(x, y, item.size, 0, Math.PI * 2)
        ctx.fill()
      } else if (item.type === 'rect') {
        ctx.fillRect(x - item.size / 2, y - item.size / 2, item.size, item.size)
      } else if (item.type === 'triangle') {
        ctx.beginPath()
        ctx.moveTo(x, y - item.size)
        ctx.lineTo(x + item.size, y + item.size)
        ctx.lineTo(x - item.size, y + item.size)
        ctx.closePath()
        ctx.fill()
      }
    }
  })
}

// 绘制第五章：远行
const drawChapter5Journey = (progress) => {
  // 沙漠背景
  ctx.fillStyle = '#d4a574'
  ctx.fillRect(0, 0, canvas.value.width, canvas.value.height)

  // 远方地平线
  const horizonY = canvas.value.height * 0.55
  ctx.fillStyle = '#c9965f'
  ctx.fillRect(0, horizonY, canvas.value.width, canvas.value.height - horizonY)

  // 脚印
  const footprintCount = 8
  for (let i = 0; i < footprintCount; i++) {
    const footprintProgress = (progress - i * 0.08) / 0.3
    if (footprintProgress > 0 && footprintProgress <= 1) {
      const x = canvas.value.width * (0.15 + i * 0.1)
      const y = horizonY + 50 + i * 30
      const size = 15 + i * 3
      const opacity = (1 - footprintProgress) * 0.6

      // 左脚印
      ctx.beginPath()
      ctx.ellipse(x - 15, y, size * 0.6, size, 0, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(139, 90, 43, ${opacity})`
      ctx.fill()

      // 右脚印
      ctx.beginPath()
      ctx.ellipse(x + 15, y + 40, size * 0.6, size, 0, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  // 风沙
  const sandOpacity = Math.min(progress * 1.5, 1) * 0.3
  ctx.fillStyle = `rgba(212, 165, 116, ${sandOpacity})`
  for (let i = 0; i < 20; i++) {
    const x = (globalTime / 20 + i * 100) % (canvas.value.width + 200) - 100
    const y = horizonY + Math.random() * 200
    const width = 100 + Math.random() * 100
    const height = 2 + Math.random() * 3
    ctx.fillRect(x, y, width, height)
  }

  // 远方的虚线（象征远方）
  ctx.strokeStyle = `rgba(255, 255, 255, ${progress * 0.5})`
  ctx.lineWidth = 2
  ctx.setLineDash([10, 10])
  ctx.beginPath()
  ctx.moveTo(canvas.value.width * 0.9, horizonY)
  ctx.lineTo(canvas.value.width * 0.95, horizonY - 100)
  ctx.stroke()
  ctx.setLineDash([])
}

// 绘制第六章：橄榄树
const drawChapter6OliveTree = (progress) => {
  // 深蓝夜空
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.value.height)
  gradient.addColorStop(0, '#1a3a5c')
  gradient.addColorStop(1, '#2d4a6c')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, canvas.value.width, canvas.value.height)

  // 星星
  const starCount = 50
  for (let i = 0; i < starCount; i++) {
    const x = Math.random() * canvas.value.width
    const y = Math.random() * canvas.value.height * 0.6
    const size = Math.random() * 2 + 1
    const twinkle = Math.sin(globalTime / 500 + i) * 0.3 + 0.7

    ctx.beginPath()
    ctx.arc(x, y, size, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(255, 255, 255, ${twinkle * progress})`
    ctx.fill()
  }

  // 橄榄树轮廓（虚线）
  const treeOpacity = progress
  ctx.strokeStyle = `rgba(255, 255, 255, ${treeOpacity * 0.6})`
  ctx.lineWidth = 3
  ctx.setLineDash([8, 12])

  // 树干
  ctx.beginPath()
  ctx.moveTo(canvas.value.width / 2 - 10, canvas.value.height * 0.9)
  ctx.lineTo(canvas.value.width / 2, canvas.value.height * 0.6)
  ctx.lineTo(canvas.value.width / 2 + 10, canvas.value.height * 0.9)
  ctx.stroke()

  // 树冠（多个椭圆）
  const canopyY = canvas.value.height * 0.5
  ctx.beginPath()
  ctx.ellipse(canvas.value.width / 2 - 30, canopyY, 40, 50, 0, 0, Math.PI * 2)
  ctx.stroke()

  ctx.beginPath()
  ctx.ellipse(canvas.value.width / 2 + 30, canopyY, 45, 55, 0, 0, Math.PI * 2)
  ctx.stroke()

  ctx.beginPath()
  ctx.ellipse(canvas.value.width / 2, canopyY - 40, 35, 40, 0, 0, Math.PI * 2)
  ctx.stroke()

  ctx.setLineDash([])

  // 叶子飘落
  const leafCount = 15
  for (let i = 0; i < leafCount; i++) {
    const leafProgress = (progress - i * 0.05) / 0.5
    if (leafProgress > 0 && leafProgress <= 1) {
      const x = canvas.value.width * (0.3 + i * 0.05) + Math.sin(globalTime / 1000 + i) * 30
      const y = canvas.value.height * (0.3 + leafProgress * 0.6)
      const size = 8
      const rotation = globalTime / 500 + i

      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(rotation)
      ctx.beginPath()
      ctx.ellipse(0, 0, size, size / 2, 0, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(100, 150, 100, ${leafProgress * 0.7})`
      ctx.fill()
      ctx.restore()
    }
  }
}

// 绘制第七章：归宿
const drawChapter7Return = (progress) => {
  // 渐变到米白色
  const bgProgress = Math.min(progress * 2, 1)
  ctx.fillStyle = `rgba(245, 230, 211, ${bgProgress})`
  ctx.fillRect(0, 0, canvas.value.width, canvas.value.height)

  // 沙粒平静下来
  const calmProgress = progress
  for (let i = 0; i < SAND_COUNT; i++) {
    const p = sandParticles[i]
    const settleY = p.y * 0.8 + canvas.value.height * 0.2
    const currentY = p.y + (settleY - p.y) * calmProgress
    const opacity = p.opacity * (1 - calmProgress * 0.5)

    ctx.beginPath()
    ctx.arc(p.x, currentY, p.size, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(180, 140, 90, ${opacity})`
    ctx.fill()
  }

  // 远方的记忆印记
  if (progress > 0.5) {
    const memoryOpacity = (progress - 0.5) / 0.5 * 0.4
    ctx.fillStyle = `rgba(212, 165, 116, ${memoryOpacity})`

    // 房屋印记
    const houseSize = 60
    ctx.fillRect(
      canvas.value.width * 0.4 - houseSize / 2,
      canvas.value.height * 0.45 - houseSize / 2,
      houseSize,
      houseSize
    )

    // 橄榄树印记
    ctx.beginPath()
    ctx.arc(canvas.value.width * 0.65, canvas.value.height * 0.45, 40, 0, Math.PI * 2)
    ctx.fill()
  }

  // 留下的淡淡印记
  if (progress > 0.7) {
    const markOpacity = (progress - 0.7) / 0.3 * 0.3
    ctx.strokeStyle = `rgba(139, 90, 43, ${markOpacity})`
    ctx.lineWidth = 2

    // 足迹印记
    ctx.beginPath()
    ctx.arc(canvas.value.width * 0.5, canvas.value.height * 0.7, 20, 0, Math.PI * 2)
    ctx.stroke()
  }

  // 最终的平静
  if (progress > 0.9) {
    const peaceOpacity = (progress - 0.9) / 0.1 * 0.2
    ctx.fillStyle = `rgba(255, 255, 255, ${peaceOpacity})`
    ctx.fillRect(0, 0, canvas.value.width, canvas.value.height)
  }
}

// 主动画循环
const animate = () => {
  if (!ctx) return

  const currentTime = Date.now()
  globalTime = currentTime
  const elapsed = currentTime - chapterStartTime
  const progress = Math.min(elapsed / chapters[currentChapterIndex.value].duration, 1)

  // 根据章节绘制
  switch (currentChapterIndex.value) {
    case 0: drawChapter1Falling(progress); break
    case 1: drawChapter2Flowing(progress); break
    case 2: drawChapter3Home(progress); break
    case 3: drawChapter4Life(progress); break
    case 4: drawChapter5Journey(progress); break
    case 5: drawChapter6OliveTree(progress); break
    case 6: drawChapter7Return(progress); break
  }

  // 检查章节是否结束
  if (progress >= 1) {
    if (chapters[currentChapterIndex.value].hasButton) {
      if (!showButton.value) {
        showButton.value = true
        isLastChapter.value = currentChapterIndex.value === chapters.length - 1
      }
    } else {
      nextChapter()
    }
  }

  animationId = requestAnimationFrame(animate)
}

// 下一章
const nextChapter = () => {
  showButton.value = false
  showChapterText.value = false

  if (currentChapterIndex.value < chapters.length - 1) {
    currentChapterIndex.value++
    chapterStartTime = Date.now()
    currentChapterText.value = chapters[currentChapterIndex.value].text

    setTimeout(() => {
      showChapterText.value = true
    }, 1000)
  } else {
    // 最后一章结束，显示结尾
    setTimeout(() => {
      showOutro.value = true
      showChapterText.value = false
    }, 1000)
  }
}

// 按钮点击处理
const handleButtonClick = () => {
  if (isLastChapter.value) {
    // 重新开始
    restart()
  } else {
    nextChapter()
  }
}

// 重新开始
const restart = () => {
  showIntro.value = true
  showOutro.value = false
  showButton.value = false
  showChapterText.value = false
  currentChapterIndex.value = 0
  currentChapterText.value = ''
  chapterStartTime = Date.now()

  setTimeout(() => {
    showIntro.value = false
    currentChapterText.value = chapters[0].text
    setTimeout(() => {
      showChapterText.value = true
    }, 1000)
  }, 3000)
}

// 鼠标移动处理
const handleMouseMove = (e) => {
  mousePos.value = {
    x: e.clientX,
    y: e.clientY
  }
}

// 启动体验
const startExperience = () => {
  setTimeout(() => {
    showIntro.value = false
    currentChapterText.value = chapters[0].text
    chapterStartTime = Date.now()

    setTimeout(() => {
      showChapterText.value = true
    }, 1000)
  }, 3000)
}

onMounted(() => {
  ctx = canvas.value?.getContext('2d')
  resizeCanvas()
  initSandParticles()

  window.addEventListener('resize', resizeCanvas)
  window.addEventListener('mousemove', handleMouseMove)

  startExperience()
  animate()
})

onUnmounted(() => {
  window.removeEventListener('resize', resizeCanvas)
  window.removeEventListener('mousemove', handleMouseMove)
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
})
</script>

<style scoped>
.sahara-world {
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
  background: #d4a574;
}

canvas {
  display: block;
  width: 100%;
  height: 100%;
}

/* 开场/结尾文字 */
.intro-text,
.outro-text {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(212, 165, 116, 0.3);
  z-index: 10;
}

.quote {
  font-size: clamp(2rem, 5vw, 4rem);
  font-weight: 300;
  color: #fff;
  text-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
  margin-bottom: 1rem;
  letter-spacing: 0.2em;
}

.quote-sub {
  font-size: clamp(1.2rem, 3vw, 2rem);
  font-weight: 300;
  color: #fff;
  text-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
  opacity: 0.9;
}

.author {
  font-size: clamp(1rem, 2vw, 1.5rem);
  font-weight: 300;
  color: #fff;
  margin-top: 2rem;
  opacity: 0.8;
}

/* 章节文字 */
.chapter-text {
  position: absolute;
  bottom: 20%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 5;
  text-align: center;
}

.chapter-text p {
  font-size: clamp(1.5rem, 4vw, 3rem);
  font-weight: 300;
  color: #fff;
  text-shadow: 0 2px 15px rgba(0, 0, 0, 0.5);
  letter-spacing: 0.15em;
  line-height: 1.8;
}

/* 继续/结束按钮 */
.continue-btn {
  position: absolute;
  bottom: 15%;
  left: 50%;
  transform: translateX(-50%);
  padding: 1rem 3rem;
  background: rgba(255, 255, 255, 0.9);
  border: 2px solid #d4a574;
  border-radius: 50px;
  font-size: 1.2rem;
  font-weight: 400;
  color: #8b5a2b;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;
  letter-spacing: 0.1em;
}

.continue-btn:hover {
  background: #fff;
  transform: translateX(-50%) scale(1.05);
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
}

/* 转场动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 响应式 */
@media (max-width: 768px) {
  .quote {
    letter-spacing: 0.1em;
  }

  .chapter-text {
    bottom: 25%;
  }

  .chapter-text p {
    letter-spacing: 0.1em;
  }

  .continue-btn {
    padding: 0.8rem 2rem;
    font-size: 1rem;
  }
}
</style>

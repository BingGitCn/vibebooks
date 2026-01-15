<template>
  <div class="trapped-in-dunes" :class="{ 'is-transitioning': isTransitioning }">
    <!-- 跃迁动画遮罩 -->
    <transition name="warp">
      <div v-if="showWarp" class="warp-overlay">
        <div class="warp-circle">
          <div class="warp-circle-inner"></div>
        </div>
        <div class="warp-text">VOL.002</div>
      </div>
    </transition>

    <!-- 返回按钮 -->
    <button class="exit-btn" @click="exitWorld">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M19 12H5M12 19l-7-7 7-7"/>
      </svg>
      <span>Return to Universe</span>
    </button>

    <!-- 分页容器 - 点击切换章节 -->
    <div class="page-container">
      <!-- 章节进度指示器 -->
      <div class="chapter-indicator">
        <span class="current-chapter">{{ String(currentChapter).padStart(2, '0') }}</span>
        <span class="separator">/</span>
        <span class="total-chapters">05</span>
      </div>

      <!-- Chapter 1: 流沙 -->
      <transition name="chapter-fade">
        <section v-if="currentChapter === 1" class="story-chapter chapter-1 is-visible" data-chapter="1">
        <div class="chapter-content">
          <!-- Canvas 沙丘 -->
          <div class="dunes-canvas-container" ref="dunesCanvasContainer">
            <canvas ref="dunesCanvas"></canvas>
          </div>

          <!-- 远景宫殿轮廓 -->
          <div class="palace-silhouette">
            <svg viewBox="0 0 800 400" class="palace-svg">
              <!-- 宫殿主体 -->
              <path d="M200 350 L200 200 L300 150 L500 150 L600 200 L600 350"
                    fill="none" stroke="rgba(201, 169, 89, 0.3)" stroke-width="2"/>
              <path d="M250 200 L250 350 M350 200 L350 350 M450 200 L450 350 M550 200 L550 350"
                    stroke="rgba(201, 169, 89, 0.2)" stroke-width="1"/>
              <!-- 城墙 -->
              <path d="M100 350 L700 350"
                    stroke="rgba(201, 169, 89, 0.4)" stroke-width="3"/>
              <!-- 旗杆 -->
              <line x1="400" y1="150" x2="400" y2="100" stroke="rgba(201, 169, 89, 0.3)" stroke-width="2"/>
              <circle cx="400" cy="95" r="5" fill="rgba(201, 169, 89, 0.5)"/>
            </svg>
          </div>

          <!-- 开场叙事 -->
          <div class="opening-narrative">
            <p class="narrative-text">1930年，西北科学考察团在沙丘发现了第一批竹简。</p>
            <p class="narrative-text-sub">风，吹了三千年，掩埋了一个王朝的背影。</p>
          </div>
        </div>
      </section>
      </transition>

      <!-- Chapter 2: 残简 -->
      <transition name="chapter-fade">
        <section v-if="currentChapter === 2" class="story-chapter chapter-2 is-visible" data-chapter="2">
          <div class="chapter-content">
          <!-- 竹简容器 -->
          <div class="bamboo-container">
            <!-- 史官印章 -->
            <div class="seal-stamp">
              <svg viewBox="0 0 100 100" class="seal-svg">
                <rect x="20" y="20" width="60" height="60" fill="none" stroke="#c9a959" stroke-width="2"/>
                <text x="50" y="58" text-anchor="middle" fill="#c9a959" font-size="16" font-family="serif">史</text>
              </svg>
            </div>

            <!-- 竹简 1 -->
            <div class="bamboo-slip slip-1" :class="{ 'revealed': slipsRevealed >= 1 }">
              <svg viewBox="0 0 300 60" class="bamboo-svg">
                <rect x="0" y="10" width="300" height="40" fill="#e8ddd4" stroke="#c9a959" stroke-width="1"/>
                <line x1="0" y1="10" x2="300" y2="10" stroke="#c9a959" stroke-width="2"/>
                <line x1="0" y1="50" x2="300" y2="50" stroke="#c9a959" stroke-width="2"/>
                <text x="20" y="35" fill="#1a1a1a" font-size="14" font-family="serif">赵雍胡服骑射，让赵国称霸中原</text>
              </svg>
            </div>

            <!-- 竹简 2 -->
            <div class="bamboo-slip slip-2" :class="{ 'revealed': slipsRevealed >= 2 }">
              <svg viewBox="0 0 300 60" class="bamboo-svg">
                <rect x="0" y="10" width="300" height="40" fill="#e8ddd4" stroke="#c9a959" stroke-width="1"/>
                <line x1="0" y1="10" x2="300" y2="10" stroke="#c9a959" stroke-width="2"/>
                <line x1="0" y1="50" x2="300" y2="50" stroke="#c9a959" stroke-width="2"/>
                <text x="20" y="35" fill="#1a1a1a" font-size="14" font-family="serif">主父传位于子何，是为惠文王</text>
              </svg>
            </div>

            <!-- 竹简 3 -->
            <div class="bamboo-slip slip-3" :class="{ 'revealed': slipsRevealed >= 3 }">
              <svg viewBox="0 0 300 60" class="bamboo-svg">
                <rect x="0" y="10" width="300" height="40" fill="#e8ddd4" stroke="#c9a959" stroke-width="1"/>
                <line x1="0" y1="10" x2="300" y2="10" stroke="#c9a959" stroke-width="2"/>
                <line x1="0" y1="50" x2="300" y2="50" stroke="#c9a959" stroke-width="2"/>
                <text x="20" y="35" fill="#1a1a1a" font-size="14" font-family="serif">主父之乱，公子成与李兑起兵</text>
              </svg>
            </div>
          </div>

          <!-- 叙事卡片 -->
          <div class="narrative-cards" v-if="currentNarrative">
            <div class="dual-narrative">
              <div class="narrative-left">
                <p class="narrative-period">{{ currentNarrative.period }}</p>
                <p class="narrative-text">{{ currentNarrative.historical }}</p>
              </div>
              <div class="narrative-divider"></div>
              <div class="narrative-right">
                <p class="narrative-label">考古笔记</p>
                <p class="narrative-text-sub">{{ currentNarrative.archaeological }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      </transition>

      <!-- Chapter 3: 双线 -->
      <transition name="chapter-fade">
        <section v-if="currentChapter === 3" class="story-chapter chapter-3 is-visible" data-chapter="3">
          <div class="chapter-content">
          <!-- 章节标题 -->
          <h2 class="chapter-title">双线交织</h2>
          <p class="chapter-subtitle">战国风云与民国发现</p>

          <!-- 时间线选择器 -->
          <div class="timeline-selector">
            <div
              v-for="(point, index) in narrativeData.chapter3.timeline"
              :key="index"
              class="timeline-point"
              :class="{ 'active': currentTimelineIndex === index, 'visited': timelineVisited[index] }"
              @click="selectTimelinePoint(index)"
            >
              <span class="timeline-year">{{ Math.abs(point.year) }}</span>
              <span class="timeline-title">{{ point.title }}</span>
              <span class="timeline-era">BCE</span>
            </div>
          </div>

          <!-- 双线叙事 -->
          <div class="dual-timeline-container" v-if="currentTimelinePoint">
            <!-- 左侧：战国 -->
            <div class="timeline-left">
              <div class="timeline-header">
                <span class="timeline-label">战国</span>
                <span class="timeline-date">{{ Math.abs(currentTimelinePoint.year) }} BCE</span>
              </div>
              <div class="timeline-content">
                <p class="timeline-text">{{ currentTimelinePoint.warring }}</p>
              </div>
              <!-- 场景装饰 -->
              <div class="scene-decoration" :class="currentTimelinePoint.scene">
                <svg viewBox="0 0 200 100" class="scene-svg">
                  <path d="M20 80 Q50 40 80 80 T140 80 T200 80"
                        fill="none" stroke="rgba(201, 169, 89, 0.3)" stroke-width="2"/>
                  <circle cx="100" cy="50" r="30" fill="none" stroke="rgba(201, 169, 89, 0.2)" stroke-width="1"/>
                </svg>
              </div>
            </div>

            <!-- 中间分割线 -->
            <div class="timeline-divider">
              <div class="divider-line"></div>
              <div class="divider-icon">⏳</div>
            </div>

            <!-- 右侧：民国 -->
            <div class="timeline-right">
              <div class="timeline-header">
                <span class="timeline-label">民国</span>
                <span class="timeline-date">1930</span>
              </div>
              <div class="timeline-content">
                <p class="timeline-text">{{ currentTimelinePoint.republican }}</p>
              </div>
              <!-- 场景装饰 -->
              <div class="scene-decoration modern">
                <svg viewBox="0 0 200 100" class="scene-svg">
                  <rect x="20" y="30" width="160" height="40" fill="none" stroke="rgba(201, 169, 89, 0.3)" stroke-width="1"/>
                  <line x1="40" y1="30" x2="40" y2="70" stroke="rgba(201, 169, 89, 0.2)" stroke-width="1"/>
                  <line x1="60" y1="30" x2="60" y2="70" stroke="rgba(201, 169, 89, 0.2)" stroke-width="1"/>
                  <line x1="80" y1="30" x2="80" y2="70" stroke="rgba(201, 169, 89, 0.2)" stroke-width="1"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>
      </transition>

      <!-- Chapter 4: 困兽 -->
      <transition name="chapter-fade">
        <section v-if="currentChapter === 4" class="story-chapter chapter-4 is-visible" data-chapter="4">
          <div class="chapter-content">
          <!-- 章节标题 -->
          <h2 class="chapter-title-trapped">困兽之斗</h2>
          <p class="chapter-subtitle-trapped">沙丘宫百日围困</p>

          <!-- 宫殿剖面图 -->
          <div class="palace-cross-section">
            <!-- 宫殿轮廓 SVG -->
            <svg viewBox="0 0 800 500" class="palace-cross-svg">
              <!-- 建筑轮廓 -->
              <rect x="100" y="100" width="600" height="400" fill="none" stroke="rgba(201, 169, 89, 0.4)" stroke-width="2"/>

              <!-- 内部房间 -->
              <rect x="150" y="150" width="200" height="150" fill="rgba(201, 169, 89, 0.05)" stroke="rgba(201, 169, 89, 0.3)" stroke-width="1"/>
              <rect x="450" y="150" width="200" height="150" fill="rgba(201, 169, 89, 0.05)" stroke="rgba(201, 169, 89, 0.3)" stroke-width="1"/>
              <rect x="150" y="350" width="200" height="100" fill="rgba(201, 169, 89, 0.05)" stroke="rgba(201, 169, 89, 0.3)" stroke-width="1"/>
              <rect x="450" y="350" width="200" height="100" fill="rgba(201, 169, 89, 0.05)" stroke="rgba(201, 169, 89, 0.3)" stroke-width="1"/>

              <!-- 门 -->
              <rect x="380" y="400" width="40" height="50" fill="rgba(26, 26, 26, 0.3)" stroke="rgba(201, 169, 89, 0.5)" stroke-width="2"/>

              <!-- 窗户 -->
              <rect x="200" y="180" width="40" height="60" fill="none" stroke="rgba(201, 169, 89, 0.2)" stroke-width="1"/>
              <rect x="260" y="180" width="40" height="60" fill="none" stroke="rgba(201, 169, 89, 0.2)" stroke-width="1"/>
              <rect x="500" y="180" width="40" height="60" fill="none" stroke="rgba(201, 169, 89, 0.2)" stroke-width="1"/>
              <rect x="560" y="180" width="40" height="60" fill="none" stroke="rgba(201, 169, 89, 0.2)" stroke-width="1"/>
            </svg>

            <!-- 四支蜡烛 -->
            <div class="candles-container">
              <div
                v-for="(corner, index) in narrativeData.chapter4.corners"
                :key="corner.id"
                class="candle-wrapper"
                :class="corner.position"
                @click="lightCandle(index)"
              >
                <div class="candle" :class="{ 'lit': candlesLit[index] }">
                  <div class="candle-body">
                    <div class="candle-wick"></div>
                    <div class="candle-flame" v-if="candlesLit[index]">
                      <div class="flame-inner"></div>
                    </div>
                  </div>
                  <div class="candle-base"></div>
                </div>
                <div class="corner-label">{{ corner.narrative }}</div>
              </div>
            </div>
          </div>

          <!-- 叙事展示 -->
          <div class="trapped-narrative" v-if="currentCornerNarrative">
            <div class="narrative-scroll">
              <p class="corner-narrative-text">{{ currentCornerNarrative.narrative }}</p>
              <p class="corner-detail-text">{{ currentCornerNarrative.detail }}</p>
            </div>
          </div>

          <!-- 悲剧高潮 -->
          <div class="tragedy-climax" :class="{ 'revealed': allCandlesLit }">
            <p class="tragedy-text">三月后，主父饿死</p>
            <p class="tragedy-date">公元前295年</p>
          </div>
        </div>
      </section>
      </transition>

      <!-- Chapter 5: 回响 -->
      <transition name="chapter-fade">
        <section v-if="currentChapter === 5" class="story-chapter chapter-5 is-visible" data-chapter="5">
          <div class="chapter-content">
          <!-- 博物馆场景 -->
          <div class="museum-scene">
            <!-- 青铜雕像 -->
            <div class="bronze-statue">
              <svg viewBox="0 0 300 400" class="statue-svg">
                <!-- 底座 -->
                <rect x="80" y="320" width="140" height="60" fill="rgba(201, 169, 89, 0.3)" stroke="rgba(201, 169, 89, 0.5)" stroke-width="2"/>
                <rect x="90" y="325" width="120" height="50" fill="rgba(201, 169, 89, 0.2)" stroke="none"/>

                <!-- 人物轮廓 -->
                <ellipse cx="150" cy="120" rx="50" ry="60" fill="rgba(201, 169, 89, 0.4)" stroke="rgba(201, 169, 89, 0.6)" stroke-width="2"/>

                <!-- 身体 -->
                <path d="M100 180 L90 300 L120 310 L150 280 L180 310 L210 300 L200 180 Z"
                      fill="rgba(201, 169, 89, 0.35)" stroke="rgba(201, 169, 89, 0.5)" stroke-width="2"/>

                <!-- 手臂 -->
                <path d="M100 180 L70 220 L80 225 L110 190"
                      fill="none" stroke="rgba(201, 169, 89, 0.5)" stroke-width="3" stroke-linecap="round"/>
                <path d="M200 180 L230 220 L220 225 L190 190"
                      fill="none" stroke="rgba(201, 169, 89, 0.5)" stroke-width="3" stroke-linecap="round"/>

                <!-- 眼睛 -->
                <ellipse cx="135" cy="115" rx="8" ry="5" fill="rgba(201, 169, 89, 0.6)"/>
                <ellipse cx="165" cy="115" rx="8" ry="5" fill="rgba(201, 169, 89, 0.6)"/>
              </svg>

              <!-- 雕像光晕 -->
              <div class="statue-glow"></div>
            </div>

            <!-- 历史记录卷轴 -->
            <div class="historical-record">
              <h3 class="record-title">赵武灵王</h3>
              <p class="record-reign">{{ narrativeData.chapter5.biography.reign }}</p>

              <div class="record-section">
                <h4 class="section-title">功绩</h4>
                <ul class="achievements-list">
                  <li v-for="(achievement, index) in narrativeData.chapter5.biography.achievements"
                      :key="index">
                    {{ achievement }}
                  </li>
                </ul>
              </div>

              <div class="record-section">
                <h4 class="section-title">悲剧</h4>
                <ul class="tragedy-list">
                  <li v-for="(tragedy, index) in narrativeData.chapter5.biography.tragedy"
                      :key="index">
                    {{ tragedy }}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- 最终反思 -->
          <div class="final-reflection">
            <blockquote class="main-quote">
              "{{ narrativeData.chapter5.reflection.mainQuote }}"
            </blockquote>

            <p class="reflection-commentary">
              {{ narrativeData.chapter5.reflection.commentary }}
            </p>

            <p class="historical-impact">
              {{ narrativeData.chapter5.reflection.historicalImpact }}
            </p>
          </div>

          <!-- 结语 -->
          <div class="epilogue">
            <p class="epilogue-text">历史的尘埃终将落定</p>
            <p class="epilogue-sub">但回响，永不止息</p>
          </div>
        </div>
      </section>
      </transition>

      <!-- 导航按钮 -->
      <div class="chapter-navigation">
        <button
          class="nav-btn prev-btn"
          :class="{ 'disabled': currentChapter === 1 }"
          @click="prevChapter"
          :disabled="currentChapter === 1"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
          <span>上一章</span>
        </button>

        <button
          class="nav-btn next-btn"
          :class="{ 'disabled': currentChapter === 5 }"
          @click="nextChapter"
          :disabled="currentChapter === 5"
        >
          <span>{{ currentChapter === 5 ? '完成探索' : '下一章' }}</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { narrativeData } from '../data/narrativeData.js'

const router = useRouter()
const dunesCanvas = ref(null)
const dunesCanvasContainer = ref(null)
const isTransitioning = ref(false)
const showWarp = ref(true)

// 当前章节
const currentChapter = ref(1)

// Chapter 2 状态
const slipsRevealed = ref(0)
const currentNarrative = ref(null)

// Chapter 3 状态
const currentTimelineIndex = ref(0)
const timelineVisited = ref([false, false, false, false])

// Chapter 4 状态
const candlesLit = ref([false, false, false, false])
const currentCornerIndex = ref(-1)

// 计算属性：当前时间线节点
const currentTimelinePoint = computed(() => {
  return narrativeData.chapter3.timeline[currentTimelineIndex.value]
})

// 计算属性：当前角落叙事
const currentCornerNarrative = computed(() => {
  if (currentCornerIndex.value >= 0) {
    return narrativeData.chapter4.corners[currentCornerIndex.value]
  }
  return null
})

// 计算属性：所有蜡烛是否已点燃
const allCandlesLit = computed(() => {
  return candlesLit.value.every(lit => lit === true)
})

// 选择时间线节点
const selectTimelinePoint = (index) => {
  currentTimelineIndex.value = index
  timelineVisited.value[index] = true
}

let dunesAnimationId = null
let dunesCtx = null
let particles = []
let mouseX = 0
let mouseY = 0
let chapter2Initialized = false
let chapter3Initialized = false

// 沙粒类
class SandParticle {
  constructor(canvasWidth, canvasHeight) {
    this.canvasWidth = canvasWidth
    this.canvasHeight = canvasHeight
    this.reset()
  }

  reset() {
    this.x = Math.random() * this.canvasWidth
    this.y = Math.random() * this.canvasHeight
    this.size = Math.random() * 2 + 1
    this.speedX = Math.random() * 0.5 - 0.25
    this.speedY = Math.random() * 0.5 + 0.2
    this.opacity = Math.random() * 0.5 + 0.2
    this.color = `rgba(201, 169, 89, ${this.opacity})`
  }

  update(windX, windY) {
    // 受风向影响
    this.x += this.speedX + windX * 0.5
    this.y += this.speedY + windY * 0.3

    // 边界检测
    if (this.x > this.canvasWidth) this.x = 0
    if (this.x < 0) this.x = this.canvasWidth
    if (this.y > this.canvasHeight) this.y = 0
    if (this.y < 0) this.y = this.canvasHeight
  }

  draw(ctx) {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fillStyle = this.color
    ctx.fill()
  }
}

// 初始化沙丘 Canvas
const initDunesCanvas = () => {
  if (!dunesCanvas.value || !dunesCanvasContainer.value) return

  const canvas = dunesCanvas.value
  const container = dunesCanvasContainer.value
  dunesCtx = canvas.getContext('2d')

  // 设置 Canvas 尺寸
  const resizeCanvas = () => {
    const rect = container.getBoundingClientRect()
    canvas.width = rect.width
    canvas.height = rect.height
  }

  resizeCanvas()

  // 创建沙粒粒子（200个）
  const particleCount = 200
  for (let i = 0; i < particleCount; i++) {
    particles.push(new SandParticle(canvas.width, canvas.height))
  }

  // 鼠标移动监听
  const handleMouseMove = (e) => {
    const rect = canvas.getBoundingClientRect()
    mouseX = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2)
    mouseY = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2)
  }

  canvas.addEventListener('mousemove', handleMouseMove)

  // 动画循环
  const animate = () => {
    dunesCtx.clearRect(0, 0, canvas.width, canvas.height)

    // 绘制所有粒子
    particles.forEach(particle => {
      particle.update(mouseX, mouseY)
      particle.draw(dunesCtx)
    })

    dunesAnimationId = requestAnimationFrame(animate)
  }

  dunesAnimationId = requestAnimationFrame(animate)

  // 监听容器尺寸变化
  const resizeObserver = new ResizeObserver(() => {
    resizeCanvas()
    particles.forEach(p => {
      p.canvasWidth = canvas.width
      p.canvasHeight = canvas.height
    })
  })

  resizeObserver.observe(container)

  // 保存 observer 和事件监听器用于清理
  canvas._resizeObserver = resizeObserver
  canvas._mouseMoveHandler = handleMouseMove
}

// 初始化竹简动画（Chapter 2）
const initBambooSlips = () => {
  const bambooData = narrativeData.chapter2.bambooSlips

  // 依次展开竹简
  bambooData.forEach((slip, index) => {
    setTimeout(() => {
      slipsRevealed.value = index + 1
      currentNarrative.value = slip
    }, 800 * (index + 1))
  })
}

// 初始化时间线（Chapter 3）
const initTimeline = () => {
  // 自动播放时间线序列
  const timelineData = narrativeData.chapter3.timeline

  timelineData.forEach((point, index) => {
    setTimeout(() => {
      currentTimelineIndex.value = index
      timelineVisited.value[index] = true
    }, 1500 * (index + 1))
  })
}

// 点燃蜡烛（Chapter 4）
const lightCandle = (index) => {
  if (!candlesLit.value[index]) {
    candlesLit.value[index] = true
    currentCornerIndex.value = index
  }
}

// 章节导航
const nextChapter = () => {
  if (currentChapter.value < 5) {
    currentChapter.value++
    initChapterContent()
  } else {
    // 最后一章，可以退出或做其他处理
    exitWorld()
  }
}

const prevChapter = () => {
  if (currentChapter.value > 1) {
    currentChapter.value--
    initChapterContent()
  }
}

// 初始化章节内容
const initChapterContent = () => {
  nextTick(() => {
    // Chapter 1: 初始化沙丘动画
    if (currentChapter.value === 1) {
      initDunesCanvas()
    }

    // Chapter 2: 初始化竹简动画
    if (currentChapter.value === 2 && !chapter2Initialized) {
      initBambooSlips()
      chapter2Initialized = true
    }

    // Chapter 3: 初始化时间线
    if (currentChapter.value === 3 && !chapter3Initialized) {
      initTimeline()
      chapter3Initialized = true
    }
  })
}

// 退出世界
const exitWorld = async () => {
  isTransitioning.value = true
  await nextTick()
  setTimeout(() => {
    router.push('/universe')
  }, 800)
}

onMounted(async () => {
  // 跃迁动画：1.8秒后消失
  setTimeout(() => {
    showWarp.value = false
  }, 1800)

  await nextTick()

  // 初始化第一章内容
  initChapterContent()
})

onUnmounted(() => {

  // 清理 Canvas 动画
  if (dunesAnimationId) {
    cancelAnimationFrame(dunesAnimationId)
  }

  // 清理 ResizeObserver 和事件监听器
  if (dunesCanvas.value) {
    if (dunesCanvas.value._resizeObserver) {
      dunesCanvas.value._resizeObserver.disconnect()
    }
    if (dunesCanvas.value._mouseMoveHandler) {
      dunesCanvas.value.removeEventListener('mousemove', dunesCanvas.value._mouseMoveHandler)
    }
  }
})
</script>

<style scoped>
.trapped-in-dunes {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(180deg, #f7f5f2 0%, #e8ddd4 100%);
  overflow: hidden;
  z-index: 1000;
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
  border: 1px solid rgba(201, 169, 89, 0.3);
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
  border: 1px solid rgba(201, 169, 89, 0.5);
  border-radius: 50%;
  animation: warp-pulse 1s ease-in-out infinite;
}

.warp-text {
  position: absolute;
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  letter-spacing: 0.3em;
  color: rgba(201, 169, 89, 0.8);
  animation: warp-fade 1.5s ease-out forwards;
}

@keyframes warp-expand {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: scale(3);
    opacity: 0;
  }
}

@keyframes warp-pulse {
  0%, 100% {
    transform: translate(-50%, -50%) scale(1);
  }
  50% {
    transform: translate(-50%, -50%) scale(1.1);
  }
}

@keyframes warp-fade {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  50% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
  }
}

.warp-enter-active,
.warp-leave-active {
  transition: opacity 0.5s ease;
}

.warp-enter-from,
.warp-leave-to {
  opacity: 0;
}

/* === 返回按钮 === */
.exit-btn {
  position: absolute;
  top: 2rem;
  left: 2rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1.5rem;
  background: rgba(26, 26, 26, 0.03);
  border: 1px solid rgba(26, 26, 26, 0.08);
  color: #1a1a1a;
  backdrop-filter: blur(10px);
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
  background: rgba(26, 26, 26, 0.9);
  color: #f7f5f2;
  transform: translateX(-3px);
}

.exit-btn svg {
  width: 16px;
  height: 16px;
}

/* === 分页容器 === */
.page-container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
  scroll-behavior: smooth;
}

.page-container::-webkit-scrollbar {
  width: 6px;
}

.page-container::-webkit-scrollbar-track {
  background: rgba(26, 26, 26, 0.02);
}

.page-container::-webkit-scrollbar-thumb {
  background: rgba(201, 169, 89, 0.3);
  border-radius: 3px;
}

.page-container::-webkit-scrollbar-thumb:hover {
  background: rgba(201, 169, 89, 0.5);
}

/* === 章节指示器 === */
.chapter-indicator {
  position: absolute;
  top: 2rem;
  right: 2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.9);
  padding: 0.75rem 1.25rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.current-chapter {
  font-family: 'Inter', sans-serif;
  font-size: 1.1rem;
  font-weight: 600;
  color: #c9a959;
  letter-spacing: 0.1em;
}

.separator {
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  color: rgba(26, 26, 26, 0.4);
  margin: 0 0.25rem;
}

.total-chapters {
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  color: rgba(26, 26, 26, 0.6);
  letter-spacing: 0.1em;
}

/* === 章节导航 === */
.chapter-navigation {
  position: fixed;
  bottom: 2rem;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: 2rem;
  padding: 0 2rem;
  z-index: 1000;
  background: linear-gradient(to top, rgba(247, 245, 242, 0.95) 0%, transparent 100%);
  padding-top: 2rem;
  padding-bottom: 1rem;
}

.nav-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid rgba(201, 169, 89, 0.4);
  border-radius: 8px;
  color: #1a1a1a;
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.nav-btn:hover:not(.disabled) {
  background: rgba(201, 169, 89, 0.15);
  border-color: #c9a959;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(201, 169, 89, 0.3);
}

.nav-btn:active:not(.disabled) {
  transform: translateY(0);
}

.nav-btn.disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.nav-btn svg {
  width: 20px;
  height: 20px;
  transition: transform 0.3s ease;
}

.nav-btn:hover:not(.disabled) svg {
  transform: scale(1.1);
}

.prev-btn {
  flex-direction: row;
}

.next-btn {
  flex-direction: row-reverse;
}

/* === 章节切换动画 === */
.chapter-fade-enter-active,
.chapter-fade-leave-active {
  transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.chapter-fade-enter-from {
  opacity: 0;
  transform: translateX(40px);
}

.chapter-fade-leave-to {
  opacity: 0;
  transform: translateX(-40px);
}

.chapter-fade-enter-to,
.chapter-fade-leave-from {
  opacity: 1;
  transform: translateX(0);
}

/* === 章节通用样式 === */
.story-chapter {
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 6rem 2rem 10rem; /* 底部留出更多空间给固定导航栏 */
  opacity: 0;
  transform: translateY(40px);
  transition: all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.story-chapter.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.chapter-content {
  text-align: center;
  z-index: 2;
  padding: 0 2rem;
}

.placeholder-text {
  font-family: 'Noto Serif SC', serif;
  font-size: clamp(1.5rem, 3vw, 2rem);
  color: #1a1a1a;
  opacity: 0.5;
}

/* === Chapter 1: 流沙 === */
.chapter-1 {
  background: linear-gradient(180deg, #f7f5f2 0%, #e8ddd4 50%, #d4c9b8 100%);
  overflow: hidden;
}

.dunes-canvas-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.dunes-canvas-container canvas {
  width: 100%;
  height: 100%;
  display: block;
}

.opening-narrative {
  position: relative;
  z-index: 3;
  text-align: center;
  opacity: 0;
  animation: narrative-fade-in 2s ease-out 2.5s forwards;
}

.narrative-text {
  font-family: 'Noto Serif SC', serif;
  font-size: clamp(1.6rem, 3.5vw, 2.2rem);
  font-weight: 300;
  color: #1a1a1a;
  letter-spacing: 0.25em;
  margin-bottom: 1rem;
  line-height: 1.8;
}

.narrative-text-sub {
  font-family: 'Inter', sans-serif;
  font-size: clamp(0.9rem, 2vw, 1.2rem);
  font-weight: 300;
  color: rgba(26, 26, 26, 0.6);
  letter-spacing: 0.15em;
  font-style: italic;
}

@keyframes narrative-fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* === 宫殿轮廓 === */
.palace-silhouette {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  pointer-events: none;
  opacity: 0;
  animation: palace-fade-in 3s ease-out 1s forwards;
}

.palace-svg {
  width: 100%;
  height: 100%;
  animation: palace-float 8s ease-in-out infinite;
}

@keyframes palace-fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes palace-float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

/* === Chapter 2: 残简 === */
.chapter-2 {
  background: linear-gradient(180deg, #d4c9b8 0%, #e8ddd4 50%, #f7f5f2 100%);
  overflow: hidden;
}

.bamboo-container {
  position: relative;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  z-index: 2;
}

.seal-stamp {
  position: absolute;
  top: 5%;
  right: 10%;
  width: 80px;
  height: 80px;
  opacity: 0;
  animation: seal-appear 2s ease-out 1s forwards;
}

.seal-svg {
  width: 100%;
  height: 100%;
  animation: seal-rotate 20s linear infinite;
}

@keyframes seal-appear {
  from {
    opacity: 0;
    transform: scale(0.5) rotate(-180deg);
  }
  to {
    opacity: 0.6;
    transform: scale(1) rotate(0deg);
  }
}

@keyframes seal-rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.bamboo-slip {
  width: 300px;
  opacity: 0;
  transform: translateY(30px) rotate(-5deg);
  transition: all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.bamboo-slip.revealed {
  opacity: 1;
  transform: translateY(0) rotate(0deg);
}

.bamboo-slip.slip-1 {
  transition-delay: 0.5s;
}

.bamboo-slip.slip-2 {
  transition-delay: 1.5s;
}

.bamboo-slip.slip-3 {
  transition-delay: 2.5s;
}

.bamboo-svg {
  width: 100%;
  height: auto;
  filter: drop-shadow(0 4px 8px rgba(201, 169, 89, 0.3));
}

/* 叙事卡片 */
.narrative-cards {
  margin-top: 2rem;
  animation: cards-fade-in 1s ease-out 3.5s forwards;
  opacity: 0;
}

.dual-narrative {
  display: flex;
  align-items: stretch;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(201, 169, 89, 0.3);
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.narrative-left {
  flex: 1;
  padding-right: 2rem;
  border-right: 1px solid rgba(201, 169, 89, 0.2);
}

.narrative-right {
  flex: 1;
  padding-left: 2rem;
}

.narrative-divider {
  width: 1px;
  background: rgba(201, 169, 89, 0.3);
}

.narrative-period {
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  color: #c9a959;
  letter-spacing: 0.2em;
  margin-bottom: 0.5rem;
}

.narrative-text {
  font-family: 'Noto Serif SC', serif;
  font-size: 1.1rem;
  color: #1a1a1a;
  line-height: 1.8;
  margin-bottom: 0.5rem;
}

.narrative-label {
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  color: #666;
  letter-spacing: 0.15em;
  margin-bottom: 0.5rem;
}

.narrative-text-sub {
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  color: #666;
  line-height: 1.6;
  font-style: italic;
}

@keyframes cards-fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* === Chapter 3: 双线 === */
.chapter-3 {
  background: linear-gradient(180deg, #f7f5f2 0%, #e8ddd4 50%, #d4c9b8 100%);
  overflow: hidden;
}

.chapter-title {
  font-family: 'Noto Serif SC', serif;
  font-size: clamp(2rem, 5vw, 2.5rem);
  font-weight: 300;
  color: #1a1a1a;
  letter-spacing: 0.3em;
  margin-bottom: 0.5rem;
  opacity: 0;
  animation: chapter-title-fade 1s ease-out forwards;
}

.chapter-subtitle {
  font-family: 'Inter', sans-serif;
  font-size: clamp(0.9rem, 2vw, 1.1rem);
  font-weight: 300;
  color: rgba(26, 26, 26, 0.6);
  letter-spacing: 0.15em;
  margin-bottom: 3rem;
  opacity: 0;
  animation: chapter-subtitle-fade 1s ease-out 0.3s forwards;
}

@keyframes chapter-title-fade {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes chapter-subtitle-fade {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 时间线选择器 */
.timeline-selector {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.timeline-point {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem 1rem;
  background: rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(201, 169, 89, 0.3);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  min-width: 100px;
}

.timeline-point:hover {
  transform: translateY(-4px);
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.timeline-point.active {
  background: rgba(201, 169, 89, 0.15);
  border-color: #c9a959;
  box-shadow: 0 4px 12px rgba(201, 169, 89, 0.3);
}

.timeline-point.visited {
  border-color: rgba(201, 169, 89, 0.5);
}

.timeline-year {
  font-family: 'Inter', sans-serif;
  font-size: 1.5rem;
  font-weight: 600;
  color: #c9a959;
  margin-bottom: 0.5rem;
}

.timeline-title {
  font-family: 'Noto Serif SC', serif;
  font-size: 0.9rem;
  color: #1a1a1a;
  letter-spacing: 0.1em;
  margin-bottom: 0.25rem;
}

.timeline-era {
  font-family: 'Inter', sans-serif;
  font-size: 0.65rem;
  color: rgba(26, 26, 26, 0.5);
  letter-spacing: 0.15em;
}

/* 双线时间线容器 */
.dual-timeline-container {
  display: flex;
  align-items: stretch;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  opacity: 0;
  animation: timeline-fade-in 1s ease-out 0.8s forwards;
}

@keyframes timeline-fade-in {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.timeline-left {
  flex: 1;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(201, 169, 89, 0.3);
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  transition: all 0.4s ease;
}

.timeline-right {
  flex: 1;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(201, 169, 89, 0.3);
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  transition: all 0.4s ease;
}

.timeline-divider {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 60px;
}

.divider-line {
  flex: 1;
  width: 1px;
  background: linear-gradient(180deg,
    transparent 0%,
    rgba(201, 169, 89, 0.3) 20%,
    rgba(201, 169, 89, 0.3) 80%,
    transparent 100%
  );
}

.divider-icon {
  font-size: 1.5rem;
  margin: 1rem 0;
  animation: divider-pulse 2s ease-in-out infinite;
}

@keyframes divider-pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.6;
  }
  50% {
    transform: scale(1.1);
    opacity: 1;
  }
}

.timeline-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(201, 169, 89, 0.2);
}

.timeline-label {
  font-family: 'Noto Serif SC', serif;
  font-size: 1.1rem;
  font-weight: 600;
  color: #c9a959;
  letter-spacing: 0.2em;
}

.timeline-date {
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  color: rgba(26, 26, 26, 0.5);
  letter-spacing: 0.15em;
}

.timeline-content {
  margin-bottom: 1.5rem;
}

.timeline-text {
  font-family: 'Noto Serif SC', serif;
  font-size: 1rem;
  color: #1a1a1a;
  line-height: 1.8;
  margin: 0;
}

.scene-decoration {
  margin-top: auto;
  opacity: 0.6;
}

.scene-svg {
  width: 100%;
  height: 80px;
}

/* === Chapter 4: 困兽 === */
.chapter-4 {
  background: linear-gradient(180deg, #d4c9b8 0%, #c9a959 30%, #a08050 100%);
  overflow: hidden;
}

.chapter-title-trapped {
  font-family: 'Noto Serif SC', serif;
  font-size: clamp(2rem, 5vw, 2.5rem);
  font-weight: 400;
  color: #1a1a1a;
  letter-spacing: 0.3em;
  margin-bottom: 0.5rem;
  opacity: 0;
  animation: chapter-title-fade 1s ease-out forwards;
}

.chapter-subtitle-trapped {
  font-family: 'Inter', sans-serif;
  font-size: clamp(0.9rem, 2vw, 1.1rem);
  font-weight: 300;
  color: rgba(26, 26, 26, 0.7);
  letter-spacing: 0.15em;
  margin-bottom: 3rem;
  opacity: 0;
  animation: chapter-subtitle-fade 1s ease-out 0.3s forwards;
}

/* 宫殿剖面图 */
.palace-cross-section {
  position: relative;
  max-width: 900px;
  margin: 0 auto 3rem;
  opacity: 0;
  animation: palace-fade-in 1.5s ease-out 0.6s forwards;
}

.palace-cross-svg {
  width: 100%;
  height: auto;
  filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.2));
}

@keyframes palace-fade-in {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* 蜡烛容器 */
.candles-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.candle-wrapper {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  pointer-events: auto;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.candle-wrapper:hover {
  transform: scale(1.1);
}

.candle-wrapper.top-left {
  top: 15%;
  left: 15%;
}

.candle-wrapper.top-right {
  top: 15%;
  right: 15%;
}

.candle-wrapper.bottom-left {
  bottom: 20%;
  left: 15%;
}

.candle-wrapper.bottom-right {
  bottom: 20%;
  right: 15%;
}

/* 蜡烛 */
.candle {
  position: relative;
  width: 40px;
  height: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
}

.candle-body {
  width: 20px;
  height: 40px;
  background: linear-gradient(180deg, #f5f5f5 0%, #e0e0e0 100%);
  border-radius: 2px;
  position: relative;
  box-shadow: inset -2px 0 4px rgba(0, 0, 0, 0.1);
}

.candle-wick {
  position: absolute;
  top: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 2px;
  height: 8px;
  background: #333;
}

.candle-flame {
  position: absolute;
  top: -25px;
  left: 50%;
  transform: translateX(-50%);
  width: 16px;
  height: 20px;
  animation: flame-flicker 0.5s ease-in-out infinite alternate;
}

.flame-inner {
  width: 100%;
  height: 100%;
  background: radial-gradient(ellipse at bottom,
    #fff 0%,
    #ffdd00 30%,
    #ff8c00 60%,
    #ff4500 100%
  );
  border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
  box-shadow: 0 0 10px #ffdd00,
              0 0 20px #ff8c00,
              0 0 30px #ff4500;
  animation: flame-pulse 1s ease-in-out infinite;
}

@keyframes flame-flicker {
  0% {
    transform: translateX(-50%) rotate(-3deg) scale(1);
  }
  100% {
    transform: translateX(-50%) rotate(3deg) scale(1.05);
  }
}

@keyframes flame-pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.9;
  }
}

.candle-base {
  width: 24px;
  height: 8px;
  background: linear-gradient(180deg, #e0e0e0 0%, #ccc 100%);
  border-radius: 2px;
  margin-top: -2px;
}

.corner-label {
  font-family: 'Noto Serif SC', serif;
  font-size: 0.7rem;
  color: #1a1a1a;
  text-align: center;
  background: rgba(255, 255, 255, 0.9);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  max-width: 100px;
  line-height: 1.4;
}

/* 叙事展示 */
.trapped-narrative {
  max-width: 700px;
  margin: 0 auto 2rem;
  opacity: 0;
  animation: narrative-scroll-fade 1s ease-out forwards;
}

.narrative-scroll {
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid rgba(201, 169, 89, 0.4);
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

@keyframes narrative-scroll-fade {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.corner-narrative-text {
  font-family: 'Noto Serif SC', serif;
  font-size: 1.3rem;
  font-weight: 600;
  color: #c9a959;
  letter-spacing: 0.2em;
  margin-bottom: 1rem;
}

.corner-detail-text {
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  color: #333;
  line-height: 1.8;
  margin: 0;
}

/* 悲剧高潮 */
.tragedy-climax {
  max-width: 600px;
  margin: 3rem auto 0;
  padding: 3rem 2rem;
  background: rgba(26, 26, 26, 0.9);
  border: 2px solid #c9a959;
  border-radius: 8px;
  text-align: center;
  opacity: 0;
  transition: all 1s ease;
}

.tragedy-climax.revealed {
  opacity: 1;
  animation: tragedy-reveal 2s ease-out forwards;
}

@keyframes tragedy-reveal {
  0% {
    opacity: 0;
    transform: scale(0.9);
  }
  50% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 1;
    transform: scale(1);
    box-shadow: 0 0 60px rgba(201, 169, 89, 0.6);
  }
}

.tragedy-text {
  font-family: 'Noto Serif SC', serif;
  font-size: clamp(1.8rem, 4vw, 2.2rem);
  font-weight: 600;
  color: #f7f5f2;
  letter-spacing: 0.3em;
  margin-bottom: 0.5rem;
}

.tragedy-date {
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  color: #c9a959;
  letter-spacing: 0.2em;
  margin: 0;
}

/* === Chapter 5: 回响 === */
.chapter-5 {
  background: linear-gradient(180deg, #a08050 0%, #8b7045 50%, #7a6038 100%);
  overflow: hidden;
}

/* 博物馆场景 */
.museum-scene {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3rem;
  max-width: 1100px;
  margin: 0 auto 2.5rem;
  padding: 1.5rem;
  opacity: 0;
  animation: museum-fade-in 1.5s ease-out 0.5s forwards;
}

@keyframes museum-fade-in {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 青铜雕像 */
.bronze-statue {
  position: relative;
  flex-shrink: 0;
}

.statue-svg {
  width: 220px;
  height: 293px;
  filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.3));
}

.statue-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 200px;
  background: radial-gradient(circle,
    rgba(201, 169, 89, 0.3) 0%,
    rgba(201, 169, 89, 0.1) 40%,
    transparent 70%
  );
  border-radius: 50%;
  animation: statue-glow-pulse 3s ease-in-out infinite;
  z-index: -1;
}

@keyframes statue-glow-pulse {
  0%, 100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.6;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.2);
    opacity: 1;
  }
}

/* 历史记录 */
.historical-record {
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid rgba(201, 169, 89, 0.4);
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  max-width: 450px;
}

.record-title {
  font-family: 'Noto Serif SC', serif;
  font-size: 1.75rem;
  font-weight: 600;
  color: #c9a959;
  letter-spacing: 0.3em;
  margin-bottom: 0.5rem;
}

.record-reign {
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  color: rgba(26, 26, 26, 0.6);
  letter-spacing: 0.15em;
  margin-bottom: 1.5rem;
}

.record-section {
  margin-bottom: 1.5rem;
}

.record-section:last-child {
  margin-bottom: 0;
}

.section-title {
  font-family: 'Noto Serif SC', serif;
  font-size: 1.2rem;
  font-weight: 600;
  color: #1a1a1a;
  letter-spacing: 0.2em;
  margin-bottom: 1rem;
  border-bottom: 2px solid rgba(201, 169, 89, 0.3);
  padding-bottom: 0.5rem;
}

.achievements-list,
.tragedy-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.achievements-list li {
  font-family: 'Noto Serif SC', serif;
  font-size: 1rem;
  color: #333;
  line-height: 2;
  padding-left: 1.5rem;
  position: relative;
}

.achievements-list li::before {
  content: '✦';
  position: absolute;
  left: 0;
  color: #c9a959;
  font-size: 0.8rem;
}

.tragedy-list li {
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  color: #666;
  line-height: 1.8;
  padding-left: 1.5rem;
  position: relative;
  font-style: italic;
}

.tragedy-list li::before {
  content: '·';
  position: absolute;
  left: 0.5rem;
  color: rgba(201, 169, 89, 0.6);
  font-size: 1.2rem;
}

/* 最终反思 */
.final-reflection {
  max-width: 750px;
  margin: 0 auto 2rem;
  padding: 2rem 1.5rem;
  background: rgba(255, 255, 255, 0.98);
  border: 2px solid rgba(201, 169, 89, 0.3);
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  opacity: 0;
  animation: reflection-fade-in 1.5s ease-out 1s forwards;
}

@keyframes reflection-fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.main-quote {
  font-family: 'Noto Serif SC', serif;
  font-size: clamp(1.4rem, 3vw, 1.7rem);
  font-weight: 300;
  color: #1a1a1a;
  line-height: 1.8;
  text-align: center;
  letter-spacing: 0.15em;
  margin: 0 0 1.5rem 0;
  padding: 1.5rem 0;
  border-top: 1px solid rgba(201, 169, 89, 0.3);
  border-bottom: 1px solid rgba(201, 169, 89, 0.3);
}

.reflection-commentary {
  font-family: 'Noto Serif SC', serif;
  font-size: 1rem;
  color: #333;
  line-height: 1.8;
  text-align: justify;
  margin-bottom: 1rem;
}

.historical-impact {
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  color: #666;
  line-height: 1.7;
  text-align: justify;
  font-style: italic;
  margin: 0;
}

/* 结语 */
.epilogue {
  text-align: center;
  padding: 2rem 1.5rem;
  opacity: 0;
  animation: epilogue-fade-in 2s ease-out 1.5s forwards;
}

@keyframes epilogue-fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.epilogue-text {
  font-family: 'Noto Serif SC', serif;
  font-size: clamp(1.3rem, 3vw, 1.8rem);
  font-weight: 300;
  color: rgba(255, 255, 255, 0.95);
  letter-spacing: 0.3em;
  margin-bottom: 0.5rem;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.epilogue-sub {
  font-family: 'Inter', sans-serif;
  font-size: clamp(0.85rem, 2vw, 1rem);
  font-weight: 300;
  color: rgba(255, 255, 255, 0.8);
  letter-spacing: 0.2em;
  font-style: italic;
  margin: 0;
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
}

/* === 响应式设计 === */
@media (max-width: 768px) {
  .exit-btn {
    top: 1rem;
    left: 1rem;
    padding: 0.625rem 1rem;
    font-size: 0.6rem;
  }

  .chapter-indicator {
    top: 1rem;
    right: 1rem;
    padding: 0.5rem 1rem;
  }

  .current-chapter {
    font-size: 1rem;
  }

  .separator {
    font-size: 0.9rem;
  }

  .total-chapters {
    font-size: 0.8rem;
  }

  .chapter-navigation {
    bottom: 1rem;
    gap: 1rem;
    padding: 0 1rem;
  }

  .nav-btn {
    padding: 0.875rem 1.25rem;
    font-size: 0.75rem;
    gap: 0.5rem;
  }

  .nav-btn svg {
    width: 16px;
    height: 16px;
  }

  .warp-circle {
    width: 200px;
    height: 200px;
  }

  .warp-circle-inner {
    width: 140px;
    height: 140px;
  }

  .warp-text {
    font-size: 0.7rem;
  }

  .narrative-text {
    font-size: clamp(1.2rem, 4vw, 1.6rem);
  }

  .narrative-text-sub {
    font-size: clamp(0.7rem, 2.5vw, 0.9rem);
  }

  /* Chapter 2 响应式 */
  .bamboo-container {
    max-width: 100%;
    padding: 0 1rem;
    gap: 1.5rem;
  }

  .seal-stamp {
    width: 60px;
    height: 60px;
    top: 3%;
    right: 5%;
  }

  .bamboo-slip {
    width: 260px;
  }

  .dual-narrative {
    flex-direction: column;
    padding: 1.5rem;
  }

  .narrative-left {
    padding-right: 0;
    padding-bottom: 1.5rem;
    border-right: none;
    border-bottom: 1px solid rgba(201, 169, 89, 0.2);
  }

  .narrative-right {
    padding-left: 0;
    padding-top: 0;
  }

  .narrative-divider {
    display: none;
  }

  .narrative-text {
    font-size: 1rem;
  }

  .narrative-text-sub {
    font-size: 0.9rem;
  }

  /* Chapter 3 响应式 */
  .chapter-title {
    font-size: clamp(1.5rem, 5vw, 2rem);
  }

  .chapter-subtitle {
    font-size: clamp(0.8rem, 2.5vw, 1rem);
    margin-bottom: 2rem;
  }

  .timeline-selector {
    gap: 1rem;
  }

  .timeline-point {
    padding: 1rem 0.75rem;
    min-width: 80px;
  }

  .timeline-year {
    font-size: 1.2rem;
  }

  .timeline-title {
    font-size: 0.75rem;
  }

  .dual-timeline-container {
    flex-direction: column;
    gap: 1.5rem;
  }

  .timeline-left,
  .timeline-right {
    padding: 1.5rem;
  }

  .timeline-divider {
    width: 100%;
    flex-direction: row;
    height: 40px;
  }

  .divider-line {
    width: 100%;
    height: 1px;
    background: linear-gradient(90deg,
      transparent 0%,
      rgba(201, 169, 89, 0.3) 20%,
      rgba(201, 169, 89, 0.3) 80%,
      transparent 100%
    );
    flex: 1;
  }

  .divider-icon {
    margin: 0 1rem;
  }

  .timeline-text {
    font-size: 0.95rem;
  }

  /* Chapter 4 响应式 */
  .chapter-title-trapped {
    font-size: clamp(1.5rem, 5vw, 2rem);
  }

  .chapter-subtitle-trapped {
    font-size: clamp(0.8rem, 2.5vw, 1rem);
    margin-bottom: 2rem;
  }

  .palace-cross-section {
    margin-bottom: 2rem;
  }

  .candle-wrapper {
    transform: scale(0.8);
  }

  .candle-wrapper.top-left,
  .candle-wrapper.top-right {
    top: 10%;
  }

  .candle-wrapper.bottom-left,
  .candle-wrapper.bottom-right {
    bottom: 15%;
  }

  .corner-label {
    font-size: 0.6rem;
    max-width: 80px;
  }

  .trapped-narrative {
    margin: 0 auto 1.5rem;
  }

  .narrative-scroll {
    padding: 1.5rem;
  }

  .corner-narrative-text {
    font-size: 1.1rem;
  }

  .corner-detail-text {
    font-size: 0.9rem;
  }

  .tragedy-climax {
    padding: 2rem 1.5rem;
    margin-top: 2rem;
  }

  .tragedy-text {
    font-size: clamp(1.3rem, 4vw, 1.8rem);
  }

  .tragedy-date {
    font-size: 0.9rem;
  }

  /* Chapter 5 响应式 */
  .museum-scene {
    flex-direction: column;
    gap: 2rem;
    padding: 1rem;
    margin-bottom: 2rem;
  }

  .bronze-statue {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .statue-svg {
    width: 180px;
    height: 240px;
  }

  .statue-glow {
    width: 150px;
    height: 150px;
  }

  .historical-record {
    padding: 1.5rem;
    max-width: 100%;
  }

  .record-title {
    font-size: 1.5rem;
  }

  .record-reign {
    font-size: 0.8rem;
  }

  .section-title {
    font-size: 1rem;
  }

  .achievements-list li,
  .tragedy-list li {
    font-size: 0.9rem;
  }

  .final-reflection {
    padding: 2rem 1.5rem;
    margin-bottom: 2rem;
  }

  .main-quote {
    font-size: clamp(1.2rem, 3vw, 1.5rem);
    padding: 1.5rem 0;
  }

  .reflection-commentary {
    font-size: 1rem;
  }

  .historical-impact {
    font-size: 0.9rem;
  }

  .epilogue {
    padding: 2rem 1.5rem;
  }

  .epilogue-text {
    font-size: clamp(1.2rem, 4vw, 1.5rem);
  }

  .epilogue-sub {
    font-size: clamp(0.8rem, 2.5vw, 1rem);
  }
}
</style>

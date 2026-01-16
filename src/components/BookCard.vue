<template>
  <div
    class="book-card"
    :class="[
      `layout-${book.layout}`,
      `layout-variant-${book.layoutVariant || 'default'}`,
      `typography-${book.typography}`,
      `interactive-${book.interactiveType}`
    ]"
    :style="{ '--accent-color': book.accentColor }"
    @mouseenter="onHover"
    @mouseleave="onLeave"
    @mousemove="onMouseMove"
    ref="cardRef"
  >
    <!-- 独特的背景层 -->
    <div class="card-background" :style="backgroundStyle"></div>

    <!-- 几何隐喻层（每本书独特） -->
    <div class="geometric-layer" :style="geometricStyle">
      <svg class="geo-shape" viewBox="0 0 200 300" v-html="getGeometrySVG(book.geometric)"></svg>
    </div>

    <!-- 扰动效果层 -->
    <div class="distortion-layer" ref="distortionRef"></div>

    <!-- 顶部标签栏 -->
    <div class="card-header">
      <span class="vol-label">VOL.{{ book.vol }}</span>
      <span class="archived-label">ARCHIVED</span>
    </div>

    <!-- 右上角分类标签 -->
    <div class="category-tag">{{ book.category }}</div>

    <!-- 主内容区 -->
    <div class="card-content">
      <div class="content-inner" :style="contentStyle">
        <h2 class="book-title" :style="titleStyle">{{ book.title }}</h2>
        <p v-if="book.subtitle" class="book-subtitle">{{ book.subtitle }}</p>
        <p class="book-author">{{ book.author }}</p>
      </div>
    </div>

    <!-- 个性化特色区域（卡片中部） -->
    <div class="card-featured" v-if="book.featuredQuote && !book.middleEffect">
      <div class="featured-quote" :style="quoteStyle">
        <span class="quote-mark">"</span>
        <span class="quote-text">{{ truncateQuote(book.featuredQuote) }}</span>
      </div>

      <!-- 特殊符号元素 -->
      <div class="special-symbol" :style="symbolStyle">
        <svg class="symbol-icon" viewBox="0 0 24 24" v-html="getSpecialSymbol(book.specialElement)"></svg>
      </div>
    </div>

    <!-- 中间效果区域（特殊书籍） -->
    <div class="card-middle-effect" v-if="book.middleEffect" :class="`effect-${book.middleEffect.type}`">
      <!-- 倒计时效果（三体） -->
      <div v-if="book.middleEffect.type === 'countdown'" class="countdown-effect">
        <div class="countdown-number">{{ currentCountdown }}</div>
        <div class="countdown-label">UNTIL COLLAPSE</div>
      </div>

      <!-- 监视眼效果（1984） -->
      <div v-if="book.middleEffect.type === 'eye'" class="eye-effect">
        <svg class="eye-svg" viewBox="0 0 100 100">
          <!-- 眼睛外轮廓 -->
          <ellipse cx="50" cy="50" rx="40" ry="25" fill="none" stroke="currentColor" stroke-width="2"/>
          <!-- 瞳孔 -->
          <circle cx="50" cy="50" r="12" fill="currentColor" class="eye-pupil">
            <animate attributeName="r" values="12;14;12" dur="3s" repeatCount="indefinite"/>
          </circle>
          <!-- 瞳孔高光 -->
          <circle cx="46" cy="46" r="4" fill="#ffffff" opacity="0.8"/>
          <!-- 盯视的文字 -->
          <text x="50" y="90" text-anchor="middle" font-size="8" fill="currentColor" opacity="0.6">BIG BROTHER IS WATCHING</text>
        </svg>
      </div>

      <!-- 竖排诗句效果（小王子） -->
      <div v-if="book.middleEffect.type === 'vertical-quote'" class="vertical-quote-effect">
        <div class="quote-vertical">{{ book.middleEffect.value }}</div>
      </div>

      <!-- 代码块引用（置身事内） -->
      <div v-if="book.middleEffect.type === 'code-quote'" class="code-quote-effect">
        <pre class="code-block">{{ book.middleEffect.value }}</pre>
      </div>

      <!-- 心电图效果（霍乱时期的爱情） -->
      <div v-if="book.middleEffect.type === 'ekg'" class="ekg-effect">
        <svg class="ekg-svg" viewBox="0 0 200 60">
          <path d="M0,30 L40,30 L50,10 L60,50 L70,30 L120,30 L130,5 L140,55 L150,30 L200,30"
                fill="none" stroke="currentColor" stroke-width="2" class="ekg-line"/>
          <circle cx="150" cy="30" r="4" fill="currentColor" class="ekg-heart">
            <animate attributeName="r" values="4;6;4" dur="0.8s" repeatCount="indefinite"/>
          </circle>
        </svg>
        <div class="ekg-label">51年9个月零4天</div>
      </div>

      <!-- 极简符号效果（悉达多） -->
      <div v-if="book.middleEffect.type === 'minimal-symbol'" class="minimal-symbol-effect">
        <div class="symbol-large">{{ book.middleEffect.value }}</div>
      </div>
    </div>

    <!-- 情绪指数条 -->
    <div class="mood-indicator" v-if="book.moodScore">
      <div class="mood-label">MOOD</div>
      <div class="mood-bar">
        <div class="mood-fill" :style="{ width: `${book.moodScore * 10}%`, background: book.accentColor }"></div>
      </div>
      <div class="mood-value">{{ book.moodScore }}</div>
    </div>

    <!-- 底部结构 -->
    <div class="card-footer">
      <!-- 左下角：档案编号线条 -->
      <div class="archive-lines">
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
      </div>

      <!-- 中部：额外信息 -->
      <div class="footer-extra" v-if="book.footerText">
        <span class="footer-text">{{ book.footerText }}</span>
      </div>

      <!-- 右下角：阅读按钮 -->
      <button class="read-btn" @click.stop="readBook">
        <span>READ</span>
        <svg class="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </button>
    </div>

    <!-- 独特的边缘光晕效果 -->
    <div class="glow-overlay" :style="glowStyle"></div>

    <!-- 粒子效果层（某些书籍） -->
    <canvas v-if="useParticles" ref="particlesCanvas" class="particles-canvas"></canvas>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  book: {
    type: Object,
    required: true
  }
})

const router = useRouter()
const cardRef = ref(null)
const distortionRef = ref(null)
const particlesCanvas = ref(null)
const isHovered = ref(false)
const mousePos = ref({ x: 0, y: 0 })
const cardCenter = ref({ x: 0, y: 0 })

// 倒计时效果（三体）
const currentCountdown = ref('450:00:00')
let countdownInterval = null

// 启动倒计时动画
const startCountdownAnimation = () => {
  if (!props.book.middleEffect || props.book.middleEffect.type !== 'countdown') return

  let [hours, minutes, seconds] = props.book.middleEffect.value.split(':').map(Number)

  countdownInterval = setInterval(() => {
    // 随机减少时间，模拟倒计时跳跃
    const randomDecrement = Math.floor(Math.random() * 10) + 1

    seconds -= randomDecrement
    if (seconds < 0) {
      seconds += 60
      minutes--
    }
    if (minutes < 0) {
      minutes += 60
      hours--
    }
    if (hours < 0) {
      // 重置
      hours = 450
      minutes = 0
      seconds = 0
    }

    // 格式化
    currentCountdown.value = `${String(hours).padStart(3, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  }, 800) // 每800毫秒更新一次
}

// 标题样式
const titleStyle = computed(() => {
  const styles = {
    'naive': { fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 },
    'handwritten': { fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic' },
    'bold': { fontWeight: 600, letterSpacing: '0.05em' },
    'heroic': { fontWeight: 600, textTransform: 'uppercase' },
    'modern': { fontWeight: 300, letterSpacing: '0.1em' },
    'epic': { fontWeight: 600, textTransform: 'uppercase', fontSize: '1.8em' },
    'melancholic': { fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontWeight: 300 },
    'classical': { fontFamily: "'Noto Serif SC', serif", fontWeight: 500 },
    'satirical': { fontFamily: "'Noto Serif SC', serif", fontWeight: 400 }
  }
  return styles[props.book.typography] || {}
})

// 背景样式
const backgroundStyle = computed(() => {
  // 如果书籍有自定义背景，优先使用
  if (props.book.customBackground) {
    return { background: props.book.customBackground }
  }

  const backgrounds = {
    'dreamy': 'radial-gradient(ellipse at 30% 20%, rgba(74, 124, 159, 0.08) 0%, transparent 50%)',
    'surreal': 'linear-gradient(135deg, rgba(123, 75, 138, 0.06) 0%, transparent 100%)',
    'mysterious': 'radial-gradient(circle at 70% 80%, rgba(123, 138, 154, 0.1) 0%, transparent 40%)',
    'intense': 'linear-gradient(180deg, rgba(139, 58, 58, 0.05) 0%, transparent 100%)',
    'contemplative': 'radial-gradient(ellipse at 50% 50%, rgba(106, 90, 74, 0.06) 0%, transparent 60%)',
    'timeless': 'linear-gradient(45deg, rgba(212, 160, 106, 0.08) 0%, transparent 50%)',
    'spiritual': 'radial-gradient(circle at 50% 30%, rgba(138, 122, 90, 0.1) 0%, transparent 50%)',
    'cosmic': 'radial-gradient(ellipse at 50% 50%, rgba(26, 74, 122, 0.1) 0%, transparent 60%)',
    'dark': 'linear-gradient(180deg, rgba(26, 26, 26, 0.03) 0%, rgba(90, 106, 122, 0.05) 100%)',
    'cozy': 'radial-gradient(ellipse at 50% 50%, rgba(201, 74, 106, 0.06) 0%, transparent 50%)',
    'urgent': 'linear-gradient(135deg, rgba(201, 90, 74, 0.08) 0%, transparent 60%)',
    'epic-journey': 'radial-gradient(circle at 30% 40%, rgba(42, 58, 90, 0.1) 0%, transparent 50%)'
  }
  return { background: backgrounds[props.book.layout] || 'transparent' }
})

// 几何图形样式
const geometricStyle = computed(() => {
  const style = {
    opacity: isHovered.value ? 0.5 : 0.25,
    transform: isHovered.value ? 'scale(1.08) rotate(3deg)' : 'scale(1) rotate(0deg)'
  }
  return style
})

// 引用区域样式
const quoteStyle = computed(() => {
  const style = {
    opacity: isHovered.value ? 1 : 0.85,
    transform: isHovered.value ? 'translateY(0)' : 'translateY(8px)'
  }
  return style
})

// 特殊符号样式
const symbolStyle = computed(() => {
  const style = {
    opacity: isHovered.value ? 1 : 0.6,
    transform: isHovered.value ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0deg)'
  }
  return style
})

// 内容样式（3D倾斜效果）
const contentStyle = computed(() => {
  if (!isHovered.value) return {}

  const rotateX = ((mousePos.value.y - cardCenter.value.y) / cardCenter.value.y) * 2
  const rotateY = ((mousePos.value.x - cardCenter.value.x) / cardCenter.value.x) * -2

  return {
    transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`
  }
})

// 光晕样式
const glowStyle = computed(() => {
  if (!isHovered.value) {
    return { opacity: 0 }
  }

  const x = ((mousePos.value.x - cardCenter.value.x) / cardRef.value.offsetWidth) * 100 + 50
  const y = ((mousePos.value.y - cardCenter.value.y) / cardRef.value.offsetHeight) * 100 + 50

  return {
    opacity: 0.35,
    background: `radial-gradient(circle at ${x}% ${y}%, ${props.book.accentColor}40 0%, transparent 50%)`
  }
})

// 是否使用粒子效果
const useParticles = computed(() => {
  const particleBooks = ['star', 'three-suns', 'stars-connection', 'cosmic', 'dimensional']
  return particleBooks.includes(props.book.geometric)
})

// 截断引用文字
function truncateQuote(quote) {
  if (!quote) return ''
  const maxLength = 35
  return quote.length > maxLength ? quote.substring(0, maxLength) + '...' : quote
}

// 获取几何图形SVG
function getGeometrySVG(shape) {
  const geometries = {
    circle: '<circle cx="100" cy="150" r="70" fill="none" stroke="currentColor" stroke-width="1" opacity="0.8"/>',
    square: '<rect x="50" y="80" width="100" height="140" fill="none" stroke="currentColor" stroke-width="1" opacity="0.8"/>',
    triangle: '<polygon points="100,50 170,220 30,220" fill="none" stroke="currentColor" stroke-width="1" opacity="0.8"/>',
    star: '<path d="M100 40 L120 100 L180 100 L130 140 L150 200 L100 160 L50 200 L70 140 L20 100 L80 100 Z" fill="none" stroke="currentColor" stroke-width="1" opacity="0.8"/>',
    moon: '<path d="M100 60 A 80 80 0 1 1 100 220 A 60 60 0 1 0 100 60" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.8"/>',
    wave: '<path d="M30 150 Q 65 100, 100 150 T 170 150 T 240 150" fill="none" stroke="currentColor" stroke-width="2" opacity="0.8"/><path d="M30 180 Q 65 130, 100 180 T 170 180" fill="none" stroke="currentColor" stroke-width="1" opacity="0.5"/>',
    forest: '<path d="M60 250 L100 120 L140 250" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.6"/><path d="M30 250 L60 150 L90 250" fill="none" stroke="currentColor" stroke-width="1" opacity="0.4"/><path d="M110 250 L140 150 L170 250" fill="none" stroke="currentColor" stroke-width="1" opacity="0.4"/>',
    river: '<path d="M30 150 Q 80 120, 100 150 T 170 150 T 240 150 T 310 150" fill="none" stroke="currentColor" stroke-width="2.5" opacity="0.7"/>',
    temple: '<rect x="60" y="140" width="80" height="90" fill="none" stroke="currentColor" stroke-width="1" opacity="0.7"/><path d="M40 140 L100 90 L160 140" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.8"/>',
    dunes: '<path d="M20 180 Q 100 130, 180 180 T 340 180" fill="none" stroke="currentColor" stroke-width="2" opacity="0.7"/><path d="M40 220 Q 120 180, 200 220" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.5"/>',
    wall: '<line x1="40" y1="80" x2="160" y2="80" stroke="currentColor" stroke-width="3" opacity="0.8"/><line x1="40" y1="140" x2="160" y2="140" stroke="currentColor" stroke-width="2" opacity="0.6"/><line x1="40" y1="200" x2="160" y2="200" stroke="currentColor" stroke-width="1" opacity="0.4"/>',
    swords: '<line x1="80" y1="60" x2="80" y2="220" stroke="currentColor" stroke-width="2.5" opacity="0.8"/><line x1="120" y1="60" x2="120" y2="220" stroke="currentColor" stroke-width="2.5" opacity="0.8"/><path d="M65 210 L95 210 M105 210 L135 210" stroke="currentColor" stroke-width="4" opacity="0.6"/>',
    letters: '<rect x="40" y="100" width="50" height="70" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.7"/><rect x="110" y="100" width="50" height="70" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.7"/><line x1="40" y1="135" x2="90" y2="135" stroke="currentColor" stroke-width="1" opacity="0.5"/><line x1="110" y1="135" x2="160" y2="135" stroke="currentColor" stroke-width="1" opacity="0.5"/>',
    revenge: '<path d="M100 60 L150 120 L100 180 L50 120 Z" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.7"/><circle cx="100" cy="120" r="25" fill="none" stroke="currentColor" stroke-width="1" opacity="0.5"/>',
    veil: '<path d="M50 80 Q 100 120, 150 80 L150 220 Q 100 180, 50 220 Z" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.6"/>',
    celestial: '<circle cx="100" cy="150" r="50" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.7"/><circle cx="100" cy="150" r="30" fill="none" stroke="currentColor" stroke-width="1" opacity="0.5"/><circle cx="100" cy="150" r="10" fill="currentColor" opacity="0.3"/>',
    circular: '<circle cx="100" cy="150" r="90" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.6" stroke-dasharray="15 8"/><circle cx="100" cy="150" r="70" fill="none" stroke="currentColor" stroke-width="1" opacity="0.4"/><circle cx="100" cy="150" r="50" fill="none" stroke="currentColor" stroke-width="0.5" opacity="0.3"/>',
    'three-suns': '<circle cx="50" cy="100" r="30" fill="none" stroke="currentColor" stroke-width="2" opacity="0.8"/><circle cx="50" cy="100" r="10" fill="currentColor" opacity="0.2"/><circle cx="100" cy="60" r="35" fill="none" stroke="currentColor" stroke-width="2" opacity="0.9"/><circle cx="100" cy="60" r="12" fill="currentColor" opacity="0.25"/><circle cx="150" cy="100" r="25" fill="none" stroke="currentColor" stroke-width="2" opacity="0.7"/><circle cx="150" cy="100" r="8" fill="currentColor" opacity="0.15"/>',
    infinity: '<path d="M60 150 C 20 100, 20 200, 100 150 C 180 100, 180 200, 140 150" fill="none" stroke="currentColor" stroke-width="2" opacity="0.7"/>',
    island: '<ellipse cx="100" cy="180" rx="90" ry="40" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.7"/><path d="M60 150 Q 80 140, 100 150 T 140 150" fill="none" stroke="currentColor" stroke-width="1" opacity="0.5"/>',
    roots: '<path d="M100 80 L100 180 M70 180 L50 230 M100 180 L100 230 M130 180 L150 230" fill="none" stroke="currentColor" stroke-width="2" opacity="0.7"/><circle cx="100" cy="60" r="25" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.5"/>',
    'light-shadow': '<rect x="50" y="70" width="40" height="140" fill="none" stroke="currentColor" stroke-width="1" opacity="0.4"/><rect x="110" y="70" width="40" height="140" fill="none" stroke="currentColor" stroke-width="1" opacity="0.7"/><line x1="90" y1="140" x2="110" y2="140" stroke="currentColor" stroke-width="0.5" opacity="0.3"/>',
    'stars-connection': '<circle cx="50" cy="100" r="3" fill="currentColor" opacity="0.5"/><circle cx="150" cy="80" r="4" fill="currentColor" opacity="0.6"/><circle cx="100" cy="180" r="3" fill="currentColor" opacity="0.4"/><circle cx="60" cy="150" r="3" fill="currentColor" opacity="0.4"/><circle cx="140" cy="200" r="3" fill="currentColor" opacity="0.4"/><path d="M50 100 L100 180 L150 80 L60 150 L140 200 L50 100" stroke="currentColor" stroke-width="0.5" opacity="0.3" fill="none"/>'
  }
  return geometries[shape] || geometries.circle
}

// 获取特殊符号
function getSpecialSymbol(element) {
  const symbols = {
    'bookstack': '<path d="M6 4v16M10 4v16M14 4v16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
    'desert-waves': '<path d="M3 12c2-2 4-2 6 0s4 2 6 0 4-2 6 0" stroke="currentColor" stroke-width="2" fill="none"/><circle cx="12" cy="12" r="2" fill="currentColor"/>',
    'confessional': '<rect x="6" y="4" width="12" height="16" rx="1" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M12 8v8" stroke="currentColor" stroke-width="1.5"/>',
    'hotel-key': '<path d="M12 2a5 5 0 0 0-5 5c0 2 1.5 4 3.5 4.5L8 20h2l2-7 2 7h2l-2.5-8.5A5 5 0 0 0 12 2z" fill="currentColor"/>',
    'submarine-porthole': '<circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="2" fill="none"/><circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2" stroke="currentColor" stroke-width="1.5"/>',
    'rose-drawing': '<path d="M12 8a4 4 0 0 1 4 4c0 2-2 3-2 5s-2 3-2 3-2-1-2-3 2-3 2-5a4 4 0 0 1 4-4z" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M12 12v6" stroke="currentColor" stroke-width="1.5"/>',
    'compass': '<circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M12 3v18M3 12h18" stroke="currentColor" stroke-width="1"/><path d="M12 12l5-5M12 12l-5 5M12 12l5 5M12 12l-5-5" stroke="currentColor" stroke-width="1"/>',
    'double-moon': '<circle cx="8" cy="12" r="6" stroke="currentColor" stroke-width="1.5" fill="none"/><circle cx="18" cy="8" r="4" stroke="currentColor" stroke-width="1.5" fill="none"/>',
    'bow-arrow': '<path d="M4 16l4-4 4 4" stroke="currentColor" stroke-width="2" fill="none"/><path d="M8 12v-4c0-2 1.5-3 3-3h7" stroke="currentColor" stroke-width="2" fill="none"/><path d="M16 5l3 3-3 3" stroke="currentColor" stroke-width="2" fill="none"/>',
    'mask-face': '<circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M8 10s1-2 4-2 4 2 4 2" stroke="currentColor" stroke-width="1.5" fill="none"/><circle cx="9" cy="14" r="1.5" fill="currentColor"/><circle cx="15" cy="14" r="1.5" fill="currentColor"/>',
    'heart-counter': '<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor"/>',
    'mail-box': '<rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M4 8l8 5 8-5" stroke="currentColor" stroke-width="1.5" fill="none"/>',
    'equation': '<text x="12" y="16" text-anchor="middle" font-size="10" font-family="serif" fill="currentColor">∫</text>',
    'three-body-orbit': '<circle cx="6" cy="10" r="3" stroke="currentColor" stroke-width="1.5" fill="none"/><circle cx="18" cy="10" r="3" stroke="currentColor" stroke-width="1.5" fill="none"/><ellipse cx="12" cy="18" rx="8" ry="3" stroke="currentColor" stroke-width="1.5" fill="none"/>',
    'broken-silhouette': '<path d="M8 20l-4-8 4-4 4 4 4-4 4 4 4 8" stroke="currentColor" stroke-width="2" fill="none"/><line x1="8" y1="20" x2="16" y2="20" stroke="currentColor" stroke-width="2"/>'
  }
  return symbols[element] || symbols['bookstack']
}

function onHover() {
  isHovered.value = true
}

function onLeave() {
  isHovered.value = false
  mousePos.value = { x: 0, y: 0 }
}

function onMouseMove(e) {
  if (!cardRef.value || !isHovered.value) return

  const rect = cardRef.value.getBoundingClientRect()
  mousePos.value = {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  }

  cardCenter.value = {
    x: rect.width / 2,
    y: rect.height / 2
  }
}

const readBook = () => {
  // 如果书籍有特殊世界组件，则导航到该世界
  if (props.book.worldComponent) {
    switch(props.book.worldComponent) {
      case 'PrinceWorld':
        router.push('/world/prince')
        break
      case 'IslandBookstoreWorld':
        router.push('/world/island-bookstore')
        break
      case 'TrappedInDunesWorld':
        router.push('/world/trapped-in-dunes')
        break
      case 'NightSubmarineWorld':
        router.push('/world/night-submarine')
        break
      case 'MoscowGentlemanWorld':
        router.push('/world/moscow-gentleman')
        break
      case 'CrimeAndPunishmentWorld':
        router.push('/world/crime-and-punishment')
        break
      case 'SaharaWorld':
        router.push('/world/sahara')
        break
      default:
        router.push(`/book/${props.book.id}`)
    }
  } else {
    router.push(`/book/${props.book.id}`)
  }
}

onMounted(() => {
  nextTick(() => {
    if (cardRef.value) {
      const rect = cardRef.value.getBoundingClientRect()
      cardCenter.value = {
        x: rect.width / 2,
        y: rect.height / 2
      }
    }
  })

  // 启动倒计时动画
  startCountdownAnimation()
})

onUnmounted(() => {
  // 清除倒计时定时器
  if (countdownInterval) {
    clearInterval(countdownInterval)
  }
})
</script>

<style scoped>
.book-card {
  position: relative;
  width: 100%;
  aspect-ratio: 2 / 2.8;
  background: #ffffff;
  border: 1px solid rgba(26, 26, 26, 0.08);
  padding: 1.2rem 1rem;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  transform-style: preserve-3d;
  perspective: 1000px;
  display: flex;
  flex-direction: column;
}

.book-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 25px 70px rgba(26, 26, 26, 0.15);
  border-color: var(--accent-color);
}

/* 交互类型变化 */
.interactive-gentle:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 50px rgba(26, 26, 26, 0.12);
}

.interactive-intense:hover {
  transform: translateY(-12px) scale(1.02);
  box-shadow: 0 30px 80px rgba(26, 26, 26, 0.2);
}

.interactive-tense:hover {
  border-color: var(--accent-color);
  box-shadow: 0 20px 60px var(--accent-color);
}

.interactive-melancholic:hover {
  transform: translateY(-4px);
  filter: brightness(0.98);
}

.interactive-heroic:hover {
  transform: translateY(-10px) scale(1.01);
  box-shadow: 0 30px 70px rgba(26, 26, 26, 0.18);
}

.interactive-urgent:hover {
  animation: urgent-shake 0.3s ease-in-out;
}

@keyframes urgent-shake {
  0%, 100% { transform: translateY(-8px) translateX(0); }
  25% { transform: translateY(-8px) translateX(-2px); }
  75% { transform: translateY(-8px) translateX(2px); }
}

/* 背景层 */
.card-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
  transition: opacity 0.6s ease;
}

/* 几何图形层 */
.geometric-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.geometric-layer .geo-shape {
  width: 100%;
  height: 100%;
  color: var(--accent-color);
}

/* 扰动效果层 */
.distortion-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.book-card:hover .distortion-layer {
  opacity: 0.6;
}

/* 顶部标签 */
.card-header {
  position: relative;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.8rem;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  color: #666;
}

.vol-label {
  font-family: 'Inter', monospace;
  font-weight: 600;
}

.archived-label {
  opacity: 0.4;
  font-size: 0.5rem;
}

/* 分类标签 */
.category-tag {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: #1a1a1a;
  color: #fff;
  padding: 0.4rem 0.75rem;
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  z-index: 10;
  transition: all 0.3s ease;
}

.book-card:hover .category-tag {
  background: var(--accent-color);
}

/* 主内容 */
.card-content {
  position: relative;
  z-index: 10;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100px;
}

.content-inner {
  transition: transform 0.15s ease-out;
}

.book-title {
  font-family: 'Noto Serif SC', serif;
  font-size: clamp(1.6rem, 5vw, 2.4rem);
  font-weight: 700;
  line-height: 1.2;
  color: #000;
  margin-bottom: 0.5rem;
  transition: all 0.3s ease;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.book-card:hover .book-title {
  color: var(--accent-color);
  text-shadow: 0 2px 8px var(--accent-color);
}

.book-subtitle {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1rem;
  font-style: italic;
  color: #444;
  margin-bottom: 0.5rem;
  line-height: 1.25;
}

.book-author {
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  color: #333;
  margin-top: 0.3rem;
}

/* 个性化特色区域 */
.card-featured {
  position: relative;
  z-index: 10;
  margin: 0.8rem 0;
  padding: 0.7rem 0;
  border-top: 1px solid rgba(26, 26, 26, 0.06);
  border-bottom: 1px solid rgba(26, 26, 26, 0.06);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.6rem;
}

.featured-quote {
  flex: 1;
  position: relative;
  transition: all 0.4s ease;
}

.quote-mark {
  position: absolute;
  left: -0.3rem;
  top: -0.2rem;
  font-size: 1.5rem;
  font-family: Georgia, serif;
  color: var(--accent-color);
  opacity: 0.3;
  line-height: 1;
}

.quote-text {
  font-family: 'Noto Serif SC', serif;
  font-size: 0.75rem;
  line-height: 1.5;
  color: #555;
  font-style: italic;
  margin-left: 0.6rem;
  display: block;
}

.special-symbol {
  flex-shrink: 0;
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(26, 26, 26, 0.03);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.symbol-icon {
  width: 12px;
  height: 12px;
  color: var(--accent-color);
}

.book-card:hover .special-symbol {
  background: var(--accent-color);
}

.book-card:hover .symbol-icon {
  color: #fff;
}

/* 情绪指数 */
.mood-indicator {
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin-bottom: 0.6rem;
  padding: 0.35rem 0.6rem;
  background: rgba(26, 26, 26, 0.02);
  border-radius: 3px;
}

.mood-label {
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: #999;
  white-space: nowrap;
}

.mood-bar {
  flex: 1;
  height: 3px;
  background: rgba(26, 26, 26, 0.08);
  border-radius: 2px;
  overflow: hidden;
}

.mood-fill {
  height: 100%;
  border-radius: 2px;
  transition: width 0.6s ease-out;
}

.mood-value {
  font-size: 0.65rem;
  font-weight: 700;
  color: #666;
  min-width: 20px;
  text-align: right;
}

/* 底部 */
.card-footer {
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.6rem;
  margin-top: auto;
  padding-top: 0.8rem;
  border-top: 1px solid rgba(26, 26, 26, 0.06);
}

/* 档案线条 */
.archive-lines {
  display: flex;
  gap: 3px;
}

.line {
  width: 1.5px;
  height: 16px;
  background: rgba(26, 26, 26, 0.25);
  transition: all 0.4s ease;
}

.book-card:hover .line:nth-child(1) {
  background: var(--accent-color);
  height: 20px;
  transition-delay: 0s;
}

.book-card:hover .line:nth-child(2) {
  background: var(--accent-color);
  height: 18px;
  transition-delay: 0.05s;
}

.book-card:hover .line:nth-child(3) {
  background: var(--accent-color);
  height: 16px;
  transition-delay: 0.1s;
}

/* 底部额外文字 */
.footer-extra {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.footer-text {
  font-family: 'Inter', sans-serif;
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  color: #888;
  text-align: center;
  opacity: 0.9;
}

/* 阅读按钮 */
.read-btn {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 0.9rem;
  background: #1a1a1a;
  border: none;
  color: #fff;
  font-family: 'Inter', sans-serif;
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
}

.read-btn:hover {
  background: var(--accent-color);
  transform: translateX(3px);
}

.read-btn .arrow-icon {
  width: 10px;
  height: 10px;
  transition: transform 0.3s ease;
}

.read-btn:hover .arrow-icon {
  transform: translateX(2px);
}

/* 光晕叠加层 */
.glow-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 3;
  opacity: 0;
  transition: opacity 0.3s ease;
}

/* 粒子画布 */
.particles-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 2;
  opacity: 0.5;
}

/* 不同布局变体 */
.layout-centered .card-content {
  align-items: center;
  text-align: center;
}

.layout-asymmetric .content-inner {
  transform: translateX(10px);
}

.layout-dreamy .book-title {
  letter-spacing: 0.2em;
  font-weight: 300;
}

.layout-intense .book-title {
  font-weight: 600;
  letter-spacing: -0.02em;
}

.layout-classic .book-title {
  font-family: 'Cormorant Garamond', serif;
}

.layout-minimal .card-content {
  justify-content: flex-start;
  padding-top: 2rem;
}

/* === 布局变体系统 === */

/* dramatic - 戏剧性，中间效果主导 */
.layout-variant-dramatic .card-middle-effect {
  min-height: 140px;
  margin: 1.5rem 0;
}

.layout-variant-dramatic .book-title {
  font-size: clamp(1.4rem, 4vw, 1.8rem);
}

.layout-variant-dramatic .card-content {
  justify-content: flex-start;
}

/* centered - 居中对称 */
.layout-variant-centered .card-content {
  text-align: center;
  align-items: center;
}

.layout-variant-centered .book-author {
  text-align: center;
}

.layout-variant-centered .card-footer {
  justify-content: center;
}

/* minimal-bold - 极简+大字 */
.layout-variant-minimal-bold .book-title {
  font-size: clamp(2rem, 6vw, 2.8rem);
  font-weight: 800;
  letter-spacing: -0.02em;
}

.layout-variant-minimal-bold .book-subtitle {
  display: none;
}

.layout-variant-minimal-bold .book-author {
  font-size: 0.75rem;
  opacity: 0.6;
}

/* asymmetric - 不对称 */
.layout-variant-asymmetric .content-inner {
  transform: translateX(15%);
}

.layout-variant-asymmetric .card-footer {
  padding-left: 15%;
}

/* classic-serif - 经典衬线 */
.layout-variant-classic-serif .book-title {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 400;
  font-style: italic;
}

.layout-variant-classic-serif .book-author {
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
}

/* bold-modern - 粗体现代 */
.layout-variant-bold-modern .book-title {
  font-family: 'Inter', sans-serif;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.layout-variant-bold-modern .book-author {
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

/* title-top - 标题在顶部 */
.layout-variant-title-top .card-content {
  justify-content: flex-start;
  padding-top: 1rem;
}

.layout-variant-title-top .card-header {
  order: 2;
  margin-bottom: 0.2rem;
}

.layout-variant-title-top .card-content {
  order: 1;
}

.layout-variant-title-top .card-middle-effect {
  order: 3;
}

.layout-variant-title-top .card-footer {
  order: 4;
}

/* author-top - 作者在顶部 */
.layout-variant-author-top .book-author {
  order: -1;
  margin-bottom: 0.8rem;
  margin-top: 0;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
}

/* title-bottom - 标题在底部 */
.layout-variant-title-bottom .card-content {
  order: 4;
  justify-content: flex-end;
  padding-bottom: 1rem;
}

.layout-variant-title-bottom .card-footer {
  order: 3;
}

.layout-variant-title-bottom .card-middle-effect {
  order: 2;
}

.layout-variant-title-bottom .card-header {
  order: 1;
}

/* split-layout - 标题和作者分开两边 */
.layout-variant-split .book-title {
  text-align: left;
}

.layout-variant-split .book-author {
  text-align: right;
  position: absolute;
  top: 1rem;
  right: 1rem;
}

.layout-variant-split .card-header {
  display: none;
}

/* stacked-large - 堆叠大字 */
.layout-variant-stacked-large .book-title {
  font-size: clamp(2.2rem, 7vw, 3rem);
  line-height: 1;
  margin-bottom: 0.2rem;
}

.layout-variant-stacked-large .book-subtitle {
  margin-bottom: 0.3rem;
}

.layout-variant-stacked-large .book-author {
  margin-top: 0.5rem;
  font-size: 0.8rem;
  opacity: 0.7;
}

/* 响应式 */
@media (max-width: 1200px) {
  .book-card {
    aspect-ratio: 2 / 2.6;
  }
}

@media (max-width: 768px) {
  .book-card {
    padding: 1rem;
  }

  .card-featured {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.6rem;
  }

  .special-symbol {
    align-self: flex-end;
  }

  .book-title {
    font-size: 1.4rem;
  }

  .book-subtitle {
    font-size: 0.85rem;
  }

  .book-author {
    font-size: 0.75rem;
  }

  .category-tag {
    font-size: 0.55rem;
    padding: 0.35rem 0.65rem;
  }

  .read-btn {
    padding: 0.45rem 0.8rem;
    font-size: 0.55rem;
  }

  .quote-text {
    font-size: 0.65rem;
  }

  .card-header {
    font-size: 0.6rem;
  }

  .footer-text {
    font-size: 0.55rem;
  }

  .mood-label {
    font-size: 0.5rem;
  }

  .mood-value {
    font-size: 0.55rem;
  }

  .line {
    height: 14px;
  }
}

/* === 中间效果区域样式 === */
.card-middle-effect {
  position: relative;
  z-index: 10;
  margin: 1rem 0;
  min-height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 倒计时效果（三体） */
.countdown-effect {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center; 
  gap: 0.5rem;
}

.countdown-number {
  font-family: 'Courier New', monospace;
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  /* 修改这里：改成血红色 */
  color: #e70102; 
  /* 修改这里：光晕也改成红色，增加发光感 */
  text-shadow: 0 0 15px rgba(139, 0, 0, 0.8); 
  transition: all 0.3s ease;
}

.countdown-number:hover {
  transform: scale(1.05);
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.8);
}

.countdown-label {
  font-size: 0.55rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  color: rgba(255, 255, 255, 0.8);
  text-transform: uppercase;
}

/* 监视眼效果（1984） */
.eye-effect {
  width: 100%;
  display: flex;
  justify-content: center;
}

.eye-svg {
  width: 80%;
  height: auto;
  color: rgba(26, 26, 26, 0.7);
}

.book-card:hover .eye-svg {
  color: #2ecc71;
}

/* 竖排诗句效果（小王子） */
.vertical-quote-effect {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 1rem 0;
}

.quote-vertical {
  writing-mode: vertical-rl;
  text-orientation: mixed;
  font-family: 'Noto Serif SC', serif;
  font-size: 1rem;
  line-height: 2;
  letter-spacing: 0.3em;
  color: #555;
  font-weight: 300;
}

/* 代码块效果（置身事内） */
.code-quote-effect {
  width: 100%;
  background: rgba(26, 26, 26, 0.03);
  border-radius: 4px;
  padding: 0.8rem;
  border-left: 3px solid var(--accent-color);
}

.code-block {
  font-family: 'Courier New', monospace;
  font-size: 0.7rem;
  line-height: 1.6;
  color: #444;
  margin: 0;
  white-space: pre-wrap;
  word-break: break-word;
}

/* 心电图效果（霍乱时期的爱情） */
.ekg-effect {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.ekg-svg {
  width: 90%;
  height: auto;
  color: #e74c3c;
}

.ekg-line {
  stroke-dasharray: 200;
  stroke-dashoffset: 200;
  animation: ekg-draw 2s linear forwards infinite;
}

@keyframes ekg-draw {
  to { stroke-dashoffset: 0; }
}

.ekg-label {
  font-family: 'Cormorant Garamond', serif;
  font-size: 0.7rem;
  font-style: italic;
  color: #e74c3c;
  opacity: 0.8;
}

/* 极简符号效果（悉达多） */
.minimal-symbol-effect {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.symbol-large {
  font-size: 3rem;
  opacity: 0.3;
  transition: all 0.5s ease;
}

.book-card:hover .symbol-large {
  opacity: 0.5;
  transform: scale(1.1);
}
</style>

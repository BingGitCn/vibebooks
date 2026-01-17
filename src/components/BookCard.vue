<template>
  <div
    class="monochrome-card"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @click="readBook"
  >
    <!-- 渐进边框 -->
    <div class="progressive-border"></div>

    <!-- 内部纹理 -->
    <div class="card-texture"></div>

    <!-- 顶部标签栏 -->
    <div class="card-header">
      <span class="vol-label">VOL.{{ String(book.vol).padStart(3, '0') }}</span>
      <span class="category-tag">{{ book.category }}</span>
    </div>

    <!-- 主内容区 -->
    <div class="card-content">
      <h2 class="book-title">{{ book.title }}</h2>
      <p v-if="book.subtitle" class="book-subtitle">{{ book.subtitle }}</p>
      <p class="book-author">{{ book.author }}</p>
    </div>

    <!-- 中部特效区域（单色化） -->
    <div class="card-middle" v-if="book.middleEffect">
      <!-- 001. 岛上书店 - 浮动书籍 -->
      <div v-if="book.middleEffect.type === 'floating-books'" class="floating-books-effect">
        <div class="book book-1"></div>
        <div class="book book-2"></div>
        <div class="book book-3"></div>
      </div>

      <!-- 002. 困于沙丘 - 沙丘流动 -->
      <div v-if="book.middleEffect.type === 'dunes-flow'" class="dunes-flow-effect">
        <svg class="dunes-svg" viewBox="0 0 200 80">
          <path class="dune dune-1" d="M0,40 Q50,20 100,40 T200,40" fill="none" stroke="currentColor" stroke-width="2"/>
          <path class="dune dune-2" d="M0,50 Q50,30 100,50 T200,50" fill="none" stroke="currentColor" stroke-width="1.5"/>
          <path class="dune dune-3" d="M0,60 Q50,40 100,60 T200,60" fill="none" stroke="currentColor" stroke-width="1"/>
        </svg>
      </div>

      <!-- 003. 罪与罚 - 斧头摇摆 -->
      <div v-if="book.middleEffect.type === 'axe-swing'" class="axe-swing-effect">
        <svg class="axe-svg" viewBox="0 0 100 100">
          <line class="axe-handle" x1="30" y1="80" x2="70" y2="20" stroke="currentColor" stroke-width="3"/>
          <path class="axe-blade" d="M50,10 L70,20 L70,30 L50,20 Z" fill="none" stroke="currentColor" stroke-width="2"/>
        </svg>
      </div>

      <!-- 004. 莫斯科绅士 - 拱门闪烁 -->
      <div v-if="book.middleEffect.type === 'arch-glow'" class="arch-glow-effect">
        <svg class="arch-svg" viewBox="0 0 100 100">
          <path class="arch-path" d="M20,90 L20,40 Q50,10 80,40 L80,90" fill="none" stroke="currentColor" stroke-width="2"/>
          <line class="arch-floor" x1="20" y1="90" x2="80" y2="90" stroke="currentColor" stroke-width="2"/>
        </svg>
      </div>

      <!-- 005. 夜晚的潜水艇 - 潜艇浮动 -->
      <div v-if="book.middleEffect.type === 'submarine-float'" class="submarine-float-effect">
        <svg class="submarine-svg" viewBox="0 0 120 80">
          <ellipse class="sub-body" cx="60" cy="40" rx="50" ry="20" fill="none" stroke="currentColor" stroke-width="2"/>
          <circle class="sub-window" cx="40" cy="40" r="8" fill="none" stroke="currentColor" stroke-width="1.5"/>
          <circle class="sub-window" cx="60" cy="40" r="8" fill="none" stroke="currentColor" stroke-width="1.5"/>
          <circle class="sub-window" cx="80" cy="40" r="8" fill="none" stroke="currentColor" stroke-width="1.5"/>
          <path class="sub-wave" d="M0,60 Q30,55 60,60 T120,60" fill="none" stroke="currentColor" stroke-width="1" opacity="0.5"/>
        </svg>
      </div>

      <!-- 006. 小王子 - 竖排诗句 -->
      <div v-if="book.middleEffect.type === 'vertical-quote'" class="vertical-quote-effect">
        <div class="quote-vertical">{{ book.middleEffect.value }}</div>
      </div>

      <!-- 007. 撒哈拉的故事 - 沙粒漂移 -->
      <div v-if="book.middleEffect.type === 'sand-drift'" class="sand-drift-effect">
        <div class="sand-particle" v-for="i in 15" :key="i" :style="{ animationDelay: `${i * 0.1}s` }"></div>
      </div>

      <!-- 008. 刺杀骑士团长 - 隐喻脉动 -->
      <div v-if="book.middleEffect.type === 'metaphor-pulse'" class="metaphor-pulse-effect">
        <div class="metaphor-text">{{ book.middleEffect.value }}</div>
        <div class="metaphor-circle"></div>
      </div>

      <!-- 009. 失落的卫星 - 卫星轨道 -->
      <div v-if="book.middleEffect.type === 'satellite-orbit'" class="satellite-orbit-effect">
        <svg class="orbit-svg" viewBox="0 0 120 120">
          <ellipse class="orbit-path" cx="60" cy="60" rx="50" ry="30" fill="none" stroke="currentColor" stroke-width="1" opacity="0.3"/>
          <circle class="satellite" cx="110" cy="60" r="4" fill="currentColor">
            <animateMotion dur="8s" repeatCount="indefinite">
              <mpath href="#orbitPath"/>
            </animateMotion>
          </circle>
          <path id="orbitPath" d="M10,60 A50,30 0 1,1 110,60 A50,30 0 1,1 10,60" fill="none"/>
        </svg>
      </div>

      <!-- 010. 额尔古纳河右岸 - 河流流动 -->
      <div v-if="book.middleEffect.type === 'river-flow'" class="river-flow-effect">
        <svg class="river-svg" viewBox="0 0 200 100">
          <path class="river-path" d="M0,30 C40,30 40,70 80,70 C120,70 120,30 160,30 C180,30 200,50 200,50" fill="none" stroke="currentColor" stroke-width="2">
            <animate attributeName="stroke-dashoffset" from="200" to="0" dur="3s" repeatCount="indefinite"/>
          </path>
        </svg>
      </div>

      <!-- 011. 置身事内 - 代码块 -->
      <div v-if="book.middleEffect.type === 'code-quote'" class="code-quote-effect">
        <pre class="code-block">{{ book.middleEffect.value }}</pre>
      </div>

      <!-- 012. 文城 - 雾气模糊 -->
      <div v-if="book.middleEffect.type === 'fog-mist'" class="fog-mist-effect">
        <div class="fog-layer fog-1"></div>
        <div class="fog-layer fog-2"></div>
        <div class="fog-layer fog-3"></div>
        <div class="fog-text">文城</div>
      </div>

      <!-- 013. 挪威的森林 - 森林摇摆 -->
      <div v-if="book.middleEffect.type === 'forest-sway'" class="forest-sway-effect">
        <svg class="forest-svg" viewBox="0 0 150 100">
          <g class="tree tree-1">
            <line x1="30" y1="90" x2="30" y2="40" stroke="currentColor" stroke-width="2"/>
            <circle cx="30" cy="35" r="15" fill="none" stroke="currentColor" stroke-width="1.5"/>
          </g>
          <g class="tree tree-2">
            <line x1="75" y1="90" x2="75" y2="30" stroke="currentColor" stroke-width="2"/>
            <circle cx="75" cy="25" r="18" fill="none" stroke="currentColor" stroke-width="1.5"/>
          </g>
          <g class="tree tree-3">
            <line x1="120" y1="90" x2="120" y2="45" stroke="currentColor" stroke-width="2"/>
            <circle cx="120" cy="40" r="12" fill="none" stroke="currentColor" stroke-width="1.5"/>
          </g>
        </svg>
      </div>

      <!-- 014. 小城与不确定性的墙 - 墙体光影 -->
      <div v-if="book.middleEffect.type === 'wall-shadow'" class="wall-shadow-effect">
        <div class="wall-line wall-line-1"></div>
        <div class="wall-line wall-line-2"></div>
        <div class="wall-line wall-line-3"></div>
        <div class="wall-text">WALL</div>
      </div>

      <!-- 015. 1Q84 - 双月旋转 -->
      <div v-if="book.middleEffect.type === 'dual-moon-rotate'" class="dual-moon-rotate-effect">
        <svg class="moons-svg" viewBox="0 0 120 120">
          <circle class="moon moon-1" cx="40" cy="60" r="20" fill="none" stroke="currentColor" stroke-width="2"/>
          <circle class="moon moon-2" cx="80" cy="60" r="12" fill="none" stroke="currentColor" stroke-width="2"/>
        </svg>
      </div>

      <!-- 016. 山月记 - 虎纹流动 -->
      <div v-if="book.middleEffect.type === 'tiger-stripe-flow'" class="tiger-stripe-flow-effect">
        <svg class="tiger-svg" viewBox="0 0 120 100">
          <line class="stripe stripe-1" x1="10" y1="20" x2="110" y2="80" stroke="currentColor" stroke-width="3"/>
          <line class="stripe stripe-2" x1="10" y1="40" x2="110" y2="60" stroke="currentColor" stroke-width="2"/>
          <line class="stripe stripe-3" x1="10" y1="60" x2="110" y2="40" stroke="currentColor" stroke-width="2"/>
          <circle class="tiger-moon" cx="90" cy="25" r="15" fill="none" stroke="currentColor" stroke-width="1.5"/>
        </svg>
      </div>

      <!-- 017. 射雕英雄传 - 剑光闪烁 -->
      <div v-if="book.middleEffect.type === 'sword-flash'" class="sword-flash-effect">
        <svg class="sword-svg" viewBox="0 0 120 100">
          <line class="sword-blade" x1="20" y1="80" x2="100" y2="20" stroke="currentColor" stroke-width="3"/>
          <line class="sword-guard" x1="40" y1="60" x2="60" y2="40" stroke="currentColor" stroke-width="2"/>
        </svg>
      </div>

      <!-- 018. 月亮与六便士 - 月亮硬币翻转 -->
      <div v-if="book.middleEffect.type === 'moon-coin-flip'" class="moon-coin-flip-effect">
        <svg class="moon-coin-svg" viewBox="0 0 120 100">
          <circle class="moon" cx="40" cy="50" r="25" fill="none" stroke="currentColor" stroke-width="2"/>
          <circle class="coin" cx="80" cy="50" r="15" fill="none" stroke="currentColor" stroke-width="2"/>
        </svg>
      </div>

      <!-- 019. 明亮的夜晚 - 星星脉动 -->
      <div v-if="book.middleEffect.type === 'stars-pulse'" class="stars-pulse-effect">
        <div class="star star-1"></div>
        <div class="star star-2"></div>
        <div class="star star-3"></div>
        <div class="star star-4"></div>
        <div class="star star-5"></div>
      </div>

      <!-- 020. 小岛经济学 - 鱼游动 -->
      <div v-if="book.middleEffect.type === 'fish-swim'" class="fish-swim-effect">
        <svg class="fish-svg" viewBox="0 0 150 80">
          <path class="fish-body" d="M20,40 Q40,20 80,40 Q40,60 20,40" fill="none" stroke="currentColor" stroke-width="2"/>
          <path class="fish-tail" d="M20,40 L10,30 L10,50 Z" fill="none" stroke="currentColor" stroke-width="1.5"/>
        </svg>
      </div>

      <!-- 021. 我的阿勒泰 - 山脉光影 -->
      <div v-if="book.middleEffect.type === 'mountains-silhouette'" class="mountains-silhouette-effect">
        <svg class="mountains-svg" viewBox="0 0 200 100">
          <path class="mountain mountain-1" d="M20,90 L60,30 L100,90" fill="none" stroke="currentColor" stroke-width="2"/>
          <path class="mountain mountain-2" d="M80,90 L120,20 L160,90" fill="none" stroke="currentColor" stroke-width="2"/>
          <path class="mountain mountain-3" d="M140,90 L170,50 L200,90" fill="none" stroke="currentColor" stroke-width="1.5"/>
        </svg>
      </div>

      <!-- 022. 我与地坛 - 轮椅轨迹 -->
      <div v-if="book.middleEffect.type === 'wheelchair-path'" class="wheelchair-path-effect">
        <svg class="wheelchair-svg" viewBox="0 0 120 100">
          <circle class="wheel" cx="60" cy="50" r="30" fill="none" stroke="currentColor" stroke-width="2"/>
          <path class="path-line" d="M30,90 Q60,60 90,90" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="5,5">
            <animate attributeName="stroke-dashoffset" from="100" to="0" dur="4s" repeatCount="indefinite"/>
          </path>
        </svg>
      </div>

      <!-- 023. 太白金星有点烦 - 云朵漂浮 -->
      <div v-if="book.middleEffect.type === 'cloud-float'" class="cloud-float-effect">
        <svg class="cloud-svg" viewBox="0 0 120 80">
          <ellipse class="cloud-body" cx="60" cy="40" rx="40" ry="20" fill="none" stroke="currentColor" stroke-width="2"/>
          <text class="cloud-text" x="60" y="45" text-anchor="middle" font-size="14" fill="currentColor" font-family="serif">烦</text>
        </svg>
      </div>

      <!-- 024. 百年孤独 - 圆环旋转 -->
      <div v-if="book.middleEffect.type === 'circular-rotate'" class="circular-rotate-effect">
        <svg class="circular-svg" viewBox="0 0 120 120">
          <circle class="circle-outer" cx="60" cy="60" r="50" fill="none" stroke="currentColor" stroke-width="1.5"/>
          <circle class="circle-middle" cx="60" cy="60" r="35" fill="none" stroke="currentColor" stroke-width="1"/>
          <circle class="circle-inner" cx="60" cy="60" r="20" fill="none" stroke="currentColor" stroke-width="0.5"/>
          <text class="circular-text" x="60" y="65" text-anchor="middle" font-size="12" fill="currentColor">{{ book.middleEffect.value }}</text>
        </svg>
      </div>

      <!-- 025. 面纱 - 面纱起伏 -->
      <div v-if="book.middleEffect.type === 'veil-wave'" class="veil-wave-effect">
        <svg class="veil-svg" viewBox="0 0 200 100">
          <path class="veil-line veil-1" d="M0,30 Q50,40 100,30 T200,30" fill="none" stroke="currentColor" stroke-width="1"/>
          <path class="veil-line veil-2" d="M0,50 Q50,60 100,50 T200,50" fill="none" stroke="currentColor" stroke-width="1.5"/>
          <path class="veil-line veil-3" d="M0,70 Q50,80 100,70 T200,70" fill="none" stroke="currentColor" stroke-width="1"/>
        </svg>
      </div>

      <!-- 026. 草民 - 草叶摇摆 -->
      <div v-if="book.middleEffect.type === 'grass-sway'" class="grass-sway-effect">
        <svg class="grass-svg" viewBox="0 0 150 100">
          <path class="blade blade-1" d="M30,90 Q35,50 30,30" fill="none" stroke="currentColor" stroke-width="2"/>
          <path class="blade blade-2" d="M55,90 Q60,55 55,25" fill="none" stroke="currentColor" stroke-width="2"/>
          <path class="blade blade-3" d="M80,90 Q85,50 80,35" fill="none" stroke="currentColor" stroke-width="2"/>
          <path class="blade blade-4" d="M105,90 Q110,55 105,20" fill="none" stroke="currentColor" stroke-width="2"/>
          <path class="blade blade-5" d="M130,90 Q135,60 130,40" fill="none" stroke="currentColor" stroke-width="2"/>
        </svg>
      </div>

      <!-- 027. 人生海海 - 海浪涌动 -->
      <div v-if="book.middleEffect.type === 'ocean-waves'" class="ocean-waves-effect">
        <svg class="waves-svg" viewBox="0 0 200 100">
          <path class="wave wave-1" d="M0,30 Q25,20 50,30 T100,30 T150,30 T200,30" fill="none" stroke="currentColor" stroke-width="2"/>
          <path class="wave wave-2" d="M0,50 Q25,40 50,50 T100,50 T150,50 T200,50" fill="none" stroke="currentColor" stroke-width="1.5"/>
          <path class="wave wave-3" d="M0,70 Q25,60 50,70 T100,70 T150,70 T200,70" fill="none" stroke="currentColor" stroke-width="1"/>
        </svg>
      </div>

      <!-- 028. 长安的荔枝 - 荔枝脉动 -->
      <div v-if="book.middleEffect.type === 'lychee-pulse'" class="lychee-pulse-effect">
        <svg class="lychee-svg" viewBox="0 0 100 100">
          <circle class="lychee-body" cx="50" cy="50" r="30" fill="none" stroke="currentColor" stroke-width="2"/>
          <circle class="lychee-dot" cx="50" cy="50" r="6" fill="currentColor"/>
          <line class="lychee-stem" x1="50" y1="20" x2="50" y2="5" stroke="currentColor" stroke-width="2"/>
        </svg>
      </div>

      <!-- 029. 霍乱时期的爱情 - 心电图 -->
      <div v-if="book.middleEffect.type === 'ekg'" class="ekg-effect">
        <svg class="ekg-svg" viewBox="0 0 200 60">
          <path d="M0,30 L40,30 L50,10 L60,50 L70,30 L120,30 L130,5 L140,55 L150,30 L200,30"
                fill="none" stroke="currentColor" stroke-width="2" class="ekg-line"/>
          <circle cx="150" cy="30" r="4" fill="currentColor" class="ekg-heart"/>
        </svg>
        <div class="ekg-label">51年9个月零4天</div>
      </div>

      <!-- 030. 山茶文具店 - 花瓣绽放 -->
      <div v-if="book.middleEffect.type === 'flower-bloom'" class="flower-bloom-effect">
        <svg class="flower-svg" viewBox="0 0 100 100">
          <circle class="flower-center" cx="50" cy="50" r="8" fill="currentColor"/>
          <ellipse class="petal petal-1" cx="50" cy="25" rx="8" ry="15" fill="none" stroke="currentColor" stroke-width="1.5"/>
          <ellipse class="petal petal-2" cx="75" cy="50" rx="15" ry="8" fill="none" stroke="currentColor" stroke-width="1.5"/>
          <ellipse class="petal petal-3" cx="50" cy="75" rx="8" ry="15" fill="none" stroke="currentColor" stroke-width="1.5"/>
          <ellipse class="petal petal-4" cx="25" cy="50" rx="15" ry="8" fill="none" stroke="currentColor" stroke-width="1.5"/>
        </svg>
      </div>

      <!-- 031. 马可瓦尔多 - 树叶飘落 -->
      <div v-if="book.middleEffect.type === 'leaf-fall'" class="leaf-fall-effect">
        <svg class="leaf-svg" viewBox="0 0 100 120">
          <path class="leaf-body" d="M50,10 Q30,40 50,110 Q70,40 50,10" fill="none" stroke="currentColor" stroke-width="2"/>
          <line class="leaf-vein" x1="50" y1="30" x2="50" y2="90" stroke="currentColor" stroke-width="1"/>
        </svg>
      </div>

      <!-- 032. 基督山伯爵 - 宝藏闪烁 -->
      <div v-if="book.middleEffect.type === 'treasure-sparkle'" class="treasure-sparkle-effect">
        <svg class="treasure-svg" viewBox="0 0 120 100">
          <rect class="treasure-box" x="30" y="40" width="60" height="40" fill="none" stroke="currentColor" stroke-width="2"/>
          <circle class="sparkle sparkle-1" cx="40" cy="50" r="2" fill="currentColor"/>
          <circle class="sparkle sparkle-2" cx="60" cy="60" r="2" fill="currentColor"/>
          <circle class="sparkle sparkle-3" cx="80" cy="50" r="2" fill="currentColor"/>
          <circle class="sparkle sparkle-4" cx="50" cy="70" r="2" fill="currentColor"/>
          <circle class="sparkle sparkle-5" cx="70" cy="70" r="2" fill="currentColor"/>
        </svg>
      </div>

      <!-- 033. 悉达多 - 极简符号 -->
      <div v-if="book.middleEffect.type === 'minimal-symbol'" class="minimal-symbol-effect">
        <div class="symbol-large">{{ book.middleEffect.value }}</div>
      </div>

      <!-- 034. 无人生还 - 士兵倒计时 -->
      <div v-if="book.middleEffect.type === 'soldier-countdown'" class="soldier-countdown-effect">
        <div class="soldier-icon">🗲</div>
        <div class="soldier-number">{{ currentSoldierCount }}</div>
        <div class="soldier-label">SOLDIERS REMAINING</div>
      </div>

      <!-- 035. 解忧杂货店 - 信箱开合 -->
      <div v-if="book.middleEffect.type === 'mailbox-open'" class="mailbox-open-effect">
        <svg class="mailbox-svg" viewBox="0 0 100 100">
          <rect class="mailbox-body" x="20" y="50" width="60" height="40" fill="none" stroke="currentColor" stroke-width="2"/>
          <rect class="mailbox-door" x="25" y="55" width="50" height="30" fill="none" stroke="currentColor" stroke-width="1.5"/>
          <line class="mailbox-flag" x1="80" y1="30" x2="80" y2="50" stroke="currentColor" stroke-width="2"/>
        </svg>
      </div>

      <!-- 036. 嫌疑人X的献身 - 公式闪烁 -->
      <div v-if="book.middleEffect.type === 'formula-flash'" class="formula-flash-effect">
        <div class="formula-text">{{ book.middleEffect.value }}</div>
        <div class="formula-sub">∫</div>
      </div>

      <!-- 037. 三体 - 倒计时 -->
      <div v-if="book.middleEffect.type === 'countdown'" class="countdown-effect">
        <div class="countdown-number" :data-countdown="currentCountdown">{{ currentCountdown }}</div>
        <div class="countdown-label">UNTIL COLLAPSE</div>
      </div>

      <!-- 038. 白夜行 - 光影移动 -->
      <div v-if="book.middleEffect.type === 'light-shadow-move'" class="light-shadow-move-effect">
        <svg class="light-shadow-svg" viewBox="0 0 120 100">
          <defs>
            <linearGradient id="shadowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" class="grad-stop-1"/>
              <stop offset="100%" class="grad-stop-2"/>
            </linearGradient>
          </defs>
          <rect x="0" y="20" width="120" height="60" fill="url(#shadowGrad)" opacity="0.3"/>
          <line class="shadow-divider" x1="60" y1="20" x2="60" y2="80" stroke="currentColor" stroke-width="1"/>
        </svg>
      </div>
    </div>

    <!-- 引用区域（Hover 显示） - 当有中部特效时不显示 -->
    <transition name="quote-fade">
      <div v-if="showQuote && book.featuredQuote && !book.middleEffect" class="quote-section">
        <span class="quote-mark">"</span>
        <span class="quote-text">{{ truncateQuote(book.featuredQuote) }}</span>
      </div>
    </transition>

    <!-- 底部栏 -->
    <div class="card-footer">
      <!-- 左：三根脉动竖线 -->
      <div class="archive-lines">
        <div class="line line-1"></div>
        <div class="line line-2"></div>
        <div class="line line-3"></div>
      </div>

      <!-- 右：阅读按钮 -->
      <button class="read-btn">
        <span>READ ENTRY</span>
        <svg class="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  book: {
    type: Object,
    required: true
  }
})

const router = useRouter()
const showQuote = ref(false)
let quoteTimeout = null

// 倒计时效果（三体）
const currentCountdown = ref('450:00:00')
let countdownInterval = null

// 士兵倒计时效果（无人生还）
const currentSoldierCount = ref(10)
let soldierCountdownInterval = null

// 启动倒计时动画
const startCountdownAnimation = () => {
  if (!props.book.middleEffect || props.book.middleEffect.type !== 'countdown') return

  let [hours, minutes, seconds] = props.book.middleEffect.value.split(':').map(Number)

  countdownInterval = setInterval(() => {
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
      hours = 450
      minutes = 0
      seconds = 0
    }

    currentCountdown.value = `${String(hours).padStart(3, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  }, 800)
}

// 启动士兵倒计时动画
const startSoldierCountdownAnimation = () => {
  if (!props.book.middleEffect || props.book.middleEffect.type !== 'soldier-countdown') return

  soldierCountdownInterval = setInterval(() => {
    if (currentSoldierCount.value > 1) {
      currentSoldierCount.value--
    } else {
      currentSoldierCount.value = 10 // 重置
    }
  }, 2000) // 每2秒减少一个
}

// 截断引用文字
function truncateQuote(quote) {
  if (!quote) return ''
  const maxLength = 40
  return quote.length > maxLength ? quote.substring(0, maxLength) + '...' : quote
}

// Mouse 事件
const handleMouseEnter = () => {
  quoteTimeout = setTimeout(() => {
    showQuote.value = true
  }, 200)
}

const handleMouseLeave = () => {
  showQuote.value = false
  if (quoteTimeout) {
    clearTimeout(quoteTimeout)
  }
}

// 导航
const readBook = () => {
  if (props.book.worldComponent) {
    const routeMap = {
      'PrinceWorld': '/world/prince',
      'IslandBookstoreWorld': '/world/island-bookstore',
      'TrappedInDunesWorld': '/world/trapped-in-dunes',
      'NightSubmarineWorld': '/world/night-submarine',
      'MoscowGentlemanWorld': '/world/moscow-gentleman',
      'CrimeAndPunishmentWorld': '/world/crime-and-punishment',
      'SaharaWorld': '/world/sahara',
      'KillingCommendatoreWorld': '/world/killing-commendatore',
      'LostSatelliteWorld': '/world/lost-satellite',
      'ErgunRiverWorld': '/world/ergun-river',
      'EmbodiedWorld': '/world/embodied',
      'WenchengWorld': '/world/wencheng',
      'NorwegianForestWorld': '/world/norwegian-forest',
      'UncertainWallWorld': '/world/uncertain-wall',
      'Q84World': '/world/q84'
    }

    const route = routeMap[props.book.worldComponent]
    if (route) {
      router.push(route)
    }
  } else {
    router.push(`/book/${props.book.id}`)
  }
}

onMounted(() => {
  startCountdownAnimation()
  startSoldierCountdownAnimation()
})

onUnmounted(() => {
  if (countdownInterval) {
    clearInterval(countdownInterval)
  }
  if (soldierCountdownInterval) {
    clearInterval(soldierCountdownInterval)
  }
  if (quoteTimeout) {
    clearTimeout(quoteTimeout)
  }
})
</script>

<style scoped>
/* ========== 卡片基础 ========== */
.monochrome-card {
  position: relative;
  width: 100%;
  height: 500px;
  background: #FFFFFF;
  border: 2px solid #000000;
  padding: 2rem;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.1s;
  display: flex;
  flex-direction: column;
}

/* 渐进边框 */
.progressive-border {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: 2px solid #000000;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.1s;
}

/* 内部纹理 */
.card-texture {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  opacity: 0.5;
  background-image: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    #00000002 2px,
    #00000002 3px
  );
}

/* ========== Hover 效果 ========== */
.monochrome-card:hover {
  background: #000000;
  color: #FFFFFF;
}

.monochrome-card:hover .progressive-border {
  opacity: 1;
}

.monochrome-card:hover .book-title,
.monochrome-card:hover .book-subtitle,
.monochrome-card:hover .book-author,
.monochrome-card:hover .category-tag,
.monochrome-card:hover .quote-text,
.monochrome-card:hover .read-btn {
  color: #FFFFFF;
}

.monochrome-card:hover .category-tag {
  background: #FFFFFF;
  color: #000000;
}

.monochrome-card:hover .read-btn {
  background: #FFFFFF;
  color: #000000;
}

.monochrome-card:hover .quote-mark {
  color: #FFFFFF;
}

.monochrome-card:hover .archive-lines .line {
  background: #FFFFFF;
}

/* ========== 顶部标签 ========== */
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  position: relative;
  z-index: 10;
}

.vol-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  color: #525252;
}

.category-tag {
  background: #000000;
  color: #FFFFFF;
  padding: 0.4rem 0.75rem;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.6rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  transition: all 0.1s;
}

/* ========== 主内容 ========== */
.card-content {
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 10;
  margin-bottom: 1rem;
}

.book-title {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(1.5rem, 3.5vw, 2rem);
  font-weight: 400;
  line-height: 1.15;
  letter-spacing: -0.02em;
  color: #000000;
  margin-bottom: 0.5rem;
  transition: all 0.1s, transform 0.3s ease-out;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.monochrome-card:hover .book-title {
  transform: translateY(-2px);
}

.book-subtitle {
  font-family: 'Source Serif 4', Georgia, serif;
  font-size: 0.875rem;
  font-weight: 400;
  font-style: italic;
  letter-spacing: 0.1em;
  color: #525252;
  margin-bottom: 0.35rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.book-author {
  font-family: 'Source Serif 4', Georgia, serif;
  font-size: 0.75rem;
  font-weight: 400;
  letter-spacing: 0.08em;
  color: #525252;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* ========== 中部特效 ========== */
.card-middle {
  position: relative;
  z-index: 10;
  margin: 1rem 0;
  flex: 1 1 auto;
  min-height: 80px;
  max-height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

/* 倒计时效果 */
.countdown-effect {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  background: #000000;
  border: 3px solid #000000;
  position: relative;
}

.countdown-effect::before {
  content: '';
  position: absolute;
  top: 3px;
  left: 3px;
  right: 3px;
  bottom: 3px;
  border: 1px solid #000000;
  pointer-events: none;
}

.monochrome-card:hover .countdown-effect {
  background: #FFFFFF;
  border-color: #FFFFFF;
}

.monochrome-card:hover .countdown-effect::before {
  border-color: #FFFFFF;
}

.countdown-number {
  font-family: 'Orbitron', 'Courier New', monospace;
  font-size: 1.5rem;
  font-weight: 900;
  letter-spacing: 0.1em;
  color: #000000;
  transition: all 0.1s;
  position: relative;
  z-index: 2;
}

.countdown-number::before {
  content: attr(data-countdown);
  position: absolute;
  top: 0;
  left: 0;
  color: #FFFFFF;
  opacity: 0.2;
  filter: blur(2px);
  z-index: -1;
}

.monochrome-card:hover .countdown-number {
  color: #000000;
}

.countdown-label {
  font-family: 'Orbitron', 'JetBrains Mono', monospace;
  font-size: 0.5rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  color: #FFFFFF;
  text-transform: uppercase;
  position: relative;
  z-index: 2;
  opacity: 0.9;
}

.monochrome-card:hover .countdown-label {
  color: #000000;
  opacity: 1;
}

/* 监视眼效果 */
.eye-effect {
  width: 80%;
  display: flex;
  justify-content: center;
}

.eye-svg {
  width: 100%;
  height: auto;
  color: #000000;
  opacity: 0.8;
  transition: all 0.3s;
}

.monochrome-card:hover .eye-svg {
  color: #FFFFFF;
}

.eye-pupil {
  animation: pupil-breathe 4s ease-in-out infinite;
}

@keyframes pupil-breathe {
  0%, 100% { r: 12; }
  50% { r: 14; }
}

/* 竖排诗句 */
.vertical-quote-effect {
  width: 100%;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.quote-vertical {
  writing-mode: vertical-rl;
  text-orientation: mixed;
  font-family: 'Source Serif 4', Georgia, serif;
  font-size: 0.85rem;
  line-height: 2.5;
  letter-spacing: 0.4em;
  color: #525252;
  font-weight: 300;
  max-height: 100px;
  overflow: hidden;
}

.monochrome-card:hover .quote-vertical {
  color: #FFFFFF;
}

/* 代码块效果 */
.code-quote-effect {
  width: 100%;
  background: #F5F5F5;
  padding: 1rem;
  border-left: 3px solid #000000;
  transition: all 0.1s;
}

.code-block {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.7rem;
  line-height: 1.6;
  color: #000000;
  margin: 0;
  white-space: pre-wrap;
  word-break: break-word;
}

.monochrome-card:hover .code-quote-effect {
  background: transparent;
  border-left-color: #FFFFFF;
}

.monochrome-card:hover .code-block {
  color: #FFFFFF;
}

/* 心电图效果 */
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
  color: #000000;
}

.ekg-line {
  stroke-dasharray: 200;
  stroke-dashoffset: 200;
  animation: ekg-draw 2s linear forwards infinite;
}

@keyframes ekg-draw {
  to { stroke-dashoffset: 0; }
}

.ekg-heart {
  animation: heart-beat 0.8s ease-in-out infinite;
}

@keyframes heart-beat {
  0%, 100% { r: 4; }
  50% { r: 6; }
}

.ekg-label {
  font-family: 'Source Serif 4', Georgia, serif;
  font-size: 0.7rem;
  font-style: italic;
  color: #525252;
}

.monochrome-card:hover .ekg-svg {
  color: #FFFFFF;
}

.monochrome-card:hover .ekg-label {
  color: #FFFFFF;
}

/* 极简符号效果 */
.minimal-symbol-effect {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.symbol-large {
  font-size: 3rem;
  color: #000000;
  opacity: 0.3;
  transition: all 0.5s ease;
}

.monochrome-card:hover .symbol-large {
  opacity: 0.5;
  color: #FFFFFF;
  transform: scale(1.1);
}

/* ========== 引用区域 ========== */
.quote-section {
  position: relative;
  z-index: 10;
  margin: 1.5rem 0;
  padding: 1rem 0;
  border-top: 1px solid #E5E5E5;
  border-bottom: 1px solid #E5E5E5;
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
}

.monochrome-card:hover .quote-section {
  border-color: #333333;
}

.quote-mark {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 2rem;
  line-height: 1;
  color: #000000;
  opacity: 0.3;
}

.quote-text {
  font-family: 'Source Serif 4', Georgia, serif;
  font-size: 0.85rem;
  line-height: 1.6;
  color: #525252;
  font-style: italic;
  flex: 1;
}

/* 引用淡入动画 */
.quote-fade-enter-active,
.quote-fade-leave-active {
  transition: opacity 0.3s ease;
}

.quote-fade-enter-from,
.quote-fade-leave-to {
  opacity: 0;
}

/* ========== 底部栏 ========== */
.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1.5rem;
  border-top: 1px solid #E5E5E5;
  position: relative;
  z-index: 10;
  margin-top: auto;
}

.monochrome-card:hover .card-footer {
  border-top-color: #333333;
}

/* 档案线条 */
.archive-lines {
  display: flex;
  gap: 4px;
}

.line {
  width: 2px;
  height: 20px;
  background: #000000;
  opacity: 0.3;
  transition: all 0.3s;
}

.line-1 {
  animation: breathe 3s ease-in-out infinite;
}

.line-2 {
  animation: breathe 3s ease-in-out infinite 0.5s;
}

.line-3 {
  animation: breathe 3s ease-in-out infinite 1s;
}

@keyframes breathe {
  0%, 100% { opacity: 0.2; }
  50% { opacity: 0.6; }
}

.monochrome-card:hover .line {
  opacity: 0.6;
}

/* 阅读按钮 */
.read-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1.25rem;
  background: #000000;
  border: none;
  color: #FFFFFF;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.1s;
}

.read-btn:hover {
  transform: translateX(2px);
}

.read-btn .arrow-icon {
  width: 14px;
  height: 14px;
  transition: transform 0.2s;
}

.read-btn:hover .arrow-icon {
  transform: translateX(2px);
}

/* ========== 001. 岛上书店 - 浮动书籍 ========== */
.floating-books-effect {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.book {
  width: 25px;
  height: 35px;
  border: 2px solid #000000;
  position: relative;
}

.book::before {
  content: '';
  position: absolute;
  left: 3px;
  top: 0;
  bottom: 0;
  width: 1px;
  background: #000000;
}

.book-1 {
  animation: float-1 3s ease-in-out infinite;
}

.book-2 {
  animation: float-2 3.5s ease-in-out infinite 0.5s;
}

.book-3 {
  animation: float-3 4s ease-in-out infinite 1s;
}

@keyframes float-1 {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-8px) rotate(2deg); }
}

@keyframes float-2 {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-12px) rotate(-2deg); }
}

@keyframes float-3 {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-6px) rotate(1deg); }
}

.monochrome-card:hover .book {
  border-color: #FFFFFF;
}

.monochrome-card:hover .book::before {
  background: #FFFFFF;
}

/* ========== 002. 困于沙丘 - 沙丘流动 ========== */
.dunes-flow-effect {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}

.dunes-svg {
  width: 100%;
  height: auto;
  color: #000000;
}

.monochrome-card:hover .dunes-svg {
  color: #FFFFFF;
}

.dune {
  stroke-dasharray: 300;
  stroke-dashoffset: 300;
  animation: dune-flow 4s linear forwards infinite;
}

.dune-1 {
  animation-delay: 0s;
}

.dune-2 {
  animation-delay: 0.5s;
}

.dune-3 {
  animation-delay: 1s;
}

@keyframes dune-flow {
  to { stroke-dashoffset: 0; }
}

/* ========== 003. 罪与罚 - 斧头摇摆 ========== */
.axe-swing-effect {
  width: 60%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.axe-svg {
  width: 100%;
  height: auto;
  color: #000000;
}

.monochrome-card:hover .axe-svg {
  color: #FFFFFF;
}

.axe-handle {
  transform-origin: 50% 80%;
  animation: axe-swing 3s ease-in-out infinite;
}

@keyframes axe-swing {
  0%, 100% { transform: rotate(0deg); }
  50% { transform: rotate(15deg); }
}

/* ========== 004. 莫斯科绅士 - 拱门闪烁 ========== */
.arch-glow-effect {
  width: 70%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.arch-svg {
  width: 100%;
  height: auto;
  color: #000000;
}

.monochrome-card:hover .arch-svg {
  color: #FFFFFF;
}

.arch-path {
  animation: arch-glow 3s ease-in-out infinite;
}

@keyframes arch-glow {
  0%, 100% { opacity: 1; stroke-width: 2; }
  50% { opacity: 0.5; stroke-width: 1; }
}

/* ========== 005. 夜晚的潜水艇 - 潜艇浮动 ========== */
.submarine-float-effect {
  width: 80%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.submarine-svg {
  width: 100%;
  height: auto;
  color: #000000;
  animation: submarine-move 5s ease-in-out infinite;
}

.monochrome-card:hover .submarine-svg {
  color: #FFFFFF;
}

.sub-window {
  animation: window-blink 2s ease-in-out infinite;
}

.sub-window:nth-child(2) {
  animation-delay: 0.3s;
}

.sub-window:nth-child(3) {
  animation-delay: 0.6s;
}

@keyframes submarine-move {
  0%, 100% { transform: translateX(0) translateY(0); }
  25% { transform: translateX(5px) translateY(-3px); }
  50% { transform: translateX(0) translateY(-5px); }
  75% { transform: translateX(-5px) translateY(-3px); }
}

@keyframes window-blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

/* ========== 007. 撒哈拉的故事 - 沙粒漂移 ========== */
.sand-drift-effect {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}

.sand-particle {
  position: absolute;
  width: 2px;
  height: 2px;
  background: #000000;
  border-radius: 50%;
  animation: sand-drift 4s linear infinite;
}

.monochrome-card:hover .sand-particle {
  background: #FFFFFF;
}

@keyframes sand-drift {
  0% { transform: translateX(-20px) translateY(0); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { transform: translateX(150px) translateY(30px); opacity: 0; }
}

/* ========== 008. 刺杀骑士团长 - 隐喻脉动 ========== */
.metaphor-pulse-effect {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
}

.metaphor-text {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 1.2rem;
  color: #000000;
  z-index: 2;
  transition: all 0.1s;
}

.monochrome-card:hover .metaphor-text {
  color: #FFFFFF;
}

.metaphor-circle {
  position: absolute;
  width: 80px;
  height: 80px;
  border: 1px solid #000000;
  border-radius: 50%;
  animation: metaphor-expand 3s ease-in-out infinite;
}

.monochrome-card:hover .metaphor-circle {
  border-color: #FFFFFF;
}

@keyframes metaphor-expand {
  0%, 100% { transform: scale(1); opacity: 0.3; }
  50% { transform: scale(1.5); opacity: 0; }
}

/* ========== 009. 失落的卫星 - 卫星轨道 ========== */
.satellite-orbit-effect {
  width: 90%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.orbit-svg {
  width: 100%;
  height: auto;
  color: #000000;
}

.monochrome-card:hover .orbit-svg {
  color: #FFFFFF;
}

.satellite {
  animation: satellite-move 8s linear infinite;
}

@keyframes satellite-move {
  from { offset-distance: 0%; }
  to { offset-distance: 100%; }
}

/* ========== 010. 额尔古纳河右岸 - 河流流动 ========== */
.river-flow-effect {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.river-svg {
  width: 100%;
  height: auto;
  color: #000000;
}

.monochrome-card:hover .river-svg {
  color: #FFFFFF;
}

.river-path {
  stroke-dasharray: 400;
  stroke-dashoffset: 400;
  animation: river-flow 5s linear forwards infinite;
}

@keyframes river-flow {
  to { stroke-dashoffset: 0; }
}

/* ========== 012. 文城 - 雾气模糊 ========== */
.fog-mist-effect {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.fog-layer {
  position: absolute;
  width: 100%;
  height: 30px;
  background: linear-gradient(90deg, transparent, #000000, transparent);
  opacity: 0.1;
  animation: fog-drift 6s ease-in-out infinite;
}

.monochrome-card:hover .fog-layer {
  background: linear-gradient(90deg, transparent, #FFFFFF, transparent);
}

.fog-1 {
  animation-delay: 0s;
  top: 20%;
}

.fog-2 {
  animation-delay: 2s;
  top: 50%;
}

.fog-3 {
  animation-delay: 4s;
  top: 80%;
}

@keyframes fog-drift {
  0%, 100% { transform: translateX(-30%); opacity: 0.05; }
  50% { transform: translateX(30%); opacity: 0.15; }
}

.fog-text {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 2rem;
  color: #000000;
  opacity: 0.15;
  z-index: 2;
  transition: all 0.1s;
}

.monochrome-card:hover .fog-text {
  color: #FFFFFF;
  opacity: 0.3;
}

/* ========== 013. 挪威的森林 - 森林摇摆 ========== */
.forest-sway-effect {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.forest-svg {
  width: 100%;
  height: auto;
  color: #000000;
}

.monochrome-card:hover .forest-svg {
  color: #FFFFFF;
}

.tree {
  transform-origin: bottom center;
}

.tree-1 {
  animation: tree-sway 3s ease-in-out infinite;
}

.tree-2 {
  animation: tree-sway 3.5s ease-in-out infinite 0.5s;
}

.tree-3 {
  animation: tree-sway 4s ease-in-out infinite 1s;
}

@keyframes tree-sway {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(2deg); }
  75% { transform: rotate(-2deg); }
}

/* ========== 014. 小城与不确定性的墙 - 墙体光影 ========== */
.wall-shadow-effect {
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
}

.wall-line {
  width: 60%;
  height: 2px;
  background: #000000;
  margin: 0.5rem 0;
  transition: all 0.1s;
}

.wall-line-1 {
  animation: wall-shadow 3s ease-in-out infinite;
}

.wall-line-2 {
  width: 80%;
  animation: wall-shadow 3s ease-in-out infinite 0.5s;
}

.wall-line-3 {
  width: 40%;
  animation: wall-shadow 3s ease-in-out infinite 1s;
}

@keyframes wall-shadow {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
}

.monochrome-card:hover .wall-line {
  background: #FFFFFF;
}

.wall-text {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.7rem;
  letter-spacing: 0.3em;
  color: #000000;
  margin-top: 1rem;
  transition: all 0.1s;
}

.monochrome-card:hover .wall-text {
  color: #FFFFFF;
}

/* ========== 015. 1Q84 - 双月旋转 ========== */
.dual-moon-rotate-effect {
  width: 70%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.moons-svg {
  width: 100%;
  height: auto;
  color: #000000;
}

.monochrome-card:hover .moons-svg {
  color: #FFFFFF;
}

.moon-1 {
  animation: moon-rotate 8s linear infinite;
  transform-origin: 40px 60px;
}

.moon-2 {
  animation: moon-rotate 6s linear infinite reverse;
  transform-origin: 80px 60px;
}

@keyframes moon-rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* ========== 016. 山月记 - 虎纹流动 ========== */
.tiger-stripe-flow-effect {
  width: 80%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tiger-svg {
  width: 100%;
  height: auto;
  color: #000000;
}

.monochrome-card:hover .tiger-svg {
  color: #FFFFFF;
}

.stripe {
  stroke-dasharray: 200;
  stroke-dashoffset: 200;
  animation: stripe-flow 3s linear forwards infinite;
}

.stripe-1 {
  animation-delay: 0s;
}

.stripe-2 {
  animation-delay: 0.3s;
}

.stripe-3 {
  animation-delay: 0.6s;
}

@keyframes stripe-flow {
  to { stroke-dashoffset: 0; }
}

.tiger-moon {
  animation: moon-glow 4s ease-in-out infinite;
}

@keyframes moon-glow {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}

/* ========== 017. 射雕英雄传 - 剑光闪烁 ========== */
.sword-flash-effect {
  width: 70%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sword-svg {
  width: 100%;
  height: auto;
  color: #000000;
}

.monochrome-card:hover .sword-svg {
  color: #FFFFFF;
}

.sword-blade {
  animation: sword-flash 2s ease-in-out infinite;
}

@keyframes sword-flash {
  0%, 100% { opacity: 1; stroke-width: 3; }
  50% { opacity: 0.3; stroke-width: 1; }
}

/* ========== 018. 月亮与六便士 - 月亮硬币翻转 ========== */
.moon-coin-flip-effect {
  width: 80%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.moon-coin-svg {
  width: 100%;
  height: auto;
  color: #000000;
}

.monochrome-card:hover .moon-coin-svg {
  color: #FFFFFF;
}

.moon {
  animation: moon-pulse 4s ease-in-out infinite;
}

.coin {
  animation: coin-flip 3s ease-in-out infinite;
  transform-origin: 80px 50px;
}

@keyframes moon-pulse {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}

@keyframes coin-flip {
  0% { transform: rotateY(0deg); }
  50% { transform: rotateY(180deg); opacity: 0.3; }
  100% { transform: rotateY(360deg); }
}

/* ========== 019. 明亮的夜晚 - 星星脉动 ========== */
.stars-pulse-effect {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
}

.star {
  width: 4px;
  height: 4px;
  background: #000000;
  transform: rotate(45deg);
  transition: all 0.1s;
}

.monochrome-card:hover .star {
  background: #FFFFFF;
}

.star-1 {
  animation: star-pulse 2s ease-in-out infinite;
}

.star-2 {
  animation: star-pulse 2.5s ease-in-out infinite 0.3s;
}

.star-3 {
  animation: star-pulse 3s ease-in-out infinite 0.6s;
}

.star-4 {
  animation: star-pulse 2.2s ease-in-out infinite 0.9s;
}

.star-5 {
  animation: star-pulse 2.8s ease-in-out infinite 1.2s;
}

@keyframes star-pulse {
  0%, 100% { transform: rotate(45deg) scale(1); opacity: 0.3; }
  50% { transform: rotate(45deg) scale(1.5); opacity: 1; }
}

/* ========== 020. 小岛经济学 - 鱼游动 ========== */
.fish-swim-effect {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.fish-svg {
  width: 100%;
  height: auto;
  color: #000000;
  animation: fish-swim 4s ease-in-out infinite;
}

.monochrome-card:hover .fish-svg {
  color: #FFFFFF;
}

@keyframes fish-swim {
  0%, 100% { transform: translateX(0) scaleX(1); }
  25% { transform: translateX(10px) scaleX(1); }
  50% { transform: translateX(0) scaleX(1); }
  75% { transform: translateX(-10px) scaleX(-1); }
}

/* ========== 021. 我的阿勒泰 - 山脉光影 ========== */
.mountains-silhouette-effect {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mountains-svg {
  width: 100%;
  height: auto;
  color: #000000;
}

.monochrome-card:hover .mountains-svg {
  color: #FFFFFF;
}

.mountain {
  animation: mountain-shadow 5s ease-in-out infinite;
}

.mountain-1 {
  animation-delay: 0s;
}

.mountain-2 {
  animation-delay: 1s;
}

.mountain-3 {
  animation-delay: 2s;
}

@keyframes mountain-shadow {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}

/* ========== 022. 我与地坛 - 轮椅轨迹 ========== */
.wheelchair-path-effect {
  width: 70%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.wheelchair-svg {
  width: 100%;
  height: auto;
  color: #000000;
}

.monochrome-card:hover .wheelchair-svg {
  color: #FFFFFF;
}

.wheel {
  animation: wheel-spin 4s linear infinite;
  transform-origin: 60px 50px;
}

@keyframes wheel-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* ========== 023. 太白金星有点烦 - 云朵漂浮 ========== */
.cloud-float-effect {
  width: 80%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cloud-svg {
  width: 100%;
  height: auto;
  color: #000000;
  animation: cloud-float 4s ease-in-out infinite;
}

.monochrome-card:hover .cloud-svg {
  color: #FFFFFF;
}

.cloud-text {
  transition: all 0.1s;
}

@keyframes cloud-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

/* ========== 024. 百年孤独 - 圆环旋转 ========== */
.circular-rotate-effect {
  width: 80%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.circular-svg {
  width: 100%;
  height: auto;
  color: #000000;
}

.monochrome-card:hover .circular-svg {
  color: #FFFFFF;
}

.circle-outer {
  animation: circle-rotate-outer 8s linear infinite;
  transform-origin: 60px 60px;
}

.circle-middle {
  animation: circle-rotate-middle 6s linear infinite reverse;
  transform-origin: 60px 60px;
}

.circle-inner {
  animation: circle-rotate-inner 4s linear infinite;
  transform-origin: 60px 60px;
}

.circular-text {
  font-family: 'Source Serif 4', Georgia, serif;
  transition: all 0.1s;
}

@keyframes circle-rotate-outer {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes circle-rotate-middle {
  from { transform: rotate(0deg); }
  to { transform: rotate(-360deg); }
}

@keyframes circle-rotate-inner {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* ========== 025. 面纱 - 面纱起伏 ========== */
.veil-wave-effect {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.veil-svg {
  width: 100%;
  height: auto;
  color: #000000;
}

.monochrome-card:hover .veil-svg {
  color: #FFFFFF;
}

.veil-line {
  animation: veil-wave 3s ease-in-out infinite;
}

.veil-1 {
  animation-delay: 0s;
}

.veil-2 {
  animation-delay: 0.5s;
}

.veil-3 {
  animation-delay: 1s;
}

@keyframes veil-wave {
  0%, 100% { transform: translateY(0); opacity: 0.3; }
  50% { transform: translateY(-5px); opacity: 1; }
}

/* ========== 026. 草民 - 草叶摇摆 ========== */
.grass-sway-effect {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.grass-svg {
  width: 100%;
  height: auto;
  color: #000000;
}

.monochrome-card:hover .grass-svg {
  color: #FFFFFF;
}

.blade {
  transform-origin: bottom center;
  animation: grass-sway 2.5s ease-in-out infinite;
}

.blade-1 {
  animation-delay: 0s;
}

.blade-2 {
  animation-delay: 0.2s;
}

.blade-3 {
  animation-delay: 0.4s;
}

.blade-4 {
  animation-delay: 0.6s;
}

.blade-5 {
  animation-delay: 0.8s;
}

@keyframes grass-sway {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(3deg); }
  75% { transform: rotate(-3deg); }
}

/* ========== 027. 人生海海 - 海浪涌动 ========== */
.ocean-waves-effect {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.waves-svg {
  width: 100%;
  height: auto;
  color: #000000;
}

.monochrome-card:hover .waves-svg {
  color: #FFFFFF;
}

.wave {
  animation: wave-motion 2s ease-in-out infinite;
}

.wave-1 {
  animation-delay: 0s;
}

.wave-2 {
  animation-delay: 0.3s;
}

.wave-3 {
  animation-delay: 0.6s;
}

@keyframes wave-motion {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(10px); }
}

/* ========== 028. 长安的荔枝 - 荔枝脉动 ========== */
.lychee-pulse-effect {
  width: 70%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lychee-svg {
  width: 100%;
  height: auto;
  color: #000000;
}

.monochrome-card:hover .lychee-svg {
  color: #FFFFFF;
}

.lychee-body {
  animation: lychee-pulse 2s ease-in-out infinite;
}

.lychee-dot {
  animation: lychee-dot-pulse 2s ease-in-out infinite;
}

@keyframes lychee-pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

@keyframes lychee-dot-pulse {
  0%, 100% { r: 6; }
  50% { r: 8; }
}

/* ========== 030. 山茶文具店 - 花瓣绽放 ========== */
.flower-bloom-effect {
  width: 70%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.flower-svg {
  width: 100%;
  height: auto;
  color: #000000;
}

.monochrome-card:hover .flower-svg {
  color: #FFFFFF;
}

.petal {
  transform-origin: center;
  animation: petal-bloom 4s ease-in-out infinite;
}

.petal-1 {
  animation-delay: 0s;
}

.petal-2 {
  animation-delay: 0.3s;
}

.petal-3 {
  animation-delay: 0.6s;
}

.petal-4 {
  animation-delay: 0.9s;
}

@keyframes petal-bloom {
  0%, 100% { transform: scale(1) rotate(0deg); }
  50% { transform: scale(1.1) rotate(5deg); }
}

/* ========== 031. 马可瓦尔多 - 树叶飘落 ========== */
.leaf-fall-effect {
  width: 60%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.leaf-svg {
  width: 100%;
  height: auto;
  color: #000000;
  animation: leaf-fall 4s ease-in-out infinite;
}

.monochrome-card:hover .leaf-svg {
  color: #FFFFFF;
}

@keyframes leaf-fall {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  25% { transform: translateY(10px) rotate(5deg); }
  50% { transform: translateY(0) rotate(0deg); }
  75% { transform: translateY(-5px) rotate(-5deg); }
}

/* ========== 032. 基督山伯爵 - 宝藏闪烁 ========== */
.treasure-sparkle-effect {
  width: 80%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.treasure-svg {
  width: 100%;
  height: auto;
  color: #000000;
}

.monochrome-card:hover .treasure-svg {
  color: #FFFFFF;
}

.sparkle {
  animation: sparkle-flash 1.5s ease-in-out infinite;
}

.sparkle-1 {
  animation-delay: 0s;
}

.sparkle-2 {
  animation-delay: 0.2s;
}

.sparkle-3 {
  animation-delay: 0.4s;
}

.sparkle-4 {
  animation-delay: 0.6s;
}

.sparkle-5 {
  animation-delay: 0.8s;
}

@keyframes sparkle-flash {
  0%, 100% { opacity: 0.2; r: 2; }
  50% { opacity: 1; r: 3; }
}

/* ========== 034. 无人生还 - 士兵倒计时 ========== */
.soldier-countdown-effect {
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.soldier-icon {
  font-size: 2rem;
  color: #000000;
  transition: all 0.1s;
}

.monochrome-card:hover .soldier-icon {
  color: #FFFFFF;
}

.soldier-number {
  font-family: 'JetBrains Mono', monospace;
  font-size: 2.5rem;
  font-weight: 700;
  color: #000000;
  transition: all 0.1s;
}

.monochrome-card:hover .soldier-number {
  color: #FFFFFF;
}

.soldier-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.55rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  color: #525252;
  text-transform: uppercase;
  transition: all 0.1s;
}

.monochrome-card:hover .soldier-label {
  color: #FFFFFF;
}

/* ========== 035. 解忧杂货店 - 信箱开合 ========== */
.mailbox-open-effect {
  width: 60%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mailbox-svg {
  width: 100%;
  height: auto;
  color: #000000;
}

.monochrome-card:hover .mailbox-svg {
  color: #FFFFFF;
}

.mailbox-door {
  animation: mailbox-open 3s ease-in-out infinite;
  transform-origin: 25px 55px;
}

@keyframes mailbox-open {
  0%, 100% { transform: rotateX(0deg); }
  50% { transform: rotateX(-45deg); }
}

/* ========== 036. 嫌疑人X的献身 - 公式闪烁 ========== */
.formula-flash-effect {
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.formula-text {
  font-family: 'JetBrains Mono', monospace;
  font-size: 1.5rem;
  font-weight: 700;
  color: #000000;
  transition: all 0.1s;
  animation: formula-flash 2s ease-in-out infinite;
}

.monochrome-card:hover .formula-text {
  color: #FFFFFF;
}

@keyframes formula-flash {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

.formula-sub {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 2rem;
  color: #000000;
  opacity: 0.2;
  transition: all 0.1s;
}

.monochrome-card:hover .formula-sub {
  color: #FFFFFF;
}

/* ========== 038. 白夜行 - 光影移动 ========== */
.light-shadow-move-effect {
  width: 80%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.light-shadow-svg {
  width: 100%;
  height: auto;
}

.grad-stop-1 {
  stop-color: #000000;
  animation: shadow-move 4s ease-in-out infinite alternate;
}

.grad-stop-2 {
  stop-color: transparent;
  animation: shadow-move 4s ease-in-out infinite alternate-reverse;
}

.monochrome-card:hover .grad-stop-1 {
  stop-color: #FFFFFF;
}

.monochrome-card:hover .grad-stop-2 {
  stop-color: transparent;
}

.shadow-divider {
  animation: divider-move 4s ease-in-out infinite alternate;
}

.monochrome-card:hover .shadow-divider {
  stroke: #FFFFFF;
}

@keyframes shadow-move {
  0% { stop-opacity: 0.1; }
  100% { stop-opacity: 0.5; }
}

@keyframes divider-move {
  0% { transform: translateX(-20px); opacity: 0.3; }
  100% { transform: translateX(20px); opacity: 1; }
}

/* ========== 响应式 ========== */
@media (max-width: 768px) {
  .monochrome-card {
    height: 450px;
    padding: 1.5rem;
  }

  .book-title {
    font-size: 1.5rem;
  }

  .book-subtitle {
    font-size: 0.875rem;
  }

  .book-author {
    font-size: 0.75rem;
  }

  .vol-label {
    font-size: 0.55rem;
  }

  .category-tag {
    font-size: 0.5rem;
    padding: 0.35rem 0.6rem;
  }

  .read-btn {
    padding: 0.5rem 1rem;
    font-size: 0.55rem;
  }

  .quote-text {
    font-size: 0.75rem;
  }

  .countdown-number {
    font-size: 1.5rem;
  }

  .soldier-number {
    font-size: 2rem;
  }

  .formula-text {
    font-size: 1.2rem;
  }
}
</style>

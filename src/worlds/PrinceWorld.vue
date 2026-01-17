<template>
  <div class="prince-universe">
    <!-- 噪点纹理层 -->
    <div class="noise-texture"></div>

    <!-- 水平线纹理层 -->
    <div class="lines-texture"></div>

    <!-- 跃迁动画遮罩 -->
    <transition name="warp">
      <div v-if="showWarp" class="warp-overlay">
        <div class="warp-circle">
          <div class="warp-circle-inner"></div>
        </div>
        <div class="warp-text">小王子</div>
      </div>
    </transition>

    <!-- 左侧装饰文字 -->
    <aside class="left-decoration">
      <div class="vertical-text">LE PETIT PRINCE</div>
      <div class="vertical-subtext">1943 · Antoine de Saint-Exupéry</div>
    </aside>

    <!-- 返回按钮 -->
    <button class="exit-btn" @click="exitWorld">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M19 12H5M12 19l-7-7 7-7"/>
      </svg>
      <span>Return</span>
    </button>

    <!-- 标题区 -->
    <header class="universe-header" :class="{ blurred: selectedNode }">
      <div class="header-decoration">
        <div class="thick-line"></div>
        <div class="small-square"></div>
      </div>
      <h1 class="universe-title">小王子</h1>
      <p class="universe-subtitle">几何宇宙 · 七种人生</p>
    </header>

    <!-- 几何网络画布 -->
    <div class="geometric-canvas" :class="{ blurred: selectedNode }">
      <svg class="connections-layer" :viewBox="`0 0 ${canvasWidth} ${canvasHeight}`">
        <line
          v-for="conn in connections"
          :key="conn.id"
          :x1="conn.x1"
          :y1="conn.y1"
          :x2="conn.x2"
          :y2="conn.y2"
          class="connection-line"
        />
      </svg>

      <!-- 几何节点 -->
      <div
        v-for="node in nodes"
        :key="node.id"
        class="geometric-node"
        :class="{ 'node-dimmed': selectedNode && selectedNode.id !== node.id }"
        :style="{
          left: node.x + '%',
          top: node.y + '%',
          '--delay': node.animationDelay + 's'
        }"
        @click="selectNode(node)"
      >
        <svg class="geometry-shape" viewBox="0 0 100 100">
          <template v-if="node.type === 'triangle'">
            <polygon
              points="50,15 85,85 15,85"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            />
          </template>
          <template v-else-if="node.type === 'square'">
            <rect
              x="20"
              y="20"
              width="60"
              height="60"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            />
          </template>
          <template v-else-if="node.type === 'hexagon'">
            <polygon
              points="50,15 80,32.5 80,67.5 50,85 20,67.5 20,32.5"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            />
          </template>
          <template v-else-if="node.type === 'concentric'">
            <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" stroke-width="2"/>
            <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" stroke-width="1.5"/>
          </template>
          <template v-else-if="node.type === 'grid'">
            <line x1="20" y1="35" x2="80" y2="35" stroke="currentColor" stroke-width="1.5"/>
            <line x1="20" y1="50" x2="80" y2="50" stroke="currentColor" stroke-width="1.5"/>
            <line x1="20" y1="65" x2="80" y2="65" stroke="currentColor" stroke-width="1.5"/>
            <line x1="35" y1="20" x2="35" y2="80" stroke="currentColor" stroke-width="1.5"/>
            <line x1="50" y1="20" x2="50" y2="80" stroke="currentColor" stroke-width="1.5"/>
            <line x1="65" y1="20" x2="65" y2="80" stroke="currentColor" stroke-width="1.5"/>
          </template>
          <template v-else-if="node.type === 'diamond'">
            <polygon
              points="50,15 85,50 50,85 15,50"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            />
          </template>
          <template v-else-if="node.type === 'spiral'">
            <path
              d="M50,50 Q50,30 65,35 T80,50 T65,65 T50,80 T35,65 T20,50 T35,35 T50,20"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
            />
          </template>
          <template v-else-if="node.type === 'wave'">
            <path d="M20,50 Q35,20 50,50 T80,50" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <path d="M20,35 Q35,5 50,35 T80,35" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" opacity="0.5"/>
            <path d="M20,65 Q35,35 50,65 T80,65" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" opacity="0.5"/>
          </template>
        </svg>

        <div class="node-label">
          <span class="label-number">0{{ node.number }}</span>
          <span class="label-name">{{ node.name }}</span>
        </div>
      </div>
    </div>

    <!-- 几何展开叙事层 -->
    <transition name="geometry-expand">
      <div v-if="selectedNode" class="expanded-geometry" @click="closeExpanded">
        <!-- 背景几何网格 -->
        <div class="geometry-background">
          <svg class="geometry-massive" viewBox="0 0 100 100">
            <template v-if="selectedNode.type === 'triangle'">
              <polygon
                points="50,15 85,85 15,85"
                fill="none"
                stroke="currentColor"
                stroke-width="0.3"
              />
              <polygon
                points="50,30 70,75 30,75"
                fill="none"
                stroke="currentColor"
                stroke-width="0.2"
                opacity="0.5"
              />
              <polygon
                points="50,45 55,65 45,65"
                fill="none"
                stroke="currentColor"
                stroke-width="0.1"
                opacity="0.3"
              />
            </template>
            <template v-else-if="selectedNode.type === 'square'">
              <rect x="20" y="20" width="60" height="60" fill="none" stroke="currentColor" stroke-width="0.3"/>
              <rect x="30" y="30" width="40" height="40" fill="none" stroke="currentColor" stroke-width="0.2" opacity="0.5"/>
              <rect x="40" y="40" width="20" height="20" fill="none" stroke="currentColor" stroke-width="0.1" opacity="0.3"/>
            </template>
            <template v-else-if="selectedNode.type === 'hexagon'">
              <polygon points="50,15 80,32.5 80,67.5 50,85 20,67.5 20,32.5" fill="none" stroke="currentColor" stroke-width="0.3"/>
              <polygon points="50,30 65,40 65,60 50,70 35,60 35,40" fill="none" stroke="currentColor" stroke-width="0.2" opacity="0.5"/>
            </template>
            <template v-else-if="selectedNode.type === 'concentric'">
              <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" stroke-width="0.3"/>
              <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" stroke-width="0.2" opacity="0.5"/>
              <circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" stroke-width="0.1" opacity="0.3"/>
              <circle cx="50" cy="50" r="5" fill="currentColor" opacity="0.2"/>
            </template>
            <template v-else-if="selectedNode.type === 'grid'">
              <line x1="20" y1="35" x2="80" y2="35" stroke="currentColor" stroke-width="0.3"/>
              <line x1="20" y1="50" x2="80" y2="50" stroke="currentColor" stroke-width="0.3"/>
              <line x1="20" y1="65" x2="80" y2="65" stroke="currentColor" stroke-width="0.3"/>
              <line x1="35" y1="20" x2="35" y2="80" stroke="currentColor" stroke-width="0.3"/>
              <line x1="50" y1="20" x2="50" y2="80" stroke="currentColor" stroke-width="0.3"/>
              <line x1="65" y1="20" x2="65" y2="80" stroke="currentColor" stroke-width="0.3"/>
            </template>
            <template v-else-if="selectedNode.type === 'diamond'">
              <polygon points="50,15 85,50 50,85 15,50" fill="none" stroke="currentColor" stroke-width="0.3"/>
              <polygon points="50,30 70,50 50,70 30,50" fill="none" stroke="currentColor" stroke-width="0.2" opacity="0.5"/>
            </template>
            <template v-else-if="selectedNode.type === 'spiral'">
              <path d="M50,50 Q50,30 65,35 T80,50 T65,65 T50,80 T35,65 T20,50 T35,35 T50,20" fill="none" stroke="currentColor" stroke-width="0.3" stroke-linecap="round"/>
              <path d="M50,40 Q50,30 60,32 T70,40 T60,48 T50,45" fill="none" stroke="currentColor" stroke-width="0.2" opacity="0.5" stroke-linecap="round"/>
            </template>
            <template v-else-if="selectedNode.type === 'wave'">
              <path d="M20,50 Q35,20 50,50 T80,50" fill="none" stroke="currentColor" stroke-width="0.3" stroke-linecap="round"/>
              <path d="M20,35 Q35,5 50,35 T80,35" fill="none" stroke="currentColor" stroke-width="0.2" stroke-linecap="round" opacity="0.5"/>
              <path d="M20,65 Q35,35 50,65 T80,65" fill="none" stroke="currentColor" stroke-width="0.2" stroke-linecap="round" opacity="0.5"/>
            </template>
          </svg>
        </div>

        <!-- 内容容器 -->
        <div class="expanded-content" @click.stop>
          <!-- 中心几何标记 -->
          <div class="center-geometry">
            <svg class="center-shape" viewBox="0 0 100 100">
              <template v-if="selectedNode.type === 'triangle'">
                <polygon
                  points="50,15 85,85 15,85"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  class="draw-animation"
                />
              </template>
              <template v-else-if="selectedNode.type === 'square'">
                <rect
                  x="20"
                  y="20"
                  width="60"
                  height="60"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  class="draw-animation"
                />
              </template>
              <template v-else-if="selectedNode.type === 'hexagon'">
                <polygon
                  points="50,15 80,32.5 80,67.5 50,85 20,67.5 20,32.5"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  class="draw-animation"
                />
              </template>
              <template v-else-if="selectedNode.type === 'concentric'">
                <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" stroke-width="1.5" class="draw-animation"/>
                <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" stroke-width="1" class="draw-animation-delayed"/>
              </template>
              <template v-else-if="selectedNode.type === 'grid'">
                <line x1="20" y1="35" x2="80" y2="35" stroke="currentColor" stroke-width="1.5" class="draw-animation"/>
                <line x1="20" y1="50" x2="80" y2="50" stroke="currentColor" stroke-width="1.5" class="draw-animation-delayed"/>
                <line x1="20" y1="65" x2="80" y2="65" stroke="currentColor" stroke-width="1.5" class="draw-animation-delayed-2"/>
                <line x1="35" y1="20" x2="35" y2="80" stroke="currentColor" stroke-width="1.5" class="draw-animation"/>
                <line x1="50" y1="20" x2="50" y2="80" stroke="currentColor" stroke-width="1.5" class="draw-animation-delayed"/>
                <line x1="65" y1="20" x2="65" y2="80" stroke="currentColor" stroke-width="1.5" class="draw-animation-delayed-2"/>
              </template>
              <template v-else-if="selectedNode.type === 'diamond'">
                <polygon
                  points="50,15 85,50 50,85 15,50"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  class="draw-animation"
                />
              </template>
              <template v-else-if="selectedNode.type === 'spiral'">
                <path
                  d="M50,50 Q50,30 65,35 T80,50 T65,65 T50,80 T35,65 T20,50 T35,35 T50,20"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  class="draw-animation"
                />
              </template>
              <template v-else-if="selectedNode.type === 'wave'">
                <path d="M20,50 Q35,20 50,50 T80,50" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" class="draw-animation"/>
                <path d="M20,35 Q35,5 50,35 T80,35" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" opacity="0.5" class="draw-animation-delayed"/>
                <path d="M20,65 Q35,35 50,65 T80,65" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" opacity="0.5" class="draw-animation-delayed-2"/>
              </template>
            </svg>
          </div>

          <!-- 信息层 -->
          <div class="info-layer">
            <!-- 编号和名称 -->
            <div class="node-header">
              <span class="node-number-large">0{{ selectedNode.number }}</span>
              <h2 class="node-title-large">{{ selectedNode.name }}</h2>
            </div>

            <!-- 主题标签 -->
            <div class="theme-pulse">
              <span class="theme-dot"></span>
              <span class="theme-text">{{ selectedNode.theme }}</span>
            </div>

            <!-- 金句 -->
            <div class="quote-container">
              <p class="main-quote">{{ selectedNode.quote }}</p>
            </div>

            <!-- 小王子的困惑 -->
            <div class="reflection-box">
              <span class="reflection-label">小王子的困惑</span>
              <p class="reflection-text">{{ selectedNode.reflection }}</p>
            </div>

            <!-- 更多金句 -->
            <transition name="quotes-reveal">
              <div v-if="showExtended" class="extended-container">
                <div class="extended-divider"></div>
                <p
                  v-for="(q, i) in selectedNode.extendedQuotes"
                  :key="i"
                  class="extended-quote"
                  :style="{ '--index': i }"
                >
                  {{ q }}
                </p>
              </div>
            </transition>

            <!-- 操作区 -->
            <div class="action-zone">
              <button
                class="toggle-btn"
                @click="showExtended = !showExtended"
              >
                <span>{{ showExtended ? 'Show Less' : 'Explore More' }}</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path :d="showExtended ? 'M19 15l-7 7-7-7' : 'M19 9l-7 7-7-7'"/>
                </svg>
              </button>
            </div>

            <!-- 返回按钮 - 右上角固定 -->
            <button class="expanded-close-btn" @click="closeExpanded">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              <span>Back</span>
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const selectedNode = ref(null)
const showExtended = ref(false)
const showWarp = ref(true)

const canvasWidth = 1000
const canvasHeight = 700

const nodes = [
  {
    id: 'prince',
    number: 1,
    name: '小王子',
    type: 'triangle',
    x: 50,
    y: 50,
    animationDelay: 0,
    theme: '纯真 · 探索',
    quote: '所有的大人都曾经是小孩，虽然，只有少数人记得',
    reflection: '我不懂为什么大人这么奇怪',
    extendedQuotes: [
      '有一天，我看了四十四次日落。',
      '如果你说你在下午四点来，从三点钟开始，我就开始感觉很快乐，时间越临近，我就越来越感到快乐。',
      '真正重要的东西，用眼睛是看不见的',
      '人只有用心灵才能看得清事物本质',
      '你为你的玫瑰花费的时间，让她变得重要',
      '驯服就是建立联系',
      '星星发亮是为了让每一个人有一天都能找到属于自己的星星',
      '在这个世界上，只有心灵才能洞察一切，肉眼是看不到本质的'
    ]
  },
  {
    id: 'king',
    number: 2,
    name: '国王',
    type: 'square',
    x: 20,
    y: 25,
    animationDelay: -1.5,
    theme: '权威 · 控制',
    quote: '我只能命令我也能做到的事',
    reflection: '为什么他不能命令太阳落下？',
    extendedQuotes: [
      '权威必须建立在能力之上',
      '审判自己比审判别人难多了',
      '命令要有道理，否则没人会听'
    ]
  },
  {
    id: 'vain',
    number: 3,
    name: '爱慕虚荣的人',
    type: 'hexagon',
    x: 80,
    y: 20,
    animationDelay: -3,
    theme: '虚荣 · 表面',
    quote: '啊！你崇拜我？',
    reflection: '大人们真奇怪',
    extendedQuotes: [
      '虚荣就是只听得进赞美',
      '只有在别人面前，我才算得上真正英俊',
      '大人们只关心数字和外表'
    ]
  },
  {
    id: 'drunkard',
    number: 4,
    name: '酒鬼',
    type: 'concentric',
    x: 15,
    y: 60,
    animationDelay: -4.5,
    theme: '逃避 · 循环',
    quote: '我喝酒是为了遗忘',
    reflection: '这比国王更奇怪',
    extendedQuotes: [
      '我喝酒是为了遗忘我的羞愧',
      '遗忘什么？遗忘我喝酒这件事',
      '成人的世界充满了逃避'
    ]
  },
  {
    id: 'businessman',
    number: 5,
    name: '商人',
    type: 'grid',
    x: 85,
    y: 55,
    animationDelay: -6,
    theme: '占有 · 计算',
    quote: '这颗星星属于我',
    reflection: '拥有有什么用？',
    extendedQuotes: [
      '我有五百三十二万一千六百二十七颗星星',
      '拥有不代表有用',
      '严肃的人只关心数字'
    ]
  },
  {
    id: 'fox',
    number: 6,
    name: '狐狸',
    type: 'diamond',
    x: 50,
    y: 85,
    animationDelay: -7.5,
    theme: '驯服 · 联结',
    quote: '驯服就是建立联系',
    reflection: '我终于明白玫瑰对我的意义',
    extendedQuotes: [
      '只有用心才能看清事物本质',
      '你永远要对你驯服过的东西负责',
      '正是你为玫瑰花费的时间，让她变得重要'
    ]
  },
  {
    id: 'rose',
    number: 7,
    name: '玫瑰',
    type: 'spiral',
    x: 75,
    y: 75,
    animationDelay: -9,
    theme: '爱 · 骄傲',
    quote: '我不笨，但我太骄傲了',
    reflection: '我不懂怎么爱她',
    extendedQuotes: [
      '你驯服了我，现在我们互相不可缺少',
      '骄傲是爱的敌人',
      '我要用我的刺来保护自己'
    ]
  },
  {
    id: 'snake',
    number: 8,
    name: '蛇',
    type: 'wave',
    x: 25,
    y: 80,
    animationDelay: -10.5,
    theme: '离别 · 永恒',
    quote: '如果你想念我，就看看星星',
    reflection: '我要回到我的星球了',
    extendedQuotes: [
      '对于真心喜爱的人，星星是会笑的',
      '所有的大人都曾经是小孩',
      '身体的重量太轻了，带不动这个身体'
    ]
  }
]

const connections = [
  { id: '1-2', x1: 500, y1: 350, x2: 200, y2: 175 },
  { id: '1-3', x1: 500, y1: 350, x2: 800, y2: 140 },
  { id: '1-4', x1: 500, y1: 350, x2: 150, y2: 420 },
  { id: '1-5', x1: 500, y1: 350, x2: 850, y2: 385 },
  { id: '1-6', x1: 500, y1: 350, x2: 500, y2: 595 },
  { id: '6-7', x1: 500, y1: 595, x2: 750, y2: 525 },
  { id: '6-8', x1: 500, y1: 595, x2: 250, y2: 560 }
]

const selectNode = (node) => {
  selectedNode.value = node
  showExtended.value = false
}

const closeExpanded = () => {
  selectedNode.value = null
  showExtended.value = false
}

const exitWorld = () => {
  router.push('/universe')
}

// 页面加载时的跃迁动画
onMounted(() => {
  setTimeout(() => {
    showWarp.value = false
  }, 1800)
})
</script>

<style scoped>
.prince-universe {
  min-height: 100vh;
  background: #f7f5f2;
  position: relative;
  overflow-x: hidden;
}

/* ========== 纹理层 ========== */
.noise-texture {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  opacity: 0.02;
}

.lines-texture {
  position: fixed;
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

/* ========== 跃迁动画 ========== */
.warp-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  background: #f7f5f2;
}

.warp-circle {
  width: 300px;
  height: 300px;
  border: 1px solid rgba(26, 26, 26, 0.2);
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
  border: 1px solid rgba(26, 26, 26, 0.3);
  border-radius: 50%;
  animation: warp-pulse 1s ease-in-out infinite;
}

.warp-text {
  position: absolute;
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 0.9rem;
  letter-spacing: 0.3em;
  color: rgba(26, 26, 26, 0.8);
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

/* ========== 装饰文字 ========== */
.left-decoration {
  position: fixed;
  top: 50%;
  left: 2rem;
  transform: translateY(-50%);
  z-index: 5;
  pointer-events: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.vertical-text {
  writing-mode: vertical-rl;
  text-orientation: mixed;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.3em;
  color: #000000;
  opacity: 0.12;
  text-transform: uppercase;
}

.vertical-subtext {
  writing-mode: vertical-rl;
  text-orientation: mixed;
  font-family: 'Source Serif 4', Georgia, serif;
  font-size: 0.6rem;
  font-weight: 400;
  font-style: italic;
  letter-spacing: 0.15em;
  color: #525252;
  opacity: 0.15;
}

/* ========== 返回按钮 ========== */
.exit-btn {
  position: fixed;
  top: 2rem;
  left: 2rem;
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 2rem;
  background: #000000;
  border: none;
  color: #FFFFFF;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.1s;
  z-index: 100;
}

.exit-btn:hover {
  background: #FFFFFF;
  color: #000000;
  box-shadow: inset 0 0 0 2px #000000;
}

.exit-btn svg {
  width: 18px;
  height: 18px;
}

/* ========== 标题区 ========== */
.universe-header {
  text-align: center;
  margin-bottom: 3rem;
  position: relative;
  z-index: 10;
  padding-top: 6rem;
  transition: filter 0.6s ease;
}

.universe-header.blurred {
  filter: blur(8px);
  opacity: 0.3;
}

.header-decoration {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.thick-line {
  width: 120px;
  height: 4px;
  background: #000000;
}

.small-square {
  width: 12px;
  height: 12px;
  border: 3px solid #000000;
}

.universe-title {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 400;
  line-height: 1;
  letter-spacing: -0.03em;
  color: #000000;
  margin-bottom: 1rem;
}

.universe-subtitle {
  font-family: 'Source Serif 4', Georgia, serif;
  font-size: clamp(1rem, 2vw, 1.2rem);
  font-weight: 400;
  font-style: italic;
  letter-spacing: 0.15em;
  color: #525252;
}

/* ========== 几何画布 ========== */
.geometric-canvas {
  position: relative;
  width: 100%;
  max-width: 1000px;
  height: 700px;
  margin: 0 auto;
  z-index: 10;
  transition: filter 0.6s ease;
}

.geometric-canvas.blurred {
  filter: blur(3px);
}

.connections-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.connection-line {
  stroke: #000000;
  stroke-width: 1;
  opacity: 0.08;
}

/* ========== 几何节点 ========== */
.geometric-node {
  position: absolute;
  transform: translate(-50%, -50%);
  cursor: pointer;
  transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
  animation: float 12s ease-in-out infinite;
  animation-delay: var(--delay);
}

.geometric-node.node-dimmed {
  opacity: 0.15;
  filter: blur(2px);
}

@keyframes float {
  0%, 100% {
    transform: translate(-50%, -50%) translateY(0) rotate(0deg);
  }
  50% {
    transform: translate(-50%, -50%) translateY(-8px) rotate(3deg);
  }
}

.geometric-node:hover:not(.node-dimmed) {
  z-index: 100;
}

.geometric-node:hover:not(.node-dimmed) .geometry-shape {
  transform: scale(1.15);
}

.geometry-shape {
  width: 80px;
  height: 80px;
  color: #000000;
  transition: all 0.4s ease;
  animation: pulse-rotate 20s linear infinite;
}

@keyframes pulse-rotate {
  0%, 100% {
    transform: rotate(0deg) scale(1);
    opacity: 1;
  }
  50% {
    transform: rotate(180deg) scale(1.05);
    opacity: 0.85;
  }
}

.node-label {
  position: absolute;
  bottom: -40px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  white-space: nowrap;
}

.label-number {
  display: block;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.55rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  color: #000000;
  opacity: 0.3;
  margin-bottom: 0.25rem;
}

.label-name {
  display: block;
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 0.75rem;
  font-weight: 500;
  color: #000000;
  letter-spacing: 0.05em;
}

/* ========== 几何展开叙事层 ========== */
.expanded-geometry {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  overflow-y: auto;
  padding: 6rem 2rem 4rem;
  /* 隐藏滚动条 */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

.expanded-geometry::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

.geometry-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.03;
  pointer-events: none;
}

.geometry-massive {
  width: 100%;
  height: 100%;
  color: #000000;
}

.expanded-content {
  position: relative;
  z-index: 10;
  width: 90%;
  max-width: 900px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: default;
  margin: auto;
}

.center-geometry {
  width: 200px;
  height: 200px;
  margin-bottom: 2rem;
}

.center-shape {
  width: 100%;
  height: 100%;
  color: #000000;
  filter: drop-shadow(0 0 30px rgba(0,0,0,0.1));
}

/* 绘制动画 */
.draw-animation {
  stroke-dasharray: 300;
  stroke-dashoffset: 300;
  animation: draw 1.5s ease forwards 0.3s;
}

.draw-animation-delayed {
  stroke-dasharray: 300;
  stroke-dashoffset: 300;
  animation: draw 1.5s ease forwards 0.6s;
}

.draw-animation-delayed-2 {
  stroke-dasharray: 300;
  stroke-dashoffset: 300;
  animation: draw 1.5s ease forwards 0.9s;
}

@keyframes draw {
  to {
    stroke-dashoffset: 0;
  }
}

/* ========== 信息层 ========== */
.info-layer {
  text-align: center;
  width: 100%;
}

.node-header {
  margin-bottom: 1.5rem;
  opacity: 0;
  animation: fade-up 0.6s ease forwards 0.8s;
}

.node-number-large {
  display: block;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.3em;
  color: #000000;
  opacity: 0.4;
  margin-bottom: 0.75rem;
}

.node-title-large {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 400;
  line-height: 1.1;
  color: #000000;
  margin: 0;
}

.theme-pulse {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.6rem 1.25rem;
  border: 2px solid #000000;
  margin-bottom: 2rem;
  opacity: 0;
  animation: fade-up 0.6s ease forwards 1s;
}

.theme-dot {
  width: 8px;
  height: 8px;
  background: #000000;
  border-radius: 50%;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.3);
    opacity: 0.7;
  }
}

.theme-text {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.7rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #000000;
}

.quote-container {
  margin-bottom: 2rem;
  opacity: 0;
  animation: fade-up 0.6s ease forwards 1.2s;
}

.main-quote {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(1.3rem, 2.5vw, 1.8rem);
  font-style: italic;
  line-height: 1.5;
  color: #000000;
  margin: 0;
  max-width: 650px;
}

.reflection-box {
  margin-bottom: 2rem;
  opacity: 0;
  animation: fade-up 0.6s ease forwards 1.4s;
}

.reflection-label {
  display: block;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.6rem;
  letter-spacing: 0.15em;
  color: #525252;
  margin-bottom: 0.75rem;
}

.reflection-text {
  font-family: 'Source Serif 4', Georgia, serif;
  font-size: 1rem;
  line-height: 1.6;
  color: #000000;
  margin: 0;
  font-style: italic;
}

.extended-container {
  margin-bottom: 2rem;
  opacity: 0;
  animation: fade-up 0.6s ease forwards;
}

.extended-divider {
  height: 1px;
  background: #000000;
  width: 60px;
  margin: 0 auto 1.5rem;
  opacity: 0.3;
}

.extended-quote {
  font-family: 'Source Serif 4', Georgia, serif;
  font-size: 0.95rem;
  line-height: 1.8;
  margin-bottom: 1.25rem;
  color: #525252;
  font-style: italic;
  animation: fade-up 0.6s ease forwards;
  animation-delay: calc(var(--index) * 0.1s);
  opacity: 0;
}

.action-zone {
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
  opacity: 0;
  animation: fade-up 0.6s ease forwards 1.6s;
}

.toggle-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 2rem;
  border: 2px solid #000000;
  background: #FFFFFF;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.1s;
  color: #000000;
}

.toggle-btn:hover {
  background: #000000;
  color: #FFFFFF;
}

.toggle-btn svg {
  width: 16px;
  height: 16px;
  transition: transform 0.3s ease;
}

.expanded-close-btn {
  position: fixed;
  top: 2rem;
  right: 2rem;
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 2rem;
  background: #FFFFFF;
  border: 2px solid #000000;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.1s;
  z-index: 100;
  color: #000000;
}

.expanded-close-btn:hover {
  background: #000000;
  color: #FFFFFF;
}

.expanded-close-btn svg {
  width: 18px;
  height: 18px;
}

/* ========== 动画 ========== */
@keyframes fade-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.geometry-expand-enter-active {
  transition: opacity 0.6s ease;
}

.geometry-expand-enter-from {
  opacity: 0;
}

.geometry-expand-leave-active {
  transition: opacity 0.4s ease;
}

.geometry-expand-leave-to {
  opacity: 0;
}

.quotes-reveal-enter-active,
.quotes-reveal-leave-active {
  transition: all 0.5s ease;
  overflow: hidden;
}

.quotes-reveal-enter-from,
.quotes-reveal-leave-to {
  max-height: 0;
  opacity: 0;
}

.quotes-reveal-enter-to,
.quotes-reveal-leave-from {
  max-height: 1000px;
  opacity: 1;
}

/* ========== 响应式 ========== */
@media (max-width: 768px) {
  .left-decoration {
    display: none;
  }

  .universe-header {
    padding-top: 5rem;
  }

  .exit-btn {
    top: 1rem;
    left: 1rem;
    padding: 0.75rem 1.5rem;
  }

  .geometric-canvas {
    height: 600px;
  }

  .geometry-shape {
    width: 60px;
    height: 60px;
  }

  .center-geometry {
    width: 200px;
    height: 200px;
  }

  .node-title-large {
    font-size: 2rem;
  }

  .main-quote {
    font-size: 1.2rem;
  }

  .action-zone {
    margin-top: 1.5rem;
  }

  .toggle-btn {
    padding: 0.75rem 1.5rem;
  }

  .expanded-close-btn {
    top: 1rem;
    right: 1rem;
    padding: 0.75rem 1.5rem;
  }
}
</style>

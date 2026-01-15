<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'

const emit = defineEmits(['back'])

const containerRef = ref(null)
const backBtnRef = ref(null)

const books = ref([
  {
    id: 1,
    title: '小王子',
    author: '安托万·德·圣-埃克苏佩里',
    quote: '所有的大人都曾经是小孩',
    category: 'PHILOSOPHY',
    design: 'prince',
    displayType: 'animation',
    immersivePage: '/prince.html'
  },
  {
    id: 2,
    title: '1984',
    author: '乔治·奥威尔',
    quote: '战争即和平 自由即奴役 无知即力量',
    category: 'DYSTOPIA',
    design: 'dystopia',
    displayType: 'hover',
    hoverInfo: '老大哥在看着你'
  },
  {
    id: 3,
    title: '百年孤独',
    author: '加西亚·马尔克斯',
    quote: '生命中所有辉煌终将逝去',
    category: 'MAGICAL',
    design: 'magical',
    displayType: 'animation'
  },
  {
    id: 4,
    title: '三体',
    author: '刘慈欣',
    quote: '不要回答',
    category: 'SCIFI',
    design: 'scifi',
    displayType: 'animation'
  },
  {
    id: 5,
    title: '局外人',
    author: '阿尔贝·加缪',
    quote: '今天，妈妈死了',
    category: 'EXISTENTIALISM',
    design: 'absurd',
    displayType: 'title'
  },
  {
    id: 6,
    title: '挪威的森林',
    author: '村上春树',
    quote: '死是生的一部分永存',
    category: 'MELANCHOLY',
    design: 'melancholy',
    displayType: 'hover',
    hoverInfo: '死亡并非生的对立面'
  },
  {
    id: 7,
    title: '月亮与六便士',
    author: '毛姆',
    quote: '满地六便士却看见月亮',
    category: 'CHOICE',
    design: 'choice',
    displayType: 'title'
  },
  {
    id: 8,
    title: '1Q84',
    author: '村上春树',
    quote: '有两个月亮的世界',
    category: 'PARALLEL',
    design: 'parallel',
    displayType: 'animation'
  },
  {
    id: 9,
    title: '射雕英雄传',
    author: '金庸',
    quote: '侠之大者为国为民',
    category: 'MARTIAL',
    design: 'martial',
    displayType: 'title'
  },
  {
    id: 10,
    title: '困于沙丘',
    author: '弗兰克·赫伯特',
    quote: '恐惧是思维的杀手',
    category: 'EPIC',
    design: 'desert',
    displayType: 'hover',
    hoverInfo: '香料 must flow'
  },
  {
    id: 11,
    title: '岛上书店',
    author: '加布瑞埃拉·泽文',
    quote: '没有书店的地方算不上一个地方',
    category: 'HEALING',
    design: 'bookstore',
    displayType: 'title'
  },
  {
    id: 12,
    title: '架空犯',
    author: '卡尔维诺',
    quote: '我将讲述一个不存在的人的故事',
    category: 'FICTION',
    design: 'nonexistent',
    displayType: 'title'
  },
  {
    id: 13,
    title: '莫斯科绅士',
    author: '埃默·托尔斯',
    quote: '如果一个人不自由还能成为什么样的人',
    category: 'DRAMA',
    design: 'gentleman',
    displayType: 'title'
  },
  {
    id: 14,
    title: '夜晚的潜水艇',
    author: '陈春成',
    quote: '想象是一座可以随时进入的潜水艇',
    category: 'IMAGINATION',
    design: 'submarine',
    displayType: 'animation'
  },
  {
    id: 15,
    title: '撒哈拉的故事',
    author: '三毛',
    quote: '生命的过程无论是阳春白雪还是青菜豆腐',
    category: 'TRAVEL',
    design: 'sahara',
    displayType: 'hover',
    hoverInfo: '在沙漠中寻找自由的灵魂'
  },
  {
    id: 16,
    title: '刺杀骑士团长',
    author: '村上春树',
    quote: '理念是从潜意识深处浮现出来的',
    category: 'METAPHOR',
    design: 'knight',
    displayType: 'title'
  },
  {
    id: 17,
    title: '失落的卫星',
    author: '刘子超',
    quote: '在地图上消失的地方时间以另一种方式流动',
    category: 'TRAVEL',
    design: 'satellite',
    displayType: 'title'
  },
  {
    id: 18,
    title: '额尔古纳河右岸',
    author: '迟子建',
    quote: '我没有看到他们的眼泪只听到风的声音',
    category: 'EPIC',
    design: 'river',
    displayType: 'title'
  },
  {
    id: 19,
    title: '置身事内',
    author: '兰小欢',
    quote: '理解中国经济从理解政府开始',
    category: 'ECONOMICS',
    design: 'economics',
    displayType: 'title'
  },
  {
    id: 20,
    title: '文城',
    author: '余华',
    quote: '人就是这样有时候以为自己找到了其实还在找',
    category: 'HISTORICAL',
    design: 'wencheng',
    displayType: 'title'
  },
  {
    id: 21,
    title: '小城与不确定性的墙',
    author: '村上春树',
    quote: '墙的存在是为了区分什么是可能的什么是不可能的',
    category: 'METAPHOR',
    design: 'wall',
    displayType: 'title'
  },
  {
    id: 22,
    title: '山月记',
    author: '中岛敦',
    quote: '因为害怕自己并非明珠而不敢刻苦琢磨',
    category: 'PHILOSOPHY',
    design: 'tiger',
    displayType: 'animation'
  },
  {
    id: 23,
    title: '明亮的夜晚',
    author: '崔恩荣',
    quote: '在黑暗中也能找到前行的光',
    category: 'HEALING',
    design: 'night',
    displayType: 'hover',
    hoverInfo: '女性友谊与自我救赎'
  },
  {
    id: 24,
    title: '小岛经济学',
    author: '彼得·希夫',
    quote: '经济学不是复杂的数学而是朴素的常识',
    category: 'ECONOMICS',
    design: 'island',
    displayType: 'title'
  },
  {
    id: 25,
    title: '我的阿勒泰',
    author: '李娟',
    quote: '在遥远的北疆生活是如此简单而纯粹',
    category: 'NATURE',
    design: 'altay',
    displayType: 'animation'
  },
  {
    id: 26,
    title: '我与地坛',
    author: '史铁生',
    quote: '死是一件不必急于求成的事',
    category: 'PHILOSOPHY',
    design: 'temple',
    displayType: 'hover',
    hoverInfo: '在命运的重压下思考生命的意义'
  },
  {
    id: 27,
    title: '太白金星有点烦',
    author: '马伯庸',
    quote: '神仙也有神仙的烦恼',
    category: 'SATIRE',
    design: 'immortal',
    displayType: 'animation'
  },
  {
    id: 28,
    title: '面纱',
    author: '毛姆',
    quote: '我知道你愚蠢轻浮虚荣但我爱你',
    category: 'ROMANCE',
    design: 'veil',
    displayType: 'title'
  },
  {
    id: 29,
    title: '草民',
    author: '鲁迅',
    quote: '救救孩子',
    category: 'CRITIQUE',
    design: 'grass',
    displayType: 'title'
  },
  {
    id: 30,
    title: '人生海海',
    author: '麦家',
    quote: '人生海海潮起潮落',
    category: 'LIFE',
    design: 'sea',
    displayType: 'title'
  },
  {
    id: 31,
    title: '长安的荔枝',
    author: '马伯庸',
    quote: '即使是一颗荔枝也能见证历史的重量',
    category: 'HISTORICAL',
    design: 'litchi',
    displayType: 'hover',
    hoverInfo: '小人物在大历史中的生存智慧'
  },
  {
    id: 32,
    title: '霍乱时期的爱情',
    author: '加西亚·马尔克斯',
    quote: '等待了五十三年七个月零十天',
    category: 'ROMANCE',
    design: 'cholera',
    displayType: 'animation'
  },
  {
    id: 33,
    title: '山茶文具店',
    author: '小川糸',
    quote: '每一封信都是一颗心的传递',
    category: 'HEALING',
    design: 'stationery',
    displayType: 'title'
  },
  {
    id: 34,
    title: '马可瓦尔多',
    author: '卡尔维诺',
    quote: '在城市的钢筋水泥中寻找一片自然',
    category: 'URBAN',
    design: 'urban',
    displayType: 'title'
  },
  {
    id: 35,
    title: '基督山伯爵',
    author: '大仲马',
    quote: '等待与希望这就是人生',
    category: 'ADVENTURE',
    design: 'count',
    displayType: 'title'
  },
  {
    id: 36,
    title: '悉达多',
    author: '赫尔曼·黑塞',
    quote: '知识可以传授但智慧不能',
    category: 'PHILOSOPHY',
    design: 'siddhartha',
    displayType: 'title'
  },
  {
    id: 37,
    title: '无人生还',
    author: '阿加莎·克里斯蒂',
    quote: '十个印第安小男孩吃完晚饭去喝酒',
    category: 'MYSTERY',
    design: 'island',
    displayType: 'title'
  },
  {
    id: 38,
    title: '解忧杂货店',
    author: '东野圭吾',
    quote: '你的地图是一张白纸',
    category: 'HEALING',
    design: 'store',
    displayType: 'hover',
    hoverInfo: '跨越时空的温暖回信'
  },
  {
    id: 39,
    title: '嫌疑人X的献身',
    author: '东野圭吾',
    quote: '为了一个人可以牺牲到什么地步',
    category: 'MYSTERY',
    design: 'devotion',
    displayType: 'title'
  },
  {
    id: 40,
    title: '白夜行',
    author: '东野圭吾',
    quote: '我的天空里没有太阳总是黑夜但并不暗',
    category: 'MYSTERY',
    design: 'whitenight',
    displayType: 'animation'
  }
])

// 生成随机条码
const generateBarcode = () => {
  const bars = []
  for (let i = 0; i < 15; i++) {
    bars.push({
      height: Math.random() * 20 + 15,
      width: Math.random() > 0.7 ? 3 : 2
    })
  }
  return bars
}

const barcodes = ref(books.value.map(() => generateBarcode()))

let ctx = null
const hoveredBook = ref(null)

const selectBook = (book) => {
  if (book.immersivePage) {
    window.open(book.immersivePage, '_blank')
  }
}

const onBookHover = (book, e) => {
  hoveredBook.value = book.id
}

const onBookLeave = () => {
  hoveredBook.value = null
}

onMounted(() => {
  ctx = gsap.context(() => {
    gsap.from(backBtnRef.value, {
      x: -20,
      opacity: 0,
      duration: 0.5,
      ease: 'power2.out'
    })

    gsap.fromTo('.book-card',
      {
        y: 30,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: {
          each: 0.08,
          from: 'start'
        },
        ease: 'power2.out',
        delay: 0.2
      }
    )
  }, containerRef.value)
})

onUnmounted(() => {
  if (ctx) ctx.revert()
})
</script>

<template>
  <div ref="containerRef" class="universe">
    <!-- 装饰线条 -->
    <div class="decoration-lines">
      <div class="line line-1"></div>
      <div class="line line-2"></div>
      <div class="line line-3"></div>
      <div class="circle circle-1"></div>
      <div class="circle circle-2"></div>
    </div>

    <button ref="backBtnRef" @click="emit('back')" class="back-btn">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 4L4 10M4 10L10 16M4 10H16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>

    <div class="header">
      <h1 class="main-title">
        <span>探索</span><span class="highlight">书籍</span>的灵魂
      </h1>
      <p class="subtitle">共 {{ books.length }} 本书籍</p>
    </div>

    <div class="books-grid">
      <div
        v-for="(book, index) in books"
        :key="book.id"
        class="book-card"
        @mouseenter="onBookHover(book, $event)"
        @mouseleave="onBookLeave"
        @click="selectBook(book)"
      >
        <!-- 上半部分：视觉区域 -->
        <div class="cover-top" :class="[
          `design-${book.design}`,
          book.displayType === 'hover' && hoveredBook !== book.id ? 'minimal' : ''
        ]">
          <div class="category-tag">{{ book.category }}</div>

          <!-- 简洁标题模式 -->
          <template v-if="book.displayType === 'title'">
            <h3 class="simple-title">{{ book.title }}</h3>
            <p class="simple-author">{{ book.author }}</p>
          </template>

          <!-- 动画模式或hover模式 -->
          <template v-else>
            <!-- 小王子设计 -->
            <template v-if="book.design === 'prince'">
              <div class="star-field">
                <span v-for="i in 30" :key="i" class="star" :style="{
                  left: Math.random() * 100 + '%',
                  top: Math.random() * 100 + '%',
                  animationDelay: Math.random() * 3 + 's',
                  fontSize: Math.random() * 2 + 1 + 'px'
                }">✦</span>
              </div>
              <div class="floating-planet">🪐</div>
              <div class="rose-text">🌹</div>
              <h3 class="top-title">{{ book.title }}</h3>
              <p class="top-quote">{{ book.quote }}</p>
            </template>

            <!-- 1984设计 -->
            <template v-else-if="book.design === 'dystopia'">
              <h3 v-if="book.displayType === 'hover' && hoveredBook !== book.id" class="simple-title">{{ book.title }}</h3>
              <div class="surveillance-text">
                <span>BIG BROTHER</span>
                <span class="blink">IS WATCHING</span>
                <span>YOU</span>
              </div>
              <div class="red-eye">
                <div class="pupil"></div>
                <div class="eye-glow"></div>
              </div>
              <div class="party-slogans">
                <p>WAR IS PEACE</p>
                <p>FREEDOM IS SLAVERY</p>
                <p>IGNORANCE IS STRENGTH</p>
              </div>
              <div class="hover-reveal" v-if="book.displayType === 'hover' && hoveredBook === book.id">
                <p class="hover-text">{{ book.hoverInfo }}</p>
              </div>
            </template>

          <!-- 百年孤独设计 -->
          <template v-else-if="book.design === 'magical'">
            <div class="magic-swirl"></div>
            <div class="butterfly-path">
              <span class="butterfly">🦋</span>
            </div>
            <div class="family-tree">
              <span v-for="i in 7" :key="i" class="tree-dot"></span>
            </div>
            <h3 class="top-title">{{ book.title }}</h3>
          </template>

          <!-- 三体设计 -->
          <template v-else-if="book.design === 'scifi'">
            <div class="cosmic-bg">
              <div class="star-field-scifi">
                <span v-for="i in 40" :key="i" class="scifi-star"></span>
              </div>
            </div>
            <div class="suns-orbit">
              <div class="sun sun-gold"></div>
              <div class="sun sun-red"></div>
              <div class="sun sun-blue"></div>
            </div>
            <div class="transmission-text">📡 DON'T ANSWER</div>
          </template>

          <!-- 局外人设计 -->
          <template v-else-if="book.design === 'absurd'">
            <div class="absurd-bg">
              <span class="absurd-cross">×</span>
              <span class="absurd-cross">×</span>
              <span class="absurd-cross">×</span>
            </div>
            <div class="opening-line">今天，妈妈死了。也许是昨天，我不知道。</div>
            <div class="date-stamp">1942 · ALGERIA</div>
          </template>

          <!-- 挪威的森林设计 -->
          <template v-else-if="book.design === 'melancholy'">
            <h3 v-if="book.displayType === 'hover' && hoveredBook !== book.id" class="simple-title">{{ book.title }}</h3>
            <div class="rain-scene">
              <span v-for="i in 20" :key="i" class="raindrop" :style="{
                left: Math.random() * 100 + '%',
                animationDelay: Math.random() * 2 + 's',
                animationDuration: (Math.random() * 1 + 1.5) + 's'
              }"></span>
            </div>
            <div class="forest-silhouette">
              <span class="tree">🌲</span>
              <span class="tree">🌲</span>
              <span class="tree">🌲</span>
            </div>
            <h3 class="top-title">{{ book.title }}</h3>
            <div class="hover-reveal" v-if="book.displayType === 'hover' && hoveredBook === book.id">
              <p class="hover-text">{{ book.hoverInfo }}</p>
            </div>
          </template>

          <!-- 月亮与六便士设计 -->
          <template v-else-if="book.design === 'choice'">
            <div class="sky-scene">
              <div class="moon-shape">🌙</div>
              <div class="coins-fall">
                <span class="coin">💰</span>
                <span class="coin">💰</span>
                <span class="coin">💰</span>
              </div>
            </div>
            <div class="divider-dashed"></div>
            <p class="choice-text">抬头看月亮，还是低头看六便士？</p>
          </template>

          <!-- 1Q84设计 -->
          <template v-else-if="book.design === 'parallel'">
            <div class="parallel-world">
              <div class="world world-1">
                <span class="moon-label">1984</span>
                <span class="moon-icon">🌙</span>
              </div>
              <div class="world-divider">↔</div>
              <div class="world world-2">
                <span class="moon-icon">🌕</span>
                <span class="moon-label">1Q84</span>
              </div>
            </div>
            <div class="portal-effect"></div>
          </template>

          <!-- 射雕英雄传设计 -->
          <template v-else-if="book.design === 'martial'">
            <div class="martial-bg">
              <div class="ink-splash-large"></div>
              <div class="seal-ring">
                <span class="seal-char">侠</span>
              </div>
              <div class="sword-cross">⚔</div>
            </div>
            <div class="martial-text">侠之大者</div>
            <div class="martial-sub">为国为民</div>
          </template>

          <!-- 困于沙丘设计 -->
          <template v-else-if="book.design === 'desert'">
            <h3 v-if="book.displayType === 'hover' && hoveredBook !== book.id" class="simple-title">{{ book.title }}</h3>
            <div class="desert-waves">
              <div class="wave wave-1"></div>
              <div class="wave wave-2"></div>
              <div class="wave wave-3"></div>
            </div>
            <div class="spice-trail">
              <span class="spice-particle">✨</span>
              <span class="spice-particle">✨</span>
              <span class="spice-particle">✨</span>
            </div>
            <div class="fear-quote">恐惧是思维的杀手</div>
            <div class="desert-title">DUNE</div>
            <div class="hover-reveal" v-if="book.displayType === 'hover' && hoveredBook === book.id">
              <p class="hover-text">{{ book.hoverInfo }}</p>
            </div>
          </template>

          <!-- 夜晚的潜水艇 -->
          <template v-else-if="book.design === 'submarine'">
            <div class="deep-sea">
              <div class="sea-bubbles">
                <span v-for="i in 20" :key="i" class="bubble" :style="{
                  left: Math.random() * 100 + '%',
                  animationDelay: Math.random() * 3 + 's'
                }"></span>
              </div>
              <div class="submarine-icon">🚢</div>
            </div>
            <h3 class="top-title">{{ book.title }}</h3>
          </template>

          <!-- 撒哈拉的故事 -->
          <template v-else-if="book.design === 'sahara'">
            <h3 v-if="book.displayType === 'hover' && hoveredBook !== book.id" class="simple-title">{{ book.title }}</h3>
            <div class="desert-dunes">
              <div class="dune dune-1"></div>
              <div class="dune dune-2"></div>
            </div>
            <div class="camel-walk">🐫</div>
            <div class="hover-reveal" v-if="book.displayType === 'hover' && hoveredBook === book.id">
              <p class="hover-text">{{ book.hoverInfo }}</p>
            </div>
          </template>

          <!-- 山月记 -->
          <template v-else-if="book.design === 'tiger'">
            <div class="moon-scene">
              <div class="full-moon">🌕</div>
              <div class="tiger-eyes">👁️ 👁️</div>
            </div>
            <p class="tiger-text">因为害怕自己并非明珠</p>
            <h3 class="top-title">{{ book.title }}</h3>
          </template>

          <!-- 明亮的夜晚 -->
          <template v-else-if="book.design === 'night'">
            <h3 v-if="book.displayType === 'hover' && hoveredBook !== book.id" class="simple-title">{{ book.title }}</h3>
            <div class="bright-stars">
              <span v-for="i in 25" :key="i" class="bright-star" :style="{
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                animationDelay: Math.random() * 2 + 's'
              }">✨</span>
            </div>
            <p class="night-message">在黑暗中也能找到光</p>
            <div class="hover-reveal" v-if="book.displayType === 'hover' && hoveredBook === book.id">
              <p class="hover-text">{{ book.hoverInfo }}</p>
            </div>
          </template>

          <!-- 我的阿勒泰 -->
          <template v-else-if="book.design === 'altay'">
            <div class="grassland">
              <div class="mountain-silhouette">⛰️</div>
              <div class="yurt">⛺</div>
              <div class="sheep">🐑 🐑 🐑</div>
            </div>
            <p class="altay-text">在遥远的北疆</p>
          </template>

          <!-- 我与地坛 -->
          <template v-else-if="book.design === 'temple'">
            <h3 v-if="book.displayType === 'hover' && hoveredBook !== book.id" class="simple-title">{{ book.title }}</h3>
            <div class="temple-gate">⛩️</div>
            <div class="wheelchair">♿</div>
            <p class="temple-quote">死是一件不必急于求成的事</p>
            <div class="hover-reveal" v-if="book.displayType === 'hover' && hoveredBook === book.id">
              <p class="hover-text">{{ book.hoverInfo }}</p>
            </div>
          </template>

          <!-- 太白金星有点烦 -->
          <template v-else-if="book.design === 'immortal'">
            <div class="celestial-court">
              <div class="cloud">☁️</div>
              <div class="jade-emperor">👑</div>
              <div class="paperwork">📜 📜 📜</div>
            </div>
            <p class="immortal-text">神仙也有神仙的烦恼</p>
          </template>

          <!-- 长安的荔枝 -->
          <template v-else-if="book.design === 'litchi'">
            <h3 v-if="book.displayType === 'hover' && hoveredBook !== book.id" class="simple-title">{{ book.title }}</h3>
            <div class="litchi-fall">
              <span class="litchi-fruit">🍎</span>
              <span class="litchi-fruit">🍎</span>
              <span class="litchi-fruit">🍎</span>
            </div>
            <div class="ancient-capital">🏯</div>
            <div class="hover-reveal" v-if="book.displayType === 'hover' && hoveredBook === book.id">
              <p class="hover-text">{{ book.hoverInfo }}</p>
            </div>
          </template>

          <!-- 霍乱时期的爱情 -->
          <template v-else-if="book.design === 'cholera'">
            <div class="love-river">
              <div class="river-flow">🌊</div>
              <div class="love-letters">💌 × 53年</div>
              <div class="clock">⏳</div>
            </div>
            <p class="love-wait">等待了五十三年七个月零十天</p>
          </template>

          <!-- 解忧杂货店 -->
          <template v-else-if="book.design === 'store'">
            <h3 v-if="book.displayType === 'hover' && hoveredBook !== book.id" class="simple-title">{{ book.title }}</h3>
            <div class="shop-front">🏪</div>
            <div class="mail-box">📮</div>
            <div class="letter-path">✉️ → ✉️ → ✉️</div>
            <div class="hover-reveal" v-if="book.displayType === 'hover' && hoveredBook === book.id">
              <p class="hover-text">{{ book.hoverInfo }}</p>
            </div>
          </template>

          <!-- 白夜行 -->
          <template v-else-if="book.design === 'whitenight'">
            <div class="dark-city">
              <div class="walking-pair">🚶 🚶‍♀️</div>
              <div class="no-sun">🌑</div>
              <div class="parallel-paths">
                <div class="path path-1"></div>
                <div class="path path-2"></div>
              </div>
            </div>
            <p class="whitenight-text">我的天空里没有太阳</p>
          </template>

          <!-- 默认设计 - 简洁标题 -->
          <template v-else>
            <h3 class="simple-title">{{ book.title }}</h3>
            <p class="simple-author">{{ book.author }}</p>
          </template>
          </template>
        </div>

        <!-- 下半部分：信息区域 -->
        <div class="cover-bottom">
          <h3 class="bottom-title">{{ book.title }}</h3>
          <div class="divider"></div>
          <p class="author">{{ book.author }}</p>
          <div class="action-row">
            <div class="barcode-random">
              <span
                v-for="(bar, i) in barcodes[index]"
                :key="i"
                :style="{
                  height: bar.height + 'px',
                  width: bar.width + 'px'
                }"
              ></span>
            </div>
            <button class="read-btn">READ ENTRY →</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.universe {
  min-height: 100vh;
  background: #f5f1eb;
  background-image:
    linear-gradient(90deg, rgba(0,0,0,0.02) 1px, transparent 1px),
    linear-gradient(rgba(0,0,0,0.02) 1px, transparent 1px);
  background-size: 50px 50px;
  padding: 2rem;
  position: relative;
  overflow-y: auto;
}

/* 装饰线条 */
.decoration-lines {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

.line {
  position: absolute;
  background: rgba(0, 0, 0, 0.05);
}

.line-1 {
  width: 300px;
  height: 1px;
  top: 20%;
  left: 5%;
  transform: rotate(-15deg);
}

.line-2 {
  width: 400px;
  height: 2px;
  top: 60%;
  right: 10%;
  transform: rotate(25deg);
}

.line-3 {
  width: 200px;
  height: 1px;
  bottom: 15%;
  left: 20%;
  transform: rotate(-10deg);
}

.circle {
  position: absolute;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 50%;
}

.circle-1 {
  width: 200px;
  height: 200px;
  top: 10%;
  right: 15%;
}

.circle-2 {
  width: 150px;
  height: 150px;
  bottom: 20%;
  left: 8%;
}

.back-btn {
  position: fixed;
  top: 2rem;
  left: 2rem;
  z-index: 100;
  width: 44px;
  height: 44px;
  background: rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  color: #000;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.back-btn:hover {
  background: rgba(0, 0, 0, 0.1);
  transform: translateX(-2px);
}

.header {
  text-align: center;
  margin-bottom: 4rem;
  padding-top: 2rem;
  position: relative;
  z-index: 1;
}

.main-title {
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  margin-bottom: 0.75rem;
  color: #000;
  line-height: 1.1;
}

.main-title .highlight {
  color: #8B6914;
}

.subtitle {
  font-size: 0.875rem;
  color: rgba(0, 0, 0, 0.5);
  font-weight: 400;
}

.books-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
  max-width: 1600px;
  margin: 0 auto;
  padding-bottom: 4rem;
  position: relative;
  z-index: 1;
}

.book-card {
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.08);
}

.book-card:hover {
  transform: translateY(-12px) scale(1.02);
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.2);
}

/* 上半部分：视觉区域 */
.cover-top {
  height: 240px;
  background: #000;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  overflow: hidden;
}

.category-tag {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(255, 255, 255, 0.95);
  color: #000;
  padding: 0.35rem 0.75rem;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  border-radius: 2px;
  z-index: 10;
}

.top-title {
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
  text-align: center;
  margin-bottom: 0.75rem;
  letter-spacing: -0.02em;
  line-height: 1.2;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
}

.top-quote {
  font-family: Georgia, serif;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.9);
  text-align: center;
  line-height: 1.6;
  font-style: italic;
  max-width: 85%;
  text-shadow: 0 1px 5px rgba(0, 0, 0, 0.5);
}

/* 简洁标题模式 */
.simple-title {
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 2.2rem;
  font-weight: 900;
  color: #fff;
  text-align: center;
  letter-spacing: -0.03em;
  line-height: 1.1;
  text-shadow: 0 2px 20px rgba(0, 0, 0, 0.8);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
  width: 90%;
}

.simple-author {
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
  position: absolute;
  top: 65%;
  left: 50%;
  transform: translateX(-50%);
  margin: 0;
  letter-spacing: 0.05em;
  text-shadow: 0 1px 5px rgba(0, 0, 0, 0.5);
}

/* Hover 揭示信息 */
.hover-reveal {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  text-align: center;
  animation: fade-in-up 0.3s ease;
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translate(-50%, 10px);
  }
  to {
    opacity: 1;
    transform: translate(-50%, 0);
  }
}

.hover-text {
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 0.75rem;
  color: #fff;
  background: rgba(0, 0, 0, 0.8);
  padding: 0.5rem 1rem;
  border-radius: 3px;
  margin: 0;
  letter-spacing: 0.05em;
  text-shadow: none;
  backdrop-filter: blur(5px);
}

/* Minimal 状态 - 隐藏复杂元素 */
.cover-top.minimal .star-field,
.cover-top.minimal .surveillance-text,
.cover-top.minimal .red-eye,
.cover-top.minimal .party-slogans,
.cover-top.minimal .rain-scene,
.cover-top.minimal .desert-waves,
.cover-top.minimal .spice-trail,
.cover-top.minimal .hover-reveal {
  opacity: 0;
  transition: opacity 0.3s ease;
}

.cover-top:not(.minimal) .star-field,
.cover-top:not(.minimal) .surveillance-text,
.cover-top:not(.minimal) .red-eye,
.cover-top:not(.minimal) .party-slogans,
.cover-top:not(.minimal) .rain-scene,
.cover-top:not(.minimal) .desert-waves,
.cover-top:not(.minimal) .spice-trail,
.cover-top:not(.minimal) .hover-reveal {
  opacity: 1;
  transition: opacity 0.3s ease;
}

/* 下半部分：信息区域 */
.cover-bottom {
  background: #fff;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  border-top: 3px solid #000;
}

.bottom-title {
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 2rem;
  font-weight: 700;
  color: #000;
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
  line-height: 1.1;
}

.divider {
  width: 100%;
  height: 2px;
  background: #000;
  margin-bottom: 1rem;
}

.author {
  font-size: 0.75rem;
  color: rgba(0, 0, 0, 0.5);
  margin-bottom: 1.5rem;
  font-weight: 400;
}

.action-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.barcode-random {
  display: flex;
  gap: 2px;
  opacity: 0.5;
}

.barcode-random span {
  background: #000;
  border-radius: 1px;
}

.read-btn {
  background: #000;
  color: #fff;
  border: none;
  padding: 0.6rem 1rem;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.2s ease;
  border-radius: 2px;
}

.book-card:hover .read-btn {
  background: #333;
  transform: scale(1.05);
}

/* ====== 各本书的独特设计 ====== */

/* 小王子 */
.design-prince {
  background: linear-gradient(180deg, #0a1628 0%, #1a3a5c 100%);
}

.star-field {
  position: absolute;
  inset: 0;
}

.star {
  position: absolute;
  color: rgba(255, 255, 255, 0.6);
  animation: twinkle 3s ease-in-out infinite;
}

@keyframes twinkle {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.2); }
}

.floating-planet {
  font-size: 3rem;
  position: absolute;
  top: 1rem;
  right: 2rem;
  animation: float-rotate 20s linear infinite;
}

@keyframes float-rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.rose-text {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  animation: rose-pulse 2s ease-in-out infinite;
}

@keyframes rose-pulse {
  0%, 100% { transform: scale(1); filter: drop-shadow(0 0 10px rgba(255, 0, 0, 0.5)); }
  50% { transform: scale(1.1); filter: drop-shadow(0 0 20px rgba(255, 0, 0, 0.8)); }
}

/* 1984 */
.design-dystopia {
  background: #0a0000;
}

.surveillance-text {
  position: absolute;
  top: 0.5rem;
  left: 0;
  right: 0;
  text-align: center;
  font-size: 0.45rem;
  color: rgba(255, 0, 0, 0.4);
  font-weight: 700;
  letter-spacing: 0.1em;
  line-height: 1.4;
}

.blink {
  animation: blink-text 1s step-end infinite;
}

@keyframes blink-text {
  50% { opacity: 0; }
}

.red-eye {
  width: 100px;
  height: 100px;
  border: 4px solid rgba(255, 0, 0, 0.6);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  position: relative;
  box-shadow: 0 0 30px rgba(255, 0, 0, 0.4);
}

.pupil {
  width: 35px;
  height: 35px;
  background: radial-gradient(circle, #ff0000, #8b0000);
  border-radius: 50%;
  animation: eye-move 5s ease-in-out infinite;
}

@keyframes eye-move {
  0%, 100% { transform: translate(0, 0); }
  25% { transform: translate(10px, 0); }
  50% { transform: translate(0, 8px); }
  75% { transform: translate(-10px, 0); }
}

.eye-glow {
  position: absolute;
  inset: -10px;
  border: 2px solid rgba(255, 0, 0, 0.3);
  border-radius: 50%;
  animation: glow-pulse 2s ease-in-out infinite;
}

@keyframes glow-pulse {
  0%, 100% { transform: scale(1); opacity: 0.5; }
  50% { transform: scale(1.2); opacity: 1; }
}

.party-slogans {
  text-align: center;
}

.party-slogans p {
  font-size: 0.6rem;
  color: #ff0000;
  font-weight: 700;
  letter-spacing: 0.15em;
  margin: 0.25rem 0;
  text-transform: uppercase;
}

/* 百年孤独 */
.design-magical {
  background: linear-gradient(180deg, #1a1a00 0%, #3d3d00 100%);
}

.magic-swirl {
  position: absolute;
  width: 200px;
  height: 200px;
  border: 2px solid rgba(218, 165, 32, 0.2);
  border-radius: 50%;
  animation: rotate-swirl 25s linear infinite;
}

@keyframes rotate-swirl {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.butterfly-path {
  position: absolute;
  width: 100%;
  height: 100%;
}

.butterfly {
  position: absolute;
  font-size: 2rem;
  top: 2rem;
  right: 2rem;
  animation: butterfly-dance 8s ease-in-out infinite;
}

@keyframes butterfly-dance {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  25% { transform: translate(-30px, -20px) rotate(10deg); }
  50% { transform: translate(-20px, 20px) rotate(-10deg); }
  75% { transform: translate(10px, -10px) rotate(5deg); }
}

.family-tree {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.tree-dot {
  width: 8px;
  height: 8px;
  background: rgba(218, 165, 32, 0.6);
  border-radius: 50%;
  animation: tree-pulse 2s ease-in-out infinite;
}

.tree-dot:nth-child(odd) { animation-delay: 0.3s; }

@keyframes tree-pulse {
  0%, 100% { transform: scale(1); opacity: 0.6; }
  50% { transform: scale(1.3); opacity: 1; }
}

/* 三体 */
.design-scifi {
  background: linear-gradient(180deg, #001414 0%, #002828 100%);
}

.cosmic-bg {
  position: absolute;
  inset: 0;
}

.star-field-scifi {
  position: absolute;
  inset: 0;
}

.scifi-star {
  position: absolute;
  width: 1px;
  height: 1px;
  background: rgba(0, 255, 255, 0.5);
  border-radius: 50%;
  animation: scifi-twinkle 4s ease-in-out infinite;
}

.scifi-star:nth-child(odd) { animation-delay: 1s; }

@keyframes scifi-twinkle {
  0%, 100% { opacity: 0.2; }
  50% { opacity: 1; }
}

.suns-orbit {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  position: relative;
  z-index: 2;
}

.sun {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  animation: sun-pulse 4s ease-in-out infinite;
}

.sun-gold {
  background: radial-gradient(circle, #ffd700, #ff8c00);
  box-shadow: 0 0 20px rgba(255, 215, 0, 0.6);
}

.sun-red {
  background: radial-gradient(circle, #ff6347, #dc143c);
  box-shadow: 0 0 20px rgba(220, 20, 60, 0.6);
  animation-delay: 1.3s;
}

.sun-blue {
  background: radial-gradient(circle, #00ced1, #008b8b);
  box-shadow: 0 0 20px rgba(0, 206, 209, 0.6);
  animation-delay: 2.6s;
}

@keyframes sun-pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.15); }
}

.transmission-text {
  font-size: 1rem;
  color: #00ffff;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  animation: transmission 2s ease-in-out infinite;
}

@keyframes transmission {
  0%, 100% { opacity: 0.7; }
  50% { opacity: 1; text-shadow: 0 0 20px rgba(0, 255, 255, 0.8); }
}

/* 局外人 */
.design-absurd {
  background: linear-gradient(180deg, #1a1a1a 0%, #2d2d2d 100%);
}

.absurd-bg {
  position: absolute;
  inset: 0;
}

.absurd-cross {
  position: absolute;
  font-size: 6rem;
  color: rgba(255, 255, 255, 0.05);
  font-weight: 100;
  animation: cross-fade 8s ease-in-out infinite;
}

.absurd-cross:nth-child(1) { top: -10%; left: -10%; animation-delay: 0s; }
.absurd-cross:nth-child(2) { top: 40%; right: -20%; animation-delay: 2.6s; }
.absurd-cross:nth-child(3) { bottom: -20%; left: 30%; animation-delay: 5.2s; }

@keyframes cross-fade {
  0%, 100% { opacity: 0.03; }
  50% { opacity: 0.08; }
}

.opening-line {
  font-family: 'Courier New', monospace;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
  line-height: 1.8;
  padding: 0 1rem;
  font-style: italic;
}

.date-stamp {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  font-size: 0.6rem;
  color: rgba(255, 255, 255, 0.3);
  font-family: 'Courier New', monospace;
  letter-spacing: 0.1em;
}

/* 挪威的森林 */
.design-melancholy {
  background: linear-gradient(180deg, #0f1f2e 0%, #1a3a5c 100%);
}

.rain-scene {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.raindrop {
  position: absolute;
  width: 1px;
  height: 30px;
  background: linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.4));
  animation: rain-fall linear infinite;
}

@keyframes rain-fall {
  0% { transform: translateY(-30px); }
  100% { transform: translateY(270px); }
}

.forest-silhouette {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 0.5rem;
  position: relative;
  z-index: 2;
}

.tree {
  font-size: 2.5rem;
  opacity: 0.7;
  animation: tree-sway 4s ease-in-out infinite;
}

.tree:nth-child(2) { animation-delay: 0.5s; }
.tree:nth-child(3) { animation-delay: 1s; }

@keyframes tree-sway {
  0%, 100% { transform: rotate(-3deg); }
  50% { transform: rotate(3deg); }
}

/* 月亮与六便士 */
.design-choice {
  background: linear-gradient(180deg, #0a1a1a 0%, #1f2f1f 100%);
}

.sky-scene {
  position: absolute;
  inset: 0;
}

.moon-shape {
  font-size: 3rem;
  position: absolute;
  top: 1rem;
  right: 2rem;
  animation: moon-rise 6s ease-in-out infinite;
}

@keyframes moon-rise {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
}

.coins-fall {
  position: absolute;
  bottom: 3rem;
  left: 1rem;
}

.coin {
  font-size: 1.5rem;
  display: block;
  animation: coin-drop 3s ease-in infinite;
}

.coin:nth-child(2) { animation-delay: 1s; }
.coin:nth-child(3) { animation-delay: 2s; }

@keyframes coin-drop {
  0%, 100% { transform: translateY(0) rotate(0deg); opacity: 1; }
  80% { opacity: 1; }
  100% { transform: translateY(50px) rotate(360deg); opacity: 0; }
}

.divider-dashed {
  width: 80%;
  height: 2px;
  border-bottom: 2px dashed rgba(255, 255, 255, 0.3);
  margin: 0.5rem 0;
}

.choice-text {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.8);
  text-align: center;
  line-height: 1.6;
  font-style: italic;
}

/* 1Q84 */
.design-parallel {
  background: linear-gradient(180deg, #1a0000 0%, #330000 100%);
}

.parallel-world {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.world {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.moon-label {
  font-size: 0.5rem;
  color: rgba(255, 255, 255, 0.5);
  letter-spacing: 0.1em;
}

.moon-icon {
  font-size: 1.5rem;
}

.world-divider {
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.4);
  animation: divider-pulse 3s ease-in-out infinite;
}

@keyframes divider-pulse {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 1; }
}

.portal-effect {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 50% 50%, rgba(139, 0, 0, 0.3) 0%, transparent 70%);
  animation: portal-rotate 20s linear infinite;
}

@keyframes portal-rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* 射雕英雄传 */
.design-martial {
  background: linear-gradient(180deg, #1a0a00 0%, #3d1a0a 100%);
}

.martial-bg {
  position: absolute;
  inset: 0;
}

.ink-splash-large {
  position: absolute;
  width: 150px;
  height: 150px;
  background: radial-gradient(circle, rgba(0, 0, 0, 0.4) 0%, transparent 70%);
  border-radius: 50%;
  top: -30px;
  right: -30px;
}

.seal-ring {
  width: 90px;
  height: 90px;
  border: 3px solid #DAA520;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.75rem;
  position: relative;
  z-index: 2;
  box-shadow: 0 0 30px rgba(218, 165, 32, 0.5);
  animation: seal-glow 3s ease-in-out infinite;
}

@keyframes seal-glow {
  0%, 100% { box-shadow: 0 0 30px rgba(218, 165, 32, 0.5); }
  50% { box-shadow: 0 0 50px rgba(218, 165, 32, 0.8); }
}

.seal-char {
  font-size: 2.5rem;
  color: #DAA520;
  font-weight: bold;
}

.sword-cross {
  font-size: 2rem;
  position: absolute;
  bottom: 2rem;
  right: 1rem;
  opacity: 0.6;
}

.martial-text {
  font-size: 1.2rem;
  color: #DAA520;
  font-weight: 700;
  letter-spacing: 0.2em;
  margin-bottom: 0.25rem;
}

.martial-sub {
  font-size: 0.8rem;
  color: rgba(218, 165, 32, 0.7);
  letter-spacing: 0.15em;
}

/* 困于沙丘 */
.design-desert {
  background: linear-gradient(180deg, #2d1a0a 0%, #4a2d0a 100%);
}

.desert-waves {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 80px;
}

.wave {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 40px;
  background: repeating-linear-gradient(
    90deg,
    transparent,
    transparent 15px,
    rgba(218, 165, 32, 0.2) 15px,
    rgba(218, 165, 32, 0.2) 30px
  );
  animation: wave-drift 8s ease-in-out infinite;
}

.wave-2 {
  height: 50px;
  opacity: 0.6;
  animation-delay: 2s;
}

.wave-3 {
  height: 30px;
  opacity: 0.4;
  animation-delay: 4s;
}

@keyframes wave-drift {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(15px); }
}

.spice-trail {
  position: absolute;
  top: 2rem;
  left: 1rem;
  display: flex;
  gap: 0.5rem;
}

.spice-particle {
  font-size: 0.8rem;
  animation: spice-float 4s ease-in-out infinite;
}

.spice-particle:nth-child(2) { animation-delay: 1.3s; }
.spice-particle:nth-child(3) { animation-delay: 2.6s; }

@keyframes spice-float {
  0%, 100% { transform: translateY(0) scale(1); opacity: 0.6; }
  50% { transform: translateY(-15px) scale(1.3); opacity: 1; }
}

.fear-quote {
  position: absolute;
  top: 3rem;
  font-size: 0.7rem;
  color: rgba(218, 165, 32, 0.8);
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.desert-title {
  font-size: 2rem;
  color: #DAA520;
  font-weight: 700;
  letter-spacing: 0.3em;
  margin-bottom: 0.5rem;
  text-shadow: 0 0 20px rgba(218, 165, 32, 0.5);
}

/* ====== 新书设计样式 ====== */

/* 夜晚的潜水艇 */
.design-submarine {
  background: linear-gradient(180deg, #0a1628 0%, #1e3a5f 100%);
}

.deep-sea {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.sea-bubbles {
  position: absolute;
  inset: 0;
}

.bubble {
  position: absolute;
  bottom: -10px;
  width: 8px;
  height: 8px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  animation: bubble-rise 4s ease-in infinite;
}

@keyframes bubble-rise {
  0% { transform: translateY(0) scale(1); opacity: 0; }
  50% { opacity: 0.6; }
  100% { transform: translateY(-250px) scale(0.5); opacity: 0; }
}

.submarine-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 3rem;
  animation: float-ship 3s ease-in-out infinite;
}

@keyframes float-ship {
  0%, 100% { transform: translate(-50%, -50%) rotate(-2deg); }
  50% { transform: translate(-50%, -55%) rotate(2deg); }
}

/* 撒哈拉的故事 */
.design-sahara {
  background: linear-gradient(180deg, #d4a574 0%, #c9956c 100%);
}

.desert-dunes {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 120px;
}

.dune {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 60px;
  background: rgba(139, 90, 43, 0.4);
  border-radius: 50% 50% 0 0;
}

.dune-1 { left: -20%; transform: scale(1.2); }
.dune-2 { right: -20%; transform: scale(1); }

.camel-walk {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 2rem;
  animation: camel-move 8s linear infinite;
}

@keyframes camel-move {
  0%, 100% { transform: translateX(-80px); }
  50% { transform: translateX(80px); }
}

/* 山月记 */
.design-tiger {
  background: linear-gradient(180deg, #1a1a2e 0%, #16213e 100%);
}

.moon-scene {
  position: absolute;
  top: 20px;
  right: 30px;
}

.full-moon {
  font-size: 2.5rem;
  animation: moon-glow 3s ease-in-out infinite;
}

@keyframes moon-glow {
  0%, 100% { filter: drop-shadow(0 0 10px rgba(255, 255, 200, 0.5)); }
  50% { filter: drop-shadow(0 0 25px rgba(255, 255, 200, 0.8)); }
}

.tiger-eyes {
  position: absolute;
  top: 60px;
  left: 30px;
  font-size: 1.2rem;
  letter-spacing: 10px;
  animation: eyes-blink 4s ease-in-out infinite;
}

@keyframes eyes-blink {
  0%, 45%, 55%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

.tiger-text {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.8);
  font-style: italic;
  text-align: center;
  width: 90%;
}

/* 明亮的夜晚 */
.design-night {
  background: linear-gradient(180deg, #1e3a5f 0%, #0d1b2a 100%);
}

.bright-stars {
  position: absolute;
  inset: 0;
}

.bright-star {
  position: absolute;
  font-size: 0.8rem;
  animation: star-twinkle 2s ease-in-out infinite;
}

@keyframes star-twinkle {
  0%, 100% { opacity: 0.4; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.3); }
}

.night-message {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 0.9rem;
  color: #fff;
  text-align: center;
  text-shadow: 0 0 15px rgba(255, 255, 255, 0.5);
}

/* 我的阿勒泰 */
.design-altay {
  background: linear-gradient(180deg, #87ceeb 0%, #98fb98 100%);
}

.grassland {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.mountain-silhouette {
  font-size: 4rem;
  margin-bottom: 0.5rem;
}

.yurt {
  font-size: 2.5rem;
}

.sheep {
  font-size: 1.5rem;
  letter-spacing: 10px;
}

.altay-text {
  position: absolute;
  bottom: 20px;
  font-size: 0.8rem;
  color: #2d4a3e;
  font-style: italic;
}

/* 我与地坛 */
.design-temple {
  background: linear-gradient(180deg, #8b7355 0%, #6b5344 100%);
}

.temple-gate {
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 3rem;
}

.wheelchair {
  position: absolute;
  bottom: 60px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 2rem;
}

.temple-quote {
  position: absolute;
  bottom: 20px;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.9);
  text-align: center;
  width: 90%;
  left: 5%;
  font-style: italic;
}

/* 太白金星有点烦 */
.design-immortal {
  background: linear-gradient(180deg, #ffe5b4 0%, #ffd699 100%);
}

.celestial-court {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.cloud {
  font-size: 2.5rem;
  animation: cloud-float 4s ease-in-out infinite;
}

@keyframes cloud-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.jade-emperor {
  font-size: 2.5rem;
}

.paperwork {
  font-size: 1.2rem;
  letter-spacing: 5px;
}

.immortal-text {
  position: absolute;
  bottom: 15px;
  font-size: 0.75rem;
  color: #8b4513;
  font-style: italic;
}

/* 长安的荔枝 */
.design-litchi {
  background: linear-gradient(180deg, #dc143c 0%, #8b0000 100%);
}

.litchi-fall {
  position: absolute;
  top: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 15px;
}

.litchi-fruit {
  font-size: 1.5rem;
  animation: litchi-drop 2s ease-in infinite;
}

.litchi-fruit:nth-child(2) { animation-delay: 0.6s; }
.litchi-fruit:nth-child(3) { animation-delay: 1.2s; }

@keyframes litchi-drop {
  0% { transform: translateY(0) rotate(0deg); opacity: 1; }
  100% { transform: translateY(180px) rotate(360deg); opacity: 0; }
}

.ancient-capital {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 2.5rem;
}

/* 霍乱时期的爱情 */
.design-cholera {
  background: linear-gradient(180deg, #c41e3a 0%, #8b0000 100%);
}

.love-river {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.river-flow {
  font-size: 3rem;
  animation: river-flow 3s linear infinite;
}

@keyframes river-flow {
  0% { transform: translateX(-50px); opacity: 0.5; }
  50% { opacity: 1; }
  100% { transform: translateX(50px); opacity: 0.5; }
}

.love-letters {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.9);
}

.clock {
  font-size: 2rem;
}

.love-wait {
  position: absolute;
  bottom: 15px;
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.9);
  font-style: italic;
  text-align: center;
  width: 90%;
}

/* 解忧杂货店 */
.design-store {
  background: linear-gradient(180deg, #ffa07a 0%, #ff7f50 100%);
}

.shop-front {
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 3rem;
}

.mail-box {
  position: absolute;
  top: 80px;
  right: 20px;
  font-size: 1.8rem;
}

.letter-path {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 1.2rem;
  letter-spacing: 5px;
}

/* 白夜行 */
.design-whitenight {
  background: linear-gradient(180deg, #2c3e50 0%, #1a1a2e 100%);
}

.dark-city {
  position: absolute;
  inset: 0;
}

.walking-pair {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 1.5rem;
  letter-spacing: 5px;
}

.no-sun {
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 2rem;
}

.parallel-paths {
  position: absolute;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
  height: 2px;
}

.path {
  position: absolute;
  width: 100%;
  height: 2px;
  background: rgba(255, 255, 255, 0.3);
}

.path-1 { top: -5px; transform: rotate(-3deg); }
.path-2 { top: 5px; transform: rotate(3deg); }

.whitenight-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.9);
  text-align: center;
  width: 90%;
  font-style: italic;
}

/* 响应式 */
@media (max-width: 768px) {
  .universe {
    padding: 1rem;
  }

  .books-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .back-btn {
    top: 1rem;
    left: 1rem;
  }

  .decoration-lines {
    display: none;
  }
}
</style>

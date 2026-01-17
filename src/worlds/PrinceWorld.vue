<template>
  <div class="sketchbook-world">
    <!-- Paper Texture Background -->
    <div class="paper-texture"></div>

    <!-- Warp Transition Animation -->
    <transition name="warp">
      <div v-if="showWarp" class="warp-overlay">
        <div class="warp-circle"></div>
        <div class="warp-text">小王子</div>
      </div>
    </transition>

    <!-- Header Section -->
    <header class="sketchbook-header">
      <button class="back-btn wobbly-border" @click="exitWorld">
        ← 返回宇宙
      </button>

      <div class="title-section">
        <h1 class="sketchbook-title">小王子</h1>
        <p class="sketchbook-subtitle">Le Petit Prince · 1943</p>
        <div class="hand-drawn-underline"></div>
      </div>
    </header>

    <!-- Category Tabs -->
    <div class="category-section">
      <div class="tabs-container">
        <button
          v-for="category in categories"
          :key="category.id"
          class="category-tab wobbly-border"
          :class="{ active: currentCategory === category.id }"
          @click="switchCategory(category.id)"
        >
          <span class="tab-icon">{{ category.icon }}</span>
          <span class="tab-label">{{ category.label }}</span>
          <span class="tab-count">[{{ category.count }}]</span>
        </button>
      </div>
    </div>

    <!-- Main Content Area -->
    <main class="sketchbook-main">
      <transition name="card-transition" mode="out-in">
        <div
          :key="`${currentCategory}-${currentIndex}`"
          class="sketch-card-container"
        >
          <!-- Sketch Card -->
          <div
            class="sketch-card"
            :class="cardColorClass"
            @click="handleCardClick"
          >
            <!-- Tape Decorations -->
            <div class="tape tape-top-left"></div>
            <div class="tape tape-top-right"></div>

            <!-- Tack Pin -->
            <div class="tack-pin"></div>

            <!-- Card Header -->
            <div class="card-header">
              <span class="card-number">#{{ String(currentIndex + 1).padStart(2, '0') }}</span>
              <div class="hand-drawn-divider"></div>
            </div>

            <!-- Card Content -->
            <div class="card-content">
              <!-- Symbol/Icon -->
              <div class="card-symbol" :class="{ animated: symbolAnimated }">
                {{ currentItem.symbol }}
              </div>

              <!-- Title -->
              <h2 class="card-title">{{ currentItem.title }}</h2>

              <!-- Tags -->
              <div class="card-tags" v-if="currentItem.tags">
                <span
                  v-for="(tag, i) in currentItem.tags"
                  :key="i"
                  class="tag wobbly-border"
                >
                  {{ tag }}
                </span>
              </div>

              <!-- Main Quote -->
              <div class="quote-section">
                <p class="main-quote">{{ currentItem.quote }}</p>
              </div>

              <!-- Additional Content -->
              <div v-if="currentItem.content" class="additional-content">
                <p
                  v-for="(line, i) in currentItem.content"
                  :key="i"
                  class="content-line"
                  :style="{ '--delay': `${i * 0.1}s` }"
                >
                  {{ line }}
                </p>
              </div>

              <!-- Reflection for Characters -->
              <div v-if="currentItem.reflection" class="reflection-box wobbly-border">
                <span class="reflection-label">小王子的困惑</span>
                <p class="reflection-text">{{ currentItem.reflection }}</p>
              </div>
            </div>

            <!-- Post-it Note (Special) -->
            <div v-if="currentItem.postit" class="postit-note">
              <p class="postit-text">{{ currentItem.postit }}</p>
            </div>

            <!-- Arrow Doodle -->
            <div v-if="currentItem.hasNext" class="arrow-doodle">
              <svg viewBox="0 0 100 50">
                <path d="M 10 25 Q 50 25 70 25 M 60 15 L 75 25 L 60 35" stroke="#2d2d2d" stroke-width="2" fill="none" stroke-linecap="round"/>
              </svg>
              <span class="arrow-text">点击继续</span>
            </div>
          </div>
        </div>
      </transition>
    </main>

    <!-- Navigation -->
    <nav class="sketchbook-nav">
      <button
        class="nav-btn wobbly-border"
        :disabled="currentIndex === 0"
        @click="prevItem"
      >
        <svg viewBox="0 0 24 24" width="20" height="20">
          <path d="M15 18l-6-6 6-6" stroke="currentColor" stroke-width="2" fill="none"/>
        </svg>
        <span>PREV</span>
      </button>

      <!-- Progress Indicators -->
      <div class="progress-dots">
        <div
          v-for="i in currentItems.length"
          :key="i"
          class="progress-dot"
          :class="{ active: currentIndex === i - 1 }"
          @click="goToItem(i - 1)"
        ></div>
      </div>

      <button
        class="nav-btn wobbly-border"
        :disabled="currentIndex === currentItems.length - 1"
        @click="nextItem"
      >
        <span>NEXT</span>
        <svg viewBox="0 0 24 24" width="20" height="20">
          <path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="2" fill="none"/>
        </svg>
      </button>
    </nav>

    <!-- Footer -->
    <footer class="sketchbook-footer">
      <div class="footer-number">VOL.034</div>
      <div class="footer-dots">···</div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const showWarp = ref(true)
const currentCategory = ref('characters')
const currentIndex = ref(0)
const symbolAnimated = ref(false)

// Categories
const categories = [
  { id: 'characters', label: '人物', icon: '👤', count: 8 },
  { id: 'planets', label: '星系', icon: '🪐', count: 4 },
  { id: 'quotes', label: '金句', icon: '💭', count: 6 }
]

// Character Data (8)
const characters = [
  {
    symbol: '△',
    title: '小王子',
    tags: ['纯真', '探索', '孤独'],
    quote: '所有的大人都曾经是小孩，虽然，只有少数人记得',
    content: [
      '有一天，我看了四十四次日落',
      '真正重要的东西，用眼睛是看不见的',
      '你为你的玫瑰花费的时间，让她变得重要'
    ],
    reflection: '我不懂为什么大人这么奇怪',
    color: 'neutral'
  },
  {
    symbol: '▢',
    title: '国王',
    tags: ['权威', '控制', '命令'],
    quote: '我只能命令我也能做到的事',
    content: [
      '审判自己比审判别人难多了',
      '权威必须建立在能力之上',
      '如果我不命令太阳落下，它会在6点43分落下吗？'
    ],
    reflection: '为什么他不能命令太阳落下？',
    color: 'neutral'
  },
  {
    symbol: '⬡',
    title: '爱慕虚荣的人',
    tags: ['虚荣', '表面', '赞美'],
    quote: '啊！你崇拜我？',
    content: [
      '只有在别人面前，我才算得上真正英俊',
      '虚荣就是只听得进赞美',
      '大人们只关心数字和外表'
    ],
    reflection: '大人们真奇怪',
    color: 'neutral'
  },
  {
    symbol: '◎',
    title: '酒鬼',
    tags: ['逃避', '循环', '遗忘'],
    quote: '我喝酒是为了遗忘',
    content: [
      '我喝酒是为了遗忘我的羞愧',
      '遗忘什么？遗忘我喝酒这件事',
      '成人的世界充满了逃避'
    ],
    reflection: '这比国王更奇怪',
    color: 'neutral'
  },
  {
    symbol: '▦',
    title: '商人',
    tags: ['占有', '计算', '数字'],
    quote: '这颗星星属于我',
    content: [
      '我有五百三十二万一千六百二十七颗星星',
      '拥有不代表有用',
      '严肃的人只关心数字'
    ],
    reflection: '拥有有什么用？',
    color: 'neutral'
  },
  {
    symbol: '◇',
    title: '狐狸',
    tags: ['驯服', '联结', '秘密'],
    quote: '驯服就是建立联系',
    content: [
      '只有用心才能看清事物本质',
      '你永远要对你驯服过的东西负责',
      '正是你为玫瑰花费的时间，让她变得重要'
    ],
    reflection: '我终于明白玫瑰对我的意义',
    postit: '请你驯服我吧',
    color: 'yellow'
  },
  {
    symbol: '◌',
    title: '玫瑰',
    tags: ['爱', '骄傲', '刺'],
    quote: '我不笨，但我太骄傲了',
    content: [
      '你驯服了我，现在我们互相不可缺少',
      '骄傲是爱的敌人',
      '我要用我的刺来保护自己'
    ],
    reflection: '我不懂怎么爱她',
    color: 'red'
  },
  {
    symbol: '〰',
    title: '蛇',
    tags: ['离别', '永恒', '回归'],
    quote: '如果你想念我，就看看星星',
    content: [
      '对于真心喜爱的人，星星是会笑的',
      '身体的重量太轻了，带不动这个身体',
      '我太远了，我无法带着这个身体'
    ],
    reflection: '我要回到我的星球了',
    color: 'neutral'
  }
]

// Planet Data (4)
const planets = [
  {
    symbol: 'B-612',
    title: '小王子的星球',
    tags: ['家园', '玫瑰', '日落'],
    quote: '在这个小小的星球上，只要挪动椅子，一天就能看四十四次日落',
    content: [
      '星球上有两座活火山，一座死火山',
      '有可怕的猴面包树，必须及时清除',
      '还有一朵骄傲的玫瑰',
      '那么小，那么孤单，却又那么温暖'
    ],
    color: 'neutral'
  },
  {
    symbol: '325',
    title: '国王的星球',
    tags: ['权威', '命令', '空旷'],
    quote: '审判自己比审判别人难多了',
    content: [
      '星球上只有国王一个人',
      '他以为自己统治着宇宙',
      '但他连命令太阳落下的能力都没有'
    ],
    color: 'neutral'
  },
  {
    symbol: '∞',
    title: '商人的星球',
    tags: ['计算', '占有', '星星'],
    quote: '我有五百三十二万一千六百二十七颗星星',
    content: [
      '他忙着计算星星的数量',
      '以为在纸上写下数字就拥有了星星',
      '但从来不曾真正欣赏过星空'
    ],
    color: 'neutral'
  },
  {
    symbol: '🌍',
    title: '地球',
    tags: ['人类', '花园', '相遇'],
    quote: '沙漠之所以美丽，是因为在某个角落藏着一口水井',
    content: [
      '这里有五千朵玫瑰',
      '这里有会说话的狐狸',
      '这里有让你流泪的铁路列车',
      '这里有需要用心去发现的一切'
    ],
    color: 'neutral'
  }
]

// Quote Data (6)
const quotes = [
  {
    symbol: '🌹',
    title: '关于爱',
    quote: '你为你的玫瑰花费的时间，让她变得重要',
    content: [
      '正是你为玫瑰花费的时间，让她变得重要',
      '你要永远为你驯服过的东西负责',
      '你要为你玫瑰负责'
    ],
    color: 'red'
  },
  {
    symbol: '🦊',
    title: '关于驯服',
    quote: '驯服就是建立联系',
    content: [
      '驯服的意思是"建立关系"',
      '驯服之前，你只是一个小男孩，和其他成千上万的小男孩没有区别',
      '驯服之后，你就是世界上唯一的了'
    ],
    color: 'yellow'
  },
  {
    symbol: '👁️',
    title: '关于本质',
    quote: '只有用心才能看得清，本质的东西用眼睛是看不见的',
    content: [
      '真正重要的东西，用眼睛是看不见的',
      '人只有用心灵才能看得清事物本质',
      '眼睛是盲目的，要用心去寻找'
    ],
    color: 'neutral'
  },
  {
    symbol: '⭐',
    title: '关于星星',
    quote: '星星发亮是为了让每一个人有一天都能找到属于自己的星星',
    content: [
      '对于爱星空的人，星星是会笑的',
      '对于爱旅行的人，星星是向导',
      '对于学者，星星是难题',
      '对于商人，星星是财富',
      '但对于小王子，星星就是玫瑰'
    ],
    color: 'neutral'
  },
  {
    symbol: '🌅',
    title: '关于孤独',
    quote: '有一天，我看了四十四次日落',
    content: [
      '人在难过的时候，就爱看日落',
      '你看过四十四次日落吗？',
      '那时候的我太年轻，不懂得怎么去爱'
    ],
    color: 'neutral'
  },
  {
    symbol: '👶',
    title: '关于长大',
    quote: '所有的大人都曾经是小孩，虽然，只有少数人记得',
    content: [
      '大人只关心数字、年龄、金钱、权力',
      '他们从来不问："他说话的声音好听吗？他喜欢捉蝴蝶吗？"',
      '如果你对大人说你看到一栋粉红色的砖房，窗户边有天竺葵，屋顶有鸽子',
      '他们想象不出来',
      '但如果你说："我看到了一栋价值十万法郎的房子"',
      '他们会惊叹："多美啊！"'
    ],
    color: 'neutral'
  }
]

// Computed
const currentItems = computed(() => {
  switch (currentCategory.value) {
    case 'characters': return characters
    case 'planets': return planets
    case 'quotes': return quotes
    default: return characters
  }
})

const currentItem = computed(() => {
  return currentItems.value[currentIndex.value] || characters[0]
})

const cardColorClass = computed(() => {
  if (!currentItem.value.color) return ''
  return `color-${currentItem.value.color}`
})

// Methods
const switchCategory = (categoryId) => {
  currentCategory.value = categoryId
  currentIndex.value = 0
  symbolAnimated.value = false
  setTimeout(() => {
    symbolAnimated.value = true
  }, 100)
}

const nextItem = () => {
  if (currentIndex.value < currentItems.value.length - 1) {
    currentIndex.value++
    triggerSymbolAnimation()
  }
}

const prevItem = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--
    triggerSymbolAnimation()
  }
}

const goToItem = (index) => {
  currentIndex.value = index
  triggerSymbolAnimation()
}

const handleCardClick = () => {
  if (currentItem.value.hasNext) {
    nextItem()
  }
}

const triggerSymbolAnimation = () => {
  symbolAnimated.value = false
  setTimeout(() => {
    symbolAnimated.value = true
  }, 100)
}

const exitWorld = () => {
  router.push('/universe')
}

onMounted(() => {
  setTimeout(() => {
    showWarp.value = false
  }, 1800)

  setTimeout(() => {
    symbolAnimated.value = true
  }, 2000)
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kalam:wght@400;700&family=Patrick+Hand&display=swap');

/* ========== Base Layout ========== */
.sketchbook-world {
  min-height: 100vh;
  background: #fdfbf7;
  position: relative;
  overflow-x: hidden;
  font-family: 'Patrick Hand', cursive;
}

/* Paper Texture Background */
.paper-texture {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image:
    radial-gradient(circle, #e5e0d8 1px, transparent 1px),
    linear-gradient(to right, rgba(0,0,0,0.02) 1px, transparent 1px);
  background-size: 24px 24px, 100% 2px;
  pointer-events: none;
  z-index: 0;
}

/* ========== Warp Animation ========== */
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
  background: #fdfbf7;
}

.warp-circle {
  width: 300px;
  height: 300px;
  border: 3px solid #2d2d2d;
  border-radius: 50%;
  animation: wobble-expand 1.5s ease-out forwards;
}

.warp-text {
  position: absolute;
  font-family: 'Kalam', cursive;
  font-weight: 700;
  font-size: 1.5rem;
  color: #2d2d2d;
  animation: fade-in-out 1.5s ease-out forwards;
}

@keyframes wobble-expand {
  0% {
    transform: scale(0) rotate(0deg);
    opacity: 0;
  }
  50% {
    opacity: 1;
    transform: scale(0.5) rotate(180deg);
  }
  100% {
    transform: scale(3) rotate(360deg);
    opacity: 0;
  }
}

@keyframes fade-in-out {
  0% { opacity: 0; transform: translateY(20px); }
  50% { opacity: 1; transform: translateY(0); }
  100% { opacity: 0; }
}

.warp-enter-active,
.warp-leave-active {
  transition: opacity 0.5s ease;
}

.warp-enter-from,
.warp-leave-to {
  opacity: 0;
}

/* ========== Header ========== */
.sketchbook-header {
  position: relative;
  z-index: 10;
  padding: 2rem;
  text-align: center;
}

.back-btn {
  position: fixed;
  top: 2rem;
  left: 2rem;
  padding: 0.75rem 1.5rem;
  background: #fff9c4;
  border: 3px solid #2d2d2d;
  font-family: 'Kalam', cursive;
  font-weight: 700;
  font-size: 1rem;
  color: #2d2d2d;
  cursor: pointer;
  box-shadow: 4px 4px 0px 0px #2d2d2d;
  transition: all 100ms;
  z-index: 100;
}

.back-btn:hover {
  transform: translate(2px, 2px);
  box-shadow: 2px 2px 0px 0px #2d2d2d;
}

.title-section {
  margin-top: 4rem;
}

.sketchbook-title {
  font-family: 'Kalam', cursive;
  font-weight: 700;
  font-size: clamp(3rem, 8vw, 5rem);
  color: #2d2d2d;
  margin: 0 0 0.5rem 0;
  letter-spacing: 0.05em;
}

.sketchbook-subtitle {
  font-family: 'Patrick Hand', cursive;
  font-size: 1.3rem;
  color: #5a5a5a;
  margin: 0 0 1.5rem 0;
  font-style: italic;
}

.hand-drawn-underline {
  width: 200px;
  height: 3px;
  background: #2d2d2d;
  margin: 0 auto;
  border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px;
  animation: wobble 3s ease-in-out infinite;
}

@keyframes wobble {
  0%, 100% { transform: scaleX(1); }
  50% { transform: scaleX(1.05); }
}

/* ========== Category Tabs ========== */
.category-section {
  position: relative;
  z-index: 10;
  padding: 2rem;
}

.tabs-container {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.category-tab {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.5rem;
  background: #ffffff;
  border: 3px solid #2d2d2d;
  font-family: 'Kalam', cursive;
  font-weight: 700;
  font-size: 1rem;
  color: #2d2d2d;
  cursor: pointer;
  box-shadow: 4px 4px 0px 0px #2d2d2d;
  transition: all 100ms;
}

.category-tab:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0px 0px #2d2d2d;
}

.category-tab.active {
  background: #fff9c4;
  transform: rotate(-1deg);
}

.tab-icon {
  font-size: 1.3rem;
}

.tab-label {
  font-size: 1.1rem;
}

.tab-count {
  font-size: 0.9rem;
  opacity: 0.6;
}

/* ========== Wobbly Border Utility ========== */
.wobbly-border {
  border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px;
}

/* ========== Main Content ========== */
.sketchbook-main {
  position: relative;
  z-index: 10;
  padding: 2rem;
  min-height: 500px;
}

.sketch-card-container {
  max-width: 700px;
  margin: 0 auto;
}

.sketch-card {
  position: relative;
  background: #ffffff;
  border: 3px solid #2d2d2d;
  padding: 3rem 2.5rem;
  box-shadow: 8px 8px 0px 0px #2d2d2d;
  transition: all 100ms;
  cursor: pointer;
}

.sketch-card:hover {
  transform: rotate(1deg) translate(-2px, -2px);
  box-shadow: 10px 10px 0px 0px #2d2d2d;
}

.sketch-card.color-yellow {
  background: #fff9c4;
}

.sketch-card.color-red {
  background: #ffebee;
}

/* Tape Decorations */
.tape {
  position: absolute;
  width: 80px;
  height: 30px;
  background: rgba(255, 235, 59, 0.7);
  opacity: 0.8;
}

.tape-top-left {
  top: -15px;
  left: 30px;
  transform: rotate(-5deg);
}

.tape-top-right {
  top: -15px;
  right: 30px;
  transform: rotate(3deg);
}

/* Tack Pin */
.tack-pin {
  position: absolute;
  top: 15px;
  right: 15px;
  width: 20px;
  height: 20px;
  background: #ff4d4d;
  border-radius: 50%;
  box-shadow: 2px 2px 0px 0px #2d2d2d;
  transform: rotate(15deg);
}

.tack-pin::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 6px;
  height: 6px;
  background: #2d2d2d;
  border-radius: 50%;
}

/* Card Header */
.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
}

.card-number {
  font-family: 'Kalam', cursive;
  font-weight: 700;
  font-size: 0.9rem;
  color: #5a5a5a;
  letter-spacing: 0.1em;
}

.hand-drawn-divider {
  flex: 1;
  height: 2px;
  background: repeating-linear-gradient(
    to right,
    #2d2d2d 0px,
    #2d2d2d 8px,
    transparent 8px,
    transparent 12px
  );
  margin-left: 1rem;
}

/* Card Content */
.card-content {
  text-align: center;
}

.card-symbol {
  font-size: 4rem;
  margin-bottom: 1.5rem;
  transition: all 0.3s ease;
}

.card-symbol.animated {
  animation: bounce-in 0.6s ease;
}

@keyframes bounce-in {
  0% { transform: scale(0); opacity: 0; }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); opacity: 1; }
}

.card-title {
  font-family: 'Kalam', cursive;
  font-weight: 700;
  font-size: 2.5rem;
  color: #2d2d2d;
  margin: 0 0 1.5rem 0;
}

.card-tags {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.tag {
  padding: 0.5rem 1rem;
  background: #ffffff;
  border: 2px solid #2d2d2d;
  font-family: 'Patrick Hand', cursive;
  font-size: 0.95rem;
  color: #2d2d2d;
  box-shadow: 2px 2px 0px 0px #2d2d2d;
}

.quote-section {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: rgba(0, 0, 0, 0.02);
  border-radius: 10px;
}

.main-quote {
  font-family: 'Patrick Hand', cursive;
  font-size: 1.5rem;
  line-height: 1.6;
  color: #2d2d2d;
  margin: 0;
  font-style: italic;
}

.additional-content {
  margin-bottom: 2rem;
  text-align: left;
}

.content-line {
  font-family: 'Patrick Hand', cursive;
  font-size: 1.2rem;
  line-height: 1.8;
  color: #5a5a5a;
  margin: 0 0 0.75rem 0;
  opacity: 0;
  animation: fade-in-up 0.5s ease forwards;
  animation-delay: var(--delay);
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Reflection Box */
.reflection-box {
  padding: 1.5rem;
  background: #ffffff;
  border: 2px dashed #2d2d2d;
  margin-top: 1.5rem;
}

.reflection-label {
  display: block;
  font-family: 'Kalam', cursive;
  font-weight: 700;
  font-size: 0.85rem;
  color: #ff4d4d;
  margin-bottom: 0.75rem;
  letter-spacing: 0.1em;
}

.reflection-text {
  font-family: 'Patrick Hand', cursive;
  font-size: 1.1rem;
  line-height: 1.6;
  color: #2d2d2d;
  margin: 0;
  font-style: italic;
}

/* Post-it Note */
.postit-note {
  position: absolute;
  bottom: -20px;
  right: -20px;
  width: 150px;
  background: #fff9c4;
  padding: 1rem;
  transform: rotate(3deg);
  box-shadow: 3px 3px 0px 0px #2d2d2d;
}

.postit-text {
  font-family: 'Kalam', cursive;
  font-weight: 700;
  font-size: 1rem;
  color: #2d2d2d;
  margin: 0;
  line-height: 1.4;
}

/* Arrow Doodle */
.arrow-doodle {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.arrow-doodle svg {
  width: 100px;
  height: 50px;
  animation: arrow-wiggle 2s ease-in-out infinite;
}

@keyframes arrow-wiggle {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(5px); }
}

.arrow-text {
  font-family: 'Patrick Hand', cursive;
  font-size: 0.9rem;
  color: #5a5a5a;
}

/* ========== Navigation ========== */
.sketchbook-nav {
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  padding: 2rem;
  flex-wrap: wrap;
}

.nav-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: #ffffff;
  border: 3px solid #2d2d2d;
  font-family: 'Kalam', cursive;
  font-weight: 700;
  font-size: 1rem;
  color: #2d2d2d;
  cursor: pointer;
  box-shadow: 4px 4px 0px 0px #2d2d2d;
  transition: all 100ms;
}

.nav-btn:hover:not(:disabled) {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0px 0px #2d2d2d;
}

.nav-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  box-shadow: 2px 2px 0px 0px #2d2d2d;
}

.nav-btn span {
  font-size: 0.9rem;
  letter-spacing: 0.05em;
}

.progress-dots {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  justify-content: center;
}

.progress-dot {
  width: 12px;
  height: 12px;
  background: #ffffff;
  border: 2px solid #2d2d2d;
  border-radius: 50%;
  cursor: pointer;
  transition: all 200ms;
}

.progress-dot:hover {
  transform: scale(1.2);
}

.progress-dot.active {
  background: #2d2d2d;
  transform: scale(1.3);
}

/* ========== Footer ========== */
.sketchbook-footer {
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 1.5rem;
  font-family: 'Kalam', cursive;
}

.footer-number {
  font-weight: 700;
  font-size: 0.85rem;
  color: #5a5a5a;
  letter-spacing: 0.15em;
}

.footer-dots {
  font-size: 1.2rem;
  color: #2d2d2d;
}

/* ========== Transitions ========== */
.card-transition-enter-active,
.card-transition-leave-active {
  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
}

.card-transition-enter-from {
  opacity: 0;
  transform: translateY(30px) rotate(-2deg);
}

.card-transition-leave-to {
  opacity: 0;
  transform: translateY(-30px) rotate(2deg);
}

/* ========== Responsive ========== */
@media (max-width: 768px) {
  .back-btn {
    top: 1rem;
    left: 1rem;
    padding: 0.6rem 1rem;
    font-size: 0.9rem;
  }

  .sketchbook-title {
    font-size: 2.5rem;
  }

  .sketchbook-subtitle {
    font-size: 1.1rem;
  }

  .tabs-container {
    gap: 1rem;
  }

  .category-tab {
    padding: 0.75rem 1rem;
    font-size: 0.9rem;
  }

  .tab-icon {
    font-size: 1.1rem;
  }

  .sketch-card {
    padding: 2rem 1.5rem;
  }

  .card-title {
    font-size: 2rem;
  }

  .main-quote {
    font-size: 1.2rem;
  }

  .postit-note {
    width: 120px;
    right: -10px;
    bottom: -15px;
  }

  .nav-btn {
    padding: 0.6rem 1rem;
    font-size: 0.9rem;
  }

  .progress-dot {
    width: 10px;
    height: 10px;
  }
}
</style>

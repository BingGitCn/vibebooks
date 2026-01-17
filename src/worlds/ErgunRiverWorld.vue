<template>
  <div class="ergun-river-world">
    <!-- 跃迁动画 -->
    <transition name="warp">
      <div v-if="showWarp" class="warp-overlay">
        <div class="warp-fire">
          <div class="flame-particle" v-for="i in 8" :key="i" :style="{ animationDelay: `${i * 0.1}s` }"></div>
        </div>
        <div class="warp-text">额尔古纳河右岸</div>
      </div>
    </transition>

    <!-- 返回按钮 -->
    <button class="exit-btn" @click="exitWorld">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M19 12H5M12 19l-7-7 7-7"/>
      </svg>
      <span>Return</span>
    </button>

    <!-- 主界面：火塘 + 四季 -->
    <div v-if="!selectedSeason" class="fireplace-container">
      <div class="fireplace-header">
        <h1 class="fireplace-title">火塘边的百年</h1>
        <p class="fireplace-subtitle">一位鄂温克老人的讲述</p>
      </div>

      <!-- 火塘中心 -->
      <div class="fireplace-center">
        <svg class="fireplace-svg" viewBox="0 0 400 400">
          <!-- 火塘底座（移到中心） -->
          <circle class="hearth-base" cx="200" cy="200" r="70" fill="none" stroke="currentColor" stroke-width="2" opacity="0.2"/>
          <circle class="hearth-inner" cx="200" cy="200" r="50" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.15"/>

          <!-- 火焰线条 -->
          <g class="flames">
            <line class="flame-line" v-for="i in 12" :key="i"
              x1="200" y1="180"
              :x2="180 + Math.random() * 40"
              :y2="80 + Math.random() * 60"
              stroke="currentColor"
              :stroke-width="1.5 + Math.random()"
              :opacity="0.4 + Math.random() * 0.4"
              :transform="`rotate(${(i - 1) * 15}, 200, 200)`"
            />
          </g>

          <!-- 四季标记（放在外围） -->
          <g class="seasons-markers">
            <!-- 春 -->
            <g class="season-marker" @click="selectSeason('spring')">
              <circle cx="200" cy="50" r="30" fill="none" stroke="#059669" stroke-width="2" opacity="0.6"/>
              <text x="200" y="55" text-anchor="middle" fill="#059669" font-size="14" font-family="Noto Serif SC">春</text>
            </g>
            <!-- 夏 -->
            <g class="season-marker" @click="selectSeason('summer')">
              <circle cx="350" cy="200" r="30" fill="none" stroke="#047857" stroke-width="2" opacity="0.6"/>
              <text x="350" y="205" text-anchor="middle" fill="#047857" font-size="14" font-family="Noto Serif SC">夏</text>
            </g>
            <!-- 秋 -->
            <g class="season-marker" @click="selectSeason('autumn')">
              <circle cx="200" cy="350" r="30" fill="none" stroke="#d97706" stroke-width="2" opacity="0.6"/>
              <text x="200" y="355" text-anchor="middle" fill="#d97706" font-size="14" font-family="Noto Serif SC">秋</text>
            </g>
            <!-- 冬 -->
            <g class="season-marker" @click="selectSeason('winter')">
              <circle cx="50" cy="200" r="30" fill="none" stroke="#9ca3af" stroke-width="2" opacity="0.6"/>
              <text x="50" y="205" text-anchor="middle" fill="#9ca3af" font-size="14" font-family="Noto Serif SC">冬</text>
            </g>
          </g>

          <!-- 中心文字 -->
          <text x="200" y="205" text-anchor="middle" fill="currentColor" font-size="16" font-family="Noto Serif SC" opacity="0.4">
            火塘
          </text>
        </svg>
      </div>

      <p class="fireplace-hint">点击四季，聆听故事</p>
    </div>

    <!-- 季节叙事页 -->
    <div v-else class="story-container">
      <button class="back-to-fireplace" @click="backToFireplace">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        <span>返回火塘</span>
      </button>

      <!-- 季节标题 -->
      <div class="season-header" :class="`season-${selectedSeason}`">
        <h2 class="season-title">{{ seasonInfo.name }}</h2>
        <p class="season-subtitle">{{ seasonInfo.desc }}</p>
      </div>

      <!-- 故事片段 -->
      <transition name="story-fade" mode="out-in">
        <div :key="currentStoryIndex" class="story-content">
          <!-- 几何装饰 -->
          <svg class="story-decoration" viewBox="0 0 200 200">
            <!-- 春：萌芽 -->
            <g v-if="selectedSeason === 'spring'">
              <circle cx="100" cy="100" r="15" fill="none" stroke="#059669" stroke-width="2" opacity="0.5"/>
              <circle cx="100" cy="100" r="8" fill="#059669" opacity="0.6"/>
              <line x1="100" y1="115" x2="100" y2="140" stroke="#059669" stroke-width="2" opacity="0.4"/>
              <line x1="85" y1="125" x2="70" y2="135" stroke="#059669" stroke-width="1.5" opacity="0.3"/>
              <line x1="115" y1="125" x2="130" y2="135" stroke="#059669" stroke-width="1.5" opacity="0.3"/>
            </g>
            <!-- 夏：繁茂 -->
            <g v-if="selectedSeason === 'summer'">
              <circle cx="60" cy="120" r="25" fill="none" stroke="#047857" stroke-width="2" opacity="0.4"/>
              <circle cx="100" cy="110" r="30" fill="none" stroke="#047857" stroke-width="2" opacity="0.5"/>
              <circle cx="140" cy="120" r="25" fill="none" stroke="#047857" stroke-width="2" opacity="0.4"/>
              <line x1="60" y1="145" x2="60" y2="170" stroke="#047857" stroke-width="2" opacity="0.3"/>
              <line x1="100" y1="140" x2="100" y2="170" stroke="#047857" stroke-width="2" opacity="0.3"/>
              <line x1="140" y1="145" x2="140" y2="170" stroke="#047857" stroke-width="2" opacity="0.3"/>
            </g>
            <!-- 秋：飘零 -->
            <g v-if="selectedSeason === 'autumn'">
              <ellipse cx="70" cy="90" rx="10" ry="5" fill="none" stroke="#d97706" stroke-width="1.5" opacity="0.5" transform="rotate(30, 70, 90)"/>
              <ellipse cx="100" cy="110" rx="12" ry="6" fill="none" stroke="#d97706" stroke-width="1.5" opacity="0.6" transform="rotate(-15, 100, 110)"/>
              <ellipse cx="130" cy="90" rx="10" ry="5" fill="none" stroke="#d97706" stroke-width="1.5" opacity="0.5" transform="rotate(45, 130, 90)"/>
              <path d="M70,100 Q85,80 100,90 T130,100" stroke="#d97706" stroke-width="1" fill="none" opacity="0.3"/>
            </g>
            <!-- 冬：寂静 -->
            <g v-if="selectedSeason === 'winter'">
              <circle cx="70" cy="80" r="3" fill="#9ca3af" opacity="0.6"/>
              <circle cx="100" cy="70" r="2" fill="#9ca3af" opacity="0.7"/>
              <circle cx="130" cy="80" r="3" fill="#9ca3af" opacity="0.6"/>
              <circle cx="85" cy="110" r="2" fill="#9ca3af" opacity="0.5"/>
              <circle cx="115" cy="110" r="2" fill="#9ca3af" opacity="0.5"/>
              <circle cx="100" cy="130" r="2" fill="#9ca3af" opacity="0.4"/>
              <line x1="70" y1="83" x2="70" y2="170" stroke="#9ca3af" stroke-width="0.5" opacity="0.2"/>
              <line x1="100" y1="72" x2="100" y2="170" stroke="#9ca3af" stroke-width="0.5" opacity="0.2"/>
              <line x1="130" y1="83" x2="130" y2="170" stroke="#9ca3af" stroke-width="0.5" opacity="0.2"/>
            </g>
          </svg>

          <p class="story-quote">"{{ currentStory.quote }}"</p>

          <p class="story-context">{{ currentStory.context }}</p>

          <!-- 进度点 -->
          <div class="story-progress">
            <span
              v-for="(story, index) in currentSeasonStories"
              :key="index"
              class="progress-dot"
              :class="{ active: currentStoryIndex === index }"
              @click="currentStoryIndex = index"
            ></span>
          </div>

          <button v-if="currentStoryIndex < currentSeasonStories.length - 1" class="next-story" @click="nextStory">
            继续讲述
          </button>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const showWarp = ref(true)
const selectedSeason = ref(null)
const currentStoryIndex = ref(0)

// 季节信息
const seasonInfo = computed(() => {
  const infoMap = {
    spring: { name: '春 · 起源', desc: '森林孕育了生命' },
    summer: { name: '夏 · 繁荣', desc: '氏族的黄金时代' },
    autumn: { name: '秋 · 变迁', desc: '现代文明的冲击' },
    winter: { name: '冬 · 告别', desc: '记忆在消逝中永存' }
  }
  return infoMap[selectedSeason.value] || {}
})

// 故事数据
const stories = {
  spring: [
    {
      quote: '我是雨和雪的老熟人了，我有90岁了。雨雪看老了我，我也把它们给看老了。',
      context: '一位鄂温克老人的自述，开启百年回忆。'
    },
    {
      quote: '我们那支鄂温克人藏在森林中，靠狩猎和饲养驯鹿为生，享受着大自然恩赐的一切。',
      context: '民族的起源，与森林共生的古老生活方式。'
    },
    {
      quote: '驯鹿离不开森林，就像我们离不开驯鹿。森林是我们的家，也是我们的神。',
      context: '人、驯鹿、森林的三位一体关系。'
    },
    {
      quote: '林克是我的第一个爱人，他在打猎时被熊咬死了。从此，我成了氏族中最会打猎的女人。',
      context: '爱情与死亡，在森林中淬炼出的坚韧。'
    }
  ],
  summer: [
    {
      quote: '部落的首领是我们氏族的心脏。他的萨满鼓一响，神灵就会降临。',
      context: '萨满文化的力量与神秘。'
    },
    {
      quote: '我们在撮罗子（帐篷）里围着火塘，听老人讲过去的故事。那些故事像火一样温暖。',
      context: '火塘边的口述传统，文化的传承。'
    },
    {
      quote: '那年夏天，日本人的汽车开进了森林。他们说，我们要文明，要下山。',
      context: '外部世界的第一次侵入，文明与野蛮的碰撞。'
    },
    {
      quote: '拉吉达微笑着说，我们的孩子会像驯鹿一样，在森林里自由奔跑。',
      context: '生命的延续，对未来的美好憧憬。'
    }
  ],
  autumn: [
    {
      quote: '山下的伐木声越来越响，森林在退缩。驯鹿没有苔藓可吃，一只只死去。',
      context: '现代文明的扩张，生态的破坏。'
    },
    {
      quote: '政府说，为了你们好，下山吧。山上有学校，有医院，有砖瓦房子。',
      context: '定居政策，美好承诺下的文化割裂。'
    },
    {
      quote: '我最后一次回到山上，看到我们曾经生活的地方，只剩下树桩。',
      context: '归乡，物是人非的苍凉。'
    },
    {
      quote: '我的族人有的下山了，有的死了，有的离开了。只有我，还在坚持。',
      context: '民族的离散，最后的坚守者。'
    }
  ],
  winter: [
    {
      quote: '下山后，我们住进了砖瓦房子。但我们的灵魂，还在森林里的撮罗子。',
      context: '身体的定居，灵魂的流浪。'
    },
    {
      quote: '孩子们说鄂温克语越来越少，他们说汉语，说普通话。',
      context: '语言的消失，文化传承的断裂。'
    },
    {
      quote: '我老了，但我还能听到驯鹿的铃声，在森林里回响。',
      context: '记忆的幻听，永不磨灭的乡愁。'
    },
    {
      quote: '这个故事，我讲了一辈子。现在，我把它讲给你们听。',
      context: '口述历史的完成，记忆的永恒保存。'
    }
  ]
}

const currentSeasonStories = computed(() => {
  return stories[selectedSeason.value] || []
})

const currentStory = computed(() => {
  return currentSeasonStories.value[currentStoryIndex.value] || {}
})

const selectSeason = (season) => {
  selectedSeason.value = season
  currentStoryIndex.value = 0
}

const backToFireplace = () => {
  selectedSeason.value = null
  currentStoryIndex.value = 0
}

const nextStory = () => {
  if (currentStoryIndex.value < currentSeasonStories.value.length - 1) {
    currentStoryIndex.value++
  }
}

const exitWorld = () => {
  router.push('/universe')
}

onMounted(() => {
  setTimeout(() => {
    showWarp.value = false
  }, 1800)
})
</script>

<style scoped>
.ergun-river-world {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #f7f5f2;
  overflow-y: auto;
  font-family: 'Noto Serif SC', serif;
}

/* === 跃迁动画 === */
.warp-overlay {
  position: fixed;
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

.warp-fire {
  position: relative;
  width: 200px;
  height: 200px;
}

.flame-particle {
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 4px;
  height: 4px;
  background: #d97706;
  border-radius: 50%;
  animation: flame-rise 1.5s ease-out infinite;
}

@keyframes flame-rise {
  0% {
    transform: translateX(-50%) translateY(0) scale(1);
    opacity: 0.8;
  }
  100% {
    transform: translateX(-50%) translateY(-150px) scale(0);
    opacity: 0;
  }
}

.warp-text {
  position: absolute;
  font-family: 'Noto Serif SC', serif;
  font-size: 0.9rem;
  letter-spacing: 0.5em;
  color: rgba(26, 26, 26, 0.8);
  animation: warp-fade 1.5s ease-out forwards;
}

@keyframes warp-fade {
  0% { opacity: 0; transform: translateY(20px); }
  50% { opacity: 1; transform: translateY(0); }
  100% { opacity: 0; }
}

/* === 返回按钮 === */
.exit-btn {
  position: fixed;
  top: 2rem;
  left: 2rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1.5rem;
  background: rgba(247, 245, 242, 0.9);
  backdrop-filter: blur(10px);
  border: 1px solid #1a1a1a;
  color: #1a1a1a;
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
  background: #1a1a1a;
  color: #f7f5f2;
  box-shadow: 0 0 30px rgba(26, 26, 26, 0.15);
  transform: translateX(-3px);
}

.exit-btn svg {
  width: 16px;
  height: 16px;
}

/* === 火塘主界面 === */
.fireplace-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8rem 2rem 4rem;
}

.fireplace-header {
  text-align: center;
  margin-bottom: 3rem;
}

.fireplace-title {
  font-family: 'Noto Serif SC', serif;
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  font-weight: 400;
  letter-spacing: 0.3em;
  color: #1a1a1a;
  margin: 0 0 1rem 0;
}

.fireplace-subtitle {
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  font-weight: 400;
  letter-spacing: 0.2em;
  color: rgba(26, 26, 26, 0.5);
  margin: 0;
}

.fireplace-center {
  width: 100%;
  max-width: 500px;
  margin: 2rem 0;
}

.fireplace-svg {
  width: 100%;
  height: auto;
}

.flame-line {
  animation: flame-dance 2s ease-in-out infinite alternate;
  transform-origin: 200px 280px;
}

@keyframes flame-dance {
  0% { opacity: 0.3; }
  100% { opacity: 0.7; }
}

.season-marker {
  cursor: pointer;
  transition: all 0.3s ease;
}

.season-marker:hover circle {
  r: 35;
  opacity: 1 !important;
}

.season-marker:hover text {
  font-size: 16;
  font-weight: 600;
}

.fireplace-hint {
  font-family: 'Inter', sans-serif;
  font-size: 0.65rem;
  font-weight: 400;
  letter-spacing: 0.15em;
  color: rgba(26, 26, 26, 0.4);
  margin: 2rem 0 0 0;
  text-transform: uppercase;
}

/* === 故事容器 === */
.story-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8rem 2rem 4rem;
}

.back-to-fireplace {
  position: fixed;
  top: 2rem;
  right: 2rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1.5rem;
  background: rgba(247, 245, 242, 0.9);
  backdrop-filter: blur(10px);
  border: 1px solid #1a1a1a;
  color: #1a1a1a;
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 3000;
}

.back-to-fireplace:hover {
  background: #1a1a1a;
  color: #f7f5f2;
  box-shadow: 0 0 30px rgba(26, 26, 26, 0.15);
  transform: translateX(3px);
}

.back-to-fireplace svg {
  width: 16px;
  height: 16px;
}

.season-header {
  text-align: center;
  margin-bottom: 3rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid;
}

.season-spring {
  border-color: #059669;
}

.season-summer {
  border-color: #047857;
}

.season-autumn {
  border-color: #d97706;
}

.season-winter {
  border-color: #9ca3af;
}

.season-title {
  font-family: 'Noto Serif SC', serif;
  font-size: clamp(1.5rem, 3.5vw, 2rem);
  font-weight: 400;
  letter-spacing: 0.25em;
  color: #1a1a1a;
  margin: 0 0 0.75rem 0;
}

.season-subtitle {
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  font-weight: 400;
  letter-spacing: 0.15em;
  color: rgba(26, 26, 26, 0.5);
  margin: 0;
  text-transform: uppercase;
}

.story-content {
  max-width: 700px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.story-decoration {
  width: 180px;
  height: 180px;
  margin-bottom: 2rem;
}

.story-quote {
  font-family: 'Noto Serif SC', serif;
  font-size: clamp(1.4rem, 3vw, 2rem);
  font-weight: 400;
  letter-spacing: 0.12em;
  line-height: 1.8;
  color: #1a1a1a;
  text-align: center;
  margin: 0 0 2rem 0;
}

.story-context {
  font-family: 'Noto Serif SC', serif;
  font-size: clamp(0.9rem, 2vw, 1.1rem);
  font-weight: 300;
  letter-spacing: 0.08em;
  line-height: 1.8;
  color: rgba(26, 26, 26, 0.6);
  text-align: center;
  margin: 0 0 2.5rem 0;
  max-width: 600px;
}

.story-progress {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 2rem;
}

.progress-dot {
  width: 8px;
  height: 8px;
  border: 1px solid rgba(26, 26, 26, 0.3);
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
}

.progress-dot:hover {
  transform: scale(1.2);
}

.progress-dot.active {
  background: #1a1a1a;
  border-color: #1a1a1a;
}

.next-story {
  padding: 0.875rem 2rem;
  background: transparent;
  border: 1px solid #1a1a1a;
  color: #1a1a1a;
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
}

.next-story:hover {
  background: #1a1a1a;
  color: #f7f5f2;
  box-shadow: 0 0 20px rgba(26, 26, 26, 0.1);
}

/* === 过渡动画 === */
.warp-enter-active,
.warp-leave-active {
  transition: opacity 0.5s ease;
}

.warp-enter-from,
.warp-leave-to {
  opacity: 0;
}

.story-fade-enter-active,
.story-fade-leave-active {
  transition: opacity 0.4s ease;
}

.story-fade-enter-from,
.story-fade-leave-to {
  opacity: 0;
}

/* === 响应式 === */
@media (max-width: 768px) {
  .fireplace-container,
  .story-container {
    padding: 6rem 1rem 2rem;
  }

  .fireplace-center {
    max-width: 100%;
  }

  .exit-btn {
    top: 1rem;
    left: 1rem;
    padding: 0.75rem 1.25rem;
    font-size: 0.65rem;
  }

  .back-to-fireplace {
    top: 1rem;
    right: 1rem;
    padding: 0.75rem 1.25rem;
    font-size: 0.65rem;
  }

  .story-decoration {
    width: 140px;
    height: 140px;
  }
}

@media (max-width: 480px) {
  .fireplace-title {
    font-size: 1.5rem;
  }

  .season-title {
    font-size: 1.3rem;
  }

  .story-quote {
    font-size: 1.2rem;
  }

  .story-context {
    font-size: 0.9rem;
  }
}
</style>

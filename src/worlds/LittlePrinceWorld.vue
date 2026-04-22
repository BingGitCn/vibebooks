<template>
  <div class="little-prince-world swiss-grid-pattern swiss-noise">
    <!-- Stars decoration -->
    <div class="stars-decoration"></div>

    <!-- EXIT button -->
    <button class="exit-btn swiss-hover-invert" @click="exitWorld">
      <span class="exit-arrow">←</span> EXIT
    </button>

    <!-- Header -->
    <header class="book-header swiss-border-bottom">
      <div class="header-content">
        <p class="book-vol">VOL.006</p>
        <h1 class="book-title">小王子</h1>
        <p class="book-subtitle">Le Petit Prince</p>
        <p class="book-author">安托万·德·圣埃克苏佩里 · 1943</p>
      </div>
      <div class="header-meta">
        <p class="meta-label">PHILOSOPHY</p>
        <p class="meta-years">LOVE & WISDOM</p>
      </div>
    </header>

    <!-- Section 01: FRIENDS -->
    <section class="section-friends swiss-border-bottom">
      <div class="section-header">
        <p class="section-number">SECTION 01</p>
        <h2 class="section-title">FRIENDS</h2>
        <p class="section-subtitle">Those We Meet Along the Way</p>
      </div>

      <div class="friends-grid">
        <EntityCard
          v-for="(friend, index) in friends"
          :key="index"
          :number="index + 1"
          :entity="friend"
          :is-expanded="expandedFriend === index"
          texture="swiss-dots"
          @click="toggleFriend(index)"
        />
      </div>
    </section>

    <!-- Section 02: PLANETS -->
    <section class="section-planets swiss-border-bottom">
      <div class="section-header">
        <p class="section-number">SECTION 02</p>
        <h2 class="section-title">PLANETS</h2>
        <p class="section-subtitle">A Journey Through the Universe</p>
      </div>

      <div class="planets-timeline">
        <div
          v-for="(planet, index) in planets"
          :key="index"
          class="planet-card swiss-border clickable"
          :class="{ expanded: expandedPlanet === index }"
          @click="togglePlanet(index)"
        >
          <div class="planet-header">
            <span class="planet-number">{{ String(index + 1).padStart(2, '0') }}</span>
            <h3 class="planet-name">{{ planet.name }}</h3>
            <span class="planet-tag">{{ planet.tag }}</span>
          </div>
          <div class="planet-content">
            <p class="planet-title">{{ planet.title }}</p>
            <p class="planet-desc">{{ planet.desc }}</p>
            <div class="planet-details" v-if="expandedPlanet === index">
              <div
                v-for="(detail, dIndex) in planet.details"
                :key="dIndex"
                class="detail-section"
              >
                <p class="detail-label">{{ detail.label }}</p>
                <p class="detail-text">{{ detail.text }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 03: WISDOM -->
    <section class="section-wisdom">
      <div class="section-header">
        <p class="section-number">SECTION 03</p>
        <h2 class="section-title">WISDOM</h2>
        <p class="section-subtitle">Secrets from the Little Prince</p>
      </div>

      <div class="wisdom-grid">
        <div
          v-for="(wisdom, index) in wisdoms"
          :key="index"
          class="wisdom-card swiss-border swiss-hover-accent"
        >
          <div class="wisdom-spine"></div>
          <div class="wisdom-border-top"></div>
          <p class="wisdom-text">{{ wisdom.text }}</p>
          <div class="wisdom-border-bottom"></div>
          <div class="wisdom-source">
            <span class="source-name">{{ wisdom.source }}</span>
            <span class="source-role">{{ wisdom.role }}</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useScrollToTop } from '@/composables/useScrollToTop'
import EntityCard from '@/components/world/EntityCard.vue'

const router = useRouter()

// 进入书籍页面时滚动到顶部
useScrollToTop()

const expandedFriend = ref(null)
const expandedPlanet = ref(null)

const exitWorld = () => {
  router.push('/yearbook/philosophy')
}

const toggleFriend = (index) => {
  if (expandedFriend.value === index) {
    expandedFriend.value = null
  } else {
    expandedFriend.value = index
    expandedPlanet.value = null
  }
}

const togglePlanet = (index) => {
  if (expandedPlanet.value === index) {
    expandedPlanet.value = null
  } else {
    expandedPlanet.value = index
    expandedFriend.value = null
  }
}

// Friends 数据 - 使用三级标签系统
const friends = [
  {
    name: '小王子',
    role: '来自 B-612 星球的旅行者',
    desc: '金发、围巾、44次日落',
    quote: '所有的大人都<br/>曾经是小孩<br/>虽然只有少数人记得',
    details: [
      {
        label: 'IDENTITY',
        text: '来自B-612小星球的旅行者，有着一头金发，总是围着一条黄色围巾。他深爱着他的玫瑰，却因为不懂得如何去爱而选择离开。'
      },
      {
        label: 'NATURE',
        text: '纯真、好奇、会问很多"为什么"。他不喜欢大人们的世界，因为大人们只关心数字、权力和虚荣。'
      },
      {
        label: 'MEANING',
        text: '代表纯真和童心，提醒我们不要在成长中失去最初的那份善良和好奇心。'
      }
    ]
  },
  {
    name: '玫瑰',
    role: '骄傲又脆弱的爱',
    desc: '四根刺、美丽、虚荣',
    quote: '我当然爱你<br/>没有让你感觉到<br/>是我的错',
    details: [
      {
        label: 'IDENTITY',
        text: 'B-612星球上唯一的玫瑰，美丽而骄傲。她有四根刺来保护自己，却掩饰不住内心的脆弱。'
      },
      {
        label: 'NATURE',
        text: '虚荣、骄傲、撒娇。她让小王子为她盖玻璃罩，为她浇水，却不懂得如何表达爱。'
      },
      {
        label: 'MEANING',
        text: '代表不完美但真实的爱。爱需要学习，需要用心去感受，而不是只用耳朵听。'
      }
    ]
  },
  {
    name: '狐狸',
    role: '驯养的智慧导师',
    desc: '秘密、责任、用心看',
    quote: '正是你为你的玫瑰<br/>花费的时间<br/>才使得她如此重要',
    details: [
      {
        label: 'IDENTITY',
        text: '地球上的智慧狐狸，教会了小王子什么是"驯养"。他说驯养就是建立联系，让彼此变得独一无二。'
      },
      {
        label: 'NATURE',
        text: '智慧、耐心、深刻。它教会小王子最重要的秘密："只有用心才能看清楚，本质的东西用眼睛是看不见的。"'
      },
      {
        label: 'MEANING',
        text: '代表智慧和爱的真谛。爱不是占有，而是建立联系，并永远为对方负责。'
      }
    ]
  },
  {
    name: '飞行员',
    role: '沙漠中的相遇者',
    desc: '叙述者、画家、孤独',
    quote: '我画画<br/>但大人不懂<br/>所以我不再画了',
    details: [
      {
        label: 'IDENTITY',
        text: '飞行员，飞机迫降在撒哈拉沙漠。在那里遇见了小王子，成为了唯一理解小王子的大人。'
      },
      {
        label: 'NATURE',
        text: '孤独、敏感、保有童心。小时候画过吞了elephant的蟒蛇，但大人只看到帽子。于是他放弃了画画。'
      },
      {
        label: 'MEANING',
        text: '代表那些还记得童年、还保有童心的大人。他是小王子与大人世界之间的桥梁。'
      }
    ]
  }
]

// Planets 数据 - 使用三级标签系统
const planets = [
  {
    name: 'B-612',
    tag: 'HOME',
    title: '家园与玫瑰',
    desc: '很小、有火山、玫瑰、猴面包树',
    details: [
      {
        label: 'ENVIRONMENT',
        text: 'B-612星球很小，只有两座活火山和一座死火山，每天可以看44次日落。那里还有可怕的猴面包树，必须及时清理。'
      },
      {
        label: 'ROSE',
        text: '星球上最美的花，也是唯一的玫瑰。她骄傲、虚荣、脆弱，却让小王子学会了什么是爱。'
      },
      {
        label: 'MEANING',
        text: '代表起点和归属。无论走多远，心中总有一个地方叫做家，那里有我们最珍视的东西。'
      }
    ]
  },
  {
    name: '小星球群',
    tag: 'ASTEROIDS',
    title: '大人们的荒诞世界',
    desc: '国王、爱慕虚荣的人、酒鬼、商人、点灯人、地理学家',
    details: [
      {
        label: 'KING',
        text: '统治一切，却没有任何臣民。代表权力的虚妄。'
      },
      {
        label: 'VAIN',
        text: '只听得进赞美。代表虚荣的空洞。'
      },
      {
        label: 'DRUNKARD',
        text: '为了忘记羞愧而喝酒。代表逃避的循环。'
      },
      {
        label: 'MEANING',
        text: '大人世界的荒诞映射。提醒我们不要成为只关心数字、权力和虚荣的大人。'
      }
    ]
  },
  {
    name: '地球',
    tag: 'DESTINY',
    title: '遇见狐狸，学会用心看',
    desc: '沙漠、玫瑰园、蛇、告别',
    details: [
      {
        label: 'SAHARA',
        text: '在沙漠中遇见飞行员，也遇见了狐狸。学会了什么是驯养，什么是用心去看。'
      },
      {
        label: 'GARDEN',
        text: '看到5000朵玫瑰，明白自己的玫瑰依然独一无二，因为"你为你的玫瑰花费了时间"。'
      },
      {
        label: 'MEANING',
        text: '地球是成长的终点，也是回归的起点。在这里，小王子学会了爱的真谛。'
      }
    ]
  }
]

// Wisdom 数据
const wisdoms = [
  {
    text: '只有用心才能看清楚，本质的东西用眼睛是看不见的',
    source: '狐狸',
    role: '秘密'
  },
  {
    text: '正是你为你的玫瑰花费的时间，才使得你的玫瑰变得如此重要',
    source: '狐狸',
    role: '驯养'
  },
  {
    text: '你要永远为你驯服的东西负责',
    source: '狐狸',
    role: '责任'
  },
  {
    text: '所有的大人都曾经是小孩，虽然只有少数人记得',
    source: '小王子',
    role: '成长'
  },
  {
    text: '星星发亮是为了让每个人有一天都能找到属于自己的星星',
    source: '小王子',
    role: '寻找'
  },
  {
    text: '如果你爱上了某个星球上的一朵花，那么只要在夜晚仰望星空，就会觉得漫天的繁星就像一朵朵盛开的花',
    source: '小王子',
    role: '爱'
  }
]
</script>

<style scoped>
.little-prince-world {
  min-height: 100vh;
  background: #FAFAFA;
  padding-left: 12rem;
  position: relative;
}

/* Stars Decoration */
.stars-decoration {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image:
    radial-gradient(2px 2px at 20px 30px, #d4a574, transparent),
    radial-gradient(2px 2px at 40px 70px, #d4a574, transparent),
    radial-gradient(1px 1px at 90px 40px, #d4a574, transparent),
    radial-gradient(2px 2px at 130px 80px, #d4a574, transparent),
    radial-gradient(1px 1px at 160px 120px, #d4a574, transparent),
    radial-gradient(2px 2px at 200px 50px, #d4a574, transparent),
    radial-gradient(1px 1px at 250px 160px, #d4a574, transparent),
    radial-gradient(2px 2px at 280px 90px, #d4a574, transparent),
    radial-gradient(1px 1px at 320px 140px, #d4a574, transparent),
    radial-gradient(2px 2px at 360px 60px, #d4a574, transparent);
  background-repeat: repeat;
  background-size: 400px 200px;
  opacity: 0.3;
  pointer-events: none;
  z-index: 0;
}

/* Exit Button */
.exit-btn {
  position: fixed;
  top: 2rem;
  left: 2rem;
  padding: 0.75rem 1.5rem;
  background: #1A1A1A;
  color: #FFFFFF;
  border: 2px solid #1A1A1A;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  z-index: 100;

  /* 克制感：快速动画 */
  transition: background-color 0.15s ease-out,
              color 0.15s ease-out;
}

.exit-btn:hover {
  background: #FFFFFF;
  color: #1A1A1A;
}

.exit-arrow {
  font-size: 1rem;
}

/* Header */
.book-header {
  padding: 4rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #1A1A1A;
  position: relative;
  z-index: 1;
}

.header-content {
  flex: 1;
}

.book-vol {
  font-family: 'Inter', sans-serif;
  font-weight: 900;
  font-size: 0.625rem;
  letter-spacing: 0.2em;
  color: #d4a574;
  margin: 0 0 1rem;
}

.book-title {
  font-family: 'Inter', sans-serif;
  font-weight: 900;
  font-size: clamp(2.5rem, 5vw, 4rem);
  letter-spacing: -0.03em;
  line-height: 1.1;
  margin: 0 0 0.5rem;
  color: #1A1A1A;
}

.book-subtitle {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 1.125rem;
  color: #666666;
  margin: 0 0 0.5rem;
  font-style: italic;
}

.book-author {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 0.875rem;
  color: #666666;
  margin: 0;
}

.header-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
}

.meta-label {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  color: #d4a574;
  background: #1A1A1A;
  padding: 0.5rem 1rem;
}

.meta-years {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 0.625rem;
  letter-spacing: 0.15em;
  color: #666666;
}

/* Section Headers */
.section-header {
  padding: 3rem 2rem 2rem;
  text-align: center;
  position: relative;
  z-index: 1;
}

.section-number {
  font-family: 'Inter', sans-serif;
  font-weight: 900;
  font-size: 0.875rem;
  letter-spacing: 0.2em;
  color: #d4a574;
  margin: 0 0 1rem;
}

.section-title {
  font-family: 'Inter', sans-serif;
  font-weight: 900;
  font-size: 2.5rem;
  letter-spacing: -0.03em;
  margin: 0 0 0.5rem;
  color: #1A1A1A;
}

.section-subtitle {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 0.875rem;
  letter-spacing: 0.25em;
  color: #666666;
  margin: 0;
}

/* Friends Grid */
.friends-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
  padding: 0 2rem 3rem;
  position: relative;
  z-index: 1;
}

/* Planets Section */
.planets-timeline {
  padding: 0 2rem 3rem;
  position: relative;
  z-index: 1;
}

.planet-card {
  background: #FFFFFF;
  border: 2px solid #1A1A1A;
  margin-bottom: 1.5rem;
  cursor: pointer;

  /* 克制感：快速动画 */
  transition: background-color 0.15s ease-out,
              border-color 0.15s ease-out;
}

.planet-card:last-child {
  margin-bottom: 0;
}

.planet-card:not(.expanded):hover {
  background: #d4a574;
  border-color: #d4a574;
}

.planet-card:not(.expanded):hover * {
  color: #FFFFFF;
}

.planet-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem 2rem;
  border-bottom: 2px solid #1A1A1A;
}

.planet-number {
  font-family: 'Inter', sans-serif;
  font-weight: 900;
  font-size: 1.5rem;
  letter-spacing: -0.03em;
  color: #d4a574;
}

.planet-name {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 1.25rem;
  letter-spacing: 0.05em;
  margin: 0;
  color: #1A1A1A;
  flex: 1;
}

.planet-tag {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  color: #d4a574;
  background: #F5F5F5;
  padding: 0.5rem 1rem;
}

.planet-content {
  padding: 2rem;
}

.planet-title {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 1.5rem;
  letter-spacing: 0.05em;
  margin: 0 0 0.5rem;
  color: #1A1A1A;
}

.planet-desc {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 0.875rem;
  color: #666666;
  margin: 0;
}

.planet-details {
  padding: 1.5rem 0 0;
  border-top: 2px solid #1A1A1A;
  margin-top: 1.5rem;
}

/* Wisdom Grid */
.wisdom-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  padding: 0 2rem 3rem;
  position: relative;
  z-index: 1;
}

.wisdom-card {
  background: #FFFFFF;
  padding: 2rem;
  position: relative;

  /* 克制感：移除花哨动画 */
  transition: background-color 0.15s ease-out,
              border-color 0.15s ease-out;
}

.wisdom-card:hover {
  background: #d4a574;
  border-color: #d4a574;
}

.wisdom-card:hover * {
  color: #FFFFFF !important;
}

.wisdom-spine {
  position: absolute;
  top: 0;
  left: 2rem;
  width: 4px;
  height: 100%;
  background: #d4a574;
}

.wisdom-border-top {
  height: 2px;
  background: #1A1A1A;
  margin-bottom: 1.5rem;
  margin-left: 1rem;
}

.wisdom-border-bottom {
  height: 2px;
  background: #1A1A1A;
  margin-top: 1.5rem;
  margin-left: 1rem;
}

.wisdom-text {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 0.9375rem;
  line-height: 1.7;
  color: #1A1A1A;
  margin: 0 0 1.5rem 1rem;
  padding-left: 1rem;
}

.wisdom-source {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.75rem;
  padding-left: 1rem;
  margin-left: 1rem;
}

.source-name {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: #1A1A1A;
}

.source-role {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  color: #666666;
}

/* Detail Sections */
.detail-section {
  margin-bottom: 1rem;
}

.detail-section:last-child {
  margin-bottom: 0;
}

.detail-label {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  color: #d4a574;
  margin: 0 0 0.5rem;
}

.detail-text {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1.6;
  color: #1A1A1A;
  margin: 0;
}

/* Swiss Style Utilities */
.swiss-border-bottom {
  border-bottom: 2px solid #1A1A1A;
}

.swiss-border {
  border: 2px solid #1A1A1A;
}

.swiss-hover-accent:hover {
  background: #d4a574;
  border-color: #d4a574;
}

.swiss-hover-accent:hover * {
  color: #FFFFFF;
}

.clickable {
  cursor: pointer;
}

/* Responsive */
@media (max-width: 1024px) {
  .little-prince-world {
    padding-left: 0;
  }

  .friends-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .wisdom-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .book-header {
    flex-direction: column;
    text-align: center;
  }

  .header-meta {
    align-items: center;
    margin-top: 1rem;
  }

  .friends-grid,
  .wisdom-grid {
    grid-template-columns: 1fr;
    padding: 1rem;
  }

  .planets-timeline {
    padding: 1rem;
  }

  .planet-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .planet-tag {
    align-self: flex-start;
  }
}
</style>

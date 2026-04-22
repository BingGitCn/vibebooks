<template>
  <div class="island-bookstore-world swiss-grid-pattern swiss-noise">
    <!-- Exit Button -->
    <button class="exit-btn swiss-hover-invert" @click="exitWorld">
      <span class="exit-arrow">←</span> EXIT
    </button>

    <!-- Header -->
    <header class="book-header swiss-border-bottom">
      <div class="header-content">
        <p class="book-vol">VOL.006</p>
        <h1 class="book-title">岛上书店</h1>
        <p class="book-subtitle">The Storied Life of A.J. Fikry</p>
        <p class="book-author">加布里·泽文 · 2014</p>
      </div>
      <div class="header-meta">
        <p class="meta-label">FICTION</p>
        <p class="meta-years">ISLAND BOOKSTORE</p>
      </div>
    </header>

    <!-- Section 01: Characters -->
    <section class="section-characters swiss-border-bottom">
      <div class="section-header">
        <p class="section-number">SECTION 01</p>
        <h2 class="section-title">CHARACTERS</h2>
        <p class="section-subtitle">People in the Story</p>
      </div>

      <div class="characters-grid">
        <EntityCard
          v-for="(character, index) in characters"
          :key="index"
          :number="index + 1"
          :entity="character"
          :is-expanded="expandedCharacter === index"
          texture="swiss-dots"
          @click="toggleCharacter(index)"
        />
      </div>
    </section>

    <!-- Section 02: Timeline -->
    <section class="section-timeline swiss-border-bottom">
      <div class="section-header">
        <p class="section-number">SECTION 02</p>
        <h2 class="section-title">TIMELINE</h2>
        <p class="section-subtitle">Story Progression</p>
      </div>

      <div class="timeline-events">
        <div
          v-for="(event, index) in timeline"
          :key="index"
          class="event-item clickable"
          :class="{ 'expanded': expandedEvent === index }"
          @click="toggleEvent(index)"
        >
          <p class="event-year">{{ event.year }}</p>
          <div class="event-content">
            <p class="event-title">{{ event.title }}</p>
            <p class="event-desc">{{ event.desc }}</p>
            <div class="event-details" v-if="expandedEvent === index">
              <div class="detail-section">
                <p class="detail-label">IDENTITY</p>
                <p class="detail-text">{{ event.details.plot }}</p>
              </div>
              <div class="detail-section">
                <p class="detail-label">EMOTION</p>
                <p class="detail-text">{{ event.details.emotion }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 03: Quotes -->
    <section class="section-quotes">
      <div class="section-header">
        <p class="section-number">SECTION 03</p>
        <h2 class="section-title">QUOTES</h2>
        <p class="section-subtitle">Words from the Book</p>
      </div>

      <div class="quotes-grid">
        <div
          v-for="(quote, index) in quotes"
          :key="index"
          class="quote-card swiss-border swiss-hover-accent"
        >
          <div class="quote-spine"></div>
          <div class="quote-border-top"></div>
          <p class="quote-text">{{ quote.text }}</p>
          <div class="quote-border-bottom"></div>
          <div class="quote-source">
            <span class="source-name">{{ quote.source }}</span>
            <span class="source-role">{{ quote.role }}</span>
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

// 展开状态
const expandedCharacter = ref(null)
const expandedEvent = ref(null)

const exitWorld = () => {
  router.push('/yearbook/fiction')
}

// 切换人物展开
const toggleCharacter = (index) => {
  if (expandedCharacter.value === index) {
    expandedCharacter.value = null
  } else {
    expandedCharacter.value = index
    expandedEvent.value = null
  }
}

// 切换事件展开
const toggleEvent = (index) => {
  if (expandedEvent.value === index) {
    expandedEvent.value = null
  } else {
    expandedEvent.value = index
    expandedCharacter.value = null
  }
}

// 人物数据 - 使用三级标签系统
const characters = [
  {
    name: 'A.J. 费克里',
    role: '书店老板',
    desc: '孤僻，爱书，不喜社交',
    quote: '我不喜欢人，<br/>我喜欢书',
    details: [
      {
        label: 'IDENTITY',
        text: '在妻子去世后，A.J. 关闭了自己的内心，将书店变成孤独的堡垒。他讨厌每个人，尤其是那些不读书的人。'
      },
      {
        label: 'NATURE',
        text: '孤僻、愤世嫉俗、内心温柔。他对书有着近乎偏执的热爱，认为书比人更可靠。'
      },
      {
        label: 'MEANING',
        text: '代表通过爱与被爱改变的可能性。他的转变展示了孤独的人如何通过联结重新找到生活的意义。'
      }
    ]
  },
  {
    name: '玛雅',
    role: '被遗弃的女孩',
    desc: '两岁，改变一切',
    quote: '我无法<br/>把她交给别人',
    details: [
      {
        label: 'IDENTITY',
        text: '一个周五的晚上，两岁的玛雅被母亲遗弃在书店，从此改变了A.J.的生活。她成长为一个爱读书、善解人意的女孩。'
      },
      {
        label: 'NATURE',
        text: '聪慧、敏感、善于观察。她像一束光照进了A.J.孤独的生活，让他学会了爱与责任。'
      },
      {
        label: 'MEANING',
        text: '代表无辜与希望。她的出现打破了A.J.的自我封闭，让书店成为连接社区情感的纽带。'
      }
    ]
  },
  {
    name: '阿米莉娅',
    role: '销售代表',
    desc: '热爱浪漫，不擅阅读',
    quote: '我们不只是<br/>在讨论书',
    details: [
      {
        label: 'IDENTITY',
        text: '出版社销售代表，最初与A.J. 因书的品味产生冲突。在多次冬夏书单推荐中，两人相爱并结婚。'
      },
      {
        label: 'NATURE',
        text: '热情、浪漫、固执。她热爱浪漫小说，虽然不擅长深度阅读，但对书有着真诚的热爱。'
      },
      {
        label: 'MEANING',
        text: '代表通过书建立的浪漫联结。她与A.J.的关系证明了对书的不同品味也可以成为爱情的桥梁。'
      }
    ]
  }
]

// 时间线数据 - 使用三级标签系统
const timeline = [
  {
    year: 'BEFORE',
    title: '孤独的书店',
    desc: 'A.J. 的妻子去世，他独自经营岛上书店，世界越来越小',
    details: {
      plot: 'A.J. 的妻子妮可因车祸去世。他变得消沉、酗酒，书店经营每况愈下。他计划卖掉珍本《帖木儿》，然后关掉书店。',
      emotion: '孤独、绝望、对生活的失去热情'
    }
  },
  {
    year: '01',
    title: '玛雅出现',
    desc: '一个周五的晚上，有人把两岁的玛雅留在书店，从此消失',
    details: {
      plot: '一个周五的晚上，A.J. 发现一个两岁的小女孩被留在书店，母亲自杀身亡。尽管最初想要报警，但他最终决定收养玛雅。',
      emotion: '意外、责任、生命的转折'
    }
  },
  {
    year: '02',
    title: '书店苏醒',
    desc: '岛上的居民开始因为玛雅聚集到书店，A.J. 被迫与人交流',
    details: {
      plot: '玛雅的到来改变了岛民对书店的看法。警察兰比亚斯、伊斯梅、出版社的人开始频繁造访。A.J. 被迫与人交流，书店成为社区中心。',
      emotion: '温暖、联结、社区的诞生'
    }
  },
  {
    year: '03',
    title: '阿米莉娅到来',
    desc: '出版社销售代表来推销冬季书单，两人因为书开始争论',
    details: {
      plot: '阿米莉娅作为出版社销售代表首次到访，试图推销冬季书单。两人因对书的品味不同而争论，但产生了微妙的吸引力。',
      emotion: '冲突、吸引、爱情的萌芽'
    }
  },
  {
    year: '04',
    title: '第二幕',
    desc: 'A.J. 和阿米莉娅结婚，玛雅长大，书店成为岛屿的文化中心',
    details: {
      plot: 'A.J. 和阿米莉娅结婚，玛雅在爱中成长。书店举办读书会、作者签售，成为岛屿的文化中心。A.J. 找到了生活的意义。',
      emotion: '幸福、圆满、爱的丰盈'
    }
  },
  {
    year: 'AFTER',
    title: '未完待续',
    desc: '即使生病，即使书店可能消失，爱与阅读让一切继续',
    details: {
      plot: '即使被诊断出脑瘤，A.J. 依然热爱着这个由书和人组成的世界。他的遗产不仅在于书店，更在于通过书连接的每一个生命。',
      emotion: '不舍、宁静、爱的延续'
    }
  }
]

// 金句数据
const quotes = [
  {
    text: '我们读书，因为我们孤单，我们不孤单，所以我们读书',
    source: 'A.J. 费克里',
    role: '书店老板'
  },
  {
    text: '没有一座岛屿是真正孤立的',
    source: 'A.J. 费克里',
    role: '第四章'
  },
  {
    text: '我们不只是在讨论书，我们是在通过书认识彼此',
    source: '阿米莉娅',
    role: '销售代表'
  },
  {
    text: '读书是一切，在你不再孤单之前，你不会知道读书的乐趣',
    source: 'A.J. 费克里',
    role: '第一章'
  },
  {
    text: '我们会成为我们所读之书，我们会成为我们爱的书',
    source: 'A.J. 费克里',
    role: '玛雅的养父'
  },
  {
    text: '一个好的故事不会因为被读完而消失',
    source: '书籍本身',
    role: '终章'
  }
]
</script>

<style scoped>
.island-bookstore-world {
  min-height: 100vh;
  background-color: var(--swiss-white);
}

/* Exit Button */
.exit-btn {
  position: fixed;
  top: 2rem;
  left: 2rem;
  padding: 0.75rem 1.5rem;
  background: var(--swiss-black);
  color: var(--swiss-white);
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  border: none;
  cursor: pointer;
  z-index: 100;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.exit-arrow {
  font-size: 1.25rem;
}

/* Book Header */
.book-header {
  padding: 6rem 2rem 3rem 2rem;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 4rem;
  align-items: center;
}

.book-vol {
  font-family: 'Inter', sans-serif;
  font-weight: 900;
  font-size: 0.875rem;
  letter-spacing: 0.2em;
  color: var(--swiss-accent);
  margin: 0 0 1rem 0;
}

.book-title {
  font-family: 'Inter', sans-serif;
  font-weight: 900;
  font-size: clamp(2.5rem, 5vw, 4rem);
  text-transform: uppercase;
  letter-spacing: -0.03em;
  line-height: 1;
  margin: 0 0 0.5rem 0;
}

.book-subtitle {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 1.125rem;
  font-style: italic;
  color: var(--swiss-text-secondary);
  margin: 0 0 0.5rem 0;
}

.book-author {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 0.875rem;
  letter-spacing: 0.1em;
  color: var(--swiss-text-secondary);
  margin: 0;
}

.header-meta {
  text-align: center;
}

.meta-label {
  font-family: 'Inter', sans-serif;
  font-weight: 900;
  font-size: 0.625rem;
  letter-spacing: 0.2em;
  color: var(--swiss-accent);
  margin: 0 0 0.5rem 0;
}

.meta-years {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  color: var(--swiss-text-secondary);
  margin: 0;
}

/* Section Headers */
.section-header {
  padding: 3rem 2rem 2rem 2rem;
}

.section-number {
  font-family: 'Inter', sans-serif;
  font-weight: 900;
  font-size: 0.875rem;
  letter-spacing: 0.2em;
  color: var(--swiss-accent);
  margin: 0 0 1rem 0;
}

.section-title {
  font-family: 'Inter', sans-serif;
  font-weight: 900;
  font-size: 2.5rem;
  text-transform: uppercase;
  letter-spacing: -0.03em;
  line-height: 1;
  margin: 0 0 0.5rem 0;
}

.section-subtitle {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 0.875rem;
  letter-spacing: 0.25em;
  color: var(--swiss-text-secondary);
  margin: 0;
}

/* Characters Section */
.characters-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
  padding-left: 12rem;
}

/* Timeline Section */
.timeline-events {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0;
  padding-left: 12rem;
}

.event-item {
  padding: 2.5rem 2rem;
  border-bottom: 1px solid var(--swiss-border);
  display: grid;
  grid-template-columns: 80px 1fr;
  gap: 1.5rem;
  align-items: start;
  position: relative;
  z-index: 10;

  /* 克制感：快速动画 */
  transition: background-color 0.15s ease-out;
}

.event-item.expanded {
  grid-template-columns: 80px 1fr;
  padding: 2.5rem 2rem;
  background-color: var(--swiss-muted);
}

.event-item:nth-child(odd) {
  border-right: 1px solid var(--swiss-border);
}

.event-item:not(.expanded):hover {
  background-color: var(--swiss-muted);
}

.event-year {
  font-family: 'Inter', sans-serif;
  font-weight: 900;
  font-size: 1rem;
  color: var(--swiss-accent);
  margin: 0;
}

.event-title {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 1.125rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0 0 0.5rem 0;
}

.event-desc {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1.6;
  color: var(--swiss-text-secondary);
  margin: 0;
}

/* Event Details */
.event-details {
  padding: 1.5rem 0 0 0;
  border-top: 2px solid var(--swiss-border);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* Detail Sections */
.detail-section {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.detail-label {
  font-family: 'Inter', sans-serif;
  font-weight: 900;
  font-size: 0.625rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--swiss-accent);
  margin: 0;
}

.detail-text {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1.5;
  color: var(--swiss-text-secondary);
  margin: 0;
}

/* Quotes Section - 书店主题设计 */
.quotes-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  padding-left: 12rem;
}

.quote-card {
  background-color: var(--swiss-white);
  padding: 2rem;
  position: relative;
  display: flex;
  flex-direction: column;

  /* 克制感：移除花哨动画 */
  transition: background-color 0.15s ease-out,
              border-color 0.15s ease-out;
}

/* Quote Spine - 书脊元素 */
.quote-spine {
  width: 12px;
  height: 16px;
  background-color: var(--swiss-accent);
  position: absolute;
  top: -1px;
  left: -1px;
}

/* 书脊线条 */
.quote-spine::before,
.quote-spine::after {
  content: '';
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 1px;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.5);
}

.quote-spine::before {
  left: 33%;
}

.quote-spine::after {
  left: 66%;
}

/* 渐变边框线 */
.quote-border-top {
  height: 2px;
  background: linear-gradient(90deg,
    var(--swiss-black) 0%,
    var(--swiss-accent) 50%,
    var(--swiss-black) 100%
  );
  margin: 0 0 1.5rem 0;
}

.quote-border-bottom {
  height: 2px;
  background: linear-gradient(90deg,
    var(--swiss-black) 0%,
    var(--swiss-accent) 50%,
    var(--swiss-black) 100%
  );
  margin: 1.5rem 0 1rem 0;
}

.quote-text {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 0.9375rem;
  line-height: 1.7;
  color: var(--swiss-black);
  margin: 0;
  flex: 1;
}

.quote-source {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding-top: 0.5rem;
  border-top: 1px solid var(--swiss-border);
}

.source-name {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--swiss-black);
  margin: 0;
}

.source-role {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 0.625rem;
  letter-spacing: 0.15em;
  color: var(--swiss-text-secondary);
}

/* Quote Hover - 克制感：只颜色反转 */
.quote-card:hover {
  background: var(--swiss-accent);
  border-color: var(--swiss-accent);
}

.quote-card:hover * {
  color: var(--swiss-white) !important;
}

/* Responsive */
@media (max-width: 1024px) {
  .book-header,
  .section-header,
  .characters-grid,
  .timeline-events,
  .quotes-grid {
    padding-left: 2rem;
  }

  .characters-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .quotes-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .event-item:nth-child(odd) {
    border-right: none;
  }

  .timeline-events {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .book-header {
    grid-template-columns: 1fr;
    padding: 4rem 1rem 2rem 1rem;
  }

  .header-meta {
    order: -1;
    margin-bottom: 1rem;
  }

  .section-header {
    padding: 2rem 1rem 1rem;
  }

  .characters-grid,
  .timeline-events,
  .quotes-grid {
    grid-template-columns: 1fr;
    padding: 1rem;
  }

  .event-item {
    grid-template-columns: 1fr;
    gap: 0.75rem;
    padding: 1.5rem 1rem;
  }

  .event-year {
    font-size: 0.875rem;
  }

  .quote-card {
    padding: 1.5rem;
  }

  .event-details {
    padding: 1rem 0 0 0;
  }

  .exit-btn {
    top: 1rem;
    left: 1rem;
    padding: 0.5rem 1rem;
    font-size: 0.65rem;
  }
}
</style>

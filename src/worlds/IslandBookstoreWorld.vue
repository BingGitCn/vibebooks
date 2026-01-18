<template>
  <div class="island-bookstore-world swiss-grid-pattern swiss-noise">
    <!-- Exit Button -->
    <button class="exit-btn swiss-hover-invert" @click="exitWorld">
      <span class="exit-arrow">←</span> EXIT
    </button>

    <!-- Main Container -->
    <div class="swiss-container">
      <!-- Header -->
      <header class="world-header swiss-border-bottom">
        <div class="header-left">
          <p class="volume-label">VOL.006</p>
          <h1 class="world-title">岛上书店</h1>
          <p class="world-subtitle">The Storied Life of A.J. Fikry</p>
        </div>
        <div class="header-right">
          <div class="archive-label">ARCHIVE 001</div>
        </div>
      </header>

      <!-- Content Area -->
      <main class="world-main">
        <!-- Section 01: Characters -->
        <section class="section-characters swiss-border-bottom">
          <div class="section-header">
            <p class="section-number">01</p>
            <h2 class="section-title">CHARACTERS</h2>
          </div>

          <div class="characters-grid">
            <!-- Character 1 -->
            <div class="character-card swiss-border swiss-hover-accent clickable" :class="{ 'expanded': expandedCharacter === 0 }" @click="toggleCharacter(0)">
              <div class="char-number">01</div>
              <div class="char-info">
                <h3 class="char-name">A.J. 费克里</h3>
                <p class="char-role">书店老板</p>
                <p class="char-desc">孤僻，爱书，不喜社交</p>
              </div>
              <div class="char-quote swiss-dots">
                "我不喜欢人，<br/>我喜欢书"
              </div>
              <!-- 展开的详细信息 -->
              <div class="char-details" v-if="expandedCharacter === 0">
                <div class="detail-section">
                  <p class="detail-label">性格</p>
                  <p class="detail-text">{{ characterDetails[0].personality }}</p>
                </div>
                <div class="detail-section">
                  <p class="detail-label">故事</p>
                  <p class="detail-text">{{ characterDetails[0].story }}</p>
                </div>
                <div class="detail-section">
                  <p class="detail-label">关系</p>
                  <p class="detail-text">{{ characterDetails[0].relationships }}</p>
                </div>
              </div>
            </div>

            <!-- Character 2 -->
            <div class="character-card swiss-border swiss-hover-accent clickable" :class="{ 'expanded': expandedCharacter === 1 }" @click="toggleCharacter(1)">
              <div class="char-number">02</div>
              <div class="char-info">
                <h3 class="char-name">玛雅</h3>
                <p class="char-role">被遗弃的女孩</p>
                <p class="char-desc">两岁，改变一切</p>
              </div>
              <div class="char-quote swiss-dots">
                "我无法<br/>把她交给别人"
              </div>
              <!-- 展开的详细信息 -->
              <div class="char-details" v-if="expandedCharacter === 1">
                <div class="detail-section">
                  <p class="detail-label">性格</p>
                  <p class="detail-text">{{ characterDetails[1].personality }}</p>
                </div>
                <div class="detail-section">
                  <p class="detail-label">故事</p>
                  <p class="detail-text">{{ characterDetails[1].story }}</p>
                </div>
                <div class="detail-section">
                  <p class="detail-label">关系</p>
                  <p class="detail-text">{{ characterDetails[1].relationships }}</p>
                </div>
              </div>
            </div>

            <!-- Character 3 -->
            <div class="character-card swiss-border swiss-hover-accent clickable" :class="{ 'expanded': expandedCharacter === 2 }" @click="toggleCharacter(2)">
              <div class="char-number">03</div>
              <div class="char-info">
                <h3 class="char-name">阿米莉娅</h3>
                <p class="char-role">销售代表</p>
                <p class="char-desc">热爱浪漫，不擅阅读</p>
              </div>
              <div class="char-quote swiss-diagonal">
                "我们不只是<br/>在讨论书"
              </div>
              <!-- 展开的详细信息 -->
              <div class="char-details" v-if="expandedCharacter === 2">
                <div class="detail-section">
                  <p class="detail-label">性格</p>
                  <p class="detail-text">{{ characterDetails[2].personality }}</p>
                </div>
                <div class="detail-section">
                  <p class="detail-label">故事</p>
                  <p class="detail-text">{{ characterDetails[2].story }}</p>
                </div>
                <div class="detail-section">
                  <p class="detail-label">关系</p>
                  <p class="detail-text">{{ characterDetails[2].relationships }}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Section 02: Timeline -->
        <section class="section-timeline swiss-border-bottom">
          <div class="section-header">
            <p class="section-number">02</p>
            <h2 class="section-title">TIMELINE</h2>
          </div>

          <div class="timeline-events">
            <div class="event-item clickable" :class="{ 'expanded': expandedEvent === 0 }" @click="toggleEvent(0)">
              <p class="event-year">BEFORE</p>
              <div class="event-content">
                <p class="event-title">孤独的书店</p>
                <p class="event-desc">A.J. 的妻子去世，他独自经营岛上书店，世界越来越小</p>
                <div class="event-details" v-if="expandedEvent === 0">
                  <div class="detail-section">
                    <p class="detail-label">情节</p>
                    <p class="detail-text">{{ eventDetails[0].plot }}</p>
                  </div>
                  <div class="detail-section">
                    <p class="detail-label">情感</p>
                    <p class="detail-text">{{ eventDetails[0].emotion }}</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="event-item clickable" :class="{ 'expanded': expandedEvent === 1 }" @click="toggleEvent(1)">
              <p class="event-year">01</p>
              <div class="event-content">
                <p class="event-title">玛雅出现</p>
                <p class="event-desc">一个周五的晚上，有人把两岁的玛雅留在书店，从此消失</p>
                <div class="event-details" v-if="expandedEvent === 1">
                  <div class="detail-section">
                    <p class="detail-label">情节</p>
                    <p class="detail-text">{{ eventDetails[1].plot }}</p>
                  </div>
                  <div class="detail-section">
                    <p class="detail-label">情感</p>
                    <p class="detail-text">{{ eventDetails[1].emotion }}</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="event-item clickable" :class="{ 'expanded': expandedEvent === 2 }" @click="toggleEvent(2)">
              <p class="event-year">02</p>
              <div class="event-content">
                <p class="event-title">书店苏醒</p>
                <p class="event-desc">岛上的居民开始因为玛雅聚集到书店，A.J. 被迫与人交流</p>
                <div class="event-details" v-if="expandedEvent === 2">
                  <div class="detail-section">
                    <p class="detail-label">情节</p>
                    <p class="detail-text">{{ eventDetails[2].plot }}</p>
                  </div>
                  <div class="detail-section">
                    <p class="detail-label">情感</p>
                    <p class="detail-text">{{ eventDetails[2].emotion }}</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="event-item clickable" :class="{ 'expanded': expandedEvent === 3 }" @click="toggleEvent(3)">
              <p class="event-year">03</p>
              <div class="event-content">
                <p class="event-title">阿米莉娅到来</p>
                <p class="event-desc">出版社销售代表来推销冬季书单，两人因为书开始争论</p>
                <div class="event-details" v-if="expandedEvent === 3">
                  <div class="detail-section">
                    <p class="detail-label">情节</p>
                    <p class="detail-text">{{ eventDetails[3].plot }}</p>
                  </div>
                  <div class="detail-section">
                    <p class="detail-label">情感</p>
                    <p class="detail-text">{{ eventDetails[3].emotion }}</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="event-item clickable" :class="{ 'expanded': expandedEvent === 4 }" @click="toggleEvent(4)">
              <p class="event-year">04</p>
              <div class="event-content">
                <p class="event-title">第二幕</p>
                <p class="event-desc">A.J. 和阿米莉娅结婚，玛雅长大，书店成为岛屿的文化中心</p>
                <div class="event-details" v-if="expandedEvent === 4">
                  <div class="detail-section">
                    <p class="detail-label">情节</p>
                    <p class="detail-text">{{ eventDetails[4].plot }}</p>
                  </div>
                  <div class="detail-section">
                    <p class="detail-label">情感</p>
                    <p class="detail-text">{{ eventDetails[4].emotion }}</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="event-item clickable" :class="{ 'expanded': expandedEvent === 5 }" @click="toggleEvent(5)">
              <p class="event-year">AFTER</p>
              <div class="event-content">
                <p class="event-title">未完待续</p>
                <p class="event-desc">即使生病，即使书店可能消失，爱与阅读让一切继续</p>
                <div class="event-details" v-if="expandedEvent === 5">
                  <div class="detail-section">
                    <p class="detail-label">情节</p>
                    <p class="detail-text">{{ eventDetails[5].plot }}</p>
                  </div>
                  <div class="detail-section">
                    <p class="detail-label">情感</p>
                    <p class="detail-text">{{ eventDetails[5].emotion }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Section 03: Quotes -->
        <section class="section-quotes">
          <div class="section-header">
            <p class="section-number">03</p>
            <h2 class="section-title">QUOTES</h2>
          </div>

          <div class="quotes-grid">
            <div class="quote-card">
              <div class="quote-spine"></div>
              <div class="quote-border-top"></div>
              <p class="quote-text">
                我们读书，因为我们孤单，我们不孤单，所以我们读书
              </p>
              <div class="quote-border-bottom"></div>
              <div class="quote-source">
                <span class="source-name">A.J. 费克里</span>
                <span class="source-role">书店老板</span>
              </div>
            </div>

            <div class="quote-card">
              <div class="quote-spine"></div>
              <div class="quote-border-top"></div>
              <p class="quote-text">
                没有一座岛屿是真正孤立的
              </p>
              <div class="quote-border-bottom"></div>
              <div class="quote-source">
                <span class="source-name">A.J. 费克里</span>
                <span class="source-role">第四章</span>
              </div>
            </div>

            <div class="quote-card">
              <div class="quote-spine"></div>
              <div class="quote-border-top"></div>
              <p class="quote-text">
                我们不只是在讨论书，我们是在通过书认识彼此
              </p>
              <div class="quote-border-bottom"></div>
              <div class="quote-source">
                <span class="source-name">阿米莉娅</span>
                <span class="source-role">销售代表</span>
              </div>
            </div>

            <div class="quote-card">
              <div class="quote-spine"></div>
              <div class="quote-border-top"></div>
              <p class="quote-text">
                读书是一切，在你不再孤单之前，你不会知道读书的乐趣
              </p>
              <div class="quote-border-bottom"></div>
              <div class="quote-source">
                <span class="source-name">A.J. 费克里</span>
                <span class="source-role">第一章</span>
              </div>
            </div>

            <div class="quote-card">
              <div class="quote-spine"></div>
              <div class="quote-border-top"></div>
              <p class="quote-text">
                我们会成为我们所读之书，我们会成为我们爱的书
              </p>
              <div class="quote-border-bottom"></div>
              <div class="quote-source">
                <span class="source-name">A.J. 费克里</span>
                <span class="source-role">玛雅的养父</span>
              </div>
            </div>

            <div class="quote-card">
              <div class="quote-spine"></div>
              <div class="quote-border-top"></div>
              <p class="quote-text">
                一个好的故事不会因为被读完而消失
              </p>
              <div class="quote-border-bottom"></div>
              <div class="quote-source">
                <span class="source-name">书籍本身</span>
                <span class="source-role">终章</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

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
    expandedEvent.value = null  // 关闭事件展开
  }
}

// 切换事件展开
const toggleEvent = (index) => {
  if (expandedEvent.value === index) {
    expandedEvent.value = null
  } else {
    expandedEvent.value = index
    expandedCharacter.value = null  // 关闭人物展开
  }
}

// 人物详细信息
const characterDetails = {
  0: {
    personality: '孤僻、愤世嫉俗、内心温柔',
    story: '在妻子去世后，A.J. 关闭了自己的内心，将书店变成孤独的堡垒。他讨厌每个人，尤其是那些不读书的人。',
    relationships: '亡妻妮可的回忆，玛雅的父亲，阿米莉娅的丈夫'
  },
  1: {
    personality: '聪慧、敏感、善于观察',
    story: '两岁的玛雅被母亲遗弃在书店，从此改变了A.J.的生活。她成长为一个爱读书、善解人意的女孩，最终进入哈佛大学。',
    relationships: 'A.J. 的养女，丹尼尔（生父）的女儿，伊斯梅的侄女'
  },
  2: {
    personality: '热情、浪漫、固执',
    story: '出版社销售代表，最初与A.J. 因书的品味产生冲突。在多次冬夏书单推荐中，两人相爱并结婚。',
    relationships: 'A.J. 的妻子，书商家庭的女儿'
  }
}

// 事件详细信息
const eventDetails = {
  0: {
    plot: 'A.J. 的妻子妮可因车祸去世。他变得消沉、酗酒，书店经营每况愈下。他计划卖掉珍本《帖木儿》，然后关掉书店。',
    emotion: '孤独、绝望、对生活的失去热情'
  },
  1: {
    plot: '一个周五的晚上，A.J. 发现一个两岁的小女孩被留在书店，母亲自杀身亡。尽管最初想要报警，但他最终决定收养玛雅。',
    emotion: '意外、责任、生命的转折'
  },
  2: {
    plot: '玛雅的到来改变了岛民对书店的看法。警察兰比亚斯、伊斯梅、出版社的人开始频繁造访。A.J. 被迫与人交流，书店成为社区中心。',
    emotion: '温暖、联结、社区的诞生'
  },
  3: {
    plot: '阿米莉娅作为出版社销售代表首次到访，试图推销冬季书单。两人因对书的品味不同而争论，但产生了微妙的吸引力。',
    emotion: '冲突、吸引、爱情的萌芽'
  },
  4: {
    plot: 'A.J. 和阿米莉娅结婚，玛雅在爱中成长。书店举办读书会、作者签售，成为岛屿的文化中心。A.J. 找到了生活的意义。',
    emotion: '幸福、圆满、爱的丰盈'
  },
  5: {
    plot: '即使被诊断出脑瘤，A.J. 依然热爱着这个由书和人组成的世界。他的遗产不仅在于书店，更在于通过书连接的每一个生命。',
    emotion: '不舍、宁静、爱的延续'
  }
}
</script>

<style scoped>
.island-bookstore-world {
  min-height: 100vh;
  background-color: var(--swiss-white);
  position: relative;
}

/* 确保噪点层不阻止点击 */
.island-bookstore-world::before {
  pointer-events: none !important;
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

/* Header */
.world-header {
  padding: 4rem 2rem;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 2rem;
  align-items: center;
}

.header-left {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.volume-label {
  font-family: 'Inter', sans-serif;
  font-weight: 900;
  font-size: 0.625rem;
  letter-spacing: 0.2em;
  color: var(--swiss-accent);
  margin: 0;
}

.world-title {
  font-family: 'Inter', sans-serif;
  font-weight: 900;
  font-size: clamp(3rem, 6vw, 5rem);
  text-transform: uppercase;
  letter-spacing: -0.03em;
  line-height: 1;
  margin: 0;
}

.world-subtitle {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 0.875rem;
  letter-spacing: 0.25em;
  color: var(--swiss-text-secondary);
  margin: 0;
}

.header-right {
  display: flex;
  align-items: center;
}

.archive-label {
  font-family: 'Inter', sans-serif;
  font-weight: 900;
  font-size: 0.625rem;
  letter-spacing: 0.2em;
  padding: 0.5rem 1rem;
  background: var(--swiss-black);
  color: var(--swiss-white);
}

/* Main Content */
.world-main {
  display: flex;
  flex-direction: column;
}

/* Section Headers */
.section-header {
  padding: 3rem 2rem 2rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.section-number {
  font-family: 'Inter', sans-serif;
  font-weight: 900;
  font-size: 4rem;
  line-height: 1;
  color: var(--swiss-accent);
  margin: 0;
}

.section-title {
  font-family: 'Inter', sans-serif;
  font-weight: 900;
  font-size: clamp(1.5rem, 3vw, 2rem);
  text-transform: uppercase;
  letter-spacing: 0.15em;
  margin: 0;
}

/* Characters Section */
.characters-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
}

.character-card {
  padding: 2rem;
  background: var(--swiss-white);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  transition: all 0.2s ease-out;
  position: relative;
  z-index: 10;
}

.character-card.expanded {
  min-height: auto;
}

.char-number {
  font-family: 'Inter', sans-serif;
  font-weight: 900;
  font-size: 2.5rem;
  line-height: 1;
  color: var(--swiss-accent);
}

.char-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.char-name {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 1.25rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0;
}

.char-role {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  color: var(--swiss-text-secondary);
  margin: 0;
}

.char-desc {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 0.875rem;
  color: var(--swiss-text-secondary);
  margin: 0;
  line-height: 1.5;
}

.char-quote {
  padding: 1.5rem;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 1rem;
  line-height: 1.4;
  color: var(--swiss-black);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

/* Character Details */
.char-details {
  padding: 1.5rem 0 0 0;
  border-top: 2px solid var(--swiss-border);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  animation: expand 0.3s ease-out;
}

@keyframes expand {
  from {
    opacity: 0;
    max-height: 0;
  }
  to {
    opacity: 1;
    max-height: 500px;
  }
}

/* Timeline Section */
.timeline-events {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0;
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
  transition: all 0.2s ease-out;
}

.event-item.expanded {
  grid-template-columns: 80px 1fr;
  padding: 2.5rem 2rem;
}

.event-item:nth-child(odd) {
  border-right: 1px solid var(--swiss-border);
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
  animation: expand 0.3s ease-out;
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
  padding: 2rem;
}

.quote-card {
  background-color: var(--swiss-white);
  border: 2px solid var(--swiss-black);
  padding: 2rem;
  position: relative;
  display: flex;
  flex-direction: column;
  transition: all 0.15s ease-out;
}

.quote-card:hover {
  border-color: var(--swiss-accent);
  transform: translateY(-2px);
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

.quote-accent {
  color: var(--swiss-accent);
}

/* Hover Effects */
.character-card:not(.expanded):hover {
  background: var(--swiss-accent);
  border-color: var(--swiss-accent);
}

.character-card:not(.expanded):hover .char-number,
.character-card:not(.expanded):hover .char-name,
.character-card:not(.expanded):hover .char-role,
.character-card:not(.expanded):hover .char-desc,
.character-card:not(.expanded):hover .char-quote {
  color: var(--swiss-white) !important;
}

/* Expanded state - 禁用 hover 效果 */
.character-card.expanded {
  background-color: var(--swiss-muted) !important;
  border-color: var(--swiss-black) !important;
}

.character-card.expanded .char-number {
  color: var(--swiss-accent) !important;
}

.character-card.expanded .char-name {
  color: var(--swiss-black) !important;
}

.character-card.expanded .char-role {
  color: var(--swiss-text-secondary) !important;
}

.character-card.expanded .char-desc {
  color: var(--swiss-text-secondary) !important;
}

.character-card.expanded .char-quote {
  color: var(--swiss-black) !important;
}

.character-card.expanded .detail-label {
  color: var(--swiss-accent) !important;
}

.character-card.expanded .detail-text {
  color: var(--swiss-text-secondary) !important;
}

.quote-card:hover {
  background: var(--swiss-accent);
  border-color: var(--swiss-accent);
}

.quote-card:hover * {
  color: var(--swiss-white) !important;
}

/* Expanded state */
.character-card.expanded,
.event-item.expanded {
  background-color: var(--swiss-muted);
}

/* Event hover */
.event-item:not(.expanded):hover {
  background-color: var(--swiss-muted);
}

.event-item.expanded:hover {
  background-color: var(--swiss-muted);
}

/* Responsive */
@media (max-width: 1024px) {
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

  .quote-card:nth-child(2),
  .quote-card:nth-child(4),
  .quote-card:nth-child(6) {
    border-left: 2px solid var(--swiss-border);
  }
}

@media (max-width: 768px) {
  .world-header {
    grid-template-columns: 1fr;
    padding: 2rem 1rem;
    gap: 1rem;
  }

  .header-right {
    display: none;
  }

  .world-title {
    font-size: 2.5rem;
  }

  .section-header {
    padding: 2rem 1rem 1rem;
  }

  .section-number {
    font-size: 3rem;
  }

  .characters-grid,
  .quotes-grid {
    grid-template-columns: 1fr;
  }

  .event-item {
    grid-template-columns: 1fr;
    gap: 0.75rem;
    padding: 1.5rem 1rem;
  }

  .event-year {
    font-size: 0.875rem;
  }

  .character-card,
  .quote-card {
    padding: 1.5rem;
  }

  .event-item {
    padding: 1.5rem 1rem;
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }

  .event-year {
    font-size: 0.875rem;
  }

  .char-details,
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

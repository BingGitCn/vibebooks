<template>
  <div class="norwegian-wood-world swiss-grid-pattern swiss-noise">
    <!-- Exit Button -->
    <button class="exit-btn swiss-hover-invert" @click="exitWorld">
      <span class="exit-arrow">←</span> EXIT
    </button>

    <!-- Book Header -->
    <header class="book-header swiss-border-bottom">
      <div class="header-content">
        <p class="book-vol">VOL.006</p>
        <h1 class="book-title">挪威的森林</h1>
        <p class="book-subtitle">青春、死亡与记忆的森林</p>
        <p class="book-author">村上春树 · 1987</p>
      </div>
      <div class="header-meta">
        <p class="meta-label">LOSS & LOVE</p>
        <p class="meta-years">1967-1969</p>
      </div>
    </header>

    <!-- Section 01: CHARACTERS -->
    <section class="section-characters swiss-border-bottom">
      <div class="section-header">
        <p class="section-number">SECTION 01</p>
        <h2 class="section-title">CHARACTERS</h2>
        <p class="section-subtitle">People in the Forest</p>
      </div>

      <div class="characters-grid">
        <!-- Character 1: 渡边 -->
        <div class="character-card swiss-border">
          <div class="char-number">01</div>
          <div class="char-icon char-icon-protagonist"></div>
          <div class="char-info">
            <h3 class="char-name">渡边彻</h3>
            <p class="char-role">主角 / 叙述者</p>
          </div>
          <div class="char-relationships">
            <p class="relationship">→ 直子：挚友的女友，后来的恋人</p>
            <p class="relationship">→ 绿子：充满活力的恋人</p>
            <p class="relationship">→ Kizuki：自杀的挚友</p>
          </div>
          <div class="char-quote">
            "死并非生的对立面，而是作为生的一部分永存。"
          </div>
        </div>

        <!-- Character 2: 直子 -->
        <div class="character-card swiss-border">
          <div class="char-number">02</div>
          <div class="char-icon char-icon-tragic"></div>
          <div class="char-info">
            <h3 class="char-name">直子</h3>
            <p class="char-role">渡边的初恋 / Kizuki的女友</p>
          </div>
          <div class="char-relationships">
            <p class="relationship">→ Kizuki：青梅竹马，恋人</p>
            <p class="relationship">→ 渡边：疗养院时期的恋人</p>
            <p class="relationship">→ 玲子：阿美寮的室友</p>
          </div>
          <div class="char-quote">
            "我希望你永远记得我，永远记得我这个人。"
          </div>
        </div>

        <!-- Character 3: 绿子 -->
        <div class="character-card swiss-border">
          <div class="char-number">03</div>
          <div class="char-icon char-icon-hope"></div>
          <div class="char-info">
            <h3 class="char-name">绿子</h3>
            <p class="char-role">渡边的恋人</p>
          </div>
          <div class="char-relationships">
            <p class="relationship">→ 渡边：大学相识，相恋</p>
            <p class="relationship">→ 父亲：书店老板，病逝</p>
            <p class="relationship">→ 姐姐：因癌症早逝</p>
          </div>
          <div class="char-quote">
            "你爱我吗？渡边，你真的爱我吗？"
          </div>
        </div>

        <!-- Character 4: 玲子 -->
        <div class="character-card swiss-border">
          <div class="char-number">04</div>
          <div class="char-icon char-icon-guide"></div>
          <div class="char-info">
            <h3 class="char-name">玲子</h3>
            <p class="char-role">阿美寮的病友 / 渡边的倾诉对象</p>
          </div>
          <div class="char-relationships">
            <p class="relationship">→ 直子：阿美寮的室友</p>
            <p class="relationship">→ 渡边：亦师亦友</p>
            <p class="relationship">→ 丈夫：因精神疾病分离</p>
          </div>
          <div class="char-quote">
            "只要你能真正爱自己，你就能爱任何人。"
          </div>
        </div>

        <!-- Character 5: Kizuki -->
        <div class="character-card swiss-border">
          <div class="char-number">05</div>
          <div class="char-icon char-icon-dead"></div>
          <div class="char-info">
            <h3 class="char-name">Kizuki</h3>
            <p class="char-role">渡边的挚友 / 直子的恋人</p>
          </div>
          <div class="char-relationships">
            <p class="relationship">→ 渡边：中学挚友</p>
            <p class="relationship">→ 直子：恋人</p>
            <p class="relationship">→ 17岁：自杀身亡</p>
          </div>
          <div class="char-quote">
            "他的死，是我们青春的开始。"
          </div>
        </div>
      </div>
    </section>

    <!-- Section 02: LOCATIONS -->
    <section class="section-locations swiss-border-bottom">
      <div class="section-header">
        <p class="section-number">SECTION 02</p>
        <h2 class="section-title">LOCATIONS</h2>
        <p class="section-subtitle">Places of Memory</p>
      </div>

      <div class="locations-grid">
        <!-- Location 1: 东京 -->
        <div class="location-card swiss-border">
          <div class="location-number">01</div>
          <div class="location-icon location-icon-tokyo"></div>
          <div class="location-info">
            <h3 class="location-name">东京</h3>
            <p class="location-period">1967-1969</p>
          </div>
          <div class="location-scenes">
            <p class="scene">• 大学：私立大学文学部</p>
            <p class="scene">• 地下爵士酒吧：渡边打工的地方</p>
            <p class="scene">• 直子公寓：与渡边同住过的房间</p>
            <p class="scene">• 绿子家的书店：充满生命力的地方</p>
          </div>
        </div>

        <!-- Location 2: 阿美寮 -->
        <div class="location-card swiss-border">
          <div class="location-number">02</div>
          <div class="location-icon location-icon-sanatorium"></div>
          <div class="location-info">
            <h3 class="location-name">阿美寮</h3>
            <p class="location-period">深山疗养院</p>
          </div>
          <div class="location-scenes">
            <p class="scene">• 位置：京都深山，与世隔绝</p>
            <p class="scene">• 疗法：谈话疗法 + 劳动</p>
            <p class="scene">• 直子住处：与玲子同室</p>
            <p class="scene">• 渡边探访：两次探望直子</p>
          </div>
        </div>

        <!-- Location 3: 京都 -->
        <div class="location-card swiss-border">
          <div class="location-number">03</div>
          <div class="location-icon location-icon-kyoto"></div>
          <div class="location-info">
            <h3 class="location-name">京都</h3>
            <p class="location-period">绿子的故乡</p>
          </div>
          <div class="location-scenes">
            <p class="scene">• 绿子的家：充满生活气息</p>
            <p class="scene">• 父亲的书店：文化气息</p>
            <p class="scene">• 火葬场：绿子父亲的葬礼</p>
            <p class="scene">• 电影院：渡边与绿子的约会</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 03: STATISTICS -->
    <section class="section-statistics swiss-border-bottom">
      <div class="section-header">
        <p class="section-number">SECTION 03</p>
        <h2 class="section-title">STATISTICS</h2>
        <p class="section-subtitle">Numbers in the Novel</p>
      </div>

      <div class="statistics-grid">
        <!-- Stat 1: Deaths -->
        <div
          class="stat-card swiss-border stat-death"
          :class="{ 'expanded': expandedStat === 'deaths' }"
          @click="toggleStat('deaths')"
        >
          <div class="stat-number">3</div>
          <p class="stat-label">DEATHS</p>
          <p class="stat-desc">重要角色的死亡</p>
          <div class="stat-details" v-if="expandedStat === 'deaths'">
            <div class="detail-item">
              <span class="detail-name">Kizuki</span>
              <span class="detail-age">17岁</span>
            </div>
            <div class="detail-item">
              <span class="detail-name">直子的姐姐</span>
              <span class="detail-age">18岁</span>
            </div>
            <div class="detail-item">
              <span class="detail-name">直子</span>
              <span class="detail-age">20岁</span>
            </div>
          </div>
        </div>

        <!-- Stat 2: Music -->
        <div
          class="stat-card swiss-border stat-music"
          :class="{ 'expanded': expandedStat === 'music' }"
          @click="toggleStat('music')"
        >
          <div class="stat-number">27+</div>
          <p class="stat-label">MUSIC</p>
          <p class="stat-desc">提及的音乐作品</p>
          <div class="stat-details" v-if="expandedStat === 'music'">
            <div class="detail-item">
              <span class="detail-name">Norwegian Wood</span>
              <span class="detail-info">The Beatles</span>
            </div>
            <div class="detail-item">
              <span class="detail-name">Yesterday</span>
              <span class="detail-info">The Beatles</span>
            </div>
            <div class="detail-item">
              <span class="detail-name">Ticket to Ride</span>
              <span class="detail-info">The Beatles</span>
            </div>
            <div class="detail-item">
              <span class="detail-name">...</span>
              <span class="detail-info">及其他 24+ 首</span>
            </div>
          </div>
        </div>

        <!-- Stat 3: Partners -->
        <div
          class="stat-card swiss-border stat-partners"
          :class="{ 'expanded': expandedStat === 'partners' }"
          @click="toggleStat('partners')"
        >
          <div class="stat-number">6</div>
          <p class="stat-label">PARTNERS</p>
          <p class="stat-desc">渡边的性伴侣</p>
          <div class="stat-details" v-if="expandedStat === 'partners'">
            <div class="detail-item">
              <span class="detail-name">初夜对象</span>
              <span class="detail-count">1次</span>
            </div>
            <div class="detail-item">
              <span class="detail-name">直子</span>
              <span class="detail-count">3次</span>
            </div>
            <div class="detail-item">
              <span class="detail-name">绿子</span>
              <span class="detail-count">多次</span>
            </div>
            <div class="detail-item">
              <span class="detail-name">玲子</span>
              <span class="detail-count">1次</span>
            </div>
            <div class="detail-item">
              <span class="detail-name">其他伴侣</span>
              <span class="detail-count">3人</span>
            </div>
          </div>
        </div>

        <!-- Stat 4: Word Count -->
        <div
          class="stat-card swiss-border stat-word"
          :class="{ 'expanded': expandedStat === 'word' }"
          @click="toggleStat('word')"
        >
          <div class="stat-number">147</div>
          <p class="stat-label">DEATH</p>
          <p class="stat-desc">"死"字出现次数</p>
          <div class="stat-details" v-if="expandedStat === 'word'">
            <div class="detail-item">
              <span class="detail-name">频率</span>
              <span class="detail-info">平均每 2000 字出现 1 次</span>
            </div>
            <div class="detail-item">
              <span class="detail-name">分布</span>
              <span class="detail-info">全书贯穿，后半部分更密集</span>
            </div>
          </div>
        </div>

        <!-- Stat 5: Locations -->
        <div
          class="stat-card swiss-border stat-locations"
          :class="{ 'expanded': expandedStat === 'locations' }"
          @click="toggleStat('locations')"
        >
          <div class="stat-number">8</div>
          <p class="stat-label">PLACES</p>
          <p class="stat-desc">主要场景地点</p>
          <div class="stat-details" v-if="expandedStat === 'locations'">
            <div class="detail-item">
              <span class="detail-name">东京</span>
              <span class="detail-info">大学、爵士酒吧、公寓</span>
            </div>
            <div class="detail-item">
              <span class="detail-name">阿美寮</span>
              <span class="detail-info">深山疗养院</span>
            </div>
            <div class="detail-item">
              <span class="detail-name">京都</span>
              <span class="detail-info">绿子的故乡</span>
            </div>
            <div class="detail-item">
              <span class="detail-name">...</span>
              <span class="detail-info">及其他 5 个地点</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 04: QUOTES -->
    <section class="section-quotes">
      <div class="section-header">
        <p class="section-number">SECTION 04</p>
        <h2 class="section-title">QUOTES</h2>
        <p class="section-subtitle">Words from the Forest</p>
      </div>

      <div class="quotes-grid">
        <div class="quote-card">
          <div class="quote-spine quote-spine-green"></div>
          <div class="quote-border-top"></div>
          <p class="quote-text">死并非生的对立面，而是作为生的一部分永存。</p>
          <div class="quote-border-bottom"></div>
          <div class="quote-source">
            <span class="source-name">渡边彻</span>
            <span class="source-role">第三章</span>
          </div>
        </div>

        <div class="quote-card">
          <div class="quote-spine quote-spine-green"></div>
          <div class="quote-border-top"></div>
          <p class="quote-text">每个人都在寻找自己的森林，有的人找到了，有的人永远在寻找。</p>
          <div class="quote-border-bottom"></div>
          <div class="quote-source">
            <span class="source-name">渡边彻</span>
            <span class="source-role">第七章</span>
          </div>
        </div>

        <div class="quote-card">
          <div class="quote-spine quote-spine-green"></div>
          <div class="quote-border-top"></div>
          <p class="quote-text">我不愿意那样，我想要你永远记得我，永远记得我这个人。</p>
          <div class="quote-border-bottom"></div>
          <div class="quote-source">
            <span class="source-name">直子</span>
            <span class="source-role">第四章</span>
          </div>
        </div>

        <div class="quote-card">
          <div class="quote-spine quote-spine-green"></div>
          <div class="quote-border-top"></div>
          <p class="quote-text">你爱我吗？渡边，你真的爱我吗？</p>
          <div class="quote-border-bottom"></div>
          <div class="quote-source">
            <span class="source-name">绿子</span>
            <span class="source-role">第九章</span>
          </div>
        </div>

        <div class="quote-card">
          <div class="quote-spine quote-spine-green"></div>
          <div class="quote-border-top"></div>
          <p class="quote-text">只要你能真正爱自己，你就能爱任何人。</p>
          <div class="quote-border-bottom"></div>
          <div class="quote-source">
            <span class="source-name">玲子</span>
            <span class="source-role">第六章</span>
          </div>
        </div>

        <div class="quote-card">
          <div class="quote-spine quote-spine-green"></div>
          <div class="quote-border-top"></div>
          <p class="quote-text">我们都在努力活着，不是吗？</p>
          <div class="quote-border-bottom"></div>
          <div class="quote-source">
            <span class="source-name">绿子</span>
            <span class="source-role">第十一章</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// State management
const expandedStat = ref(null)

// Toggle function
const toggleStat = (statKey) => {
  if (expandedStat.value === statKey) {
    expandedStat.value = null
  } else {
    expandedStat.value = statKey
  }
}

const exitWorld = () => {
  router.push('/yearbook/fiction')
}
</script>

<style scoped>
/* Main Container */
.norwegian-wood-world {
  min-height: 100vh;
  background-color: var(--swiss-white);
}

/* Exit Button */
.exit-btn {
  position: fixed;
  top: 2rem;
  left: 2rem;
  z-index: 100;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  padding: 0.75rem 1.5rem;
  background-color: var(--swiss-black);
  color: var(--swiss-white);
  border: 2px solid var(--swiss-black);
  cursor: pointer;
  transition: all 0.15s ease-out;
}

.exit-btn:hover {
  background-color: #2d5a27;
  border-color: #2d5a27;
}

.exit-arrow {
  margin-right: 0.5rem;
}

/* Book Header */
.book-header {
  padding: 6rem 2rem 3rem 2rem;
  margin-left: 10rem;
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
  color: #2d5a27;
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
  color: #2d5a27;
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
  color: #2d5a27;
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

/* Section 01: CHARACTERS */
.characters-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  padding: 2rem;
  padding-left: 12rem;
}

.character-card {
  padding: 2rem;
  background-color: var(--swiss-white);
  transition: all 0.15s ease-out;
}

.character-card:hover {
  background-color: #2d5a27;
  border-color: #2d5a27;
}

.character-card:hover .char-name,
.character-card:hover .char-role,
.character-card:hover .relationship,
.character-card:hover .char-quote {
  color: var(--swiss-white) !important;
}

.character-card:hover .char-icon::before {
  color: var(--swiss-white) !important;
}

.char-number {
  font-family: 'Inter', sans-serif;
  font-weight: 900;
  font-size: 0.625rem;
  letter-spacing: 0.2em;
  color: #2d5a27;
  margin: 0 0 1rem 0;
}

.char-icon {
  margin: 0 0 1.5rem 0;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Character Icons */
.char-icon-protagonist::before {
  content: '●';
  font-size: 40px;
  color: var(--swiss-black);
}

.char-icon-tragic::before {
  content: '○';
  font-size: 40px;
  color: var(--swiss-black);
}

.char-icon-hope::before {
  content: '◆';
  font-size: 36px;
  color: var(--swiss-black);
}

.char-icon-guide::before {
  content: '✦';
  font-size: 36px;
  color: var(--swiss-black);
}

.char-icon-dead::before {
  content: '✕';
  font-size: 36px;
  color: var(--swiss-black);
}

.char-info {
  margin: 0 0 1rem 0;
}

.char-name {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 1.125rem;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  line-height: 1.3;
  margin: 0 0 0.25rem 0;
  color: var(--swiss-black);
}

.char-role {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 0.75rem;
  font-style: italic;
  color: var(--swiss-text-secondary);
  margin: 0;
}

.char-relationships {
  margin: 0 0 1rem 0;
}

.relationship {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 0.8125rem;
  color: var(--swiss-text-secondary);
  margin: 0.25rem 0;
}

.char-quote {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.6;
  font-style: italic;
  color: var(--swiss-black);
  margin: 1rem 0 0 0;
  padding-top: 1rem;
  border-top: 1px solid var(--swiss-border);
}

/* Section 02: LOCATIONS */
.locations-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  padding: 2rem;
  padding-left: 12rem;
}

.location-card {
  padding: 2rem;
  background-color: var(--swiss-white);
  transition: all 0.15s ease-out;
}

.location-card:hover {
  background-color: #4a4a4a;
  border-color: #4a4a4a;
}

.location-card:hover .location-name,
.location-card:hover .location-period,
.location-card:hover .scene {
  color: var(--swiss-white) !important;
}

.location-card:hover .location-icon::before {
  color: var(--swiss-white) !important;
}

.location-number {
  font-family: 'Inter', sans-serif;
  font-weight: 900;
  font-size: 0.625rem;
  letter-spacing: 0.2em;
  color: #2d5a27;
  margin: 0 0 1rem 0;
}

.location-icon {
  margin: 0 0 1.5rem 0;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Location Icons */
.location-icon-tokyo::before {
  content: '▇';
  font-size: 36px;
  color: var(--swiss-black);
}

.location-icon-sanatorium::before {
  content: '△';
  font-size: 40px;
  color: var(--swiss-black);
}

.location-icon-kyoto::before {
  content: '◈';
  font-size: 36px;
  color: var(--swiss-black);
}

.location-info {
  margin: 0 0 1rem 0;
}

.location-name {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 1.125rem;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  line-height: 1.3;
  margin: 0 0 0.25rem 0;
  color: var(--swiss-black);
}

.location-period {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 0.75rem;
  font-style: italic;
  color: var(--swiss-text-secondary);
  margin: 0;
}

.location-scenes {
  margin: 1rem 0 0 0;
}

.scene {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 0.8125rem;
  color: var(--swiss-text-secondary);
  margin: 0.375rem 0;
}

/* Section 03: STATISTICS */
.statistics-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1.5rem;
  padding: 2rem;
  padding-left: 12rem;
}

.stat-card {
  padding: 2rem 1.5rem;
  background-color: var(--swiss-white);
  text-align: center;
  transition: all 0.15s ease-out;
}

.stat-card:hover {
  transform: translateY(-4px);
}

.stat-card.stat-death:hover {
  background-color: #2d5a27;
  border-color: #2d5a27;
}

.stat-card.stat-music:hover {
  background-color: #1a365d;
  border-color: #1a365d;
}

.stat-card.stat-partners:hover {
  background-color: #c53030;
  border-color: #c53030;
}

.stat-card.stat-word:hover {
  background-color: #553c9a;
  border-color: #553c9a;
}

.stat-card.stat-locations:hover {
  background-color: #2c5282;
  border-color: #2c5282;
}

.stat-card:hover .stat-number,
.stat-card:hover .stat-label,
.stat-card:hover .stat-desc {
  color: var(--swiss-white) !important;
}

.stat-number {
  font-family: 'Inter', sans-serif;
  font-weight: 900;
  font-size: 2.5rem;
  line-height: 1;
  margin: 0 0 0.5rem 0;
  color: var(--swiss-black);
}

.stat-label {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 0.625rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  margin: 0 0 0.25rem 0;
  color: #2d5a27;
}

.stat-desc {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 0.625rem;
  color: var(--swiss-text-secondary);
  margin: 0;
}

/* Expanded State */
.stat-card.expanded {
  grid-column: span 2;
  cursor: default;
  text-align: left;
  padding: 2rem;
}

.stat-card.expanded:hover {
  transform: none;
  background-color: var(--swiss-white) !important;
  border-color: var(--swiss-black) !important;
}

.stat-card.expanded:hover .stat-number,
.stat-card.expanded:hover .stat-label,
.stat-card.expanded:hover .stat-desc {
  color: var(--swiss-black) !important;
}

/* Expanded hover fix */
.stat-card.expanded:not(:hover) {
  transform: none;
}

.stat-card:not(.expanded):hover {
  cursor: pointer;
}

/* Stat Details */
.stat-details {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 2px solid var(--swiss-black);
}

.detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  gap: 1rem;
}

.detail-item:not(:last-child) {
  border-bottom: 1px solid var(--swiss-border);
}

.detail-name {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--swiss-black);
}

.detail-age,
.detail-info,
.detail-count {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 0.75rem;
  color: var(--swiss-text-secondary);
  text-align: right;
}

/* Section 04: QUOTES */
.section-quotes {
  padding: 2rem;
  padding-bottom: 4rem;
}

.quotes-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  padding: 2rem;
  padding-left: 12rem;
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
  border-color: #2d5a27;
  transform: translateY(-2px);
}

/* Quote Spine - Green Theme for Forest */
.quote-spine {
  width: 12px;
  height: 16px;
  background-color: #2d5a27;
  position: absolute;
  top: -1px;
  left: -1px;
}

.quote-spine-green {
  background-color: #2d5a27;
}

.quote-spine::before,
.quote-spine::after {
  content: '';
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 1px;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.3);
}

.quote-spine::before {
  left: 33%;
}

.quote-spine::after {
  left: 66%;
}

/* Gradient Border Lines */
.quote-border-top {
  height: 2px;
  background: linear-gradient(90deg,
    var(--swiss-black) 0%,
    #2d5a27 50%,
    var(--swiss-black) 100%
  );
  margin: 0 0 1.5rem 0;
}

.quote-border-bottom {
  height: 2px;
  background: linear-gradient(90deg,
    var(--swiss-black) 0%,
    #2d5a27 50%,
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
}

.source-role {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 0.625rem;
  letter-spacing: 0.15em;
  color: var(--swiss-text-secondary);
}

/* Responsive */
@media (max-width: 1024px) {
  .book-header,
  .section-header,
  .characters-grid,
  .locations-grid,
  .statistics-grid,
  .quotes-grid {
    margin-left: 0;
    padding-left: 2rem;
  }

  .characters-grid {
    grid-template-columns: 1fr;
  }

  .locations-grid {
    grid-template-columns: 1fr;
  }

  .statistics-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .stat-card.expanded {
    grid-column: span 3;
  }

  .quotes-grid {
    grid-template-columns: repeat(2, 1fr);
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

  .characters-grid,
  .locations-grid,
  .statistics-grid,
  .quotes-grid {
    grid-template-columns: 1fr;
    padding: 1rem;
  }

  .stat-card.expanded {
    grid-column: span 1;
  }
}
</style>

<template>
  <div class="night-submarine-world swiss-grid-pattern swiss-noise">
    <!-- Exit Button -->
    <button class="exit-btn swiss-hover-invert" @click="exitWorld">
      <span class="exit-arrow">←</span> EXIT
    </button>

    <!-- Book Header -->
    <header class="book-header swiss-border-bottom">
      <div class="header-content">
        <p class="book-vol">VOL.005</p>
        <h1 class="book-title">夜晚的潜水艇</h1>
        <p class="book-subtitle">夜晚的意识漫游</p>
        <p class="book-author">陈春成 · 2020</p>
      </div>
      <div class="header-meta">
        <p class="meta-label">IMAGINATION</p>
        <p class="meta-years">9 STORIES</p>
      </div>
    </header>

    <!-- Section 01: STORIES -->
    <section class="section-stories swiss-border-bottom">
      <div class="section-header">
        <p class="section-number">SECTION 01</p>
        <h2 class="section-title">STORIES</h2>
        <p class="section-subtitle">Nine Tales of Wonder</p>
      </div>

      <div class="stories-grid">
        <!-- Story 1: 夜晚的潜水艇 -->
        <div
          class="story-card swiss-border"
          :class="{ 'expanded': expandedStory === 0 }"
          @click="toggleStory(0)"
        >
          <div class="story-number">01</div>
          <div class="story-icon">
            <div class="submarine-window"></div>
          </div>
          <div class="story-info">
            <h3 class="story-name">夜晚的潜水艇</h3>
            <p class="story-desc">失眠少年在想象中操控潜水艇</p>
          </div>
          <div class="story-tags">
            <span class="tag">想象力</span>
            <span class="tag">童年</span>
          </div>

          <div class="story-details" v-if="expandedStory === 0">
            <div class="detail-section">
              <p class="detail-label">梗概</p>
              <p class="detail-text">{{ storyDetails[0].summary }}</p>
            </div>
            <div class="detail-section">
              <p class="detail-label">主题</p>
              <p class="detail-text">{{ storyDetails[0].theme }}</p>
            </div>
            <div class="detail-section">
              <p class="detail-label">金句</p>
              <p class="detail-quote">{{ storyDetails[0].quote }}</p>
            </div>
          </div>
        </div>

        <!-- Story 2: 竹峰寺 -->
        <div
          class="story-card swiss-border"
          :class="{ 'expanded': expandedStory === 1 }"
          @click="toggleStory(1)"
        >
          <div class="story-number">02</div>
          <div class="story-icon">
            <div class="temple-key"></div>
          </div>
          <div class="story-info">
            <h3 class="story-name">竹峰寺</h3>
            <p class="story-desc">藏经洞与被遗忘的记忆</p>
          </div>
          <div class="story-tags">
            <span class="tag">记忆</span>
            <span class="tag">遗忘</span>
          </div>

          <div class="story-details" v-if="expandedStory === 1">
            <div class="detail-section">
              <p class="detail-label">梗概</p>
              <p class="detail-text">{{ storyDetails[1].summary }}</p>
            </div>
            <div class="detail-section">
              <p class="detail-label">主题</p>
              <p class="detail-text">{{ storyDetails[1].theme }}</p>
            </div>
            <div class="detail-section">
              <p class="detail-label">金句</p>
              <p class="detail-quote">{{ storyDetails[1].quote }}</p>
            </div>
          </div>
        </div>

        <!-- Story 3: 传彩笔 -->
        <div
          class="story-card swiss-border"
          :class="{ 'expanded': expandedStory === 2 }"
          @click="toggleStory(2)"
        >
          <div class="story-number">03</div>
          <div class="story-icon">
            <div class="magic-quill"></div>
          </div>
          <div class="story-info">
            <h3 class="story-name">传彩笔</h3>
            <p class="story-desc">能写出完美文章的笔及其代价</p>
          </div>
          <div class="story-tags">
            <span class="tag">创作</span>
            <span class="tag">才华</span>
          </div>

          <div class="story-details" v-if="expandedStory === 2">
            <div class="detail-section">
              <p class="detail-label">梗概</p>
              <p class="detail-text">{{ storyDetails[2].summary }}</p>
            </div>
            <div class="detail-section">
              <p class="detail-label">主题</p>
              <p class="detail-text">{{ storyDetails[2].theme }}</p>
            </div>
            <div class="detail-section">
              <p class="detail-label">金句</p>
              <p class="detail-quote">{{ storyDetails[2].quote }}</p>
            </div>
          </div>
        </div>

        <!-- Story 4: 音乐家 -->
        <div
          class="story-card swiss-border"
          :class="{ 'expanded': expandedStory === 3 }"
          @click="toggleStory(3)"
        >
          <div class="story-number">04</div>
          <div class="story-icon">
            <div class="music-clock"></div>
          </div>
          <div class="story-info">
            <h3 class="story-name">音乐家</h3>
            <p class="story-desc">与时间抗争的艺术创作</p>
          </div>
          <div class="story-tags">
            <span class="tag">时间</span>
            <span class="tag">艺术</span>
          </div>

          <div class="story-details" v-if="expandedStory === 3">
            <div class="detail-section">
              <p class="detail-label">梗概</p>
              <p class="detail-text">{{ storyDetails[3].summary }}</p>
            </div>
            <div class="detail-section">
              <p class="detail-label">主题</p>
              <p class="detail-text">{{ storyDetails[3].theme }}</p>
            </div>
            <div class="detail-section">
              <p class="detail-label">金句</p>
              <p class="detail-quote">{{ storyDetails[3].quote }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 02: THEMES -->
    <section class="section-themes swiss-border-bottom">
      <div class="section-header">
        <p class="section-number">SECTION 02</p>
        <h2 class="section-title">THEMES</h2>
        <p class="section-subtitle">Core Ideas of the Book</p>
      </div>

      <div class="themes-grid">
        <div class="theme-card swiss-border">
          <div class="theme-icon theme-imagination"></div>
          <h3 class="theme-name">想象力</h3>
          <p class="theme-desc">想象是最自由的空间，可以突破现实的束缚</p>
        </div>

        <div class="theme-card swiss-border">
          <div class="theme-icon theme-memory"></div>
          <h3 class="theme-name">记忆与遗忘</h3>
          <p class="theme-desc">记忆需要被守护，遗忘是时间的必然</p>
        </div>

        <div class="theme-card swiss-border">
          <div class="theme-icon theme-creation"></div>
          <h3 class="theme-name">创作的代价</h3>
          <p class="theme-desc">才华与生命力之间的等价交换</p>
        </div>

        <div class="theme-card swiss-border">
          <div class="theme-icon theme-time"></div>
          <h3 class="theme-name">时间与艺术</h3>
          <p class="theme-desc">艺术在时间中凝固，时间在艺术中永存</p>
        </div>
      </div>
    </section>

    <!-- Section 03: QUOTES -->
    <section class="section-quotes">
      <div class="section-header">
        <p class="section-number">SECTION 03</p>
        <h2 class="section-title">QUOTES</h2>
        <p class="section-subtitle">Words from the Night</p>
      </div>

      <div class="quotes-grid">
        <div class="quote-card">
          <div class="quote-spine quote-spine-blue"></div>
          <div class="quote-border-top"></div>
          <p class="quote-text">想象不需要理由，它本身就是存在的理由</p>
          <div class="quote-border-bottom"></div>
          <div class="quote-source">
            <span class="source-name">夜晚的潜水艇</span>
            <span class="source-role">第一章</span>
          </div>
        </div>

        <div class="quote-card">
          <div class="quote-spine quote-spine-blue"></div>
          <div class="quote-border-top"></div>
          <p class="quote-text">所有被遗忘的，都藏在一个我们找不到的地方</p>
          <div class="quote-border-bottom"></div>
          <div class="quote-source">
            <span class="source-name">竹峰寺</span>
            <span class="source-role">第二章</span>
          </div>
        </div>

        <div class="quote-card">
          <div class="quote-spine quote-spine-blue"></div>
          <div class="quote-border-top"></div>
          <p class="quote-text">笔尖划过纸面的感觉，是世界上最美好的事情</p>
          <div class="quote-border-bottom"></div>
          <div class="quote-source">
            <span class="source-name">传彩笔</span>
            <span class="source-role">第三章</span>
          </div>
        </div>

        <div class="quote-card">
          <div class="quote-spine quote-spine-blue"></div>
          <div class="quote-border-top"></div>
          <p class="quote-text">时间可以带走一切，但带不走凝固在艺术中的瞬间</p>
          <div class="quote-border-bottom"></div>
          <div class="quote-source">
            <span class="source-name">音乐家</span>
            <span class="source-role">第四章</span>
          </div>
        </div>

        <div class="quote-card">
          <div class="quote-spine quote-spine-blue"></div>
          <div class="quote-border-top"></div>
          <p class="quote-text">故乡是每个人心中那个回不去的地方</p>
          <div class="quote-border-bottom"></div>
          <div class="quote-source">
            <span class="source-name">篇外</span>
            <span class="source-role">散文</span>
          </div>
        </div>

        <div class="quote-card">
          <div class="quote-spine quote-spine-blue"></div>
          <div class="quote-border-top"></div>
          <p class="quote-text">夜晚是最诚实的，它不掩饰任何东西</p>
          <div class="quote-border-bottom"></div>
          <div class="quote-source">
            <span class="source-name">夜晚的潜水艇</span>
            <span class="source-role">终章</span>
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
const expandedStory = ref(null)

// Toggle function
const toggleStory = (index) => {
  if (expandedStory.value === index) {
    expandedStory.value = null
  } else {
    expandedStory.value = index
  }
}

// Story details data
const storyDetails = {
  0: {
    summary: '一个失眠的少年，在夜晚的想象中构建并操控一艘潜水艇，在意识的深海中漫游，探索现实之外的可能性。',
    theme: '想象力是最自由的空间，它不受现实的束缚。童年的想象力尤为珍贵，但随着成长，我们逐渐失去了这种能力。',
    quote: '想象不需要理由，它本身就是存在的理由。在那个年纪，想象力是我们最强大的武器。'
  },
  1: {
    summary: '主人公回到故乡的竹峰寺，寻找传说中藏有经书的藏经洞。在寻找过程中，他思考了记忆、遗忘和守护的意义。',
    theme: '记忆需要被守护，而遗忘是时间的必然。我们用各种方式保存记忆，但有些东西终究会被时间带走。',
    quote: '所有被遗忘的，都藏在一个我们找不到的地方。也许有一天，我们会重新发现它们。'
  },
  2: {
    summary: '一支能写出完美文章的传彩笔，但它需要消耗使用者的生命力。作家在获得才华的同时，也在付出代价。',
    theme: '才华与生命力之间存在着等价交换。创作的灵感来自于生命本身，过度创作会耗尽一个人的生命力。',
    quote: '笔尖划过纸面的感觉，是世界上最美好的事情。但你必须知道，每一次书写都在消耗你的一部分。'
  },
  3: {
    summary: '一位音乐家试图与时间抗争，通过创作凝固那些稍纵即逝的美好瞬间。艺术成为了对抗时间流逝的武器。',
    theme: '时间可以带走一切，但艺术可以在时间中永存。创作的意义在于将那些美好的瞬间凝固，让它们超越时间的限制。',
    quote: '时间可以带走一切，但带不走凝固在艺术中的瞬间。当音乐响起时，时间仿佛停止了。'
  }
}

const exitWorld = () => {
  router.push('/yearbook/fiction')
}
</script>

<style scoped>
/* Main Container */
.night-submarine-world {
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
  background-color: var(--swiss-accent);
  border-color: var(--swiss-accent);
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

/* Section 01: STORIES */
.stories-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  padding: 2rem;
  padding-left: 12rem;
}

.story-card {
  cursor: pointer;
  transition: all 0.15s ease-out;
  padding: 2rem;
  background-color: var(--swiss-white);
  position: relative;
}

.story-card:not(.expanded):hover {
  background-color: var(--swiss-accent);
  border-color: var(--swiss-accent);
}

.story-card:not(.expanded):hover .story-number,
.story-card:not(.expanded):hover .story-name,
.story-card:not(.expanded):hover .story-desc,
.story-card:not(.expanded):hover .tag {
  color: var(--swiss-white) !important;
}

.story-card.expanded {
  background-color: var(--swiss-white) !important;
  border-color: var(--swiss-black) !important;
}

.story-number {
  font-family: 'Inter', sans-serif;
  font-weight: 900;
  font-size: 0.625rem;
  letter-spacing: 0.2em;
  color: var(--swiss-accent);
  margin: 0 0 1.5rem 0;
}

.story-icon {
  margin: 0 0 1.5rem 0;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Submarine Window */
.submarine-window {
  width: 40px;
  height: 40px;
  border: 3px solid var(--swiss-black);
  border-radius: 50%;
  position: relative;
}

.submarine-window::before {
  content: '';
  position: absolute;
  width: 8px;
  height: 8px;
  background-color: rgba(26, 26, 46, 0.2);
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* Temple Key */
.temple-key {
  width: 30px;
  height: 30px;
  border: 2px solid var(--swiss-black);
  position: relative;
}

.temple-key::before {
  content: '';
  position: absolute;
  width: 12px;
  height: 12px;
  border: 2px solid var(--swiss-black);
  border-radius: 50%;
  top: 6px;
  left: 50%;
  transform: translateX(-50%);
}

/* Magic Quill */
.magic-quill {
  width: 30px;
  height: 30px;
  position: relative;
}

.magic-quill::before {
  content: '';
  position: absolute;
  width: 3px;
  height: 30px;
  background-color: var(--swiss-black);
  left: 50%;
  transform: translateX(-50%) rotate(15deg);
}

.magic-quill::after {
  content: '';
  position: absolute;
  width: 10px;
  height: 10px;
  border: 2px solid var(--swiss-black);
  border-radius: 50%;
  top: 0;
  right: 5px;
}

/* Music Clock */
.music-clock {
  width: 30px;
  height: 30px;
  border: 2px solid var(--swiss-black);
  border-radius: 50%;
  position: relative;
}

.music-clock::before {
  content: '';
  position: absolute;
  width: 2px;
  height: 12px;
  background-color: var(--swiss-black);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.music-clock::after {
  content: '';
  position: absolute;
  width: 8px;
  height: 8px;
  background-color: var(--swiss-black);
  border-radius: 50%;
  top: 5px;
  left: 50%;
  transform: translateX(-50%);
}

/* Story Info */
.story-info {
  margin: 0 0 1rem 0;
}

.story-name {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 1.125rem;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  line-height: 1.3;
  margin: 0 0 0.5rem 0;
  color: var(--swiss-black);
}

.story-desc {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 0.875rem;
  color: var(--swiss-text-secondary);
  margin: 0;
}

/* Story Tags */
.story-tags {
  display: flex;
  gap: 0.5rem;
}

.tag {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 0.625rem;
  letter-spacing: 0.1em;
  padding: 0.25rem 0.5rem;
  border: 1px solid var(--swiss-black);
}

/* Story Details (Expanded) */
.story-details {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 2px solid var(--swiss-black);
}

.detail-section {
  margin: 0 0 1rem 0;
}

.detail-section:last-child {
  margin: 0;
}

.detail-label {
  font-family: 'Inter', sans-serif;
  font-weight: 900;
  font-size: 0.625rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--swiss-accent);
  margin: 0 0 0.5rem 0;
}

.detail-text {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1.6;
  color: var(--swiss-text-secondary);
  margin: 0;
}

.detail-quote {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.6;
  font-style: italic;
  color: var(--swiss-black);
  margin: 0;
}

/* Expanded hover fix */
.story-card.expanded:hover {
  background-color: var(--swiss-white) !important;
  border-color: var(--swiss-black) !important;
}

.story-card.expanded:hover .story-number,
.story-card.expanded:hover .story-name,
.story-card.expanded:hover .story-desc,
.story-card.expanded:hover .tag,
.story-card.expanded:hover .detail-label,
.story-card.expanded:hover .detail-text,
.story-card.expanded:hover .detail-quote {
  color: var(--swiss-black) !important;
}

.story-card.expanded:hover .story-desc,
.story-card.expanded:hover .detail-text {
  color: var(--swiss-text-secondary) !important;
}

/* Section 02: THEMES */
.themes-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  padding: 2rem;
  padding-left: 12rem;
}

.theme-card {
  padding: 2rem;
  background-color: var(--swiss-white);
  border: 2px solid var(--swiss-black);
  text-align: center;
  transition: all 0.15s ease-out;
}

.theme-card:hover {
  background-color: var(--swiss-accent);
  border-color: var(--swiss-accent);
}

.theme-card:hover .theme-name,
.theme-card:hover .theme-desc {
  color: var(--swiss-white) !important;
}

.theme-icon {
  width: 40px;
  height: 40px;
  margin: 0 auto 1rem;
  position: relative;
}

/* Theme Icons */
.theme-imagination::before {
  content: '✦';
  font-size: 32px;
  color: var(--swiss-black);
}

.theme-memory::before {
  content: '◯';
  font-size: 32px;
  color: var(--swiss-black);
}

.theme-creation::before {
  content: '✒';
  font-size: 28px;
  color: var(--swiss-black);
}

.theme-time::before {
  content: '◷';
  font-size: 32px;
  color: var(--swiss-black);
}

.theme-name {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  margin: 0 0 0.5rem 0;
  color: var(--swiss-black);
}

.theme-desc {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 0.75rem;
  line-height: 1.5;
  color: var(--swiss-text-secondary);
  margin: 0;
}

/* Section 03: QUOTES */
.section-quotes {
  padding: 2rem;
  padding-left: 12rem;
  padding-bottom: 4rem;
}

.quotes-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  padding: 2rem 0;
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

/* Quote Spine - Blue Theme for Night */
.quote-spine {
  width: 12px;
  height: 16px;
  background-color: #1a365d;
  position: absolute;
  top: -1px;
  left: -1px;
}

.quote-spine-blue {
  background-color: #1a365d;
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
    #1a365d 50%,
    var(--swiss-black) 100%
  );
  margin: 0 0 1.5rem 0;
}

.quote-border-bottom {
  height: 2px;
  background: linear-gradient(90deg,
    var(--swiss-black) 0%,
    #1a365d 50%,
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
  .stories-grid,
  .themes-grid,
  .section-quotes {
    margin-left: 0;
    padding-left: 2rem;
  }

  .stories-grid {
    grid-template-columns: 1fr;
  }

  .themes-grid {
    grid-template-columns: repeat(2, 1fr);
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

  .stories-grid,
  .themes-grid,
  .quotes-grid {
    grid-template-columns: 1fr;
    padding: 1rem;
  }
}
</style>

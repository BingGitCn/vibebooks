<template>
  <div class="grass-roots-world swiss-grid-pattern swiss-noise">
    <!-- EXIT button -->
    <button class="exit-btn swiss-hover-invert" @click="exitWorld">
      <span class="exit-arrow">←</span>
      EXIT
    </button>

    <!-- Header -->
    <header class="book-header swiss-border-bottom">
      <div class="header-content">
        <p class="book-vol">VOL.026</p>
        <h1 class="book-title">草民</h1>
        <p class="book-subtitle">Grass Roots</p>
        <p class="book-author">蔡崇达 · 2024</p>
      </div>
      <div class="header-meta">
        <p class="meta-label">FICTION</p>
        <p class="meta-years">SURVIVAL & DIGNITY</p>
      </div>
    </header>

    <!-- Section 01: CHARACTERS -->
    <section class="section-characters swiss-border-bottom">
      <div class="section-header">
        <p class="section-number">SECTION 01</p>
        <h2 class="section-title">PEOPLE</h2>
        <p class="section-subtitle">Grass Roots of Dongshi</p>
      </div>

      <div class="characters-grid">
        <!-- Character 1 -->
        <div
          class="character-card swiss-border swiss-hover-accent clickable"
          :class="{ expanded: expandedCharacter === 0 }"
          @click="toggleCharacter(0)"
        >
          <div class="char-number">01</div>
          <div class="char-info">
            <h3 class="char-name">曹操</h3>
            <p class="char-role">养猪的老人</p>
            <p class="char-desc">坚韧、固执、尊严</p>
          </div>
          <div class="char-quote swiss-dots">
            "人活着，<br/>就是要争口气"<br/>—曹操的坚持
          </div>
          <div class="char-details" v-if="expandedCharacter === 0">
            <div class="detail-section">
              <p class="detail-label">身份</p>
              <p class="detail-text">东石镇的养猪户，一生都在和猪打交道。性格固执，不服输，即使在最困难的时候也保持着尊严。</p>
            </div>
            <div class="detail-section">
              <p class="detail-label">故事</p>
              <p class="detail-text">养猪场遭遇困难，但他从不向命运低头。他说："草就是草，但也要活得像草的样子。"他的坚持和尊严，让所有人敬佩。</p>
            </div>
            <div class="detail-section">
              <p class="detail-label">意义</p>
              <p class="detail-text">代表底层人民的韧性——即使被生活压弯了腰，也要保持尊严和骨气。</p>
            </div>
          </div>
        </div>

        <!-- Character 2 -->
        <div
          class="character-card swiss-border swiss-hover-accent clickable"
          :class="{ expanded: expandedCharacter === 1 }"
          @click="toggleCharacter(1)"
        >
          <div class="char-number">02</div>
          <div class="char-info">
            <h3 class="char-name">秋姨</h3>
            <p class="char-role">守寡的女人</p>
            <p class="char-desc">善良、坚强、隐忍</p>
          </div>
          <div class="char-quote swiss-dots">
            "女人的命<br/>就像草一样<br/>风吹不倒"
          </div>
          <div class="char-details" v-if="expandedCharacter === 1">
            <div class="detail-section">
              <p class="detail-label">身份</p>
              <p class="detail-text">年轻守寡，独自抚养孩子长大。经历了无数苦难，但始终保持着善良和坚韧。</p>
            </div>
            <div class="detail-section">
              <p class="detail-label">故事</p>
              <p class="detail-text">丈夫早逝，她一个人撑起整个家。为了孩子，她什么苦都吃。她说："女人的命就像草，风一吹就倒，但根还在，又会站起来。"</p>
            </div>
            <div class="detail-section">
              <p class="detail-label">意义</p>
              <p class="detail-text">代表底层女性的伟大——在苦难中绽放的生命力，比任何花朵都美丽。</p>
            </div>
          </div>
        </div>

        <!-- Character 3 -->
        <div
          class="character-card swiss-border swiss-hover-accent clickable"
          :class="{ expanded: expandedCharacter === 2 }"
          @click="toggleCharacter(2)"
        >
          <div class="char-number">03</div>
          <div class="char-info">
            <h3 class="char-name">黑狗</h3>
            <p class="char-role">流浪的命运</p>
            <p class="char-desc">孤独、忠诚、守望</p>
          </div>
          <div class="char-quote swiss-dots">
            "狗比人<br/>更懂<br/>什么是家"
          </div>
          <div class="char-details" v-if="expandedCharacter === 2">
            <div class="detail-section">
              <p class="detail-label">角色</p>
              <p class="detail-text">一只流浪的黑狗，在东石镇游荡。它没有主人，却守护着这个镇子。</p>
            </div>
            <div class="detail-section">
              <p class="detail-label">故事</p>
              <p class="detail-text">黑狗见证了镇上所有的悲欢离合。它陪伴孤独的老人，守护迷路的孩子。人们说，黑狗就是镇子的魂。</p>
            </div>
            <div class="detail-section">
              <p class="detail-label">象征</p>
              <p class="detail-text">代表无声的陪伴和守护——即使在最底层，也有生命之间的温暖连接。</p>
            </div>
          </div>
        </div>

        <!-- Character 4 -->
        <div
          class="character-card swiss-border swiss-hover-accent clickable"
          :class="{ expanded: expandedCharacter === 3 }"
          @click="toggleCharacter(3)"
        >
          <div class="char-number">04</div>
          <div class="char-info">
            <h3 class="char-name">阿水</h3>
            <p class="char-role">离开的少年</p>
            <p class="char-desc">渴望、挣扎、成长</p>
          </div>
          <div class="char-quote swiss-dots">
            "我要去看看<br/>外面的世界<br/>然后再回来"
          </div>
          <div class="char-details" v-if="expandedCharacter === 3">
            <div class="detail-section">
              <p class="detail-label">身份</p>
              <p class="detail-text">东石镇长大的少年，渴望离开小镇去大城市闯荡。内心充满矛盾，既想逃离，又舍不得家乡。</p>
            </div>
            <div class="detail-section">
              <p class="detail-label">故事</p>
              <p class="detail-text">阿水最终离开了东石镇，去了大城市。他经历了失败和挫折，也找到了自己的路。他说："走出去是为了更好地回来。"</p>
            </div>
            <div class="detail-section">
              <p class="detail-label">意义</p>
              <p class="detail-text">代表年轻一代的挣扎——在故乡和远方之间寻找自己的位置。</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 02: STORIES -->
    <section class="section-stories swiss-border-bottom">
      <div class="section-header">
        <p class="section-number">SECTION 02</p>
        <h2 class="section-title">STORIES</h2>
        <p class="section-subtitle">Tales of Survival</p>
      </div>

      <div class="stories-list">
        <!-- Story 1 -->
        <div
          class="story-card swiss-border clickable"
          :class="{ expanded: expandedStory === 0 }"
          @click="toggleStory(0)"
        >
          <div class="story-header">
            <span class="story-number">01</span>
            <h3 class="story-title">猪的葬礼</h3>
            <span class="story-tag">DEATH</span>
          </div>
          <div class="story-preview">
            <p>一头猪的死亡，折射出生存的重量</p>
          </div>
          <div class="story-details" v-if="expandedStory === 0">
            <div class="detail-section">
              <p class="detail-label">情节</p>
              <p class="detail-text">曹操的猪场里，一头老猪死了。曹操为它举办了一场隆重的葬礼。村民们不理解，觉得一头猪而已，何必如此。</p>
            </div>
            <div class="detail-section">
              <p class="detail-label">情感</p>
              <p class="detail-text">但对曹操来说，这头猪陪伴了他十几年，见证了他所有的苦难和坚持。他说："它不是猪，它是我的家人。"</p>
            </div>
            <div class="detail-section">
              <p class="detail-label">意义</p>
              <p class="detail-text">在底层人民的生活中，每一个生命都值得尊重。哪怕是猪，也有它的尊严。</p>
            </div>
          </div>
        </div>

        <!-- Story 2 -->
        <div
          class="story-card swiss-border clickable"
          :class="{ expanded: expandedStory === 1 }"
          @click="toggleStory(1)"
        >
          <div class="story-header">
            <span class="story-number">02</span>
            <h3 class="story-title">台风夜</h3>
            <span class="story-tag">SURVIVAL</span>
          </div>
          <div class="story-preview">
            <p>台风来袭，全镇人共同抵御灾难</p>
          </div>
          <div class="story-details" v-if="expandedStory === 1">
            <div class="detail-section">
              <p class="detail-label">情节</p>
              <p class="detail-text">台风袭击东石镇，洪水涌入。村民们团结起来，共同抵御灾难。有人失去了家园，有人受了伤，但没有人放弃。</p>
            </div>
            <div class="detail-section">
              <p class="detail-label">情感</p>
              <p class="detail-text">灾难面前，人性的光辉闪闪发亮。那些平时有矛盾的人，此刻都成了彼此的依靠。</p>
            </div>
            <div class="detail-section">
              <p class="detail-label">意义</p>
              <p class="detail-text">底层人民的团结——在苦难中，他们比任何人都懂得守望相助。</p>
            </div>
          </div>
        </div>

        <!-- Story 3 -->
        <div
          class="story-card swiss-border clickable"
          :class="{ expanded: expandedStory === 2 }"
          @click="toggleStory(2)"
        >
          <div class="story-header">
            <span class="story-number">03</span>
            <h3 class="story-title">离乡</h3>
            <span class="story-tag">DEPARTURE</span>
          </div>
          <div class="story-preview">
            <p>年轻人离开家乡，寻找更好的生活</p>
          </div>
          <div class="story-details" v-if="expandedStory === 2">
            <div class="detail-section">
              <p class="detail-label">情节</p>
              <p class="detail-text">阿水和几个年轻人决定离开东石镇，去大城市闯荡。他们在村口告别，老人流泪，孩子不懂。</p>
            </div>
            <div class="detail-section">
              <p class="detail-label">情感</p>
              <p class="detail-text">离乡是痛苦的，也是必要的。他们带着对家乡的眷恋，也带着对未来的憧憬。</p>
            </div>
            <div class="detail-section">
              <p class="detail-label">意义</p>
              <p class="detail-text">时代的缩影——无数底层青年离开家乡，在城市中寻找自己的位置。</p>
            </div>
          </div>
        </div>

        <!-- Story 4 -->
        <div
          class="story-card swiss-border clickable"
          :class="{ expanded: expandedStory === 3 }"
          @click="toggleStory(3)"
        >
          <div class="story-header">
            <span class="story-number">04</span>
            <h3 class="story-title">归乡</h3>
            <span class="story-tag">RETURN</span>
          </div>
          <div class="story-preview">
            <p>在外漂泊的人，带着伤痕回来</p>
          </div>
          <div class="story-details" v-if="expandedStory === 3">
            <div class="detail-section">
              <p class="detail-label">情节</p>
              <p class="detail-text">几年后，阿水回到了东石镇。他失败了，但也成长了。他以为会被嘲笑，却发现家乡依然温暖地接纳了他。</p>
            </div>
            <div class="detail-section">
              <p class="detail-label">情感</p>
              <p class="detail-text">家乡永远在那里，等每一个游子归来。无论你在外经历了什么，家乡永远是避风港。</p>
            </div>
            <div class="detail-section">
              <p class="detail-label">意义</p>
              <p class="detail-text">归属感——在现代化的浪潮中，家乡依然是精神的根。</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 03: QUOTES -->
    <section class="section-quotes">
      <div class="section-header">
        <p class="section-number">SECTION 03</p>
        <h2 class="section-title">QUOTES</h2>
        <p class="section-subtitle">Voices from the Grass</p>
      </div>

      <div class="quotes-grid">
        <div class="quote-card">
          <div class="quote-spine"></div>
          <div class="quote-border-top"></div>
          <p class="quote-text">草就是草，活下去就是一切</p>
          <div class="quote-border-bottom"></div>
          <div class="quote-source">
            <span class="source-name">曹操</span>
            <span class="source-role">生存哲学</span>
          </div>
        </div>

        <div class="quote-card">
          <div class="quote-spine"></div>
          <div class="quote-border-top"></div>
          <p class="quote-text">人的命，就像草一样，风吹不倒，火烧不尽</p>
          <div class="quote-border-bottom"></div>
          <div class="quote-source">
            <span class="source-name">秋姨</span>
            <span class="source-role">关于韧性</span>
          </div>
        </div>

        <div class="quote-card">
          <div class="quote-spine"></div>
          <div class="quote-border-top"></div>
          <p class="quote-text">我们这些人，活着就是胜利</p>
          <div class="quote-border-bottom"></div>
          <div class="quote-source">
            <span class="source-name">东石镇人民</span>
            <span class="source-role">集体心声</span>
          </div>
        </div>

        <div class="quote-card">
          <div class="quote-spine"></div>
          <div class="quote-border-top"></div>
          <p class="quote-text">走出去是为了更好地回来</p>
          <div class="quote-border-bottom"></div>
          <div class="quote-source">
            <span class="source-name">阿水</span>
            <span class="source-role">关于故乡</span>
          </div>
        </div>

        <div class="quote-card">
          <div class="quote-spine"></div>
          <div class="quote-border-top"></div>
          <p class="quote-text">在这世上，最珍贵的不是金银，是人心</p>
          <div class="quote-border-bottom"></div>
          <div class="quote-source">
            <span class="source-name">老村长</span>
            <span class="source-role">人生感悟</span>
          </div>
        </div>

        <div class="quote-card">
          <div class="quote-spine"></div>
          <div class="quote-border-top"></div>
          <p class="quote-text">草虽然卑微，但铺成大地就是绿洲</p>
          <div class="quote-border-bottom"></div>
          <div class="quote-source">
            <span class="source-name">蔡崇达</span>
            <span class="source-role">题眼</span>
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
const expandedCharacter = ref(null)
const expandedStory = ref(null)

const exitWorld = () => {
  router.push('/yearbook/fiction')
}

const toggleCharacter = (index) => {
  if (expandedCharacter.value === index) {
    expandedCharacter.value = null
  } else {
    expandedCharacter.value = index
    expandedStory.value = null
  }
}

const toggleStory = (index) => {
  if (expandedStory.value === index) {
    expandedStory.value = null
  } else {
    expandedStory.value = index
    expandedCharacter.value = null
  }
}
</script>

<style scoped>
.grass-roots-world {
  min-height: 100vh;
  background: #FAFAFA;
  padding-left: 12rem;
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
  transition: all 0.15s ease-out;
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
}

.header-content {
  flex: 1;
}

.book-vol {
  font-family: 'Inter', sans-serif;
  font-weight: 900;
  font-size: 0.625rem;
  letter-spacing: 0.2em;
  color: #7a9a6a;
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
  color: #7a9a6a;
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
}

.section-number {
  font-family: 'Inter', sans-serif;
  font-weight: 900;
  font-size: 0.875rem;
  letter-spacing: 0.2em;
  color: #7a9a6a;
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

/* Characters Grid */
.characters-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
  padding: 0 2rem 3rem;
}

.character-card {
  padding: 2rem;
  background: #FFFFFF;
  border: 2px solid #1A1A1A;
  cursor: pointer;
  transition: all 0.15s ease-out;
}

.character-card:not(.expanded):hover {
  background: #7a9a6a;
  border-color: #7a9a6a;
}

.character-card:not(.expanded):hover * {
  color: #FFFFFF;
}

.char-number {
  font-family: 'Inter', sans-serif;
  font-weight: 900;
  font-size: 2rem;
  letter-spacing: -0.03em;
  color: #7a9a6a;
  margin-bottom: 1rem;
}

.char-info {
  margin-bottom: 1.5rem;
}

.char-name {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 1.25rem;
  letter-spacing: 0.05em;
  margin: 0 0 0.5rem;
  color: #1A1A1A;
}

.char-role {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  color: #666666;
  margin: 0 0 0.5rem;
}

.char-desc {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 0.875rem;
  color: #999999;
  margin: 0;
}

.char-quote {
  padding: 1.5rem;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  color: #1A1A1A;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-image: radial-gradient(circle, #7a9a6a 1px, transparent 1px);
  background-size: 8px 8px;
}

.char-details {
  padding: 1.5rem 0;
  border-top: 2px solid #1A1A1A;
  margin-top: 1.5rem;
}

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
  color: #7a9a6a;
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

/* Stories Section */
.stories-list {
  padding: 0 2rem 3rem;
}

.story-card {
  background: #FFFFFF;
  border: 2px solid #1A1A1A;
  margin-bottom: 1.5rem;
  cursor: pointer;
  transition: all 0.15s ease-out;
}

.story-card:last-child {
  margin-bottom: 0;
}

.story-card:not(.expanded):hover {
  background: #7a9a6a;
  border-color: #7a9a6a;
}

.story-card:not(.expanded):hover * {
  color: #FFFFFF;
}

.story-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem 2rem;
  border-bottom: 2px solid #1A1A1A;
}

.story-number {
  font-family: 'Inter', sans-serif;
  font-weight: 900;
  font-size: 1.5rem;
  letter-spacing: -0.03em;
  color: #7a9a6a;
}

.story-title {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 1.25rem;
  letter-spacing: 0.05em;
  margin: 0;
  color: #1A1A1A;
  flex: 1;
}

.story-tag {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  color: #7a9a6a;
  background: #F5F5F5;
  padding: 0.5rem 1rem;
}

.story-preview {
  padding: 1.5rem 2rem;
}

.story-preview p {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 0.875rem;
  color: #666666;
  margin: 0;
}

.story-details {
  padding: 1.5rem 2rem;
  border-top: 2px solid #1A1A1A;
}

/* Quotes Grid */
.quotes-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  padding: 0 2rem 3rem;
}

.quote-card {
  background: #FFFFFF;
  border: 2px solid #1A1A1A;
  padding: 2rem;
  position: relative;
  transition: all 0.15s ease-out;
}

.quote-card:hover {
  border-color: #7a9a6a;
  transform: translateY(-2px);
}

.quote-spine {
  position: absolute;
  top: 0;
  left: 2rem;
  width: 4px;
  height: 100%;
  background: #7a9a6a;
}

.quote-border-top {
  height: 2px;
  background: #1A1A1A;
  margin-bottom: 1.5rem;
  margin-left: 1rem;
}

.quote-border-bottom {
  height: 2px;
  background: #1A1A1A;
  margin-top: 1.5rem;
  margin-left: 1rem;
}

.quote-text {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 0.9375rem;
  line-height: 1.7;
  color: #1A1A1A;
  margin: 0 0 1.5rem 1rem;
  padding-left: 1rem;
}

.quote-source {
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

/* Swiss Style Utilities */
.swiss-border-bottom {
  border-bottom: 2px solid #1A1A1A;
}

.swiss-border {
  border: 2px solid #1A1A1A;
}

.swiss-hover-invert:hover {
  background: #FFFFFF;
  color: #1A1A1A;
}

.swiss-hover-accent:hover {
  background: #7a9a6a;
  border-color: #7a9a6a;
}

.swiss-hover-accent:hover * {
  color: #FFFFFF;
}

.swiss-dots {
  background-image: radial-gradient(circle, #7a9a6a 1px, transparent 1px);
  background-size: 8px 8px;
}

.swiss-grid-pattern {
  background-image:
    linear-gradient(rgba(0, 0, 0, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 0, 0, 0.03) 1px, transparent 1px);
  background-size: 20px 20px;
}

.swiss-noise::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E");
  pointer-events: none;
  opacity: 0.5;
}

.clickable {
  cursor: pointer;
}

/* Responsive */
@media (max-width: 1024px) {
  .grass-roots-world {
    padding-left: 0;
  }

  .characters-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .quotes-grid {
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

  .characters-grid,
  .quotes-grid {
    grid-template-columns: 1fr;
    padding: 1rem;
  }

  .stories-list {
    padding: 1rem;
  }

  .story-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .story-tag {
    align-self: flex-start;
  }
}
</style>

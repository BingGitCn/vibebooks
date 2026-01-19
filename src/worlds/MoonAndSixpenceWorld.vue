<template>
  <div class="moon-sixpence-world swiss-grid-pattern swiss-noise">
    <!-- Exit Button -->
    <button class="exit-btn swiss-hover-invert" @click="exitToYearbook">
      <span class="exit-arrow">←</span> EXIT
    </button>

    <!-- Header -->
    <header class="book-header swiss-border-bottom">
      <div class="header-content">
        <p class="book-vol">VOL.018</p>
        <h1 class="book-title">月亮与六便士</h1>
        <p class="book-subtitle">The Moon and Sixpence</p>
        <p class="book-author">威廉·萨默塞特·毛姆 · 1919</p>
      </div>
      <div class="header-meta">
        <p class="meta-label">FICTION</p>
        <p class="meta-years">ART VS REALITY</p>
      </div>
    </header>

    <!-- Section 01: Characters -->
    <section class="section-characters swiss-border-bottom">
      <div class="section-header">
        <p class="section-number">SECTION 01</p>
        <h2 class="section-title">CHARACTERS</h2>
        <p class="section-subtitle">Four Souls in the Story</p>
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
            <h3 class="char-name">思特里克兰德</h3>
            <p class="char-role">疯狂的天才画家</p>
            <p class="char-desc">冷漠、自私、天才</p>
          </div>
          <div class="char-quote swiss-dots">
            "我必须画画，<br/>就像溺水的人<br/>必须挣扎"
          </div>
          <div v-if="expandedCharacter === 0" class="char-details">
            <div class="detail-section">
              <p class="detail-label">身份</p>
              <p class="detail-text">伦敦证券经纪人，中年突然抛妻弃子去巴黎追求绘画，最终在塔希提岛创作出不朽作品。</p>
            </div>
            <div class="detail-section">
              <p class="detail-label">性格</p>
              <p class="detail-text">对艺术有近乎神性的执着，不在乎社会规则和他人感受，不被世俗理解。</p>
            </div>
            <div class="detail-section">
              <p class="detail-label">命运</p>
              <p class="detail-text">患麻风病双目失明后仍在墙上创作，临终前要求烧毁所有作品。</p>
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
            <h3 class="char-name">叙述者"我"</h3>
            <p class="char-role">年轻作家，观察者</p>
            <p class="char-desc">从不理解到震撼</p>
          </div>
          <div class="char-quote swiss-dots">
            "天才<br/>是孤独的"
          </div>
          <div v-if="expandedCharacter === 1" class="char-details">
            <div class="detail-section">
              <p class="detail-label">身份</p>
              <p class="detail-text">年轻作家，通过朋友关系认识思特里克兰德，全程追踪他的经历。</p>
            </div>
            <div class="detail-section">
              <p class="detail-label">态度</p>
              <p class="detail-text">起初不理解，逐渐被艺术天才震撼，最终理解了艺术创作的神性力量。</p>
            </div>
            <div class="detail-section">
              <p class="detail-label">意义</p>
              <p class="detail-text">代表普通读者的视角，展现天才与凡人的距离。</p>
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
            <h3 class="char-name">德克·斯特罗夫</h3>
            <p class="char-role">平庸但善良的画家</p>
            <p class="char-desc">最早发现天才</p>
          </div>
          <div class="char-quote swiss-dots">
            "我理解<br/>他的天才"
          </div>
          <div v-if="expandedCharacter === 2" class="char-details">
            <div class="detail-section">
              <p class="detail-label">身份</p>
              <p class="detail-text">荷兰画家，技法平庸但心地善良，最早发现思特里克兰德的天才。</p>
            </div>
            <div class="detail-section">
              <p class="detail-label">悲剧</p>
              <p class="detail-text">妻子被思特里克兰德吸引后离开他并自杀。斯特罗夫仍然宽恕。</p>
            </div>
            <div class="detail-section">
              <p class="detail-label">意义</p>
              <p class="detail-text">代表庸才对天才的膜拜，以及善良在天才面前的无力与悲壮。</p>
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
            <h3 class="char-name">塔希提土著女孩</h3>
            <p class="char-role">最后的伴侣</p>
            <p class="char-desc">原始、自然、包容</p>
          </div>
          <div class="char-quote swiss-dots">
            "我不懂<br/>艺术，但我<br/>懂他"
          </div>
          <div v-if="expandedCharacter === 3" class="char-details">
            <div class="detail-section">
              <p class="detail-label">身份</p>
              <p class="detail-text">塔希提岛土著女孩，成为思特里克兰德最后的伴侣。</p>
            </div>
            <div class="detail-section">
              <p class="detail-label">关系</p>
              <p class="detail-text">她不理解艺术，但理解思特里克兰德的灵魂需求，给他自由和安宁。</p>
            </div>
            <div class="detail-section">
              <p class="detail-label">意义</p>
              <p class="detail-text">代表原始、自然、包容的环境，是天才得以最后绽放的土壤。</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 02: Geographies -->
    <section class="section-geographies swiss-border-bottom">
      <div class="section-header">
        <p class="section-number">SECTION 02</p>
        <h2 class="section-title">GEOGRAPHIES</h2>
        <p class="section-subtitle">Three Spiritual Transformations</p>
      </div>
      <div class="geographies-list">
        <!-- Geography 1 -->
        <div
          class="geography-card swiss-border swiss-hover-accent clickable"
          :class="{ expanded: expandedGeography === 0 }"
          @click="toggleGeography(0)"
        >
          <div class="geo-number">01</div>
          <div class="geo-content">
            <h3 class="geo-name">伦敦</h3>
            <p class="geo-name-en">LONDON</p>
            <p class="geo-theme">世俗牢笼</p>
            <div class="geo-meta">
              <span class="meta-tag">🏛️ 社会规训</span>
              <span class="meta-tag">💼 证券经纪人</span>
              <span class="meta-tag">👨‍👩‍👧‍👦 中产家庭</span>
            </div>
          </div>
          <div v-if="expandedGeography === 0" class="geo-details">
            <div class="detail-block">
              <p class="detail-label">精神状态</p>
              <p class="detail-text">被社会规则、家庭责任、物质追求所困，过着世俗眼中"成功"但空虚的生活。</p>
            </div>
            <div class="detail-block">
              <p class="detail-label">关键事件</p>
              <p class="detail-text">突然离开妻子和孩子，留下一张纸条说"去巴黎追求艺术"。</p>
            </div>
            <div class="detail-block">
              <p class="detail-label">象征意义</p>
              <p class="detail-text">代表六便士的世界——世俗、平庸、充满社会规训的理想牢笼。</p>
            </div>
          </div>
        </div>

        <!-- Geography 2 -->
        <div
          class="geography-card swiss-border swiss-hover-accent clickable"
          :class="{ expanded: expandedGeography === 1 }"
          @click="toggleGeography(1)"
        >
          <div class="geo-number">02</div>
          <div class="geo-content">
            <h3 class="geo-name">巴黎</h3>
            <p class="geo-name-en">PARIS</p>
            <p class="geo-theme">欲望觉醒</p>
            <div class="geo-meta">
              <span class="meta-tag">🎨 贫穷艺术家</span>
              <span class="meta-tag">😫 挣扎</span>
              <span class="meta-tag">🔥 艺术召唤</span>
            </div>
          </div>
          <div v-if="expandedGeography === 1" class="geo-details">
            <div class="detail-block">
              <p class="detail-label">精神状态</p>
              <p class="detail-text">摆脱家庭和社会责任，陷入贫穷和孤独，但艺术创造力开始爆发。</p>
            </div>
            <div class="detail-block">
              <p class="detail-label">关键事件</p>
              <p class="detail-text">住廉价旅馆，拒绝帮助，近乎疯狂地创作，与斯特罗夫夫妇发生悲剧纠葛。</p>
            </div>
            <div class="detail-block">
              <p class="detail-label">象征意义</p>
              <p class="detail-text">代表理想与现实撕裂的过渡地带——痛苦但真实，艺术觉醒的必经之路。</p>
            </div>
          </div>
        </div>

        <!-- Geography 3 -->
        <div
          class="geography-card swiss-border swiss-hover-accent clickable"
          :class="{ expanded: expandedGeography === 2 }"
          @click="toggleGeography(2)"
        >
          <div class="geo-number">03</div>
          <div class="geo-content">
            <h3 class="geo-name">塔希提</h3>
            <p class="geo-name-en">TAHITI</p>
            <p class="geo-theme">精神乌托邦</p>
            <div class="geo-meta">
              <span class="meta-tag">🌴 原始自由</span>
              <span class="meta-tag">🎨 不朽创作</span>
              <span class="meta-tag">✨ 灵魂解放</span>
            </div>
          </div>
          <div v-if="expandedGeography === 2" class="geo-details">
            <div class="detail-block">
              <p class="detail-label">精神状态</p>
              <p class="detail-text">完全摆脱欧洲文明束缚，在原始自然中获得灵魂自由，创造力达到巅峰。</p>
            </div>
            <div class="detail-block">
              <p class="detail-label">关键事件</p>
              <p class="detail-text">患麻风病双目失明，仍在墙上创作巨型壁画，临终前要求烧毁所有作品。</p>
            </div>
            <div class="detail-block">
              <p class="detail-label">象征意义</p>
              <p class="detail-text">代表月亮的世界——理想、自由、超越世俗的精神乌托邦。</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 03: Themes -->
    <section class="section-themes swiss-border-bottom">
      <div class="section-header">
        <p class="section-number">SECTION 03</p>
        <h2 class="section-title">THEMES</h2>
        <p class="section-subtitle">Core Ideas of the Book</p>
      </div>
      <div class="themes-grid">
        <div class="theme-card swiss-border swiss-hover-accent">
          <div class="theme-icon"></div>
          <h3 class="theme-name">理想与现实的割裂</h3>
          <p class="theme-desc">月亮代表崇高理想，六便士代表世俗现实。大多数人只看到六便士，少数人抬头看月亮。</p>
        </div>
        <div class="theme-card swiss-border swiss-hover-accent">
          <div class="theme-icon theme-icon-circle"></div>
          <h3 class="theme-name">天才的孤独</h3>
          <p class="theme-desc">真正的天才不被同时代理解。他们的疯狂是神性的显现，是艺术创作的必要代价。</p>
        </div>
        <div class="theme-card swiss-border swiss-hover-accent">
          <div class="theme-icon theme-icon-square"></div>
          <h3 class="theme-name">艺术的神性</h3>
          <p class="theme-desc">艺术创作是超越世俗的精神活动，需要抛弃一切社会规则和道德约束。</p>
        </div>
        <div class="theme-card swiss-border swiss-hover-accent">
          <div class="theme-icon theme-icon-diagonal"></div>
          <h3 class="theme-name">自由的代价</h3>
          <p class="theme-desc">追求绝对自由意味着伤害他人、被社会排斥。天才的道路注定孤独且残酷。</p>
        </div>
      </div>
    </section>

    <!-- Section 04: Quotes -->
    <section class="section-quotes">
      <div class="section-header">
        <p class="section-number">SECTION 04</p>
        <h2 class="section-title">QUOTES</h2>
        <p class="section-subtitle">Words from the Moon</p>
      </div>
      <div class="quotes-grid">
        <div class="quote-card swiss-border swiss-hover-accent">
          <div class="quote-spine"></div>
          <div class="quote-border-top"></div>
          <p class="quote-text">我必须画画，就像溺水的人必须挣扎</p>
          <div class="quote-border-bottom"></div>
          <div class="quote-source">
            <span class="source-name">思特里克兰德</span>
            <span class="source-role">巴黎时期</span>
          </div>
        </div>
        <div class="quote-card swiss-border swiss-hover-accent">
          <div class="quote-spine"></div>
          <div class="quote-border-top"></div>
          <p class="quote-text">月亮代表崇高理想，六便士代表世俗现实</p>
          <div class="quote-border-bottom"></div>
          <div class="quote-source">
            <span class="source-name">书名寓意</span>
            <span class="source-role">核心隐喻</span>
          </div>
        </div>
        <div class="quote-card swiss-border swiss-hover-accent">
          <div class="quote-spine"></div>
          <div class="quote-border-top"></div>
          <p class="quote-text">上帝的磨盘转动得很慢，但是却磨得很细</p>
          <div class="quote-border-bottom"></div>
          <div class="quote-source">
            <span class="source-name">毛姆</span>
            <span class="source-role">经典名句</span>
          </div>
        </div>
        <div class="quote-card swiss-border swiss-hover-accent">
          <div class="quote-spine"></div>
          <div class="quote-border-top"></div>
          <p class="quote-text">我告诉你我必须画画。我身不由己。一个人掉进水里，他游泳游得好不好是无关紧要的，反正他得挣扎出去，不然就得淹死</p>
          <div class="quote-border-bottom"></div>
          <div class="quote-source">
            <span class="source-name">思特里克兰德</span>
            <span class="source-role">对话</span>
          </div>
        </div>
        <div class="quote-card swiss-border swiss-hover-accent">
          <div class="quote-spine"></div>
          <div class="quote-border-top"></div>
          <p class="quote-text">我们每个人生在世界上都是孤独的。每个人都被囚禁在一座铁塔里，只能靠一些符号同别人传达自己的思想</p>
          <div class="quote-border-bottom"></div>
          <div class="quote-source">
            <span class="source-name">毛姆</span>
            <span class="source-role">孤独主题</span>
          </div>
        </div>
        <div class="quote-card swiss-border swiss-hover-accent">
          <div class="quote-spine"></div>
          <div class="quote-border-top"></div>
          <p class="quote-text">美是一种奇妙而奇异的东西，艺术家只有通过灵魂的痛苦折磨才能从宇宙的混沌中将它提炼出来</p>
          <div class="quote-border-bottom"></div>
          <div class="quote-source">
            <span class="source-name">毛姆</span>
            <span class="source-role">艺术论</span>
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
const expandedGeography = ref(null)

const exitToYearbook = () => {
  router.push('/yearbook/fiction')
}

const toggleCharacter = (index) => {
  if (expandedCharacter.value === index) {
    expandedCharacter.value = null
  } else {
    expandedCharacter.value = index
    expandedGeography.value = null
  }
}

const toggleGeography = (index) => {
  if (expandedGeography.value === index) {
    expandedGeography.value = null
  } else {
    expandedGeography.value = index
    expandedCharacter.value = null
  }
}
</script>

<style scoped>
.moon-sixpence-world {
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

/* Header */
.book-header {
  padding: 4rem 2rem 3rem;
}

.header-content {
  max-width: 1400px;
  margin: 0 auto;
}

.book-vol {
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.25em;
  color: var(--swiss-accent);
  margin-bottom: 0.5rem;
}

.book-title {
  font-size: clamp(2rem, 5vw, 4rem);
  font-weight: 900;
  letter-spacing: -0.03em;
  line-height: 1.1;
  margin: 0.5rem 0;
  color: var(--swiss-black);
}

.book-subtitle {
  font-size: 1rem;
  font-weight: 500;
  color: var(--swiss-text-secondary);
  margin: 0.5rem 0 0.25rem;
  font-style: italic;
}

.book-author {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--swiss-text-secondary);
}

.header-meta {
  display: flex;
  gap: 2rem;
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 2px solid var(--swiss-black);
}

.meta-label {
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  color: var(--swiss-black);
}

.meta-years {
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  color: var(--swiss-text-secondary);
}

/* Section Headers */
.section-header {
  text-align: center;
  padding: 3rem 2rem 2rem;
}

.section-number {
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.25em;
  color: var(--swiss-accent);
  margin-bottom: 0.5rem;
}

.section-title {
  font-size: clamp(1.5rem, 3vw, 2.5rem);
  font-weight: 900;
  letter-spacing: -0.03em;
  margin: 0.5rem 0;
  color: var(--swiss-black);
}

.section-subtitle {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--swiss-text-secondary);
  margin-top: 0.5rem;
}

/* Characters Grid */
.characters-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem 3rem;
}

.character-card {
  padding: 2rem;
  border-right: none;
}

.character-card:not(:last-child) {
  border-right: 2px solid var(--swiss-black);
}

.character-card.clickable {
  cursor: pointer;
}

.character-card.expanded {
  background: var(--swiss-muted);
}

.char-number {
  font-size: 2rem;
  font-weight: 900;
  color: var(--swiss-black);
  margin-bottom: 1rem;
}

.char-info {
  margin-bottom: 1.5rem;
}

.char-name {
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  margin: 0.5rem 0;
  color: var(--swiss-black);
}

.char-role {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--swiss-text-secondary);
  margin: 0.25rem 0;
}

.char-desc {
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  color: var(--swiss-text-secondary);
  text-transform: uppercase;
  margin: 0.5rem 0 1rem;
}

.char-quote {
  padding: 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.6;
  color: var(--swiss-black);
  font-style: italic;
}

.char-details {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 2px solid var(--swiss-black);
}

.detail-section {
  margin-bottom: 1rem;
}

.detail-label {
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  color: var(--swiss-black);
  margin-bottom: 0.5rem;
}

.detail-text {
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.6;
  color: var(--swiss-text-secondary);
}

/* Geographies List */
.geographies-list {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 2rem 3rem;
}

.geography-card {
  display: flex;
  gap: 2rem;
  padding: 2rem;
  border-bottom: none;
}

.geography-card:not(:last-child) {
  border-bottom: 2px solid var(--swiss-black);
}

.geography-card.clickable {
  cursor: pointer;
}

.geography-card.expanded {
  background: var(--swiss-muted);
}

.geo-number {
  font-size: 2rem;
  font-weight: 900;
  color: var(--swiss-black);
  flex-shrink: 0;
  width: 60px;
}

.geo-content {
  flex-grow: 1;
}

.geo-name {
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  margin: 0 0 0.25rem;
  color: var(--swiss-black);
}

.geo-name-en {
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  color: var(--swiss-accent);
  margin-bottom: 0.5rem;
}

.geo-theme {
  font-size: 1rem;
  font-weight: 500;
  color: var(--swiss-text-secondary);
  margin-bottom: 1rem;
}

.geo-meta {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.meta-tag {
  font-size: 0.75rem;
  font-weight: 500;
  padding: 0.25rem 0.5rem;
  background: var(--swiss-muted);
  color: var(--swiss-black);
  border: 2px solid var(--swiss-black);
}

.geo-details {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 2px solid var(--swiss-black);
}

.detail-block {
  margin-bottom: 1rem;
}

/* Themes Grid */
.themes-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem 3rem;
}

.theme-card {
  padding: 2rem;
  border-right: none;
}

.theme-card:not(:last-child) {
  border-right: 2px solid var(--swiss-black);
}

.theme-icon {
  width: 60px;
  height: 60px;
  margin: 0 auto 1.5rem;
  background: var(--swiss-black);
}

.theme-icon-circle {
  border-radius: 50%;
}

.theme-icon-square {
  clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
}

.theme-icon-diagonal {
  clip-path: polygon(0 0, 100% 0, 100% 30%, 0 70%);
}

.theme-name {
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  margin: 1rem 0 0.75rem;
  color: var(--swiss-black);
}

.theme-desc {
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.6;
  color: var(--swiss-text-secondary);
}

/* Quotes Grid */
.quotes-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem 3rem;
}

.quote-card {
  padding: 2rem;
  border-right: none;
  border-bottom: none;
}

.quote-card:nth-child(3n) {
  border-right: 2px solid var(--swiss-black);
}

.quote-card:not(:nth-child(3n)):not(:last-child) {
  border-right: 2px solid var(--swiss-black);
}

.quote-spine {
  position: absolute;
  top: 0;
  left: 2rem;
  width: 4px;
  height: 100%;
  background: var(--swiss-accent);
}

.quote-border-top {
  height: 2px;
  background: var(--swiss-black);
  margin-bottom: 1.5rem;
}

.quote-text {
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.8;
  color: var(--swiss-text-secondary);
  margin-bottom: 1.5rem;
}

.quote-border-bottom {
  height: 1px;
  background: var(--swiss-black);
  margin-bottom: 1rem;
}

.quote-source {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.75rem;
}

.source-name {
  font-weight: 700;
  letter-spacing: 0.1em;
  color: var(--swiss-black);
}

.source-role {
  font-weight: 400;
  color: var(--swiss-text-secondary);
}

/* Responsive */
@media (max-width: 1024px) {
  .characters-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .themes-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .quotes-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .character-card:not(:last-child) {
    border-right: 2px solid var(--swiss-black);
  }

  .character-card:nth-child(2n) {
    border-right: none;
  }

  .theme-card:not(:last-child) {
    border-right: 2px solid var(--swiss-black);
  }

  .theme-card:nth-child(2n) {
    border-right: none;
  }

  .quote-card:not(:last-child) {
    border-right: 2px solid var(--swiss-black);
  }

  .quote-card:nth-child(2n) {
    border-right: none;
  }
}

@media (max-width: 768px) {
  .characters-grid {
    grid-template-columns: 1fr;
  }

  .themes-grid {
    grid-template-columns: 1fr;
  }

  .quotes-grid {
    grid-template-columns: 1fr;
  }

  .character-card:not(:last-child) {
    border-right: 2px solid var(--swiss-black);
    border-bottom: 2px solid var(--swiss-black);
  }

  .theme-card:not(:last-child) {
    border-right: 2px solid var(--swiss-black);
    border-bottom: 2px solid var(--swiss-black);
  }

  .quote-card:not(:last-child) {
    border-right: 2px solid var(--swiss-black);
    border-bottom: 2px solid var(--swiss-black);
  }

  .geography-card {
    flex-direction: column;
  }
}
</style>

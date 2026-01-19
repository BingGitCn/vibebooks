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
        <p class="section-subtitle">People in the Story</p>
      </div>

      <div class="characters-grid">
        <!-- Character 1 -->
        <div class="character-card swiss-border swiss-hover-accent clickable" :class="{ 'expanded': expandedCharacter === 0 }" @click="toggleCharacter(0)">
          <div class="char-number">01</div>
          <div class="char-info">
            <h3 class="char-name">思特里克兰德</h3>
            <p class="char-role">疯狂的天才画家</p>
            <p class="char-desc">冷漠、自私、天才</p>
          </div>
          <div class="char-quote swiss-dots">
            "我必须画画，<br/>就像溺水的人<br/>必须挣扎"
          </div>
          <div class="char-details" v-if="expandedCharacter === 0">
            <div class="detail-section">
              <p class="detail-label">身份</p>
              <p class="detail-text">{{ characterDetails[0].identity }}</p>
            </div>
            <div class="detail-section">
              <p class="detail-label">性格</p>
              <p class="detail-text">{{ characterDetails[0].personality }}</p>
            </div>
            <div class="detail-section">
              <p class="detail-label">命运</p>
              <p class="detail-text">{{ characterDetails[0].fate }}</p>
            </div>
          </div>
        </div>

        <!-- Character 2 -->
        <div class="character-card swiss-border swiss-hover-accent clickable" :class="{ 'expanded': expandedCharacter === 1 }" @click="toggleCharacter(1)">
          <div class="char-number">02</div>
          <div class="char-info">
            <h3 class="char-name">叙述者"我"</h3>
            <p class="char-role">年轻作家，观察者</p>
            <p class="char-desc">从不理解到震撼</p>
          </div>
          <div class="char-quote swiss-dots">
            "天才<br/>是孤独的"
          </div>
          <div class="char-details" v-if="expandedCharacter === 1">
            <div class="detail-section">
              <p class="detail-label">身份</p>
              <p class="detail-text">{{ characterDetails[1].identity }}</p>
            </div>
            <div class="detail-section">
              <p class="detail-label">态度</p>
              <p class="detail-text">{{ characterDetails[1].attitude }}</p>
            </div>
            <div class="detail-section">
              <p class="detail-label">意义</p>
              <p class="detail-text">{{ characterDetails[1].significance }}</p>
            </div>
          </div>
        </div>

        <!-- Character 3 -->
        <div class="character-card swiss-border swiss-hover-accent clickable" :class="{ 'expanded': expandedCharacter === 2 }" @click="toggleCharacter(2)">
          <div class="char-number">03</div>
          <div class="char-info">
            <h3 class="char-name">德克·斯特罗夫</h3>
            <p class="char-role">平庸但善良的画家</p>
            <p class="char-desc">最早发现天才</p>
          </div>
          <div class="char-quote swiss-dots">
            "我理解<br/>他的天才"
          </div>
          <div class="char-details" v-if="expandedCharacter === 2">
            <div class="detail-section">
              <p class="detail-label">身份</p>
              <p class="detail-text">{{ characterDetails[2].identity }}</p>
            </div>
            <div class="detail-section">
              <p class="detail-label">悲剧</p>
              <p class="detail-text">{{ characterDetails[2].tragedy }}</p>
            </div>
            <div class="detail-section">
              <p class="detail-label">意义</p>
              <p class="detail-text">{{ characterDetails[2].significance }}</p>
            </div>
          </div>
        </div>

        <!-- Character 4 -->
        <div class="character-card swiss-border swiss-hover-accent clickable" :class="{ 'expanded': expandedCharacter === 3 }" @click="toggleCharacter(3)">
          <div class="char-number">04</div>
          <div class="char-info">
            <h3 class="char-name">塔希提土著女孩</h3>
            <p class="char-role">最后的伴侣</p>
            <p class="char-desc">原始、自然、包容</p>
          </div>
          <div class="char-quote swiss-dots">
            "我不懂<br/>艺术，但我<br/>懂他"
          </div>
          <div class="char-details" v-if="expandedCharacter === 3">
            <div class="detail-section">
              <p class="detail-label">身份</p>
              <p class="detail-text">{{ characterDetails[3].identity }}</p>
            </div>
            <div class="detail-section">
              <p class="detail-label">关系</p>
              <p class="detail-text">{{ characterDetails[3].relationship }}</p>
            </div>
            <div class="detail-section">
              <p class="detail-label">意义</p>
              <p class="detail-text">{{ characterDetails[3].significance }}</p>
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
        <div class="geo-item clickable" :class="{ 'expanded': expandedGeography === 0 }" @click="toggleGeography(0)">
          <p class="geo-year">LONDON</p>
          <div class="geo-content">
            <p class="geo-title">世俗牢笼</p>
            <p class="geo-desc">证券经纪人，家庭，社会规训</p>
            <div class="geo-details" v-if="expandedGeography === 0">
              <div class="detail-section">
                <p class="detail-label">精神状态</p>
                <p class="detail-text">{{ geographyDetails[0].state }}</p>
              </div>
              <div class="detail-section">
                <p class="detail-label">关键事件</p>
                <p class="detail-text">{{ geographyDetails[0].event }}</p>
              </div>
              <div class="detail-section">
                <p class="detail-label">象征意义</p>
                <p class="detail-text">{{ geographyDetails[0].symbolism }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Geography 2 -->
        <div class="geo-item clickable" :class="{ 'expanded': expandedGeography === 1 }" @click="toggleGeography(1)">
          <p class="geo-year">PARIS</p>
          <div class="geo-content">
            <p class="geo-title">欲望觉醒</p>
            <p class="geo-desc">贫穷艺术家，挣扎，艺术召唤</p>
            <div class="geo-details" v-if="expandedGeography === 1">
              <div class="detail-section">
                <p class="detail-label">精神状态</p>
                <p class="detail-text">{{ geographyDetails[1].state }}</p>
              </div>
              <div class="detail-section">
                <p class="detail-label">关键事件</p>
                <p class="detail-text">{{ geographyDetails[1].event }}</p>
              </div>
              <div class="detail-section">
                <p class="detail-label">象征意义</p>
                <p class="detail-text">{{ geographyDetails[1].symbolism }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Geography 3 -->
        <div class="geo-item clickable" :class="{ 'expanded': expandedGeography === 2 }" @click="toggleGeography(2)">
          <p class="geo-year">TAHITI</p>
          <div class="geo-content">
            <p class="geo-title">精神乌托邦</p>
            <p class="geo-desc">原始自由，不朽创作，灵魂解放</p>
            <div class="geo-details" v-if="expandedGeography === 2">
              <div class="detail-section">
                <p class="detail-label">精神状态</p>
                <p class="detail-text">{{ geographyDetails[2].state }}</p>
              </div>
              <div class="detail-section">
                <p class="detail-label">关键事件</p>
                <p class="detail-text">{{ geographyDetails[2].event }}</p>
              </div>
              <div class="detail-section">
                <p class="detail-label">象征意义</p>
                <p class="detail-text">{{ geographyDetails[2].symbolism }}</p>
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
        <p class="section-subtitle">Words from the Moon</p>
      </div>

      <div class="quotes-grid">
        <div class="quote-card">
          <div class="quote-spine"></div>
          <div class="quote-border-top"></div>
          <p class="quote-text">我必须画画，就像溺水的人必须挣扎</p>
          <div class="quote-border-bottom"></div>
          <div class="quote-source">
            <span class="source-name">思特里克兰德</span>
            <span class="source-role">巴黎时期</span>
          </div>
        </div>

        <div class="quote-card">
          <div class="quote-spine"></div>
          <div class="quote-border-top"></div>
          <p class="quote-text">月亮代表崇高理想，六便士代表世俗现实</p>
          <div class="quote-border-bottom"></div>
          <div class="quote-source">
            <span class="source-name">书名寓意</span>
            <span class="source-role">核心隐喻</span>
          </div>
        </div>

        <div class="quote-card">
          <div class="quote-spine"></div>
          <div class="quote-border-top"></div>
          <p class="quote-text">上帝的磨盘转动得很慢，但是却磨得很细</p>
          <div class="quote-border-bottom"></div>
          <div class="quote-source">
            <span class="source-name">毛姆</span>
            <span class="source-role">经典名句</span>
          </div>
        </div>

        <div class="quote-card">
          <div class="quote-spine"></div>
          <div class="quote-border-top"></div>
          <p class="quote-text">我告诉你我必须画画。我身不由己。一个人掉进水里，他游泳游得好不好是无关紧要的，反正他得挣扎出去，不然就得淹死</p>
          <div class="quote-border-bottom"></div>
          <div class="quote-source">
            <span class="source-name">思特里克兰德</span>
            <span class="source-role">对话</span>
          </div>
        </div>

        <div class="quote-card">
          <div class="quote-spine"></div>
          <div class="quote-border-top"></div>
          <p class="quote-text">我们每个人生在世界上都是孤独的。每个人都被囚禁在一座铁塔里，只能靠一些符号同别人传达自己的思想</p>
          <div class="quote-border-bottom"></div>
          <div class="quote-source">
            <span class="source-name">毛姆</span>
            <span class="source-role">孤独主题</span>
          </div>
        </div>

        <div class="quote-card">
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

const characterDetails = {
  0: {
    identity: '伦敦证券经纪人，中年突然抛妻弃子去巴黎追求绘画，最终在塔希提岛创作出不朽作品。',
    personality: '对艺术有近乎神性的执着，不在乎社会规则和他人感受，不被世俗理解。',
    fate: '患麻风病双目失明后仍在墙上创作，临终前要求烧毁所有作品。'
  },
  1: {
    identity: '年轻作家，通过朋友关系认识思特里克兰德，全程追踪他的经历。',
    attitude: '起初不理解，逐渐被艺术天才震撼，最终理解了艺术创作的神性力量。',
    significance: '代表普通读者的视角，展现天才与凡人的距离。'
  },
  2: {
    identity: '荷兰画家，技法平庸但心地善良，最早发现思特里克兰德的天才。',
    tragedy: '妻子被思特里克兰德吸引后离开他并自杀。斯特罗夫仍然宽恕。',
    significance: '代表庸才对天才的膜拜，以及善良在天才面前的无力与悲壮。'
  },
  3: {
    identity: '塔希提岛土著女孩，成为思特里克兰德最后的伴侣。',
    relationship: '她不理解艺术，但理解思特里克兰德的灵魂需求，给他自由和安宁。',
    significance: '代表原始、自然、包容的环境，是天才得以最后绽放的土壤。'
  }
}

const geographyDetails = {
  0: {
    state: '被社会规则、家庭责任、物质追求所困，过着世俗眼中"成功"但空虚的生活。',
    event: '突然离开妻子和孩子，留下一张纸条说"去巴黎追求艺术"。',
    symbolism: '代表六便士的世界——世俗、平庸、充满社会规训的理想牢笼。'
  },
  1: {
    state: '摆脱家庭和社会责任，陷入贫穷和孤独，但艺术创造力开始爆发。',
    event: '住廉价旅馆，拒绝帮助，近乎疯狂地创作，与斯特罗夫夫妇发生悲剧纠葛。',
    symbolism: '代表理想与现实撕裂的过渡地带——痛苦但真实，艺术觉醒的必经之路。'
  },
  2: {
    state: '完全摆脱欧洲文明束缚，在原始自然中获得灵魂自由，创造力达到巅峰。',
    event: '患麻风病双目失明，仍在墙上创作巨型壁画，临终前要求烧毁所有作品。',
    symbolism: '代表月亮的世界——理想、自由、超越世俗的精神乌托邦。'
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

/* Geographies Section */
.geographies-list {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0;
  padding-left: 12rem;
}

.geo-item {
  padding: 2.5rem 2rem;
  border-bottom: 1px solid var(--swiss-border);
  display: grid;
  grid-template-columns: 140px 1fr;
  gap: 1.5rem;
  align-items: start;
  position: relative;
  z-index: 10;
  transition: all 0.2s ease-out;
}

.geo-item.expanded {
  grid-template-columns: 140px 1fr;
  padding: 2.5rem 2rem;
}

.geo-year {
  font-family: 'Inter', sans-serif;
  font-weight: 900;
  font-size: 1rem;
  color: var(--swiss-accent);
  margin: 0;
}

.geo-title {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 1.125rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0 0 0.5rem 0;
}

.geo-desc {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1.6;
  color: var(--swiss-text-secondary);
  margin: 0;
}

.geo-details {
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

/* Quotes Section */
.quotes-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
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
  border-color: var(--swiss-accent);
  transform: translateY(-2px);
}

.quote-spine {
  width: 12px;
  height: 16px;
  background-color: var(--swiss-accent);
  position: absolute;
  top: -1px;
  left: -1px;
}

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

.character-card.expanded,
.geo-item.expanded {
  background-color: var(--swiss-muted);
}

.geo-item:not(.expanded):hover {
  background-color: var(--swiss-muted);
}

.geo-item.expanded:hover {
  background-color: var(--swiss-muted);
}

/* Responsive */
@media (max-width: 1024px) {
  .book-header,
  .section-header,
  .characters-grid,
  .geographies-list,
  .quotes-grid {
    padding-left: 2rem;
  }

  .characters-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .quotes-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .geo-item {
    grid-template-columns: 1fr;
    gap: 0.75rem;
    padding: 2rem 2rem;
  }

  .geo-year {
    font-size: 0.875rem;
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
  .geographies-list,
  .quotes-grid {
    grid-template-columns: 1fr;
    padding: 1rem;
  }

  .geo-item {
    grid-template-columns: 1fr;
    gap: 0.75rem;
    padding: 1.5rem 1rem;
  }

  .geo-year {
    font-size: 0.875rem;
  }

  .character-card,
  .quote-card {
    padding: 1.5rem;
  }

  .char-details,
  .geo-details {
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

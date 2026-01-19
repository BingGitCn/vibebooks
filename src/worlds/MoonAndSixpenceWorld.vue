<template>
  <div class="moon-sixpence-world swiss-grid-pattern swiss-noise">
    <!-- 月亮装饰 -->
    <div class="moon-decoration moon-1"></div>
    <div class="moon-decoration moon-2"></div>
    <div class="moon-decoration moon-3"></div>

    <!-- EXIT 按钮 -->
    <button class="exit-btn swiss-hover-invert" @click="exitToYearbook">
      <span class="exit-arrow">←</span>
      EXIT
    </button>

    <!-- Header -->
    <header class="book-header swiss-border-bottom">
      <div class="header-content">
        <p class="book-vol">VOL.033</p>
        <h1 class="book-title">月亮与六便士</h1>
        <p class="book-subtitle">理想与现实的永恒撕裂</p>
        <p class="book-author">威廉·萨默塞特·毛姆 · 1919</p>
      </div>
      <div class="header-meta">
        <p class="meta-label">ART VS REALITY</p>
        <p class="meta-years">3 GEOGRAPHIES</p>
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
        <article
          class="character-card swiss-border"
          :class="{ expanded: expandedCharacter === 0 }"
          @click="toggleCharacter(0)"
        >
          <div class="character-number">01</div>
          <div class="character-icon character-artist"></div>
          <div class="character-info">
            <h3 class="character-name">思特里克兰德</h3>
            <p class="character-role">疯狂的天才画家</p>
          </div>
          <div class="character-tags">
            <span class="tag">天才</span>
            <span class="tag">疯狂</span>
          </div>
          <div v-if="expandedCharacter === 0" class="character-details">
            <div class="detail-section">
              <p class="detail-label">身份</p>
              <p class="detail-text">原本是伦敦证券经纪人，中年突然抛妻弃子去巴黎追求绘画梦想，最终在塔希提岛创作出不朽作品。</p>
            </div>
            <div class="detail-section">
              <p class="detail-label">性格</p>
              <p class="detail-text">冷漠、自私、天才、不被世俗理解。他对艺术有着近乎神性的执着，不在乎任何社会规则和他人感受。</p>
            </div>
            <div class="detail-section">
              <p class="detail-label">命运</p>
              <p class="detail-text">在塔希提岛患上麻风病，双目失明后仍在墙上创作壁画，临终前要求烧毁所有作品。</p>
            </div>
          </div>
        </article>

        <!-- Character 2 -->
        <article
          class="character-card swiss-border"
          :class="{ expanded: expandedCharacter === 1 }"
          @click="toggleCharacter(1)"
        >
          <div class="character-number">02</div>
          <div class="character-icon character-narrator"></div>
          <div class="character-info">
            <h3 class="character-name">叙述者"我"</h3>
            <p class="character-role">年轻作家，观察者</p>
          </div>
          <div class="character-tags">
            <span class="tag">观察</span>
            <span class="tag">记录</span>
          </div>
          <div v-if="expandedCharacter === 1" class="character-details">
            <div class="detail-section">
              <p class="detail-label">身份</p>
              <p class="detail-text">年轻的作家，通过朋友关系认识思特里克兰德，全程追踪他的经历，成为故事的叙述者。</p>
            </div>
            <div class="detail-section">
              <p class="detail-label">态度</p>
              <p class="detail-text">起初不理解，逐渐被思特里克兰德的艺术天才震撼，最终理解了艺术创作的神性力量。</p>
            </div>
            <div class="detail-section">
              <p class="detail-label">意义</p>
              <p class="detail-text">代表普通读者的视角，从不理解到震撼，展现天才与凡人的距离。</p>
            </div>
          </div>
        </article>

        <!-- Character 3 -->
        <article
          class="character-card swiss-border"
          :class="{ expanded: expandedCharacter === 2 }"
          @click="toggleCharacter(2)"
        >
          <div class="character-number">03</div>
          <div class="character-icon character-stroff"></div>
          <div class="character-info">
            <h3 class="character-name">德克·斯特罗夫</h3>
            <p class="character-role">平庸但善良的画家</p>
          </div>
          <div class="character-tags">
            <span class="tag">善良</span>
            <span class="tag">庸才</span>
          </div>
          <div v-if="expandedCharacter === 2" class="character-details">
            <div class="detail-section">
              <p class="detail-label">身份</p>
              <p class="detail-text">荷兰画家，技法平庸但心地善良，最早发现思特里克兰德的天才，竭尽全力帮助他。</p>
            </div>
            <div class="detail-section">
              <p class="detail-label">悲剧</p>
              <p class="detail-text">妻子被思特里克兰德吸引后离开他，最终自杀。斯特罗夫仍然宽恕思特里克兰德。</p>
            </div>
            <div class="detail-section">
              <p class="detail-label">意义</p>
              <p class="detail-text">代表庸才对天才的膜拜，以及善良在天才面前的无力与悲壮。</p>
            </div>
          </div>
        </article>

        <!-- Character 4 -->
        <article
          class="character-card swiss-border"
          :class="{ expanded: expandedCharacter === 3 }"
          @click="toggleCharacter(3)"
        >
          <div class="character-number">04</div>
          <div class="character-icon character-tahiti"></div>
          <div class="character-info">
            <h3 class="character-name">塔希提土著女孩</h3>
            <p class="character-role">最后的伴侣</p>
          </div>
          <div class="character-tags">
            <span class="tag">原始</span>
            <span class="tag">包容</span>
          </div>
          <div v-if="expandedCharacter === 3" class="character-details">
            <div class="detail-section">
              <p class="detail-label">身份</p>
              <p class="detail-text">塔希提岛的土著女孩，成为思特里克兰德最后的伴侣，包容他的一切疯狂和冷漠。</p>
            </div>
            <div class="detail-section">
              <p class="detail-label">关系</p>
              <p class="detail-text">她不理解艺术，但理解思特里克兰德的灵魂需求，给他提供自由和安宁。</p>
            </div>
            <div class="detail-section">
              <p class="detail-label">意义</p>
              <p class="detail-text">代表原始、自然、包容的环境，是天才得以最后绽放的土壤。</p>
            </div>
          </div>
        </article>
      </div>
    </section>

    <!-- Section 02: Geographies -->
    <section class="section-geographies swiss-border-bottom">
      <div class="section-header">
        <p class="section-number">SECTION 02</p>
        <h2 class="section-title">GEOGRAPHIES</h2>
        <p class="section-subtitle">Three Spiritual Transformations</p>
      </div>
      <div class="geographies-timeline">
        <!-- Geography 1 -->
        <article
          class="geography-card swiss-border"
          :class="{ expanded: expandedGeography === 0 }"
          @click="toggleGeography(0)"
        >
          <div class="geography-marker">
            <div class="marker-icon marker-london"></div>
            <div class="marker-line"></div>
          </div>
          <div class="geography-content">
            <h3 class="geography-name">伦敦</h3>
            <p class="geography-name-en">LONDON</p>
            <p class="geography-theme">世俗牢笼</p>
            <div class="geography-meta">
              <span class="meta-item">🏛️ 社会规训</span>
              <span class="meta-item">💼 证券经纪人</span>
              <span class="meta-item">👨‍👩‍👧‍👦 中产家庭</span>
            </div>
          </div>
          <div v-if="expandedGeography === 0" class="geography-details">
            <div class="detail-block">
              <p class="detail-label">精神状态</p>
              <p class="detail-text">被社会规则、家庭责任、物质追求所困，过着世俗眼中"成功"但空虚的生活。</p>
            </div>
            <div class="detail-block">
              <p class="detail-label">关键事件</p>
              <p class="detail-text">突然离开妻子和孩子，留下一张纸条说"去巴黎追求艺术"，震惊所有人。</p>
            </div>
            <div class="detail-block">
              <p class="detail-label">象征意义</p>
              <p class="detail-text">代表六便士的世界——世俗、平庸、充满社会规训的理想牢笼。</p>
            </div>
          </div>
        </article>

        <!-- Geography 2 -->
        <article
          class="geography-card swiss-border"
          :class="{ expanded: expandedGeography === 1 }"
          @click="toggleGeography(1)"
        >
          <div class="geography-marker">
            <div class="marker-icon marker-paris"></div>
            <div class="marker-line"></div>
          </div>
          <div class="geography-content">
            <h3 class="geography-name">巴黎</h3>
            <p class="geography-name-en">PARIS</p>
            <p class="geography-theme">欲望觉醒</p>
            <div class="geography-meta">
              <span class="meta-item">🎨 贫穷艺术家</span>
              <span class="meta-item">😫 挣扎</span>
              <span class="meta-item">🔥 艺术召唤</span>
            </div>
          </div>
          <div v-if="expandedGeography === 1" class="geography-details">
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
        </article>

        <!-- Geography 3 -->
        <article
          class="geography-card swiss-border"
          :class="{ expanded: expandedGeography === 2 }"
          @click="toggleGeography(2)"
        >
          <div class="geography-marker">
            <div class="marker-icon marker-tahiti"></div>
          </div>
          <div class="geography-content">
            <h3 class="geography-name">塔希提</h3>
            <p class="geography-name-en">TAHITI</p>
            <p class="geography-theme">精神乌托邦</p>
            <div class="geography-meta">
              <span class="meta-item">🌴 原始自由</span>
              <span class="meta-item">🎨 不朽创作</span>
              <span class="meta-item">✨ 灵魂解放</span>
            </div>
          </div>
          <div v-if="expandedGeography === 2" class="geography-details">
            <div class="detail-block">
              <p class="detail-label">精神状态</p>
              <p class="detail-text">完全摆脱欧洲文明束缚，在原始自然中获得灵魂自由，创造力达到巅峰。</p>
            </div>
            <div class="detail-block">
              <p class="detail-label">关键事件</p>
              <p class="detail-text">患麻风病后双目失明，仍在墙上创作巨型壁画，临终前要求烧毁所有作品。</p>
            </div>
            <div class="detail-block">
              <p class="detail-label">象征意义</p>
              <p class="detail-text">代表月亮的世界——理想、自由、超越世俗的精神乌托邦。</p>
            </div>
          </div>
        </article>
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
        <div class="theme-card swiss-border">
          <div class="theme-icon theme-moon"></div>
          <h3 class="theme-name">理想与现实的割裂</h3>
          <p class="theme-desc">月亮代表崇高理想，六便士代表世俗现实。大多数人只看到六便士，少数人抬头看月亮。</p>
        </div>
        <div class="theme-card swiss-border">
          <div class="theme-icon theme-madness"></div>
          <h3 class="theme-name">天才的孤独</h3>
          <p class="theme-desc">真正的天才不被同时代理解。他们的疯狂是神性的显现，是艺术创作的必要代价。</p>
        </div>
        <div class="theme-card swiss-border">
          <div class="theme-icon theme-art"></div>
          <h3 class="theme-name">艺术的神性</h3>
          <p class="theme-desc">艺术创作是超越世俗的精神活动，需要抛弃一切社会规则和道德约束。</p>
        </div>
        <div class="theme-card swiss-border">
          <div class="theme-icon theme-freedom"></div>
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
        <div class="quote-card">
          <div class="quote-spine quote-spine-gold"></div>
          <div class="quote-border-top"></div>
          <p class="quote-text">我必须画画，就像溺水的人必须挣扎</p>
          <div class="quote-border-bottom"></div>
          <div class="quote-source">
            <span class="source-name">思特里克兰德</span>
            <span class="source-role">巴黎时期</span>
          </div>
        </div>
        <div class="quote-card">
          <div class="quote-spine quote-spine-gold"></div>
          <div class="quote-border-top"></div>
          <p class="quote-text">月亮代表崇高理想，六便士代表世俗现实</p>
          <div class="quote-border-bottom"></div>
          <div class="quote-source">
            <span class="source-name">书名寓意</span>
            <span class="source-role">核心隐喻</span>
          </div>
        </div>
        <div class="quote-card">
          <div class="quote-spine quote-spine-gold"></div>
          <div class="quote-border-top"></div>
          <p class="quote-text">上帝的磨盘转动得很慢，但是却磨得很细</p>
          <div class="quote-border-bottom"></div>
          <div class="quote-source">
            <span class="source-name">毛姆</span>
            <span class="source-role">经典名句</span>
          </div>
        </div>
        <div class="quote-card">
          <div class="quote-spine quote-spine-gold"></div>
          <div class="quote-border-top"></div>
          <p class="quote-text">我告诉你我必须画画。我身不由己。一个人掉进水里，他游泳游得好不好是无关紧要的，反正他得挣扎出去，不然就得淹死</p>
          <div class="quote-border-bottom"></div>
          <div class="quote-source">
            <span class="source-name">思特里克兰德</span>
            <span class="source-role">对话</span>
          </div>
        </div>
        <div class="quote-card">
          <div class="quote-spine quote-spine-gold"></div>
          <div class="quote-border-top"></div>
          <p class="quote-text">我们每个人生在世界上都是孤独的。每个人都被囚禁在一座铁塔里，只能靠一些符号同别人传达自己的思想</p>
          <div class="quote-border-bottom"></div>
          <div class="quote-source">
            <span class="source-name">毛姆</span>
            <span class="source-role">孤独主题</span>
          </div>
        </div>
        <div class="quote-card">
          <div class="quote-spine quote-spine-gold"></div>
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
  position: relative;
  min-height: 100vh;
  background: #1a1a1a;
  color: #ffffff;
  overflow-x: hidden;
}

/* 月亮装饰 */
.moon-decoration {
  position: fixed;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, #d4a574, #8b6914);
  opacity: 0.15;
  pointer-events: none;
  z-index: 0;
}

.moon-1 {
  width: 120px;
  height: 120px;
  top: 10%;
  right: 10%;
  animation: float-moon 8s ease-in-out infinite;
}

.moon-2 {
  width: 80px;
  height: 80px;
  top: 50%;
  left: 5%;
  animation: float-moon 10s ease-in-out infinite reverse;
}

.moon-3 {
  width: 60px;
  height: 60px;
  bottom: 20%;
  right: 15%;
  animation: float-moon 12s ease-in-out infinite;
}

@keyframes float-moon {
  0%, 100% {
    transform: translateY(0) translateX(0) scale(1);
    opacity: 0.15;
  }
  50% {
    transform: translateY(-30px) translateX(20px) scale(1.05);
    opacity: 0.25;
  }
}

/* Header */
.book-header {
  position: relative;
  padding: 3rem 2rem;
  background: linear-gradient(135deg, #1a1a1a 0%, #2a2520 100%);
  border-bottom: 2px solid #d4a574;
  z-index: 1;
}

.header-content {
  max-width: 1400px;
  margin: 0 auto;
}

.book-vol {
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.25em;
  color: #d4a574;
  margin-bottom: 0.5rem;
}

.book-title {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 900;
  letter-spacing: 0.15em;
  line-height: 1.2;
  margin: 0.5rem 0;
  color: #ffffff;
}

.book-subtitle {
  font-size: 1rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.7);
  margin: 0.5rem 0 1rem;
  font-style: italic;
}

.book-author {
  font-size: 0.875rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.5);
}

.header-meta {
  display: flex;
  gap: 2rem;
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(212, 165, 116, 0.2);
}

.meta-label {
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  color: #d4a574;
}

.meta-years {
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  color: rgba(255, 255, 255, 0.5);
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
  color: #d4a574;
  margin-bottom: 0.5rem;
}

.section-title {
  font-size: clamp(1.5rem, 3vw, 2.5rem);
  font-weight: 700;
  letter-spacing: 0.15em;
  margin: 0.5rem 0;
  color: #ffffff;
}

.section-subtitle {
  font-size: 0.875rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.5);
  margin-top: 0.5rem;
}

/* Characters Grid */
.characters-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem 3rem;
}

.character-card {
  position: relative;
  background: rgba(255, 255, 255, 0.03);
  border: 2px solid rgba(212, 165, 116, 0.3);
  padding: 2rem;
  cursor: pointer;
  transition: all 0.15s ease-out;
}

.character-card:not(.expanded):hover {
  background: #d4a574;
  border-color: #d4a574;
  transform: translateY(-2px);
}

.character-card:not(.expanded):hover * {
  color: #ffffff;
}

.character-card.expanded {
  background: rgba(212, 165, 116, 0.1);
  border-color: #d4a574;
  cursor: default;
}

.character-number {
  font-size: 2rem;
  font-weight: 900;
  color: #d4a574;
  margin-bottom: 1rem;
}

.character-icon {
  width: 60px;
  height: 60px;
  margin: 1rem 0;
  background: rgba(212, 165, 116, 0.2);
  border: 2px solid #d4a574;
}

.character-artist {
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, #d4a574, transparent);
}

.character-narrator {
  border-radius: 8px;
}

.character-stroff {
  border-radius: 0;
  transform: rotate(45deg);
}

.character-tahiti {
  border-radius: 50% 50% 0 50%;
}

.character-name {
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  margin: 1rem 0 0.5rem;
  color: #ffffff;
}

.character-role {
  font-size: 0.875rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 1rem;
}

.character-tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.tag {
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  padding: 0.25rem 0.5rem;
  background: rgba(212, 165, 116, 0.2);
  color: #d4a574;
  border: 1px solid #d4a574;
}

.character-details {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(212, 165, 116, 0.3);
}

.detail-section {
  margin-bottom: 1rem;
}

.detail-label {
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  color: #d4a574;
  margin-bottom: 0.25rem;
}

.detail-text {
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
}

/* Geographies Timeline */
.geographies-timeline {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 2rem 3rem;
}

.geography-card {
  position: relative;
  display: flex;
  gap: 2rem;
  background: rgba(255, 255, 255, 0.03);
  border: 2px solid rgba(212, 165, 116, 0.3);
  padding: 2rem;
  margin-bottom: 1.5rem;
  cursor: pointer;
  transition: all 0.15s ease-out;
}

.geography-card:not(.expanded):hover {
  background: #d4a574;
  border-color: #d4a574;
  transform: translateY(-2px);
}

.geography-card:not(.expanded):hover * {
  color: #ffffff;
}

.geography-card.expanded {
  background: rgba(212, 165, 116, 0.1);
  border-color: #d4a574;
  cursor: default;
}

.geography-marker {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
}

.marker-icon {
  width: 60px;
  height: 60px;
  background: rgba(212, 165, 116, 0.2);
  border: 2px solid #d4a574;
  flex-shrink: 0;
}

.marker-london {
  clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
}

.marker-paris {
  border-radius: 4px;
}

.marker-tahiti {
  border-radius: 50% 50% 0 50%;
}

.marker-line {
  width: 2px;
  flex-grow: 1;
  background: linear-gradient(to bottom, #d4a574, transparent);
  margin-top: 1rem;
  min-height: 40px;
}

.geography-content {
  flex-grow: 1;
}

.geography-name {
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  margin: 0 0 0.25rem;
  color: #ffffff;
}

.geography-name-en {
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  color: #d4a574;
  margin-bottom: 0.5rem;
}

.geography-theme {
  font-size: 1rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 1rem;
}

.geography-meta {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.meta-item {
  font-size: 0.75rem;
  font-weight: 500;
  padding: 0.25rem 0.5rem;
  background: rgba(212, 165, 116, 0.15);
  color: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(212, 165, 116, 0.3);
}

.geography-details {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(212, 165, 116, 0.3);
}

.detail-block {
  margin-bottom: 1rem;
}

/* Themes Grid */
.themes-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem 3rem;
}

.theme-card {
  background: rgba(255, 255, 255, 0.03);
  border: 2px solid rgba(212, 165, 116, 0.3);
  padding: 2rem;
  transition: all 0.15s ease-out;
}

.theme-card:hover {
  background: #d4a574;
  border-color: #d4a574;
  transform: translateY(-2px);
}

.theme-card:hover * {
  color: #ffffff;
}

.theme-icon {
  width: 60px;
  height: 60px;
  margin: 0 auto 1.5rem;
  background: rgba(212, 165, 116, 0.2);
  border: 2px solid #d4a574;
}

.theme-moon {
  border-radius: 50% 50% 0 50%;
  transform: rotate(-45deg);
}

.theme-madness {
  border-radius: 50%;
  position: relative;
  overflow: hidden;
}

.theme-madness::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 2px;
  background: #d4a574;
  transform: rotate(45deg);
}

.theme-art {
  clip-path: polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%);
}

.theme-freedom {
  border-radius: 8px;
}

.theme-name {
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  margin: 1rem 0 0.75rem;
  color: #ffffff;
}

.theme-desc {
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.6);
}

/* Quotes Grid */
.quotes-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem 3rem;
}

.quote-card {
  position: relative;
  background: rgba(255, 255, 255, 0.03);
  border: 2px solid rgba(212, 165, 116, 0.3);
  padding: 2rem;
  transition: all 0.15s ease-out;
}

.quote-card:hover {
  background: #d4a574;
  border-color: #d4a574;
  transform: translateY(-2px);
}

.quote-card:hover * {
  color: #ffffff;
  border-color: rgba(255, 255, 255, 0.3);
}

.quote-spine {
  position: absolute;
  top: 0;
  left: 1rem;
  width: 4px;
  height: 100%;
  background: #d4a574;
}

.quote-border-top {
  height: 2px;
  background: rgba(212, 165, 116, 0.3);
  margin-bottom: 1.5rem;
}

.quote-text {
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 1.5rem;
}

.quote-border-bottom {
  height: 1px;
  background: rgba(212, 165, 116, 0.3);
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
  color: #d4a574;
}

.source-role {
  font-weight: 400;
  color: rgba(255, 255, 255, 0.5);
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

  .geography-card {
    flex-direction: column;
  }

  .marker-line {
    display: none;
  }
}
</style>

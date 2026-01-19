<template>
  <div class="wencheng-world swiss-grid-pattern swiss-noise">
    <!-- Exit Button -->
    <button class="exit-btn swiss-hover-invert" @click="exitWorld">
      <span class="exit-arrow">←</span> EXIT
    </button>

    <!-- Book Header -->
    <header class="book-header swiss-border-bottom">
      <div class="header-content">
        <p class="book-vol">VOL.012</p>
        <h1 class="book-title">文城</h1>
        <p class="book-subtitle">寻找一个不存在的地方</p>
        <p class="book-author">余华 · 2021</p>
      </div>
      <div class="header-meta">
        <p class="meta-label">FICTION</p>
        <p class="meta-years">FATE & SEARCH</p>
      </div>
    </header>

    <!-- Section 01: CHARACTERS -->
    <section class="section-characters swiss-border-bottom">
      <div class="section-header">
        <p class="section-number">SECTION 01</p>
        <h2 class="section-title">CHARACTERS</h2>
        <p class="section-subtitle">People in the Mist</p>
      </div>

      <div class="characters-grid">
        <!-- Character 1: 林祥福 -->
        <div
          class="character-card swiss-border"
          :class="{ 'expanded': expandedCharacter === 0 }"
          @click="toggleCharacter(0)"
        >
          <div class="char-number">01</div>
          <div class="char-icon char-icon-protagonist"></div>
          <div class="char-info">
            <h3 class="char-name">林祥福</h3>
            <p class="char-role">寻找者</p>
          </div>
          <div class="char-details" v-if="expandedCharacter === 0">
            <div class="detail-section">
              <p class="detail-label">身份</p>
              <p class="detail-text">北方农民，娶了小美。生下女儿后，小美失踪。为了寻找妻子，千里迢迢来到南方。</p>
            </div>
            <div class="detail-section">
              <p class="detail-label">寻找</p>
              <p class="detail-text">只知道妻子说老家在"文城"，但文城并不存在。他在溪镇安顿下来，等待20多年。</p>
            </div>
            <div class="detail-section">
              <p class="detail-label">结局</p>
              <p class="detail-text">死在土匪的刀下。至死也没有找到小美，但找到了文城的意义。</p>
            </div>
          </div>
        </div>

        <!-- Character 2: 小美 -->
        <div
          class="character-card swiss-border"
          :class="{ 'expanded': expandedCharacter === 1 }"
          @click="toggleCharacter(1)"
        >
          <div class="char-number">02</div>
          <div class="char-icon char-icon-beloved"></div>
          <div class="char-info">
            <h3 class="char-name">小美</h3>
            <p class="char-role">被寻找的人</p>
          </div>
          <div class="char-details" v-if="expandedCharacter === 1">
            <div class="detail-section">
              <p class="detail-label">身份</p>
              <p class="detail-text">林祥福的妻子，阿强和美莲的女儿。身世坎坷，从小被领养。</p>
            </div>
            <div class="detail-section">
              <p class="detail-label">离开</p>
              <p class="detail-text">生下女儿林百家后不久，跟随阿强离开林祥福，只说老家在"文城"。</p>
            </div>
            <div class="detail-section">
              <p class="detail-label">真相</p>
              <p class="detail-text">文城是她编造的名字。她没有找到阿强的老家，也不想回到过去。</p>
            </div>
          </div>
        </div>

        <!-- Character 3: 林百家 -->
        <div
          class="character-card swiss-border"
          :class="{ 'expanded': expandedCharacter === 2 }"
          @click="toggleCharacter(2)"
        >
          <div class="char-number">03</div>
          <div class="char-icon char-icon-daughter"></div>
          <div class="char-info">
            <h3 class="char-name">林百家</h3>
            <p class="char-role">女儿</p>
          </div>
          <div class="char-details" v-if="expandedCharacter === 2">
            <div class="detail-section">
              <p class="detail-label">童年</p>
              <p class="detail-text">从小没有母亲，由父亲林祥福独自抚养。在溪镇长大。</p>
            </div>
            <div class="detail-section">
              <p class="detail-label">命运</p>
              <p class="detail-text">与陈永良一家关系亲密。后来失去父亲，被陈永良收养。</p>
            </div>
            <div class="detail-section">
              <p class="detail-label">象征</p>
              <p class="detail-text">两代人的纠葛，爱恨与选择的传承。</p>
            </div>
          </div>
        </div>

        <!-- Character 4: 陈永良 -->
        <div
          class="character-card swiss-border"
          :class="{ 'expanded': expandedCharacter === 3 }"
          @click="toggleCharacter(3)"
        >
          <div class="char-number">04</div>
          <div class="char-icon char-icon-friend"></div>
          <div class="char-info">
            <h3 class="char-name">陈永良</h3>
            <p class="char-role">善良的朋友</p>
          </div>
          <div class="char-details" v-if="expandedCharacter === 3">
            <div class="detail-section">
              <p class="detail-label">身份</p>
              <p class="detail-text">溪镇的绅士，家道殷实。收留了林祥福，成为他的挚友。</p>
            </div>
            <div class="detail-section">
              <p class="detail-label">帮助</p>
              <p class="detail-text">帮林祥福安家，照顾林百家。林祥福死后收养林百家。</p>
            </div>
            <div class="detail-section">
              <p class="detail-label">象征</p>
              <p class="detail-text">善良与人性的光辉，在动荡年代的温暖存在。</p>
            </div>
          </div>
        </div>

        <!-- Character 5: 纪念 -->
        <div
          class="character-card swiss-border"
          :class="{ 'expanded': expandedCharacter === 4 }"
          @click="toggleCharacter(4)"
        >
          <div class="char-number">05</div>
          <div class="char-icon char-icon-bandit"></div>
          <div class="char-info">
            <h3 class="char-name">纪家兄弟</h3>
            <p class="char-role">土匪</p>
          </div>
          <div class="char-details" v-if="expandedCharacter === 4">
            <div class="detail-section">
              <p class="detail-label">身份</p>
              <p class="detail-text">溪镇的土匪头目，无恶不作。代表了时代的黑暗与混乱。</p>
            </div>
            <div class="detail-section">
              <p class="detail-label">冲突</p>
              <p class="detail-text">与林祥福、陈永良等善良人形成对比。最终杀死林祥福。</p>
            </div>
            <div class="detail-section">
              <p class="detail-label">象征</p>
              <p class="detail-text">命运的无常与残酷，好人难有好报的悲剧现实。</p>
            </div>
          </div>
        </div>

        <!-- Character 6: 溪镇 -->
        <div
          class="character-card swiss-border"
          :class="{ 'expanded': expandedCharacter === 5 }"
          @click="toggleCharacter(5)"
        >
          <div class="char-number">06</div>
          <div class="char-icon char-icon-town"></div>
          <div class="char-info">
            <h3 class="char-name">溪镇</h3>
            <p class="char-role">南方的江南小镇</p>
          </div>
          <div class="char-details" v-if="expandedCharacter === 5">
            <div class="detail-section">
              <p class="detail-label">环境</p>
              <p class="detail-text">江南水乡，小桥流水，烟雨朦胧。与北方形成鲜明对比。</p>
            </div>
            <div class="detail-section">
              <p class="detail-label">意义</p>
              <p class="detail-text">林祥福的第二故乡，他在这里安家、等待、死去。溪镇就是文城。</p>
            </div>
            <div class="detail-section">
              <p class="detail-label">象征</p>
              <p class="detail-text">寻找的意义不在于终点，而在于过程。文城不是一个地方，而是一段人生。</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 02: TIMELINE -->
    <section class="section-timeline swiss-border-bottom">
      <div class="section-header">
        <p class="section-number">SECTION 02</p>
        <h2 class="section-title">TIMELINE</h2>
        <p class="section-subtitle">A Journey of Searching</p>
      </div>

      <div class="timeline-events">
        <!-- Event 1 -->
        <div
          class="event-card swiss-border"
          :class="{ 'expanded': expandedEvent === 0 }"
          @click="toggleEvent(0)"
        >
          <div class="event-number">01</div>
          <div class="event-content">
            <h3 class="event-title">娶妻</h3>
            <p class="event-desc">林祥福迎娶小美</p>
          </div>
          <div class="event-details" v-if="expandedEvent === 0">
            <p class="detail-text">北方农民林祥福娶了从南方来的小美。两人新婚，林祥福深爱着妻子。</p>
          </div>
        </div>

        <!-- Event 2 -->
        <div
          class="event-card swiss-border"
          :class="{ 'expanded': expandedEvent === 1 }"
          @click="toggleEvent(1)"
        >
          <div class="event-number">02</div>
          <div class="event-content">
            <h3 class="event-title">生女</h3>
            <p class="event-desc">林百家出生</p>
          </div>
          <div class="event-details" v-if="expandedEvent === 1">
            <p class="detail-text">小美生下女儿林百家。一家三口短暂幸福。</p>
          </div>
        </div>

        <!-- Event 3 -->
        <div
          class="event-card swiss-border"
          :class="{ 'expanded': expandedEvent === 2 }"
          @click="toggleEvent(2)"
        >
          <div class="event-number">03</div>
          <div class="event-content">
            <h3 class="event-title">离开</h3>
            <p class="event-desc">小美跟随阿强离开</p>
          </div>
          <div class="event-details" v-if="expandedEvent === 2">
            <p class="detail-text">小美的前夫阿强出现，带走了小美。小美只说老家在"文城"，林祥福从此踏上寻找之路。</p>
          </div>
        </div>

        <!-- Event 4 -->
        <div
          class="event-card swiss-border"
          :class="{ 'expanded': expandedEvent === 3 }"
          @click="toggleEvent(3)"
        >
          <div class="event-number">04</div>
          <div class="event-content">
            <h3 class="event-title">南下</h3>
            <p class="event-desc">千里寻妻</p>
          </div>
          <div class="event-details" v-if="expandedEvent === 3">
            <p class="detail-text">林祥福带着女儿南下寻找文城。走过很多地方，没有人知道文城在哪里。</p>
          </div>
        </div>

        <!-- Event 5 -->
        <div
          class="event-card swiss-border"
          :class="{ 'expanded': expandedEvent === 4 }"
          @click="toggleEvent(4)"
        >
          <div class="event-number">05</div>
          <div class="event-content">
            <h3 class="event-title">溪镇</h3>
            <p class="event-desc">安顿下来</p>
          </div>
          <div class="event-details" v-if="expandedEvent === 4">
            <p class="detail-text">林祥福来到溪镇，遇到陈永良。陈永良收留了他，帮他在溪镇安家。</p>
          </div>
        </div>

        <!-- Event 6 -->
        <div
          class="event-card swiss-border"
          :class="{ 'expanded': expandedEvent === 5 }"
          @click="toggleEvent(5)"
        >
          <div class="event-number">06</div>
          <div class="event-content">
            <h3 class="event-title">等待</h3>
            <p class="event-desc">20多年的守候</p>
          </div>
          <div class="event-details" v-if="expandedEvent === 5">
            <p class="detail-text">林祥福在溪镇做生意，照顾女儿，同时等待小美的归来。一年又一年，始终没有消息。</p>
          </div>
        </div>

        <!-- Event 7 -->
        <div
          class="event-card swiss-border"
          :class="{ 'expanded': expandedEvent === 6 }"
          @click="toggleEvent(6)"
        >
          <div class="event-number">07</div>
          <div class="event-content">
            <h3 class="event-title">土匪</h3>
            <p class="event-desc">纪家的威胁</p>
          </div>
          <div class="event-details" v-if="expandedEvent === 6">
            <p class="detail-text">纪家兄弟成为土匪，横行溪镇。林祥福与陈永良等人为保护家园与之对抗。</p>
          </div>
        </div>

        <!-- Event 8 -->
        <div
          class="event-card swiss-border"
          :class="{ 'expanded': expandedEvent === 7 }"
          @click="toggleEvent(7)"
        >
          <div class="event-number">08</div>
          <div class="event-content">
            <h3 class="event-title">死去</h3>
            <p class="event-desc">林祥福之死</p>
          </div>
          <div class="event-details" v-if="expandedEvent === 7">
            <p class="detail-text">林祥福被纪家兄弟杀死。至死也没有找到小美，也没有找到文城。但他找到了自己的人生。</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 03: THEMES -->
    <section class="section-themes swiss-border-bottom">
      <div class="section-header">
        <p class="section-number">SECTION 03</p>
        <h2 class="section-title">THEMES</h2>
        <p class="section-subtitle">Core Ideas of the Novel</p>
      </div>

      <div class="themes-grid">
        <!-- Theme 1 -->
        <div
          class="theme-card swiss-border"
          :class="{ 'expanded': expandedTheme === 0 }"
          @click="toggleTheme(0)"
        >
          <div class="theme-icon theme-search"></div>
          <h3 class="theme-name">寻找</h3>
          <p class="theme-short">生命的意义在于过程</p>
          <div class="theme-details" v-if="expandedTheme === 0">
            <p class="detail-text">林祥福一生都在寻找小美，寻找文城。但文城并不存在。小说告诉我们：寻找本身就是意义。重要的不是终点，而是寻找的过程。</p>
          </div>
        </div>

        <!-- Theme 2 -->
        <div
          class="theme-card swiss-border"
          :class="{ 'expanded': expandedTheme === 1 }"
          @click="toggleTheme(1)"
        >
          <div class="theme-icon theme-fate"></div>
          <h3 class="theme-name">宿命</h3>
          <p class="theme-short">无法逃脱的悲剧</p>
          <div class="theme-details" v-if="expandedTheme === 1">
            <p class="detail-text">每个人都有自己的宿命。小美的宿命是流浪，林祥福的宿命是寻找。命运无常，好人难有好报。</p>
          </div>
        </div>

        <!-- Theme 3 -->
        <div
          class="theme-card swiss-border"
          :class="{ 'expanded': expandedTheme === 2 }"
          @click="toggleTheme(2)"
        >
          <div class="theme-icon theme-waiting"></div>
          <h3 class="theme-name">等待</h3>
          <p class="theme-short">爱的坚持与煎熬</p>
          <div class="theme-details" v-if="expandedTheme === 2">
            <p class="detail-text">林祥福等待小美20多年。这是一种折磨，也是一种信念。等待让生命有了方向，也有了意义。</p>
          </div>
        </div>

        <!-- Theme 4 -->
        <div
          class="theme-card swiss-border"
          :class="{ 'expanded': expandedTheme === 3 }"
          @click="toggleTheme(3)"
        >
          <div class="theme-icon theme-home"></div>
          <h3 class="theme-name">家园</h3>
          <p class="theme-short">文城不是地方，是人</p>
          <div class="theme-details" v-if="expandedTheme === 3">
            <p class="detail-text">溪镇就是文城。陈永良一家就是文城。文城不是一个地理坐标，而是心灵的归宿。有家的地方，就是文城。</p>
          </div>
        </div>

        <!-- Theme 5 -->
        <div
          class="theme-card swiss-border"
          :class="{ 'expanded': expandedTheme === 4 }"
          @click="toggleTheme(4)"
        >
          <div class="theme-icon theme-kindness"></div>
          <h3 class="theme-name">善良</h3>
          <p class="theme-short">黑暗中的微光</p>
          <div class="theme-details" v-if="expandedTheme === 4">
            <p class="detail-text">陈永良一家对林祥福的善意，是书中温暖的亮色。在动荡的年代，善良成为最珍贵的品质。</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 04: QUOTES -->
    <section class="section-quotes">
      <div class="section-header">
        <p class="section-number">SECTION 04</p>
        <h2 class="section-title">QUOTES</h2>
        <p class="section-subtitle">Words from the Novel</p>
      </div>

      <div class="quotes-grid">
        <div class="quote-card">
          <div class="quote-spine quote-spine-brown"></div>
          <div class="quote-border-top"></div>
          <p class="quote-text">他会找到文城的。</p>
          <div class="quote-border-bottom"></div>
          <div class="quote-source">
            <span class="source-name">林祥福</span>
            <span class="source-role">信念</span>
          </div>
        </div>

        <div class="quote-card">
          <div class="quote-spine quote-spine-brown"></div>
          <div class="quote-border-top"></div>
          <p class="quote-text">文城不是一个地方，而是一段人生。</p>
          <div class="quote-border-bottom"></div>
          <div class="quote-source">
            <span class="source-name">叙述者</span>
            <span class="source-role">感悟</span>
          </div>
        </div>

        <div class="quote-card">
          <div class="quote-spine quote-spine-brown"></div>
          <div class="quote-border-top"></div>
          <p class="quote-text">寻找本身就是意义。</p>
          <div class="quote-border-bottom"></div>
          <div class="quote-source">
            <span class="source-name">叙述者</span>
            <span class="source-role">哲学</span>
          </div>
        </div>

        <div class="quote-card">
          <div class="quote-spine quote-spine-brown"></div>
          <div class="quote-border-top"></div>
          <p class="quote-text">我会找到她的，无论她在哪里。</p>
          <div class="quote-border-bottom"></div>
          <div class="quote-source">
            <span class="source-name">林祥福</span>
            <span class="source-role">决心</span>
          </div>
        </div>

        <div class="quote-card">
          <div class="quote-spine quote-spine-brown"></div>
          <div class="quote-border-top"></div>
          <p class="quote-text">人生就是不断地告别。</p>
          <div class="quote-border-bottom"></div>
          <div class="quote-source">
            <span class="source-name">叙述者</span>
            <span class="source-role">人生</span>
          </div>
        </div>

        <div class="quote-card">
          <div class="quote-spine quote-spine-brown"></div>
          <div class="quote-border-top"></div>
          <p class="quote-text">这里有你要找的安宁。</p>
          <div class="quote-border-bottom"></div>
          <div class="quote-source">
            <span class="source-name">溪镇</span>
            <span class="source-role">归宿</span>
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
const expandedCharacter = ref(null)
const expandedEvent = ref(null)
const expandedTheme = ref(null)

// Toggle functions
const toggleCharacter = (index) => {
  if (expandedCharacter.value === index) {
    expandedCharacter.value = null
  } else {
    expandedCharacter.value = index
    expandedEvent.value = null
    expandedTheme.value = null
  }
}

const toggleEvent = (index) => {
  if (expandedEvent.value === index) {
    expandedEvent.value = null
  } else {
    expandedEvent.value = index
    expandedCharacter.value = null
    expandedTheme.value = null
  }
}

const toggleTheme = (index) => {
  if (expandedTheme.value === index) {
    expandedTheme.value = null
  } else {
    expandedTheme.value = index
    expandedCharacter.value = null
    expandedEvent.value = null
  }
}

const exitWorld = () => {
  router.push('/yearbook/fiction')
}
</script>

<style scoped>
/* Main Container */
.wencheng-world {
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
  background-color: #8b6b4a;
  border-color: #8b6b4a;
}

.exit-arrow {
  margin-right: 0.5rem;
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
  color: #8b6b4a;
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
  color: #8b6b4a;
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
  color: #8b6b4a;
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
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  padding: 2rem;
  padding-left: 12rem;
}

.character-card {
  padding: 2rem;
  background-color: var(--swiss-white);
  cursor: pointer;
  transition: all 0.15s ease-out;
}

.character-card:not(.expanded):hover {
  background-color: #8b6b4a;
  border-color: #8b6b4a;
}

.character-card:not(.expanded):hover .char-name,
.character-card:not(.expanded):hover .char-role,
.character-card:not(.expanded):hover .detail-label,
.character-card:not(.expanded):hover .detail-text {
  color: var(--swiss-white) !important;
}

.character-card.expanded {
  background-color: var(--swiss-white) !important;
  border-color: var(--swiss-black) !important;
}

.char-number {
  font-family: 'Inter', sans-serif;
  font-weight: 900;
  font-size: 0.625rem;
  letter-spacing: 0.2em;
  color: #8b6b4a;
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
  content: '○';
  font-size: 40px;
  color: var(--swiss-black);
}

.char-icon-beloved::before {
  content: '♥';
  font-size: 36px;
  color: var(--swiss-black);
}

.char-icon-daughter::before {
  content: '◇';
  font-size: 36px;
  color: var(--swiss-black);
}

.char-icon-friend::before {
  content: '◆';
  font-size: 32px;
  color: var(--swiss-black);
}

.char-icon-bandit::before {
  content: '✕';
  font-size: 36px;
  color: var(--swiss-black);
}

.char-icon-town::before {
  content: '≋';
  font-size: 32px;
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

.char-details {
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
  color: #8b6b4a;
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

/* Section 02: TIMELINE */
.timeline-events {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  padding: 2rem;
  padding-left: 12rem;
}

.event-card {
  padding: 2rem;
  background-color: var(--swiss-white);
  cursor: pointer;
  transition: all 0.15s ease-out;
}

.event-card:not(.expanded):hover {
  background-color: #8b6b4a;
  border-color: #8b6b4a;
}

.event-card:not(.expanded):hover .event-title,
.event-card:not(.expanded):hover .event-desc,
.event-card:not(.expanded):hover .detail-text {
  color: var(--swiss-white) !important;
}

.event-card.expanded {
  background-color: var(--swiss-white) !important;
  border-color: var(--swiss-black) !important;
}

.event-number {
  font-family: 'Inter', sans-serif;
  font-weight: 900;
  font-size: 0.625rem;
  letter-spacing: 0.2em;
  color: #8b6b4a;
  margin: 0 0 1rem 0;
}

.event-content {
  margin: 0 0 1rem 0;
}

.event-title {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  line-height: 1.3;
  margin: 0 0 0.5rem 0;
  color: var(--swiss-black);
}

.event-desc {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 0.75rem;
  font-style: italic;
  color: var(--swiss-text-secondary);
  margin: 0;
}

.event-details {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 2px solid var(--swiss-black);
}

/* Section 03: THEMES */
.themes-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1.5rem;
  padding: 2rem;
  padding-left: 12rem;
}

.theme-card {
  padding: 2rem;
  background-color: var(--swiss-white);
  text-align: center;
  cursor: pointer;
  transition: all 0.15s ease-out;
}

.theme-card:not(.expanded):hover {
  background-color: #8b6b4a;
  border-color: #8b6b4a;
}

.theme-card:not(.expanded):hover .theme-name,
.theme-card:not(.expanded):hover .theme-short,
.theme-card:not(.expanded):hover .detail-text {
  color: var(--swiss-white) !important;
}

.theme-card.expanded {
  grid-column: span 2;
  text-align: left;
  cursor: default;
}

.theme-icon {
  width: 40px;
  height: 40px;
  margin: 0 auto 1rem;
  position: relative;
}

/* Theme Icons */
.theme-search::before {
  content: '◎';
  font-size: 32px;
  color: var(--swiss-black);
}

.theme-fate::before {
  content: '✕';
  font-size: 28px;
  color: var(--swiss-black);
}

.theme-waiting::before {
  content: '◌';
  font-size: 32px;
  color: var(--swiss-black);
}

.theme-home::before {
  content: '△';
  font-size: 32px;
  color: var(--swiss-black);
}

.theme-kindness::before {
  content: '♥';
  font-size: 28px;
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

.theme-short {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 0.75rem;
  line-height: 1.5;
  color: var(--swiss-text-secondary);
  margin: 0 0 1rem 0;
}

.theme-details {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 2px solid var(--swiss-black);
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
  border-color: #8b6b4a;
  transform: translateY(-2px);
}

/* Quote Spine - Brown Theme */
.quote-spine {
  width: 12px;
  height: 16px;
  background-color: #8b6b4a;
  position: absolute;
  top: -1px;
  left: -1px;
}

.quote-spine-brown {
  background-color: #8b6b4a;
}

/* Gradient Border Lines */
.quote-border-top {
  height: 2px;
  background: linear-gradient(90deg,
    var(--swiss-black) 0%,
    #8b6b4a 50%,
    var(--swiss-black) 100%
  );
  margin: 0 0 1.5rem 0;
}

.quote-border-bottom {
  height: 2px;
  background: linear-gradient(90deg,
    var(--swiss-black) 0%,
    #8b6b4a 50%,
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
  .timeline-events,
  .themes-grid,
  .quotes-grid {
    padding-left: 2rem;
  }

  .characters-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .timeline-events {
    grid-template-columns: repeat(2, 1fr);
  }

  .themes-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .theme-card.expanded {
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
  .timeline-events,
  .themes-grid,
  .quotes-grid {
    grid-template-columns: 1fr;
    padding: 1rem;
  }

  .theme-card.expanded {
    grid-column: span 1;
  }

  .exit-btn {
    top: 1rem;
    left: 1rem;
    padding: 0.5rem 1rem;
  }
}
</style>

<template>
  <div class="erguna-river-world swiss-grid-pattern swiss-noise">
    <!-- Exit Button -->
    <button class="exit-btn swiss-hover-invert" @click="exitWorld">
      <span class="exit-arrow">←</span> EXIT
    </button>

    <!-- Book Header -->
    <header class="book-header swiss-border-bottom">
      <div class="header-content">
        <p class="book-vol">VOL.010</p>
        <h1 class="book-title">额尔古纳河右岸</h1>
        <p class="book-subtitle">鄂温克族的百年史诗</p>
        <p class="book-author">迟子建 · 2005</p>
      </div>
      <div class="header-meta">
        <p class="meta-label">FICTION</p>
        <p class="meta-years">EPIC SAGA</p>
      </div>
    </header>

    <!-- Section 01: CHARACTERS -->
    <section class="section-characters swiss-border-bottom">
      <div class="section-header">
        <p class="section-number">SECTION 01</p>
        <h2 class="section-title">CHARACTERS</h2>
        <p class="section-subtitle">Voices of the Forest</p>
      </div>

      <div class="characters-grid">
        <!-- Character 1: 叙述者 -->
        <div
          class="character-card swiss-border"
          :class="{ 'expanded': expandedCharacter === 0 }"
          @click="toggleCharacter(0)"
        >
          <div class="char-number">01</div>
          <div class="char-icon char-icon-narrator"></div>
          <div class="char-info">
            <h3 class="char-name">叙述者</h3>
            <p class="char-role">最后一位酋长的女人</p>
          </div>
          <div class="char-details" v-if="expandedCharacter === 0">
            <div class="detail-section">
              <p class="detail-label">身份</p>
              <p class="detail-text">90岁的鄂温克女人，部落最后一位酋长的妻子。见证了族群的百年变迁。</p>
            </div>
            <div class="detail-section">
              <p class="detail-label">故事</p>
              <p class="detail-text">用第一人称讲述鄂温克族从兴衰到迁徙下山的故事。记忆是活着的化石。</p>
            </div>
            <div class="detail-section">
              <p class="detail-label">象征</p>
              <p class="detail-text">活着的史诗，口述历史的传承者。</p>
            </div>
          </div>
        </div>

        <!-- Character 2: 尼都萨满 -->
        <div
          class="character-card swiss-border"
          :class="{ 'expanded': expandedCharacter === 1 }"
          @click="toggleCharacter(1)"
        >
          <div class="char-number">02</div>
          <div class="char-icon char-icon-shaman"></div>
          <div class="char-info">
            <h3 class="char-name">尼都萨满</h3>
            <p class="char-role">部落萨满</p>
          </div>
          <div class="char-details" v-if="expandedCharacter === 1">
            <div class="detail-section">
              <p class="detail-label">能力</p>
              <p class="detail-text">能与神灵沟通，为人治病、占卜。萨满是鄂温克族的精神领袖。</p>
            </div>
            <div class="detail-section">
              <p class="detail-label">冲突</p>
              <p class="detail-text">爱上哥哥的女人，违背族规。情感与责任的撕裂。</p>
            </div>
            <div class="detail-section">
              <p class="detail-label">象征</p>
              <p class="detail-text">传统信仰与现代文明的冲突。</p>
            </div>
          </div>
        </div>

        <!-- Character 3: 拉吉达 -->
        <div
          class="character-card swiss-border"
          :class="{ 'expanded': expandedCharacter === 2 }"
          @click="toggleCharacter(2)"
        >
          <div class="char-number">03</div>
          <div class="char-icon char-icon-hunter"></div>
          <div class="char-info">
            <h3 class="char-name">拉吉达</h3>
            <p class="char-role">第一任酋长</p>
          </div>
          <div class="char-details" v-if="expandedCharacter === 2">
            <div class="detail-section">
              <p class="detail-label">事迹</p>
              <p class="detail-text">带领族人迁徙、狩猎，建立部落的规矩。勇敢而智慧的领袖。</p>
            </div>
            <div class="detail-section">
              <p class="detail-label">死亡</p>
              <p class="detail-text">被熊咬死，死得壮烈。成为部落的传说。</p>
            </div>
            <div class="detail-section">
              <p class="detail-label">象征</p>
              <p class="detail-text">鄂温克族的英雄时代，原始的生命力。</p>
            </div>
          </div>
        </div>

        <!-- Character 4: 瓦罗 -->
        <div
          class="character-card swiss-border"
          :class="{ 'expanded': expandedCharacter === 3 }"
          @click="toggleCharacter(3)"
        >
          <div class="char-number">04</div>
          <div class="char-icon char-icon-reindeer"></div>
          <div class="char-info">
            <h3 class="char-name">瓦罗</h3>
            <p class="char-role">驯鹿之心</p>
          </div>
          <div class="char-details" v-if="expandedCharacter === 3">
            <div class="detail-section">
              <p class="detail-label">关系</p>
              <p class="detail-text">叙述者的第一任丈夫，勇敢的猎人。爱得深沉，死于狩猎。</p>
            </div>
            <div class="detail-section">
              <p class="detail-label">意义</p>
              <p class="detail-text">代表鄂温克人与驯鹿的亲密关系，狩猎是生命方式。</p>
            </div>
            <div class="detail-section">
              <p class="detail-label">象征</p>
              <p class="detail-text">男性的力量与温柔，与自然共生的猎人精神。</p>
            </div>
          </div>
        </div>

        <!-- Character 5: 妮浩 -->
        <div
          class="character-card swiss-border"
          :class="{ 'expanded': expandedCharacter === 4 }"
          @click="toggleCharacter(4)"
        >
          <div class="char-number">05</div>
          <div class="char-icon char-icon-lost"></div>
          <div class="char-info">
            <h3 class="char-name">妮浩</h3>
            <p class="char-role">萨满的女儿</p>
          </div>
          <div class="char-details" v-if="expandedCharacter === 4">
            <div class="detail-section">
              <p class="detail-label">命运</p>
              <p class="detail-text">继承父亲成为萨满，但每次救人都要失去自己的孩子。宿命的残酷。</p>
            </div>
            <div class="detail-section">
              <p class="detail-label">牺牲</p>
              <p class="detail-text">救了无数人，却失去了三个孩子。萨满之路的代价。</p>
            </div>
            <div class="detail-section">
              <p class="detail-label">象征</p>
              <p class="detail-text">神性与人性的撕裂，大爱与小爱的冲突。</p>
            </div>
          </div>
        </div>

        <!-- Character 6: 现代文明 -->
        <div
          class="character-card swiss-border"
          :class="{ 'expanded': expandedCharacter === 5 }"
          @click="toggleCharacter(5)"
        >
          <div class="char-number">06</div>
          <div class="char-icon char-icon-modern"></div>
          <div class="char-info">
            <h3 class="char-name">现代文明</h3>
            <p class="char-role">伐木工 / 定居政策</p>
          </div>
          <div class="char-details" v-if="expandedCharacter === 5">
            <div class="detail-section">
              <p class="detail-label">冲击</p>
              <p class="detail-text">伐木工砍伐森林，定居政策要求鄂温克人下山。传统生活方式崩塌。</p>
            </div>
            <div class="detail-section">
              <p class="detail-label">矛盾</p>
              <p class="detail-text">文明进步与传统文化保护的冲突。山下生活舒适，但失去了灵魂。</p>
            </div>
            <div class="detail-section">
              <p class="detail-label">象征</p>
              <p class="detail-text">不可阻挡的现代化浪潮，少数文化的消逝。</p>
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
        <p class="section-subtitle">A Century of Change</p>
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
            <h3 class="event-title">山林时代</h3>
            <p class="event-desc">鄂温克族的游猎生活</p>
          </div>
          <div class="event-details" v-if="expandedEvent === 0">
            <p class="detail-text">清末民初，鄂温克族在额尔古纳河右岸的原始森林中以游猎为生。与驯鹿为伴，住撮罗子，信奉萨满教。与自然和谐共生的黄金时代。</p>
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
            <h3 class="event-title">俄国人来了</h3>
            <p class="event-desc">外来文明的第一次冲击</p>
          </div>
          <div class="event-details" v-if="expandedEvent === 1">
            <p class="detail-text">俄国人进入森林，带来酒和商品。部分鄂温克人开始与外界接触，但大部分仍保持传统生活方式。</p>
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
            <h3 class="event-title">日本侵华</h3>
            <p class="event-desc">战争年代的苦难</p>
          </div>
          <div class="event-details" v-if="expandedEvent === 2">
            <p class="detail-text">日本人控制林区，强迫鄂温克人交出猎物。族人被压迫，但仍在深山中保持自由。</p>
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
            <h3 class="event-title">新中国成立</h3>
            <p class="event-desc">社会变革的开始</p>
          </div>
          <div class="event-details" v-if="expandedEvent === 3">
            <p class="detail-text">1950年代，新政府建立。鄂温克族被认定为少数民族，但伐木业开始发展，森林开始减少。</p>
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
            <h3 class="event-title">文革风暴</h3>
            <p class="event-desc">传统信仰被摧毁</p>
          </div>
          <div class="event-details" v-if="expandedEvent === 4">
            <p class="detail-text">萨满教被禁止，神偶被烧毁。部落的精神支柱被打碎。传统文化遭受毁灭性打击。</p>
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
            <h3 class="event-title">大规模伐木</h3>
            <p class="event-desc">森林在消失</p>
          </div>
          <div class="event-details" v-if="expandedEvent === 5">
            <p class="detail-text">1980年代，林业开发加速。大片原始森林被砍伐。驯鹿无林可栖，游猎生活难以为继。</p>
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
            <h3 class="event-title">定居政策</h3>
            <p class="event-desc">下山还是留下？</p>
          </div>
          <div class="event-details" v-if="expandedEvent === 6">
            <p class="detail-text">政府要求鄂温克人定居山下。部分人搬走了，部分人坚持留在山上。族群开始分化。</p>
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
            <h3 class="event-title">驯鹿减少</h3>
            <p class="event-desc">游猎生活的终结</p>
          </div>
          <div class="event-details" v-if="expandedEvent === 7">
            <p class="detail-text">森林退化，驯鹿数量锐减。游猎生活方式难以为继。最后一批人也被迫下山。</p>
          </div>
        </div>

        <!-- Event 9 -->
        <div
          class="event-card swiss-border"
          :class="{ 'expanded': expandedEvent === 8 }"
          @click="toggleEvent(8)"
        >
          <div class="event-number">09</div>
          <div class="event-content">
            <h3 class="event-title">下山定居</h3>
            <p class="event-desc">传统生活的终结</p>
          </div>
          <div class="event-details" v-if="expandedEvent === 8">
            <p class="detail-text">2003年，最后一批鄂温克人下山定居。住进砖瓦房，孩子们上学。古老的游猎文明画上句号。</p>
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
          <div class="theme-icon theme-nature"></div>
          <h3 class="theme-name">人与自然</h3>
          <p class="theme-short">和谐共生的终结</p>
          <div class="theme-details" v-if="expandedTheme === 0">
            <p class="detail-text">鄂温克族敬畏自然，视森林为母亲，驯鹿为兄弟。但这种和谐关系被现代文明打破。伐木、开矿、建镇，森林在消失，人与自然的关系彻底改变。</p>
          </div>
        </div>

        <!-- Theme 2 -->
        <div
          class="theme-card swiss-border"
          :class="{ 'expanded': expandedTheme === 1 }"
          @click="toggleTheme(1)"
        >
          <div class="theme-icon theme-culture"></div>
          <h3 class="theme-name">文化消亡</h3>
          <p class="theme-short">传统与现代的冲突</p>
          <div class="theme-details" v-if="expandedTheme === 1">
            <p class="detail-text">萨满教被禁止，语言被遗忘，习俗在消失。鄂温克年轻一代不会说母语，不了解传统。文化断层是不可逆的损失。</p>
          </div>
        </div>

        <!-- Theme 3 -->
        <div
          class="theme-card swiss-border"
          :class="{ 'expanded': expandedTheme === 2 }"
          @click="toggleTheme(2)"
        >
          <div class="theme-icon theme-memory"></div>
          <h3 class="theme-name">记忆与讲述</h3>
          <p class="theme-short">口述历史的力量</p>
          <div class="theme-details" v-if="expandedTheme === 2">
            <p class="detail-text">整部小说是90岁老人的口述。记忆是活着的化石。讲述是对抗遗忘的武器，是见证历史的方式。</p>
          </div>
        </div>

        <!-- Theme 4 -->
        <div
          class="theme-card swiss-border"
          :class="{ 'expanded': expandedTheme === 3 }"
          @click="toggleTheme(3)"
        >
          <div class="theme-icon theme-love"></div>
          <h3 class="theme-name">爱与牺牲</h3>
          <p class="theme-short">情感的复杂维度</p>
          <div class="theme-details" v-if="expandedTheme === 3">
            <p class="detail-text">小说中的爱情故事充满悲剧色彩。尼都萨满爱上哥哥的女人，妮浩救人却失去孩子。爱在鄂温克族文化中是沉重而神圣的。</p>
          </div>
        </div>

        <!-- Theme 5 -->
        <div
          class="theme-card swiss-border"
          :class="{ 'expanded': expandedTheme === 4 }"
          @click="toggleTheme(4)"
        >
          <div class="theme-icon theme-death"></div>
          <h3 class="theme-name">死亡与尊严</h3>
          <p class="theme-short">向死而生的民族</p>
          <div class="theme-details" v-if="expandedTheme === 4">
            <p class="detail-text">鄂温克人面对死亡坦然。狩猎可能死，暴风雪可能死，但这是生活的一部分。死亡不是终结，而是回归自然。</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 04: QUOTES -->
    <section class="section-quotes">
      <div class="section-header">
        <p class="section-number">SECTION 04</p>
        <h2 class="section-title">QUOTES</h2>
        <p class="section-subtitle">Words from the River</p>
      </div>

      <div class="quotes-grid">
        <div class="quote-card">
          <div class="quote-spine quote-spine-green"></div>
          <div class="quote-border-top"></div>
          <p class="quote-text">没有路的时候，我们会迷路；路多了的时候，我们也会迷路。</p>
          <div class="quote-border-bottom"></div>
          <div class="quote-source">
            <span class="source-name">叙述者</span>
            <span class="source-role">开篇</span>
          </div>
        </div>

        <div class="quote-card">
          <div class="quote-spine quote-spine-green"></div>
          <div class="quote-border-top"></div>
          <p class="quote-text">故事是森林的记忆，河流的记忆。</p>
          <div class="quote-border-bottom"></div>
          <div class="quote-source">
            <span class="source-name">叙述者</span>
            <span class="source-role">关于讲述</span>
          </div>
        </div>

        <div class="quote-card">
          <div class="quote-spine quote-spine-green"></div>
          <div class="quote-border-top"></div>
          <p class="quote-text">你是森林的孩子，森林是你的母亲。</p>
          <div class="quote-border-bottom"></div>
          <div class="quote-source">
            <span class="source-name">母亲</span>
            <span class="source-role">第一章</span>
          </div>
        </div>

        <div class="quote-card">
          <div class="quote-spine quote-spine-green"></div>
          <div class="quote-border-top"></div>
          <p class="quote-text">驯鹿是鄂温克人的命，没有驯鹿，就没有鄂温克人。</p>
          <div class="quote-border-bottom"></div>
          <div class="quote-source">
            <span class="source-name">瓦罗</span>
            <span class="source-role">关于驯鹿</span>
          </div>
        </div>

        <div class="quote-card">
          <div class="quote-spine quote-spine-green"></div>
          <div class="quote-border-top"></div>
          <p class="quote-text">我这一生见过的河流太多了，它们都汇入了大海。</p>
          <div class="quote-border-bottom"></div>
          <div class="quote-source">
            <span class="source-name">叙述者</span>
            <span class="source-role">终章</span>
          </div>
        </div>

        <div class="quote-card">
          <div class="quote-spine quote-spine-green"></div>
          <div class="quote-border-top"></div>
          <p class="quote-text">火塘的火熄灭了，但心中的火还在燃烧。</p>
          <div class="quote-border-bottom"></div>
          <div class="quote-source">
            <span class="source-name">叙述者</span>
            <span class="source-role">定居之后</span>
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
.erguna-river-world {
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
  background-color: #5c8a4a;
  border-color: #5c8a4a;
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
  color: #5c8a4a;
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
  color: #5c8a4a;
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
  color: #5c8a4a;
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
  background-color: #5c8a4a;
  border-color: #5c8a4a;
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
  color: #5c8a4a;
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
.char-icon-narrator::before {
  content: '◐';
  font-size: 40px;
  color: var(--swiss-black);
}

.char-icon-shaman::before {
  content: '✦';
  font-size: 36px;
  color: var(--swiss-black);
}

.char-icon-hunter::before {
  content: '◈';
  font-size: 36px;
  color: var(--swiss-black);
}

.char-icon-reindeer::before {
  content: '♦';
  font-size: 36px;
  color: var(--swiss-black);
}

.char-icon-lost::before {
  content: '✕';
  font-size: 36px;
  color: var(--swiss-black);
}

.char-icon-modern::before {
  content: '▽';
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
  color: #5c8a4a;
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
  grid-template-columns: repeat(3, 1fr);
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
  background-color: #5c8a4a;
  border-color: #5c8a4a;
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
  color: #5c8a4a;
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
  background-color: #5c8a4a;
  border-color: #5c8a4a;
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
.theme-nature::before {
  content: '♣';
  font-size: 32px;
  color: var(--swiss-black);
}

.theme-culture::before {
  content: '◇';
  font-size: 32px;
  color: var(--swiss-black);
}

.theme-memory::before {
  content: '◎';
  font-size: 32px;
  color: var(--swiss-black);
}

.theme-love::before {
  content: '♥';
  font-size: 28px;
  color: var(--swiss-black);
}

.theme-death::before {
  content: '◼';
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
  border-color: #5c8a4a;
  transform: translateY(-2px);
}

/* Quote Spine - Green Theme */
.quote-spine {
  width: 12px;
  height: 16px;
  background-color: #5c8a4a;
  position: absolute;
  top: -1px;
  left: -1px;
}

.quote-spine-green {
  background-color: #5c8a4a;
}

/* Gradient Border Lines */
.quote-border-top {
  height: 2px;
  background: linear-gradient(90deg,
    var(--swiss-black) 0%,
    #5c8a4a 50%,
    var(--swiss-black) 100%
  );
  margin: 0 0 1.5rem 0;
}

.quote-border-bottom {
  height: 2px;
  background: linear-gradient(90deg,
    var(--swiss-black) 0%,
    #5c8a4a 50%,
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

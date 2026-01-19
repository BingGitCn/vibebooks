<template>
  <div class="veiled-world swiss-grid-pattern swiss-noise">
    <!-- EXIT button -->
    <button class="exit-btn swiss-hover-invert" @click="exitWorld">
      <span class="exit-arrow">←</span>
      EXIT
    </button>

    <!-- Header -->
    <header class="book-header swiss-border-bottom">
      <div class="header-content">
        <p class="book-vol">VOL.025</p>
        <h1 class="book-title">面纱</h1>
        <p class="book-subtitle">The Painted Veil</p>
        <p class="book-author">威廉·萨默塞特·毛姆 · 1925</p>
      </div>
      <div class="header-meta">
        <p class="meta-label">FICTION</p>
        <p class="meta-years">LOVE & REDEMPTION</p>
      </div>
    </header>

    <!-- Section 01: CHARACTERS -->
    <section class="section-characters swiss-border-bottom">
      <div class="section-header">
        <p class="section-number">SECTION 01</p>
        <h2 class="section-title">CHARACTERS</h2>
        <p class="section-subtitle">People in the Story</p>
      </div>

      <div class="characters-grid">
        <!-- Character 1: Kitty -->
        <div
          class="character-card swiss-border swiss-hover-accent clickable"
          :class="{ expanded: expandedCharacter === 0 }"
          @click="toggleCharacter(0)"
        >
          <div class="char-number">01</div>
          <div class="char-info">
            <h3 class="char-name">凯蒂</h3>
            <p class="char-role">从虚荣到觉醒的女人</p>
            <p class="char-desc">肤浅、美丽、成长</p>
          </div>
          <div class="char-quote swiss-dots">
            "我知道你愚蠢、轻浮、<br/>没有头脑，<br/>但我爱你"
          </div>
          <div class="char-details" v-if="expandedCharacter === 0">
            <div class="detail-section">
              <p class="detail-label">起点</p>
              <p class="detail-text">伦敦社交圈的虚荣女人，为了逃避平庸和家庭压力，匆忙嫁给不爱的细菌学家瓦尔特。肤浅、爱慕虚荣、追求物质享受。</p>
            </div>
            <div class="detail-section">
              <p class="detail-label">转折</p>
              <p class="detail-text">因婚外情被瓦尔特发现，被迫前往霍乱疫区。在死亡与痛苦中，第一次真正看见他人和世界，开始觉醒。</p>
            </div>
            <div class="detail-section">
              <p class="detail-label">觉醒</p>
              <p class="detail-text">在修道院帮助病患，理解了奉献和爱的意义。瓦尔特死后，她不再是那个虚荣的女人，而是一个独立、有尊严的女性。</p>
            </div>
          </div>
        </div>

        <!-- Character 2: Walter -->
        <div
          class="character-card swiss-border swiss-hover-accent clickable"
          :class="{ expanded: expandedCharacter === 1 }"
          @click="toggleCharacter(1)"
        >
          <div class="char-number">02</div>
          <div class="char-info">
            <h3 class="char-name">瓦尔特</h3>
            <p class="char-role">沉默的爱与死的尊严</p>
            <p class="char-desc">理智、克制、悲剧</p>
          </div>
          <div class="char-quote swiss-dots">
            "死的不是狗，<br/>是一个人"<br/>—瓦尔特的临终
          </div>
          <div class="char-details" v-if="expandedCharacter === 1">
            <div class="detail-section">
              <p class="detail-label">爱</p>
              <p class="detail-text">细菌学家，明知凯蒂肤浅虚荣，依然深爱她。得知凯蒂出轨后，给她两条路：要么随他去霍乱疫区，要么被他起诉通奸。</p>
            </div>
            <div class="detail-section">
              <p class="detail-label">牺牲</p>
              <p class="detail-text">在疫区救治病人，最终染病。临终前拒绝凯蒂的忏悔，不希望她因为内疚而留下。用死亡完成了对凯蒂的最后一份爱。</p>
            </div>
            <div class="detail-section">
              <p class="detail-label">意义</p>
              <p class="detail-text">代表理想主义的爱的极致——不求回报，甚至不惜以生命为代价。他的死是凯蒂觉醒的关键。</p>
            </div>
          </div>
        </div>

        <!-- Character 3: Charlie -->
        <div
          class="character-card swiss-border swiss-hover-accent clickable"
          :class="{ expanded: expandedCharacter === 2 }"
          @click="toggleCharacter(2)"
        >
          <div class="char-number">03</div>
          <div class="char-info">
            <h3 class="char-name">查理·唐生</h3>
            <p class="char-role">虚伪的诱惑者</p>
            <p class="char-desc">自私、平庸、伪善</p>
          </div>
          <div class="char-quote swiss-dots">
            "你不会真的<br/>以为我爱你吧？"<br/>—查理的真面目
          </div>
          <div class="char-details" v-if="expandedCharacter === 2">
            <div class="detail-section">
              <p class="detail-label">诱惑</p>
              <p class="detail-text">香港助理布政司，已婚，有三个孩子。与凯蒂发生婚外情，但从未真正爱过她，只是为了消遣和满足虚荣心。</p>
            </div>
            <div class="detail-section">
              <p class="detail-label">真相</p>
              <p class="detail-text">当凯蒂向他求助时，查理暴露了自私的本性。他只在乎自己的名誉和社会地位，根本不在乎凯蒂的生死。</p>
            </div>
            <div class="detail-section">
              <p class="detail-label">象征</p>
              <p class="detail-text">代表凯蒂所追求的虚荣世界——表面光鲜，实则空洞肤浅。查理的虚伪让凯蒂彻底看清了自己曾经的浅薄。</p>
            </div>
          </div>
        </div>

        <!-- Character 4: Waddington -->
        <div
          class="character-card swiss-border swiss-hover-accent clickable"
          :class="{ expanded: expandedCharacter === 3 }"
          @click="toggleCharacter(3)"
        >
          <div class="char-number">04</div>
          <div class="char-info">
            <h3 class="char-name">沃丁顿</h3>
            <p class="char-role">清醒的观察者</p>
            <p class="char-desc">幽默、洞察、神秘</p>
          </div>
          <div class="char-quote swiss-dots">
            "面纱之下，<br/>真相往往<br/>并不美丽"
          </div>
          <div class="char-details" v-if="expandedCharacter === 3">
            <div class="detail-section">
              <p class="detail-label">角色</p>
              <p class="detail-text">英国副专员，与满族公主过着隐居生活。他看透了殖民官员的虚伪和人性的复杂，是故事中最清醒的人物。</p>
            </div>
            <div class="detail-section">
              <p class="detail-label">洞察</p>
              <p class="detail-text">他理解瓦尔特对凯蒂的复杂情感，也看清了凯蒂的觉醒过程。他的话常常点破真相，帮助凯蒂认识自己。</p>
            </div>
            <div class="detail-section">
              <p class="detail-label">启示</p>
              <p class="detail-text">代表另一种生活的可能性——不在意社会规范，追求真实和自由。他让凯蒂看到，人生可以有其他选择。</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 02: JOURNEYS -->
    <section class="section-geographies swiss-border-bottom">
      <div class="section-header">
        <p class="section-number">SECTION 02</p>
        <h2 class="section-title">JOURNEYS</h2>
        <p class="section-subtitle">Three Spiritual Transformations</p>
      </div>

      <div class="geographies-list">
        <!-- Journey 1: London -->
        <div
          class="geo-item clickable"
          :class="{ expanded: expandedJourney === 0 }"
          @click="toggleJourney(0)"
        >
          <p class="geo-year">LONDON</p>
          <div class="geo-content">
            <p class="geo-title">虚荣的牢笼</p>
            <p class="geo-desc">社交场、婚外情、浅薄的爱</p>
            <div class="geo-details" v-if="expandedJourney === 0">
              <div class="detail-section">
                <p class="detail-label">精神状态</p>
                <p class="detail-text">被虚荣和社会规训所困。凯蒂认为人生的目标是嫁得好、有地位、享受物质。她不爱瓦尔特，只是为了逃避家庭的压力和年龄焦虑。</p>
              </div>
              <div class="detail-section">
                <p class="detail-label">关键事件</p>
                <p class="detail-text">与查理·唐生发生婚外情，以为找到了"真爱"。瓦尔特发现后，她以为查理会离婚娶她，结果暴露了查理的自私和虚伪。</p>
              </div>
              <div class="detail-section">
                <p class="detail-label">象征意义</p>
                <p class="detail-text">代表"面纱"的第一层——虚假的幸福。凯蒂生活在虚荣的幻想中，从未真正理解自己和他人。</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Journey 2: Mei-Tan-Fu -->
        <div
          class="geo-item clickable"
          :class="{ expanded: expandedJourney === 1 }"
          @click="toggleJourney(1)"
        >
          <p class="geo-year">MEI-TAN-FU</p>
          <div class="geo-content">
            <p class="geo-title">死亡的洗礼</p>
            <p class="geo-desc">霍乱疫区、修道院、觉醒</p>
            <div class="geo-details" v-if="expandedJourney === 1">
              <div class="detail-section">
                <p class="detail-label">精神状态</p>
                <p class="detail-text">在死亡面前，虚荣变得毫无意义。凯蒂第一次被迫直面人生，看见他人的痛苦。她的自我中心开始瓦解，真实的人性浮现。</p>
              </div>
              <div class="detail-section">
                <p class="detail-label">关键事件</p>
                <p class="detail-text">在修道院帮助修女照顾病患。目睹死亡和牺牲，理解了爱的真谛不是占有，而是奉献。瓦尔特染病去世，她失去了最后的保护伞。</p>
              </div>
              <div class="detail-section">
                <p class="detail-label">象征意义</p>
                <p class="detail-text">代表"面纱"被揭开——真相是痛苦的，但只有面对真相，人才能成长。死亡不是终点，而是觉醒的起点。</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Journey 3: Rebirth -->
        <div
          class="geo-item clickable"
          :class="{ expanded: expandedJourney === 2 }"
          @click="toggleJourney(2)"
        >
          <p class="geo-year">REBIRTH</p>
          <div class="geo-content">
            <p class="geo-title">独立的尊严</p>
            <p class="geo-desc">回到生活、拒绝旧我、自主</p>
            <div class="geo-details" v-if="expandedJourney === 2">
              <div class="detail-section">
                <p class="detail-label">精神状态</p>
                <p class="detail-text">不再是那个虚荣的女人，而是一个独立、有尊严的个体。她拒绝了查理的再次诱惑，也不再依附于任何人。</p>
              </div>
              <div class="detail-section">
                <p class="detail-label">关键事件</p>
                <p class="detail-text">回到香港后，查理试图再次诱惑她，但她彻底看清了查理的虚伪。回到英国后，她决定生下孩子，独立抚养。</p>
              </div>
              <div class="detail-section">
                <p class="detail-label">象征意义</p>
                <p class="detail-text">代表"面纱"彻底揭开——她找到了真实的自己。不是为了男人，而是为了自己而活。真正的自由是不再需要"面纱"。</p>
              </div>
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
        <p class="section-subtitle">Words from the Veil</p>
      </div>

      <div class="quotes-grid">
        <div class="quote-card">
          <div class="quote-spine"></div>
          <div class="quote-border-top"></div>
          <p class="quote-text">我知道你愚蠢、轻浮、没有头脑，但我爱你</p>
          <div class="quote-border-bottom"></div>
          <div class="quote-source">
            <span class="source-name">瓦尔特</span>
            <span class="source-role">爱的告白</span>
          </div>
        </div>

        <div class="quote-card">
          <div class="quote-spine"></div>
          <div class="quote-border-top"></div>
          <p class="quote-text">死的不是狗，是一个人</p>
          <div class="quote-border-bottom"></div>
          <div class="quote-source">
            <span class="source-name">瓦尔特</span>
            <span class="source-role">临终遗言</span>
          </div>
        </div>

        <div class="quote-card">
          <div class="quote-spine"></div>
          <div class="quote-border-top"></div>
          <p class="quote-text">我从来都无法得知，人们是为什么会爱上另一个人，我猜也许我们的心上都有一个缺口，它是个空洞，呼呼的往灵魂里灌着刺骨的寒风</p>
          <div class="quote-border-bottom"></div>
          <div class="quote-source">
            <span class="source-name">凯蒂的独白</span>
            <span class="source-role">关于爱</span>
          </div>
        </div>

        <div class="quote-card">
          <div class="quote-spine"></div>
          <div class="quote-border-top"></div>
          <p class="quote-text">只有一种办法能赢得众人的心，那就是让人们认为你是应该得到掌声的</p>
          <div class="quote-border-bottom"></div>
          <div class="quote-source">
            <span class="source-name">沃丁顿</span>
            <span class="source-role">社会洞察</span>
          </div>
        </div>

        <div class="quote-card">
          <div class="quote-spine"></div>
          <div class="quote-border-top"></div>
          <p class="quote-text">我想让你知道，我从来都没有爱过你</p>
          <div class="quote-border-bottom"></div>
          <div class="quote-source">
            <span class="source-name">查理</span>
            <span class="source-role">虚伪的真相</span>
          </div>
        </div>

        <div class="quote-card">
          <div class="quote-spine"></div>
          <div class="quote-border-top"></div>
          <p class="quote-text">我希望你不会因为任何理由而爱上我，因为我永远不会爱上你</p>
          <div class="quote-border-bottom"></div>
          <div class="quote-source">
            <span class="source-name">凯蒂</span>
            <span class="source-role">觉醒后的拒绝</span>
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
const expandedJourney = ref(null)

const exitWorld = () => {
  router.push('/yearbook/fiction')
}

const toggleCharacter = (index) => {
  if (expandedCharacter.value === index) {
    expandedCharacter.value = null
  } else {
    expandedCharacter.value = index
    expandedJourney.value = null
  }
}

const toggleJourney = (index) => {
  if (expandedJourney.value === index) {
    expandedJourney.value = null
  } else {
    expandedJourney.value = index
    expandedCharacter.value = null
  }
}
</script>

<style scoped>
.veiled-world {
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
  color: #e4d4c4;
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
  color: #e4d4c4;
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
  color: #e4d4c4;
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
  background: #e4d4c4;
  border-color: #e4d4c4;
}

.character-card:not(.expanded):hover * {
  color: #FFFFFF;
}

.char-number {
  font-family: 'Inter', sans-serif;
  font-weight: 900;
  font-size: 2rem;
  letter-spacing: -0.03em;
  color: #e4d4c4;
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
  background-image: radial-gradient(circle, #e4d4c4 1px, transparent 1px);
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
  color: #e4d4c4;
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

/* Geographies Section */
.geographies-list {
  padding: 0 2rem 3rem;
}

.geo-item {
  background: #FFFFFF;
  border: 2px solid #1A1A1A;
  margin-bottom: 1.5rem;
  cursor: pointer;
  transition: all 0.15s ease-out;
}

.geo-item:last-child {
  margin-bottom: 0;
}

.geo-item:not(.expanded):hover {
  background: #e4d4c4;
  border-color: #e4d4c4;
}

.geo-item:not(.expanded):hover * {
  color: #FFFFFF;
}

.geo-year {
  font-family: 'Inter', sans-serif;
  font-weight: 900;
  font-size: 0.875rem;
  letter-spacing: 0.2em;
  color: #e4d4c4;
  padding: 1rem 2rem;
  margin: 0;
  border-bottom: 2px solid #1A1A1A;
}

.geo-content {
  padding: 2rem;
}

.geo-title {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 1.5rem;
  letter-spacing: 0.05em;
  margin: 0 0 0.5rem;
  color: #1A1A1A;
}

.geo-desc {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 0.875rem;
  color: #666666;
  margin: 0;
}

.geo-details {
  padding: 1.5rem 0 0;
  border-top: 2px solid #1A1A1A;
  margin-top: 1.5rem;
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
  border-color: #e4d4c4;
  transform: translateY(-2px);
}

.quote-spine {
  position: absolute;
  top: 0;
  left: 2rem;
  width: 4px;
  height: 100%;
  background: #e4d4c4;
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
  background: #e4d4c4;
  border-color: #e4d4c4;
}

.swiss-hover-accent:hover * {
  color: #FFFFFF;
}

.swiss-dots {
  background-image: radial-gradient(circle, #e4d4c4 1px, transparent 1px);
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
  .veiled-world {
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

  .geographies-list {
    padding: 1rem;
  }
}
</style>

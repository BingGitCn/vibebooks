<template>
  <div class="moscow-gentleman-world swiss-grid-pattern swiss-noise">
    <!-- Exit Button -->
    <button class="exit-btn swiss-hover-invert" @click="exitWorld">
      <span class="exit-arrow">←</span> EXIT
    </button>

    <!-- Book Header -->
    <header class="book-header swiss-border-bottom">
      <div class="header-content">
        <p class="book-vol">VOL.004</p>
        <h1 class="book-title">莫斯科绅士</h1>
        <p class="book-subtitle">A Gentleman in Moscow</p>
        <p class="book-author">Amor Towles · 2016</p>
      </div>
      <div class="header-meta">
        <p class="meta-label">HOTEL METROPOL</p>
        <p class="meta-years">1922 — 1954</p>
      </div>
    </header>

    <!-- Section 01: ROOMS -->
    <section class="section-rooms swiss-border-bottom">
      <div class="section-header">
        <p class="section-number">SECTION 01</p>
        <h2 class="section-title">ROOMS</h2>
        <p class="section-subtitle">Spaces of Confinement, Spaces of Freedom</p>
      </div>

      <div class="rooms-grid">
        <!-- Room 316 - Rostov's Attic Room -->
        <div
          class="room-card swiss-border"
          :class="{ 'expanded': expandedRoom === 0 }"
          @click="toggleRoom(0)"
        >
          <div class="room-number">ROOM 316</div>
          <div class="room-plan">
            <div class="room-rectangle attic"></div>
          </div>
          <div class="room-info">
            <h3 class="room-name">阁楼房间</h3>
            <p class="room-desc">10×12 英尺的狭小空间</p>
          </div>
          <div class="room-character">
            <p class="char-name">罗斯托夫伯爵</p>
            <p class="char-title">Count Alexander Ilyich Rostov</p>
          </div>

          <!-- Expanded Details -->
          <div class="room-details" v-if="expandedRoom === 0">
            <div class="detail-section">
              <p class="detail-label">性格</p>
              <p class="detail-text">{{ roomDetails[0].personality }}</p>
            </div>
            <div class="detail-section">
              <p class="detail-label">生活</p>
              <p class="detail-text">{{ roomDetails[0].life }}</p>
            </div>
            <div class="detail-section">
              <p class="detail-label">哲学</p>
              <p class="detail-text">{{ roomDetails[0].philosophy }}</p>
            </div>
          </div>
        </div>

        <!-- The Boyar - Hotel Bar -->
        <div
          class="room-card swiss-border"
          :class="{ 'expanded': expandedRoom === 1 }"
          @click="toggleRoom(1)"
        >
          <div class="room-number">THE BOYAR</div>
          <div class="room-plan">
            <div class="room-rectangle bar"></div>
            <div class="bar-counter"></div>
          </div>
          <div class="room-info">
            <h3 class="room-name">酒店酒吧</h3>
            <p class="room-desc">社交中心，观察世界的窗口</p>
          </div>
          <div class="room-character">
            <p class="char-name">罗斯托夫 / 阿尔卡季</p>
            <p class="char-title">Head Bartender</p>
          </div>

          <!-- Expanded Details -->
          <div class="room-details" v-if="expandedRoom === 1">
            <div class="detail-section">
              <p class="detail-label">角色</p>
              <p class="detail-text">{{ roomDetails[1].role }}</p>
            </div>
            <div class="detail-section">
              <p class="detail-label">故事</p>
              <p class="detail-text">{{ roomDetails[1].story }}</p>
            </div>
            <div class="detail-section">
              <p class="detail-label">关系</p>
              <p class="detail-text">{{ roomDetails[1].relationships }}</p>
            </div>
          </div>
        </div>

        <!-- Restaurant - Dining Room -->
        <div
          class="room-card swiss-border"
          :class="{ 'expanded': expandedRoom === 2 }"
          @click="toggleRoom(2)"
        >
          <div class="room-number">RESTAURANT</div>
          <div class="room-plan">
            <div class="room-rectangle restaurant">
              <div class="table-round"></div>
              <div class="table-round"></div>
            </div>
          </div>
          <div class="room-info">
            <h3 class="room-name">餐厅</h3>
            <p class="room-desc">时代变迁的见证者</p>
          </div>
          <div class="room-character">
            <p class="char-name">安娜 / 娜塔莉亚</p>
            <p class="char-name">索菲亚 / 米什卡</p>
          </div>

          <!-- Expanded Details -->
          <div class="room-details" v-if="expandedRoom === 2">
            <div class="detail-section">
              <p class="detail-label">功能</p>
              <p class="detail-text">{{ roomDetails[2].function }}</p>
            </div>
            <div class="detail-section">
              <p class="detail-label">场景</p>
              <p class="detail-text">{{ roomDetails[2].scenes }}</p>
            </div>
            <div class="detail-section">
              <p class="detail-label">意义</p>
              <p class="detail-text">{{ roomDetails[2].meaning }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 02: DECADES -->
    <section class="section-decades swiss-border-bottom">
      <div class="section-header">
        <p class="section-number">SECTION 02</p>
        <h2 class="section-title">DECADES</h2>
        <p class="section-subtitle">Thirty-Two Years in One Building</p>
      </div>

      <div class="decades-timeline">
        <!-- 1922 -->
        <div
          class="decade-card swiss-border"
          :class="{ 'expanded': expandedDecade === 0 }"
          @click="toggleDecade(0)"
        >
          <div class="decade-year">1922</div>
          <div class="decade-icon icon-balance"></div>
          <div class="decade-info">
            <h3 class="decade-title">判决入宿</h3>
            <p class="decade-desc">被认定"无阶级敌人"</p>
          </div>

          <div class="decade-details" v-if="expandedDecade === 0">
            <div class="detail-section">
              <p class="detail-label">背景</p>
              <p class="detail-text">{{ decadeDetails[0].background }}</p>
            </div>
            <div class="detail-section">
              <p class="detail-label">判决</p>
              "若踏出酒店一步，即刻处决"
            </div>
          </div>
        </div>

        <!-- 1930s -->
        <div
          class="decade-card swiss-border"
          :class="{ 'expanded': expandedDecade === 1 }"
          @click="toggleDecade(1)"
        >
          <div class="decade-year">1930s</div>
          <div class="decade-icon icon-masks"></div>
          <div class="decade-info">
            <h3 class="decade-title">与安娜的友谊</h3>
            <p class="decade-desc">女演员安娜·乌拉诺娃</p>
          </div>

          <div class="decade-details" v-if="expandedDecade === 1">
            <div class="detail-section">
              <p class="detail-label">相遇</p>
              <p class="detail-text">{{ decadeDetails[1].meeting }}</p>
            </div>
            <div class="detail-section">
              <p class="detail-label">情感</p>
              <p class="detail-text">{{ decadeDetails[1].emotion }}</p>
            </div>
          </div>
        </div>

        <!-- 1940s -->
        <div
          class="decade-card swiss-border"
          :class="{ 'expanded': expandedDecade === 2 }"
          @click="toggleDecade(2)"
        >
          <div class="decade-year">1940s</div>
          <div class="decade-icon icon-triangle"></div>
          <div class="decade-info">
            <h3 class="decade-title">Nina 的成长</h3>
            <p class="decade-desc">酒店经理的女儿</p>
          </div>

          <div class="decade-details" v-if="expandedDecade === 2">
            <div class="detail-section">
              <p class="detail-label">关系</p>
              <p class="detail-text">{{ decadeDetails[2].relationship }}</p>
            </div>
            <div class="detail-section">
              <p class="detail-label">影响</p>
              <p class="detail-text">{{ decadeDetails[2].impact }}</p>
            </div>
          </div>
        </div>

        <!-- 1950s -->
        <div
          class="decade-card swiss-border"
          :class="{ 'expanded': expandedDecade === 3 }"
          @click="toggleDecade(3)"
        >
          <div class="decade-year">1950s</div>
          <div class="decade-icon icon-dots"></div>
          <div class="decade-info">
            <h3 class="decade-title">父女情深</h3>
            <p class="decade-desc">索菲亚的童年</p>
          </div>

          <div class="decade-details" v-if="expandedDecade === 3">
            <div class="detail-section">
              <p class="detail-label">角色</p>
              <p class="detail-text">{{ decadeDetails[3].role }}</p>
            </div>
            <div class="detail-section">
              <p class="detail-label">牺牲</p>
              <p class="detail-text">{{ decadeDetails[4].sacrifice }}</p>
            </div>
          </div>
        </div>

        <!-- 1960s -->
        <div
          class="decade-card swiss-border"
          :class="{ 'expanded': expandedDecade === 4 }"
          @click="toggleDecade(4)"
        >
          <div class="decade-year">1960s</div>
          <div class="decade-icon icon-columns"></div>
          <div class="decade-info">
            <h3 class="decade-title">政治风云</h3>
            <p class="decade-desc">时代的巨变</p>
          </div>

          <div class="decade-details" v-if="expandedDecade === 4">
            <div class="detail-section">
              <p class="detail-label">背景</p>
              <p class="detail-text">{{ decadeDetails[4].background }}</p>
            </div>
            <div class="detail-section">
              <p class="detail-label">变化</p>
              <p class="detail-text">{{ decadeDetails[4].change }}</p>
            </div>
          </div>
        </div>

        <!-- 1954 -->
        <div
          class="decade-card swiss-border"
          :class="{ 'expanded': expandedDecade === 5 }"
          @click="toggleDecade(5)"
        >
          <div class="decade-year">1954</div>
          <div class="decade-icon icon-door"></div>
          <div class="decade-info">
            <h3 class="decade-title">最终离开</h3>
            <p class="decade-desc">自由之门打开</p>
          </div>

          <div class="decade-details" v-if="expandedDecade === 5">
            <div class="detail-section">
              <p class="detail-label">情节</p>
              <p class="detail-text">{{ decadeDetails[5].plot }}</p>
            </div>
            <div class="detail-section">
              <p class="detail-label">意义</p>
              <p class="detail-text">{{ decadeDetails[5].meaning }}</p>
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
        <p class="section-subtitle">Wisdom from Hotel Metropol</p>
      </div>

      <div class="quotes-grid">
        <div class="quote-card">
          <div class="quote-number">01</div>
          <div class="quote-border-top"></div>
          <p class="quote-text">"如果一个人不能离开自己的房间，他是不是就失去了体验生活的一切？恰恰相反。"</p>
          <div class="quote-border-bottom"></div>
          <div class="quote-source">
            <span class="source-name">罗斯托夫伯爵</span>
            <span class="source-role">Count Rostov</span>
          </div>
        </div>

        <div class="quote-card">
          <div class="quote-number">02</div>
          <div class="quote-border-top"></div>
          <p class="quote-text">"一个人的命运不是由他所处的环境决定的，而是由他如何面对这些环境决定的。"</p>
          <div class="quote-border-bottom"></div>
          <div class="quote-source">
            <span class="source-name">亚历山大·罗斯托夫</span>
            <span class="source-role">Protagonist</span>
          </div>
        </div>

        <div class="quote-card">
          <div class="quote-number">03</div>
          <div class="quote-border-top"></div>
          <p class="quote-text">"无论生活把你放在哪里，你都有责任把它变成一个值得生活的地方。"</p>
          <div class="quote-border-bottom"></div>
          <div class="quote-source">
            <span class="source-name">罗斯托夫伯爵</span>
            <span class="source-role">Count Rostov</span>
          </div>
        </div>

        <div class="quote-card">
          <div class="quote-number">04</div>
          <div class="quote-border-top"></div>
          <p class="quote-text">"优雅不是一种行为，而是一种心态。无论在皇宫还是在阁楼，都可以保持优雅。"</p>
          <div class="quote-border-bottom"></div>
          <div class="quote-source">
            <span class="source-name">酒店生活哲学</span>
            <span class="source-role">Theme</span>
          </div>
        </div>

        <div class="quote-card">
          <div class="quote-number">05</div>
          <div class="quote-border-top"></div>
          <p class="quote-text">"我们没有选择时代的能力，但我们可以选择如何在时代中生活。"</p>
          <div class="quote-border-bottom"></div>
          <div class="quote-source">
            <span class="source-name">时代反思</span>
            <span class="source-role">Reflection</span>
          </div>
        </div>

        <div class="quote-card">
          <div class="quote-number">06</div>
          <div class="quote-border-top"></div>
          <p class="quote-text">"真正的贵族不在于血统，而在于品格。即使身无分文，也可以保持尊严。"</p>
          <div class="quote-border-bottom"></div>
          <div class="quote-source">
            <span class="source-name">贵族精神</span>
            <span class="source-role">Aristocracy</span>
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
const expandedRoom = ref(null)
const expandedDecade = ref(null)

// Toggle functions
const toggleRoom = (index) => {
  if (expandedRoom.value === index) {
    expandedRoom.value = null
  } else {
    expandedRoom.value = index
    expandedDecade.value = null
  }
}

const toggleDecade = (index) => {
  if (expandedDecade.value === index) {
    expandedDecade.value = null
  } else {
    expandedDecade.value = index
    expandedRoom.value = null
  }
}

// Room details data
const roomDetails = {
  0: {
    personality: '优雅、幽默、乐观、绅士风度。面对命运的逆转，始终保持尊严和风度。',
    life: '在10×12英尺的阁楼房间里度过了32年。从贵族变成"囚犯"，但内心从未被囚禁。',
    philosophy: '一个人的价值不在于他拥有的空间大小，而在于他如何使用这个空间。即使被困在一座酒店里，也能活出丰富的人生。'
  },
  1: {
    role: '1930年代成为酒店酒吧的服务员，最终成为首席调酒师。酒吧是他的社交中心，也是他观察世界的窗口。',
    story: '在这里，他遇见了政客、艺术家、间谍。他学会了调酒的艺术，也学会了如何在变化的时代中生存。',
    relationships: '与阿尔卡季（老板）的友谊，与无数客人的短暂相遇。这里是他的王国，他是这里的绅士国王。'
  },
  2: {
    function: '餐厅是时代变迁的见证者。从革命前的奢华到斯大林时代的简朴，餐厅的菜单、装饰、客人都在变化。',
    scenes: '与安娜的晚餐约会，与娜塔莉亚的浪漫时刻，与索菲亚的父女聚餐，与米什卡的深谈。餐厅承载了所有的情感时刻。',
    meaning: '即使在政治风云变幻的时代，人们依然需要美食、美酒和陪伴。餐厅是人类尊严的最后堡垒。'
  }
}

// Decade details data
const decadeDetails = {
  0: {
    background: '1922年，俄国革命后。罗斯托夫伯爵被布尔什维克法庭认定为"无阶级敌人"，因为他写的一首诗被认为"反革命"。',
    sentence: '判决：终身软禁在莫斯科大都会酒店。如果踏出酒店一步，即刻处决。'
  },
  1: {
    meeting: '安娜·乌拉诺娃，著名的女演员。两人因一次偶然的相遇成为朋友，维持了数十年的友谊。',
    emotion: '不是爱情，但比爱情更深刻。他们互相理解，互相支持，在艰难的时代给予对方温暖。'
  },
  2: {
    relationship: 'Nina 是酒店经理的女儿，从小在酒店长大。罗斯托夫成为了她的导师和朋友，教会她观察世界、理解人性。',
    impact: 'Nina 成长后离开酒店去冒险，后来将女儿索菲亚托付给罗斯托夫。这段关系改变了罗斯托夫的人生轨迹。'
  },
  3: {
    role: '当 Nina 被流放到西伯利亚时，罗斯托夫成为了索菲亚的养父。他在阁楼房间里抚养她长大，给她最好的教育。',
    sacrifice: '为了让索菲亚能够追求音乐梦想，罗斯托夫策划了逃离酒店的计划，最终在1954年成功离开。'
  },
  4: {
    background: '1950年代，斯大林去世，赫鲁晓夫上台，政治风向开始变化。莫斯科的文化氛围逐渐松动。',
    change: '酒店的客人变了，装饰变了，但罗斯托夫依然在那里，作为活的历史见证者。'
  },
  5: {
    plot: '1954年，罗斯托夫策划了一场大胆的逃离。为了给索菲亚一个自由的人生，他决定冒险走出酒店。',
    meaning: '32年后，罗斯托夫终于跨过了酒店的大门。他没有失去尊严，反而证明了真正的自由在内心。'
  }
}

const exitWorld = () => {
  router.push('/yearbook/fiction')
}
</script>

<style scoped>
/* Main Container */
.moscow-gentleman-world {
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
  margin-left: 10rem;
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

/* Section 01: ROOMS */
.rooms-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 2rem;
  padding-left: 12rem;
}

.room-card {
  cursor: pointer;
  transition: all 0.15s ease-out;
  padding: 2rem;
  background-color: var(--swiss-white);
  position: relative;
}

.room-card:not(.expanded):hover {
  background-color: var(--swiss-accent);
  border-color: var(--swiss-accent);
}

.room-card:not(.expanded):hover .room-number,
.room-card:not(.expanded):hover .room-name,
.room-card:not(.expanded):hover .room-desc,
.room-card:not(.expanded):hover .char-name,
.room-card:not(.expanded):hover .char-title {
  color: var(--swiss-white) !important;
}

.room-card.expanded {
  background-color: var(--swiss-white) !important;
  border-color: var(--swiss-black) !important;
}

.room-number {
  font-family: 'Inter', sans-serif;
  font-weight: 900;
  font-size: 0.625rem;
  letter-spacing: 0.2em;
  color: var(--swiss-accent);
  margin: 0 0 1.5rem 0;
}

.room-card.expanded .room-number {
  color: var(--swiss-accent);
}

/* Room Plan (Visual Element) */
.room-plan {
  margin: 0 0 1.5rem 0;
  position: relative;
  height: 120px;
  border: 2px solid var(--swiss-black);
  padding: 1rem;
}

.room-rectangle {
  width: 100%;
  height: 100%;
  border: 2px solid var(--swiss-black);
  position: relative;
}

.room-rectangle.attic {
  background: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 5px,
    rgba(0, 0, 0, 0.03) 5px,
    rgba(0, 0, 0, 0.03) 10px
  );
}

.room-rectangle.bar {
  background-color: rgba(255, 48, 0, 0.05);
}

.bar-counter {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 20%;
  background-color: var(--swiss-black);
}

.room-rectangle.restaurant {
  background-color: rgba(0, 0, 0, 0.02);
}

.table-round {
  position: absolute;
  width: 20px;
  height: 20px;
  border: 2px solid var(--swiss-black);
  border-radius: 50%;
  top: 50%;
  transform: translateY(-50%);
}

.table-round:nth-child(1) {
  left: 30%;
}

.table-round:nth-child(2) {
  right: 30%;
}

/* Room Info */
.room-info {
  margin: 0 0 1.5rem 0;
}

.room-name {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 1.125rem;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  line-height: 1.3;
  margin: 0 0 0.5rem 0;
  color: var(--swiss-black);
}

.room-desc {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 0.875rem;
  color: var(--swiss-text-secondary);
  margin: 0;
}

/* Room Character - FIXED */
.room-character {
  padding: 1rem;
  background-color: var(--swiss-muted);
  border: 2px solid var(--swiss-black);
  margin: 0;
}

.char-name {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--swiss-black);
  margin: 0 0 0.25rem 0;
}

.char-title {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 0.625rem;
  letter-spacing: 0.1em;
  color: var(--swiss-text-secondary);
  margin: 0;
}

/* Expanded state - Ensure colors remain dark */
.room-card.expanded .room-character {
  background-color: var(--swiss-muted) !important;
  border-color: var(--swiss-black) !important;
}

.room-card.expanded .char-name {
  color: var(--swiss-black) !important;
}

.room-card.expanded .char-title {
  color: var(--swiss-text-secondary) !important;
}

/* Expanded state hover - Keep colors dark */
.room-card.expanded:hover {
  background-color: var(--swiss-white) !important;
  border-color: var(--swiss-black) !important;
}

.room-card.expanded:hover .room-number,
.room-card.expanded:hover .room-name,
.room-card.expanded:hover .room-desc,
.room-card.expanded:hover .char-name,
.room-card.expanded:hover .char-title,
.room-card.expanded:hover .detail-label,
.room-card.expanded:hover .detail-text {
  color: var(--swiss-black) !important;
}

.room-card.expanded:hover .char-title,
.room-card.expanded:hover .room-desc,
.room-card.expanded:hover .detail-text {
  color: var(--swiss-text-secondary) !important;
}

/* Room Details (Expanded) */
.room-details {
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

/* Section 02: DECADES */
.decades-timeline {
  padding: 2rem;
  padding-left: 12rem;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 1rem;
}

.decade-card {
  cursor: pointer;
  transition: all 0.15s ease-out;
  padding: 1.5rem;
  background-color: var(--swiss-white);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.decade-card:not(.expanded):hover {
  background-color: var(--swiss-accent);
  border-color: var(--swiss-accent);
}

.decade-card:not(.expanded):hover .decade-year,
.decade-card:not(.expanded):hover .decade-title,
.decade-card:not(.expanded):hover .decade-desc {
  color: var(--swiss-white) !important;
}

.decade-card.expanded {
  background-color: var(--swiss-white) !important;
  border-color: var(--swiss-black) !important;
  grid-column: span 2;
  text-align: left;
  align-items: flex-start;
}

.decade-year {
  font-family: 'Inter', sans-serif;
  font-weight: 900;
  font-size: 1.5rem;
  letter-spacing: 0.1em;
  color: var(--swiss-black);
  margin: 0 0 1rem 0;
}

.decade-card.expanded .decade-year {
  color: var(--swiss-black);
}

/* Geometric Icons */
.decade-icon {
  width: 40px;
  height: 40px;
  margin: 0 0 1rem 0;
  position: relative;
}

/* Balance Scale (1922) */
.icon-balance::before,
.icon-balance::after {
  content: '';
  position: absolute;
}

.icon-balance::before {
  width: 2px;
  height: 30px;
  background-color: var(--swiss-black);
  left: 50%;
  top: 5px;
  transform: translateX(-50%);
}

.icon-balance::after {
  width: 30px;
  height: 2px;
  background-color: var(--swiss-black);
  left: 50%;
  top: 10px;
  transform: translateX(-50%);
}

/* Theater Masks (1930s) */
.icon-masks::before,
.icon-masks::after {
  content: '';
  position: absolute;
  width: 16px;
  height: 20px;
  border: 2px solid var(--swiss-black);
  top: 10px;
}

.icon-masks::before {
  left: 2px;
  border-radius: 50% 50% 0 0;
}

.icon-masks::after {
  right: 2px;
  border-radius: 0 0 50% 50%;
}

/* Triangle (1940s) */
.icon-triangle::before {
  content: '';
  position: absolute;
  width: 0;
  height: 0;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  border-bottom: 26px solid var(--swiss-black);
  top: 7px;
  left: 50%;
  transform: translateX(-50%);
}

/* Three Dots (1950s) */
.icon-dots::before,
.icon-dots::after {
  content: '';
  position: absolute;
  width: 8px;
  height: 8px;
  background-color: var(--swiss-black);
  border-radius: 50%;
  top: 50%;
  transform: translateY(-50%);
}

.icon-dots::before {
  left: 5px;
}

.icon-dots::after {
  right: 5px;
}

.icon-dots {
  background-color: var(--swiss-black);
  position: relative;
}

.icon-dots::before {
  left: 5px;
  top: 50%;
  transform: translateY(-50%);
}

.icon-dots::after {
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
}

/* Columns (1960s) */
.icon-columns::before,
.icon-columns::after {
  content: '';
  position: absolute;
  width: 8px;
  height: 30px;
  background-color: var(--swiss-black);
  top: 5px;
}

.icon-columns::before {
  left: 8px;
}

.icon-columns::after {
  right: 8px;
}

/* Door (1954) */
.icon-door::before {
  content: '';
  position: absolute;
  width: 26px;
  height: 34px;
  border: 2px solid var(--swiss-black);
  top: 3px;
  left: 50%;
  transform: translateX(-50%);
}

.icon-door::after {
  content: '';
  position: absolute;
  width: 4px;
  height: 4px;
  background-color: var(--swiss-black);
  border-radius: 50%;
  top: 20px;
  right: 8px;
}

.decade-title {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  line-height: 1.3;
  margin: 0 0 0.5rem 0;
  color: var(--swiss-black);
}

.decade-desc {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 0.75rem;
  color: var(--swiss-text-secondary);
  margin: 0 0 1rem 0;
}

/* Decade Details (Expanded) */
.decade-details {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 2px solid var(--swiss-black);
  width: 100%;
}

/* Section 03: QUOTES - REDESIGNED */
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

/* Quote Number - Gold Door Number Style */
.quote-number {
  font-family: 'Inter', sans-serif;
  font-weight: 900;
  font-size: 0.625rem;
  letter-spacing: 0.2em;
  color: var(--swiss-white);
  background-color: var(--swiss-black);
  padding: 0.25rem 0.5rem;
  position: absolute;
  top: -1px;
  left: -1px;
}

/* Gold Border Lines */
.quote-border-top {
  height: 2px;
  background: linear-gradient(90deg,
    var(--swiss-black) 0%,
    var(--swiss-gold) 50%,
    var(--swiss-black) 100%
  );
  margin: 0 0 1.5rem 0;
}

.quote-border-bottom {
  height: 2px;
  background: linear-gradient(90deg,
    var(--swiss-black) 0%,
    var(--swiss-gold) 50%,
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

/* Gold Color */
:root {
  --swiss-gold: #C9A962;
}

/* Responsive */
@media (max-width: 1024px) {
  .book-header,
  .section-header,
  .rooms-grid,
  .decades-timeline,
  .section-quotes {
    margin-left: 0;
    padding-left: 2rem;
  }

  .rooms-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .decades-timeline {
    grid-template-columns: repeat(3, 1fr);
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

  .rooms-grid,
  .decades-timeline,
  .quotes-grid {
    grid-template-columns: 1fr;
    padding: 1rem;
  }

  .decade-card.expanded {
    grid-column: span 1;
  }

  .exit-btn {
    top: 1rem;
    left: 1rem;
    padding: 0.5rem 1rem;
  }
}
</style>

<template>
  <div class="killing-commendatore-world swiss-grid-pattern swiss-noise">
    <!-- Exit Button -->
    <button class="exit-btn swiss-hover-invert" @click="exitWorld">
      <span class="exit-arrow">←</span> EXIT
    </button>

    <!-- Book Header -->
    <header class="book-header swiss-border-bottom">
      <div class="header-content">
        <p class="book-vol">VOL.007</p>
        <h1 class="book-title">刺杀骑士团长</h1>
        <p class="book-subtitle">隐喻、理念与历史创伤</p>
        <p class="book-author">村上春树 · 2017</p>
      </div>
      <div class="header-meta">
        <p class="meta-label">FICTION</p>
        <p class="meta-years">METAPHOR & IDEA</p>
      </div>
    </header>

    <!-- Section 01: CHARACTERS -->
    <section class="section-characters swiss-border-bottom">
      <div class="section-header">
        <p class="section-number">SECTION 01</p>
        <h2 class="section-title">CHARACTERS</h2>
        <p class="section-subtitle">People in the Metaphor</p>
      </div>

      <div class="characters-grid">
        <!-- Character 1: "我" -->
        <div
          class="character-card swiss-border"
          :class="{ 'expanded': expandedCharacter === 0 }"
          @click="toggleCharacter(0)"
        >
          <div class="char-number">01</div>
          <div class="char-icon char-icon-protagonist"></div>
          <div class="char-info">
            <h3 class="char-name">"我"（免中彻）</h3>
            <p class="char-role">失去声音的画家 / 叙述者</p>
          </div>
          <div class="char-details" v-if="expandedCharacter === 0">
            <div class="detail-section">
              <p class="detail-label">性格</p>
              <p class="detail-text">36岁，刚离婚的肖像画家。内省、敏感，在现实与理念的边界挣扎。</p>
            </div>
            <div class="detail-section">
              <p class="detail-label">故事</p>
              <p class="detail-text">搬入山中旧宅后，失去声音，只能听到自己的声音。接受刺杀骑士团长的使命。</p>
            </div>
            <div class="detail-section">
              <p class="detail-label">象征</p>
              <p class="detail-text">艺术家在创作与现实之间的存在状态。</p>
            </div>
          </div>
        </div>

        <!-- Character 2: 骑士团长 -->
        <div
          class="character-card swiss-border"
          :class="{ 'expanded': expandedCharacter === 1 }"
          @click="toggleCharacter(1)"
        >
          <div class="char-number">02</div>
          <div class="char-icon char-icon-idea"></div>
          <div class="char-info">
            <h3 class="char-name">骑士团长</h3>
            <p class="char-role">理念的存在</p>
          </div>
          <div class="char-details" v-if="expandedCharacter === 1">
            <div class="detail-section">
              <p class="detail-label">外貌</p>
              <p class="detail-text">60厘米高，身穿白色铠甲，没有脸。从画中"出现"的现实存在。</p>
            </div>
            <div class="detail-section">
              <p class="detail-label">功能</p>
              <p class="detail-text">保护真理惠，但也囚禁她。必须被"我"刺杀才能解放。</p>
            </div>
            <div class="detail-section">
              <p class="detail-label">象征</p>
              <p class="detail-text">柏拉图式的"理念"（Idea），完美的概念形态。</p>
            </div>
          </div>
        </div>

        <!-- Character 3: 免中真理惠 -->
        <div
          class="character-card swiss-border"
          :class="{ 'expanded': expandedCharacter === 2 }"
          @click="toggleCharacter(2)"
        >
          <div class="char-number">03</div>
          <div class="char-icon char-icon-listener"></div>
          <div class="char-info">
            <h3 class="char-name">免中真理惠</h3>
            <p class="char-role">听觉者 / 媒介</p>
          </div>
          <div class="char-details" v-if="expandedCharacter === 2">
            <div class="detail-section">
              <p class="detail-label">特质</p>
              <p class="detail-text">13岁，特殊的听觉能力，能听到"理念"的声音。天真烂漫却洞察深刻。</p>
            </div>
            <div class="detail-section">
              <p class="detail-label">故事</p>
              <p class="detail-text">神秘失踪，被骑士团长囚禁在隐喻空间。等待"我"的营救。</p>
            </div>
            <div class="detail-section">
              <p class="detail-label">象征</p>
              <p class="detail-text">连接现实与理念世界的桥梁，纯真与洞察的结合。</p>
            </div>
          </div>
        </div>

        <!-- Character 4: 秋川真理惠 -->
        <div
          class="character-card swiss-border"
          :class="{ 'expanded': expandedCharacter === 3 }"
          @click="toggleCharacter(3)"
        >
          <div class="char-number">04</div>
          <div class="char-icon char-icon-lover"></div>
          <div class="char-info">
            <h3 class="char-name">秋川真理惠</h3>
            <p class="char-role">绘画模特 / 恋人</p>
          </div>
          <div class="char-details" v-if="expandedCharacter === 3">
            <div class="detail-section">
              <p class="detail-label">特质</p>
              <p class="detail-text">20岁的大学生，"我"的绘画模特。真实的肉体存在，充满生命力。</p>
            </div>
            <div class="detail-section">
              <p class="detail-label">关系</p>
              <p class="detail-text">与"我"发展出亲密关系。将"我"从隐喻世界拉回现实。</p>
            </div>
            <div class="detail-section">
              <p class="detail-label">象征</p>
              <p class="detail-text">现实世界的温暖与连接，对抗理念的诱惑。</p>
            </div>
          </div>
        </div>

        <!-- Character 5: 免中涉 -->
        <div
          class="character-card swiss-border"
          :class="{ 'expanded': expandedCharacter === 4 }"
          @click="toggleCharacter(4)"
        >
          <div class="char-number">05</div>
          <div class="char-icon char-icon-past"></div>
          <div class="char-info">
            <h3 class="char-name">免中涉</h3>
            <p class="char-role">著名画家 / 历史罪人</p>
          </div>
          <div class="char-details" v-if="expandedCharacter === 4">
            <div class="detail-section">
              <p class="detail-label">身份</p>
              <p class="detail-text">真理惠的姨父，著名画家。年轻时在南京犯下暴行。</p>
            </div>
            <div class="detail-section">
              <p class="detail-label">故事</p>
              <p class="detail-text">历史真相被揭露后自杀。他的罪行成为家族的阴影。</p>
            </div>
            <div class="detail-section">
              <p class="detail-label">象征</p>
              <p class="detail-text">历史创伤的承载者，个人与历史的纠缠。</p>
            </div>
          </div>
        </div>

        <!-- Character 6: MEN -->
        <div
          class="character-card swiss-border"
          :class="{ 'expanded': expandedCharacter === 5 }"
          @click="toggleCharacter(5)"
        >
          <div class="char-number">06</div>
          <div class="char-icon char-icon-death"></div>
          <div class="char-info">
            <h3 class="char-name">男（MEN）</h3>
            <p class="char-role">另一个理念</p>
          </div>
          <div class="char-details" v-if="expandedCharacter === 5">
            <div class="detail-section">
              <p class="detail-label">外貌</p>
              <p class="detail-text">穿着黑色西服，没有任何明确形态。带来死亡的预感。</p>
            </div>
            <div class="detail-section">
              <p class="detail-label">功能</p>
              <p class="detail-text">地下室的守护者，隐喻世界的另一个面向。</p>
            </div>
            <div class="detail-section">
              <p class="detail-label">象征</p>
              <p class="detail-text">死亡的必然性，理念的阴暗面。</p>
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
        <p class="section-subtitle">Story Progression</p>
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
            <h3 class="event-title">离婚与山中隐居</h3>
            <p class="event-desc">"我"搬入免中涉的山中旧宅</p>
          </div>
          <div class="event-details" v-if="expandedEvent === 0">
            <p class="detail-text">36岁的"我"刚经历离婚，接受邀请搬到画家免中涉的山中别墅。在阁楼设立画室，开始新的生活。</p>
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
            <h3 class="event-title">发现画作</h3>
            <p class="event-desc">阁楼中的《刺杀骑士团长》</p>
          </div>
          <div class="event-details" v-if="expandedEvent === 1">
            <p class="detail-text">在阁楼发现免中涉年轻时画的《刺杀骑士团长》。画作描绘了一个小型骑士被刺杀的场景。</p>
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
            <h3 class="event-title">井中铃声</h3>
            <p class="event-desc">从深井中传来的神秘铃声</p>
          </div>
          <div class="event-details" v-if="expandedEvent === 2">
            <p class="detail-text">雨夜，"我"听到从院子深井中传来的铃声。这是隐喻世界开始显现的信号。</p>
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
            <h3 class="event-title">理念显现</h3>
            <p class="event-desc">骑士团长从画中"出现"</p>
          </div>
          <div class="event-details" v-if="expandedEvent === 3">
            <p class="detail-text">60厘米高的骑士团长出现在现实中。他自称是"理念"，保护着免中真理惠。</p>
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
            <h3 class="event-title">真理惠失踪</h3>
            <p class="event-desc">少女消失在隐喻世界</p>
          </div>
          <div class="event-details" v-if="expandedEvent === 4">
            <p class="detail-text">免中真理惠神秘失踪。骑士团长承认将她囚禁在某处。只有"我"能救她。</p>
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
            <h3 class="event-title">下降到井底</h3>
            <p class="event-desc">进入隐喻的地下世界</p>
          </div>
          <div class="event-details" v-if="expandedEvent === 5">
            <p class="detail-text">"我"沿着深井下降，进入隐喻世界。这里是理念与象征交织的空间。</p>
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
            <h3 class="event-title">刺杀骑士团长</h3>
            <p class="event-desc">与理念的暴力分离</p>
          </div>
          <div class="event-details" v-if="expandedEvent === 6">
            <p class="detail-text">在隐喻空间中，"我"用刀刺杀骑士团长。这是成长的必经之路——与完美理念分离。</p>
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
            <h3 class="event-title">历史真相</h3>
            <p class="event-desc">南京大屠杀的揭露</p>
          </div>
          <div class="event-details" v-if="expandedEvent === 7">
            <p class="detail-text">免中涉年轻时在南京参与暴行的真相被揭露。历史创伤如何影响个人与后代？</p>
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
            <h3 class="event-title">声音恢复</h3>
            <p class="event-desc">回归现实世界</p>
          </div>
          <div class="event-details" v-if="expandedEvent === 8">
            <p class="detail-text">完成使命后，"我"的声音恢复。与秋川真理惠的关系深化。回归现实生活。</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 03: CONCEPTS -->
    <section class="section-concepts swiss-border-bottom">
      <div class="section-header">
        <p class="section-number">SECTION 03</p>
        <h2 class="section-title">CONCEPTS</h2>
        <p class="section-subtitle">Core Ideas of the Novel</p>
      </div>

      <div class="concepts-grid">
        <!-- Concept 1 -->
        <div
          class="concept-card swiss-border"
          :class="{ 'expanded': expandedConcept === 0 }"
          @click="toggleConcept(0)"
        >
          <div class="concept-icon concept-idea"></div>
          <h3 class="concept-name">理念</h3>
          <p class="concept-short">柏拉图式的完美形态</p>
          <div class="concept-details" v-if="expandedConcept === 0">
            <p class="detail-text">柏拉图哲学中的"理念"（Idea），是脱离现实存在的完美概念形态。骑士团长就是"理念"的化身。村上通过这个概念探讨了艺术与现实的关系。</p>
          </div>
        </div>

        <!-- Concept 2 -->
        <div
          class="concept-card swiss-border"
          :class="{ 'expanded': expandedConcept === 1 }"
          @click="toggleConcept(1)"
        >
          <div class="concept-icon concept-metaphor"></div>
          <h3 class="concept-name">隐喻</h3>
          <p class="concept-short">连接现实与理念的桥梁</p>
          <div class="concept-details" v-if="expandedConcept === 1">
            <p class="detail-text">"隐喻这东西，可以说是在深层意义上准确把握现实唯一的手段。"隐喻是连接理念与现实的桥梁，但会变形、扭曲。刺杀骑士团长，就是刺杀隐喻。</p>
          </div>
        </div>

        <!-- Concept 3 -->
        <div
          class="concept-card swiss-border"
          :class="{ 'expanded': expandedConcept === 2 }"
          @click="toggleConcept(2)"
        >
          <div class="concept-icon concept-well"></div>
          <h3 class="concept-name">井</h3>
          <p class="concept-short">通向无意识的通道</p>
          <div class="concept-details" v-if="expandedConcept === 2">
            <p class="detail-text">井象征着通向无意识深处的通道。只有下降到井底，进入黑暗，才能获得光明。这是心理分析的象征，也是创作过程的隐喻。</p>
          </div>
        </div>

        <!-- Concept 4 -->
        <div
          class="concept-card swiss-border"
          :class="{ 'expanded': expandedConcept === 3 }"
          @click="toggleConcept(3)"
        >
          <div class="concept-icon concept-voice"></div>
          <h3 class="concept-name">声音</h3>
          <p class="concept-short">自我与他者的界限</p>
          <div class="concept-details" v-if="expandedConcept === 3">
            <p class="detail-text">"我"失去声音，只能听到自己的声音。这象征着自我与他者界限的模糊。声音的恢复意味着找到新的表达方式，完成艺术的蜕变。</p>
          </div>
        </div>

        <!-- Concept 5 -->
        <div
          class="concept-card swiss-border"
          :class="{ 'expanded': expandedConcept === 4 }"
          @click="toggleConcept(4)"
        >
          <div class="concept-icon concept-history"></div>
          <h3 class="concept-name">历史创伤</h3>
          <p class="concept-short">南京大屠杀的隐喻</p>
          <div class="concept-details" v-if="expandedConcept === 4">
            <p class="detail-text">小说以隐喻方式呈现南京大屠杀。免中涉的暴行如何影响后代？村上提出的问题是：记住，但不重复。历史创伤通过代际传递。</p>
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
          <div class="quote-spine quote-spine-indigo"></div>
          <div class="quote-border-top"></div>
          <p class="quote-text">隐喻这东西，可以说是在深层意义上准确把握现实唯一的手段。</p>
          <div class="quote-border-bottom"></div>
          <div class="quote-source">
            <span class="source-name">第一部</span>
            <span class="source-role">关于隐喻</span>
          </div>
        </div>

        <div class="quote-card">
          <div class="quote-spine quote-spine-indigo"></div>
          <div class="quote-border-top"></div>
          <p class="quote-text">无论是谁，一旦在内心深处接纳了黑暗，就再也无法回到原来的世界。</p>
          <div class="quote-border-bottom"></div>
          <div class="quote-source">
            <span class="source-name">第一部</span>
            <span class="source-role">关于黑暗</span>
          </div>
        </div>

        <div class="quote-card">
          <div class="quote-spine quote-spine-indigo"></div>
          <div class="quote-border-top"></div>
          <p class="quote-text">我们都是在失去某些东西的过程中，渐渐成为真正的自己。</p>
          <div class="quote-border-bottom"></div>
          <div class="quote-source">
            <span class="source-name">第二部</span>
            <span class="source-role">关于失去</span>
          </div>
        </div>

        <div class="quote-card">
          <div class="quote-spine quote-spine-indigo"></div>
          <div class="quote-border-top"></div>
          <p class="quote-text">所谓艺术，就是将那些无法用言语表达的东西，用某种形式呈现出来。</p>
          <div class="quote-border-bottom"></div>
          <div class="quote-source">
            <span class="source-name">第一部</span>
            <span class="source-role">关于艺术</span>
          </div>
        </div>

        <div class="quote-card">
          <div class="quote-spine quote-spine-indigo"></div>
          <div class="quote-border-top"></div>
          <p class="quote-text">在这个世界上，有些事情是必须亲手去做的，哪怕知道那是错的。</p>
          <div class="quote-border-bottom"></div>
          <div class="quote-source">
            <span class="source-name">第二部</span>
            <span class="source-role">关于选择</span>
          </div>
        </div>

        <div class="quote-card">
          <div class="quote-spine quote-spine-indigo"></div>
          <div class="quote-border-top"></div>
          <p class="quote-text">爱是两个人在黑暗中紧紧抓住彼此的手。</p>
          <div class="quote-border-bottom"></div>
          <div class="quote-source">
            <span class="source-name">第二部</span>
            <span class="source-role">关于爱</span>
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
const expandedConcept = ref(null)

// Toggle functions
const toggleCharacter = (index) => {
  if (expandedCharacter.value === index) {
    expandedCharacter.value = null
  } else {
    expandedCharacter.value = index
    expandedEvent.value = null
    expandedConcept.value = null
  }
}

const toggleEvent = (index) => {
  if (expandedEvent.value === index) {
    expandedEvent.value = null
  } else {
    expandedEvent.value = index
    expandedCharacter.value = null
    expandedConcept.value = null
  }
}

const toggleConcept = (index) => {
  if (expandedConcept.value === index) {
    expandedConcept.value = null
  } else {
    expandedConcept.value = index
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
.killing-commendatore-world {
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
  background-color: #1a237e;
  border-color: #1a237e;
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
  color: #1a237e;
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
  color: #1a237e;
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
  color: #1a237e;
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
  background-color: #1a237e;
  border-color: #1a237e;
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
  color: #1a237e;
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

.char-icon-idea::before {
  content: '◆';
  font-size: 36px;
  color: var(--swiss-black);
}

.char-icon-listener::before {
  content: '◉';
  font-size: 40px;
  color: var(--swiss-black);
}

.char-icon-lover::before {
  content: '♥';
  font-size: 36px;
  color: var(--swiss-black);
}

.char-icon-past::before {
  content: '◇';
  font-size: 36px;
  color: var(--swiss-black);
}

.char-icon-death::before {
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
  color: #1a237e;
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
  background-color: #1a237e;
  border-color: #1a237e;
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
  color: #1a237e;
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

/* Section 03: CONCEPTS */
.concepts-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1.5rem;
  padding: 2rem;
  padding-left: 12rem;
}

.concept-card {
  padding: 2rem;
  background-color: var(--swiss-white);
  text-align: center;
  cursor: pointer;
  transition: all 0.15s ease-out;
}

.concept-card:not(.expanded):hover {
  background-color: #1a237e;
  border-color: #1a237e;
}

.concept-card:not(.expanded):hover .concept-name,
.concept-card:not(.expanded):hover .concept-short,
.concept-card:not(.expanded):hover .detail-text {
  color: var(--swiss-white) !important;
}

.concept-card.expanded {
  grid-column: span 2;
  text-align: left;
  cursor: default;
}

.concept-icon {
  width: 40px;
  height: 40px;
  margin: 0 auto 1rem;
  position: relative;
}

/* Concept Icons */
.concept-idea::before {
  content: '◆';
  font-size: 32px;
  color: var(--swiss-black);
}

.concept-metaphor::before {
  content: '◎';
  font-size: 32px;
  color: var(--swiss-black);
}

.concept-well::before {
  content: '◯';
  font-size: 32px;
  color: var(--swiss-black);
}

.concept-voice::before {
  content: '◬';
  font-size: 32px;
  color: var(--swiss-black);
}

.concept-history::before {
  content: '◈';
  font-size: 32px;
  color: var(--swiss-black);
}

.concept-name {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  margin: 0 0 0.5rem 0;
  color: var(--swiss-black);
}

.concept-short {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 0.75rem;
  line-height: 1.5;
  color: var(--swiss-text-secondary);
  margin: 0 0 1rem 0;
}

.concept-details {
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
  border-color: #1a237e;
  transform: translateY(-2px);
}

/* Quote Spine - Indigo Theme */
.quote-spine {
  width: 12px;
  height: 16px;
  background-color: #1a237e;
  position: absolute;
  top: -1px;
  left: -1px;
}

.quote-spine-indigo {
  background-color: #1a237e;
}

/* Gradient Border Lines */
.quote-border-top {
  height: 2px;
  background: linear-gradient(90deg,
    var(--swiss-black) 0%,
    #1a237e 50%,
    var(--swiss-black) 100%
  );
  margin: 0 0 1.5rem 0;
}

.quote-border-bottom {
  height: 2px;
  background: linear-gradient(90deg,
    var(--swiss-black) 0%,
    #1a237e 50%,
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
  .concepts-grid,
  .quotes-grid {
    padding-left: 2rem;
  }

  .characters-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .timeline-events {
    grid-template-columns: repeat(2, 1fr);
  }

  .concepts-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .concept-card.expanded {
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
  .concepts-grid,
  .quotes-grid {
    grid-template-columns: 1fr;
    padding: 1rem;
  }

  .concept-card.expanded {
    grid-column: span 1;
  }

  .exit-btn {
    top: 1rem;
    left: 1rem;
    padding: 0.5rem 1rem;
  }
}
</style>

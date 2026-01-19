<template>
  <div class="uncertain-wall-world">
    <!-- Shadow decoration -->
    <div class="shadow-decoration shadow-1"></div>
    <div class="shadow-decoration shadow-2"></div>

    <!-- EXIT button -->
    <button class="exit-button" @click="exitWorld">
      <span class="exit-icon">×</span>
      <span class="exit-text">EXIT</span>
    </button>

    <!-- Header Section -->
    <header class="book-header">
      <div class="header-top">
        <span class="volume-label">VOL.014</span>
        <span class="category-label">FICTION</span>
      </div>
      <h1 class="book-title">小城与不确定性的墙</h1>
      <p class="book-subtitle">City and the Uncertain Walls</p>
      <p class="book-author">村上春树 · 2023</p>
      <div class="header-decoration">
        <div class="wall-visual"></div>
        <div class="quote-mark">"墙存在的唯一理由，就是保护我们"</div>
      </div>
    </header>

    <!-- Section 01: Characters -->
    <section class="section-characters">
      <div class="section-header swiss-border-bottom">
        <p class="section-number" data-number="01">CHARACTERS</p>
        <h2 class="section-title">人物</h2>
        <p class="section-subtitle">墙里的居民</p>
      </div>

      <div class="characters-grid">
        <!-- Character 1 -->
        <article
          class="character-card swiss-border"
          :class="{ expanded: expandedCharacter === 0 }"
          @click="toggleCharacter(0)"
        >
          <div class="character-header">
            <h3 class="character-name">"我"</h3>
            <span class="character-role">17岁的读墙人</span>
          </div>

          <div class="character-preview">
            <p>每天下午在墙下读取影子的声音</p>
          </div>

          <transition name="expand">
            <div v-if="expandedCharacter === 0" class="character-details">
              <div class="detail-block">
                <h4>身份</h4>
                <p>17岁的少年，被带到这座小城。工作是"读墙"——每天下午2点在墙下，读取影子里传来的声音并记录。</p>
              </div>
              <div class="detail-block">
                <h4>记忆</h4>
                <p>逐渐失去墙外过去的记忆。只记得模糊的片段：父亲、母亲、妹妹、图书馆女孩。记忆像秋天的落叶一样慢慢凋零。</p>
              </div>
              <div class="detail-block">
                <h4>任务</h4>
                <p>老阴影告诉他，墙外有危险的东西。但"我"逐渐开始怀疑：墙真的在保护我们吗？墙外到底是什么？</p>
              </div>
              <div class="detail-block">
                <h4>象征</h4>
                <p>代表每个在成长中迷失的年轻人。被安置在既定的轨道上，逐渐忘记最初的自己，开始质疑存在的意义。</p>
              </div>
            </div>
          </transition>

          <div class="expand-hint">
            <span>{{ expandedCharacter === 0 ? '收起' : '展开' }}</span>
            <span class="arrow">{{ expandedCharacter === 0 ? '↑' : '↓' }}</span>
          </div>
        </article>

        <!-- Character 2 -->
        <article
          class="character-card swiss-border"
          :class="{ expanded: expandedCharacter === 1 }"
          @click="toggleCharacter(1)"
        >
          <div class="character-header">
            <h3 class="character-name">老阴影</h3>
            <span class="character-role">神秘的守护者</span>
          </div>

          <div class="character-preview">
            <p>每天下午2点准时出现的存在</p>
          </div>

          <transition name="expand">
            <div v-if="expandedCharacter === 1" class="character-details">
              <div class="detail-block">
                <h4>形态</h4>
                <p>一团模糊的影子，没有固定的形状。每天下午2点准时出现在"我"的房间，带来墙外的信息和指令。</p>
              </div>
              <div class="detail-block">
                <h4>角色</h4>
                <p>是小城的管理者，也是"我"的唯一指导者。告诉"我"墙外有危险，墙里是安全的。控制着信息的流动。</p>
              </div>
              <div class="detail-block">
                <h4>真相</h4>
                <p>老阴影到底是谁？是守护者还是囚禁者？是真实的个体，还是体制的化身？书中留下了悬念。</p>
              </div>
              <div class="detail-block">
                <h4>象征</h4>
                <p>代表权威、体制、既定秩序。用"保护"的名义控制个体，让人安于现状，不敢质疑。</p>
              </div>
            </div>
          </transition>

          <div class="expand-hint">
            <span>{{ expandedCharacter === 1 ? '收起' : '展开' }}</span>
            <span class="arrow">{{ expandedCharacter === 1 ? '↑' : '↓' }}</span>
          </div>
        </article>

        <!-- Character 3 -->
        <article
          class="character-card swiss-border"
          :class="{ expanded: expandedCharacter === 2 }"
          @click="toggleCharacter(2)"
        >
          <div class="character-header">
            <h3 class="character-name">图书馆女孩</h3>
            <span class="character-role">唯一的具体记忆</span>
          </div>

          <div class="character-preview">
            <p>"我"暗恋的对象，墙外过去的核心</p>
          </div>

          <transition name="expand">
            <div v-if="expandedCharacter === 2" class="character-details">
              <div class="detail-block">
                <h4>记忆</h4>
                <p>墙外过去中，"我"暗恋的女孩。在图书馆相遇，有过短暂的交流。她是"我"与墙外世界最后的连接。</p>
              </div>
              <div class="detail-block">
                <h4>意义</h4>
                <p>她是"我"心中唯一真实、具体的存在。其他记忆都在模糊，只有她依然清晰。代表爱情，也代表墙外世界的美好。</p>
              </div>
              <div class="detail-block">
                <h4>象征</h4>
                <p>代表人性中的渴望与希望。即使在被困、被控制的环境中，爱情和美好依然存在。是"我"寻找自我的动力。</p>
              </div>
            </div>
          </transition>

          <div class="expand-hint">
            <span>{{ expandedCharacter === 2 ? '收起' : '展开' }}</span>
            <span class="arrow">{{ expandedCharacter === 2 ? '↑' : '↓' }}</span>
          </div>
        </article>
      </div>
    </section>

    <!-- Section 02: Time Forms -->
    <section class="section-time">
      <div class="section-header swiss-border-bottom">
        <p class="section-number" data-number="02">TIME FORMS</p>
        <h2 class="section-title">时间的形态</h2>
        <p class="section-subtitle">记忆与遗忘</p>
      </div>

      <div class="time-stages">
        <!-- Stage 1 -->
        <article
          class="time-card swiss-border"
          :class="{ expanded: expandedTime === 0 }"
          @click="toggleTime(0)"
        >
          <div class="time-header">
            <span class="time-season">第一个秋天</span>
            <h3 class="time-title">来到小城</h3>
          </div>
          <div class="time-preview">
            <p>被安置在既定的轨道上</p>
          </div>

          <transition name="expand">
            <div v-if="expandedTime === 0" class="time-details">
              <div class="time-content">
                <h4>读墙工作</h4>
                <p>"我"被带到小城，被告知工作是"读墙"：每天下午在墙下，用特殊仪器读取影子里传来的声音，记录在纸上。</p>
              </div>
              <div class="time-content">
                <h4>规则</h4>
                <p>老阴影告诉我：墙外有危险的东西，墙里是安全的。不要试图翻墙，不要问太多问题。</p>
              </div>
              <div class="time-quote">
                <p>"你必须接受你被安排的位置。"</p>
              </div>
            </div>
          </transition>

          <div class="expand-hint">
            <span>{{ expandedTime === 0 ? '收起' : '展开' }}</span>
          </div>
        </article>

        <!-- Stage 2 -->
        <article
          class="time-card swiss-border"
          :class="{ expanded: expandedTime === 1 }"
          @click="toggleTime(1)"
        >
          <div class="time-header">
            <span class="time-season">第二个秋天</span>
            <h3 class="time-title">记忆消退</h3>
          </div>
          <div class="time-preview">
            <p>墙外的过去像秋叶般凋零</p>
          </div>

          <transition name="expand">
            <div v-if="expandedTime === 1" class="time-details">
              <div class="time-content">
                <h4>遗忘</h4>
                <p>墙外过去的记忆开始模糊。父亲、母亲、妹妹的面孔逐渐不清晰。只有图书馆女孩依然鲜活。</p>
              </div>
              <div class="time-content">
                <h4>质疑</h4>
                <p>开始怀疑：墙外真的有危险吗？老阴影为什么要控制信息？墙到底是什么？</p>
              </div>
              <div class="time-content">
                <h4>觉醒</h4>
                <p>意识到自己正在失去自我。但这是"自然的"还是"被设计的"？不确定性的墙开始显现。</p>
              </div>
              <div class="time-quote">
                <p>"有些东西，只有在失去之后才能理解它的价值。"</p>
              </div>
            </div>
          </transition>

          <div class="expand-hint">
            <span>{{ expandedTime === 1 ? '收起' : '展开' }}</span>
          </div>
        </article>

        <!-- Stage 3 -->
        <article
          class="time-card swiss-border"
          :class="{ expanded: expandedTime === 2 }"
          @click="toggleTime(2)"
        >
          <div class="time-header">
            <span class="time-season">第三个秋天</span>
            <h3 class="time-title">寻找自我</h3>
          </div>
          <div class="time-preview">
            <p>在不确定中寻找确定的答案</p>
          </div>

          <transition name="expand">
            <div v-if="expandedTime === 2" class="time-details">
              <div class="time-content">
                <h4>选择</h4>
                <p>"我"必须做出选择：继续安于墙内的"安全"，还是冒险寻找墙外的真相？</p>
              </div>
              <div class="time-content">
                <h4>觉醒</h4>
                <p>意识到墙不仅是物理的边界，更是心理的限制。真正的墙，是内心的恐惧和不确定。</p>
              </div>
              <div class="time-content">
                <h4>决定</h4>
                <p>决定打破墙的限制，寻找真正的自我。即使这意味着面对未知和危险。</p>
              </div>
              <div class="time-quote">
                <p>"一堵墙挡在那里，你想知道的只是墙那边是什么。"</p>
              </div>
            </div>
          </transition>

          <div class="expand-hint">
            <span>{{ expandedTime === 2 ? '收起' : '展开' }}</span>
          </div>
        </article>
      </div>
    </section>

    <!-- Section 03: Philosophical Concepts -->
    <section class="section-concepts">
      <div class="section-header swiss-border-bottom">
        <p class="section-number" data-number="03">CONCEPTS</p>
        <h2 class="section-title">哲学概念</h2>
        <p class="section-subtitle">存在的本质</p>
      </div>

      <div class="concepts-grid">
        <!-- Concept 1 -->
        <article
          class="concept-card swiss-border"
          :class="{ expanded: expandedConcept === 0 }"
          @click="toggleConcept(0)"
        >
          <div class="concept-header">
            <h3 class="concept-title">墙</h3>
            <div class="concept-icon">🧱</div>
          </div>
          <div class="concept-preview">
            <p>存在的边界，自我的限制</p>
          </div>

          <transition name="expand">
            <div v-if="expandedConcept === 0" class="concept-details">
              <p>墙是全书的核心意象。它是物理的边界，也是心理的限制。墙"保护"我们，但也困住了我们。</p>
              <p>老阴影说墙外有危险，但这是真的吗？还是墙只是为了控制我们而存在的？</p>
              <p>墙的本质是不确定性。我们不知道墙外是什么，所以恐惧墙外，依赖墙内。这种不确定性，让我们接受被安排的命运。</p>
              <p>打破墙，意味着打破对权威的盲从，打破对未知的恐惧，寻找真正的自我。</p>
            </div>
          </transition>

          <div class="expand-hint">
            <span>{{ expandedConcept === 0 ? '收起' : '展开' }}</span>
            <span class="arrow">{{ expandedConcept === 0 ? '↑' : '↓' }}</span>
          </div>
        </article>

        <!-- Concept 2 -->
        <article
          class="concept-card swiss-border"
          :class="{ expanded: expandedConcept === 1 }"
          @click="toggleConcept(1)"
        >
          <div class="concept-header">
            <h3 class="concept-title">影子</h3>
            <div class="concept-icon">👤</div>
          </div>
          <div class="concept-preview">
            <p>自我的另一面，意识的深渊</p>
          </div>

          <transition name="expand">
            <div v-if="expandedConcept === 1" class="concept-details">
              <p>影子是什么？是自我的投射，还是独立的个体？书中没有给出明确的答案。</p>
              <p>影子是我们的另一面，是我们不愿承认的部分。它们承载着我们的恐惧、欲望、秘密。</p>
              <p>老阴影也是影子，但它统治着小城。这是否意味着，我们被自己的影子控制着？</p>
              <p>接受自己的影子，就是接受完整的自我。无论光明还是黑暗，都是我们的一部分。</p>
            </div>
          </transition>

          <div class="expand-hint">
            <span>{{ expandedConcept === 1 ? '收起' : '展开' }}</span>
            <span class="arrow">{{ expandedConcept === 1 ? '↑' : '↓' }}</span>
          </div>
        </article>

        <!-- Concept 3 -->
        <article
          class="concept-card swiss-border"
          :class="{ expanded: expandedConcept === 2 }"
          @click="toggleConcept(2)"
        >
          <div class="concept-header">
            <h3 class="concept-title">不确定性</h3>
            <div class="concept-icon">❓</div>
          </div>
          <div class="concept-preview">
            <p>生命本质的不确定</p>
          </div>

          <transition name="expand">
            <div v-if="expandedConcept === 2" class="concept-details">
              <p>书名是"不确定性的墙"。墙的本质就是不确定性。</p>
              <p>我们害怕不确定性，所以寻求确定性。我们依赖权威、体制、既定规则，因为它们提供"确定"的答案。</p>
              <p>但生命的本质就是不确定。没有绝对的安全，没有永恒的答案。接受不确定性，就是接受生命的真实。</p>
              <p>只有拥抱不确定性，才能真正自由。墙的存在，恰恰是因为我们害怕不确定。</p>
            </div>
          </transition>

          <div class="expand-hint">
            <span>{{ expandedConcept === 2 ? '收起' : '展开' }}</span>
            <span class="arrow">{{ expandedConcept === 2 ? '↑' : '↓' }}</span>
          </div>
        </article>

        <!-- Concept 4 -->
        <article
          class="concept-card swiss-border"
          :class="{ expanded: expandedConcept === 3 }"
          @click="toggleConcept(3)"
        >
          <div class="concept-header">
            <h3 class="concept-title">自我与他人</h3>
            <div class="concept-icon">🤝</div>
          </div>
          <div class="concept-preview">
            <p>如何区分自己和他人的意识</p>
          </div>

          <transition name="expand">
            <div v-if="expandedConcept === 3" class="concept-details">
              <p>书中有一个核心问题：我的意识真的属于我吗？还是被某种更大的意识影响？</p>
              <p>我们如何确定"我是我"？记忆、感受、选择——这些真的属于我们自己吗？</p>
              <p>老阴影控制着信息和思想。那么"我"的思想，真的是"我"的吗？</p>
              <p>找到真正的自我，需要质疑一切被灌输的观念。只有打破既定的思维模式，才能找到属于自己的意识。</p>
            </div>
          </transition>

          <div class="expand-hint">
            <span>{{ expandedConcept === 3 ? '收起' : '展开' }}</span>
            <span class="arrow">{{ expandedConcept === 3 ? '↑' : '↓' }}</span>
          </div>
        </article>
      </div>
    </section>

    <!-- Section 04: Quotes -->
    <section class="section-quotes">
      <div class="section-header swiss-border-bottom">
        <p class="section-number" data-number="04">QUOTES</p>
        <h2 class="section-title">金句</h2>
        <p class="section-subtitle">存在主义</p>
      </div>

      <div class="quotes-grid">
        <article class="quote-card swiss-border">
          <div class="quote-spine"></div>
          <blockquote class="quote-text">
            "墙存在的唯一理由，就是保护我们不被墙外的东西伤害。"
          </blockquote>
          <div class="quote-divider"></div>
          <div class="quote-source">—— 老阴影</div>
        </article>

        <article class="quote-card swiss-border">
          <div class="quote-spine"></div>
          <blockquote class="quote-text">
            "有些东西，只有在失去之后才能理解它的价值。"
          </blockquote>
          <div class="quote-divider"></div>
          <div class="quote-source">—— 书中感悟</div>
        </article>

        <article class="quote-card swiss-border">
          <div class="quote-spine"></div>
          <blockquote class="quote-text">
            "一堵墙挡在那里，你想知道的只是墙那边是什么。"
          </blockquote>
          <div class="quote-divider"></div>
          <div class="quote-source">—— "我"的觉醒</div>
        </article>

        <article class="quote-card swiss-border">
          <div class="quote-spine"></div>
          <blockquote class="quote-text">
            "我们都是墙里的居民，被恐惧和不确定性束缚。"
          </blockquote>
          <div class="quote-divider"></div>
          <div class="quote-source">—— 存在的困境</div>
        </article>

        <article class="quote-card swiss-border">
          <div class="quote-spine"></div>
          <blockquote class="quote-text">
            "接受不确定性，就是接受生命的真实。"
          </blockquote>
          <div class="quote-divider"></div>
          <div class="quote-source">—— 自由的条件</div>
        </article>

        <article class="quote-card swiss-border">
          <div class="quote-spine"></div>
          <blockquote class="quote-text">
            "记忆是连接过去和现在的桥，当桥断了，我们就迷失了。"
          </blockquote>
          <div class="quote-divider"></div>
          <div class="quote-source">—— 记忆的意义</div>
        </article>
      </div>
    </section>

    <!-- Footer -->
    <footer class="book-footer swiss-border-top">
      <div class="footer-content">
        <div class="footer-left">
          <span class="footer-label">ARCHIVED</span>
          <span class="footer-date">2023</span>
        </div>
        <div class="footer-right">
          <span class="footer-message">不确定中的寻找</span>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const expandedCharacter = ref(null)
const expandedTime = ref(null)
const expandedConcept = ref(null)

const exitWorld = () => {
  router.push('/yearbook/fiction')
}

const toggleCharacter = (index) => {
  if (expandedCharacter.value === index) {
    expandedCharacter.value = null
  } else {
    expandedCharacter.value = index
    expandedTime.value = null
    expandedConcept.value = null
  }
}

const toggleTime = (index) => {
  if (expandedTime.value === index) {
    expandedTime.value = null
  } else {
    expandedTime.value = index
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
    expandedTime.value = null
  }
}
</script>

<style scoped>
.uncertain-wall-world {
  min-height: 100vh;
  background: linear-gradient(180deg, #e8ecef 0%, #d4d7db 100%);
  color: #1a1a1a;
  position: relative;
  overflow-x: hidden;
}

/* Shadow decoration */
.shadow-decoration {
  position: absolute;
  width: 300px;
  height: 600px;
  background: radial-gradient(ellipse, rgba(0, 0, 0, 0.03) 0%, transparent 70%);
  pointer-events: none;
  z-index: 1;
}

.shadow-1 {
  top: 10%;
  left: -100px;
  animation: shadow-float 25s ease-in-out infinite;
}

.shadow-2 {
  bottom: 10%;
  right: -100px;
  animation: shadow-float 30s ease-in-out infinite reverse;
}

@keyframes shadow-float {
  0%, 100% {
    transform: translateX(0) translateY(0);
  }
  50% {
    transform: translateX(50px) translateY(-30px);
  }
}

/* EXIT Button */
.exit-button {
  position: fixed;
  top: 2rem;
  right: 2rem;
  z-index: 100;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background-color: #7b8a9a;
  border: 2px solid #1a1a1a;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  transition: all 0.15s ease-out;
}

.exit-button:hover {
  background-color: #1a1a1a;
  color: #7b8a9a;
}

.exit-icon {
  font-size: 1.5rem;
  line-height: 1;
}

/* Header */
.book-header {
  padding: 6rem 2rem 4rem;
  background: linear-gradient(135deg, #7b8a9a 0%, #8d9aaa 100%);
  color: #fff;
  text-align: center;
  border-bottom: 3px solid #1a1a1a;
  position: relative;
}

.header-top {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  margin-bottom: 2rem;
}

.volume-label,
.category-label {
  font-family: 'Inter', sans-serif;
  font-weight: 900;
  font-size: 0.625rem;
  letter-spacing: 0.2em;
  padding: 0.5rem 1rem;
  border: 2px solid #fff;
}

.book-title {
  font-family: 'Inter', sans-serif;
  font-weight: 900;
  font-size: clamp(2rem, 5vw, 4rem);
  text-transform: uppercase;
  letter-spacing: -0.03em;
  line-height: 1.2;
  margin: 0 0 1rem 0;
}

.book-subtitle {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 1rem;
  margin: 0 0 0.5rem 0;
  opacity: 0.9;
}

.book-author {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 0.875rem;
  letter-spacing: 0.1em;
  opacity: 0.8;
  margin: 0;
}

.header-decoration {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.wall-visual {
  width: 200px;
  height: 60px;
  background: linear-gradient(90deg,
    rgba(255, 255, 255, 0.2) 0%,
    rgba(255, 255, 255, 0.5) 50%,
    rgba(255, 255, 255, 0.2) 100%
  );
  border: 2px solid rgba(255, 255, 255, 0.3);
  position: relative;
}

.wall-visual::before {
  content: '';
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  height: 80px;
  background: rgba(255, 255, 255, 0.4);
}

.quote-mark {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 1rem;
  font-style: italic;
  opacity: 0.9;
}

/* Sections */
section {
  padding: 4rem 2rem;
  position: relative;
  z-index: 2;
}

.section-header {
  padding: 2rem 0;
  margin-bottom: 3rem;
  text-align: center;
}

.section-number {
  font-family: 'Inter', sans-serif;
  font-weight: 900;
  font-size: 0.875rem;
  letter-spacing: 0.2em;
  color: #7b8a9a;
  margin: 0 0 1rem 0;
}

.section-title {
  font-family: 'Inter', sans-serif;
  font-weight: 900;
  font-size: clamp(1.75rem, 4vw, 3rem);
  text-transform: uppercase;
  letter-spacing: -0.02em;
  line-height: 1.2;
  margin: 0 0 0.5rem 0;
}

.section-subtitle {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 0.875rem;
  letter-spacing: 0.15em;
  color: #666;
  margin: 0;
}

/* Characters Grid */
.characters-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.character-card {
  background-color: #fff;
  padding: 2rem;
  cursor: pointer;
  transition: all 0.3s ease-out;
  display: flex;
  flex-direction: column;
}

.character-card:hover:not(.expanded) {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(123, 138, 154, 0.3);
  border-color: #7b8a9a;
}

.character-card.expanded {
  background-color: #e8ecef;
  cursor: default;
  transform: none;
}

.character-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.character-name {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 1.25rem;
  margin: 0;
}

.character-role {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  color: #666;
}

.character-preview {
  flex: 1;
  margin-bottom: 1rem;
}

.character-preview p {
  font-size: 0.9375rem;
  line-height: 1.6;
  margin: 0;
}

.character-details {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 2px solid rgba(0, 0, 0, 0.1);
}

.detail-block {
  margin-bottom: 1.5rem;
}

.detail-block:last-child {
  margin-bottom: 0;
}

.detail-block h4 {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #7b8a9a;
  margin: 0 0 0.5rem 0;
}

.detail-block p {
  font-size: 0.875rem;
  line-height: 1.6;
  margin: 0;
}

.expand-hint {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  margin-top: auto;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #7b8a9a;
}

/* Time Stages */
.time-stages {
  max-width: 900px;
  margin: 0 auto;
  display: grid;
  gap: 2rem;
}

.time-card {
  background-color: #fff;
  padding: 2rem;
  cursor: pointer;
  transition: all 0.3s ease-out;
}

.time-card:hover:not(.expanded) {
  transform: translateX(8px);
  box-shadow: 0 8px 24px rgba(123, 138, 154, 0.3);
  border-color: #7b8a9a;
}

.time-card.expanded {
  background-color: #e8ecef;
  cursor: default;
  transform: none;
}

.time-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.time-season {
  font-family: 'Inter', sans-serif;
  font-weight: 900;
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  padding: 0.25rem 0.75rem;
  background-color: #7b8a9a;
  color: #fff;
}

.time-title {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 1.25rem;
  margin: 0;
}

.time-preview p {
  font-size: 0.9375rem;
  line-height: 1.6;
  margin: 0;
}

.time-details {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 2px solid rgba(0, 0, 0, 0.1);
}

.time-content {
  margin-bottom: 1.5rem;
}

.time-content h4 {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #7b8a9a;
  margin: 0 0 0.5rem 0;
}

.time-content p {
  font-size: 0.875rem;
  line-height: 1.6;
  margin: 0;
}

.time-quote {
  padding: 1rem;
  background-color: rgba(123, 138, 154, 0.05);
  border-left: 4px solid #7b8a9a;
}

.time-quote p {
  font-size: 0.875rem;
  line-height: 1.6;
  font-style: italic;
  margin: 0;
}

/* Concepts */
.concepts-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto;
}

.concept-card {
  background-color: #fff;
  padding: 2rem;
  cursor: pointer;
  transition: all 0.3s ease-out;
}

.concept-card:hover:not(.expanded) {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(123, 138, 154, 0.3);
  border-color: #7b8a9a;
}

.concept-card.expanded {
  background-color: #e8ecef;
  cursor: default;
  transform: none;
}

.concept-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.concept-title {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 1.25rem;
  margin: 0;
}

.concept-icon {
  font-size: 2rem;
}

.concept-preview {
  margin-bottom: 1rem;
}

.concept-preview p {
  font-size: 0.9375rem;
  line-height: 1.6;
  margin: 0;
  color: #666;
}

.concept-details {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 2px solid rgba(0, 0, 0, 0.1);
}

.concept-details p {
  font-size: 0.875rem;
  line-height: 1.6;
  margin: 0 0 1rem 0;
}

.concept-details p:last-child {
  margin-bottom: 0;
}

/* Quotes */
.quotes-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.quote-card {
  background-color: #fff;
  padding: 2rem;
  position: relative;
  display: flex;
  flex-direction: column;
}

.quote-spine {
  position: absolute;
  left: 1rem;
  top: 1rem;
  bottom: 1rem;
  width: 4px;
  background-color: #7b8a9a;
}

.quote-text {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.8;
  margin: 0 0 1.5rem 0;
  padding-left: 1rem;
  font-style: italic;
}

.quote-divider {
  width: 60px;
  height: 2px;
  background-color: rgba(0, 0, 0, 0.1);
  margin: 0.5rem 0;
  margin-left: 1rem;
}

.quote-source {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  color: #7b8a9a;
  padding-left: 1rem;
  margin: auto 0 0 0;
}

/* Footer */
.book-footer {
  padding: 2rem;
  background-color: #1a1a1a;
  color: #7b8a9a;
}

.footer-content {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-label {
  font-family: 'Inter', sans-serif;
  font-weight: 900;
  font-size: 0.625rem;
  letter-spacing: 0.2em;
  margin-right: 1rem;
}

.footer-date {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 1rem;
}

.footer-message {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 0.875rem;
  letter-spacing: 0.1em;
}

/* Expand transition */
.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s ease-out;
}

.expand-enter-from,
.expand-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Responsive */
@media (max-width: 1024px) {
  .characters-grid,
  .quotes-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .concepts-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .book-header {
    padding: 4rem 1rem 3rem;
  }

  section {
    padding: 3rem 1rem;
  }

  .characters-grid,
  .quotes-grid {
    grid-template-columns: 1fr;
  }

  .footer-content {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
}
</style>

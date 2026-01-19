<template>
  <div class="life-sea-world">
    <!-- Wave decoration -->
    <div class="wave-decoration wave-1"></div>
    <div class="wave-decoration wave-2"></div>
    <div class="wave-decoration wave-3"></div>

    <!-- EXIT button -->
    <button class="exit-button" @click="exitWorld">
      <span class="exit-icon">×</span>
      <span class="exit-text">EXIT</span>
    </button>

    <!-- Header Section -->
    <header class="book-header">
      <div class="header-top">
        <span class="volume-label">VOL.027</span>
        <span class="category-label">FICTION</span>
      </div>
      <h1 class="book-title">人生海海</h1>
      <p class="book-subtitle">Life is like the sea</p>
      <p class="book-author">麦家 · 2019</p>
      <div class="header-decoration">
        <div class="wave-icon">🌊</div>
        <div class="quote-mark">"人生海海，山山而川，不过尔尔"</div>
      </div>
    </header>

    <!-- Section 01: Characters -->
    <section class="section-characters">
      <div class="section-header swiss-border-bottom">
        <p class="section-number" data-number="01">CHARACTERS</p>
        <h2 class="section-title">人物</h2>
        <p class="section-subtitle">传奇与平凡</p>
      </div>

      <div class="characters-grid">
        <!-- Character 1 -->
        <article
          class="character-card swiss-border"
          :class="{ expanded: expandedCharacter === 0 }"
          @click="toggleCharacter(0)"
        >
          <div class="character-header">
            <h3 class="character-name">上校（太监）</h3>
            <span class="character-role">传奇主角</span>
          </div>

          <div class="character-preview">
            <p>一生起落沉浮，背负不可告人的秘密</p>
          </div>

          <transition name="expand">
            <div v-if="expandedCharacter === 0" class="character-details">
              <div class="detail-block">
                <h4>天赋</h4>
                <p>村里公认的天才，学什么会什么。聪明绝顶，却也因此承受更多。</p>
              </div>
              <div class="detail-block">
                <h4>秘密</h4>
                <p>在战争中遭日本军医伤害，身体残缺成为"太监"。这是他一生守护的尊严底线。</p>
              </div>
              <div class="detail-block">
                <h4>结局</h4>
                <p>被爷爷出卖，秘密公开后疯癫。却在疯癫中找到平静，每天画画，像孩子一样纯粹。最后安详离世。</p>
              </div>
              <div class="detail-block">
                <h4>象征</h4>
                <p>代表人生的大起大落。从天才到英雄，从英雄到"太监"，从疯癫到安宁。他证明了"人生海海"的真谛。</p>
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
            <h3 class="character-name">"我"</h3>
            <span class="character-role">叙述者</span>
          </div>

          <div class="character-preview">
            <p>从好奇的孩子到理解真相的成人</p>
          </div>

          <transition name="expand">
            <div v-if="expandedCharacter === 1" class="character-details">
              <div class="detail-block">
                <h4>童年视角</h4>
                <p>对上校充满好奇，觉得他是村里的传奇。偷偷观察他，想知道他的秘密。</p>
              </div>
              <div class="detail-block">
                <h4>成长</h4>
                <p>离家出走，在外经历世事。从孩子的纯真视角，逐渐理解成人世界的复杂。</p>
              </div>
              <div class="detail-block">
                <h4>回归</h4>
                <p>多年后回到家乡，终于理解上校的选择和痛苦。完成了从好奇到理解的成长。</p>
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
            <h3 class="character-name">爷爷</h3>
            <span class="character-role">传统与固执</span>
          </div>

          <div class="character-preview">
            <p>为了面子出卖上校，最终悔恨终身</p>
          </div>

          <transition name="expand">
            <div v-if="expandedCharacter === 2" class="character-details">
              <div class="detail-block">
                <h4>性格</h4>
                <p>传统、固执，重面子。表面上维护上校，实则在意自己的名声。</p>
              </div>
              <div class="detail-block">
                <h4>背叛</h4>
                <p>为了阻止"我"和上校的女儿在一起，向上级举报了上校的秘密。这一举动毁掉了上校的尊严。</p>
              </div>
              <div class="detail-block">
                <h4>悔恨</h4>
                <p>上校疯癫后，爷爷深受良心谴责。余生都在悔恨中度过，临终前向"我"忏悔。</p>
              </div>
              <div class="detail-block">
                <h4>象征</h4>
                <p>代表传统观念的狭隘。为了所谓的"面子"，伤害了真正重要的人。好心办坏事的典型。</p>
              </div>
            </div>
          </transition>

          <div class="expand-hint">
            <span>{{ expandedCharacter === 2 ? '收起' : '展开' }}</span>
            <span class="arrow">{{ expandedCharacter === 2 ? '↑' : '↓' }}</span>
          </div>
        </article>

        <!-- Character 4 -->
        <article
          class="character-card swiss-border"
          :class="{ expanded: expandedCharacter === 3 }"
          @click="toggleCharacter(3)"
        >
          <div class="character-header">
            <h3 class="character-name">父亲</h3>
            <span class="character-role">忠诚的朋友</span>
          </div>

          <div class="character-preview">
            <p>上校最好的朋友，一生守护他的秘密</p>
          </div>

          <transition name="expand">
            <div v-if="expandedCharacter === 3" class="character-details">
              <div class="detail-block">
                <h4>友谊</h4>
                <p>与上校从小一起长大，是最好的朋友。无论上校遭遇什么，他始终忠诚守护。</p>
              </div>
              <div class="detail-block">
                <h4>守护</h4>
                <p>知道上校的秘密，从未对外人说起。即使上校疯癫，依然照顾他，保护他的尊严。</p>
              </div>
              <div class="detail-block">
                <h4>对比</h4>
                <p>与爷爷形成鲜明对比。爷爷出卖上校，父亲守护上校。代表真正的友谊和忠诚。</p>
              </div>
            </div>
          </transition>

          <div class="expand-hint">
            <span>{{ expandedCharacter === 3 ? '收起' : '展开' }}</span>
            <span class="arrow">{{ expandedCharacter === 3 ? '↑' : '↓' }}</span>
          </div>
        </article>
      </div>
    </section>

    <!-- Section 02: Life Stages -->
    <section class="section-stages">
      <div class="section-header swiss-border-bottom">
        <p class="section-number" data-number="02">LIFE STAGES</p>
        <h2 class="section-title">人生阶段</h2>
        <p class="section-subtitle">起起落落</p>
      </div>

      <div class="life-wave">
        <div class="wave-line"></div>
        <div class="stages-container">
          <!-- Stage 1 -->
          <article
            class="stage-card swiss-border"
            :class="{ expanded: expandedStage === 0 }"
            @click="toggleStage(0)"
          >
            <div class="stage-marker">📍</div>
            <div class="stage-header">
              <span class="stage-period">少年</span>
              <h3 class="stage-title">天才少年</h3>
            </div>
            <div class="stage-preview">
              <p>天赋异禀，村里人的骄傲</p>
            </div>

            <transition name="expand">
              <div v-if="expandedStage === 0" class="stage-details">
                <div class="stage-content">
                  <h4>天赋</h4>
                  <p>学什么会什么，过目不忘。不管是读书、手艺还是武艺，一学就会。</p>
                </div>
                <div class="stage-quote">
                  <p>"他是上天赐给我们村子的礼物。"</p>
                  <span class="quote-source">—— 村里老人</span>
                </div>
              </div>
            </transition>

            <div class="expand-hint">
              <span>{{ expandedStage === 0 ? '收起' : '展开' }}</span>
            </div>
          </article>

          <!-- Stage 2 -->
          <article
            class="stage-card swiss-border"
            :class="{ expanded: expandedStage === 1 }"
            @click="toggleStage(1)"
          >
            <div class="stage-marker">⬆️</div>
            <div class="stage-header">
              <span class="stage-period">青年</span>
              <h3 class="stage-title">军医传奇</h3>
            </div>
            <div class="stage-preview">
              <p>参加革命，成为"金一刀"</p>
            </div>

            <transition name="expand">
              <div v-if="expandedStage === 1" class="stage-details">
                <div class="stage-content">
                  <h4>成名</h4>
                  <p>参军后成为军医，医术高超。人称"金一刀"，救人无数，战功赫赫。</p>
                </div>
                <div class="stage-content">
                  <h4>创伤</h4>
                  <p>在战争中遭日本军医伤害，身体残缺。这是他一生不愿提及的秘密。</p>
                </div>
                <div class="stage-quote">
                  <p>"英雄不是天生的，是被逼出来的。"</p>
                </div>
              </div>
            </transition>

            <div class="expand-hint">
              <span>{{ expandedStage === 1 ? '收起' : '展开' }}</span>
            </div>
          </article>

          <!-- Stage 3 -->
          <article
            class="stage-card swiss-border"
            :class="{ expanded: expandedStage === 2 }"
            @click="toggleStage(2)"
          >
            <div class="stage-marker">⬇️</div>
            <div class="stage-header">
              <span class="stage-period">中年</span>
              <h3 class="stage-title">归隐家乡</h3>
            </div>
            <div class="stage-preview">
              <p>深居简出，守着秘密画画</p>
            </div>

            <transition name="expand">
              <div v-if="expandedStage === 2" class="stage-details">
                <div class="stage-content">
                  <h4>隐居</h4>
                  <p>回到家乡，深居简出。白天画画，晚上独坐。村里的传奇人物，也是最神秘的邻居。</p>
                </div>
                <div class="stage-content">
                  <h4>秘密</h4>
                  <p>从不让人靠近他的画室，从不谈及过去。他的秘密像一团迷雾，让人好奇又害怕。</p>
                </div>
                <div class="stage-quote">
                  <p>"有些事情，永远不要说出口。"</p>
                </div>
              </div>
            </transition>

            <div class="expand-hint">
              <span>{{ expandedStage === 2 ? '收起' : '展开' }}</span>
            </div>
          </article>

          <!-- Stage 4 -->
          <article
            class="stage-card swiss-border"
            :class="{ expanded: expandedStage === 3 }"
            @click="toggleStage(3)"
          >
            <div class="stage-marker">⬇️</div>
            <div class="stage-header">
              <span class="stage-period">晚年</span>
              <h3 class="stage-title">疯癫与救赎</h3>
            </div>
            <div class="stage-preview">
              <p>秘密公开后疯癫，却在疯癫中找到安宁</p>
            </div>

            <transition name="expand">
              <div v-if="expandedStage === 3" class="stage-details">
                <div class="stage-content">
                  <h4>背叛</h4>
                  <p>爷爷为了阻止婚事，向上级举报了上校的秘密。上校的尊严被当众撕碎。</p>
                </div>
                <div class="stage-content">
                  <h4>疯癫</h4>
                  <p>秘密公开后，上校彻底疯癫。但他像孩子一样快乐，每天画画，脸上挂着笑容。</p>
                </div>
                <div class="stage-content">
                  <h4>救赎</h4>
                  <p>在疯癫中，他反而找到了平静。不再需要伪装，不再需要守护秘密。像孩子一样纯粹地活着。</p>
                </div>
                <div class="stage-quote">
                  <p>"他疯了，但他比任何人都快乐。"</p>
                  <span class="quote-source">—— "我"的感悟</span>
                </div>
              </div>
            </transition>

            <div class="expand-hint">
              <span>{{ expandedStage === 3 ? '收起' : '展开' }}</span>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- Section 03: Themes -->
    <section class="section-themes">
      <div class="section-header swiss-border-bottom">
        <p class="section-number" data-number="03">THEMES</p>
        <h2 class="section-title">主题</h2>
        <p class="section-subtitle">人生哲学</p>
      </div>

      <div class="themes-grid">
        <!-- Theme 1 -->
        <article
          class="theme-card swiss-border"
          :class="{ expanded: expandedTheme === 0 }"
          @click="toggleTheme(0)"
        >
          <div class="theme-header">
            <h3 class="theme-title">人生海海</h3>
            <div class="theme-icon">🌊</div>
          </div>
          <div class="theme-preview">
            <p>起起落落是常态</p>
          </div>

          <transition name="expand">
            <div v-if="expandedTheme === 0" class="theme-details">
              <p>"人生海海"来自闽南话，意思是人生像大海一样茫茫然，起落浮沉。有高潮也有低谷，有晴天也有风暴。</p>
              <p>上校的一生完美诠释了这句话：从天才到英雄，从英雄到"太监"，从疯癫到安宁。无论多么不可接受，生活都要继续。</p>
              <p>重要的不是遭遇什么，而是如何面对。上校在疯癫中找到的平静，恰恰是对"人生海海"最好的回应。</p>
            </div>
          </transition>

          <div class="expand-hint">
            <span>{{ expandedTheme === 0 ? '收起' : '展开' }}</span>
            <span class="arrow">{{ expandedTheme === 0 ? '↑' : '↓' }}</span>
          </div>
        </article>

        <!-- Theme 2 -->
        <article
          class="theme-card swiss-border"
          :class="{ expanded: expandedTheme === 1 }"
          @click="toggleTheme(1)"
        >
          <div class="theme-header">
            <h3 class="theme-title">秘密与尊严</h3>
            <div class="theme-icon">🔒</div>
          </div>
          <div class="theme-preview">
            <p>守护秘密就是守护尊严</p>
          </div>

          <transition name="expand">
            <div v-if="expandedTheme === 1" class="theme-details">
              <p>上校的秘密——被日本军医伤害导致身体残缺——是他一生最大的痛苦，也是最后的尊严。</p>
              <p>他用一生守护这个秘密，不让任何人知晓。因为一旦公开，他就从"英雄"变成了"太监"，从受人尊敬变成被人嘲笑。</p>
              <p>爷爷出卖了他的秘密，撕碎了他的尊严。上校的疯癫，是对这种伤害最激烈的反抗。</p>
              <p>但讽刺的是，疯癫后的他反而获得了平静。因为不再需要伪装，不再需要守护秘密。</p>
            </div>
          </transition>

          <div class="expand-hint">
            <span>{{ expandedTheme === 1 ? '收起' : '展开' }}</span>
            <span class="arrow">{{ expandedTheme === 1 ? '↑' : '↓' }}</span>
          </div>
        </article>

        <!-- Theme 3 -->
        <article
          class="theme-card swiss-border"
          :class="{ expanded: expandedTheme === 2 }"
          @click="toggleTheme(2)"
        >
          <div class="theme-header">
            <h3 class="theme-title">救赎</h3>
            <div class="theme-icon">✨</div>
          </div>
          <div class="theme-preview">
            <p>即使疯癫，也能找到安宁</p>
          </div>

          <transition name="expand">
            <div v-if="expandedTheme === 2" class="theme-details">
              <p>上校的疯癫，看似悲剧，实则救赎。</p>
              <p>疯癫前，他需要时刻伪装，守护秘密，活在恐惧和焦虑中。疯癫后，他像孩子一样纯粹，每天画画，脸上挂着笑容。</p>
              <p>他忘记了过去，忘记了痛苦，忘记了秘密。他获得了真正的自由。</p>
              <p>这给我们一个启示：有时候，放下执念，才能获得真正的平静。</p>
            </div>
          </transition>

          <div class="expand-hint">
            <span>{{ expandedTheme === 2 ? '收起' : '展开' }}</span>
            <span class="arrow">{{ expandedTheme === 2 ? '↑' : '↓' }}</span>
          </div>
        </article>

        <!-- Theme 4 -->
        <article
          class="theme-card swiss-border"
          :class="{ expanded: expandedTheme === 3 }"
          @click="toggleTheme(3)"
        >
          <div class="theme-header">
            <h3 class="theme-title">善恶复杂</h3>
            <div class="theme-icon">⚖️</div>
          </div>
          <div class="theme-preview">
            <p>好心也能办坏事</p>
          </div>

          <transition name="expand">
            <div v-if="expandedTheme === 3" class="theme-details">
              <p>爷爷是全书最复杂的角色。他不是坏人，却做了最坏的事——出卖上校。</p>
              <p>他的动机是"好心"：不想让"我"娶上校的女儿，怕"我"被人耻笑。为了家族的面子，他选择了背叛。</p>
              <p>这正是现实的残酷：很多人以"为你好"的名义，伤害了别人。传统的"面子"观念，摧毁了真正的善良。</p>
              <p>爷爷的悔恨，来得太晚。上校已经疯癫，秘密已经公开。伤害无法挽回。</p>
            </div>
          </transition>

          <div class="expand-hint">
            <span>{{ expandedTheme === 3 ? '收起' : '展开' }}</span>
            <span class="arrow">{{ expandedTheme === 3 ? '↑' : '↓' }}</span>
          </div>
        </article>
      </div>
    </section>

    <!-- Section 04: Quotes -->
    <section class="section-quotes">
      <div class="section-header swiss-border-bottom">
        <p class="section-number" data-number="04">QUOTES</p>
        <h2 class="section-title">金句</h2>
        <p class="section-subtitle">人生智慧</p>
      </div>

      <div class="quotes-grid">
        <article class="quote-card swiss-border">
          <div class="quote-spine"></div>
          <blockquote class="quote-text">
            "人生海海，山山而川，不过尔尔。"
          </blockquote>
          <div class="quote-divider"></div>
          <div class="quote-source">—— 闽南谚语</div>
        </article>

        <article class="quote-card swiss-border">
          <div class="quote-spine"></div>
          <blockquote class="quote-text">
            "世上只有一种英雄主义，就是在认清了生活真相后依然热爱生活。"
          </blockquote>
          <div class="quote-divider"></div>
          <div class="quote-source">—— 罗曼·罗兰</div>
        </article>

        <article class="quote-card swiss-border">
          <div class="quote-spine"></div>
          <blockquote class="quote-text">
            "有些秘密，比生命更重要。守护秘密，就是守护最后的尊严。"
          </blockquote>
          <div class="quote-divider"></div>
          <div class="quote-source">—— 上校的信念</div>
        </article>

        <article class="quote-card swiss-border">
          <div class="quote-spine"></div>
          <blockquote class="quote-text">
            "英雄不是天生的，是被逼出来的。每个人都是自己生活中的英雄。"
          </blockquote>
          <div class="quote-divider"></div>
          <div class="quote-source">—— 书中感悟</div>
        </article>

        <article class="quote-card swiss-border">
          <div class="quote-spine"></div>
          <blockquote class="quote-text">
            "有时候，疯癫的人比正常人更快乐。因为他们忘记了痛苦，只剩下纯粹。"
          </blockquote>
          <div class="quote-divider"></div>
          <div class="quote-source">—— "我"的观察</div>
        </article>

        <article class="quote-card swiss-border">
          <div class="quote-spine"></div>
          <blockquote class="quote-text">
            "人生就像大海，有时平静，有时汹涌。但无论怎样，都要继续航行。"
          </blockquote>
          <div class="quote-divider"></div>
          <div class="quote-source">—— 麦家</div>
        </article>
      </div>
    </section>

    <!-- Footer -->
    <footer class="book-footer swiss-border-top">
      <div class="footer-content">
        <div class="footer-left">
          <span class="footer-label">ARCHIVED</span>
          <span class="footer-date">2019</span>
        </div>
        <div class="footer-right">
          <span class="footer-message">人生海海，不过尔尔</span>
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
const expandedStage = ref(null)
const expandedTheme = ref(null)

const exitWorld = () => {
  router.push('/yearbook/fiction')
}

const toggleCharacter = (index) => {
  if (expandedCharacter.value === index) {
    expandedCharacter.value = null
  } else {
    expandedCharacter.value = index
    expandedStage.value = null
    expandedTheme.value = null
  }
}

const toggleStage = (index) => {
  if (expandedStage.value === index) {
    expandedStage.value = null
  } else {
    expandedStage.value = index
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
    expandedStage.value = null
  }
}
</script>

<style scoped>
.life-sea-world {
  min-height: 100vh;
  background-color: #f0f5f7;
  color: #1a1a1a;
  position: relative;
  overflow-x: hidden;
}

/* Wave decoration */
.wave-decoration {
  position: absolute;
  width: 200%;
  height: 300px;
  background: linear-gradient(180deg, transparent 0%, rgba(74, 122, 154, 0.03) 100%);
  border-radius: 50%;
  pointer-events: none;
  z-index: 1;
}

.wave-1 {
  top: -100px;
  right: -200px;
  animation: float 20s ease-in-out infinite;
}

.wave-2 {
  top: 200px;
  left: -100px;
  animation: float 25s ease-in-out infinite reverse;
}

.wave-3 {
  bottom: -100px;
  right: -150px;
  animation: float 30s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translateX(0) translateY(0);
  }
  50% {
    transform: translateX(-50px) translateY(-30px);
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
  background-color: #4a7a9a;
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
  color: #4a7a9a;
}

.exit-icon {
  font-size: 1.5rem;
  line-height: 1;
}

/* Header */
.book-header {
  padding: 6rem 2rem 4rem;
  background: linear-gradient(135deg, #4a7a9a 0%, #5d8aad 100%);
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
  font-size: clamp(2.5rem, 6vw, 5rem);
  text-transform: uppercase;
  letter-spacing: -0.02em;
  line-height: 1.1;
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

.wave-icon {
  font-size: 3rem;
}

.quote-mark {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 1.125rem;
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
  color: #4a7a9a;
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
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  max-width: 1000px;
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
  box-shadow: 0 8px 24px rgba(74, 122, 154, 0.3);
  border-color: #4a7a9a;
}

.character-card.expanded {
  background-color: #f0f5f7;
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
  color: #4a7a9a;
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
  color: #4a7a9a;
}

/* Life Stages */
.life-wave {
  position: relative;
  max-width: 900px;
  margin: 0 auto;
}

.wave-line {
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 4px;
  background: linear-gradient(180deg,
    #4a7a9a 0%,
    #4a7a9a 25%,
    #1a1a1a 50%,
    #1a1a1a 75%,
    #4a7a9a 100%
  );
  transform: translateX(-50%);
  z-index: 1;
}

.stages-container {
  display: grid;
  gap: 3rem;
  position: relative;
  z-index: 2;
}

.stage-card {
  background-color: #fff;
  padding: 2rem;
  cursor: pointer;
  transition: all 0.3s ease-out;
}

.stage-card:hover:not(.expanded) {
  transform: translateX(8px);
  box-shadow: 0 8px 24px rgba(74, 122, 154, 0.3);
  border-color: #4a7a9a;
}

.stage-card.expanded {
  background-color: #f0f5f7;
  cursor: default;
  transform: none;
}

.stage-marker {
  font-size: 2rem;
  text-align: center;
  margin-bottom: 1rem;
}

.stage-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.stage-period {
  font-family: 'Inter', sans-serif;
  font-weight: 900;
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  padding: 0.25rem 0.75rem;
  background-color: #4a7a9a;
  color: #fff;
}

.stage-title {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 1.25rem;
  margin: 0;
}

.stage-preview p {
  font-size: 0.9375rem;
  line-height: 1.6;
  margin: 0;
}

.stage-details {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 2px solid rgba(0, 0, 0, 0.1);
}

.stage-content {
  margin-bottom: 1.5rem;
}

.stage-content:last-of-type {
  margin-bottom: 1rem;
}

.stage-content h4 {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #4a7a9a;
  margin: 0 0 0.5rem 0;
}

.stage-content p {
  font-size: 0.875rem;
  line-height: 1.6;
  margin: 0;
}

.stage-quote {
  padding: 1rem;
  background-color: rgba(74, 122, 154, 0.05);
  border-left: 4px solid #4a7a9a;
}

.stage-quote p {
  font-size: 0.875rem;
  line-height: 1.6;
  font-style: italic;
  margin: 0 0 0.5rem 0;
}

.quote-source {
  display: block;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 0.75rem;
  color: #666;
}

/* Themes */
.themes-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto;
}

.theme-card {
  background-color: #fff;
  padding: 2rem;
  cursor: pointer;
  transition: all 0.3s ease-out;
}

.theme-card:hover:not(.expanded) {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(74, 122, 154, 0.3);
  border-color: #4a7a9a;
}

.theme-card.expanded {
  background-color: #f0f5f7;
  cursor: default;
  transform: none;
}

.theme-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.theme-title {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 1.25rem;
  margin: 0;
}

.theme-icon {
  font-size: 2rem;
}

.theme-preview {
  margin-bottom: 1rem;
}

.theme-preview p {
  font-size: 0.9375rem;
  line-height: 1.6;
  margin: 0;
  color: #666;
}

.theme-details {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 2px solid rgba(0, 0, 0, 0.1);
}

.theme-details p {
  font-size: 0.875rem;
  line-height: 1.6;
  margin: 0 0 1rem 0;
}

.theme-details p:last-child {
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
  background-color: #4a7a9a;
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
  color: #4a7a9a;
  padding-left: 1rem;
  margin: auto 0 0 0;
}

/* Footer */
.book-footer {
  padding: 2rem;
  background-color: #1a1a1a;
  color: #4a7a9a;
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
  .themes-grid {
    grid-template-columns: 1fr;
  }

  .quotes-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .book-header {
    padding: 4rem 1rem 3rem;
  }

  section {
    padding: 3rem 1rem;
  }

  .quotes-grid {
    grid-template-columns: 1fr;
  }

  .wave-line {
    display: none;
  }

  .footer-content {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
}
</style>

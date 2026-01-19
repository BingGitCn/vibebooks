<template>
  <div class="bright-night-world">
    <!-- EXIT button -->
    <button class="exit-button" @click="exitWorld">
      <span class="exit-icon">×</span>
      <span class="exit-text">EXIT</span>
    </button>

    <!-- Header Section -->
    <header class="book-header">
      <div class="header-top">
        <span class="volume-label">VOL.019</span>
        <span class="category-label">FICTION</span>
      </div>
      <h1 class="book-title">明亮的夜晚</h1>
      <p class="book-subtitle">The Bright Night</p>
      <p class="book-author">崔恩荣 · 2021</p>
      <div class="header-decoration">
        <div class="moon-icon">🌙</div>
        <div class="star-icon">✨</div>
      </div>
    </header>

    <!-- Section 01: Characters -->
    <section class="section-characters">
      <div class="section-header swiss-border-bottom">
        <p class="section-number" data-number="01">CHARACTERS</p>
        <h2 class="section-title">여성들</h2>
        <p class="section-subtitle">네 대 여자의 이야기</p>
      </div>

      <div class="characters-grid">
        <!-- Character 1 -->
        <article
          class="character-card swiss-border"
          :class="{ expanded: expandedCharacter === 0 }"
          @click="toggleCharacter(0)"
        >
          <div class="character-header">
            <h3 class="character-name">美京</h3>
            <span class="character-role">一生的朋友</span>
          </div>

          <div class="character-preview">
            <p>"我"的挚友，从青春到晚年的陪伴</p>
          </div>

          <transition name="expand">
            <div v-if="expandedCharacter === 0" class="character-details">
              <div class="detail-block">
                <h4>性格</h4>
                <p>温柔、坚韧，在生活的风雨中依然保持优雅</p>
              </div>
              <div class="detail-block">
                <h4>故事</h4>
                <p>从少女时代就是"我"最好的朋友。经历婚姻、生子、丧子之痛，始终与"我"相互扶持。晚年身患癌症，依然保持对生活的热爱。</p>
              </div>
              <div class="detail-block">
                <h4>友谊</h4>
                <p>"我们是彼此生命中的光。在最黑暗的时刻，也是你照亮了我。"</p>
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
            <span class="character-role">叙述者，小说家</span>
          </div>

          <div class="character-preview">
            <p>在祖母去世后，寻找家族记忆的作家</p>
          </div>

          <transition name="expand">
            <div v-if="expandedCharacter === 1" class="character-details">
              <div class="detail-block">
                <h4>性格</h4>
                <p>敏感、内省，对家族历史充满好奇</p>
              </div>
              <div class="detail-block">
                <h4>故事</h4>
                <p>在祖母去世后，开始整理祖母的遗物。通过祖母的日记和信件，逐渐了解家族四代女性的故事。写作成为理解自己和家族的方式。</p>
              </div>
              <div class="detail-block">
                <h4>成长</h4>
                <p>"祖母的一生，就是我一生的镜像。我在她的故事里，看到了自己。"</p>
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
            <h3 class="character-name">祖母（喜慈）</h3>
            <span class="character-role">家族的见证者</span>
          </div>

          <div class="character-preview">
            <p>经历了日本殖民时代和战争的韩国女性</p>
          </div>

          <transition name="expand">
            <div v-if="expandedCharacter === 2" class="character-details">
              <div class="detail-block">
                <h4>性格</h4>
                <p>隐忍、坚强，将苦难埋在心底，用微笑面对生活</p>
              </div>
              <div class="detail-block">
                <h4>故事</h4>
                <p>出生在日本殖民时代，经历战争和贫困。作为曾祖母的女儿，却与母亲关系疏离。一生都在等待母亲的爱，直到去世也没能等来。</p>
              </div>
              <div class="detail-block">
                <h4>秘密</h4>
                <p>"有些话，一辈子都没能说出口。不是不想说，是不敢说。"</p>
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
            <h3 class="character-name">曾祖母（新一）</h3>
            <span class="character-role">家族的秘密</span>
          </div>

          <div class="character-preview">
            <p>与日本男人生下私生女的新女性</p>
          </div>

          <transition name="expand">
            <div v-if="expandedCharacter === 3" class="character-details">
              <div class="detail-block">
                <h4>性格</h4>
                <p>独立、反叛，在保守时代追求自由恋爱</p>
              </div>
              <div class="detail-block">
                <h4>故事</h4>
                <p>在日占时期，与一位日本男子相爱并生下私生女（祖母）。因为这段关系，被家族和社会排斥。将女儿交给他人抚养，自己远走他乡。</p>
              </div>
              <div class="detail-block">
                <h4>遗憾</h4>
                <p>"我一生都在逃避，但有些东西，永远无法逃避。"</p>
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

    <!-- Section 02: Relationships -->
    <section class="section-relationships">
      <div class="section-header swiss-border-bottom">
        <p class="section-number" data-number="02">RELATIONSHIPS</p>
        <h2 class="section-title">관계</h2>
        <p class="section-subtitle">여자들의 유대</p>
      </div>

      <div class="relationships-timeline">
        <!-- Relationship 1 -->
        <div class="relationship-block">
          <div class="relationship-header">
            <span class="relationship-icon">💫</span>
            <h3 class="relationship-title">美京与我</h3>
            <span class="relationship-name">FRIENDSHIP</span>
          </div>

          <div class="relationships-list">
            <article
              class="relationship-card swiss-border"
              :class="{ expanded: expandedRelationship === 0 }"
              @click="toggleRelationship(0)"
            >
              <div class="relationship-preview">
                <h4 class="relationship-item-title">少女时代</h4>
                <p class="relationship-desc">在英语补习班相遇的青春</p>
              </div>

              <transition name="expand">
                <div v-if="expandedRelationship === 0" class="relationship-details">
                  <div class="relationship-story">
                    <h4>故事</h4>
                    <p>两个少女在英语补习班相遇。美京活泼开朗，"我"安静内向。性格的差异让她们相互吸引。一起分享青春的秘密和梦想。</p>
                  </div>
                  <div class="relationship-change">
                    <h4>变化</h4>
                    <p>从青春到年老，友谊经历了无数考验。美京的癌症、丧子之痛，"我"始终在她身边。真正的友谊，不是不打不相识，而是彼此扶持走过一生。</p>
                  </div>
                  <div class="relationship-insight">
                    <h4>洞察</h4>
                    <p>"朋友就是那个在你最黑暗的时候，依然能看到你光芒的人。"</p>
                  </div>
                </div>
              </transition>

              <div class="expand-hint">
                <span>{{ expandedRelationship === 0 ? '收起' : '展开' }}</span>
                <span class="arrow">{{ expandedRelationship === 0 ? '↑' : '↓' }}</span>
              </div>
            </article>

            <article
              class="relationship-card swiss-border"
              :class="{ expanded: expandedRelationship === 1 }"
              @click="toggleRelationship(1)"
            >
              <div class="relationship-preview">
                <h4 class="relationship-item-title">晚年时光</h4>
                <p class="relationship-desc">在癌症面前的陪伴</p>
              </div>

              <transition name="expand">
                <div v-if="expandedRelationship === 1" class="relationship-details">
                  <div class="relationship-story">
                    <h4>故事</h4>
                    <p>美京患上癌症，"我"成为她最信任的人。在医院陪伴她，听她讲述一生的遗憾和未竟的梦想。美京的坚强让"我"震撼。</p>
                  </div>
                  <div class="relationship-change">
                    <h4>变化</h4>
                    <p>面对死亡，美京依然保持优雅。"我"学会了什么是真正的勇敢。友谊的深度，在生离死别面前显现。</p>
                  </div>
                  <div class="relationship-insight">
                    <h4>洞察</h4>
                    <p>"死亡不是结束，而是另一种形式的存在。你活在我的记忆里，就是永恒。"</p>
                  </div>
                </div>
              </transition>

              <div class="expand-hint">
                <span>{{ expandedRelationship === 1 ? '收起' : '展开' }}</span>
                <span class="arrow">{{ expandedRelationship === 1 ? '↑' : '↓' }}</span>
              </div>
            </article>
          </div>
        </div>

        <!-- Relationship 2 -->
        <div class="relationship-block">
          <div class="relationship-header">
            <span class="relationship-icon">👵</span>
            <h3 class="relationship-title">我与祖母</h3>
            <span class="relationship-name">FAMILY</span>
          </div>

          <div class="relationships-list">
            <article
              class="relationship-card swiss-border"
              :class="{ expanded: expandedRelationship === 2 }"
              @click="toggleRelationship(2)"
            >
              <div class="relationship-preview">
                <h4 class="relationship-item-title">血脉与误解</h4>
                <p class="relationship-desc">在祖母去世后才真正认识她</p>
              </div>

              <transition name="expand">
                <div v-if="expandedRelationship === 2" class="relationship-details">
                  <div class="relationship-story">
                    <h4>故事</h4>
                    <p>祖母在世时，"我"并不理解她。祖母总是微笑着，但笑容背后藏着什么，"我"从未真正想知道。直到祖母去世，"我"才开始了解她的故事。</p>
                  </div>
                  <div class="relationship-change">
                    <h4>变化</h4>
                    <p>通过祖母的日记和信件，"我"逐渐理解了祖母的隐忍和坚强。在祖母的故事里，"我"看到了自己的影子。血脉不仅是DNA，更是命运的轮回。</p>
                  </div>
                  <div class="relationship-insight">
                    <h4>洞察</h4>
                    <p>"我们总以为了解家人，但其实我们从未真正看见他们。"</p>
                  </div>
                </div>
              </transition>

              <div class="expand-hint">
                <span>{{ expandedRelationship === 2 ? '收起' : '展开' }}</span>
                <span class="arrow">{{ expandedRelationship === 2 ? '↑' : '↓' }}</span>
              </div>
            </article>

            <article
              class="relationship-card swiss-border"
              :class="{ expanded: expandedRelationship === 3 }"
              @click="toggleRelationship(3)"
            >
              <div class="relationship-preview">
                <h4 class="relationship-item-title">和解</h4>
                <p class="relationship-desc">在文字中重新连接</p>
              </div>

              <transition name="expand">
                <div v-if="expandedRelationship === 3" class="relationship-details">
                  <div class="relationship-story">
                    <h4>故事</h4>
                    <p>在整理祖母遗物时，"我"发现了祖母写给曾祖母却从未寄出的信。信中充满了思念和等待。"我"终于理解了祖母一生的孤独。</p>
                  </div>
                  <div class="relationship-change">
                    <h4>变化</h4>
                    <p>写作成为和解的方式。"我"通过书写祖母的故事，完成了与祖母的对话。在文字里，"我"对祖母说："我看见了你的痛苦。"</p>
                  </div>
                  <div class="relationship-insight">
                    <h4>洞察</h4>
                    <p>"理解是最好的和解。即使你已不在，我依然可以通过文字拥抱你。"</p>
                  </div>
                </div>
              </transition>

              <div class="expand-hint">
                <span>{{ expandedRelationship === 3 ? '收起' : '展开' }}</span>
                <span class="arrow">{{ expandedRelationship === 3 ? '↑' : '↓' }}</span>
              </div>
            </article>
          </div>
        </div>

        <!-- Relationship 3 -->
        <div class="relationship-block">
          <div class="relationship-header">
            <span class="relationship-icon">🥀</span>
            <h3 class="relationship-title">祖母与曾祖母</h3>
            <span class="relationship-name">SECRET</span>
          </div>

          <div class="relationships-list">
            <article
              class="relationship-card swiss-border"
              :class="{ expanded: expandedRelationship === 4 }"
              @click="toggleRelationship(4)"
            >
              <div class="relationship-preview">
                <h4 class="relationship-item-title">被遗弃的女儿</h4>
                <p class="relationship-desc">等了一生也没等来的母爱</p>
              </div>

              <transition name="expand">
                <div v-if="expandedRelationship === 4" class="relationship-details">
                  <div class="relationship-story">
                    <h4>故事</h4>
                    <p>曾祖母（新一）在日占时期与日本男子相爱，生下私生女（祖母）。因为这段关系，曾祖母将祖母交给他人抚养，自己远走他乡。祖母一生都在等待母亲的归来。</p>
                  </div>
                  <div class="relationship-change">
                    <h4>变化</h4>
                    <p>祖母从未真正理解母亲的选择。她被遗弃的创伤影响了她的一生。她与自己的女儿（"我"的母亲）关系也疏离。家族的创伤在代际间传递。</p>
                  </div>
                  <div class="relationship-insight">
                    <h4>洞察</h4>
                    <p>"有些伤口，永远不会愈合。我们只能学会带着伤口生活。"</p>
                  </div>
                </div>
              </transition>

              <div class="expand-hint">
                <span>{{ expandedRelationship === 4 ? '收起' : '展开' }}</span>
                <span class="arrow">{{ expandedRelationship === 4 ? '↑' : '↓' }}</span>
              </div>
            </article>

            <article
              class="relationship-card swiss-border"
              :class="{ expanded: expandedRelationship === 5 }"
              @click="toggleRelationship(5)"
            >
              <div class="relationship-preview">
                <h4 class="relationship-item-title">未寄出的信</h4>
                <p class="relationship-desc">沉默的思念</p>
              </div>

              <transition name="expand">
                <div v-if="expandedRelationship === 5" class="relationship-details">
                  <div class="relationship-story">
                    <h4>故事</h4>
                    <p>祖母去世后，"我"发现了她写给曾祖母的信。这些信从未寄出，满是思念和等待。"妈妈，你为什么不回来？"这样的问句，在信中出现无数次。</p>
                  </div>
                  <div class="relationship-change">
                    <h4>变化</h4>
                    <p>曾祖母可能也写了信，但这些信在历史中遗失。两代女性之间的沉默，成为了家族最大的秘密。直到"我"发现这些信，才打破了几十年的沉默。</p>
                  </div>
                  <div class="relationship-insight">
                    <h4>洞察</h4>
                    <p>"沉默有时比语言更震耳欲聋。未说出口的话，往往是最重要的。"</p>
                  </div>
                </div>
              </transition>

              <div class="expand-hint">
                <span>{{ expandedRelationship === 5 ? '收起' : '展开' }}</span>
                <span class="arrow">{{ expandedRelationship === 5 ? '↑' : '↓' }}</span>
              </div>
            </article>
          </div>
        </div>

        <!-- Relationship 4 -->
        <div class="relationship-block">
          <div class="relationship-header">
            <span class="relationship-icon">🌸</span>
            <h3 class="relationship-title">四代女性</h3>
            <span class="relationship-name">TIME</span>
          </div>

          <div class="relationships-list">
            <article
              class="relationship-card swiss-border"
              :class="{ expanded: expandedRelationship === 6 }"
              @click="toggleRelationship(6)"
            >
              <div class="relationship-preview">
                <h4 class="relationship-item-title">命运的轮回</h4>
                <p class="relationship-desc">历史在家族中重复</p>
              </div>

              <transition name="expand">
                <div v-if="expandedRelationship === 6" class="relationship-details">
                  <div class="relationship-story">
                    <h4>故事</h4>
                    <p>四代女性，四段不同的命运，却有着相似的孤独。曾祖母的私生女身份、祖母的遗弃创伤、母亲与"我"的疏离。历史似乎在家族中轮回。</p>
                  </div>
                  <div class="relationship-change">
                    <h4>变化</h4>
                    <p>"我"通过写作打破了轮回。在理解祖母和曾祖母的故事后，"我"学会了如何爱与被爱。"我"与母亲的关系也得到了和解。</p>
                  </div>
                  <div class="relationship-insight">
                    <h4>洞察</h4>
                    <p>"我们终将重复父母的命运，除非我们学会看见并改变。"</p>
                  </div>
                </div>
              </transition>

              <div class="expand-hint">
                <span>{{ expandedRelationship === 6 ? '收起' : '展开' }}</span>
                <span class="arrow">{{ expandedRelationship === 6 ? '↑' : '↓' }}</span>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 03: Themes -->
    <section class="section-themes">
      <div class="section-header swiss-border-bottom">
        <p class="section-number" data-number="03">THEMES</p>
        <h2 class="section-title">주제</h2>
        <p class="section-subtitle">핵심 주제</p>
      </div>

      <div class="themes-grid">
        <div class="theme-card swiss-border">
          <div class="theme-icon">💫</div>
          <h3 class="theme-name">女性友谊</h3>
          <p class="theme-desc">女性之间的友谊是柔软而坚韧的力量，在生命的风雨中相互扶持</p>
        </div>

        <div class="theme-card swiss-border">
          <div class="theme-icon">👵</div>
          <h3 class="theme-name">家族记忆</h3>
          <p class="theme-desc">家族的历史不仅是大时代的缩影，更是个人命运的迷宫</p>
        </div>

        <div class="theme-card swiss-border">
          <div class="theme-icon">🌙</div>
          <h3 class="theme-name">夜晚的光</h3>
          <p class="theme-desc">即使在最黑暗的夜晚，依然有人为你点亮一盏灯</p>
        </div>

        <div class="theme-card swiss-border">
          <div class="theme-icon">✍️</div>
          <h3 class="theme-name">写作的治愈</h3>
          <p class="theme-desc">写作是理解他人和自己的方式，文字连接了过去与现在</p>
        </div>
      </div>
    </section>

    <!-- Section 04: Quotes -->
    <section class="section-quotes">
      <div class="section-header swiss-border-bottom">
        <p class="section-number" data-number="04">QUOTES</p>
        <h2 class="section-title">인용</h2>
        <p class="section-subtitle">책 속의 말들</p>
      </div>

      <div class="quotes-grid">
        <div class="quote-card swiss-border">
          <div class="quote-spine"></div>
          <p class="quote-text">我们在彼此生命中出现，就是为了在对方最黑暗的时候成为光</p>
          <div class="quote-source">
            <span class="source-name">美京</span>
            <span class="source-role">晚年对话</span>
          </div>
        </div>

        <div class="quote-card swiss-border">
          <div class="quote-spine"></div>
          <p class="quote-text">我花了大半辈子才明白，有些话一辈子都说不出口，但不代表不重要</p>
          <div class="quote-source">
            <span class="source-name">"我"</span>
            <span class="source-role">关于祖母</span>
          </div>
        </div>

        <div class="quote-card swiss-border">
          <div class="quote-spine"></div>
          <p class="quote-text">死亡不是结束，而是另一种形式的存在。你活在我的记忆里，就是永恒</p>
          <div class="quote-source">
            <span class="source-name">美京</span>
            <span class="source-role">面对死亡</span>
          </div>
        </div>

        <div class="quote-card swiss-border">
          <div class="quote-spine"></div>
          <p class="quote-text">我们都是带着伤口活着的人，只是有人选择藏起来，有人选择展示</p>
          <div class="quote-source">
            <span class="source-name">祖母的日记</span>
            <span class="source-role">内心独白</span>
          </div>
        </div>

        <div class="quote-card swiss-border">
          <div class="quote-spine"></div>
          <p class="quote-text">在夜晚，我们更容易看见自己。白天的喧嚣退去，内心的声音浮现</p>
          <div class="quote-source">
            <span class="source-name">"我"</span>
            <span class="source-role">关于夜晚</span>
          </div>
        </div>

        <div class="quote-card swiss-border">
          <div class="quote-spine"></div>
          <p class="quote-text">写作不是为了记录，而是为了理解。在文字中，我与过去的自己和解</p>
          <div class="quote-source">
            <span class="source-name">"我"</span>
            <span class="source-role">写作的意义</span>
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
const expandedRelationship = ref(null)

const exitWorld = () => {
  router.push('/yearbook/fiction')
}

const toggleCharacter = (index) => {
  if (expandedCharacter.value === index) {
    expandedCharacter.value = null
  } else {
    expandedCharacter.value = index
  }
}

const toggleRelationship = (index) => {
  if (expandedRelationship.value === index) {
    expandedRelationship.value = null
  } else {
    expandedRelationship.value = index
  }
}
</script>

<style scoped>
.bright-night-world {
  min-height: 100vh;
  background: #FAFAFA;
}

/* Exit Button */
.exit-button {
  position: fixed;
  top: 2rem;
  left: 2rem;
  padding: 0.75rem 1.5rem;
  background: #e87a7a;
  color: #ffffff;
  border: none;
  cursor: pointer;
  z-index: 100;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  transition: all 0.15s ease-out;
}

.exit-button:hover {
  background: #d66a6a;
  transform: translateY(-2px);
}

.exit-icon {
  font-size: 1.5rem;
  line-height: 1;
}

/* Header */
.book-header {
  padding: 6rem 2rem 3rem;
  text-align: center;
  position: relative;
}

.header-top {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.volume-label,
.category-label {
  font-family: 'Inter', sans-serif;
  font-weight: 900;
  font-size: 0.625rem;
  letter-spacing: 0.2em;
  color: #e87a7a;
}

.book-title {
  font-family: 'Inter', sans-serif;
  font-weight: 900;
  font-size: clamp(2.5rem, 5vw, 4rem);
  letter-spacing: -0.03em;
  line-height: 1.1;
  margin: 0 0 0.5rem;
  color: #1a1a1a;
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
  margin: 0 0 1.5rem;
}

.header-decoration {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
}

.moon-icon,
.star-icon {
  font-size: 1.5rem;
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
  color: #e87a7a;
  margin: 0 0 1rem;
}

.section-title {
  font-family: 'Inter', sans-serif;
  font-weight: 900;
  font-size: 2.5rem;
  letter-spacing: -0.03em;
  margin: 0 0 0.5rem;
  color: #1a1a1a;
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
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem 3rem;
}

.character-card {
  padding: 2rem;
  background: #ffffff;
  cursor: pointer;
  transition: all 0.15s ease-out;
}

.character-card:hover {
  border-color: #e87a7a;
  transform: translateY(-2px);
}

.character-header {
  margin-bottom: 1rem;
}

.character-name {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 1.25rem;
  letter-spacing: 0.05em;
  margin: 0 0 0.5rem;
  color: #1a1a1a;
}

.character-role {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  color: #e87a7a;
  text-transform: uppercase;
}

.character-preview {
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.character-preview p {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1.6;
  color: #666666;
  margin: 0;
}

/* Character Details */
.character-details {
  padding: 1.5rem 0;
}

.detail-block {
  margin-bottom: 1rem;
}

.detail-block:last-child {
  margin-bottom: 0;
}

.detail-block h4 {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  color: #e87a7a;
  text-transform: uppercase;
  margin: 0 0 0.5rem;
}

.detail-block p {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1.6;
  color: #666666;
  margin: 0;
}

/* Expand Hint */
.expand-hint {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  padding-top: 1rem;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  color: #e87a7a;
}

.expand-hint .arrow {
  transition: transform 0.15s ease-out;
}

/* Relationships Section */
.relationships-timeline {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem 3rem;
}

.relationship-block {
  margin-bottom: 2rem;
}

.relationship-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  padding: 0 2rem;
}

.relationship-icon {
  font-size: 1.5rem;
}

.relationship-title {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 1.25rem;
  letter-spacing: 0.05em;
  margin: 0;
  color: #1a1a1a;
}

.relationship-name {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  color: #e87a7a;
  text-transform: uppercase;
}

.relationships-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.relationship-card {
  padding: 2rem;
  background: #ffffff;
  cursor: pointer;
  transition: all 0.15s ease-out;
}

.relationship-card:hover {
  border-color: #e87a7a;
  transform: translateY(-2px);
}

.relationship-preview {
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.relationship-item-title {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 1rem;
  letter-spacing: 0.05em;
  margin: 0 0 0.5rem;
  color: #1a1a1a;
}

.relationship-desc {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 0.875rem;
  color: #666666;
  margin: 0;
}

/* Relationship Details */
.relationship-details {
  padding: 1.5rem 0;
}

.relationship-story,
.relationship-change,
.relationship-insight {
  margin-bottom: 1rem;
}

.relationship-story:last-child,
.relationship-change:last-child,
.relationship-insight:last-child {
  margin-bottom: 0;
}

.relationship-story h4,
.relationship-change h4,
.relationship-insight h4 {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  color: #e87a7a;
  text-transform: uppercase;
  margin: 0 0 0.5rem;
}

.relationship-story p,
.relationship-change p,
.relationship-insight p {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1.6;
  color: #666666;
  margin: 0;
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
  padding: 2rem;
  background: #ffffff;
  text-align: center;
  transition: all 0.15s ease-out;
}

.theme-card:hover {
  border-color: #e87a7a;
  transform: translateY(-2px);
}

.theme-icon {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.theme-name {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 1rem;
  letter-spacing: 0.05em;
  margin: 0 0 0.75rem;
  color: #1a1a1a;
}

.theme-desc {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1.6;
  color: #666666;
  margin: 0;
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
  padding: 2rem;
  background: #ffffff;
  position: relative;
  transition: all 0.15s ease-out;
}

.quote-card:hover {
  border-color: #e87a7a;
  transform: translateY(-2px);
}

.quote-spine {
  position: absolute;
  top: 0;
  left: 1rem;
  width: 4px;
  height: 100%;
  background: #e87a7a;
}

.quote-text {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 0.9375rem;
  line-height: 1.7;
  color: #1a1a1a;
  margin: 0 0 1.5rem 0;
  padding-left: 1rem;
}

.quote-source {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.75rem;
  padding-left: 1rem;
}

.source-name {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: #1a1a1a;
}

.source-role {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  color: #666666;
}

/* Expand Transition */
.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s ease-out;
  max-height: 1000px;
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
}

/* Responsive */
@media (max-width: 1024px) {
  .characters-grid {
    grid-template-columns: 1fr;
  }

  .themes-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .quotes-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .characters-grid,
  .themes-grid,
  .quotes-grid {
    grid-template-columns: 1fr;
    padding: 1rem;
  }

  .relationship-header {
    padding: 0 1rem;
  }

  .character-card,
  .relationship-card,
  .theme-card,
  .quote-card {
    padding: 1.5rem;
  }

  .exit-button {
    top: 1rem;
    left: 1rem;
    padding: 0.5rem 1rem;
  }

  .book-header {
    padding: 4rem 1rem 2rem;
  }
}
</style>

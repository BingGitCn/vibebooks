<template>
  <div class="namiya-zakaten-world">
    <!-- EXIT button -->
    <button class="exit-button" @click="exitWorld">
      <span class="exit-icon">×</span>
      <span class="exit-text">EXIT</span>
    </button>

    <!-- Header Section -->
    <header class="book-header">
      <div class="header-top">
        <span class="volume-label">VOL.035</span>
        <span class="category-label">FICTION</span>
      </div>
      <h1 class="book-title">解忧杂货店</h1>
      <p class="book-subtitle">ナミヤ雑貨店の奇蹟</p>
      <p class="book-author">东野圭吾 · 2012</p>
      <div class="header-decoration">
        <div class="mailbox-icon">📮</div>
      </div>
    </header>

    <!-- Section 01: Characters -->
    <section class="section-characters">
      <div class="section-header swiss-border-bottom">
        <p class="section-number" data-number="01">CHARACTERS</p>
        <h2 class="section-title">相談者たち</h2>
        <p class="section-subtitle">迷える人々と、答える人</p>
      </div>

      <div class="characters-grid">
        <!-- Character 1 -->
        <article
          class="character-card swiss-border"
          :class="{ expanded: expandedCharacter === 0 }"
          @click="toggleCharacter(0)"
        >
          <div class="character-header">
            <h3 class="character-name">月兔（静子）</h3>
            <span class="character-year">1980</span>
          </div>
          <div class="character-role">奥运选手 × 恋人</div>

          <div class="character-preview">
            <p>奥运集训与陪伴绝症男友的抉择</p>
          </div>

          <transition name="expand">
            <div v-if="expandedCharacter === 0" class="character-details">
              <div class="detail-block">
                <h4>性格</h4>
                <p>认真、执着、善良的击剑运动员</p>
              </div>
              <div class="detail-block">
                <h4>故事</h4>
                <p>1980年莫斯科奥运会被抵制，她在追逐梦想与陪伴男友之间挣扎。一封投递到未来的信，改变了她的决定。</p>
              </div>
              <div class="detail-block">
                <h4>关系</h4>
                <p>男友在生命的最后时刻，希望她继续追逐梦想。三个小偷的回复，让她做出了无悔的选择。</p>
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
            <h3 class="character-name">克郎（鱼店音乐人）</h3>
            <span class="character-year">1980</span>
          </div>
          <div class="character-role">鱼店继承人 × 音乐梦</div>

          <div class="character-preview">
            <p>继承家族鱼店还是坚持音乐梦想</p>
          </div>

          <transition name="expand">
            <div v-if="expandedCharacter === 1" class="character-details">
              <div class="detail-block">
                <h4>性格</h4>
                <p>热爱音乐，孝顺，在现实与理想间挣扎的年轻人</p>
              </div>
              <div class="detail-block">
                <h4>故事</h4>
                <p>坚持音乐梦想多年却一事无成，父亲期望他继承鱼店。浪矢爷爷的回信："如果对音乐真心执着，即使撞得头破血流也无妨。"</p>
              </div>
              <div class="detail-block">
                <h4>关系</h4>
                <p>在一次孤儿院演出中为救人牺牲。他的音乐后来拯救了另一个女孩（晴美）的生命。</p>
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
            <h3 class="character-name">晴美（迷途的小狗）</h3>
            <span class="character-year">1988</span>
          </div>
          <div class="character-role">陪酒女 × 企业家</div>

          <div class="character-preview">
            <p>如何在繁忙工作中致富并改变人生</p>
          </div>

          <transition name="expand">
            <div v-if="expandedCharacter === 2" class="character-details">
              <div class="detail-block">
                <h4>性格</h4>
                <p>聪明、有野心，但在金钱中迷失的职场女性</p>
              </div>
              <div class="detail-block">
                <h4>故事</h4>
                <p>从小地方到大城市，从陪酒女到成功商人。收到浪矢爷爷的建议后，在房地产和股市中致富。</p>
              </div>
              <div class="detail-block">
                <h4>关系</h4>
                <p>2012年差点被三个小偷抢劫，却意外收到来自1988年的自己的信。决定回馈社会，资助孤儿院。</p>
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
            <h3 class="character-name">绿河（"绿河"女士）</h3>
            <span class="character-year">1970</span>
          </div>
          <div class="character-role">单身母亲 × 慈善家</div>

          <div class="character-preview">
            <p>是否该生下私生子的艰难决定</p>
          </div>

          <transition name="expand">
            <div v-if="expandedCharacter === 3" class="character-details">
              <div class="detail-block">
                <h4>性格</h4>
                <p>温柔、无私，用爱守护生命的女性</p>
              </div>
              <div class="detail-block">
                <h4>故事</h4>
                <p>1970年咨询是否该生下私生子，决定生下并独自抚养。后来创立"丸光园"孤儿院，拯救了无数孩子。</p>
              </div>
              <div class="detail-block">
                <h4>关系</h4>
                <p>她的孩子就是克郎在火灾中救下的女孩。她的生命，通过浪矢杂货店的建议，影响了三代人。</p>
              </div>
            </div>
          </transition>

          <div class="expand-hint">
            <span>{{ expandedCharacter === 3 ? '收起' : '展开' }}</span>
            <span class="arrow">{{ expandedCharacter === 3 ? '↑' : '↓' }}</span>
          </div>
        </article>

        <!-- Character 5 -->
        <article
          class="character-card swiss-border"
          :class="{ expanded: expandedCharacter === 4 }"
          @click="toggleCharacter(4)"
        >
          <div class="character-header">
            <h3 class="character-name">浪矢爷爷（浪矢雄治）</h3>
            <span class="character-year">创始人</span>
          </div>
          <div class="character-role">解忧杂货店老板</div>

          <div class="character-preview">
            <p>认真对待每一个烦恼的老人</p>
          </div>

          <transition name="expand">
            <div v-if="expandedCharacter === 4" class="character-details">
              <div class="detail-block">
                <h4>性格</h4>
                <p>智慧、耐心、幽默，相信每个问题都值得认真对待</p>
              </div>
              <div class="detail-block">
                <h4>故事</h4>
                <p>晚年开设"浪矢杂货店"，开始接受烦恼咨询。无论大人还是小孩的玩笑问题，都一一认真回复。</p>
              </div>
              <div class="detail-block">
                <h4>关系</h4>
                <p>去世前留下"33年后复活"的预告。他的回信穿越时空，拯救了40年后的人们。</p>
              </div>
            </div>
          </transition>

          <div class="expand-hint">
            <span>{{ expandedCharacter === 4 ? '收起' : '展开' }}</span>
            <span class="arrow">{{ expandedCharacter === 4 ? '↑' : '↓' }}</span>
          </div>
        </article>

        <!-- Character 6 -->
        <article
          class="character-card swiss-border"
          :class="{ expanded: expandedCharacter === 5 }"
          @click="toggleCharacter(5)"
        >
          <div class="character-header">
            <h3 class="character-name">三个小偷</h3>
            <span class="character-year">2012</span>
          </div>
          <div class="character-role">意外的信使</div>

          <div class="character-preview">
            <p>敦也、翔太、幸平</p>
          </div>

          <transition name="expand">
            <div v-if="expandedCharacter === 5" class="character-details">
              <div class="detail-block">
                <h4>性格</h4>
                <p>看似不良少年，内心善良，只是生活所迫</p>
              </div>
              <div class="detail-block">
                <h4>故事</h4>
                <p>偷窃后躲进废弃杂货店，意外收到来自过去的信件。用笨拙的方式回复，改变了咨询者的命运。</p>
              </div>
              <div class="detail-block">
                <h4>关系</h4>
                <p>收到来自过去的感谢信，理解了生命的价值。最终放弃行窃，决定重新开始人生。</p>
              </div>
            </div>
          </transition>

          <div class="expand-hint">
            <span>{{ expandedCharacter === 5 ? '收起' : '展开' }}</span>
            <span class="arrow">{{ expandedCharacter === 5 ? '↑' : '↓' }}</span>
          </div>
        </article>
      </div>
    </section>

    <!-- Section 02: Correspondence Timeline -->
    <section class="section-correspondence">
      <div class="section-header swiss-border-bottom">
        <p class="section-number" data-number="02">CORRESPONDENCE</p>
        <h2 class="section-title">手紙の行き来</h2>
        <p class="section-subtitle">時を超える手紙</p>
      </div>

      <div class="correspondence-timeline">
        <!-- 1970 -->
        <div class="timeline-block">
          <div class="timeline-year">1970</div>
          <div class="timeline-content">
            <article
              class="letter-card swiss-border"
              :class="{ expanded: expandedLetter === 0 }"
              @click="toggleLetter(0)"
            >
              <div class="letter-header">
                <span class="letter-from">发件人：绿河（和久浩哉）</span>
                <span class="letter-to">收件人：浪矢杂货店</span>
              </div>
              <div class="letter-subject">咨询：是否该生下私生子？</div>

              <div class="letter-preview">
                <p>"我怀孕了，对方是有妇之夫，不可能和我结婚。我该生下这个孩子吗？"</p>
              </div>

              <transition name="expand">
                <div v-if="expandedLetter === 0" class="letter-details">
                  <div class="letter-reply">
                    <h4>浪矢爷爷的回复：</h4>
                    <p>"最重要的是，你能爱这个孩子吗？如果能在担心和烦恼中把孩子生下来，那就生下来吧。"</p>
                  </div>
                  <div class="letter-impact">
                    <h4>命运回响：</h4>
                    <p>绿河决定生下孩子并独自抚养。后来创立"丸光园"孤儿院，拯救了无数孩子。其中包括：克郎救下的女孩，晴美（被绿河收养），以及更多需要帮助的孩子。</p>
                  </div>
                </div>
              </transition>

              <div class="expand-hint">
                <span>{{ expandedLetter === 0 ? '收起信件' : '展开信件' }}</span>
                <span class="arrow">{{ expandedLetter === 0 ? '↑' : '↓' }}</span>
              </div>
            </article>
          </div>
        </div>

        <!-- 1980 -->
        <div class="timeline-block">
          <div class="timeline-year">1980</div>
          <div class="timeline-content">
            <article
              class="letter-card swiss-border"
              :class="{ expanded: expandedLetter === 1 }"
              @click="toggleLetter(1)"
            >
              <div class="letter-header">
                <span class="letter-from">发件人：克郎</span>
                <span class="letter-to">收件人：浪矢杂货店</span>
              </div>
              <div class="letter-subject">咨询：继承鱼店还是追求音乐梦？</div>

              <div class="letter-preview">
                <p>"家里开鱼店，父亲希望我继承。但我真心想当音乐人，已经坚持多年了。"</p>
              </div>

              <transition name="expand">
                <div v-if="expandedLetter === 1" class="letter-details">
                  <div class="letter-reply">
                    <h4>浪矢爷爷的回复：</h4>
                    <p>"你对音乐的执着不是装出来的。如果你对音乐真心执着，即使撞得头破血流也无妨。但是，不要留下遗憾。"</p>
                  </div>
                  <div class="letter-impact">
                    <h4>命运回响：</h4>
                    <p>克郎继续追求音乐梦。1988年，他在"丸光园"孤儿院演出时发生火灾，为救一个小女孩牺牲。那个女孩就是绿河的女儿。克郎的音乐后来救了晴美的命。</p>
                  </div>
                </div>
              </transition>

              <div class="expand-hint">
                <span>{{ expandedLetter === 1 ? '收起信件' : '展开信件' }}</span>
                <span class="arrow">{{ expandedLetter === 1 ? '↑' : '↓' }}</span>
              </div>
            </article>

            <article
              class="letter-card swiss-border"
              :class="{ expanded: expandedLetter === 2 }"
              @click="toggleLetter(2)"
            >
              <div class="letter-header">
                <span class="letter-from">发件人：月兔（静子）</span>
                <span class="letter-to">收件人：浪矢杂货店（未来）</span>
              </div>
              <div class="letter-subject">咨询：是否该放弃奥运集训？</div>

              <div class="letter-preview">
                <p>"男友身患绝症，时间不多。我是该继续奥运集训，还是陪他到最后？"</p>
              </div>

              <transition name="expand">
                <div v-if="expandedLetter === 2" class="letter-details">
                  <div class="letter-reply">
                    <h4>三个小偷的回复（2012年发往1980年）：</h4>
                    <p>"只要他在最后时刻是幸福的，那就足够了。你的梦想，也是他的梦想。"</p>
                  </div>
                  <div class="letter-impact">
                    <h4>命运回响：</h4>
                    <p>月兔继续训练并参加选拔。虽然最终落选，但她完成了男友的心愿。男友在临终前看到了她努力的样子，含笑而逝。</p>
                  </div>
                </div>
              </transition>

              <div class="expand-hint">
                <span>{{ expandedLetter === 2 ? '收起信件' : '展开信件' }}</span>
                <span class="arrow">{{ expandedLetter === 2 ? '↑' : '↓' }}</span>
              </div>
            </article>
          </div>
        </div>

        <!-- 1988 -->
        <div class="timeline-block">
          <div class="timeline-year">1988</div>
          <div class="timeline-content">
            <article
              class="letter-card swiss-border"
              :class="{ expanded: expandedLetter === 3 }"
              @click="toggleLetter(3)"
            >
              <div class="letter-header">
                <span class="letter-from">发件人：晴美（迷途的小狗）</span>
                <span class="letter-to">收件人：浪矢杂货店</span>
              </div>
              <div class="letter-subject">咨询：如何致富并改变人生？</div>

              <div class="letter-preview">
                <p>"我在陪酒酒吧工作，想要摆脱现在的生活。请告诉我如何致富的方法。"</p>
              </div>

              <transition name="expand">
                <div v-if="expandedLetter === 3" class="letter-details">
                  <div class="letter-reply">
                    <h4>浪矢爷爷的回复：</h4>
                    <p>"首先，辞掉现在的工作。然后，努力存钱，关注经济走势。但最后，请把金钱用在更有意义的事情上。"</p>
                  </div>
                  <div class="letter-impact">
                    <h4>命运回响：</h4>
                    <p>晴美遵循建议，在房地产和股市中致富。2012年，她收到来自过去自己的信，决定资助"丸光园"孤儿院。三个小偷行窃时，无意中发现了这封信，决定放弃犯罪。</p>
                  </div>
                </div>
              </transition>

              <div class="expand-hint">
                <span>{{ expandedLetter === 3 ? '收起信件' : '展开信件' }}</span>
                <span class="arrow">{{ expandedLetter === 3 ? '↑' : '↓' }}</span>
              </div>
            </article>
          </div>
        </div>

        <!-- 2012 -->
        <div class="timeline-block">
          <div class="timeline-year">2012</div>
          <div class="timeline-content">
            <article
              class="letter-card swiss-border special"
              :class="{ expanded: expandedLetter === 4 }"
              @click="toggleLetter(4)"
            >
              <div class="letter-header">
                <span class="letter-from">发件人：三个小偷</span>
                <span class="letter-to">收件人：浪矢杂货店（过去）</span>
              </div>
              <div class="letter-subject">感谢信</div>

              <div class="letter-preview">
                <p>"我们收到了来自过去的感谢信。原来，我们笨拙的回复，真的拯救了别人。"</p>
              </div>

              <transition name="expand">
                <div v-if="expandedLetter === 4" class="letter-details">
                  <div class="letter-reply">
                    <h4>来自过去的感谢：</h4>
                    <p>"致在浪矢杂货店的先生：我在丸光园度过了童年。感谢那些曾经帮助过我的人。我现在过得很幸福。"</p>
                  </div>
                  <div class="letter-impact">
                    <h4>命运回响：</h4>
                    <p>三个小偷理解了生命的价值。他们放弃了行窃，归还了晴美的财物，决定重新开始人生。浪矢杂货店的咨询，在40年后完成了最后的救赎。</p>
                  </div>
                </div>
              </transition>

              <div class="expand-hint">
                <span>{{ expandedLetter === 4 ? '收起信件' : '展开信件' }}</span>
                <span class="arrow">{{ expandedLetter === 4 ? '↑' : '↓' }}</span>
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
        <h2 class="section-title">テーマ</h2>
        <p class="section-subtitle">人生の岐路</p>
      </div>

      <div class="themes-grid">
        <!-- Theme 1 -->
        <article
          class="theme-card swiss-border"
          :class="{ expanded: expandedTheme === 0 }"
          @click="toggleTheme(0)"
        >
          <div class="theme-header">
            <h3 class="theme-title">倾听与回应</h3>
            <div class="theme-icon">👂</div>
          </div>
          <div class="theme-preview">
            <p>每个烦恼都值得被认真对待</p>
          </div>

          <transition name="expand">
            <div v-if="expandedTheme === 0" class="theme-details">
              <p>浪矢爷爷说："不管是骚扰还是恶作剧，写这些信给浪矢杂货店的人，和普通咨询者在本质上是一样的。他们的内心破了一个洞，重要的东西正从那个洞流失。"</p>
              <p>他对待每一个问题都极其认真——即使是小孩子的玩笑。因为在他眼中，"困扰"本身就是需要被尊重的情绪。</p>
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
            <h3 class="theme-title">白纸地图</h3>
            <div class="theme-icon">🗺️</div>
          </div>
          <div class="theme-preview">
            <p>人生的无限可能性</p>
          </div>

          <transition name="expand">
            <div v-if="expandedTheme === 1" class="theme-details">
              <p>"你的地图是一张白纸，所以即使想决定目的地，也不知道路在哪里。"</p>
              <p>"换个角度看，正因为是白纸，所以可以画任何地图。一切都掌握在你自己手上。你很自由，充满了无限可能。"</p>
              <p>浪矢爷爷最后的这封信，不仅是给晴美的，也是给所有迷惘的人的答案：没有既定路线，反而是最大的自由。</p>
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
            <h3 class="theme-title">命运的羁绊</h3>
            <div class="theme-icon">🔗</div>
          </div>
          <div class="theme-preview">
            <p>看似无关的人，生命紧密相连</p>
          </div>

          <transition name="expand">
            <div v-if="expandedTheme === 2" class="theme-details">
              <p>1970年的绿河，影响了1980年的克郎；克郎的死，影响了1988年的晴美；晴美的成功，影响了2012年的三个小偷。</p>
              <p>他们彼此不知道对方的存在，却通过浪矢杂货店的信件，形成了跨越40年的生命网络。一个小小的善举，经过时间的传递，拯救了无数人。</p>
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
            <h3 class="theme-title">时间的治愈力</h3>
            <div class="theme-icon">⏳</div>
          </div>
          <div class="theme-preview">
            <p>过去拯救未来</p>
          </div>

          <transition name="expand">
            <div v-if="expandedTheme === 3" class="theme-details">
              <p>浪矢爷爷去世前说："我希望我的咨询室对这些人也有帮助。哪怕是百年以后。"</p>
              <p>他不知道，40年后，三个小偷真的在他的店里，继续回答来自过去的信件。过去的人帮助了未来的人，未来的人又反过来安慰了过去的人。</p>
              <p>时间不是单向的，爱可以穿越时空。</p>
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
        <h2 class="section-title">言葉</h2>
        <p class="section-subtitle">心に残る言葉</p>
      </div>

      <div class="quotes-grid">
        <article class="quote-card swiss-border">
          <div class="quote-spine"></div>
          <blockquote class="quote-text">
            "你的地图是一张白纸，所以即使想决定目的地，也不知道路在哪里。换个角度看，正因为是白纸，所以可以画任何地图，一切都掌握在你自己手上。"
          </blockquote>
          <div class="quote-divider"></div>
          <div class="quote-source">—— 浪矢雄治</div>
        </article>

        <article class="quote-card swiss-border">
          <div class="quote-spine"></div>
          <blockquote class="quote-text">
            "如果对音乐真心执着，即使撞得头破血流也无妨。但是，不要留下遗憾。"
          </blockquote>
          <div class="quote-divider"></div>
          <div class="quote-source">—— 浪矢雄治致克郎</div>
        </article>

        <article class="quote-card swiss-border">
          <div class="quote-spine"></div>
          <blockquote class="quote-text">
            "不管是骚扰还是恶作剧，写这些信给浪矢杂货店的人，和普通咨询者在本质上是一样的。他们的内心破了一个洞，重要的东西正从那个洞流失。"
          </blockquote>
          <div class="quote-divider"></div>
          <div class="quote-source">—— 浪矢雄治</div>
        </article>

        <article class="quote-card swiss-border">
          <div class="quote-spine"></div>
          <blockquote class="quote-text">
            "我希望读者在掩卷时能感受到一种温暖的关爱。我相信人性向善，人与人之间的羁绊能够超越时空。"
          </blockquote>
          <div class="quote-divider"></div>
          <div class="quote-source">—— 东野圭吾</div>
        </article>

        <article class="quote-card swiss-border">
          <div class="quote-spine"></div>
          <blockquote class="quote-text">
            "只要他在最后时刻是幸福的，那就足够了。你的梦想，也是他的梦想。"
          </blockquote>
          <div class="quote-divider"></div>
          <div class="quote-source">—— 三个小偷致月兔</div>
        </article>

        <article class="quote-card swiss-border">
          <div class="quote-spine"></div>
          <blockquote class="quote-text">
            "谢谢你们。多亏了你们，我现在过得很幸福。在丸光园的孩子们，也都会记得这份温暖。"
          </blockquote>
          <div class="quote-divider"></div>
          <div class="quote-source">—— 来自过去的感谢信</div>
        </article>
      </div>
    </section>

    <!-- Footer -->
    <footer class="book-footer swiss-border-top">
      <div class="footer-content">
        <div class="footer-left">
          <span class="footer-label">ARCHIVED</span>
          <span class="footer-date">2012</span>
        </div>
        <div class="footer-right">
          <span class="footer-message">时を超える温かい手紙</span>
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
const expandedLetter = ref(null)
const expandedTheme = ref(null)

const exitWorld = () => {
  router.push('/yearbook/fiction')
}

const toggleCharacter = (index) => {
  if (expandedCharacter.value === index) {
    expandedCharacter.value = null
  } else {
    expandedCharacter.value = index
    expandedLetter.value = null
    expandedTheme.value = null
  }
}

const toggleLetter = (index) => {
  if (expandedLetter.value === index) {
    expandedLetter.value = null
  } else {
    expandedLetter.value = index
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
    expandedLetter.value = null
  }
}
</script>

<style scoped>
.namiya-zakaten-world {
  min-height: 100vh;
  background-color: #fef9e7;
  color: #1a1a1a;
  position: relative;
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
  background-color: #f4b44a;
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
  color: #f4b44a;
}

.exit-icon {
  font-size: 1.5rem;
  line-height: 1;
}

/* Header */
.book-header {
  padding: 6rem 2rem 4rem;
  background-color: #f4b44a;
  color: #1a1a1a;
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
  border: 2px solid #1a1a1a;
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
  opacity: 0.8;
}

.book-author {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 0.875rem;
  letter-spacing: 0.1em;
  opacity: 0.7;
  margin: 0;
}

.header-decoration {
  margin-top: 2rem;
}

.mailbox-icon {
  font-size: 3rem;
}

/* Sections */
section {
  padding: 4rem 2rem;
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
  color: #f4b44a;
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
  box-shadow: 0 8px 24px rgba(244, 180, 74, 0.3);
  border-color: #f4b44a;
}

.character-card.expanded {
  background-color: #fef9e7;
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

.character-year {
  font-family: 'Inter', sans-serif;
  font-weight: 900;
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  padding: 0.25rem 0.75rem;
  background-color: #f4b44a;
}

.character-role {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 0.875rem;
  color: #666;
  margin-bottom: 1rem;
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
  color: #f4b44a;
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
  color: #f4b44a;
}

/* Timeline */
.correspondence-timeline {
  max-width: 1000px;
  margin: 0 auto;
}

.timeline-block {
  margin-bottom: 4rem;
}

.timeline-block:last-child {
  margin-bottom: 0;
}

.timeline-year {
  font-family: 'Inter', sans-serif;
  font-weight: 900;
  font-size: 3rem;
  color: #f4b44a;
  text-align: center;
  margin-bottom: 2rem;
  letter-spacing: 0.1em;
}

.timeline-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.letter-card {
  background-color: #fff;
  padding: 2rem;
  cursor: pointer;
  transition: all 0.3s ease-out;
  position: relative;
}

.letter-card::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background-color: #f4b44a;
}

.letter-card:hover:not(.expanded) {
  transform: translateX(8px);
  box-shadow: 0 8px 24px rgba(244, 180, 74, 0.3);
}

.letter-card.expanded {
  background-color: #fef9e7;
  cursor: default;
  transform: none;
}

.letter-card.special::before {
  background-color: #1a1a1a;
}

.letter-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  gap: 2rem;
  flex-wrap: wrap;
}

.letter-from,
.letter-to {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  color: #666;
}

.letter-subject {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 1.125rem;
  margin-bottom: 1rem;
  color: #1a1a1a;
}

.letter-preview {
  margin-bottom: 1rem;
}

.letter-preview p {
  font-size: 0.9375rem;
  line-height: 1.6;
  margin: 0;
  font-style: italic;
}

.letter-details {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 2px solid rgba(0, 0, 0, 0.1);
}

.letter-reply,
.letter-impact {
  margin-bottom: 1.5rem;
}

.letter-reply h4,
.letter-impact h4 {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #f4b44a;
  margin: 0 0 0.75rem 0;
}

.letter-reply p,
.letter-impact p {
  font-size: 0.875rem;
  line-height: 1.6;
  margin: 0;
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
  box-shadow: 0 8px 24px rgba(244, 180, 74, 0.3);
  border-color: #f4b44a;
}

.theme-card.expanded {
  background-color: #fef9e7;
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
  background-color: #f4b44a;
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
  color: #f4b44a;
  padding-left: 1rem;
  margin: auto 0 0 0;
}

/* Footer */
.book-footer {
  padding: 2rem;
  background-color: #1a1a1a;
  color: #f4b44a;
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

  .themes-grid {
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

  .letter-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .timeline-year {
    font-size: 2rem;
  }

  .footer-content {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
}
</style>

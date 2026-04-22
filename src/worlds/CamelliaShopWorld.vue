<template>
  <div class="camellia-shop-world">
    <!-- EXIT button -->
    <button class="exit-button" @click="exitWorld">
      <span class="exit-icon">×</span>
      <span class="exit-text">EXIT</span>
    </button>

    <!-- Header Section -->
    <header class="book-header">
      <div class="header-top">
        <span class="volume-label">VOL.030</span>
        <span class="category-label">FICTION</span>
      </div>
      <h1 class="book-title">山茶文具店</h1>
      <p class="book-subtitle">Tsubaki Baiten</p>
      <p class="book-author">小川糸 · 2017</p>
      <div class="header-decoration">
        <div class="season-icon">🌸</div>
        <div class="pen-icon">✒️</div>
      </div>
    </header>

    <!-- Section 01: Characters -->
    <section class="section-characters">
      <div class="section-header swiss-border-bottom">
        <p class="section-number" data-number="01">CHARACTERS</p>
        <h2 class="section-title">人々</h2>
        <p class="section-subtitle">鎌倉の住人たち</p>
      </div>

      <div class="characters-grid">
        <!-- Character 1 -->
        <article
          class="character-card swiss-border"
          :class="{ expanded: expandedCharacter === 0 }"
          @click="toggleCharacter(0)"
        >
          <div class="character-header">
            <h3 class="character-name">鸠子（小川鸠子）</h3>
            <span class="character-role">代笔人</span>
          </div>

          <div class="character-preview">
            <p>山茶文具店店主，上代的代笔继承人</p>
          </div>

          <transition name="expand">
            <div v-if="expandedCharacter === 0" class="character-details">
              <div class="detail-block">
                <h4>性格</h4>
                <p>敏感、细腻，曾因祖母严厉的教育而叛逆，最终理解代笔人的使命</p>
              </div>
              <div class="detail-block">
                <h4>故事</h4>
                <p>在祖母去世后回到镰仓，继承山茶文具店。起初抗拒代笔人身份，逐渐理解文字的温度和传承的意义。通过11个委托，学会用文字传递他人无法言说的情感。</p>
              </div>
              <div class="detail-block">
                <h4>成长</h4>
                <p>从抗拒到接纳，从模仿到找到自己的风格。代笔不是机械地写字，而是用心感受委托人的情感，找到最合适的文字和表达方式。</p>
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
            <h3 class="character-name">市之谷版（上代）</h3>
            <span class="character-role">前代笔人</span>
          </div>

          <div class="character-preview">
            <p>鸠子的祖母，严厉的代笔大师</p>
          </div>

          <transition name="expand">
            <div v-if="expandedCharacter === 1" class="character-details">
              <div class="detail-block">
                <h4>性格</h4>
                <p>严谨、固执、追求完美。对代笔艺术有近乎苛刻的要求</p>
              </div>
              <div class="detail-block">
                <h4>故事</h4>
                <p>收养并抚养鸠子，从小严格训练她代笔技艺。看似无情，实则用心良苦。去世前留下11封委托信，让鸠子继承她的遗志。</p>
              </div>
              <div class="detail-block">
                <h4>传承</h4>
                <p>"代笔人不是为了炫耀自己的字，而是要让委托人的心意准确传达。"她用一生诠释了这句话。</p>
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
            <h3 class="character-name">芭芭拉夫人</h3>
            <span class="character-role">邻居</span>
          </div>

          <div class="character-preview">
            <p>意大利裔邻居，温暖的陪伴者</p>
          </div>

          <transition name="expand">
            <div v-if="expandedCharacter === 2" class="character-details">
              <div class="detail-block">
                <h4>性格</h4>
                <p>开朗、善良，像家人一样关心鸠子</p>
              </div>
              <div class="detail-block">
                <h4>故事</h4>
                <p>住在隔壁的意大利人。在鸠子最孤独的时候给予温暖，是鸠子重要的精神支柱。教会鸠子人与人之间的温情比完美的字更重要。</p>
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
            <h3 class="character-name">QP妹妹</h3>
            <span class="character-role">邻家小女孩</span>
          </div>

          <div class="character-preview">
            <p>天真可爱，给鸠子带来欢笑</p>
          </div>

          <transition name="expand">
            <div v-if="expandedCharacter === 3" class="character-details">
              <div class="detail-block">
                <h4>性格</h4>
                <p>纯真、善良，像小太阳一样照亮鸠子的生活</p>
              </div>
              <div class="detail-block">
                <h4>故事</h4>
                <p>经常来文具店玩的小女孩。与鸠子建立深厚的感情，让她感受到被需要的幸福。孩子的真诚教会鸠子代笔的本质是用心。</p>
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

    <!-- Section 02: Commissions by Season -->
    <section class="section-commissions">
      <div class="section-header swiss-border-bottom">
        <p class="section-number" data-number="02">COMMISSIONS</p>
        <h2 class="section-title">依頼書簡</h2>
        <p class="section-subtitle">四季の手紙</p>
      </div>

      <div class="seasons-timeline">
        <!-- Spring -->
        <div class="season-block">
          <div class="season-header">
            <span class="season-icon">🌸</span>
            <h3 class="season-title">春</h3>
            <span class="season-name">SPRING</span>
          </div>

          <div class="commissions-list">
            <article
              class="commission-card swiss-border"
              :class="{ expanded: expandedCommission === 0 }"
              @click="toggleCommission(0)"
            >
              <div class="commission-header">
                <h4 class="commission-title">拒绝买花的信</h4>
                <span class="commission-client">委托人：蜜子</span>
              </div>

              <div class="commission-preview">
                <p>温柔而坚定地拒绝每周送花的男子</p>
              </div>

              <transition name="expand">
                <div v-if="expandedCommission === 0" class="commission-details">
                  <div class="commission-story">
                    <h4>故事</h4>
                    <p>一位女士每周收到匿名送来的花，感到困扰。她不想直接伤害对方，希望通过委婉的方式拒绝。</p>
                  </div>
                  <div class="commission-solution">
                    <h4>代笔方案</h4>
                    <p>鸠子写了一封温暖而坚定的信。既感谢对方的心意，又明确表达希望停止送花。不伤害对方的自尊，同时传达自己的真实想法。</p>
                  </div>
                  <div class="commission-insight">
                    <h4>代笔智慧</h4>
                    <p>"拒绝不是伤害，而是诚实的沟通。好的拒绝信，让对方理解并接受，同时保护彼此的尊严。"</p>
                  </div>
                </div>
              </transition>

              <div class="expand-hint">
                <span>{{ expandedCommission === 0 ? '收起' : '展开' }}</span>
                <span class="arrow">{{ expandedCommission === 0 ? '↑' : '↓' }}</span>
              </div>
            </article>

            <article
              class="commission-card swiss-border"
              :class="{ expanded: expandedCommission === 1 }"
              @click="toggleCommission(1)"
            >
              <div class="commission-header">
                <h4 class="commission-title">道歉信</h4>
                <span class="commission-client">委托人：清太郎</span>
              </div>

              <div class="commission-preview">
                <p>向初恋坦白当年的背叛</p>
              </div>

              <transition name="expand">
                <div v-if="expandedCommission === 1" class="commission-details">
                  <div class="commission-story">
                    <h4>故事</h4>
                    <p>一位老人年轻时背叛了初恋，几十年一直心怀愧疚。他想在生命尽头向初恋道歉，但又怕打扰她的生活。</p>
                  </div>
                  <div class="commission-solution">
                    <h4>代笔方案</h4>
                    <p>鸠子用质朴而真诚的语言，表达迟到的歉意。不过分辩解，坦承错误，同时传达几十年来的愧疚与祝福。</p>
                  </div>
                  <div class="commission-insight">
                    <h4>代笔智慧</h4>
                    <p>"道歉不是为了得到原谅，而是为了释放自己。真正的道歉，不需要华丽的词藻，只需要一颗真诚的心。"</p>
                  </div>
                </div>
              </transition>

              <div class="expand-hint">
                <span>{{ expandedCommission === 1 ? '收起' : '展开' }}</span>
                <span class="arrow">{{ expandedCommission === 1 ? '↑' : '↓' }}</span>
              </div>
            </article>
          </div>
        </div>

        <!-- Summer -->
        <div class="season-block">
          <div class="season-header">
            <span class="season-icon">🍃</span>
            <h3 class="season-title">夏</h3>
            <span class="season-name">SUMMER</span>
          </div>

          <div class="commissions-list">
            <article
              class="commission-card swiss-border"
              :class="{ expanded: expandedCommission === 2 }"
              @click="toggleCommission(2)"
            >
              <div class="commission-header">
                <h4 class="commission-title">问候卡</h4>
                <span class="commission-client">委托人：笔冢</span>
              </div>

              <div class="commission-preview">
                <p>给独居老人的暖心问候</p>
              </div>

              <transition name="expand">
                <div v-if="expandedCommission === 2" class="commission-details">
                  <div class="commission-story">
                    <h4>故事</h4>
                    <p>一位独居老人想给远方的朋友写信，但眼睛不好，手也抖。他希望有人能代笔传达他的思念。</p>
                  </div>
                  <div class="commission-solution">
                    <h4>代笔方案</h4>
                    <p>鸠子用老人熟悉的口吻，写下对朋友的问候。字迹工整而温暖，内容质朴真挚。老人读信时感动落泪。</p>
                  </div>
                  <div class="commission-insight">
                    <h4>代笔智慧</h4>
                    <p>"代笔人不仅是写字的人，更是情感的桥梁。我们要成为委托人的声音，说出他们想说却说不出的话。"</p>
                  </div>
                </div>
              </transition>

              <div class="expand-hint">
                <span>{{ expandedCommission === 2 ? '收起' : '展开' }}</span>
                <span class="arrow">{{ expandedCommission === 2 ? '↑' : '↓' }}</span>
              </div>
            </article>

            <article
              class="commission-card swiss-border"
              :class="{ expanded: expandedCommission === 3 }"
              @click="toggleCommission(3)"
            >
              <div class="commission-header">
                <h4 class="commission-title">出柜信</h4>
                <span class="commission-client">委托人：芳明</span>
              </div>

              <div class="commission-preview">
                <p>向父母坦白性取向的艰难决定</p>
              </div>

              <transition name="expand">
                <div v-if="expandedCommission === 3" class="commission-details">
                  <div class="commission-story">
                    <h4>故事</h4>
                    <p>一位男同性恋者想向父母出柜，但不知如何开口。他希望用文字的方式，温和地告诉父母真相。</p>
                  </div>
                  <div class="commission-solution">
                    <h4>代笔方案</h4>
                    <p>鸠子写了一封充满爱意的信。不是告解，而是分享。告诉父母"我还是你们的孩子，只是爱的方式不同"。</p>
                  </div>
                  <div class="commission-insight">
                    <h4>代笔智慧</h4>
                    <p>"最勇敢的文字，是用爱说出真相。代笔人的责任，是让委托人找回说出真实自我的勇气。"</p>
                  </div>
                </div>
              </transition>

              <div class="expand-hint">
                <span>{{ expandedCommission === 3 ? '收起' : '展开' }}</span>
                <span class="arrow">{{ expandedCommission === 3 ? '↑' : '↓' }}</span>
              </div>
            </article>
          </div>
        </div>

        <!-- Autumn -->
        <div class="season-block">
          <div class="season-header">
            <span class="season-icon">🍂</span>
            <h3 class="season-title">秋</h3>
            <span class="season-name">AUTUMN</span>
          </div>

          <div class="commissions-list">
            <article
              class="commission-card swiss-border"
              :class="{ expanded: expandedCommission === 4 }"
              @click="toggleCommission(4)"
            >
              <div class="commission-header">
                <h4 class="commission-title">离婚告知书</h4>
                <span class="commission-client">委托人：莉莉小姐</span>
              </div>

              <div class="commission-preview">
                <p>坦率而体面地告知亲友离婚</p>
              </div>

              <transition name="expand">
                <div v-if="expandedCommission === 4" class="commission-details">
                  <div class="commission-story">
                    <h4>故事</h4>
                    <p>一位女士决定离婚，她希望用体面的方式告知亲友，不抱怨、不指责，平静地宣布新的开始。</p>
                  </div>
                  <div class="commission-solution">
                    <h4>代笔方案</h4>
                    <p>鸠子写了一封简洁而有力的信。不指责对方，不寻求同情，只是平静地告知"我们决定各自追求幸福"。</p>
                  </div>
                  <div class="commission-insight">
                    <h4>代笔智慧</h4>
                    <p>"离婚不是失败，而是重新开始。好的告知信，既保护自己，也尊重对方。体面是最体面的告别。"</p>
                  </div>
                </div>
              </transition>

              <div class="expand-hint">
                <span>{{ expandedCommission === 4 ? '收起' : '展开' }}</span>
                <span class="arrow">{{ expandedCommission === 4 ? '↑' : '↓' }}</span>
              </div>
            </article>

            <article
              class="commission-card swiss-border"
              :class="{ expanded: expandedCommission === 5 }"
              @click="toggleCommission(5)"
            >
              <div class="commission-header">
                <h4 class="commission-title">给宠物的吊唁信</h4>
                <span class="commission-client">委托人：男爵</span>
              </div>

              <div class="commission-preview">
                <p>为失去爱犬的主人表达哀思</p>
              </div>

              <transition name="expand">
                <div v-if="expandedCommission === 5" class="commission-details">
                  <div class="commission-story">
                    <h4>故事</h4>
                    <p>一位贵族失去了相伴多年的爱犬。他想为爱犬写一封吊唁信，表达对它的感谢和思念。</p>
                  </div>
                  <div class="commission-solution">
                    <h4>代笔方案</h4>
                    <p>鸠子用贵族的口吻，写下了对爱犬的告别。不掩饰悲伤，但更多是感谢它多年的陪伴与忠诚。</p>
                  </div>
                  <div class="commission-insight">
                    <h4>代笔智慧</h4>
                    <p>"对宠物的爱，是人间最纯粹的情感。代笔人的使命，是让这种爱被认真对待，被温柔纪念。"</p>
                  </div>
                </div>
              </transition>

              <div class="expand-hint">
                <span>{{ expandedCommission === 5 ? '收起' : '展开' }}</span>
                <span class="arrow">{{ expandedCommission === 5 ? '↑' : '↓' }}</span>
              </div>
            </article>
          </div>
        </div>

        <!-- Winter -->
        <div class="season-block">
          <div class="season-header">
            <span class="season-icon">❄️</span>
            <h3 class="season-title">冬</h3>
            <span class="season-name">WINTER</span>
          </div>

          <div class="commissions-list">
            <article
              class="commission-card swiss-border"
              :class="{ expanded: expandedCommission === 6 }"
              @click="toggleCommission(6)"
            >
              <div class="commission-header">
                <h4 class="commission-title">母亲的结婚祝贺</h4>
                <span class="commission-client">委托人：满里子</span>
              </div>

              <div class="commission-preview">
                <p>母亲出嫁前留下的最后祝福</p>
              </div>

              <transition name="expand">
                <div v-if="expandedCommission === 6" class="commission-details">
                  <div class="commission-story">
                    <h4>故事</h4>
                    <p>一位母亲在临终前，为女儿的将来写下结婚贺词。她知道自己无法参加女儿婚礼，希望用文字传递祝福。</p>
                  </div>
                  <div class="commission-solution">
                    <h4>代笔方案</h4>
                    <p>鸠子替这位母亲写下了一封充满母爱的信。既有对女儿的不舍，也有对她未来的祝福。女儿在婚礼上收到信，泪流满面。</p>
                  </div>
                  <div class="commission-insight">
                    <h4>代笔智慧</h4>
                    <p>"有些爱，超越了生死。代笔人的责任，是让这种爱继续传递，让逝者的话语温暖生者。"</p>
                  </div>
                </div>
              </transition>

              <div class="expand-hint">
                <span>{{ expandedCommission === 6 ? '收起' : '展开' }}</span>
                <span class="arrow">{{ expandedCommission === 6 ? '↑' : '↓' }}</span>
              </div>
            </article>

            <article
              class="commission-card swiss-border"
              :class="{ expanded: expandedCommission === 7 }"
              @click="toggleCommission(7)"
            >
              <div class="commission-header">
                <h4 class="commission-title">新年问候</h4>
                <span class="commission-client">委托人：柚香</span>
              </div>

              <div class="commission-preview">
                <p>传统日式新年贺卡的温暖</p>
              </div>

              <transition name="expand">
                <div v-if="expandedCommission === 7" class="commission-details">
                  <div class="commission-story">
                    <h4>故事</h4>
                    <p>一位年轻女性想用传统的方式给重要的人送上新年祝福，但自己不会写优美的日式贺词。</p>
                  </div>
                  <div class="commission-solution">
                    <h4>代笔方案</h4>
                    <p>鸠子用传统日式贺卡的形式，写下了优美的年贺状。既保留传统礼仪，又融入现代温情。收信人感受到久违的郑重与温暖。</p>
                  </div>
                  <div class="commission-insight">
                    <h4>代笔智慧</h4>
                    <p>"传统不是守旧，而是对美好的传承。代笔人要守护的，不仅是文字，更是仪式感和文化记忆。"</p>
                  </div>
                </div>
              </transition>

              <div class="expand-hint">
                <span>{{ expandedCommission === 7 ? '收起' : '展开' }}</span>
                <span class="arrow">{{ expandedCommission === 7 ? '↑' : '↓' }}</span>
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
        <p class="section-subtitle">文字の温度</p>
      </div>

      <div class="themes-grid">
        <!-- Theme 1 -->
        <article
          class="theme-card swiss-border"
          :class="{ expanded: expandedTheme === 0 }"
          @click="toggleTheme(0)"
        >
          <div class="theme-header">
            <h3 class="theme-title">文字有温度</h3>
            <div class="theme-icon">✒️</div>
          </div>
          <div class="theme-preview">
            <p>字是有温度的</p>
          </div>

          <transition name="expand">
            <div v-if="expandedTheme === 0" class="theme-details">
              <p>"字是有温度的。"鸠子在书中多次重复这句话。每个字、每句话，都承载着书写者的情感。代笔人要做的，就是让这种温度准确传达。</p>
              <p>选择什么字体、什么纸笔、什么措辞，都会影响文字的温度。代笔人不仅要会写字，更要会感受。</p>
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
            <h3 class="theme-title">替人说出心里话</h3>
            <div class="theme-icon">💌</div>
          </div>
          <div class="theme-preview">
            <p>代笔人的使命</p>
          </div>

          <transition name="expand">
            <div v-if="expandedTheme === 1" class="theme-details">
              <p>很多人心中有话，却说不出口。或是害羞，或是恐惧，或是找不到合适的词。代笔人就是替这些人说出心里话的人。</p>
              <p>不是鹦鹉学舌，而是深入理解委托人的情感，找到最贴切的文字。代笔是翻译，翻译人心。</p>
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
            <h3 class="theme-title">镰仓四季美学</h3>
            <div class="theme-icon">🌸</div>
          </div>
          <div class="theme-preview">
            <p>季节流转与人生</p>
          </div>

          <transition name="expand">
            <div v-if="expandedTheme === 2" class="theme-details">
              <p>镰仓的四季，是故事的背景，也是情感的隐喻。春的拒绝与道歉，夏的问候与坦白，秋的离别与哀思，冬的祝福与期待。</p>
              <p>人生如四季，有花开也有花落。代笔人在季节流转中，见证人生的各种情感，用文字守护这些瞬间。</p>
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
            <h3 class="theme-title">传承与和解</h3>
            <div class="theme-icon">🕊️</div>
          </div>
          <div class="theme-preview">
            <p>与祖母的和解</p>
          </div>

          <transition name="expand">
            <div v-if="expandedTheme === 3" class="theme-details">
              <p>鸠子与祖母的关系，从抗拒到理解，从对立到和解。上代看似严厉，实则用心良苦；她留下的11封委托信，是给鸠子最好的礼物。</p>
              <p>代笔技艺的传承，不仅是技术的传递，更是精神的延续。鸠子最终理解了祖母的爱，也找到了自己的代笔之路。</p>
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
            "字是有温度的。"
          </blockquote>
          <div class="quote-divider"></div>
          <div class="quote-source">—— 小川鸠子</div>
        </article>

        <article class="quote-card swiss-border">
          <div class="quote-spine"></div>
          <blockquote class="quote-text">
            "代笔人，就是替别人把心里话写出来的人。不是为了炫耀自己的字，而是要让委托人的心意准确传达。"
          </blockquote>
          <div class="quote-divider"></div>
          <div class="quote-source">—— 上代</div>
        </article>

        <article class="quote-card swiss-border">
          <div class="quote-spine"></div>
          <blockquote class="quote-text">
            "镰仓是个适合写信的好地方。这里有山有海，有古老的街道，有四季分明的美景。在这样的地方写下的信，会带着镰仓的温柔。"
          </blockquote>
          <div class="quote-divider"></div>
          <div class="quote-source">—— 鸠子</div>
        </article>

        <article class="quote-card swiss-border">
          <div class="quote-spine"></div>
          <blockquote class="quote-text">
            "有些人心中有话，却说不出口。代笔人就是替这些人说出心里话的人。"
          </blockquote>
          <div class="quote-divider"></div>
          <div class="quote-source">—— 鸠子</div>
        </article>

        <article class="quote-card swiss-border">
          <div class="quote-spine"></div>
          <blockquote class="quote-text">
            "代笔不是机械地写字，而是用心感受委托人的情感，找到最合适的文字和表达方式。"
          </blockquote>
          <div class="quote-divider"></div>
          <div class="quote-source">—— 鸠子</div>
        </article>

        <article class="quote-card swiss-border">
          <div class="quote-spine"></div>
          <blockquote class="quote-text">
            "文字的力量，在于它能超越时空，传递爱与温暖。代笔人的使命，就是守护这份力量。"
          </blockquote>
          <div class="quote-divider"></div>
          <div class="quote-source">—— 上代</div>
        </article>
      </div>
    </section>

    <!-- Footer -->
    <footer class="book-footer swiss-border-top">
      <div class="footer-content">
        <div class="footer-left">
          <span class="footer-label">ARCHIVED</span>
          <span class="footer-date">2017</span>
        </div>
        <div class="footer-right">
          <span class="footer-message">鎌倉で丁寧に生きる</span>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useScrollToTop } from '@/composables/useScrollToTop'

const router = useRouter()
// 进入书籍页面时滚动到顶部
useScrollToTop()

const expandedCharacter = ref(null)
const expandedCommission = ref(null)
const expandedTheme = ref(null)

const exitWorld = () => {
  router.push('/yearbook/fiction')
}

const toggleCharacter = (index) => {
  if (expandedCharacter.value === index) {
    expandedCharacter.value = null
  } else {
    expandedCharacter.value = index
    expandedCommission.value = null
    expandedTheme.value = null
  }
}

const toggleCommission = (index) => {
  if (expandedCommission.value === index) {
    expandedCommission.value = null
  } else {
    expandedCommission.value = index
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
    expandedCommission.value = null
  }
}
</script>

<style scoped>
.camellia-shop-world {
  min-height: 100vh;
  background-color: #fdf2f4;
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
  background-color: #c94a6a;
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
  color: #c94a6a;
}

.exit-icon {
  font-size: 1.5rem;
  line-height: 1;
}

/* Header */
.book-header {
  padding: 6rem 2rem 4rem;
  background-color: #c94a6a;
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
  display: flex;
  justify-content: center;
  gap: 2rem;
}

.season-icon,
.pen-icon {
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
  color: #c94a6a;
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
  transition: background-color 0.15s ease-out, border-color 0.15s ease-out;
  display: flex;
  flex-direction: column;
}

.character-card:hover:not(.expanded) {
  /* 移除上浮效果 - 克制感 */
  /* transform: translateY(-4px); */
  /* 移除阴影动画 - 克制感 */
  border-color: #c94a6a;
}

.character-card.expanded {
  background-color: #fdf2f4;
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
  font-weight: 900;
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  padding: 0.25rem 0.75rem;
  background-color: #c94a6a;
  color: #fff;
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
  color: #c94a6a;
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
  color: #c94a6a;
}

/* Commissions */
.seasons-timeline {
  max-width: 1200px;
  margin: 0 auto;
}

.season-block {
  margin-bottom: 4rem;
}

.season-block:last-child {
  margin-bottom: 0;
}

.season-header {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background-color: #fff;
  border: 3px solid #1a1a1a;
}

.season-icon {
  font-size: 2.5rem;
}

.season-title {
  font-family: 'Inter', sans-serif;
  font-weight: 900;
  font-size: 2rem;
  margin: 0;
  flex: 1;
}

.season-name {
  font-family: 'Inter', sans-serif;
  font-weight: 900;
  font-size: 0.875rem;
  letter-spacing: 0.15em;
  color: #c94a6a;
}

.commissions-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

.commission-card {
  background-color: #fff;
  padding: 2rem;
  cursor: pointer;
  transition: background-color 0.15s ease-out, border-color 0.15s ease-out;
}

.commission-card:hover:not(.expanded) {
  transform: translateX(8px);
  /* 移除阴影动画 - 克制感 */
  border-color: #c94a6a;
}

.commission-card.expanded {
  background-color: #fdf2f4;
  cursor: default;
  transform: none;
}

.commission-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  gap: 1rem;
}

.commission-title {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 1.125rem;
  margin: 0;
}

.commission-client {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  color: #666;
}

.commission-preview {
  margin-bottom: 1rem;
}

.commission-preview p {
  font-size: 0.9375rem;
  line-height: 1.6;
  margin: 0;
}

.commission-details {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 2px solid rgba(0, 0, 0, 0.1);
}

.commission-story,
.commission-solution,
.commission-insight {
  margin-bottom: 1.5rem;
}

.commission-story h4,
.commission-solution h4,
.commission-insight h4 {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #c94a6a;
  margin: 0 0 0.75rem 0;
}

.commission-story p,
.commission-solution p,
.commission-insight p {
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
  transition: background-color 0.15s ease-out, border-color 0.15s ease-out;
}

.theme-card:hover:not(.expanded) {
  /* 移除上浮效果 - 克制感 */
  /* transform: translateY(-4px); */
  /* 移除阴影动画 - 克制感 */
  border-color: #c94a6a;
}

.theme-card.expanded {
  background-color: #fdf2f4;
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
  background-color: #c94a6a;
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
  color: #c94a6a;
  padding-left: 1rem;
  margin: auto 0 0 0;
}

/* Footer */
.book-footer {
  padding: 2rem;
  background-color: #1a1a1a;
  color: #c94a6a;
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
  transition: background-color 0.15s ease-out, border-color 0.15s ease-out;
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

  .commissions-list {
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

  .quotes-grid {
    grid-template-columns: 1fr;
  }

  .season-header {
    flex-direction: column;
    text-align: center;
  }

  .footer-content {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
}
</style>

<template>
  <div class="litchi-road-world">
    <!-- EXIT button -->
    <button class="exit-button" @click="exitWorld">
      <span class="exit-icon">×</span>
      <span class="exit-text">EXIT</span>
    </button>

    <!-- Header Section -->
    <header class="book-header">
      <div class="header-top">
        <span class="volume-label">VOL.028</span>
        <span class="category-label">FICTION</span>
      </div>
      <h1 class="book-title">长安的荔枝</h1>
      <p class="book-subtitle">The Litchi Road</p>
      <p class="book-author">马伯庸 · 2022</p>
      <div class="header-decoration">
        <div class="litchi-emoji">🔴</div>
        <div class="distance-text">5400里</div>
        <div class="days-text">11天</div>
      </div>
    </header>

    <!-- Section 01: Characters -->
    <section class="section-characters">
      <div class="section-header swiss-border-bottom">
        <p class="section-number" data-number="01">CHARACTERS</p>
        <h2 class="section-title">人物</h2>
        <p class="section-subtitle">职场与人性</p>
      </div>

      <div class="characters-grid">
        <!-- Character 1 -->
        <article
          class="character-card swiss-border"
          :class="{ expanded: expandedCharacter === 0 }"
          @click="toggleCharacter(0)"
        >
          <div class="character-header">
            <h3 class="character-name">李善德</h3>
            <span class="character-role">从老实人到觉醒者</span>
          </div>

          <div class="character-preview">
            <p>九品小官，被上司坑成"荔枝使"</p>
          </div>

          <transition name="expand">
            <div v-if="expandedCharacter === 0" class="character-details">
              <div class="detail-block">
                <h4>性格</h4>
                <p>老实、认真、算账出身的小官。被同事设计接下不可能完成的任务，从绝望到拼死一搏。</p>
              </div>
              <div class="detail-block">
                <h4>故事</h4>
                <p>五十二岁，刚在长安买房背了巨额房贷。被上司和同事联手坑骗，成为"荔枝使"。要在11天内把岭南荔枝运到长安，失败即死。</p>
              </div>
              <div class="detail-block">
                <h4>成长</h4>
                <p>从唯唯诺诺到敢于反抗权贵，从体制内的螺丝钉到看清官场本质。最终拼尽全力完成不可能的任务，却也付出了巨大代价。</p>
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
            <h3 class="character-name">杨国忠</h3>
            <span class="character-role">权相</span>
          </div>

          <div class="character-preview">
            <p>一人之下，万人之上</p>
          </div>

          <transition name="expand">
            <div v-if="expandedCharacter === 1" class="character-details">
              <div class="detail-block">
                <h4>性格</h4>
                <p>权力欲极强，为了讨好贵妃不惜任何代价。把下属当工具用。</p>
              </div>
              <div class="detail-block">
                <h4>故事</h4>
                <p>当李善德完成任务去邀功时，他说："你只是完成了分内之事。"没有赏赐，只有新的要求。</p>
              </div>
              <div class="detail-block">
                <h4>象征</h4>
                <p>代表体制的冷酷与不公。下属拼命，功劳归上司；失败，下属背锅。典型的职场PUA。</p>
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
            <h3 class="character-name">韩十四</h3>
            <span class="character-role">生死之交</span>
          </div>

          <div class="character-preview">
            <p>船夫，李善德唯一的朋友</p>
          </div>

          <transition name="expand">
            <div v-if="expandedCharacter === 2" class="character-details">
              <div class="detail-block">
                <h4>性格</h4>
                <p>豪爽、讲义气，江湖中人</p>
              </div>
              <div class="detail-block">
                <h4>故事</h4>
                <p>在李善德最绝望时伸出援手。护送他到岭南，在生死关头用命相搏。是李善德在官场中唯一的真诚朋友。</p>
              </div>
              <div class="detail-block">
                <h4>象征</h4>
                <p>代表江湖义气与官场虚伪的对比。李善德在最黑暗时刻遇到的光。</p>
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
            <h3 class="character-name">苏谅</h3>
            <span class="character-role">胡商</span>
          </div>

          <div class="character-preview">
            <p>利益捆绑的合作伙伴</p>
          </div>

          <transition name="expand">
            <div v-if="expandedCharacter === 3" class="character-details">
              <div class="detail-block">
                <h4>性格</h4>
                <p>精明、讲契约精神，胡商的代表</p>
              </div>
              <div class="detail-block">
                <h4>故事</h4>
                <p>提供资金和物流支持，条件是获得荔枝转运的专营权。与李善德是纯粹的利益关系，但也讲诚信。</p>
              </div>
              <div class="detail-block">
                <h4>象征</h4>
                <p>代表商业逻辑与官场逻辑的对比。商人逐利但讲契约，官员谋私但背信弃义。</p>
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
            <h3 class="character-name">阿奴</h3>
            <span class="character-role">荔枝园主</span>
          </div>

          <div class="character-preview">
            <p>提供技术支持</p>
          </div>

          <transition name="expand">
            <div v-if="expandedCharacter === 4" class="character-details">
              <div class="detail-block">
                <h4>性格</h4>
                <p>朴实、善良的岭南人</p>
              </div>
              <div class="detail-block">
                <h4>故事</h4>
                <p>传授荔枝保鲜的秘诀，也是唯一真心为李善德着想的人。她的荔枝园因为转运工程被毁。</p>
              </div>
              <div class="detail-block">
                <h4>象征</h4>
                <p>代表被权力践踏的普通人。京城权贵的一口荔枝，是南方百姓的生计毁灭。</p>
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
            <h3 class="character-name">妻女</h3>
            <span class="character-role">拼命的理由</span>
          </div>

          <div class="character-preview">
            <p>李善德身后唯一的牵挂</p>
          </div>

          <transition name="expand">
            <div v-if="expandedCharacter === 5" class="character-details">
              <div class="detail-block">
                <h4>故事</h4>
                <p>李善德五十二岁才在长安买房，背了巨额房贷。如果任务失败，她们将无家可归。这是李善德拼死一搏的最大动力。</p>
              </div>
              <div class="detail-block">
                <h4>象征</h4>
                <p>代表中年小人物的无奈与担当。为了家人，再不可能的任务也要咬牙完成。</p>
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

    <!-- Section 02: Logistics Plan -->
    <section class="section-logistics">
      <div class="section-header swiss-border-bottom">
        <p class="section-number" data-number="02">LOGISTICS</p>
        <h2 class="section-title">物流方案</h2>
        <p class="section-subtitle">不可能的任务</p>
      </div>

      <div class="mission-overview">
        <div class="mission-card swiss-border">
          <h3 class="mission-title">任务目标</h3>
          <div class="mission-stats">
            <div class="stat">
              <span class="stat-value">5400</span>
              <span class="stat-label">里距离</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat">
              <span class="stat-value">3</span>
              <span class="stat-label">天保质期</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat">
              <span class="stat-value">11</span>
              <span class="stat-label">天限期</span>
            </div>
          </div>
          <div class="mission-impossible">
            <span class="impossible-badge">IMPOSSIBLE</span>
          </div>
        </div>
      </div>

      <div class="problems-solutions">
        <!-- Problem 1 -->
        <article
          class="solution-card swiss-border"
          :class="{ expanded: expandedSolution === 0 }"
          @click="toggleSolution(0)"
        >
          <div class="problem-header">
            <h3 class="problem-title">问题一：如何保鲜？</h3>
            <div class="problem-difficulty">难度 ★★★★★</div>
          </div>

          <div class="problem-preview">
            <p>荔枝摘下后3天腐烂，传统方法根本不行</p>
          </div>

          <transition name="expand">
            <div v-if="expandedSolution === 0" class="solution-details">
              <div class="traditional-method">
                <h4>传统方法 ❌</h4>
                <p>连枝采摘，用竹筒密封</p>
                <p class="method-result">保存期：3天</p>
              </div>

              <div class="arrow-down">↓</div>

              <div class="innovations">
                <h4>创新方案 ✅</h4>
                <div class="innovation-list">
                  <div class="innovation-item">
                    <span class="innovation-number">1</span>
                    <div class="innovation-content">
                      <h5>双层瓮密封</h5>
                      <p>内瓮装荔枝，外瓮装冰块，隔绝空气</p>
                    </div>
                  </div>
                  <div class="innovation-item">
                    <span class="innovation-number">2</span>
                    <div class="innovation-content">
                      <h5>换气系统</h5>
                      <p>定期打开换气，排出二氧化碳，注入新鲜空气</p>
                    </div>
                  </div>
                  <div class="innovation-item">
                    <span class="innovation-number">3</span>
                    <div class="innovation-content">
                      <h5>连枝采摘</h5>
                      <p>保留一段枝条，延长荔枝生命力</p>
                    </div>
                  </div>
                </div>
                <p class="method-result success">保存期：10-11天</p>
              </div>

              <div class="solution-insight">
                <h4>关键洞察</h4>
                <p>荔枝腐烂的不是果实本身，而是"呼吸"。控制温度、隔绝氧气、定期换气，三管齐下。</p>
              </div>
            </div>
          </transition>

          <div class="expand-hint">
            <span>{{ expandedSolution === 0 ? '收起' : '展开' }}</span>
            <span class="arrow">{{ expandedSolution === 0 ? '↑' : '↓' }}</span>
          </div>
        </article>

        <!-- Problem 2 -->
        <article
          class="solution-card swiss-border"
          :class="{ expanded: expandedSolution === 1 }"
          @click="toggleSolution(1)"
        >
          <div class="problem-header">
            <h3 class="problem-title">问题二：如何加速？</h3>
            <div class="problem-difficulty">难度 ★★★★☆</div>
          </div>

          <div class="problem-preview">
            <p>传统路线需要30天，必须缩短到11天以内</p>
          </div>

          <transition name="expand">
            <div v-if="expandedSolution === 1" class="solution-details">
              <div class="traditional-method">
                <h4>传统路线 ❌</h4>
                <p>岭南 → 梅关 → 赣江 → 长江 → 汴河 → 黄河 → 长安</p>
                <p>距离：5400里 | 时间：30+天</p>
              </div>

              <div class="arrow-down">↓</div>

              <div class="innovations">
                <h4>优化方案 ✅</h4>
                <div class="route-optimization">
                  <div class="route-step">
                    <span class="step-number">1</span>
                    <h5>改走漕运</h5>
                    <p>从赣江直接入长江，省去绕路</p>
                    <span class="step-saved">节省：2天</span>
                  </div>
                  <div class="route-step">
                    <span class="step-number">2</span>
                    <h5>山路捷径</h5>
                    <p>放弃梅关古道，走山路直插</p>
                    <span class="step-saved">节省：1天</span>
                  </div>
                  <div class="route-step">
                    <span class="step-number">3</span>
                    <h5>多路并进</h5>
                    <p>四路同时出发，分段转运</p>
                    <span class="step-saved">节省：3天</span>
                  </div>
                  <div class="route-step">
                    <span class="step-number">4</span>
                    <h5>接力换马</h5>
                    <p>20骑轮换，日行800里</p>
                    <span class="step-saved">节省：5天</span>
                  </div>
                </div>
                <p class="method-result success">最终距离：4600里 | 最终时间：10天</p>
              </div>

              <div class="solution-insight">
                <h4>关键洞察</h4>
                <p>单点优化不够，必须系统性重构。水路改漕运、陆路换山路、多路并行、接力转运，形成闭环。</p>
              </div>
            </div>
          </transition>

          <div class="expand-hint">
            <span>{{ expandedSolution === 1 ? '收起' : '展开' }}</span>
            <span class="arrow">{{ expandedSolution === 1 ? '↑' : '↓' }}</span>
          </div>
        </article>

        <!-- Problem 3 -->
        <article
          class="solution-card swiss-border"
          :class="{ expanded: expandedSolution === 2 }"
          @click="toggleSolution(2)"
        >
          <div class="problem-header">
            <h3 class="problem-title">问题三：如何统筹？</h3>
            <div class="problem-difficulty">难度 ★★★★☆</div>
          </div>

          <div class="problem-preview">
            <p>资源分散，各方利益纠葛，如何协调？</p>
          </div>

          <transition name="expand">
            <div v-if="expandedSolution === 2" class="solution-details">
              <div class="resource-grid">
                <div class="resource-item">
                  <h4>冰块</h4>
                  <p>从太常寺调取冰窖储备</p>
                  <p>沿途设补给点，每站换冰</p>
                  <span class="resource-status">✓ 解决</span>
                </div>
                <div class="resource-item">
                  <h4>马匹</h4>
                  <p>调用驿站马匹，20骑轮换</p>
                  <p>日行800里，极限速度</p>
                  <span class="resource-status">✓ 解决</span>
                </div>
                <div class="resource-item">
                  <h4>人力</h4>
                  <p>每30里设一站，换人换马</p>
                  <p>征调民夫，分段转运</p>
                  <span class="resource-status">✓ 解决</span>
                </div>
                <div class="resource-item">
                  <h4>资金</h4>
                  <p>胡商苏谅提供启动资金</p>
                  <p>以荔枝转运专营权交换</p>
                  <span class="resource-status">✓ 解决</span>
                </div>
              </div>

              <div class="system-design">
                <h4>系统设计</h4>
                <p>像精密钟表一样的物流系统：</p>
                <ul>
                  <li>四级转运站：起点→中转站→接力站→终点</li>
                  <li>并行四路：东南西北四路同时出发，确保成功</li>
                  <li>时间倒推：从长安 deadline 倒推，精确到时辰</li>
                  <li>应急预案：每路准备备用方案</li>
                </ul>
              </div>

              <div class="solution-insight">
                <h4>关键洞察</h4>
                <p>项目管理最重要的是系统性思维。每个环节都要有B计划，任何单点失败都不能导致全局崩盘。</p>
              </div>
            </div>
          </transition>

          <div class="expand-hint">
            <span>{{ expandedSolution === 2 ? '收起' : '展开' }}</span>
            <span class="arrow">{{ expandedSolution === 2 ? '↑' : '↓' }}</span>
          </div>
        </article>
      </div>
    </section>

    <!-- Section 03: Themes -->
    <section class="section-themes">
      <div class="section-header swiss-border-bottom">
        <p class="section-number" data-number="03">THEMES</p>
        <h2 class="section-title">主题</h2>
        <p class="section-subtitle">职场与体制</p>
      </div>

      <div class="themes-grid">
        <!-- Theme 1 -->
        <article
          class="theme-card swiss-border"
          :class="{ expanded: expandedTheme === 0 }"
          @click="toggleTheme(0)"
        >
          <div class="theme-header">
            <h3 class="theme-title">职场生存指南</h3>
            <div class="theme-icon">💼</div>
          </div>
          <div class="theme-preview">
            <p>如何不被上司坑死</p>
          </div>

          <transition name="expand">
            <div v-if="expandedTheme === 0" class="theme-details">
              <p>《长安的荔枝》本质上是一部职场生存指南。李善德被上司和同事联手坑骗，接下必死的任务。</p>
              <p>职场真相：功劳是上司的，黑锅是你的。同事不会帮你，只会落井下石。拼命完成任务，上司只会说"你只是完成了分内之事"。</p>
              <p>唯一的出路：要么忍，要么滚。李善德选择了第三条路——拼了命完成，然后看透本质，转身离开。</p>
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
            <h3 class="theme-title">体制的代价</h3>
            <div class="theme-icon">⚖️</div>
          </div>
          <div class="theme-preview">
            <p>为一口荔枝，耗尽多少人力物力</p>
          </div>

          <transition name="expand">
            <div v-if="expandedTheme === 1" class="theme-details">
              <p>"一骑红尘妃子笑，无人知是荔枝来。"这句诗背后，是无数人的血泪。</p>
              <p>为了贵妃的一口新鲜荔枝，需要：</p>
              <ul>
                <li>毁掉岭南百姓的荔枝园</li>
                <li>征调无数民夫日夜奔波</li>
                <li>跑死无数驿马</li>
                <li>耗费巨资建设转运系统</li>
              </ul>
              <p>权力的任性，代价由普通人承担。这是历史的荒诞，也是现实的写照。</p>
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
            <h3 class="theme-title">小人物的觉醒</h3>
            <div class="theme-icon">⚡</div>
          </div>
          <div class="theme-preview">
            <p>从顺从到反抗</p>
          </div>

          <transition name="expand">
            <div v-if="expandedTheme === 2" class="theme-details">
              <p>李善德一开始是典型的老实人：勤恳、听话、不惹事。被坑了也不敢反抗，只能拼命完成任务。</p>
              <p>但当任务完成，去邀功时被杨国忠一句"分内之事"打发了。那一刻他觉醒了：再努力也只是工具。</p>
              <p>他选择当面质问权贵，然后流放岭南。虽然失去了官职，但找回了尊严。这是小人物的绝地反击。</p>
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
            <h3 class="theme-title">历史的荒诞</h3>
            <div class="theme-icon">📜</div>
          </div>
          <div class="theme-preview">
            <p>现代职场的古代镜像</p>
          </div>

          <transition name="expand">
            <div v-if="expandedTheme === 3" class="theme-details">
              <p>马伯庸的高明之处，是用现代职场视角解读历史。李善德的故事，就是每个打工人的故事。</p>
              <p>买房背房贷、被上司坑、同事甩锅、拼命加班、功劳被抢...这些穿越千年依然上演的职场戏码。</p>
              <p>历史在变，人性不变。权力的游戏、职场的残酷、小人物的挣扎，从未改变。</p>
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
        <p class="section-subtitle">职场真相</p>
      </div>

      <div class="quotes-grid">
        <article class="quote-card swiss-border">
          <div class="quote-spine"></div>
          <blockquote class="quote-text">
            "就算失败，我也想知道，自己倒在距离终点多远的地方。"
          </blockquote>
          <div class="quote-divider"></div>
          <div class="quote-source">—— 李善德</div>
        </article>

        <article class="quote-card swiss-border">
          <div class="quote-spine"></div>
          <blockquote class="quote-text">
            "流程是弱者的借口，规矩是强者的工具。"
          </blockquote>
          <div class="quote-divider"></div>
          <div class="quote-source">—— 官场真理</div>
        </article>

        <article class="quote-card swiss-border">
          <div class="quote-spine"></div>
          <blockquote class="quote-text">
            "有些路，只能一个人走。有些事，只能一个人扛。"
          </blockquote>
          <div class="quote-divider"></div>
          <div class="quote-source">—— 李善德</div>
        </article>

        <article class="quote-card swiss-border">
          <div class="quote-spine"></div>
          <blockquote class="quote-text">
            "你只是完成了分内之事。"
          </blockquote>
          <div class="quote-divider"></div>
          <div class="quote-source">—— 杨国忠</div>
        </article>

        <article class="quote-card swiss-border">
          <div class="quote-spine"></div>
          <blockquote class="quote-text">
            "在官场，老实人就是用来牺牲的。"
          </blockquote>
          <div class="quote-divider"></div>
          <div class="quote-source">—— 职场潜规则</div>
        </article>

        <article class="quote-card swiss-border">
          <div class="quote-spine"></div>
          <blockquote class="quote-text">
            "拼命完成任务，不是为了得到赏赐，而是为了证明自己没有被打败。"
          </blockquote>
          <div class="quote-divider"></div>
          <div class="quote-source">—— 小人物的尊严</div>
        </article>
      </div>
    </section>

    <!-- Footer -->
    <footer class="book-footer swiss-border-top">
      <div class="footer-content">
        <div class="footer-left">
          <span class="footer-label">ARCHIVED</span>
          <span class="footer-date">2022</span>
        </div>
        <div class="footer-right">
          <span class="footer-message">职场人的血泪史</span>
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
const expandedSolution = ref(null)
const expandedTheme = ref(null)

const exitWorld = () => {
  router.push('/yearbook/fiction')
}

const toggleCharacter = (index) => {
  if (expandedCharacter.value === index) {
    expandedCharacter.value = null
  } else {
    expandedCharacter.value = index
    expandedSolution.value = null
    expandedTheme.value = null
  }
}

const toggleSolution = (index) => {
  if (expandedSolution.value === index) {
    expandedSolution.value = null
  } else {
    expandedSolution.value = index
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
    expandedSolution.value = null
  }
}
</script>

<style scoped>
.litchi-road-world {
  min-height: 100vh;
  background-color: #fff5f0;
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
  background-color: #c95a4a;
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
  color: #c95a4a;
}

.exit-icon {
  font-size: 1.5rem;
  line-height: 1;
}

/* Header */
.book-header {
  padding: 6rem 2rem 4rem;
  background-color: #c95a4a;
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
  justify-content: center;
  align-items: center;
  gap: 3rem;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
}

.litchi-emoji {
  font-size: 3rem;
}

.distance-text,
.days-text {
  font-size: 1.25rem;
  letter-spacing: 0.1em;
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
  color: #c95a4a;
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
  box-shadow: 0 8px 24px rgba(201, 90, 74, 0.3);
  border-color: #c95a4a;
}

.character-card.expanded {
  background-color: #fff5f0;
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
  color: #c95a4a;
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
  color: #c95a4a;
}

/* Mission Overview */
.mission-overview {
  max-width: 800px;
  margin: 0 auto 3rem;
}

.mission-card {
  background-color: #fff;
  padding: 3rem;
  text-align: center;
}

.mission-title {
  font-family: 'Inter', sans-serif;
  font-weight: 900;
  font-size: 1.5rem;
  margin: 0 0 2rem 0;
}

.mission-stats {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  margin-bottom: 2rem;
}

.stat {
  text-align: center;
}

.stat-value {
  display: block;
  font-family: 'Inter', sans-serif;
  font-weight: 900;
  font-size: 3rem;
  color: #c95a4a;
  line-height: 1;
}

.stat-label {
  display: block;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #666;
  margin-top: 0.5rem;
}

.stat-divider {
  width: 2px;
  height: 60px;
  background-color: rgba(0, 0, 0, 0.1);
}

.mission-impossible {
  margin-top: 2rem;
}

.impossible-badge {
  font-family: 'Inter', sans-serif;
  font-weight: 900;
  font-size: 0.875rem;
  letter-spacing: 0.2em;
  padding: 0.5rem 1.5rem;
  background-color: #c95a4a;
  color: #fff;
}

/* Solutions */
.problems-solutions {
  max-width: 1000px;
  margin: 0 auto;
  display: grid;
  gap: 2rem;
}

.solution-card {
  background-color: #fff;
  padding: 2rem;
  cursor: pointer;
  transition: all 0.3s ease-out;
}

.solution-card:hover:not(.expanded) {
  transform: translateX(8px);
  box-shadow: 0 8px 24px rgba(201, 90, 74, 0.3);
  border-color: #c95a4a;
}

.solution-card.expanded {
  background-color: #fff5f0;
  cursor: default;
  transform: none;
}

.problem-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.problem-title {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 1.25rem;
  margin: 0;
}

.problem-difficulty {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 0.75rem;
  color: #c95a4a;
}

.problem-preview p {
  font-size: 0.9375rem;
  line-height: 1.6;
  margin: 0;
}

.solution-details {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 2px solid rgba(0, 0, 0, 0.1);
}

.traditional-method {
  padding: 1.5rem;
  background-color: rgba(0, 0, 0, 0.03);
  border-radius: 4px;
  margin-bottom: 1rem;
}

.traditional-method h4 {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 0.875rem;
  margin: 0 0 0.75rem 0;
  color: #666;
}

.traditional-method p {
  font-size: 0.875rem;
  line-height: 1.6;
  margin: 0;
}

.method-result {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 0.875rem;
  margin-top: 0.75rem;
  color: #666;
}

.method-result.success {
  color: #c95a4a;
}

.arrow-down {
  text-align: center;
  font-size: 2rem;
  margin: 1rem 0;
  color: #c95a4a;
}

.innovations h4 {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 0.875rem;
  margin: 0 0 1rem 0;
  color: #c95a4a;
}

.innovation-list {
  margin-bottom: 1.5rem;
}

.innovation-item {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.innovation-number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background-color: #c95a4a;
  color: #fff;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 0.875rem;
  border-radius: 50%;
  flex-shrink: 0;
}

.innovation-content h5 {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 0.875rem;
  margin: 0 0 0.25rem 0;
}

.innovation-content p {
  font-size: 0.875rem;
  line-height: 1.6;
  margin: 0;
}

.route-optimization {
  display: grid;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.route-step {
  padding: 1rem;
  background-color: rgba(201, 90, 74, 0.05);
  border-left: 4px solid #c95a4a;
}

.step-number {
  display: inline-block;
  width: 24px;
  height: 24px;
  background-color: #c95a4a;
  color: #fff;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 0.75rem;
  text-align: center;
  line-height: 24px;
  border-radius: 50%;
  margin-right: 0.75rem;
}

.route-step h5 {
  display: inline;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 0.875rem;
  margin: 0;
}

.route-step p {
  font-size: 0.875rem;
  line-height: 1.6;
  margin: 0.5rem 0 0 0;
  padding-left: 1.75rem;
}

.step-saved {
  display: inline-block;
  margin-left: 0.5rem;
  padding: 0.25rem 0.75rem;
  background-color: #c95a4a;
  color: #fff;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 0.75rem;
  border-radius: 4px;
}

.resource-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.resource-item {
  padding: 1rem;
  background-color: rgba(201, 90, 74, 0.05);
  border: 2px solid rgba(201, 90, 74, 0.2);
}

.resource-item h4 {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 0.875rem;
  margin: 0 0 0.5rem 0;
}

.resource-item p {
  font-size: 0.875rem;
  line-height: 1.6;
  margin: 0;
}

.resource-status {
  display: inline-block;
  margin-top: 0.5rem;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 0.75rem;
  color: #c95a4a;
}

.system-design {
  padding: 1.5rem;
  background-color: rgba(201, 90, 74, 0.05);
  border-radius: 4px;
  margin-bottom: 1.5rem;
}

.system-design h4 {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 0.875rem;
  margin: 0 0 0.75rem 0;
}

.system-design p {
  font-size: 0.875rem;
  line-height: 1.6;
  margin: 0 0 0.75rem 0;
}

.system-design ul {
  margin: 0;
  padding-left: 1.5rem;
}

.system-design li {
  font-size: 0.875rem;
  line-height: 1.6;
  margin-bottom: 0.5rem;
}

.solution-insight {
  padding: 1rem;
  background-color: rgba(201, 90, 74, 0.1);
  border-left: 4px solid #c95a4a;
}

.solution-insight h4 {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #c95a4a;
  margin: 0 0 0.5rem 0;
}

.solution-insight p {
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
  box-shadow: 0 8px 24px rgba(201, 90, 74, 0.3);
  border-color: #c95a4a;
}

.theme-card.expanded {
  background-color: #fff5f0;
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

.theme-details ul {
  margin: 0.5rem 0;
  padding-left: 1.5rem;
}

.theme-details li {
  font-size: 0.875rem;
  line-height: 1.6;
  margin-bottom: 0.5rem;
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
  background-color: #c95a4a;
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
  color: #c95a4a;
  padding-left: 1rem;
  margin: auto 0 0 0;
}

/* Footer */
.book-footer {
  padding: 2rem;
  background-color: #1a1a1a;
  color: #c95a4a;
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
  .quotes-grid,
  .resource-grid {
    grid-template-columns: 1fr;
  }

  .mission-stats {
    flex-direction: column;
    gap: 1rem;
  }

  .stat-divider {
    width: 60px;
    height: 2px;
  }

  .footer-content {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
}
</style>

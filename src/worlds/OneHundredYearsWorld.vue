<template>
  <div class="one-hundred-years-world swiss-grid-pattern swiss-noise">
    <!-- EXIT button -->
    <button class="exit-btn swiss-hover-invert" @click="exitWorld">
      <span class="exit-arrow">←</span>
      EXIT
    </button>

    <!-- Header -->
    <header class="book-header swiss-border-bottom">
      <div class="header-content">
        <p class="book-vol">VOL.024</p>
        <h1 class="book-title">百年孤独</h1>
        <p class="book-subtitle">Cien Años de Soledad</p>
        <p class="book-author">加西亚·马尔克斯 · 1967</p>
      </div>
      <div class="header-meta">
        <p class="meta-label">CLASSIC</p>
        <p class="meta-years">MAGICAL REALISM</p>
      </div>
    </header>

    <!-- Section 01: ARCHETYPES -->
    <section class="section-archetypes swiss-border-bottom">
      <div class="section-header">
        <p class="section-number">SECTION 01</p>
        <h2 class="section-title">ARCHETYPES</h2>
        <p class="section-subtitle">Six Faces of Solitude</p>
      </div>

      <div class="archetypes-grid">
        <!-- Archetype 1: Founder -->
        <div
          class="archetype-card swiss-border swiss-hover-accent clickable"
          :class="{ expanded: expandedArchetype === 0 }"
          @click="toggleArchetype(0)"
        >
          <div class="archetype-number">01</div>
          <div class="archetype-info">
            <h3 class="archetype-name">创始人</h3>
            <p class="archetype-role">何塞·阿尔卡蒂奥·布恩迪亚</p>
            <p class="archetype-desc">第一代 · 疯狂的梦想家</p>
          </div>
          <div class="archetype-quote swiss-dots">
            "只要上帝<br/>还让我活着<br/>我就要发现<br/>世界的秘密"
          </div>
          <div class="archetype-details" v-if="expandedArchetype === 0">
            <div class="detail-section">
              <p class="detail-label">疯狂</p>
              <p class="detail-text">马孔多的创建者，沉迷于炼金术和发明。试图用磁铁提炼黄金，相信永动机的存在。最终被判定为疯了，被绑在栗树上度过余生。</p>
            </div>
            <div class="detail-section">
              <p class="detail-label">孤独</p>
              <p class="detail-text">他的孤独在于超前于时代。没人理解他的梦想和探索，连他的妻子乌尔苏拉也认为他疯了。他在栗树下与死者的幽灵对话。</p>
            </div>
            <div class="detail-section">
              <p class="detail-label">命运</p>
              <p class="detail-text">"家族的第一个人被绑在树上"。他开启了这个家族的孤独宿命，他的疯狂基因也传承给了后代。</p>
            </div>
          </div>
        </div>

        <!-- Archetype 2: Memory -->
        <div
          class="archetype-card swiss-border swiss-hover-accent clickable"
          :class="{ expanded: expandedArchetype === 1 }"
          @click="toggleArchetype(1)"
        >
          <div class="archetype-number">02</div>
          <div class="archetype-info">
            <h3 class="archetype-name">记忆</h3>
            <p class="archetype-role">乌尔苏拉·伊瓜兰</p>
            <p class="archetype-desc">家族支柱 · 活了120多岁</p>
          </div>
          <div class="archetype-quote swiss-dots">
            "只要我还活着<br/>这个疯人院<br/>就缺不了钱"
          </div>
          <div class="archetype-details" v-if="expandedArchetype === 1">
            <div class="detail-section">
              <p class="detail-label">坚守</p>
              <p class="detail-text">家族的真正支柱，活了120多岁。在丈夫疯了、儿子战死、孙子被杀后，她依然撑着整个家。她制作糖 animals，维持家族生计。</p>
            </div>
            <div class="detail-section">
              <p class="detail-label">见证</p>
              <p class="detail-text">她见证了马孔多的兴衰，从创建到繁荣再到消亡。她是唯一记得所有事情的人，是家族的记忆库。</p>
            </div>
            <div class="detail-section">
              <p class="detail-label">孤独</p>
              <p class="detail-text">她的孤独在于一个人扛下了所有。她是唯一清醒的人，看着这个家族一步步走向灭亡，却无能为力。</p>
            </div>
          </div>
        </div>

        <!-- Archetype 3: Power -->
        <div
          class="archetype-card swiss-border swiss-hover-accent clickable"
          :class="{ expanded: expandedArchetype === 2 }"
          @click="toggleArchetype(2)"
        >
          <div class="archetype-number">03</div>
          <div class="archetype-info">
            <h3 class="archetype-name">权力</h3>
            <p class="archetype-role">奥雷里亚诺·布恩迪亚上校</p>
            <p class="archetype-desc">第二代 · 发动32场起义</p>
          </div>
          <div class="archetype-quote swiss-dots">
            "我们打仗<br/>是为了自尊<br/>不是为了权力"
          </div>
          <div class="archetype-details" v-if="expandedArchetype === 2">
            <div class="detail-section">
              <p class="detail-label">战争</p>
              <p class="detail-text">发动了32场武装起义，全部失败。他成为传奇人物，却失去了所有的理想。战争的残酷让他彻底冷漠。</p>
            </div>
            <div class="detail-section">
              <p class="detail-label">循环</p>
              <p class="detail-text">晚年回到家中，每天制作小金鱼，然后融化，再重新制作。这个循环象征着战争和生命都毫无意义。</p>
            </div>
            <div class="detail-section">
              <p class="detail-label">孤独</p>
              <p class="detail-text">"他发动了32场起义，全部失败。他躲过了14次暗杀、73次埋伏。他最终在制作小金鱼的孤独中死去。"</p>
            </div>
          </div>
        </div>

        <!-- Archetype 4: Love -->
        <div
          class="archetype-card swiss-border swiss-hover-accent clickable"
          :class="{ expanded: expandedArchetype === 3 }"
          @click="toggleArchetype(3)"
        >
          <div class="archetype-number">04</div>
          <div class="archetype-info">
            <h3 class="archetype-name">爱情</h3>
            <p class="archetype-role">阿玛兰妲</p>
            <p class="archetype-desc">第三代 · 织了一辈子寿衣</p>
          </div>
          <div class="archetype-quote swiss-dots">
            "我唯一后悔的<br/>是不曾接受<br/>皮埃特罗的爱情"
          </div>
          <div class="archetype-details" v-if="expandedArchetype === 3">
            <div class="detail-section">
              <p class="detail-label">拒绝</p>
              <p class="detail-text">年轻时拒绝了意大利人皮埃特罗·克雷斯皮的爱情，也拒绝了赫里内勒多·马尔克斯的追求。她选择在孤独中老去。</p>
            </div>
            <div class="detail-section">
              <p class="detail-label">织寿衣</p>
              <p class="detail-text">晚年开始织自己的寿衣，织好了又拆掉，再重新织。这个循环象征着她在等待死亡，也在等待一生中错过的爱情。</p>
            </div>
            <div class="detail-section">
              <p class="detail-label">孤独</p>
              <p class="detail-text">她的孤独是主动选择的。她用冷漠和拒绝保护自己，最终在孤独中死去，连死亡都来得平静而缓慢。</p>
            </div>
          </div>
        </div>

        <!-- Archetype 5: Transcendence -->
        <div
          class="archetype-card swiss-border swiss-hover-accent clickable"
          :class="{ expanded: expandedArchetype === 4 }"
          @click="toggleArchetype(4)"
        >
          <div class="archetype-number">05</div>
          <div class="archetype-info">
            <h3 class="archetype-name">超脱</h3>
            <p class="archetype-role">美人儿蕾梅黛丝</p>
            <p class="archetype-desc">第四代 · 白日飞升</p>
          </div>
          <div class="archetype-quote swiss-dots">
            "她不属于<br/>这个世界<br/>她只是路过"
          </div>
          <div class="archetype-details" v-if="expandedArchetype === 4">
            <div class="detail-section">
              <p class="detail-label">美貌</p>
              <p class="detail-text">拥有惊心动魄的美貌，但对自己的魅力毫无察觉。她不穿衣服，因为衣服是累赘。她不食人间烟火。</p>
            </div>
            <div class="detail-section">
              <p class="detail-label">飞升</p>
              <p class="detail-text">在晒床单时，身体飘向空中，消失在天堂。她的飞升是魔幻现实主义最经典的场景之一。</p>
            </div>
            <div class="detail-section">
              <p class="detail-label">孤独</p>
              <p class="detail-text">她的孤独在于不属于人间。她太纯洁、太完美，无法在这个污浊的世界上生存。她回到属于她的地方。</p>
            </div>
          </div>
        </div>

        <!-- Archetype 6: Prophecy -->
        <div
          class="archetype-card swiss-border swiss-hover-accent clickable"
          :class="{ expanded: expandedArchetype === 5 }"
          @click="toggleArchetype(5)"
        >
          <div class="archetype-number">06</div>
          <div class="archetype-info">
            <h3 class="archetype-name">预言</h3>
            <p class="archetype-role">奥雷里亚诺·巴比伦尼亚</p>
            <p class="archetype-desc">第七代 · 破解羊皮卷</p>
          </div>
          <div class="archetype-quote swiss-dots">
            "注定经受<br/>百年孤独<br/>不会有第二次机会"
          </div>
          <div class="archetype-details" v-if="expandedArchetype === 5">
            <div class="detail-section">
              <p class="detail-label">解读</p>
              <p class="detail-text">他是唯一破解梅尔基亚德斯羊皮卷的人。当他解读完毕，马孔多被飓风从地表抹去。因为预言被解读完毕，世界也就结束了。</p>
            </div>
            <div class="detail-section">
              <p class="detail-label">见证</p>
              <p class="detail-text">他见证了家族的终结。"家族的第一个人被绑在树上，最后一个人正被蚂蚁吃掉。"</p>
            </div>
            <div class="detail-section">
              <p class="detail-label">宿命</p>
              <p class="detail-text">这个家族注定经受百年孤独，因为他们不懂爱、不懂得沟通。他们每个人都有自己的孤独世界，无法真正连接。</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 02: CYCLES -->
    <section class="section-cycles swiss-border-bottom">
      <div class="section-header">
        <p class="section-number">SECTION 02</p>
        <h2 class="section-title">CYCLES</h2>
        <p class="section-subtitle">Time is a Circle</p>
      </div>

      <div class="cycles-list">
        <!-- Cycle 1 -->
        <div
          class="cycle-card swiss-border clickable"
          :class="{ expanded: expandedCycle === 0 }"
          @click="toggleCycle(0)"
        >
          <div class="cycle-header">
            <span class="cycle-number">01</span>
            <h3 class="cycle-title">名字的重复</h3>
            <span class="cycle-tag">NAMES</span>
          </div>
          <div class="cycle-content">
            <p class="cycle-desc">奥雷里亚诺 × 22人，阿尔卡蒂奥 × 5人</p>
            <div class="cycle-details" v-if="expandedCycle === 0">
              <div class="detail-section">
                <p class="detail-label">奥雷里亚诺</p>
                <p class="detail-text">所有叫奥雷里亚诺的人都性格内向、孤僻、有预知能力。上校、他的17个私生子、最后的羊皮卷解读er，都重复着相似的命运。</p>
              </div>
              <div class="detail-section">
                <p class="detail-label">阿尔卡蒂奥</p>
                <p class="detail-text">所有叫阿尔卡蒂奥的人都冲动、粗鲁、悲剧。第二代阿尔卡蒂奥被处决，第三代阿尔卡蒂奥·何塞也被杀，命运惊人地相似。</p>
              </div>
              <div class="detail-section">
                <p class="detail-label">意义</p>
                <p class="detail-text">名字不只是代号，更是命运的诅咒。同名的人重复着相同的性格、相同的错误、相同的结局。</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Cycle 2 -->
        <div
          class="cycle-card swiss-border clickable"
          :class="{ expanded: expandedCycle === 1 }"
          @click="toggleCycle(1)"
        >
          <div class="cycle-header">
            <span class="cycle-number">02</span>
            <h3 class="cycle-title">命运的重演</h3>
            <span class="cycle-tag">FATE</span>
          </div>
          <div class="cycle-content">
            <p class="cycle-desc">父子相残、乱伦、战争，一代代重演</p>
            <div class="cycle-details" v-if="expandedCycle === 1">
              <div class="detail-section">
                <p class="detail-label">乱伦</p>
                <p class="detail-text">阿玛兰妲·乌尔苏拉爱上了侄子奥雷里亚诺·何塞，是禁忌的爱。这个禁忌在第六代和第七代之间再次重演。</p>
              </div>
              <div class="detail-section">
                <p class="detail-label">战争</p>
                <p class="detail-text">上校发动32场起义，全部失败。他的后代们继续着暴力和战争，代代相传。</p>
              </div>
              <div class="detail-section">
                <p class="detail-label">悲剧</p>
                <p class="detail-text">每一代都经历了失去、死亡、分离。悲剧像一个循环，永无止境。</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Cycle 3 -->
        <div
          class="cycle-card swiss-border clickable"
          :class="{ expanded: expandedCycle === 2 }"
          @click="toggleCycle(2)"
        >
          <div class="cycle-header">
            <span class="cycle-number">03</span>
            <h3 class="cycle-title">时间是圆环</h3>
            <span class="cycle-tag">TIME</span>
          </div>
          <div class="cycle-content">
            <p class="cycle-desc">过去、现在、未来同时存在</p>
            <div class="cycle-details" v-if="expandedCycle === 2">
              <div class="detail-section">
                <p class="detail-label">非线性时间</p>
                <p class="detail-text">在马孔多，过去、现在、未来同时存在。死者的幽灵与生者对话，未来在羊皮卷中早已被写好。</p>
              </div>
              <div class="detail-section">
                <p class="detail-label">重复的行为</p>
                <p class="detail-text">上校制作小金鱼又融化，阿玛兰妲织寿衣又拆掉，这些循环象征着时间不是线性的，而是圆环。</p>
              </div>
              <div class="detail-section">
                <p class="detail-label">结局</p>
                <p class="detail-text">当最后一个人解读完羊皮卷，马孔多被飓风抹去。这是因为预言已经实现，时间完成了一个完整的循环。</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Cycle 4 -->
        <div
          class="cycle-card swiss-border clickable"
          :class="{ expanded: expandedCycle === 3 }"
          @click="toggleCycle(3)"
        >
          <div class="cycle-header">
            <span class="cycle-number">04</span>
            <h3 class="cycle-title">辉煌与寂灭</h3>
            <span class="cycle-tag">RISE & FALL</span>
          </div>
          <div class="cycle-content">
            <p class="cycle-desc">马孔多从创建到繁荣再到消亡</p>
            <div class="cycle-details" v-if="expandedCycle === 3">
              <div class="detail-section">
                <p class="detail-label">创建</p>
                <p class="detail-text">何塞·阿尔卡蒂奥带领一群人穿越沼泽，创建了马孔多。那时是一个只有20户人家的村庄。</p>
              </div>
              <div class="detail-section">
                <p class="detail-label">繁荣</p>
                <p class="detail-text">香蕉公司带来了现代化，马孔多成为城镇。火车、电影院、电灯出现了，但也带来了剥削和大屠杀。</p>
              </div>
              <div class="detail-section">
                <p class="detail-label">消亡</p>
                <p class="detail-text">大屠杀后，马孔多开始衰落。最后一场暴雨持续了四年十一个月零两天，马孔多被彻底遗忘。</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 03: EPILOGUE -->
    <section class="section-epilogue">
      <div class="section-header">
        <p class="section-number">SECTION 03</p>
        <h2 class="section-title">EPILOGUE</h2>
        <p class="section-subtitle">The Final Words</p>
      </div>

      <div class="epilogue-grid">
        <div class="epilogue-card">
          <div class="epilogue-spine"></div>
          <div class="epilogue-border-top"></div>
          <p class="epilogue-text">生命中所有灿烂终将用寂寞偿还</p>
          <div class="epilogue-border-bottom"></div>
          <div class="epilogue-source">
            <span class="source-name">全书题眼</span>
            <span class="source-role">孤独的代价</span>
          </div>
        </div>

        <div class="epilogue-card">
          <div class="epilogue-spine"></div>
          <div class="epilogue-border-top"></div>
          <p class="epilogue-text">过去都是假的，回忆是一条没有归途的路</p>
          <div class="epilogue-border-bottom"></div>
          <div class="epilogue-source">
            <span class="source-name">全书开篇</span>
            <span class="source-role">回忆与遗忘</span>
          </div>
        </div>

        <div class="epilogue-card">
          <div class="epilogue-spine"></div>
          <div class="epilogue-border-top"></div>
          <p class="epilogue-text">无论走到哪里，都应该记住，过去都是假的</p>
          <div class="epilogue-border-bottom"></div>
          <div class="epilogue-source">
            <span class="source-name">梅尔基亚德斯</span>
            <span class="source-role">羊皮卷</span>
          </div>
        </div>

        <div class="epilogue-card">
          <div class="epilogue-spine"></div>
          <div class="epilogue-border-top"></div>
          <p class="epilogue-text">家族的第一个人被绑在树上，最后一个人正被蚂蚁吃掉</p>
          <div class="epilogue-border-bottom"></div>
          <div class="epilogue-source">
            <span class="source-name">羊皮卷预言</span>
            <span class="source-role">宿命的闭环</span>
          </div>
        </div>

        <div class="epilogue-card">
          <div class="epilogue-spine"></div>
          <div class="epilogue-border-top"></div>
          <p class="epilogue-text">注定经受百年孤独的家族不会有第二次机会在大地上出现</p>
          <div class="epilogue-border-bottom"></div>
          <div class="epilogue-source">
            <span class="source-name">全书结尾</span>
            <span class="source-role">孤独的永恒</span>
          </div>
        </div>

        <div class="epilogue-card">
          <div class="epilogue-spine"></div>
          <div class="epilogue-border-top"></div>
          <p class="epilogue-text">因为注定经受百年孤独的家族不会有第二次机会在大地上出现</p>
          <div class="epilogue-border-bottom"></div>
          <div class="epilogue-source">
            <span class="source-name">飓风之后</span>
            <span class="source-role">马孔多的消失</span>
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
const expandedArchetype = ref(null)
const expandedCycle = ref(null)

const exitWorld = () => {
  router.push('/yearbook/classic')
}

const toggleArchetype = (index) => {
  if (expandedArchetype.value === index) {
    expandedArchetype.value = null
  } else {
    expandedArchetype.value = index
    expandedCycle.value = null
  }
}

const toggleCycle = (index) => {
  if (expandedCycle.value === index) {
    expandedCycle.value = null
  } else {
    expandedCycle.value = index
    expandedArchetype.value = null
  }
}
</script>

<style scoped>
.one-hundred-years-world {
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
  color: #f4c44a;
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
  color: #f4c44a;
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
  color: #f4c44a;
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

/* Archetypes Grid */
.archetypes-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
  padding: 0 2rem 3rem;
}

.archetype-card {
  padding: 2rem;
  background: #FFFFFF;
  border: 2px solid #1A1A1A;
  cursor: pointer;
  transition: all 0.15s ease-out;
}

.archetype-card:not(.expanded):hover {
  background: #f4c44a;
  border-color: #f4c44a;
}

.archetype-card:not(.expanded):hover * {
  color: #FFFFFF;
}

.archetype-number {
  font-family: 'Inter', sans-serif;
  font-weight: 900;
  font-size: 2rem;
  letter-spacing: -0.03em;
  color: #f4c44a;
  margin-bottom: 1rem;
}

.archetype-info {
  margin-bottom: 1.5rem;
}

.archetype-name {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 1.25rem;
  letter-spacing: 0.05em;
  margin: 0 0 0.5rem;
  color: #1A1A1A;
}

.archetype-role {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  color: #666666;
  margin: 0 0 0.5rem;
}

.archetype-desc {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 0.875rem;
  color: #999999;
  margin: 0;
}

.archetype-quote {
  padding: 1.5rem;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  color: #1A1A1A;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-image: radial-gradient(circle, #f4c44a 1px, transparent 1px);
  background-size: 8px 8px;
}

.archetype-details {
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
  color: #f4c44a;
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

/* Cycles Section */
.cycles-list {
  padding: 0 2rem 3rem;
}

.cycle-card {
  background: #FFFFFF;
  border: 2px solid #1A1A1A;
  margin-bottom: 1.5rem;
  cursor: pointer;
  transition: all 0.15s ease-out;
}

.cycle-card:last-child {
  margin-bottom: 0;
}

.cycle-card:not(.expanded):hover {
  background: #f4c44a;
  border-color: #f4c44a;
}

.cycle-card:not(.expanded):hover * {
  color: #FFFFFF;
}

.cycle-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem 2rem;
  border-bottom: 2px solid #1A1A1A;
}

.cycle-number {
  font-family: 'Inter', sans-serif;
  font-weight: 900;
  font-size: 1.5rem;
  letter-spacing: -0.03em;
  color: #f4c44a;
}

.cycle-title {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 1.25rem;
  letter-spacing: 0.05em;
  margin: 0;
  color: #1A1A1A;
  flex: 1;
}

.cycle-tag {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  color: #f4c44a;
  background: #F5F5F5;
  padding: 0.5rem 1rem;
}

.cycle-content {
  padding: 2rem;
}

.cycle-desc {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 0.875rem;
  color: #666666;
  margin: 0;
}

.cycle-details {
  padding: 1.5rem 0 0;
  border-top: 2px solid #1A1A1A;
  margin-top: 1.5rem;
}

/* Epilogue Grid */
.epilogue-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  padding: 0 2rem 3rem;
}

.epilogue-card {
  background: #FFFFFF;
  border: 2px solid #1A1A1A;
  padding: 2rem;
  position: relative;
  transition: all 0.15s ease-out;
}

.epilogue-card:hover {
  border-color: #f4c44a;
  transform: translateY(-2px);
}

.epilogue-spine {
  position: absolute;
  top: 0;
  left: 2rem;
  width: 4px;
  height: 100%;
  background: #f4c44a;
}

.epilogue-border-top {
  height: 2px;
  background: #1A1A1A;
  margin-bottom: 1.5rem;
  margin-left: 1rem;
}

.epilogue-border-bottom {
  height: 2px;
  background: #1A1A1A;
  margin-top: 1.5rem;
  margin-left: 1rem;
}

.epilogue-text {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 0.9375rem;
  line-height: 1.7;
  color: #1A1A1A;
  margin: 0 0 1.5rem 1rem;
  padding-left: 1rem;
}

.epilogue-source {
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
  background: #f4c44a;
  border-color: #f4c44a;
}

.swiss-hover-accent:hover * {
  color: #FFFFFF;
}

.swiss-dots {
  background-image: radial-gradient(circle, #f4c44a 1px, transparent 1px);
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
  .one-hundred-years-world {
    padding-left: 0;
  }

  .archetypes-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .epilogue-grid {
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

  .archetypes-grid,
  .epilogue-grid {
    grid-template-columns: 1fr;
    padding: 1rem;
  }

  .cycles-list {
    padding: 1rem;
  }

  .cycle-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .cycle-tag {
    align-self: flex-start;
  }
}
</style>

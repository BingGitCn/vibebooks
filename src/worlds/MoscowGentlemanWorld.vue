<template>
  <div class="moscow-gentleman-world">
    <!-- 返回按钮 -->
    <button class="exit-btn" @click="exitWorld">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M19 12H5M12 19l-7-7 7-7"/>
      </svg>
      <span>返回</span>
    </button>

    <!-- === 莫斯科天际线背景 === -->
    <div class="moscow-skyline">
      <svg viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
        <!-- 克里姆林宫墙 -->
        <g class="kremlin-wall" opacity="0.04">
          <path d="M0 850 L1920 850 L1920 920 L0 920 Z" fill="none" stroke="#2c3e50" stroke-width="1.5"/>
          <path d="M0 850 L80 850 L80 820 L100 820 L100 850 L180 850 L180 800 L200 800 L200 850 L280 850 L280 810 L300 810 L300 850 L380 850 L380 790 L400 790 L400 850 L480 850 L480 815 L500 815 L500 850 L580 850 L580 805 L600 805 L600 850 L680 850 L680 820 L700 820 L700 850 L780 850 L780 810 L800 810 L800 850 L880 850 L880 795 L900 795 L900 850 L980 850 L980 815 L1000 815 L1000 850 L1080 850 L1080 805 L1100 805 L1100 850 L1180 850 L1180 820 L1200 820 L1200 850 L1280 850 L1280 810 L1300 810 L1300 850 L1380 850 L1380 800 L1400 800 L1400 850 L1480 850 L1480 815 L1500 815 L1500 850 L1580 850 L1580 805 L1600 805 L1600 850 L1680 850 L1680 820 L1700 820 L1700 850 L1780 850 L1780 810 L1800 810 L1800 850 L1880 850 L1880 820 L1900 820 L1900 850 L1920 850" fill="none" stroke="#2c3e50" stroke-width="1"/>
          <!-- 塔楼 -->
          <path d="M400 790 L400 750 L420 750 L420 790" fill="none" stroke="#2c3e50" stroke-width="1"/>
          <path d="M900 795 L900 740 L920 740 L920 795" fill="none" stroke="#2c3e50" stroke-width="1"/>
          <path d="M1400 800 L1400 755 L1420 755 L1420 800" fill="none" stroke="#2c3e50" stroke-width="1"/>
        </g>

        <!-- 圣瓦西里大教堂 -->
        <g class="st-basil" opacity="0.03">
          <!-- 洋葱顶 1 -->
          <path d="M1650 700 Q1680 600 1700 700" fill="none" stroke="#c0392b" stroke-width="1.5"/>
          <circle cx="1680" cy="680" r="4" fill="none" stroke="#c0392b" stroke-width="1"/>
          <!-- 洋葱顶 2 -->
          <path d="M1720 720 Q1740 640 1760 720" fill="none" stroke="#c0392b" stroke-width="1.5"/>
          <circle cx="1740" cy="705" r="3" fill="none" stroke="#c0392b" stroke-width="1"/>
          <!-- 洋葱顶 3 -->
          <path d="M1780 710 Q1810 630 1830 710" fill="none" stroke="#c0392b" stroke-width="1.5"/>
          <circle cx="1810" cy="695" r="4" fill="none" stroke="#c0392b" stroke-width="1"/>
          <!-- 洋葱顶 4 -->
          <path d="M1690 730 Q1710 670 1730 730" fill="none" stroke="#c0392b" stroke-width="1.5"/>
          <circle cx="1710" cy="715" r="3" fill="none" stroke="#c0392b" stroke-width="1"/>
        </g>

        <!-- 莫斯科河 -->
        <g class="moscow-river" opacity="0.03">
          <path d="M0 950 Q300 920 600 940 T1200 930 T1920 950" fill="none" stroke="#4A90D9" stroke-width="2"/>
        </g>

        <!-- 大都会酒店轮廓 -->
        <g class="metropol-hotel" opacity="0.04">
          <rect x="150" y="650" width="200" height="200" fill="none" stroke="#2c3e50" stroke-width="1.5"/>
          <line x1="150" y1="700" x2="350" y2="700" stroke="#2c3e50" stroke-width="0.5" opacity="0.5"/>
          <line x1="150" y1="750" x2="350" y2="750" stroke="#2c3e50" stroke-width="0.5" opacity="0.5"/>
          <line x1="150" y1="800" x2="350" y2="800" stroke="#2c3e50" stroke-width="0.5" opacity="0.5"/>
          <line x1="150" y1="850" x2="350" y2="850" stroke="#2c3e50" stroke-width="0.5" opacity="0.5"/>
          <!-- 窗户 -->
          <g opacity="0.3">
            <rect x="170" y="670" width="15" height="20" fill="none" stroke="#2c3e50" stroke-width="0.5"/>
            <rect x="200" y="670" width="15" height="20" fill="none" stroke="#2c3e50" stroke-width="0.5"/>
            <rect x="230" y="670" width="15" height="20" fill="none" stroke="#2c3e50" stroke-width="0.5"/>
            <rect x="260" y="670" width="15" height="20" fill="none" stroke="#2c3e50" stroke-width="0.5"/>
            <rect x="290" y="670" width="15" height="20" fill="none" stroke="#2c3e50" stroke-width="0.5"/>
            <rect x="320" y="670" width="15" height="20" fill="none" stroke="#2c3e50" stroke-width="0.5"/>
          </g>
        </g>
      </svg>
    </div>

    <!-- === 飘雪画布 === -->
    <canvas ref="snowCanvas" class="snow-canvas"></canvas>

    <!-- === 记忆物件主界面 === -->
    <transition name="memories-fade">
      <div v-if="view === 'memories'" class="memories-view">
        <div class="memories-header">
          <h1 class="memories-title">莫斯科绅士</h1>
          <p class="memories-subtitle">亚历山大·罗斯托夫伯爵的 32 年</p>
          <p class="memories-author">埃默·托尔斯</p>
          <p class="memories-instruction">拾起一段记忆</p>
        </div>

        <!-- 散落的记忆物件 -->
        <div class="memory-objects">
          <div
            v-for="memory in memories"
            :key="memory.year"
            class="memory-object"
            :class="{
              'is-hovered': hoveredMemory === memory.year,
              'is-visited': visitedMemories.includes(memory.year)
            }"
            :style="{ left: memory.x + '%', top: memory.y + '%' }"
            @click="enterMemory(memory)"
            @mouseenter="hoveredMemory = memory.year"
            @mouseleave="hoveredMemory = null"
          >
            <!-- 物件图标 -->
            <div class="object-icon" v-html="memory.icon"></div>

            <!-- 年份标签 -->
            <div class="object-year">{{ memory.year }}</div>

            <!-- 物件名称 -->
            <div class="object-name">{{ memory.name }}</div>
          </div>
        </div>
      </div>
    </transition>

    <!-- === 记忆详情视图 === -->
    <transition name="memory-detail-fade">
      <div v-if="view === 'detail'" class="memory-detail-view">
        <!-- 返回按钮 -->
        <button class="back-to-memories" @click="backToMemories">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          <span>记忆碎片</span>
        </button>

        <!-- 记忆内容 -->
        <div class="memory-content">
          <!-- 年份标题 -->
          <div class="memory-year-header">
            <h2 class="memory-year">{{ selectedMemory.year }}</h2>
            <p class="memory-era">{{ selectedMemory.era }}</p>
          </div>

          <!-- 开篇诗句 -->
          <div class="memory-intro" v-if="selectedMemory.intro">
            <p class="intro-text">{{ selectedMemory.intro }}</p>
            <p class="intro-quote" v-if="selectedMemory.introQuote">"{{ selectedMemory.introQuote }}"</p>
          </div>

          <!-- 事件时间线 -->
          <div class="memory-events" v-if="selectedMemory.events && selectedMemory.events.length > 0">
            <h3 class="events-title">这一年</h3>
            <div class="events-list">
              <div
                v-for="(event, index) in selectedMemory.events"
                :key="index"
                class="event-item"
              >
                <div class="event-dot"></div>
                <div class="event-content">
                  <h4 class="event-title">{{ event.title }}</h4>
                  <p class="event-description">{{ event.description }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- 场景卡片 -->
          <div class="memory-scenes">
            <div
              v-for="(scene, index) in selectedMemory.scenes"
              :key="index"
              class="scene-card"
              :class="{ 'is-interactive': scene.interactive }"
              @click="scene.interactive && showSceneDetail(scene)"
            >
              <div class="scene-label">{{ scene.title }}</div>

              <div class="scene-content">
                <div v-if="scene.svg" class="scene-svg" v-html="scene.svg"></div>
                <div v-else-if="scene.portrait" class="scene-portrait">
                  <div class="portrait-frame">
                    <div class="portrait-silhouette">{{ scene.portrait.initials }}</div>
                    <h4 class="portrait-name">{{ scene.portrait.name }}</h4>
                    <p class="portrait-role">{{ scene.portrait.role }}</p>
                  </div>
                </div>
                <div v-else-if="scene.text" class="scene-text">
                  <p>{{ scene.text }}</p>
                </div>
              </div>

              <div class="scene-description" v-if="scene.description">
                <p>{{ scene.description }}</p>
              </div>

              <div class="scene-quote" v-if="scene.quote">
                <p class="quote-text">"{{ scene.quote }}"</p>
                <span class="quote-source">{{ scene.quoteSource || '亚历山大·罗斯托夫' }}</span>
              </div>
            </div>
          </div>

          <!-- 结语 -->
          <div class="memory-epilogue" v-if="selectedMemory.epilogue">
            <p>{{ selectedMemory.epilogue }}</p>
          </div>
        </div>

        <!-- 年份导航 -->
        <div class="memory-navigation">
          <button
            class="nav-btn prev-btn"
            :disabled="!canGoPrev"
            @click="goToPrev"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
            <span>{{ prevMemory ? `${prevMemory.year}` : '之前' }}</span>
          </button>
          <button
            class="nav-btn next-btn"
            :disabled="!canGoNext"
            @click="goToNext"
          >
            <span>{{ nextMemory ? `${nextMemory.year}` : '之后' }}</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>
        </div>
      </div>
    </transition>

    <!-- === 场景详情模态框 === -->
    <transition name="modal-fade">
      <div v-if="showModal" class="scene-modal" @click="closeModal">
        <div class="modal-content" @click.stop>
          <button class="modal-close" @click="closeModal">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
          <h3 class="modal-title">{{ modalData.title }}</h3>
          <div class="modal-body" v-html="modalData.content"></div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 视图状态
const view = ref('memories')
const selectedMemory = ref(null)
const visitedMemories = ref([])
const hoveredMemory = ref(null)
const showModal = ref(false)
const modalData = ref({ title: '', content: '' })
const snowCanvas = ref(null)

// 记忆物件（11个年份的象征物）
const memories = [
  {
    year: 1922,
    name: '金色雪茄盒',
    era: '第一乐章：衰落',
    x: 15,
    y: 25,
    icon: `<svg viewBox="0 0 100 80" class="memory-icon">
      <rect x="20" y="30" width="60" height="30" rx="2" fill="none" stroke="#d4af37" stroke-width="2"/>
      <rect x="30" y="40" width="40" height="15" fill="#d4af37" opacity="0.1"/>
      <circle cx="50" cy="45" r="5" fill="#d4af37" opacity="0.3"/>
      <line x1="20" y1="35" x2="80" y2="35" stroke="#d4af37" stroke-width="1" opacity="0.5"/>
      <line x1="20" y1="55" x2="80" y2="55" stroke="#d4af37" stroke-width="1" opacity="0.5"/>
    </svg>`,
    intro: '1922年6月21日，32岁的伯爵站在 Bolshevik 法庭上。由于一首年轻时写的诗，他免于死刑，却被判处终身软禁在大都会酒店。',
    introQuote: '如果一个人不掌握自己的命运，他就会被命运所掌握。',
    events: [
      { title: '审判', description: '伯爵被判处软禁，罪名是出身贵族阶级。由于一首诗感动法官，免于死刑。' },
      { title: '搬迁', description: '从三楼的豪华套房搬到十楼的狭小阁楼房间。' },
      { title: '失去', description: '失去所有财产、爵位和社会地位，只保留父亲的金质雪茄盒。' }
    ],
    scenes: [
      {
        title: '法庭',
        svg: `<svg viewBox="0 0 200 140" class="scene-svg-scale">
          <rect x="40" y="60" width="120" height="60" fill="none" stroke="#2c3e50" stroke-width="1.5"/>
          <rect x="60" y="75" width="40" height="30" fill="#2c3e50" opacity="0.15"/>
          <text x="80" y="95" font-size="8" fill="#2c3e50" text-anchor="middle">诗歌</text>
          <circle cx="120" cy="90" r="12" fill="none" stroke="#c0392b" stroke-width="1.5"/>
        </svg>`,
        description: '法官读完那首诗，沉默了很久。然后说："我们不判你死刑。你会活着，但会被囚禁在你熟悉的地方——大都会酒店。"',
        quote: '他们没有枪毙我，却判了我更重的刑罚——活着。',
        interactive: true,
        modalContent: '<p><strong>1922年6月21日</strong></p><p>法官读完那首诗，沉默了很久。法庭里安静得可以听到灰尘落下的声音。</p><p>"这首诗，"他说，"里有自由的精神。"</p><p>然后他抬起头，看着伯爵："所以，我们不判你死刑。你会活着，但会被囚禁在大都会酒店，直到我们另行通知。"</p><p>伯爵活了下来。但他将不再是伯爵，只是一个被困在酒店里的闲人。'
      },
      {
        title: '亚历山大·罗斯托夫',
        portrait: {
          initials: '亚历山大',
          name: '亚历山大·罗斯托夫伯爵',
          role: '32岁 · 被判软禁'
        },
        description: '一个从小接受贵族教育的人。现在，他必须从头学习如何做一个普通人。',
        quote: '我向来试图以平和的心态面对逆境。',
        interactive: false
      }
    ],
    epilogue: '这一年，伯爵失去了一切——除了他的名字和尊严。而正是这些，让他在之后的32年里，活出了真正的贵族精神。'
  },
  {
    year: 1923,
    name: '阁楼窗户',
    era: '第一乐章：衰落',
    x: 35,
    y: 40,
    icon: `<svg viewBox="0 0 100 100" class="memory-icon">
      <rect x="25" y="20" width="50" height="60" fill="none" stroke="#2c3e50" stroke-width="2"/>
      <line x1="50" y1="20" x2="50" y2="80" stroke="#2c3e50" stroke-width="1.5"/>
      <line x1="25" y1="50" x2="75" y2="50" stroke="#2c3e50" stroke-width="1.5"/>
      <circle cx="50" cy="35" r="3" fill="#87CEEB" opacity="0.5"/>
    </svg>`,
    intro: '伯爵32岁。在阁楼房间里，他开始建立新的日常规律。从窗户俯瞰莫斯科，看着外面的世界继续运转，而他被困在这个小房间里。',
    introQuote: '在一个狭小的房间里，一个人的生活被它的细节所定义。',
    events: [
      { title: '适应', description: '学习在100平方英尺的房间里生活。' },
      { title: '观察', description: '从阁楼窗户观察莫斯科的街景。' }
    ],
    scenes: [
      {
        title: '阁楼窗户',
        text: '窗外是莫斯科',
        description: '伯爵学会了从窗户观察世界——看着街上的行人、变化的天空、季节的更替。这成了他日后教 Nina 的第一课。',
        quote: '在受限的空间里，一个人学会了观察。',
        interactive: false
      }
    ],
    epilogue: '这一年，伯爵学会了接受。接受他的新生活，他的小房间，他无法改变的命运。但更重要的是，他学会了在细节中寻找意义。'
  },
  {
    year: 1924,
    name: '餐巾折花',
    era: '第一乐章：衰落',
    x: 55,
    y: 30,
    icon: `<svg viewBox="0 0 100 100" class="memory-icon">
      <path d="M50 20 L60 40 L80 40 L65 55 L70 75 L50 60 L30 75 L35 55 L20 40 L40 40 Z" fill="none" stroke="#fff" stroke-width="2"/>
      <circle cx="50" cy="50" r="15" fill="none" stroke="#fff" stroke-width="1"/>
    </svg>`,
    intro: '伯爵33岁。他开始在 Boyarsky 餐厅工作。不是作为顾客，而是作为侍应生。但他发现，即使在服务中，也可以保持优雅和尊严。',
    introQuote: '无论王子还是乞丐，一个人的价值取决于他的行为。',
    events: [
      { title: '工作', description: '开始在餐厅工作，学习折餐巾、端盘子。' },
      { title: '意义', description: '在工作中找到新的目标和意义。' }
    ],
    scenes: [
      {
        title: '餐巾艺术',
        text: '优雅的服务',
        description: '伯爵学会了把餐巾折成完美的形状。这是他对细节的执着，也是他保持尊严的方式。',
        quote: '即使在最卑微的工作中，也可以追求卓越。',
        interactive: false
      }
    ],
    epilogue: '这一年，伯爵找到了一种方式来定义自己——不是通过他的头衔，而是通过他的行为。他学会了，尊严不取决于你做什么，而取决于你如何做。'
  },
  {
    year: 1926,
    name: '侍应生制服',
    era: '第一乐章：衰落',
    x: 75,
    y: 45,
    icon: `<svg viewBox="0 0 100 100" class="memory-icon">
      <circle cx="50" cy="30" r="15" fill="none" stroke="#2c3e50" stroke-width="2"/>
      <line x1="50" y1="45" x2="50" y2="85" stroke="#2c3e50" stroke-width="2"/>
      <line x1="50" y1="55" x2="30" y2="75" stroke="#2c3e50" stroke-width="2"/>
      <line x1="50" y1="55" x2="70" y2="75" stroke="#2c3e50" stroke-width="2"/>
      <rect x="40" y="50" width="20" height="25" fill="#2c3e50" opacity="0.1"/>
    </svg>`,
    intro: '伯爵35岁。现在他是一名正式的侍应生。他接受了这个新身份，并在这份工作中找到了满足感。',
    introQuote: '一个人的抱负应当与他的境遇相称。',
    events: [
      { title: '正式员工', description: '成为餐厅的正式侍应生。' },
      { title: '友谊', description: '与酒店员工建立真挚的友谊。' }
    ],
    scenes: [
      {
        title: '新的身份',
        text: '不是伯爵，是侍应生',
        description: '伯爵学会了在服务中找到快乐。他发现，优雅不是头衔，而是态度。',
        quote: '我不再是伯爵，但我仍然是一个绅士。',
        interactive: false
      }
    ],
    epilogue: '这一年，伯爵完成了他的转变。从一个失去一切的贵族，变成了一个在新生活中找到意义的男人。他学会了，真正的优雅来自内心，而不是头衔。'
  },
  {
    year: 1930,
    name: '黄铜钥匙',
    era: '第二乐章：相遇',
    x: 25,
    y: 60,
    icon: `<svg viewBox="0 0 100 100" class="memory-icon">
      <circle cx="40" cy="40" r="18" fill="none" stroke="#d4af37" stroke-width="2.5"/>
      <rect x="55" y="38" width="35" height="8" fill="none" stroke="#d4af37" stroke-width="2"/>
      <circle cx="85" cy="42" r="4" fill="#d4af37"/>
    </svg>`,
    intro: '伯爵38岁。一个9岁的小女孩出现了。Nina Kulikova。她像一阵小风暴，闯进了他平静的生活。',
    introQuote: '然后，一个9岁的小女孩出现了。',
    events: [
      { title: '相遇', description: '在酒店大堂遇见9岁的 Nina。' },
      { title: '钥匙', description: '给她一把能打开所有门的黄铜钥匙。' }
    ],
    scenes: [
      {
        title: '初次相遇',
        svg: `<svg viewBox="0 0 200 140" class="scene-svg-scale">
          <rect x="30" y="80" width="140" height="50" fill="none" stroke="#c0392b" stroke-width="1"/>
          <circle cx="100" cy="105" r="12" fill="#c0392b" opacity="0.3"/>
          <text x="100" y="109" font-size="14" fill="#c0392b" text-anchor="middle" font-weight="bold">N</text>
        </svg>`,
        description: '"你是住在楼上的那个人吗？"她问。伯爵愣住了。这是多年来，第一次有人纯粹地好奇他这个人，而不是他的头衔。',
        quote: '你是住在楼上的那个人吗？',
        quoteSource: 'Nina Kulikova, 9岁',
        interactive: true,
        modalContent: '<p>Nina 就那样出现了。像一阵小风暴。</p><p>"你是住在楼上的那个人吗？"她问。</p><p>伯爵愣住了。这是多年来，第一次有人好奇他这个人，而不是他的头衔、地位或过去。</p><p>"是的，"伯爵回答，"我是。"</p><p>"你能教我怎么观察这个世界吗？"她问。</p><p>伯爵看着这个小女孩，看到了自己的过去，也看到了可能的未来。"当然，"他说。'
      },
      {
        title: '万能钥匙',
        svg: `<svg viewBox="0 0 200 120" class="scene-svg-scale">
          <circle cx="100" cy="60" r="15" fill="none" stroke="#d4af37" stroke-width="2"/>
          <rect x="90" y="60" width="40" height="8" fill="none" stroke="#d4af37" stroke-width="1.5"/>
        </svg>`,
        description: '这把钥匙能打开大都会酒店的每一扇门。但更重要的是，它打开了一个小女孩的眼睛，让她学会了观察。',
        quote: '世界是由房间组成的。每个房间都有它的故事。',
        interactive: false
      }
    ],
    epilogue: '这一年，38岁的伯爵遇到了9岁的 Nina。他以为自己已经失去了人生的意义，却没想到，最大的意义正等着他去发现——教会一个孩子如何观察这个世界。'
  },
  {
    year: 1938,
    name: '望远镜',
    era: '第二乐章：相遇',
    x: 60,
    y: 55,
    icon: `<svg viewBox="0 0 100 100" class="memory-icon">
      <rect x="30" y="40" width="40" height="20" rx="2" fill="none" stroke="#2c3e50" stroke-width="2" transform="rotate(-30 50 50)"/>
      <circle cx="30" cy="45" r="8" fill="none" stroke="#2c3e50" stroke-width="2" transform="rotate(-30 50 50)"/>
      <line x1="20" y1="30" x2="5" y2="15" stroke="#2c3e50" stroke-width="2" stroke-dasharray="3"/>
    </svg>`,
    intro: 'Nina 17岁。8年间，伯爵在楼顶教她观察——莫斯科的天际线、季节的变化、人们的故事。现在，她准备好离开，去探索更大的世界。',
    introQuote: '如果不去观察，你就永远不会看见。',
    events: [
      { title: '楼顶课堂', description: '在酒店楼顶教 Nina 观察世界。' },
      { title: '成长', description: 'Nina 从小女孩变成有思想的年轻女性。' }
    ],
    scenes: [
      {
        title: '楼顶课堂',
        svg: `<svg viewBox="0 0 200 140" class="scene-svg-scale">
          <rect x="40" y="100" width="120" height="30" fill="none" stroke="#d35400" stroke-width="1.5"/>
          <line x1="40" y1="100" x2="100" y2="60" stroke="#d35400" stroke-width="1"/>
          <line x1="160" y1="100" x2="100" y2="60" stroke="#d35400" stroke-width="1"/>
          <circle cx="100" cy="50" r="15" fill="none" stroke="#d35400" stroke-width="1.5"/>
        </svg>`,
        description: '"必须学会观察，"伯爵告诉 Nina，"因为如果你不观察，你就永远不会看见。"',
        quote: '细节，Nina。世界藏在细节里。',
        interactive: true,
        modalContent: '<p>楼顶成了他们的课堂。</p><p>伯爵指着莫斯科的天际线："看那座建筑，那座教堂，那个街角。每个地方都有它的故事。"</p><p>"但要看见故事，你必须先学会观察。"</p><p>"观察什么？" Nina 问。</p><p>"一切，"伯爵说。"人们如何行走，如何交谈。灯光如何变化，季节如何更替。"</p><p>多年后，Nina 会把这些教给她的女儿。而伯爵，会在另一个小女孩身上，继续这门课程的传承。'
      }
    ],
    epilogue: '这一年，17岁的 Nina 准备好去探索世界。而伯爵，46岁，看着她离去，知道自己的一部分会随她而去。这就是传承的喜悦，也是传承的悲伤。'
  },
  {
    year: 1946,
    name: '空椅子',
    era: '第三乐章：传承',
    x: 40,
    y: 70,
    icon: `<svg viewBox="0 0 100 100" class="memory-icon">
      <rect x="25" y="50" width="50" height="5" fill="none" stroke="#2c3e50" stroke-width="2"/>
      <rect x="30" y="55" width="5" height="30" fill="none" stroke="#2c3e50" stroke-width="2"/>
      <rect x="65" y="55" width="5" height="30" fill="none" stroke="#2c3e50" stroke-width="2"/>
      <rect x="30" y="40" width="40" height="15" fill="none" stroke="#2c3e50" stroke-width="2" rx="2"/>
      <line x1="35" y1="50" x2="65" y2="50" stroke="#2c3e50" stroke-width="1" opacity="0.3"/>
    </svg>`,
    intro: '伯爵50岁。Nina 离开了俄罗斯，去了美国。阁楼再次安静下来。但伯爵知道，这不是结束，而是新的开始。',
    introQuote: '她曾是我的学徒，但后来成了我的老师。',
    events: [
      { title: '离别', description: 'Nina 离开俄罗斯，留下女儿 Sofia。' },
      { title: '安静', description: '阁楼再次安静，但伯爵知道这是新的开始。' }
    ],
    scenes: [
      {
        title: '空椅子',
        text: '但她留下了遗产',
        description: 'Nina 离开了，但她留下了 Sofia。这个小女孩，会成为伯爵生命中最重要的人。',
        quote: '她走了，但她的一部分留下了。',
        interactive: false
      }
    ],
    epilogue: '这一年，伯爵看着 Nina 离去。但他知道，这不是结束。因为 Nina 留下了 Sofia——一个会继续他的 legacy、继续他的课程、继续他的爱的小女孩。'
  },
  {
    year: 1950,
    name: '小提琴盒',
    era: '第三乐章：传承',
    x: 70,
    y: 65,
    icon: `<svg viewBox="0 0 100 100" class="memory-icon">
      <rect x="20" y="35" width="60" height="30" rx="3" fill="none" stroke="#8b4513" stroke-width="2"/>
      <rect x="25" y="40" width="50" height="20" fill="#8b4513" opacity="0.1"/>
      <rect x="45" y="65" width="10" height="15" fill="none" stroke="#8b4513" stroke-width="2"/>
      <circle cx="50" cy="72" r="3" fill="#8b4513" opacity="0.5"/>
    </svg>`,
    intro: '伯爵58岁。Sofia 来到了酒店。Nina 的女儿，6岁。她有音乐天赋，而伯爵会尽一切支持她。',
    introQuote: '她是 Nina 的女儿。但在某种意义上，她也是我的女儿。',
    events: [
      { title: '到来', description: 'Sofia 来到大都会酒店。' },
      { title: '监护人', description: '伯爵成为她的监护人。' }
    ],
    scenes: [
      {
        title: 'Sofia',
        portrait: {
          initials: 'S',
          name: 'Sofia',
          role: '6岁 · 音乐家'
        },
        description: '一个有音乐天赋的小女孩。她会成为伯爵生命中最重要的人。',
        quote: '你不是一个人，Sofia。你永远不会是。',
        interactive: false
      }
    ],
    epilogue: '这一年，58岁的伯爵遇到了6岁的 Sofia。他以为自己已经完成了作为导师的使命，却没想到，最重要的使命才刚刚开始——成为父亲。'
  },
  {
    year: 1952,
    name: '双层床',
    era: '第三乐章：传承',
    x: 85,
    y: 75,
    icon: `<svg viewBox="0 0 100 100" class="memory-icon">
      <rect x="25" y="30" width="50" height="60" fill="none" stroke="#2c3e50" stroke-width="2"/>
      <line x1="25" y1="50" x2="75" y2="50" stroke="#2c3e50" stroke-width="2"/>
      <rect x="30" y="35" width="15" height="12" fill="#2c3e50" opacity="0.1"/>
      <rect x="55" y="55" width="15" height="12" fill="#c0392b" opacity="0.1"/>
    </svg>`,
    intro: '伯爵60岁。Sofia 的母亲改嫁了。伯爵正式收养 Sofia 的手续开始了。阁楼房间现在有了两张床。',
    introQuote: '公主不会抛弃她的人民。父亲也不会抛弃他的孩子。',
    events: [
      { title: '两张床', description: '阁楼房间现在有两张床——伯爵的和 Sofia 的。' },
      { title: '父亲', description: '伯爵准备好成为 Sofia 的父亲。' }
    ],
    scenes: [
      {
        title: '两张床',
        text: '一个房间，两个人',
        description: '100平方英尺的阁楼，现在住着两个人。但伯爵觉得，这是他住过最宽敞的房间。',
        quote: '因为我们有了家。',
        interactive: false
      }
    ],
    epilogue: '这一年，伯爵的生活再次改变。从一个人到两个人，从孤独到家庭。他64年的人生中，第一次有了"家"的感觉。'
  },
  {
    year: 1953,
    name: '收养文件',
    era: '第三乐章：传承',
    x: 50,
    y: 80,
    icon: `<svg viewBox="0 0 100 100" class="memory-icon">
      <rect x="25" y="20" width="50" height="60" fill="none" stroke="#2c3e50" stroke-width="2"/>
      <line x1="35" y1="35" x2="65" y2="35" stroke="#2c3e50" stroke-width="1"/>
      <line x1="35" y1="45" x2="65" y2="45" stroke="#2c3e50" stroke-width="1"/>
      <line x1="35" y1="55" x2="55" y2="55" stroke="#2c3e50" stroke-width="1"/>
      <circle cx="60" cy="70" r="5" fill="#c0392b" opacity="0.5"/>
    </svg>`,
    intro: '伯爵61岁。收养文件签完了。他现在是 Sofia 的合法父亲——不是血缘，而是选择。',
    introQuote: '如果一个人没有家庭，他就必须创造一个。',
    events: [
      { title: '签名', description: '在收养文件上签字。' },
      { title: '父亲', description: '正式成为 Sofia 的父亲。' }
    ],
    scenes: [
      {
        title: '父女',
        svg: `<svg viewBox="0 0 200 140" class="scene-svg-scale">
          <circle cx="70" cy="70" r="20" fill="none" stroke="#2c3e50" stroke-width="1.5"/>
          <circle cx="130" cy="70" r="18" fill="none" stroke="#c0392b" stroke-width="1.5"/>
          <line x1="90" y1="70" x2="112" y2="70" stroke="#2c3e50" stroke-width="2"/>
        </svg>`,
        description: '31年前，他被剥夺了一切。31年后，他有了一切——一个女儿。',
        quote: '我不是这个酒店的囚犯，Sofia。我是你的父亲。',
        interactive: false
      }
    ],
    epilogue: '这一年，伯爵61岁。他失去了贵族头衔，失去了财产，失去了自由。但他得到了一些更珍贵的东西——一个女儿，一种使命，一个家。'
  },
  {
    year: 1954,
    name: '火车票',
    era: '第三乐章：传承',
    x: 20,
    y: 85,
    icon: `<svg viewBox="0 0 100 100" class="memory-icon">
      <rect x="20" y="30" width="60" height="40" rx="2" fill="none" stroke="#c0392b" stroke-width="2"/>
      <line x1="20" y1="50" x2="80" y2="50" stroke="#c0392b" stroke-width="1" stroke-dasharray="3"/>
      <rect x="60" y="35" width="15" height="10" fill="#c0392b" opacity="0.2"/>
      <text x="35" y="60" font-size="8" fill="#c0392b" text-anchor="middle">巴黎</text>
    </svg>`,
    intro: '伯爵64岁。雪夜。他和 Sofia 推开了酒店的门，走进了风雪中，走向火车站，走向自由。',
    introQuote: '在雪夜，他推开了那扇门，走向自由。',
    events: [
      { title: '逃离', description: '雪夜离开酒店。' },
      { title: '巴黎', description: '登上前往巴黎的火车。' }
    ],
    scenes: [
      {
        title: '雪夜',
        svg: `<svg viewBox="0 0 200 140" class="scene-svg-scale">
          <rect x="40" y="100" width="120" height="30" fill="none" stroke="#2c3e50" stroke-width="1.5"/>
          <circle cx="70" cy="85" r="15" fill="none" stroke="#2c3e50" stroke-width="1"/>
          <circle cx="130" cy="85" r="12" fill="none" stroke="#c0392b" stroke-width="1.5"/>
          <line x1="85" y1="85" x2="115" y2="85" stroke="#2c3e50" stroke-width="2"/>
          <circle cx="30" cy="30" r="1.5" fill="#fff" opacity="0.6"/>
          <circle cx="60" cy="20" r="1" fill="#fff" opacity="0.5"/>
          <circle cx="90" cy="35" r="1.5" fill="#fff" opacity="0.7"/>
          <circle cx="120" cy="25" r="1" fill="#fff" opacity="0.6"/>
          <circle cx="150" cy="40" r="1.5" fill="#fff" opacity="0.5"/>
          <circle cx="180" cy="30" r="1" fill="#fff" opacity="0.6"/>
        </svg>`,
        description: '雪下得很大。伯爵推开门，风雪扑面而来。他们走进了黑夜，向着火车站走去。',
        quote: '准备好了吗？',
        interactive: true,
        modalContent: '<p><strong>1954年冬，莫斯科</strong></p><p>雪下得很大。</p><p>"准备好了吗？"伯爵问。</p><p>Sofia 点点头。她穿着厚外套，手里提着小提琴盒。</p><p>伯爵推开门。风雪扑面而来。他们走进黑夜，向着火车站走去。</p><p>他们身后，是大都会酒店——伯爵的家、监狱、宫殿、学校，32年的全部世界。</p><p>他们前方，是火车站、巴黎、自由、新生活。</p>'
      }
    ],
    epilogue: '伯爵和 Sofia 登上了前往巴黎的火车。车窗外，俄罗斯的雪原向后退去。他们面前，是新的人生。32年的软禁结束了，但伯爵获得的东西，比任何人想象的都多——一个女儿，一种使命，一种永不失去的尊严和优雅。'
  }
]

// 计算属性
const currentIndex = computed(() => {
  return memories.findIndex(m => m.year === selectedMemory.value?.year)
})

const canGoPrev = computed(() => currentIndex.value > 0)
const canGoNext = computed(() => currentIndex.value < memories.length - 1)

const prevMemory = computed(() => {
  if (canGoPrev.value) {
    return memories[currentIndex.value - 1]
  }
  return null
})

const nextMemory = computed(() => {
  if (canGoNext.value) {
    return memories[currentIndex.value + 1]
  }
  return null
})

// 方法
const enterMemory = (memory) => {
  selectedMemory.value = memory
  if (!visitedMemories.value.includes(memory.year)) {
    visitedMemories.value.push(memory.year)
  }
  view.value = 'detail'
}

const backToMemories = () => {
  view.value = 'memories'
}

const goToPrev = () => {
  if (canGoPrev.value) {
    enterMemory(prevMemory.value)
  }
}

const goToNext = () => {
  if (canGoNext.value) {
    enterMemory(nextMemory.value)
  }
}

const showSceneDetail = (scene) => {
  modalData.value = {
    title: scene.title,
    content: scene.modalContent || scene.description
  }
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}

const exitWorld = () => {
  router.push('/universe')
}

// 飘雪动画
let snowAnimationId = null

const initSnow = () => {
  const canvas = snowCanvas.value
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  const snowflakes = []
  const maxSnowflakes = 50

  for (let i = 0; i < maxSnowflakes; i++) {
    snowflakes.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 1,
      speed: Math.random() * 0.5 + 0.2,
      opacity: Math.random() * 0.3 + 0.1
    })
  }

  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    snowflakes.forEach(flake => {
      ctx.beginPath()
      ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(255, 255, 255, ${flake.opacity})`
      ctx.fill()

      flake.y += flake.speed

      if (flake.y > canvas.height) {
        flake.y = -10
        flake.x = Math.random() * canvas.width
      }
    })

    snowAnimationId = requestAnimationFrame(animate)
  }

  animate()
}

// 键盘导航
onMounted(() => {
  initSnow()

  const handleKeydown = (e) => {
    if (view.value === 'detail') {
      if (e.key === 'ArrowLeft' && canGoPrev.value) {
        goToPrev()
      } else if (e.key === 'ArrowRight' && canGoNext.value) {
        goToNext()
      } else if (e.key === 'Escape') {
        backToMemories()
      }
    }
  }

  window.addEventListener('keydown', handleKeydown)

  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown)
    if (snowAnimationId) {
      cancelAnimationFrame(snowAnimationId)
    }
  })
})
</script>

<style scoped>
.moscow-gentleman-world {
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  font-family: 'Noto Serif SC', 'STSong', 'SimSun', serif;
  background: linear-gradient(180deg, #faf8f5 0%, #f5f0e8 100%);
}

/* === 返回按钮 === */
.exit-btn {
  position: fixed;
  top: 2rem;
  left: 2rem;
  z-index: 100;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  color: #1a1a1a;
  font-family: 'Inter', 'Microsoft YaHei', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.exit-btn:hover {
  background: #1a1a1a;
  color: #fff;
  transform: translateX(-4px);
}

/* === 莫斯科天际线背景 === */
.moscow-skyline {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
}

.moscow-skyline svg {
  width: 100%;
  height: 100%;
}

/* === 飘雪画布 === */
.snow-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
}

/* === 记忆物件主界面 === */
.memories-view {
  position: relative;
  z-index: 2;
  min-height: 100vh;
  padding: 8rem 2rem 4rem;
}

.memories-header {
  text-align: center;
  margin-bottom: 6rem;
}

.memories-title {
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 500;
  color: #1a1a1a;
  margin-bottom: 0.5rem;
  letter-spacing: 0.1em;
}

.memories-subtitle {
  font-size: clamp(1.2rem, 3vw, 1.8rem);
  font-weight: 300;
  color: #666;
  margin-bottom: 0.75rem;
}

.memories-author {
  font-size: 1rem;
  color: #888;
  margin-bottom: 1.5rem;
  font-style: italic;
}

.memories-instruction {
  font-size: 1rem;
  color: #999;
  font-style: italic;
}

/* 记忆物件容器 */
.memory-objects {
  position: relative;
  width: 100%;
  height: calc(100vh - 20rem);
}

.memory-object {
  position: absolute;
  transform: translate(-50%, -50%);
  cursor: pointer;
  transition: all 0.4s ease;
  animation: float 6s ease-in-out infinite;
}

.memory-object:nth-child(odd) {
  animation-delay: -3s;
}

.memory-object:hover,
.memory-object.is-hovered {
  transform: translate(-50%, -50%) scale(1.15);
  z-index: 10;
}

.memory-object.is-visited .object-icon {
  opacity: 0.7;
}

@keyframes float {
  0%, 100% {
    transform: translate(-50%, -50%) translateY(0);
  }
  50% {
    transform: translate(-50%, -50%) translateY(-10px);
  }
}

.memory-object:nth-child(odd) {
  animation-name: float-alt;
}

@keyframes float-alt {
  0%, 100% {
    transform: translate(-50%, -50%) translateY(0);
  }
  50% {
    transform: translate(-50%, -50%) translateY(10px);
  }
}

/* 物件图标 */
.object-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 0.75rem;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
  transition: all 0.3s ease;
}

.memory-object:hover .object-icon {
  filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.2));
}

.object-year {
  font-size: 0.9rem;
  font-weight: 700;
  color: #1a1a1a;
  text-align: center;
  margin-bottom: 0.25rem;
  font-family: 'Inter', sans-serif;
}

.object-name {
  font-size: 0.75rem;
  color: #666;
  text-align: center;
  font-style: italic;
  max-width: 120px;
}

/* === 记忆详情视图 === */
.memory-detail-view {
  position: relative;
  z-index: 2;
  min-height: 100vh;
  padding: 8rem 2rem 6rem;
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
}

.back-to-memories {
  position: fixed;
  top: 2rem;
  left: 8rem;
  z-index: 100;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  color: #1a1a1a;
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.back-to-memories:hover {
  background: #1a1a1a;
  color: #fff;
}

.memory-content {
  max-width: 900px;
  margin: 0 auto;
}

.memory-year-header {
  text-align: center;
  margin-bottom: 3rem;
}

.memory-year {
  font-size: clamp(4rem, 10vw, 6rem);
  font-weight: 400;
  color: #1a1a1a;
  margin-bottom: 0.5rem;
  letter-spacing: 0.1em;
}

.memory-era {
  font-size: 1.2rem;
  font-weight: 600;
  color: #666;
  letter-spacing: 0.15em;
}

.memory-intro {
  text-align: center;
  margin-bottom: 3rem;
}

.intro-text {
  font-size: 1.2rem;
  line-height: 2;
  color: #333;
  margin-bottom: 1.5rem;
}

.intro-quote {
  font-size: 1.4rem;
  font-style: italic;
  color: #666;
  line-height: 1.8;
}

.memory-events {
  margin-bottom: 3rem;
}

.events-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 2rem;
  text-align: center;
  letter-spacing: 0.1em;
}

.events-list {
  max-width: 700px;
  margin: 0 auto;
}

.event-item {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.event-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #c0392b;
  flex-shrink: 0;
  margin-top: 0.5rem;
  position: relative;
}

.event-dot::after {
  content: '';
  position: absolute;
  top: 12px;
  left: 50%;
  transform: translateX(-50%);
  width: 2px;
  height: calc(100% + 1rem);
  background: rgba(192, 57, 43, 0.2);
}

.event-item:last-child .event-dot::after {
  display: none;
}

.event-content {
  flex: 1;
}

.event-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 0.5rem;
}

.event-description {
  font-size: 1rem;
  line-height: 1.8;
  color: #666;
}

.memory-scenes {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.scene-card {
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  padding: 2rem;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  backdrop-filter: blur(10px);
}

.scene-card.is-interactive {
  cursor: pointer;
}

.scene-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
}

.scene-label {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1a1a1a;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.scene-content {
  min-height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 0;
}

.scene-svg :deep(svg) {
  width: 100%;
  height: 100%;
}

.portrait-frame {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.portrait-silhouette {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 1.8rem;
  font-weight: 600;
}

.portrait-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1a1a1a;
  text-align: center;
  margin: 0;
}

.portrait-role {
  font-size: 0.85rem;
  color: #888;
  font-style: italic;
  text-align: center;
  margin: 0;
}

.scene-text p {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #333;
  text-align: center;
  font-style: italic;
}

.scene-description p {
  font-size: 0.95rem;
  line-height: 1.8;
  color: #555;
  margin: 0;
}

.scene-quote {
  padding: 1rem;
  background: rgba(0, 0, 0, 0.03);
  border-left: 3px solid #2c3e50;
  border-radius: 4px;
}

.quote-text {
  font-size: 0.95rem;
  line-height: 1.7;
  color: #333;
  font-style: italic;
  margin-bottom: 0.5rem;
}

.quote-source {
  font-size: 0.75rem;
  color: #888;
  display: block;
  text-align: right;
}

.memory-epilogue {
  max-width: 700px;
  margin: 0 auto 3rem;
  padding: 2rem;
  background: rgba(0, 0, 0, 0.03);
  border-left: 4px solid #c0392b;
  border-radius: 8px;
}

.memory-epilogue p {
  font-size: 1rem;
  line-height: 2;
  color: #555;
  font-style: italic;
  margin: 0;
}

.memory-navigation {
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  gap: 2rem;
}

.nav-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  color: #1a1a1a;
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.nav-btn:hover:not(:disabled) {
  background: #1a1a1a;
  color: #fff;
  transform: scale(1.02);
}

.nav-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.prev-btn {
  flex-direction: row-reverse;
}

/* === 模态框 === */
.scene-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
  backdrop-filter: blur(4px);
}

.modal-content {
  background: #fff;
  border-radius: 16px;
  padding: 3rem;
  max-width: 600px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.modal-close {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.05);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  color: #666;
}

.modal-close:hover {
  background: rgba(0, 0, 0, 0.1);
  color: #1a1a1a;
  transform: rotate(90deg);
}

.modal-title {
  font-size: 1.8rem;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 1.5rem;
}

.modal-body {
  font-size: 1.05rem;
  line-height: 2;
  color: #555;
}

.modal-body :deep(p) {
  margin-bottom: 1rem;
}

/* === 过渡动画 === */
.memories-fade-enter-active,
.memories-fade-leave-active {
  transition: opacity 0.6s ease;
}

.memories-fade-enter-from,
.memories-fade-leave-to {
  opacity: 0;
}

.memory-detail-fade-enter-active,
.memory-detail-fade-leave-active {
  transition: opacity 0.6s ease;
}

.memory-detail-fade-enter-from,
.memory-detail-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

/* === 响应式设计 === */
@media (max-width: 768px) {
  .memory-object {
    transform: translate(-50%, -50%) scale(0.8);
  }

  .memory-object:hover,
  .memory-object.is-hovered {
    transform: translate(-50%, -50%) scale(0.95);
  }

  .object-icon {
    width: 60px;
    height: 60px;
  }

  .memory-scenes {
    grid-template-columns: 1fr;
  }

  .memory-navigation {
    flex-direction: column;
  }
}
</style>

<template>
  <div class="moscow-gentleman-world">
    <!-- 返回按钮 -->
    <button class="exit-btn" @click="exitWorld">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M19 12H5M12 19l-7-7 7-7"/>
      </svg>
      <span>返回</span>
    </button>

    <!-- === 时间轴主界面 === -->
    <transition name="timeline-fade">
      <div v-if="view === 'timeline'" class="timeline-view">
        <div class="timeline-header">
          <h1 class="timeline-title">莫斯科绅士</h1>
          <p class="timeline-subtitle">亚历山大·罗斯托夫伯爵的 32 年</p>
          <p class="timeline-author">埃默·托尔斯</p>
          <p class="timeline-instruction">选择一个年份，走进他的人生</p>
        </div>

        <!-- 时间轴 -->
        <div class="timeline-container">
          <div class="timeline-track">
            <div
              v-for="era in eras"
              :key="era.startYear"
              class="timeline-era"
              :class="{ 'is-active': selectedYear >= era.startYear && selectedYear <= era.endYear }"
            >
              <div class="era-label">{{ era.name }}</div>
              <div class="era-years">
                <div
                  v-for="year in era.years"
                  :key="year.year"
                  class="timeline-node"
                  :class="{
                    'is-active': selectedYear === year.year,
                    'is-visited': visitedYears.includes(year.year)
                  }"
                  @click="selectYear(year.year)"
                >
                  <div class="node-dot"></div>
                  <div class="node-label">{{ year.year }}</div>
                  <div class="node-tag">{{ year.tag }}</div>
                  <div class="node-events" v-if="selectedYear === year.year && year.events">
                    <div v-for="(event, idx) in year.events" :key="idx" class="event-item">
                      {{ event }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- === 年份详情视图 === -->
    <transition name="exhibition-fade">
      <div v-if="view === 'exhibition'" class="exhibition-view" :style="{ background: selectedYearData.background }">
        <!-- 年份头部 -->
        <div class="exhibition-header">
          <button class="back-to-timeline" @click="backToTimeline">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            <span>时间轴</span>
          </button>
          <div class="year-info">
            <h2 class="year-title">{{ selectedYear }}</h2>
            <p class="year-era">{{ selectedYearData.era }}</p>
            <p class="year-theme">{{ selectedYearData.theme }}</p>
          </div>
        </div>

        <!-- 叙述性开篇 -->
        <div class="year-intro" v-if="selectedYearData.intro">
          <div class="intro-text">{{ selectedYearData.intro }}</div>
          <div class="intro-quote" v-if="selectedYearData.introQuote">
            "{{ selectedYearData.introQuote }}"
          </div>
        </div>

        <!-- 关键事件时间线 -->
        <div class="events-timeline" v-if="selectedYearData.events && selectedYearData.events.length > 0">
          <h3 class="events-title">这一年</h3>
          <div class="events-list">
            <div
              v-for="(event, index) in selectedYearData.events"
              :key="index"
              class="event-card"
            >
              <div class="event-dot"></div>
              <div class="event-content">
                <h4 class="event-title">{{ event.title }}</h4>
                <p class="event-description">{{ event.description }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- 人物与场景 -->
        <div class="scenes-grid">
          <div
            v-for="(scene, index) in selectedYearData.scenes"
            :key="index"
            class="scene-card"
            :class="{ 'is-interactive': scene.interactive }"
            @click="scene.interactive && showSceneDetail(scene)"
          >
            <div class="scene-label">
              <span class="label-title">{{ scene.title }}</span>
            </div>

            <!-- 场景内容 -->
            <div class="scene-content">
              <!-- SVG 场景 -->
              <div v-if="scene.svg" class="scene-svg" v-html="scene.svg"></div>

              <!-- 人物肖像 -->
              <div v-else-if="scene.portrait" class="scene-portrait">
                <div class="portrait-frame">
                  <div class="portrait-silhouette">{{ scene.portrait.initials }}</div>
                  <h4 class="portrait-name">{{ scene.portrait.name }}</h4>
                  <p class="portrait-role">{{ scene.portrait.role }}</p>
                </div>
              </div>

              <!-- 文字场景 -->
              <div v-else-if="scene.text" class="scene-text">
                <p>{{ scene.text }}</p>
              </div>
            </div>

            <!-- 场景描述 -->
            <div class="scene-description">
              <p>{{ scene.description }}</p>
            </div>

            <!-- 场景引用 -->
            <div class="scene-quote" v-if="scene.quote">
              <p class="quote-text">"{{ scene.quote }}"</p>
              <span class="quote-source">{{ scene.quoteSource || '亚历山大·罗斯托夫' }}</span>
            </div>
          </div>
        </div>

        <!-- 年份结语 -->
        <div class="year-epilogue" v-if="selectedYearData.epilogue">
          <p>{{ selectedYearData.epilogue }}</p>
        </div>

        <!-- 年份导航 -->
        <div class="year-navigation">
          <button
            class="nav-btn prev-btn"
            :disabled="!canGoPrev"
            @click="goToPrevYear"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
            <span>{{ prevYear ? `${prevYear}年` : '上一年' }}</span>
          </button>
          <button
            class="nav-btn next-btn"
            :disabled="!canGoNext"
            @click="goToNextYear"
          >
            <span>{{ nextYear ? `${nextYear}年` : '下一年' }}</span>
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
const view = ref('timeline')
const selectedYear = ref(1922)
const visitedYears = ref([])
const showModal = ref(false)
const modalData = ref({ title: '', content: '' })

// 时代划分
const eras = [
  {
    name: '衰落',
    startYear: 1922,
    endYear: 1926,
    years: [
      {
        year: 1922,
        tag: '裁决',
        events: ['被判处软禁', '搬进阁楼房间', '失去贵族身份']
      },
      {
        year: 1923,
        tag: '适应',
        events: ['适应新生活', '建立日常规律']
      },
      {
        year: 1924,
        tag: '使命',
        events: ['开始在餐厅工作', '找到新的意义']
      },
      {
        year: 1926,
        tag: '服务',
        events: ['成为正式侍应生', '结识酒店员工']
      }
    ]
  },
  {
    name: '相遇',
    startYear: 1930,
    endYear: 1938,
    years: [
      {
        year: 1930,
        tag: '学徒',
        events: ['遇见 9 岁的 Nina', '给她万能钥匙']
      },
      {
        year: 1938,
        tag: '教育',
        events: ['Nina 17岁', '楼顶教学', '传授观察之道']
      }
    ]
  },
  {
    name: '传承',
    startYear: 1946,
    endYear: 1954,
    years: [
      {
        year: 1946,
        tag: '失去',
        events: ['Nina 离开俄罗斯', '阁楼再次安静']
      },
      {
        year: 1950,
        tag: '遗产',
        events: ['Sofia 来到酒店', '成为她的监护人']
      },
      {
        year: 1952,
        tag: '责任',
        events: ['Sofia 的母亲改嫁', '正式收养手续']
      },
      {
        year: 1953,
        tag: '家庭',
        events: ['正式收养 Sofia', '父女相称']
      },
      {
        year: 1954,
        tag: '自由',
        events: ['雪夜逃离', '前往巴黎', '重获自由']
      }
    ]
  }
]

// 年份详细数据
const yearsData = {
  1922: {
    era: '第一乐章：衰落',
    theme: '一个人可以被剥夺一切，除了他的尊严',
    background: 'linear-gradient(180deg, #f8f5f0 0%, #ede8dc 100%)',
    intro: '1922年6月21日，32岁的伯爵亚历山大·罗斯托夫站在 Bolshevik 法庭上。检察官称他为"毫无悔意的 aristocrat"（贵族）。由于一首年轻时写的诗感动了法官，他免于死刑，却被判处终身软禁在莫斯科的大都会酒店。',
    introQuote: '如果一个人不掌握自己的命运，他就会被命运所掌握。',
    events: [
      {
        title: '审判',
        description: '伯爵被判处软禁在大都会酒店，罪名是出身贵族阶级。'
      },
      {
        title: '搬迁',
        description: '从三楼的豪华套房搬到十楼的狭小阁楼房间，从400平方英尺缩减到100平方英尺。'
      },
      {
        title: '失去',
        description: '失去所有财产、爵位和社会地位，只保留几件衣物和父亲的金质雪茄盒。'
      }
    ],
    scenes: [
      {
        title: '法庭',
        svg: `<svg viewBox="0 0 200 140" class="scene-svg-scale">
          <rect x="40" y="60" width="120" height="60" fill="none" stroke="#2c3e50" stroke-width="1.5"/>
          <rect x="60" y="75" width="40" height="30" fill="#2c3e50" opacity="0.15"/>
          <text x="80" y="95" font-size="8" fill="#2c3e50" text-anchor="middle">诗歌</text>
          <circle cx="120" cy="90" r="12" fill="none" stroke="#c0392b" stroke-width="1.5"/>
          <line x1="120" y1="78" x2="120" y2="102" stroke="#c0392b" stroke-width="1.5"/>
        </svg>`,
        description: '法庭上的审判。伯爵的命运，因为一首年轻时写的诗而改变。',
        quote: '他们没有枪毙我，却判了我更重的刑罚——活着。',
        interactive: true,
        modalContent: '<p><strong>1922年6月21日</strong></p><p>法官宣读判决："亚历山大·伊里奇·罗斯托夫伯爵，由于你出身贵族阶级且毫无悔意，本庭判处你......"</p><p>但命运的转折出现了。一位年长的法官拿起伯爵年轻时写的一首诗，读了一遍，又读了一遍。</p><p>"这首诗，"他说，"里有自由的精神。所以，我们不判你死刑。你会活着，但会被囚禁在你熟悉的地方——大都会酒店。"</p><p>伯爵活了下来。但他将不再是伯爵，只是一个被困在酒店里的闲人。'
      },
      {
        title: '阁楼房间',
        svg: `<svg viewBox="0 0 200 140" class="scene-svg-scale">
          <polygon points="100,10 180,90 180,130 20,130 20,90" fill="none" stroke="#2c3e50" stroke-width="1.5"/>
          <rect x="60" y="90" width="30" height="40" fill="none" stroke="#2c3e50" stroke-width="1"/>
          <circle cx="120" cy="110" r="8" fill="#c0392b" opacity="0.2"/>
          <text x="100" y="60" font-size="8" fill="#666" text-anchor="middle">100平方英尺</text>
        </svg>`,
        description: '从400平方英尺的奢华套房，搬到100平方英尺的阁楼房间。一个贵族，被压缩成最小的存在。',
        quote: '我的房间变小了，但我的心没有。',
        interactive: false
      },
      {
        title: '亚历山大·罗斯托夫',
        portrait: {
          initials: 'AR',
          name: '亚历山大·罗斯托夫伯爵',
          role: '32岁 · 被判软禁'
        },
        description: '一个从小接受贵族教育的人，习惯了精致的餐饮、优雅的对话和特权的地位。现在，他必须从头学习如何做一个普通人。',
        quote: '我向来试图以平和的心态面对逆境。',
        interactive: false
      }
    ],
    epilogue: '这一年，伯爵失去了一切——除了他的名字和尊严。而正是这些，让他在之后的32年里，活出了真正的贵族精神。'
  },

  1930: {
    era: '第二乐章：相遇',
    theme: '当你以为人生已经定型，一个孩子会改变一切',
    background: 'linear-gradient(180deg, #faf8f3 0%, #f0ebe3 100%)',
    intro: '1930年，伯爵38岁。他已经在酒店里度过了8年，学会了侍应生的工作，适应了阁楼的生活，接受了自己从贵族到服务员的身份转变。他以为人生就这样了——安静、规律、没有波澜。',
    introQuote: '然后，一个9岁的小女孩出现了。',
    events: [
      {
        title: '初次相遇',
        description: '在酒店大堂，伯爵遇见了9岁的 Nina Kulikova —— 一个充满好奇心和冒险精神的小女孩。'
      },
      {
        title: '万能钥匙',
        description: '伯爵给了 Nina 一把能打开酒店所有门的黄铜钥匙，教她如何观察这个世界。'
      }
    ],
    scenes: [
      {
        title: '初次相遇',
        svg: `<svg viewBox="0 0 200 140" class="scene-svg-scale">
          <rect x="30" y="80" width="140" height="50" fill="none" stroke="#c0392b" stroke-width="1"/>
          <circle cx="100" cy="105" r="12" fill="#c0392b" opacity="0.3"/>
          <text x="100" y="109" font-size="14" fill="#c0392b" text-anchor="middle" font-weight="bold">N</text>
          <line x1="100" y1="40" x2="100" y2="80" stroke="#c0392b" stroke-width="1" stroke-dasharray="4"/>
          <text x="100" y="30" font-size="10" fill="#2c3e50" text-anchor="middle">9岁</text>
        </svg>`,
        description: 'Nina 就那样出现在大堂里，像一阵小风暴。她问伯爵："你是住在楼上的那个人吗？" 从此，伯爵的生活不再一样。',
        quote: '你是住在楼上的那个人吗？',
        quoteSource: 'Nina Kulikova, 9岁',
        interactive: true,
        modalContent: '<p>Nina 是酒店管理员的孩子，一个不受约束的小精灵。她在酒店的走廊里奔跑，推开每一扇门，探索每一个角落。</p><p>当她遇见伯爵时，她没有看到一个"被软禁的贵族"——她只看到一个有趣的人，一个住在楼上的神秘邻居。</p><p>"你是住在楼上的那个人吗？"她问。</p><p>伯爵愣住了。这是多年来，第一次有人纯粹地好奇他这个人，而不是他的头衔、地位或过去。</p><p>"是的，"伯爵回答，"我是。"</p><p>从此，他们成了朋友。'
      },
      {
        title: '万能钥匙',
        svg: `<svg viewBox="0 0 200 120" class="scene-svg-scale">
          <circle cx="100" cy="60" r="15" fill="none" stroke="#d4af37" stroke-width="2"/>
          <rect x="90" y="60" width="40" height="8" fill="none" stroke="#d4af37" stroke-width="1.5"/>
          <circle cx="125" cy="64" r="3" fill="#d4af37"/>
          <line x1="85" y1="60" x2="60" y2="60" stroke="#d4af37" stroke-width="1" stroke-dasharray="3"/>
        </svg>`,
        description: '一把黄铜钥匙，能打开大都会酒店的每一扇门。伯爵把它给了 Nina，也给了她探索世界的钥匙。',
        quote: '有了这把钥匙，你可以打开这里的任何一扇门。但问题是，你会选择打开哪些门？',
        interactive: true,
        modalContent: '<p>伯爵给了 Nina 一把黄铜钥匙。</p><p>"这把钥匙，"他告诉她，"能打开大都会酒店的每一扇门。你可以探索每一个房间，观察每一个角落。"</p><p>"但你要记住，"伯爵说，"世界是由房间组成的。每个房间都有它的故事，每个故事都值得被看见。"</p><p>Nina 用这把钥匙探索了整个酒店。她会在阁楼的窗户边向伯爵描述她在餐厅看到的客人，在地下室发现的老旧设备，在楼顶观察到的莫斯科街景。</p><p>通过她的眼睛，伯爵重新看见了自己生活的这个世界。'
      },
      {
        title: 'Nina Kulikova',
        portrait: {
          initials: 'NK',
          name: 'Nina Kulikova',
          role: '9岁 · 学徒'
        },
        description: '一个聪明、好奇、充满冒险精神的小女孩。她成为了伯爵的学生、朋友，也是他重新发现世界的眼睛。',
        quote: '你看，伯爵，我学会了观察。',
        interactive: false
      }
    ],
    epilogue: '这一年，38岁的伯爵遇到了9岁的 Nina。他以为自己已经失去了人生的意义，却没想到，最大的意义正等着他去发现——教会一个孩子如何观察这个世界。'
  },

  1938: {
    era: '第二乐章：相遇',
    theme: '最好的教育，不是灌输，而是点燃火焰',
    background: 'linear-gradient(180deg, #f9f6ef 0%, #f3ede2 100%)',
    intro: '1938年，Nina 17岁。8年间，伯爵和她在楼顶、在餐厅、在酒店的每个角落度过了无数时光。他教她观察、思考、理解。而她，用年轻的眼睛，让他重新看见了这个世界的美好。',
    introQuote: '如果不去观察，你就永远不会看见。',
    events: [
      {
        title: '楼顶课程',
        description: '伯爵在楼顶教 Nina 如何观察莫斯科的天际线、季节的变化、人们的故事。'
      },
      {
        title: '成长',
        description: 'Nina 从好奇的小女孩变成了有思想的年轻女性，准备去探索更大的世界。'
      }
    ],
    scenes: [
      {
        title: '楼顶课堂',
        svg: `<svg viewBox="0 0 200 140" class="scene-svg-scale">
          <rect x="40" y="100" width="120" height="30" fill="none" stroke="#d35400" stroke-width="1.5"/>
          <line x1="40" y1="100" x2="100" y2="60" stroke="#d35400" stroke-width="1"/>
          <line x1="160" y1="100" x2="100" y2="60" stroke="#d35400" stroke-width="1"/>
          <circle cx="100" cy="50" r="15" fill="none" stroke="#d35400" stroke-width="1.5"/>
          <line x1="100" y1="35" x2="100" y2="20" stroke="#d35400" stroke-width="1" stroke-dasharray="3"/>
          <text x="100" y="130" font-size="8" fill="#d35400" text-anchor="middle">观察之道</text>
        </svg>`,
        description: '在酒店楼顶，伯爵教 Nina 如何观察：不只是看见，而是理解。不只是看表面，而是看本质。这些课程，会陪伴她一生。',
        quote: '你必须学会观察。因为如果你不观察，你就永远不会看见。',
        interactive: true,
        modalContent: '<p>楼顶成了他们的课堂。</p><p>伯爵指着莫斯科的天际线："看那座建筑，那座教堂，那个街角。每个地方都有它的故事。"</p><p>"但要看见故事，"他告诉 Nina，"你必须先学会观察。"</p><p>"观察什么？" Nina 问。</p><p>"一切，"伯爵说。"人们如何行走，如何交谈。灯光如何变化，季节如何更替。细节，Nina。世界藏在细节里。"</p><p>多年后，Nina 会把这些教给她的女儿。而伯爵，会在另一个小女孩身上，继续这门课程的传承。'
      },
      {
        title: 'Nina · 1938',
        portrait: {
          initials: 'NK',
          name: 'Nina Kulikova',
          role: '17岁 · 探索者'
        },
        description: '她不再是那个在酒店大堂奔跑的小女孩，而是一个有思想、有远见的年轻女性。她准备好离开莫斯科，去看看更大的世界。',
        quote: '我学会了，这个世界很大，伯爵。而且充满奇迹。',
        interactive: false
      },
      {
        title: '传承',
        text: '观察 · 倾听 · 理解',
        description: '伯爵通过共同时光、对话和陪伴，把他的智慧传递给 Nina。不是通过说教，而是通过共同的生活。',
        quote: '教育不是注满一桶水，而是点燃一把火。',
        interactive: false
      }
    ],
    epilogue: '这一年，17岁的 Nina 准备好去探索世界。而伯爵，46岁，看着她离去，知道自己的一部分会随她而去，去到他自己永远无法到达的地方。这就是传承的喜悦，也是传承的悲伤。'
  },

  1954: {
    era: '第三乐章：传承',
    theme: '命运给我们的，往往是意想不到的礼物',
    background: 'linear-gradient(180deg, #f5f5f8 0%, #e8e8f0 100%)',
    intro: '1954年，伯爵64岁。他在大都会酒店度过了32年。他失去了一切——头衔、财产、自由。但他也得到了一切——Nina 的友谊、Sofia 的爱、作为父亲的意义。',
    introQuote: '在雪夜，他和 Sofia 推开了那扇门，走向自由。',
    events: [
      {
        title: '逃离',
        description: '在一个雪夜，伯爵和 Sofia 通过服务通道离开酒店，结束了32年的软禁。'
      },
      {
        title: '巴黎',
        description: '他们登上前往巴黎的火车，开始新的生活。Sofia 将在那里追求音乐梦想，伯爵将作为父亲陪伴她。'
      }
    ],
    scenes: [
      {
        title: '雪夜逃离',
        svg: `<svg viewBox="0 0 200 140" class="scene-svg-scale">
          <rect x="40" y="100" width="120" height="30" fill="none" stroke="#2c3e50" stroke-width="1.5"/>
          <circle cx="70" cy="85" r="15" fill="none" stroke="#2c3e50" stroke-width="1"/>
          <circle cx="130" cy="85" r="12" fill="none" stroke="#c0392b" stroke-width="1.5"/>
          <line x1="85" y1="85" x2="115" y2="85" stroke="#2c3e50" stroke-width="2"/>
          <circle cx="20" cy="40" r="2" fill="#fff" opacity="0.8"/>
          <circle cx="50" cy="30" r="1.5" fill="#fff" opacity="0.6"/>
          <circle cx="80" cy="50" r="1" fill="#fff" opacity="0.7"/>
          <circle cx="150" cy="35" r="2" fill="#fff" opacity="0.8"/>
          <circle cx="180" cy="45" r="1.5" fill="#fff" opacity="0.6"/>
        </svg>`,
        description: '雪夜。酒店的服务通道。伯爵和 Sofia 推开门，走进风雪中。32年后，他终于自由了。',
        quote: '如果一个人不掌握自己的命运，他就会被命运所掌握。',
        interactive: true,
        modalContent: '<p><strong>1954年冬，莫斯科</strong></p><p>雪下得很大。伯爵和 Sofia 站在服务通道的门口。</p><p>"准备好了吗？"伯爵问。</p><p>Sofia 点点头。她穿着厚外套，手里提着小提琴盒。</p><p>伯爵推开门。风雪扑面而来。他们走进黑夜，向着火车站走去。</p><p>他们身后，是大都会酒店——伯爵的家、监狱、宫殿、学校，32年的全部世界。</p><p>他们前方，是火车站、巴黎、自由、新生活。</p><p>伯爵64岁。他失去了一切，也得到了一切。现在，是时候离开了。'
      },
      {
        title: '礼物',
        svg: `<svg viewBox="0 0 200 120" class="scene-svg-scale">
          <rect x="60" y="40" width="80" height="60" fill="#c0392b" opacity="0.1" stroke="#c0392b" stroke-width="1.5"/>
          <line x1="100" y1="40" x2="100" y2="100" stroke="#c0392b" stroke-width="2"/>
          <line x1="60" y1="70" x2="140" y2="70" stroke="#c0392b" stroke-width="2"/>
          <circle cx="100" cy="70" r="8" fill="#c0392b"/>
        </svg>`,
        description: '在离开之前，伯爵在酒店里留下了一个小包裹。这是他最后的礼物——给一个朋友，也给他自己32年的岁月。',
        quote: '人生中失去的一切，终将以另一种方式回来。',
        interactive: false
      },
      {
        title: '亚历山大·罗斯托夫 · 1954',
        portrait: {
          initials: 'AR',
          name: '亚历山大·罗斯托夫',
          role: '64岁 · 自由人'
        },
        description: '32年前，他是一个被剥夺了一切的贵族。32年后，他是一个拥有了一切的父亲——不是血缘，而是选择。',
        quote: '这32年，我改变了很多。但最重要的是，我学会了什么是真正重要的。',
        interactive: false
      }
    ],
    epilogue: '伯爵和 Sofia 登上了前往巴黎的火车。车窗外，俄罗斯的雪原向后退去。他们面前，是新的人生。32年的软禁结束了，但伯爵获得的东西，比任何人想象的都多——一个女儿，一种使命，一种永不失去的尊严和优雅。'
  }
}

// 填充其他年份数据
const fillRemainingYears = () => {
  const years = [1923, 1924, 1926, 1946, 1950, 1952, 1953]

  years.forEach(year => {
    if (!yearsData[year]) {
      yearsData[year] = {
        era: year <= 1926 ? '第一乐章：衰落' : year <= 1938 ? '第二乐章：相遇' : '第三乐章：传承',
        theme: '时间的流逝，生命的延续',
        background: 'linear-gradient(180deg, #f8f5f0 0%, #ede8dc 100%)',
        intro: `${year}年，伯爵${year - 1922}岁。在大都会酒店的日子里，时间似乎过得很快，又似乎过得很慢。外面的世界在变化，而酒店里的生活，在某种意义上，永远停留在优雅和从容里。`,
        events: [
          {
            title: '日常',
            description: '伯爵继续他在酒店的日常生活——工作、阅读、观察、思考。'
          }
        ],
        scenes: [
          {
            title: `${year}年的一天`,
            text: '生活还在继续',
            description: '在大都会酒店里，每一天都相似，又每一天都不同。',
            quote: '时间流逝，我们必须随它而变。',
            interactive: false
          }
        ],
        epilogue: '这一年过去了。下一年还会来。这就是生活的本质——继续向前。'
      }
    }
  })
}

fillRemainingYears()

// 计算属性
const selectedYearData = computed(() => {
  return yearsData[selectedYear.value] || {}
})

const currentIndex = computed(() => {
  const allYears = eras.flatMap(era => era.years.map(y => y.year))
  return allYears.indexOf(selectedYear.value)
})

const canGoPrev = computed(() => currentIndex.value > 0)
const canGoNext = computed(() => {
  const allYears = eras.flatMap(era => era.years.map(y => y.year))
  return currentIndex.value < allYears.length - 1
})

const prevYear = computed(() => {
  if (canGoPrev.value) {
    const allYears = eras.flatMap(era => era.years.map(y => y.year))
    return allYears[currentIndex.value - 1]
  }
  return null
})

const nextYear = computed(() => {
  if (canGoNext.value) {
    const allYears = eras.flatMap(era => era.years.map(y => y.year))
    return allYears[currentIndex.value + 1]
  }
  return null
})

// 方法
const selectYear = (year) => {
  selectedYear.value = year
  if (!visitedYears.value.includes(year)) {
    visitedYears.value.push(year)
  }
  view.value = 'exhibition'
}

const backToTimeline = () => {
  view.value = 'timeline'
}

const goToPrevYear = () => {
  if (canGoPrev.value) {
    selectYear(prevYear.value)
  }
}

const goToNextYear = () => {
  if (canGoNext.value) {
    selectYear(nextYear.value)
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

// 键盘导航
onMounted(() => {
  const handleKeydown = (e) => {
    if (view.value === 'exhibition') {
      if (e.key === 'ArrowLeft' && canGoPrev.value) {
        goToPrevYear()
      } else if (e.key === 'ArrowRight' && canGoNext.value) {
        goToNextYear()
      } else if (e.key === 'Escape') {
        backToTimeline()
      }
    }
  }

  window.addEventListener('keydown', handleKeydown)

  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown)
  })
})
</script>

<style scoped>
.moscow-gentleman-world {
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
  font-family: 'Noto Serif SC', 'STSong', 'SimSun', serif;
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

.exit-btn svg {
  width: 18px;
  height: 18px;
}

/* === 时间轴视图 === */
.timeline-view {
  min-height: 100vh;
  padding: 8rem 2rem 4rem;
  background: linear-gradient(180deg, #faf8f5 0%, #f5f0e8 100%);
  display: flex;
  flex-direction: column;
}

.timeline-header {
  text-align: center;
  margin-bottom: 4rem;
}

.timeline-title {
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 500;
  color: #1a1a1a;
  margin-bottom: 0.5rem;
  letter-spacing: 0.1em;
}

.timeline-subtitle {
  font-size: clamp(1.2rem, 3vw, 1.8rem);
  font-weight: 300;
  color: #666;
  margin-bottom: 0.75rem;
  letter-spacing: 0.05em;
}

.timeline-author {
  font-size: 1rem;
  color: #888;
  margin-bottom: 1.5rem;
  font-style: italic;
}

.timeline-instruction {
  font-size: 1rem;
  color: #999;
  font-style: italic;
}

/* 时间轴容器 */
.timeline-container {
  flex: 1;
  overflow-x: auto;
  padding: 2rem 0;
  scrollbar-width: thin;
}

.timeline-container::-webkit-scrollbar {
  height: 6px;
}

.timeline-container::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.05);
}

.timeline-container::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 3px;
}

.timeline-track {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  padding: 0 2rem;
  min-width: max-content;
}

/* 时代分组 */
.timeline-era {
  position: relative;
}

.era-label {
  font-size: 1.8rem;
  font-weight: 400;
  color: #1a1a1a;
  margin-bottom: 1.5rem;
  letter-spacing: 0.15em;
  text-align: center;
}

.era-years {
  display: flex;
  align-items: center;
  gap: 2rem;
  position: relative;
}

.era-years::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: rgba(0, 0, 0, 0.15);
}

/* 时间轴节点 */
.timeline-node {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  padding: 1rem;
  transition: all 0.3s ease;
  border-radius: 12px;
}

.timeline-node:hover {
  background: rgba(0, 0, 0, 0.03);
}

.node-dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #fff;
  border: 2px solid #2c3e50;
  transition: all 0.3s ease;
  z-index: 2;
}

.timeline-node.is-active .node-dot {
  width: 24px;
  height: 24px;
  background: #2c3e50;
  border-color: #2c3e50;
  box-shadow: 0 0 0 6px rgba(44, 62, 80, 0.15);
}

.timeline-node.is-visited .node-dot {
  background: #2c3e50;
}

.node-label {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1a1a1a;
  font-family: 'Noto Serif SC', serif;
  transition: all 0.3s ease;
}

.timeline-node.is-active .node-label {
  font-size: 2rem;
}

.node-tag {
  font-size: 0.75rem;
  font-weight: 600;
  color: #666;
  letter-spacing: 0.15em;
  font-family: 'Inter', sans-serif;
}

.node-events {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255, 255, 255, 0.95);
  padding: 0.75rem 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  white-space: nowrap;
  z-index: 10;
  margin-top: 0.5rem;
}

.event-item {
  font-size: 0.8rem;
  color: #666;
  padding: 0.25rem 0;
  font-family: 'Microsoft YaHei', sans-serif;
}

/* === 年份详情视图 === */
.exhibition-view {
  min-height: 100vh;
  padding: 8rem 2rem 6rem;
  transition: background 0.5s ease;
}

.exhibition-header {
  max-width: 1000px;
  margin: 0 auto 3rem;
  display: flex;
  align-items: center;
  gap: 2rem;
}

.back-to-timeline {
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
  white-space: nowrap;
}

.back-to-timeline:hover {
  background: #1a1a1a;
  color: #fff;
}

.back-to-timeline svg {
  width: 18px;
  height: 18px;
}

.year-info {
  flex: 1;
  text-align: center;
}

.year-title {
  font-size: clamp(3rem, 8vw, 5rem);
  font-weight: 400;
  color: #1a1a1a;
  margin-bottom: 0.5rem;
  letter-spacing: 0.1em;
}

.year-era {
  font-size: 1.1rem;
  font-weight: 600;
  color: #666;
  margin: 0.25rem 0;
  letter-spacing: 0.15em;
}

.year-theme {
  font-size: 1rem;
  font-style: italic;
  color: #888;
  margin-top: 0.5rem;
}

/* 叙述性开篇 */
.year-intro {
  max-width: 800px;
  margin: 0 auto 3rem;
  text-align: center;
}

.intro-text {
  font-size: 1.15rem;
  line-height: 2;
  color: #333;
  margin-bottom: 1.5rem;
  font-family: 'Noto Serif SC', serif;
}

.intro-quote {
  font-size: 1.3rem;
  font-style: italic;
  color: #666;
  font-family: 'Noto Serif SC', serif;
  line-height: 1.8;
}

/* 关键事件时间线 */
.events-timeline {
  max-width: 900px;
  margin: 0 auto 3rem;
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
  position: relative;
}

.event-card {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2rem;
  position: relative;
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

.event-card:last-child .event-dot::after {
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
  font-family: 'Noto Serif SC', serif;
}

/* 场景网格 */
.scenes-grid {
  max-width: 1200px;
  margin: 0 auto 3rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}

.scene-card {
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  padding: 2rem;
  transition: all 0.3s ease;
  position: relative;
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
  border-color: rgba(0, 0, 0, 0.15);
}

.scene-label {
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.label-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #1a1a1a;
  font-family: 'Noto Serif SC', serif;
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

.scene-text p {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #333;
  text-align: center;
  font-style: italic;
}

/* 人物肖像 */
.portrait-frame {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.portrait-silhouette {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 1.8rem;
  font-weight: 600;
  border: 3px solid rgba(44, 62, 80, 0.2);
}

.portrait-name {
  font-size: 1.2rem;
  font-weight: 600;
  color: #1a1a1a;
  text-align: center;
  margin: 0;
}

.portrait-role {
  font-size: 0.9rem;
  color: #888;
  font-style: italic;
  text-align: center;
  margin: 0;
}

.scene-description {
  padding-top: 1rem;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
}

.scene-description p {
  font-size: 0.95rem;
  line-height: 1.8;
  color: #555;
  font-family: 'Noto Serif SC', serif;
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
  font-family: 'Noto Serif SC', serif;
}

.quote-source {
  font-size: 0.8rem;
  color: #888;
  display: block;
  text-align: right;
}

/* 年份结语 */
.year-epilogue {
  max-width: 800px;
  margin: 0 auto 3rem;
  padding: 2rem;
  background: rgba(0, 0, 0, 0.03);
  border-left: 4px solid #c0392b;
  border-radius: 8px;
}

.year-epilogue p {
  font-size: 1rem;
  line-height: 2;
  color: #555;
  font-style: italic;
  font-family: 'Noto Serif SC', serif;
  margin: 0;
}

/* 年份导航 */
.year-navigation {
  max-width: 1000px;
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

.nav-btn svg {
  width: 20px;
  height: 20px;
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

.modal-close svg {
  width: 20px;
  height: 20px;
}

.modal-title {
  font-size: 1.8rem;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 1.5rem;
  font-family: 'Noto Serif SC', serif;
}

.modal-body {
  font-size: 1.05rem;
  line-height: 2;
  color: #555;
  font-family: 'Noto Serif SC', serif;
}

.modal-body :deep(p) {
  margin-bottom: 1rem;
}

.modal-body :deep(strong) {
  font-weight: 600;
  color: #1a1a1a;
}

/* === 过渡动画 === */
.timeline-fade-enter-active,
.timeline-fade-leave-active {
  transition: opacity 0.5s ease;
}

.timeline-fade-enter-from,
.timeline-fade-leave-to {
  opacity: 0;
}

.exhibition-fade-enter-active,
.exhibition-fade-leave-active {
  transition: opacity 0.5s ease;
}

.exhibition-fade-enter-from,
.exhibition-fade-leave-to {
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
  .exhibition-header {
    flex-direction: column;
    gap: 1rem;
  }

  .back-to-timeline {
    width: 100%;
  }

  .year-title {
    font-size: 3rem;
  }

  .scenes-grid {
    grid-template-columns: 1fr;
  }

  .year-navigation {
    flex-direction: column;
  }
}
</style>

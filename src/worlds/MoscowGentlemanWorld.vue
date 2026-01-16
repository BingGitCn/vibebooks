<template>
  <div class="moscow-gentleman-world">
    <!-- 返回按钮 -->
    <button class="exit-btn" @click="exitWorld">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M19 12H5M12 19l-7-7 7-7"/>
      </svg>
      <span>Return</span>
    </button>

    <!-- === 时间轴主界面 === -->
    <transition name="timeline-fade">
      <div v-if="view === 'timeline'" class="timeline-view">
        <div class="timeline-header">
          <h1 class="timeline-title">A Gentleman in Moscow</h1>
          <p class="timeline-subtitle">1922 — 1954</p>
          <p class="timeline-instruction">Choose a year to enter the exhibition</p>
        </div>

        <!-- 时间轴 -->
        <div class="timeline-container" ref="timelineContainer">
          <div class="timeline-track">
            <div
              v-for="year in years"
              :key="year.year"
              class="timeline-node"
              :class="{ 'is-active': selectedYear === year.year, 'is-visited': visitedYears.includes(year.year) }"
              @click="selectYear(year.year)"
            >
              <div class="node-dot"></div>
              <div class="node-label">{{ year.year }}</div>
              <div class="node-tag">{{ year.tagEn }}</div>
              <div class="node-tag-ru">{{ year.tagRu }}</div>
            </div>
          </div>
        </div>

        <!-- 底部说明 -->
        <div class="timeline-footer">
          <p class="footer-text">Metropol Hotel · Moscow · 32 Years in One Building</p>
        </div>
      </div>
    </transition>

    <!-- === 展厅视图 === -->
    <transition name="exhibition-fade">
      <div v-if="view === 'exhibition'" class="exhibition-view" :style="{ background: selectedYearData.background }">
        <!-- 展厅头部 -->
        <div class="exhibition-header">
          <button class="back-to-timeline" @click="backToTimeline">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            <span>Timeline</span>
          </button>
          <div class="year-info">
            <h2 class="year-title">{{ selectedYear }}</h2>
            <p class="year-tag">{{ selectedYearData.tagEn }}</p>
            <p class="year-tag-ru">{{ selectedYearData.tagRu }}</p>
          </div>
        </div>

        <!-- 展柜网格 -->
        <div class="exhibits-grid">
          <div
            v-for="(exhibit, index) in selectedYearData.exhibits"
            :key="index"
            class="exhibit-card"
            :class="{ 'is-interactive': exhibit.interactive }"
            @click="exhibit.interactive && showExhibitDetail(exhibit)"
          >
            <!-- 展柜标题 -->
            <div class="exhibit-label">
              <span class="label-title">{{ exhibit.title }}</span>
              <span class="label-year">{{ selectedYear }}</span>
            </div>

            <!-- 展柜内容（SVG或文字） -->
            <div class="exhibit-content">
              <!-- SVG 展品 -->
              <div v-if="exhibit.svg" class="exhibit-svg" v-html="exhibit.svg"></div>

              <!-- 文字展品 -->
              <div v-else-if="exhibit.text" class="exhibit-text">
                <p>{{ exhibit.text }}</p>
              </div>

              <!-- 人物肖像 -->
              <div v-else-if="exhibit.portrait" class="exhibit-portrait">
                <div class="portrait-frame">
                  <div class="portrait-silhouette">{{ exhibit.portrait.initials }}</div>
                  <p class="portrait-name">{{ exhibit.portrait.name }}</p>
                  <p class="portrait-role">{{ exhibit.portrait.role }}</p>
                </div>
              </div>
            </div>

            <!-- 展品说明 -->
            <div class="exhibit-description" v-if="exhibit.description">
              <p>{{ exhibit.description }}</p>
            </div>

            <!-- 引用 -->
            <div class="exhibit-quote" v-if="exhibit.quote">
              <p>"{{ exhibit.quote }}"</p>
              <span class="quote-source">— {{ exhibit.quoteSource || 'Count Rostov' }}</span>
            </div>

            <!-- 交互提示 -->
            <div v-if="exhibit.interactive" class="interactive-hint">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 16v-4M12 8h.01"/>
              </svg>
              <span>Click to explore</span>
            </div>
          </div>
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
            <span>{{ prevYear }}</span>
          </button>
          <button
            class="nav-btn next-btn"
            :disabled="!canGoNext"
            @click="goToNextYear"
          >
            <span>{{ nextYear }}</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>
        </div>
      </div>
    </transition>

    <!-- === 展品详情模态框 === -->
    <transition name="modal-fade">
      <div v-if="showModal" class="exhibit-modal" @click="closeModal">
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
const view = ref('timeline') // 'timeline' | 'exhibition'
const selectedYear = ref(1922)
const visitedYears = ref([])
const showModal = ref(false)
const modalData = ref({ title: '', content: '' })

// 时间轴数据
const years = [
  {
    year: 1922,
    tagEn: 'The Sentence',
    tagRu: 'ПРИГОВОР',
    background: 'linear-gradient(180deg, #f5f0e8 0%, #e8e0d5 100%)',
    color: '#2c3e50'
  },
  {
    year: 1923,
    tagEn: 'Adjustment',
    tagRu: 'АДАПТАЦИЯ',
    background: 'linear-gradient(180deg, #f0ebe3 0%, #ddd5c8 100%)',
    color: '#34495e'
  },
  {
    year: 1924,
    tagEn: 'Purpose',
    tagRu: 'СМЫСЛ',
    background: 'linear-gradient(180deg, #ebe7de 0%, #d9cfc2 100%)',
    color: '#3d566e'
  },
  {
    year: 1926,
    tagEn: 'Service',
    tagRu: 'СЛУЖЕНИЕ',
    background: 'linear-gradient(180deg, #e8e4db 0%, #d4c9bb 100%)',
    color: '#45607a'
  },
  {
    year: 1930,
    tagEn: 'The Apprentice',
    tagRu: 'УЧЕНИК',
    background: 'linear-gradient(180deg, #f8f3ea 0%, #f0e8d8 100%)',
    color: '#c0392b' // Nina 的红色元素
  },
  {
    year: 1938,
    tagEn: 'Education',
    tagRu: 'ОБРАЗОВАНИЕ',
    background: 'linear-gradient(180deg, #f5f0e6 0%, #ece3d2 100%)',
    color: '#d35400'
  },
  {
    year: 1946,
    tagEn: 'Loss',
    tagRu: 'ПОТЕРЯ',
    background: 'linear-gradient(180deg, #ebedf0 0%, #dce0e5 100%)',
    color: '#5d6d7e'
  },
  {
    year: 1950,
    tagEn: 'Legacy',
    tagRu: 'НАСЛЕДИЕ',
    background: 'linear-gradient(180deg, #f4f0eb 0%, #e8e2da 100%)',
    color: '#7f8c8d'
  },
  {
    year: 1952,
    tagEn: 'Responsibility',
    tagRu: 'ОТВЕТСТВЕННОСТЬ',
    background: 'linear-gradient(180deg, #f0ece5 0%, #e2dbd0 100%)',
    color: '#6c7a89'
  },
  {
    year: 1953,
    tagEn: 'Family',
    tagRu: 'СЕМЬЯ',
    background: 'linear-gradient(180deg, #f8f4ef 0%, #ede8df 100%)',
    color: '#5d6d7e'
  },
  {
    year: 1954,
    tagEn: 'The Departure',
    tagRu: 'ОТЪЕЗД',
    background: 'linear-gradient(180deg, #f0f0f4 0%, #e0e0ea 100%)',
    color: '#2c3e50'
  }
]

// 每个年份的展品数据
const exhibitsData = {
  1922: [
    {
      title: 'The Tribunal',
      svg: `<svg viewBox="0 0 200 120" class="exhibit-svg-scale">
        <rect x="30" y="40" width="140" height="60" fill="none" stroke="#2c3e50" stroke-width="1"/>
        <rect x="50" y="55" width="40" height="30" fill="#2c3e50" opacity="0.1"/>
        <text x="70" y="75" font-size="8" fill="#2c3e50" text-anchor="middle">POEM</text>
        <circle cx="120" cy="70" r="15" fill="none" stroke="#c0392b" stroke-width="1.5"/>
        <line x1="120" y1="55" x2="120" y2="85" stroke="#c0392b" stroke-width="1"/>
      </svg>`,
      description: 'On June 21, 1922, the Bolshevik tribunal sentenced Count Alexander Rostov to house arrest in the Metropol Hotel.',
      quote: 'Whereas in 1910 he had been a young man of promise, in 1922 he was a thirty-two-year-old man of no account.',
      quoteSource: 'The Tribunal',
      interactive: true,
      modalContent: '<p>The Count was sentenced because he was an "unrepentant aristocrat" — but spared execution because of a poem written in his youth that was admired by the tribunal.</p><p>Instead of death, he was condemned to live in the attic room of the Metropol Hotel, watching the world change from his window.</p>'
    },
    {
      title: 'The Attic Room',
      svg: `<svg viewBox="0 0 200 140" class="exhibit-svg-scale">
        <polygon points="100,10 180,90 180,130 20,130 20,90" fill="none" stroke="#2c3e50" stroke-width="1.5"/>
        <rect x="60" y="90" width="30" height="40" fill="none" stroke="#2c3e50" stroke-width="1"/>
        <circle cx="130" cy="110" r="8" fill="none" stroke="#c0392b" stroke-width="1"/>
        <line x1="90" y1="50" x2="90" y2="80" stroke="#2c3e50" stroke-width="0.5" opacity="0.5"/>
      </svg>`,
      description: 'From his luxurious suite on the third floor, Rostov was moved to a small attic room — a reduction from 400 square feet to 100.',
      quote: 'The Count had been reduced to a life of reduced circumstances.',
      interactive: false
    },
    {
      title: 'Count Alexander Ilyich Rostov',
      portrait: {
        initials: 'AR',
        name: 'Count Alexander Rostov',
        role: 'Age 32 · The Accused'
      },
      description: 'A gentleman of the old school, accustomed to fine dining, elegant conversation, and the privileges of nobility.',
      quote: 'I am a man who has always tried to face adversity with equanimity.',
      interactive: false
    }
  ],

  1930: [
    {
      title: 'First Encounter',
      svg: `<svg viewBox="0 0 200 140" class="exhibit-svg-scale">
        <rect x="30" y="80" width="140" height="50" fill="none" stroke="#c0392b" stroke-width="1"/>
        <circle cx="100" cy="105" r="12" fill="#c0392b" opacity="0.3"/>
        <text x="100" y="109" font-size="14" fill="#c0392b" text-anchor="middle" font-weight="bold">N</text>
        <line x1="100" y1="40" x2="100" y2="80" stroke="#c0392b" stroke-width="1" stroke-dasharray="4"/>
        <text x="100" y="30" font-size="10" fill="#2c3e50" text-anchor="middle">9 years old</text>
      </svg>`,
      description: 'In 1930, a nine-year-old girl named Nina Kulikova appeared in the Metropol — curious, bold, and full of questions.',
      quote: 'Are you the man who lives upstairs?',
      quoteSource: 'Nina Kulikova, Age 9',
      interactive: true,
      modalContent: '<p>Nina was the daughter of a hotel administrator, a child who roamed the hotel with unprecedented freedom. She befriended the Count, becoming his apprentice in the art of observation.</p><p>"You must learn to look," he would tell her. "For if you do not look, you will never see."</p>'
    },
    {
      title: 'The Master Key',
      svg: `<svg viewBox="0 0 200 120" class="exhibit-svg-scale">
        <circle cx="100" cy="60" r="15" fill="none" stroke="#d4af37" stroke-width="2"/>
        <rect x="90" y="60" width="40" height="8" fill="none" stroke="#d4af37" stroke-width="1.5"/>
        <circle cx="125" cy="64" r="3" fill="#d4af37"/>
        <line x1="85" y1="60" x2="60" y2="60" stroke="#d4af37" stroke-width="1" stroke-dasharray="3"/>
      </svg>`,
      description: 'The Count gave Nina a brass key that opened every door in the hotel — teaching her that the world was full of rooms waiting to be explored.',
      quote: 'With this key, you can open any door in the Metropol. But the question is: which doors will you choose?',
      interactive: true,
      modalContent: '<p>The key became a symbol of their relationship — the Count passing on his knowledge of how to observe, how to understand, how to navigate the world.</p><p>Nina would use this key to explore the hotel, returning to tell the Count everything she had seen.</p>'
    },
    {
      title: 'Nina Kulikova',
      portrait: {
        initials: 'NK',
        name: 'Nina Kulikova',
        role: 'Age 9 · The Apprentice'
      },
      description: 'A precocious child who became the Count\'s student and companion. She taught him as much as he taught her.',
      quote: 'You see, Count, I have learned to look.',
      interactive: false
    }
  ],

  1954: [
    {
      title: 'The Final Departure',
      svg: `<svg viewBox="0 0 200 140" class="exhibit-svg-scale">
        <rect x="40" y="100" width="120" height="30" fill="none" stroke="#2c3e50" stroke-width="1.5"/>
        <circle cx="70" cy="85" r="15" fill="none" stroke="#2c3e50" stroke-width="1"/>
        <circle cx="130" cy="85" r="12" fill="none" stroke="#2c3e50" stroke-width="1"/>
        <line x1="70" y1="70" x2="70" y2="55" stroke="#2c3e50" stroke-width="1"/>
        <line x1="130" y1="70" x2="130" y2="55" stroke="#2c3e50" stroke-width="1"/>
        <path d="M70 55 L100 35 L130 55" fill="none" stroke="#2c3e50" stroke-width="1"/>
        <text x="100" y="30" font-size="8" fill="#2c3e50" text-anchor="middle">Paris</text>
      </svg>`,
      description: 'On a snowy night in 1954, the Count and Sofia escaped the Metropol — thirty-two years after his sentence began.',
      quote: 'For if a man does not master his circumstances, then he is bound to be mastered by them.',
      interactive: true,
      modalContent: '<p>The Count and Sofia escaped through the hotel\'s service entrance, leaving behind the only home Sofia had ever known, and leaving the Count a free man at last.</p><p>They boarded a train bound for Paris — where a new life awaited.</p>'
    },
    {
      title: 'The Gift',
      svg: `<svg viewBox="0 0 200 120" class="exhibit-svg-scale">
        <rect x="60" y="40" width="80" height="60" fill="#c0392b" opacity="0.1" stroke="#c0392b" stroke-width="1.5"/>
        <line x1="100" y1="40" x2="100" y2="100" stroke="#c0392b" stroke-width="2"/>
        <line x1="60" y1="70" x2="140" y2="70" stroke="#c0392b" stroke-width="2"/>
        <circle cx="100" cy="70" r="8" fill="#c0392b"/>
      </svg>`,
      description: 'The Count left behind a small package for his friend — a final act of generosity from a man who had lost everything but never lost his humanity.',
      quote: 'Whatever has been lost in the course of a lifetime, we must remember that it can always be regained.',
      interactive: false
    },
    {
      title: 'Count Alexander Rostov · 1954',
      portrait: {
        initials: 'AR',
        name: 'Count Alexander Rostov',
        role: 'Age 64 · A Free Man'
      },
      description: 'Thirty-two years after his house arrest began, the Count finally left the Metropol — not as a prisoner, but as a father.',
      quote: 'For in the span of thirty-two years, the Count had been transformed.',
      interactive: false
    }
  ]
}

// 其他年份的展品数据
exhibitsData[1923] = [
  {
    title: 'The New Routine',
    svg: `<svg viewBox="0 0 200 140" class="exhibit-svg-scale">
      <circle cx="100" cy="70" r="50" fill="none" stroke="#34495e" stroke-width="1" stroke-dasharray="5,3"/>
      <circle cx="100" cy="70" r="30" fill="none" stroke="#34495e" stroke-width="1"/>
      <line x1="100" y1="40" x2="100" y2="20" stroke="#34495e" stroke-width="1"/>
      <line x1="100" y1="100" x2="100" y2="120" stroke="#34495e" stroke-width="1"/>
      <line x1="70" y1="70" x2="50" y2="70" stroke="#34495e" stroke-width="1"/>
      <line x1="130" y1="70" x2="150" y2="70" stroke="#34495e" stroke-width="1"/>
    </svg>`,
    description: 'Rostov established a new routine in the attic — breakfast, reading, walks in the hotel, and evenings in the restaurant.',
    quote: 'In a narrow room, one\'s life becomes defined by its details.',
    interactive: false
  },
  {
    title: 'Loss of Privilege',
    portrait: {
      initials: 'AR',
      name: 'Count Alexander Rostov',
      role: 'Age 33 · Adapting'
    },
    description: 'Stripped of his titles, his suite, and his possessions, the Count began to rebuild his life with dignity and grace.',
    quote: 'One must simply fortify oneself with the knowledge that if one does not master one\'s circumstances, one is bound to be mastered by them.',
    interactive: false
  }
]

exhibitsData[1924] = [
  {
    title: 'Purpose Found',
    svg: `<svg viewBox="0 0 200 140" class="exhibit-svg-scale">
      <rect x="50" y="60" width="100" height="60" fill="none" stroke="#3d566e" stroke-width="1.5"/>
      <rect x="60" y="70" width="30" height="40" fill="#3d566e" opacity="0.1"/>
      <rect x="100" y="75" width="12" height="35" fill="#3d566e" opacity="0.1"/>
      <circle cx="120" cy="90" r="8" fill="none" stroke="#3d566e" stroke-width="1.5"/>
      <text x="100" y="50" font-size="10" fill="#3d566e" text-anchor="middle">BOYARSKY</text>
    </svg>`,
    description: 'The Count began working in the hotel\'s Boyarsky restaurant — finding purpose in service and elegance.',
    quote: 'Whether one is a prince or a pauper, a man\'s worth is measured by how he conducts himself.',
    interactive: true,
    modalContent: '<p>The Count transitioned from guest to staff, becoming a waiter in the Boyarsky — the same restaurant where he had once dined as a nobleman.</p><p>In this role, he discovered that dignity comes from within, not from external circumstances.</p>'
  },
  {
    title: 'The Restaurant',
    text: 'The Boyarsky Restaurant',
    description: 'The heart of the Metropol, where Russian aristocracy once dined, and now the Count serves with the same elegance he once exhibited as a guest.',
    quote: 'The restaurant was a stage, and every meal a performance.',
    interactive: false
  }
]

exhibitsData[1926] = [
  {
    title: 'A New Role',
    svg: `<svg viewBox="0 0 200 140" class="exhibit-svg-scale">
      <circle cx="100" cy="60" r="20" fill="none" stroke="#45607a" stroke-width="1.5"/>
      <rect x="80" y="80" width="40" height="50" fill="#45607a" opacity="0.1" stroke="#45607a" stroke-width="1"/>
      <line x1="100" y1="40" x2="100" y2="30" stroke="#45607a" stroke-width="1"/>
      <text x="100" y="25" font-size="8" fill="#45607a" text-anchor="middle">4 years</text>
    </svg>`,
    description: 'Now officially a waiter, the Count embraced his new role with characteristic grace — finding fulfillment in excellence.',
    quote: 'One\'s ambitions must be commensurate with one\'s circumstances.',
    interactive: false
  },
  {
    title: 'Friendships',
    portrait: {
      initials: 'OP',
      name: 'Osip Glebnikov',
      role: 'Hotel Manager'
    },
    description: 'The Count formed relationships with the hotel staff — finding camaraderie and respect across social boundaries.',
    quote: 'In the Metropol, everyone had a story, and every story deserved to be heard.',
    interactive: false
  }
]

exhibitsData[1938] = [
  {
    title: 'The Rooftop',
    svg: `<svg viewBox="0 0 200 140" class="exhibit-svg-scale">
      <rect x="40" y="100" width="120" height="30" fill="none" stroke="#d35400" stroke-width="1.5"/>
      <line x1="40" y1="100" x2="100" y2="60" stroke="#d35400" stroke-width="1"/>
      <line x1="160" y1="100" x2="100" y2="60" stroke="#d35400" stroke-width="1"/>
      <circle cx="100" cy="50" r="15" fill="none" stroke="#d35400" stroke-width="1.5"/>
      <line x1="100" y1="35" x2="100" y2="20" stroke="#d35400" stroke-width="1" stroke-dasharray="3"/>
    </svg>`,
    description: 'From the rooftop, the Count taught Nina to observe the world — the changing seasons, the skyline of Moscow, the passage of time.',
    quote: 'You must learn to look. For if you do not look, you will never see.',
    interactive: true,
    modalContent: '<p>The rooftop became their classroom. There, the Count taught Nina how to observe — not just to see, but to understand.</p><p>"The world is full of doors, Nina. You must choose which ones to open."</p>'
  },
  {
    title: 'Nina Kulikova · 1938',
    portrait: {
      initials: 'NK',
      name: 'Nina Kulikova',
      role: 'Age 17 · The Explorer'
    },
    description: 'Eight years after their first meeting, Nina had grown into a thoughtful young woman — the Count\'s apprentice in the art of living.',
    quote: 'I have learned that the world is wide, Count. And full of wonders.',
    interactive: false
  },
  {
    title: 'The Lessons',
    text: 'How to Observe · How to Listen · How to Live',
    description: 'The Count passed on his knowledge — not through lectures, but through shared moments, questions, and quiet companionship.',
    quote: 'Education is not the filling of a pail, but the lighting of a fire.',
    interactive: false
  }
]

exhibitsData[1946] = [
  {
    title: 'An Empty Room',
    svg: `<svg viewBox="0 0 200 140" class="exhibit-svg-scale">
      <polygon points="100,10 180,90 180,130 20,130 20,90" fill="none" stroke="#5d6d7e" stroke-width="1.5"/>
      <rect x="60" y="90" width="30" height="40" fill="none" stroke="#5d6d7e" stroke-width="1"/>
      <circle cx="120" cy="110" r="10" fill="#5d6d7e" opacity="0.1"/>
      <text x="100" y="50" font-size="8" fill="#5d6d7e" text-anchor="middle">16 years</text>
    </svg>`,
    description: 'Nina had left — married and gone to America. The attic was quiet again, but the Count was no longer alone in spirit.',
    quote: 'She had been my apprentice, but she had become my teacher.',
    interactive: true,
    modalContent: '<p>Nina Kulikova left Russia, leaving behind her daughter Sofia. In her final letter to the Count, she wrote: "You taught me how to see the world. Now I must go and see it."</p><p>The Count would not see Nina again, but her legacy — Sofia — would become his world.</p>'
  },
  {
    title: 'Anna Urbanova',
    portrait: {
      initials: 'AU',
      name: 'Anna Urbanova',
      role: 'Actress · Friend'
    },
    description: 'A famous actress who became the Count\'s companion and confidante. Their relationship was built on wit, shared history, and mutual respect.',
    quote: 'We are both prisoners of our pasts, you and I. But we have learned to make our prisons habitable.',
    interactive: false
  }
]

exhibitsData[1950] = [
  {
    title: 'Sofia Arrives',
    svg: `<svg viewBox="0 0 200 140" class="exhibit-svg-scale">
      <circle cx="60" cy="100" r="15" fill="none" stroke="#7f8c8d" stroke-width="1"/>
      <circle cx="140" cy="100" r="12" fill="none" stroke="#c0392b" stroke-width="1.5"/>
      <line x1="75" y1="100" x2="125" y2="100" stroke="#7f8c8d" stroke-width="1" stroke-dasharray="4"/>
      <text x="100" y="85" font-size="8" fill="#7f8c8d" text-anchor="middle">Mother to Daughter</text>
    </svg>`,
    description: 'Nina\'s daughter Sofia came to live in the Metropol — a new generation, a new responsibility, a new purpose.',
    quote: 'She was Nina\'s daughter. But she was also, in a way, my daughter.',
    interactive: true,
    modalContent: '<p>Nina, now in America, could not care for Sofia. The Count, now 58 years old, became the child\'s guardian.</p><p>In Sofia, he saw Nina\'s spirit — curious, bold, full of life. And he became the father he never expected to be.</p>'
  },
  {
    title: 'A New Purpose',
    portrait: {
      initials: 'SR',
      name: 'Sofia',
      role: 'Age 6 · The Legacy'
    },
    description: 'Sofia was Nina\'s daughter, but she became the Count\'s child. He raised her with the same grace, wisdom, and love he had given her mother.',
    quote: 'You are not alone, Sofia. You will never be alone.',
    interactive: false
  }
]

exhibitsData[1952] = [
  {
    title: 'Responsibility',
    svg: `<svg viewBox="0 0 200 140" class="exhibit-svg-scale">
      <rect x="50" y="60" width="100" height="70" fill="none" stroke="#6c7a89" stroke-width="1.5"/>
      <rect x="60" y="70" width="30" height="50" fill="none" stroke="#6c7a89" stroke-width="1"/>
      <rect x="110" y="75" width="25" height="45" fill="none" stroke="#6c7a89" stroke-width="1"/>
      <text x="100" y="50" font-size="8" fill="#6c7a89" text-anchor="middle">Two Beds</text>
    </svg>`,
    description: 'Sofia\'s mother married and moved away. The Count officially became Sofia\'s guardian — his attic room now a home for two.',
    quote: 'A princess does not abandon her people. And a father does not abandon his child.',
    interactive: false
  },
  {
    title: 'The Ballet',
    text: 'Sofia\'s Dream',
    description: 'Sofia showed extraordinary talent for music. The Count, with limited means, did everything to support her lessons at the Bolshoi.',
    quote: 'She had her mother\'s grace. And she had something more — a gift for music that would take her far beyond these walls.',
    interactive: false
  }
]

exhibitsData[1953] = [
  {
    title: 'Family',
    svg: `<svg viewBox="0 0 200 140" class="exhibit-svg-scale">
      <circle cx="70" cy="70" r="20" fill="none" stroke="#5d6d7e" stroke-width="1.5"/>
      <circle cx="130" cy="70" r="18" fill="none" stroke="#c0392b" stroke-width="1.5"/>
      <line x1="90" y1="70" x2="112" y2="70" stroke="#5d6d7e" stroke-width="2"/>
      <text x="100" y="110" font-size="8" fill="#5d6d7e" text-anchor="middle">Father & Daughter</text>
    </svg>`,
    description: 'The Count officially adopted Sofia. They were no longer guardian and ward — they were father and daughter.',
    quote: 'If a man does not have a family, he must create one.',
    interactive: true,
    modalContent: '<p>The adoption papers were signed. Alexander Rostov, once a count, now a former aristocrat, became legally Sofia\'s father.</p><p>It was 31 years since his house arrest began. He had lost everything — his title, his home, his possessions. But he had gained something far more valuable: a family.</p>'
  },
  {
    title: 'Sofia · 1953',
    portrait: {
      initials: 'SR',
      name: 'Sofia Rostov',
      role: 'Age 9 · A Musician'
    },
    description: 'A talented musician with a bright future. She was the Count\'s pride, his joy, his reason for living.',
    quote: 'I am not a prisoner of this hotel, Papa. I am your daughter.',
    interactive: false
  }
]

// 计算属性
const selectedYearData = computed(() => {
  return years.find(y => y.year === selectedYear.value) || years[0]
})

const currentExhibits = computed(() => {
  return exhibitsData[selectedYear.value] || []
})

const currentIndex = computed(() => {
  return years.findIndex(y => y.year === selectedYear.value)
})

const canGoPrev = computed(() => currentIndex.value > 0)
const canGoNext = computed(() => currentIndex.value < years.length - 1)

const prevYear = computed(() => {
  return canGoPrev.value ? years[currentIndex.value - 1].year : null
})

const nextYear = computed(() => {
  return canGoNext.value ? years[currentIndex.value + 1].year : null
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

const showExhibitDetail = (exhibit) => {
  modalData.value = {
    title: exhibit.title,
    content: exhibit.modalContent || exhibit.description
  }
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}

const exitWorld = () => {
  router.push('/books')
}

// 生命周期
onMounted(() => {
  // 可以在这里添加键盘导航
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
  font-family: 'Cormorant Garamond', Georgia, serif;
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
  font-family: 'Inter', sans-serif;
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
  font-weight: 400;
  color: #1a1a1a;
  margin-bottom: 0.5rem;
  letter-spacing: 0.02em;
}

.timeline-subtitle {
  font-size: clamp(1.2rem, 3vw, 1.8rem);
  font-weight: 300;
  color: #666;
  margin-bottom: 1.5rem;
  letter-spacing: 0.05em;
}

.timeline-instruction {
  font-size: 1rem;
  color: #888;
  font-style: italic;
  font-family: 'Georgia', serif;
}

/* 时间轴容器 */
.timeline-container {
  flex: 1;
  overflow-x: auto;
  padding: 2rem 0;
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
}

.timeline-container::-webkit-scrollbar {
  height: 6px;
}

.timeline-container::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 3px;
}

.timeline-container::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 3px;
}

.timeline-track {
  display: flex;
  align-items: center;
  gap: 3rem;
  padding: 0 2rem;
  min-width: max-content;
  position: relative;
}

/* 时间轴线条 */
.timeline-track::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: rgba(0, 0, 0, 0.15);
  z-index: 0;
}

/* 时间轴节点 */
.timeline-node {
  position: relative;
  z-index: 1;
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
  position: relative;
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
  font-family: 'Cormorant Garamond', serif;
  transition: all 0.3s ease;
}

.timeline-node.is-active .node-label {
  font-size: 2rem;
}

.node-tag {
  font-size: 0.75rem;
  font-weight: 600;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-family: 'Inter', sans-serif;
}

.node-tag-ru {
  font-size: 0.7rem;
  color: #999;
  font-style: italic;
}

.timeline-footer {
  text-align: center;
  padding: 2rem;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  margin-top: auto;
}

.footer-text {
  font-size: 0.9rem;
  color: #888;
  font-style: italic;
}

/* === 展厅视图 === */
.exhibition-view {
  min-height: 100vh;
  padding: 8rem 2rem 6rem;
  transition: background 0.5s ease;
}

.exhibition-header {
  max-width: 1200px;
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
  letter-spacing: 0.02em;
}

.year-tag {
  font-size: 1.2rem;
  font-weight: 300;
  color: #666;
  margin: 0.25rem 0;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.year-tag-ru {
  font-size: 1rem;
  font-style: italic;
  color: #999;
}

/* 展品网格 */
.exhibits-grid {
  max-width: 1200px;
  margin: 0 auto 3rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
}

.exhibit-card {
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

.exhibit-card.is-interactive {
  cursor: pointer;
}

.exhibit-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
  border-color: rgba(0, 0, 0, 0.15);
}

.exhibit-card.is-interactive:hover {
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
}

.exhibit-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.label-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1a1a1a;
  font-family: 'Cormorant Garamond', serif;
}

.label-year {
  font-size: 0.85rem;
  color: #999;
  font-family: 'Inter', sans-serif;
}

.exhibit-content {
  min-height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 0;
}

.exhibit-svg :deep(svg) {
  width: 100%;
  height: 100%;
}

.exhibit-text p {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #333;
  text-align: center;
  font-style: italic;
}

/* 人物肖像 */
.exhibit-portrait {
  display: flex;
  justify-content: center;
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
  font-size: 1.5rem;
  font-weight: 600;
  font-family: 'Cormorant Garamond', serif;
  border: 3px solid rgba(44, 62, 80, 0.2);
}

.portrait-name {
  font-size: 1.2rem;
  font-weight: 600;
  color: #1a1a1a;
  text-align: center;
}

.portrait-role {
  font-size: 0.9rem;
  color: #888;
  font-style: italic;
  text-align: center;
}

.exhibit-description {
  padding-top: 1rem;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
}

.exhibit-description p {
  font-size: 0.95rem;
  line-height: 1.7;
  color: #555;
  font-family: 'Georgia', serif;
}

.exhibit-quote {
  padding: 1rem;
  background: rgba(0, 0, 0, 0.03);
  border-left: 3px solid #2c3e50;
  border-radius: 4px;
}

.exhibit-quote p {
  font-size: 0.95rem;
  line-height: 1.7;
  color: #333;
  font-style: italic;
  margin-bottom: 0.5rem;
  font-family: 'Georgia', serif;
}

.quote-source {
  font-size: 0.8rem;
  color: #888;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-family: 'Inter', sans-serif;
}

.interactive-hint {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background: rgba(44, 62, 80, 0.05);
  border-radius: 6px;
  font-size: 0.8rem;
  color: #666;
  font-family: 'Inter', sans-serif;
}

.interactive-hint svg {
  width: 16px;
  height: 16px;
}

/* 年份导航 */
.year-navigation {
  max-width: 1200px;
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
.exhibit-modal {
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
  font-family: 'Cormorant Garamond', serif;
}

.modal-body {
  font-size: 1.05rem;
  line-height: 1.8;
  color: #555;
}

.modal-body :deep(p) {
  margin-bottom: 1rem;
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

  .exhibits-grid {
    grid-template-columns: 1fr;
  }

  .year-navigation {
    flex-direction: column;
  }
}
</style>

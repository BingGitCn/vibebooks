<template>
  <div class="newspaper-prototype">
    <!-- 报纸顶部 -->
    <header class="newspaper-header">
      <div class="header-top">
        <div class="header-left">
          <span class="date-line">{{ currentDate }}</span>
          <span class="price-line">定价 ¥2.00</span>
        </div>
        <div class="header-center">
          <h1 class="masthead-title">VIBE DAILY</h1>
          <p class="masthead-tagline">思想日报 · Where Stories Breathe</p>
        </div>
        <div class="header-right">
          <span class="edition-line">第 38 期</span>
          <span class="page-line">共 12 版</span>
        </div>
      </div>

      <hr class="double-divider">

      <!-- 导航栏 -->
      <nav class="paper-nav">
        <a href="#小说" class="nav-link">小说</a>
        <span class="nav-sep">|</span>
        <a href="#哲学" class="nav-link">哲学</a>
        <span class="nav-sep">|</span>
        <a href="#经济" class="nav-link">经济</a>
        <span class="nav-sep">|</span>
        <a href="#科幻" class="nav-link">科幻</a>
        <span class="nav-sep">|</span>
        <a href="#人文" class="nav-link">人文</a>
        <span class="nav-sep">|</span>
        <a href="#更多" class="nav-link">更多</a>
      </nav>

      <hr class="section-divider">
    </header>

    <!-- 主内容区：报纸式多栏布局 -->
    <main class="newspaper-content">
      <!-- 头版：左侧主内容 + 右侧边栏 -->
      <div class="front-page-layout">
        <!-- 左侧主栏 -->
        <div class="main-column">
          <!-- 头条 -->
          <section class="headline-section" v-if="headlineBook">
            <HeadlineCard :book="headlineBook" />
          </section>

          <!-- 快讯栏 -->
          <section class="quick-ticker">
            <h3 class="ticker-title">24小时快讯</h3>
            <div class="ticker-items">
              <div v-for="(item, i) in quickNews" :key="i" class="ticker-item">
                <span class="ticker-time">{{ item.time }}</span>
                <span class="ticker-text">{{ item.text }}</span>
              </div>
            </div>
          </section>

          <!-- 各个分类板块（网格布局） -->
          <section
            v-for="(section, key) in visibleSections"
            :key="key"
            :id="getSectionId(section.title)"
            class="category-section"
          >
            <div class="section-header">
              <h2 class="section-title">{{ section.title }}</h2>
              <p class="section-subtitle">{{ section.subtitle }}</p>
            </div>

            <!-- 复杂的跨栏布局 -->
            <div class="complex-grid">
              <template v-for="(book, index) in section.books" :key="book.id">
                <!-- 根据位置和分数决定布局 -->
                <div
                  v-if="shouldShowLargeCard(book, index, section.books)"
                  class="grid-span-2"
                >
                  <FeatureCard v-if="book.moodScore >= 8.0" :book="book" />
                  <ReviewCard v-else :book="book" />
                </div>

                <div
                  v-else-if="shouldShowMediumCard(book, index, section.books)"
                  class="grid-span-1-5"
                >
                  <ReviewCard :book="book" />
                </div>

                <div
                  v-else
                  class="grid-span-1"
                >
                  <StandardCard :book="book" />
                </div>
              </template>
            </div>
          </section>
        </div>

        <!-- 右侧边栏 -->
        <aside class="sidebar-column">
          <!-- 编辑推荐 -->
          <div class="sidebar-box">
            <h3 class="sidebar-title">编辑推荐</h3>
            <hr class="sidebar-divider">
            <div class="sidebar-list">
              <div
                v-for="book in editorPicks"
                :key="book.id"
                class="sidebar-item"
                @click="navigateToBook(book)"
              >
                <span class="sidebar-vol">VOL.{{ book.vol }}</span>
                <h4 class="sidebar-book-title">{{ book.title }}</h4>
                <p class="sidebar-excerpt">{{ truncate(book.featuredQuote, 50) }}</p>
                <span class="sidebar-author">{{ book.author }}</span>
              </div>
            </div>
          </div>

          <!-- 热门榜单 -->
          <div class="sidebar-box">
            <h3 class="sidebar-title">人气榜单</h3>
            <hr class="sidebar-divider">
            <div class="ranking-list">
              <div
                v-for="(book, i) in topBooks"
                :key="book.id"
                class="ranking-item"
                @click="navigateToBook(book)"
              >
                <span class="rank-number" :class="{ 'rank-top': i < 3 }">{{ i + 1 }}</span>
                <div class="rank-info">
                  <h4 class="rank-title">{{ book.title }}</h4>
                  <span class="rank-score">{{ book.moodScore }}/10</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 订阅信息 -->
          <div class="sidebar-box promo-box">
            <p class="promo-text">「让每一本书都值得被探索」</p>
            <p class="promo-sub">关注我们，发现更多好书</p>
          </div>
        </aside>
      </div>
    </main>

    <!-- 页脚 -->
    <footer class="newspaper-footer">
      <hr class="double-divider">
      <div class="footer-content">
        <div class="footer-left">
          <p class="footer-text">第 1 卷 · 第 38 期</p>
          <p class="footer-text">主编：Claude Sonnet</p>
        </div>
        <div class="footer-center">
          <p class="footer-text">© {{ currentYear }} Vibe Daily Books</p>
          <p class="footer-text">书籍 Vibe 宇宙 · 思想档案馆</p>
        </div>
        <div class="footer-right">
          <p class="footer-text">出版：每日发行</p>
          <p class="footer-text">定价：免费</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import HeadlineCard from '../components/HeadlineCard.vue'
import FeatureCard from '../components/FeatureCard.vue'
import ReviewCard from '../components/ReviewCard.vue'
import StandardCard from '../components/StandardCard.vue'
import { booksData } from '../data/books.js'

const router = useRouter()

const currentYear = ref(new Date().getFullYear())

// 分类映射
const categoryMap = {
  'FICTION': { title: '小说', subtitle: '虚构叙事的无限可能' },
  'PHILOSOPHY': { title: '哲学', subtitle: '思考生命的本质意义' },
  'ECONOMICS': { title: '经济', subtitle: '理解世界的运行逻辑' },
  'SCIENCE FICTION': { title: '科幻', subtitle: '想象未来的无限边界' },
  'MYSTERY': { title: '悬疑', subtitle: '真相与谎言的迷宫' },
  'CLASSIC': { title: '经典', subtitle: '穿越时光的永恒价值' },
  'MEMOIR': { title: '回忆录', subtitle: '真实人生的鲜活记录' },
  'ROMANCE': { title: '情感', subtitle: '爱与被爱的永恒主题' },
  'DYSTOPIAN': { title: '反乌托邦', subtitle: '黑暗中的微光' },
  'HISTORICAL MYSTERY': { title: '历史悬疑', subtitle: '揭开尘封的历史真相' },
  'WUXIA': { title: '武侠', subtitle: '江湖儿女的侠义情怀' },
  'SATIRE': { title: '讽刺', subtitle: '用幽默解构荒诞' },
  'ADVENTURE': { title: '冒险', subtitle: '勇气与成长的旅程' },
  'TRAVEL': { title: '旅行', subtitle: '在路上发现世界' }
}

// 数据
const headlineBook = ref(null)
const visibleSections = ref({})
const quickNews = ref([
  { time: '1小时前', text: '《三体》电视剧确认第二季即将开拍' },
  { time: '3小时前', text: '《我的阿勒泰》入选年度最佳治愈作品' },
  { time: '5小时前', text: '《悉达多》再版销量突破百万册' },
  { time: '8小时前', text: '《小王子》特别展览将在上海开幕' }
])
const editorPicks = ref([])
const topBooks = ref([])

// 判断是否显示大卡片（跨2栏）
function shouldShowLargeCard(book, index, books) {
  // 第一个高分书
  if (index === 0 && book.moodScore >= 8.0) return true
  // 位置2、4、6的高分书
  if ((index === 1 || index === 3 || index === 5) && book.moodScore >= 8.5) return true
  return false
}

// 判断是否显示中等卡片（跨1.5栏）
function shouldShowMediumCard(book, index, books) {
  if (book.moodScore >= 7.0 && index % 2 === 0) return true
  return false
}

// 获取版块锚点ID
function getSectionId(title) {
  return title.replace(/\s/g, '')
}

// 导航到书籍
function navigateToBook(book) {
  if (book.worldComponent) {
    const routeMap = {
      'PrinceWorld': '/world/prince',
      'MyAltayWorld': '/world/my-altay',
      'SmallIslandEconomicsWorld': '/world/small-island-economics',
      'ThreeBodyWorld': '/world/three-body',
      'IslandBookstoreWorld': '/world/island-bookstore',
    }
    const route = routeMap[book.worldComponent]
    if (route) router.push(route)
  } else {
    router.push(`/book/${book.id}`)
  }
}

function truncate(text, length) {
  if (text.length <= length) return text
  return text.substring(0, length) + '...'
}

// 组织数据
function organizeData() {
  // 找出头条（最高分）
  const sorted = [...booksData].sort((a, b) => b.moodScore - a.moodScore)
  headlineBook.value = sorted[0]

  // 按分类组织
  const sections = {}
  sorted.forEach(book => {
    const category = book.category
    if (!sections[category]) {
      sections[category] = {
        title: categoryMap[category]?.title || category,
        subtitle: categoryMap[category]?.subtitle || '',
        books: []
      }
    }
    sections[category].books.push(book)
  })

  visibleSections.value = sections

  // 编辑推荐（从高分书中选6本）
  editorPicks.value = sorted.slice(0, 8)

  // 人气榜单（按分数排序）
  topBooks.value = sorted.slice(0, 10)
}

onMounted(() => {
  organizeData()
})

// 当前日期
const currentDate = computed(() => {
  const now = new Date()
  return now.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  })
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400&family=Lora:ital,wght@0,400;0,600;1,400&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Noto+Serif+SC:wght@0,300;400;600;700&display=block');

/* ========== 全局 ========== */
.newspaper-prototype {
  min-height: 100vh;
  background: #F9F9F7;
  position: relative;
}

/* 纸张纹理 */
.newspaper-prototype::before {
  content: '';
  position: fixed;
  inset: 0;
  background-image:
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%23111111' fill-opacity='0.04' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E"),
    linear-gradient(0deg, transparent 98%, rgba(0,0,0,0.02) 100%),
    linear-gradient(90deg, transparent 98%, rgba(0,0,0,0.02) 100%);
  background-size: 4px 4px, 3px 3px, 3px 3px;
  pointer-events: none;
  z-index: 0;
}

/* ========== 报纸头 ========== */
.newspaper-header {
  background: #F5F5F3;
  border-bottom: 4px solid #111;
  position: relative;
  z-index: 1;
}

.header-top {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: 20px 32px;
  gap: 32px;
}

.date-line,
.price-line,
.edition-line,
.page-line {
  font-family: 'JetBrains Mono', monospace;
  font-size: 9px;
  font-weight: 500;
  letter-spacing: 0.1em;
  color: #525252;
  display: block;
}

.header-center {
  text-align: center;
}

.masthead-title {
  font-family: 'Playfair Display', serif;
  font-size: 52px;
  font-weight: 900;
  line-height: 1;
  color: #111;
  margin: 0 0 4px 0;
  letter-spacing: -0.03em;
}

.masthead-tagline {
  font-family: 'Noto Serif SC', serif;
  font-size: 11px;
  color: #737373;
  margin: 0;
  letter-spacing: 0.3em;
}

.double-divider {
  border: none;
  border-top: 3px solid #111;
  border-bottom: 1px solid #111;
  margin: 0;
}

/* ========== 导航栏 ========== */
.paper-nav {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 12px;
  background: #111;
  flex-wrap: wrap;
}

.nav-link {
  font-family: 'Noto Serif SC', serif;
  font-size: 11px;
  font-weight: 400;
  color: #F9F9F7;
  text-decoration: none;
  padding: 4px 12px;
  letter-spacing: 0.1em;
  transition: all 0.2s;
}

.nav-link:hover {
  color: #F9F9F7;
  text-decoration: underline;
}

.nav-sep {
  color: #737373;
  margin: 0 4px;
}

.section-divider {
  border: none;
  border-top: 1px solid #111;
  margin: 0;
}

/* ========== 主布局 ========== */
.newspaper-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0;
  position: relative;
  z-index: 1;
}

.front-page-layout {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 0;
  border-top: 1px solid #111;
  border-left: 1px solid #111;
}

/* ========== 左侧主栏 ========== */
.main-column {
  border-right: 1px solid #111;
}

.headline-section {
  border-bottom: 1px solid #111;
}

/* ========== 快讯栏 ========== */
.quick-ticker {
  padding: 16px;
  background: #F5F5F3;
  border-bottom: 1px solid #111;
}

.ticker-title {
  font-family: 'Noto Serif SC', serif;
  font-size: 13px;
  font-weight: 700;
  color: #CC0000;
  margin: 0 0 12px 0;
  letter-spacing: 0.15em;
}

.ticker-items {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.ticker-item {
  display: flex;
  gap: 12px;
  padding: 8px 0;
  border-bottom: 1px dashed #A3A3A3;
}

.ticker-item:last-child {
  border-bottom: none;
}

.ticker-time {
  font-family: 'JetBrains Mono', monospace;
  font-size: 9px;
  color: #737373;
  white-space: nowrap;
}

.ticker-text {
  font-family: 'Noto Serif SC', serif;
  font-size: 11px;
  color: #111;
  flex: 1;
}

/* ========== 分类版块 ========== */
.category-section {
  border-bottom: 1px solid #111;
}

.section-header {
  padding: 20px 20px 12px;
  background: #F5F5F3;
  border-bottom: 1px solid #111;
}

.section-title {
  font-family: 'Noto Serif SC', serif;
  font-size: 24px;
  font-weight: 700;
  color: #111;
  margin: 0 0 4px 0;
  letter-spacing: 0.1em;
}

.section-subtitle {
  font-family: 'Noto Serif SC', serif;
  font-size: 11px;
  color: #737373;
  margin: 0;
}

/* ========== 复杂网格 ========== */
.complex-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
  border-top: 1px solid #111;
  border-left: 1px solid #111;
}

.grid-span-2 {
  grid-column: span 2;
  border-right: 1px solid #111;
  border-bottom: 1px solid #111;
}

.grid-span-1-5 {
  grid-column: span 1;
  border-right: 1px solid #111;
  border-bottom: 1px solid #111;
}

.grid-span-1 {
  grid-column: span 1;
  border-right: 1px solid #111;
  border-bottom: 1px solid #111;
}

/* ========== 右侧边栏 ========== */
.sidebar-column {
  border-left: 1px solid #111;
  background: #F5F5F3;
}

.sidebar-box {
  padding: 20px;
  border-bottom: 1px solid #111;
}

.sidebar-title {
  font-family: 'Noto Serif SC', serif;
  font-size: 14px;
  font-weight: 700;
  color: #111;
  margin: 0 0 12px 0;
  letter-spacing: 0.15em;
}

.sidebar-divider {
  border: none;
  border-top: 1px solid #A3A3A3;
  margin: 0 0 16px 0;
}

/* 侧栏列表 */
.sidebar-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.sidebar-item {
  cursor: pointer;
  transition: all 0.2s;
}

.sidebar-item:hover {
  opacity: 0.7;
}

.sidebar-vol {
  font-family: 'JetBrains Mono', monospace;
  font-size: 8px;
  color: #CC0000;
  display: block;
  margin-bottom: 4px;
}

.sidebar-book-title {
  font-family: 'Noto Serif SC', serif;
  font-size: 13px;
  font-weight: 600;
  color: #111;
  margin: 0 0 6px 0;
  line-height: 1.4;
}

.sidebar-excerpt {
  font-family: 'Noto Serif SC', serif;
  font-size: 11px;
  color: #525252;
  margin: 0 0 8px 0;
  line-height: 1.5;
}

.sidebar-author {
  font-family: 'JetBrains Mono', monospace;
  font-size: 9px;
  color: #737373;
}

/* 榜单列表 */
.ranking-list {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.ranking-item {
  display: flex;
  gap: 12px;
  padding: 10px 0;
  border-bottom: 1px solid #E5E5E0;
  cursor: pointer;
  transition: all 0.2s;
}

.ranking-item:hover {
  background: rgba(0, 0, 0, 0.02);
}

.ranking-item:last-child {
  border-bottom: none;
}

.rank-number {
  font-family: 'JetBrains Mono', monospace;
  font-size: 16px;
  font-weight: 700;
  color: #E5E5E0;
  min-width: 24px;
}

.rank-number.rank-top {
  color: #CC0000;
}

.rank-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.rank-title {
  font-family: 'Noto Serif SC', serif;
  font-size: 13px;
  font-weight: 600;
  color: #111;
  margin: 0;
}

.rank-score {
  font-family: 'JetBrains Mono', monospace;
  font-size: 9px;
  color: #737373;
}

/* 推广盒子 */
.promo-box {
  text-align: center;
  padding: 24px 20px;
  background: linear-gradient(135deg, #111 0%, #333 100%);
}

.promo-text {
  font-family: 'Noto Serif SC', serif;
  font-size: 14px;
  font-weight: 700;
  color: #F9F9F7;
  margin: 0 0 8px 0;
  letter-spacing: 0.15em;
}

.promo-sub {
  font-family: 'Noto Serif SC', serif;
  font-size: 11px;
  color: #F9F9F7;
  margin: 0;
}

/* ========== 页脚 ========== */
.newspaper-footer {
  background: #F5F5F3;
  border-top: 4px solid #111;
  position: relative;
  z-index: 1;
}

.footer-content {
  max-width: 1280px;
  margin: 0 auto;
  padding: 32px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
}

.footer-text {
  font-family: 'Noto Serif SC', serif;
  font-size: 11px;
  color: #737373;
  margin: 0 0 4px 0;
  line-height: 1.6;
}

.footer-center {
  text-align: center;
}

.footer-right {
  text-align: right;
}

/* ========== 响应式 ========== */
@media (max-width: 1024px) {
  .front-page-layout {
    grid-template-columns: 1fr;
  }

  .main-column {
    border-right: none;
  }

  .sidebar-column {
    border-left: none;
    border-top: 1px solid #111;
  }

  .complex-grid {
    grid-template-columns: 1fr;
  }

  .grid-span-2,
  .grid-span-1-5,
  .grid-span-1 {
    grid-column: span 1;
    border-right: none;
  }
}

@media (max-width: 768px) {
  .header-top {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 16px;
    padding: 16px 20px;
  }

  .masthead-title {
    font-size: 36px;
  }

  .section-title {
    font-size: 20px;
  }

  .footer-content {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 24px;
    padding: 24px 16px;
  }

  .footer-right {
    text-align: center;
  }
}
</style>

<template>
  <article class="review-card" @click="handleClick">
    <!-- 报纸眉 -->
    <header class="card-masthead">
      <span class="edition-number">VOL.{{ String(book.vol).padStart(3, '0') }}</span>
      <span class="category-tag">{{ book.category }}</span>
    </header>

    <!-- 标题区 -->
    <div class="headline-section">
      <h2 class="article-title">{{ book.title }}</h2>
      <p class="subtitle" v-if="book.subtitle">{{ book.subtitle }}</p>
    </div>

    <!-- 分隔线 -->
    <div class="divider-ornament">✦ ✦ ✦</div>

    <!-- 金句 -->
    <div class="quote-section">
      <p class="quote-text">"{{ book.featuredQuote }}"</p>
    </div>

    <!-- 元数据 -->
    <div class="metadata-compact">
      <span class="meta-item">{{ book.author }}</span>
      <span class="meta-bull">•</span>
      <span class="meta-item">{{ book.tags.slice(0, 2).join(' / ') }}</span>
    </div>

    <!-- 底部 -->
    <footer class="card-footer">
      <div class="mood-mini">
        <span class="mood-dot" v-for="i in 5" :key="i" :class="{ active: i <= Math.ceil(book.moodScore / 2) }">●</span>
      </div>
      <button class="read-cta">Read →</button>
    </footer>
  </article>
</template>

<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
  book: {
    type: Object,
    required: true
  }
})

const router = useRouter()

const handleClick = () => {
  if (props.book.worldComponent) {
    const routeMap = {
      'IslandBookstoreWorld': '/world/island-bookstore',
      'MyAltayWorld': '/world/my-altay',
      'SmallIslandEconomicsWorld': '/world/small-island-economics',
      'MoonAndSixpenceWorld': '/world/moon-and-sixpence',
    }
    const route = routeMap[props.book.worldComponent]
    if (route) router.push(route)
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400&family=Lora:ital,wght@0,400;0,600;1,400&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=block');

.review-card {
  background: #F9F9F7;
  border: none;
  border-right: 1px solid #111;
  border-bottom: 1px solid #111;
  padding: 0;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  flex-direction: column;
  min-height: 320px;
}

.review-card:hover {
  background: #F5F5F3;
  box-shadow: 3px 3px 0px 0px #111;
  transform: translate(-1px, -1px);
}

/* 报纸眉 */
.card-masthead {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  background: #F5F5F3;
  border-bottom: 1px solid #111;
}

.edition-number {
  font-family: 'JetBrains Mono', monospace;
  font-size: 9px;
  font-weight: 500;
  letter-spacing: 0.1em;
  color: #737373;
}

.category-tag {
  font-family: 'Inter', sans-serif;
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.15em;
  color: #111;
}

/* 标题区 */
.headline-section {
  padding: 24px 20px 12px;
}

.article-title {
  font-family: 'Playfair Display', serif;
  font-size: 28px;
  font-weight: 700;
  line-height: 1.2;
  color: #111;
  margin: 0 0 8px 0;
  letter-spacing: -0.02em;
}

.subtitle {
  font-family: 'Lora', serif;
  font-size: 13px;
  color: #525252;
  margin: 0;
  font-style: italic;
}

/* 装饰线 */
.divider-ornament {
  text-align: center;
  padding: 8px 20px;
  font-size: 10px;
  color: #A3A3A3;
  letter-spacing: 0.3em;
  font-family: 'Playfair Display', serif;
}

/* 金句区 */
.quote-section {
  padding: 0 20px 20px;
  flex: 1;
  display: flex;
  align-items: center;
}

.quote-text {
  font-family: 'Lora', serif;
  font-size: 15px;
  line-height: 1.6;
  color: #111;
  margin: 0;
  font-style: italic;
}

/* 元数据 */
.metadata-compact {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: #F5F5F3;
  border-top: 1px solid #111;
}

.meta-item {
  font-family: 'Lora', serif;
  font-size: 11px;
  color: #111;
}

.meta-bull {
  color: #A3A3A3;
  font-size: 8px;
}

/* 底部 */
.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  background: #F5F5F3;
  border-top: 1px solid #111;
}

.mood-mini {
  display: flex;
  gap: 4px;
}

.mood-dot {
  font-size: 8px;
  color: #E5E5E0;
  transition: color 0.2s;
}

.mood-dot.active {
  color: #111;
}

.read-cta {
  font-family: 'Inter', sans-serif;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.15em;
  padding: 8px 16px;
  background: #111;
  color: #F9F9F7;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  text-transform: uppercase;
}

.read-cta:hover {
  background: #F9F9F7;
  color: #111;
}

/* 响应式 */
@media (max-width: 768px) {
  .article-title {
    font-size: 24px;
  }

  .quote-text {
    font-size: 14px;
  }
}
</style>

<template>
  <article class="feature-card" @click="handleClick">
    <!-- 报纸眉 -->
    <header class="card-masthead">
      <span class="badge-feature">◆ FEATURED STORY</span>
      <span class="edition-number">VOL.{{ String(book.vol).padStart(3, '0') }}</span>
      <span class="category-tag">{{ book.category }}</span>
    </header>

    <!-- 主内容区：左图右文 -->
    <div class="content-grid">
      <!-- 左侧：图片区（40%） -->
      <div class="image-section">
        <div class="image-frame">
          <div class="halftone-pattern"></div>
          <div class="image-symbol">{{ getSymbol(book.id) }}</div>
        </div>
        <p class="image-caption">{{ book.quote }}</p>
      </div>

      <!-- 右侧：文字内容（60%） -->
      <div class="text-section">
        <div class="headline-group">
          <span class="drop-cap">{{ book.title.charAt(0) }}</span>
          <h2 class="article-title">{{ book.title.substring(1) }}</h2>
        </div>
        <p class="subtitle">{{ book.subtitle }}</p>

        <hr class="content-divider">

        <p class="lead-text">{{ book.featuredQuote }}</p>

        <div class="metadata-compact">
          <span class="meta-author">{{ book.author }}</span>
          <span class="meta-divider">·</span>
          <span class="meta-tags">{{ book.tags.slice(0, 2).join(' · ') }}</span>
        </div>
      </div>
    </div>

    <!-- 底部行动栏 -->
    <footer class="card-footer">
      <div class="mood-indicator">
        <span class="mood-label">MOOD SCORE</span>
        <div class="mood-bar">
          <div class="mood-fill" :style="{ width: (book.moodScore * 10) + '%' }"></div>
        </div>
        <span class="mood-value">{{ book.moodScore }}/10</span>
      </div>
      <button class="read-cta">READ MORE →</button>
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

const getSymbol = (id) => {
  const symbols = {
    24: '◎',  // 百年孤独
    33: 'ॐ',  // 悉达多
    1: '⚓',  // 岛上书店
    21: '⛰',  // 我的阿勒泰
    29: '♥'   // 霍乱时期的爱情
  }
  return symbols[id] || '✦'
}

const handleClick = () => {
  if (props.book.worldComponent) {
    const routeMap = {
      'PrinceWorld': '/world/prince',
      'MyAltayWorld': '/world/my-altay',
      'SmallIslandEconomicsWorld': '/world/small-island-economics',
      'IslandBookstoreWorld': '/world/island-bookstore',
    }
    const route = routeMap[props.book.worldComponent]
    if (route) router.push(route)
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400&family=Lora:ital,wght@0,400;0,600;1,400&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=block');

.feature-card {
  background: #F9F9F7;
  border: none;
  border-right: 1px solid #111;
  border-bottom: 1px solid #111;
  padding: 0;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  flex-direction: column;
}

.feature-card:hover {
  background: #F5F5F3;
  box-shadow: 4px 4px 0px 0px #111;
  transform: translate(-2px, -2px);
}

/* 报纸眉 */
.card-masthead {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 16px;
  background: #F5F5F3;
  border-bottom: 1px solid #111;
}

.badge-feature {
  font-family: 'Inter', sans-serif;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.15em;
  color: #CC0000;
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

/* 内容网格 */
.content-grid {
  display: grid;
  grid-template-columns: 2fr 3fr;
  gap: 0;
  flex: 1;
}

/* 图片区 */
.image-section {
  padding: 20px;
  border-right: 1px solid #111;
  display: flex;
  flex-direction: column;
}

.image-frame {
  aspect-ratio: 1;
  background: #E5E5E0;
  border: 1px solid #111;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.halftone-pattern {
  position: absolute;
  inset: 0;
  background: radial-gradient(#111 1px, transparent 1px);
  opacity: 0.2;
  background-size: 8px 8px;
  transition: all 0.3s;
}

.feature-card:hover .halftone-pattern {
  opacity: 0.3;
  background-size: 12px 12px;
}

.image-symbol {
  font-size: 64px;
  color: #111;
  opacity: 0.3;
  position: relative;
  z-index: 1;
  transition: all 0.3s;
}

.feature-card:hover .image-symbol {
  opacity: 0.5;
  transform: scale(1.1);
}

.image-caption {
  font-family: 'Lora', serif;
  font-size: 11px;
  color: #737373;
  margin: 12px 0 0 0;
  font-style: italic;
  line-height: 1.4;
}

/* 文字区 */
.text-section {
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.headline-group {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin-bottom: 8px;
}

.drop-cap {
  font-family: 'Playfair Display', serif;
  font-size: 48px;
  font-weight: 900;
  line-height: 1;
  color: #CC0000;
}

.article-title {
  font-family: 'Playfair Display', serif;
  font-size: 28px;
  font-weight: 700;
  line-height: 1.1;
  color: #111;
  margin: 0;
  letter-spacing: -0.02em;
}

.subtitle {
  font-family: 'Lora', serif;
  font-size: 13px;
  color: #525252;
  margin: 0 0 16px 0;
  font-style: italic;
}

.content-divider {
  border: none;
  border-top: 1px solid #111;
  margin: 0 0 16px 0;
}

.lead-text {
  font-family: 'Lora', serif;
  font-size: 14px;
  line-height: 1.6;
  color: #111;
  margin: 0 0 20px 0;
  text-align: justify;
}

.metadata-compact {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: auto;
}

.meta-author {
  font-family: 'Lora', serif;
  font-size: 12px;
  font-weight: 600;
  color: #111;
}

.meta-divider {
  color: #A3A3A3;
  font-size: 12px;
}

.meta-tags {
  font-family: 'Inter', sans-serif;
  font-size: 10px;
  color: #737373;
  letter-spacing: 0.1em;
}

/* 底部 */
.card-footer {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 16px;
  padding: 12px 16px;
  background: #F5F5F3;
  border-top: 1px solid #111;
  align-items: center;
}

.mood-indicator {
  display: flex;
  align-items: center;
  gap: 12px;
}

.mood-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 8px;
  letter-spacing: 0.1em;
  color: #737373;
  white-space: nowrap;
}

.mood-bar {
  width: 80px;
  height: 3px;
  background: #E5E5E0;
  position: relative;
}

.mood-fill {
  height: 100%;
  background: #111;
  transition: width 0.3s;
}

.mood-value {
  font-family: 'JetBrains Mono', monospace;
  font-size: 9px;
  color: #111;
}

.read-cta {
  font-family: 'Inter', sans-serif;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.15em;
  padding: 10px 20px;
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
@media (max-width: 1024px) {
  .content-grid {
    grid-template-columns: 1fr;
  }

  .image-section {
    border-right: none;
    border-bottom: 1px solid #111;
  }

  .article-title {
    font-size: 24px;
  }

  .drop-cap {
    font-size: 40px;
  }
}

@media (max-width: 768px) {
  .card-footer {
    grid-template-columns: 1fr;
  }

  .read-cta {
    width: 100%;
  }
}
</style>

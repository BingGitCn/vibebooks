<template>
  <article class="headline-card" @click="handleClick">
    <!-- 报纸眉 -->
    <header class="card-masthead">
      <div class="masthead-left">
        <span class="badge-breaking">◆ BREAKING</span>
        <span class="edition-number">VOL.{{ String(book.vol).padStart(3, '0') }}</span>
      </div>
      <div class="masthead-right">
        <span class="category-tag">{{ book.category }}</span>
      </div>
    </header>

    <!-- 主视觉区（60%高度） -->
    <div class="hero-visual">
      <div class="visual-frame">
        <div class="visual-content">
          <div class="halftone-bg"></div>
          <div class="visual-symbol">{{ getSymbol(book.id) }}</div>
          <div class="visual-overlay">
            <p class="visual-caption">{{ book.quote }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 标题区 -->
    <div class="headline-section">
      <h1 class="article-title">
        <span class="drop-cap">{{ book.title.charAt(0) }}</span>
        {{ book.title.substring(1) }}
      </h1>
      <p class="subtitle">{{ book.subtitle }}</p>
    </div>

    <!-- 装饰线 -->
    <div class="ornament-double">✦ ✦ ✦ ✦ ✦</div>

    <!-- 导语 -->
    <div class="lead-section">
      <p class="lead-text">{{ book.featuredQuote }}</p>
    </div>

    <!-- 元数据行 -->
    <div class="metadata-row">
      <span class="metadata-item">◆ 作者：{{ book.author }}</span>
      <span class="metadata-divider">|</span>
      <span class="metadata-item">◆ {{ book.tags.join(' · ') }}</span>
      <span class="metadata-divider">|</span>
      <span class="metadata-item">◆ 情绪指数：{{ book.moodScore }}/10</span>
    </div>

    <!-- 行动栏 -->
    <footer class="card-footer">
      <button class="read-cta">
        <span class="cta-text">READ FULL STORY →</span>
      </button>
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
    37: '☊',  // 三体
    6: '★',   // 小王子
    24: '○',  // 百年孤独
    33: 'ॐ',  // 悉达多
    25: '◈'   // 其他
  }
  return symbols[id] || '✦'
}

const handleClick = () => {
  if (props.book.worldComponent) {
    const routeMap = {
      'ThreeBodyWorld': '/world/three-body',
      'PrinceWorld': '/world/prince',
      'MyAltayWorld': '/world/my-altay',
      'SmallIslandEconomicsWorld': '/world/small-island-economics',
    }
    const route = routeMap[props.book.worldComponent]
    if (route) router.push(route)
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400&family=Lora:ital,wght@0,400;0,600;1,400&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=block');

.headline-card {
  background: #F9F9F7;
  border: none;
  border-right: 1px solid #111;
  border-bottom: 1px solid #111;
  padding: 0;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
  display: flex;
  flex-direction: column;
}

.headline-card:hover {
  background: #F5F5F3;
}

/* 报纸眉 */
.card-masthead {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  background: #111;
  color: #F9F9F7;
}

.badge-breaking {
  font-family: 'Inter', sans-serif;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.15em;
  color: #CC0000;
  margin-right: 12px;
}

.edition-number {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.15em;
  color: #F9F9F7;
}

.category-tag {
  font-family: 'Inter', sans-serif;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.2em;
  color: #F9F9F7;
}

/* 主视觉区 */
.hero-visual {
  height: 280px;
  position: relative;
  overflow: hidden;
}

.visual-frame {
  width: 100%;
  height: 100%;
  position: relative;
}

.visual-content {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.halftone-bg {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(#111 1px, transparent 1px),
    linear-gradient(135deg, #E5E5E0 0%, #F5F5F3 100%);
  background-size: 12px 12px, 100% 100%;
  transition: all 0.3s;
}

.headline-card:hover .halftone-bg {
  background-size: 16px 16px, 100% 100%;
}

.visual-symbol {
  font-size: 120px;
  color: #111;
  opacity: 0.15;
  position: relative;
  z-index: 1;
  transition: all 0.3s;
}

.headline-card:hover .visual-symbol {
  opacity: 0.25;
  transform: scale(1.1);
}

.visual-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(17, 17, 17, 0.95), transparent);
  padding: 60px 20px 16px;
  z-index: 2;
}

.visual-caption {
  font-family: 'Lora', serif;
  font-size: 14px;
  color: #F9F9F7;
  margin: 0;
  font-style: italic;
  line-height: 1.5;
}

/* 标题区 */
.headline-section {
  padding: 32px 24px 16px;
}

.article-title {
  font-family: 'Playfair Display', serif;
  font-size: 56px;
  font-weight: 900;
  line-height: 0.95;
  color: #111;
  margin: 0 0 12px 0;
  letter-spacing: -0.03em;
}

.drop-cap {
  font-size: 80px;
  float: left;
  line-height: 0.8;
  padding-right: 12px;
  padding-top: 8px;
  color: #CC0000;
}

.subtitle {
  font-family: 'Lora', serif;
  font-size: 18px;
  color: #525252;
  margin: 0;
  font-style: italic;
}

/* 装饰线 */
.ornament-double {
  text-align: center;
  padding: 16px 24px;
  font-size: 14px;
  color: #A3A3A3;
  letter-spacing: 0.5em;
  font-family: 'Playfair Display', serif;
}

/* 导语 */
.lead-section {
  padding: 0 24px 24px;
}

.lead-text {
  font-family: 'Lora', serif;
  font-size: 18px;
  line-height: 1.6;
  color: #111;
  margin: 0;
  text-align: justify;
}

/* 元数据行 */
.metadata-row {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  padding: 16px 24px;
  background: #F5F5F3;
  border-top: 1px solid #111;
  border-bottom: 1px solid #111;
}

.metadata-item {
  font-family: 'Lora', serif;
  font-size: 13px;
  color: #111;
}

.metadata-divider {
  color: #A3A3A3;
}

/* 行动栏 */
.card-footer {
  padding: 20px 24px;
  background: #F5F5F3;
  display: flex;
  justify-content: center;
}

.read-cta {
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.2em;
  padding: 14px 32px;
  background: #111;
  color: #F9F9F7;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  text-transform: uppercase;
  min-height: 48px;
}

.read-cta:hover {
  background: #F9F9F7;
  color: #111;
  box-shadow: 4px 4px 0px 0px #111;
  transform: translate(-2px, -2px);
}

/* 响应式 */
@media (max-width: 1024px) {
  .article-title {
    font-size: 42px;
  }

  .drop-cap {
    font-size: 60px;
  }

  .hero-visual {
    height: 200px;
  }

  .visual-symbol {
    font-size: 80px;
  }
}

@media (max-width: 768px) {
  .card-masthead {
    flex-direction: column;
    gap: 8px;
    text-align: center;
  }

  .article-title {
    font-size: 32px;
  }

  .drop-cap {
    font-size: 48px;
  }

  .metadata-row {
    flex-direction: column;
    gap: 8px;
  }

  .metadata-divider {
    display: none;
  }
}
</style>

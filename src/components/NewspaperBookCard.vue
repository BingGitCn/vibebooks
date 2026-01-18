<template>
  <article class="newspaper-card" @click="handleClick">
    <!-- 报纸眉 - Newspaper Header -->
    <header class="card-masthead">
      <div class="masthead-left">
        <span class="edition-number">VOL.{{ book.vol }}</span>
      </div>
      <div class="masthead-center">
        <span class="category-tag">{{ book.category }}</span>
      </div>
      <div class="masthead-right">
        <div class="confidence-dots">
          <span v-for="i in 5" :key="i" :class="{ filled: i <= confidence }">■</span>
        </div>
      </div>
    </header>

    <!-- 分隔线 -->
    <hr class="section-divider">

    <!-- 主标题区 - Headline with Drop Cap -->
    <div class="headline-section">
      <h1 class="article-title">
        <span class="drop-cap">{{ book.title.charAt(0) }}</span>
        {{ book.title.substring(1) }}
      </h1>
      <p class="subtitle">{{ book.subtitle }}</p>
    </div>

    <!-- 装饰线 -->
    <div class="ornament">✦ ✦ ✦</div>

    <!-- 导语 - Lead Paragraph -->
    <div class="lead-paragraph">
      <p class="lead-text">{{ book.featuredQuote }}</p>
    </div>

    <!-- 配图区 - Image Area -->
    <div class="image-area">
      <div class="image-placeholder">
        <div class="image-frame">
          <div class="halftone-pattern"></div>
          <div class="caption-overlay">
            <p class="image-caption">{{ book.quote }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 元数据栏 - Metadata Bar -->
    <div class="metadata-bar">
      <div class="metadata-item">
        <span class="metadata-label">AUTHOR</span>
        <span class="metadata-value">{{ book.author }}</span>
      </div>
      <div class="metadata-item">
        <span class="metadata-label">VIBE</span>
        <span class="metadata-value">{{ book.vibeDescription }}</span>
      </div>
      <div class="metadata-item">
        <span class="metadata-label">MOOD</span>
        <span class="metadata-value">{{ book.moodScore }}/10</span>
      </div>
    </div>

    <!-- 标签云 - Tag Cloud -->
    <div class="tag-cloud" v-if="book.tags && book.tags.length">
      <span v-for="(tag, i) in book.tags" :key="i" class="tag-pill">{{ tag }}</span>
    </div>

    <!-- 分隔线 -->
    <hr class="section-divider">

    <!-- 行动栏 - Action Bar -->
    <footer class="card-footer">
      <div class="reading-progress">
        <div class="progress-label">READING PROGRESS</div>
        <div class="progress-track">
          <div class="progress-fill" :style="{ width: '0%' }"></div>
        </div>
      </div>
      <button class="read-cta" @click.stop="handleRead">
        <span class="cta-text">READ ENTRY →</span>
      </button>
    </footer>
  </article>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  book: {
    type: Object,
    required: true
  }
})

const router = useRouter()

// 情绪分数转换为信心点数
const confidence = computed(() => {
  return Math.ceil(props.book.moodScore / 2)
})

const handleClick = () => {
  // 卡片整体点击也可以触发
  handleRead()
}

const handleRead = () => {
  if (props.book.worldComponent) {
    // 如果有专属世界，跳转到沉浸式页面
    const routeMap = {
      'PrinceWorld': '/world/prince',
      'MyAltayWorld': '/world/my-altay',
      'SmallIslandEconomicsWorld': '/world/small-island-economics',
      // 可以继续添加其他映射
    }

    const route = routeMap[props.book.worldComponent]
    if (route) {
      router.push(route)
    }
  } else {
    // 否则跳转到通用书籍详情页
    router.push(`/book/${props.book.id}`)
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400&family=Lora:ital,wght@0,400;0,600;1,400&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=block');

/* ========== 基础样式 ========== */
.newspaper-card {
  background: #F9F9F7;
  border: 1px solid #111111;
  padding: 0;
  cursor: pointer;
  transition: all 0.2s ease-out;
  position: relative;
}

.newspaper-card:hover {
  box-shadow: 4px 4px 0px 0px #111111;
  transform: translate(-2px, -2px);
  background: #F5F5F3;
}

/* 报纸纹理背景 */
.newspaper-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(0deg, transparent 98%, rgba(0,0,0,0.02) 100%),
    linear-gradient(90deg, transparent 98%, rgba(0,0,0,0.02) 100%);
  background-size: 3px 3px;
  pointer-events: none;
  opacity: 0.3;
}

/* ========== 报纸眉 ========== */
.card-masthead {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 2px solid #111111;
  background: #F5F5F3;
  position: relative;
  z-index: 1;
}

.edition-number {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.15em;
  color: #111111;
}

.category-tag {
  font-family: 'Inter', sans-serif;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.2em;
  color: #CC0000;
  text-transform: uppercase;
}

.confidence-dots {
  display: flex;
  gap: 2px;
  justify-content: flex-end;
}

.confidence-dots span {
  font-size: 8px;
  color: #E5E5E0;
  transition: color 0.2s;
}

.confidence-dots span.filled {
  color: #111111;
}

/* ========== 分隔线 ========== */
.section-divider {
  border: none;
  border-top: 1px solid #111111;
  margin: 0;
}

/* ========== 标题区 ========== */
.headline-section {
  padding: 24px 24px 16px;
  position: relative;
  z-index: 1;
}

.article-title {
  font-family: 'Playfair Display', serif;
  font-size: 32px;
  font-weight: 700;
  line-height: 1;
  color: #111111;
  margin: 0 0 8px 0;
  letter-spacing: -0.02em;
}

.drop-cap {
  font-size: 56px;
  float: left;
  line-height: 0.85;
  padding-right: 8px;
  padding-top: 4px;
  font-family: 'Playfair Display', serif;
  color: #CC0000;
  font-weight: 900;
}

.subtitle {
  font-family: 'Lora', serif;
  font-size: 14px;
  font-style: italic;
  color: #525252;
  margin: 0;
  line-height: 1.4;
}

/* ========== 装饰元素 ========== */
.ornament {
  text-align: center;
  padding: 12px 24px;
  font-size: 12px;
  color: #A3A3A3;
  letter-spacing: 0.5em;
  font-family: 'Playfair Display', serif;
  position: relative;
  z-index: 1;
}

/* ========== 导语 ========== */
.lead-paragraph {
  padding: 0 24px 20px;
  position: relative;
  z-index: 1;
}

.lead-text {
  font-family: 'Lora', serif;
  font-size: 15px;
  line-height: 1.6;
  color: #111111;
  margin: 0;
  text-align: justify;
}

/* ========== 配图区 ========== */
.image-area {
  padding: 0 24px 20px;
  position: relative;
  z-index: 1;
}

.image-placeholder {
  width: 100%;
  aspect-ratio: 3 / 2;
  background: #E5E5E0;
  border: 1px solid #111111;
  position: relative;
  overflow: hidden;
}

.image-frame {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.halftone-pattern {
  position: absolute;
  inset: 0;
  background: radial-gradient(#111 1px, transparent 1px);
  opacity: 0.15;
  background-size: 8px 8px;
  transition: all 0.3s;
}

.newspaper-card:hover .halftone-pattern {
  opacity: 0.25;
  background-size: 12px 12px;
}

.caption-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(17, 17, 17, 0.9), transparent);
  padding: 32px 16px 12px;
}

.image-caption {
  font-family: 'Lora', serif;
  font-size: 12px;
  color: #F9F9F7;
  margin: 0;
  font-style: italic;
  line-height: 1.4;
}

/* ========== 元数据栏 ========== */
.metadata-bar {
  display: flex;
  gap: 24px;
  padding: 16px 24px;
  background: #F5F5F3;
  border-top: 1px solid #111111;
  border-bottom: 1px solid #111111;
  flex-wrap: wrap;
  position: relative;
  z-index: 1;
}

.metadata-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.metadata-label {
  font-family: 'Inter', sans-serif;
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.15em;
  color: #737373;
}

.metadata-value {
  font-family: 'Lora', serif;
  font-size: 13px;
  color: #111111;
}

/* ========== 标签云 ========== */
.tag-cloud {
  padding: 16px 24px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  position: relative;
  z-index: 1;
}

.tag-pill {
  font-family: 'Inter', sans-serif;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.1em;
  padding: 4px 10px;
  background: transparent;
  border: 1px solid #111111;
  color: #111111;
  transition: all 0.2s;
}

.newspaper-card:hover .tag-pill {
  background: #111111;
  color: #F9F9F7;
}

/* ========== 行动栏 ========== */
.card-footer {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 16px;
  padding: 16px 24px;
  align-items: center;
  background: #F5F5F3;
  position: relative;
  z-index: 1;
}

.reading-progress {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.progress-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 8px;
  letter-spacing: 0.15em;
  color: #737373;
}

.progress-track {
  width: 100%;
  height: 4px;
  background: #E5E5E0;
  position: relative;
}

.progress-fill {
  height: 100%;
  background: #111111;
  transition: width 0.3s;
}

.read-cta {
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.15em;
  padding: 10px 20px;
  background: #111111;
  color: #F9F9F7;
  border: 1px solid #111111;
  cursor: pointer;
  transition: all 0.2s;
  text-transform: uppercase;
  min-width: 140px;
  min-height: 44px;
}

.read-cta:hover {
  background: #F9F9F7;
  color: #111111;
}

/* ========== 响应式 ========== */
@media (max-width: 640px) {
  .article-title {
    font-size: 24px;
  }

  .drop-cap {
    font-size: 42px;
  }

  .card-masthead {
    padding: 10px 12px;
  }

  .headline-section {
    padding: 20px 16px 12px;
  }

  .lead-paragraph {
    padding: 0 16px 16px;
  }

  .image-area {
    padding: 0 16px 16px;
  }

  .metadata-bar {
    padding: 12px 16px;
    gap: 16px;
  }

  .card-footer {
    grid-template-columns: 1fr;
    padding: 12px 16px;
  }

  .read-cta {
    width: 100%;
  }
}
</style>

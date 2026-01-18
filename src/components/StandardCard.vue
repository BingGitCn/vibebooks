<template>
  <article class="standard-card" @click="handleClick">
    <!-- 报纸眉 -->
    <header class="card-masthead">
      <span class="edition-tiny">{{ String(book.vol).padStart(3, '0') }}</span>
      <span class="category-tiny">{{ book.category }}</span>
    </header>

    <!-- 内容区 -->
    <div class="card-content">
      <h3 class="card-title">{{ book.title }}</h3>
      <p class="card-subtitle" v-if="book.subtitle">{{ book.subtitle }}</p>

      <!-- 简短金句 -->
      <p class="card-quote">{{ truncate(book.featuredQuote, 60) }}</p>

      <!-- 标签 -->
      <div class="card-tags">
        <span v-for="(tag, i) in book.tags.slice(0, 2)" :key="i" class="tag-mini">{{ tag }}</span>
      </div>
    </div>

    <!-- 底部 -->
    <footer class="card-footer-mini">
      <span class="author-tiny">{{ book.author }}</span>
      <span class="cta-arrow">→</span>
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

const truncate = (text, length) => {
  if (text.length <= length) return text
  return text.substring(0, length) + '...'
}

const handleClick = () => {
  if (props.book.worldComponent) {
    const routeMap = {
      'PrinceWorld': '/world/prince',
      'MyAltayWorld': '/world/my-altay',
      'SmallIslandEconomicsWorld': '/world/small-island-economics',
    }
    const route = routeMap[props.book.worldComponent]
    if (route) router.push(route)
  } else {
    router.push(`/book/${props.book.id}`)
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400&family=Lora:ital,wght@0,400;0,600;1,400&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=block');

.standard-card {
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

.standard-card:hover {
  background: #F5F5F3;
}

/* 报纸眉 */
.card-masthead {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 12px;
  background: #F5F5F3;
  border-bottom: 1px solid #111;
}

.edition-tiny {
  font-family: 'JetBrains Mono', monospace;
  font-size: 8px;
  font-weight: 500;
  letter-spacing: 0.1em;
  color: #737373;
}

.category-tiny {
  font-family: 'Inter', sans-serif;
  font-size: 8px;
  font-weight: 600;
  letter-spacing: 0.15em;
  color: #111;
}

/* 内容区 */
.card-content {
  padding: 16px 12px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.card-title {
  font-family: 'Playfair Display', serif;
  font-size: 18px;
  font-weight: 700;
  line-height: 1.3;
  color: #111;
  margin: 0 0 4px 0;
}

.card-subtitle {
  font-family: 'Lora', serif;
  font-size: 11px;
  color: #525252;
  margin: 0 0 12px 0;
  font-style: italic;
}

.card-quote {
  font-family: 'Lora', serif;
  font-size: 12px;
  line-height: 1.5;
  color: #111;
  margin: 0 0 12px 0;
  font-style: italic;
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: auto;
}

.tag-mini {
  font-family: 'Inter', sans-serif;
  font-size: 8px;
  font-weight: 500;
  letter-spacing: 0.1em;
  padding: 3px 6px;
  background: transparent;
  border: 1px solid #A3A3A3;
  color: #737373;
}

.standard-card:hover .tag-mini {
  background: #111;
  color: #F9F9F7;
  border-color: #111;
}

/* 底部 */
.card-footer-mini {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background: #F5F5F3;
  border-top: 1px solid #111;
}

.author-tiny {
  font-family: 'Lora', serif;
  font-size: 10px;
  color: #737373;
}

.cta-arrow {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: #111;
  font-weight: 700;
}

/* 响应式 */
@media (max-width: 768px) {
  .card-title {
    font-size: 16px;
  }
}
</style>

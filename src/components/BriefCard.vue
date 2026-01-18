<template>
  <article class="brief-card" @click="handleClick">
    <!-- 报纸眉 -->
    <header class="card-masthead">
      <span class="brief-vol">{{ String(book.vol).padStart(3, '0') }}</span>
      <span class="brief-cat">{{ getCategoryAbbr(book.category) }}</span>
    </header>

    <!-- 内容区 -->
    <div class="brief-content">
      <h4 class="brief-title">{{ book.title }}</h4>
      <p class="brief-quote">{{ truncate(book.featuredQuote, 40) }}</p>
      <p class="brief-author">{{ book.author }} →</p>
    </div>
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

const getCategoryAbbr = (category) => {
  const abbrs = {
    'FICTION': 'FIC',
    'PHILOSOPHY': 'PHIL',
    'ECONOMICS': 'ECO',
    'MYSTERY': 'MYS',
    'ROMANCE': 'ROM',
    'CLASSIC': 'CLS'
  }
  return abbrs[category] || category.substring(0, 3)
}

const handleClick = () => {
  if (props.book.worldComponent) {
    const routeMap = {
      'PrinceWorld': '/world/prince',
      'ThreeBodyWorld': '/world/three-body',
      'WhiteNightWorld': '/world/white-night',
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

.brief-card {
  background: #F9F9F7;
  border: none;
  border-right: 1px solid #111;
  border-bottom: 1px solid #111;
  padding: 0;
  cursor: pointer;
  transition: all 0.2s;
}

.brief-card:hover {
  background: #F5F5F3;
}

/* 报纸眉 */
.card-masthead {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 10px;
  background: #F5F5F3;
  border-bottom: 1px solid #111;
}

.brief-vol {
  font-family: 'JetBrains Mono', monospace;
  font-size: 7px;
  font-weight: 500;
  letter-spacing: 0.1em;
  color: #737373;
}

.brief-cat {
  font-family: 'Inter', sans-serif;
  font-size: 7px;
  font-weight: 600;
  letter-spacing: 0.15em;
  color: #111;
}

/* 内容区 */
.brief-content {
  padding: 12px 10px;
}

.brief-title {
  font-family: 'Playfair Display', serif;
  font-size: 14px;
  font-weight: 700;
  line-height: 1.3;
  color: #111;
  margin: 0 0 6px 0;
}

.brief-quote {
  font-family: 'Lora', serif;
  font-size: 10px;
  line-height: 1.4;
  color: #111;
  margin: 0 0 8px 0;
  font-style: italic;
}

.brief-author {
  font-family: 'JetBrains Mono', monospace;
  font-size: 8px;
  color: #737373;
  margin: 0;
  letter-spacing: 0.1em;
}

/* 响应式 */
@media (max-width: 768px) {
  .brief-title {
    font-size: 13px;
  }
}
</style>

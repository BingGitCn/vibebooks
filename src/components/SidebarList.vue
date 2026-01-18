<template>
  <aside class="sidebar-list">
    <!-- 侧栏标题 -->
    <header class="sidebar-header">
      <h3 class="sidebar-title">IN BRIEF</h3>
      <p class="sidebar-subtitle">Quick Reads</p>
      <hr class="sidebar-divider">
    </header>

    <!-- 简讯列表 -->
    <div class="brief-items">
      <article
        v-for="book in books"
        :key="book.id"
        class="brief-item"
        @click="handleClick(book)"
      >
        <div class="brief-meta">
          <span class="brief-vol">{{ String(book.vol).padStart(3, '0') }}</span>
          <span class="brief-cat">{{ book.category }}</span>
        </div>
        <h4 class="brief-title">{{ book.title }}</h4>
        <p class="brief-quote">{{ truncate(book.featuredQuote, 50) }}</p>
        <div class="brief-arrow">→</div>
      </article>
    </div>
  </aside>
</template>

<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
  books: {
    type: Array,
    required: true
  }
})

const router = useRouter()

const truncate = (text, length) => {
  if (text.length <= length) return text
  return text.substring(0, length) + '...'
}

const handleClick = (book) => {
  if (book.worldComponent) {
    const routeMap = {
      'PrinceWorld': '/world/prince',
      'ThreeBodyWorld': '/world/three-body',
    }
    const route = routeMap[book.worldComponent]
    if (route) router.push(route)
  } else {
    router.push(`/book/${book.id}`)
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400&family=Lora:ital,wght@0,400;0,600;1,400&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=block');

.sidebar-list {
  background: #F9F9F7;
  border: none;
  border-right: 1px solid #111;
  border-bottom: 1px solid #111;
  height: 100%;
  display: flex;
  flex-direction: column;
}

/* 侧栏标题 */
.sidebar-header {
  padding: 16px 12px;
  background: #111;
  color: #F9F9F7;
  text-align: center;
}

.sidebar-title {
  font-family: 'Playfair Display', serif;
  font-size: 14px;
  font-weight: 700;
  color: #F9F9F7;
  margin: 0 0 2px 0;
  letter-spacing: 0.2em;
}

.sidebar-subtitle {
  font-family: 'Inter', sans-serif;
  font-size: 8px;
  font-weight: 500;
  color: #A3A3A3;
  margin: 0 0 12px 0;
  letter-spacing: 0.15em;
}

.sidebar-divider {
  border: none;
  border-top: 1px solid #F9F9F7;
  margin: 0;
}

/* 简讯列表 */
.brief-items {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.brief-item {
  padding: 16px 12px;
  border-bottom: 1px solid #111;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
}

.brief-item:last-child {
  border-bottom: none;
}

.brief-item:hover {
  background: #F5F5F3;
}

.brief-item:hover .brief-arrow {
  opacity: 1;
  transform: translateX(4px);
}

.brief-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.brief-vol {
  font-family: 'JetBrains Mono', monospace;
  font-size: 8px;
  font-weight: 500;
  letter-spacing: 0.1em;
  color: #737373;
}

.brief-cat {
  font-family: 'Inter', sans-serif;
  font-size: 8px;
  font-weight: 600;
  letter-spacing: 0.15em;
  color: #CC0000;
}

.brief-title {
  font-family: 'Playfair Display', serif;
  font-size: 13px;
  font-weight: 700;
  line-height: 1.3;
  color: #111;
  margin: 0 0 8px 0;
}

.brief-quote {
  font-family: 'Lora', serif;
  font-size: 11px;
  line-height: 1.4;
  color: #525252;
  margin: 0 0 8px 0;
  font-style: italic;
}

.brief-arrow {
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  color: #111;
  font-weight: 700;
  position: absolute;
  right: 12px;
  bottom: 16px;
  opacity: 0;
  transition: all 0.2s;
}

/* 响应式 */
@media (max-width: 768px) {
  .sidebar-header {
    padding: 12px 10px;
  }

  .sidebar-title {
    font-size: 12px;
  }

  .brief-item {
    padding: 12px 10px;
  }

  .brief-title {
    font-size: 12px;
  }

  .brief-quote {
    font-size: 10px;
  }
}
</style>

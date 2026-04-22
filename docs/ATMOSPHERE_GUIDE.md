# 氛围与意境系统使用指南

> 让 vibeBooks 更有诗意、情绪层次和意境感受

---

## 🎨 概述

氛围系统是一套用于营造诗意、情绪化用户体验的工具集合，包含：

- **氛围样式** (`atmosphere.css`) - 光影、粒子、渐变效果
- **氛围 Composable** (`useAtmosphere.js`) - 交互式氛围控制
- **诗意组件** - 文字、卡片、过渡组件

---

## ✨ 核心特性

### 1. 光影呼吸系统
营造柔和的光晕效果，让页面"呼吸"

### 2. 情绪化渐变
不同书籍分类使用不同的情绪色调

### 3. 诗意粒子效果
星尘、光点等浮动粒子，营造梦幻感

### 4. 情绪化过渡
页面切换、元素展示的温柔过渡动画

### 5. 诗意文字排版
增强文字的情绪表达和视觉层次

---

## 🚀 快速开始

### 1. 引入氛围样式

在任何 Vue 组件中：

```vue
<style scoped>
@import '@/styles/atmosphere.css';
</style>
```

### 2. 使用氛围 Composable

```vue
<script setup>
import { useAtmosphere } from '@/composables/useAtmosphere'

const {
  initScrollReveal,    // 滚动揭示动画
  createLightPoints,   // 创建光点粒子
  revealText,          // 文字逐字揭示
  poeticEnter          // 诗意入场
} = useAtmosphere()

onMounted(() => {
  initScrollReveal()
})
</script>
```

### 3. 添加氛围元素

```vue
<template>
  <div class="my-page">
    <!-- 星尘效果 -->
    <div class="stardust-overlay"></div>

    <!-- 光点容器 -->
    <div ref="lightPointsContainer" class="light-points"></div>

    <!-- 内容 -->
    <div class="content scroll-reveal">
      内容会在滚动时优雅地出现
    </div>
  </div>
</template>
```

---

## 🎭 组件使用

### AtmosphericCard - 情绪化卡片

```vue
<template>
  <AtmosphericCard
    mood="warm"
    :clickable="true"
    :show-corners="true"
    glow-color="rgba(255, 48, 0, 0.15)"
    @click="handleCardClick"
  >
    <h3>卡片标题</h3>
    <p>卡片内容</p>
  </AtmosphericCard>
</template>

<script setup>
import AtmosphericCard from '@/components/AtmosphericCard.vue'

const handleCardClick = () => {
  console.log('卡片被点击')
}
</script>
```

**Props:**
- `mood`: 情绪模式 (`'neutral' | 'warm' | 'calm' | 'mystery' | 'deep'`)
- `clickable`: 是否可点击
- `showCorners`: 是否显示装饰角落
- `glowColor`: 光晕颜色

### PoeticText - 诗意文字

```vue
<template>
  <PoeticText
    text="每一本书，都值得被探索"
    tag="h1"
    variant="glow"
    :char-delay="50"
    letter-spacing="0.15em"
    font-weight="700"
    :italic="true"
  />
</template>

<script setup>
import PoeticText from '@/components/PoeticText.vue'
</script>
```

**Props:**
- `text`: 要显示的文字
- `tag`: HTML 标签
- `variant`: 动画变体 (`'default' | 'glow' | 'float' | 'wave'`)
- `charDelay`: 每个字的延迟（毫秒）
- `letterSpacing`: 字间距
- `fontWeight`: 字重
- `italic`: 是否斜体

### AtmosphericTransition - 页面过渡

```vue
<template>
  <AtmosphericTransition>
    <router-view />
  </AtmosphericTransition>
</template>

<script setup>
import AtmosphericTransition from '@/components/AtmosphericTransition.vue'
</script>
```

---

## 🎨 样式类

### 氛围光晕

```html
<div class="atmosphere-glow">
  内容会有柔和的光晕背景
</div>
```

### 文字光晕

```html
<h1 class="text-glow">
  这个标题会呼吸
</h1>
```

### 情绪化渐变背景

```html
<!-- 温暖渐变 - 治愈系 -->
<div class="gradient-warm">...</div>

<!-- 宁静渐变 - 哲学类 -->
<div class="gradient-calm">...</div>

<!-- 神秘渐变 - 悬疑类 -->
<div class="gradient-mystery">...</div>

<!-- 深邃渐变 - 经典类 -->
<div class="gradient-deep">...</div>
```

### 诗意装饰

```html
<!-- 诗意分隔线 -->
<div class="poetic-divider"></div>

<!-- 角落装饰 -->
<div class="corner-decoration top-left"></div>
<div class="corner-decoration bottom-right"></div>
```

---

## 🔧 Composable API

### useAtmosphere()

```javascript
const {
  isRevealed,           // 是否已揭示
  scrollProgress,       // 滚动进度
  initScrollReveal,     // 初始化滚动揭示
  initScrollProgress,   // 初始化滚动进度
  createLightPoints,    // 创建光点粒子
  revealText,           // 文字逐字揭示
  initCursorGlow,       // 初始化光标光晕
  poeticEnter,          // 诗意入场
  poeticCardHover       // 诗意卡片悬停
} = useAtmosphere()
```

### useEmotionalTransition()

```javascript
const {
  isTransitioning,      // 是否正在过渡
  gentleTransition      // 温柔过渡
} = useEmotionalTransition()

// 使用
await gentleTransition(() => {
  router.push('/new-page')
})
```

### usePoeticTime()

```javascript
const {
  poeticYear,           // 诗意年份表达
  readingTime           // 阅读时间估算
} = usePoeticTime()

// 示例
poeticYear(1943)  // -> "许久以前"
readingTime(5000) // -> "25分钟"
```

---

## 📖 实践示例

### 示例 1: 书籍章节页

```vue
<template>
  <div class="chapter-page">
    <!-- 氛围效果 -->
    <div class="stardust-overlay"></div>
    <div ref="lightPoints" class="light-points"></div>

    <!-- 页面头部 -->
    <header class="scroll-reveal">
      <h1 class="poetic-title text-glow">CHAPTER 01</h1>
      <p class="emotional-subtitle">治愈系小说</p>
      <div class="poetic-divider"></div>
    </header>

    <!-- 书籍列表 -->
    <div class="books-grid">
      <AtmosphericCard
        v-for="book in books"
        :key="book.id"
        mood="warm"
        class="scroll-reveal"
        @click="goToBook(book)"
      >
        <h3>{{ book.title }}</h3>
        <p>{{ book.author }}</p>
      </AtmosphericCard>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAtmosphere } from '@/composables/useAtmosphere'
import AtmosphericCard from '@/components/AtmosphericCard.vue'

const lightPoints = ref(null)
const { createLightPoints, initScrollReveal } = useAtmosphere()

onMounted(() => {
  if (lightPoints.value) {
    createLightPoints(lightPoints.value, 8)
  }
  initScrollReveal()
})
</script>

<style scoped>
@import '@/styles/atmosphere.css';

.chapter-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #FFFEFC 0%, #FAFAFA 100%);
}

.poetic-title {
  font-weight: 900;
  letter-spacing: 0.15em;
}

.emotional-subtitle {
  font-weight: 300;
  font-style: italic;
  opacity: 0.8;
}

.books-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  padding: 2rem;
}
</style>
```

### 示例 2: 书籍详情页

```vue
<template>
  <div class="book-detail gradient-warm">
    <!-- 氛围效果 -->
    <div class="atmosphere-glow"></div>

    <!-- 退出按钮 -->
    <button class="exit-btn swiss-hover-invert" @click="exit">
      ← EXIT
    </button>

    <!-- 书籍信息 -->
    <header class="scroll-reveal">
      <PoeticText
        :text="book.title"
        tag="h1"
        variant="glow"
        letter-spacing="0.1em"
        font-weight="900"
      />
      <p class="book-subtitle">{{ book.subtitle }}</p>
    </header>

    <!-- 人物卡片 -->
    <section class="characters scroll-reveal">
      <h2>CHARACTERS</h2>
      <div class="character-grid">
        <AtmosphericCard
          v-for="(char, index) in book.characters"
          :key="index"
          mood="warm"
          :show-corners="true"
        >
          <h3>{{ char.name }}</h3>
          <p>{{ char.description }}</p>
          <blockquote class="quote-highlight">
            "{{ char.quote }}"
          </blockquote>
        </AtmosphericCard>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useAtmosphere } from '@/composables/useAtmosphere'
import PoeticText from '@/components/PoeticText.vue'
import AtmosphericCard from '@/components/AtmosphericCard.vue'

const { initScrollReveal } = useAtmosphere()

onMounted(() => {
  initScrollReveal()
})
</script>

<style scoped>
@import '@/styles/atmosphere.css';

.book-detail {
  min-height: 100vh;
  padding: 4rem 2rem;
}

.book-subtitle {
  font-weight: 300;
  font-style: italic;
  opacity: 0.8;
}

.quote-highlight {
  position: relative;
  padding-left: 1.5rem;
  font-style: italic;
  font-weight: 300;
  line-height: 1.8;
}

.quote-highlight::before {
  content: '"';
  position: absolute;
  left: 0;
  top: -0.5rem;
  font-size: 3rem;
  color: var(--swiss-accent);
  opacity: 0.3;
}
</style>
```

---

## 🎯 设计原则

### 1. 克制感
- 动画时长：100-400ms
- 透明度：0.02-0.3（氛围效果）
- 不要过度使用光晕和粒子

### 2. 诗意节奏
- 元素依次出现（递增延迟）
- 滚动揭示（而非自动播放）
- 温柔过渡（非线性缓动）

### 3. 情绪匹配
- 治愈系：温暖色调、柔和光晕
- 哲学类：冷色调、宁静渐变
- 悬疑类：神秘色调、深邃效果
- 经典类：大地色系、沉稳氛围

### 4. 性能优先
- 使用 `will-change` 提示浏览器
- 避免过多同步动画
- 尊重用户的减少动画偏好

---

## 📊 性能优化

### 1. 减少动画复杂度

```css
@media (prefers-reduced-motion: reduce) {
  .atmosphere-glow::before,
  .text-glow,
  .stardust-overlay {
    animation: none;
  }
}
```

### 2. GPU 加速

```css
.atmosphere-glow::before,
.stardust-overlay {
  will-change: transform, opacity;
}
```

### 3. 懒加载氛围效果

```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // 只有在可见时才创建粒子
      createLightPoints(entry.target)
    }
  })
})
```

---

## 🐛 常见问题

### Q: 光晕效果不显示？
A: 检查是否正确引入了 `atmosphere.css`，并确保元素的 `z-index` 设置正确。

### Q: 粒子效果性能不佳？
A: 减少粒子数量（默认 8-12 个），或在移动设备上禁用。

### Q: 文字动画不流畅？
A: 检查是否使用了 `will-change`，并减少同时动画的元素数量。

---

## 📝 更新日志

### v1.0.0 (2026-04-08)
- ✨ 初始版本
- ✨ 氛围样式系统
- ✨ 氛围 Composable
- ✨ 诗意组件（卡片、文字、过渡）
- ✨ 首页和封面页意境增强

---

## 📚 相关资源

- [瑞士国际风格指南](./SWISS_STYLE_GUIDE.md)
- [组件文档](./COMPONENTS.md)
- [动画最佳实践](./ANIMATION_BEST_PRACTICES.md)

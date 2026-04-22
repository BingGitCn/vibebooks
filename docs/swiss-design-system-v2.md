# vibeBooks 瑞士风格设计系统 v2.0

> **意向 · 梳理 · 克制感**

这是 vibeBooks 项目的瑞士国际风格设计系统规范。我们的目标不是展示书目，而是将每本书转化为一个可被归档的思想标本。

---

## 核心设计哲学

### 意向 (Intention)
每本书都有独特的**情绪场域**。我们使用统一的容器结构，但允许每本书通过内容表达独特的文学气质。

### 梳理 (Organization)
建立清晰的信息层级。三级标签系统（IDENTITY → NATURE → MEANING）让用户形成稳定的心智模型。

### 克制感 (Restraint)
- **快速**：100-150ms 动画
- **精准**：颜色反转，无花哨效果
- **瞬间**：即时反馈，无延迟

---

## 颜色系统

### 基础色调
```css
--swiss-white: #FFFFFF
--swiss-black: #000000
--swiss-muted: #F2F2F2
--swiss-text-secondary: #525252
```

### 强调色
```css
--swiss-accent: #FF3000        /* 瑞士红 - 默认 */
--swiss-accent-dark: #CC0000    /* 深红 - Hover */
```

### 分类强调色

| 分类 | Accent | Dark | 用途 |
|------|--------|------|------|
| FICTION | #FF3000 | #CC0000 | 治愈系 |
| PHILOSOPHY | #1A1A1A | #000000 | 哲学思考 |
| CLASSIC | #C9A962 | #A68B4B | 经典作品 |
| MYSTERY | #CC0000 | #990000 | 悬疑推理 |
| MEMOIR | #2d5a27 | #1e3d1a | 回忆录 |
| CHINESE | #1a365d | #0f2440 | 中国叙事 |
| MODERN | #553c9a | #3c2a6e | 现代文学 |
| ECONOMICS | #1e3a8a | #172554 | 经济学 |
| SCIENCE FICTION | #0891b2 | #0e7490 | 科幻 |
| ROMANCE | #FF6B6B | #EE5A5A | 爱情 |

---

## 字体系统

### 主字体：Inter
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
```

### 字重层级
```css
/* 标题 */
font-weight: 900
letter-spacing: -0.05em
text-transform: uppercase

/* 小标题 */
font-weight: 700
letter-spacing: 0.15em
text-transform: uppercase

/* 正文 */
font-weight: 400
line-height: 1.6

/* 标签 */
font-weight: 500
font-size: 0.75rem
letter-spacing: 0.2em
text-transform: uppercase
```

### 字号系统
```css
--h1: 4rem          /* 主标题 */
--h2: 1.75rem       /* 章节标题 */
--h3: 1.25rem       /* 卡片标题 */
--body: 1rem        /* 正文 */
--small: 0.875rem   /* 次要文字 */
--label: 0.625rem   /* 标签 */
```

---

## 动画规范

### 克制感原则

```css
/*
 * 1. 最快：100ms（颜色反转）
 * 2. 次快：150ms（背景变化）
 * 3. 最慢：200ms（位置变化）
 * 4. 禁止：>300ms, translateY, box-shadow
 */
```

### 标准动画类

```css
/* 颜色反转 - 最快 */
.swiss-transition-instant {
  transition: background-color 0.1s ease-out,
              color 0.1s ease-out,
              border-color 0.1s ease-out;
}

/* 背景变化 */
.swiss-hover-invert {
  transition: background-color 0.15s ease-out,
              color 0.15s ease-out,
              border-color 0.15s ease-out;
}

/* 强调色 Hover */
.swiss-hover-accent {
  transition: background-color 0.15s ease-out,
              border-color 0.15s ease-out,
              color 0.15s ease-out;
}
```

### 禁止的动画 ❌

```css
/* 不要这样做 */
.bad-hover {
  transform: translateY(-4px);      /* ❌ 过于花哨 */
  box-shadow: 0 8px 24px rgba(...); /* ❌ 不必要的装饰 */
  transition: all 0.3s ease-out;    /* ❌ 太慢 */
}
```

---

## 网格系统

### 响应式网格

| 断点 | 列数 | 用途 |
|------|------|------|
| < 768px | 1 列 | 移动端 |
| 768px - 1024px | 2 列 | 平板 |
| > 1024px | 3 列 | 桌面 |

### 网格类

```css
.swiss-grid {
  display: grid;
  gap: 0;
}

.books-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
}

@media (max-width: 1024px) {
  .books-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .books-grid {
    grid-template-columns: 1fr;
  }
}
```

---

## 边框系统

### 统一边框

```css
/* 2px 黑色边框 - 标准 */
.swiss-border {
  border: 2px solid var(--swiss-black);
}

/* 4px 黑色边框 - 强调 */
.swiss-border-thick {
  border: 4px solid var(--swiss-black);
}

/* 单边边框 */
.swiss-border-top
.swiss-border-bottom
.swiss-border-left
.swiss-border-right
```

---

## 纹理系统

### 标准纹理

```css
/* 网格图案 (24px) */
.swiss-grid-pattern {
  background-image:
    linear-gradient(to right, rgba(0, 0, 0, 0.03) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(0, 0, 0, 0.03) 1px, transparent 1px);
  background-size: 24px 24px;
}

/* 点阵 (16px) */
.swiss-dots {
  background-image: radial-gradient(circle, rgba(0, 0, 0, 0.04) 1px, transparent 1px);
  background-size: 16px 16px;
}

/* 对角线 (10px) */
.swiss-diagonal {
  background-image: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 9px,
    rgba(0, 0, 0, 0.02) 9px,
    rgba(0, 0, 0, 0.02) 10px
  );
}

/* 噪点 */
.swiss-noise::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.015;
  pointer-events: none;
  background-image: url("data:image/svg+xml,...");
  z-index: 1;
}
```

---

## 组件规范

### EntityCard 组件

统一的实体卡片组件，用于展示人物、概念、原型等。

**文件位置**: `src/components/world/EntityCard.vue`

**Props**:
```typescript
{
  number: Number          // 编号 (01/02/03)
  entity: {
    name: string
    role: string
    desc: string
    quote: string
    details: {
      label: string       // IDENTITY / NATURE / MEANING
      text: string
    }[]
  }
  isExpanded: Boolean
  texture: String         // 'swiss-dots' | 'swiss-diagonal' | 'swiss-grid-pattern'
}
```

**使用指南**: [EntityCard 完整文档](./entity-card-guide.md)

---

## 三级信息标签系统

### Level 1: IDENTITY
**谁 / 是什么**
- 身份、角色、定义
- 回答"这是什么"的问题

### Level 2: NATURE
**内在特质**
- 性格、本质、特质
- 回答"它有什么特点"的问题

### Level 3: MEANING
**存在意义**
- 命运、意义、象征
- 回答"为什么重要"的问题

---

## 页面结构

### 首页 (Intro.vue)
```
- 纯白背景 + 噪点纹理 + 网格图案
- 主标题："每一本书，都值得被探索。"
- 副标题："Where stories breathe"
- 按钮："ENTER THE LIBRARY"
```

### 年鉴封面 (YearbookCover.vue)
```
- VOL. 2026 标签
- 6 个分类卡片
- Hover 颜色反转
```

### 年鉴章节 (YearbookChapter.vue)
```
- 顶部导航：BACK + VOL. 2026
- 章节头部：CHAPTER 01 + 分类名称 + 副标题 + 入口数量
- 书籍网格：3 列布局
- 底部导航：PREV / NEXT
```

### 书籍详情 (如 IslandBookstoreWorld.vue)
```
- EXIT 按钮
- Header：VOL.XXX + 书名 + 副标题 + 作者 + 分类
- Section 01：实体卡片（EntityCard）
- Section 02：时间线/事件
- Section 03：金句网格
```

---

## 交互设计

### Hover 效果

**统一模式**：
```css
.card:hover:not(.expanded) {
  background-color: var(--swiss-accent);
  border-color: var(--swiss-accent);
}

.card:hover:not(.expanded) * {
  color: var(--swiss-white);
}
```

### 点击展开

```javascript
// 互斥展开
const toggleEntity = (index) => {
  expandedIndex.value = expandedIndex.value === index ? null : index
}
```

### 展开状态

```css
.card.expanded {
  background-color: var(--swiss-muted);
  cursor: default;
}
```

---

## 命名规范

### BEM 风格

```css
/* Block */
.entity-card

/* Element */
.entity-card__number
.entity-card__info
.entity-card__name

/* Modifier */
.entity-card--expanded
```

### 统一命名

| 旧命名 | 新命名 | 说明 |
|--------|--------|------|
| `character-card` | `entity-card` | 统一实体卡片 |
| `char-number` | `entity-number` | 统一编号 |
| `char-name` | `entity-name` | 统一名称 |
| `char-role` | `entity-role` | 统一角色 |

---

## 间距系统

```css
--space-xs: 1rem     /* 16px */
--space-sm: 2rem     /* 32px */
--space-md: 4rem     /* 64px */
--space-lg: 6rem     /* 96px */
--space-xl: 8rem     /* 128px */
```

---

## 响应式断点

```css
/* 移动端 */
@media (max-width: 768px) { }

/* 平板 */
@media (min-width: 768px) and (max-width: 1024px) { }

/* 桌面 */
@media (min-width: 1024px) { }
```

---

## 无圆角原则

```css
* {
  border-radius: 0 !important;
}
```

瑞士国际风格的核心特征之一：**无圆角，只有直角**。

---

## 可访问性

### Focus 状态

```css
.swiss-focus:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px var(--swiss-accent);
  outline-offset: 2px;
}
```

### 交互元素

- 所有按钮应支持键盘导航
- Focus 状态清晰可见
- 颜色对比度符合 WCAG AA 标准

---

## 性能优化

### CSS 优化

```css
/* 使用 GPU 加速 */
.entity-card {
  will-change: background-color, border-color;
}

/* 避免布局抖动 */
/* ❌ 不要动画 width/height */
/* ✅ 使用 transform/opacity */
```

### Vue 优化

```vue
<!-- 使用 v-if 而非 v-show -->
<div class="entity-details" v-if="isExpanded">

<!-- 懒加载路由组件 -->
const IslandBookstoreWorld = () => import('./worlds/IslandBookstoreWorld.vue')
```

---

## 迁移指南

### 从旧代码迁移到新系统

**Step 1**: 使用 `EntityCard` 替换自定义卡片
**Step 2**: 统一信息标签为 IDENTITY/NATURE/MEANING
**Step 3**: 移除花哨动画（translateY, box-shadow）
**Step 4**: 使用标准 CSS 类（swiss-hover-accent）

**完整示例**: 见 [EntityCard 使用指南](./entity-card-guide.md)

---

## 设计原则总结

1. **网格系统** - 3 列网格，严格对齐
2. **克制呈现** - 黑白为主，瑞士红高光
3. **Inter 字体** - 900/700/500/400 字重层级
4. **用户掌控** - 点击展开，互斥显示
5. **即时反馈** - 100-150ms 颜色反转
6. **无圆角** - border-radius: 0
7. **2px 边框** - 清晰边界
8. **留白美学** - 大量空白，呼吸感

---

## 文件结构

```
src/
├── components/
│   └── world/
│       └── EntityCard.vue          # 统一实体卡片
├── worlds/
│   ├── IslandBookstoreWorld.vue    # 书籍详情页
│   ├── LittlePrinceWorld.vue
│   └── ...
├── styles/
│   └── swiss-style.css             # 瑞士风格样式系统
├── views/
│   ├── Intro.vue
│   ├── YearbookCover.vue
│   └── YearbookChapter.vue
└── data/
    └── books.js                    # 书籍数据

docs/
├── swiss-design-system-v2.md       # 本文档
└── entity-card-guide.md            # EntityCard 使用指南
```

---

## 更新日志

### v2.0 (2026-04-08)
- ✨ 统一 EntityCard 组件
- ✨ 三级信息标签系统（IDENTITY/NATURE/MEANING）
- ✨ 强化克制感动画规范（100-150ms）
- ✨ 更新 CSS transition 系统
- 📝 完整的设计文档和使用指南

### v1.0
- 初始瑞士风格设计系统
- 6 大分类视觉体系
- 网格对齐和边框系统

---

## 维护者

设计系统由 Claude Code 维护，遵循瑞士国际风格设计原则。

**核心价值**: 意向 · 梳理 · 克制感

---

*"这不是一个图书展示网站，而是一个瑞士风格的文学年鉴，是思想的档案馆，是情绪的标本。"*

# Swiss Book World 模板组件使用指南

## 概述

`SwissBookWorld.vue` 是一个通用的书籍详情页模板组件，遵循 Swiss International Style 设计规范。它提供了统一的布局、交互模式和分类专属强调色系统。

## 特性

- ✅ **分类专属强调色**：每个分类自动应用对应的强调色
- ✅ **统一三大板块**：Section 01 + Section 02 + Section 03 (QUOTES)
- ✅ **互斥展开交互**：点击展开/收起，不同板块之间互斥
- ✅ **响应式布局**：桌面 3 列 → 平板 2 列 → 手机 1 列
- ✅ **Swiss Style 设计**：无圆角、2px 黑色边框、Inter 字体

## 分类强调色系统

| 分类 | 强调色 | 深色 | 适用书籍 |
|------|--------|------|----------|
| `fiction` | #FF3000 (瑞士红) | #CC0000 | 岛上书店、夜晚的潜水艇、小王子、1Q84 |
| `philosophy` | #1A1A1A (深黑) | #000000 | 置身事内、我与地坛、悉达多、小岛经济学 |
| `classic` | #C9A962 (金色) | #A68B4B | 莫斯科绅士、百年孤独、基督山伯爵、山月记 |
| `mystery` | #CC0000 (深红) | #990000 | 困于沙丘、无人生还、嫌疑人X的献身、白夜行 |
| `memoir` | #2d5a27 (森林绿) | #1e3d1a | 撒哈拉的故事、失落的卫星、我的阿勒泰 |
| `chinese` | #1a365d (深蓝) | #0f2440 | 额尔古纳河右岸、文城、挪威的森林、小城与不确定性的墙 |
| `modern` | #553c9a (紫色) | #3c2a6e | 现代文学类书籍 |
| `economics` | #1e3a8a (海军蓝) | #172554 | 小岛经济学 |
| `science-fiction` | #0891b2 (青色) | #0e7490 | 三体 |
| `romance` | #FF6B6B (柔和红) | #EE5A5A | 爱情类书籍 |

## Props 定义

### 基础信息

```typescript
interface SwissBookWorldProps {
  // 书籍基础信息
  title: string              // 书名（必填）
  subtitle?: string          // 副标题（可选）
  author: string             // 作者（必填）
  year: string               // 出版年份（必填）
  vol?: string               // 卷号（默认：'VOL.001'）

  // 分类信息
  category: 'fiction' | 'philosophy' | 'classic' | 'mystery' | 'memoir' | 'chinese' | 'modern' | 'economics' | 'science-fiction' | 'romance'
  categoryLabel: string      // 分类标签（必填）
  metaInfo?: string          // 元信息（可选）

  // 样式
  backgroundColor?: string   // 背景色（默认：'background-color: var(--swiss-white)'）

  // 导航
  exitPath?: string          // 退出按钮跳转路径（默认：'/yearbook/fiction'）

  // 板块内容
  section01?: Section01Props // 第一板块（人物/角色/房间/朋友等）
  section02?: Section02Props // 第二板块（时间线/事件/年代/地点等）
  section03?: Section03Props // 第三板块（金句）
}
```

### Section 01 Props（人物/角色）

```typescript
interface Section01Props {
  title: string              // 板块标题（例如：'CHARACTERS'）
  subtitle: string           // 板块副标题（例如：'People in the Story'）
  gridClass: string          // 网格类名（'grid-3-columns' | 'grid-2-columns'）
  items: Array<{
    number?: string          // 编号（例如：'01'）
    icon?: string            // 图标类名（例如：'protagonist'）
    name: string             // 名称（必填）
    role?: string            // 角色/身份
    desc?: string            // 描述
    quote?: string           // 金句
    details?: Array<{        // 展开后的详细信息
      label: string          // 标签（例如：'性格'）
      text: string           // 内容
    }>
  }>
}
```

### Section 02 Props（时间线/事件）

```typescript
interface Section02Props {
  title: string              // 板块标题（例如：'TIMELINE'）
  subtitle: string           // 板块副标题（例如：'Story Progression'）
  gridClass: string          // 网格类名（'grid-timeline' | 'grid-2-columns'）
  items: Array<{
    year?: string            // 年份/时期
    title: string            // 标题（必填）
    desc: string             // 描述（必填）
    details?: Array<{        // 展开后的详细信息
      label: string          // 标签（例如：'情节'）
      text: string           // 内容
    }>
  }>
}
```

### Section 03 Props（金句）

```typescript
interface Section03Props {
  title?: string             // 板块标题（默认：'QUOTES'）
  subtitle?: string          // 板块副标题
  items: Array<{
    text: string             // 金句内容（必填）
    source: string           // 来源/人物（必填）
    role: string             // 角色/章节（必填）
  }>
}
```

## 使用示例

### 示例 1：岛上书店

```vue
<script setup>
import SwissBookWorld from '@/components/world/SwissBookWorld.vue'

const section01 = {
  title: 'CHARACTERS',
  subtitle: 'People in the Story',
  gridClass: 'grid-3-columns',
  items: [
    {
      number: '01',
      name: 'A.J. 费克里',
      role: '书店老板',
      desc: '孤僻，爱书，不喜社交',
      quote: '我不喜欢人，我喜欢书',
      details: [
        { label: '性格', text: '孤僻、愤世嫉俗、内心温柔' },
        { label: '故事', text: '在妻子去世后...' },
        { label: '关系', text: '亡妻妮可的回忆...' }
      ]
    },
    // ... 更多角色
  ]
}

const section02 = {
  title: 'TIMELINE',
  subtitle: 'Story Progression',
  gridClass: 'grid-timeline',
  items: [
    {
      year: 'BEFORE',
      title: '孤独的书店',
      desc: 'A.J. 的妻子去世，他独自经营岛上书店',
      details: [
        { label: '情节', text: 'A.J. 的妻子妮可因车祸去世...' },
        { label: '情感', text: '孤独、绝望、对生活的失去热情' }
      ]
    },
    // ... 更多事件
  ]
}

const section03 = {
  subtitle: 'Words from the Book',
  items: [
    {
      text: '我们读书，因为我们孤单，我们不孤单，所以我们读书',
      source: 'A.J. 费克里',
      role: '书店老板'
    },
    // ... 更多金句
  ]
}
</script>

<template>
  <SwissBookWorld
    title="岛上书店"
    subtitle="The Storied Life of A.J. Fikry"
    author="加布里·泽文"
    year="2014"
    vol="VOL.006"
    category="fiction"
    categoryLabel="FICTION"
    metaInfo="ISLAND BOOKSTORE"
    exit-path="/yearbook/fiction"
    :section01="section01"
    :section02="section02"
    :section03="section03"
  />
</template>
```

### 示例 2：三体（Science Fiction 分类）

```vue
<template>
  <SwissBookWorld
    title="三体"
    subtitle="EARTH'S PAST · THREE-BODY · DEATH'S END"
    author="刘慈欣"
    year="2006-2010"
    vol="VOL.037"
    category="science-fiction"
    categoryLabel="SCIENCE FICTION"
    metaInfo="黑暗森林法则 · 降维打击"
    exit-path="/yearbook/science-fiction"
    :section01="section01"
    :section02="section02"
    :section03="section03"
  />
</template>
```

### 示例 3：小王子（Philosophy 分类）

```vue
<template>
  <SwissBookWorld
    title="小王子"
    subtitle="Le Petit Prince"
    author="安托万·德·圣埃克苏佩里"
    year="1943"
    vol="VOL.006"
    category="philosophy"
    categoryLabel="PHILOSOPHY"
    metaInfo="LOVE & WISDOM"
    exit-path="/yearbook/philosophy"
    :section01="section01"
    :section02="section02"
    :section03="section03"
  />
</template>
```

## 数据结构示例

### 人物/角色数据（Section 01）

```javascript
const characters = [
  {
    number: '01',
    name: 'A.J. 费克里',
    role: '书店老板',
    desc: '孤僻，爱书，不喜社交',
    quote: '我不喜欢人，<br/>我喜欢书',
    details: [
      { label: '性格', text: '孤僻、愤世嫉俗、内心温柔。面对命运的逆转，始终保持尊严和风度。' },
      { label: '故事', text: '在妻子去世后，A.J. 关闭了自己的内心，将书店变成孤独的堡垒。' },
      { label: '关系', text: '亡妻妮可的回忆，玛雅的父亲，阿米莉娅的丈夫' }
    ]
  },
  {
    number: '02',
    name: '玛雅',
    role: '被遗弃的女孩',
    desc: '两岁，改变一切',
    quote: '我无法<br/>把她交给别人',
    details: [
      { label: '性格', text: '聪慧、敏感、善于观察' },
      { label: '故事', text: '两岁的玛雅被母亲遗弃在书店，从此改变了A.J.的生活。' },
      { label: '关系', text: 'A.J. 的养女，丹尼尔（生父）的女儿，伊斯梅的侄女' }
    ]
  }
]
```

### 时间线数据（Section 02）

```javascript
const timeline = [
  {
    year: 'BEFORE',
    title: '孤独的书店',
    desc: 'A.J. 的妻子去世，他独自经营岛上书店，世界越来越小',
    details: [
      { label: '情节', text: 'A.J. 的妻子妮可因车祸去世。他变得消沉、酗酒，书店经营每况愈下。' },
      { label: '情感', text: '孤独、绝望、对生活的失去热情' }
    ]
  },
  {
    year: '01',
    title: '玛雅出现',
    desc: '一个周五的晚上，有人把两岁的玛雅留在书店，从此消失',
    details: [
      { label: '情节', text: '一个周五的晚上，A.J. 发现一个两岁的小女孩被留在书店。' },
      { label: '情感', text: '意外、责任、生命的转折' }
    ]
  }
]
```

### 金句数据（Section 03）

```javascript
const quotes = [
  {
    text: '我们读书，因为我们孤单，我们不孤单，所以我们读书',
    source: 'A.J. 费克里',
    role: '书店老板'
  },
  {
    text: '没有一座岛屿是真正孤立的',
    source: 'A.J. 费克里',
    role: '第四章'
  },
  {
    text: '我们不只是地在讨论书，我们是在通过书认识彼此',
    source: '阿米莉娅',
    role: '销售代表'
  }
]
```

## 迁移指南

### 从现有组件迁移到 SwissBookWorld

1. **提取数据**：将现有组件的数据（人物、时间线、金句）提取为独立的对象
2. **确定分类**：根据书籍类型选择正确的 `category` 值
3. **选择网格**：根据内容量选择合适的网格类名
   - `grid-3-columns`：适合 3-6 个项目（推荐用于人物）
   - `grid-2-columns`：适合 7-12 个项目
   - `grid-timeline`：适合时间线/事件
4. **测试交互**：确保点击展开和互斥逻辑正常工作

### 迁移检查清单

- [ ] 确定正确的 `category` 值
- [ ] 准备 Section 01 数据（人物/角色）
- [ ] 准备 Section 02 数据（时间线/事件）
- [ ] 准备 Section 03 数据（金句）
- [ ] 设置正确的 `exitPath`
- [ ] 测试响应式布局
- [ ] 测试交互（展开/收起/互斥）
- [ ] 检查强调色是否正确应用

## 自定义选项

### 更改背景色

```vue
<SwissBookWorld
  background-color="background-color: #FAFAFA"
  ...
/>
```

### 添加第四个板块

如果需要第四个板块，可以：

1. 扩展 `SwissBookWorld.vue` 添加 `section04`
2. 或者直接复制组件并自定义

### 自定义图标

```javascript
{
  icon: 'protagonist'  // 将生成 .icon-protagonist 类
}
```

然后在 CSS 中定义图标样式：

```css
.icon-protagonist::before {
  content: '●';
}
```

## 最佳实践

1. **数据分离**：将数据存储在单独的 JS/TS 文件中，保持组件简洁
2. **类型安全**：使用 TypeScript 定义数据类型
3. **渐进迁移**：一次迁移一个组件，确保每个都正常工作
4. **保持一致**：使用相同的命名约定和数据结构
5. **测试交互**：确保展开/收起和互斥逻辑正常工作

## 常见问题

### Q: 如何添加自定义强调色？

A: 在 `src/styles/swiss-style.css` 中添加新的分类类：

```css
.category-custom {
  --swiss-accent: #YOUR_COLOR;
  --swiss-accent-dark: #YOUR_DARK_COLOR;
}
```

### Q: 可以不使用某个板块吗？

A: 可以，不传递对应的 `section` prop 即可：

```vue
<SwissBookWorld
  ...
  :section01="section01"
  :section03="section03"
  <!-- 没有 section02 -->
/>
```

### Q: 如何改变金句的列数？

A: 可以通过覆盖 CSS 或传递自定义样式类。默认是 3 列。

## 相关文件

- **模板组件**：`src/components/world/SwissBookWorld.vue`
- **样式系统**：`src/styles/swiss-style.css`
- **使用文档**：`docs/SWISS_BOOK_WORLD_GUIDE.md`

## 更新日志

### v1.0.0 (2025-01-19)
- ✅ 初始版本
- ✅ 分类专属强调色系统
- ✅ 三大板块结构
- ✅ 互斥展开交互
- ✅ 响应式布局

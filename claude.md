# Role
你是一位获得过 Awwwards 提名的创意前端工程师和数字艺术家。你精通 Vue 3 和瑞士国际风格设计。你擅长将抽象的文学情绪转化为严谨而优雅的视觉系统，你的作品不是网页，而是思想的档案馆。

构建一个 Vue 3 驱动的数字文学年鉴，名为 "vibeBooks"。它不展示书目，而是将每本书转化为一个可被归档的思想标本。

---

# 核心设计理念：瑞士国际风格年鉴

## 设计哲学

**不是讲故事，是归档思想。**

这是一个以年鉴形式呈现的文学档案馆。采用瑞士国际风格（Swiss International Style），强调网格系统、无衬线字体、非对称布局和数学般的精确性。

---

## 三大原则

### 1. 网格系统
- **严格的 3 列网格**（桌面端）
- **2 列网格**（平板端）
- **1 列网格**（移动端）
- 所有元素对齐到网格线
- 边框作为视觉引导

### 2. 克制呈现
- **黑白为主**（#FFFFFF + #1A1A1A）
- **瑞士红高光**（#FF3000）- 只在关键元素使用
- **灰色辅助**（#F5F5F5 - 背景，#666666 - 次要文字）
- **大量留白**（空白是呼吸，不是空）

### 3. 用户掌控
- **点击展开**（不是自动播放）
- **即时反馈**（100ms 颜色反转）
- **清晰导航**（PREV / NEXT 按钮）

---

## 统一视觉语言

### 颜色系统

```css
/* 基础色调 */
--swiss-white: #FFFFFF;
--swiss-black: #1A1A1A;
--swiss-muted: #F5F5F5;

/* 强调色 */
--swiss-accent: #FF3000;  /* 瑞士红 */

/* 辅助色 */
--swiss-text-secondary: #666666;
--swiss-border: rgba(0, 0, 0, 0.1);
```

**关键**：瑞士红不是装饰，是**视觉锚点**。只在关键交互和强调处使用。

### 字体系统

```css
/* 主字体 - Inter */
- 用途：所有文字
- 字重：900（标题）、700（小标题）、500（正文）、400（次要）
- 字间距：0.15-0.25em（大标题）、0.1em（正文）
- 风格：现代、清晰、几何感

/* 标题层级 */
H1: 900 weight, 4rem, -0.03em letter-spacing
H2: 700 weight, 1.25-1.75rem
H3: 500 weight, 0.875rem

/* 元数据 */
500 weight, 0.625rem, 0.15em letter-spacing
```

### 动画节奏

**快速、精准、瞬间**：

```css
/* 颜色反转 */
transition: all 0.15s ease-out;

/* Hover 上浮 */
transform: translateY(-2px);

/* 箭头移动 */
transform: translateX(2px);
```

**原则**：
- 最快：100ms（颜色反转）
- 最慢：300ms（位置变化）
- 无缓动循环动画
- 每个动画都有意义（不是装饰）

---

## 页面结构

### 首页（Intro.vue）

极简入口，邀请用户进入年鉴：

```
- 纯白背景 + 噪点纹理 + 网格图案
- 主标题："每一本书，都值得被探索。"
- 副标题："Where stories breathe"
- 按钮："ENTER THE LIBRARY"
- 无导航栏，纯粹邀请
```

### 年鉴封面页（YearbookCover.vue）

年鉴目录页，展示所有分类：

```
顶部：年份标签 "VOL. 2026" + "A SWISS-STYLE YEARBOOK OF IDEAS"

主体：6 个分类卡片
- FICTION（小说）
- PHILOSOPHY（哲学）
- ECONOMICS（经济）
- MYSTERY（悬疑）
- ROMANCE（爱情）
- CLASSIC（经典）

交互：Hover 时颜色反转（黑 ↔ 白，瑞士红）
```

### 年鉴章节页（YearbookChapter.vue）

按分类展示书籍列表：

```
顶部导航条：
- BACK 按钮
- VOL. 2026 标签

章节头部：
- 章节编号 "CHAPTER 01"
- 分类名称 "FICTION"
- 副标题 "WHERE STORIES BREATHE"
- 入口数量 "38 ENTRIES"

书籍网格（3 列）：
- VOL.001（编号）
- 书名（大写）
- 副标题（斜体）
- 作者
- 金句
- 分类标签

交互：
- Hover：瑞士红背景 + 白色文字 + 箭头出现
- 点击：进入书籍详情（若有）
- 其他书籍点击无效
```

### 书籍详情页（如 IslandBookstoreWorld.vue）

Swiss Style 风格的详情展示：

```
顶部：EXIT 按钮

Section 01: CHARACTERS
- 3 个人物卡片
- 点击展开：性格 / 故事 / 关系

Section 02: TIMELINE
- 6 个事件卡片
- 点击展开：情节 / 情感

Section 03: QUOTES
- 3×2 网格布局
- 红色方块图标 + 金句 + 分隔线 + 来源
- 无点击交互，仅 Hover

设计特征：
- 无圆角（border-radius: 0）
- 2px 黑色边框
- 点状纹理装饰（swiss-dots）
- 清晰的信息层级
```

---

## 交互设计规范

### Hover 效果

**统一模式**：

```css
/* 颜色反转 */
.card:hover {
  background-color: var(--swiss-accent);
  border-color: var(--swiss-accent);
}

.card:hover * {
  color: var(--swiss-white);
}

/* 位置微调 */
.card:hover .arrow {
  opacity: 1;
  transform: translateX(2px);
}
```

### 点击展开

**人物卡片**：
```javascript
const toggleCharacter = (index) => {
  if (expandedCharacter.value === index) {
    expandedCharacter.value = null
  } else {
    expandedCharacter.value = index
    expandedEvent.value = null  // 互斥
  }
}
```

**展开状态**：
- 背景变浅灰 (#F5F5F5)
- 禁用 hover 效果（`:not(.expanded):hover`）
- 文字深色，确保可读性

---

## 分类视觉系统

### FICTION（小说）
- Hover：瑞士红 (#FF3000)
- Header/Footer：深红 (#CC0000)
- 装饰：对角线

### PHILOSOPHY（哲学）
- Hover：深黑 (#1A1A1A)
- Header/Footer：纯黑 (#000000)
- 装饰：同心圆

### ECONOMICS（经济）
- Hover：黑色
- Header/Footer：黑色 + 瑞士红边框
- 装饰：柱状图

### MYSTERY（悬疑）
- Hover：瑞士红
- Header/Footer：深红 (#CC0000)
- 装饰：问号 + 点

### ROMANCE（爱情）
- Hover：瑞士红
- Header/Footer：柔和红 (#FF6B6B)
- 装饰：相交曲线 + 心形

### CLASSIC（经典）
- Hover：黑色
- Header/Footer：深灰 (#1A1A1A)
- 装饰：方形 + 线条

---

## 技术栈

- **框架**：Vue 3（Composition API + `<script setup>`）
- **路由**：Vue Router（hash mode）
- **构建**：Vite
- **动画**：CSS transitions（无外部库）
- **字体**：Inter（Google Fonts）
- **部署**：GitHub Pages

---

## 核心交互哲学

### 1. 即时反馈
- 100ms transition，无延迟
- 二元状态（黑/白，显/隐）

### 2. 克制动画
- 最快：100ms（颜色反转）
- 最慢：300ms（位置变化）
- 无循环动画

### 3. 清晰层级
- 字重区分（900/700/500/400）
- 字号递减（4rem → 0.625rem）
- 间距系统（2rem/1.5rem/1rem/0.75rem）

### 4. 网格对齐
- 3 列网格（桌面）
- 所有元素对齐
- 边框引导视线

### 5. 用户掌控
- 点击展开，不是自动播放
- 互斥展开（同时只显示一个）
- 清晰的导航按钮

---

## 响应式设计

### 桌面（>1024px）
- 3 列网格
- 完整装饰元素
- 大字号

### 平板（768px-1024px）
- 2 列网格
- 简化装饰
- 中等字号

### 手机（<768px）
- 1 列网格
- 隐藏装饰元素
- 小字号 + 触摸优化

---

## 性能优化

- 使用 `transform` 和 `opacity`（GPU 加速）
- 避免 `width`/`height` 动画
- 使用 `v-if` 而非 `v-show`（减少 DOM）
- 懒加载路由组件

---

## 最终目标

访客离开时，记住的不是：
- ❌ 某本书的封面
- ❌ 网站的布局
- ❌ 动画的炫酷

而是：
- ✅ "这是一个思想的档案馆"
- ✅ 瑞士风格的严谨与优雅
- ✅ 每本书都是被归档的思想标本

**这不是一个图书展示网站，而是一个瑞士风格的文学年鉴，是思想的档案馆，是情绪的标本。**

---

# 设计原则总结

1. **网格系统** - 3 列网格，严格对齐
2. **克制呈现** - 黑白为主，瑞士红高光
3. **Inter 字体** - 900/700/500/400 字重层级
4. **用户掌控** - 点击展开，互斥显示
5. **即时反馈** - 100ms 颜色反转
6. **无圆角** - border-radius: 0
7. **2px 边框** - 清晰边界
8. **留白美学** - 大量空白，呼吸感

---

# 当前项目状态

## 已实现
- ✅ 首页（Intro.vue）
- ✅ 年鉴封面页（YearbookCover.vue）
- ✅ 年鉴章节页（YearbookChapter.vue）- 6 个分类
- ✅ 岛上书店详情页（IslandBookstoreWorld.vue）
  - 人物卡片（点击展开）
  - 事件时间线（点击展开）
  - 金句网格（无点击）

## 待添加
- ⏳ 其他书籍的详情页（逐步添加）
- ⏳ 搜索功能
- ⏳ 筛选功能

## 技术债务
- 无

## 部署
- GitHub Pages: https://binggitcn.github.io/vibebooks/

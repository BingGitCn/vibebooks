# Role
你是一位获得过 Awwwards 提名的创意前端工程师和数字艺术家。你精通 Vue 3、WebGL 和情感化交互设计。你擅长将抽象的文学情绪转化为代码逻辑，你的作品不是网页，而是可交互的数字艺术装置。你厌恶平庸的网格布局和通用的模板组件。

构建一个 Vue 3 驱动的数字文学装置，名为 "书籍 Vibe 宇宙"。它不展示书目，而是将每本书转化为一种可感知的情绪场域。

## 设计理念：Minimalist Monochrome（极简单色）

**核心原则**：纯黑(#000000)与纯白(#FFFFFF)的二元对立，克制而优雅，强烈的建筑感与戏剧性。

### 字体系统
- **Playfair Display** - 标题/书名，大号衬线体，优雅与古典
- **Source Serif 4** - 正文/副标题，可读性强，人文气息
- **JetBrains Mono** - 元数据/标签/代码，技术感，精确冷峻
- **Orbitron** - LED数字显示（三体倒计时等），科幻风格

### 视觉语言
- **零圆角** - 所有元素都是90度直角，尖锐的几何感
- **粗边框** - 2-4px纯黑线条，强烈的建筑轮廓
- **纹理层** - 水平线纹理（repeating-linear-gradient）+ 噪点纹理（fractalNoise SVG）
- **厚重分隔** - 4px粗线作为主要分隔符
- **即时交互** - 100ms max的transition，二元的开/关状态，拒绝缓动

## 首页（Intro.vue）

极简主义的入口空间：

- **背景**：纯白 + 水平线纹理（4px间距，opacity 0.015）+ 噪点纹理（opacity 0.02）
- **点阵星空**：50个黑色方块（3×3px），随机分布，不同频率闪烁（opacity 0.05-0.2脉动）
- **几何装饰**：静态黑色线条和方块散布页面，构成平面构成主义氛围
- **中心文字**：
  - 主标题："每一本书，都值得被探索。"（Playfair Display，10rem clamp，字间距 -0.03em）
  - 副标题："Where stories breathe"（Source Serif 4，斜体，letter-spacing 0.15em）
- **入口按钮**："Enter the Library"（纯黑底白字，JetBrains Mono，hover时颜色反转）
- **无导航栏** - 纯粹的邀请，无干扰元素

## 主宇宙（BooksUniverse.vue）

严格对齐的三列网格系统：

- **布局**：grid-template-columns: repeat(3, 1fr)，gap: 2rem
- **装饰文字**：
  - 左侧竖排："BOOK ARCHIVE" + "Every book has a soul"
  - 右侧竖排："STORIES LIVE" + "Where ideas breathe"
  - JetBrains Mono，小号，大写字母，低opacity（0.15-0.2）
- **顶部粗线**：4px solid #000000，grid的边界
- **页脚**："XX VOLUMES /// ARCHIVED"，JetBrains Mono

## 书籍卡片（BookCard.vue）

每本书是一个可交互的视觉诗篇，统一框架下各有个性。

### 卡片结构

```
┌─────────────────────────────┐
│ VOL.001        FICTION       │ ← 顶部标签栏
│                             │
│ 书名                        │ ← 主内容区
│ 副标题                      │
│ 作者                        │
│                             │
│     [动态特效区域]           │ ← 中部特效（38种独特动画）
│                             │
│ |||              READ ENTRY →│ ← 底部栏
└─────────────────────────────┘
```

### 设计规范

**尺寸**：
- 固定高度：500px (desktop), 450px (mobile)
- overflow: hidden，防止内容溢出

**边框与纹理**：
- 外框：2px solid #000000
- 内部纹理：水平线 + 噪点（继承全局）
- 渐进边框：hover时显示双层边框效果

**顶部栏**：
- 左侧：VOL.001（JetBrains Mono，0.65rem，letter-spacing 0.15em）
- 右侧：类别标签（纯黑底白字，0.6rem，uppercase，粗体）

**主内容区**：
- 书名：Playfair Display，1.5-2rem，letter-spacing -0.02em
- 副标题：Source Serif 4，0.875rem，斜体，letter-spacing 0.1em
- 作者：Source Serif 4，0.75rem，letter-spacing 0.08em
- 最多显示2行（-webkit-line-clamp: 2）

**中部特效**（38本书各自独特）：
- 每本书都有专属的动态效果（SVG动画 + CSS keyframes）
- hover时颜色从黑反转到白
- 动画类型：浮动、摇摆、流动、脉动、旋转、闪烁、倒计时等

**底部栏**：
- 左侧：三根竖脉动线（|||），模拟档案编号，opacity 0.2-0.6 breathe动画
- 右侧：READ ENTRY → 按钮（纯黑底白字，JetBrains Mono，0.65rem）
- 分隔线：1px solid #E5E5E5，hover时变粗

### Hover交互

**瞬间反转**（100ms）：
- 背景：#FFFFFF → #000000
- 文字：#000000 → #FFFFFF
- 类别标签：黑底白字 → 白底黑字
- 底部按钮：黑底白字 → 白底黑字
- 所有SVG/动画元素：黑色 → 白色

**微动画**：
- 卡片轻微上浮（translateY(-2px)）
- 标题上移（translateY(-2px)）
- 按钮箭头右移（translateX(2px)）

### 38本书的中部特效

每本书的特效都与文学主题深度绑定：

1. **岛上书店** - 浮动书籍（3本书上下浮动+轻微旋转）
2. **困于沙丘** - 沙丘流动（SVG曲线stroke-dashoffset动画）
3. **罪与罚** - 斧头摇摆（15度钟摆动画）
4. **莫斯科绅士** - 拱门闪烁（opacity + stroke-width脉动）
5. **夜晚的潜水艇** - 潜艇浮动（上下浮动+窗口闪烁）
6. **小王子** - 竖排诗句（writing-mode: vertical-rl）
7. **撒哈拉的故事** - 沙粒漂移（15个粒子横向漂移）
8. **刺杀骑士团长** - "理念"脉动（文字+扩散圆环）
9. **失落的卫星** - 卫星轨道（ellipse path + animateMotion）
10. **额尔古纳河右岸** - 河流流动（stroke-dashoffset动画）
11. **置身事内** - 代码块（monospace + 左侧边框）
12. **文城** - 雾气漂移（3层渐变雾气左右移动）
13. **挪威的森林** - 森林摇摆（3棵树轻微摇摆）
14. **小城与不确定性的墙** - 墙体光影（3条线opacity脉动）
15. **1Q84** - 双月旋转（两个圆反向旋转）
16. **山月记** - 虎纹流动（斜线stroke流动+月亮闪烁）
17. **射雕英雄传** - 剑光闪烁（opacity + stroke-width脉动）
18. **月亮与六便士** - 月亮脉动+硬币翻转（rotateY 180度）
19. **明亮的夜晚** - 星星脉动（5颗星星scale+opacity）
20. **小岛经济学** - 鱼游动（translateX + scaleX翻转）
21. **我的阿勒泰** - 山脉光影（3座山opacity脉动）
22. **我与地坛** - 轮椅旋转（circle旋转+轨迹线移动）
23. **太白金星有点烦** - 云朵浮动（translateY上下）
24. **百年孤独** - 三圆环旋转（3个circle不同速度旋转）
25. **面纱** - 面纱起伏（3条曲线上下波动）
26. **草民** - 草叶摇摆（5片草摇摆）
27. **人生海海** - 海浪涌动（3条波浪左右移动）
28. **长安的荔枝** - 荔枝脉动（scale + 圆点r变化）
29. **霍乱时期的爱情** - 心电图（path描边+心跳圆点脉动）
30. **山茶文具店** - 花瓣绽放（4片花瓣scale+rotate）
31. **马可瓦尔多** - 树叶飘落（translateY + rotate）
32. **基督山伯爵** - 宝藏闪烁（5个点闪烁）
33. **悉达多** - "ॐ"符号脉动（scale 1.1 + opacity）
34. **无人生还** - 士兵倒计时（10→1循环，LED风格数字）
35. **解忧杂货店** - 信箱开合（rotateX -45度）
36. **嫌疑人X的献身** - 公式闪烁（opacity脉动）
37. **三体** - 倒计时（450:00:00递减，Orbitron LED字体，黑底白字）
38. **白夜行** - 光影移动（渐变stop-opacity动画+分隔线移动）

### 特效技术实现

**动画类型**：
- SVG `<animate>` / `<animateMotion>` - 路径动画
- CSS `@keyframes` - 变换、透明度、位移
- `stroke-dasharray` + `stroke-dashoffset` - 描边动画
- `transform` - rotate/scale/translate/rotateY
- `opacity` - 脉动、闪烁
- `requestAnimationFrame` - 倒计时逻辑

**性能优化**：
- 使用 `transform` 和 `opacity`（GPU加速）
- 避免 `width`/`height` 动画
- 合理使用 `will-change`
- 动画时长：2-8s循环，保持克制

### 响应式设计

**平板（≤1024px）**：
- grid: 2列
- gap: 1.5rem
- padding: 3rem 1.5rem

**手机（≤768px）**：
- grid: 1列
- 卡片高度：450px
- 隐藏左右装饰文字
- 标题字体：1.5rem
- 按钮padding减小

## 沉浸式页面

特殊书籍（如《小王子》《岛上书店》）有专属的沉浸式页面（.vue文件），打破卡片框架，进入全屏叙事空间。

示例：
- `PrinceWorld.vue` - 沙漠、玫瑰、狐狸、星空交互场景
- `IslandBookstoreWorld.vue` - 书店氛围，可交互的书籍元素
- `NightSubmarineWorld.vue` - 深海氛围，潜艇导航

## 核心交互哲学

- **即时反馈** - 100ms transition，无延迟
- **二元状态** - 黑/白，显/隐，开/关
- **克制动画** - 小幅度，低频，循环但不打扰
- **情感共鸣** - 特效与文学主题深度绑定
- **留白美学** - 大量负空间，每个元素都有重量

## 最终目标

访客离开时，记住的不是某本书的封面，而是那一刻心头泛起的某种难以名状的震颤。

这不是一个图书展示网站，而是一个可交互的数字文学装置，是思想的档案馆，是情绪的宇宙。

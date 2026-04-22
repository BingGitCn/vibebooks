# EntityCard 使用指南

统一的瑞士风格实体卡片组件，用于书籍详情页中展示人物、概念、原型等信息。

---

## 核心设计理念

### 意向 (Intention)
每本书都有独特的情绪场域，但使用统一的"实体容器"来表达。

### 梳理 (Organization)
三级信息标签系统：IDENTITY → NATURE → MEANING

### 克制感 (Restraint)
- 100ms 颜色反转
- 150ms 背景变化
- 禁止花哨动画（translateY, box-shadow）

---

## 基础用法

```vue
<template>
  <div class="characters-grid">
    <EntityCard
      :number="1"
      :entity="character1"
      :is-expanded="expandedIndex === 0"
      texture="swiss-dots"
      @click="toggleCharacter(0)"
    />
  </div>
</template>

<script setup>
import EntityCard from '@/components/world/EntityCard.vue'
import { ref } from 'vue'

const expandedIndex = ref(null)

const character1 = {
  name: 'A.J. 费克里',
  role: '书店老板',
  desc: '孤僻，爱书，不喜社交',
  quote: '我不喜欢人，我喜欢书',
  details: [
    { label: 'IDENTITY', text: '一位失去妻子的书店老板，生活在艾丽丝岛...' },
    { label: 'NATURE', text: '孤僻、内向、对书有着近乎偏执的热爱...' },
    { label: 'MEANING', text: '代表通过书籍与世界连接的可能性...' }
  ]
}

const toggleCharacter = (index) => {
  expandedIndex.value = expandedIndex.value === index ? null : index
}
</script>
```

---

## Props

| Prop | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `number` | Number | ✅ | - | 实体编号（显示为 01/02/03） |
| `entity` | Object | ✅ | - | 实体数据对象 |
| `isExpanded` | Boolean | ❌ | false | 是否展开 |
| `texture` | String | ❌ | 'swiss-dots' | 金句背景纹理 |

---

## Entity 数据结构

```typescript
interface Entity {
  name: string        // 名称
  role: string        // 角色/类型
  desc: string        // 简短描述（1行）
  quote: string       // 金句（支持 <br/>）
  details: Detail[]   // 详细信息（最多3个）
}

interface Detail {
  label: string       // 标签：IDENTITY / NATURE / MEANING
  text: string        // 内容
}
```

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

## 纹理选择

| Texture | 适用场景 | 示例 |
|---------|----------|------|
| `swiss-dots` | 大多数情况 | 人物、角色 |
| `swiss-diagonal` | 动态/冲突 | 对立角色、冲突事件 |
| `swiss-grid-pattern` | 秩序/理性 | 概念、理论 |

---

## 不同书籍的命名策略

虽然卡片结构统一，但可以通过 Section 标题表达每本书的独特性：

| 书籍 | Section 标题 | 实体类型 |
|------|--------------|----------|
| 岛上书店 | CHARACTERS | 人物 |
| 小王子 | FRIENDS | 朋友 |
| 百年孤独 | ARCHETYPES | 原型 |
| 三体 | CONCEPTS | 概念 |
| 月亮与六便士 | CHARACTERS | 人物 |

---

## 最佳实践

### ✅ DO
- 使用统一的 IDENTITY / NATURE / MEANING 标签
- 保持 details 数量在 2-3 个
- 金句控制在 20 字以内
- 使用 `<br/>` 分行长金句

### ❌ DON'T
- 不要混合不同的标签系统（性格/故事/关系）
- 不要超过 3 个 detail
- 不要在 quote 中使用复杂 HTML
- 不要使用非标准的 texture

---

## 动画规范

组件已内置克制感动画，无需额外配置：

```css
/* Hover（未展开状态） */
- 颜色反转：150ms
- 背景 + 边框：150ms
- 文字颜色：150ms

/* 禁止的行为 */
- ❌ translateY(-4px) 上浮效果
- ❌ box-shadow 阴影动画
- ❌ transition > 200ms
```

---

## 迁移现有代码

### 之前（混乱的命名）

```vue
<div class="character-card swiss-border swiss-hover-accent">
  <div class="char-number">01</div>
  <div class="char-info">
    <h3 class="char-name">...</h3>
    <p class="char-role">...</p>
  </div>
  <div class="char-details">
    <div class="detail-section">
      <p class="detail-label">性格</p>  <!-- 不统一的标签 -->
      <p class="detail-text">...</p>
    </div>
  </div>
</div>
```

### 之后（统一的结构）

```vue
<EntityCard
  :number="1"
  :entity="{
    name: '...',
    role: '...',
    desc: '...',
    quote: '...',
    details: [
      { label: 'IDENTITY', text: '...' },
      { label: 'NATURE', text: '...' },
      { label: 'MEANING', text: '...' }
    ]
  }"
/>
```

---

## 完整示例：岛上书店

```vue
<template>
  <section class="section-characters swiss-border-bottom">
    <div class="section-header">
      <p class="section-number">SECTION 01</p>
      <h2 class="section-title">CHARACTERS</h2>
      <p class="section-subtitle">People in the Story</p>
    </div>

    <div class="characters-grid">
      <EntityCard
        v-for="(character, index) in characters"
        :key="index"
        :number="index + 1"
        :entity="character"
        :is-expanded="expandedIndex === index"
        texture="swiss-dots"
        @click="toggleCharacter(index)"
      />
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import EntityCard from '@/components/world/EntityCard.vue'

const expandedIndex = ref(null)

const characters = [
  {
    name: 'A.J. 费克里',
    role: '书店老板',
    desc: '孤僻，爱书，不喜社交',
    quote: '我不喜欢人，<br/>我喜欢书',
    details: [
      {
        label: 'IDENTITY',
        text: '一位失去妻子的书店老板，生活在艾丽丝岛。他经营着岛上唯一的一家书店，但对顾客并不热情。'
      },
      {
        label: 'NATURE',
        text: '孤僻、内向、对书有着近乎偏执的热爱。他不善社交，认为书比人更可靠、更有趣。'
      },
      {
        label: 'MEANING',
        text: '代表通过书籍与世界连接的可能性。他的转变展示了爱与被爱如何改变一个人。'
      }
    ]
  },
  {
    name: '玛雅',
    role: '被遗弃的女孩',
    desc: '两岁，改变一切',
    quote: '我无法<br/>把她交给别人',
    details: [
      {
        label: 'IDENTITY',
        text: '一个周五的晚上，有人把两岁的玛雅留在书店，从此消失。她成为了改变A.J.命运的关键。'
      },
      {
        label: 'NATURE',
        text: '天真、可爱、聪明。她像一束光照进了A.J.孤独的生活，让他学会了爱与责任。'
      },
      {
        label: 'MEANING',
        text: '代表无辜与希望。她的出现打破了A.J.的自我封闭，让他重新连接到世界。'
      }
    ]
  }
]

const toggleCharacter = (index) => {
  expandedIndex.value = expandedIndex.value === index ? null : index
}
</script>

<style scoped>
.characters-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
}

@media (max-width: 1024px) {
  .characters-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .characters-grid {
    grid-template-columns: 1fr;
  }
}
</style>
```

---

## 常见问题

### Q: 如果某本书的实体不适合 IDENTITY/NATURE/MEANING 标签怎么办？

A: 可以自定义标签，但建议保持三个层级的逻辑结构：
- Level 1: 定义/描述
- Level 2: 特质/属性
- Level 3: 意义/影响

### Q: 可以使用 emoji 吗？

A: 不推荐。EntityCard 设计为纯粹的瑞士风格，emoji 会破坏克制感。如果需要视觉标识，建议使用数字编号。

### Q: details 可以少于 3 个吗？

A: 可以。2-3 个 details 是最佳实践，1 个也可以，但不推荐 0 个。

---

## 组件文件位置

```
src/components/world/EntityCard.vue
```

---

## 更新日志

- **2026-04-08**: 初始版本，统一的瑞士风格实体卡片

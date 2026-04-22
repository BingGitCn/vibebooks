# 批量迁移说明

本目录中的书籍详情页需要迁移到 EntityCard 系统。

## 已完成 ✅
1. IslandBookstoreWorld.vue
2. LittlePrinceWorld.vue

## 待迁移 ⏳
1. OneHundredYearsWorld.vue - ARCHETYPES → EntityCard
2. ThreeBodyWorld.vue - CONCEPTS 特殊结构
3. MoonAndSixpenceWorld.vue - CHARACTERS → EntityCard
4. MarcovaldoWorld.vue - SEASONS → EntityCard
5. NorwegianWoodWorld.vue - RELATIONSHIPS → EntityCard
6. KillingCommendatore.vue - IDEAS → EntityCard
7. NamiyaZakatenWorld.vue - LETTERS → EntityCard
8. MoscowGentlemanWorld.vue - CHARACTERS → EntityCard
9. NightSubmarineWorld.vue - STORIES → EntityCard
10. VeiledWorld.vue - LAYERS → EntityCard
11. UncertainWallWorld.vue - WALLS → EntityCard
12. GrassRootsWorld.vue - PEOPLE → EntityCard
13. LifeSeaWorld.vue - WAVES → EntityCard
14. LitchiRoadWorld.vue - ENCOUNTERS → EntityCard
15. WenchengWorld.vue - PLACES → EntityCard
16. ErgunaRiverWorld.vue - VOICES → EntityCard
17. CamelliaShopWorld.vue - CUSTOMERS → EntityCard
18. BrightNightWorld.vue - NIGHTS → EntityCard

## 迁移模板

```vue
<!-- 之前 -->
<div class="xxx-card swiss-border swiss-hover-accent clickable" :class="{ expanded: expandedX === 0 }" @click="toggleX(0)">
  <div class="xxx-number">01</div>
  <div class="xxx-info">
    <h3 class="xxx-name">名称</h3>
    <p class="xxx-role">角色</p>
    <p class="xxx-desc">描述</p>
  </div>
  <div class="xxx-quote swiss-dots">"金句"</div>
  <div class="xxx-details" v-if="expandedX === 0">
    <div class="detail-section">
      <p class="detail-label">旧标签</p>
      <p class="detail-text">内容</p>
    </div>
  </div>
</div>

<!-- 之后 -->
<EntityCard
  :number="1"
  :entity="{
    name: '名称',
    role: '角色',
    desc: '描述',
    quote: '金句',
    details: [
      { label: 'IDENTITY', text: '...' },
      { label: 'NATURE', text: '...' },
      { label: 'MEANING', text: '...' }
    ]
  }"
  :is-expanded="expandedEntity === 0"
  texture="swiss-dots"
  @click="toggleEntity(0)"
/>
```

## 三级标签映射

| 旧标签 | 新标签 | 说明 |
|--------|--------|------|
| 身份/角色/人物 | IDENTITY | 谁/是什么 |
| 性格/特点/特质 | NATURE | 内在特质 |
| 意义/命运/影响 | MEANING | 存在意义 |
| 情节/故事/经历 | IDENTITY | 发生的事 |
| 情感/感受/心境 | NATURE | 内在体验 |
| 启示/教训/价值 | MEANING | 意义 |

## 克制感动画规范

移除：
- `transform: translateY(-4px)`
- `box-shadow: ...`
- `transition: all 0.3s`

替换为：
```css
transition: background-color 0.15s ease-out,
            border-color 0.15s ease-out,
            color 0.15s ease-out;
```

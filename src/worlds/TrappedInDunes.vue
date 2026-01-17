<template>
  <div class="trapped-in-dunes">
    <!-- 跃迁动画 -->
    <transition name="warp">
      <div v-if="showWarp" class="warp-overlay">
        <div class="warp-circle">
          <div class="warp-circle-inner"></div>
        </div>
        <div class="warp-text">困于沙丘</div>
      </div>
    </transition>

    <!-- 返回按钮 -->
    <button class="exit-btn" @click="exitWorld">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M19 12H5M12 19l-7-7 7-7"/>
      </svg>
      <span>Return</span>
    </button>

    <!-- 主容器 -->
    <div class="main-container">
      <!-- 左侧：竖向章节轴 -->
      <div class="chapter-axis">
        <div class="axis-line"></div>

        <!-- 章节节点 -->
        <div
          v-for="(chapter, index) in chapters"
          :key="index"
          class="chapter-node"
          :class="{ active: currentChapter === index + 1 }"
          @click="goToChapter(index + 1)"
        >
          <div class="node-dot"></div>
          <div class="node-label">{{ chapter.label }}</div>

          <!-- 该章节的人物点 -->
          <div class="chapter-characters">
            <div
              v-for="char in chapter.characters"
              :key="char.id"
              class="character-dot"
              :class="getCharacterClass(char)"
              :style="getCharacterStyle(char)"
            ></div>
          </div>
        </div>
      </div>

      <!-- 右侧：内容区域 -->
      <div class="content-area">
        <transition name="chapter-fade" mode="out-in">
          <div :key="currentChapter" class="chapter-content">
            <!-- 章节文本 -->
            <div class="chapter-text">
              <h2 class="chapter-title">{{ currentChapterData.title }}</h2>
              <p class="chapter-subtitle">{{ currentChapterData.period }}</p>
              <div class="chapter-narrative">
                <p v-for="(line, index) in currentChapterData.narrative" :key="index">
                  {{ line }}
                </p>
              </div>
            </div>

            <!-- 人物关系微缩图 -->
            <div class="characters-map">
              <!-- 中心点：董勇 -->
              <div class="protagonist-dot"></div>

              <!-- 该章节的关键人物 -->
              <div
                v-for="char in currentChapterData.characters"
                :key="char.id"
                class="character-point"
                :class="getCharacterClass(char)"
                :style="getCharacterPosition(char)"
                @mouseenter="showCharacterInfo(char)"
                @mouseleave="hideCharacterInfo"
              >
                <div class="character-tooltip" v-if="hoveredCharacter?.id === char.id">
                  <span class="character-name">{{ char.name }}</span>
                  <span class="character-role">{{ char.role }}</span>
                </div>
              </div>

              <!-- 关系线（仅在第5、6章显示） -->
              <svg class="relations-svg" v-if="currentChapter >= 5">
                <line
                  v-for="relation in currentChapterData.relations"
                  :key="`${relation.from}-${relation.to}`"
                  x1="50%"
                  y1="50%"
                  :x2="getRelationX(relation.to)"
                  :y2="getRelationY(relation.to)"
                  stroke="rgba(26, 26, 26, 0.15)"
                  stroke-width="0.5"
                />
              </svg>
            </div>

            <!-- 点击提示 -->
            <div class="interaction-hint" v-if="currentChapter >= 5">
              <p>悬停查看关系</p>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const showWarp = ref(true)
const currentChapter = ref(1)
const hoveredCharacter = ref(null)

// 人物数据
const characters = {
  dongyong: { id: 'dongyong', name: '董勇', role: '史官', size: 8, color: '#1a1a1a', x: 50, y: 50 },
  zhaowuling: { id: 'zhaowuling', name: '赵武灵王', role: '改革之主', size: 8, color: '#525252', x: 50, y: 20 },
  zhaohe: { id: 'zhaohe', name: '赵何', role: '惠文王', size: 5, color: '#525252', x: 35, y: 30 },
  zhaozhang: { id: 'zhaozhang', name: '赵章', role: '安阳君', size: 6, color: '#8B0000', x: 65, y: 30 },
  zhaocheng: { id: 'zhaocheng', name: '赵成', role: '公子成', size: 5, color: '#4a7c9f', x: 30, y: 70 },
  lidui: { id: 'lidui', name: '李兑', role: '少司寇', size: 5, color: '#999999', x: 70, y: 70 },
  feiyi: { id: 'feiyi', name: '肥义', role: '相国', size: 4, color: '#999999', x: 40, y: 60 },
  lianpo: { id: 'lianpo', name: '廉颇', role: '大将', size: 3, color: '#4a7c9f', x: 25, y: 50 },
  shangyu: { id: 'shangyu', name: '尚禹', role: '军官', size: 3, color: '#4a7c9f', x: 75, y: 50 }
}

// 章节数据
const chapters = [
  {
    label: '序幕',
    characters: [characters.dongyong]
  },
  {
    label: '缘起',
    characters: [characters.dongyong, characters.zhaowuling]
  },
  {
    label: '峰回',
    characters: [characters.dongyong, characters.zhaowuling, characters.zhaohe, characters.zhaozhang]
  },
  {
    label: '惊变',
    characters: [
      characters.dongyong,
      characters.zhaowuling,
      characters.zhaohe,
      characters.zhaozhang,
      characters.zhaocheng,
      characters.lidui
    ]
  },
  {
    label: '拨云',
    characters: Object.values(characters)
  },
  {
    label: '溯源',
    characters: Object.values(characters)
  }
]

// 当前章节数据
const currentChapterData = computed(() => {
  const data = {
    1: {
      title: '序幕',
      period: '1930年',
      narrative: ['西北科学考察团', '在沙丘发现了竹简', '风，吹了三千年'],
      characters: [characters.dongyong],
      relations: []
    },
    2: {
      title: '缘起',
      period: '公元前299年',
      narrative: ['赵雍胡服骑射', '让赵国称霸中原', '主父传位于子何'],
      characters: [characters.dongyong, characters.zhaowuling],
      relations: []
    },
    3: {
      title: '峰回',
      period: '权力裂痕',
      narrative: ['父、子、兄弟', '王权开始倾斜', '野心在暗处生长'],
      characters: [characters.dongyong, characters.zhaowuling, characters.zhaohe, characters.zhaozhang],
      relations: []
    },
    4: {
      title: '惊变',
      period: '沙丘百日',
      narrative: ['公子成与李兑起兵', '主父被困沙丘宫', '三月后，饿死'],
      characters: [
        characters.dongyong,
        characters.zhaowuling,
        characters.zhaohe,
        characters.zhaozhang,
        characters.zhaocheng,
        characters.lidui
      ],
      relations: []
    },
    5: {
      title: '拨云',
      period: '真相浮现',
      narrative: ['权力漩涡中的棋子', '忠诚、背叛、野心', '历史的尘埃落定'],
      characters: Object.values(characters),
      relations: [
        { from: 'zhaowuling', to: 'zhaohe' },
        { from: 'zhaowuling', to: 'zhaozhang' },
        { from: 'zhaozhang', to: 'zhaocheng' },
        { from: 'zhaozhang', to: 'lidui' },
        { from: 'zhaohe', to: 'feiyi' }
      ]
    },
    6: {
      title: '溯源',
      period: '小说自我呈现',
      narrative: ['史官的笔', '书写历史的真相', '与虚构的边界'],
      characters: Object.values(characters),
      relations: [
        { from: 'zhaowuling', to: 'zhaohe' },
        { from: 'zhaowuling', to: 'zhaozhang' },
        { from: 'zhaozhang', to: 'zhaocheng' },
        { from: 'zhaozhang', to: 'lidui' },
        { from: 'zhaohe', to: 'feiyi' },
        { from: 'zhaocheng', to: 'lianpo' },
        { from: 'zhaocheng', to: 'shangyu' }
      ]
    }
  }
  return data[currentChapter.value]
})

// 获取人物点样式类
const getCharacterClass = (char) => {
  if (char.id === 'dongyong') return 'character-protagonist'
  if (['zhaohe', 'zhaozhang', 'zhaowuling'].includes(char.id)) return 'character-royal'
  if (['zhaocheng', 'lianpo', 'shangyu'].includes(char.id)) return 'character-military'
  return 'character-official'
}

// 获取人物点样式
const getCharacterStyle = (char) => ({
  width: `${char.size}px`,
  height: `${char.size}px`,
  backgroundColor: char.color
})

// 获取人物点位置
const getCharacterPosition = (char) => ({
  left: `${char.x}%`,
  top: `${char.y}%`,
  width: `${char.size * 1.5}px`,
  height: `${char.size * 1.5}px`
})

// 获取关系线终点坐标
const getRelationX = (charId) => {
  const char = Object.values(characters).find(c => c.id === charId)
  return char ? `${char.x}%` : '50%'
}

const getRelationY = (charId) => {
  const char = Object.values(characters).find(c => c.id === charId)
  return char ? `${char.y}%` : '50%'
}

// 跳转到章节
const goToChapter = (chapterNum) => {
  if (chapterNum >= 1 && chapterNum <= 6) {
    currentChapter.value = chapterNum
  }
}

// 显示人物信息
const showCharacterInfo = (char) => {
  hoveredCharacter.value = char
}

// 隐藏人物信息
const hideCharacterInfo = () => {
  hoveredCharacter.value = null
}

// 退出
const exitWorld = () => {
  router.push('/universe')
}

onMounted(() => {
  setTimeout(() => {
    showWarp.value = false
  }, 1800)
})
</script>

<style scoped>
.trapped-in-dunes {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #f7f5f2;
  overflow: hidden;
  font-family: 'Source Serif 4', Georgia, serif;
}

/* === 跃迁动画 === */
.warp-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #f7f5f2;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5000;
}

.warp-circle {
  width: 300px;
  height: 300px;
  border: 1px solid rgba(26, 26, 26, 0.2);
  border-radius: 50%;
  position: relative;
  animation: warp-expand 1.5s ease-out forwards;
}

.warp-circle-inner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 200px;
  border: 1px solid rgba(26, 26, 26, 0.3);
  border-radius: 50%;
}

.warp-text {
  position: absolute;
  font-family: 'Source Serif 4', serif;
  font-size: 0.9rem;
  letter-spacing: 0.5em;
  color: rgba(26, 26, 26, 0.8);
  animation: warp-fade 1.5s ease-out forwards;
}

@keyframes warp-expand {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: scale(3);
    opacity: 0;
  }
}

@keyframes warp-fade {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

/* === 返回按钮 === */
.exit-btn {
  position: absolute;
  top: 2rem;
  left: 2rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1.5rem;
  background: rgba(26, 26, 26, 0.03);
  border: 1px solid rgba(26, 26, 26, 0.08);
  color: #1a1a1a;
  backdrop-filter: blur(10px);
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 3000;
}

.exit-btn:hover {
  background: rgba(26, 26, 26, 0.9);
  color: #f7f5f2;
  transform: translateX(-3px);
}

.exit-btn svg {
  width: 16px;
  height: 16px;
}

/* === 主容器 === */
.main-container {
  display: flex;
  width: 100%;
  height: 100%;
}

/* === 竖向章节轴 === */
.chapter-axis {
  position: relative;
  width: 20%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3rem;
  padding: 2rem 0;
}

.axis-line {
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  width: 1px;
  height: 80%;
  background: rgba(26, 26, 26, 0.1);
}

.chapter-node {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;
}

.chapter-node:hover .node-dot {
  transform: scale(1.3);
  background: #1a1a1a;
}

.chapter-node.active .node-dot {
  background: #1a1a1a;
  transform: scale(1.5);
}

.chapter-node.active .node-label {
  color: #1a1a1a;
  font-weight: 600;
}

.node-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(26, 26, 26, 0.3);
  transition: all 0.3s ease;
  position: relative;
  z-index: 2;
}

.node-label {
  font-family: 'Inter', sans-serif;
  font-size: 0.65rem;
  letter-spacing: 0.2em;
  color: rgba(26, 26, 26, 0.5);
  transition: all 0.3s ease;
  text-transform: uppercase;
}

.chapter-characters {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2px;
  width: 40px;
  height: 40px;
  pointer-events: none;
  z-index: 1;
}

.character-dot {
  border-radius: 50%;
  transition: all 0.3s ease;
  opacity: 0.6;
}

/* === 内容区域 === */
.content-area {
  width: 80%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 3rem;
  position: relative;
  overflow-y: auto;
}

.chapter-content {
  width: 100%;
  max-width: 900px;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  padding: 1rem 0;
}

/* 章节文本 */
.chapter-text {
  text-align: left;
}

.chapter-title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 300;
  color: #1a1a1a;
  letter-spacing: 0.15em;
  margin-bottom: 0.5rem;
  line-height: 1.1;
}

.chapter-subtitle {
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  letter-spacing: 0.3em;
  color: rgba(26, 26, 26, 0.5);
  margin-bottom: 2.5rem;
  text-transform: uppercase;
}

.chapter-narrative p {
  font-family: 'Source Serif 4', Georgia, serif;
  font-size: clamp(1.2rem, 2.5vw, 1.8rem);
  font-weight: 300;
  color: #1a1a1a;
  line-height: 2;
  letter-spacing: 0.15em;
  margin: 0;
}

/* 人物关系图 */
.characters-map {
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  background: rgba(26, 26, 26, 0.02);
  border: 1px solid rgba(26, 26, 26, 0.05);
  border-radius: 4px;
  margin: 0 auto;
}

.protagonist-dot {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #1a1a1a;
  z-index: 10;
}

.character-point {
  position: absolute;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 5;
}

.character-point:hover {
  transform: translate(-50%, -50%) scale(1.5);
  z-index: 20;
}

.character-tooltip {
  position: fixed;
  bottom: calc(100% + 15px);
  left: 50%;
  transform: translateX(-50%);
  background: #1a1a1a;
  color: #f7f5f2;
  padding: 0.6rem 0.8rem;
  border-radius: 4px;
  white-space: nowrap;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  pointer-events: none;
  z-index: 1000;
  max-width: 200px;
}

.character-name {
  font-family: 'Source Serif 4', serif;
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 0.1em;
}

.character-role {
  font-family: 'Inter', sans-serif;
  font-size: 0.65rem;
  letter-spacing: 0.15em;
  opacity: 0.7;
  text-transform: uppercase;
}

.relations-svg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

/* 交互提示 */
.interaction-hint {
  text-align: center;
}

.interaction-hint p {
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  color: rgba(26, 26, 26, 0.4);
  text-transform: uppercase;
  margin: 0;
}

/* === 过渡动画 === */
.chapter-fade-enter-active,
.chapter-fade-leave-active {
  transition: all 0.6s ease;
}

.chapter-fade-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.chapter-fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.warp-enter-active,
.warp-leave-active {
  transition: opacity 0.5s ease;
}

.warp-enter-from,
.warp-leave-to {
  opacity: 0;
}

/* === 响应式 === */
@media (max-width: 1024px) {
  .chapter-axis {
    width: 25%;
  }

  .content-area {
    width: 75%;
    padding: 3rem 2rem;
  }

  .chapter-content {
    gap: 2rem;
  }

  .chapter-title {
    font-size: clamp(2.5rem, 5vw, 4rem);
  }

  .chapter-narrative p {
    font-size: clamp(1rem, 2vw, 1.5rem);
  }
}

@media (max-width: 768px) {
  .main-container {
    flex-direction: column;
  }

  .chapter-axis {
    width: 100%;
    height: 15%;
    flex-direction: row;
    gap: 1.5rem;
  }

  .axis-line {
    top: 50%;
    left: 10%;
    transform: translateY(-50%);
    width: 80%;
    height: 1px;
  }

  .content-area {
    width: 100%;
    height: 85%;
    padding: 2rem 1.5rem;
  }

  .chapter-content {
    gap: 1.5rem;
  }

  .chapter-title {
    font-size: clamp(2rem, 6vw, 3rem);
  }

  .chapter-subtitle {
    font-size: 0.7rem;
    margin-bottom: 2rem;
  }

  .chapter-narrative p {
    font-size: clamp(0.9rem, 3vw, 1.2rem);
  }

  .characters-map {
    aspect-ratio: 1 / 1;
  }

  .exit-btn {
    top: 1rem;
    left: 1rem;
    padding: 0.625rem 1rem;
    font-size: 0.6rem;
  }

  .warp-circle {
    width: 200px;
    height: 200px;
  }

  .warp-circle-inner {
    width: 140px;
    height: 140px;
  }

  .warp-text {
    font-size: 0.7rem;
  }
}
</style>

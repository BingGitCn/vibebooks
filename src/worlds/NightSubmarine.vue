<template>
  <div class="night-submarine">
    <!-- 跃迁动画 -->
    <transition name="warp">
      <div v-if="showWarp" class="warp-overlay">
        <div class="warp-circle">
          <div class="warp-circle-inner"></div>
        </div>
        <div class="warp-text">夜晚的潜水艇</div>
      </div>
    </transition>

    <!-- 返回按钮 -->
    <button class="exit-btn" @click="exitWorld">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M19 12H5M12 19l-7-7 7-7"/>
      </svg>
      <span>Return</span>
    </button>

    <!-- 主内容区 -->
    <div class="main-container">
      <!-- 目录页 -->
      <div v-if="currentView === 'contents'" class="contents-page">
        <!-- 标题 -->
        <header class="contents-header">
          <div class="header-decoration">
            <div class="deco-line"></div>
            <div class="deco-dot"></div>
          </div>
          <h1 class="contents-title">目录</h1>
          <p class="contents-subtitle">Contents</p>
        </header>

        <!-- 故事列表 -->
        <div class="stories-list">
          <div
            v-for="(story, index) in stories"
            :key="story.id"
            class="story-item"
            :class="{ active: selectedStory === index }"
            @click="selectStory(index)"
          >
            <!-- 序号 -->
            <div class="story-number">{{ String(index + 1).padStart(2, '0') }}</div>

            <!-- 故事信息 -->
            <div class="story-info">
              <h2 class="story-title">{{ story.title }}</h2>
              <p class="story-subtitle">{{ story.subtitle }}</p>
            </div>

            <!-- 主题色装饰线 -->
            <div class="story-decoration" :style="{ borderColor: story.color }">
              <div class="deco-line-inner" :style="{ backgroundColor: story.color }"></div>
            </div>

            <!-- 图标 -->
            <div class="story-icon" :style="{ color: story.color }">
              {{ story.icon }}
            </div>
          </div>
        </div>

        <!-- 底部提示 -->
        <div class="footer-hint">
          <p>点击选择篇章</p>
        </div>
      </div>

      <!-- 故事沉浸页 -->
      <transition name="story-fade">
        <div v-if="currentView === 'story'" class="story-page">
          <!-- 故事内容会在下一步实现 -->
          <div class="story-placeholder">
            <h2>{{ stories[selectedStory].title }}</h2>
            <p>故事内容即将呈现...</p>
            <button class="back-to-contents" @click="backToContents">
              返回目录
            </button>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const showWarp = ref(true)
const currentView = ref('contents')
const selectedStory = ref(null)

// 故事数据
const stories = ref([
  {
    id: 1,
    title: '夜晚的潜水艇',
    subtitle: 'The Night Submarine',
    color: '#0891b2',
    icon: '🌙',
    description: '想象力的深海之旅'
  },
  {
    id: 2,
    title: '竹峰寺',
    subtitle: 'Bamboo Peak Temple',
    color: '#059669',
    icon: '🎋',
    description: '记忆的藏经洞'
  },
  {
    id: 3,
    title: '传彩笔',
    subtitle: 'The Color-Transmitting Pen',
    color: '#7c3aed',
    icon: '✍️',
    description: '文字的色彩'
  },
  {
    id: 4,
    title: '裁云记',
    subtitle: 'Cloud Trimming',
    color: '#9ca3af',
    icon: '☁️',
    description: '整理云彩，整理思绪'
  },
  {
    id: 5,
    title: '音乐家',
    subtitle: 'The Musician',
    color: '#d97706',
    icon: '🎵',
    description: '凝固的音乐'
  }
])

// 选择故事
const selectStory = (index) => {
  selectedStory.value = index
  currentView.value = 'story'
}

// 返回目录
const backToContents = () => {
  currentView.value = 'contents'
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
.night-submarine {
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
  font-family: 'Noto Serif SC', serif;
  font-size: 0.9rem;
  letter-spacing: 0.5em;
  color: rgba(26, 26, 26, 0.8);
  animation: warp-fade 1.5s ease-out forwards;
}

@keyframes warp-expand {
  0% { transform: scale(0); opacity: 0; }
  50% { opacity: 1; }
  100% { transform: scale(3); opacity: 0; }
}

@keyframes warp-fade {
  0% { opacity: 0; transform: translateY(20px); }
  50% { opacity: 1; transform: translateY(0); }
  100% { opacity: 0; }
}

/* === 返回按钮 === */
.exit-btn {
  position: fixed;
  top: 2rem;
  left: 2rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1.5rem;
  background: rgba(247, 245, 242, 0.9);
  backdrop-filter: blur(10px);
  border: 1px solid #1a1a1a;
  color: #1a1a1a;
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
  background: #1a1a1a;
  color: #f7f5f2;
  box-shadow: 0 0 30px rgba(26, 26, 26, 0.15);
  transform: translateX(-3px);
}

.exit-btn svg {
  width: 16px;
  height: 16px;
}

/* === 主容器 === */
.main-container {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* === 目录页 === */
.contents-page {
  width: 100%;
  max-width: 800px;
  padding: 2rem;
  opacity: 0;
  animation: fade-in 1s ease-out 0.5s forwards;
}

@keyframes fade-in {
  to { opacity: 1; }
}

/* 目录头部 */
.contents-header {
  text-align: center;
  margin-bottom: 4rem;
}

.header-decoration {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.deco-line {
  width: 80px;
  height: 1px;
  background: rgba(26, 26, 26, 0.3);
}

.deco-dot {
  width: 6px;
  height: 6px;
  border: 1px solid rgba(26, 26, 26, 0.4);
}

.contents-title {
  font-family: 'Noto Serif SC', serif;
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 400;
  letter-spacing: 0.3em;
  color: #1a1a1a;
  margin-bottom: 1rem;
}

.contents-subtitle {
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.4em;
  color: rgba(26, 26, 26, 0.5);
  text-transform: uppercase;
  margin: 0;
}

/* 故事列表 */
.stories-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.story-item {
  position: relative;
  display: grid;
  grid-template-columns: auto 1fr auto auto;
  gap: 2rem;
  align-items: center;
  padding: 2rem;
  background: transparent;
  border: 1px solid rgba(26, 26, 26, 0.08);
  cursor: pointer;
  transition: all 0.4s ease;
}

.story-item:hover {
  background: rgba(26, 26, 26, 0.02);
  border-color: rgba(26, 26, 26, 0.15);
  transform: translateX(8px);
}

.story-number {
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  color: rgba(26, 26, 26, 0.3);
  min-width: 60px;
}

.story-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.story-title {
  font-family: 'Noto Serif SC', serif;
  font-size: clamp(1.2rem, 3vw, 1.5rem);
  font-weight: 400;
  letter-spacing: 0.1em;
  color: #1a1a1a;
  margin: 0;
}

.story-subtitle {
  font-family: 'Inter', sans-serif;
  font-size: 0.65rem;
  font-weight: 400;
  letter-spacing: 0.15em;
  color: rgba(26, 26, 26, 0.5);
  text-transform: uppercase;
  margin: 0;
}

.story-decoration {
  width: 60px;
  height: 1px;
  border-bottom: 1px solid;
  position: relative;
}

.deco-line-inner {
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 0;
  height: 100%;
  transition: width 0.4s ease;
}

.story-item:hover .deco-line-inner {
  width: 100%;
}

.story-icon {
  font-size: 1.5rem;
  opacity: 0.6;
  transition: all 0.4s ease;
}

.story-item:hover .story-icon {
  opacity: 1;
  transform: scale(1.2);
}

/* 底部提示 */
.footer-hint {
  margin-top: 4rem;
  text-align: center;
}

.footer-hint p {
  font-family: 'Inter', sans-serif;
  font-size: 0.65rem;
  letter-spacing: 0.2em;
  color: rgba(26, 26, 26, 0.3);
  text-transform: uppercase;
  margin: 0;
}

/* === 故事页占位 === */
.story-page {
  width: 100%;
  text-align: center;
}

.story-placeholder {
  padding: 4rem;
}

.story-placeholder h2 {
  font-family: 'Noto Serif SC', serif;
  font-size: 2rem;
  margin-bottom: 1rem;
}

.story-placeholder p {
  color: rgba(26, 26, 26, 0.5);
  margin-bottom: 2rem;
}

.back-to-contents {
  padding: 0.875rem 2rem;
  background: transparent;
  border: 1px solid #1a1a1a;
  color: #1a1a1a;
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.back-to-contents:hover {
  background: #1a1a1a;
  color: #f7f5f2;
}

/* === 过渡动画 === */
.story-fade-enter-active,
.story-fade-leave-active {
  transition: all 0.6s ease;
}

.story-fade-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.story-fade-leave-to {
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
@media (max-width: 768px) {
  .contents-page {
    padding: 1rem;
  }

  .story-item {
    grid-template-columns: auto 1fr;
    grid-template-rows: auto auto auto;
    gap: 1rem;
    padding: 1.5rem;
  }

  .story-decoration {
    grid-column: 2;
    grid-row: 2;
  }

  .story-icon {
    grid-column: 2;
    grid-row: 3;
    justify-self: start;
  }

  .exit-btn {
    top: 1rem;
    left: 1rem;
    padding: 0.75rem 1.25rem;
    font-size: 0.65rem;
  }
}
</style>

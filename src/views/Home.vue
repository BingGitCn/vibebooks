<template>
  <div class="home-page min-h-screen bg-white relative overflow-hidden">
    <!-- 动态背景文字 -->
    <div class="background-text">
      <span v-for="(word, index) in bgWords" :key="index" :class="`word-${index}`">
        {{ word }}
      </span>
    </div>

    <!-- 主内容区 -->
    <div class="content-wrapper">
      <!-- 主标题区域 -->
      <section class="hero-section">
        <div class="text-container">
          <p class="subtitle font-mono text-sm tracking-widest text-gray-400 mb-6 opacity-0">
            IMMERSIVE BOOK EXPERIENCE
          </p>
          <h1 class="main-title font-display text-7xl md:text-9xl font-bold leading-none mb-8">
            <span class="title-line line-1 opacity-0">书 籍</span>
            <span class="title-line line-2 opacity-0">气 氛</span>
            <span class="title-line line-3 opacity-0">可 视 化</span>
          </h1>
          <p class="description font-body text-xl md:text-2xl text-gray-600 max-w-2xl leading-relaxed opacity-0">
            不是阅读，而是探索。每一本书都是一个独特的视觉宇宙，等待你去发现、去触摸、去感受。
          </p>
        </div>

        <!-- 进入按钮 -->
        <button
          ref="enterButton"
          @click="enterBooks"
          @mouseenter="onButtonHover"
          class="enter-button group mt-16 relative px-12 py-5 bg-black text-white font-mono text-sm tracking-widest overflow-hidden opacity-0"
        >
          <span class="relative z-10">进入探索 →</span>
          <div class="button-fill absolute inset-0 bg-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
          <span class="absolute inset-0 z-10 text-black opacity-0 group-hover:opacity-100 transition-opacity duration-300">进入探索 →</span>
        </button>
      </section>

      <!-- 装饰性元素 -->
      <div class="decorative-elements">
        <!-- 浮动的关键词 -->
        <div v-for="(keyword, index) in keywords" :key="index"
             class="floating-keyword"
             :style="{ ...keyword.style, animationDelay: `${index * 0.2}s` }">
          {{ keyword.text }}
        </div>

        <!-- 底部信息 -->
        <div class="bottom-info font-mono text-xs text-gray-400">
          <div class="flex items-center gap-8">
            <span>SCROLL TO EXPLORE</span>
            <div class="w-px h-12 bg-gray-300"></div>
            <span>2025</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 光晕效果 -->
    <div class="ambient-glow glow-1"></div>
    <div class="ambient-glow glow-2"></div>
    <div class="ambient-glow glow-3"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import gsap from 'gsap'

const router = useRouter()
const enterButton = ref(null)

// 背景文字词汇
const bgWords = ref([
  '探索', '感觉', '沉浸', '氛围', '情绪', '触摸',
  '发现', '叙事', '空间', '视觉', '灵魂', '共鸣',
  '忧郁', '悬疑', '治愈', '史诗', '科幻', '温暖'
])

// 浮动关键词
const keywords = ref([
  { text: '探索', style: { top: '15%', left: '10%', fontSize: '0.9rem', rotation: '-12deg' } },
  { text: '氛围', style: { top: '25%', right: '15%', fontSize: '1.2rem', rotation: '8deg' } },
  { text: '情绪', style: { top: '60%', left: '8%', fontSize: '0.8rem', rotation: '-5deg' } },
  { text: '触摸', style: { top: '70%', right: '12%', fontSize: '1rem', rotation: '3deg' } },
  { text: '沉浸', style: { top: '45%', right: '5%', fontSize: '0.7rem', rotation: '-8deg' } },
])

onMounted(() => {
  // 入场动画
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

  // 背景文字渐入
  gsap.fromTo('.background-text span',
    { opacity: 0, scale: 0.8 },
    { opacity: 0.04, scale: 1, duration: 2, stagger: 0.1, ease: 'power2.out' }
  )

  // 主标题动画
  tl.to('.subtitle', { opacity: 1, y: 0, duration: 1 })
    .to('.line-1', { opacity: 1, y: 0, duration: 1.2 }, '-=0.5')
    .to('.line-2', { opacity: 1, y: 0, duration: 1.2 }, '-=0.9')
    .to('.line-3', { opacity: 1, y: 0, duration: 1.2 }, '-=0.9')
    .to('.description', { opacity: 1, y: 0, duration: 1 }, '-=0.6')
    .to('.enter-button', { opacity: 1, y: 0, duration: 1 }, '-=0.5')

  // 浮动关键词动画
  gsap.fromTo('.floating-keyword',
    { opacity: 0, scale: 0 },
    { opacity: 0.15, scale: 1, duration: 1.5, stagger: 0.2, delay: 1, ease: 'back.out(1.7)' }
  )

  // 光晕动画
  gsap.to('.ambient-glow', {
    opacity: 0.3,
    duration: 3,
    stagger: 0.5,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  })
})

const enterBooks = () => {
  // 离开动画
  const tl = gsap.timeline({
    onComplete: () => {
      router.push('/books')
    }
  })

  tl.to('.main-title', { opacity: 0, y: -50, duration: 0.8, stagger: 0.1 })
    .to('.description', { opacity: 0, duration: 0.6 }, '-=0.4')
    .to('.floating-keyword', { opacity: 0, scale: 0.5, duration: 0.6, stagger: 0.1 }, '-=0.4')
    .to('.enter-button', { scale: 0.9, duration: 0.4 }, '-=0.3')
}

const onButtonHover = () => {
  gsap.to(enterButton.value, { scale: 1.05, duration: 0.3, ease: 'power2.out' })
}
</script>

<style scoped>
.home-page {
  font-family: 'Source Serif 4', serif;
}

/* 背景文字层 */
.background-text {
  position: fixed;
  inset: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  padding: 4rem;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}

.background-text span {
  font-family: 'Playfair Display', serif;
  font-size: clamp(4rem, 12vw, 15rem);
  font-weight: 700;
  color: black;
  opacity: 0.04;
  user-select: none;
  white-space: nowrap;
  transition: all 0.8s ease;
}

.background-text span:hover {
  opacity: 0.08;
  transform: scale(1.05);
}

/* 内容容器 */
.content-wrapper {
  position: relative;
  z-index: 10;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 4rem;
}

.hero-section {
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
}

.text-container {
  position: relative;
}

.subtitle {
  transform: translateY(20px);
}

.main-title {
  margin-bottom: 2rem;
}

.title-line {
  display: block;
  transform: translateY(60px);
  font-family: 'Playfair Display', serif;
}

.line-2 {
  padding-left: 4rem;
}

.line-3 {
  padding-left: 8rem;
}

.description {
  transform: translateY(40px);
  max-width: 600px;
}

/* 进入按钮 */
.enter-button {
  transform: translateY(30px);
  position: relative;
  cursor: pointer;
  border: none;
  outline: none;
  transition: all 0.3s ease;
}

.enter-button:hover {
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.button-fill {
  transition: transform 0.5s cubic-bezier(0.23, 1, 0.32, 1);
}

/* 装饰元素 */
.decorative-elements {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.floating-keyword {
  position: absolute;
  font-family: 'JetBrains Mono', monospace;
  color: black;
  opacity: 0.15;
  animation: float 6s ease-in-out infinite;
  white-space: nowrap;
}

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(var(--rotation, 0deg)); }
  50% { transform: translateY(-20px) rotate(var(--rotation, 0deg)); }
}

/* 底部信息 */
.bottom-info {
  position: absolute;
  bottom: 4rem;
  left: 4rem;
}

/* 环境光晕 */
.ambient-glow {
  position: fixed;
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0;
  pointer-events: none;
  z-index: 1;
}

.glow-1 {
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, transparent 70%);
  top: 10%;
  left: 20%;
}

.glow-2 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(44, 62, 80, 0.12) 0%, transparent 70%);
  bottom: 20%;
  right: 15%;
}

.glow-3 {
  width: 350px;
  height: 350px;
  background: radial-gradient(circle, rgba(255, 0, 51, 0.08) 0%, transparent 70%);
  top: 50%;
  right: 30%;
}

/* 响应式 */
@media (max-width: 768px) {
  .content-wrapper {
    padding: 2rem;
  }

  .line-2 {
    padding-left: 2rem;
  }

  .line-3 {
    padding-left: 4rem;
  }

  .main-title {
    font-size: 3.5rem;
  }

  .bottom-info {
    bottom: 2rem;
    left: 2rem;
  }

  .floating-keyword {
    display: none;
  }
}
</style>

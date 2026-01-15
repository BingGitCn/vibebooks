<script setup>
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import BookCard from '../components/BookCard.vue'

const books = ref([
  {
    id: 1,
    title: '小王子',
    author: '安托万·德·圣-埃克苏佩里',
    mood: 'healing',
    moodColor: '#4A5D23',
    quote: '所有的大人都曾经是小孩，虽然只有少数人记得。',
    description: '一个关于爱、失去与成长的星际旅程',
    immersivePage: '/prince.html'
  },
  {
    id: 2,
    title: '1984',
    author: '乔治·奥威尔',
    mood: 'scifi',
    moodColor: '#00FF88',
    quote: '战争即和平，自由即奴役，无知即力量。',
    description: '在极权的阴影下，思想是最后的避难所',
    immersivePage: null
  },
  {
    id: 3,
    title: '局外人',
    author: '阿尔贝·加缪',
    mood: 'melancholy',
    moodColor: '#2C3E50',
    quote: '今天，妈妈死了。也许是昨天，我不知道。',
    description: '荒诞世界里最诚实的旁观者',
    immersivePage: null
  }
])

const containerRef = ref(null)
const titleRef = ref(null)

onMounted(() => {
  // 入场动画
  const tl = gsap.timeline()

  tl.from(titleRef.value, {
    y: 100,
    opacity: 0,
    duration: 1.5,
    ease: 'power3.out'
  })
  .from('.book-card', {
    y: 150,
    opacity: 0,
    stagger: 0.2,
    duration: 1.2,
    ease: 'power3.out'
  }, '-=0.5')
})
</script>

<template>
  <div ref="containerRef" class="min-h-screen bg-black">
    <!-- Hero Section -->
    <section class="relative h-screen flex flex-col items-center justify-center overflow-hidden">
      <!-- 背景粒子 -->
      <div class="absolute inset-0 opacity-20">
        <div v-for="i in 50" :key="i"
             class="absolute w-1 h-1 bg-white rounded-full"
             :style="{
               left: `${Math.random() * 100}%`,
               top: `${Math.random() * 100}%`,
               animationDelay: `${Math.random() * 3}s`,
               animation: `pulse ${2 + Math.random() * 3}s ease-in-out infinite`
             }">
        </div>
      </div>

      <!-- 标题 -->
      <div ref="titleRef" class="relative z-10 text-center">
        <h1 class="font-serif text-7xl md:text-9xl font-bold mb-6 tracking-tight">
          <span class="inline-block">vibe</span><span class="mood-text">Books</span>
        </h1>
        <p class="text-gray-400 text-xl md:text-2xl font-light tracking-wide">
          每一本书，都是一个可探索的宇宙
        </p>
      </div>

      <!-- 滚动提示 -->
      <div class="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span class="text-gray-500 text-sm">向下滚动探索</span>
        <div class="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center pt-2">
          <div class="w-1 h-3 bg-gray-400 rounded-full animate-bounce"></div>
        </div>
      </div>
    </section>

    <!-- 书籍展示区域 -->
    <section class="min-h-screen py-32 px-8">
      <div class="max-w-7xl mx-auto">
        <h2 class="font-serif text-5xl md:text-6xl mb-20 text-center">
          <span class="mood-text">探索</span> 书籍的灵魂
        </h2>

        <div class="flex flex-wrap justify-center gap-16 md:gap-24">
          <BookCard
            v-for="book in books"
            :key="book.id"
            :book="book"
            class="book-card"
          />
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="py-20 text-center border-t border-gray-900">
      <p class="text-gray-600">Designed with passion for books</p>
    </footer>
  </div>
</template>

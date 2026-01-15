<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'

const emit = defineEmits(['enter'])

const titleRef = ref(null)
const subtitleRef = ref(null)
const buttonRef = ref(null)

const stars = ref([])
const floatingShapes = ref([])

const generateStars = () => {
  const starArray = []
  for (let i = 0; i < 50; i++) {
    starArray.push({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 3
    })
  }
  return starArray
}

const generateFloatingShapes = () => {
  const shapes = []
  const types = ['circle', 'line', 'dot']
  for (let i = 0; i < 15; i++) {
    shapes.push({
      id: i,
      type: types[Math.floor(Math.random() * types.length)],
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 60 + 20,
      rotation: Math.random() * 360,
      delay: Math.random() * 5
    })
  }
  return shapes
}

const handleEnter = () => {
  const tl = gsap.timeline()

  tl.to(buttonRef.value, {
    scale: 0.95,
    opacity: 0,
    duration: 0.3,
    ease: 'power2.in'
  })
  .to([titleRef.value, subtitleRef.value], {
    y: -20,
    opacity: 0,
    duration: 0.4,
    stagger: 0.1,
    ease: 'power2.in'
  }, '-=0.2')
  .to('.intro-container', {
    opacity: 0,
    duration: 0.5,
    onComplete: () => emit('enter')
  })
}

onMounted(() => {
  stars.value = generateStars()
  floatingShapes.value = generateFloatingShapes()

  const tl = gsap.timeline()

  tl.fromTo(titleRef.value,
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }
  )
  .fromTo(subtitleRef.value,
    { y: 20, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
    '-=0.4'
  )
  .fromTo(buttonRef.value,
    { scale: 0.9, opacity: 0 },
    { scale: 1, opacity: 1, duration: 0.5, ease: 'power2.out' },
    '-=0.3'
  )

  gsap.fromTo('.floating-shape',
    { opacity: 0, scale: 0 },
    {
      opacity: 0.3,
      scale: 1,
      duration: 1.5,
      stagger: 0.1,
      ease: 'power2.out',
      delay: 0.5
    }
  )
})
</script>

<template>
  <div class="intro-container">
    <!-- 背景装饰 -->
    <div class="background-decorations">
      <!-- 星星点缀 -->
      <div
        v-for="star in stars"
        :key="'star-' + star.id"
        class="star"
        :style="{
          left: star.left + '%',
          top: star.top + '%',
          width: star.size + 'px',
          height: star.size + 'px',
          animationDelay: star.delay + 's'
        }"
      ></div>

      <!-- 漂浮几何图形 -->
      <div
        v-for="shape in floatingShapes"
        :key="'shape-' + shape.id"
        class="floating-shape"
        :class="shape.type"
        :style="{
          left: shape.left + '%',
          top: shape.top + '%',
          width: shape.size + 'px',
          height: shape.size + 'px',
          transform: `rotate(${shape.rotation}deg)`,
          animationDelay: shape.delay + 's'
        }"
      ></div>
    </div>

    <!-- 装饰线条 -->
    <div class="decorative-lines">
      <div class="line line-1"></div>
      <div class="line line-2"></div>
      <div class="line line-3"></div>
      <div class="line line-4"></div>
    </div>

    <!-- 装饰圆圈 -->
    <div class="decorative-circles">
      <div class="circle circle-1"></div>
      <div class="circle circle-2"></div>
      <div class="circle circle-3"></div>
    </div>

    <div class="content">
      <h1 ref="titleRef" class="title">
        <span>vibe</span><span class="highlight">Books</span>
      </h1>

      <p ref="subtitleRef" class="subtitle">
        每一本书，都是一个可探索的宇宙
      </p>

      <button ref="buttonRef" @click="handleEnter" class="explore-button">
        <span>探索书籍</span>
        <svg class="arrow" width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M4 10H16M16 10L10 4M16 10L10 16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
.intro-container {
  min-height: 100vh;
  background: #f5f1eb;
  background-image:
    linear-gradient(90deg, rgba(0,0,0,0.02) 1px, transparent 1px),
    linear-gradient(rgba(0,0,0,0.02) 1px, transparent 1px);
  background-size: 50px 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

/* 背景装饰元素 */
.background-decorations {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
}

/* 星星 */
.star {
  position: absolute;
  background: rgba(212, 175, 55, 0.3);
  border-radius: 50%;
  animation: twinkle 3s ease-in-out infinite;
}

@keyframes twinkle {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.2); }
}

/* 漂浮几何图形 */
.floating-shape {
  position: absolute;
  opacity: 0.15;
  animation: float-fade 8s ease-in-out infinite;
}

.floating-shape.circle {
  border: 2px solid #000;
  border-radius: 50%;
}

.floating-shape.line {
  background: #000;
  height: 2px !important;
}

.floating-shape.dot {
  background: #000;
  border-radius: 50%;
}

@keyframes float-fade {
  0%, 100% {
    opacity: 0.15;
    transform: translateY(0) rotate(0deg);
  }
  50% {
    opacity: 0.3;
    transform: translateY(-20px) rotate(5deg);
  }
}

/* 装饰线条 */
.decorative-lines {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 2;
}

.line {
  position: absolute;
  background: #000;
  opacity: 0.08;
}

.line-1 {
  width: 200px;
  height: 2px;
  top: 15%;
  left: 10%;
  transform: rotate(-15deg);
}

.line-2 {
  width: 150px;
  height: 2px;
  top: 25%;
  right: 15%;
  transform: rotate(20deg);
}

.line-3 {
  width: 180px;
  height: 2px;
  bottom: 20%;
  left: 8%;
  transform: rotate(-10deg);
}

.line-4 {
  width: 120px;
  height: 2px;
  bottom: 30%;
  right: 12%;
  transform: rotate(25deg);
}

/* 装饰圆圈 */
.decorative-circles {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 2;
}

.circle {
  position: absolute;
  border: 1px solid #000;
  opacity: 0.06;
  border-radius: 50%;
  animation: pulse-circle 4s ease-in-out infinite;
}

.circle-1 {
  width: 400px;
  height: 400px;
  top: 10%;
  left: 5%;
}

.circle-2 {
  width: 300px;
  height: 300px;
  bottom: 15%;
  right: 10%;
  animation-delay: 1s;
}

.circle-3 {
  width: 200px;
  height: 200px;
  top: 50%;
  right: 20%;
  animation-delay: 2s;
}

@keyframes pulse-circle {
  0%, 100% { transform: scale(1); opacity: 0.06; }
  50% { transform: scale(1.05); opacity: 0.1; }
}

.content {
  text-align: center;
  padding: 2rem;
  position: relative;
  z-index: 10;
}

.title {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
  font-size: clamp(3rem, 15vw, 10rem);
  font-weight: 700;
  letter-spacing: -0.05em;
  margin-bottom: 1rem;
  line-height: 1;
  color: #000;
}

.title .highlight {
  color: rgb(212, 175, 55);
}

.subtitle {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
  font-size: clamp(1rem, 3vw, 1.5rem);
  color: #666;
  font-weight: 400;
  margin-bottom: 3rem;
  letter-spacing: 0.02em;
}

.explore-button {
  position: relative;
  z-index: 10;
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  color: #f5f1eb;
  background: #000;
  border: 2px solid #000;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.2s ease;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.explore-button:hover {
  background: #333;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.explore-button:active {
  transform: translateY(0);
}

.explore-button .arrow {
  transition: transform 0.2s ease;
}

.explore-button:hover .arrow {
  transform: translateX(4px);
}
</style>

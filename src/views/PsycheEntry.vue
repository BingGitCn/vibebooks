<template>
  <div class="entry" @mousemove="onMouse" ref="pageEl">
    <!-- 漂浮墨迹 -->
    <div class="ink-layer" :style="parallax">
      <div class="ink ink-1"></div>
      <div class="ink ink-2"></div>
      <div class="ink ink-3"></div>
      <div class="ink ink-4"></div>
    </div>

    <!-- 漂浮粒子 -->
    <div class="particles">
      <span v-for="n in 12" :key="n" class="particle"
            :style="{
              left: (Math.random() * 100) + '%',
              top: (Math.random() * 100) + '%',
              animationDelay: (Math.random() * 8) + 's',
              animationDuration: (6 + Math.random() * 8) + 's'
            }"
      ></span>
    </div>

    <!-- 主内容 -->
    <div class="entry-center">
      <!-- 上方标注 -->
      <p class="line-0"
         :class="{ on: show }"
         :style="{ animationDelay: '0.3s' }"
      >YOU'VE BEEN HERE BEFORE</p>

      <!-- 主标题 - 逐字浮现 -->
      <h1 class="line-1">
        <span v-for="(c, i) in chars" :key="i"
              class="word"
              :class="{ on: show }"
              :style="{ animationDelay: (0.8 + i * 0.1) + 's' }"
        >{{ c }}</span>
      </h1>

      <!-- 英文副标题 -->
      <p class="line-en"
         :class="{ on: show }"
         :style="{ animationDelay: '2.8s' }"
      >between what you feel and what you know</p>

      <!-- 诗意描述 -->
      <p class="line-2"
         :class="{ on: show }"
         :style="{ animationDelay: '3.2s' }"
      >你感受过它，只是一直没有名字</p>

      <!-- 分隔线 -->
      <div class="divider"
           :class="{ on: show }"
           :style="{ animationDelay: '3.8s' }"
      ></div>

      <!-- 进入按钮 -->
      <router-link to="/hall" class="door"
                   :class="{ on: show }"
                   :style="{ animationDelay: '4.2s' }">
        <span class="door-text">进去看看</span>
        <span class="door-icon">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" stroke-width="1"/>
          </svg>
        </span>
      </router-link>
    </div>

    <!-- 底部 -->
    <div class="entry-bottom" :class="{ on: show }" :style="{ animationDelay: '5s' }">
      <span class="bottom-line"></span>
      <span class="bottom-text">这里不提供答案，只有回声</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, reactive } from 'vue'

const show = ref(false)
const parallax = reactive({ transform: '' })
const pageEl = ref(null)
const titleText = '人的内心是一片旷野'
const chars = computed(() => titleText.split(''))

function onMouse(e) {
  const cx = window.innerWidth / 2
  const cy = window.innerHeight / 2
  const dx = (e.clientX - cx) / cx
  const dy = (e.clientY - cy) / cy
  parallax.transform = `translate(${dx * 15}px, ${dy * 12}px)`
}

onMounted(() => requestAnimationFrame(() => show.value = true))
</script>

<style scoped>
.entry {
  min-height: 100vh;
  background: var(--p-bg);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

/* ===== 墨迹层 ===== */
.ink-layer {
  position: absolute; inset: 0;
  pointer-events: none;
  transition: transform 0.8s var(--ease);
  will-change: transform;
}

.ink {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
}

.ink-1 {
  width: 600px; height: 600px;
  background: radial-gradient(circle, var(--c-psychoanalysis), transparent 70%);
  top: -20%; right: -15%;
  opacity: 0;
  animation: ink-drop 4s var(--ease) both;
  animation-delay: 0.2s;
}

.ink-2 {
  width: 400px; height: 400px;
  background: radial-gradient(circle, var(--c-humanistic), transparent 70%);
  bottom: -10%; left: -12%;
  opacity: 0;
  animation: ink-drop 4s var(--ease) both;
  animation-delay: 0.8s;
}

.ink-3 {
  width: 250px; height: 250px;
  background: radial-gradient(circle, var(--c-cognitive), transparent 70%);
  top: 30%; left: 55%;
  opacity: 0;
  animation: ink-drop 3.5s var(--ease) both;
  animation-delay: 1.4s;
}

.ink-4 {
  width: 180px; height: 180px;
  background: radial-gradient(circle, var(--c-developmental), transparent 70%);
  top: 60%; left: 20%;
  opacity: 0;
  animation: ink-drop 3s var(--ease) both;
  animation-delay: 2s;
}

/* ===== 漂浮粒子 ===== */
.particles {
  position: absolute; inset: 0;
  pointer-events: none;
}

.particle {
  position: absolute;
  width: 2px; height: 2px;
  background: var(--p-text);
  border-radius: 50%;
  opacity: 0;
  animation: flicker 4s ease-in-out infinite;
}

/* ===== 主内容 ===== */
.entry-center {
  position: relative; z-index: 2;
  text-align: left;
  max-width: 560px;
  padding: 0 2rem;
}

/* 标注 */
.line-0 {
  font-family: var(--font-mono);
  font-size: 0.5625rem;
  font-weight: 400;
  letter-spacing: 0.4em;
  color: var(--p-text-ghost);
  margin-bottom: 3rem;
  opacity: 0;
  animation: text-emerge 1.2s var(--ease) both;
}

/* 主标题 */
.line-1 {
  font-family: var(--font-serif);
  font-size: clamp(2.8rem, 8vw, 4.5rem);
  font-weight: 200;
  line-height: 1.6;
  letter-spacing: 0.12em;
  color: var(--p-text-bright);
  margin-bottom: 1.5rem;
}

.word {
  display: inline-block;
  opacity: 0;
  filter: blur(10px);
  animation: text-emerge 0.9s var(--ease) both;
  margin-right: 0.06em;
}

/* 英文副标题 */
.line-en {
  font-family: var(--font-display);
  font-size: clamp(0.875rem, 1.5vw, 1.125rem);
  font-weight: 400;
  font-style: italic;
  letter-spacing: 0.08em;
  color: var(--p-text-mid);
  margin-bottom: 3rem;
  opacity: 0;
  animation: text-emerge 1s var(--ease) both;
}

/* 诗意描述 */
.line-2 {
  font-family: var(--font-serif);
  font-size: clamp(0.875rem, 1.5vw, 1rem);
  font-weight: 300;
  line-height: 2.4;
  color: var(--p-text-mid);
  margin-bottom: 2.5rem;
  opacity: 0;
  animation: float-in 1.2s var(--ease) both;
}

/* 分隔线 */
.divider {
  width: 40px; height: 1px;
  background: var(--p-text-ghost);
  margin-bottom: 2.5rem;
  opacity: 0;
  transform-origin: left;
  animation: line-grow 1s var(--ease) both;
}

/* 进入按钮 */
.door {
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  text-decoration: none;
  color: var(--p-text);
  opacity: 0;
  animation: float-in 1s var(--ease) both;
  cursor: pointer;
  padding: 0.75rem 0;
  transition: gap 0.5s var(--ease), color 0.3s;
}

.door-text {
  font-family: var(--font-serif);
  font-size: 0.9375rem;
  font-weight: 400;
  letter-spacing: 0.06em;
}

.door-icon {
  display: flex;
  align-items: center;
  color: var(--p-text-ghost);
  transition: transform 0.4s var(--ease), color 0.3s;
}

.door:hover {
  color: var(--c-psychoanalysis);
  gap: 1.5rem;
}

.door:hover .door-icon {
  color: var(--c-psychoanalysis);
  transform: translateX(4px);
}

/* 底部 */
.entry-bottom {
  position: absolute;
  bottom: 3rem; left: 0; right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  opacity: 0;
  animation: text-emerge 1s var(--ease) both;
}

.bottom-line {
  display: block;
  width: 24px; height: 1px;
  background: var(--p-text-ghost);
}

.bottom-text {
  font-family: var(--font-serif);
  font-size: 0.75rem;
  font-weight: 300;
  letter-spacing: 0.08em;
  color: var(--p-text-ghost);
  font-style: italic;
}

@media (max-width: 768px) {
  .entry-center { padding: 0 1.5rem; }
  .ink-1 { width: 300px; height: 300px; }
  .ink-2 { width: 250px; height: 250px; }
  .ink-3 { width: 150px; height: 150px; }
  .ink-4 { display: none; }
  .entry-bottom { bottom: 2rem; }
}
</style>

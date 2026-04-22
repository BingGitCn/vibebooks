<template>
  <div class="entry-page" @mousemove="onMouse">
    <!-- 浮动装饰层 -->
    <div class="orbs" :style="parallax">
      <div class="orb orb-1"></div>
      <div class="orb orb-2"></div>
      <div class="orb orb-3"></div>
      <div class="orb orb-4"></div>
      <div class="orb orb-5"></div>
    </div>

    <!-- 线条装饰 -->
    <div class="lines">
      <div class="line line-v" :class="{ draw: show }"></div>
      <div class="line line-h" :class="{ draw: show }"></div>
      <div class="line line-circle" :class="{ draw: show }"></div>
    </div>

    <!-- 主内容 -->
    <div class="entry-content">
      <!-- 主标题 - 逐字浮现 -->
      <div class="entry-title-group">
        <h1 class="entry-title">
          <span
            v-for="(char, i) in titleChars"
            :key="i"
            class="char"
            :class="{ visible: show }"
            :style="{ transitionDelay: (0.3 + i * 0.06) + 's' }"
          >{{ char === ' ' ? '\u00A0' : char }}</span>
        </h1>
      </div>

      <!-- 进入按钮 -->
      <router-link
        to="/hall"
        class="entry-btn fade-up"
        :class="{ visible: show }"
        :style="{ transitionDelay: '1.2s' }"
      >
        <span class="btn-text">走进去</span>
        <span class="btn-arrow">→</span>
      </router-link>
    </div>

    <!-- 底部 -->
    <footer class="entry-footer fade-up" :class="{ visible: show }" :style="{ transitionDelay: '1.6s' }">
      <span class="footer-text">THE MIND GALLERY &middot; 一座关于心灵的档案馆</span>
      <span class="footer-year">2026</span>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, reactive } from 'vue'

const show = ref(false)
const parallax = reactive({ transform: 'translate(0, 0)' })

// 逐字浮现的标题
const titleText = '人的内心是一片旷野'
const titleChars = computed(() => titleText.split(''))

function onMouse(e) {
  const cx = window.innerWidth / 2
  const cy = window.innerHeight / 2
  const dx = (e.clientX - cx) / cx
  const dy = (e.clientY - cy) / cy
  parallax.transform = `translate(${dx * 12}px, ${dy * 8}px)`
}

onMounted(() => {
  requestAnimationFrame(() => { show.value = true })
})
</script>

<style scoped>
@import '../styles/psyche.css';

.entry-page {
  min-height: 100vh;
  background: var(--p-bg);
  background-image:
    radial-gradient(ellipse 80% 60% at 20% 80%, rgba(91,154,111,0.03) 0%, transparent 60%),
    radial-gradient(ellipse 60% 80% at 80% 20%, rgba(107,91,149,0.03) 0%, transparent 60%);
  background-size: 100% 100%;
  animation: bg-shift 20s ease-in-out infinite;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

@keyframes bg-shift {
  0%, 100% { background-position: 0% 0%; }
  50% { background-position: 50% 50%; }
}

/* === 浮动光球 === */
.orbs {
  position: absolute;
  inset: 0;
  pointer-events: none;
  transition: transform 0.6s ease-out;
  will-change: transform;
}

.orb {
  position: absolute;
  border-radius: 50%;
}

.orb-1 {
  width: 380px; height: 380px;
  background: radial-gradient(circle, rgba(107,91,149,0.06) 0%, transparent 70%);
  top: -10%; right: -5%;
  animation: drift-a 18s ease-in-out infinite;
}
.orb-2 {
  width: 260px; height: 260px;
  background: radial-gradient(circle, rgba(91,154,111,0.05) 0%, transparent 70%);
  bottom: 8%; left: -3%;
  animation: drift-b 14s ease-in-out infinite 1s;
}
.orb-3 {
  width: 180px; height: 180px;
  background: radial-gradient(circle, rgba(74,144,164,0.05) 0%, transparent 70%);
  top: 35%; right: 12%;
  animation: drift-a 16s ease-in-out infinite 2.5s;
}
.orb-4 {
  width: 100px; height: 100px;
  background: radial-gradient(circle, rgba(212,168,67,0.06) 0%, transparent 70%);
  top: 18%; left: 15%;
  animation: drift-b 12s ease-in-out infinite 0.5s;
}
.orb-5 {
  width: 220px; height: 220px;
  background: radial-gradient(circle, rgba(196,125,78,0.04) 0%, transparent 70%);
  bottom: 20%; right: -8%;
  animation: drift-a 20s ease-in-out infinite 3s;
}

@keyframes drift-a {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(10px, -12px) scale(1.03); }
  66% { transform: translate(-8px, 8px) scale(0.97); }
}
@keyframes drift-b {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(-12px, -10px) scale(1.04); }
}

/* === 线条装饰 === */
.lines {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.line {
  position: absolute;
}

.line-v {
  width: 1px;
  height: 0;
  background: linear-gradient(to bottom, transparent, rgba(107,91,149,0.12), transparent);
  left: 20%;
  top: 10%;
  transition: height 1.8s cubic-bezier(0.16, 1, 0.3, 1) 0.5s;
}
.line-v.draw { height: 40%; }

.line-h {
  height: 1px;
  width: 0;
  background: linear-gradient(to right, transparent, rgba(91,154,111,0.1), transparent);
  top: 72%;
  right: 10%;
  transition: width 1.6s cubic-bezier(0.16, 1, 0.3, 1) 0.7s;
}
.line-h.draw { width: 30%; }

.line-circle {
  width: 120px; height: 120px;
  border: 1px solid rgba(74,144,164,0.06);
  border-radius: 50%;
  top: 15%; right: 18%;
  transform: scale(0);
  transition: transform 1.4s cubic-bezier(0.16, 1, 0.3, 1) 0.9s;
  animation: spin-slow 30s linear infinite;
}
.line-circle.draw { transform: scale(1); }

@keyframes spin-slow {
  from { transform: scale(1) rotate(0deg); }
  to { transform: scale(1) rotate(360deg); }
}

/* === 主内容 === */
.entry-content {
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 560px;
  padding: 0 2rem;
}

/* 标题组 */
.entry-title-group {
  margin-bottom: 3rem;
}

.entry-title {
  font-family: var(--font-serif);
  font-size: clamp(3rem, 8vw, 5rem);
  font-weight: 300;
  letter-spacing: 0.08em;
  color: var(--p-text);
  line-height: 1.35;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

/* 逐字浮现 */
.char {
  display: inline-block;
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}
.char.visible {
  opacity: 1;
  transform: translateY(0);
}

/* 按钮 */
.entry-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2.5rem;
  border: 1px solid var(--p-text);
  background: transparent;
  color: var(--p-text);
  text-decoration: none;
  font-family: var(--font-sans);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  transition: all 0.35s var(--ease);
  cursor: pointer;
  animation: btn-breathe 5s ease-in-out infinite;
}

@keyframes btn-breathe {
  0%, 100% { border-color: rgba(44, 44, 44, 0.6); }
  50% { border-color: rgba(44, 44, 44, 1); }
}

.entry-btn:hover {
  background: var(--p-text);
  color: var(--p-bg);
}

.entry-btn:hover .btn-arrow {
  transform: translateX(4px);
}

.btn-text { transition: color 0.35s; }

.btn-arrow {
  font-weight: 300;
  font-size: 1rem;
  transition: transform 0.35s var(--ease), color 0.35s;
}

/* === 底部 === */
.entry-footer {
  position: absolute;
  bottom: 0;
  left: 0; right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2.5rem;
  pointer-events: none;
}

.footer-text {
  font-family: var(--font-sans);
  font-size: 0.5625rem;
  font-weight: 600;
  letter-spacing: 0.3em;
  color: var(--p-text-light);
  opacity: 0.35;
}

.footer-year {
  font-family: var(--font-sans);
  font-size: 0.5625rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  color: var(--p-text-light);
  opacity: 0.3;
}

/* === 响应式 === */
@media (max-width: 768px) {
  .entry-content { padding: 0 1.5rem; }
  .entry-footer { padding: 1.25rem 1.5rem; }
  .orb-1 { width: 220px; height: 220px; }
  .orb-2 { width: 160px; height: 160px; }
  .orb-5 { display: none; }
  .line-v { left: 10%; }
  .line-circle { width: 80px; height: 80px; right: 8%; }
}
</style>

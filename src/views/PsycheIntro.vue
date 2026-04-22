<template>
  <div class="mind-intro">
    <!-- 装饰几何体 -->
    <div class="geo geo-1"></div>
    <div class="geo geo-2"></div>
    <div class="geo geo-3"></div>

    <div class="intro-body">
      <!-- 顶部标签 -->
      <p class="tag fade-up" :class="{ visible: show }">
        <router-link to="/" class="tag-back">←</router-link>
        <span class="tag-dot"></span>
        THE MIND GALLERY
      </p>

      <!-- 主标题 -->
      <h1 class="title fade-up" :class="{ visible: show }" :style="{ transitionDelay: '0.1s' }">
        六条路
      </h1>

      <p class="subtitle fade-up" :class="{ visible: show }" :style="{ transitionDelay: '0.2s' }">
        从不同的方向，走向同一个谜
      </p>

      <!-- 分隔线 -->
      <div class="sep fade-up" :class="{ visible: show }" :style="{ transitionDelay: '0.3s' }"></div>

      <!-- 六个流派入口 -->
      <div class="schools-grid">
        <router-link
          v-for="(school, i) in schools"
          :key="school.id"
          :to="`/school/${school.id}`"
          class="school-card fade-up"
          :class="{ visible: show }"
          :style="{
            '--accent': school.accent,
            transitionDelay: (0.35 + i * 0.08) + 's',
          }"
        >
          <span class="card-icon">{{ school.icon }}</span>
          <div class="card-body">
            <p class="card-name-en">{{ school.nameEn }}</p>
            <p class="card-name">{{ school.name }}</p>
            <p class="card-period">{{ school.period }}</p>
          </div>
          <p class="card-subtitle">{{ school.subtitle }}</p>
          <span class="card-arrow">→</span>
        </router-link>
      </div>
    </div>

    <!-- 底部 -->
    <footer class="intro-footer fade-up" :class="{ visible: show }" :style="{ transitionDelay: '1s' }">
      <span>一座关于心灵的档案馆</span>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { schools } from '../data/psychology'

const show = ref(false)
onMounted(() => {
  requestAnimationFrame(() => { show.value = true })
})
</script>

<style scoped>
@import '../styles/psyche.css';

.mind-intro {
  min-height: 100vh;
  background: var(--p-bg);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

/* === 浮动装饰 === */
.geo {
  position: absolute;
  border-radius: 50%;
  opacity: 0.08;
  pointer-events: none;
}
.geo-1 {
  width: 320px; height: 320px;
  background: var(--c-humanistic);
  top: -80px; right: -60px;
  animation: gentle-float 8s ease-in-out infinite;
}
.geo-2 {
  width: 200px; height: 200px;
  background: var(--c-cognitive);
  bottom: 15%; left: -40px;
  animation: gentle-float 6s ease-in-out infinite 1s;
}
.geo-3 {
  width: 140px; height: 140px;
  background: var(--c-behaviorism);
  top: 40%; right: 8%;
  animation: gentle-float 7s ease-in-out infinite 2s;
}

/* === 主体 === */
.intro-body {
  max-width: 960px;
  margin: 0 auto;
  padding: 5rem 2rem 3rem;
  position: relative;
  z-index: 1;
  flex: 1;
}

/* 标签 */
.tag {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-sans);
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.25em;
  color: var(--p-text-light);
  margin-bottom: 2rem;
}
.tag-back {
  color: var(--p-text-light);
  text-decoration: none;
  font-size: 1rem;
  transition: color 0.2s;
  margin-right: 0.25rem;
}
.tag-back:hover { color: var(--p-text); }
.tag-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: var(--c-cognitive);
}

/* 标题 */
.title {
  font-family: var(--font-serif);
  font-size: clamp(2rem, 5vw, 3.25rem);
  font-weight: 400;
  line-height: 1.35;
  color: var(--p-text);
  margin-bottom: 1.25rem;
}

.subtitle {
  font-family: var(--font-serif);
  font-size: clamp(0.9375rem, 2vw, 1.125rem);
  font-weight: 300;
  line-height: 1.7;
  color: var(--p-text-light);
  margin-bottom: 2.5rem;
}

.sep {
  width: 48px; height: 2px;
  background: var(--c-cognitive);
  opacity: 0.4;
  margin-bottom: 3rem;
}

/* === 流派网格 === */
.schools-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.school-card {
  display: flex;
  flex-direction: column;
  padding: 1.75rem;
  background: var(--p-card);
  backdrop-filter: blur(12px);
  border: 1px solid var(--p-border);
  text-decoration: none;
  color: var(--p-text);
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.35s var(--ease), box-shadow 0.35s var(--ease), border-color 0.35s ease;
}

.school-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 32px rgba(0,0,0,0.06);
  border-color: var(--accent);
}

.card-icon {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  display: block;
  animation: gentle-float 5s ease-in-out infinite;
}

.card-body {
  margin-bottom: 0.75rem;
}

.card-name-en {
  font-family: var(--font-sans);
  font-size: 0.625rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  color: var(--accent);
  margin-bottom: 0.25rem;
}

.card-name {
  font-family: var(--font-serif);
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.card-period {
  font-family: var(--font-sans);
  font-size: 0.625rem;
  font-weight: 400;
  color: var(--p-text-light);
  letter-spacing: 0.05em;
}

.card-subtitle {
  font-family: var(--font-serif);
  font-size: 0.8125rem;
  font-style: italic;
  color: var(--p-text-light);
  line-height: 1.5;
  flex: 1;
}

.card-arrow {
  position: absolute;
  bottom: 1.25rem;
  right: 1.25rem;
  font-family: var(--font-sans);
  font-size: 0.875rem;
  font-weight: 300;
  color: var(--p-text-light);
  opacity: 0;
  transform: translateX(-6px);
  transition: all 0.3s var(--ease);
}

.school-card:hover .card-arrow {
  opacity: 1;
  transform: translateX(0);
  color: var(--accent);
}

/* === 底部 === */
.intro-footer {
  text-align: center;
  padding: 1.5rem;
  font-family: var(--font-sans);
  font-size: 0.625rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  color: var(--p-text-light);
  opacity: 0.6;
}

/* === 响应式 === */
@media (max-width: 768px) {
  .intro-body { padding: 3rem 1.25rem 2rem; }
  .schools-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
  }
  .school-card { padding: 1.25rem; }
  .card-name { font-size: 1.05rem; }
}

@media (max-width: 480px) {
  .schools-grid { grid-template-columns: 1fr; }
}
</style>

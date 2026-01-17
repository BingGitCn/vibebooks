<template>
  <div class="siberia-scene">
    <div class="snowfield">
      <!-- 雪花飘落 -->
      <div class="snowflakes">
        <div v-for="n in 50" :key="n" class="snowflake" :style="getSnowflakeStyle(n)"></div>
      </div>

      <!-- 地平线 -->
      <div class="horizon"></div>

      <!-- 地平线上的两个人影 -->
      <div class="figures-silhouette">
        <!-- 拉斯科尔尼科夫（跪着） -->
        <div class="figure raskolnikov" :class="{ 'is-kneeling': isKneeling }">
          <div class="figure-body"></div>
        </div>

        <!-- 索尼娅（走向他） -->
        <div class="figure sonya" :class="{ 'is-approaching': isApproaching, 'has-reached': hasReached }">
          <div class="figure-body"></div>
        </div>
      </div>

      <!-- "复活"字幕 -->
      <transition name="resurrection-appear">
        <div v-if="showResurrection" class="resurrection-text">
          <h1 class="resurrection-title">复活</h1>
          <p class="resurrection-subtitle">Воскресение</p>
        </div>
      </transition>

      <!-- 最终文字 -->
      <transition name="final-text-appear">
        <div v-if="showFinalText" class="final-text">
          <p>"我复活了。你知道吗...我复活了。"</p>
          <button class="end-btn" @click="emit('next')">结束</button>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const emit = defineEmits(['next'])
const isKneeling = ref(false)
const isApproaching = ref(false)
const hasReached = ref(false)
const showResurrection = ref(false)
const showFinalText = ref(false)

const getSnowflakeStyle = (n) => {
  return {
    left: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 5}s`,
    animationDuration: `${5 + Math.random() * 5}s`
  }
}

onMounted(() => {
  // 时间线
  setTimeout(() => {
    isKneeling.value = true
  }, 1000)

  setTimeout(() => {
    isApproaching.value = true
  }, 2500)

  setTimeout(() => {
    hasReached.value = true
  }, 5000)

  setTimeout(() => {
    showResurrection.value = true
  }, 6500)

  setTimeout(() => {
    showFinalText.value = true
  }, 8000)
})
</script>

<style scoped>
.siberia-scene {
  width: 100%;
  height: 100vh;
  background: linear-gradient(180deg, #e6f3ff 0%, #cce7ff 50%, #b3d9ff 100%);
  position: relative;
  overflow: hidden;
}

.snowfield {
  width: 100%;
  height: 100%;
  position: relative;
}

/* === 雪花 === */
.snowflakes {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.snowflake {
  position: absolute;
  top: -10px;
  width: 4px;
  height: 4px;
  background: #fff;
  border-radius: 50%;
  opacity: 0.8;
  animation: snowfall linear infinite;
}

@keyframes snowfall {
  0% {
    transform: translateY(0) rotate(0deg);
  }
  100% {
    transform: translateY(100vh) rotate(360deg);
  }
}

/* === 地平线 === */
.horizon {
  position: absolute;
  bottom: 20%;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent 0%, #fff 50%, transparent 100%);
}

/* === 人影剪影 === */
.figures-silhouette {
  position: absolute;
  bottom: 20%;
  left: 50%;
  transform: translateX(-50%);
  width: 300px;
  height: 200px;
}

.figure {
  position: absolute;
  bottom: 0;
  width: 60px;
  height: 150px;
}

.figure .figure-body {
  width: 100%;
  height: 100%;
  background: #2c3e50;
  border-radius: 30px 30px 0 0;
  position: relative;
}

/* 拉斯科尔尼科夫（跪着） */
.raskolnikov {
  left: 30%;
  transition: all 1s ease;
}

.raskolnikov.is-kneeling {
  transform: scaleY(0.6) translateY(40%);
}

/* 索尼娅（走向） */
.sonya {
  right: 30%;
  transition: all 3s ease;
}

.sonya.is-approaching {
  right: 45%;
}

.sonya.has-reached {
  right: 42%;
}

/* === "复活"字幕 === */
.resurrection-text {
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  z-index: 100;
}

.resurrection-title {
  font-size: clamp(4rem, 10vw, 8rem);
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 0.5rem;
  letter-spacing: 0.5em;
  text-shadow: 0 4px 20px rgba(255, 255, 255, 0.8);
}

.resurrection-subtitle {
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  font-weight: 300;
  color: #5a6c7d;
  margin: 0;
  letter-spacing: 0.3em;
}

/* === 最终文字 === */
.final-text {
  position: absolute;
  bottom: 30%;
  left: 50%;
  transform: translateX(-50%);
  max-width: 700px;
  text-align: center;
  padding: 3rem;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(44, 62, 80, 0.2);
  z-index: 100;
}

.final-text p {
  font-size: 1.5rem;
  line-height: 2;
  color: #2c3e50;
  margin-bottom: 2rem;
  font-style: italic;
}

.end-btn {
  padding: 1rem 3rem;
  background: #2c3e50;
  border: none;
  border-radius: 8px;
  color: #fff;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.end-btn:hover {
  background: #1a252f;
  transform: scale(1.05);
}

/* === 出现动画 === */
.resurrection-appear-enter-active {
  transition: all 2s ease;
}

.resurrection-appear-enter-from {
  opacity: 0;
  transform: translateX(-50%) scale(0.8);
}

.resurrection-appear-enter-to {
  opacity: 1;
  transform: translateX(-50%) scale(1);
}

.final-text-appear-enter-active {
  transition: all 1.5s ease;
}

.final-text-appear-enter-from {
  opacity: 0;
  transform: translateX(-50%) translateY(20px);
}

.final-text-appear-enter-to {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}

/* === 响应式设计 === */
@media (max-width: 768px) {
  .figures-silhouette {
    transform: translateX(-50%) scale(0.7);
  }

  .resurrection-title {
    letter-spacing: 0.3em;
  }

  .resurrection-subtitle {
    letter-spacing: 0.2em;
  }

  .final-text {
    transform: translateX(-50%) scale(0.9);
    max-width: 90%;
    padding: 2rem;
  }

  .final-text p {
    font-size: 1.2rem;
  }
}
</style>

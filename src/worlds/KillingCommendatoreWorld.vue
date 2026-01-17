<template>
  <div class="killing-commendatore-world" @scroll="handleScroll" ref="scrollContainer">
    <!-- 跃迁动画 -->
    <transition name="warp">
      <div v-if="showWarp" class="warp-overlay">
        <div class="warp-circle">
          <div class="warp-circle-inner"></div>
        </div>
        <div class="warp-text">刺杀骑士团长</div>
      </div>
    </transition>

    <!-- 返回按钮 -->
    <button class="exit-btn" @click="exitWorld">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M19 12H5M12 19l-7-7 7-7"/>
      </svg>
      <span>Return</span>
    </button>

    <!-- 长卷容器 -->
    <div class="scroll-content">
      <!-- 段落1：婚姻崩塌 -->
      <section class="scroll-section" :class="{ active: activeSection >= 1 }">
        <svg class="section-svg" viewBox="0 0 200 200">
          <line x1="50" y1="100" x2="100" y2="100" stroke="#1a1a1a" stroke-width="2" opacity="0.6"/>
          <line x1="105" y1="100" x2="150" y2="100" stroke="#1a1a1a" stroke-width="2" opacity="0.3" stroke-dasharray="4,4"/>
        </svg>
        <p class="section-quote">"有些事情，一旦开始就无法回头"</p>
        <p class="section-desc">六周前，妻子突然提出离婚。我离开家，搬进山间旧居。</p>
        <div class="section-number">01</div>
      </section>

      <!-- 段落2：山间生活 -->
      <section class="scroll-section" :class="{ active: activeSection >= 2 }">
        <svg class="section-svg" viewBox="0 0 200 200">
          <path d="M40,160 L100,100 L160,140" stroke="#1a1a1a" stroke-width="1.5" fill="none" opacity="0.5"/>
        </svg>
        <p class="section-quote">"我需要一个新的开始"</p>
        <p class="section-desc">应雨田政彦之邀，我住进这座山间房子。远离人群，教绘画班度日。</p>
        <div class="section-number">02</div>
      </section>

      <!-- 段落3：阁楼发现 -->
      <section class="scroll-section" :class="{ active: activeSection >= 3 }">
        <svg class="section-svg" viewBox="0 0 200 200">
          <rect x="60" y="60" width="80" height="80" stroke="#1a1a1a" stroke-width="2" fill="none" opacity="0.6"/>
          <circle cx="100" cy="100" r="15" stroke="#1a1a1a" stroke-width="1.5" fill="none" opacity="0.4"/>
        </svg>
        <p class="section-quote">"那幅画在等我"</p>
        <p class="section-desc">在阁楼里，我发现了雨田具彦尘封的巨作——《刺杀骑士团长》。</p>
        <div class="section-number">03</div>
      </section>

      <!-- 段落4：夜半铃声 -->
      <section class="scroll-section" :class="{ active: activeSection >= 4 }">
        <svg class="section-svg" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="30" stroke="#4a5568" stroke-width="1.5" fill="none" opacity="0.6"/>
          <circle cx="100" cy="100" r="45" stroke="#4a5568" stroke-width="1" fill="none" opacity="0.4"/>
          <circle cx="100" cy="100" r="60" stroke="#4a5568" stroke-width="1" fill="none" opacity="0.3"/>
        </svg>
        <p class="section-quote">"铃声从画中传来"</p>
        <p class="section-desc">半夜，我被一阵铃声惊醒。有人在摇铃，向我发出信号。</p>
        <div class="section-number">04</div>
      </section>

      <!-- 段落5：长面人 -->
      <section class="scroll-section" :class="{ active: activeSection >= 5 }">
        <svg class="section-svg" viewBox="0 0 200 200">
          <ellipse cx="100" cy="100" rx="25" ry="35" stroke="#4a5568" stroke-width="1.5" fill="none" opacity="0.6"/>
          <circle cx="100" cy="90" r="3" fill="#4a5568" opacity="0.5"/>
        </svg>
        <p class="section-quote">"他戴着面具，看不清脸"</p>
        <p class="section-desc">长面人出现了。他说是从画里来的，要我去完成一件事。</p>
        <div class="section-number">05</div>
      </section>

      <!-- 段落6：免色的故事 -->
      <section class="scroll-section" :class="{ active: activeSection >= 6 }">
        <svg class="section-svg" viewBox="0 0 200 200">
          <circle cx="70" cy="100" r="6" fill="#4a5568" opacity="0.6"/>
          <circle cx="130" cy="100" r="4" fill="#4a5568" opacity="0.4"/>
          <path d="M76,100 L124,100" stroke="#4a5568" stroke-width="1" opacity="0.3" stroke-dasharray="3,3"/>
        </svg>
        <p class="section-quote">"我在寻找我的女儿"</p>
        <p class="section-desc">免色，我的邻居，一直在寻找失踪的女儿。他说，女儿被带走了。</p>
        <div class="section-number">06</div>
      </section>

      <!-- 段落7：通往古庙 -->
      <section class="scroll-section" :class="{ active: activeSection >= 7 }">
        <svg class="section-svg" viewBox="0 0 200 200">
          <rect x="80" y="40" width="40" height="60" stroke="#6366f1" stroke-width="1.5" fill="none" opacity="0.6"/>
          <path d="M100,100 L100,180" stroke="#6366f1" stroke-width="1.5" opacity="0.5"/>
          <circle cx="100" cy="180" r="4" fill="#6366f1" opacity="0.7"/>
        </svg>
        <p class="section-quote">"两个世界，只有一墙之隔"</p>
        <p class="section-desc">通过山洞，我可以到达古庙。那里是另一个世界。</p>
        <div class="section-number">07</div>
      </section>

      <!-- 段落8：骑士团长 -->
      <section class="scroll-section" :class="{ active: activeSection >= 8 }">
        <svg class="section-svg" viewBox="0 0 200 200">
          <circle cx="100" cy="70" r="15" stroke="#6366f1" stroke-width="1.5" fill="none" opacity="0.6"/>
          <line x1="100" y1="85" x2="100" y2="150" stroke="#6366f1" stroke-width="2" opacity="0.7"/>
          <line x1="100" y1="100" x2="75" y2="130" stroke="#6366f1" stroke-width="1.5" opacity="0.5"/>
          <line x1="100" y1="100" x2="125" y2="130" stroke="#6366f1" stroke-width="1.5" opacity="0.5"/>
        </svg>
        <p class="section-quote">"你必须替我完成这件事"</p>
        <p class="section-desc">骑士团长从画中走出。他需要我替他刺杀某人。</p>
        <div class="section-number">08</div>
      </section>

      <!-- 段落9：线索交汇 -->
      <section class="scroll-section" :class="{ active: activeSection >= 9 }">
        <svg class="section-svg" viewBox="0 0 200 200">
          <circle cx="60" cy="80" r="4" fill="#1a1a1a" opacity="0.6"/>
          <circle cx="140" cy="80" r="4" fill="#1a1a1a" opacity="0.6"/>
          <circle cx="100" cy="120" r="4" fill="#6366f1" opacity="0.7"/>
          <circle cx="100" cy="60" r="3" fill="#1a1a1a" opacity="0.5"/>
          <path d="M60,84 Q80,100 100,115" stroke="#1a1a1a" stroke-width="0.5" opacity="0.3"/>
          <path d="M140,84 Q120,100 100,115" stroke="#1a1a1a" stroke-width="0.5" opacity="0.3"/>
          <path d="M100,64 L100,116" stroke="#6366f1" stroke-width="0.5" opacity="0.3"/>
        </svg>
        <p class="section-quote">"所有的失去，都会以另一种方式归来"</p>
        <p class="section-desc">妻子、妹妹、免色的女儿、那幅画——四条线索在这里交汇。</p>
        <div class="section-number">09</div>
      </section>

      <!-- 段落10：和解与重生 -->
      <section class="scroll-section" :class="{ active: activeSection >= 10 }">
        <svg class="section-svg" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="50" stroke="#10b981" stroke-width="1.5" fill="none" opacity="0.6"/>
          <circle cx="100" cy="100" r="35" stroke="#10b981" stroke-width="1" fill="none" opacity="0.5"/>
          <circle cx="100" cy="100" r="20" fill="#10b981" opacity="0.4"/>
        </svg>
        <p class="section-quote">"我终于与过去和解"</p>
        <p class="section-desc">面对内心的黑暗，我完成了仪式。创伤被治愈，艺术重新开始。</p>
        <div class="section-number">10</div>
        <button class="back-to-universe" @click="exitWorld">返回宇宙</button>
      </section>
    </div>

    <!-- 滚动进度 -->
    <div class="scroll-progress">
      <div
        v-for="i in 10"
        :key="i"
        class="progress-dot"
        :class="{ active: activeSection >= i }"
        @click="scrollToSection(i)"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const scrollContainer = ref(null)
const showWarp = ref(true)
const activeSection = ref(0)

const handleScroll = (e) => {
  const container = e.target
  const scrollPercent = container.scrollTop / (container.scrollHeight - container.clientHeight)
  activeSection.value = Math.min(10, Math.ceil(scrollPercent * 10))
}

const scrollToSection = (index) => {
  const container = scrollContainer.value
  const targetScroll = (container.scrollHeight - container.clientHeight) * (index - 1) / 9
  container.scrollTo({ top: targetScroll, behavior: 'smooth' })
}

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
.killing-commendatore-world {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #f7f5f2;
  overflow-y: auto;
  overflow-x: hidden;
  font-family: 'Noto Serif SC', serif;
  scroll-behavior: smooth;
}

/* === 跃迁动画 === */
.warp-overlay {
  position: fixed;
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

/* === 滚动内容 === */
.scroll-content {
  width: 100%;
  min-height: 1000vh;
  padding: 8rem 2rem 4rem;
}

.scroll-section {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  opacity: 0.3;
  transition: opacity 0.6s ease;
  padding: 4rem 2rem;
}

.scroll-section.active {
  opacity: 1;
}

.section-svg {
  width: 280px;
  height: 280px;
  margin-bottom: 1rem;
}

.section-quote {
  font-family: 'Noto Serif SC', serif;
  font-size: clamp(1.2rem, 3vw, 1.8rem);
  font-weight: 400;
  letter-spacing: 0.15em;
  color: #1a1a1a;
  text-align: center;
  margin: 0;
  line-height: 1.6;
}

.section-desc {
  font-family: 'Noto Serif SC', serif;
  font-size: clamp(0.9rem, 2vw, 1.2rem);
  font-weight: 300;
  letter-spacing: 0.1em;
  color: rgba(26, 26, 26, 0.6);
  text-align: center;
  margin: 0;
  line-height: 1.8;
  max-width: 600px;
}

.section-number {
  position: absolute;
  top: 2rem;
  right: 2rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  color: rgba(26, 26, 26, 0.3);
}

/* === 返回按钮（最后一段） === */
.back-to-universe {
  margin-top: 2rem;
  padding: 0.875rem 2rem;
  background: transparent;
  border: 1px solid #1a1a1a;
  color: #1a1a1a;
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.back-to-universe:hover {
  background: #1a1a1a;
  color: #f7f5f2;
}

/* === 滚动进度 === */
.scroll-progress {
  position: fixed;
  right: 2rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  z-index: 1000;
}

.progress-dot {
  width: 8px;
  height: 8px;
  border: 1px solid rgba(26, 26, 26, 0.3);
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
}

.progress-dot:hover {
  transform: scale(1.2);
}

.progress-dot.active {
  background: #6366f1;
  border-color: #6366f1;
}

/* === 过渡动画 === */
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
  .scroll-content {
    padding: 6rem 1rem 2rem;
  }

  .scroll-section {
    padding: 2rem 1rem;
  }

  .section-svg {
    width: 200px;
    height: 200px;
  }

  .exit-btn {
    top: 1rem;
    left: 1rem;
    padding: 0.75rem 1.25rem;
    font-size: 0.65rem;
  }

  .scroll-progress {
    right: 1rem;
  }

  .progress-dot {
    width: 6px;
    height: 6px;
  }

  .section-number {
    top: 1rem;
    right: 1rem;
    font-size: 0.65rem;
  }
}

@media (max-width: 480px) {
  .section-quote {
    font-size: 1rem;
  }

  .section-desc {
    font-size: 0.9rem;
  }

  .section-svg {
    width: 160px;
    height: 160px;
  }
}
</style>

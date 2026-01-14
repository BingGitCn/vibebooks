<template>
  <div class="little-prince-page min-h-screen bg-black text-white overflow-hidden">
    <!-- 星空背景 -->
    <div class="starfield" ref="starfield">
      <div
        v-for="(star, index) in stars"
        :key="index"
        class="star"
        :style="{
          left: `${star.x}%`,
          top: `${star.y}%`,
          animationDelay: `${star.delay}s`,
          animationDuration: `${star.duration}s`
        }"
      ></div>
    </div>

    <!-- 粒子容器 -->
    <div ref="particleContainer" class="particle-container"></div>

    <!-- 场景容器 -->
    <transition name="scene-fade" mode="out-in">
      <!-- Intro 场景 -->
      <div v-if="currentScene === 'intro'" key="intro" class="scene intro-scene">
        <div class="content">
          <h1 class="title font-display text-6xl md:text-8xl font-bold text-center mb-8">
            小王子
          </h1>
          <p class="subtitle font-body text-xl md:text-2xl text-center mb-16 opacity-80">
            "所有的大人起初都是孩子，但很少有大人记得这一点"
          </p>

          <!-- 场景入口按钮 -->
          <div class="scene-entries grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <button
              @click="goToScene('planets')"
              class="scene-btn group"
            >
              <div class="icon">🪐</div>
              <div class="label">星球探索</div>
              <div class="desc">拜访奇怪的大人</div>
            </button>

            <button
              @click="goToScene('sunsets')"
              class="scene-btn group"
            >
              <div class="icon">🌅</div>
              <div class="label">44次日落</div>
              <div class="desc">追逐夕阳</div>
            </button>

            <button
              @click="goToScene('rose')"
              class="scene-btn group"
            >
              <div class="icon">🌹</div>
              <div class="label">玫瑰驯养</div>
              <div class="desc">爱需要行动</div>
            </button>

            <button
              @click="goToScene('fox')"
              class="scene-btn group"
            >
              <div class="icon">🦊</div>
              <div class="label">狐狸驯养</div>
              <div class="desc">建立联系</div>
            </button>
          </div>
        </div>
      </div>

      <!-- 星球探索场景 -->
      <div v-else-if="currentScene === 'planets'" key="planets" class="scene planets-scene">
        <button @click="goToScene('intro')" class="back-btn">← 返回</button>

        <div class="content">
          <h2 class="scene-title font-display text-4xl md:text-5xl text-center mb-12">
            星球探索
          </h2>

          <div class="planets-container">
            <div
              v-for="planet in planets"
              :key="planet.id"
              class="planet"
              :class="{ visited: planet.visited }"
              @click="visitPlanet(planet)"
              :style="{ borderColor: planet.visited ? '#FFD700' : 'rgba(255,255,255,0.3)' }"
            >
              <div class="planet-icon">{{ planet.icon }}</div>
              <div class="planet-info">
                <div class="planet-name">{{ planet.name }}</div>
                <div class="planet-desc">{{ planet.desc }}</div>
              </div>
            </div>
          </div>

          <div v-if="visitedCount >= 3" class="completion-message">
            <p>你已经拜访了足够多的大人</p>
            <p class="text-yellow-400">大人们真是奇怪啊</p>
          </div>
        </div>
      </div>

      <!-- 44次日落场景 -->
      <div v-else-if="currentScene === 'sunsets'" key="sunsets" class="scene sunsets-scene">
        <button @click="goToScene('intro')" class="back-btn">← 返回</button>

        <div class="content">
          <h2 class="scene-title font-display text-4xl md:text-5xl text-center mb-8">
            44次日落
          </h2>
          <p class="scene-subtitle text-center mb-12 opacity-70">
            "你这个人有一天看了四十三次日落" <br>
            "你知道，当人感到悲伤时，就喜欢看日落"
          </p>

          <div class="sunset-counter text-center mb-8">
            <span class="count">{{ sunsetCount }}</span>
            <span class="total">/ 44</span>
          </div>

          <!-- 太阳 -->
          <div class="sun-container" ref="sunContainer">
            <div
              class="sun"
              ref="sun"
              :style="{
                bottom: `${sunPosition}%`,
                background: sunGradient
              }"
              @click="chaseSun"
            ></div>
          </div>

          <p class="instruction text-center opacity-60">
            点击太阳追逐日落
          </p>

          <div v-if="sunsetCount >= 44" class="completion-message">
            <p>你看了44次日落</p>
            <p class="text-yellow-400">悲伤慢慢消散在晚霞中</p>
          </div>
        </div>
      </div>

      <!-- 玫瑰驯养场景 -->
      <div v-else-if="currentScene === 'rose'" key="rose" class="scene rose-scene">
        <button @click="goToScene('intro')" class="back-btn">← 返回</button>

        <div class="content">
          <h2 class="scene-title font-display text-4xl md:text-5xl text-center mb-8">
            玫瑰驯养
          </h2>
          <p class="scene-subtitle text-center mb-12 opacity-70">
            "正因为你为你的玫瑰花费了时间，才使你的玫瑰变得如此重要"
          </p>

          <div class="rose-container" ref="roseContainer">
            <div class="rose" :style="{ transform: `scale(${roseHealth})`, opacity: roseHealth }">
              🌹
            </div>

            <div class="care-actions">
              <button @click="waterRose" class="care-btn water-btn" :disabled="watered">
                <span class="icon">💧</span>
                <span class="label">浇水</span>
              </button>

              <button @click="shieldRose" class="care-btn shield-btn" :disabled="shielded">
                <span class="icon">🛡️</span>
                <span class="label">挡风</span>
              </button>

              <button @click="listenToRose" class="care-btn listen-btn">
                <span class="icon">👂</span>
                <span class="label">倾听</span>
              </button>
            </div>

            <div class="rose-progress">
              <div class="progress-bar">
                <div class="progress-fill" :style="{ width: `${roseProgress}%` }"></div>
              </div>
              <span class="progress-text">{{ roseProgress }}%</span>
            </div>

            <div v-if="roseProgress >= 100" class="completion-message">
              <p>玫瑰完全绽放了</p>
              <p class="text-pink-400">她现在是世界上独一无二的玫瑰</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 狐狸驯养场景 -->
      <div v-else-if="currentScene === 'fox'" key="fox" class="scene fox-scene">
        <button @click="goToScene('intro')" class="back-btn">← 返回</button>

        <div class="content">
          <h2 class="scene-title font-display text-4xl md:text-5xl text-center mb-8">
            狐狸驯养
          </h2>
          <p class="scene-subtitle text-center mb-12 opacity-70">
            "驯养就是建立联系...如果你驯养了我，我们就会彼此需要"
          </p>

          <div class="fox-container">
            <div class="fox" ref="fox">
              🦊
            </div>

            <div class="distance-indicator">
              <span class="distance">{{ Math.round(foxDistance) }}米</span>
              <div class="distance-bar">
                <div
                  class="distance-fill"
                  :style="{ width: `${100 - (foxDistance / 100) * 100}%` }"
                ></div>
              </div>
              <p class="step-indicator">第 {{ foxStep }}/10 步</p>
            </div>

            <button
              @click="approachFox"
              class="approach-btn"
              :disabled="foxStep >= 10"
            >
              靠近一步
            </button>

            <div class="steps-grid">
              <div
                v-for="step in 10"
                :key="step"
                class="step-dot"
                :class="{ active: step <= foxStep }"
              ></div>
            </div>

            <div v-if="foxStep >= 10" class="completion-message">
              <p>你驯养了狐狸</p>
              <p class="text-orange-400">"对我来说，你就是世界上唯一的了"</p>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import gsap from 'gsap'

const currentScene = ref('intro')
const starfield = ref(null)
const particleContainer = ref(null)
const sun = ref(null)
const sunContainer = ref(null)
const roseContainer = ref(null)
const fox = ref(null)

// 星空数据
const stars = ref([])

// 星球探索数据
const planets = ref([
  { id: 1, name: '国王', icon: '👑', desc: '统治一切却无人可统治', visited: false },
  { id: 2, name: '爱慕虚荣的人', icon: '🪞', desc: '只听得进赞美', visited: false },
  { id: 3, name: '酒鬼', icon: '🍷', desc: '为了忘记羞愧而喝酒', visited: false },
  { id: 4, name: '商人', icon: '💰', desc: '忙着数星星占为己有', visited: false },
  { id: 5, name: '点灯人', icon: '💡', desc: '忠实履行职责', visited: false },
  { id: 6, name: '地理学家', icon: '📚', desc: '从不探险的学者', visited: false },
])

// 日落数据
const sunsetCount = ref(0)
const sunPosition = ref(80)
const sunGradient = ref('linear-gradient(180deg, #FFD700 0%, #FF8C00 50%, #FF4500 100%)')

// 玫瑰数据
const roseHealth = ref(0.3)
const roseProgress = ref(0)
const watered = ref(false)
const shielded = ref(false)

// 狐狸数据
const foxDistance = ref(100)
const foxStep = ref(0)

// 计算属性
const visitedCount = computed(() => planets.value.filter(p => p.visited).length)

// 初始化星空
onMounted(() => {
  // 生成200颗星星
  for (let i = 0; i < 200; i++) {
    stars.value.push({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 5,
      duration: 2 + Math.random() * 3,
    })
  }

  // 星星闪烁动画
  gsap.fromTo('.star',
    { opacity: 0 },
    { opacity: 0.8, duration: 1, stagger: 0.01, ease: 'power2.out' }
  )
})

// 场景切换
const goToScene = (scene) => {
  currentScene.value = scene

  // 场景特定动画
  if (scene === 'sunsets') {
    initSunsetScene()
  } else if (scene === 'rose') {
    initRoseScene()
  } else if (scene === 'fox') {
    initFoxScene()
  }
}

// 星球探索
const visitPlanet = (planet) => {
  planet.visited = true
  createParticles(10)

  gsap.fromTo(`.planet:nth-child(${planet.id})`,
    { scale: 1 },
    { scale: 1.1, duration: 0.3, yoyo: true, repeat: 1 }
  )
}

// 日落场景
const initSunsetScene = () => {
  gsap.fromTo('.sun',
    { scale: 0.8 },
    { scale: 1, duration: 1, ease: 'back.out(1.7)' }
  )
}

const chaseSun = () => {
  if (sunsetCount.value >= 44) return

  sunsetCount.value++
  sunPosition.value = Math.max(0, sunPosition.value - 1.8)

  // 改变太阳颜色
  const progress = sunsetCount.value / 44
  const hue = 45 - progress * 20 // 从金色到红色
  sunGradient.value = `linear-gradient(180deg,
    hsl(${hue}, 100%, 50%) 0%,
    hsl(${hue - 15}, 100%, 40%) 50%,
    hsl(${hue - 30}, 100%, 30%) 100%)`

  createParticles(5)

  if (sunsetCount.value === 44) {
    // 完成时的庆祝动画
    gsap.to('.sunset-counter .count', {
      scale: 1.5,
      duration: 0.5,
      yoyo: true,
      repeat: 1
    })
  }
}

// 玫瑰场景
const initRoseScene = () => {
  gsap.fromTo('.rose',
    { scale: 0, rotation: -180 },
    { scale: 0.3, rotation: 0, duration: 1, ease: 'back.out(1.7)' }
  )
}

const waterRose = () => {
  if (!watered.value) {
    watered.value = true
    roseProgress.value += 20
    roseHealth.value = Math.min(1, roseHealth.value + 0.2)
    createParticles(8, '#FFB6C1')
  }
}

const shieldRose = () => {
  if (!shielded.value) {
    shielded.value = true
    roseProgress.value += 30
    createParticles(8, '#87CEEB')
  }
}

const listenToRose = () => {
  roseProgress.value += 10
  roseHealth.value = Math.min(1, roseHealth.value + 0.15)

  gsap.to('.rose', {
    scale: roseHealth.value + 0.2,
    duration: 0.5,
    yoyo: true,
    repeat: 1
  })

  if (roseProgress.value >= 100) {
    createParticles(20, '#FF69B4')
  }
}

// 狐狸场景
const initFoxScene = () => {
  gsap.fromTo('.fox',
    { x: -200, opacity: 0 },
    { x: 0, opacity: 1, duration: 1, ease: 'power3.out' }
  )
}

const approachFox = () => {
  if (foxStep.value >= 10) return

  foxStep.value++
  foxDistance.value = Math.max(0, 100 - foxStep.value * 10)

  // 狐狸逐渐靠近
  gsap.to('.fox', {
    x: (10 - foxStep.value) * 20,
    duration: 1,
    ease: 'power2.inOut'
  })

  if (foxStep.value === 10) {
    createParticles(15, '#FFA500')
  }
}

// 粒子效果
const createParticles = (count, color = '#FFD700') => {
  if (!particleContainer.value) return

  const containerRect = particleContainer.value.parentElement.getBoundingClientRect()
  const centerX = containerRect.width / 2
  const centerY = containerRect.height / 2

  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div')
    particle.className = 'particle'
    particle.style.cssText = `
      position: absolute;
      left: ${centerX}px;
      top: ${centerY}px;
      width: ${4 + Math.random() * 4}px;
      height: ${4 + Math.random() * 4}px;
      background: ${color};
      border-radius: 50%;
      pointer-events: none;
    `
    particleContainer.value.appendChild(particle)

    const angle = (Math.PI * 2 * i) / count
    const distance = 50 + Math.random() * 100
    const tx = Math.cos(angle) * distance
    const ty = Math.sin(angle) * distance

    gsap.to(particle, {
      x: tx,
      y: ty,
      opacity: 0,
      duration: 1 + Math.random(),
      ease: 'power2.out',
      onComplete: () => particle.remove()
    })
  }
}
</script>

<style scoped>
.little-prince-page {
  font-family: 'Source Serif 4', serif;
  position: relative;
}

/* 星空背景 */
.starfield {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

.star {
  position: absolute;
  background: white;
  border-radius: 50%;
  animation: twinkle ease-in-out infinite;
}

@keyframes twinkle {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
}

/* 粒子容器 */
.particle-container {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 100;
}

/* 场景容器 */
.scene {
  position: relative;
  z-index: 10;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.scene-fade-enter-active,
.scene-fade-leave-active {
  transition: all 0.8s ease;
}

.scene-fade-enter-from,
.scene-fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* Intro 场景 */
.intro-scene .content {
  max-width: 900px;
}

.title {
  background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
}

.scene-entries {
  padding: 2rem 0;
}

.scene-btn {
  background: rgba(255, 215, 0, 0.1);
  border: 1px solid rgba(255, 215, 0, 0.3);
  border-radius: 12px;
  padding: 2rem 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.scene-btn:hover {
  background: rgba(255, 215, 0, 0.2);
  border-color: rgba(255, 215, 0, 0.6);
  transform: translateY(-4px);
}

.scene-btn .icon {
  font-size: 3rem;
  margin-bottom: 0.5rem;
}

.scene-btn .label {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.scene-btn .desc {
  font-size: 0.85rem;
  opacity: 0.7;
}

/* 返回按钮 */
.back-btn {
  position: absolute;
  top: 2rem;
  left: 2rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  z-index: 100;
  transition: all 0.3s ease;
}

.back-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.scene-title {
  color: #FFD700;
  margin-bottom: 1rem;
}

.scene-subtitle {
  font-size: 1.1rem;
  line-height: 1.8;
}

/* 星球探索场景 */
.planets-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  max-width: 900px;
  margin: 0 auto;
}

.planet {
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  padding: 2rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.planet:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-4px);
}

.planet.visited {
  border-color: #FFD700;
  background: rgba(255, 215, 0, 0.1);
}

.planet-icon {
  font-size: 3rem;
  text-align: center;
  margin-bottom: 1rem;
}

.planet-info {
  text-align: center;
}

.planet-name {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.planet-desc {
  font-size: 0.9rem;
  opacity: 0.7;
}

/* 日落场景 */
.sunset-counter {
  font-size: 4rem;
  font-weight: bold;
  margin-bottom: 2rem;
}

.sunset-counter .count {
  color: #FFD700;
  font-size: 6rem;
}

.sunset-counter .total {
  opacity: 0.5;
  font-size: 3rem;
}

.sun-container {
  position: relative;
  height: 400px;
  width: 100%;
  max-width: 400px;
  margin: 0 auto 2rem;
}

.sun {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 100px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 1s ease;
  box-shadow: 0 0 60px 30px rgba(255, 215, 0, 0.5);
}

.sun:hover {
  transform: translateX(-50%) scale(1.1);
}

.instruction {
  margin-bottom: 2rem;
}

/* 玫瑰场景 */
.rose-container {
  max-width: 500px;
  margin: 0 auto;
}

.rose {
  font-size: 6rem;
  text-align: center;
  margin-bottom: 3rem;
  transition: all 0.5s ease;
  display: inline-block;
}

.care-actions {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.care-btn {
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.care-btn:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.care-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.care-btn .icon {
  font-size: 1.5rem;
  display: block;
  margin-bottom: 0.25rem;
}

.care-btn .label {
  font-size: 0.8rem;
}

.rose-progress {
  margin-top: 2rem;
}

.progress-bar {
  height: 8px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #FF69B4, #FFB6C1);
  transition: width 0.5s ease;
}

.progress-text {
  font-size: 0.9rem;
  opacity: 0.8;
}

/* 狐狸场景 */
.fox-container {
  max-width: 600px;
  margin: 0 auto;
}

.fox {
  font-size: 8rem;
  text-align: center;
  margin-bottom: 3rem;
  transition: all 1s ease;
}

.distance-indicator {
  text-align: center;
  margin-bottom: 2rem;
}

.distance {
  font-size: 3rem;
  font-weight: bold;
  color: #FFA500;
  display: block;
  margin-bottom: 1rem;
}

.distance-bar {
  height: 12px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  overflow: hidden;
  margin: 0 auto 1rem;
  max-width: 400px;
}

.distance-fill {
  height: 100%;
  background: linear-gradient(90deg, #FFA500, #FFD700);
  transition: width 1s ease;
}

.step-indicator {
  font-size: 0.9rem;
  opacity: 0.7;
}

.approach-btn {
  display: block;
  margin: 2rem auto;
  padding: 1rem 3rem;
  font-size: 1.1rem;
  background: rgba(255, 215, 0, 0.2);
  border: 2px solid rgba(255, 215, 0, 0.5);
  color: white;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.approach-btn:hover:not(:disabled) {
  background: rgba(255, 215, 0, 0.3);
  transform: scale(1.05);
}

.approach-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.steps-grid {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 0.5rem;
  max-width: 400px;
  margin: 2rem auto;
}

.step-dot {
  height: 8px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  transition: all 0.3s ease;
}

.step-dot.active {
  background: #FFA500;
}

/* 完成消息 */
.completion-message {
  text-align: center;
  margin-top: 2rem;
  padding: 1.5rem;
  background: rgba(255, 215, 0, 0.1);
  border: 1px solid rgba(255, 215, 0, 0.3);
  border-radius: 12px;
}

.completion-message p {
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}

/* 响应式 */
@media (max-width: 768px) {
  .scene {
    padding: 1rem;
  }

  .title {
    font-size: 3rem;
  }

  .scene-title {
    font-size: 2.5rem;
  }

  .scene-entries {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .planets-container {
    grid-template-columns: 1fr;
  }

  .sunset-counter .count {
    font-size: 4rem;
  }

  .rose {
    font-size: 4rem;
  }

  .fox {
    font-size: 5rem;
  }

  .care-actions {
    flex-direction: column;
  }
}
</style>

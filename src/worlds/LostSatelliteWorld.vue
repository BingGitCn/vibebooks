<template>
  <div class="lost-satellite-world">
    <!-- 跃迁动画 -->
    <transition name="warp">
      <div v-if="showWarp" class="warp-overlay">
        <div class="warp-circle">
          <div class="warp-circle-inner"></div>
        </div>
        <div class="warp-text">失落的卫星</div>
      </div>
    </transition>

    <!-- 返回按钮 -->
    <button class="exit-btn" @click="exitWorld">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M19 12H5M12 19l-7-7 7-7"/>
      </svg>
      <span>Return</span>
    </button>

    <!-- 主地图界面 -->
    <div v-if="!selectedCountry" class="map-container">
      <div class="map-header">
        <h1 class="map-title">中亚卫星信号</h1>
        <p class="map-subtitle">五年 · 五国 · 九条轨迹</p>
      </div>

      <div class="countries-grid">
        <div
          v-for="country in countries"
          :key="country.id"
          class="country-node"
          @click="selectCountry(country)"
        >
          <svg class="country-icon" viewBox="0 0 200 200" :style="{ color: country.color }">
            <!-- 吉尔吉斯斯坦：天山线条 -->
            <g v-if="country.id === 1">
              <path d="M40,100 L60,60 L100,100 L140,70 L160,100" stroke="currentColor" stroke-width="2" fill="none" opacity="0.6"/>
              <path d="M40,120 L80,80 L120,110 L160,90" stroke="currentColor" stroke-width="1.5" fill="none" opacity="0.4"/>
            </g>
            <!-- 塔吉克斯坦：帕米尔圆环 -->
            <g v-if="country.id === 2">
              <circle cx="100" cy="100" r="60" stroke="currentColor" stroke-width="2" fill="none" opacity="0.6"/>
              <circle cx="100" cy="100" r="40" stroke="currentColor" stroke-width="1.5" fill="none" opacity="0.4"/>
              <circle cx="100" cy="100" r="20" stroke="currentColor" stroke-width="1" fill="none" opacity="0.3"/>
            </g>
            <!-- 乌兹别克斯坦：古城方形 -->
            <g v-if="country.id === 3">
              <rect x="60" y="60" width="80" height="80" stroke="currentColor" stroke-width="2" fill="none" opacity="0.6"/>
              <rect x="75" y="75" width="50" height="50" stroke="currentColor" stroke-width="1.5" fill="none" opacity="0.4"/>
              <rect x="90" y="90" width="20" height="20" stroke="currentColor" stroke-width="1" fill="none" opacity="0.3"/>
            </g>
            <!-- 土库曼斯坦：边境虚线 -->
            <g v-if="country.id === 4">
              <line x1="40" y1="100" x2="80" y2="100" stroke="currentColor" stroke-width="2" opacity="0.6"/>
              <line x1="90" y1="100" x2="130" y2="100" stroke="currentColor" stroke-width="2" stroke-dasharray="4,4" opacity="0.5"/>
              <line x1="140" y1="100" x2="180" y2="100" stroke="currentColor" stroke-width="2" opacity="0.4"/>
            </g>
            <!-- 哈萨克斯坦：草原椭圆 -->
            <g v-if="country.id === 5">
              <ellipse cx="100" cy="100" rx="80" ry="50" stroke="currentColor" stroke-width="2" fill="none" opacity="0.6"/>
              <ellipse cx="100" cy="100" rx="55" ry="35" stroke="currentColor" stroke-width="1.5" fill="none" opacity="0.4"/>
            </g>
          </svg>
          <h2 class="country-name">{{ country.name }}</h2>
          <p class="country-name-en">{{ country.nameEn }}</p>
          <div class="signal-strength">
            <span v-for="i in 3" :key="i" class="signal-bar" :class="{ active: i <= country.signal }"></span>
          </div>
        </div>
      </div>

      <p class="map-hint">点击接收信号</p>
    </div>

    <!-- 国家详情页 -->
    <div v-else class="country-detail">
      <button class="back-to-map" @click="backToMap">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        <span>返回地图</span>
      </button>

      <div class="quote-container">
        <transition name="quote-fade" mode="out-in">
          <div :key="currentQuoteIndex" class="quote-content">
            <svg class="quote-decoration" viewBox="0 0 200 200" :style="{ color: selectedCountry.color }">
              <!-- 吉尔吉斯斯坦：天山线条 -->
              <g v-if="selectedCountry.id === 1">
                <path d="M40,100 L60,60 L100,100 L140,70 L160,100" stroke="currentColor" stroke-width="2" fill="none" opacity="0.6"/>
                <path d="M40,120 L80,80 L120,110 L160,90" stroke="currentColor" stroke-width="1.5" fill="none" opacity="0.4"/>
              </g>
              <!-- 塔吉克斯坦：帕米尔圆环 -->
              <g v-if="selectedCountry.id === 2">
                <circle cx="100" cy="100" r="60" stroke="currentColor" stroke-width="2" fill="none" opacity="0.6"/>
                <circle cx="100" cy="100" r="40" stroke="currentColor" stroke-width="1.5" fill="none" opacity="0.4"/>
                <circle cx="100" cy="100" r="20" stroke="currentColor" stroke-width="1" fill="none" opacity="0.3"/>
              </g>
              <!-- 乌兹别克斯坦：古城方形 -->
              <g v-if="selectedCountry.id === 3">
                <rect x="60" y="60" width="80" height="80" stroke="currentColor" stroke-width="2" fill="none" opacity="0.6"/>
                <rect x="75" y="75" width="50" height="50" stroke="currentColor" stroke-width="1.5" fill="none" opacity="0.4"/>
                <rect x="90" y="90" width="20" height="20" stroke="currentColor" stroke-width="1" fill="none" opacity="0.3"/>
              </g>
              <!-- 土库曼斯坦：边境虚线 -->
              <g v-if="selectedCountry.id === 4">
                <line x1="40" y1="100" x2="80" y2="100" stroke="currentColor" stroke-width="2" opacity="0.6"/>
                <line x1="90" y1="100" x2="130" y2="100" stroke="currentColor" stroke-width="2" stroke-dasharray="4,4" opacity="0.5"/>
                <line x1="140" y1="100" x2="180" y2="100" stroke="currentColor" stroke-width="2" opacity="0.4"/>
              </g>
              <!-- 哈萨克斯坦：草原椭圆 -->
              <g v-if="selectedCountry.id === 5">
                <ellipse cx="100" cy="100" rx="80" ry="50" stroke="currentColor" stroke-width="2" fill="none" opacity="0.6"/>
                <ellipse cx="100" cy="100" rx="55" ry="35" stroke="currentColor" stroke-width="1.5" fill="none" opacity="0.4"/>
              </g>
            </svg>

            <p class="quote-text">"{{ currentQuote.text }}"</p>

            <p v-if="currentQuote.context" class="quote-context">
              {{ currentQuote.context }}
            </p>

            <div class="quote-progress">
              <span
                v-for="(quote, index) in selectedCountry.quotes"
                :key="index"
                class="progress-dot"
                :class="{ active: currentQuoteIndex === index }"
                @click="currentQuoteIndex = index"
              ></span>
            </div>

            <button v-if="currentQuoteIndex < selectedCountry.quotes.length - 1" class="next-quote" @click="nextQuote">
              下一条信号
            </button>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const showWarp = ref(true)
const selectedCountry = ref(null)
const currentQuoteIndex = ref(0)

// 国家数据
const countries = ref([
  {
    id: 1,
    name: '吉尔吉斯斯坦',
    nameEn: 'Kyrgyzstan',
    color: '#0891b2',
    signal: 3,
    quotes: [
      {
        text: '这就是世界真实的样子，充满琐碎的细节，而我用尽所能来理解它们——这让我感到自由。',
        context: '翻越天山、穿行阿克苏与阿尔金-阿拉善一线之后，对旅行与自我认知的反思。'
      },
      {
        text: '那个一直活在你想象中的事物，突然变成了有形世界的一部分……从此以后，它都永远属于你。',
        context: '在山间行走时，对想象与现实边界的感悟。'
      },
      {
        text: '有时候，我渴望交流，但更多的时候，我愿意沉浸在自己的世界里。',
        context: '关于旅行中的孤独与自处。'
      }
    ]
  },
  {
    id: 2,
    name: '塔吉克斯坦',
    nameEn: 'Tajikistan',
    color: '#a78bfa',
    signal: 2,
    quotes: [
      {
        text: '德国人宽慰我说，他总是暗示自己，旅行就像打游戏，困难就如同游戏中的关卡……我们只需心平气和地想办法，熬过去，就能闯关成功。',
        context: '帕米尔高原旅途中，对旅行困难的心得。'
      },
      {
        text: '到了90年代，塔季扬娜对矿业勘探工作感到厌倦……她开始自学英语，作为一种对抗。',
        context: '遇到的人物故事，关于改变与自我救赎。'
      },
      {
        text: '从帕米尔公路到瓦罕山谷，河水不仅是地理意义上的分界线，更像是时间的分界线：塔吉克一侧如同70年代的苏联，而阿富汗一侧还停留在更久远的中世纪。',
        context: '对边境、时间与身份的多重感悟。'
      }
    ]
  },
  {
    id: 3,
    name: '乌兹别克斯坦',
    nameEn: 'Uzbekistan',
    color: '#d97706',
    signal: 3,
    quotes: [
      {
        text: '不喝一杯的话，我就没办法把身体的零件装回去。',
        context: '佐伊的幽默，塔什干街头的日常。'
      },
      {
        text: '在我看来，她的英语、俄语和吉尔吉斯语全都无懈可击……可是，在比什凯克，她却在郊区开着一家刚刚起步的本地餐厅。',
        context: '关于才华与现实的落差。'
      },
      {
        text: '这就是真实的乌兹别克斯坦。',
        context: '阿扎玛的总结，塔什干到费尔干纳山谷的市井生活。'
      }
    ]
  },
  {
    id: 4,
    name: '土库曼斯坦',
    nameEn: 'Turkmenistan',
    color: '#6b7280',
    signal: 1,
    quotes: [
      {
        text: '一个以劳模名字命名的村子，现在成了法外之地，听起来是不是有点讽刺？',
        context: '在塔什干近郊的"金炳华"朝鲜村，对理想与现实错位的轻叹。'
      }
    ]
  },
  {
    id: 5,
    name: '哈萨克斯坦',
    nameEn: 'Kazakhstan',
    color: '#059669',
    signal: 2,
    quotes: [
      {
        text: '还有一个喜欢乱吃零食的加拿大老太太……她偷偷掩盖了那摊痕迹，没告诉任何人，回国后才把金戒指留在房间里。',
        context: '旅途中的荒诞小插曲。'
      },
      {
        text: '我听懂了，但没有争辩。两壶茶水不过几块钱而已。',
        context: '在草原上的人情往来。'
      },
      {
        text: '苏莱曼山的巨大阴影像一只黑暗中的骆驼，俯卧在城市中央。',
        context: '阿拉木图、七河之地及草原核爆试验场的探访，对荒原与人心的观察。'
      }
    ]
  }
])

const currentQuote = ref(null)

const selectCountry = (country) => {
  selectedCountry.value = country
  currentQuoteIndex.value = 0
  currentQuote.value = country.quotes[0]
}

const backToMap = () => {
  selectedCountry.value = null
  currentQuoteIndex.value = 0
}

const nextQuote = () => {
  if (currentQuoteIndex.value < selectedCountry.value.quotes.length - 1) {
    currentQuoteIndex.value++
  }
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
.lost-satellite-world {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #f7f5f2;
  overflow-y: auto;
  font-family: 'Noto Serif SC', serif;
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

/* === 地图界面 === */
.map-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8rem 2rem 4rem;
}

.map-header {
  text-align: center;
  margin-bottom: 4rem;
}

.map-title {
  font-family: 'Noto Serif SC', serif;
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  font-weight: 400;
  letter-spacing: 0.3em;
  color: #1a1a1a;
  margin: 0 0 1rem 0;
}

.map-subtitle {
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  font-weight: 400;
  letter-spacing: 0.2em;
  color: rgba(26, 26, 26, 0.5);
  margin: 0;
}

.countries-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2.5rem;
  max-width: 1200px;
  width: 100%;
  margin-bottom: 3rem;
}

.country-node {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2.5rem 1.5rem;
  background: transparent;
  border: 1px solid rgba(26, 26, 26, 0.1);
  cursor: pointer;
  transition: all 0.4s ease;
}

.country-node:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(26, 26, 26, 0.08);
  border-color: rgba(26, 26, 26, 0.3);
}

.country-icon {
  width: 120px;
  height: 120px;
  margin-bottom: 1.5rem;
  transition: all 0.4s ease;
}

.country-node:hover .country-icon {
  transform: scale(1.05);
}

.country-name {
  font-family: 'Noto Serif SC', serif;
  font-size: 1rem;
  font-weight: 400;
  letter-spacing: 0.15em;
  color: #1a1a1a;
  margin: 0 0 0.5rem 0;
  text-align: center;
}

.country-name-en {
  font-family: 'Inter', sans-serif;
  font-size: 0.65rem;
  font-weight: 300;
  letter-spacing: 0.1em;
  color: rgba(26, 26, 26, 0.5);
  margin: 0 0 1.5rem 0;
  text-transform: uppercase;
}

.signal-strength {
  display: flex;
  gap: 0.35rem;
}

.signal-bar {
  width: 4px;
  height: 12px;
  background: rgba(26, 26, 26, 0.15);
  border-radius: 2px;
  transition: all 0.3s ease;
}

.signal-bar.active {
  background: #1a1a1a;
}

.map-hint {
  font-family: 'Inter', sans-serif;
  font-size: 0.65rem;
  font-weight: 400;
  letter-spacing: 0.15em;
  color: rgba(26, 26, 26, 0.4);
  margin: 0;
  text-transform: uppercase;
}

/* === 国家详情页 === */
.country-detail {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8rem 2rem 4rem;
}

.back-to-map {
  position: fixed;
  top: 2rem;
  right: 2rem;
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

.back-to-map:hover {
  background: #1a1a1a;
  color: #f7f5f2;
  box-shadow: 0 0 30px rgba(26, 26, 26, 0.15);
  transform: translateX(3px);
}

.back-to-map svg {
  width: 16px;
  height: 16px;
}

.quote-container {
  max-width: 700px;
  width: 100%;
}

.quote-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.quote-decoration {
  width: 200px;
  height: 200px;
  margin-bottom: 2.5rem;
}

.quote-text {
  font-family: 'Noto Serif SC', serif;
  font-size: clamp(1.4rem, 3vw, 2rem);
  font-weight: 400;
  letter-spacing: 0.12em;
  line-height: 1.8;
  color: #1a1a1a;
  text-align: center;
  margin: 0 0 2rem 0;
}

.quote-context {
  font-family: 'Noto Serif SC', serif;
  font-size: clamp(0.9rem, 2vw, 1.1rem);
  font-weight: 300;
  letter-spacing: 0.08em;
  line-height: 1.8;
  color: rgba(26, 26, 26, 0.6);
  text-align: center;
  margin: 0 0 2.5rem 0;
  max-width: 600px;
}

.quote-progress {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 2rem;
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
  background: #1a1a1a;
  border-color: #1a1a1a;
}

.next-quote {
  padding: 0.875rem 2rem;
  background: transparent;
  border: 1px solid #1a1a1a;
  color: #1a1a1a;
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
}

.next-quote:hover {
  background: #1a1a1a;
  color: #f7f5f2;
  box-shadow: 0 0 20px rgba(26, 26, 26, 0.1);
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

.quote-fade-enter-active,
.quote-fade-leave-active {
  transition: opacity 0.4s ease;
}

.quote-fade-enter-from,
.quote-fade-leave-to {
  opacity: 0;
}

/* === 响应式 === */
@media (max-width: 768px) {
  .map-container {
    padding: 6rem 1rem 2rem;
  }

  .countries-grid {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1.5rem;
  }

  .country-node {
    padding: 2rem 1rem;
  }

  .country-icon {
    width: 100px;
    height: 100px;
  }

  .country-name {
    font-size: 0.9rem;
  }

  .exit-btn {
    top: 1rem;
    left: 1rem;
    padding: 0.75rem 1.25rem;
    font-size: 0.65rem;
  }

  .back-to-map {
    top: 1rem;
    right: 1rem;
    padding: 0.75rem 1.25rem;
    font-size: 0.65rem;
  }

  .country-detail {
    padding: 6rem 1rem 2rem;
  }

  .quote-decoration {
    width: 160px;
    height: 160px;
  }
}

@media (max-width: 480px) {
  .map-title {
    font-size: 1.5rem;
  }

  .countries-grid {
    grid-template-columns: 1fr;
  }

  .quote-text {
    font-size: 1.2rem;
  }

  .quote-context {
    font-size: 0.9rem;
  }
}
</style>

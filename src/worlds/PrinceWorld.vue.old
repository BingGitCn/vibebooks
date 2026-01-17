<template>
  <div class="prince-world" :class="{ 'is-transitioning': isTransitioning }">
    <!-- 跃迁动画遮罩 -->
    <transition name="warp">
      <div v-if="showWarp" class="warp-overlay">
        <div class="warp-circle">
          <div class="warp-circle-inner"></div>
        </div>
        <div class="warp-text">B-612</div>
      </div>
    </transition>

    <!-- 返回按钮 -->
    <button class="exit-btn" @click="exitWorld">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M19 12H5M12 19l-7-7 7-7"/>
      </svg>
      <span>Return</span>
    </button>

    <!-- === 入场：星空呼唤 === -->
    <transition name="summon">
      <div v-if="currentChapter === 'summon'" class="chapter-summon">
        <canvas ref="summonCanvas" class="summon-canvas"></canvas>
        <div class="summon-content">
          <p class="summon-text">{{ summonText }}</p>
          <button v-if="showSummonButton" class="summon-btn" @click="answerSummon">
            我在听
          </button>
        </div>
      </div>
    </transition>

    <!-- === 第一章：日落 === -->
    <transition name="chapter">
      <div v-if="currentChapter === 'sunset'" class="chapter-sunset" :style="{ background: sunsetColor }">
        <div class="sunset-scene">
          <!-- B-612 星球 -->
          <div class="b612-planet-sunset">
            <svg viewBox="0 0 200 200" class="planet-svg">
              <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" stroke-width="0.8"/>
              <circle cx="85" cy="90" r="4" fill="currentColor" class="crater" opacity="0.3"/>
              <circle cx="115" cy="105" r="3" fill="currentColor" class="crater" opacity="0.3"/>
            </svg>
            <!-- 小王子坐在星球上 -->
            <div class="prince-sitting">
              <svg viewBox="0 0 100 100" class="prince-svg">
                <circle cx="50" cy="30" r="12" fill="currentColor" class="prince-head"/>
                <line x1="50" y1="42" x2="50" y2="70" stroke="currentColor" stroke-width="2" class="prince-body"/>
                <line x1="50" y1="50" x2="35" y2="65" stroke="currentColor" stroke-width="2" class="prince-leg"/>
                <line x1="50" y1="50" x2="65" y2="65" stroke="currentColor" stroke-width="2" class="prince-leg"/>
                <rect x="38" y="22" width="24" height="18" fill="currentColor" opacity="0.3" class="prince-hair"/>
              </svg>
            </div>
          </div>

          <!-- 日落计数器 -->
          <div class="sunset-counter">
            <span class="counter-number">{{ sunsetCount }}</span>
            <span class="counter-label">/ 44</span>
          </div>

          <!-- 点击区域 -->
          <div class="sunset-click-area" @click="watchSunset"></div>

          <!-- 小王子的对话 -->
          <transition name="dialogue">
            <div v-if="sunsetDialogue" class="prince-dialogue">
              <p>{{ sunsetDialogue }}</p>
            </div>
          </transition>
        </div>

        <!-- 操作提示 -->
        <div class="interaction-hint" v-if="sunsetCount < 44">
          <span>点击陪伴看日落</span>
        </div>
      </div>
    </transition>

    <!-- === 第二章：玫瑰 === -->
    <transition name="chapter">
      <div v-if="currentChapter === 'rose'" class="chapter-rose">
        <div class="rose-scene">
          <!-- 玫瑰 -->
          <div class="rose-plant" :class="{ 'is-blooming': roseTrust >= 100 }">
            <svg viewBox="0 0 200 350" class="rose-svg">
              <!-- 茎 -->
              <line x1="100" y1="320" x2="100" y2="200" stroke="#2d5016" stroke-width="2.5" class="rose-stem"/>

              <!-- 叶子 -->
              <path d="M100 280 Q 75 265 65 280 Q 85 290 100 280" fill="#4a7c2a" stroke="#2d5016" stroke-width="1.5" class="rose-leaf"/>
              <path d="M100 250 Q 125 235 135 250 Q 115 260 100 250" fill="#4a7c2a" stroke="#2d5016" stroke-width="1.5" class="rose-leaf"/>

              <!-- 花萼 -->
              <g class="rose-calyx" :style="{ opacity: roseTrust >= 20 ? 1 : 0 }">
                <path d="M100 198 Q 90 190 85 198 Q 95 205 100 198" fill="#2d5016" />
                <path d="M100 198 Q 110 190 115 198 Q 105 205 100 198" fill="#2d5016" />
                <path d="M100 198 Q 100 188 100 198 Q 100 208 100 198" fill="#2d5016" />
              </g>

              <!-- 外层花瓣 - 红色玫瑰 -->
              <g class="rose-petals-outer" :style="{ opacity: roseTrust >= 30 ? 1 : 0 }">
                <!-- 花瓣1 -->
                <path d="M100 175
                         C 90 165, 75 160, 70 175
                         C 75 190, 90 195, 100 190
                         C 110 195, 125 190, 130 175
                         C 125 160, 110 165, 100 175"
                      fill="#e74c3c" stroke="#c0392b" stroke-width="0.5"/>
                <!-- 花瓣2 -->
                <path d="M100 175
                         C 115 170, 130 165, 140 175
                         C 145 190, 130 200, 115 200
                         C 100 200, 90 190, 95 180"
                      fill="#e74c3c" stroke="#c0392b" stroke-width="0.5" transform="rotate(72 100 185)"/>
                <!-- 花瓣3 -->
                <path d="M100 175
                         C 85 170, 70 165, 60 175
                         C 55 190, 70 200, 85 200
                         C 100 200, 110 190, 105 180"
                      fill="#e74c3c" stroke="#c0392b" stroke-width="0.5" transform="rotate(144 100 185)"/>
                <!-- 花瓣4 -->
                <path d="M100 175
                         C 110 168, 125 168, 135 178
                         C 140 193, 125 203, 110 203
                         C 95 203, 85 193, 90 178"
                      fill="#e74c3c" stroke="#c0392b" stroke-width="0.5" transform="rotate(216 100 185)"/>
                <!-- 花瓣5 -->
                <path d="M100 175
                         C 90 168, 75 168, 65 178
                         C 60 193, 75 203, 90 203
                         C 105 203, 115 193, 110 178"
                      fill="#e74c3c" stroke="#c0392b" stroke-width="0.5" transform="rotate(288 100 185)"/>
              </g>

              <!-- 中层花瓣 - 深红色 -->
              <g class="rose-petals-middle" :style="{ opacity: roseTrust >= 60 ? 1 : 0 }">
                <!-- 花瓣1 -->
                <path d="M100 180
                         C 92 172, 82 170, 78 180
                         C 82 190, 92 192, 100 188
                         C 108 192, 118 190, 122 180
                         C 118 170, 108 172, 100 180"
                      fill="#c0392b" stroke="#a93226" stroke-width="0.5"/>
                <!-- 花瓣2 -->
                <path d="M100 180
                         C 108 172, 118 170, 122 180
                         C 126 190, 116 192, 108 188
                         C 100 185, 92 185, 94 180"
                      fill="#c0392b" stroke="#a93226" stroke-width="0.5" transform="rotate(90 100 185)"/>
                <!-- 花瓣3 -->
                <path d="M100 180
                         C 105 175, 115 175, 120 183
                         C 123 193, 113 195, 105 190
                         C 97 195, 87 193, 90 183"
                      fill="#c0392b" stroke="#a93226" stroke-width="0.5" transform="rotate(180 100 185)"/>
                <!-- 花瓣4 -->
                <path d="M100 180
                         C 95 175, 85 175, 80 183
                         C 77 193, 87 195, 95 190
                         C 103 195, 113 193, 110 183"
                      fill="#c0392b" stroke="#a93226" stroke-width="0.5" transform="rotate(270 100 185)"/>
              </g>

              <!-- 内层花瓣 - 更深的红色 -->
              <g class="rose-petals-inner" :style="{ opacity: roseTrust >= 80 ? 1 : 0 }">
                <!-- 花瓣1 -->
                <path d="M100 182
                         C 94 178, 88 178, 85 183
                         C 88 190, 94 191, 100 188
                         C 106 191, 112 190, 115 183
                         C 112 178, 106 178, 100 182"
                      fill="#a93226" stroke="#922b21" stroke-width="0.5"/>
                <!-- 花瓣2 -->
                <path d="M100 182
                         C 106 178, 112 178, 115 183
                         C 118 190, 112 191, 106 188
                         C 100 186, 96 186, 94 182"
                      fill="#a93226" stroke="#922b21" stroke-width="0.5" transform="rotate(120 100 185)"/>
                <!-- 花瓣3 -->
                <path d="M100 182
                         C 103 179, 109 179, 111 184
                         C 113 191, 107 192, 101 189
                         C 95 192, 89 191, 93 184"
                      fill="#a93226" stroke="#922b21" stroke-width="0.5" transform="rotate(240 100 185)"/>
              </g>

              <!-- 花心 - 最深红 -->
              <g class="rose-center" :style="{ opacity: roseTrust >= 100 ? 1 : 0.5 }">
                <path d="M100 183
                         C 97 181, 94 183, 95 185
                         C 93 187, 95 189, 98 188
                         C 101 187, 104 189, 102 191
                         C 100 193, 97 192, 99 190
                         C 101 188, 104 186, 102 184
                         C 100 182, 99 182, 100 183"
                      fill="#922b21" stroke="#7b241c" stroke-width="0.3"/>
                <circle cx="100" cy="186" r="3" fill="#c0392b"/>
              </g>
            </svg>
          </div>

          <!-- 信任度显示 -->
          <div class="trust-meter">
            <div class="trust-bar">
              <div class="trust-fill" :style="{ width: roseTrust + '%' }"></div>
            </div>
            <span class="trust-label">信任: {{ roseTrust }}%</span>
          </div>

          <!-- 交互按钮 -->
          <div class="rose-actions">
            <button class="rose-action-btn water-btn" @click="waterRose" :disabled="roseActions.watered">
              <svg viewBox="0 0 50 50" class="action-icon">
                <path d="M25 5 L25 35 M15 25 Q25 45 35 25" fill="none" stroke="currentColor" stroke-width="2"/>
                <rect x="15" y="35" width="20" height="10" fill="currentColor"/>
              </svg>
              浇水
            </button>
            <button class="rose-action-btn shield-btn" @click="shieldRose" :disabled="roseActions.shielded">
              <svg viewBox="0 0 50 50" class="action-icon">
                <path d="M25 5 L25 35 M15 25 Q25 45 35 25" fill="none" stroke="currentColor" stroke-width="2"/>
              </svg>
              挡风
            </button>
            <button class="rose-action-btn listen-btn" @click="listenRose">
              <svg viewBox="0 0 50 50" class="action-icon">
                <circle cx="25" cy="25" r="15" fill="none" stroke="currentColor" stroke-width="2"/>
                <path d="M20 25 L25 20 L30 25 L25 30 Z" fill="currentColor"/>
              </svg>
              倾听
            </button>
          </div>

          <!-- 玫瑰的对话 -->
          <transition name="dialogue">
            <div v-if="roseDialogue" class="rose-dialogue">
              <p>{{ roseDialogue }}</p>
            </div>
          </transition>
        </div>
      </div>
    </transition>

    <!-- === 第三章：狐狸驯服 === -->
    <transition name="chapter">
      <div v-if="currentChapter === 'fox'" class="chapter-fox">
        <canvas ref="wheatFieldCanvas" class="wheat-field-canvas"></canvas>

        <div class="fox-scene">
          <!-- 狐狸 -->
          <div class="fox-wrapper" :class="{ 'is-tamed': foxDay >= 3 }">
            <svg viewBox="0 0 200 150" class="fox-svg">
              <g class="fox-outline" stroke="#1a1a1a" stroke-width="1.5" fill="none">
                <!-- 耳朵 -->
                <path d="M 60 50 L 75 70 L 90 50" class="fox-ear-left"/>
                <path d="M 110 50 L 125 70 L 140 50" class="fox-ear-right"/>
                <!-- 头 -->
                <circle cx="100" cy="75" r="30" class="fox-head"/>
                <!-- 眼睛 -->
                <circle cx="90" cy="70" r="2" fill="#1a1a1a" class="fox-eye"/>
                <circle cx="110" cy="70" r="2" fill="#1a1a1a" class="fox-eye"/>
                <!-- 身体 -->
                <path d="M 130 80 Q 160 90 170 110 L 170 130 L 125 120 Q 115 100 130 80" class="fox-body"/>
                <!-- 尾巴 -->
                <path d="M 170 110 Q 200 90 205 110 Q 200 130 170 130" class="fox-tail"/>
              </g>
            </svg>
          </div>

          <!-- 对话区域 -->
          <transition name="dialogue">
            <div v-if="foxDialogue" class="fox-dialogue">
              <p class="dialogue-text">{{ foxDialogue }}</p>
              <p v-if="foxDay < 3" class="dialogue-hint">
                {{ foxDay === 0 ? '点击按钮开始驯服' : `点击继续驯服 (${foxDay}/3)` }}
              </p>
            </div>
          </transition>

          <!-- 驯服按钮 -->
          <button v-if="canVisitFox && !foxDialogue" class="visit-fox-btn" @click="visitFox">
            {{ foxDay === 0 ? '靠近狐狸' : '继续驯服' }}
          </button>

          <!-- 对话显示时的继续按钮 -->
          <button v-if="canVisitFox && foxDialogue && foxDay < 3" class="visit-fox-btn" @click="visitFox">
            {{ `第 ${foxDay + 1} 天` }}
          </button>

          <!-- 日期显示 -->
          <div v-if="foxDay > 0" class="fox-day-indicator">
            第 {{ foxDay }} / 3 天
          </div>
        </div>
      </div>
    </transition>

    <!-- === 第四章：井与星星 === -->
    <transition name="chapter">
      <div v-if="currentChapter === 'well'" class="chapter-well">
        <div class="well-scene">
          <!-- 井 -->
          <div class="well-structure">
            <svg viewBox="0 0 200 280" class="well-svg">
              <!-- 井口 -->
              <ellipse cx="100" cy="50" rx="65" ry="22" fill="none" stroke="#8B4513" stroke-width="4"/>
              <ellipse cx="100" cy="50" rx="55" ry="18" fill="none" stroke="#A0522D" stroke-width="2"/>

              <!-- 井身 -->
              <path d="M35 50 L35 220 L165 220 L165 50" fill="none" stroke="#8B4513" stroke-width="3"/>
              <path d="M40 60 L40 210 L160 210 L160 60" fill="none" stroke="#654321" stroke-width="1" opacity="0.5"/>

              <!-- 井架 -->
              <line x1="35" y1="50" x2="20" y2="15" stroke="#8B4513" stroke-width="4"/>
              <line x1="165" y1="50" x2="180" y2="15" stroke="#8B4513" stroke-width="4"/>
              <line x1="20" y1="15" x2="180" y2="15" stroke="#8B4513" stroke-width="4"/>
              <circle cx="20" cy="15" r="3" fill="#654321"/>
              <circle cx="180" cy="15" r="3" fill="#654321"/>

              <!-- 绳索 -->
              <line x1="100" y1="15" x2="100" :y1="bucketY" stroke="#654321" stroke-width="2" class="well-rope"/>

              <!-- 桶 -->
              <g :transform="`translate(0, ${bucketY - 80})`" class="bucket-group" @click="drawWater">
                <!-- 桶身 -->
                <path d="M75 70 L75 100
                         Q75 112 85 115
                         L115 115
                         Q125 112 125 100
                         L125 70"
                      fill="#8B4513" stroke="#654321" stroke-width="2"/>

                <!-- 桶口边缘 -->
                <ellipse cx="100" cy="70" rx="25" ry="8" fill="none" stroke="#654321" stroke-width="2"/>

                <!-- 桶底 -->
                <path d="M75 115 Q100 120 125 115" fill="none" stroke="#654321" stroke-width="2"/>

                <!-- 桶梁 -->
                <path d="M75 70 Q100 50 125 70" fill="none" stroke="#654321" stroke-width="3"/>

                <!-- 水（打水后显示） -->
                <g v-if="hasDrawnWater" class="water-in-bucket">
                  <ellipse cx="100" cy="95" rx="20" ry="10" fill="#4A90D9" opacity="0.7"/>
                  <ellipse cx="100" cy="93" rx="18" ry="8" fill="#87CEEB" opacity="0.5"/>
                  <path d="M85 90 Q100 85 115 90" stroke="#87CEEB" stroke-width="1.5" fill="none" opacity="0.8"/>
                </g>

                <!-- 空桶（未打水时显示） -->
                <g v-if="!hasDrawnWater && !isDrawingWater" class="empty-bucket-hint">
                  <ellipse cx="100" cy="95" rx="15" ry="6" fill="none" stroke="#8B4513" stroke-width="1" stroke-dasharray="2,2" opacity="0.4"/>
                </g>

                <!-- 波纹效果（打水动画中显示） -->
                <g v-if="isDrawingWater" class="water-ripples">
                  <ellipse cx="100" cy="120" rx="30" ry="5" fill="none" stroke="#4A90D9" stroke-width="1" opacity="0.6">
                    <animate attributeName="rx" values="30;45;30" dur="1s" repeatCount="indefinite"/>
                    <animate attributeName="opacity" values="0.6;0;0.6" dur="1s" repeatCount="indefinite"/>
                  </ellipse>
                  <ellipse cx="100" cy="120" rx="35" ry="6" fill="none" stroke="#4A90D9" stroke-width="1" opacity="0.4">
                    <animate attributeName="rx" values="35;50;35" dur="1s" repeatCount="indefinite" begin="0.2s"/>
                    <animate attributeName="opacity" values="0.4;0;0.4" dur="1s" repeatCount="indefinite" begin="0.2s"/>
                  </ellipse>
                </g>
              </g>
            </svg>
          </div>

          <!-- 操作提示 -->
          <div class="well-hint">
            <p v-if="!hasDrawnWater">点击水桶打水</p>
            <p v-else class="water-quote">"这水像礼物一样"</p>
          </div>

          <!-- 星空 -->
          <div class="stars-container">
            <div
              v-for="(star, index) in collectedStars"
              :key="index"
              class="collected-star"
              :style="{ top: star.top || '20%', left: star.left || `${20 + index * 15}%` }"
            >
              {{ star.icon }}
              <span class="star-message">{{ star.message }}</span>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- === 第五章：告别 === -->
    <transition name="chapter">
      <div v-if="currentChapter === 'goodbye'" class="chapter-goodbye">
        <div class="goodbye-scene">
          <!-- 金色的蛇 -->
          <div class="golden-snake">
            <svg viewBox="0 0 100 100" class="snake-svg">
              <circle cx="50" cy="50" r="40" fill="none" stroke="#f4d03f" stroke-width="2" stroke-dasharray="5,5" class="snake-coil"/>
              <circle cx="50" cy="50" r="3" fill="#f4d03f" class="snake-eye"/>
            </svg>
          </div>

          <!-- 珍贵记忆回顾 -->
          <div class="memory-review">
            <h3>珍贵的回忆</h3>
            <div class="memory-cards">
              <div class="memory-card">
                <span class="memory-icon">🌅</span>
                <p>看了 {{ sunsetCount }} 次日落</p>
              </div>
              <div class="memory-card">
                <span class="memory-icon">🌹</span>
                <p>玫瑰完全信任你</p>
              </div>
              <div class="memory-card">
                <span class="memory-icon">🦊</span>
                <p>被狐狸驯服</p>
              </div>
              <div class="memory-card">
                <span class="memory-icon">⭐</span>
                <p>收集了 {{ collectedStars.length }} 颗星星</p>
              </div>
            </div>
          </div>

          <!-- 最后的话 -->
          <div class="final-message">
            <p>"所有的大人都曾经是小孩，<br>虽然，只有少数人记得"</p>
          </div>

          <!-- 告别按钮 -->
          <button class="farewell-btn" @click="sayGoodbye">
            再见，小王子
          </button>
        </div>
      </div>
    </transition>

    <!-- === 第六章：回归 === -->
    <transition name="chapter">
      <div v-if="currentChapter === 'return'" class="chapter-return">
        <canvas ref="returnCanvas" class="return-canvas"></canvas>

        <div class="return-scene">
          <h2 class="return-title">你已经回到地球</h2>

          <p class="return-message">
            抬头看星星，它们在对你笑
          </p>

          <!-- 统计信息 -->
          <div class="return-stats">
            <div class="stat-item">
              <span class="stat-number">{{ daysSinceFirstVisit }}</span>
              <span class="stat-label">天被驯服</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">{{ visitCount }}</span>
              <span class="stat-label">次探访</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">{{ collectedStars.length }}</span>
              <span class="stat-label">颗星星</span>
            </div>
          </div>

          <!-- 重新探索按钮 -->
          <div class="return-actions">
            <button class="revisit-btn" @click="revisitChapter('sunset')">
              再看一次日落
            </button>
            <button class="revisit-btn" @click="revisitChapter('rose')">
              探望玫瑰
            </button>
            <button class="revisit-btn" @click="revisitChapter('fox')">
              看望狐狸
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// === 状态管理 ===
const isTransitioning = ref(false)
const showWarp = ref(true)

// 当前章节
const currentChapter = ref('summon')

// 入场动画
const summonCanvas = ref(null)
const summonText = ref('...')
const showSummonButton = ref(false)
let summonAnimationId = null

// 日落系统
const sunsetCount = ref(0)
const sunsetDialogue = ref('')
const sunsetColor = ref('#FFE4B5')

// 玫瑰系统
const roseTrust = ref(0)
const roseDialogue = ref('')
const roseActions = ref({
  watered: false,
  shielded: false
})

// 狐狸系统
const foxDay = ref(0)
const foxDialogue = ref('')
const foxLastVisit = ref(null)
const wheatFieldCanvas = ref(null)
let wheatAnimationId = null

// 井系统
const bucketY = ref(80)
const hasDrawnWater = ref(false)

// 星星收集
const collectedStars = ref([])

// 统计数据
const firstVisitDate = ref(null)
const lastVisitDate = ref(null)
const visitCount = ref(0)

// === 计算属性 ===
const daysSinceFirstVisit = computed(() => {
  if (!firstVisitDate.value) return 0
  const now = new Date()
  const first = new Date(firstVisitDate.value)
  return Math.floor((now - first) / (1000 * 60 * 60 * 24))
})

const canVisitFox = computed(() => {
  // 狐狸驯服：用户可以随时点击继续，无需等待真实时间
  return true
})

// === 本地存储 ===
const STORAGE_KEY = 'prince-taming-progress'

const saveProgress = () => {
  const progress = {
    currentChapter: currentChapter.value,
    sunsetCount: sunsetCount.value,
    roseTrust: roseTrust.value,
    roseActions: roseActions.value,
    foxDay: foxDay.value,
    foxLastVisit: foxLastVisit.value,
    collectedStars: collectedStars.value,
    firstVisitDate: firstVisitDate.value,
    lastVisitDate: lastVisitDate.value,
    visitCount: visitCount.value
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
}

const loadProgress = () => {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved) {
    const progress = JSON.parse(saved)
    currentChapter.value = progress.currentChapter || 'summon'
    sunsetCount.value = progress.sunsetCount || 0
    roseTrust.value = progress.roseTrust || 0
    roseActions.value = progress.roseActions || { watered: false, shielded: false }
    foxDay.value = progress.foxDay || 0
    foxLastVisit.value = progress.foxLastVisit || null
    collectedStars.value = progress.collectedStars || []
    firstVisitDate.value = progress.firstVisitDate || null
    lastVisitDate.value = progress.lastVisitDate || null
    visitCount.value = progress.visitCount || 0
  }
}

// === 入场动画 ===
const initSummonCanvas = () => {
  const canvas = summonCanvas.value
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  // 创建星星
  const stars = []
  for (let i = 0; i < 100; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 0.5,
      alpha: Math.random() * 0.5 + 0.1,
      twinkle: Math.random() * 0.02 + 0.005
    })
  }

  let time = 0
  const animate = () => {
    time++
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    stars.forEach(star => {
      star.alpha += Math.sin(time * star.twinkle) * 0.01
      ctx.beginPath()
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(244, 208, 63, ${Math.max(0.1, Math.min(0.6, star.alpha))})`
      ctx.fill()
    })

    summonAnimationId = requestAnimationFrame(animate)
  }

  animate()

  // 渐显文字
  setTimeout(() => {
    summonText.value = '有人在吗...'
  }, 2000)

  setTimeout(() => {
    summonText.value = '我是来自 B-612 星球的小王子'
  }, 4000)

  setTimeout(() => {
    summonText.value = '你愿意听我讲故事吗？'
    showSummonButton.value = true
  }, 6000)
}

const answerSummon = () => {
  // 记录首次访问
  if (!firstVisitDate.value) {
    firstVisitDate.value = new Date().toISOString()
  }
  lastVisitDate.value = new Date().toISOString()
  visitCount.value++

  currentChapter.value = 'sunset'
  saveProgress()
}

// === 日落系统 ===
const getSunsetColor = (count) => {
  if (count <= 10) return '#FFE4B5' // 清晨
  if (count <= 20) return '#FFA07A' // 正午
  if (count <= 30) return '#FF6347' // 黄昏
  return '#4B0082' // 夜晚
}

const getSunsetDialogue = (count) => {
  const dialogues = {
    1: '你看，日落开始了...',
    5: '你还在陪我，真好',
    10: '一天中看了十次日落，你一定很难过',
    20: '二十次了...时间过得很慢',
    30: '三十次...我很喜欢你这样陪着我',
    44: '谢谢你陪了我四十四次。你很难过的时候，我喜欢看日落'
  }
  return dialogues[count] || ''
}

const watchSunset = () => {
  if (sunsetCount.value >= 44) return

  sunsetCount.value++
  sunsetColor.value = getSunsetColor(sunsetCount.value)

  const dialogue = getSunsetDialogue(sunsetCount.value)
  if (dialogue) {
    sunsetDialogue.value = dialogue
    setTimeout(() => {
      sunsetDialogue.value = ''
    }, 4000)
  }

  if (sunsetCount.value === 44) {
    setTimeout(() => {
      currentChapter.value = 'rose'
      saveProgress()
    }, 5000)
  }

  saveProgress()
}

// === 玫瑰系统 ===
const roseDialogues = {
  0: '我是宇宙中唯一的玫瑰',
  30: '我怕风...你应该要明白我的温柔',
  60: '我不笨，但我太骄傲了',
  100: '你驯服了我，现在我们互相不可缺少了'
}

const waterRose = () => {
  roseActions.value.watered = true
  roseTrust.value = Math.min(100, roseTrust.value + 10)
  saveProgress()
}

const shieldRose = () => {
  roseActions.value.shielded = true
  roseTrust.value = Math.min(100, roseTrust.value + 15)
  saveProgress()
}

const listenRose = () => {
  // 根据信任度显示不同对话
  const dialogue = Object.entries(roseDialogues)
    .reverse()
    .find(([threshold]) => roseTrust.value >= threshold)?.[1] || roseDialogues[0]

  roseDialogue.value = dialogue
  setTimeout(() => {
    roseDialogue.value = ''
  }, 4000)

  // 倾听也增加信任度
  roseTrust.value = Math.min(100, roseTrust.value + 5)

  // 信任度达到100，解锁下一章
  if (roseTrust.value >= 100) {
    setTimeout(() => {
      currentChapter.value = 'fox'
      saveProgress()
    }, 5000)
  }

  saveProgress()
}

// === 狐狸系统 ===
const initWheatFieldCanvas = () => {
  const canvas = wheatFieldCanvas.value
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  // 简单的麦田背景
  ctx.fillStyle = '#e8dcc8'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // 可以添加麦浪动画
}

const foxDialogues = {
  0: '请你...驯服我吧',
  1: '你继续回来了，这很好。驯服需要"仪式感"，就是每一次都带着真心来见我',
  2: '很好。现在我要告诉你一个秘密：只有用心才能看清事物的本质，真正重要的东西，用眼睛是看不见的',
  3: '现在，你已经驯服了我。我们互相不可缺少了'
}

const visitFox = () => {
  const now = new Date().toISOString()
  foxDay.value++
  foxLastVisit.value = now

  foxDialogue.value = foxDialogues[Math.min(foxDay.value, 3)]
  setTimeout(() => {
    foxDialogue.value = ''
  }, 6000)

  if (foxDay.value >= 3) {
    // 收集第一颗星星
    collectedStars.value.push({
      icon: '⭐',
      message: '我为你而笑',
      top: `${10 + Math.random() * 30}%`,
      left: `${10 + Math.random() * 40}%`
    })

    setTimeout(() => {
      currentChapter.value = 'well'
      saveProgress()
    }, 7000)
  }

  saveProgress()
}

// === 井系统 ===
const isDrawingWater = ref(false)

const drawWater = () => {
  if (hasDrawnWater.value || isDrawingWater.value) return

  isDrawingWater.value = true

  // 动画：水桶先下降，再上升（放慢速度，更清晰）
  let y = 80
  let phase = 'down' // down, up

  const drawInterval = setInterval(() => {
    if (phase === 'down') {
      y += 2  // 减小速度，从3改为2
      if (y >= 200) {
        phase = 'up'
        // 到达井底，稍微停顿
      }
    } else {
      y -= 2  // 减小速度，从3改为2
      if (y <= 80) {
        clearInterval(drawInterval)
        isDrawingWater.value = false
        hasDrawnWater.value = true

        // 收集第二颗星星
        collectedStars.value.push({
          icon: '💧',
          message: '这水像礼物一样',
          top: `${10 + Math.random() * 30}%`,
          left: `${50 + Math.random() * 40}%`
        })

        setTimeout(() => {
          currentChapter.value = 'goodbye'
          saveProgress()
        }, 5000)
      }
    }

    bucketY.value = y
  }, 30)  // 增加间隔，从20ms改为30ms，使动画更流畅

  saveProgress()
}

const showStarMessage = (star) => {
  // 星星消息通过 hover 显示，不需要点击
  // 这里可以留空或者添加其他交互
}

// === 告别系统 ===
const sayGoodbye = () => {
  // 收集最后一颗星星
  collectedStars.value.push({
    icon: '🌟',
    message: '所有的大人都曾经是小孩',
    top: `${10 + Math.random() * 30}%`,
    left: `${30 + Math.random() * 40}%`
  })

  currentChapter.value = 'return'
  saveProgress()
}

// === 回归系统 ===
const returnCanvas = ref(null)

const initReturnCanvas = () => {
  const canvas = returnCanvas.value
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  // 绘制星空，被驯服的星星会笑
  // 简化版：绘制静态星星
}

const revisitChapter = (chapter) => {
  currentChapter.value = chapter
}

// === 退出 ===
const exitWorld = async () => {
  isTransitioning.value = true
  await nextTick()
  setTimeout(() => {
    router.push('/universe')
  }, 800)
}

// === 生命周期 ===
onMounted(async () => {
  // 跃迁动画消失
  setTimeout(() => {
    showWarp.value = false
  }, 1800)

  // 加载进度
  await nextTick()
  loadProgress()

  // 根据当前章节初始化
  if (currentChapter.value === 'summon') {
    initSummonCanvas()
  } else if (currentChapter.value === 'fox') {
    initWheatFieldCanvas()
  } else if (currentChapter.value === 'return') {
    initReturnCanvas()
  }

  visitCount.value++
  saveProgress()
})

onUnmounted(() => {
  if (summonAnimationId) {
    cancelAnimationFrame(summonAnimationId)
  }
  if (wheatAnimationId) {
    cancelAnimationFrame(wheatAnimationId)
  }
})
</script>

<style scoped>
.prince-world {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(180deg, #f7f5f2 0%, #efe8d9 50%, #e8dcc8 100%);
  overflow: hidden;
  z-index: 1000;
  font-family: 'Noto Serif SC', serif;
}

/* === 跃迁动画 === */
.warp-overlay {
  position: absolute;
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
  border: 1px solid rgba(244, 208, 63, 0.3);
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
  border: 1px solid rgba(244, 208, 63, 0.5);
  border-radius: 50%;
  animation: warp-pulse 1s ease-in-out infinite;
}

.warp-text {
  position: absolute;
  font-size: 0.9rem;
  letter-spacing: 0.3em;
  color: rgba(244, 208, 63, 0.8);
  animation: warp-fade 1.5s ease-out forwards;
}

@keyframes warp-expand {
  0% { transform: scale(0); opacity: 0; }
  50% { opacity: 1; }
  100% { transform: scale(3); opacity: 0; }
}

@keyframes warp-pulse {
  0%, 100% { transform: translate(-50%, -50%) scale(1); }
  50% { transform: translate(-50%, -50%) scale(1.1); }
}

@keyframes warp-fade {
  0% { opacity: 0; transform: translateY(20px); }
  50% { opacity: 1; transform: translateY(0); }
  100% { opacity: 0; }
}

/* === 返回按钮 === */
.exit-btn {
  position: absolute;
  top: 2rem;
  left: 2rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1.5rem;
  background: rgba(26, 26, 26, 0.03);
  border: 1px solid rgba(26, 26, 26, 0.08);
  color: #1a1a1a;
  backdrop-filter: blur(10px);
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
  background: rgba(26, 26, 26, 0.9);
  color: #f7f5f2;
  transform: translateX(-3px);
}

.exit-btn svg {
  width: 16px;
  height: 16px;
}

/* === 章节过渡 === */
.chapter-enter-active,
.chapter-leave-active {
  transition: all 1s ease;
}

.chapter-enter-from {
  opacity: 0;
  transform: translateY(40px);
}

.chapter-leave-to {
  opacity: 0;
  transform: translateY(-40px);
}

/* === 入场章节 === */
.chapter-summon {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.summon-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.summon-content {
  text-align: center;
  z-index: 10;
  padding: 2rem;
}

.summon-text {
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  color: #1a1a1a;
  letter-spacing: 0.15em;
  margin-bottom: 3rem;
  line-height: 1.8;
}

.summon-btn {
  padding: 1rem 2.5rem;
  background: rgba(244, 208, 63, 0.2);
  border: 1px solid rgba(244, 208, 63, 0.5);
  color: #1a1a1a;
  font-family: 'Noto Serif SC', serif;
  font-size: 1rem;
  letter-spacing: 0.2em;
  cursor: pointer;
  transition: all 0.3s ease;
}

.summon-btn:hover {
  background: rgba(244, 208, 63, 0.4);
  transform: scale(1.05);
}

/* === 日落章节 === */
.chapter-sunset {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: background 2s ease;
  position: relative;
}

.sunset-scene {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.b612-planet-sunset {
  width: 300px;
  height: 300px;
  position: relative;
  animation: planet-float 20s ease-in-out infinite;
  color: #1a1a1a;
}

.planet-svg {
  width: 100%;
  height: 100%;
}

.prince-sitting {
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 60px;
}

.prince-svg {
  width: 100%;
  height: 100%;
  fill: #1a1a1a;
}

.sunset-counter {
  font-size: 3rem;
  color: #1a1a1a;
  letter-spacing: 0.2em;
}

.sunset-click-area {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
  z-index: 1;
}

.prince-dialogue {
  position: absolute;
  bottom: 20%;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255, 255, 255, 0.95);
  padding: 1.5rem 2rem;
  border-radius: 8px;
  max-width: 400px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  z-index: 100;
}

.prince-dialogue p {
  font-size: 1.1rem;
  color: #1a1a1a;
  line-height: 1.8;
  margin: 0;
}

.interaction-hint {
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.9rem;
  color: rgba(26, 26, 26, 0.6);
  letter-spacing: 0.15em;
  z-index: 10;
}

@keyframes planet-float {
  0%, 100% { transform: rotate(0deg); }
  50% { transform: rotate(180deg); }
}

/* === 玫瑰章节 === */
.chapter-rose {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(244, 208, 63, 0.05);
}

.rose-scene {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.rose-plant {
  width: 250px;
  height: 350px;
  transition: all 0.5s ease;
}

.rose-svg {
  width: 100%;
  height: 100%;
}

/* 花瓣动画 */
.rose-calyx {
  transition: opacity 1s ease;
}

.rose-petals-outer {
  transition: opacity 1.5s ease;
  transform-origin: 100px 170px;
}

.rose-petals-outer .petal {
  animation: petal-breathe 4s ease-in-out infinite;
}

.rose-petals-outer .petal:nth-child(1) { animation-delay: 0s; }
.rose-petals-outer .petal:nth-child(2) { animation-delay: 0.8s; }
.rose-petals-outer .petal:nth-child(3) { animation-delay: 1.6s; }
.rose-petals-outer .petal:nth-child(4) { animation-delay: 2.4s; }
.rose-petals-outer .petal:nth-child(5) { animation-delay: 3.2s; }

.rose-petals-middle {
  transition: opacity 1.5s ease 0.3s;
  transform-origin: 100px 165px;
}

.rose-petals-inner {
  transition: opacity 1.5s ease 0.6s;
  transform-origin: 100px 160px;
}

.rose-center {
  transition: opacity 1s ease 0.9s;
}

.rose-plant.is-blooming .rose-petals-outer .petal {
  animation: petal-breathe-bloom 6s ease-in-out infinite;
}

@keyframes petal-breathe {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.85; }
}

@keyframes petal-breathe-bloom {
  0%, 100% {
    opacity: 1;
    transform: rotate(var(--rotation, 0deg)) scale(1);
  }
  50% {
    opacity: 0.9;
    transform: rotate(var(--rotation, 0deg)) scale(1.02);
  }
}

.trust-meter {
  text-align: center;
}

.trust-bar {
  width: 200px;
  height: 8px;
  background: rgba(244, 208, 63, 0.2);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.trust-fill {
  height: 100%;
  background: linear-gradient(90deg, #f4d03f 0%, #f39c12 100%);
  transition: width 0.5s ease;
}

.trust-label {
  font-size: 0.9rem;
  color: #666;
  letter-spacing: 0.1em;
}

.rose-actions {
  display: flex;
  gap: 1rem;
}

.rose-action-btn {
  padding: 1rem 1.5rem;
  background: rgba(244, 208, 63, 0.1);
  border: 1px solid rgba(244, 208, 63, 0.3);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.rose-action-btn:hover:not(:disabled) {
  background: rgba(244, 208, 63, 0.2);
  transform: translateY(-2px);
}

.rose-action-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.action-icon {
  width: 30px;
  height: 30px;
}

.rose-dialogue {
  position: absolute;
  bottom: 20%;
  background: rgba(255, 255, 255, 0.95);
  padding: 1.5rem 2rem;
  border-radius: 8px;
  max-width: 400px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.rose-dialogue p {
  font-size: 1.1rem;
  color: #1a1a1a;
  line-height: 1.8;
  margin: 0;
  font-style: italic;
}

/* === 狐狸章节 === */
.chapter-fox {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.wheat-field-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.fox-scene {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.fox-wrapper {
  width: 200px;
  height: 150px;
  transition: all 0.5s ease;
}

.fox-svg {
  width: 100%;
  height: 100%;
}

.fox-dialogue {
  background: rgba(255, 255, 255, 0.95);
  padding: 1.5rem 2rem;
  border-radius: 8px;
  max-width: 450px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.dialogue-text {
  font-size: 1.1rem;
  color: #1a1a1a;
  line-height: 1.8;
  margin: 0 0 1rem 0;
}

.dialogue-hint {
  font-size: 0.9rem;
  color: #999;
  margin: 0;
}

.visit-fox-btn {
  padding: 1rem 2.5rem;
  background: rgba(244, 208, 63, 0.2);
  border: 1px solid rgba(244, 208, 63, 0.5);
  color: #1a1a1a;
  font-family: 'Noto Serif SC', serif;
  font-size: 1rem;
  letter-spacing: 0.2em;
  cursor: pointer;
  transition: all 0.3s ease;
}

.visit-fox-btn:hover {
  background: rgba(244, 208, 63, 0.4);
  transform: scale(1.05);
}

.fox-day-indicator {
  font-size: 0.9rem;
  color: #666;
  letter-spacing: 0.15em;
}

/* === 井章节 === */
.chapter-well {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(180deg, #e8dcc8 0%, #d4c4a8 100%);
}

.well-scene {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.well-structure {
  width: 300px;
  height: 400px;
}

.well-svg {
  width: 100%;
  height: 100%;
}

.bucket-group {
  cursor: pointer;
  transition: filter 0.3s ease;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

.bucket-group:hover {
  filter: drop-shadow(0 6px 12px rgba(244, 208, 63, 0.4));
}

.well-hint {
  text-align: center;
  min-height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.well-hint p {
  font-size: 1.2rem;
  color: #1a1a1a;
  margin: 0;
  transition: all 0.5s ease;
}

.water-quote {
  font-style: italic;
  color: #f4d03f;
  font-size: 1.3rem;
  animation: quote-appear 1s ease;
}

@keyframes quote-appear {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.stars-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 50%;
  pointer-events: none;
}

.collected-star {
  position: absolute;
  font-size: 2.5rem;
  animation: star-twinkle 3s ease-in-out infinite;
  cursor: help;
  pointer-events: auto;
  filter: drop-shadow(0 0 10px rgba(244, 208, 63, 0.3));
  transition: all 0.3s ease;
}

.collected-star:hover {
  transform: scale(1.2);
  filter: drop-shadow(0 0 20px rgba(244, 208, 63, 0.6));
}

.star-message {
  position: absolute;
  bottom: calc(100% + 12px);
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(135deg, rgba(244, 208, 63, 0.95) 0%, rgba(243, 156, 18, 0.95) 100%);
  color: #1a1a1a;
  padding: 0.75rem 1.25rem;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 500;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(244, 208, 63, 0.3);
  pointer-events: none;
  letter-spacing: 0.05em;
}

.star-message::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 6px solid transparent;
  border-top-color: rgba(243, 156, 18, 0.95);
}

.collected-star:hover .star-message {
  opacity: 1;
  visibility: visible;
  bottom: calc(100% + 8px);
}

@keyframes star-twinkle {
  0%, 100% {
    opacity: 0.7;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.1);
  }
}

/* === 告别章节 === */
.chapter-goodbye {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(180deg, rgba(244, 208, 63, 0.1) 0%, transparent 100%);
}

.goodbye-scene {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  padding: 2rem;
}

.golden-snake {
  width: 150px;
  height: 150px;
}

.snake-svg {
  width: 100%;
  height: 100%;
}

.memory-review {
  text-align: center;
}

.memory-review h3 {
  font-size: 1.5rem;
  color: #1a1a1a;
  margin-bottom: 2rem;
  letter-spacing: 0.15em;
}

.memory-cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.memory-card {
  background: rgba(255, 255, 255, 0.8);
  padding: 1.5rem;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.memory-icon {
  font-size: 2rem;
  display: block;
  margin-bottom: 0.5rem;
}

.memory-card p {
  font-size: 0.9rem;
  color: #666;
  margin: 0;
}

.final-message {
  text-align: center;
}

.final-message p {
  font-size: 1.5rem;
  color: #1a1a1a;
  line-height: 1.8;
  margin: 0;
  letter-spacing: 0.1em;
}

.farewell-btn {
  padding: 1rem 2.5rem;
  background: rgba(244, 208, 63, 0.2);
  border: 1px solid rgba(244, 208, 63, 0.5);
  color: #1a1a1a;
  font-family: 'Noto Serif SC', serif;
  font-size: 1rem;
  letter-spacing: 0.2em;
  cursor: pointer;
  transition: all 0.3s ease;
}

.farewell-btn:hover {
  background: rgba(244, 208, 63, 0.4);
  transform: scale(1.05);
}

/* === 回归章节 === */
.chapter-return {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.return-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.return-scene {
  position: relative;
  z-index: 10;
  text-align: center;
  padding: 2rem;
}

.return-title {
  font-size: clamp(2rem, 5vw, 3rem);
  color: #1a1a1a;
  margin-bottom: 2rem;
  letter-spacing: 0.15em;
}

.return-message {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 3rem;
  line-height: 1.8;
}

.return-stats {
  display: flex;
  gap: 3rem;
  margin-bottom: 3rem;
}

.stat-item {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 2.5rem;
  color: #f4d03f;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 0.9rem;
  color: #666;
  letter-spacing: 0.1em;
}

.return-actions {
  display: flex;
  gap: 1rem;
}

.revisit-btn {
  padding: 0.875rem 1.5rem;
  background: rgba(244, 208, 63, 0.1);
  border: 1px solid rgba(244, 208, 63, 0.3);
  color: #1a1a1a;
  font-family: 'Noto Serif SC', serif;
  font-size: 0.9rem;
  letter-spacing: 0.15em;
  cursor: pointer;
  transition: all 0.3s ease;
}

.revisit-btn:hover {
  background: rgba(244, 208, 63, 0.2);
  transform: translateY(-2px);
}

/* === 对话过渡 === */
.dialogue-enter-active,
.dialogue-leave-active {
  transition: all 0.5s ease;
}

.dialogue-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.dialogue-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* === 响应式 === */
@media (max-width: 768px) {
  .exit-btn {
    top: 1rem;
    left: 1rem;
    padding: 0.625rem 1rem;
    font-size: 0.6rem;
  }

  .memory-cards {
    grid-template-columns: 1fr;
  }

  .return-stats {
    flex-direction: column;
    gap: 1.5rem;
  }

  .return-actions {
    flex-direction: column;
  }
}
</style>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const currentStage = ref(0)

const stages = [
  {
    guojing: {
      text: '郭靖',
      detail: '大漠少年',
      context: ''
    },
    yangkang: {
      text: '杨康',
      detail: '小王爷',
      context: ''
    },
    note: '同样的起点，父亲都是英雄'
  },
  {
    guojing: {
      text: '向北',
      detail: '回大漠',
      context: ''
    },
    yangkang: {
      text: '向南',
      detail: '去金国',
      context: ''
    },
    note: '选择不同，路就开始分叉'
  },
  {
    guojing: {
      text: '江南七怪',
      detail: '洪七公',
      context: '黄蓉'
    },
    yangkang: {
      text: '完颜洪烈',
      detail: '梅超风',
      context: '权谋'
    },
    note: '你的路，由你的选择铺就'
  },
  {
    guojing: {
      text: '真心',
      detail: '换真心',
      context: '朋友越来越多'
    },
    yangkang: {
      text: '算计',
      detail: '换来算计',
      context: '路越走越窄'
    },
    note: '你真心对别人，别人便真心待你'
  },
  {
    guojing: {
      text: '襄阳',
      detail: '守城',
      context: ''
    },
    yangkang: {
      text: '',
      detail: '',
      context: ''
    },
    note: '武功不是目的，守护才是'
  },
  {
    guojing: {
      text: '侠之大者',
      detail: '为国为民',
      context: ''
    },
    yangkang: {
      text: '',
      detail: '',
      context: ''
    },
    note: ''
  }
]

function nextStage() {
  if (currentStage.value < stages.length - 1) {
    currentStage.value++
  }
}

function goBack() {
  router.push('/universe')
}

onMounted(() => {
  currentStage.value = 0
})
</script>

<template>
  <div class="shooting-hero-world" @click="nextStage">
    <!-- 装饰背景线 -->
    <div class="decorative-lines">
      <div class="line line-1"></div>
      <div class="line line-2"></div>
      <div class="line line-3"></div>
    </div>

    <!-- 主容器 -->
    <div class="main-container">
      <!-- 返回按钮 -->
      <button class="back-btn" @click.stop="goBack">← 返回</button>

      <!-- 两条路的视觉区 -->
      <div class="paths-visual">
        <svg class="paths-svg" viewBox="0 0 400 300" :class="{ 'show-wall': currentStage >= 5 }">
          <!-- 郭靖的路径（向上） -->
          <g class="guojing-path">
            <!-- 主路径线 -->
            <path
              class="path-line guojing-line"
              d="M 120 250 Q 120 200 120 150 Q 120 100 140 60"
              :class="{ 'visible': currentStage >= 1 }"
            />

            <!-- 关键节点（人物） -->
            <circle
              v-if="currentStage >= 0"
              class="path-point start-point"
              cx="120"
              cy="250"
              r="8"
            />
            <circle
              v-if="currentStage >= 2"
              class="path-point"
              cx="115"
              cy="200"
              r="5"
            />
            <circle
              v-if="currentStage >= 2"
              class="path-point"
              cx="125"
              cy="170"
              r="5"
            />
            <circle
              v-if="currentStage >= 2"
              class="path-point"
              cx="120"
              cy="130"
              r="6"
            />
            <circle
              v-if="currentStage >= 3"
              class="path-point"
              cx="110"
              cy="180"
              r="4"
            />
            <circle
              v-if="currentStage >= 3"
              class="path-point"
              cx="130"
              cy="145"
              r="4"
            />
            <circle
              v-if="currentStage >= 4"
              class="path-point city-point"
              cx="140"
              cy="60"
              r="10"
            />

            <!-- 连接线（人际关系网） -->
            <line
              v-if="currentStage >= 3"
              x1="115"
              y1="200"
              x2="110"
              y2="180"
              stroke="#000"
              stroke-width="0.5"
              opacity="0.2"
            />
            <line
              v-if="currentStage >= 3"
              x1="125"
              y1="170"
              x2="130"
              y2="145"
              stroke="#000"
              stroke-width="0.5"
              opacity="0.2"
            />
            <line
              v-if="currentStage >= 3"
              x1="120"
              y1="130"
              x2="130"
              y2="145"
              stroke="#000"
              stroke-width="0.5"
              opacity="0.2"
            />
          </g>

          <!-- 杨康的路径（向下，逐渐消失） -->
          <g class="yangkang-path">
            <path
              class="path-line yangkang-line"
              d="M 280 250 Q 280 200 290 160 Q 310 120 330 150"
              :class="{ 'visible': currentStage >= 1, 'fading': currentStage >= 4 }"
            />

            <!-- 节点 -->
            <circle
              v-if="currentStage >= 0 && currentStage < 5"
              class="path-point start-point"
              cx="280"
              cy="250"
              r="8"
            />
            <circle
              v-if="currentStage >= 2 && currentStage < 5"
              class="path-point"
              cx="285"
              cy="200"
              r="5"
            />
            <circle
              v-if="currentStage >= 2 && currentStage < 5"
              class="path-point"
              cx="295"
              cy="165"
              r="5"
            />
            <circle
              v-if="currentStage >= 3 && currentStage < 5"
              class="path-point"
              cx="315"
              cy="135"
              r="5"
            />

            <!-- 混乱的纠缠线 -->
            <line
              v-if="currentStage >= 3 && currentStage < 5"
              x1="285"
              y1="200"
              x2="295"
              y2="165"
              stroke="#000"
              stroke-width="0.5"
              opacity="0.3"
              class="tangled-line"
            />
            <line
              v-if="currentStage >= 3 && currentStage < 5"
              x1="295"
              y1="165"
              x2="315"
              y2="135"
              stroke="#000"
              stroke-width="0.5"
              opacity="0.3"
              class="tangled-line"
            />
          </g>

          <!-- 城墙轮廓（最后阶段） -->
          <g v-if="currentStage >= 5" class="city-wall">
            <path
              class="wall-path"
              d="M 80 60 L 90 60 L 90 50 L 100 50 L 100 60 L 110 60 L 110 45 L 120 45 L 120 60 L 130 60 L 130 50 L 140 50 L 140 60 L 150 60 L 150 45 L 160 45 L 160 60 L 170 60 L 170 50 L 180 50 L 180 60 L 190 60 L 190 45 L 200 45 L 200 60"
            />
          </g>
        </svg>
      </div>

      <!-- 叙事内容 -->
      <transition name="stage-fade" mode="out-in">
        <div :key="currentStage" class="stage-content">
          <!-- 郭靖线内容 -->
          <div class="character-content guojing-content">
            <div class="character-label">郭靖</div>
            <h3 class="character-text">{{ stages[currentStage].guojing.text }}</h3>
            <p v-if="stages[currentStage].guojing.detail" class="character-detail">
              {{ stages[currentStage].guojing.detail }}
            </p>
            <p v-if="stages[currentStage].guojing.context" class="character-context">
              {{ stages[currentStage].guojing.context }}
            </p>
          </div>

          <!-- 杨康线内容 -->
          <div class="character-content yangkang-content" v-if="currentStage < 5">
            <div class="character-label">杨康</div>
            <h3 class="character-text">{{ stages[currentStage].yangkang.text }}</h3>
            <p v-if="stages[currentStage].yangkang.detail" class="character-detail">
              {{ stages[currentStage].yangkang.detail }}
            </p>
            <p v-if="stages[currentStage].yangkang.context" class="character-context">
              {{ stages[currentStage].yangkang.context }}
            </p>
          </div>

          <!-- 统一说明 -->
          <p v-if="stages[currentStage].note" class="stage-note">
            {{ stages[currentStage].note }}
          </p>
        </div>
      </transition>

      <!-- 底部金句 -->
      <div class="fixed-quote" v-if="currentStage === 5">
        "侠之大者，为国为民"
      </div>

      <!-- 点击提示 -->
      <div class="click-hint" v-if="currentStage < stages.length - 1">
        点击继续
      </div>
    </div>

    <!-- 页脚 -->
    <footer class="world-footer">
      <div class="footer-number">VOL.017</div>
      <div class="footer-dots">···</div>
    </footer>
  </div>
</template>

<style scoped>
.shooting-hero-world {
  min-height: 100vh;
  background: #fafafa;
  color: #1a1a1a;
  font-family: 'Noto Serif SC', 'Source Serif 4', serif;
  position: relative;
  overflow-x: hidden;
  padding: 60px 40px;
  cursor: pointer;
}

/* 装饰背景线 */
.decorative-lines {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 0;
}

.line {
  position: absolute;
  background: #000;
  opacity: 0.03;
}

.line-1 {
  width: 1px;
  height: 100%;
  left: 20%;
}

.line-2 {
  width: 1px;
  height: 100%;
  left: 50%;
}

.line-3 {
  width: 1px;
  height: 100%;
  left: 80%;
}

/* 主容器 */
.main-container {
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

/* 返回按钮 */
.back-btn {
  position: absolute;
  top: 0;
  left: 0;
  background: transparent;
  border: 1px solid #000;
  color: #000;
  padding: 10px 20px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.back-btn:hover {
  background: #000;
  color: #fff;
}

/* 两条路的视觉区 */
.paths-visual {
  margin: 120px 0 60px;
  min-height: 350px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.paths-svg {
  width: 100%;
  max-width: 500px;
  height: auto;
}

/* 路径线 */
.path-line {
  fill: none;
  stroke: #000;
  stroke-width: 2;
  stroke-linecap: round;
  opacity: 0;
  transition: all 1s ease;
}

.path-line.visible {
  opacity: 1;
}

.guojing-line {
  stroke: #1a1a1a;
}

.yangkang-line {
  stroke: #666;
}

.yangkang-line.fading {
  opacity: 0.2;
  stroke-dasharray: 5, 5;
}

/* 路径点 */
.path-point {
  fill: #000;
  opacity: 0;
  animation: point-appear 0.5s ease forwards;
}

.start-point {
  opacity: 1;
}

.city-point {
  fill: #1a1a1a;
  animation: point-pulse 2s ease-in-out infinite;
}

@keyframes point-appear {
  from {
    opacity: 0;
    r: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes point-pulse {
  0%, 100% {
    r: 10;
  }
  50% {
    r: 12;
  }
}

/* 纠缠线 */
.tangled-line {
  animation: tangle-move 3s ease-in-out infinite;
}

@keyframes tangle-move {
  0%, 100% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.5;
  }
}

/* 城墙 */
.city-wall {
  animation: wall-rise 1.5s ease forwards;
}

.wall-path {
  fill: none;
  stroke: #1a1a1a;
  stroke-width: 2;
  stroke-linecap: square;
  stroke-linejoin: miter;
}

@keyframes wall-rise {
  from {
    opacity: 0;
    stroke-dasharray: 300;
    stroke-dashoffset: 300;
  }
  to {
    opacity: 1;
    stroke-dashoffset: 0;
  }
}

/* 内容区 */
.stage-content {
  text-align: center;
  margin: 60px 0;
  min-height: 200px;
}

.character-content {
  margin-bottom: 40px;
}

.character-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.3em;
  color: #999;
  margin-bottom: 10px;
}

.character-text {
  font-size: clamp(24px, 4vw, 32px);
  font-weight: 400;
  margin: 0 0 15px;
  letter-spacing: 0.2em;
  color: #000;
}

.character-detail {
  font-size: clamp(14px, 2.5vw, 18px);
  font-weight: 300;
  color: #333;
  margin: 0 0 8px;
  letter-spacing: 0.1em;
}

.character-context {
  font-size: clamp(13px, 2vw, 16px);
  font-weight: 300;
  color: #666;
  margin: 0;
  font-style: italic;
  letter-spacing: 0.05em;
}

.stage-note {
  font-size: clamp(14px, 2.5vw, 18px);
  font-weight: 300;
  color: #999;
  margin: 30px 0 0;
  padding-top: 30px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  letter-spacing: 0.15em;
  line-height: 1.8;
}

.yangkang-content.fading {
  opacity: 0.3;
}

/* 底部金句 */
.fixed-quote {
  text-align: center;
  padding: 40px 0;
  margin: 60px 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  font-size: 18px;
  font-weight: 400;
  color: #000;
  letter-spacing: 0.2em;
  line-height: 1.8;
}

/* 点击提示 */
.click-hint {
  text-align: center;
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  color: #999;
  letter-spacing: 0.2em;
  animation: hint-pulse 2s ease-in-out infinite;
}

@keyframes hint-pulse {
  0%, 100% {
    opacity: 0.4;
  }
  50% {
    opacity: 1;
  }
}

/* 过渡动画 */
.stage-fade-enter-active,
.stage-fade-leave-active {
  transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
}

.stage-fade-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.stage-fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* 页脚 */
.world-footer {
  position: fixed;
  bottom: 40px;
  left: 40px;
  right: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  color: #999;
  letter-spacing: 0.2em;
  z-index: 10;
}

.footer-dots {
  opacity: 0.3;
}

/* 响应式 */
@media (max-width: 768px) {
  .main-container {
    padding: 40px 20px;
  }

  .back-btn {
    top: 0;
    left: 0;
  }

  .paths-visual {
    margin: 80px 0 40px;
    min-height: 280px;
  }

  .paths-svg {
    max-width: 350px;
  }

  .character-text {
    font-size: 20px;
  }

  .character-detail {
    font-size: 14px;
  }

  .character-context {
    font-size: 13px;
  }

  .stage-note {
    font-size: 13px;
  }

  .fixed-quote {
    font-size: 16px;
  }

  .world-footer {
    bottom: 20px;
    left: 20px;
    right: 20px;
  }
}
</style>

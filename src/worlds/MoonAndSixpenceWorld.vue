<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const currentStage = ref(0)

const stages = [
  {
    text: '证券经纪人',
    subtext: '年薪百万，家庭美满',
    detail: '斯特里克兰',
    note: '伦敦，体面的生活'
  },
  {
    text: '离开',
    subtext: '抛弃一切',
    detail: '去巴黎',
    note: '没有人理解'
  },
  {
    text: '我必须画画',
    subtext: '我身不由己',
    detail: '一个人掉进水里',
    note: '他怎么游泳都无所谓'
  },
  {
    text: '塔希提',
    subtext: '原始的激情',
    detail: '在这里，我找到了自己',
    note: ''
  },
  {
    text: '杰作',
    subtext: '燃烧生命的最后时刻',
    detail: '眼睛失明，作品完成',
    note: '墙上的壁画，是他的一生'
  },
  {
    text: '满地都是六便士',
    subtext: '他却抬头看见了月亮',
    detail: '',
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
  <div class="moon-and-sixpence-world" @click="nextStage">
    <!-- 装饰背景线 -->
    <div class="decorative-lines">
      <div class="line line-1"></div>
      <div class="line line-2"></div>
      <div class="line line-3"></div>
    </div>

    <!-- 月亮背景 -->
    <div class="moon-background" :class="{ visible: currentStage >= 3, pure: currentStage >= 5 }"></div>

    <!-- 杂乱线条（巴黎挣扎期） -->
    <div class="chaos-lines" v-if="currentStage >= 2 && currentStage < 4">
      <div class="chaos-line" v-for="i in 8" :key="i" :style="{ animationDelay: `${i * 0.1}s` }"></div>
    </div>

    <!-- 主容器 -->
    <div class="main-container">
      <!-- 返回按钮 -->
      <button class="back-btn" @click.stop="goBack">← 返回</button>

      <!-- 变形视觉区 -->
      <div class="transformation-visual">
        <!-- 人形/圆的变形 -->
        <svg class="shape-svg" viewBox="0 0 200 200">
          <!-- 规则圆（伦敦） -->
          <circle
            v-if="currentStage < 1"
            class="human-circle regular"
            cx="100"
            cy="100"
            r="40"
            fill="none"
            stroke="#1a1a1a"
            stroke-width="2"
          />

          <!-- 变形圆（巴黎） -->
          <path
            v-if="currentStage >= 1 && currentStage < 3"
            class="human-circle deforming"
            d="M 70 100 Q 70 60 100 60 Q 130 60 130 100 Q 130 130 100 130 Q 70 130 70 100"
            fill="none"
            stroke="#1a1a1a"
            stroke-width="2"
          />

          <!-- 扭曲形状（塔希提） -->
          <path
            v-if="currentStage >= 3 && currentStage < 5"
            class="human-circle tribal"
            d="M 60 90 Q 80 50 100 70 Q 120 50 140 90 Q 150 110 130 120 Q 110 140 100 120 Q 90 140 70 120 Q 50 110 60 90"
            :class="{ glowing: currentStage >= 4 }"
            fill="none"
            stroke="#c94a3a"
            stroke-width="2.5"
          />

          <!-- 纯净阶段（最终）只显示月亮，这里不显示人形 -->
        </svg>

        <!-- 地面和六便士 -->
        <div class="ground-area" :class="{ visible: currentStage >= 5 }">
          <div class="sixpence" v-for="i in 6" :key="i" :class="{ scattered: currentStage >= 5 }"></div>
        </div>
      </div>

      <!-- 叙事内容 -->
      <transition name="stage-fade" mode="out-in">
        <div :key="currentStage" class="stage-content">
          <h1 class="main-text">{{ stages[currentStage].text }}</h1>
          <p class="sub-text">{{ stages[currentStage].subtext }}</p>
          <p v-if="stages[currentStage].detail" class="detail-text">{{ stages[currentStage].detail }}</p>
          <p v-if="stages[currentStage].note" class="note-text">{{ stages[currentStage].note }}</p>
        </div>
      </transition>

      <!-- 底部金句 -->
      <div class="fixed-quote" v-if="currentStage === 5">
        "上帝的磨盘转动得很慢，但是却磨得很细"
      </div>

      <!-- 点击提示 -->
      <div class="click-hint" v-if="currentStage < stages.length - 1">
        点击继续
      </div>
    </div>

    <!-- 页脚 -->
    <footer class="world-footer">
      <div class="footer-number">VOL.018</div>
      <div class="footer-dots">···</div>
    </footer>
  </div>
</template>

<style scoped>
.moon-and-sixpence-world {
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

/* 月亮背景 */
.moon-background {
  position: fixed;
  top: 10%;
  right: 10%;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(200, 200, 200, 0.3), transparent);
  opacity: 0;
  transition: all 3s ease;
  pointer-events: none;
  z-index: 0;
}

.moon-background.visible {
  opacity: 1;
  background: radial-gradient(circle, rgba(201, 74, 58, 0.2), transparent);
}

.moon-background.pure {
  background: radial-gradient(circle, rgba(255, 255, 255, 0.9), transparent);
  box-shadow: 0 0 60px rgba(255, 255, 255, 0.5);
  width: 300px;
  height: 300px;
  top: 5%;
}

/* 杂乱线条 */
.chaos-lines {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 0;
}

.chaos-line {
  position: absolute;
  width: 2px;
  height: 80px;
  background: #000;
  opacity: 0.05;
  animation: chaos-move 3s ease-in-out infinite;
}

.chaos-line:nth-child(1) { left: 15%; top: 20%; transform: rotate(15deg); }
.chaos-line:nth-child(2) { left: 30%; top: 40%; transform: rotate(-10deg); animation-delay: 0.3s; }
.chaos-line:nth-child(3) { left: 45%; top: 60%; transform: rotate(20deg); animation-delay: 0.6s; }
.chaos-line:nth-child(4) { left: 60%; top: 30%; transform: rotate(-15deg); animation-delay: 0.9s; }
.chaos-line:nth-child(5) { left: 75%; top: 50%; transform: rotate(10deg); animation-delay: 1.2s; }
.chaos-line:nth-child(6) { left: 85%; top: 70%; transform: rotate(-20deg); animation-delay: 1.5s; }
.chaos-line:nth-child(7) { left: 25%; top: 80%; transform: rotate(5deg); animation-delay: 1.8s; }
.chaos-line:nth-child(8) { left: 65%; top: 15%; transform: rotate(-5deg); animation-delay: 2.1s; }

@keyframes chaos-move {
  0%, 100% {
    opacity: 0.03;
    transform: rotate(var(--rotation, 0deg)) translateY(0);
  }
  50% {
    opacity: 0.08;
    transform: rotate(var(--rotation, 0deg)) translateY(10px);
  }
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

/* 变形视觉区 */
.transformation-visual {
  margin: 120px 0 60px;
  min-height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.shape-svg {
  width: 100%;
  max-width: 300px;
  height: auto;
  z-index: 2;
}

.human-circle.regular {
  animation: circle-pulse 4s ease-in-out infinite;
}

.human-circle.deforming {
  animation: deform 2s ease-in-out infinite;
}

.human-circle.tribal {
  animation: tribal-glow 3s ease-in-out infinite;
}

.human-circle.tribal.glowing {
  stroke: #c94a3a;
  filter: drop-shadow(0 0 8px rgba(201, 74, 58, 0.4));
}

@keyframes circle-pulse {
  0%, 100% {
    r: 40;
  }
  50% {
    r: 42;
  }
}

@keyframes deform {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

@keyframes tribal-glow {
  0%, 100% {
    opacity: 1;
    stroke-width: 2.5;
  }
  50% {
    opacity: 0.8;
    stroke-width: 3;
  }
}

/* 地面和六便士 */
.ground-area {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  opacity: 0;
  transition: opacity 2s ease;
}

.ground-area.visible {
  opacity: 1;
}

.sixpence {
  width: 8px;
  height: 8px;
  background: #1a1a1a;
  border-radius: 50%;
  transition: all 1.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.sixpence.scattered {
  transform: translateY(var(--scatter-y, -20px)) translateX(var(--scatter-x, 0));
  opacity: 0.4;
}

.sixpence:nth-child(1) { --scatter-y: -15px; --scatter-x: -10px; }
.sixpence:nth-child(2) { --scatter-y: -25px; --scatter-x: 5px; }
.sixpence:nth-child(3) { --scatter-y: -18px; --scatter-x: -8px; }
.sixpence:nth-child(4) { --scatter-y: -30px; --scatter-x: 12px; }
.sixpence:nth-child(5) { --scatter-y: -20px; --scatter-x: -5px; }
.sixpence:nth-child(6) { --scatter-y: -28px; --scatter-x: 8px; }

/* 内容区 */
.stage-content {
  text-align: center;
  margin: 60px 0;
  min-height: 200px;
}

.main-text {
  font-size: clamp(24px, 4vw, 32px);
  font-weight: 400;
  margin: 0 0 20px;
  letter-spacing: 0.2em;
  color: #000;
}

.sub-text {
  font-size: clamp(14px, 2.5vw, 18px);
  font-weight: 300;
  color: #666;
  margin: 0 0 15px;
  letter-spacing: 0.1em;
}

.detail-text {
  font-size: clamp(13px, 2vw, 16px);
  font-weight: 300;
  color: #999;
  margin: 0 0 8px;
  font-style: italic;
  letter-spacing: 0.05em;
}

.note-text {
  font-size: clamp(12px, 1.8vw, 14px);
  font-weight: 300;
  color: #bbb;
  margin: 0;
  letter-spacing: 0.05em;
}

/* 底部金句 */
.fixed-quote {
  text-align: center;
  padding: 40px 0;
  margin: 60px 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  font-size: 15px;
  font-weight: 300;
  color: #666;
  letter-spacing: 0.15em;
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

  .transformation-visual {
    margin: 80px 0 40px;
    min-height: 250px;
  }

  .moon-background {
    width: 150px;
    height: 150px;
  }

  .moon-background.pure {
    width: 200px;
    height: 200px;
  }

  .main-text {
    font-size: 20px;
  }

  .sub-text {
    font-size: 14px;
  }

  .detail-text {
    font-size: 13px;
  }

  .note-text {
    font-size: 12px;
  }

  .fixed-quote {
    font-size: 14px;
  }

  .world-footer {
    bottom: 20px;
    left: 20px;
    right: 20px;
  }
}
</style>

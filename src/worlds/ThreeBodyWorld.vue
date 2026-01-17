<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const currentStage = ref(0)

const stages = [
  {
    type: 'alert',
    title: 'ARCHIVE HACKED',
    subtitle: '> ACCESS GRANTED',
    terminal: [
      '> 连接目标：PDC数据库',
      '> 破解等级：Ω',
      '> 警告：智子检测中...',
      '> 加载档案...'
    ],
    color: 'red'
  },
  {
    type: 'theory',
    title: '黑暗森林法则',
    tags: ['理论档案', '宇宙社会学'],
    content: [
      '> 生存是文明的第一需要',
      '> 文明不断增长和扩张',
      '> 宇宙中的物质总量保持不变'
    ],
    color: 'green',
    icon: 'triangle'
  },
  {
    type: 'event',
    title: '红岸基地',
    tags: ['事件档案', '1969年'],
    content: [
      '> 大兴安岭，雷达峰',
      '> 发射功率：10⁷瓦',
      '> 接收到信号...',
      '> "不要回答！"'
    ],
    color: 'cyan',
    icon: 'wave'
  },
  {
    type: 'event',
    title: '古筝行动',
    tags: ['事件档案', '2007年'],
    content: [
      '> 目标：审判日号',
      '> 武器：飞刃纳米丝',
      '> 执行：汪淼',
      '> "我点燃了火"'
    ],
    color: 'magenta',
    icon: 'cut'
  },
  {
    type: 'person',
    title: '罗辑',
    tags: ['人物档案', '面壁者', '执剑人'],
    content: [
      '> 面壁者编号：4',
      '> 威慑建立：是',
      '> 执剑时间：54年',
      '> 威慑度：98%'
    ],
    color: 'green',
    icon: 'circle'
  },
  {
    type: 'event',
    title: '水滴',
    tags: ['事件档案', '强互作用力'],
    content: [
      '> 强互作用力探测器',
      '> 表面：绝对光滑',
      '> 速度：1/3光速',
      '> "毁灭你，与你何干"'
    ],
    color: 'cyan',
    icon: 'drop'
  },
  {
    type: 'final',
    title: '二向箔',
    tags: ['终极档案', '降维打击'],
    content: [
      '> 警告！警告！',
      '> 太阳系二维化启动',
      '> 所有文明...',
      '> 数据丢失...',
      '> [CONNECTION LOST]'
    ],
    color: 'magenta',
    icon: 'collapse'
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
  <div class="three-body-world" @click="nextStage">
    <!-- 三体运动背景层 -->
    <div class="three-body-background">
      <div class="star star-1"></div>
      <div class="star star-2"></div>
      <div class="star star-3"></div>
      <svg class="orbit-lines" viewBox="0 0 100 100">
        <ellipse class="orbit orbit-1" cx="50" cy="50" rx="30" ry="20"/>
        <ellipse class="orbit orbit-2" cx="50" cy="50" rx="35" ry="25"/>
        <ellipse class="orbit orbit-3" cx="50" cy="50" rx="40" ry="30"/>
      </svg>
    </div>

    <!-- 磨砂玻璃层 -->
    <div class="frosted-layer"></div>

    <!-- 扫描线覆盖 -->
    <div class="scanlines"></div>

    <!-- 主内容区 -->
    <div class="content-layer">
      <!-- 返回按钮 -->
      <button class="back-btn cyber-chamfer-sm" @click.stop="goBack">← EXIT</button>

      <!-- 档案卡片容器 -->
      <div class="archive-container">
        <transition name="glitch-transition" mode="out-in">
          <div :key="currentStage" class="archive-card" :class="[`color-${stages[currentStage].color}`, stages[currentStage].type]">
            <!-- 终端标题栏 -->
            <div class="terminal-header">
              <div class="terminal-dots">
                <span class="dot red"></span>
                <span class="dot yellow"></span>
                <span class="dot green"></span>
              </div>
              <div class="terminal-title">PDC ARCHIVE v3.7.1</div>
            </div>

            <!-- 档案内容 -->
            <div class="archive-content">
              <!-- 标题 -->
              <h1
                class="archive-title"
                :class="{ 'cyber-glitch': currentStage === 0 || currentStage === 6 }"
                :data-text="stages[currentStage].title"
              >
                {{ stages[currentStage].title }}
              </h1>

              <!-- 标签 -->
              <div class="archive-tags" v-if="stages[currentStage].tags">
                <span
                  v-for="(tag, index) in stages[currentStage].tags"
                  :key="index"
                  class="tag"
                  :class="`tag-${stages[currentStage].color}`"
                >
                  [{{ tag }}]
                </span>
              </div>

              <!-- 图标/视觉元素 -->
              <div class="visual-element" v-if="stages[currentStage].icon">
                <!-- 三角形（黑暗森林） -->
                <svg v-if="stages[currentStage].icon === 'triangle'" class="icon-svg" viewBox="0 0 100 100">
                  <polygon points="50,20 80,80 20,80" fill="none" stroke="currentColor" stroke-width="2"/>
                  <polygon points="50,30 70,70 30,70" fill="none" stroke="currentColor" stroke-width="1" opacity="0.5"/>
                  <polygon points="50,40 60,60 40,60" fill="none" stroke="currentColor" stroke-width="1" opacity="0.3"/>
                </svg>

                <!-- 波形（红岸信号） -->
                <svg v-if="stages[currentStage].icon === 'wave'" class="icon-svg" viewBox="0 0 100 100">
                  <path d="M0,50 Q25,20 50,50 T100,50" fill="none" stroke="currentColor" stroke-width="2">
                    <animate attributeName="d" dur="2s" repeatCount="indefinite"
                      values="M0,50 Q25,20 50,50 T100,50;M0,50 Q25,80 50,50 T100,50;M0,50 Q25,20 50,50 T100,50"/>
                  </path>
                </svg>

                <!-- 切割线（古筝） -->
                <svg v-if="stages[currentStage].icon === 'cut'" class="icon-svg" viewBox="0 0 100 100">
                  <line x1="0" y1="20" x2="100" y2="20" stroke="currentColor" stroke-width="0.5"/>
                  <line x1="0" y1="50" x2="100" y2="50" stroke="currentColor" stroke-width="1"/>
                  <line x1="0" y1="80" x2="100" y2="80" stroke="currentColor" stroke-width="0.5"/>
                </svg>

                <!-- 圆（两个世界） -->
                <svg v-if="stages[currentStage].icon === 'circle'" class="icon-svg" viewBox="0 0 100 100">
                  <circle cx="35" cy="50" r="25" fill="none" stroke="currentColor" stroke-width="2"/>
                  <circle cx="65" cy="50" r="25" fill="none" stroke="currentColor" stroke-width="2"/>
                  <circle cx="50" cy="50" r="8" fill="currentColor" opacity="0.3"/>
                </svg>

                <!-- 水滴 -->
                <svg v-if="stages[currentStage].icon === 'drop'" class="icon-svg" viewBox="0 0 100 100">
                  <path d="M50,10 C50,10 20,50 20,65 A30,30 0 1,0 80,65 C80,50 50,10 50,10"
                    fill="none" stroke="currentColor" stroke-width="2">
                    <animate attributeName="opacity" values="1;0.5;1" dur="3s" repeatCount="indefinite"/>
                  </path>
                </svg>

                <!-- 坍塌（二向箔） -->
                <svg v-if="stages[currentStage].icon === 'collapse'" class="icon-svg" viewBox="0 0 100 100">
                  <rect x="25" y="25" width="50" height="50" fill="none" stroke="currentColor" stroke-width="2">
                    <animate attributeName="height" from="50" to="2" dur="3s" repeatCount="indefinite"/>
                    <animate attributeName="y" from="25" to="49" dur="3s" repeatCount="indefinite"/>
                    <animate attributeName="opacity" values="1;0.3;1" dur="3s" repeatCount="indefinite"/>
                  </rect>
                </svg>
              </div>

              <!-- 终端文本内容 -->
              <div class="terminal-content">
                <p
                  v-for="(line, index) in stages[currentStage].content"
                  :key="index"
                  class="terminal-line"
                  :class="{ 'typing-effect': index === 0 && currentStage === 0 }"
                >
                  {{ line }}
                </p>
              </div>

              <!-- 阶段指示 -->
              <div class="stage-indicator">
                <span class="indicator-label">FILE_0{{ currentStage + 1 }}_0{{ stages.length }}</span>
                <div class="indicator-dots">
                  <span
                    v-for="i in stages.length"
                    :key="i"
                    class="dot"
                    :class="{ active: currentStage >= i - 1, [`dot-${stages[currentStage].color}`]: currentStage === i - 1 }"
                  ></span>
                </div>
              </div>
            </div>

            <!-- 交互提示 -->
            <div class="interaction-hint" v-if="currentStage < stages.length - 1">
              [PRESS ENTER OR CLICK TO CONTINUE]
            </div>
          </div>
        </transition>
      </div>

      <!-- 页脚 -->
      <footer class="world-footer">
        <div class="footer-number">VOL.037</div>
        <div class="footer-dots">···</div>
      </footer>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Orbitron:wght@400;700;900&family=Share+Tech+Mono&display=swap');

/* ========== 基础容器 ========== */
.three-body-world {
  min-height: 100vh;
  background: #0a0a0f;
  color: #e0e0e0;
  font-family: 'JetBrains Mono', monospace;
  position: relative;
  overflow-x: hidden;
  cursor: pointer;
}

/* ========== 三体背景层 ========== */
.three-body-background {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  background: #0a0a0f;
  overflow: hidden;
}

.star {
  position: absolute;
  border-radius: 50%;
  filter: blur(20px);
  opacity: 0.4;
  mix-blend-mode: screen;
  will-change: transform, top, left;
}

.star-1 {
  width: 120px;
  height: 120px;
  background: radial-gradient(circle, #00ff88 0%, transparent 70%);
  animation: star-chaos-1 25s ease-in-out infinite;
  box-shadow: 0 0 60px #00ff8840;
}

.star-2 {
  width: 100px;
  height: 100px;
  background: radial-gradient(circle, #ff00ff 0%, transparent 70%);
  animation: star-chaos-2 30s ease-in-out infinite;
  box-shadow: 0 0 60px #ff00ff40;
}

.star-3 {
  width: 80px;
  height: 80px;
  background: radial-gradient(circle, #00d4ff 0%, transparent 70%);
  animation: star-chaos-3 20s ease-in-out infinite;
  box-shadow: 0 0 60px #00d4ff40;
}

@keyframes star-chaos-1 {
  0%, 100% { top: 20%; left: 20%; transform: scale(1); }
  15% { top: 30%; left: 40%; transform: scale(1.2); }
  30% { top: 50%; left: 60%; transform: scale(0.8); }
  45% { top: 70%; left: 50%; transform: scale(1.1); }
  60% { top: 60%; left: 30%; transform: scale(0.9); }
  75% { top: 40%; left: 20%; transform: scale(1.15); }
  90% { top: 25%; left: 35%; transform: scale(0.85); }
}

@keyframes star-chaos-2 {
  0%, 100% { top: 60%; left: 70%; transform: scale(0.9); }
  20% { top: 40%; left: 60%; transform: scale(1.3); }
  40% { top: 30%; left: 40%; transform: scale(0.7); }
  60% { top: 50%; left: 25%; transform: scale(1.1); }
  80% { top: 70%; left: 35%; transform: scale(0.95); }
}

@keyframes star-chaos-3 {
  0%, 100% { top: 80%; left: 40%; transform: scale(1.05); }
  25% { top: 60%; left: 25%; transform: scale(0.8); }
  50% { top: 35%; left: 35%; transform: scale(1.25); }
  75% { top: 45%; left: 65%; transform: scale(0.85); }
}

.orbit-lines {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0.03;
  pointer-events: none;
}

.orbit {
  fill: none;
  stroke: #00ff88;
  stroke-width: 0.5;
  stroke-dasharray: 5, 5;
}

/* ========== 磨砂玻璃层 ========== */
.frosted-layer {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  backdrop-filter: blur(40px) brightness(0.8);
  -webkit-backdrop-filter: blur(40px) brightness(0.8);
  background: rgba(10, 10, 15, 0.6);
}

/* ========== 扫描线 ========== */
.scanlines {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0, 0, 0, 0.1) 2px,
    rgba(0, 0, 0, 0.1) 4px
  );
  pointer-events: none;
}

/* ========== 内容层 ========== */
.content-layer {
  position: relative;
  z-index: 10;
  min-height: 100vh;
  padding: 60px 40px;
  display: flex;
  flex-direction: column;
}

/* ========== 返回按钮 ========== */
.back-btn {
  position: absolute;
  top: 40px;
  left: 40px;
  background: transparent;
  border: 2px solid var(--border-color, #2a2a3a);
  color: var(--text-color, #e0e0e0);
  padding: 12px 24px;
  font-family: 'Share Tech Mono', monospace;
  font-size: 12px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
  clip-path: polygon(
    0 8px, 8px 0,
    calc(100% - 8px) 0, 100% 8px,
    100% calc(100% - 8px), calc(100% - 8px) 100%,
    8px 100%, 0 calc(100% - 8px)
  );
}

.back-btn:hover {
  border-color: var(--hover-color, #00ff88);
  color: var(--hover-color, #00ff88);
  box-shadow: 0 0 10px var(--hover-glow, rgba(0, 255, 136, 0.4));
}

/* ========== 档案容器 ========== */
.archive-container {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
}

.archive-card {
  width: 100%;
  max-width: 700px;
  background: rgba(18, 18, 26, 0.8);
  border: 1px solid var(--border-color, #2a2a3a);
  clip-path: polygon(
    0 15px, 15px 0,
    calc(100% - 15px) 0, 100% 15px,
    100% calc(100% - 15px), calc(100% - 15px) 100%,
    15px 100%, 0 calc(100% - 15px)
  );
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
}

/* 颜色变体 */
.archive-card.color-red {
  --border-color: #ff3366;
  --text-color: #ff3366;
  --hover-color: #ff3366;
  --hover-glow: rgba(255, 51, 102, 0.4);
  box-shadow: 0 0 20px rgba(255, 51, 102, 0.2);
}

.archive-card.color-green {
  --border-color: #00ff88;
  --text-color: #00ff88;
  --hover-color: #00ff88;
  --hover-glow: rgba(0, 255, 136, 0.4);
  box-shadow: 0 0 20px rgba(0, 255, 136, 0.2);
}

.archive-card.color-cyan {
  --border-color: #00d4ff;
  --text-color: #00d4ff;
  --hover-color: #00d4ff;
  --hover-glow: rgba(0, 212, 255, 0.4);
  box-shadow: 0 0 20px rgba(0, 212, 255, 0.2);
}

.archive-card.color-magenta {
  --border-color: #ff00ff;
  --text-color: #ff00ff;
  --hover-color: #ff00ff;
  --hover-glow: rgba(255, 0, 255, 0.4);
  box-shadow: 0 0 20px rgba(255, 0, 255, 0.2);
}

/* ========== 终端标题栏 ========== */
.terminal-header {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  border-bottom: 1px solid var(--border-color, #2a2a3a);
  background: rgba(10, 10, 15, 0.5);
}

.terminal-dots {
  display: flex;
  gap: 6px;
}

.terminal-dots .dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.terminal-dots .dot.red { background: #ff3366; }
.terminal-dots .dot.yellow { background: #ffcc00; }
.terminal-dots .dot.green { background: #00ff88; }

.terminal-title {
  margin-left: auto;
  font-family: 'Share Tech Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.2em;
  color: #6b7280;
  text-transform: uppercase;
}

/* ========== 档案内容 ========== */
.archive-content {
  padding: 40px;
}

.archive-title {
  font-family: 'Orbitron', monospace;
  font-size: clamp(24px, 5vw, 36px);
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.3em;
  margin: 0 0 20px;
  color: var(--text-color, #e0e0e0);
  line-height: 1.2;
}

/* 故障效果 */
.cyber-glitch {
  position: relative;
  animation: glitch 3s infinite;
}

.cyber-glitch::before,
.cyber-glitch::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.cyber-glitch::before {
  left: 2px;
  text-shadow: -1px 0 #ff00ff;
  clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
  animation: glitch-1 2s infinite linear alternate-reverse;
}

.cyber-glitch::after {
  left: -2px;
  text-shadow: -1px 0 #00d4ff;
  clip-path: polygon(0 55%, 100% 55%, 100% 100%, 0 100%);
  animation: glitch-2 3s infinite linear alternate-reverse;
}

@keyframes glitch {
  0%, 100% { transform: translate(0); }
  20% { transform: translate(-2px, 2px); }
  40% { transform: translate(2px, -2px); }
  60% { transform: translate(-1px, -1px); }
  80% { transform: translate(1px, 1px); }
}

@keyframes glitch-1 {
  0% { clip-path: inset(20% 0 80% 0); }
  20% { clip-path: inset(60% 0 10% 0); }
  40% { clip-path: inset(40% 0 50% 0); }
  60% { clip-path: inset(80% 0 5% 0); }
  80% { clip-path: inset(10% 0 70% 0); }
  100% { clip-path: inset(30% 0 20% 0); }
}

@keyframes glitch-2 {
  0% { clip-path: inset(10% 0 60% 0); }
  20% { clip-path: inset(30% 0 20% 0); }
  40% { clip-path: inset(70% 0 10% 0); }
  60% { clip-path: inset(20% 0 50% 0); }
  80% { clip-path: inset(50% 0 30% 0); }
  100% { clip-path: inset(0% 0 80% 0); }
}

/* ========== 标签 ========== */
.archive-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 30px;
}

.tag {
  font-family: 'Share Tech Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.2em;
  padding: 4px 10px;
  border: 1px solid currentColor;
  text-transform: uppercase;
}

.tag-green { color: #00ff88; }
.tag-cyan { color: #00d4ff; }
.tag-magenta { color: #ff00ff; }

/* ========== 视觉元素 ========== */
.visual-element {
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
  color: var(--text-color, #e0e0e0);
}

.icon-svg {
  width: 100%;
  max-width: 150px;
  height: auto;
}

/* ========== 终端内容 ========== */
.terminal-content {
  margin-bottom: 30px;
}

.terminal-line {
  font-family: 'JetBrains Mono', monospace;
  font-size: clamp(13px, 2.5vw, 16px);
  line-height: 1.8;
  margin: 0;
  color: #e0e0e0;
  opacity: 0;
  animation: fade-in 0.5s ease forwards;
}

.terminal-line:nth-child(1) { animation-delay: 0.1s; }
.terminal-line:nth-child(2) { animation-delay: 0.3s; }
.terminal-line:nth-child(3) { animation-delay: 0.5s; }
.terminal-line:nth-child(4) { animation-delay: 0.7s; }
.terminal-line:nth-child(5) { animation-delay: 0.9s; }

@keyframes fade-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.typing-effect {
  overflow: hidden;
  white-space: nowrap;
  border-right: 2px solid currentColor;
  animation: typing 3s steps(30) forwards, blink 0.75s step-end infinite;
}

@keyframes typing {
  from { width: 0; }
  to { width: 100%; }
}

@keyframes blink {
  50% { border-color: transparent; }
}

/* ========== 阶段指示 ========== */
.stage-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  padding-top: 20px;
  border-top: 1px solid var(--border-color, #2a2a3a);
}

.indicator-label {
  font-family: 'Share Tech Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.2em;
  color: #6b7280;
  text-transform: uppercase;
}

.indicator-dots {
  display: flex;
  gap: 8px;
}

.indicator-dots .dot {
  width: 8px;
  height: 8px;
  background: #2a2a3a;
  border-radius: 50%;
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
}

.indicator-dots .dot.active {
  background: var(--text-color, #e0e0e0);
  box-shadow: 0 0 10px currentColor;
}

.indicator-dots .dot.dot-green { background: #00ff88; box-shadow: 0 0 10px #00ff88; }
.indicator-dots .dot.dot-cyan { background: #00d4ff; box-shadow: 0 0 10px #00d4ff; }
.indicator-dots .dot.dot-magenta { background: #ff00ff; box-shadow: 0 0 10px #ff00ff; }

/* ========== 交互提示 ========== */
.interaction-hint {
  text-align: center;
  padding: 20px;
  font-family: 'Share Tech Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.15em;
  color: #6b7280;
  text-transform: uppercase;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 1; }
}

/* ========== 过渡动画 ========== */
.glitch-transition-enter-active,
.glitch-transition-leave-active {
  transition: all 500ms cubic-bezier(0.4, 0, 0.2, 1);
}

.glitch-transition-enter-from {
  opacity: 0;
  transform: scale(0.95) translateY(20px);
  filter: blur(10px);
}

.glitch-transition-leave-to {
  opacity: 0;
  transform: scale(1.05) translateY(-20px);
  filter: blur(10px);
}

/* ========== 页脚 ========== */
.world-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  font-family: 'Share Tech Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.2em;
  color: #6b7280;
  text-transform: uppercase;
}

.footer-dots {
  opacity: 0.3;
}

/* ========== 响应式 ========== */
@media (max-width: 768px) {
  .content-layer {
    padding: 40px 20px;
  }

  .back-btn {
    top: 20px;
    left: 20px;
    padding: 10px 16px;
    font-size: 10px;
  }

  .archive-content {
    padding: 30px 20px;
  }

  .archive-title {
    font-size: 20px;
  }

  .terminal-line {
    font-size: 13px;
  }

  .visual-element {
    height: 100px;
  }

  .world-footer {
    padding: 15px 20px;
    font-size: 9px;
  }
}
</style>

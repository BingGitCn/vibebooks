<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const currentCategory = ref('theory')
const currentIndex = ref(0)

// 理论档案（10条）
const theoryArchives = [
  {
    title: '宇宙社会学公理',
    tags: ['理论档案', '基础公理'],
    content: [
      '> 公理1：生存是文明的第一需要',
      '> 公理2：文明不断增长和扩张',
      '> 公理3：宇宙中的物质总量保持不变',
      '> 推论：文明间的竞争是零和博弈'
    ],
    color: 'green',
    icon: 'axiom'
  },
  {
    title: '猜疑链',
    tags: ['理论档案', '博弈论'],
    content: [
      '> 两个文明之间无法判断对方善恶',
      '> 判断善恶需要交流',
      '> 交流本身就是暴露',
      '> 暴露即毁灭，所以不能交流'
    ],
    color: 'green',
    icon: 'chain'
  },
  {
    title: '技术爆炸',
    tags: ['理论档案', '文明演化'],
    content: [
      '> 弱小文明可能在短时间内超越强大文明',
      '> 技术发展不是线性的',
      '> 可能呈指数级爆炸式增长',
      '> 所以不能轻视任何弱小文明'
    ],
    color: 'green',
    icon: 'explosion'
  },
  {
    title: '黑暗森林打击',
    tags: ['理论档案', '生存法则'],
    content: [
      '> 发现即毁灭',
      '> 最经济的打击方式',
      '> 清除隐患，不留痕迹',
      '> 宇宙就是一座黑暗森林'
    ],
    color: 'magenta',
    icon: 'target'
  },
  {
    title: '面壁计划',
    tags: ['理论档案', '战略'],
    content: [
      '> 智子无法读取思维',
      '> 四位面壁者：罗辑、泰勒、雷迪亚兹、希恩斯',
      '> 用思维欺骗整个宇宙',
      '> 不需要解释，不需要理解'
    ],
    color: 'cyan',
    icon: 'mask'
  },
  {
    title: '执剑人威慑',
    tags: ['理论档案', '威慑体系'],
    content: [
      '> 罗辑建立黑暗森林威慑',
      '> 两个世界的微妙平衡',
      '> 威慑度决定存亡',
      '> 执剑54年，威慑度98%'
    ],
    color: 'green',
    icon: 'sword'
  },
  {
    title: '降维打击',
    tags: ['理论档案', '宇宙战争'],
    content: [
      '> 从10维到0维的宇宙战争',
      '> 二向箔：小纸片般的武器',
      '> 生存是第一需要，所以降维',
      '> 每次降维都是宇宙的退化'
    ],
    color: 'magenta',
    icon: 'dimension'
  },
  {
    title: '光速飞船',
    tags: ['理论档案', '技术'],
    content: [
      '> 曲率驱动：折叠空间',
      '> 黑域：降低光速构建安全区',
      '> 慢雾与死线',
      '> 逃亡主义的最后希望'
    ],
    color: 'cyan',
    icon: 'ship'
  },
  {
    title: '宇宙归零',
    tags: ['理论档案', '宇宙终极'],
    content: [
      '> 大宇宙向小宇宙归还质量',
      '> 最后的文明等待重启',
      '> 如果质量不够，宇宙会坍缩',
      '> 等待下一次大爆炸'
    ],
    color: 'magenta',
    icon: 'restart'
  },
  {
    title: '文明生存策略',
    tags: ['理论档案', '生存法则'],
    content: [
      '> 藏好自己',
      '> 做好清理',
      '> 不要暴露',
      '> 在黑暗中生存'
    ],
    color: 'green',
    icon: 'survival'
  }
]

// 重大事件（12条）
const eventArchives = [
  {
    title: '红岸基地建立',
    tags: ['事件档案', '1969年'],
    content: [
      '> 大兴安岭，雷达峰',
      '> 绝密军事工程',
      '> 目标：寻找地外文明',
      '> 雷达发射功率：10^7瓦'
    ],
    color: 'cyan',
    icon: 'base'
  },
  {
    title: '叶文洁首次发射',
    tags: ['事件档案', '1979年'],
    content: [
      '> 太阳作为天线放大器',
      '> 信号飞向4光年外的三体',
      '> "到这里吧，我帮助你们"',
      '> 改变人类命运的一刻'
    ],
    color: 'cyan',
    icon: 'signal'
  },
  {
    title: '三体游戏',
    tags: ['事件档案', '游戏'],
    content: [
      '> VR虚拟现实',
      '> 183次文明毁灭',
      '> 乱纪元与恒纪元交替',
      '> 脱水与浸泡'
    ],
    color: 'green',
    icon: 'game'
  },
  {
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
    title: '面壁计划启动',
    tags: ['事件档案', '战略'],
    content: [
      '> PDC（行星防御理事会）成立',
      '> 四位面壁者被选出',
      '> 每个人都有无限资源',
      '> 但无需向任何人解释'
    ],
    color: 'cyan',
    icon: 'meeting'
  },
  {
    title: '水滴之战',
    tags: ['事件档案', '末日之战'],
    content: [
      '> 2000艘恒星级战舰',
      '> 强互作用力探测器',
      '> "毁灭你，与你何干"',
      '> 40分钟全军覆没'
    ],
    color: 'magenta',
    icon: 'drop'
  },
  {
    title: '威慑建立',
    tags: ['事件档案', '威慑纪元'],
    content: [
      '> 罗辑对决三体世界',
      '> 黑暗森林广播坐标',
      '> 两个世界的和平',
      '> 威慑纪元开始'
    ],
    color: 'green',
    icon: 'peace'
  },
  {
    title: '威慑后纪元',
    tags: ['事件档案', '和平'],
    content: [
      '> 罗辑执剑54年',
      '> 程心接任执剑人',
      '> 威慑度从98%跌到10%',
      '> 三体立刻发动攻击'
    ],
    color: 'cyan',
    icon: 'change'
  },
  {
    title: '万有引力号追击',
    tags: ['事件档案', '逃亡'],
    content: [
      '> 章北海劫持战舰',
      '> "自然选择，前进四！"',
      '> 逃亡主义',
      '> 人类的最后火种'
    ],
    color: 'cyan',
    icon: 'escape'
  },
  {
    title: '二向箔打击',
    tags: ['事件档案', '末日'],
    content: [
      '> 太阳系二维化',
      '> 梵高的星空成真',
      '> 所有文明灭亡',
      '> 只有程心和艾AA逃出'
    ],
    color: 'magenta',
    icon: 'collapse'
  },
  {
    title: '云天明的童话',
    tags: ['事件档案', '情报'],
    content: [
      '> 三个故事',
      '> 隐藏的情报',
      '> 曲率驱动计划',
      '> 藏在童话里的技术'
    ],
    color: 'green',
    icon: 'fairy'
  },
  {
    title: '星际移民',
    tags: ['事件档案', '未来'],
    content: [
      '> 程心和关一帆到达蓝星',
      '> 时间膨胀：1800万年',
      '> 小宇宙的伦理',
      '> 回归大宇宙'
    ],
    color: 'cyan',
    icon: 'migration'
  }
]

// 人物档案（15条）
const personArchives = [
  {
    title: '叶文洁',
    tags: ['人物档案', '红岸统帅'],
    content: [
      '> 红岸基地核心人员',
      '> 按下按钮的人',
      '> "我点燃了火，却控制不了它"',
      '> 三体革命的精神领袖'
    ],
    color: 'cyan',
    icon: 'yewenjie'
  },
  {
    title: '汪淼',
    tags: ['人物档案', '纳米科学家'],
    content: [
      '> 纳米材料研究员',
      '> 古筝行动执行者',
      '> "物理学从未存在过"',
      '> 倒计时眼中的宇宙'
    ],
    color: 'cyan',
    icon: 'wangmiao'
  },
  {
    title: '罗辑',
    tags: ['人物档案', '面壁者', '执剑人'],
    content: [
      '> 面壁者编号：4',
      '> 黑暗森林法则发现者',
      '> 执剑54年，威慑度98%',
      '> 人类的救世主'
    ],
    color: 'green',
    icon: 'luoji'
  },
  {
    title: '章北海',
    tags: ['人物档案', '逃亡主义'],
    content: [
      '> "自然选择，前进四！"',
      '> 逃亡主义之父',
      '> 人类的希望',
      '> 深沉的远见'
    ],
    color: 'cyan',
    icon: 'zhangbeihai'
  },
  {
    title: '程心',
    tags: ['人物档案', '执剑人'],
    content: [
      '> 第二任执剑人',
      '> 爱与责任的悲剧',
      '> 威慑度10%',
      '> 毁灭人类的仁慈'
    ],
    color: 'green',
    icon: 'chengxin'
  },
  {
    title: '云天明',
    tags: ['人物档案', '星星'],
    content: [
      '> 大脑送入太空',
      '> 给程心一颗星星',
      '> 童话情报传递者',
      '> 跨越光年的爱'
    ],
    color: 'cyan',
    icon: 'yuntianming'
  },
  {
    title: '托马斯·维德',
    tags: ['人物档案', '极端理性'],
    content: [
      '> "失去人性，失去很多；失去兽性，失去一切"',
      '> 极端理性主义者',
      '> 被程心阻止',
      '> "前进！不惜一切代价！"'
    ],
    color: 'magenta',
    icon: 'vid'
  },
  {
    title: '丁仪',
    tags: ['人物档案', '物理学家'],
    content: [
      '> "你们是虫子"',
      '> 在水滴前死亡',
      '> 最后的物理学家',
      '> 理解了，但太晚了'
    ],
    color: 'cyan',
    icon: 'dingyi'
  },
  {
    title: '史强',
    tags: ['人物档案', '警察'],
    content: [
      '> 粗鲁但智慧',
      '> "虫子从来没有被真正战胜过"',
      '> 汪淼的引路人',
      '> 大智若愚'
    ],
    color: 'green',
    icon: 'daqiang'
  },
  {
    title: '杨冬',
    tags: ['人物档案', '物理学家'],
    content: [
      '> 叶文洁的女儿',
      '> "物理学不存在了"',
      '> 自杀',
      '> 真相的受害者'
    ],
    color: 'cyan',
    icon: 'yangdong'
  },
  {
    title: '申玉菲',
    tags: ['人物档案', '科学边界'],
    content: [
      '> 科学边界成员',
      '> 三体组织成员',
      '> "主啊"',
      '> 魏成的妻子'
    ],
    color: 'green',
    icon: 'shenyufei'
  },
  {
    title: '泰勒',
    tags: ['人物档案', '面壁者'],
    content: [
      '> 美国国防部长',
      '> 面壁者1号',
      '> 蚊群战术',
      '> 自杀，破壁人成功'
    ],
    color: 'magenta',
    icon: 'taylor'
  },
  {
    title: '雷迪亚兹',
    tags: ['人物档案', '面壁者'],
    content: [
      '> 委内瑞拉总统',
      '> 面壁者2号',
      '> 恒星氢弹同归于尽',
      '> 被本国人民砸死'
    ],
    color: 'magenta',
    icon: 'rediaz'
  },
  {
    title: '希恩斯',
    tags: ['人物档案', '面壁者'],
    content: [
      '> 脑科学家',
      '> 面壁者3号',
      '> 思想钢印',
      '> 被妻子破壁'
    ],
    color: 'cyan',
    icon: 'hines'
  },
  {
    title: '智子',
    tags: ['人物档案', 'AI'],
    content: [
      '> 三体AI',
      '> 展开成二维',
      '> "你们是虫子"',
      '> 监视人类'
    ],
    color: 'magenta',
    icon: 'sophon'
  }
]

// 计算属性
const currentArchives = computed(() => {
  switch (currentCategory.value) {
    case 'theory': return theoryArchives
    case 'event': return eventArchives
    case 'person': return personArchives
    default: return theoryArchives
  }
})

const currentArchive = computed(() => {
  return currentArchives.value[currentIndex.value]
})

const totalArchives = computed(() => {
  return currentArchives.value.length
})

// 方法
function switchCategory(category) {
  currentCategory.value = category
  currentIndex.value = 0
}

function prevArchive() {
  if (currentIndex.value > 0) {
    currentIndex.value--
  } else {
    currentIndex.value = totalArchives.value - 1
  }
}

function nextArchive() {
  if (currentIndex.value < totalArchives.value - 1) {
    currentIndex.value++
  } else {
    currentIndex.value = 0
  }
}

function goBack() {
  router.push('/universe')
}

onMounted(() => {
  currentCategory.value = 'theory'
  currentIndex.value = 0
})
</script>

<template>
  <div class="three-body-world">
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
      <button class="back-btn cyber-chamfer-sm" @click="goBack">← EXIT</button>

      <!-- 顶部类别切换 -->
      <div class="category-tabs">
        <button
          class="tab-btn"
          :class="{ active: currentCategory === 'theory' }"
          @click="switchCategory('theory')"
        >
          <span class="tab-count">[10]</span>
          <span class="tab-label">理论档案</span>
        </button>
        <button
          class="tab-btn"
          :class="{ active: currentCategory === 'event' }"
          @click="switchCategory('event')"
        >
          <span class="tab-count">[12]</span>
          <span class="tab-label">重大事件</span>
        </button>
        <button
          class="tab-btn"
          :class="{ active: currentCategory === 'person' }"
          @click="switchCategory('person')"
        >
          <span class="tab-count">[15]</span>
          <span class="tab-label">人物档案</span>
        </button>
      </div>

      <!-- 档案卡片容器 -->
      <div class="archive-container">
        <transition name="glitch-transition" mode="out-in">
          <div :key="`${currentCategory}-${currentIndex}`" class="archive-card" :class="`color-${currentArchive.color}`">
            <!-- 终端标题栏 -->
            <div class="terminal-header">
              <div class="terminal-dots">
                <span class="dot red"></span>
                <span class="dot yellow"></span>
                <span class="dot green"></span>
              </div>
              <div class="terminal-title">PDC ARCHIVE v3.7.1</div>
              <div class="archive-number">
                FILE {{ String(currentIndex + 1).padStart(2, '0') }}/{{ String(totalArchives).padStart(2, '0') }}
              </div>
            </div>

            <!-- 档案内容 -->
            <div class="archive-content">
              <!-- 标题 -->
              <h1 class="archive-title" :data-text="currentArchive.title">
                {{ currentArchive.title }}
              </h1>

              <!-- 标签 -->
              <div class="archive-tags">
                <span
                  v-for="(tag, index) in currentArchive.tags"
                  :key="index"
                  class="tag"
                  :class="`tag-${currentArchive.color}`"
                >
                  [{{ tag }}]
                </span>
              </div>

              <!-- 图标/视觉元素 -->
              <div class="visual-element">
                <div class="icon-placeholder">● ● ●</div>
              </div>

              <!-- 终端文本内容 -->
              <div class="terminal-content">
                <p
                  v-for="(line, index) in currentArchive.content"
                  :key="index"
                  class="terminal-line"
                >
                  {{ line }}
                </p>
              </div>
            </div>

            <!-- 导航按钮 -->
            <div class="navigation">
              <button class="nav-btn" @click="prevArchive">
                <span class="nav-icon">◀</span>
                <span class="nav-text">PREV</span>
              </button>
              <div class="nav-indicator">
                <span
                  v-for="i in totalArchives"
                  :key="i"
                  class="indicator-dot"
                  :class="{ active: currentIndex === i - 1 }"
                ></span>
              </div>
              <button class="nav-btn" @click="nextArchive">
                <span class="nav-text">NEXT</span>
                <span class="nav-icon">▶</span>
              </button>
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
  padding: 40px;
  display: flex;
  flex-direction: column;
}

/* ========== 返回按钮 ========== */
.back-btn {
  position: absolute;
  top: 40px;
  left: 40px;
  background: transparent;
  border: 2px solid #2a2a3a;
  color: #e0e0e0;
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
  z-index: 100;
}

.back-btn:hover {
  border-color: #00ff88;
  color: #00ff88;
  box-shadow: 0 0 10px rgba(0, 255, 136, 0.4);
}

/* ========== 类别切换标签 ========== */
.category-tabs {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 100px;
  margin-bottom: 40px;
  flex-wrap: wrap;
}

.tab-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(18, 18, 26, 0.8);
  border: 2px solid #2a2a3a;
  padding: 12px 24px;
  font-family: 'Share Tech Mono', monospace;
  font-size: 12px;
  letter-spacing: 0.2em;
  color: #6b7280;
  cursor: pointer;
  transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
  clip-path: polygon(
    0 6px, 6px 0,
    calc(100% - 6px) 0, 100% 6px,
    100% calc(100% - 6px), calc(100% - 6px) 100%,
    6px 100%, 0 calc(100% - 6px)
  );
}

.tab-btn:hover {
  border-color: #00ff88;
  color: #00ff88;
  box-shadow: 0 0 10px rgba(0, 255, 136, 0.3);
}

.tab-btn.active {
  border-color: #00ff88;
  color: #00ff88;
  background: rgba(0, 255, 136, 0.1);
  box-shadow: 0 0 20px rgba(0, 255, 136, 0.4);
}

.tab-count {
  font-size: 10px;
  opacity: 0.7;
}

.tab-label {
  font-weight: 700;
}

/* ========== 档案容器 ========== */
.archive-container {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.archive-card {
  width: 100%;
  max-width: 700px;
  background: rgba(18, 18, 26, 0.9);
  border: 1px solid #2a2a3a;
  clip-path: polygon(
    0 15px, 15px 0,
    calc(100% - 15px) 0, 100% 15px,
    100% calc(100% - 15px), calc(100% - 15px) 100%,
    15px 100%, 0 calc(100% - 15px)
  );
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
}

.archive-card.color-green {
  --border-color: #00ff88;
  --text-color: #00ff88;
  --hover-color: #00ff88;
  box-shadow: 0 0 20px rgba(0, 255, 136, 0.2);
}

.archive-card.color-cyan {
  --border-color: #00d4ff;
  --text-color: #00d4ff;
  box-shadow: 0 0 20px rgba(0, 212, 255, 0.2);
}

.archive-card.color-magenta {
  --border-color: #ff00ff;
  --text-color: #ff00ff;
  box-shadow: 0 0 20px rgba(255, 0, 255, 0.2);
}

/* ========== 终端标题栏 ========== */
.terminal-header {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
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

.archive-number {
  margin-left: 20px;
  font-family: 'Share Tech Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.1em;
  color: var(--text-color, #e0e0e0);
}

/* ========== 档案内容 ========== */
.archive-content {
  padding: 40px;
}

.archive-title {
  font-family: 'Orbitron', monospace;
  font-size: clamp(20px, 4vw, 28px);
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  margin: 0 0 20px;
  color: var(--text-color, #e0e0e0);
  line-height: 1.2;
  position: relative;
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
  letter-spacing: 0.15em;
  padding: 4px 10px;
  border: 1px solid currentColor;
  text-transform: uppercase;
}

.tag-green { color: #00ff88; }
.tag-cyan { color: #00d4ff; }
.tag-magenta { color: #ff00ff; }

/* ========== 视觉元素 ========== */
.visual-element {
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
  color: var(--text-color, #e0e0e0);
}

/* ========== 终端内容 ========== */
.terminal-content {
  margin-bottom: 20px;
}

.terminal-line {
  font-family: 'JetBrains Mono', monospace;
  font-size: clamp(12px, 2vw, 14px);
  line-height: 1.8;
  margin: 0;
  color: #e0e0e0;
  opacity: 0;
  animation: fade-in 0.5s ease forwards;
}

.terminal-line:nth-child(1) { animation-delay: 0.1s; }
.terminal-line:nth-child(2) { animation-delay: 0.2s; }
.terminal-line:nth-child(3) { animation-delay: 0.3s; }
.terminal-line:nth-child(4) { animation-delay: 0.4s; }
.terminal-line:nth-child(5) { animation-delay: 0.5s; }

@keyframes fade-in {
  from { opacity: 0; transform: translateY(5px); }
  to { opacity: 1; transform: translateY(0); }
}

/* ========== 导航 ========== */
.navigation {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(10, 10, 15, 0.5);
}

.nav-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background: transparent;
  border: 1px solid var(--text-color, #2a2a3a);
  padding: 8px 16px;
  font-family: 'Share Tech Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.15em;
  color: var(--text-color, #e0e0e0);
  cursor: pointer;
  transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
  clip-path: polygon(
    0 4px, 4px 0,
    calc(100% - 4px) 0, 100% 4px,
    100% calc(100% - 4px), calc(100% - 4px) 100%,
    4px 100%, 0 calc(100% - 4px)
  );
}

.nav-btn:hover {
  background: rgba(255, 255, 255, 0.05);
  box-shadow: 0 0 10px currentColor;
}

.nav-indicator {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 300px;
}

.indicator-dot {
  width: 6px;
  height: 6px;
  background: #2a2a3a;
  border-radius: 50%;
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
}

.indicator-dot.active {
  background: var(--text-color, #e0e0e0);
  box-shadow: 0 0 8px currentColor;
}

/* ========== 过渡动画 ========== */
.glitch-transition-enter-active,
.glitch-transition-leave-active {
  transition: all 400ms cubic-bezier(0.4, 0, 0.2, 1);
}

.glitch-transition-enter-from {
  opacity: 0;
  transform: scale(0.95);
  filter: blur(5px);
}

.glitch-transition-leave-to {
  opacity: 0;
  transform: scale(1.05);
  filter: blur(5px);
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
    padding: 20px;
  }

  .back-btn {
    top: 20px;
    left: 20px;
    padding: 8px 16px;
    font-size: 10px;
  }

  .category-tabs {
    margin-top: 80px;
    gap: 10px;
  }

  .tab-btn {
    padding: 10px 16px;
    font-size: 10px;
  }

  .archive-content {
    padding: 30px 20px;
  }

  .archive-title {
    font-size: 18px;
  }

  .terminal-line {
    font-size: 12px;
  }

  .navigation {
    flex-direction: column;
    gap: 15px;
  }

  .nav-indicator {
    max-width: 100%;
  }

  .world-footer {
    padding: 15px 20px;
    font-size: 9px;
  }
}
</style>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const currentStage = ref(0)

const stages = [
  // 阶段1
  {
    tsubasa: {
      text: '天吾 rewriting',
      detail: '天吾，作家',
      context: '在重写《空气蛹》',
      note: '他不知道，这会改变一切'
    },
    aomame: {
      text: '青豆 killing',
      detail: '青豆，健身教练',
      context: '在执行任务',
      note: '她不知道，世界已经分裂'
    }
  },
  // 阶段2
  {
    tsubasa: {
      text: '天吾 noticing',
      detail: '天上',
      context: '出现了两个月亮',
      note: ''
    },
    aomame: {
      text: '青豆 seeing',
      detail: '她抬头',
      context: '也看到了',
      note: ''
    }
  },
  // 阶段3
  {
    tsubasa: {
      text: '父亲',
      detail: '龙郎',
      context: '是NHK收费员？还是...',
      note: '谜团加深'
    },
    aomame: {
      text: '领袖',
      detail: '龙郎',
      context: '宗教团体的主宰',
      note: '她的目标'
    }
  },
  // 阶段4
  {
    tsubasa: {
      text: '空气蛹',
      detail: '里面有什么',
      context: '在生长',
      note: '在等待'
    },
    aomame: {
      text: '女童',
      detail: '她是青豆',
      context: '还是另一个存在',
      note: '记忆的谜'
    }
  },
  // 阶段5
  {
    tsubasa: {
      text: '1984',
      detail: '这个世界',
      context: '正在与另一个',
      note: '重叠'
    },
    aomame: {
      text: '1Q84',
      detail: '这个世界',
      context: '正在与另一个',
      note: '交汇'
    }
  },
  // 阶段6
  {
    tsubasa: {
      text: '小小人',
      detail: '某种存在',
      context: '从地下爬出',
      note: '在创造新的世界'
    },
    aomame: {
      text: '接受',
      detail: '青豆',
      context: '接受了这个新世界',
      note: '在这里活下去'
    }
  },
  // 阶段7
  {
    tsubasa: {
      text: '寻找',
      detail: '天吾',
      context: '要找到青豆',
      note: '无论在哪里'
    },
    aomame: {
      text: '等待',
      detail: '青豆',
      context: '在高速公路上',
      note: '等待天吾'
    }
  },
  // 阶段8
  {
    tsubasa: {
      text: '交汇',
      detail: '两条线',
      context: '即将相遇',
      note: '1984和1Q84'
    },
    aomame: {
      text: '交汇',
      detail: '两个世界',
      context: '即将重合',
      note: '为了爱'
    }
  },
  // 阶段9
  {
    tsubasa: {
      text: '当你爱上一个人',
      detail: '',
      context: '',
      note: '时间就停止了'
    },
    aomame: {
      text: '当你爱上一个人',
      detail: '',
      context: '',
      note: '时间就停止了'
    }
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
  <div class="q84-world" @click="nextStage">
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

      <!-- 标题区 -->
      <header class="world-header">
        <h1 class="world-title">1Q84</h1>
        <div class="world-subtitle">1984 / 1Q84</div>
        <div class="header-line"></div>
      </header>

      <!-- 双线叙事区 -->
      <div class="dual-narrative">
        <!-- 天吾线（左/上） -->
        <div class="narrative-line tsubasa-line">
          <div class="line-label">TSUBASA</div>
          <div class="line-year">1984</div>
          <transition name="stage-fade" mode="out-in">
            <div :key="`tsubasa-${currentStage}`" class="line-content">
              <h3 class="content-title">{{ stages[currentStage].tsubasa.text }}</h3>
              <p v-if="stages[currentStage].tsubasa.detail" class="content-detail">
                {{ stages[currentStage].tsubasa.detail }}
              </p>
              <p v-if="stages[currentStage].tsubasa.context" class="content-context">
                {{ stages[currentStage].tsubasa.context }}
              </p>
              <p v-if="stages[currentStage].tsubasa.note" class="content-note">
                {{ stages[currentStage].tsubasa.note }}
              </p>
            </div>
          </transition>
        </div>

        <!-- 分隔线 -->
        <div class="divider">
          <div class="moon moon-large" :class="{ merging: currentStage >= 8 }"></div>
          <div class="moon moon-small" :class="{ merging: currentStage >= 8 }"></div>
        </div>

        <!-- 青豆线（右/下） -->
        <div class="narrative-line aomame-line">
          <div class="line-label">AOMAME</div>
          <div class="line-year">1Q84</div>
          <transition name="stage-fade" mode="out-in">
            <div :key="`aomame-${currentStage}`" class="line-content">
              <h3 class="content-title">{{ stages[currentStage].aomame.text }}</h3>
              <p v-if="stages[currentStage].aomame.detail" class="content-detail">
                {{ stages[currentStage].aomame.detail }}
              </p>
              <p v-if="stages[currentStage].aomame.context" class="content-context">
                {{ stages[currentStage].aomame.context }}
              </p>
              <p v-if="stages[currentStage].aomame.note" class="content-note">
                {{ stages[currentStage].aomame.note }}
              </p>
            </div>
          </transition>
        </div>
      </div>

      <!-- 进度指示 -->
      <div class="progress-indicator">
        <div
          v-for="i in stages.length"
          :key="i"
          class="progress-dot"
          :class="{ active: currentStage >= i - 1 }"
        ></div>
      </div>

      <!-- 点击提示 -->
      <div class="click-hint" v-if="currentStage < stages.length - 1">
        点击继续 {{ currentStage + 1 }}/{{ stages.length }}
      </div>
    </div>

    <!-- 页脚 -->
    <footer class="world-footer">
      <div class="footer-number">VOL.015</div>
      <div class="footer-dots">···</div>
    </footer>
  </div>
</template>

<style scoped>
.q84-world {
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
  max-width: 1200px;
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

/* 标题区 */
.world-header {
  text-align: center;
  margin: 100px 0 60px;
}

.world-title {
  font-size: clamp(32px, 6vw, 48px);
  font-weight: 400;
  margin: 0 0 15px;
  letter-spacing: 0.3em;
  color: #000;
}

.world-subtitle {
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  color: #666;
  letter-spacing: 0.2em;
  margin: 0 0 20px;
}

.header-line {
  width: 80px;
  height: 2px;
  background: #000;
  margin: 0 auto;
  opacity: 0.2;
}

/* 双线叙事区 */
.dual-narrative {
  display: grid;
  grid-template-columns: 1fr 80px 1fr;
  gap: 40px;
  margin-bottom: 60px;
  min-height: 400px;
}

/* 叙事线 */
.narrative-line {
  position: relative;
  padding: 40px 30px;
  background: #fff;
  border: 1px solid #000;
  transition: all 0.3s ease;
}

.narrative-line:hover {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.line-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.2em;
  color: #999;
  margin-bottom: 15px;
}

.line-year {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.15em;
  color: #000;
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.line-content {
  text-align: center;
}

.content-title {
  font-size: clamp(18px, 3vw, 24px);
  font-weight: 400;
  margin: 0 0 15px;
  letter-spacing: 0.15em;
  color: #000;
}

.content-detail {
  font-size: 14px;
  font-weight: 300;
  color: #333;
  margin: 0 0 10px;
  letter-spacing: 0.1em;
}

.content-context {
  font-size: 13px;
  font-weight: 300;
  color: #666;
  margin: 0 0 8px;
  font-style: italic;
  letter-spacing: 0.05em;
}

.content-note {
  font-size: 12px;
  font-weight: 300;
  color: #999;
  margin: 0;
  letter-spacing: 0.05em;
}

/* 分隔线和月亮 */
.divider {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

.moon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
  transition: all 2s ease;
}

.moon-small {
  width: 25px;
  height: 25px;
  background: #f5f5f5;
  opacity: 0.8;
}

.moon.merging {
  opacity: 0.3;
  filter: blur(2px);
}

/* 进度指示 */
.progress-indicator {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-bottom: 30px;
}

.progress-dot {
  width: 6px;
  height: 6px;
  background: #e5e5e5;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.progress-dot.active {
  background: #000;
}

/* 点击提示 */
.click-hint {
  text-align: center;
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  color: #999;
  letter-spacing: 0.15em;
  margin-top: 20px;
}

/* 过渡动画 */
.stage-fade-enter-active,
.stage-fade-leave-active {
  transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
}

.stage-fade-enter-from {
  opacity: 0;
  transform: translateY(15px);
}

.stage-fade-leave-to {
  opacity: 0;
  transform: translateY(-15px);
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
  .q84-world {
    padding: 40px 20px;
  }

  .world-header {
    margin: 80px 0 40px;
  }

  .back-btn {
    top: 0;
    left: 0;
  }

  .dual-narrative {
    grid-template-columns: 1fr;
    grid-template-rows: auto 60px auto;
    gap: 20px;
    min-height: auto;
  }

  .narrative-line {
    padding: 30px 20px;
    min-height: 200px;
  }

  .divider {
    flex-direction: row;
    gap: 15px;
  }

  .moon {
    width: 30px;
    height: 30px;
  }

  .moon-small {
    width: 20px;
    height: 20px;
  }

  .content-title {
    font-size: 18px;
  }

  .content-detail {
    font-size: 13px;
  }

  .content-context {
    font-size: 12px;
  }

  .content-note {
    font-size: 11px;
  }

  .progress-indicator {
    flex-wrap: wrap;
    gap: 6px;
  }

  .world-footer {
    bottom: 20px;
    left: 20px;
    right: 20px;
  }
}
</style>

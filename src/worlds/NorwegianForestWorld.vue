<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

function goBack() {
  router.push('/universe')
}
</script>

<template>
  <div class="norwegian-forest-world">
    <!-- 装饰背景线 -->
    <div class="decorative-lines">
      <div class="line line-1"></div>
      <div class="line line-2"></div>
      <div class="line line-3"></div>
    </div>

    <!-- 主容器 -->
    <div class="file-container">
      <!-- 返回按钮 -->
      <button class="back-btn" @click="goBack">← 返回</button>

      <!-- 病历标题 -->
      <header class="file-header">
        <h1 class="file-title">渡边的心电图</h1>
        <div class="file-subtitle">1969-1970 · 阿美寮记录</div>
        <div class="header-line"></div>
      </header>

      <!-- 数据对比区 -->
      <div class="data-comparison">
        <!-- 直子卡片 -->
        <div class="patient-card naoko">
          <div class="card-header">
            <h2 class="patient-name">直子</h2>
            <span class="patient-status">已逝</span>
          </div>

          <div class="patient-data">
            <div class="data-row">
              <span class="data-label">共同创伤</span>
              <span class="data-value">√ Kizuki</span>
            </div>
            <div class="data-row">
              <span class="data-label">承诺保护</span>
              <span class="data-value">√</span>
            </div>
            <div class="data-row">
              <span class="data-label">身体关系</span>
              <span class="data-value">7次</span>
            </div>
            <div class="data-row">
              <span class="data-label">信件往来</span>
              <span class="data-value">14封</span>
            </div>
            <div class="data-row">
              <span class="data-label">探望次数</span>
              <span class="data-value">9次</span>
            </div>
          </div>

          <!-- 心电图：平直 -->
          <svg class="ecg-line" viewBox="0 0 200 40">
            <line x1="0" y1="20" x2="200" y2="20" stroke="#999" stroke-width="1"/>
          </svg>

          <div class="wave-label">flatline</div>
        </div>

        <!-- VS -->
        <div class="vs-divider">VS</div>

        <!-- 绿子卡片 -->
        <div class="patient-card midori">
          <div class="card-header">
            <h2 class="patient-name">绿子</h2>
            <span class="patient-status alive">活着</span>
          </div>

          <div class="patient-data">
            <div class="data-row">
              <span class="data-label">让他笑</span>
              <span class="data-value">√</span>
            </div>
            <div class="data-row">
              <span class="data-label">真实活着</span>
              <span class="data-value">√</span>
            </div>
            <div class="data-row">
              <span class="data-label">身体关系</span>
              <span class="data-value">11次</span>
            </div>
            <div class="data-row">
              <span class="data-label">父亲葬礼</span>
              <span class="data-value">√</span>
            </div>
            <div class="data-row">
              <span class="data-label">听她表白</span>
              <span class="data-value">√</span>
            </div>
          </div>

          <!-- 心电图：活跃 -->
          <svg class="ecg-line" viewBox="0 0 200 40">
            <path d="M0,20 L30,20 L40,10 L50,30 L60,20 L100,20 L110,5 L120,35 L130,20 L170,20 L180,15 L190,25 L200,20"
                  stroke="#4a7c9f" stroke-width="1.5" fill="none" class="ecg-wave"/>
          </svg>

          <div class="wave-label">active</div>
        </div>
      </div>

      <!-- 问题区 -->
      <div class="question-section">
        <div class="question-title">渡边更爱谁？</div>
        <div class="divider-line"></div>
        <div class="question-answer">数据无法回答</div>
      </div>

      <!-- 引用区 -->
      <div class="quote-section">
        <p class="quote-text">
          他只说
        </p>
        <p class="quote-text main-quote">
          "我在森林里<br/>不知道在哪里"
        </p>
      </div>

      <!-- 底部金句 -->
      <div class="footer-quote">
        <p>死并非生的对立面</p>
        <p>而是作为生的一部分</p>
        <p>永存</p>
      </div>
    </div>

    <!-- 页脚 -->
    <footer class="file-footer">
      <div class="footer-number">VOL.013</div>
      <div class="footer-dots">···</div>
    </footer>
  </div>
</template>

<style scoped>
.norwegian-forest-world {
  min-height: 100vh;
  background: #fafafa;
  color: #1a1a1a;
  font-family: 'Noto Serif SC', 'Source Serif 4', serif;
  position: relative;
  overflow-x: hidden;
  padding: 60px 40px;
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
.file-container {
  max-width: 900px;
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

/* 病历标题 */
.file-header {
  text-align: center;
  margin: 80px 0 60px;
}

.file-title {
  font-size: clamp(24px, 4vw, 32px);
  font-weight: 400;
  margin: 0 0 15px;
  letter-spacing: 0.2em;
  color: #000;
}

.file-subtitle {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  color: #666;
  letter-spacing: 0.15em;
  margin: 0 0 20px;
}

.header-line {
  width: 60px;
  height: 2px;
  background: #000;
  margin: 0 auto;
  opacity: 0.2;
}

/* 数据对比区 */
.data-comparison {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 30px;
  margin-bottom: 60px;
}

.patient-card {
  flex: 1;
  max-width: 380px;
  background: #fff;
  border: 1px solid #000;
  padding: 30px;
  position: relative;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.patient-name {
  font-size: 20px;
  font-weight: 400;
  margin: 0;
  letter-spacing: 0.1em;
}

.patient-status {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  padding: 4px 8px;
  background: #000;
  color: #fff;
  letter-spacing: 0.1em;
}

.patient-status.alive {
  background: #4a7c9f;
}

.patient-data {
  margin-bottom: 25px;
}

.data-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  font-size: 13px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.data-label {
  color: #666;
}

.data-value {
  font-family: 'JetBrains Mono', monospace;
  font-weight: 500;
  color: #000;
}

/* 心电图 */
.ecg-line {
  width: 100%;
  height: 40px;
  margin-bottom: 10px;
}

.ecg-wave {
  stroke-dasharray: 300;
  stroke-dashoffset: 300;
  animation: ecg-draw 2s linear forwards infinite;
}

@keyframes ecg-draw {
  to {
    stroke-dashoffset: 0;
  }
}

.wave-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 9px;
  color: #999;
  text-align: right;
  letter-spacing: 0.1em;
}

/* VS 分隔 */
.vs-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'JetBrains Mono', monospace;
  font-size: 14px;
  font-weight: 700;
  color: #999;
  width: 50px;
  padding-top: 100px;
}

/* 问题区 */
.question-section {
  text-align: center;
  margin: 60px 0;
}

.question-title {
  font-size: 18px;
  font-weight: 400;
  margin-bottom: 15px;
  letter-spacing: 0.15em;
}

.divider-line {
  width: 100px;
  height: 1px;
  background: #000;
  margin: 0 auto 15px;
  opacity: 0.2;
}

.question-answer {
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  color: #666;
  letter-spacing: 0.1em;
}

/* 引用区 */
.quote-section {
  text-align: center;
  padding: 40px 0;
  margin: 40px 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.quote-text {
  font-size: 14px;
  font-weight: 300;
  color: #666;
  margin: 10px 0;
  letter-spacing: 0.15em;
}

.main-quote {
  font-size: clamp(16px, 3vw, 20px);
  color: #000;
  margin-top: 20px;
  line-height: 1.8;
}

/* 底部金句 */
.footer-quote {
  text-align: center;
  padding: 40px 0;
}

.footer-quote p {
  font-size: 13px;
  font-weight: 300;
  color: #666;
  margin: 8px 0;
  letter-spacing: 0.2em;
  line-height: 2;
}

/* 页脚 */
.file-footer {
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
}

.footer-dots {
  opacity: 0.3;
}

/* 响应式 */
@media (max-width: 768px) {
  .norwegian-forest-world {
    padding: 40px 20px;
  }

  .data-comparison {
    flex-direction: column;
    align-items: center;
  }

  .patient-card {
    max-width: 100%;
  }

  .vs-divider {
    padding-top: 0;
    padding: 20px 0;
  }

  .file-footer {
    bottom: 20px;
    left: 20px;
    right: 20px;
  }
}
</style>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

function goBack() {
  router.push('/universe')
}
</script>

<template>
  <div class="embodied-world">
    <!-- 装饰背景线 -->
    <div class="decorative-lines">
      <div class="line line-1"></div>
      <div class="line line-2"></div>
      <div class="line line-3"></div>
    </div>

    <!-- 主容器 -->
    <div class="report-container">
      <!-- 顶部返回按钮 -->
      <header class="report-header">
        <button class="back-btn" @click="goBack">← 返回</button>
      </header>

      <!-- 报告标题 -->
      <div class="report-title-section">
        <h1 class="report-title">置身事内</h1>
        <div class="title-underline"></div>
      </div>

      <!-- 底部邀请文字 -->
      <div class="invitation-section">
        <p class="invitation-text">
          如果你想了解中国政府的运作逻辑
        </p>
        <p class="invitation-text">
          就去读读这本书吧
        </p>
      </div>
    </div>

    <!-- 页脚装饰 -->
    <footer class="report-footer">
      <div class="footer-number">VOL.011</div>
      <div class="footer-dots">···</div>
    </footer>
  </div>
</template>

<style scoped>
.embodied-world {
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
.report-container {
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

/* 顶部 */
.report-header {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 80px;
}

.back-btn {
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

/* 报告标题 */
.report-title-section {
  text-align: center;
  margin-bottom: 180px;
  position: relative;
}

.report-title {
  font-size: clamp(28px, 5vw, 42px);
  font-weight: 400;
  margin: 0 0 20px;
  letter-spacing: 0.3em;
  color: #000;
}

.title-underline {
  width: 60px;
  height: 2px;
  background: #000;
  margin: 0 auto;
  opacity: 0.2;
}

/* 邀请部分 */
.invitation-section {
  text-align: center;
  padding: 60px 0;
  position: relative;
}

.invitation-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 1px;
  height: 40px;
  background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.2));
}

.invitation-text {
  font-size: 14px;
  font-weight: 300;
  color: #666;
  margin: 10px 0;
  letter-spacing: 0.2em;
  line-height: 2;
}

/* 页脚 */
.report-footer {
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
  .embodied-world {
    padding: 40px 20px;
  }

  .report-header {
    margin-bottom: 60px;
  }

  .report-title-section {
    margin-bottom: 120px;
  }

  .invitation-text {
    font-size: 12px;
  }

  .report-footer {
    bottom: 20px;
    left: 20px;
    right: 20px;
  }
}
</style>

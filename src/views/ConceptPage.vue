<template>
  <div class="concept-page">
    <!-- 顶部导航 -->
    <nav class="top-nav">
      <button class="back-btn" @click="goBack">
        <span class="arrow">←</span> RETURN
      </button>
      <span class="code-label">{{ concept.code }} / {{ concept.nameEn }}</span>
    </nav>

    <!-- 主内容 -->
    <div class="concept-content">
      <!-- 概念标题 -->
      <header class="concept-header fade-in" :class="{ visible: mounted }">
        <p class="header-meta">
          {{ concept.researcher }}, {{ concept.year }}
        </p>
        <h1 class="header-title">{{ concept.nameEn }}</h1>
        <h2 class="header-subtitle">{{ concept.name }}</h2>
        <p class="header-one-line">{{ concept.oneLine }}</p>
      </header>

      <!-- 四个维度区域 -->
      <div class="sections-container">

        <!-- 01 实验室 -->
        <section class="concept-section fade-in" :class="{ visible: sectionsVisible[0] }">
          <div class="section-header">
            <span class="section-number">01</span>
            <h3 class="section-title">实验室</h3>
            <span class="section-line"></span>
          </div>

          <div class="lab-block">
            <p class="lab-source">{{ concept.lab.source }}</p>
            <blockquote class="lab-quote">{{ concept.lab.quote }}</blockquote>

            <!-- 投票 -->
            <div class="poll-block">
              <p class="poll-question">{{ concept.lab.poll.question }}</p>
              <div class="poll-options">
                <div
                  v-for="(opt, i) in concept.lab.poll.options"
                  :key="i"
                  class="poll-option"
                  :style="{ '--target-width': opt.percent + '%' }"
                >
                  <div class="poll-bar">
                    <div
                      class="poll-bar-fill"
                      :style="{
                        width: opt.percent + '%',
                        backgroundColor: i === 0 ? 'var(--psyche-accent)' : 'var(--psyche-text)',
                        animationDelay: (0.3 + i * 0.15) + 's',
                      }"
                    ></div>
                  </div>
                  <div class="poll-info">
                    <span class="poll-label">{{ opt.label }}</span>
                    <span class="poll-percent">{{ opt.percent }}%</span>
                  </div>
                </div>
              </div>
              <p class="poll-voters">来自 {{ concept.lab.poll.voters.toLocaleString() }} 位访客的选择</p>
            </div>
          </div>
        </section>

        <!-- 02 文学回响 -->
        <section class="concept-section fade-in" :class="{ visible: sectionsVisible[1] }">
          <div class="section-header">
            <span class="section-number">02</span>
            <h3 class="section-title">文学回响</h3>
            <span class="section-line"></span>
          </div>

          <div class="literary-block">
            <blockquote class="literary-quote">{{ concept.literary.quote }}</blockquote>
            <div class="literary-attr">
              <span class="literary-author">—— {{ concept.literary.author }}</span>
              <span class="literary-source">《{{ concept.literary.source }}》</span>
            </div>
          </div>
        </section>

        <!-- 03 自检镜 -->
        <section class="concept-section fade-in" :class="{ visible: sectionsVisible[2] }">
          <div class="section-header">
            <span class="section-number">03</span>
            <h3 class="section-title">自检镜</h3>
            <span class="section-line"></span>
          </div>

          <div class="mirror-block">
            <p class="mirror-prompt">{{ concept.mirror.prompt }}</p>
            <p class="mirror-question">{{ concept.mirror.question }}</p>

            <div class="mirror-options">
              <button
                v-for="(opt, i) in concept.mirror.options"
                :key="i"
                class="mirror-option"
                :class="{ chosen: mirrorChosen === i }"
                @click="chooseMirror(i)"
              >
                {{ opt.label }}
              </button>
            </div>

            <!-- 展开的洞察 -->
            <div class="mirror-insight" :class="{ 'insight-visible': mirrorChosen !== null }">
              <p v-if="mirrorChosen !== null">{{ concept.mirror.options[mirrorChosen].insight }}</p>
            </div>
          </div>
        </section>

        <!-- 04 关联概念 -->
        <section class="concept-section fade-in" :class="{ visible: sectionsVisible[3] }">
          <div class="section-header">
            <span class="section-number">04</span>
            <h3 class="section-title">关联概念</h3>
            <span class="section-line"></span>
          </div>

          <div class="relations-block">
            <div
              v-for="(rel, i) in relatedConcepts"
              :key="rel.slug"
              class="relation-node"
              :style="{ '--node-delay': (i * 0.1) + 's' }"
              @click="navigateToConcept(rel.slug)"
            >
              <div class="node-dot"></div>
              <div class="node-line" v-if="i < relatedConcepts.length - 1"></div>
              <div class="node-info">
                <span class="node-code">{{ rel.code }}</span>
                <span class="node-name">{{ rel.name }}</span>
                <span class="node-name-en">{{ rel.nameEn }}</span>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>

    <!-- 水面 -->
    <div class="water-surface"></div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getConceptBySlug, getRelatedConcepts } from '../data/concepts'

const router = useRouter()
const route = useRoute()

const mounted = ref(false)
const sectionsVisible = ref([false, false, false, false])
const mirrorChosen = ref(null)

const concept = computed(() => {
  const slug = route.params.slug
  return getConceptBySlug(slug) || getConceptBySlug('cognitive-dissonance')
})

const relatedConcepts = computed(() => {
  return getRelatedConcepts(concept.value.slug)
})

function chooseMirror(index) {
  mirrorChosen.value = mirrorChosen.value === index ? null : index
}

function goBack() {
  router.push('/')
}

function navigateToConcept(slug) {
  router.push(`/concept/${slug}`)
}

onMounted(() => {
  mounted.value = true

  // IntersectionObserver 逐节显示
  setTimeout(() => {
    const sections = document.querySelectorAll('.concept-section.fade-in')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = Array.from(sections).indexOf(entry.target)
          if (index >= 0) {
            sectionsVisible.value[index] = true
          }
        }
      })
    }, { threshold: 0.15 })

    sections.forEach(s => observer.observe(s))
  }, 100)
})
</script>

<style scoped>
@import '../styles/psyche.css';

.concept-page {
  min-height: 100vh;
  background-color: var(--psyche-bg);
  position: relative;
}

/* === 顶部导航 === */
.top-nav {
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 2rem;
  background: rgba(250, 249, 247, 0.9);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--psyche-line);
}

.back-btn {
  font-family: var(--font-sans);
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  background: none;
  border: none;
  color: var(--psyche-text);
  cursor: pointer;
  padding: 0.5rem 0;
  transition: color 0.2s ease;
}

.back-btn:hover { color: var(--psyche-accent); }

.back-btn .arrow {
  margin-right: 0.5rem;
  transition: transform 0.2s ease;
}

.back-btn:hover .arrow { transform: translateX(-3px); }

.code-label {
  font-family: var(--font-sans);
  font-size: 0.625rem;
  font-weight: 500;
  letter-spacing: 0.25em;
  color: var(--psyche-muted);
}

/* === 主内容 === */
.concept-content {
  max-width: 640px;
  margin: 0 auto;
  padding: 4rem 2rem 8rem;
}

/* === 概念标题 === */
.concept-header {
  text-align: center;
  margin-bottom: 4rem;
  padding-bottom: 3rem;
  border-bottom: 1px solid var(--psyche-line);
}

.header-meta {
  font-family: var(--font-sans);
  font-size: 0.6875rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  color: var(--psyche-muted);
  margin-bottom: 1.5rem;
}

.header-title {
  font-family: var(--font-sans);
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 900;
  letter-spacing: 0.04em;
  color: var(--psyche-accent);
  margin-bottom: 0.25rem;
  line-height: 1.1;
}

.header-subtitle {
  font-family: var(--font-serif);
  font-size: clamp(1.125rem, 2.5vw, 1.5rem);
  font-weight: 400;
  color: var(--psyche-text);
  margin-bottom: 1.5rem;
}

.header-one-line {
  font-family: var(--font-serif);
  font-size: 1rem;
  font-style: italic;
  line-height: 1.7;
  color: var(--psyche-muted);
  max-width: 440px;
  margin: 0 auto;
}

/* === 区块 === */
.concept-section {
  padding: 3rem 0;
  border-bottom: 1px solid var(--psyche-line);
}

.section-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.section-number {
  font-family: var(--font-sans);
  font-size: 0.6875rem;
  font-weight: 700;
  color: var(--psyche-accent);
  letter-spacing: 0.1em;
}

.section-title {
  font-family: var(--font-sans);
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--psyche-text);
}

.section-line {
  flex: 1;
  height: 1px;
  background: var(--psyche-line);
}

/* === 实验室 === */
.lab-source {
  font-family: var(--font-sans);
  font-size: 0.6875rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  color: var(--psyche-muted);
  margin-bottom: 1rem;
}

.lab-quote {
  font-family: var(--font-serif);
  font-size: 0.9375rem;
  font-style: italic;
  line-height: 1.8;
  color: var(--psyche-text);
  padding-left: 1.25rem;
  border-left: 2px solid var(--psyche-accent);
  margin-bottom: 2rem;
}

/* 投票条 */
.poll-block {
  background: var(--psyche-surface);
  padding: 2rem;
}

.poll-question {
  font-family: var(--font-serif);
  font-size: 0.9375rem;
  line-height: 1.7;
  color: var(--psyche-text);
  margin-bottom: 1.5rem;
}

.poll-options {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.poll-option {}

.poll-bar {
  height: 6px;
  background: rgba(26, 26, 26, 0.06);
  margin-bottom: 0.375rem;
  overflow: hidden;
}

.poll-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.poll-label {
  font-family: var(--font-sans);
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--psyche-text);
}

.poll-percent {
  font-family: var(--font-sans);
  font-size: 0.6875rem;
  font-weight: 600;
  color: var(--psyche-accent);
}

.poll-voters {
  font-family: var(--font-sans);
  font-size: 0.625rem;
  font-weight: 400;
  letter-spacing: 0.1em;
  color: var(--psyche-muted);
  margin-top: 1.25rem;
}

/* === 文学回响 === */
.literary-quote {
  font-family: var(--font-serif);
  font-size: clamp(1.125rem, 2.5vw, 1.375rem);
  font-style: italic;
  line-height: 1.8;
  color: var(--psyche-text);
  margin-bottom: 1.5rem;
}

.literary-attr {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding-left: 1.25rem;
  border-left: 1px solid var(--psyche-line);
}

.literary-author {
  font-family: var(--font-sans);
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--psyche-text);
}

.literary-source {
  font-family: var(--font-serif);
  font-size: 0.875rem;
  font-style: italic;
  color: var(--psyche-muted);
}

/* === 自检镜 === */
.mirror-prompt {
  font-family: var(--font-serif);
  font-size: 1rem;
  line-height: 1.7;
  color: var(--psyche-text);
  margin-bottom: 0.75rem;
}

.mirror-question {
  font-family: var(--font-serif);
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.7;
  color: var(--psyche-accent);
  margin-bottom: 1.5rem;
}

.mirror-options {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.mirror-option {
  font-family: var(--font-sans);
  font-size: 0.8125rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  padding: 0.75rem 1.5rem;
  background: none;
  border: 1px solid var(--psyche-line);
  color: var(--psyche-text);
  cursor: pointer;
  transition: all 0.2s ease;
}

.mirror-option:hover {
  border-color: var(--psyche-accent);
  color: var(--psyche-accent);
}

.mirror-option.chosen {
  background: var(--psyche-text);
  border-color: var(--psyche-text);
  color: var(--psyche-bg);
}

.mirror-insight {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.8s var(--ease-out-expo), opacity 0.6s ease, margin-top 0.6s ease;
  opacity: 0;
  margin-top: 0;
}

.mirror-insight.insight-visible {
  max-height: 200px;
  opacity: 1;
  margin-top: 1.5rem;
}

.mirror-insight p {
  font-family: var(--font-serif);
  font-size: 0.9375rem;
  font-style: italic;
  line-height: 1.8;
  color: var(--psyche-reveal);
  padding-left: 1.25rem;
  border-left: 2px solid var(--psyche-reveal);
}

/* === 关联概念 === */
.relations-block {
  display: flex;
  flex-direction: column;
}

.relation-node {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.875rem 0;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  animation: fadeInNode 0.5s var(--ease-out-expo) var(--node-delay) both;
}

@keyframes fadeInNode {
  from {
    opacity: 0;
    transform: translateX(-8px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.relation-node:hover .node-dot {
  background: var(--psyche-accent);
  box-shadow: 0 0 8px rgba(74, 88, 153, 0.3);
}

.relation-node:hover .node-name {
  color: var(--psyche-accent);
}

.node-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 2px solid var(--psyche-text);
  background: transparent;
  flex-shrink: 0;
  transition: all 0.3s ease;
}

.node-line {
  position: absolute;
  left: 4px;
  top: calc(0.875rem + 10px);
  width: 2px;
  height: calc(100% - 10px);
  background: var(--psyche-line);
  animation: line-pulse 3s ease-in-out infinite;
}

.node-info {
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
}

.node-code {
  font-family: var(--font-sans);
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: var(--psyche-muted);
}

.node-name {
  font-family: var(--font-serif);
  font-size: 0.9375rem;
  color: var(--psyche-text);
  transition: color 0.2s ease;
}

.node-name-en {
  font-family: var(--font-sans);
  font-size: 0.625rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  color: var(--psyche-muted);
}

/* === 响应式 === */
@media (max-width: 768px) {
  .top-nav {
    padding: 1rem 1.5rem;
  }

  .concept-content {
    padding: 2.5rem 1.5rem 6rem;
  }

  .mirror-options {
    flex-direction: column;
  }

  .node-name-en {
    display: none;
  }
}
</style>

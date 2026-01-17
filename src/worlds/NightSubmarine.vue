<template>
  <div class="night-submarine">
    <!-- 跃迁动画 -->
    <transition name="warp">
      <div v-if="showWarp" class="warp-overlay">
        <div class="warp-circle">
          <div class="warp-circle-inner"></div>
        </div>
        <div class="warp-text">夜晚的潜水艇</div>
      </div>
    </transition>

    <!-- 返回按钮 -->
    <button class="exit-btn" @click="exitWorld">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M19 12H5M12 19l-7-7 7-7"/>
      </svg>
      <span>Return</span>
    </button>

    <!-- 主内容区 -->
    <div class="main-container">
      <!-- 目录页 -->
      <div v-if="currentView === 'contents'" class="contents-page">
        <!-- 标题 -->
        <header class="contents-header">
          <div class="header-decoration">
            <div class="deco-line"></div>
            <div class="deco-dot"></div>
          </div>
          <h1 class="contents-title">目录</h1>
          <p class="contents-subtitle">Contents</p>
        </header>

        <!-- 故事列表 -->
        <div class="stories-list">
          <div
            v-for="(story, index) in stories"
            :key="story.id"
            class="story-item"
            :class="{ active: selectedStory === index }"
            @click="selectStory(index)"
          >
            <!-- 序号 -->
            <div class="story-number">{{ String(index + 1).padStart(2, '0') }}</div>

            <!-- 故事信息 -->
            <div class="story-info">
              <h2 class="story-title">{{ story.title }}</h2>
              <p class="story-subtitle">{{ story.subtitle }}</p>
            </div>

            <!-- 几何图形装饰 -->
            <div class="story-geometry">
              <!-- 夜晚的潜水艇：圆形（舷窗） -->
              <div v-if="story.id === 1" class="geometry-circle" :style="{ borderColor: story.color }">
                <div class="geometry-inner" :style="{ backgroundColor: story.color }"></div>
              </div>

              <!-- 竹峰寺：竖线（竹子） -->
              <div v-if="story.id === 2" class="geometry-lines" :style="{ color: story.color }">
                <div class="bamboo-line"></div>
                <div class="bamboo-line"></div>
                <div class="bamboo-line"></div>
              </div>

              <!-- 传彩笔：斜线（笔触） -->
              <div v-if="story.id === 3" class="geometry-slash" :style="{ borderColor: story.color }">
                <div class="slash-inner" :style="{ backgroundColor: story.color }"></div>
              </div>

              <!-- 裁云记：波浪线（云朵） -->
              <div v-if="story.id === 4" class="geometry-wave" :style="{ borderColor: story.color }">
                <svg viewBox="0 0 60 20" class="wave-svg">
                  <path d="M0,10 Q15,0 30,10 T60,10" :stroke="story.color" fill="none" stroke-width="1.5"/>
                </svg>
              </div>

              <!-- 音乐家：交叉线（音符） -->
              <div v-if="story.id === 5" class="geometry-cross" :style="{ borderColor: story.color }">
                <div class="cross-h" :style="{ backgroundColor: story.color }"></div>
                <div class="cross-v" :style="{ backgroundColor: story.color }"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- 底部提示 -->
        <div class="footer-hint">
          <p>点击选择篇章</p>
        </div>
      </div>

      <!-- 故事沉浸页 -->
      <transition name="story-fade">
        <div v-if="currentView === 'story' && selectedStory === 0" class="story-page">
          <!-- 第一篇：夜晚的潜水艇 -->
          <div class="deep-sea-container" @click="nextStage">
            <!-- 阶段1：起点 -->
            <transition name="stage-fade">
              <div v-if="stage === 1" class="stage-1">
                <div class="dot-center"></div>
                <div class="ray-line"></div>
                <p class="stage-text">我能看见一扇蓝色的门</p>
              </div>
            </transition>

            <!-- 阶段2：成形 -->
            <transition name="stage-fade">
              <div v-if="stage === 2" class="stage-2">
                <svg class="geometric-circle" viewBox="0 0 200 200">
                  <circle cx="100" cy="100" r="80" stroke="#0891b2" stroke-width="1.5" fill="none"/>
                  <circle cx="100" cy="100" r="60" stroke="#0891b2" stroke-width="1.5" fill="none" opacity="0.6"/>
                  <circle cx="100" cy="100" r="40" stroke="#0891b2" stroke-width="1.5" fill="none" opacity="0.4"/>
                  <circle cx="100" cy="100" r="20" stroke="#0891b2" stroke-width="1.5" fill="none" opacity="0.3"/>
                  <line x1="100" y1="20" x2="100" y2="180" stroke="#0891b2" stroke-width="1" opacity="0.4"/>
                  <line x1="20" y1="100" x2="180" y2="100" stroke="#0891b2" stroke-width="1" opacity="0.4"/>
                </svg>
                <p class="stage-text">每一根线条都清晰</p>
              </div>
            </transition>

            <!-- 阶段3：掌控 -->
            <transition name="stage-fade">
              <div v-if="stage === 3" class="stage-3">
                <svg class="grid-system" viewBox="0 0 200 200">
                  <defs>
                    <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#0891b2" stroke-width="0.5" opacity="0.3"/>
                    </pattern>
                  </defs>
                  <rect width="200" height="200" fill="url(#smallGrid)"/>
                  <circle cx="60" cy="80" r="3" fill="#0891b2" opacity="0.6"/>
                  <circle cx="140" cy="120" r="2" fill="#0891b2" opacity="0.5"/>
                  <circle cx="100" cy="60" r="2.5" fill="#0891b2" opacity="0.7"/>
                  <circle cx="80" cy="140" r="2" fill="#0891b2" opacity="0.4"/>
                  <path d="M0,100 Q50,90 100,100 T200,100" stroke="#0891b2" stroke-width="1" fill="none" opacity="0.4"/>
                  <path d="M0,120 Q50,110 100,120 T200,120" stroke="#0891b2" stroke-width="1" fill="none" opacity="0.3"/>
                </svg>
                <p class="stage-text">我建造了无限</p>
              </div>
            </transition>

            <!-- 阶段4：入侵 -->
            <transition name="stage-fade">
              <div v-if="stage === 4" class="stage-4">
                <svg class="invasion-lines" viewBox="0 0 200 200">
                  <circle cx="100" cy="100" r="70" stroke="#0891b2" stroke-width="1" fill="none" opacity="0.3"/>
                  <line x1="0" y1="0" x2="200" y2="200" stroke="#1a1a1a" stroke-width="2" opacity="0.8"/>
                  <line x1="200" y1="0" x2="0" y2="200" stroke="#1a1a1a" stroke-width="2" opacity="0.8"/>
                  <line x1="100" y1="0" x2="100" y2="200" stroke="#1a1a1a" stroke-width="1.5" opacity="0.6"/>
                  <line x1="0" y1="100" x2="200" y2="100" stroke="#1a1a1a" stroke-width="1.5" opacity="0.6"/>
                  <rect x="60" y="60" width="80" height="80" stroke="#1a1a1a" stroke-width="1" fill="none" opacity="0.4"/>
                </svg>
                <p class="stage-text">他们说这是多余的</p>
              </div>
            </transition>

            <!-- 阶段5：消散 -->
            <transition name="stage-fade">
              <div v-if="stage === 5" class="stage-5">
                <svg class="fading-shape" viewBox="0 0 200 200">
                  <circle cx="100" cy="100" r="70" stroke="#0891b2" stroke-width="1" fill="none" stroke-dasharray="8,8" opacity="0.4"/>
                  <circle cx="100" cy="100" r="50" stroke="#0891b2" stroke-width="1" fill="none" stroke-dasharray="12,12" opacity="0.3"/>
                  <circle cx="100" cy="100" r="30" stroke="#0891b2" stroke-width="1" fill="none" stroke-dasharray="6,6" opacity="0.2"/>
                </svg>
                <p class="stage-text">线条开始模糊...我努力抓住</p>
              </div>
            </transition>

            <!-- 阶段6：空白 -->
            <transition name="stage-fade">
              <div v-if="stage === 6" class="stage-6">
                <svg class="empty-space" viewBox="0 0 200 200">
                  <path d="M100,30 A70,70 0 0,1 100,100" stroke="#0891b2" stroke-width="1" fill="none" opacity="0.08"/>
                </svg>
                <p class="stage-text">那里曾经有一扇门。门消失了。</p>
              </div>
            </transition>

            <!-- 进度指示 -->
            <div class="stage-progress">
              <div
                v-for="i in 6"
                :key="i"
                class="progress-dot"
                :class="{ active: stage >= i }"
              ></div>
            </div>

            <!-- 点击提示 -->
            <p v-if="stage < 6" class="click-hint">点击继续</p>

            <!-- 返回按钮 -->
            <button v-if="stage === 6" class="back-to-contents" @click.stop="backToContents">
              返回目录
            </button>
          </div>
        </div>

        <!-- 第二篇：竹峰寺 -->
        <transition v-else-if="currentView === 'story' && selectedStory === 1" name="story-fade">
          <div class="story-page">
            <div class="bamboo-container" @click="nextStage">
              <!-- 阶段1：寻找 -->
              <transition name="stage-fade">
                <div v-if="stage === 1" class="bamboo-stage-1">
                  <svg class="bamboo-forest" viewBox="0 0 200 200">
                    <line x1="30" y1="200" x2="30" y2="80" stroke="#059669" stroke-width="2"/>
                    <line x1="60" y1="200" x2="60" y2="50" stroke="#059669" stroke-width="2"/>
                    <line x1="100" y1="200" x2="100" y2="60" stroke="#059669" stroke-width="2"/>
                    <line x1="140" y1="200" x2="140" y2="90" stroke="#059669" stroke-width="2"/>
                    <line x1="170" y1="200" x2="170" y2="70" stroke="#059669" stroke-width="2"/>
                  </svg>
                  <p class="stage-text">我在找一个地方</p>
                </div>
              </transition>

              <!-- 阶段2：发现 -->
              <transition name="stage-fade">
                <div v-if="stage === 2" class="bamboo-stage-2">
                  <svg class="cave-opening" viewBox="0 0 200 200">
                    <path d="M50,50 L150,50 L150,150 L50,150 Z" stroke="#059669" stroke-width="2" fill="none" opacity="0.8"/>
                    <path d="M150,50 L150,100" stroke="#059669" stroke-width="2" opacity="0.3"/>
                  </svg>
                  <p class="stage-text">这里有一个洞</p>
                </div>
              </transition>

              <!-- 阶段3：藏匿 -->
              <transition name="stage-fade">
                <div v-if="stage === 3" class="bamboo-stage-3">
                  <svg class="cave-sealed" viewBox="0 0 200 200">
                    <rect x="50" y="50" width="100" height="100" stroke="#059669" stroke-width="2" fill="none"/>
                    <circle cx="100" cy="100" r="8" fill="#059669" opacity="0.7"/>
                  </svg>
                  <p class="stage-text">我把它放进去</p>
                </div>
              </transition>

              <!-- 阶段4：遗忘 -->
              <transition name="stage-fade">
                <div v-if="stage === 4" class="bamboo-stage-4">
                  <svg class="moss-growing" viewBox="0 0 200 200">
                    <rect x="50" y="50" width="100" height="100" stroke="#059669" stroke-width="1.5" fill="none" opacity="0.7"/>
                    <circle cx="100" cy="100" r="8" fill="#059669" opacity="0.6"/>
                    <circle cx="55" cy="55" r="3" fill="#059669" opacity="0.4"/>
                    <circle cx="145" cy="60" r="2.5" fill="#059669" opacity="0.35"/>
                    <circle cx="60" cy="145" r="2" fill="#059669" opacity="0.3"/>
                    <circle cx="140" cy="140" r="3.5" fill="#059669" opacity="0.38"/>
                    <circle cx="100" cy="55" r="2" fill="#059669" opacity="0.32"/>
                    <circle cx="55" cy="100" r="2.5" fill="#059669" opacity="0.36"/>
                  </svg>
                  <p class="stage-text">时间在生长...它还在那里</p>
                </div>
              </transition>

              <!-- 阶段5：封存 -->
              <transition name="stage-fade">
                <div v-if="stage === 5" class="bamboo-stage-5">
                  <svg class="completely-covered" viewBox="0 0 200 200">
                    <rect x="50" y="50" width="100" height="100" fill="#059669" opacity="0.15"/>
                    <rect x="50" y="50" width="100" height="100" stroke="#059669" stroke-width="1" fill="none" opacity="0.2"/>
                  </svg>
                  <p class="stage-text">洞口消失了。一切都被封存</p>
                </div>
              </transition>

              <!-- 阶段6：回望 -->
              <transition name="stage-fade">
                <div v-if="stage === 6" class="bamboo-stage-6">
                  <svg class="faint-memory" viewBox="0 0 200 200">
                    <rect x="50" y="50" width="100" height="100" stroke="#059669" stroke-width="1" fill="none" opacity="0.1"/>
                    <circle cx="100" cy="100" r="4" fill="#059669" opacity="0.08"/>
                  </svg>
                  <p class="stage-text">有些东西，藏起来才永恒</p>
                </div>
              </transition>

              <!-- 进度指示 -->
              <div class="stage-progress">
                <div
                  v-for="i in 6"
                  :key="i"
                  class="progress-dot"
                  :class="{ active: stage >= i }"
                ></div>
              </div>

              <!-- 点击提示 -->
              <p v-if="stage < 6" class="click-hint">点击继续</p>

              <!-- 返回按钮 -->
              <button v-if="stage === 6" class="back-to-contents" @click.stop="backToContents">
                返回目录
              </button>
            </div>
          </div>
        </transition>

        <!-- 第三篇：传彩笔 -->
        <transition v-else-if="currentView === 'story' && selectedStory === 2" name="story-fade">
          <div class="story-page">
            <div class="pen-container" @click="nextStage">
              <!-- 阶段1：发现 -->
              <transition name="stage-fade">
                <div v-if="stage === 1" class="pen-stage-1">
                  <svg class="magic-pen" viewBox="0 0 200 200">
                    <line x1="70" y1="130" x2="130" y2="70" stroke="#1a1a1a" stroke-width="1.5" stroke-linecap="round"/>
                  </svg>
                  <p class="stage-text">我发现了什么</p>
                </div>
              </transition>

              <!-- 阶段2：触碰 -->
              <transition name="stage-fade">
                <div v-if="stage === 2" class="pen-stage-2">
                  <svg class="pen-touch" viewBox="0 0 200 200">
                    <line x1="70" y1="130" x2="130" y2="70" stroke="#1a1a1a" stroke-width="1.5" stroke-linecap="round"/>
                    <circle cx="130" cy="70" r="4" fill="#a78bfa" opacity="0.4"/>
                  </svg>
                  <p class="stage-text">它触碰了文字</p>
                </div>
              </transition>

              <!-- 阶段3：书写 -->
              <transition name="stage-fade">
                <div v-if="stage === 3" class="pen-stage-3">
                  <svg class="ink-flow" viewBox="0 0 200 200">
                    <line x1="60" y1="140" x2="100" y2="100" stroke="#a78bfa" stroke-width="1" opacity="0.35"/>
                    <line x1="80" y1="120" x2="120" y2="80" stroke="#a78bfa" stroke-width="1" opacity="0.28"/>
                    <line x1="100" y1="100" x2="140" y2="60" stroke="#a78bfa" stroke-width="1" opacity="0.22"/>
                  </svg>
                  <p class="stage-text">文字有了颜色</p>
                </div>
              </transition>

              <!-- 阶段4：极致 -->
              <transition name="stage-fade">
                <div v-if="stage === 4" class="pen-stage-4">
                  <svg class="color-peak" viewBox="0 0 200 200">
                    <circle cx="100" cy="100" r="50" stroke="#a78bfa" stroke-width="1" fill="none" opacity="0.5"/>
                    <circle cx="100" cy="100" r="35" stroke="#a78bfa" stroke-width="1" fill="none" opacity="0.38"/>
                    <circle cx="100" cy="100" r="20" fill="#a78bfa" opacity="0.25"/>
                  </svg>
                  <p class="stage-text">这是极致</p>
                </div>
              </transition>

              <!-- 阶段5：褪色 -->
              <transition name="stage-fade">
                <div v-if="stage === 5" class="pen-stage-5">
                  <svg class="color-fade" viewBox="0 0 200 200">
                    <circle cx="100" cy="100" r="50" stroke="#1a1a1a" stroke-width="1" fill="none" stroke-dasharray="4,4" opacity="0.35"/>
                    <circle cx="100" cy="100" r="35" stroke="#1a1a1a" stroke-width="1" fill="none" stroke-dasharray="6,6" opacity="0.28"/>
                    <circle cx="100" cy="100" r="8" fill="#1a1a1a" opacity="0.2"/>
                  </svg>
                  <p class="stage-text">颜色在褪去...一切都在褪去</p>
                </div>
              </transition>

              <!-- 阶段6：平凡 -->
              <transition name="stage-fade">
                <div v-if="stage === 6" class="pen-stage-6">
                  <svg class="ordinary-pen" viewBox="0 0 200 200">
                    <line x1="80" y1="120" x2="120" y2="80" stroke="#1a1a1a" stroke-width="1" stroke-linecap="round" opacity="0.4"/>
                  </svg>
                  <p class="stage-text">只是一支笔</p>
                </div>
              </transition>

              <!-- 进度指示 -->
              <div class="stage-progress">
                <div
                  v-for="i in 6"
                  :key="i"
                  class="progress-dot"
                  :class="{ active: stage >= i }"
                ></div>
              </div>

              <!-- 点击提示 -->
              <p v-if="stage < 6" class="click-hint">点击继续</p>

              <!-- 返回按钮 -->
              <button v-if="stage === 6" class="back-to-contents" @click.stop="backToContents">
                返回目录
              </button>
            </div>
          </div>
        </transition>

        <!-- 第四篇：裁云记 -->
        <transition v-else-if="currentView === 'story' && selectedStory === 3" name="story-fade">
          <div class="story-page">
            <div class="cloud-container" @click="nextStage">
              <!-- 阶段1：自由 -->
              <transition name="stage-fade">
                <div v-if="stage === 1" class="cloud-stage-1">
                  <svg class="free-clouds" viewBox="0 0 200 200">
                    <path d="M20,60 Q50,40 80,60 T140,60" stroke="#9ca3af" stroke-width="1.5" fill="none" opacity="0.6"/>
                    <path d="M30,100 Q60,80 90,100 T150,100" stroke="#9ca3af" stroke-width="1.5" fill="none" opacity="0.5"/>
                    <path d="M40,140 Q70,120 100,140 T160,140" stroke="#9ca3af" stroke-width="1.5" fill="none" opacity="0.4"/>
                    <path d="M10,180 Q40,160 70,180 T130,180" stroke="#9ca3af" stroke-width="1.5" fill="none" opacity="0.35"/>
                  </svg>
                  <p class="stage-text">云是自由的</p>
                </div>
              </transition>

              <!-- 阶段2：发现 -->
              <transition name="stage-fade">
                <div v-if="stage === 2" class="cloud-stage-2">
                  <svg class="cutting-line" viewBox="0 0 200 200">
                    <path d="M20,60 Q50,40 80,60 T140,60" stroke="#9ca3af" stroke-width="1.5" fill="none" opacity="0.5"/>
                    <path d="M30,100 Q60,80 90,100 T150,100" stroke="#9ca3af" stroke-width="1.5" fill="none" opacity="0.4"/>
                    <path d="M40,140 Q70,120 100,140 T160,140" stroke="#9ca3af" stroke-width="1.5" fill="none" opacity="0.35"/>
                    <line x1="0" y1="100" x2="200" y2="100" stroke="#1a1a1a" stroke-width="1" opacity="0.6"/>
                  </svg>
                  <p class="stage-text">这里有规则</p>
                </div>
              </transition>

              <!-- 阶段3：修剪 -->
              <transition name="stage-fade">
                <div v-if="stage === 3" class="cloud-stage-3">
                  <svg class="trimmed-clouds" viewBox="0 0 200 200">
                    <path d="M20,60 L50,60 L80,60" stroke="#9ca3af" stroke-width="1.5" opacity="0.5"/>
                    <path d="M30,100 L60,100 L90,100" stroke="#9ca3af" stroke-width="1.5" opacity="0.4"/>
                    <path d="M40,140 L70,140 L100,140" stroke="#9ca3af" stroke-width="1.5" opacity="0.35"/>
                    <line x1="0" y1="100" x2="200" y2="100" stroke="#1a1a1a" stroke-width="1" opacity="0.5"/>
                    <line x1="0" y1="60" x2="200" y2="60" stroke="#1a1a1a" stroke-width="1" opacity="0.4"/>
                    <line x1="0" y1="140" x2="200" y2="140" stroke="#1a1a1a" stroke-width="1" opacity="0.3"/>
                  </svg>
                  <p class="stage-text">我在修剪</p>
                </div>
              </transition>

              <!-- 阶段4：规训 -->
              <transition name="stage-fade">
                <div v-if="stage === 4" class="cloud-stage-4">
                  <svg class="squared-clouds" viewBox="0 0 200 200">
                    <rect x="20" y="50" width="60" height="20" stroke="#9ca3af" stroke-width="1" fill="none" opacity="0.5"/>
                    <rect x="30" y="90" width="60" height="20" stroke="#9ca3af" stroke-width="1" fill="none" opacity="0.4"/>
                    <rect x="40" y="130" width="60" height="20" stroke="#9ca3af" stroke-width="1" fill="none" opacity="0.35"/>
                  </svg>
                  <p class="stage-text">云变成了方形</p>
                </div>
              </transition>

              <!-- 阶段5：秩序 -->
              <transition name="stage-fade">
                <div v-if="stage === 5" class="cloud-stage-5">
                  <svg class="ordered-grid" viewBox="0 0 200 200">
                    <rect x="30" y="40" width="40" height="15" stroke="#9ca3af" stroke-width="1" fill="none" opacity="0.45"/>
                    <rect x="80" y="40" width="40" height="15" stroke="#9ca3af" stroke-width="1" fill="none" opacity="0.4"/>
                    <rect x="130" y="40" width="40" height="15" stroke="#9ca3af" stroke-width="1" fill="none" opacity="0.35"/>
                    <rect x="30" y="70" width="40" height="15" stroke="#9ca3af" stroke-width="1" fill="none" opacity="0.4"/>
                    <rect x="80" y="70" width="40" height="15" stroke="#9ca3af" stroke-width="1" fill="none" opacity="0.35"/>
                    <rect x="130" y="70" width="40" height="15" stroke="#9ca3af" stroke-width="1" fill="none" opacity="0.3"/>
                  </svg>
                  <p class="stage-text">一切都整齐了</p>
                </div>
              </transition>

              <!-- 阶段6：完成 -->
              <transition name="stage-fade">
                <div v-if="stage === 6" class="cloud-stage-6">
                  <svg class="final-lines" viewBox="0 0 200 200">
                    <line x1="20" y1="50" x2="180" y2="50" stroke="#1a1a1a" stroke-width="1" opacity="0.5"/>
                    <line x1="20" y1="80" x2="180" y2="80" stroke="#1a1a1a" stroke-width="1" opacity="0.4"/>
                    <line x1="20" y1="110" x2="180" y2="110" stroke="#1a1a1a" stroke-width="1" opacity="0.35"/>
                    <line x1="20" y1="140" x2="180" y2="140" stroke="#1a1a1a" stroke-width="1" opacity="0.3"/>
                  </svg>
                  <p class="stage-text">云变成了直线</p>
                </div>
              </transition>

              <!-- 进度指示 -->
              <div class="stage-progress">
                <div
                  v-for="i in 6"
                  :key="i"
                  class="progress-dot"
                  :class="{ active: stage >= i }"
                ></div>
              </div>

              <!-- 点击提示 -->
              <p v-if="stage < 6" class="click-hint">点击继续</p>

              <!-- 返回按钮 -->
              <button v-if="stage === 6" class="back-to-contents" @click.stop="backToContents">
                返回目录
              </button>
            </div>
          </div>
        </transition>

        <!-- 第五篇：音乐家 -->
        <transition v-else-if="currentView === 'story' && selectedStory === 4" name="story-fade">
          <div class="story-page">
            <div class="music-container" @click="nextStage">
              <!-- 阶段1：单音 -->
              <transition name="stage-fade">
                <div v-if="stage === 1" class="music-stage-1">
                  <svg class="single-note" viewBox="0 0 200 200">
                    <circle cx="100" cy="100" r="6" fill="#d97706" opacity="0.7"/>
                  </svg>
                  <p class="stage-text">一个声音</p>
                </div>
              </transition>

              <!-- 阶段2：旋律 -->
              <transition name="stage-fade">
                <div v-if="stage === 2" class="music-stage-2">
                  <svg class="melody-line" viewBox="0 0 200 200">
                    <path d="M50,150 Q75,100 100,125 T150,50" stroke="#d97706" stroke-width="1.5" fill="none" opacity="0.5"/>
                    <circle cx="150" cy="50" r="4" fill="#d97706" opacity="0.6"/>
                  </svg>
                  <p class="stage-text">它开始流动</p>
                </div>
              </transition>

              <!-- 阶段3：和声 -->
              <transition name="stage-fade">
                <div v-if="stage === 3" class="music-stage-3">
                  <svg class="harmony-weave" viewBox="0 0 200 200">
                    <path d="M40,140 Q70,90 100,110 T160,40" stroke="#d97706" stroke-width="1.5" fill="none" opacity="0.45"/>
                    <path d="M60,160 Q90,110 120,130 T180,60" stroke="#d97706" stroke-width="1.5" fill="none" opacity="0.38"/>
                    <path d="M30,120 Q60,70 90,90 T150,20" stroke="#d97706" stroke-width="1.5" fill="none" opacity="0.32"/>
                  </svg>
                  <p class="stage-text">它们交织</p>
                </div>
              </transition>

              <!-- 阶段4：乐章 -->
              <transition name="stage-fade">
                <div v-if="stage === 4" class="music-stage-4">
                  <svg class="symphony" viewBox="0 0 200 200">
                    <circle cx="100" cy="100" r="60" stroke="#d97706" stroke-width="1.5" fill="none" opacity="0.5"/>
                    <circle cx="100" cy="100" r="40" stroke="#d97706" stroke-width="1.5" fill="none" opacity="0.42"/>
                    <circle cx="100" cy="100" r="20" stroke="#d97706" stroke-width="1.5" fill="none" opacity="0.35"/>
                    <line x1="100" y1="40" x2="100" y2="160" stroke="#d97706" stroke-width="1" opacity="0.4"/>
                    <line x1="40" y1="100" x2="160" y2="100" stroke="#d97706" stroke-width="1" opacity="0.4"/>
                    <line x1="58" y1="58" x2="142" y2="142" stroke="#d97706" stroke-width="1" opacity="0.35"/>
                    <line x1="142" y1="58" x2="58" y2="142" stroke="#d97706" stroke-width="1" opacity="0.35"/>
                    <circle cx="100" cy="100" r="8" fill="#d97706" opacity="0.6"/>
                  </svg>
                  <p class="stage-text">这是乐章</p>
                </div>
              </transition>

              <!-- 阶段5：凝固 -->
              <transition name="stage-fade">
                <div v-if="stage === 5" class="music-stage-5">
                  <svg class="frozen-music" viewBox="0 0 200 200">
                    <circle cx="100" cy="100" r="50" stroke="#1a1a1a" stroke-width="1" fill="none" opacity="0.4"/>
                    <circle cx="100" cy="100" r="35" stroke="#1a1a1a" stroke-width="1" fill="none" opacity="0.32"/>
                    <circle cx="100" cy="100" r="20" stroke="#1a1a1a" stroke-width="1" fill="none" opacity="0.25"/>
                    <line x1="100" y1="50" x2="100" y2="150" stroke="#1a1a1a" stroke-width="1" opacity="0.3"/>
                    <line x1="50" y1="100" x2="150" y2="100" stroke="#1a1a1a" stroke-width="1" opacity="0.3"/>
                    <circle cx="100" cy="100" r="5" fill="#1a1a1a" opacity="0.35"/>
                  </svg>
                  <p class="stage-text">时间停止</p>
                </div>
              </transition>

              <!-- 阶段6：回响 -->
              <transition name="stage-fade">
                <div v-if="stage === 6" class="music-stage-6">
                  <svg class="echo-remain" viewBox="0 0 200 200">
                    <circle cx="100" cy="100" r="40" stroke="#1a1a1a" stroke-width="1" fill="none" opacity="0.15"/>
                    <circle cx="100" cy="100" r="3" fill="#1a1a1a" opacity="0.12"/>
                  </svg>
                  <p class="stage-text">声音还在</p>
                </div>
              </transition>

              <!-- 进度指示 -->
              <div class="stage-progress">
                <div
                  v-for="i in 6"
                  :key="i"
                  class="progress-dot"
                  :class="{ active: stage >= i }"
                ></div>
              </div>

              <!-- 点击提示 -->
              <p v-if="stage < 6" class="click-hint">点击继续</p>

              <!-- 返回按钮 -->
              <button v-if="stage === 6" class="back-to-contents" @click.stop="backToContents">
                返回目录
              </button>
            </div>
          </div>
        </transition>

        <!-- 其他故事占位 -->
        <transition v-else-if="currentView === 'story'" name="story-fade">
          <div class="story-page">
            <div class="story-placeholder">
              <h2>{{ stories[selectedStory].title }}</h2>
              <p>故事内容即将呈现...</p>
              <button class="back-to-contents" @click="backToContents">
                返回目录
              </button>
            </div>
          </div>
        </transition>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const showWarp = ref(true)
const currentView = ref('contents')
const selectedStory = ref(null)
const stage = ref(1)

// 故事数据
const stories = ref([
  {
    id: 1,
    title: '夜晚的潜水艇',
    subtitle: 'The Night Submarine',
    color: '#0891b2',
    description: '想象力的深海之旅'
  },
  {
    id: 2,
    title: '竹峰寺',
    subtitle: 'Bamboo Peak Temple',
    color: '#059669',
    description: '记忆的藏经洞'
  },
  {
    id: 3,
    title: '传彩笔',
    subtitle: 'The Color-Transmitting Pen',
    color: '#7c3aed',
    description: '文字的色彩'
  },
  {
    id: 4,
    title: '裁云记',
    subtitle: 'Cloud Trimming',
    color: '#9ca3af',
    description: '整理云彩，整理思绪'
  },
  {
    id: 5,
    title: '音乐家',
    subtitle: 'The Musician',
    color: '#d97706',
    description: '凝固的音乐'
  }
])

// 选择故事
const selectStory = (index) => {
  selectedStory.value = index
  stage.value = 1 // 重置到第一阶段
  currentView.value = 'story'
}

// 下一阶段
const nextStage = () => {
  if (stage.value < 6) {
    stage.value++
  }
}

// 返回目录
const backToContents = () => {
  currentView.value = 'contents'
  stage.value = 1 // 重置阶段
}

// 退出
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
.night-submarine {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #f7f5f2;
  overflow: hidden;
  font-family: 'Source Serif 4', Georgia, serif;
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

/* === 主容器 === */
.main-container {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* === 目录页 === */
.contents-page {
  width: 100%;
  max-width: 700px;
  padding: 2rem;
  opacity: 0;
  animation: fade-in 1s ease-out 0.5s forwards;
}

@keyframes fade-in {
  to { opacity: 1; }
}

/* 目录头部 */
.contents-header {
  text-align: center;
  margin-bottom: 3rem;
}

.header-decoration {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.deco-line {
  width: 60px;
  height: 1px;
  background: rgba(26, 26, 26, 0.3);
}

.deco-dot {
  width: 5px;
  height: 5px;
  border: 1px solid rgba(26, 26, 26, 0.4);
}

.contents-title {
  font-family: 'Noto Serif SC', serif;
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  font-weight: 400;
  letter-spacing: 0.2em;
  color: #1a1a1a;
  margin-bottom: 0.75rem;
}

.contents-subtitle {
  font-family: 'Inter', sans-serif;
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.3em;
  color: rgba(26, 26, 26, 0.5);
  text-transform: uppercase;
  margin: 0;
}

/* 故事列表 */
.stories-list {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.story-item {
  position: relative;
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 1.5rem;
  align-items: center;
  padding: 1.25rem 1.5rem;
  background: transparent;
  border: 1px solid rgba(26, 26, 26, 0.06);
  cursor: pointer;
  transition: all 0.3s ease;
}

.story-item:hover {
  background: rgba(26, 26, 26, 0.015);
  border-color: rgba(26, 26, 26, 0.12);
  transform: translateX(4px);
}

.story-number {
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  color: rgba(26, 26, 26, 0.25);
  min-width: 50px;
}

.story-info {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.story-title {
  font-family: 'Noto Serif SC', serif;
  font-size: clamp(1rem, 2.5vw, 1.25rem);
  font-weight: 400;
  letter-spacing: 0.05em;
  color: #1a1a1a;
  margin: 0;
}

.story-subtitle {
  font-family: 'Inter', sans-serif;
  font-size: 0.6rem;
  font-weight: 400;
  letter-spacing: 0.1em;
  color: rgba(26, 26, 26, 0.45);
  text-transform: uppercase;
  margin: 0;
}

/* 几何图形装饰 */
.story-geometry {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 圆形（舷窗） */
.geometry-circle {
  width: 32px;
  height: 32px;
  border: 1.5px solid;
  border-radius: 50%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.geometry-inner {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  opacity: 0.5;
}

/* 竖线（竹子） */
.geometry-lines {
  display: flex;
  gap: 4px;
}

.bamboo-line {
  width: 1px;
  height: 28px;
  background: currentColor;
  opacity: 0.6;
}

/* 斜线（笔触） */
.geometry-slash {
  width: 32px;
  height: 32px;
  border: 1px solid;
  position: relative;
  transform: rotate(45deg);
}

.slash-inner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20px;
  height: 1px;
  opacity: 0.6;
}

/* 波浪线（云朵） */
.geometry-wave {
  width: 40px;
  height: 20px;
  display: flex;
  align-items: center;
  opacity: 0.7;
}

.wave-svg {
  width: 100%;
  height: 100%;
}

/* 交叉线（音符） */
.geometry-cross {
  width: 24px;
  height: 24px;
  position: relative;
}

.cross-h {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  opacity: 0.6;
}

.cross-v {
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 1px;
  opacity: 0.6;
}

.story-item:hover .geometry-circle,
.story-item:hover .geometry-slash,
.story-item:hover .geometry-cross {
  transform: scale(1.1);
}

.story-item:hover .geometry-circle:not(.geometry-slash) {
  transform: scale(1.1);
}

.story-item:hover .geometry-lines {
  gap: 6px;
}

.story-item:hover .bamboo-line {
  opacity: 0.8;
}

/* 底部提示 */
.footer-hint {
  margin-top: 3rem;
  text-align: center;
}

.footer-hint p {
  font-family: 'Inter', sans-serif;
  font-size: 0.6rem;
  letter-spacing: 0.15em;
  color: rgba(26, 26, 26, 0.25);
  text-transform: uppercase;
  margin: 0;
}

/* === 故事页 === */
.story-page {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* === 深海容器 === */
.deep-sea-container,
.bamboo-container {
  position: relative;
  width: 100%;
  max-width: 600px;
  height: 70vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

/* 阶段通用样式 */
.stage-text {
  font-family: 'Noto Serif SC', serif;
  font-size: clamp(1.2rem, 3vw, 1.8rem);
  font-weight: 400;
  letter-spacing: 0.15em;
  color: #1a1a1a;
  margin-top: 3rem;
  text-align: center;
}

/* 阶段1：起点 */
.stage-1 {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
}

.dot-center {
  width: 8px;
  height: 8px;
  background: #1a1a1a;
  border-radius: 50%;
  position: relative;
}

.ray-line {
  position: absolute;
  width: 120px;
  height: 1px;
  background: linear-gradient(to right, #1a1a1a, #0891b2);
  transform-origin: left center;
  left: 8px;
  top: 50%;
  animation: ray-pulse 2s ease-in-out infinite;
}

@keyframes ray-pulse {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}

/* 阶段2：成形 */
.stage-2 {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.geometric-circle {
  width: 280px;
  height: 280px;
  animation: circle-rotate 60s linear infinite;
}

@keyframes circle-rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* 阶段3：掌控 */
.stage-3 {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.grid-system {
  width: 320px;
  height: 320px;
}

/* 阶段4：入侵 */
.stage-4 {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.invasion-lines {
  width: 320px;
  height: 320px;
}

/* 阶段5：消散 */
.stage-5 {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.fading-shape {
  width: 280px;
  height: 280px;
}

/* 阶段6：空白 */
.stage-6 {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
}

.empty-space {
  width: 280px;
  height: 280px;
}

/* 进度指示 */
.stage-progress {
  position: absolute;
  bottom: 3rem;
  display: flex;
  gap: 0.75rem;
}

.progress-dot {
  width: 6px;
  height: 6px;
  border: 1px solid rgba(26, 26, 26, 0.3);
  border-radius: 50%;
  transition: all 0.3s ease;
}

.progress-dot.active {
  background: var(--story-color, #0891b2);
  border-color: var(--story-color, #0891b2);
}

/* === 深海故事特有样式 === */
.deep-sea-container {
  --story-color: #0891b2;
}

/* === 竹峰寺特有样式 === */
.bamboo-container {
  --story-color: #059669;
}

/* === 传彩笔特有样式 === */
.pen-container {
  --story-color: #a78bfa;
}

.pen-stage-1,
.pen-stage-2,
.pen-stage-3,
.pen-stage-4,
.pen-stage-5,
.pen-stage-6 {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.magic-pen,
.pen-touch,
.ink-flow,
.color-peak,
.color-fade,
.ordinary-pen {
  width: 280px;
  height: 280px;
}

/* === 裁云记特有样式 === */
.cloud-container {
  --story-color: #9ca3af;
}

.cloud-stage-1,
.cloud-stage-2,
.cloud-stage-3,
.cloud-stage-4,
.cloud-stage-5,
.cloud-stage-6 {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.free-clouds,
.cutting-line,
.trimmed-clouds,
.squared-clouds,
.ordered-grid,
.final-lines {
  width: 280px;
  height: 280px;
}

/* === 音乐家特有样式 === */
.music-container {
  --story-color: #d97706;
}

.music-stage-1,
.music-stage-2,
.music-stage-3,
.music-stage-4,
.music-stage-5,
.music-stage-6 {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.single-note,
.melody-line,
.harmony-weave,
.symphony,
.frozen-music,
.echo-remain {
  width: 280px;
  height: 280px;
}

.bamboo-stage-1,
.bamboo-stage-2,
.bamboo-stage-3,
.bamboo-stage-4,
.bamboo-stage-5,
.bamboo-stage-6 {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.bamboo-forest,
.cave-opening,
.cave-sealed,
.moss-growing,
.completely-covered,
.faint-memory {
  width: 280px;
  height: 280px;
}

/* 点击提示 */
.click-hint {
  position: absolute;
  bottom: 5rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.6rem;
  letter-spacing: 0.15em;
  color: rgba(26, 26, 26, 0.3);
  text-transform: uppercase;
  margin: 0;
}

/* === 故事页占位（其他故事） === */
.story-placeholder {
  padding: 4rem;
}

.story-placeholder h2 {
  font-family: 'Noto Serif SC', serif;
  font-size: 2rem;
  margin-bottom: 1rem;
}

.story-placeholder p {
  color: rgba(26, 26, 26, 0.5);
  margin-bottom: 2rem;
}

.back-to-contents {
  padding: 0.875rem 2rem;
  background: transparent;
  border: 1px solid #1a1a1a;
  color: #1a1a1a;
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.back-to-contents:hover {
  background: #1a1a1a;
  color: #f7f5f2;
}

/* === 过渡动画 === */
.story-fade-enter-active,
.story-fade-leave-active {
  transition: all 0.6s ease;
}

.story-fade-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.story-fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.warp-enter-active,
.warp-leave-active {
  transition: opacity 0.5s ease;
}

.warp-enter-from,
.warp-leave-to {
  opacity: 0;
}

/* === 响应式 === */
@media (max-width: 768px) {
  .contents-page {
    padding: 1.5rem;
    max-width: 100%;
  }

  .contents-header {
    margin-bottom: 2rem;
  }

  .header-decoration {
    margin-bottom: 1rem;
  }

  .deco-line {
    width: 40px;
  }

  .story-item {
    grid-template-columns: auto 1fr;
    grid-template-rows: auto auto;
    gap: 1rem;
    padding: 1rem;
  }

  .story-geometry {
    grid-column: 2;
    grid-row: 2;
    justify-self: end;
  }

  .exit-btn {
    top: 1rem;
    left: 1rem;
    padding: 0.75rem 1.25rem;
    font-size: 0.65rem;
  }
}

@media (max-width: 480px) {
  .contents-title {
    font-size: 1.5rem;
  }

  .contents-subtitle {
    font-size: 0.6rem;
  }

  .story-item {
    padding: 0.875rem 1rem;
  }

  .story-number {
    font-size: 0.65rem;
    min-width: 40px;
  }

  .story-title {
    font-size: 1rem;
  }

  .story-subtitle {
    font-size: 0.55rem;
  }
}
</style>

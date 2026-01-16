<template>
  <div class="night-submarine" :class="{ 'is-transitioning': isTransitioning }">
    <!-- 跃迁动画遮罩 VOL.003 -->
    <transition name="warp">
      <div v-if="showWarp" class="warp-overlay">
        <div class="warp-circle">
          <div class="warp-circle-inner"></div>
        </div>
        <div class="warp-text">VOL.003</div>
      </div>
    </transition>

    <!-- 返回按钮 -->
    <button class="exit-btn" @click="exitWorld">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M19 12H5M12 19l-7-7 7-7"/>
      </svg>
      <span>Return to Universe</span>
    </button>

    <!-- 潜水艇驾驶舱主界面 -->
    <div class="submarine-cockpit">
      <!-- 开场叙事文字 -->
      <transition name="narrative-fade">
        <div v-if="showOpeningNarrative" class="opening-narrative">
          <p class="narrative-text">{{ openingNarrative }}</p>
          <button class="narrative-continue-btn" @click="dismissNarrative">
            <span>开始探索</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </transition>

      <!-- 潜水艇内部装饰 -->
      <div class="cockpit-decoration">
        <!-- 左侧管道 -->
        <div class="pipe pipe-left">
          <div class="pipe-segment" v-for="i in 5" :key="'left-' + i"></div>
        </div>
        <!-- 右侧管道 -->
        <div class="pipe pipe-right">
          <div class="pipe-segment" v-for="i in 5" :key="'right-' + i"></div>
        </div>
        <!-- 顶部灯饰 -->
        <div class="ceiling-lights">
          <div class="light light-1"></div>
          <div class="light light-2"></div>
          <div class="light light-3"></div>
        </div>
      </div>

      <!-- 仪表盘区域 -->
      <div class="dashboard-gauges">
        <!-- 压力计 -->
        <div class="gauge-container pressure-gauge">
          <div class="gauge-label">PRESSURE</div>
          <div class="gauge">
            <svg viewBox="0 0 100 100" class="gauge-svg">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="rgba(100, 149, 237, 0.1)"
                stroke-width="8"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#6495ED"
                stroke-width="8"
                stroke-linecap="round"
                :stroke-dasharray="pressureCircumference"
                :stroke-dashoffset="pressureOffset"
                transform="rotate(-90 50 50)"
                class="gauge-progress"
              />
            </svg>
            <div class="gauge-value">{{ pressureValue }}</div>
          </div>
          <div class="gauge-unit">ATM</div>
        </div>

        <!-- 温度计 -->
        <div class="gauge-container temperature-gauge">
          <div class="gauge-label">TEMP</div>
          <div class="gauge">
            <svg viewBox="0 0 100 100" class="gauge-svg">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="rgba(100, 149, 237, 0.1)"
                stroke-width="8"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#6495ED"
                stroke-width="8"
                stroke-linecap="round"
                :stroke-dasharray="tempCircumference"
                :stroke-dashoffset="tempOffset"
                transform="rotate(-90 50 50)"
                class="gauge-progress"
              />
            </svg>
            <div class="gauge-value">{{ temperatureValue }}</div>
          </div>
          <div class="gauge-unit">°C</div>
        </div>

        <!-- 氧气计 -->
        <div class="gauge-container oxygen-gauge">
          <div class="gauge-label">OXYGEN</div>
          <div class="gauge">
            <svg viewBox="0 0 100 100" class="gauge-svg">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="rgba(100, 149, 237, 0.1)"
                stroke-width="8"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#6495ED"
                stroke-width="8"
                stroke-linecap="round"
                :stroke-dasharray="oxygenCircumference"
                :stroke-dashoffset="oxygenOffset"
                transform="rotate(-90 50 50)"
                class="gauge-progress"
              />
            </svg>
            <div class="gauge-value">{{ oxygenValue }}</div>
          </div>
          <div class="gauge-unit">%</div>
        </div>

        <!-- 能量计 -->
        <div class="gauge-container energy-gauge">
          <div class="gauge-label">ENERGY</div>
          <div class="gauge">
            <svg viewBox="0 0 100 100" class="gauge-svg">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="rgba(100, 149, 237, 0.1)"
                stroke-width="8"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#6495ED"
                stroke-width="8"
                stroke-linecap="round"
                :stroke-dasharray="energyCircumference"
                :stroke-dashoffset="energyOffset"
                transform="rotate(-90 50 50)"
                class="gauge-progress"
              />
            </svg>
            <div class="gauge-value">{{ energyValue }}</div>
          </div>
          <div class="gauge-unit">%</div>
        </div>
      </div>

      <!-- 顶部信息栏 -->
      <div class="cockpit-header">
        <div class="depth-indicator">
          <span class="depth-label">DEPTH</span>
          <span class="depth-value">{{ currentDepth }}m</span>
          <div class="depth-bar">
            <div class="depth-progress" :style="{ width: depthProgress + '%' }"></div>
          </div>
        </div>
        <div class="location-indicator">
          <span class="location-name">{{ currentZoneName }}</span>
          <span class="location-description">{{ currentZoneDescription }}</span>
        </div>
      </div>

      <!-- 舷窗视野 -->
      <div class="porthole-view">
        <!-- 可探索内容提示 -->
        <transition name="discovery">
          <div v-if="showDiscoveryHint" class="discovery-hint" @click="triggerExploration">
            <div class="discovery-icon">✨</div>
            <div class="discovery-info">
              <div class="discovery-title">{{ currentDiscovery.title }}</div>
              <div class="discovery-desc">{{ currentDiscovery.description }}</div>
            </div>
            <div class="discovery-action">
              <span>点击探索</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </div>
          </div>
        </transition>

        <!-- 潜望镜控制提示 -->
        <div v-if="showPeriscopeHint" class="periscope-hint">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"/>
          </svg>
          <span>拖动旋转视野</span>
        </div>

        <div
          class="porthole-frame"
          @mousedown="startRotation"
          @mousemove="onRotation"
          @mouseup="endRotation"
          @mouseleave="endRotation"
          @touchstart="startRotation"
          @touchmove="onRotation"
          @touchend="endRotation"
          :class="{ 'is-rotating': isRotating }"
        >
          <div class="porthole-glass" :style="portholeBackground">
            <!-- 外部景观容器（可旋转） -->
            <div
              class="external-view"
              :style="{ transform: `rotate(${periscopeAngle}deg)` }"
            >
              <canvas ref="oceanCanvas" class="ocean-canvas"></canvas>

              <!-- 海洋生物装饰（随旋转移动） -->
              <div class="sea-creatures">
                <div
                  v-for="(creature, index) in seaCreatures"
                  :key="index"
                  class="sea-creature"
                  :class="creature.type"
                  :style="{
                    left: creature.x + '%',
                    top: creature.y + '%',
                    transform: `scale(${creature.scale}) rotate(${creature.rotation}deg)`,
                    opacity: creature.opacity
                  }"
                >
                  {{ creature.icon }}
                </div>
              </div>
            </div>

            <!-- 潜望镜十字线 -->
            <div class="periscope-crosshair">
              <div class="crosshair-horizontal"></div>
              <div class="crosshair-vertical"></div>
              <div class="crosshair-circle"></div>
            </div>
          </div>

          <!-- 角度指示器 -->
          <div class="angle-indicator">
            <span class="angle-value">{{ Math.round(periscopeAngle) }}°</span>
          </div>
        </div>

        <!-- 深度标记 -->
        <div class="depth-markers">
          <div
            v-for="marker in depthMarkers"
            :key="marker.depth"
            class="depth-marker"
            :class="{ 'active': currentDepth >= marker.depth }"
            :style="{ bottom: marker.position + '%' }"
          >
            <span class="marker-depth">{{ marker.depth }}m</span>
            <span class="marker-label">{{ marker.label }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 控制台 -->
    <div class="control-panel">
        <!-- 状态指示灯 -->
        <div class="control-status-lights">
          <div
            v-for="(light, index) in statusLights"
            :key="index"
            class="status-light"
            :class="{ 'active': light.active, 'warning': light.warning }"
            :style="{ backgroundColor: light.color }"
          ></div>
        </div>

        <div class="control-group">
          <button
            class="control-btn dive-btn"
            @click="diveDeeper"
            @mousedown="triggerButtonEffect('dive')"
            :disabled="currentDepth >= maxDepth"
            :class="{ 'disabled': currentDepth >= maxDepth }"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 5v14M19 12l-7 7-7-7"/>
            </svg>
            <span>下潜</span>
            <div class="btn-glow"></div>
          </button>
          <button
            class="control-btn surface-btn"
            @click="surface"
            @mousedown="triggerButtonEffect('surface')"
            :disabled="currentDepth <= 0"
            :class="{ 'disabled': currentDepth <= 0 }"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 19V5M5 12l7-7 7 7"/>
            </svg>
            <span>上浮</span>
            <div class="btn-glow"></div>
          </button>
        </div>

        <div class="control-group">
          <button
            class="control-btn collection-btn"
            @click="showCollection = true"
            @mousedown="triggerButtonEffect('collection')"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            <span>发现物 ({{ collectionCount }})</span>
            <div class="btn-glow"></div>
          </button>
          <button
            class="control-btn log-btn"
            @click="showLog = true"
            @mousedown="triggerButtonEffect('log')"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
              <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>
            </svg>
            <span>日志</span>
            <div class="btn-glow"></div>
          </button>
          <button
            class="control-btn map-btn"
            @click="showMap = true"
            @mousedown="triggerButtonEffect('map')"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
              <path d="M2 12h20"/>
            </svg>
            <span>地图</span>
            <div class="btn-glow"></div>
          </button>
          <button
            class="control-btn settings-btn"
            @click="showSettings = true; updateSaveInfo()"
            @mousedown="triggerButtonEffect('settings')"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="3"/>
              <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/>
            </svg>
            <span>设置</span>
            <div class="btn-glow"></div>
          </button>
        </div>
     

      <!-- 环境光效层 -->
      <div class="ambient-lighting" :class="{ 'dive-effect': showDiveEffect, 'surface-effect': showSurfaceEffect }"></div>
    </div>

    <!-- 成就通知 -->
    <transition name="achievement">
      <div v-if="showAchievementNotification && currentAchievement" class="achievement-notification">
        <div class="achievement-icon">🏆</div>
        <div class="achievement-info">
          <div class="achievement-title">成就解锁</div>
          <div class="achievement-name">{{ currentAchievement.name }}</div>
          <div class="achievement-desc">{{ currentAchievement.description }}</div>
        </div>
      </div>
    </transition>

    <!-- 探索内容全屏模态框 -->
    <transition name="explore">
      <div v-if="showExploreModal" class="explore-modal-overlay" @click.self="closeExploreModal">
        <div class="explore-modal-content" :class="'explore-' + currentExploreId">
          <!-- 探索内容头部 -->
          <div class="explore-header">
            <button class="explore-back-btn" @click="closeExploreModal">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              <span>返回潜水艇</span>
            </button>
            <h2 class="explore-title">{{ exploreContent.title }}</h2>
            <div class="explore-progress">
              <span>{{ exploreContent.progress }}</span>
            </div>
          </div>

          <!-- 探索内容主体 -->
          <div class="explore-body">
            <!-- 《尺波》微缩世界 -->
            <div v-if="currentExploreId === 'chibobo'" class="chibobo-world">
              <div class="world-intro">
                <p class="world-narrative">{{ exploreContent.narrative }}</p>
              </div>

              <!-- 场景选择 -->
              <div class="scene-selection">
                <div
                  v-for="(scene, index) in exploreContent.scenes"
                  :key="scene.id"
                  class="scene-card"
                  @click="enterScene(scene)"
                >
                  <div class="scene-icon">{{ scene.icon }}</div>
                  <div class="scene-info">
                    <h3 class="scene-name">{{ scene.name }}</h3>
                    <p class="scene-desc">{{ scene.description }}</p>
                    <div class="scene-items">
                      <span
                        v-for="itemId in scene.items"
                        :key="itemId"
                        class="scene-item"
                        :class="{ 'collected': isItemCollected(itemId) }"
                      >
                        {{ getItemIcon(itemId) }}
                      </span>
                    </div>
                  </div>
                  <div class="scene-arrow">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M9 18l6-6-6-6"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <!-- 《书中蘑菇》蘑菇森林 -->
            <div v-if="currentExploreId === 'mushroom'" class="mushroom-world">
              <div class="world-intro">
                <p class="world-narrative">{{ exploreContent.narrative }}</p>
              </div>

              <!-- 蘑菇选择 -->
              <div class="mushroom-selection">
                <div
                  v-for="(mushroom, index) in exploreContent.scenes"
                  :key="mushroom.id"
                  class="mushroom-card"
                  :class="{ 'collected': isItemCollected(mushroom.items[0]) }"
                  @click="enterScene(mushroom)"
                >
                  <div class="mushroom-glow" :style="{ backgroundColor: mushroom.id === 'fluorescent' ? '#00ff00' : mushroom.id === 'story' ? '#ff69b4' : mushroom.id === 'memory' ? '#9370db' : mushroom.id === 'imagination' ? '#ffa500' : '#ffd700' }"></div>
                  <div class="mushroom-icon">🍄</div>
                  <div class="mushroom-info">
                    <h3 class="mushroom-name">{{ mushroom.name }}</h3>
                    <p class="mushroom-desc">{{ mushroom.description }}</p>
                    <div class="spore-indicator" :class="{ 'collected': isItemCollected(mushroom.items[0]) }">
                      <span>{{ isItemCollected(mushroom.items[0]) ? '已收集孢子' : '未收集' }}</span>
                    </div>
                  </div>
                  <div class="mushroom-arrow">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M9 18l6-6-6-6"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <!-- 《竹峰寺》古寺探索 -->
            <div v-if="currentExploreId === 'zhufeng'" class="zhufeng-world">
              <div class="world-intro">
                <p class="world-narrative">{{ exploreContent.narrative }}</p>
              </div>

              <!-- 地点选择 -->
              <div class="location-selection">
                <div
                  v-for="(location, index) in exploreContent.scenes"
                  :key="location.id"
                  class="location-card"
                  @click="enterScene(location)"
                >
                  <div class="location-image">
                    <div class="location-bg" :class="'location-' + location.id">
                      <div class="location-icon">{{ getLocationIcon(location.id) }}</div>
                    </div>
                  </div>
                  <div class="location-content">
                    <h3 class="location-name">{{ location.name }}</h3>
                    <p class="location-desc">{{ location.description }}</p>
                    <div class="key-hint" v-if="location.hint">
                      <span class="hint-icon">💡</span>
                      <span class="hint-text">提示：{{ location.hint }}</span>
                    </div>
                    <div class="key-status" :class="{ 'found': isItemCollected(location.key) }">
                      <span class="key-icon">{{ isItemCollected(location.key) ? '🗝️' : '🔍' }}</span>
                      <span class="key-text">{{ isItemCollected(location.key) ? '钥匙已找到' : '寻找钥匙...' }}</span>
                    </div>
                  </div>
                  <div class="location-arrow">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M9 18l6-6-6-6"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <!-- 艺术区（传彩笔 + 音乐家） -->
            <div v-if="currentExploreId === 'art'" class="art-world">
              <div class="world-intro">
                <p class="world-narrative">{{ exploreContent.narrative }}</p>
              </div>

              <!-- 艺术分类标签 -->
              <div class="art-categories">
                <div class="art-category-header">
                  <h3 class="category-title">✒️ 传彩笔 - 灵感碎片</h3>
                  <p class="category-desc">捕捉那些稍纵即逝的创作灵感</p>
                </div>

                <!-- 传彩笔场景 -->
                <div class="art-grid pen-fragments">
                  <div
                    v-for="fragment in exploreContent.scenes.slice(0, 5)"
                    :key="fragment.id"
                    class="art-card pen-card"
                    :class="{ 'collected': isItemCollected(fragment.items[0]) }"
                    @click="enterScene(fragment)"
                  >
                    <div class="art-card-bg">
                      <div class="art-sparkle"></div>
                      <div class="art-icon">{{ fragment.icon }}</div>
                    </div>
                    <div class="art-content">
                      <h4 class="art-title">{{ fragment.name }}</h4>
                      <p class="art-description">{{ fragment.description }}</p>
                      <div class="art-status">
                        <span class="status-icon">{{ isItemCollected(fragment.items[0]) ? '💎' : '✨' }}</span>
                        <span class="status-text">{{ isItemCollected(fragment.items[0]) ? '已捕获' : '等待捕捉' }}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="art-category-header" style="margin-top: 3rem;">
                  <h3 class="category-title">🎵 音乐家 - 记忆乐章</h3>
                  <p class="category-desc">重温那些永不消逝的旋律</p>
                </div>

                <!-- 音乐家场景 -->
                <div class="art-grid music-movements">
                  <div
                    v-for="movement in exploreContent.scenes.slice(5)"
                    :key="movement.id"
                    class="art-card music-card"
                    :class="{ 'collected': isItemCollected(movement.items[0]) }"
                    @click="enterScene(movement)"
                  >
                    <div class="art-card-bg" :class="'movement-' + movement.id">
                      <div class="music-notes">
                        <span class="note note-1">♪</span>
                        <span class="note note-2">♫</span>
                        <span class="note note-3">♪</span>
                      </div>
                      <div class="art-icon">{{ movement.icon }}</div>
                    </div>
                    <div class="art-content">
                      <h4 class="art-title">{{ movement.name }}</h4>
                      <p class="art-description">{{ movement.description }}</p>
                      <div class="art-status">
                        <span class="status-icon">{{ isItemCollected(movement.items[0]) ? '🎼' : '🎵' }}</span>
                        <span class="status-text">{{ isItemCollected(movement.items[0]) ? '已珍藏' : '待发现' }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 主线故事 - 深渊和现实 -->
            <div v-if="currentExploreId === 'abyss' || currentExploreId === 'reality'" class="main-story-world">
              <div class="chapter-narrative" v-if="exploreContent.chapter">
                <div class="chapter-header">
                  <h2 class="chapter-title">{{ exploreContent.chapter.title }}</h2>
                  <span class="chapter-depth">{{ currentDepth }}m</span>
                </div>
                <p class="chapter-text">{{ exploreContent.chapter.narrative }}</p>
                <div class="chapter-mood" :class="'mood-' + exploreContent.chapter.mood">
                  {{ getMoodText(exploreContent.chapter.mood) }}
                </div>
              </div>

              <!-- 记忆碎片展示 -->
              <div class="memory-fragments" v-if="exploreContent.scenes && exploreContent.scenes.length > 0">
                <h3 class="fragments-title">
                  <span class="title-icon">💫</span>
                  {{ currentExploreId === 'abyss' ? '最后的梦境碎片' : '现实的回响' }}
                </h3>
                <div class="fragments-grid">
                  <div
                    v-for="memory in exploreContent.scenes"
                    :key="memory.id"
                    class="memory-fragment"
                    :class="{ 'collected': memory.collected || isItemCollected(memory.items[0]) }"
                    @click="enterScene(memory)"
                  >
                    <div class="memory-shard">
                      <div class="memory-icon">{{ memory.icon }}</div>
                      <div class="memory-glow"></div>
                    </div>
                    <div class="memory-content">
                      <h4 class="memory-name">{{ memory.name }}</h4>
                      <p class="memory-story">{{ memory.description }}</p>
                      <div class="memory-status">
                        <span class="status-dot"></span>
                        <span class="status-text">{{ memory.collected || isItemCollected(memory.items[0]) ? '已找回' : '遗失的记忆' }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 未发现记忆时提示 -->
              <div class="no-memories" v-else>
                <div class="empty-icon">🌫️</div>
                <p class="empty-text">这片深域还没有记忆碎片...</p>
                <p class="empty-hint">也许在更深处，或者回到过去</p>
              </div>
            </div>

            <!-- 已收集物品展示 -->
            <div class="collected-showcase" v-if="exploreContent.collectedItems?.length > 0">
              <h3>在此处发现的物品</h3>
              <div class="showcase-items">
                <div
                  v-for="itemId in exploreContent.collectedItems"
                  :key="itemId"
                  class="showcase-item"
                >
                  <span class="showcase-icon">{{ getItemIcon(itemId) }}</span>
                  <span class="showcase-name">{{ getItemName(itemId) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- 收藏室弹窗 -->
    <transition name="modal">
      <div v-if="showCollection" class="modal-overlay" @click.self="showCollection = false">
        <div class="modal-content collection-modal">
          <div class="modal-header">
            <h2>发现物收藏</h2>
            <button class="close-btn" @click="showCollection = false">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>
          <div class="modal-body">
            <div class="collection-stats">
              <div class="stat-item">
                <span class="stat-value">{{ collectionCount }}</span>
                <span class="stat-label">已收集</span>
              </div>
              <div class="stat-item">
                <span class="stat-value">{{ totalItems }}</span>
                <span class="stat-label">总计</span>
              </div>
            </div>
            <div class="collection-grid">
              <div
                v-for="(item, index) in collectedItems"
                :key="index"
                class="collection-item"
                :class="{ 'locked': !item.collected }"
              >
                <div class="item-icon">{{ item.collected ? item.icon : '?' }}</div>
                <div class="item-info">
                  <p class="item-name">{{ item.collected ? item.name : '???' }}</p>
                  <p class="item-story">{{ item.collected ? item.story : '继续探索以发现' }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- 日志弹窗 -->
    <transition name="modal">
      <div v-if="showLog" class="modal-overlay" @click.self="showLog = false">
        <div class="modal-content log-modal">
          <div class="modal-header">
            <h2>深海日志</h2>
            <button class="close-btn" @click="showLog = false">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>
          <div class="modal-body">
            <div class="log-entries">
              <div
                v-for="(entry, index) in logEntries"
                :key="index"
                class="log-entry"
              >
                <span class="log-time">{{ entry.time }}</span>
                <span class="log-depth">{{ entry.depth }}m</span>
                <p class="log-text">{{ entry.text }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- 地图弹窗 -->
    <transition name="modal">
      <div v-if="showMap" class="modal-overlay" @click.self="showMap = false">
        <div class="modal-content map-modal">
          <div class="modal-header">
            <h2>深度地图</h2>
            <div class="map-legend">
              <span class="legend-item">
                <span class="legend-color explored"></span>
                <span class="legend-text">已探索</span>
              </span>
              <span class="legend-item">
                <span class="legend-color current"></span>
                <span class="legend-text">当前位置</span>
              </span>
            </div>
            <button class="close-btn" @click="showMap = false">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>
          <div class="modal-body">
            <div class="depth-map">
              <!-- 当前位置指示器 -->
              <div
                class="current-position-indicator"
                :style="{ bottom: currentPositionIndicator + '%' }"
              >
                <div class="indicator-dot"></div>
                <div class="indicator-label">当前位置</div>
              </div>

              <div
                v-for="zone in depthZones"
                :key="zone.depth"
                class="map-zone"
                :class="{
                  'explored': isZoneExplored(zone.depth),
                  'current': currentDepth === zone.depth
                }"
                :style="{ top: zone.position + '%' }"
                @click="navigateToDepth(zone.depth)"
              >
                <span class="zone-depth">{{ zone.depth }}m</span>
                <span class="zone-name">{{ zone.name }}</span>
                <span class="zone-description">{{ zone.description }}</span>
                <span class="zone-status">
                  <span v-if="isZoneExplored(zone.depth)">✓</span>
                  {{ isZoneExplored(zone.depth) ? '已探索' : '未探索' }}
                </span>
              </div>
            </div>

            <!-- 快速跳转按钮 -->
            <div class="quick-jump-buttons">
              <button
                v-for="zone in depthZones"
                :key="'jump-' + zone.depth"
                class="jump-btn"
                :class="{ 'active': currentDepth === zone.depth }"
                @click="navigateToDepth(zone.depth)"
              >
                {{ zone.depth }}m
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- 设置弹窗 -->
    <transition name="modal">
      <div v-if="showSettings" class="modal-overlay" @click.self="showSettings = false">
        <div class="modal-content settings-modal">
          <div class="modal-header">
            <h2>系统设置</h2>
            <button class="close-btn" @click="showSettings = false">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>
          <div class="modal-body">
            <div class="settings-section">
              <h3>游戏设置</h3>
              <div class="setting-item">
                <label>自动保存</label>
                <div class="toggle-switch" :class="{ 'active': autoSaveEnabled }" @click="toggleAutoSave">
                  <span class="toggle-slider"></span>
                </div>
              </div>
              <div class="setting-item">
                <label>显示提示</label>
                <div class="toggle-switch" :class="{ 'active': showHints }" @click="toggleHints">
                  <span class="toggle-slider"></span>
                </div>
              </div>
            </div>

            <div class="settings-section">
              <h3>数据管理</h3>
              <div class="setting-buttons">
                <button class="setting-btn save-btn" @click="manualSave">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/>
                    <path d="M17 21v-8H7v8M7 3v5h8"/>
                  </svg>
                  <span>手动保存</span>
                </button>
                <button class="setting-btn load-btn" @click="manualLoad">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                    <polyline points="7 10 12 15 17 10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                  <span>读取存档</span>
                </button>
                <button class="setting-btn delete-btn" @click="confirmDeleteSave">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="3 6 5 6 21 6"/>
                    <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
                  </svg>
                  <span>删除存档</span>
                </button>
              </div>
            </div>

            <div class="settings-section">
              <h3>键盘快捷键</h3>
              <div class="shortcuts-list">
                <div class="shortcut-item">
                  <span class="shortcut-desc">下潜</span>
                  <div class="shortcut-keys">
                    <kbd>↓</kbd> 或 <kbd>S</kbd>
                  </div>
                </div>
                <div class="shortcut-item">
                  <span class="shortcut-desc">上浮</span>
                  <div class="shortcut-keys">
                    <kbd>↑</kbd> 或 <kbd>W</kbd>
                  </div>
                </div>
                <div class="shortcut-item">
                  <span class="shortcut-desc">打开/关闭地图</span>
                  <div class="shortcut-keys">
                    <kbd>M</kbd>
                  </div>
                </div>
                <div class="shortcut-item">
                  <span class="shortcut-desc">打开/关闭收藏</span>
                  <div class="shortcut-keys">
                    <kbd>C</kbd>
                  </div>
                </div>
                <div class="shortcut-item">
                  <span class="shortcut-desc">打开/关闭日志</span>
                  <div class="shortcut-keys">
                    <kbd>L</kbd>
                  </div>
                </div>
                <div class="shortcut-item">
                  <span class="shortcut-desc">打开设置</span>
                  <div class="shortcut-keys">
                    <kbd>Esc</kbd>
                  </div>
                </div>
              </div>
            </div>

            <!-- 存档信息 -->
            <div v-if="saveInfo" class="save-info">
              <div class="info-item">
                <span class="info-label">存档版本</span>
                <span class="info-value">{{ saveInfo.version }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">保存时间</span>
                <span class="info-value">{{ saveInfo.timestamp }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">当前深度</span>
                <span class="info-value">{{ saveInfo.depth }}m</span>
              </div>
              <div class="info-item">
                <span class="info-label">探索进度</span>
                <span class="info-value">{{ saveInfo.exploredZones }}/{{ depthZones.length }} 区域</span>
              </div>
              <div class="info-item">
                <span class="info-label">收集进度</span>
                <span class="info-value">{{ saveInfo.collected }}/{{ saveInfo.total }} 物品</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { useRouter } from 'vue-router'
import { submarineData } from '../data/submarineData.js'

const router = useRouter()
const oceanCanvas = ref(null)
const isTransitioning = ref(false)
const showWarp = ref(true)

// 深度相关状态
const currentDepth = ref(0)
const maxDepth = ref(3800)
const exploredZones = ref([0])

// UI状态
const showCollection = ref(false)
const showLog = ref(false)
const showMap = ref(false)
const showSettings = ref(false)
const showOpeningNarrative = ref(true)

// 设置选项
const autoSaveEnabled = ref(true)
const showHints = ref(true)

// 存档信息
const saveInfo = ref(null)

// 探索系统
const showDiscoveryHint = ref(false)
const showExploreModal = ref(false)
const currentExploreId = ref('')
const currentDiscovery = ref({
  title: '',
  description: ''
})

// 探索内容数据
const exploreContent = ref({
  title: '',
  narrative: '',
  progress: '',
  scenes: [],
  collectedItems: []
})

// 深度区域可探索内容映射
const depthDiscoveries = {
  0: {
    id: 'chibobo',
    title: '发现微缩世界',
    description: '探测到微缩生命的信号...',
    storyId: 'chiboboStory'
  },
  200: {
    id: 'mushroom',
    title: '书中蘑菇',
    description: '书页上长出了奇异的生命',
    storyId: 'mushroomStory'
  },
  800: {
    id: 'zhufeng',
    title: '竹峰寺',
    description: '古老的记忆在此沉睡',
    storyId: 'zhufengStory'
  },
  1500: {
    id: 'art',
    title: '艺术区',
    description: '灵感与旋律的深处',
    storyId: 'artStory'
  },
  2500: {
    id: 'abyss',
    title: '深渊底部',
    description: '最后的梦，想象力消逝的地方...',
    storyId: 'mainStory'
  },
  3800: {
    id: 'reality',
    title: '海沟深处',
    description: '现实世界，回望那段遗失的时光',
    storyId: 'mainStory'
  }
}

// 潜望镜旋转状态
const periscopeAngle = ref(0)
const isRotating = ref(false)
const showPeriscopeHint = ref(true)
let rotationStartX = 0
let rotationStartAngle = 0

// 海洋生物装饰数据
const seaCreatures = ref([
  { type: 'jellyfish', icon: '🎐', x: 20, y: 30, scale: 0.8, rotation: 15, opacity: 0.6 },
  { type: 'fish', icon: '🐟', x: 70, y: 60, scale: 0.6, rotation: -20, opacity: 0.5 },
  { type: 'starfish', icon: '⭐', x: 40, y: 80, scale: 0.7, rotation: 0, opacity: 0.4 },
  { type: 'bubble', icon: '🫧', x: 85, y: 25, scale: 0.5, rotation: 45, opacity: 0.7 },
  { type: 'seaweed', icon: '🌿', x: 15, y: 70, scale: 0.9, rotation: -10, opacity: 0.5 }
])

// 开场叙事文字
const openingNarrative = ref('我构想出一艘潜水艇。它不仅是存在于我的想象中，而是确确实实地，停泊在我家院子里的老槐树下。')

// 状态指示灯
const statusLights = ref([
  { color: '#4CAF50', active: true, warning: false }, // 系统
  { color: '#2196F3', active: true, warning: false }, // 动力
  { color: '#FF9800', active: false, warning: true }, // 警告
  { color: '#F44336', active: false, warning: false }  // 危险
])

// 环境光效
const showDiveEffect = ref(false)
const showSurfaceEffect = ref(false)

// 收集物品
const collectedItems = ref(submarineData.collections || [])

// 日志条目
const logEntries = ref([])

// 成就系统
const achievements = ref(submarineData.achievements || [])
const showAchievementNotification = ref(false)
const currentAchievement = ref(null)

// 解锁成就
const unlockAchievement = (achievementId) => {
  const achievement = achievements.value.find(a => a.id === achievementId)
  if (achievement && !achievement.unlocked) {
    achievement.unlocked = true
    currentAchievement.value = achievement
    showAchievementNotification.value = true

    addLogEntry(`🏆 成就解锁：${achievement.name}`)

    // 3秒后隐藏通知
    setTimeout(() => {
      showAchievementNotification.value = false
    }, 3000)

    // 自动保存
    saveGameProgress()
  }
}

// 检查成就条件
const checkAchievements = () => {
  // 初次下潜
  if (currentDepth.value > 0) {
    unlockAchievement('first_dive')
  }

  // 深海探险家
  if (currentDepth.value >= 1500) {
    unlockAchievement('deep_explorer')
  }

  // 抵达深渊
  if (currentDepth.value >= 3800) {
    unlockAchievement('abyss_reached')
  }

  // 收集相关成就
  const chiboboCollected = collectedItems.value.filter(i =>
    i.id.startsWith('chibobo_') && i.collected
  ).length
  if (chiboboCollected >= 5) {
    unlockAchievement('chibobo_master')
  }

  const mushroomCollected = collectedItems.value.filter(i =>
    i.id.startsWith('mushroom_') && i.collected
  ).length
  if (mushroomCollected >= 5) {
    unlockAchievement('mushroom_gardener')
  }

  const zhufengCollected = collectedItems.value.filter(i =>
    i.id.startsWith('zhufeng_') && i.collected
  ).length
  if (zhufengCollected >= 3) {
    unlockAchievement('zhufeng_guardian')
  }

  const artCollected = collectedItems.value.filter(i =>
    (i.id.startsWith('pen_') || i.id.startsWith('musician_')) && i.collected
  ).length
  if (artCollected >= 9) {
    unlockAchievement('art_collector')
  }

  const mainCollected = collectedItems.value.filter(i =>
    i.id.startsWith('main_') && i.collected
  ).length
  if (mainCollected >= 15) {
    unlockAchievement('memory_keeper')
  }

  // 完美收藏
  const totalCollected = collectedItems.value.filter(i => i.collected).length
  if (totalCollected >= totalItems.value) {
    unlockAchievement('completionist')
  }
}

// 收集物品
const collectItem = (itemId) => {
  const item = collectedItems.value.find(i => i.id === itemId)
  if (item && !item.collected) {
    item.collected = true
    addLogEntry(`发现新物品：${item.icon} ${item.name}`)

    // 检查成就
    checkAchievements()

    // 自动保存
    saveGameProgress()
  }
}

// Canvas相关
let oceanCtx = null
let particles = []
let animationId = null

// 深度标记
const depthMarkers = [
  { depth: 0, label: '海面', position: 0 },
  { depth: 200, label: '表层', position: 20 },
  { depth: 800, label: '中层', position: 40 },
  { depth: 1500, label: '半深层', position: 60 },
  { depth: 2500, label: '深层', position: 80 },
  { depth: 3800, label: '深渊', position: 100 }
]

// 深度区域配置
const depthZones = [
  { depth: 0, name: '表层带', position: 0, description: '0-200m 阳光渗透区' },
  { depth: 200, name: '中层带', position: 20, description: '200-800m 想象力区' },
  { depth: 800, name: '半深层带', position: 45, description: '800-1500m 记忆区' },
  { depth: 1500, name: '深层带', position: 65, description: '1500-2500m 艺术区' },
  { depth: 2500, name: '深渊带', position: 85, description: '2500-3800m 遗忘区' },
  { depth: 3800, name: '海沟带', position: 100, description: '现实世界' }
]

// 计算属性
const depthProgress = computed(() => {
  return (currentDepth.value / maxDepth.value) * 100
})

// 仪表盘圆周长
const gaugeRadius = 45
const gaugeCircumference = 2 * Math.PI * gaugeRadius

// 压力计（随深度增加）
const pressureValue = computed(() => {
  const atm = 1 + (currentDepth.value / 10)
  return atm.toFixed(1)
})

const pressureCircumference = computed(() => gaugeCircumference)
const pressureOffset = computed(() => {
  const progress = Math.min((parseFloat(pressureValue.value) - 1) / 380, 1)
  return gaugeCircumference * (1 - progress)
})

// 温度计（随深度降低）
const temperatureValue = computed(() => {
  const progress = currentDepth.value / maxDepth.value
  const temp = 25 - (progress * 20) // 从25°C降至5°C
  return Math.max(temp, 5).toFixed(1)
})

const tempCircumference = computed(() => gaugeCircumference)
const tempOffset = computed(() => {
  const progress = (parseFloat(temperatureValue.value) - 5) / 20
  return gaugeCircumference * (1 - progress)
})

// 氧气计（缓慢消耗）
const oxygenValue = computed(() => {
  // 基础值100，每100m减少0.5%
  const baseOxygen = 100
  const consumption = (currentDepth.value / 100) * 0.5
  return Math.max(baseOxygen - consumption, 0).toFixed(1)
})

const oxygenCircumference = computed(() => gaugeCircumference)
const oxygenOffset = computed(() => {
  const progress = parseFloat(oxygenValue.value) / 100
  return gaugeCircumference * (1 - progress)
})

// 能量计（随机波动）
const energyValue = computed(() => {
  // 基础值85-95之间随机波动
  const baseEnergy = 90
  const fluctuation = Math.sin(Date.now() / 1000) * 5
  return Math.max(baseEnergy + fluctuation, 0).toFixed(1)
})

const energyCircumference = computed(() => gaugeCircumference)
const energyOffset = computed(() => {
  const progress = parseFloat(energyValue.value) / 100
  return gaugeCircumference * (1 - progress)
})

const currentZoneName = computed(() => {
  const zone = depthZones.find(z => currentDepth.value >= z.depth)
  return zone ? zone.name : '未知区域'
})

const currentZoneDescription = computed(() => {
  const zone = depthZones.find(z => currentDepth.value >= z.depth)
  return zone ? zone.description : ''
})

const collectionCount = computed(() => {
  return collectedItems.value.filter(item => item.collected).length
})

const totalItems = computed(() => {
  return collectedItems.value.length
})

// 当前位置指示器（地图上）
const currentPositionIndicator = computed(() => {
  const progress = currentDepth.value / maxDepth.value
  return progress * 100
})

const portholeBackground = computed(() => {
  // 根据深度返回不同的背景渐变
  const progress = currentDepth.value / maxDepth.value

  if (progress < 0.05) {
    // 表层：浅蓝
    return {
      background: 'linear-gradient(180deg, #87CEEB 0%, #1E90FF 50%, #000080 100%)'
    }
  } else if (progress < 0.2) {
    // 中层：蓝绿渐变
    return {
      background: 'linear-gradient(180deg, #1E90FF 0%, #0066CC 50%, #003366 100%)'
    }
  } else if (progress < 0.4) {
    // 半深层：深蓝带墨绿
    return {
      background: 'linear-gradient(180deg, #0066CC 0%, #003366 50%, #001A33 100%)'
    }
  } else if (progress < 0.65) {
    // 深层：深蓝
    return {
      background: 'linear-gradient(180deg, #003366 0%, #001A33 50%, #000D1A 100%)'
    }
  } else if (progress < 0.85) {
    // 深渊：墨黑
    return {
      background: 'linear-gradient(180deg, #001A33 0%, #000D1A 50%, #000000 100%)'
    }
  } else {
    // 海沟：完全黑暗
    return {
      background: '#000000'
    }
  }
})

// 方法
const diveDeeper = () => {
  if (currentDepth.value < maxDepth.value) {
    const nextZone = depthZones.find(z => z.depth > currentDepth.value)
    if (nextZone) {
      currentDepth.value = nextZone.depth
      addLogEntry(`下潜至 ${nextZone.depth}m - ${nextZone.name}`)

      // 记录已探索区域
      if (!exploredZones.value.includes(nextZone.depth)) {
        exploredZones.value.push(nextZone.depth)
      }

      // 检查是否有可探索内容
      checkForDiscovery()

      // 检查成就
      checkAchievements()

      // 自动保存
      saveGameProgress()
    }
  }
}

const surface = () => {
  if (currentDepth.value > 0) {
    const prevZone = [...depthZones].reverse().find(z => z.depth < currentDepth.value)
    if (prevZone) {
      currentDepth.value = prevZone.depth
      addLogEntry(`上浮至 ${prevZone.depth}m - ${prevZone.name}`)

      // 检查成就
      checkAchievements()

      // 自动保存
      saveGameProgress()
    }
  }
}

const navigateToDepth = (depth) => {
  currentDepth.value = depth
  showMap.value = false
  addLogEntry(`快速航行至 ${depth}m`)
}

const isZoneExplored = (depth) => {
  return exploredZones.value.includes(depth)
}

const dismissNarrative = () => {
  showOpeningNarrative.value = false
  addLogEntry('想象力启动，潜水艇系统上线')

  // 在表层时检查发现内容
  setTimeout(() => {
    checkForDiscovery()
  }, 1000)
}

// === 探索系统方法 ===

// 检查当前深度是否有可探索内容
const checkForDiscovery = () => {
  const depth = currentDepth.value
  const discovery = depthDiscoveries[depth]

  if (discovery) {
    currentDiscovery.value = discovery
    showDiscoveryHint.value = true

    // 5秒后自动隐藏提示
    setTimeout(() => {
      showDiscoveryHint.value = false
    }, 5000)
  }
}

// 触发探索
const triggerExploration = () => {
  const discovery = depthDiscoveries[currentDepth.value]
  if (!discovery) return

  currentExploreId.value = discovery.id
  showDiscoveryHint.value = false

  // 加载对应的探索内容
  loadExploreContent(discovery.id, discovery.storyId)

  showExploreModal.value = true
  addLogEntry(`进入探索：${discovery.title}`)
}

// 加载探索内容数据
const loadExploreContent = (exploreId, storyId) => {
  const storyData = submarineData[storyId]
  if (!storyData) return

  // 获取该探索区域已收集的物品
  const collectedInArea = collectedItems.value
    .filter(item => item.collected && item.zone === currentDepth.value)
    .map(item => item.id)

  if (exploreId === 'chibobo') {
    // 《尺波》微缩世界
    exploreContent.value = {
      title: storyData.title,
      narrative: '在尺波之中，有拇指大小的将军在指挥千军万马，有微缩的读书人在苦读圣贤书。这里是一个完整的微缩世界，等待你去发现。',
      progress: `${collectedInArea.length}/5 物品已收集`,
      scenes: storyData.scenes.map(scene => ({
        ...scene,
        icon: getSceneIcon(scene.id)
      })),
      collectedItems: collectedInArea
    }
  } else if (exploreId === 'mushroom') {
    // 《书中蘑菇》
    exploreContent.value = {
      title: storyData.title,
      narrative: storyData.description,
      progress: `${collectedInArea.length}/5 孢子已收集`,
      scenes: storyData.mushrooms.map(mushroom => ({
        id: mushroom.id,
        name: mushroom.name,
        description: mushroom.description,
        icon: '🍄',
        items: [mushroom.spore]
      })),
      collectedItems: collectedInArea
    }
  } else if (exploreId === 'zhufeng') {
    // 《竹峰寺》
    exploreContent.value = {
      title: storyData.title,
      narrative: storyData.description,
      progress: `${collectedInArea.length}/3 钥匙已找到`,
      scenes: storyData.locations.map(location => ({
        ...location,
        items: [location.key] // 将key转换为items数组，供enterScene使用
      })),
      collectedItems: collectedInArea
    }
  } else if (exploreId === 'art') {
    // 艺术区（传彩笔 + 音乐家）
    exploreContent.value = {
      title: '艺术深处',
      narrative: '在这里，灵感和旋律交织成永恒的乐章。',
      progress: `${collectedInArea.length}/9 已收集`,
      scenes: [
        ...submarineData.penStory.fragments.map(f => ({
          id: f.id,
          name: `灵感：${f.trigger}`,
          description: '捕捉那一瞬间的灵感',
          icon: '✒️',
          items: [f.id]
        })),
        ...submarineData.musicianStory.movements.map(m => ({
          id: m.id,
          name: m.name,
          description: m.description,
          icon: '🎵',
          items: [m.id]
        }))
      ],
      collectedItems: collectedInArea
    }
  } else if (exploreId === 'abyss' || exploreId === 'reality') {
    // 主线故事 - 深渊和现实
    const chapter = storyData.chapters.find(ch => ch.depth === currentDepth.value)

    // 获取该深度的主线记忆碎片
    const memoryFragments = collectedItems.value
      .filter(item => item.zone === currentDepth.value && item.id.startsWith('main_'))
      .sort((a, b) => a.id.localeCompare(b.id))

    exploreContent.value = {
      title: chapter ? chapter.title : (exploreId === 'abyss' ? '深渊底部' : '海沟深处'),
      narrative: chapter ? chapter.narrative : '在这里，回忆与现实交织。',
      progress: `${memoryFragments.length}/${exploreId === 'abyss' ? 3 : 3} 记忆碎片已找回`,
      chapter: chapter,
      memories: memoryFragments,
      scenes: memoryFragments.map(item => ({
        id: item.id,
        name: item.name,
        description: item.story,
        icon: item.icon,
        items: [item.id],
        collected: item.collected
      })),
      collectedItems: collectedInArea
    }
  }
}

// 获取场景图标
const getSceneIcon = (sceneId) => {
  const icons = {
    'palace': '🏰',
    'houses': '🏠',
    'market': '🏪'
  }
  return icons[sceneId] || '📍'
}

// 获取地点图标（竹峰寺）
const getLocationIcon = (locationId) => {
  const icons = {
    'gate': '⛩️',
    'hall': '🏯',
    'backyard': '🎋'
  }
  return icons[locationId] || '📍'
}

// 获取情绪文本（主线故事）
const getMoodText = (mood) => {
  const moodTexts = {
    'wonder': '✨ 奇妙',
    'joy': '🌈 欢愉',
    'tension': '⚡ 紧张',
    'sadness': '💔 悲伤',
    'loss': '🌑 失落',
    'nostalgia': '🕰️ 怀念'
  }
  return moodTexts[mood] || mood
}

// 关闭探索模态框
const closeExploreModal = () => {
  showExploreModal.value = false
  currentExploreId.value = ''
  addLogEntry('返回潜水艇')
}

// 进入场景
const enterScene = (scene) => {
  // 从场景中随机发现一个未收集的物品
  const uncollectedItems = scene.items.filter(itemId => !isItemCollected(itemId))

  if (uncollectedItems.length > 0) {
    // 随机选择一个未收集的物品
    const randomItem = uncollectedItems[Math.floor(Math.random() * uncollectedItems.length)]
    collectItem(randomItem)

    addLogEntry(`在${scene.name}发现了：${getItemName(randomItem)}`)
  } else {
    addLogEntry(`${scene.name}中的物品已全部收集`)
  }

  // 更新探索内容
  const discovery = depthDiscoveries[currentDepth.value]
  if (discovery) {
    loadExploreContent(discovery.id, discovery.storyId)
  }
}

// 检查物品是否已收集
const isItemCollected = (itemId) => {
  const item = collectedItems.value.find(i => i.id === itemId)
  return item ? item.collected : false
}

// 获取物品图标
const getItemIcon = (itemId) => {
  const item = collectedItems.value.find(i => i.id === itemId)
  return item ? item.icon : '?'
}

// 获取物品名称
const getItemName = (itemId) => {
  const item = collectedItems.value.find(i => i.id === itemId)
  return item ? item.name : '未知物品'
}

// 潜望镜旋转控制
const startRotation = (event) => {
  isRotating.value = true
  showPeriscopeHint.value = false

  const clientX = event.touches ? event.touches[0].clientX : event.clientX
  rotationStartX = clientX
  rotationStartAngle = periscopeAngle.value
}

const onRotation = (event) => {
  if (!isRotating.value) return

  event.preventDefault()

  const clientX = event.touches ? event.touches[0].clientX : event.clientX
  const deltaX = clientX - rotationStartX
  const rotationDelta = deltaX * 0.5

  periscopeAngle.value = rotationStartAngle + rotationDelta

  // 限制角度范围
  if (periscopeAngle.value > 180) periscopeAngle.value = 180
  if (periscopeAngle.value < -180) periscopeAngle.value = -180
}

const endRotation = () => {
  if (isRotating.value) {
    isRotating.value = false

    // 添加日志记录
    if (Math.abs(periscopeAngle.value) > 10) {
      addLogEntry(`调整潜望镜角度至 ${Math.round(periscopeAngle.value)}°`)
    }
  }
}

// 按钮光效触发
const triggerButtonEffect = (type) => {
  if (type === 'dive') {
    showDiveEffect.value = true
    setTimeout(() => {
      showDiveEffect.value = false
    }, 500)
  } else if (type === 'surface') {
    showSurfaceEffect.value = true
    setTimeout(() => {
      showSurfaceEffect.value = false
    }, 500)
  }
}



const addLogEntry = (text) => {
  const now = new Date()
  const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`
  logEntries.value.unshift({
    time,
    depth: currentDepth.value,
    text
  })

  // 只保留最近50条日志
  if (logEntries.value.length > 50) {
    logEntries.value = logEntries.value.slice(0, 50)
  }
}

// 退出世界
const exitWorld = async () => {
  // 自动保存进度
  saveGameProgress()

  isTransitioning.value = true
  await nextTick()
  setTimeout(() => {
    router.push('/universe')
  }, 800)
}

// === 存档系统 ===

// 保存游戏进度
const saveGameProgress = () => {
  try {
    const saveData = {
      version: '1.0.0',
      timestamp: Date.now(),
      currentDepth: currentDepth.value,
      exploredZones: exploredZones.value,
      collectedItems: collectedItems.value.map(item => ({
        id: item.id,
        collected: item.collected
      })),
      logEntries: logEntries.value.slice(0, 20), // 只保存最近20条日志
      periscopeAngle: periscopeAngle.value
    }

    localStorage.setItem('nightSubmarine_save', JSON.stringify(saveData))
    console.log('游戏进度已保存')
  } catch (error) {
    console.error('保存进度失败:', error)
  }
}

// 加载游戏进度
const loadGameProgress = () => {
  try {
    const saveDataStr = localStorage.getItem('nightSubmarine_save')
    if (!saveDataStr) {
      console.log('未找到存档，开始新游戏')
      return false
    }

    const saveData = JSON.parse(saveDataStr)

    // 恢复深度
    currentDepth.value = saveData.currentDepth || 0

    // 恢复已探索区域
    exploredZones.value = saveData.exploredZones || [0]

    // 恢复收集物品
    if (saveData.collectedItems && Array.isArray(saveData.collectedItems)) {
      saveData.collectedItems.forEach(savedItem => {
        const item = collectedItems.value.find(i => i.id === savedItem.id)
        if (item) {
          item.collected = savedItem.collected
        }
      })
    }

    // 恢复日志
    if (saveData.logEntries && Array.isArray(saveData.logEntries)) {
      logEntries.value = saveData.logEntries
    }

    // 恢复潜望镜角度
    periscopeAngle.value = saveData.periscopeAngle || 0

    console.log('游戏进度已加载')
    addLogEntry('欢迎回来，继续探索深海')
    return true
  } catch (error) {
    console.error('加载存档失败:', error)
    return false
  }
}

// 删除存档
const deleteSave = () => {
  try {
    localStorage.removeItem('nightSubmarine_save')
    console.log('存档已删除')
    addLogEntry('存档已清除，重新开始探索')
    return true
  } catch (error) {
    console.error('删除存档失败:', error)
    return false
  }
}

// 检查是否存在存档
const hasSaveData = () => {
  return !!localStorage.getItem('nightSubmarine_save')
}

// === 设置面板相关方法 ===

// 切换自动保存
const toggleAutoSave = () => {
  autoSaveEnabled.value = !autoSaveEnabled.value
  addLogEntry(`自动保存已${autoSaveEnabled.value ? '开启' : '关闭'}`)
}

// 切换提示显示
const toggleHints = () => {
  showHints.value = !showHints.value
  showPeriscopeHint.value = showHints.value
  addLogEntry(`提示显示已${showHints.value ? '开启' : '关闭'}`)
}

// 手动保存
const manualSave = () => {
  saveGameProgress()
  addLogEntry('✓ 游戏已手动保存')
}

// 手动加载
const manualLoad = () => {
  const success = loadGameProgress()
  if (success) {
    addLogEntry('✓ 存档已读取')
  } else {
    addLogEntry('✗ 未找到存档')
  }
}

// 确认删除存档
const confirmDeleteSave = () => {
  if (confirm('确定要删除存档吗？此操作不可恢复。')) {
    deleteSave()
    saveInfo.value = null
  }
}

// 更新存档信息显示
const updateSaveInfo = () => {
  try {
    const saveDataStr = localStorage.getItem('nightSubmarine_save')
    if (saveDataStr) {
      const saveData = JSON.parse(saveDataStr)
      const timestamp = new Date(saveData.timestamp)
      saveInfo.value = {
        version: saveData.version,
        timestamp: `${timestamp.toLocaleDateString()} ${timestamp.toLocaleTimeString()}`,
        depth: saveData.currentDepth,
        exploredZones: saveData.exploredZones?.length || 0,
        collected: saveData.collectedItems?.filter(i => i.collected).length || 0,
        total: collectedItems.value.length
      }
    } else {
      saveInfo.value = null
    }
  } catch (error) {
    console.error('读取存档信息失败:', error)
    saveInfo.value = null
  }
}

// === 键盘快捷键处理 ===
const handleKeyboard = (event) => {
  // 如果模态框打开，只响应ESC键
  if (showCollection.value || showLog.value || showMap.value || showSettings.value) {
    if (event.key === 'Escape') {
      showCollection.value = false
      showLog.value = false
      showMap.value = false
      showSettings.value = false
    }
    return
  }

  // 开场叙事期间不响应快捷键
  if (showOpeningNarrative.value) {
    return
  }

  switch(event.key) {
    case 'ArrowDown':
    case 's':
    case 'S':
      event.preventDefault()
      diveDeeper()
      break
    case 'ArrowUp':
    case 'w':
    case 'W':
      event.preventDefault()
      surface()
      break
    case 'm':
    case 'M':
      event.preventDefault()
      showMap.value = !showMap.value
      if (showMap.value) updateSaveInfo()
      break
    case 'c':
    case 'C':
      event.preventDefault()
      showCollection.value = !showCollection.value
      break
    case 'l':
    case 'L':
      event.preventDefault()
      showLog.value = !showLog.value
      break
    case 'Escape':
      event.preventDefault()
      showSettings.value = !showSettings.value
      if (showSettings.value) updateSaveInfo()
      break
  }
}

// 海洋粒子类
class OceanParticle {
  constructor(canvasWidth, canvasHeight, depth) {
    this.canvasWidth = canvasWidth
    this.canvasHeight = canvasHeight
    this.depth = depth
    this.reset()
  }

  reset() {
    this.x = Math.random() * this.canvasWidth
    this.y = this.canvasHeight + 20
    this.size = Math.random() * 3 + 1
    this.speedY = Math.random() * 0.5 + 0.2
    this.speedX = Math.random() * 0.2 - 0.1
    this.opacity = Math.random() * 0.5 + 0.2

    // 根据深度设置颜色
    const progress = this.depth / 3800
    if (progress < 0.05) {
      this.color = `rgba(135, 206, 235, ${this.opacity})`
    } else if (progress < 0.2) {
      this.color = `rgba(100, 149, 237, ${this.opacity})`
    } else if (progress < 0.4) {
      this.color = `rgba(70, 130, 180, ${this.opacity})`
    } else if (progress < 0.65) {
      this.color = `rgba(65, 105, 225, ${this.opacity})`
    } else if (progress < 0.85) {
      this.color = `rgba(25, 25, 112, ${this.opacity})`
    } else {
      this.color = `rgba(100, 100, 100, ${this.opacity * 0.3})`
    }
  }

  update() {
    this.y -= this.speedY
    this.x += this.speedX

    if (this.y < -20) {
      this.reset()
    }

    if (this.x > this.canvasWidth + 20) this.x = -20
    if (this.x < -20) this.x = this.canvasWidth + 20
  }

  draw(ctx) {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fillStyle = this.color
    ctx.fill()
  }
}

// 初始化海洋Canvas
const initOceanCanvas = () => {
  if (!oceanCanvas.value) return

  const canvas = oceanCanvas.value
  oceanCtx = canvas.getContext('2d')

  // 设置Canvas尺寸
  const resizeCanvas = () => {
    const rect = canvas.parentElement.getBoundingClientRect()
    canvas.width = rect.width
    canvas.height = rect.height
  }

  resizeCanvas()

  // 创建粒子
  const createParticles = () => {
    particles = []
    const particleCount = 100
    for (let i = 0; i < particleCount; i++) {
      particles.push(new OceanParticle(canvas.width, canvas.height, currentDepth.value))
    }
  }

  createParticles()

  // 动画循环
  const animate = () => {
    oceanCtx.clearRect(0, 0, canvas.width, canvas.height)

    particles.forEach(particle => {
      particle.update()
      particle.draw(oceanCtx)
    })

    animationId = requestAnimationFrame(animate)
  }

  animationId = requestAnimationFrame(animate)

  // 监听尺寸变化
  const resizeObserver = new ResizeObserver(() => {
    resizeCanvas()
    createParticles()
  })

  resizeObserver.observe(canvas.parentElement)

  // 保存observer用于清理
  canvas._resizeObserver = resizeObserver
}

// 监听深度变化
watch(currentDepth, (newDepth) => {
  if (oceanCtx) {
    // 更新粒子颜色
    particles.forEach(particle => {
      particle.depth = newDepth
      const progress = newDepth / 3800
      if (progress < 0.05) {
        particle.color = `rgba(135, 206, 235, ${particle.opacity})`
      } else if (progress < 0.2) {
        particle.color = `rgba(100, 149, 237, ${particle.opacity})`
      } else if (progress < 0.4) {
        particle.color = `rgba(70, 130, 180, ${particle.opacity})`
      } else if (progress < 0.65) {
        particle.color = `rgba(65, 105, 225, ${particle.opacity})`
      } else if (progress < 0.85) {
        particle.color = `rgba(25, 25, 112, ${particle.opacity})`
      } else {
        particle.color = `rgba(100, 100, 100, ${particle.opacity * 0.3})`
      }
    })
  }
})

// 初始化收集物品数据
const initCollection = () => {
  // 这里暂时用空数组，稍后从submarineData加载
  collectedItems.value = submarineData.collections || []
}

onMounted(async () => {
  // 跃迁动画：1.8秒后消失
  setTimeout(() => {
    showWarp.value = false
  }, 1800)

  await nextTick()

  // 初始化海洋Canvas
  initOceanCanvas()

  // 初始化收集物品
  initCollection()

  // 添加键盘事件监听
  window.addEventListener('keydown', handleKeyboard)

  // 尝试加载存档
  const hasSave = hasSaveData()
  if (hasSave) {
    setTimeout(() => {
      loadGameProgress()
      // 如果有存档，不显示开场叙事
      showOpeningNarrative.value = false
    }, 2000)
  } else {
    // 新游戏，显示开场叙事
    setTimeout(() => {
      // 等待用户点击"开始探索"
    }, 2000)
  }
})

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }

  if (oceanCanvas.value && oceanCanvas.value._resizeObserver) {
    oceanCanvas.value._resizeObserver.disconnect()
  }

  // 移除键盘事件监听
  window.removeEventListener('keydown', handleKeyboard)
})
</script>

<style scoped>
/* 全局隐藏滚动条但保持滚动功能 */
* {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

*::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

.night-submarine {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(180deg, #0a1628 0%, #0d1b2a 50%, #1b263b 100%);
  overflow: hidden;
  z-index: 1000;
}

/* === 跃迁动画 === */
.warp-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #0d1b2a;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5000;
}

.warp-circle {
  width: 300px;
  height: 300px;
  border: 1px solid rgba(100, 149, 237, 0.3);
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
  border: 1px solid rgba(100, 149, 237, 0.5);
  border-radius: 50%;
  animation: warp-pulse 1s ease-in-out infinite;
}

.warp-text {
  position: absolute;
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  letter-spacing: 0.3em;
  color: rgba(100, 149, 237, 0.8);
  animation: warp-fade 1.5s ease-out forwards;
}

@keyframes warp-expand {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: scale(3);
    opacity: 0;
  }
}

@keyframes warp-pulse {
  0%, 100% {
    transform: translate(-50%, -50%) scale(1);
  }
  50% {
    transform: translate(-50%, -50%) scale(1.1);
  }
}

@keyframes warp-fade {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  50% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
  }
}

.warp-enter-active,
.warp-leave-active {
  transition: opacity 0.5s ease;
}

.warp-enter-from,
.warp-leave-to {
  opacity: 0;
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
  background: rgba(100, 149, 237, 0.1);
  border: 1px solid rgba(100, 149, 237, 0.3);
  color: #e0e0e0;
  backdrop-filter: blur(10px);
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 3000;
  border-radius: 8px;
}

.exit-btn:hover {
  background: rgba(100, 149, 237, 0.2);
  border-color: rgba(100, 149, 237, 0.5);
  transform: translateX(-3px);
  box-shadow: 0 4px 12px rgba(100, 149, 237, 0.3);
}

.exit-btn svg {
  width: 16px;
  height: 16px;
}

/* === 开场叙事 === */
.opening-narrative {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2500;
  max-width: 600px;
  width: 90%;
  text-align: center;
  padding: 3rem;
  background: rgba(13, 27, 42, 0.95);
  border: 1px solid rgba(100, 149, 237, 0.3);
  border-radius: 12px;
  backdrop-filter: blur(20px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
}

.narrative-text {
  font-family: 'Inter', sans-serif;
  font-size: 1.4rem;
  font-weight: 300;
  color: #e0e0e0;
  line-height: 1.8;
  letter-spacing: 0.05em;
  margin: 0 0 2.5rem 0;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.narrative-continue-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin: 0 auto;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, rgba(100, 149, 237, 0.2) 0%, rgba(100, 149, 237, 0.1) 100%);
  border: 1px solid rgba(100, 149, 237, 0.4);
  border-radius: 8px;
  color: #6495ED;
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
}

.narrative-continue-btn:hover {
  background: linear-gradient(135deg, rgba(100, 149, 237, 0.3) 0%, rgba(100, 149, 237, 0.2) 100%);
  border-color: rgba(100, 149, 237, 0.6);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(100, 149, 237, 0.4);
}

.narrative-continue-btn svg {
  width: 18px;
  height: 18px;
  transition: transform 0.3s ease;
}

.narrative-continue-btn:hover svg {
  transform: translateX(3px);
}

.narrative-fade-enter-active {
  transition: all 0.6s ease;
}

.narrative-fade-leave-active {
  transition: all 0.4s ease;
}

.narrative-fade-enter-from {
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.9);
}

.narrative-fade-leave-to {
  opacity: 0;
  transform: translate(-50%, -50%) scale(1.05);
}

/* === 驾驶舱装饰 === */
.cockpit-decoration {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
  z-index: 100;
}

/* 管道装饰 */
.pipe {
  position: absolute;
  top: 0;
  width: 60px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 2rem 0;
}

.pipe-left {
  left: 0;
  border-right: 2px solid rgba(100, 149, 237, 0.1);
}

.pipe-right {
  right: 0;
  border-left: 2px solid rgba(100, 149, 237, 0.1);
}

.pipe-segment {
  flex: 1;
  margin: 0.5rem 0;
  background: linear-gradient(90deg,
    rgba(100, 149, 237, 0.05) 0%,
    rgba(100, 149, 237, 0.1) 50%,
    rgba(100, 149, 237, 0.05) 100%
  );
  border: 1px solid rgba(100, 149, 237, 0.15);
  border-radius: 4px;
  position: relative;
  overflow: hidden;
}

.pipe-segment::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg,
    transparent 0%,
    rgba(100, 149, 237, 0.1) 50%,
    transparent 100%
  );
  animation: pipe-shine 3s ease-in-out infinite;
}

.pipe-left .pipe-segment::before {
  animation-delay: calc(var(--index) * 0.2s);
}

.pipe-right .pipe-segment::before {
  animation-delay: calc(var(--index) * 0.2s + 1.5s);
}

@keyframes pipe-shine {
  0% {
    left: -100%;
  }
  50% {
    left: 100%;
  }
  100% {
    left: 100%;
  }
}

/* 顶部灯饰 */
.ceiling-lights {
  position: absolute;
  top: 1rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8rem;
  z-index: 150;
}

.light {
  width: 80px;
  height: 8px;
  background: rgba(100, 149, 237, 0.2);
  border-radius: 4px;
  position: relative;
  box-shadow: 0 0 20px rgba(100, 149, 237, 0.3);
  animation: light-pulse 4s ease-in-out infinite;
}

.light::before {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
  height: 100px;
  background: linear-gradient(180deg,
    rgba(100, 149, 237, 0.15) 0%,
    transparent 100%
  );
  pointer-events: none;
}

.light-1 {
  animation-delay: 0s;
}

.light-2 {
  animation-delay: 1.3s;
}

.light-3 {
  animation-delay: 2.6s;
}

@keyframes light-pulse {
  0%, 100% {
    opacity: 0.6;
    box-shadow: 0 0 20px rgba(100, 149, 237, 0.3);
  }
  50% {
    opacity: 1;
    box-shadow: 0 0 30px rgba(100, 149, 237, 0.5);
  }
}

/* === 潜水艇驾驶舱 === */
.submarine-cockpit {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 2.5rem 2rem 2rem;
  position: relative;
  z-index: 200;
  overflow-y: auto;
  overflow-x: hidden;
  /* 隐藏滚动条 */
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.submarine-cockpit::-webkit-scrollbar {
  display: none;
}

/* === 仪表盘区域 === */
.dashboard-gauges {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0.875rem 0;
  margin-bottom: 1.25rem;
  background: rgba(100, 149, 237, 0.05);
  border: 1px solid rgba(100, 149, 237, 0.15);
  border-radius: 8px;
  backdrop-filter: blur(10px);
}

.gauge-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.gauge-label {
  font-family: 'Inter', sans-serif;
  font-size: 0.6rem;
  color: rgba(100, 149, 237, 0.7);
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.gauge {
  position: relative;
  width: 70px;
  height: 70px;
}

.gauge-svg {
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 0 10px rgba(100, 149, 237, 0.3));
}

.gauge-progress {
  transition: stroke-dashoffset 0.5s ease;
}

.gauge-value {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  color: #6495ED;
}

.gauge-unit {
  font-family: 'Inter', sans-serif;
  font-size: 0.55rem;
  color: rgba(224, 224, 224, 0.5);
  letter-spacing: 0.1em;
}

/* 特殊仪表效果 */
.pressure-gauge .gauge-progress {
  stroke: #FF6B6B;
}

.temperature-gauge .gauge-progress {
  stroke: #4ECDC4;
}

.oxygen-gauge .gauge-progress {
  stroke: #95E1D3;
}

.energy-gauge .gauge-progress {
  stroke: #FFE66D;
}


/* === 顶部信息栏 === */
.cockpit-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  margin-bottom: 2rem;
  border-bottom: 1px solid rgba(100, 149, 237, 0.2);
}

.depth-indicator {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.depth-label {
  font-family: 'Inter', sans-serif;
  font-size: 0.65rem;
  color: rgba(100, 149, 237, 0.7);
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.depth-value {
  font-family: 'Inter', sans-serif;
  font-size: 2rem;
  font-weight: 600;
  color: #6495ED;
  letter-spacing: 0.1em;
}

.depth-bar {
  width: 200px;
  height: 4px;
  background: rgba(100, 149, 237, 0.2);
  border-radius: 2px;
  overflow: hidden;
}

.depth-progress {
  height: 100%;
  background: linear-gradient(90deg, #6495ED 0%, #4169E1 100%);
  transition: width 0.5s ease;
}

.location-indicator {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.25rem;
}

.location-name {
  font-family: 'Inter', sans-serif;
  font-size: 1.1rem;
  font-weight: 600;
  color: #e0e0e0;
  letter-spacing: 0.1em;
}

.location-description {
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  color: rgba(224, 224, 224, 0.6);
  letter-spacing: 0.1em;
}

/* === 舷窗视野 === */
.porthole-view {
  position: relative;
  flex: 0 1 auto;
  max-height: 50vh;
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
}

/* 发现提示 */
.discovery-hint {
  position: absolute;
  top: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.5rem;
  background: linear-gradient(135deg, rgba(255, 215, 0, 0.15) 0%, rgba(255, 215, 0, 0.05) 100%);
  border: 2px solid rgba(255, 215, 0, 0.4);
  border-radius: 12px;
  backdrop-filter: blur(20px);
  box-shadow: 0 10px 40px rgba(255, 215, 0, 0.3);
  cursor: pointer;
  z-index: 400;
  transition: all 0.3s ease;
  animation: discovery-pulse 2s ease-in-out infinite;
}

.discovery-hint:hover {
  transform: translateX(-50%) scale(1.05);
  border-color: rgba(255, 215, 0, 0.6);
  box-shadow: 0 15px 50px rgba(255, 215, 0, 0.4);
}

@keyframes discovery-pulse {
  0%, 100% {
    box-shadow: 0 10px 40px rgba(255, 215, 0, 0.3);
  }
  50% {
    box-shadow: 0 15px 50px rgba(255, 215, 0, 0.5);
  }
}

.discovery-icon {
  font-size: 2rem;
  animation: icon-spin 3s linear infinite;
}

@keyframes icon-spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.discovery-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.discovery-title {
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  color: #FFD700;
  letter-spacing: 0.1em;
}

.discovery-desc {
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  color: rgba(224, 224, 224, 0.8);
}

.discovery-action {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(255, 215, 0, 0.2);
  border: 1px solid rgba(255, 215, 0, 0.4);
  border-radius: 20px;
  color: #FFD700;
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
}

.discovery-action svg {
  width: 16px;
  height: 16px;
  transition: transform 0.3s ease;
}

.discovery-hint:hover .discovery-action svg {
  transform: translateX(3px);
}

/* 发现提示动画 */
.discovery-enter-active {
  transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.discovery-leave-active {
  transition: all 0.3s ease;
}

.discovery-enter-from {
  opacity: 0;
  transform: translateX(-50%) translateY(-20px) scale(0.9);
}

.discovery-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(-20px) scale(0.95);
}

/* 潜望镜提示 */
.periscope-hint {
  position: absolute;
  top: 1rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: rgba(100, 149, 237, 0.15);
  border: 1px solid rgba(100, 149, 237, 0.3);
  border-radius: 20px;
  color: #6495ED;
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  z-index: 300;
  animation: hint-pulse 2s ease-in-out infinite;
  pointer-events: none;
}

.periscope-hint svg {
  width: 16px;
  height: 16px;
  animation: hint-cursor 1.5s ease-in-out infinite;
}

@keyframes hint-pulse {
  0%, 100% {
    opacity: 0.7;
    transform: translateX(-50%) scale(1);
  }
  50% {
    opacity: 1;
    transform: translateX(-50%) scale(1.05);
  }
}

@keyframes hint-cursor {
  0%, 100% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(5px);
  }
}

.porthole-frame {
  position: relative;
  width: 100%;
  max-width: 700px;
  aspect-ratio: 1;
  border-radius: 50%;
  border: 12px solid #1a1a1a;
  box-shadow:
    inset 0 0 30px rgba(0, 0, 0, 0.8),
    0 0 40px rgba(100, 149, 237, 0.3);
  overflow: hidden;
  cursor: grab;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.porthole-frame:hover {
  border-color: #2a2a2a;
  box-shadow:
    inset 0 0 30px rgba(0, 0, 0, 0.8),
    0 0 50px rgba(100, 149, 237, 0.4);
}

.porthole-frame.is-rotating {
  cursor: grabbing;
}

.porthole-glass {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  transition: background 1s ease;
}

.external-view {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
  transition: transform 0.1s ease-out;
}

/* 海洋生物装饰 */
.sea-creatures {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.sea-creature {
  position: absolute;
  font-size: 2rem;
  transition: all 0.3s ease;
  filter: blur(0.5px);
}

.sea-creature.jellyfish {
  animation: float 6s ease-in-out infinite;
}

.sea-creature.fish {
  animation: swim 8s ease-in-out infinite;
}

.sea-creature.starfish {
  animation: pulse 4s ease-in-out infinite;
}

.sea-creature.bubble {
  animation: rise 5s ease-in-out infinite;
}

.sea-creature.seaweed {
  animation: sway 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

@keyframes swim {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(30px); }
}

@keyframes pulse {
  0%, 100% { opacity: 0.4; transform: scale(0.7); }
  50% { opacity: 0.6; transform: scale(0.8); }
}

@keyframes rise {
  0% { transform: translateY(50px); opacity: 0; }
  50% { opacity: 0.7; }
  100% { transform: translateY(-50px); opacity: 0; }
}

@keyframes sway {
  0%, 100% { transform: rotate(-10deg); }
  50% { transform: rotate(10deg); }
}

/* 潜望镜十字线 */
.periscope-crosshair {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 100;
}

.crosshair-horizontal,
.crosshair-vertical {
  position: absolute;
  background: rgba(100, 149, 237, 0.3);
}

.crosshair-horizontal {
  top: 50%;
  left: 10%;
  width: 80%;
  height: 1px;
  transform: translateY(-50%);
}

.crosshair-vertical {
  left: 50%;
  top: 10%;
  width: 1px;
  height: 80%;
  transform: translateX(-50%);
}

.crosshair-circle {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
  border: 1px solid rgba(100, 149, 237, 0.2);
  border-radius: 50%;
}

/* 角度指示器 */
.angle-indicator {
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  padding: 0.5rem 1rem;
  background: rgba(0, 0, 0, 0.6);
  border: 1px solid rgba(100, 149, 237, 0.3);
  border-radius: 4px;
  backdrop-filter: blur(10px);
  z-index: 100;
}

.angle-value {
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  color: #6495ED;
  letter-spacing: 0.1em;
}

.ocean-canvas {
  width: 100%;
  height: 100%;
  display: block;
}

.depth-markers {
  position: absolute;
  right: -60px;
  top: 0;
  bottom: 0;
  width: 50px;
}

.depth-marker {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  opacity: 0.4;
  transition: opacity 0.3s ease;
}

.depth-marker.active {
  opacity: 1;
}

.marker-depth {
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  color: #6495ED;
  font-weight: 600;
}

.marker-label {
  font-family: 'Inter', sans-serif;
  font-size: 0.55rem;
  color: rgba(224, 224, 224, 0.6);
  writing-mode: vertical-rl;
  text-orientation: mixed;
}

/* === 控制台 === */
.control-panel {
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  gap: 3rem;
  padding: 1.5rem;
  background: rgba(100, 149, 237, 0.05);
  border: 1px solid rgba(100, 149, 237, 0.2);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  z-index: 300;
}

/* 状态指示灯 */
.control-status-lights {
  position: absolute;
  top: -0.75rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(13, 27, 42, 0.9);
  border: 1px solid rgba(100, 149, 237, 0.2);
  border-radius: 20px;
  z-index: 10;
}

.status-light {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  opacity: 0.3;
  transition: all 0.3s ease;
  box-shadow: 0 0 5px currentColor;
}

.status-light.active {
  opacity: 1;
  box-shadow: 0 0 10px currentColor, 0 0 20px currentColor;
  animation: light-pulse 2s ease-in-out infinite;
}

.status-light.warning {
  opacity: 0.6;
  animation: warning-blink 1s ease-in-out infinite;
}

@keyframes warning-blink {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
}

.control-group {
  display: flex;
  gap: 1rem;
}

.control-btn {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 1.5rem;
  background: rgba(100, 149, 237, 0.1);
  border: 1px solid rgba(100, 149, 237, 0.3);
  border-radius: 8px;
  color: #e0e0e0;
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;
}

.control-btn:hover:not(.disabled) {
  background: rgba(100, 149, 237, 0.2);
  border-color: rgba(100, 149, 237, 0.5);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(100, 149, 237, 0.3);
}

.control-btn:active:not(.disabled) {
  transform: translateY(0);
}

.control-btn.disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.control-btn svg {
  width: 20px;
  height: 20px;
  position: relative;
  z-index: 1;
}

/* 按钮发光效果 */
.btn-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(100, 149, 237, 0.4) 0%, transparent 70%);
  transform: translate(-50%, -50%);
  transition: all 0.5s ease;
  pointer-events: none;
}

.control-btn:active .btn-glow {
  width: 200%;
  height: 200%;
  opacity: 0;
}

/* 环境光效层 */
.ambient-lighting {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 50;
  opacity: 0;
  transition: opacity 0.5s ease;
}

.ambient-lighting.dive-effect {
  background: radial-gradient(circle at center, rgba(100, 149, 237, 0.2) 0%, transparent 70%);
  opacity: 1;
  animation: dive-flash 0.5s ease-out;
}

.ambient-lighting.surface-effect {
  background: radial-gradient(circle at center, rgba(78, 205, 196, 0.2) 0%, transparent 70%);
  opacity: 1;
  animation: surface-flash 0.5s ease-out;
}

@keyframes dive-flash {
  0% {
    opacity: 0.8;
    transform: scale(0.8);
  }
  100% {
    opacity: 0;
    transform: scale(1.5);
  }
}

@keyframes surface-flash {
  0% {
    opacity: 0.8;
    transform: scale(0.8);
  }
  100% {
    opacity: 0;
    transform: scale(1.5);
  }
}

/* === 成就通知 === */
.achievement-notification {
  position: fixed;
  top: 2rem;
  right: 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: rgba(13, 27, 42, 0.95);
  border: 2px solid rgba(255, 215, 0, 0.5);
  border-radius: 12px;
  backdrop-filter: blur(20px);
  box-shadow: 0 10px 40px rgba(255, 215, 0, 0.3);
  z-index: 6000;
  max-width: 350px;
}

.achievement-icon {
  font-size: 2.5rem;
  animation: trophy-shine 2s ease-in-out infinite;
}

@keyframes trophy-shine {
  0%, 100% {
    transform: scale(1) rotate(0deg);
  }
  25% {
    transform: scale(1.1) rotate(-5deg);
  }
  75% {
    transform: scale(1.1) rotate(5deg);
  }
}

.achievement-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.achievement-title {
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  font-weight: 600;
  color: rgba(255, 215, 0, 0.8);
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.achievement-name {
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  color: #FFD700;
}

.achievement-desc {
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  color: rgba(224, 224, 224, 0.7);
  line-height: 1.4;
}

/* 成就通知动画 */
.achievement-enter-active {
  transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.achievement-leave-active {
  transition: all 0.3s ease;
}

.achievement-enter-from {
  opacity: 0;
  transform: translateX(100%) scale(0.8);
}

.achievement-leave-to {
  opacity: 0;
  transform: translateX(50%) scale(0.9);
}

/* === 探索模态框 === */
.explore-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(20px);
  z-index: 5000;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
  padding: 2rem;
}

.explore-modal-content {
  background: linear-gradient(180deg, #0d1b2a 0%, #1b263b 100%);
  border: 2px solid rgba(100, 149, 237, 0.3);
  border-radius: 16px;
  max-width: 900px;
  width: 100%;
  max-height: 90vh;
  overflow: hidden;
  box-shadow: 0 30px 90px rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
}

/* 探索头部 */
.explore-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1.5rem;
  background: rgba(100, 149, 237, 0.1);
  border-bottom: 2px solid rgba(100, 149, 237, 0.2);
  flex-shrink: 0;
}

.explore-back-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  background: rgba(100, 149, 237, 0.15);
  border: 1px solid rgba(100, 149, 237, 0.3);
  border-radius: 8px;
  color: #e0e0e0;
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  cursor: pointer;
  transition: all 0.3s ease;
}

.explore-back-btn:hover {
  background: rgba(100, 149, 237, 0.25);
  border-color: rgba(100, 149, 237, 0.5);
  transform: translateX(-3px);
}

.explore-back-btn svg {
  width: 18px;
  height: 18px;
}

.explore-title {
  font-family: 'Inter', sans-serif;
  font-size: 1.5rem;
  font-weight: 600;
  color: #e0e0e0;
  letter-spacing: 0.1em;
  margin: 0;
}

.explore-progress {
  padding: 0.5rem 1rem;
  background: rgba(100, 149, 237, 0.15);
  border: 1px solid rgba(100, 149, 237, 0.3);
  border-radius: 20px;
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  color: #6495ED;
  font-weight: 600;
}

/* 探索主体 */
.explore-body {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 2rem;
  /* 保持滚动但隐藏滚动条 */
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.explore-body::-webkit-scrollbar {
  display: none;
}

.world-intro {
  margin-bottom: 1.5rem;
  padding: 1rem 1.25rem;
  background: rgba(100, 149, 237, 0.05);
  border-left: 4px solid #6495ED;
  border-radius: 4px;
}

.world-narrative {
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  color: #e0e0e0;
  line-height: 1.8;
  margin: 0;
  font-style: italic;
}

/* 场景选择 */
.scene-selection {
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
}

.scene-card {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  padding: 1.25rem;
  background: rgba(100, 149, 237, 0.08);
  border: 1px solid rgba(100, 149, 237, 0.2);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.scene-card:hover {
  background: rgba(100, 149, 237, 0.15);
  border-color: rgba(100, 149, 237, 0.4);
  transform: translateX(8px);
  box-shadow: 0 8px 25px rgba(100, 149, 237, 0.2);
}

.scene-icon {
  font-size: 2.75rem;
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(100, 149, 237, 0.1);
  border-radius: 12px;
  flex-shrink: 0;
}

.scene-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.scene-name {
  font-family: 'Inter', sans-serif;
  font-size: 1.1rem;
  font-weight: 600;
  color: #e0e0e0;
  margin: 0;
}

.scene-desc {
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  color: rgba(224, 224, 224, 0.7);
  margin: 0;
  line-height: 1.5;
}

.scene-items {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.scene-item {
  font-size: 1.2rem;
  opacity: 0.3;
  transition: all 0.3s ease;
}

.scene-item.collected {
  opacity: 1;
  filter: drop-shadow(0 0 5px currentColor);
}

.scene-arrow {
  color: #6495ED;
  transition: transform 0.3s ease;
}

.scene-card:hover .scene-arrow {
  transform: translateX(5px);
}

.scene-arrow svg {
  width: 24px;
  height: 24px;
}

/* 蘑菇森林样式 */
.mushroom-selection {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.25rem;
  padding: 1rem 0;
}

.mushroom-card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.875rem;
  padding: 1.5rem 1.25rem;
  background: rgba(34, 139, 34, 0.05);
  border: 2px solid rgba(34, 139, 34, 0.2);
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;
  opacity: 0;
  animation: mushroom-fade-in 0.6s ease-out forwards;
}

/* 为每个蘑菇卡片添加延迟动画 */
.mushroom-card:nth-child(1) { animation-delay: 0.1s; }
.mushroom-card:nth-child(2) { animation-delay: 0.2s; }
.mushroom-card:nth-child(3) { animation-delay: 0.3s; }
.mushroom-card:nth-child(4) { animation-delay: 0.4s; }
.mushroom-card:nth-child(5) { animation-delay: 0.5s; }

@keyframes mushroom-fade-in {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.mushroom-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.3) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 0;
}

.mushroom-card:hover::before {
  opacity: 1;
}

.mushroom-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 35px rgba(34, 139, 34, 0.3);
  border-color: rgba(34, 139, 34, 0.5);
}

.mushroom-glow {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  opacity: 0.15;
  filter: blur(60px);
  z-index: 0;
  animation: mushroom-pulse 3s ease-in-out infinite;
}

@keyframes mushroom-pulse {
  0%, 100% {
    opacity: 0.1;
    transform: scale(1);
  }
  50% {
    opacity: 0.2;
    transform: scale(1.1);
  }
}

.mushroom-icon {
  font-size: 4rem;
  z-index: 1;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
  animation: mushroom-bob 4s ease-in-out infinite;
}

@keyframes mushroom-bob {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
}

.mushroom-info {
  text-align: center;
  z-index: 1;
}

.mushroom-name {
  font-family: 'Inter', sans-serif;
  font-size: 1.2rem;
  font-weight: 700;
  color: #90EE90;
  margin: 0 0 0.5rem 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.mushroom-desc {
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  color: rgba(144, 238, 144, 0.8);
  margin: 0 0 1rem 0;
  line-height: 1.4;
}

.spore-indicator {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.8rem;
  background: rgba(34, 139, 34, 0.2);
  border: 1px solid rgba(34, 139, 34, 0.4);
  border-radius: 20px;
  font-size: 0.75rem;
  color: #90EE90;
  font-weight: 600;
  transition: all 0.3s ease;
}

.spore-indicator.collected {
  background: rgba(255, 215, 0, 0.2);
  border-color: rgba(255, 215, 0, 0.5);
  color: #FFD700;
}

.mushroom-arrow {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  width: 24px;
  height: 24px;
  color: #90EE90;
  opacity: 0;
  transform: translateX(-10px);
  transition: all 0.3s ease;
  z-index: 1;
}

.mushroom-card:hover .mushroom-arrow {
  opacity: 1;
  transform: translateX(0);
}

.mushroom-arrow svg {
  width: 24px;
  height: 24px;
}

/* 竹峰寺古寺样式 */
.location-selection {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1rem 0;
}

.location-card {
  position: relative;
  display: flex;
  gap: 1.5rem;
  padding: 1.5rem;
  background: rgba(139, 69, 19, 0.08);
  border: 2px solid rgba(139, 69, 19, 0.25);
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.4s ease;
  overflow: hidden;
  opacity: 0;
  animation: location-fade-in 0.8s ease-out forwards;
}

.location-card:nth-child(1) { animation-delay: 0.1s; }
.location-card:nth-child(2) { animation-delay: 0.3s; }
.location-card:nth-child(3) { animation-delay: 0.5s; }

@keyframes location-fade-in {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.location-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: linear-gradient(180deg, #8B4513 0%, #D2691E 50%, #8B4513 100%);
  opacity: 0.6;
  transition: width 0.3s ease;
}

.location-card:hover {
  background: rgba(139, 69, 19, 0.15);
  border-color: rgba(210, 105, 30, 0.5);
  transform: translateX(8px);
  box-shadow: 0 8px 30px rgba(139, 69, 19, 0.3);
}

.location-card:hover::before {
  width: 6px;
}

.location-image {
  position: relative;
  width: 120px;
  height: 120px;
  flex-shrink: 0;
}

.location-bg {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  overflow: hidden;
}

.location-bg.location-gate {
  background: linear-gradient(135deg, #2F1810 0%, #5C4033 50%, #2F1810 100%);
  border: 2px solid rgba(139, 69, 19, 0.4);
}

.location-bg.location-hall {
  background: linear-gradient(135deg, #1A1A1A 0%, #4A4A4A 50%, #1A1A1A 100%);
  border: 2px solid rgba(74, 74, 74, 0.6);
}

.location-bg.location-backyard {
  background: linear-gradient(135deg, #1B4D1B 0%, #228B22 50%, #1B4D1B 100%);
  border: 2px solid rgba(34, 139, 34, 0.4);
}

.location-icon {
  font-size: 3.5rem;
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.5));
  animation: icon-glow 3s ease-in-out infinite;
}

@keyframes icon-glow {
  0%, 100% {
    filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.5));
  }
  50% {
    filter: drop-shadow(0 4px 16px rgba(255, 215, 0, 0.3));
  }
}

.location-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.location-name {
  font-family: 'Inter', sans-serif;
  font-size: 1.4rem;
  font-weight: 700;
  color: #D2691E;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.location-desc {
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  color: rgba(210, 105, 30, 0.85);
  margin: 0;
  line-height: 1.5;
}

.key-hint {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  background: rgba(255, 215, 0, 0.08);
  border: 1px dashed rgba(255, 215, 0, 0.3);
  border-radius: 8px;
  font-size: 0.8rem;
  color: rgba(255, 215, 0, 0.9);
}

.hint-icon {
  font-size: 1rem;
}

.key-status {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(139, 69, 19, 0.2);
  border: 1px solid rgba(139, 69, 19, 0.4);
  border-radius: 20px;
  font-size: 0.85rem;
  color: #CD853F;
  font-weight: 600;
  transition: all 0.3s ease;
}

.key-status.found {
  background: rgba(255, 215, 0, 0.15);
  border-color: rgba(255, 215, 0, 0.5);
  color: #FFD700;
}

.key-icon {
  font-size: 1.1rem;
}

.location-arrow {
  position: absolute;
  right: 2rem;
  top: 50%;
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
  color: #D2691E;
  opacity: 0;
  transition: all 0.3s ease;
}

.location-card:hover .location-arrow {
  opacity: 1;
  transform: translateY(-50%) translateX(5px);
}

.location-arrow svg {
  width: 24px;
  height: 24px;
}

/* 艺术区样式 */
.art-categories {
  padding: 1rem 0;
}

.art-category-header {
  text-align: center;
  margin-bottom: 1.5rem;
}

.category-title {
  font-family: 'Inter', sans-serif;
  font-size: 1.4rem;
  font-weight: 700;
  color: #FF69B4;
  margin: 0 0 0.4rem 0;
  text-shadow: 0 2px 8px rgba(255, 105, 180, 0.4);
}

.category-desc {
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  color: rgba(255, 105, 180, 0.7);
  margin: 0;
  font-style: italic;
}

.art-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.25rem;
  padding: 1rem 0;
}

.art-card {
  position: relative;
  display: flex;
  flex-direction: column;
  background: rgba(255, 105, 180, 0.05);
  border: 2px solid rgba(255, 105, 180, 0.2);
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  opacity: 0;
  animation: art-card-appear 0.6s ease-out forwards;
}

.pen-card:nth-child(1) { animation-delay: 0.05s; }
.pen-card:nth-child(2) { animation-delay: 0.1s; }
.pen-card:nth-child(3) { animation-delay: 0.15s; }
.pen-card:nth-child(4) { animation-delay: 0.2s; }
.pen-card:nth-child(5) { animation-delay: 0.25s; }

.music-card:nth-child(1) { animation-delay: 0.05s; }
.music-card:nth-child(2) { animation-delay: 0.1s; }
.music-card:nth-child(3) { animation-delay: 0.15s; }
.music-card:nth-child(4) { animation-delay: 0.2s; }

@keyframes art-card-appear {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.art-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 15px 40px rgba(255, 105, 180, 0.3);
  border-color: rgba(255, 105, 180, 0.5);
}

.art-card.collected {
  background: rgba(255, 215, 0, 0.08);
  border-color: rgba(255, 215, 0, 0.3);
}

.art-card.collected:hover {
  box-shadow: 0 15px 40px rgba(255, 215, 0, 0.3);
  border-color: rgba(255, 215, 0, 0.5);
}

.art-card-bg {
  position: relative;
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: linear-gradient(135deg, rgba(255, 105, 180, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%);
}

.pen-card .art-card-bg {
  background: linear-gradient(135deg, rgba(147, 51, 234, 0.15) 0%, rgba(255, 105, 180, 0.15) 100%);
}

.music-card .art-card-bg {
  background: linear-gradient(135deg, rgba(100, 149, 237, 0.15) 0%, rgba(138, 43, 226, 0.15) 100%);
}

.music-card .art-card-bg.movement-musician_1 {
  background: linear-gradient(135deg, rgba(173, 216, 230, 0.2) 0%, rgba(135, 206, 250, 0.15) 100%);
}

.music-card .art-card-bg.movement-musician_2 {
  background: linear-gradient(135deg, rgba(255, 182, 193, 0.2) 0%, rgba(255, 105, 180, 0.15) 100%);
}

.music-card .art-card-bg.movement-musician_3 {
  background: linear-gradient(135deg, rgba(119, 136, 153, 0.2) 0%, rgba(47, 79, 79, 0.15) 100%);
}

.music-card .art-card-bg.movement-musician_4 {
  background: linear-gradient(135deg, rgba(255, 215, 0, 0.2) 0%, rgba(255, 165, 0, 0.15) 100%);
}

.art-sparkle {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image:
    radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 80% 70%, rgba(255, 255, 255, 0.2) 0%, transparent 50%);
  animation: sparkle-move 4s ease-in-out infinite;
}

@keyframes sparkle-move {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  50% {
    transform: translate(10px, -10px) scale(1.1);
  }
}

.music-notes {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  pointer-events: none;
}

.note {
  position: absolute;
  font-size: 1.2rem;
  opacity: 0;
  animation: note-float 3s ease-in-out infinite;
}

.note-1 {
  top: 20%;
  left: 20%;
  animation-delay: 0s;
}

.note-2 {
  top: 60%;
  right: 25%;
  animation-delay: 1s;
}

.note-3 {
  bottom: 25%;
  left: 50%;
  animation-delay: 2s;
}

@keyframes note-float {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  50% {
    opacity: 0.8;
  }
  100% {
    opacity: 0;
    transform: translateY(-30px);
  }
}

.art-icon {
  font-size: 3.5rem;
  position: relative;
  z-index: 1;
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3));
  animation: icon-pulse 2s ease-in-out infinite;
}

@keyframes icon-pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.art-content {
  padding: 1.5rem;
  text-align: center;
}

.art-title {
  font-family: 'Inter', sans-serif;
  font-size: 1.1rem;
  font-weight: 700;
  color: #FF69B4;
  margin: 0 0 0.5rem 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.music-card .art-title {
  color: #87CEEB;
}

.art-description {
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 0 0 1rem 0;
  line-height: 1.4;
}

.art-status {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.8rem;
  background: rgba(255, 105, 180, 0.15);
  border: 1px solid rgba(255, 105, 180, 0.3);
  border-radius: 20px;
  font-size: 0.75rem;
  color: #FF69B4;
  font-weight: 600;
  transition: all 0.3s ease;
}

.art-card.collected .art-status {
  background: rgba(255, 215, 0, 0.15);
  border-color: rgba(255, 215, 0, 0.4);
  color: #FFD700;
}

.music-card .art-status {
  background: rgba(100, 149, 237, 0.15);
  border-color: rgba(100, 149, 237, 0.3);
  color: #6495ED;
}

.music-card.collected .art-status {
  background: rgba(255, 215, 0, 0.15);
  border-color: rgba(255, 215, 0, 0.4);
  color: #FFD700;
}

.status-icon {
  font-size: 1rem;
  animation: status-bounce 2s ease-in-out infinite;
}

@keyframes status-bounce {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

/* 主线故事样式 */
.main-story-world {
  padding: 1rem 0;
}

.chapter-narrative {
  text-align: center;
  padding: 2rem 1.5rem;
  background: linear-gradient(180deg, rgba(13, 27, 42, 0.3) 0%, rgba(13, 27, 42, 0.1) 100%);
  border-radius: 16px;
  margin-bottom: 1.5rem;
  border: 1px solid rgba(100, 149, 237, 0.1);
}

.chapter-header {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.25rem;
}

.chapter-title {
  font-family: 'Inter', sans-serif;
  font-size: 2rem;
  font-weight: 700;
  color: #E0E0E0;
  margin: 0;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
}

.chapter-depth {
  padding: 0.5rem 1rem;
  background: rgba(100, 149, 237, 0.2);
  border: 1px solid rgba(100, 149, 237, 0.3);
  border-radius: 20px;
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  color: #6495ED;
  font-weight: 600;
}

.chapter-text {
  font-family: 'Inter', sans-serif;
  font-size: 1.1rem;
  line-height: 1.8;
  color: rgba(224, 224, 224, 0.9);
  margin: 0 0 1.25rem 0;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  font-style: italic;
}

.chapter-mood {
  display: inline-block;
  padding: 0.5rem 1.5rem;
  background: rgba(100, 149, 237, 0.1);
  border: 1px solid rgba(100, 149, 237, 0.2);
  border-radius: 25px;
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  color: #6495ED;
  font-weight: 600;
  letter-spacing: 0.1em;
}

.chapter-mood.mood-wonder { color: #FFD700; border-color: rgba(255, 215, 0, 0.3); }
.chapter-mood.mood-joy { color: #FF69B4; border-color: rgba(255, 105, 180, 0.3); }
.chapter-mood.mood-tension { color: #FF6347; border-color: rgba(255, 99, 71, 0.3); }
.chapter-mood.mood-sadness { color: #6495ED; border-color: rgba(100, 149, 237, 0.3); }
.chapter-mood.mood-loss { color: #9370DB; border-color: rgba(147, 112, 219, 0.3); }
.chapter-mood.mood-nostalgia { color: #CD853F; border-color: rgba(205, 133, 63, 0.3); }

.memory-fragments {
  padding: 1rem 0;
}

.fragments-title {
  font-family: 'Inter', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: #E0E0E0;
  margin: 0 0 1.5rem 0;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.title-icon {
  font-size: 1.8rem;
  animation: title-sparkle 2s ease-in-out infinite;
}

@keyframes title-sparkle {
  0%, 100% {
    transform: scale(1) rotate(0deg);
  }
  50% {
    transform: scale(1.1) rotate(5deg);
  }
}

.fragments-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.25rem;
}

.memory-fragment {
  position: relative;
  display: flex;
  align-items: center;
  gap: 1.25rem;
  padding: 1.25rem;
  background: rgba(100, 149, 237, 0.05);
  border: 2px solid rgba(100, 149, 237, 0.15);
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  opacity: 0;
  animation: memory-appear 0.8s ease-out forwards;
}

.memory-fragment:nth-child(1) { animation-delay: 0.1s; }
.memory-fragment:nth-child(2) { animation-delay: 0.2s; }
.memory-fragment:nth-child(3) { animation-delay: 0.3s; }

@keyframes memory-appear {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.memory-fragment:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(100, 149, 237, 0.2);
  border-color: rgba(100, 149, 237, 0.4);
  background: rgba(100, 149, 237, 0.1);
}

.memory-fragment.collected {
  background: rgba(255, 215, 0, 0.08);
  border-color: rgba(255, 215, 0, 0.25);
}

.memory-fragment.collected:hover {
  box-shadow: 0 10px 30px rgba(255, 215, 0, 0.2);
  border-color: rgba(255, 215, 0, 0.5);
}

.memory-shard {
  position: relative;
  width: 80px;
  height: 80px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(100, 149, 237, 0.2) 0%, rgba(147, 51, 234, 0.2) 100%);
  border-radius: 12px;
}

.memory-fragment.collected .memory-shard {
  background: linear-gradient(135deg, rgba(255, 215, 0, 0.2) 0%, rgba(255, 165, 0, 0.15) 100%);
}

.memory-icon {
  font-size: 2.5rem;
  position: relative;
  z-index: 1;
  filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.3));
}

.memory-glow {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%);
  opacity: 0;
  animation: memory-glow-pulse 3s ease-in-out infinite;
}

@keyframes memory-glow-pulse {
  0%, 100% {
    opacity: 0;
    transform: scale(0.8);
  }
  50% {
    opacity: 0.5;
    transform: scale(1);
  }
}

.memory-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.memory-name {
  font-family: 'Inter', sans-serif;
  font-size: 1.1rem;
  font-weight: 700;
  color: #E0E0E0;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.memory-story {
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  color: rgba(224, 224, 224, 0.7);
  margin: 0;
  line-height: 1.4;
}

.memory-status {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  color: rgba(224, 224, 224, 0.6);
  font-weight: 600;
}

.memory-fragment.collected .memory-status {
  color: rgba(255, 215, 0, 0.9);
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(224, 224, 224, 0.3);
  transition: all 0.3s ease;
}

.memory-fragment.collected .status-dot {
  background: #FFD700;
  box-shadow: 0 0 8px rgba(255, 215, 0, 0.6);
}

.no-memories {
  text-align: center;
  padding: 4rem 2rem;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  opacity: 0.5;
}

.empty-text {
  font-family: 'Inter', sans-serif;
  font-size: 1.1rem;
  color: rgba(224, 224, 224, 0.6);
  margin: 0 0 0.5rem 0;
}

.empty-hint {
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  color: rgba(224, 224, 224, 0.4);
  margin: 0;
  font-style: italic;
}

/* 已收集物品展示 */
.collected-showcase {
  padding: 1.25rem 1.5rem;
  background: rgba(100, 149, 237, 0.05);
  border-top: 1px solid rgba(100, 149, 237, 0.2);
  flex-shrink: 0;
}

.collected-showcase h3 {
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  color: #6495ED;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin: 0 0 0.75rem 0;
}

.showcase-items {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.showcase-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(100, 149, 237, 0.1);
  border: 1px solid rgba(100, 149, 237, 0.2);
  border-radius: 6px;
}

.showcase-icon {
  font-size: 1.2rem;
}

.showcase-name {
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  color: #e0e0e0;
  font-weight: 500;
}

/* 探索模态框动画 */
.explore-enter-active {
  transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.explore-leave-active {
  transition: all 0.3s ease;
}

.explore-enter-from {
  opacity: 0;
  transform: scale(0.9);
}

.explore-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

/* 不同探索区域的主题色 */
.explore-modal-content.explore-chibobo {
  border-color: rgba(147, 51, 234, 0.3);
}

.explore-modal-content.explore-chibobo .explore-header {
  background: rgba(147, 51, 234, 0.1);
  border-bottom-color: rgba(147, 51, 234, 0.2);
}

.explore-modal-content.explore-mushroom {
  border-color: rgba(34, 139, 34, 0.3);
}

.explore-modal-content.explore-mushroom .explore-header {
  background: rgba(34, 139, 34, 0.1);
  border-bottom-color: rgba(34, 139, 34, 0.2);
}

.explore-modal-content.explore-zhufeng {
  border-color: rgba(139, 69, 19, 0.3);
}

.explore-modal-content.explore-zhufeng .explore-header {
  background: rgba(139, 69, 19, 0.1);
  border-bottom-color: rgba(139, 69, 19, 0.2);
}

.explore-modal-content.explore-art {
  border-color: rgba(255, 105, 180, 0.3);
}

.explore-modal-content.explore-art .explore-header {
  background: rgba(255, 105, 180, 0.1);
  border-bottom-color: rgba(255, 105, 180, 0.2);
}


/* === 模态弹窗 === */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  z-index: 4000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.modal-content {
  background: rgba(13, 27, 42, 0.95);
  border: 1px solid rgba(100, 149, 237, 0.3);
  border-radius: 12px;
  max-width: 700px;
  width: 100%;
  max-height: 80vh;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid rgba(100, 149, 237, 0.2);
}

.modal-header h2 {
  font-family: 'Inter', sans-serif;
  font-size: 1.2rem;
  font-weight: 600;
  color: #e0e0e0;
  letter-spacing: 0.1em;
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  color: rgba(224, 224, 224, 0.6);
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.3s ease;
}

.close-btn:hover {
  color: #e0e0e0;
}

.close-btn svg {
  width: 24px;
  height: 24px;
}

.modal-body {
  padding: 2rem;
  overflow-y: auto;
  max-height: calc(80vh - 100px);
}

/* === 收藏室 === */
.collection-stats {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  padding: 1rem;
  background: rgba(100, 149, 237, 0.1);
  border-radius: 8px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.stat-value {
  font-family: 'Inter', sans-serif;
  font-size: 2rem;
  font-weight: 600;
  color: #6495ED;
}

.stat-label {
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  color: rgba(224, 224, 224, 0.6);
  letter-spacing: 0.1em;
}

.collection-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}

.collection-item {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: rgba(100, 149, 237, 0.05);
  border: 1px solid rgba(100, 149, 237, 0.2);
  border-radius: 8px;
  transition: all 0.3s ease;
}

.collection-item:hover:not(.locked) {
  background: rgba(100, 149, 237, 0.1);
  border-color: rgba(100, 149, 237, 0.4);
}

.collection-item.locked {
  opacity: 0.5;
}

.item-icon {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(100, 149, 237, 0.1);
  border-radius: 8px;
  font-size: 1.5rem;
}

.item-info {
  flex: 1;
}

.item-name {
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  color: #e0e0e0;
  margin: 0 0 0.25rem 0;
}

.item-story {
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  color: rgba(224, 224, 224, 0.6);
  margin: 0;
  line-height: 1.4;
}

/* === 日志 === */
.log-entries {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.log-entry {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: rgba(100, 149, 237, 0.05);
  border-left: 2px solid rgba(100, 149, 237, 0.3);
  border-radius: 4px;
}

.log-time {
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  color: #6495ED;
  font-weight: 600;
  min-width: 60px;
}

.log-depth {
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  color: rgba(224, 224, 224, 0.6);
  min-width: 60px;
}

.log-text {
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  color: #e0e0e0;
  margin: 0;
  flex: 1;
}

/* === 地图 === */
.depth-map {
  position: relative;
  height: 400px;
  background: rgba(100, 149, 237, 0.05);
  border: 1px solid rgba(100, 149, 237, 0.2);
  border-radius: 8px;
  padding: 2rem;
  margin-bottom: 1.5rem;
}

/* 地图图例 */
.map-legend {
  display: flex;
  gap: 1rem;
  margin-left: auto;
  margin-right: 1rem;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.legend-color {
  width: 12px;
  height: 12px;
  border-radius: 2px;
}

.legend-color.explored {
  background: rgba(100, 149, 237, 0.5);
  border: 1px solid rgba(100, 149, 237, 0.8);
}

.legend-color.current {
  background: #FFD700;
  border: 1px solid #FFA500;
}

.legend-text {
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  color: rgba(224, 224, 224, 0.7);
}

/* 当前位置指示器 */
.current-position-indicator {
  position: absolute;
  left: 2rem;
  right: 2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  pointer-events: none;
  transition: bottom 0.5s ease;
}

.indicator-dot {
  width: 12px;
  height: 12px;
  background: #FFD700;
  border: 2px solid #FFA500;
  border-radius: 50%;
  box-shadow: 0 0 10px #FFD700;
  animation: indicator-pulse 2s ease-in-out infinite;
}

@keyframes indicator-pulse {
  0%, 100% {
    transform: scale(1);
    box-shadow: 0 0 10px #FFD700;
  }
  50% {
    transform: scale(1.2);
    box-shadow: 0 0 20px #FFD700;
  }
}

.indicator-label {
  font-family: 'Inter', sans-serif;
  font-size: 0.65rem;
  color: #FFD700;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.map-zone {
  position: absolute;
  left: 2rem;
  right: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 0.75rem 1rem;
  background: rgba(100, 149, 237, 0.1);
  border: 1px solid rgba(100, 149, 237, 0.2);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.map-zone:hover {
  background: rgba(100, 149, 237, 0.2);
  border-color: rgba(100, 149, 237, 0.4);
  transform: translateX(5px);
}

.map-zone.explored {
  background: rgba(100, 149, 237, 0.15);
  border-color: rgba(100, 149, 237, 0.5);
}

.map-zone.current {
  background: rgba(255, 215, 0, 0.15);
  border-color: rgba(255, 215, 0, 0.6);
  box-shadow: 0 0 20px rgba(255, 215, 0, 0.2);
}

.zone-depth {
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  color: #6495ED;
}

.map-zone.current .zone-depth {
  color: #FFD700;
}

.zone-name {
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  color: #e0e0e0;
  font-weight: 500;
}

.zone-description {
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  color: rgba(224, 224, 224, 0.6);
}

.zone-status {
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  color: rgba(224, 224, 224, 0.6);
  align-self: flex-start;
}

/* 快速跳转按钮 */
.quick-jump-buttons {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  padding: 1rem 0;
}

.jump-btn {
  padding: 0.5rem 1rem;
  background: rgba(100, 149, 237, 0.1);
  border: 1px solid rgba(100, 149, 237, 0.3);
  border-radius: 4px;
  color: #e0e0e0;
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.jump-btn:hover {
  background: rgba(100, 149, 237, 0.2);
  border-color: rgba(100, 149, 237, 0.5);
  transform: translateY(-2px);
}

.jump-btn.active {
  background: rgba(255, 215, 0, 0.2);
  border-color: rgba(255, 215, 0, 0.6);
  color: #FFD700;
}

/* === 设置面板 === */
.settings-modal {
  max-width: 600px;
}

.settings-section {
  margin-bottom: 2rem;
}

.settings-section:last-child {
  margin-bottom: 0;
}

.settings-section h3 {
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  color: #6495ED;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin: 0 0 1rem 0;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgba(100, 149, 237, 0.2);
}

.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
}

.setting-item label {
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  color: #e0e0e0;
}

/* 切换开关 */
.toggle-switch {
  position: relative;
  width: 44px;
  height: 24px;
  background: rgba(100, 149, 237, 0.2);
  border: 1px solid rgba(100, 149, 237, 0.3);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.toggle-switch:hover {
  background: rgba(100, 149, 237, 0.3);
}

.toggle-switch.active {
  background: rgba(100, 149, 237, 0.5);
  border-color: #6495ED;
}

.toggle-slider {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 18px;
  height: 18px;
  background: #e0e0e0;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.toggle-switch.active .toggle-slider {
  transform: translateX(20px);
  background: #6495ED;
}

/* 设置按钮 */
.setting-buttons {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.setting-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: rgba(100, 149, 237, 0.1);
  border: 1px solid rgba(100, 149, 237, 0.3);
  border-radius: 6px;
  color: #e0e0e0;
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.setting-btn:hover {
  background: rgba(100, 149, 237, 0.2);
  border-color: rgba(100, 149, 237, 0.5);
  transform: translateY(-2px);
}

.setting-btn svg {
  width: 16px;
  height: 16px;
}

.setting-btn.delete-btn {
  background: rgba(244, 67, 54, 0.1);
  border-color: rgba(244, 67, 54, 0.3);
  color: #ef5350;
}

.setting-btn.delete-btn:hover {
  background: rgba(244, 67, 54, 0.2);
  border-color: rgba(244, 67, 54, 0.5);
}

/* 快捷键列表 */
.shortcuts-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.shortcut-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid rgba(100, 149, 237, 0.1);
}

.shortcut-desc {
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  color: #e0e0e0;
}

.shortcut-keys {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.shortcut-keys kbd {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  background: rgba(100, 149, 237, 0.15);
  border: 1px solid rgba(100, 149, 237, 0.3);
  border-radius: 4px;
  font-family: 'Inter', monospace;
  font-size: 0.7rem;
  color: #6495ED;
  font-weight: 600;
}

/* 存档信息 */
.save-info {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  padding: 1rem;
  background: rgba(100, 149, 237, 0.05);
  border: 1px solid rgba(100, 149, 237, 0.2);
  border-radius: 6px;
  margin-top: 1rem;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.info-label {
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  color: rgba(224, 224, 224, 0.6);
  letter-spacing: 0.05em;
}

.info-value {
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  color: #6495ED;
  font-weight: 600;
}

/* === 模态动画 === */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-content,
.modal-leave-active .modal-content {
  transition: transform 0.3s ease;
}

.modal-enter-from .modal-content,
.modal-leave-to .modal-content {
  transform: scale(0.9);
}

/* === 响应式设计 === */
@media (max-width: 768px) {
  .exit-btn {
    top: 1rem;
    left: 1rem;
    padding: 0.625rem 1rem;
    font-size: 0.6rem;
  }

  .submarine-cockpit {
    padding: 5rem 1rem 10rem;
  }

  .dashboard-gauges {
    flex-wrap: wrap;
    gap: 1rem;
    padding: 0.75rem 0;
  }

  .gauge-container {
    flex: 0 0 calc(50% - 0.5rem);
  }

  .gauge {
    width: 60px;
    height: 60px;
  }

  .gauge-value {
    font-size: 0.85rem;
  }

  .cockpit-header {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }

  .location-indicator {
    align-items: flex-start;
  }

  .depth-bar {
    width: 100%;
  }

  .depth-markers {
    display: none;
  }

  .control-panel {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }

  .control-group {
    width: 100%;
  }

  .control-btn {
    flex: 1;
    padding: 0.75rem 1rem;
    font-size: 0.65rem;
  }

  .collection-grid {
    grid-template-columns: 1fr;
  }

  .opening-narrative {
    padding: 2rem 1.5rem;
  }

  .narrative-text {
    font-size: 1.1rem;
  }

  .ceiling-lights {
    gap: 2rem;
  }

  .light {
    width: 60px;
  }

  .periscope-hint {
    font-size: 0.65rem;
    padding: 0.5rem 1rem;
    top: 0.5rem;
  }

  .porthole-frame {
    max-width: 100%;
  }

  .sea-creature {
    font-size: 1.5rem;
  }

  .crosshair-circle {
    width: 80px;
    height: 80px;
  }

  .angle-indicator {
    bottom: 0.5rem;
    padding: 0.4rem 0.8rem;
  }

  .angle-value {
    font-size: 0.75rem;
  }

  /* 响应式地图样式 */
  .map-legend {
    display: none;
  }

  .depth-map {
    padding: 1rem;
    height: 350px;
  }

  .current-position-indicator {
    left: 1rem;
    right: 1rem;
  }

  .map-zone {
    left: 1rem;
    right: 1rem;
    padding: 0.5rem;
  }

  .quick-jump-buttons {
    flex-wrap: wrap;
  }

  .jump-btn {
    flex: 0 0 calc(33.33% - 0.35rem);
    font-size: 0.65rem;
    padding: 0.4rem 0.5rem;
  }

  /* 响应式设置面板 */
  .settings-modal {
    max-width: 90vw;
  }

  .setting-buttons {
    flex-direction: column;
  }

  .setting-btn {
    width: 100%;
    justify-content: center;
  }

  .save-info {
    grid-template-columns: 1fr;
  }

  .shortcuts-list {
    font-size: 0.7rem;
  }

  .shortcut-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .shortcut-keys {
    align-self: flex-end;
  }

  /* 响应式控制面板 */
  .control-group {
    flex-wrap: wrap;
  }

  .control-btn {
    flex: 0 0 calc(50% - 0.5rem);
  }

  /* 响应式探索模态框 */
  .explore-modal-content {
    max-width: 95vw;
    max-height: 90vh;
    border-radius: 12px;
  }

  .explore-header {
    padding: 1.25rem 1rem;
    flex-wrap: wrap;
    gap: 0.75rem;
  }

  .explore-back-btn {
    padding: 0.5rem 0.75rem;
    font-size: 0.75rem;
  }

  .explore-title {
    font-size: 1.1rem;
  }

  .explore-progress {
    font-size: 0.7rem;
  }

  .explore-body {
    padding: 1rem;
  }

  /* 响应式场景卡片 */
  .scene-card {
    padding: 1rem;
    gap: 1rem;
  }

  .scene-icon {
    width: 60px;
    height: 60px;
    font-size: 2rem;
  }

  .scene-name {
    font-size: 0.95rem;
  }

  .scene-desc {
    font-size: 0.75rem;
  }

  /* 响应式蘑菇卡片 */
  .mushroom-selection {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .mushroom-card {
    padding: 1.5rem 1rem;
  }

  .mushroom-icon {
    font-size: 3rem;
  }

  .mushroom-name {
    font-size: 1rem;
  }

  .mushroom-desc {
    font-size: 0.8rem;
  }

  /* 响应式竹峰寺地点卡片 */
  .location-card {
    flex-direction: column;
    padding: 1.5rem;
    gap: 1rem;
  }

  .location-card::before {
    width: 100%;
    height: 4px;
    top: 0;
    left: 0;
    right: 0;
  }

  .location-card:hover::before {
    height: 6px;
    width: 100%;
  }

  .location-image {
    width: 100%;
    height: 100px;
  }

  .location-icon {
    font-size: 2.5rem;
  }

  .location-name {
    font-size: 1.1rem;
  }

  .location-arrow {
    display: none;
  }

  /* 响应式艺术卡片 */
  .art-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .art-card-bg {
    height: 100px;
  }

  .art-icon {
    font-size: 2.5rem;
  }

  .art-title {
    font-size: 1rem;
  }

  .art-description {
    font-size: 0.8rem;
  }

  .category-title {
    font-size: 1.2rem;
  }

  /* 响应式主线故事 */
  .chapter-title {
    font-size: 1.5rem;
  }

  .chapter-text {
    font-size: 0.95rem;
  }

  .fragments-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .memory-fragment {
    padding: 1rem;
    gap: 1rem;
  }

  .memory-shard {
    width: 60px;
    height: 60px;
  }

  .memory-icon {
    font-size: 2rem;
  }

  .memory-name {
    font-size: 0.95rem;
  }

  .memory-story {
    font-size: 0.8rem;
  }

  /* 响应式已收集物品展示 */
  .collected-showcase {
    padding: 1rem;
  }

  .showcase-item {
    padding: 0.4rem 0.75rem;
    font-size: 0.75rem;
  }

  /* 响应式发现提示 */
  .discovery-hint {
    left: 1rem;
    right: 1rem;
    padding: 0.75rem 1rem;
  }

  .discovery-title {
    font-size: 0.9rem;
  }

  .discovery-desc {
    font-size: 0.7rem;
  }

  .discovery-action {
    font-size: 0.65rem;
    padding: 0.4rem 0.75rem;
  }
}

/* 平板设备适配 */
@media (min-width: 769px) and (max-width: 1024px) {
  .mushroom-selection {
    grid-template-columns: repeat(2, 1fr);
  }

  .art-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .fragments-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .location-card {
    padding: 1.5rem;
  }

  .location-image {
    width: 100px;
    height: 100px;
  }

  .chapter-title {
    font-size: 1.75rem;
  }
}

/* 大屏幕优化 */
@media (min-width: 1400px) {
  .mushroom-selection {
    grid-template-columns: repeat(3, 1fr);
  }

  .art-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .fragments-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .explore-modal-content {
    max-width: 1200px;
  }
}

/* 触摸设备优化 */
@media (hover: none) and (pointer: coarse) {
  .control-btn,
  .scene-card,
  .mushroom-card,
  .location-card,
  .art-card,
  .memory-fragment {
    &:hover {
      transform: none;
    }

    &:active {
      transform: scale(0.98);
    }
  }

  .control-btn:active,
  .scene-card:active,
  .mushroom-card:active,
  .location-card:active,
  .art-card:active,
  .memory-fragment:active {
    transform: scale(0.98);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }
}

/* 横屏模式优化 */
@media (orientation: landscape) and (max-height: 600px) {
  .submarine-cockpit {
    padding: 2rem 1rem 1rem;
  }

  .porthole-view {
    min-height: 200px;
    max-height: 35vh;
  }

  .dashboard-gauges {
    margin-bottom: 1rem;
  }

  .control-panel {
    bottom: 1rem;
    padding: 1rem;
    gap: 1rem;
  }

  .control-btn {
    padding: 0.5rem 0.75rem;
    font-size: 0.7rem;
  }

  .explore-modal-content {
    max-height: 95vh;
  }

  .explore-body {
    /* 移除max-height限制，让flex自动处理 */
  }
}

/* 超小屏幕设备 */
@media (max-width: 480px) {
  .exit-btn {
    padding: 0.5rem 0.75rem;
  }

  .exit-btn span {
    display: none;
  }

  .gauge-container {
    flex: 0 0 calc(50% - 0.5rem);
  }

  .gauge {
    width: 50px;
    height: 50px;
  }

  .gauge-label {
    font-size: 0.6rem;
  }

  .gauge-value {
    font-size: 0.75rem;
  }

  .control-btn {
    font-size: 0.6rem;
    padding: 0.6rem 0.5rem;
  }

  .control-btn span {
    display: none;
  }

  .control-btn svg {
    width: 20px;
    height: 20px;
  }

  .scene-card,
  .mushroom-card,
  .location-card,
  .art-card,
  .memory-fragment {
    padding: 0.75rem;
  }

  .chapter-title {
    font-size: 1.25rem;
  }

  .chapter-text {
    font-size: 0.85rem;
  }
}
</style>

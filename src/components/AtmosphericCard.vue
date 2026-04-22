<template>
  <div
    :class="cardClasses"
    :style="cardStyle"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
    @click="onClick"
  >
    <!-- 卡片光晕背景 -->
    <div class="atmospheric-card__glow"></div>

    <!-- 卡片内容 -->
    <div class="atmospheric-card__content">
      <slot></slot>
    </div>

    <!-- 装饰性角落 -->
    <div v-if="showCorners" class="atmospheric-card__corners">
      <span class="corner corner--top-left"></span>
      <span class="corner corner--top-right"></span>
      <span class="corner corner--bottom-left"></span>
      <span class="corner corner--bottom-right"></span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  mood: {
    type: String,
    default: 'neutral',
    validator: (value) => ['neutral', 'warm', 'calm', 'mystery', 'deep'].includes(value)
  },
  clickable: {
    type: Boolean,
    default: true
  },
  showCorners: {
    type: Boolean,
    default: false
  },
  glowColor: {
    type: String,
    default: 'rgba(255, 48, 0, 0.15)'
  }
})

const emit = defineEmits(['click'])

const isHovered = ref(false)

const cardClasses = computed(() => [
  'atmospheric-card',
  `atmospheric-card--${props.mood}`,
  {
    'atmospheric-card--clickable': props.clickable,
    'atmospheric-card--hovered': isHovered.value
  }
])

const cardStyle = computed(() => ({
  '--glow-color': props.glowColor
}))

const onMouseEnter = () => {
  isHovered.value = true
}

const onMouseLeave = () => {
  isHovered.value = false
}

const onClick = () => {
  if (props.clickable) {
    emit('click')
  }
}
</script>

<style scoped>
.atmospheric-card {
  position: relative;
  background: #FFFFFF;
  border: 2px solid #1A1A1A;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.atmospheric-card--clickable {
  cursor: pointer;
}

/* 光晕背景 */
.atmospheric-card__glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(
    circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
    var(--glow-color) 0%,
    transparent 70%
  );
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
  z-index: 0;
}

.atmospheric-card--hovered .atmospheric-card__glow {
  opacity: 1;
}

/* 内容 */
.atmospheric-card__content {
  position: relative;
  z-index: 1;
  padding: 2rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 悬停效果 */
.atmospheric-card--hovered {
  transform: translateY(-4px) scale(1.01);
  box-shadow:
    0 12px 40px rgba(0, 0, 0, 0.1),
    0 0 0 1px rgba(255, 48, 0, 0.1);
}

.atmospheric-card--hovered .atmospheric-card__content {
  transform: scale(1.02);
}

/* 情绪变体 */
.atmospheric-card--warm {
  border-color: #FF6B6B;
}

.atmospheric-card--warm.atmospheric-card--hovered {
  box-shadow:
    0 12px 40px rgba(255, 107, 107, 0.2),
    0 0 0 1px rgba(255, 107, 107, 0.2);
}

.atmospheric-card--calm {
  border-color: #74B9FF;
}

.atmospheric-card--calm.atmospheric-card--hovered {
  box-shadow:
    0 12px 40px rgba(116, 185, 255, 0.2),
    0 0 0 1px rgba(116, 185, 255, 0.2);
}

.atmospheric-card--mystery {
  border-color: #A29BFE;
}

.atmospheric-card--mystery.atmospheric-card--hovered {
  box-shadow:
    0 12px 40px rgba(162, 155, 254, 0.2),
    0 0 0 1px rgba(162, 155, 254, 0.2);
}

.atmospheric-card--deep {
  border-color: #636E72;
}

.atmospheric-card--deep.atmospheric-card--hovered {
  box-shadow:
    0 12px 40px rgba(99, 110, 114, 0.2),
    0 0 0 1px rgba(99, 110, 114, 0.2);
}

/* 装饰性角落 */
.atmospheric-card__corners {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 2;
}

.corner {
  position: absolute;
  width: 12px;
  height: 12px;
  border: 2px solid #1A1A1A;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.atmospheric-card--hovered .corner {
  opacity: 1;
}

.corner--top-left {
  top: 8px;
  left: 8px;
  border-right: none;
  border-bottom: none;
}

.corner--top-right {
  top: 8px;
  right: 8px;
  border-left: none;
  border-bottom: none;
}

.corner--bottom-left {
  bottom: 8px;
  left: 8px;
  border-right: none;
  border-top: none;
}

.corner--bottom-right {
  bottom: 8px;
  right: 8px;
  border-left: none;
  border-top: none;
}

/* 性能优化 */
@media (prefers-reduced-motion: reduce) {
  .atmospheric-card,
  .atmospheric-card__glow,
  .atmospheric-card__content,
  .corner {
    transition: none !important;
  }

  .atmospheric-card--hovered {
    transform: none !important;
  }
}
</style>

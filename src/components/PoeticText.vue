<template>
  <component
    :is="tag"
    :class="classes"
    :style="computedStyle"
  >
    <span
      v-for="(char, index) in characters"
      :key="index"
      class="poetic-char"
      :style="{ animationDelay: `${index * charDelay}ms` }"
    >
      {{ char }}
    </span>
  </component>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'

const props = defineProps({
  text: {
    type: String,
    default: ''
  },
  tag: {
    type: String,
    default: 'span'
  },
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'glow', 'float', 'wave'].includes(value)
  },
  charDelay: {
    type: Number,
    default: 30
  },
  letterSpacing: {
    type: String,
    default: '0.1em'
  },
  fontWeight: {
    type: String,
    default: '400'
  },
  italic: {
    type: Boolean,
    default: false
  }
})

const isRevealed = ref(false)

const characters = computed(() => {
  return props.text.split('')
})

const classes = computed(() => {
  return [
    'poetic-text',
    `poetic-text--${props.variant}`,
    {
      'poetic-text--italic': props.italic
    }
  ]
})

const computedStyle = computed(() => ({
  letterSpacing: props.letterSpacing,
  fontWeight: props.fontWeight
}))

onMounted(() => {
  setTimeout(() => {
    isRevealed.value = true
  }, 100)
})
</script>

<style scoped>
.poetic-text {
  display: inline-block;
  position: relative;
}

.poetic-char {
  display: inline-block;
  opacity: 0;
  animation: poetic-reveal 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  white-space: pre;
}

@keyframes poetic-reveal {
  0% {
    opacity: 0;
    transform: translateY(20px) rotate(2deg);
  }
  100% {
    opacity: 1;
    transform: translateY(0) rotate(0deg);
  }
}

/* 光晕变体 */
.poetic-text--glow .poetic-char {
  animation: poetic-glow-reveal 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

@keyframes poetic-glow-reveal {
  0% {
    opacity: 0;
    transform: translateY(20px);
    text-shadow: none;
  }
  50% {
    text-shadow: 0 0 20px rgba(255, 48, 0, 0.3);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
    text-shadow: none;
  }
}

/* 浮动变体 */
.poetic-text--float .poetic-char {
  animation: poetic-float-reveal 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

@keyframes poetic-float-reveal {
  0% {
    opacity: 0;
    transform: translateY(30px) scale(0.8);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* 波浪变体 */
.poetic-text--wave .poetic-char:nth-child(odd) {
  animation: poetic-wave-odd 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

.poetic-text--wave .poetic-char:nth-child(even) {
  animation: poetic-wave-even 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

@keyframes poetic-wave-odd {
  0% {
    opacity: 0;
    transform: translateY(20px) translateX(-10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0) translateX(0);
  }
}

@keyframes poetic-wave-even {
  0% {
    opacity: 0;
    transform: translateY(20px) translateX(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0) translateX(0);
  }
}

/* 斜体 */
.poetic-text--italic {
  font-style: italic;
}
</style>

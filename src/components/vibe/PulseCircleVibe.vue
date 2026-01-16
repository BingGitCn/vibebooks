<template>
  <div class="pulse-circle-vibe" :style="{ backgroundColor: vibeColor }">
    <div class="pulse-ring" v-for="i in 3" :key="i" :style="{
      animationDelay: `${i * 0.5}s`,
      borderColor: vibeColorEnd
    }"></div>
    <div class="center-dot" :style="{ backgroundColor: vibeColorEnd }"></div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  vibeColor: {
    type: String,
    default: '#4a7c9f'
  },
  vibeColorEnd: {
    type: String,
    default: '#2a4c5f'
  }
})
</script>

<style scoped>
.pulse-circle-vibe {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.pulse-ring {
  position: absolute;
  width: 40%;
  height: 40%;
  border: 2px solid;
  border-radius: 50%;
  animation: pulse 2s ease-out infinite;
}

.center-dot {
  width: 15%;
  height: 15%;
  border-radius: 50%;
  animation: centerPulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0% {
    transform: scale(0.3);
    opacity: 1;
  }
  100% {
    transform: scale(1.5);
    opacity: 0;
  }
}

@keyframes centerPulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.8;
  }
}
</style>

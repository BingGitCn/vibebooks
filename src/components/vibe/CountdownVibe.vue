<template>
  <div class="countdown-vibe">
    <div class="countdown-number">{{ currentNumber }}</div>
    <div class="pulse-line"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const currentNumber = ref(470)

let interval = null

onMounted(() => {
  interval = setInterval(() => {
    currentNumber.value--
    if (currentNumber.value <= 0) {
      currentNumber.value = 470
    }
  }, 100)
})

onUnmounted(() => {
  if (interval) clearInterval(interval)
})
</script>

<style scoped>
.countdown-vibe {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(180deg, #000000 0%, #001a1a 100%);
  color: #00ffff;
}

.countdown-number {
  font-size: clamp(2rem, 6vw, 5rem);
  font-weight: 200;
  letter-spacing: 0.3em;
  text-shadow: 0 0 20px rgba(0, 255, 255, 0.8);
  animation: numberPulse 0.5s ease-in-out infinite;
}

.pulse-line {
  width: 60%;
  height: 2px;
  background: #00ffff;
  margin-top: 1rem;
  box-shadow: 0 0 10px rgba(0, 255, 255, 0.8);
  animation: linePulse 2s ease-in-out infinite;
}

@keyframes numberPulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(0.98);
  }
}

@keyframes linePulse {
  0%, 100% {
    width: 60%;
    opacity: 0.5;
  }
  50% {
    width: 70%;
    opacity: 1;
  }
}
</style>

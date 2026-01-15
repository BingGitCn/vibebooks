<script setup>
import { onMounted } from 'vue'
import Home from './views/Home.vue'

onMounted(() => {
  // 设置动态情绪色
  document.documentElement.style.setProperty('--color-mood', '#D4AF37')
})
</script>

<template>
  <Home />
</template>

<style>
body {
  background: #000;
  overflow-x: hidden;
}
</style>

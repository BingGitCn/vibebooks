<script setup>
import { ref } from 'vue'
import Intro from './views/Intro.vue'
import BooksUniverse from './views/BooksUniverse.vue'

const currentView = ref('intro')

const enterUniverse = () => {
  currentView.value = 'universe'
}

const goBack = () => {
  currentView.value = 'intro'
}
</script>

<template>
  <div class="app-container">
    <Transition name="view-fade" mode="out-in">
      <Intro v-if="currentView === 'intro'" @enter="enterUniverse" key="intro" />
      <BooksUniverse v-else @back="goBack" key="universe" />
    </Transition>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: #f5f1eb;
  font-family: 'Source Serif 4', serif;
}

.app-container {
  width: 100vw;
  height: 100vh;
  position: relative;
  background: #f5f1eb;
}

/* 视图切换动画 */
.view-fade-enter-active,
.view-fade-leave-active {
  transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
}

.view-fade-enter-from {
  opacity: 0;
  transform: scale(1.1);
}

.view-fade-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>

<template>
  <router-view />
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=Inter:wght@300;400;500&family=Noto+Serif+SC:wght@300;400;600&display=swap');

:root {
  --bg-primary: #f7f5f2;
  --bg-secondary: #ebe8e3;
  --text-primary: #1a1a1a;
  --text-secondary: #666;
  --accent-blue: #4a7c9f;
  --accent-green: #2d5a3d;
  --accent-red: #8b3a3a;
  --accent-gold: #c9a959;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: 'Inter', 'Noto Serif SC', serif;
  background: var(--bg-primary);
  color: var(--text-primary);
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.6s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

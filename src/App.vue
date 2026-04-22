<template>
  <router-view />
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Playfair+Display:wght@400;500;600;700;900&family=Source+Serif+4:opsz,wght@8..60,300;8..60,400;8..60,500;8..60,600&family=JetBrains+Mono:wght@400;500;700&display=swap');

:root {
  /* Minimalist Monochrome - Pure Black & White */
  --background: #FFFFFF;
  --foreground: #000000;
  --muted: #F5F5F5;
  --muted-foreground: #525252;
  --accent: #000000;
  --accent-foreground: #FFFFFF;
  --border: #000000;
  --border-light: #E5E5E5;
  --card: #FFFFFF;
  --card-foreground: #000000;
  --ring: #000000;
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
  font-family: 'Source Serif 4', Georgia, serif;
  background: var(--background);
  color: var(--foreground);
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* === 页面切换过渡 === */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s ease, transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.page-enter-from {
  opacity: 0;
  transform: translateY(8px);
}
.page-leave-to {
  opacity: 0;
}
.page-enter-to,
.page-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>

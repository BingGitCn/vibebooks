<template>
  <transition :name="transitionName" @before-enter="beforeEnter" @after-enter="afterEnter">
    <slot></slot>
  </transition>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const transitionName = ref('fade-gentle')

// 根据路由深度决定过渡方向
const getTransitionDepth = (to, from) => {
  const toDepth = to.path.split('/').length
  const fromDepth = from.path.split('/').length

  if (toDepth > fromDepth) return 'forward'
  if (toDepth < fromDepth) return 'backward'
  return 'same'
}

router.beforeEach((to, from) => {
  const depth = getTransitionDepth(to, from)

  if (depth === 'forward') {
    transitionName.value = 'slide-fade-forward'
  } else if (depth === 'backward') {
    transitionName.value = 'slide-fade-backward'
  } else {
    transitionName.value = 'fade-gentle'
  }
})

const beforeEnter = (el) => {
  // 进入前的准备工作
  document.body.style.overflow = 'hidden'
}

const afterEnter = (el) => {
  // 进入后的清理工作
  document.body.style.overflow = ''
}
</script>

<style scoped>
/* 温柔的淡入淡出 */
.fade-gentle-enter-active,
.fade-gentle-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-gentle-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.fade-gentle-leave-to {
  opacity: 0;
  transform: scale(0.98);
}

/* 向前滑动淡入（进入深层页面） */
.slide-fade-forward-enter-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-fade-forward-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 1, 1);
}

.slide-fade-forward-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.slide-fade-forward-leave-to {
  opacity: 0;
  transform: translateX(-20px) scale(0.98);
}

/* 向后滑动淡入（返回浅层页面） */
.slide-fade-backward-enter-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-fade-backward-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 1, 1);
}

.slide-fade-backward-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.slide-fade-backward-leave-to {
  opacity: 0;
  transform: translateX(20px) scale(0.98);
}

/* 诗意缩放淡入 */
.poetic-scale-enter-active,
.poetic-scale-leave-active {
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.poetic-scale-enter-from {
  opacity: 0;
  transform: scale(0.95) translateY(20px);
}

.poetic-scale-leave-to {
  opacity: 0;
  transform: scale(1.05) translateY(-20px);
}
</style>

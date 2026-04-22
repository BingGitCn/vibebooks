import { onMounted } from 'vue'

/**
 * 书籍世界页面专用的滚动到顶部 composable
 * 确保进入书籍页面时始终从顶部开始显示
 */
export function useScrollToTop() {
  onMounted(() => {
    // 使用 setTimeout 确保在 DOM 完全渲染后再滚动
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant' // 使用 instant 而不是 smooth，避免滚动动画
      })
    }, 0)
  })
}

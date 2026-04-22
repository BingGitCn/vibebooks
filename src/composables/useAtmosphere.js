/**
 * useAtmosphere - 情绪化氛围管理
 *
 * 用于营造诗意、情绪化的页面氛围
 */

import { ref, onMounted, onUnmounted } from 'vue'

export function useAtmosphere() {
  const isRevealed = ref(false)
  const scrollProgress = ref(0)

  /**
   * 滚动揭示动画
   * 当元素进入视口时添加 revealed 类
   */
  const initScrollReveal = () => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // 添加延迟，营造层次感
          setTimeout(() => {
            entry.target.classList.add('revealed')
          }, index * 100)
        }
      })
    }, observerOptions)

    // 观察所有带有 scroll-reveal 类的元素
    const elements = document.querySelectorAll('.scroll-reveal, .scale-reveal')
    elements.forEach(el => observer.observe(el))

    return observer
  }

  /**
   * 滚动进度追踪
   * 用于情绪化的滚动反馈
   */
  const initScrollProgress = () => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      scrollProgress.value = Math.min(scrollTop / docHeight, 1)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }

  /**
   * 创建光点粒子效果
   */
  const createLightPoints = (container, count = 8) => {
    const points = []
    const containerRect = container.getBoundingClientRect()

    for (let i = 0; i < count; i++) {
      const point = document.createElement('div')
      point.className = 'light-point'
      point.style.left = Math.random() * 100 + '%'
      point.style.animationDelay = Math.random() * 6 + 's'
      point.style.animationDuration = (4 + Math.random() * 4) + 's'
      container.appendChild(point)
      points.push(point)
    }

    return points
  }

  /**
   * 文字逐字揭示效果
   * @param {string} text - 要显示的文字
   * @param {number} delay - 每个字的延迟（毫秒）
   */
  const revealText = (text, delay = 50) => {
    const chars = text.split('')
    return chars.map((char, index) => ({
      char,
      delay: index * delay
    }))
  }

  /**
   * 鼠标跟随光晕效果
   */
  const initCursorGlow = () => {
    const glow = document.createElement('div')
    glow.className = 'cursor-glow'
    glow.style.cssText = `
      position: fixed;
      width: 300px;
      height: 300px;
      background: radial-gradient(circle, rgba(255, 48, 0, 0.08) 0%, transparent 70%);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      transform: translate(-50%, -50%);
      transition: opacity 0.3s ease;
      opacity: 0;
    `
    document.body.appendChild(glow)

    const handleMouseMove = (e) => {
      glow.style.left = e.clientX + 'px'
      glow.style.top = e.clientY + 'px'
      glow.style.opacity = '1'
    }

    const handleMouseLeave = () => {
      glow.style.opacity = '0'
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      glow.remove()
    }
  }

  /**
   * 页面加载时的诗意入场
   */
  const poeticEnter = (element, delay = 0) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        element.classList.add('fade-in-gentle')
        setTimeout(resolve, 1200)
      }, delay)
    })
  }

  /**
   * 情绪化的卡片悬停效果
   */
  const poeticCardHover = (card) => {
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
    })
  }

  return {
    isRevealed,
    scrollProgress,
    initScrollReveal,
    initScrollProgress,
    createLightPoints,
    revealText,
    initCursorGlow,
    poeticEnter,
    poeticCardHover
  }
}

/**
 * useEmotionalTransition - 情绪化页面过渡
 */
export function useEmotionalTransition() {
  const isTransitioning = ref(false)

  /**
   * 温柔的页面过渡
   */
  const gentleTransition = async (callback) => {
    isTransitioning.value = true

    // 淡出
    document.body.style.transition = 'opacity 0.3s ease-out'
    document.body.style.opacity = '0'

    await new Promise(resolve => setTimeout(resolve, 300))

    // 执行回调（通常是路由跳转）
    await callback()

    // 淡入
    await new Promise(resolve => setTimeout(resolve, 100))
    document.body.style.opacity = '1'

    await new Promise(resolve => setTimeout(resolve, 300))
    isTransitioning.value = false

    // 清理
    document.body.style.transition = ''
    document.body.style.opacity = ''
  }

  return {
    isTransitioning,
    gentleTransition
  }
}

/**
 * usePoeticTime - 诗意的时间感知
 * 用于显示阅读时间、创作年份等
 */
export function usePoeticTime() {
  /**
   * 格式化年份为诗意表达
   */
  const poeticYear = (year) => {
    const currentYear = new Date().getFullYear()
    const diff = currentYear - year

    if (diff === 0) return '今年'
    if (diff === 1) return '去年'
    if (diff < 10) return `${diff}年前`
    if (diff < 50) return `半个世纪前`
    return `许久以前`
  }

  /**
   * 估算阅读时间
   */
  const readingTime = (wordCount) => {
    const minutes = Math.ceil(wordCount / 200)
    if (minutes < 30) return `${minutes}分钟`
    if (minutes < 120) return `${Math.floor(minutes / 30)}刻钟`
    return `${Math.ceil(minutes / 60)}小时`
  }

  return {
    poeticYear,
    readingTime
  }
}

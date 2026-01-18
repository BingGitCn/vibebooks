// 书籍中部动态特效配置
// 每本书都有独特的动态效果

export const middleEffectsConfig = {
  1: { // 岛上书店
    type: 'floating-books',
    value: 3
  },
  2: { // 困于沙丘
    type: 'dunes-flow',
    value: 5
  },
  3: { // 罪与罚
    type: 'axe-swing',
    value: null
  },
  4: { // 莫斯科绅士
    type: 'arch-glow',
    value: null
  },
  5: { // 夜晚的潜水艇
    type: 'submarine-float',
    value: null
  },
  6: { // 小王子
    type: 'vertical-quote',
    value: '本质的东西用眼睛是看不见的'
  },
  7: { // 撒哈拉的故事
    type: 'sand-drift',
    value: null
  },
  8: { // 刺杀骑士团长
    type: 'metaphor-pulse',
    value: '理念'
  },
  9: { // 失落的卫星
    type: 'satellite-orbit',
    value: null
  },
  10: { // 额尔古纳河右岸
    type: 'river-flow',
    value: null
  },
  11: { // 置身事内
    type: 'code-quote',
    value: '> 中国经济.realWorld()\n"生活过得好一点，\n 比大多数宏伟更宏伟"'
  },
  12: { // 文城
    type: 'fog-mist',
    value: null
  },
  13: { // 挪威的森林
    type: 'forest-sway',
    value: 3
  },
  14: { // 小城与不确定性的墙
    type: 'wall-shadow',
    value: null
  },
  15: { // 1Q84
    type: 'dual-moon-rotate',
    value: null
  },
  16: { // 山月记
    type: 'tiger-stripe-flow',
    value: null
  },
  17: { // 射雕英雄传
    type: 'sword-flash',
    value: null
  },
  18: { // 月亮与六便士
    type: 'moon-coin-flip',
    value: null
  },
  19: { // 明亮的夜晚
    type: 'constellation-rotate',
    value: 'four-stars'
  },
  20: { // 小岛经济学
    type: 'fish-swim',
    value: null
  },
  21: { // 我的阿勒泰
    type: 'mountains-silhouette',
    value: null
  },
  22: { // 我与地坛
    type: 'wheelchair-path',
    value: null
  },
  23: { // 太白金星有点烦
    type: 'cloud-float',
    value: '烦'
  },
  24: { // 百年孤独
    type: 'circular-rotate',
    value: '孤独'
  },
  25: { // 面纱
    type: 'veil-wave',
    value: null
  },
  26: { // 草民
    type: 'grass-sway',
    value: 5
  },
  27: { // 人生海海
    type: 'ocean-waves',
    value: 3
  },
  28: { // 长安的荔枝
    type: 'lychee-pulse',
    value: null
  },
  29: { // 霍乱时期的爱情
    type: 'ekg',
    value: null
  },
  30: { // 山茶文具店
    type: 'flower-bloom',
    value: null
  },
  31: { // 马可瓦尔多
    type: 'leaf-fall',
    value: null
  },
  32: { // 基督山伯爵
    type: 'treasure-sparkle',
    value: null
  },
  33: { // 悉达多
    type: 'minimal-symbol',
    value: 'ॐ'
  },
  34: { // 无人生还
    type: 'soldier-countdown',
    value: 10
  },
  35: { // 解忧杂货店
    type: 'mailbox-open',
    value: null
  },
  36: { // 嫌疑人X的献身
    type: 'formula-flash',
    value: '∑x²'
  },
  37: { // 三体
    type: 'countdown',
    value: '450:00:00'
  },
  38: { // 白夜行
    type: 'light-shadow-move',
    value: null
  }
}

// 根据书籍ID获取特效配置
export const getMiddleEffect = (bookId) => {
  return middleEffectsConfig[bookId] || null
}

// 为所有书籍添加middleEffect
export const addMiddleEffectsToBooks = (books) => {
  return books.map(book => ({
    ...book,
    middleEffect: middleEffectsConfig[book.id] || null
  }))
}

// 书籍数据 - 每本书都有独特的氛围设计
export const books = [
  {
    id: 1,
    title: '小王子',
    author: '安托万·德·圣-埃克苏佩里',
    year: '1943',
    mood: 'healing',
    moodLabel: '治愈',
    color: '#4A5D23',
    description: '星星发亮是为了让每一个人有一天都能找到属于自己的星星',
    tags: ['成长', '纯真', '爱'],
    visualStyle: {
      layout: 'offset-right',
      size: 'large',
      rotation: -2,
      decoration: 'stars'
    }
  },
  {
    id: 2,
    title: '1984',
    author: '乔治·奥威尔',
    year: '1949',
    mood: 'melancholy',
    moodLabel: '忧郁',
    color: '#2C3E50',
    description: '老大哥在看着你',
    tags: ['反乌托邦', '控制', '恐惧'],
    visualStyle: {
      layout: 'offset-left',
      size: 'medium',
      rotation: 1,
      decoration: 'lines'
    }
  },
  {
    id: 3,
    title: '追忆似水年华',
    author: '马塞尔·普鲁斯特',
    year: '1913',
    mood: 'epic',
    moodLabel: '史诗',
    color: '#D4AF37',
    description: '生命是一连串孤立的时刻，通过回忆和艺术才能把握',
    tags: ['记忆', '时间', '意识流'],
    visualStyle: {
      layout: 'center',
      size: 'large',
      rotation: 0,
      decoration: 'frame'
    }
  },
  {
    id: 4,
    title: '了不起的盖茨比',
    author: 'F. 斯科特·菲茨杰拉德',
    year: '1925',
    mood: 'wealth',
    moodLabel: '财富',
    color: '#FF6600',
    description: '于是我们奋力向前，逆水行舟，被不断地向后推',
    tags: ['美国梦', '幻灭', '奢华'],
    visualStyle: {
      layout: 'offset-right',
      size: 'medium',
      rotation: -1,
      decoration: 'sparkles'
    }
  },
  {
    id: 5,
    title: '三体',
    author: '刘慈欣',
    year: '2008',
    mood: 'scifi',
    moodLabel: '科幻',
    color: '#00FF88',
    description: '不要回答！不要回答！不要回答！',
    tags: ['宇宙', '文明', '黑暗森林'],
    visualStyle: {
      layout: 'offset-left',
      size: 'large',
      rotation: 2,
      decoration: 'circuit'
    }
  },
  {
    id: 6,
    title: '红楼梦',
    author: '曹雪芹',
    year: '1791',
    mood: 'melancholy',
    moodLabel: '悲情',
    color: '#8B0000',
    description: '满纸荒唐言，一把辛酸泪',
    tags: ['宿命', '繁华', '幻灭'],
    visualStyle: {
      layout: 'center',
      size: 'large',
      rotation: 0,
      decoration: 'petals'
    }
  },
  {
    id: 7,
    title: '局外人',
    author: '阿尔贝·加缪',
    year: '1942',
    mood: 'suspense',
    moodLabel: '荒诞',
    color: '#1a1a1a',
    description: '今天，妈妈死了。也许是昨天，我不知道',
    tags: ['存在主义', '疏离', '荒诞'],
    visualStyle: {
      layout: 'offset-right',
      size: 'small',
      rotation: -3,
      decoration: 'dots'
    }
  },
  {
    id: 8,
    title: '百年孤独',
    author: '加西亚·马尔克斯',
    year: '1967',
    mood: 'epic',
    moodLabel: '魔幻',
    color: '#D4AF37',
    description: '多年以后，面对行刑队，奥雷里亚诺·布恩迪亚上校将会回想起',
    tags: ['孤独', '命运', '循环'],
    visualStyle: {
      layout: 'offset-left',
      size: 'large',
      rotation: 1,
      decoration: 'spirals'
    }
  },
  {
    id: 9,
    title: '挪威的森林',
    author: '村上春树',
    year: '1987',
    mood: 'melancholy',
    moodLabel: '青春',
    color: '#2C5F7C',
    description: '死并非生的对立面，而是作为生的一部分永存',
    tags: ['青春', '失去', '成长'],
    visualStyle: {
      layout: 'center',
      size: 'medium',
      rotation: -1,
      decoration: 'leaves'
    }
  }
]

// 情绪色映射
export const moodColors = {
  suspense: '#FF0033',
  melancholy: '#2C3E50',
  epic: '#D4AF37',
  healing: '#4A5D23',
  scifi: '#00FF88',
  wealth: '#FF6600',
}

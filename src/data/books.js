// 书籍数据 - 每本书都有独特的氛围设计
export const books = [
  // ==================== 特色大卡片 (featured) ====================
  {
    id: 1,
    title: '小王子',
    author: '安托万·德·圣-埃克苏佩里',
    year: '1943',
    mood: 'healing',
    moodLabel: '纯真与爱',
    color: '#4A5D23',
    description: '星星发亮是为了让每一个人有一天都能找到属于自己的星星',
    tags: ['成长', '纯真', '爱'],
    displayType: 'featured',
    size: 'large',
    rotation: -2,
    layout: {
      background: 'linear-gradient(135deg, rgba(74, 93, 35, 0.04) 0%, rgba(255,255,255,1) 100%)'
    },
    decoration: 'stars',
    atmosphere: {
      glow: 'radial-gradient(circle, rgba(74, 93, 35, 0.25) 0%, transparent 70%)',
    }
  },
  {
    id: 2,
    title: '我与地坛',
    author: '史铁生',
    year: '1991',
    mood: 'philosophical',
    moodLabel: '生命哲思',
    color: '#5D4E37',
    description: '死是一件不必急于求成的事，死是一个必然会降临的节日',
    tags: ['生命', '救赎', '坚韧'],
    displayType: 'featured',
    size: 'large',
    rotation: 2,
    layout: {
      background: 'linear-gradient(225deg, rgba(93, 78, 55, 0.04) 0%, rgba(255,255,255,1) 100%)'
    },
    decoration: 'ancient-cypress',
    atmosphere: {
      glow: 'radial-gradient(circle, rgba(93, 78, 55, 0.2) 0%, transparent 70%)',
    }
  },
  {
    id: 3,
    title: '百年孤独',
    author: '加西亚·马尔克斯',
    year: '1967',
    mood: 'magical',
    moodLabel: '魔幻宿命',
    color: '#D4AF37',
    description: '多年以后，面对行刑队，奥雷里亚诺·布恩迪亚上校将会回想起',
    tags: ['孤独', '命运', '循环'],
    displayType: 'featured',
    size: 'large',
    rotation: 0,
    layout: {
      background: 'linear-gradient(90deg, rgba(212, 175, 55, 0.04) 0%, rgba(255,255,255,1) 70%)'
    },
    decoration: 'spirals',
    atmosphere: {
      glow: 'radial-gradient(circle, rgba(212, 175, 55, 0.2) 0%, transparent 70%)',
    }
  },
  {
    id: 4,
    title: '1Q84',
    author: '村上春树',
    year: '2009',
    mood: 'mysterious',
    moodLabel: '平行世界',
    color: '#6B4C7A',
    description: '两个月亮高挂在空中，一大一小，彼此相隔不远的距离',
    tags: ['科幻', '悬疑', '隐喻'],
    displayType: 'featured',
    size: 'large',
    rotation: -1,
    layout: {
      background: 'linear-gradient(135deg, rgba(107, 76, 122, 0.03) 0%, rgba(255,255,255,1) 100%)'
    },
    decoration: 'moons',
    atmosphere: {
      glow: 'radial-gradient(circle, rgba(107, 76, 122, 0.2) 0%, transparent 70%)',
    }
  },
  {
    id: 5,
    title: '三体',
    author: '刘慈欣',
    year: '2008',
    mood: 'scifi',
    moodLabel: '科幻史诗',
    color: '#00FF88',
    description: '不要回答！不要回答！不要回答！',
    tags: ['宇宙', '文明', '黑暗森林'],
    displayType: 'featured',
    size: 'large',
    rotation: -2,
    layout: {
      background: 'linear-gradient(135deg, rgba(0, 255, 136, 0.02) 0%, rgba(0, 20, 10, 0.02) 100%)'
    },
    decoration: 'tech-grid',
    atmosphere: {
      glow: 'radial-gradient(circle, rgba(0, 255, 136, 0.2) 0%, transparent 70%)',
    }
  },
  {
    id: 6,
    title: '白夜行',
    author: '东野圭吾',
    year: '1999',
    mood: 'dark',
    moodLabel: '黑暗悲剧',
    color: '#1a1a2e',
    description: '我的天空里没有太阳，总是黑夜，但并不暗，因为有东西代替了太阳',
    tags: ['悲剧', '爱情', '黑暗'],
    displayType: 'featured',
    size: 'large',
    rotation: 1,
    layout: {
      background: 'linear-gradient(180deg, rgba(26, 26, 46, 0.03) 0%, rgba(255,255,255,1) 60%)'
    },
    decoration: 'night-stars',
    atmosphere: {
      glow: 'radial-gradient(circle, rgba(26, 26, 46, 0.15) 0%, transparent 70%)',
    }
  },
  {
    id: 7,
    title: '月亮与六便士',
    author: '毛姆',
    year: '1919',
    mood: 'artistic',
    moodLabel: '艺术理想',
    color: '#C9A961',
    description: '满地都是六便士，他却抬头看见了月亮',
    tags: ['艺术', '理想', '疯狂'],
    displayType: 'featured',
    size: 'large',
    rotation: -2,
    layout: {
      background: 'linear-gradient(160deg, rgba(201, 169, 97, 0.04) 0%, rgba(255,255,255,1) 100%)'
    },
    decoration: 'moonlight',
    atmosphere: {
      glow: 'radial-gradient(circle, rgba(201, 169, 97, 0.2) 0%, transparent 70%)',
    }
  },

  // ==================== 中等尺寸 (medium) ====================
  {
    id: 8,
    title: '岛上书店',
    author: '加·泽文',
    year: '2014',
    mood: 'warm',
    moodLabel: '温暖治愈',
    color: '#E8A87C',
    description: '没有谁是一座孤岛，每本书都是一个世界',
    tags: ['治愈', '书籍', '温暖'],
    displayType: 'standard',
    size: 'medium',
    rotation: 1,
    layout: {
      background: 'linear-gradient(45deg, rgba(232, 168, 124, 0.04) 0%, rgba(255,255,255,1) 100%)'
    },
    decoration: 'books',
    atmosphere: {
      glow: 'radial-gradient(circle, rgba(232, 168, 124, 0.15) 0%, transparent 60%)',
    }
  },
  {
    id: 9,
    title: '困于沙丘',
    author: '弗兰克·赫伯特',
    year: '1965',
    mood: 'epic',
    moodLabel: '沙漠史诗',
    color: '#C4A35A',
    description: '恐惧是思维的杀手，恐惧是带来彻底毁灭的小死神',
    tags: ['科幻', '史诗', '沙漠'],
    displayType: 'standard',
    size: 'medium',
    rotation: -1,
    layout: {
      background: 'linear-gradient(135deg, rgba(196, 163, 90, 0.04) 0%, rgba(255,255,255,1) 100%)'
    },
    decoration: 'dune',
    atmosphere: {
      glow: 'radial-gradient(circle, rgba(196, 163, 90, 0.15) 0%, transparent 60%)',
    }
  },
  {
    id: 10,
    title: '莫斯科绅士',
    author: '埃默·托尔斯',
    year: '2016',
    mood: 'elegant',
    moodLabel: '优雅坚韧',
    color: '#8B7355',
    description: '如果一个人没有失去过自由，他就不会真正懂得自由的意义',
    tags: ['优雅', '坚韧', '历史'],
    displayType: 'standard',
    size: 'medium',
    rotation: 0,
    layout: {
      background: 'linear-gradient(90deg, rgba(139, 115, 85, 0.03) 0%, rgba(255,255,255,1) 70%)'
    },
    decoration: 'ornate-border',
    atmosphere: {
      glow: 'radial-gradient(circle, rgba(139, 115, 85, 0.12) 0%, transparent 60%)',
    }
  },
  {
    id: 11,
    title: '夜晚的潜水艇',
    author: '陈春成',
    year: '2020',
    mood: 'imaginative',
    moodLabel: '奇幻想象',
    color: '#1E3A5F',
    description: '想象力的光芒照亮现实的幽暗之处',
    tags: ['奇幻', '想象', '短篇小说'],
    displayType: 'standard',
    size: 'medium',
    rotation: -2,
    layout: {
      background: 'linear-gradient(180deg, rgba(30, 58, 95, 0.04) 0%, rgba(255,255,255,1) 70%)'
    },
    decoration: 'submarine',
    atmosphere: {
      glow: 'radial-gradient(circle, rgba(30, 58, 95, 0.15) 0%, transparent 60%)',
    }
  },
  {
    id: 12,
    title: '刺杀骑士团长',
    author: '村上春树',
    year: '2017',
    mood: 'metaphorical',
    moodLabel: '隐喻悬疑',
    color: '#4A4A6A',
    description: 'idea从壶里出来，idea是隐喻，idea改变世界',
    tags: ['隐喻', '艺术', '悬疑'],
    displayType: 'standard',
    size: 'medium',
    rotation: 1,
    layout: {
      background: 'linear-gradient(45deg, rgba(74, 74, 106, 0.03) 0%, rgba(255,255,255,1) 100%)'
    },
    decoration: 'metaphor',
    atmosphere: {
      glow: 'radial-gradient(circle, rgba(74, 74, 106, 0.12) 0%, transparent 60%)',
    }
  },
  {
    id: 13,
    title: '失落的卫星',
    author: '刘子超',
    year: '2020',
    mood: 'wandering',
    moodLabel: '迷失寻找',
    color: '#7B8FA1',
    description: '在破碎的世界里寻找完整的自我',
    tags: ['旅行', '迷失', '中亚'],
    displayType: 'standard',
    size: 'medium',
    rotation: -1,
    layout: {
      background: 'linear-gradient(135deg, rgba(123, 143, 161, 0.04) 0%, rgba(255,255,255,1) 100%)'
    },
    decoration: 'satellite',
    atmosphere: {
      glow: 'radial-gradient(circle, rgba(123, 143, 161, 0.12) 0%, transparent 60%)',
    }
  },
  {
    id: 14,
    title: '额尔古纳河右岸',
    author: '迟子建',
    year: '2005',
    mood: 'ethnic',
    moodLabel: '民族史诗',
    color: '#6B4423',
    description: '鄂温克族百年的兴衰，一首苍凉的生命挽歌',
    tags: ['民族', '史诗', '自然'],
    displayType: 'standard',
    size: 'medium',
    rotation: 2,
    layout: {
      background: 'linear-gradient(225deg, rgba(107, 68, 35, 0.04) 0%, rgba(255,255,255,1) 100%)'
    },
    decoration: 'river',
    atmosphere: {
      glow: 'radial-gradient(circle, rgba(107, 68, 35, 0.15) 0%, transparent 60%)',
    }
  },
  {
    id: 15,
    title: '局外人',
    author: '阿尔贝·加缪',
    year: '1942',
    mood: 'absurd',
    moodLabel: '荒诞疏离',
    color: '#2a2a2a',
    description: '今天，妈妈死了。也许是昨天，我不知道',
    tags: ['存在主义', '疏离', '荒诞'],
    displayType: 'standard',
    size: 'medium',
    rotation: -3,
    layout: {
      background: 'linear-gradient(45deg, rgba(0, 0, 0, 0.02) 0%, rgba(255,255,255,1) 100%)'
    },
    decoration: 'minimal-dots',
    atmosphere: {
      glow: 'radial-gradient(circle, rgba(0, 0, 0, 0.08) 0%, transparent 50%)',
    }
  },
  {
    id: 16,
    title: '山月记',
    author: '中岛敦',
    year: '1942',
    mood: 'philosophical-tragedy',
    moodLabel: '哲思悲剧',
    color: '#4A5D6E',
    description: '因为害怕自己并非明珠而不敢刻苦琢磨',
    tags: ['哲思', '悲剧', '人性'],
    displayType: 'standard',
    size: 'medium',
    rotation: 1,
    layout: {
      background: 'linear-gradient(160deg, rgba(74, 93, 110, 0.03) 0%, rgba(255,255,255,1) 100%)'
    },
    decoration: 'tiger-moon',
    atmosphere: {
      glow: 'radial-gradient(circle, rgba(74, 93, 110, 0.12) 0%, transparent 60%)',
    }
  },
  {
    id: 17,
    title: '我的阿勒泰',
    author: '李娟',
    year: '2010',
    mood: 'natural-healing',
    moodLabel: '自然治愈',
    color: '#7CB342',
    description: '在辽阔的天地间，感受生命最本真的喜悦',
    tags: ['自然', '治愈', '散文'],
    displayType: 'standard',
    size: 'medium',
    rotation: -1,
    layout: {
      background: 'linear-gradient(120deg, rgba(124, 179, 66, 0.04) 0%, rgba(255,255,255,1) 100%)'
    },
    decoration: 'grassland',
    atmosphere: {
      glow: 'radial-gradient(circle, rgba(124, 179, 66, 0.15) 0%, transparent 60%)',
    }
  },
  {
    id: 18,
    title: '人生海海',
    author: '麦家',
    year: '2019',
    mood: 'resilient',
    moodLabel: '命运坚韧',
    color: '#1E88E5',
    description: '人生海海，山山而川，不过尔尔',
    tags: ['命运', '坚韧', '人生'],
    displayType: 'standard',
    size: 'medium',
    rotation: 2,
    layout: {
      background: 'linear-gradient(200deg, rgba(30, 136, 229, 0.04) 0%, rgba(255,255,255,1) 100%)'
    },
    decoration: 'waves',
    atmosphere: {
      glow: 'radial-gradient(circle, rgba(30, 136, 229, 0.15) 0%, transparent 60%)',
    }
  },
  {
    id: 19,
    title: '马可瓦尔多',
    author: '伊塔洛·卡尔维诺',
    year: '1963',
    mood: 'whimsical',
    moodLabel: '童心诗意',
    color: '#66BB6A',
    description: '城市里的自然诗人，在平凡中发现诗意',
    tags: ['童心', '诗意', '城市'],
    displayType: 'standard',
    size: 'medium',
    rotation: -2,
    layout: {
      background: 'linear-gradient(90deg, rgba(102, 187, 106, 0.03) 0%, rgba(255,255,255,1) 80%)'
    },
    decoration: 'seasons',
    atmosphere: {
      glow: 'radial-gradient(circle, rgba(102, 187, 106, 0.12) 0%, transparent 60%)',
    }
  },
  {
    id: 20,
    title: '基督山伯爵',
    author: '大仲马',
    year: '1844',
    mood: 'revenge-epic',
    moodLabel: '复仇史诗',
    color: '#8B0000',
    description: '等待和希望，人类全部的智慧就包含在这两个词中',
    tags: ['复仇', '史诗', '正义'],
    displayType: 'standard',
    size: 'medium',
    rotation: 1,
    layout: {
      background: 'linear-gradient(135deg, rgba(139, 0, 0, 0.04) 0%, rgba(255,255,255,1) 100%)'
    },
    decoration: 'cross',
    atmosphere: {
      glow: 'radial-gradient(circle, rgba(139, 0, 0, 0.15) 0%, transparent 60%)',
    }
  },
  {
    id: 21,
    title: '无人生还',
    author: '阿加莎·克里斯蒂',
    year: '1939',
    mood: 'mystery',
    moodLabel: '悬疑推理',
    color: '#2C3E50',
    description: '十个印第安小男孩，为了吃饭去赴宴，一个被呛死，还剩下九个',
    tags: ['悬疑', '推理', '孤岛'],
    displayType: 'standard',
    size: 'medium',
    rotation: -1,
    layout: {
      background: 'linear-gradient(180deg, rgba(44, 62, 80, 0.04) 0%, rgba(255,255,255,1) 70%)'
    },
    decoration: 'soldiers',
    atmosphere: {
      glow: 'radial-gradient(circle, rgba(44, 62, 80, 0.12) 0%, transparent 60%)',
    }
  },
  {
    id: 22,
    title: '嫌疑人X的献身',
    author: '东野圭吾',
    year: '2005',
    mood: 'sacrifice-love',
    moodLabel: '牺牲之爱',
    color: '#C62828',
    description: '这是最纯粹的爱情，也是最悲伤的爱情',
    tags: ['悬疑', '爱情', '牺牲'],
    displayType: 'standard',
    size: 'medium',
    rotation: 0,
    layout: {
      background: 'linear-gradient(45deg, rgba(198, 40, 40, 0.04) 0%, rgba(255,255,255,1) 100%)'
    },
    decoration: 'heart-puzzle',
    atmosphere: {
      glow: 'radial-gradient(circle, rgba(198, 40, 40, 0.15) 0%, transparent 60%)',
    }
  },

  // ==================== 小尺寸 (small) ====================
  {
    id: 23,
    title: '桃花源记',
    author: '陶渊明',
    year: '421',
    mood: 'utopia',
    moodLabel: '理想田园',
    color: '#81C784',
    description: '芳草鲜美，落英缤纷，有良田美池桑竹之属',
    tags: ['乌托邦', '田园', '隐逸'],
    displayType: 'compact',
    size: 'small',
    rotation: -1,
    layout: {
      background: 'linear-gradient(120deg, rgba(129, 199, 132, 0.04) 0%, rgba(255,255,255,1) 100%)'
    },
    decoration: 'blossoms',
    atmosphere: {
      glow: 'radial-gradient(circle, rgba(129, 199, 132, 0.12) 0%, transparent 50%)',
    }
  }
]

// 情绪色映射
export const moodColors = {
  healing: '#4A5D23',
  philosophical: '#5D4E37',
  magical: '#D4AF37',
  mysterious: '#6B4C7A',
  scifi: '#00FF88',
  dark: '#1a1a2e',
  artistic: '#C9A961',
  warm: '#E8A87C',
  epic: '#C4A35A',
  elegant: '#8B7355',
  imaginative: '#1E3A5F',
  metaphorical: '#4A4A6A',
  wandering: '#7B8FA1',
  ethnic: '#6B4423',
  absurd: '#2a2a2a',
  'philosophical-tragedy': '#4A5D6E',
  'natural-healing': '#7CB342',
  resilient: '#1E88E5',
  whimsical: '#66BB6A',
  'revenge-epic': '#8B0000',
  mystery: '#2C3E50',
  'sacrifice-love': '#C62828',
  utopia: '#81C784',
}

// 布局配置导出（用于后续扩展）
export const layoutConfig = {
  // 每行书籍数量范围
  booksPerRow: {
    min: 3,
    max: 5
  },
  // 书籍尺寸配置
  sizes: {
    small: { width: '260px', minHeight: '360px' },
    medium: { width: '320px', minHeight: '400px' },
    large: { width: '380px', minHeight: '440px' }
  }
}

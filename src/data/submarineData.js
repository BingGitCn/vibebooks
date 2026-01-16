// 《夜晚的潜水艇》完整数据配置
// 包含所有短篇小说的探索数据、收集物品、解谜要素等

export const submarineData = {
  // 深度区域配置
  depthZones: [
    {
      depth: 0,
      name: '表层带',
      position: 0,
      description: '0-200m 阳光渗透区',
      colorStart: '#87CEEB',
      colorEnd: '#1E90FF',
      stories: ['main', 'chibobo']
    },
    {
      depth: 200,
      name: '中层带',
      position: 20,
      description: '200-800m 想象力区',
      colorStart: '#1E90FF',
      colorEnd: '#0066CC',
      stories: ['main', 'mushroom']
    },
    {
      depth: 800,
      name: '半深层带',
      position: 45,
      description: '800-1500m 记忆区',
      colorStart: '#0066CC',
      colorEnd: '#003366',
      stories: ['zhufeng', 'main']
    },
    {
      depth: 1500,
      name: '深层带',
      position: 65,
      description: '1500-2500m 艺术区',
      colorStart: '#003366',
      colorEnd: '#001A33',
      stories: ['pen', 'musician', 'main']
    },
    {
      depth: 2500,
      name: '深渊带',
      position: 85,
      description: '2500-3800m 遗忘区',
      colorStart: '#001A33',
      colorEnd: '#000000',
      stories: ['main']
    },
    {
      depth: 3800,
      name: '海沟带',
      position: 100,
      description: '现实世界',
      colorStart: '#000000',
      colorEnd: '#0d1b2a',
      stories: ['main', 'ending']
    }
  ],

  // 收集物品数据
  collections: [
    // 《尺波》微缩人
    {
      id: 'chibobo_1',
      name: '微缩将军',
      icon: '⚔️',
      story: '尺波中的将军，只有拇指大小，却统领着千军万马。',
      collected: false,
      zone: 0,
      rarity: 'common'
    },
    {
      id: 'chibobo_2',
      name: '微缩书生',
      icon: '📚',
      story: '在微缩世界里，依然有人在苦读圣贤书。',
      collected: false,
      zone: 0,
      rarity: 'common'
    },
    {
      id: 'chibobo_3',
      name: '微缩商人',
      icon: '💰',
      story: '秤虽小，却称得起整个微缩世界的悲欢。',
      collected: false,
      zone: 0,
      rarity: 'common'
    },
    {
      id: 'chibobo_4',
      name: '微缩孩童',
      icon: '👶',
      story: '尺波中的孩子，不知道自己是被缩小的人。',
      collected: false,
      zone: 0,
      rarity: 'rare'
    },
    {
      id: 'chibobo_5',
      name: '微缩皇帝',
      icon: '👑',
      story: '方寸之间的帝王，俯瞰着微缩江山。',
      collected: false,
      zone: 0,
      rarity: 'legendary'
    },
    // 《书中蘑菇》孢子
    {
      id: 'mushroom_1',
      name: '荧光孢子',
      icon: '✨',
      story: '在书页上生长的蘑菇，散发着幽幽的荧光。',
      collected: false,
      zone: 200,
      rarity: 'common'
    },
    {
      id: 'mushroom_2',
      name: '故事孢子',
      icon: '📖',
      story: '每一个孢子都承载着一个未被讲述的故事。',
      collected: false,
      zone: 200,
      rarity: 'common'
    },
    {
      id: 'mushroom_3',
      name: '记忆孢子',
      icon: '🧠',
      story: '蘑菇吸收了书中的文字，长出了记忆的形状。',
      collected: false,
      zone: 200,
      rarity: 'rare'
    },
    {
      id: 'mushroom_4',
      name: '想象孢子',
      icon: '💭',
      story: '这是作者想象力凝结成的实体。',
      collected: false,
      zone: 200,
      rarity: 'rare'
    },
    {
      id: 'mushroom_5',
      name: '黄金孢子',
      icon: '🏆',
      story: '最稀有的蘑菇孢子，据说能实现一个愿望。',
      collected: false,
      zone: 200,
      rarity: 'legendary'
    },
    // 《竹峰寺》钥匙
    {
      id: 'zhufeng_1',
      name: '山门钥匙',
      icon: '🗝️',
      story: '竹峰寺山门的钥匙，隐藏了一百年的秘密。',
      collected: false,
      zone: 800,
      rarity: 'rare'
    },
    {
      id: 'zhufeng_2',
      name: '大殿钥匙',
      icon: '🗝️',
      story: '打开大殿的钥匙，佛像下藏着一个故事。',
      collected: false,
      zone: 800,
      rarity: 'rare'
    },
    {
      id: 'zhufeng_3',
      name: '藏经阁钥匙',
      icon: '🗝️',
      story: '藏经阁的钥匙，里面藏着一段古老的记忆。',
      collected: false,
      zone: 800,
      rarity: 'legendary'
    },
    // 《传彩笔》灵感碎片
    {
      id: 'pen_1',
      name: '灵感碎片·夜',
      icon: '🌙',
      story: '深夜写作时，月光洒在纸上的灵感。',
      collected: false,
      zone: 1500,
      rarity: 'common'
    },
    {
      id: 'pen_2',
      name: '灵感碎片·风',
      icon: '🍃',
      story: '风吹过窗棂，带来了一个故事的雏形。',
      collected: false,
      zone: 1500,
      rarity: 'common'
    },
    {
      id: 'pen_3',
      name: '灵感碎片·雨',
      icon: '🌧️',
      story: '雨声淅沥，文字如泉水般涌出。',
      collected: false,
      zone: 1500,
      rarity: 'common'
    },
    {
      id: 'pen_4',
      name: '灵感碎片·花',
      icon: '🌸',
      story: '花开的瞬间，捕捉到的美的灵感。',
      collected: false,
      zone: 1500,
      rarity: 'rare'
    },
    {
      id: 'pen_5',
      name: '传彩笔本体',
      icon: '✒️',
      story: '那支传说中的笔，能写出世间一切文字。',
      collected: false,
      zone: 1500,
      rarity: 'legendary'
    },
    // 《音乐家》记忆乐章
    {
      id: 'musician_1',
      name: '童年乐章',
      icon: '🎹',
      story: '第一次触摸钢琴琴键的记忆，黑白键上的梦。',
      collected: false,
      zone: 1500,
      rarity: 'common'
    },
    {
      id: 'musician_2',
      name: '演奏乐章',
      icon: '🎼',
      story: '在聚光灯下演奏，掌声雷动的时刻。',
      collected: false,
      zone: 1500,
      rarity: 'common'
    },
    {
      id: 'musician_3',
      name: '失聪乐章',
      icon: '🔇',
      story: '世界陷入寂静，但心中的旋律从未停止。',
      collected: false,
      zone: 1500,
      rarity: 'rare'
    },
    {
      id: 'musician_4',
      name: '记忆乐章',
      icon: '🎵',
      story: '那些永不消逝的旋律，深藏在心底。',
      collected: false,
      zone: 1500,
      rarity: 'rare'
    },
    // 主线：想象碎片
    {
      id: 'main_1',
      name: '潜水艇蓝图',
      icon: '🛥️',
      story: '童年画在纸上的潜水艇，竟然在梦境中成了真。',
      collected: false,
      zone: 0,
      rarity: 'legendary'
    },
    {
      id: 'main_2',
      name: '想象之翼',
      icon: '🦋',
      story: '想象力让主角得以飞翔，超越现实的束缚。',
      collected: false,
      zone: 200,
      rarity: 'rare'
    },
    {
      id: 'main_3',
      name: '第一个梦境',
      icon: '💤',
      story: '第一次在梦中驾驶潜水艇，那是自由的起点。',
      collected: false,
      zone: 200,
      rarity: 'rare'
    },
    {
      id: 'main_4',
      name: '父亲的叹息',
      icon: '😔',
      story: '父亲的叹息，是想象力开始消散的信号。',
      collected: false,
      zone: 800,
      rarity: 'common'
    },
    {
      id: 'main_5',
      name: '作业堆',
      icon: '📚',
      story: '越来越多的作业，逐渐挤占了想象的空间。',
      collected: false,
      zone: 800,
      rarity: 'common'
    },
    {
      id: 'main_6',
      name: '考卷',
      icon: '📄',
      story: '试卷上的红叉，像是给想象力打上的叉。',
      collected: false,
      zone: 1500,
      rarity: 'common'
    },
    {
      id: 'main_7',
      name: '老师的责备',
      icon: '👩‍🏫',
      story: '"别做白日梦了"——这句话杀死了一个世界。',
      collected: false,
      zone: 1500,
      rarity: 'common'
    },
    {
      id: 'main_8',
      name: '褪色的画笔',
      icon: '🖌️',
      story: '画笔上的颜色，一点一点地褪去。',
      collected: false,
      zone: 2500,
      rarity: 'rare'
    },
    {
      id: 'main_9',
      name: '生锈的潜水艇',
      icon: '🛥️',
      story: '潜水艇开始生锈，那是想象力消逝的隐喻。',
      collected: false,
      zone: 2500,
      rarity: 'rare'
    },
    {
      id: 'main_10',
      name: '最后的梦',
      icon: '🌙',
      story: '最后一次梦见潜水艇，之后便是永久的遗忘。',
      collected: false,
      zone: 2500,
      rarity: 'legendary'
    },
    {
      id: 'main_11',
      name: '成年的我',
      icon: '👔',
      story: '长大后，成了一个普通的大人。',
      collected: false,
      zone: 3800,
      rarity: 'common'
    },
    {
      id: 'main_12',
      name: '办公桌',
      icon: '💼',
      story: '办公桌上的文件，取代了童年的画纸。',
      collected: false,
      zone: 3800,
      rarity: 'common'
    },
    {
      id: 'main_13',
      name: '消失的入口',
      icon: '🚪',
      story: '再也找不到进入那个世界的入口。',
      collected: false,
      zone: 3800,
      rarity: 'rare'
    },
    {
      id: 'main_14',
      name: '模糊的记忆',
      icon: '🌫️',
      story: '所有的记忆，都变成了模糊的影子。',
      collected: false,
      zone: 3800,
      rarity: 'rare'
    },
    {
      id: 'main_15',
      name: '回响',
      icon: '💫',
      story: '但也许，在某个时刻，那个世界还在等待着。',
      collected: false,
      zone: 3800,
      rarity: 'legendary'
    }
  ],

  // 《尺波》故事数据
  chiboboStory: {
    title: '尺波',
    author: '陈春成',
    description: '一个关于微缩世界的故事',
    scenes: [
      {
        id: 'palace',
        name: '微缩宫殿',
        description: '方寸之间的宏伟宫殿',
        items: ['chibobo_1', 'chibobo_5']
      },
      {
        id: 'houses',
        name: '民居区域',
        description: '微缩人的生活空间',
        items: ['chibobo_2', 'chibobo_4']
      },
      {
        id: 'market',
        name: '市集',
        description: '热闹的微缩市集',
        items: ['chibobo_3']
      }
    ]
  },

  // 《书中蘑菇》故事数据
  mushroomStory: {
    title: '书中蘑菇',
    author: '陈春成',
    description: '书页上长出了蘑菇',
    mushrooms: [
      {
        id: 'fluorescent',
        name: '荧光蘑菇',
        color: '#00ff00',
        description: '散发着绿色荧光',
        spore: 'mushroom_1'
      },
      {
        id: 'story',
        name: '故事蘑菇',
        color: '#ff69b4',
        description: '形状像一本书',
        spore: 'mushroom_2'
      },
      {
        id: 'memory',
        name: '记忆蘑菇',
        color: '#9370db',
        description: '吸收了书的记忆',
        spore: 'mushroom_3'
      },
      {
        id: 'imagination',
        name: '想象蘑菇',
        color: '#ffa500',
        description: '想象力的结晶',
        spore: 'mushroom_4'
      },
      {
        id: 'golden',
        name: '黄金蘑菇',
        color: '#ffd700',
        description: '最稀有的蘑菇',
        spore: 'mushroom_5'
      }
    ]
  },

  // 《竹峰寺》故事数据
  zhufengStory: {
    title: '竹峰寺',
    author: '陈春成',
    description: '藏钥匙与古寺',
    locations: [
      {
        id: 'gate',
        name: '山门',
        description: '古老的山门，刻着对联',
        key: 'zhufeng_1',
        hint: '对联的第三字'
      },
      {
        id: 'hall',
        name: '大殿',
        description: '佛像庄严肃穆',
        key: 'zhufeng_2',
        hint: '佛座的莲台下'
      },
      {
        id: 'backyard',
        name: '后院',
        description: '竹林深处，古井幽幽',
        key: 'zhufeng_3',
        hint: '古井旁的石块'
      }
    ]
  },

  // 《传彩笔》故事数据
  penStory: {
    title: '传彩笔',
    author: '陈春成',
    description: '才华与代价',
    fragments: [
      { id: 'pen_1', trigger: '深夜写作' },
      { id: 'pen_2', trigger: '风吹窗棂' },
      { id: 'pen_3', trigger: '雨夜灵感' },
      { id: 'pen_4', trigger: '花开瞬间' },
      { id: 'pen_5', trigger: '得到传彩笔' }
    ]
  },

  // 《音乐家》故事数据
  musicianStory: {
    title: '音乐家',
    author: '陈春成',
    description: '音乐与记忆',
    movements: [
      {
        id: 'musician_1',
        name: '童年钢琴',
        scene: 'childhood',
        description: '黑白键上的第一次触碰'
      },
      {
        id: 'musician_2',
        name: '青年演奏',
        scene: 'performance',
        description: '聚光灯下的高光时刻'
      },
      {
        id: 'musician_3',
        name: '失聪寂静',
        scene: 'deafness',
        description: '世界陷入寂静'
      },
      {
        id: 'musician_4',
        name: '记忆旋律',
        scene: 'memory',
        description: '心中的永不消逝'
      }
    ]
  },

  // 主线故事：《夜晚的潜水艇》
  mainStory: {
    title: '夜晚的潜水艇',
    chapters: [
      {
        depth: 0,
        title: '童年梦境',
        description: '潜水艇的诞生',
        narrative: '我构想出一艘潜水艇。它不仅是存在于我的想象中，而是确确实实地，停泊在我家院子里的老槐树下。',
        mood: 'wonder'
      },
      {
        depth: 200,
        title: '想象力驰骋',
        description: '潜入想象的海',
        narrative: '每当夜晚来临，我就会潜入深海。在那里，我的想象力可以任意驰骋，创造出一个又一个奇幻的世界。',
        mood: 'joy'
      },
      {
        depth: 800,
        title: '现实入侵',
        description: '成长的第一道阴影',
        narrative: '父亲的叹息，老师的责备，作业的堆积...现实世界开始一点点侵蚀我的想象世界。',
        mood: 'tension'
      },
      {
        depth: 1500,
        title: '逐渐遗忘',
        description: '想象力的消逝',
        narrative: '考卷上的红叉，像是给想象力打上的叉。潜水艇开始生锈，那是想象力消逝的隐喻。',
        mood: 'sadness'
      },
      {
        depth: 2500,
        title: '深渊底部',
        description: '最后的梦',
        narrative: '最后一次梦见潜水艇。之后，那个入口永远消失了。',
        mood: 'loss'
      },
      {
        depth: 3800,
        title: '成年回望',
        description: '现实的回响',
        narrative: '长大后，成了一个普通的大人。但偶尔，在某些时刻，我还会想起那艘潜水艇，想起那个曾经属于我的世界。',
        mood: 'nostalgia'
      }
    ]
  },

  // 成就系统
  achievements: [
    {
      id: 'first_dive',
      name: '初次下潜',
      description: '完成第一次下潜',
      unlocked: false
    },
    {
      id: 'deep_explorer',
      name: '深海探险家',
      description: '到达深渊带',
      unlocked: false
    },
    {
      id: 'abyss_reached',
      name: '抵达深渊',
      description: '到达最深点',
      unlocked: false
    },
    {
      id: 'chibobo_master',
      name: '微缩世界大师',
      description: '收集所有《尺波》物品',
      unlocked: false
    },
    {
      id: 'mushroom_gardener',
      name: '蘑菇园丁',
      description: '收集所有《书中蘑菇》孢子',
      unlocked: false
    },
    {
      id: 'zhufeng_guardian',
      name: '竹峰守护者',
      description: '解开《竹峰寺》所有谜题',
      unlocked: false
    },
    {
      id: 'art_collector',
      name: '艺术收藏家',
      description: '收集所有《传彩笔》和《音乐家》物品',
      unlocked: false
    },
    {
      id: 'memory_keeper',
      name: '记忆守护者',
      description: '收集所有15个主线记忆碎片',
      unlocked: false
    },
    {
      id: 'completionist',
      name: '完美收藏',
      description: '收集所有50个物品',
      unlocked: false
    }
  ]
}

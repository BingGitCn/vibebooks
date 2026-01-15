<script setup>
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import BookCard from '../components/BookCard.vue'

const booksSectionRef = ref(null)

const enterBooks = () => {
  booksSectionRef.value?.scrollIntoView({ behavior: 'smooth' })
}

const books = ref([
  {
    id: 1,
    title: '小王子',
    author: '安托万·德·圣-埃克苏佩里',
    mood: 'healing',
    moodColor: '#4A5D23',
    quote: '所有的大人都曾经是小孩，虽然只有少数人记得。',
    description: '一个关于爱、失去与成长的星际旅程',
    immersivePage: '/prince.html'
  },
  {
    id: 2,
    title: '1984',
    author: '乔治·奥威尔',
    mood: 'scifi',
    moodColor: '#00FF88',
    quote: '战争即和平，自由即奴役，无知即力量。',
    description: '在极权的阴影下，思想是最后的避难所',
    immersivePage: null
  },
  {
    id: 3,
    title: '局外人',
    author: '阿尔贝·加缪',
    mood: 'melancholy',
    moodColor: '#2C3E50',
    quote: '今天，妈妈死了。也许是昨天，我不知道。',
    description: '荒诞世界里最诚实的旁观者',
    immersivePage: null
  },
  {
    id: 4,
    title: '岛上书店',
    author: '加布瑞埃拉·泽文',
    mood: 'healing',
    moodColor: '#4A6741',
    quote: '没有书店的地方，算不上一个地方。',
    description: '关于阅读、爱与救赎的故事',
    immersivePage: null
  },
  {
    id: 5,
    title: '困于沙丘',
    author: '弗兰克·赫伯特',
    mood: 'epic',
    moodColor: '#D4AF37',
    quote: '恐惧是思维的杀手。',
    description: '星际史诗，沙漠星球上的权力与命运',
    immersivePage: null
  },
  {
    id: 6,
    title: '架空犯',
    author: '卡尔维诺',
    mood: 'melancholy',
    moodColor: '#3E5F8A',
    quote: '我将讲述一个不存在的人的故事。',
    description: '在虚构与现实之间游走的哲学沉思',
    immersivePage: null
  },
  {
    id: 7,
    title: '莫斯科绅士',
    author: '埃默·托尔斯',
    mood: 'epic',
    moodColor: '#8B6914',
    quote: '如果一个人不自由，那他还能成为什么样的人？',
    description: '在时代的洪流中保持尊严与优雅',
    immersivePage: null
  },
  {
    id: 8,
    title: '夜晚的潜水艇',
    author: '陈春成',
    mood: 'scifi',
    moodColor: '#2E5C6E',
    quote: '想象是一座可以随时进入的潜水艇。',
    description: '九个关于想象与现实交错的梦境',
    immersivePage: null
  },
  {
    id: 9,
    title: '撒哈拉的故事',
    author: '三毛',
    mood: 'healing',
    moodColor: '#C19A6B',
    quote: '生命的过程，无论是阳春白雪，还是青菜豆腐，我都得尝尝。',
    description: '在沙漠中寻找自由的灵魂',
    immersivePage: null
  },
  {
    id: 10,
    title: '刺杀骑士团长',
    author: '村上春树',
    mood: 'suspense',
    moodColor: '#8B0000',
    quote: '理念，是从潜意识深处浮现出来的。',
    description: '关于艺术、历史与灵魂深处的隐喻',
    immersivePage: null
  },
  {
    id: 11,
    title: '失落的卫星',
    author: '刘子超',
    mood: 'melancholy',
    moodColor: '#5D6D7E',
    quote: '在地图上消失的地方，时间以另一种方式流动。',
    description: '深入中亚七国的旅行记录',
    immersivePage: null
  },
  {
    id: 12,
    title: '额尔古纳河右岸',
    author: '迟子建',
    mood: 'epic',
    moodColor: '#654321',
    quote: '我没有看到他们的眼泪，只听到风的声音。',
    description: '鄂温克族百年兴衰的苍凉史诗',
    immersivePage: null
  },
  {
    id: 13,
    title: '置身事内',
    author: '兰小欢',
    mood: 'wealth',
    moodColor: '#FF6600',
    quote: '理解中国经济，从理解政府开始。',
    description: '读懂中国政府与经济发展的逻辑',
    immersivePage: null
  },
  {
    id: 14,
    title: '文城',
    author: '余华',
    mood: 'melancholy',
    moodColor: '#4A4A4A',
    quote: '人就是这样，有时候以为自己找到了，其实还在找。',
    description: '乱世之中关于寻找与宿命的悲歌',
    immersivePage: null
  },
  {
    id: 15,
    title: '挪威的森林',
    author: '村上春树',
    mood: 'melancholy',
    moodColor: '#2C5F7C',
    quote: '死并非生的对立面，而是作为生的一部分永存。',
    description: '青春、爱情与死亡的忧伤挽歌',
    immersivePage: null
  },
  {
    id: 16,
    title: '小城与不确定性的墙',
    author: '村上春树',
    mood: 'scifi',
    moodColor: '#4A7C8C',
    quote: '墙的存在，是为了区分什么是可能的，什么是不可能的。',
    description: '在现实与虚幻之间寻找出口',
    immersivePage: null
  },
  {
    id: 17,
    title: '1Q84',
    author: '村上春树',
    mood: 'suspense',
    moodColor: '#8B0000',
    quote: '有两个月亮的世界，真的存在吗？',
    description: '两个平行世界的宏大叙事',
    immersivePage: null
  },
  {
    id: 18,
    title: '山月记',
    author: '中岛敦',
    mood: 'melancholy',
    moodColor: '#4A5D6E',
    quote: '因为害怕自己并非明珠而不敢刻苦琢磨。',
    description: '关于人性、自我怀疑与转化的寓言',
    immersivePage: null
  },
  {
    id: 19,
    title: '射雕英雄传',
    author: '金庸',
    mood: 'epic',
    moodColor: '#8B4513',
    quote: '侠之大者，为国为民。',
    description: '江湖恩怨与家国情怀的经典武侠',
    immersivePage: null
  },
  {
    id: 20,
    title: '月亮与六便士',
    author: '毛姆',
    mood: 'melancholy',
    moodColor: '#4A6741',
    quote: '满地都是六便士，他却抬头看见了月亮。',
    description: '理想与现实的永恒抉择',
    immersivePage: null
  },
  {
    id: 21,
    title: '明亮的夜晚',
    author: '崔恩荣',
    mood: 'healing',
    moodColor: '#7CB9E8',
    quote: '在黑暗中，也能找到前行的光。',
    description: '女性友谊与自我救赎的温暖故事',
    immersivePage: null
  },
  {
    id: 22,
    title: '小岛经济学',
    author: '彼得·希夫',
    mood: 'wealth',
    moodColor: '#D2691E',
    quote: '经济学不是复杂的数学，而是朴素的常识。',
    description: '用寓言读懂经济运行的真相',
    immersivePage: null
  },
  {
    id: 23,
    title: '我的阿勒泰',
    author: '李娟',
    mood: 'healing',
    moodColor: '#8FBC8F',
    quote: '在遥远的北疆，生活是如此简单而纯粹。',
    description: '边疆生活的诗意记录',
    immersivePage: null
  },
  {
    id: 24,
    title: '我与地坛',
    author: '史铁生',
    mood: 'melancholy',
    moodColor: '#3E4E5E',
    quote: '死是一件不必急于求成的事，死是一个必然会降临的节日。',
    description: '在命运的重压下思考生命的意义',
    immersivePage: null
  },
  {
    id: 25,
    title: '太白金星有点烦',
    author: '马伯庸',
    mood: 'healing',
    moodColor: '#C9A961',
    quote: '神仙也有神仙的烦恼。',
    description: '用幽默解构西游故事的职场寓言',
    immersivePage: null
  },
  {
    id: 26,
    title: '百年孤独',
    author: '加西亚·马尔克斯',
    mood: 'epic',
    moodColor: '#DAA520',
    quote: '生命中所有辉煌，终将逝去。',
    description: '一个家族七代人的魔幻史诗',
    immersivePage: null
  },
  {
    id: 27,
    title: '面纱',
    author: '毛姆',
    mood: 'melancholy',
    moodColor: '#5D4E6E',
    quote: '我知道你愚蠢、轻浮、虚荣，但我爱你。',
    description: '在虚荣与真爱之间的挣扎与觉醒',
    immersivePage: null
  },
  {
    id: 28,
    title: '草民',
    author: '鲁迅',
    mood: 'suspense',
    moodColor: '#4A4A4A',
    quote: '救救孩子。',
    description: '对封建礼教最深刻的批判',
    immersivePage: null
  },
  {
    id: 29,
    title: '人生海海',
    author: '麦家',
    mood: 'epic',
    moodColor: '#2F4F4F',
    quote: '人生海海，潮起潮落。',
    description: '一个人与一个时代的纠葛',
    immersivePage: null
  },
  {
    id: 30,
    title: '长安的荔枝',
    author: '马伯庸',
    mood: 'healing',
    moodColor: '#DC143C',
    quote: '即使是一颗荔枝，也能见证历史的重量。',
    description: '小人物在大历史中的生存智慧',
    immersivePage: null
  },
  {
    id: 31,
    title: '霍乱时期的爱情',
    author: '加西亚·马尔克斯',
    mood: 'epic',
    moodColor: '#C41E3A',
    quote: '等待了五十三年七个月零十天，只为等待一个答案。',
    description: '跨越半个世纪的旷世之恋',
    immersivePage: null
  },
  {
    id: 32,
    title: '山茶文具店',
    author: '小川糸',
    mood: 'healing',
    moodColor: '#F4A460',
    quote: '每一封信，都是一颗心的传递。',
    description: '在镰仓的温柔时光里修补心灵',
    immersivePage: null
  },
  {
    id: 33,
    title: '马可瓦尔多',
    author: '卡尔维诺',
    mood: 'healing',
    moodColor: '#6B8E23',
    quote: '在城市的钢筋水泥中，寻找一片自然。',
    description: '一位普通工人眼中的诗意城市',
    immersivePage: null
  },
  {
    id: 34,
    title: '基督山伯爵',
    author: '大仲马',
    mood: 'epic',
    moodColor: '#B8860B',
    quote: '等待与希望，这就是人生。',
    description: '关于复仇、宽恕与重生的经典',
    immersivePage: null
  },
  {
    id: 35,
    title: '悉达多',
    author: '赫尔曼·黑塞',
    mood: 'healing',
    moodColor: '#8B4513',
    quote: '知识可以传授，但智慧不能。',
    description: '一个求道者的心灵之旅',
    immersivePage: null
  },
  {
    id: 36,
    title: '无人生还',
    author: '阿加莎·克里斯蒂',
    mood: 'suspense',
    moodColor: '#1C1C1C',
    quote: '十个印第安小男孩，吃完晚饭去喝酒。',
    description: '孤岛上的终极推理游戏',
    immersivePage: null
  },
  {
    id: 37,
    title: '解忧杂货店',
    author: '东野圭吾',
    mood: 'healing',
    moodColor: '#FF6347',
    quote: '你的地图是一张白纸，所以即使想决定目的地，也不知道路在哪里。',
    description: '跨越时空的温暖回信',
    immersivePage: null
  },
  {
    id: 38,
    title: '嫌疑人X的献身',
    author: '东野圭吾',
    mood: 'suspense',
    moodColor: '#2F4F4F',
    quote: '为了一个人，可以牺牲到什么地步？',
    description: '最纯粹的爱，最极致的犯罪',
    immersivePage: null
  },
  {
    id: 39,
    title: '三体',
    author: '刘慈欣',
    mood: 'scifi',
    moodColor: '#00CED1',
    quote: '不要回答！不要回答！不要回答！',
    description: '人类文明与外星文明的博弈',
    immersivePage: null
  },
  {
    id: 40,
    title: '白夜行',
    author: '东野圭吾',
    mood: 'suspense',
    moodColor: '#2C3E50',
    quote: '我的天空里没有太阳，总是黑夜，但并不暗。',
    description: '在黑暗中相爱的两个孩子',
    immersivePage: null
  }
])

const titleRef = ref(null)

onMounted(() => {
  const tl = gsap.timeline()
  tl.from(titleRef.value, {
    y: 100,
    opacity: 0,
    duration: 1.5,
    ease: 'power3.out'
  })
})
</script>

<template>
  <div class="min-h-screen bg-black">
    <!-- Hero Section -->
    <section class="relative h-[60vh] flex flex-col items-center justify-center overflow-hidden bg-black">
      <div ref="titleRef" class="relative z-10 text-center">
        <h1 class="font-serif text-6xl md:text-8xl font-bold mb-6 tracking-tight text-white">
          <span>vibe</span><span style="color: #D4AF37;">Books</span>
        </h1>
        <p class="text-gray-400 text-lg md:text-xl font-light tracking-wide mb-8">
          每一本书，都是一个可探索的宇宙
        </p>
        <button
          @click="enterBooks"
          class="px-10 py-3 text-lg font-serif border-2 rounded-lg hover:scale-105 transition-transform duration-300"
          style="border-color: #D4AF37; color: #D4AF37;"
        >
          探索书籍 →
        </button>
      </div>
    </section>

    <!-- 书籍展示区域 -->
    <section ref="booksSectionRef" class="py-20 px-8" style="background: #1a1a1a; min-height: 100vh;">
      <div class="max-w-7xl mx-auto">
        <h2 class="font-serif text-4xl md:text-5xl mb-16 text-center text-white">
          <span style="color: #D4AF37;">探索</span> 书籍的灵魂
        </h2>
        <p class="text-center text-gray-400 mb-12">共 {{ books.length }} 本书籍</p>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
          <div
            v-for="book in books"
            :key="book.id"
            class="relative w-64 h-80 cursor-pointer group"
          >
            <div class="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 border-2 rounded-lg overflow-hidden transition-all duration-300 group-hover:scale-105"
                 :style="{ borderColor: book.moodColor }">
              <div class="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <h3 class="font-serif text-2xl font-bold mb-2" :style="{ color: book.moodColor }">{{ book.title }}</h3>
                <p class="text-gray-400 text-sm mb-4">{{ book.author }}</p>
                <p class="text-gray-300 text-base italic leading-relaxed">"{{ book.quote }}"</p>
              </div>
            </div>
            <p class="absolute -bottom-12 left-1/2 -translate-x-1/2 w-72 text-center text-gray-400 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {{ book.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="py-20 text-center border-t border-gray-800" style="background: #0a0a0a;">
      <p class="text-gray-600">Designed with passion for books</p>
    </footer>
  </div>
</template>

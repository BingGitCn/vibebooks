<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  router.push('/yearbook/science-fiction')
}

// 三部曲展开状态
const expandedBook = ref(null)

const toggleBook = (index) => {
  if (expandedBook.value === index) {
    expandedBook.value = null
  } else {
    expandedBook.value = index
  }
}

// 三部曲数据
const trilogy = [
  {
    id: 1,
    title: '三体',
    subtitle: 'The Three-Body Problem',
    year: '2006',
    concept: '与外星文明的首次接触',
    characters: '叶文洁、汪淼、史强',
    plot: [
      '文革期间，叶文洁按下发射按钮，向宇宙发出人类文明的信号',
      '三体世界收到信号，决定入侵地球',
      '纳米科学家汪淼卷入神秘的科学边界组织',
      '在三体游戏中，玩家体验三体文明的恒纪元与乱纪元',
      'ETO（地球三体组织）成立，分为降临派、拯救派、幸存派',
      '古筝行动：汪淼的纳米材料切割"审判日"号',
      '智子封锁：人类基础科学被锁死，科技无法突破'
    ],
    keyEvents: [
      '红岸基地建立',
      '叶文洁收到三体信号',
      '三体游戏开启',
      '古筝行动',
      '智子封锁'
    ]
  },
  {
    id: 2,
    title: '三体Ⅱ·黑暗森林',
    subtitle: 'The Dark Forest',
    year: '2008',
    concept: '宇宙社会学公理',
    characters: '罗辑、章北海、庄颜',
    plot: [
      '面壁计划：4位面壁者获得无限资源，计划不需解释',
      '罗辑被选为面壁者，他悟出了宇宙社会学的真谛',
      '水滴攻击：三体的探测器"水滴"摧毁人类太空舰队',
      '黑暗战役：逃离的战舰之间互相攻击争夺资源',
      '罗辑利用"黑暗森林法则"建立威慑：向宇宙广播三体坐标',
      '三体被迫停止入侵，威慑纪元开始',
      '章北海的远见：一直主张研制无工质辐射推进飞船'
    ],
    keyEvents: [
      '面壁计划启动',
      '罗辑悟出公理',
      '水滴摧毁舰队',
      '黑暗战役',
      '黑暗森林威慑建立'
    ]
  },
  {
    id: 3,
    title: '三体Ⅲ·死神永生',
    subtitle: 'Death\'s End',
    year: '2010',
    concept: '降维打击与宇宙重启',
    characters: '程心、云天明、AA',
    plot: [
      '威慑纪元60年，程心接任执剑人，三体立即发动攻击',
      '万有引力号飞船在太空中发出广播，三体母星被毁',
      '云天明的三个童话：隐藏着星际移民的技术提示',
      '曲率驱动：光速飞船留下的"航迹"形成黑域',
      '二向箔攻击：太阳系被二维化，所有生命成为画卷',
      '程心和AA乘坐光速飞船逃离，经历时间膨胀',
      '宇宙即将重启，所有文明归还质量，小宇宙必须归零'
    ],
    keyEvents: [
      '威慑失败',
      '引力波广播',
      '云天明童话',
      '二向箔打击',
      '太阳系二维化',
      '小宇宙归零'
    ]
  }
]

// 宇宙法则概念
const concepts = [
  {
    name: '三体世界',
    subtitle: 'Three-Body Problem',
    description: '距离地球4光年的半人马座三星系统，三颗恒星做无规律运动，文明在恒纪元与乱纪元之间反复毁灭与重生。'
  },
  {
    name: '智子',
    subtitle: 'Sophon',
    description: '将质子展开到二维，蚀刻电路后重新折叠，成为超级计算机。可以干扰粒子加速器，锁死人类基础科学，并实时监控地球。'
  },
  {
    name: '黑暗森林法则',
    subtitle: 'Dark Forest Theory',
    description: '宇宙社会学的公理：1.生存是文明的第一需要；2.文明不断增长和扩张，但宇宙中的物质总量保持不变。结论：宇宙是一座黑暗森林，每个文明都是带枪的猎人。'
  },
  {
    name: '降维打击',
    subtitle: 'Dimensional Strike',
    description: '使用"二向箔"将三维空间坍塌成二维，所有物质被压扁成无限薄的画卷。太阳系因此毁灭，成为梵高的《星空》。'
  },
  {
    name: '二向箔',
    subtitle: 'Dual Vector Foil',
    description: '一种包装在小纸片中的宇宙规律武器，一旦启用会使周围空间持续跌落到二维。这是宇宙中最干净的毁灭方式。'
  },
  {
    name: '宇宙重启',
    subtitle: 'Universe Reboot',
    description: '宇宙在不断膨胀中走向热寂，大宇宙需要所有小宇宙归还质量才能重启。程心面临选择：保留小宇宙的生态，还是归还质量让宇宙重生。'
  }
]

// 金句
const quotes = [
  {
    text: '给岁月以文明，而不是给文明以岁月。',
    source: '《三体Ⅱ·黑暗森林》'
  },
  {
    text: '弱小和无知不是生存的障碍，傲慢才是。',
    source: '《三体Ⅲ·死神永生》'
  },
  {
    text: '宇宙是一座黑暗森林，每个文明都是带枪的猎人。',
    source: '《三体Ⅱ·黑暗森林》'
  },
  {
    text: '你们是虫子。',
    source: '《三体》'
  },
  {
    text: '我要送你一颗星星。',
    source: '《三体Ⅲ·死神永生》'
  },
  {
    text: '失去人性，失去很多；失去兽性，失去一切。',
    source: '《三体Ⅱ·黑暗森林》'
  }
]

// 档案馆 - 人物
const archiveCharacters = [
  { name: '叶文洁', role: '红岸基地研究员', description: '按下发射按钮，向宇宙发出人类文明的第一声呐喊，引发三体危机。' },
  { name: '汪淼', role: '纳米科学家', description: '卷入科学边界组织，在三体游戏中体验三体文明的兴衰。' },
  { name: '史强', role: '警察', description: '精明干练，幽默直率，协助汪淼揭开科学边界的真相。' },
  { name: '伊文斯', role: 'ETO领袖', description: '继承者运动领袖，地球三体组织创始人，极端环保主义者。' },
  { name: '罗辑', role: '面壁者/执剑人', description: '悟出黑暗森林法则，建立威慑体系，守护人类半个世纪。' },
  { name: '泰勒', role: '面壁者', description: '前美国国防部长，计划用球状闪电和水滴攻击三体舰队，后自杀。' },
  { name: '雷迪亚兹', role: '面壁者', description: '委内瑞拉总统，计划用恒星型氢弹摧毁太阳系，被本国人民石刑处死。' },
  { name: '希恩斯', role: '面壁者', description: '英国脑科学家，创建思想钢印，试图逃亡主义，被妻子山衫惠子刺杀。' },
  { name: '山衫惠子', role: '科学家', description: '希恩斯的妻子，思想钢印的真正制定者，面壁者计划的破壁人。' },
  { name: '章北海', role: '海军军官', description: '远见卓识，一直主张研制无工质辐射推进飞船，为人类保留火种。' },
  { name: '东方延绪', role: '自然选择号舰长', description: '亚洲舰队自然选择号舰长，被章北海夺取控制权。' },
  { name: '丁仪', role: '物理学家', description: '著名物理学家，参与水滴探测，预见人类舰队的覆灭。' },
  { name: '程心', role: '执剑人', description: '仁慈但软弱，接任执剑人后威慑失败，间接导致太阳系毁灭。' },
  { name: 'AA', role: '程心的伙伴', description: '程心的朋友和同事，一同乘坐光速飞船逃离太阳系。' },
  { name: '云天明', role: '星星赠送者', description: '身患绝症时送一颗星星给程心，后被三体带走，成为人类在异星的使者。' },
  { name: '托马斯·维德', role: '程心的导师', description: '冷酷理性，"前进！前进！不择手段地前进！"是其信条。' },
  { name: '关一帆', role: '科学家', description: '跟随程心乘坐光速飞船，研究曲率驱动和黑域。' },
  { name: '褚岩', role: '蓝色空间号舰长', description: '章北海的追随者，带领蓝色空间号在黑暗战役中胜利。' },
  { name: '智子', role: '三体代理人', description: '三体制造的超级计算机，后来成为三体文明在地球的化身。' },
  { name: '朴义君', role: '韩国科学家', description: '发现三体问题的科学家，第一个自杀的物理学家。' }
]

// 档案馆 - 事件
const archiveEvents = [
  { year: '1969', event: '红岸基地建立', description: '中国在峰岭建立红岸基地，寻找外星文明。' },
  { year: '1971', event: '叶文洁进入红岸', description: '叶文洁被分配到红岸基地，开始研究太阳作为天线发射信号。' },
  { year: '1979', event: '叶文洁发出信号', description: '叶文洁收到三体信号并回复，三体世界发现地球坐标。' },
  { year: '1982', event: '叶文洁生产', description: '叶文洁生下杨冬，孩子父亲是被迫害致死的官员。' },
  { year: '2006', event: '科学边界成立', description: '科学边界组织成立，吸引大量科学家加入。' },
  { year: '2007', event: '物理学家自杀潮', description: '全球物理学家接连自杀，科学陷入绝望。' },
  { year: '2007', event: '汪淼卷入', description: '纳米科学家汪淼被卷入科学边界组织，目睹宇宙闪烁。' },
  { year: '2007', event: '三体游戏', description: '汪淼进入三体游戏，体验三体文明的恒纪元与乱纪元。' },
  { year: '2007', event: '叶文洁自白', description: '叶文洁向汪淼讲述红岸基地的历史和三体文明的存在。' },
  { year: '2007', event: '古筝行动', description: '汪淼的纳米材料切割"审判日"号，获取三体信息。' },
  { year: '2007', event: '智子封锁', description: '三体发射智子，锁死人类基础科学研究。' },
  { year: '2007', event: '三体舰队启程', description: '三体舰队启程前往地球，预计450年后到达。' },
  { year: '2007', event: '面壁计划启动', description: '联合国启动面壁计划，四位面壁者获得无限资源对抗三体。' },
  { year: '2008', event: '罗辑被选为面壁者', description: '罗辑被意外选为面壁者，开始研究宇宙社会学。' },
  { year: '2008', event: '水滴发射', description: '三体发射水滴探测器，提前到达太阳系。' },
  { year: '2009', event: '末日战役', description: '人类2000艘战舰迎战水滴，几乎全军覆没。' },
  { year: '2009', event: '黑暗战役', description: '逃离的战舰之间互相攻击，章北海战死。' },
  { year: '2009', event: '黑暗森林威慑', description: '罗辑利用黑暗森林法则建立威慑，三体被迫停止入侵。' },
  { year: '2009', event: '威慑纪元开始', description: '罗辑作为执剑人，守护人类54年。' },
  { year: '2078', event: '执剑人交接', description: '程心接替罗辑成为执剑人，威慑立即失败。' },
  { year: '2078', event: '万有引力号发射', description: '万有引力号飞船在深空中发射引力波广播。' },
  { year: '2078', event: '三体母星被毁', description: '广播后三体母星被光粒摧毁，三体舰队放弃地球。' },
  { year: '2078', event: '威慑纪元结束', description: '三体发动攻击，智子封锁地球，澳大利亚移民开始。' },
  { year: '2270', event: '掩体纪元开始', description: '人类在木星土星背后建立掩体，准备应对光粒打击。' },
  { year: '2270', event: '歌者文明', description: '歌者文明向太阳系投掷二向箔，进行降维打击。' },
  { year: '2400', event: '二向箔打击', description: '二向箔攻击太阳系，太阳系被二维化，程心乘坐光速飞船逃离。' },
  { year: '2400', event: '银河纪元开始', description: '程心和AA在银河系游历，寻找适合人类生存的星球。' },
  { year: '1890万', event: '宇宙重启', description: '程心在小宇宙中度过千万年，最终归还质量，参与宇宙重启。' }
]

// 档案馆 - 概念
const archiveConcepts = [
  // 组织
  { name: '红岸基地', category: 'ORGANIZATION', description: '中国在文革期间建立的寻找外星文明的秘密基地，位于大兴安岭。' },
  { name: 'ETO', category: 'ORGANIZATION', description: '地球三体组织，由伊文斯领导，分为降临派、拯救派、幸存派，希望三体文明改造人类。' },
  { name: '行星防御理事会', category: 'ORGANIZATION', description: '联合国下属机构，负责对抗三体威胁，启动面壁计划。' },
  { name: '亚洲舰队', category: 'ORGANIZATION', description: '太阳系舰队的重要组成部分，拥有自然选择号等战舰。' },
  { name: '星环公司', category: 'ORGANIZATION', description: '程心创立的公司，研发光速飞船和曲率驱动技术。' },

  // 计划
  { name: '面壁计划', category: 'PLAN', description: '联合国的计划，四位面壁者获得无限资源，计划不需解释，欺骗智子。' },
  { name: '破壁计划', category: 'PLAN', description: 'ETO针对面壁者的计划，破壁人试图揭开面壁者的真实意图。' },
  { name: '掩体计划', category: 'PLAN', description: '威慑纪元后的计划，在木星土星背后建立掩体，躲避光粒打击。' },
  { name: '黑域计划', category: 'PLAN', description: '利用曲率驱动制造黑域，降低光速，向宇宙宣告地球文明无害。' },
  { name: '阶梯计划', category: 'PLAN', description: '将云天明的大脑送入太空，作为人类使者接触三体文明。' },

  // 角色
  { name: '面壁者', category: 'ROLE', description: '被选中对抗三体的四人，拥有无限资源和保密特权。' },
  { name: '执剑人', category: 'ROLE', description: '掌握黑暗森林威慑系统的人，决定两个文明的生死，威慑时间54年。' },
  { name: '破壁人', category: 'ROLE', description: 'ETO成员，专门分析和揭穿面壁者的真实计划。' },
  { name: '钢印族', category: 'ROLE', description: '被思想钢印植入逃亡主义信念的军人，在末日战役中逃离。' },

  // 技术
  { name: '智子', category: 'TECHNOLOGY', description: '将质子展开蚀刻电路后折叠的超级计算机，可锁死科技和实时监控。' },
  { name: '思想钢印', category: 'TECHNOLOGY', description: '希恩斯发明的技术，可以向大脑深处植入绝对信念。' },
  { name: '曲率驱动', category: 'TECHNOLOGY', description: '光速飞船的推进方式，通过降低前方光速实现飞行，航迹形成黑域。' },
  { name: '无工质推进', category: 'TECHNOLOGY', description: '章北海推动的核聚变引擎技术，不需要工质，适合远航。' },

  // 武器
  { name: '水滴', category: 'WEAPON', description: '三体的强互作用力探测器，表面绝对光滑，可摧毁任何人类战舰。' },
  { name: '二向箔', category: 'WEAPON', description: '宇宙规律武器，将三维空间跌落到二维，是最干净的毁灭方式。' },
  { name: '光粒', category: 'WEAPON', description: '接近光速的小质量物体，可引爆恒星，摧毁恒星系。' },
  { name: '球状闪电', category: 'WEAPON', description: '泰勒计划使用的武器，可将量子态的士兵武器化。' },

  // 概念
  { name: '黑暗森林法则', category: 'CONCEPT', description: '宇宙社会学的核心理论，解释文明间的毁灭关系，宇宙是黑暗森林。' },
  { name: '宇宙社会学', category: 'CONCEPT', description: '罗辑研究的学科，提出两条公理和两个重要概念，推导黑暗森林法则。' },
  { name: '技术爆炸', category: 'CONCEPT', description: '宇宙社会学的重要概念，文明可能在短时间内突飞猛进，威胁其他文明。' },
  { name: '猜疑链', category: 'CONCEPT', description: '宇宙社会学的重要概念，文明间无法判断对方善意，导致先发制人。' },
  { name: '黑域', category: 'CONCEPT', description: '曲率驱动航迹形成的低光速区域，可作为文明的自毁宣言，避免被打击。' },
  { name: '小宇宙', category: 'CONCEPT', description: '在第六空间创造的微型宇宙，可在大宇宙毁灭时保存文明。' },
  { name: '归零者', category: 'CONCEPT', description: '宇宙最高级文明，发起质量归还运动，试图让宇宙重启。' },
  { name: '降维打击', category: 'CONCEPT', description: '使用维度武器将空间从三维降为二维，毁灭所有生命。' },
  { name: '威慑', category: 'CONCEPT', description: '基于黑暗森林法则建立的威慑体系，通过暴露坐标同归于尽。' },
  { name: '三维到二维', category: 'CONCEPT', description: '太阳系被二向箔打击后的状态，所有物质成为无限薄的画卷。' }
]
</script>

<template>
  <div class="three-body-world">
    <!-- 顶部导航 -->
    <header class="world-header">
      <button class="exit-button" @click="goBack">
        <span class="arrow">←</span>
        <span>EXIT</span>
      </button>
      <div class="header-info">
        <div class="vol-tag">VOL.037</div>
        <h1 class="book-title">三体</h1>
        <p class="book-subtitle">EARTH'S PAST · THREE-BODY · DEATH'S END</p>
      </div>
    </header>

    <!-- Section 01: 三部曲 -->
    <section class="section">
      <div class="section-header">
        <h2 class="section-number">01</h2>
        <h3 class="section-title">三部曲</h3>
        <div class="section-line"></div>
      </div>

      <div class="trilogy-grid">
        <div
          v-for="(book, index) in trilogy"
          :key="book.id"
          class="book-card"
          :class="{ expanded: expandedBook === index }"
          @click="toggleBook(index)"
        >
          <!-- 卡片头部 -->
          <div class="book-card-header">
            <div class="book-number">{{ book.year }}</div>
            <h4 class="book-name">{{ book.title }}</h4>
            <p class="book-subtitle-en">{{ book.subtitle }}</p>
            <div class="swiss-dots"></div>
          </div>

          <div class="book-concept">{{ book.concept }}</div>

          <div class="book-characters">{{ book.characters }}</div>

          <div class="expand-hint" v-if="expandedBook !== index">
            <span>EXPLORE</span>
            <span class="arrow">→</span>
          </div>

          <!-- 展开内容 -->
          <div class="book-details" v-if="expandedBook === index">
            <div class="details-divider"></div>

            <div class="plot-section">
              <h5>关键情节</h5>
              <ul class="plot-list">
                <li v-for="point in book.plot" :key="point">{{ point }}</li>
              </ul>
            </div>

            <div class="events-section">
              <h5>关键事件</h5>
              <div class="events-timeline">
                <div
                  v-for="event in book.keyEvents"
                  :key="event"
                  class="event-item"
                >
                  <div class="event-dot"></div>
                  <span class="event-text">{{ event }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 02: 宇宙法则 -->
    <section class="section">
      <div class="section-header">
        <h2 class="section-number">02</h2>
        <h3 class="section-title">宇宙法则</h3>
        <div class="section-line"></div>
      </div>

      <div class="concepts-grid">
        <div
          v-for="concept in concepts"
          :key="concept.name"
          class="concept-card"
        >
          <div class="concept-number">0{{ concept.id }}</div>
          <h4 class="concept-name">{{ concept.name }}</h4>
          <p class="concept-subtitle">{{ concept.subtitle }}</p>
          <p class="concept-description">{{ concept.description }}</p>
          <div class="swiss-dots"></div>
        </div>
      </div>
    </section>

    <!-- Section 03: 尾声 -->
    <section class="section">
      <div class="section-header">
        <h2 class="section-number">03</h2>
        <h3 class="section-title">尾声</h3>
        <div class="section-line"></div>
      </div>

      <div class="quotes-grid">
        <div
          v-for="quote in quotes"
          :key="quote.text"
          class="quote-card"
        >
          <div class="quote-mark"></div>
          <p class="quote-text">{{ quote.text }}</p>
          <div class="quote-divider"></div>
          <p class="quote-source">{{ quote.source }}</p>
        </div>
      </div>
    </section>

    <!-- Section 04: 档案馆 -->
    <section class="section archive-section">
      <div class="section-header">
        <h2 class="section-number">04</h2>
        <h3 class="section-title">档案馆</h3>
        <div class="section-line"></div>
      </div>

      <!-- 人物档案馆 -->
      <div class="archive-category">
        <h4 class="archive-category-title">人物 CHARACTERS</h4>
        <div class="archive-grid">
          <div
            v-for="char in archiveCharacters"
            :key="char.name"
            class="archive-card character-card"
          >
            <div class="archive-name">{{ char.name }}</div>
            <div class="archive-role">{{ char.role }}</div>
            <p class="archive-description">{{ char.description }}</p>
            <div class="swiss-dots"></div>
          </div>
        </div>
      </div>

      <!-- 事件档案馆 -->
      <div class="archive-category">
        <h4 class="archive-category-title">事件 TIMELINE</h4>
        <div class="events-archive-grid">
          <div
            v-for="evt in archiveEvents"
            :key="evt.event"
            class="event-archive-card"
          >
            <div class="event-year">{{ evt.year }}</div>
            <div class="event-name">{{ evt.event }}</div>
            <p class="event-description">{{ evt.description }}</p>
          </div>
        </div>
      </div>

      <!-- 概念档案馆 -->
      <div class="archive-category">
        <h4 class="archive-category-title">概念 CONCEPTS</h4>
        <div class="concepts-archive-grid">
          <div
            v-for="concept in archiveConcepts"
            :key="concept.name"
            class="concept-archive-card"
          >
            <div class="concept-archive-category">{{ concept.category }}</div>
            <div class="concept-archive-name">{{ concept.name }}</div>
            <p class="concept-archive-description">{{ concept.description }}</p>
            <div class="swiss-dots"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- 页脚 -->
    <footer class="world-footer">
      <div class="footer-left">
        <div class="footer-bars">|||</div>
      </div>
      <div class="footer-center">
        <p>刘慈欣</p>
      </div>
      <div class="footer-right">
        <p>VOL.037 · SCIENCE FICTION</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&display=swap');

/* 容器 */
.three-body-world {
  min-height: 100vh;
  background-color: #FAFAFA;
  color: #1A1A1A;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  padding: 0 0 4rem 0;
  position: relative;
  overflow-x: hidden;
}

/* 顶部导航 */
.world-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 4rem 2rem 12rem;
  border-bottom: 2px solid #1A1A1A;
  position: relative;
  z-index: 1;
}

.exit-button {
  background: transparent;
  border: 2px solid #1A1A1A;
  color: #1A1A1A;
  padding: 0.75rem 1.5rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.15s ease-out;
}

.exit-button:hover {
  background-color: #FF3000;
  border-color: #FF3000;
  color: #FFFFFF;
}

.exit-button .arrow {
  font-size: 1.25rem;
}

.header-info {
  text-align: right;
}

.vol-tag {
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  margin-bottom: 0.5rem;
  opacity: 0.6;
}

.book-title {
  font-size: 2.5rem;
  font-weight: 900;
  letter-spacing: -0.02em;
  margin: 0 0 0.5rem 0;
  color: #1A1A1A;
}

.book-subtitle {
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  margin: 0;
  opacity: 0.6;
}

/* Section */
.section {
  padding: 4rem 12rem;
  position: relative;
  z-index: 1;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 3rem;
}

.section-number {
  font-size: 4rem;
  font-weight: 900;
  color: #FF3000;
  line-height: 1;
  margin: 0;
  min-width: 100px;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
  letter-spacing: 0.1em;
}

.section-line {
  flex: 1;
  height: 2px;
  background-color: #1A1A1A;
}

/* 三部曲网格 */
.trilogy-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

/* 书籍卡片 */
.book-card {
  background: transparent;
  border: 2px solid #1A1A1A;
  padding: 2rem;
  cursor: pointer;
  transition: all 0.15s ease-out;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.book-card:not(.expanded):hover {
  transform: translateY(-4px);
  background-color: #FF3000;
  border-color: #FF3000;
}

.book-card:not(.expanded):hover * {
  color: #FFFFFF;
}

.book-card.expanded {
  background-color: #F5F5F5;
  cursor: default;
  transform: none;
}

.book-card-header {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.book-number {
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  opacity: 0.6;
}

.book-name {
  font-size: 1.5rem;
  font-weight: 900;
  letter-spacing: -0.02em;
  margin: 0;
  color: #1A1A1A;
}

.book-subtitle-en {
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  margin: 0;
  opacity: 0.6;
  font-style: italic;
}

.book-concept {
  font-size: 0.875rem;
  font-weight: 500;
  padding: 1rem 0;
  border-top: 1px solid #1A1A1A;
  border-bottom: 1px solid #1A1A1A;
  color: #FF3000;
}

.book-characters {
  font-size: 0.75rem;
  font-weight: 400;
  opacity: 0.8;
  letter-spacing: 0.05em;
}

.expand-hint {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  margin-top: auto;
}

.expand-hint .arrow {
  transition: transform 0.15s ease-out;
}

.book-card:not(.expanded):hover .expand-hint .arrow {
  transform: translateX(4px);
}

/* 展开内容 */
.book-details {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #1A1A1A;
}

.details-divider {
  height: 2px;
  background-color: #FF3000;
  margin-bottom: 1.5rem;
}

.plot-section,
.events-section {
  margin-bottom: 1.5rem;
}

.plot-section h5,
.events-section h5 {
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  margin: 0 0 1rem 0;
  opacity: 0.6;
}

.plot-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.plot-list li {
  font-size: 0.875rem;
  line-height: 1.6;
  margin-bottom: 0.75rem;
  padding-left: 1rem;
  position: relative;
  color: #666666;
}

.plot-list li::before {
  content: '—';
  position: absolute;
  left: 0;
  color: #FF3000;
}

.events-timeline {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.event-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.event-dot {
  width: 8px;
  height: 8px;
  background-color: #FF3000;
  flex-shrink: 0;
}

.event-text {
  font-size: 0.875rem;
  color: #666666;
}

/* 概念网格 */
.concepts-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.concept-card {
  background: transparent;
  border: 2px solid #1A1A1A;
  padding: 2rem;
  transition: all 0.15s ease-out;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  position: relative;
}

.concept-card:hover {
  background-color: #FF3000;
  border-color: #FF3000;
}

.concept-card:hover * {
  color: #FFFFFF;
}

.concept-number {
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  opacity: 0.6;
}

.concept-name {
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0;
  color: #1A1A1A;
}

.concept-subtitle {
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  margin: 0;
  opacity: 0.6;
  font-style: italic;
}

.concept-description {
  font-size: 0.875rem;
  line-height: 1.6;
  margin: 0;
  color: #666666;
}

/* 金句网格 */
.quotes-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.quote-card {
  background: transparent;
  border: 2px solid #1A1A1A;
  padding: 2rem;
  transition: all 0.15s ease-out;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: relative;
}

.quote-card:hover {
  background-color: #FF3000;
  border-color: #FF3000;
}

.quote-card:hover * {
  color: #FFFFFF;
}

.quote-mark {
  width: 20px;
  height: 2px;
  background-color: #FF3000;
}

.quote-text {
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.6;
  margin: 0;
  color: #1A1A1A;
  font-style: italic;
}

.quote-divider {
  height: 1px;
  background-color: #1A1A1A;
}

.quote-source {
  font-size: 0.625rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  margin: 0;
  opacity: 0.6;
}

/* 瑞士圆点装饰 */
.swiss-dots {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  width: 60px;
  height: 60px;
  background-image: radial-gradient(circle, #FF3000 1px, transparent 1px);
  background-size: 8px 8px;
  opacity: 0.3;
}

/* 档案馆样式 */
.archive-section {
  padding-bottom: 6rem;
}

.archive-category {
  margin-bottom: 4rem;
}

.archive-category:last-child {
  margin-bottom: 0;
}

.archive-category-title {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #1A1A1A;
  color: #FF3000;
}

/* 人物档案馆 */
.archive-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

.archive-card {
  background: transparent;
  border: 2px solid #1A1A1A;
  padding: 1.5rem;
  transition: all 0.15s ease-out;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  position: relative;
  min-height: 180px;
}

.archive-card:hover {
  background-color: #FF3000;
  border-color: #FF3000;
}

.archive-card:hover * {
  color: #FFFFFF;
}

.archive-name {
  font-size: 1.125rem;
  font-weight: 900;
  color: #1A1A1A;
  letter-spacing: 0.05em;
}

.archive-role {
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  opacity: 0.6;
}

.archive-description {
  font-size: 0.75rem;
  line-height: 1.5;
  margin: 0;
  color: #666666;
}

/* 事件档案馆 */
.events-archive-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.event-archive-card {
  background: transparent;
  border: 2px solid #1A1A1A;
  padding: 1.5rem;
  transition: all 0.15s ease-out;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.event-archive-card:hover {
  background-color: #FF3000;
  border-color: #FF3000;
}

.event-archive-card:hover * {
  color: #FFFFFF;
}

.event-year {
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  color: #FF3000;
}

.event-name {
  font-size: 1rem;
  font-weight: 700;
  margin: 0;
  color: #1A1A1A;
}

.event-description {
  font-size: 0.75rem;
  line-height: 1.5;
  margin: 0;
  color: #666666;
}

/* 概念档案馆 */
.concepts-archive-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.concept-archive-card {
  background: transparent;
  border: 2px solid #1A1A1A;
  padding: 1.5rem;
  transition: all 0.15s ease-out;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  position: relative;
}

.concept-archive-card:hover {
  background-color: #FF3000;
  border-color: #FF3000;
}

.concept-archive-card:hover * {
  color: #FFFFFF;
}

.concept-archive-category {
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  opacity: 0.6;
}

.concept-archive-name {
  font-size: 1.125rem;
  font-weight: 700;
  margin: 0;
  color: #1A1A1A;
}

.concept-archive-description {
  font-size: 0.75rem;
  line-height: 1.5;
  margin: 0;
  color: #666666;
}

/* 页脚 */
.world-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 4rem 2rem 12rem;
  border-top: 2px solid #1A1A1A;
  margin-top: 4rem;
  position: relative;
  z-index: 1;
}

.footer-left {
  font-size: 1.5rem;
  font-weight: 900;
  letter-spacing: 0.1em;
}

.footer-center p {
  font-size: 0.875rem;
  font-weight: 500;
  margin: 0;
}

.footer-right p {
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  margin: 0;
  opacity: 0.6;
}

/* 响应式 */
@media (max-width: 1024px) {
  .world-header,
  .section,
  .world-footer {
    padding-left: 4rem;
    padding-right: 2rem;
  }

  .trilogy-grid,
  .concepts-grid,
  .quotes-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .archive-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .events-archive-grid,
  .concepts-archive-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .world-header,
  .section,
  .world-footer {
    padding-left: 2rem;
    padding-right: 2rem;
  }

  .trilogy-grid,
  .concepts-grid,
  .quotes-grid {
    grid-template-columns: 1fr;
  }

  .archive-grid,
  .events-archive-grid,
  .concepts-archive-grid {
    grid-template-columns: 1fr;
  }

  .book-title {
    font-size: 2rem;
  }

  .section-number {
    font-size: 3rem;
  }
}
</style>

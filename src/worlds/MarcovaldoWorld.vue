<template>
  <div class="marcovaldo-world swiss-grid-pattern swiss-noise">
    <!-- Exit Button -->
    <button class="exit-btn swiss-hover-invert" @click="exitWorld">
      <span class="exit-arrow">←</span> EXIT
    </button>

    <!-- Book Header -->
    <header class="book-header swiss-border-bottom">
      <div class="header-content">
        <p class="book-vol">VOL.031</p>
        <h1 class="book-title">马可瓦尔多</h1>
        <p class="book-subtitle">在钢筋森林中寻找诗意</p>
        <p class="book-author">伊塔洛·卡尔维诺 · 1963</p>
      </div>
      <div class="header-meta">
        <p class="meta-label">URBAN NATURE</p>
        <p class="meta-years">20 NEWS STORIES</p>
      </div>
    </header>

    <!-- Section 01: NEWS ARCHIVE -->
    <section class="section-news swiss-border-bottom">
      <div class="section-header">
        <p class="section-number">SECTION 01</p>
        <h2 class="section-title">NEWS ARCHIVE</h2>
        <p class="section-subtitle">City Reports from Four Seasons</p>
      </div>

      <!-- Season Tabs -->
      <div class="season-tabs">
        <button
          v-for="season in seasons"
          :key="season.key"
          class="season-tab swiss-border"
          :class="{ 'active': activeSeason === season.key }"
          @click="activeSeason = season.key"
        >
          {{ season.label }}
        </button>
      </div>

      <!-- News Grid -->
      <div class="news-grid">
        <article
          v-for="(news, index) in currentSeasonNews"
          :key="index"
          class="news-card swiss-border"
          :class="{ 'expanded': expandedNews === index }"
          @click="toggleNews(index)"
        >
          <div class="news-header">
            <div class="news-date">
              <span class="date-day">{{ news.date.day }}</span>
              <span class="date-month">{{ news.date.month }}</span>
            </div>
            <div class="news-meta">
              <p class="news-tag">{{ news.tag }}</p>
              <p class="news-reporter">{{ news.reporter }}</p>
            </div>
          </div>

          <div class="news-content">
            <h3 class="news-title">{{ news.title }}</h3>
            <p class="news-lead">{{ news.lead }}</p>
          </div>

          <div class="news-details" v-if="expandedNews === index">
            <div class="detail-body">
              <p v-for="(paragraph, i) in news.content" :key="i">{{ paragraph }}</p>
            </div>
            <div class="detail-footer">
              <span class="news-section">城市晚报 · 第{{ news.issue }}期</span>
            </div>
          </div>
        </article>
      </div>
    </section>

    <!-- Section 02: THEMES -->
    <section class="section-themes swiss-border-bottom">
      <div class="section-header">
        <p class="section-number">SECTION 02</p>
        <h2 class="section-title">THEMES</h2>
        <p class="section-subtitle">Nature in the Concrete</p>
      </div>

      <div class="themes-grid">
        <div class="theme-card swiss-border">
          <div class="theme-icon theme-urban"></div>
          <h3 class="theme-name">城市自然</h3>
          <p class="theme-desc">在工业城市中发现自然的踪迹</p>
        </div>

        <div class="theme-card swiss-border">
          <div class="theme-icon theme-observer"></div>
          <h3 class="theme-name">观察者</h3>
          <p class="theme-desc">用孩子的眼睛看世界</p>
        </div>

        <div class="theme-card swiss-border">
          <div class="theme-icon theme-working"></div>
          <h3 class="theme-name">工人阶级</h3>
          <p class="theme-desc">底层生活的诗意与困境</p>
        </div>

        <div class="theme-card swiss-border">
          <div class="theme-icon theme-irony"></div>
          <h3 class="theme-name">讽刺与幽默</h3>
          <p class="theme-desc">荒诞现实中的黑色喜剧</p>
        </div>

        <div class="theme-card swiss-border">
          <div class="theme-icon theme-seasonal"></div>
          <h3 class="theme-name">季节循环</h3>
          <p class="theme-desc">时间流逝中的永恒轮回</p>
        </div>

        <div class="theme-card swiss-border">
          <div class="theme-icon theme-poesis"></div>
          <h3 class="theme-name">日常诗意</h3>
          <p class="theme-desc">平凡生活中的魔法瞬间</p>
        </div>
      </div>
    </section>

    <!-- Section 03: QUOTES -->
    <section class="section-quotes">
      <div class="section-header">
        <p class="section-number">SECTION 03</p>
        <h2 class="section-title">QUOTES</h2>
        <p class="section-subtitle">Words from the City</p>
      </div>

      <div class="quotes-grid">
        <div class="quote-card">
          <div class="quote-spine quote-spine-green"></div>
          <div class="quote-border-top"></div>
          <p class="quote-text">城市是看不见的，因为它是自然的反面。</p>
          <div class="quote-border-bottom"></div>
          <div class="quote-source">
            <span class="source-name">马可瓦尔多</span>
            <span class="source-role">前言</span>
          </div>
        </div>

        <div class="quote-card">
          <div class="quote-spine quote-spine-green"></div>
          <div class="quote-border-top"></div>
          <p class="quote-text">在那个年纪，想象力是我们最强大的武器，可以对抗一个敌对的世界。</p>
          <div class="quote-border-bottom"></div>
          <div class="quote-source">
            <span class="source-name">马可瓦尔多</span>
            <span class="source-role">第一章</span>
          </div>
        </div>

        <div class="quote-card">
          <div class="quote-spine quote-spine-green"></div>
          <div class="quote-border-top"></div>
          <p class="quote-text">他在城市中寻找自然，就像在沙漠中寻找水。</p>
          <div class="quote-border-bottom"></div>
          <div class="quote-source">
            <span class="source-name">马可瓦尔多</span>
            <span class="source-role">第二章</span>
          </div>
        </div>

        <div class="quote-card">
          <div class="quote-spine quote-spine-green"></div>
          <div class="quote-border-top"></div>
          <p class="quote-text">每一次失败，都是对现实的另一种确认。</p>
          <div class="quote-border-bottom"></div>
          <div class="quote-source">
            <span class="source-name">马可瓦尔多</span>
            <span class="source-role">第三章</span>
          </div>
        </div>

        <div class="quote-card">
          <div class="quote-spine quote-spine-green"></div>
          <div class="quote-border-top"></div>
          <p class="quote-text">孩子们能看到大人看不到的东西，因为他们的眼睛还没有被习惯蒙蔽。</p>
          <div class="quote-border-bottom"></div>
          <div class="quote-source">
            <span class="source-name">马可瓦尔多</span>
            <span class="source-role">第四章</span>
          </div>
        </div>

        <div class="quote-card">
          <div class="quote-spine quote-spine-green"></div>
          <div class="quote-border-top"></div>
          <p class="quote-text">在城市中，没有人真正拥有时间，每个人都在追赶时间。</p>
          <div class="quote-border-bottom"></div>
          <div class="quote-source">
            <span class="source-name">马可瓦尔多</span>
            <span class="source-role">终章</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const activeSeason = ref('spring')
const expandedNews = ref(null)

const seasons = [
  { key: 'spring', label: '春天' },
  { key: 'summer', label: '夏天' },
  { key: 'autumn', label: '秋天' },
  { key: 'winter', label: '冬天' }
]

// News data organized by season
const newsData = {
  spring: [
    {
      date: { day: '15', month: '3月' },
      tag: '独家报道',
      reporter: '记者 G. 罗西',
      title: '城市工人疑似中毒',
      lead: '一家五口食用野生蘑菇后入院，森林采摘引发安全担忧',
      content: [
        '昨日晚间，马可瓦尔多先生及其家人在食用自行采摘的野生蘑菇后出现中毒症状，被紧急送往市立医院。据知情人士透露，这些蘑菇采自城市郊区森林，紧邻一家化工厂。',
        '主治医生表示，患者症状包括恶心、呕吐和头晕，目前情况稳定。实验室初步检测显示，蘑菇中含有可疑化学物质。',
        '"我们以为春天来了，可以给孩子们补充点营养，"马可瓦尔多的妻子在接受简短采访时说道，"谁知道森林里长出来的东西会有问题。"',
        '环保组织已介入调查，质疑化工厂废水处理是否合规。市环保局发言人称将尽快展开检测。'
      ],
      issue: '127'
    },
    {
      date: { day: '22', month: '3月' },
      tag: '社会新闻',
      reporter: '记者 M. 比安奇',
      title: '市民痴迷路边野花',
      lead: '马可瓦尔多先生在上班途中被发现在花坛边发呆，声称"看到了春天"',
      content: [
        '昨日早晨，多名市民向本报反映，在市中心广场的花坛旁，一名中年男子长时间盯着野花发呆，一度引发路人围观。',
        '该男子被确认为马可瓦尔多先生，某工厂搬运工。面对警方的询问，他解释说："我只是在看这些花，它们在水泥缝隙里生长，太神奇了。"',
        '目击者称，马可瓦尔多先生在花坛前停留了超过半小时，期间多次做出要拍照的动作。"他看起来像发现了新大陆，"一位晨练的老人告诉记者。',
        '市政厅发言人表示，将考虑在城市中增加更多绿化区域，以满足市民对自然的需求。'
      ],
      issue: '128'
    },
    {
      date: { day: '5', month: '4月' },
      tag: '环境报道',
      reporter: '记者 L. 费里',
      title: '城市鸽群神秘消失',
      lead: '广场上几百只鸽子突然不见了踪影，市民纷纷猜测原因',
      content: [
        '本报讯，昨日清晨，往常在市中心广场上聚集的数百只鸽子突然全部消失，引发市民热议。',
        '据长期在广场喂鸽子的退休教师罗西女士介绍，她每天早上都会来这里喂鸽子，但今天一只也没有看到。"太奇怪了，它们去哪了？"她困惑地说道。',
        '有人猜测是天气原因，有人认为是城市扩建导致鸽子栖息地减少。还有市民开玩笑说："可能是马可瓦尔多先生把鸽子都带回家了。"'
      ],
      issue: '129'
    },
    {
      date: { day: '18', month: '4月' },
      tag: '交通新闻',
      reporter: '记者 A. 埃斯波西托',
      title: '工人迟到理由奇特',
      lead: '"我在观察蚂蚁搬家，"马可瓦尔多先生向老板解释迟到原因',
      content: [
        '某工厂发生一起迟到事件，员工的理由却令人哭笑不得。"我本来在准时上班的路上，但看到一群蚂蚁在搬家，就停下来观察了一会儿，"马可瓦尔多先生事后告诉本报。',
        '工厂老板表示无法接受这个理由。"蚂蚁搬家和你上班有什么关系？"他愤怒地说道，并扣除了马可瓦尔多当天的工资。',
        '马可瓦尔多的同事则表示，这已经不是他第一次因为奇怪的原因迟到了。"上次他说被蜗牛吸引了，"一位不愿透露姓名的工友说。'
      ],
      issue: '130'
    },
    {
      date: { day: '2', month: '5月' },
      tag: '社区新闻',
      reporter: '记者 C. 马蒂诺利',
      title: '屋顶菜园引发纠纷',
      lead: '马可瓦尔多在屋顶种菜，邻居投诉漏水',
      content: [
        '本报讯，马可瓦尔多先生在公寓楼顶开辟了一个小型菜园，种植番茄、豆角等蔬菜，却因漏水问题引发邻居不满。',
        '"我只是想给孩子们种点新鲜蔬菜，"马可瓦尔多先生解释道，"城市里找不到一块真正的土地，我只能在屋顶试试。"',
        '住在楼下的房东 Rossi 太太向本报投诉："每天晚上水就会渗到我家天花板上，这不能接受！"',
        '市政厅已派人前往调查，可能会要求马可瓦尔多拆除菜园。'
      ],
      issue: '131'
    }
  ],
  summer: [
    {
      date: { day: '10', month: '6月' },
      tag: '社会新闻',
      reporter: '记者 R. 康蒂',
      title: '高温引发奇怪行为',
      lead: '市民马可瓦尔多穿着厚外套出门，声称"这是我的空调"',
      content: [
        '随着夏季高温的到来，市民们纷纷采取各种方式避暑。然而，马可瓦尔多的做法却格外引人注意——他穿上了厚厚的冬装外套。',
        '"这是我发明的\"个人空调系统\"，"马可瓦尔多先生向好奇的路人解释，"外套里装了冰块，可以持续降温。"',
        '然而，这种方法的实际效果似乎并不理想。不到一小时，冰块就全部融化，马可瓦尔多先生全身湿透。"看来还需要改进，"他承认道。'
      ],
      issue: '132'
    },
    {
      date: { day: '25', month: '6月' },
      tag: '教育新闻',
      reporter: '记者 F. 里奇',
      title: '父亲教子钓鱼反被钓',
      lead: '马可瓦尔多带儿子去河边钓鱼，自己却掉进水里',
      content: [
        '本报讯，昨日发生一起荒诞的钓鱼事件。马可瓦尔多先生带儿子到城郊小河钓鱼，结果自己掉进了河里。',
        '据目击者称，马可瓦尔多先生在给儿子示范如何甩钩时，不慎被钩住衣服，整个人失去平衡跌入河中。"我还没反应过来，爸爸就不见了，"儿子小明回忆道。',
        '幸运的是，马可瓦尔多会游泳，很快就游上了岸，只是浑身湿透，颇为狼狈。"下次还是让儿子自己学吧，"他尴尬地说。'
      ],
      issue: '133'
    },
    {
      date: { day: '7', month: '7月' },
      tag: '消费新闻',
      reporter: '记者 P. 格雷科',
      title: '超市促销引发混乱',
      lead: '马可瓦尔多为抢打折鸡蛋被挤出队伍',
      content: [
        '昨日，某超市举行鸡蛋打折促销活动，引发市民抢购。马可瓦尔多先生在排队时被挤出队伍，空手而归。',
        '"我排了三个小时，"他沮丧地告诉记者，"就在快轮到我的时候，后面的人突然涌上来，我就被挤出去了。"',
        '超市经理表示，对混乱场面表示遗憾，但下次促销不会改变规则。"我们也没想到会这么多人，"他说。'
      ],
      issue: '134'
    },
    {
      date: { day: '15', month: '7月' },
      tag: '度假专题',
      reporter: '记者 M. 比安奇',
      title: '工人家庭的"海滩假期"',
      lead: '在工地沥青坑里"游泳"？马可瓦尔多一家的别样度假',
      content: [
        '【本报讯】昨日傍晚，一群工人在城市道路铺设工地的沥青坑中"游泳"，被施工人员发现后驱赶。这群人声称他们只是在"模拟海滩度假"。',
        '马可瓦尔多先生承认，由于无力承担真正的海滩度假费用，他带着家人在城市中寻找"替代方案"。',
        '"沥青还是热的，有点像沙滩，"他挠着被烫伤的胳膊解释道，"水也够深，孩子们玩得很开心。"',
        '铺路工表示无法理解这种行为。"我们正在干活，这些人就脱了衣服跳进来。这是危险作业区域！"',
        '【本报评论】这起荒诞事件再次凸显工人阶级的度假困境。在炎炎夏日，当富人们在海边别墅享受海风时，底层家庭只能在城市的角落里寻找一丝凉意。'
      ],
      issue: '135'
    },
    {
      date: { day: '28', month: '8月' },
      tag: '健康新闻',
      reporter: '记者 D. 莫雷蒂',
      title: '西瓜中毒事件',
      lead: '马可瓦尔多在街头买了个西瓜，全家吃后上吐下泻',
      content: [
        '本报讯，马可瓦尔多先生昨日从街头小贩处购买了一个西瓜，全家食用后出现食物中毒症状。',
        '"那瓜看起来很新鲜，"马可瓦尔多先生在病床上告诉记者，"小贩说这是刚摘的，还便宜。"',
        '市卫生部门已介入调查，发现该小贩没有营业执照。医生表示，病人情况稳定，但需要继续观察。',
        '"以后再也不买街边水果了，"马可瓦尔多先生吸取了教训。'
      ],
      issue: '136'
    }
  ],
  autumn: [
    {
      date: { day: '5', month: '9月' },
      tag: '夜间新闻',
      reporter: '记者 N. 罗塞利',
      title: '公园深夜神秘"树叶战"',
      lead: '守夜人发现两名男子在黑暗中抢夺落叶',
      content: [
        '【本报讯】公园守夜人昨日凌晨抓获两名正在"争抢树叶"的男子。据守夜人称，这两人在夜色中偷偷收集落叶，当被发现时爆发了激烈争吵。',
        '令人意外的是，其中一人竟是本报常客马可瓦尔多先生。他声称自己在进行"树叶收藏"，而另一位则是公园守门人。',
        '"这些树叶很漂亮，"马可瓦尔多辩解道，"我只是想带回家给孩子看。"',
        '守门人则表示："这些树叶属于公园，不能随便拿走。"警方调解后，双方各自离开。'
      ],
      issue: '137'
    },
    {
      date: { day: '18', month: '9月' },
      tag: '交通新闻',
      reporter: '记者 S. 科隆纳',
      title: '公交车上捡到\"金子\"',
      lead: '马可瓦尔多在公交座位上发现黄色物，兴奋之余竟是糖纸',
      content: [
        '昨日，马可瓦尔多先生在乘坐公交车时，发现座位上有一块"金灿灿的东西"，当即认为是黄金，兴奋不已。',
        '"我差点就要去辞职了，"他回忆道，"心想这下发财了，可以给孩子们买好东西。"',
        '然而，当他仔细一看，发现只是一张黄色糖纸。"那一刻，我的人生从顶峰跌到谷底，"马可瓦尔多苦笑着说。',
        '公交司机表示，经常有乘客在车上遗落物品，但很少有人会认错。'
      ],
      issue: '138'
    },
    {
      date: { day: '3', month: '10月' },
      tag: '动物新闻',
      reporter: '记者 T. 西利奥',
      title: '流浪狗成了家庭一员',
      lead: '马可瓦尔多收养的流浪狗，邻居纷纷投诉扰民',
      content: [
        '本报讯，马可瓦尔多先生一个月前在街头收养了一只流浪狗，现在却成了邻居们的投诉对象。',
        '"那狗整晚叫个不停，"楼下的邻居抱怨道，"我们根本睡不好觉。"另一位邻居则表示，这只狗会在楼道里乱跑，还曾吓到过孩子。',
        '马可瓦尔多先生解释说，这只狗以前可能受过虐待，现在需要时间适应。"它其实很乖的，只是有点害怕，"他说。',
        '物业已向马可瓦尔多发出警告，如果再接到投诉，可能会要求他把狗送走。'
      ],
      issue: '139'
    },
    {
      date: { day: '16', month: '10月' },
      tag: '消费新闻',
      reporter: '记者 U. 隆吉',
      title: '二手家具风波',
      lead: '马可瓦尔多买的旧沙发里发现了奇怪的东西',
      content: [
        '【本报讯】马可瓦尔多先生从跳蚤市场买了一张二手沙发，回家后竟在沙发垫里发现大量零钱和一张旧照片。',
        '"我只想买张便宜点的沙发，"马可瓦尔多说，"没想到还有意外收获。"他在沙发里共找到约5000里拉的零钱，以及一张拍摄于上世纪50年代的照片。',
        '本报试图联系原主人，但根据卖家提供的电话，始终无人接听。马可瓦尔多表示，如果有人认领，愿意归还照片和钱。',
        '"那钱我倒是想留着，"他开玩笑道，"但良心过不去啊。"'
      ],
      issue: '140'
    },
    {
      date: { day: '29', month: '11月' },
      tag: '文化新闻',
      reporter: '记者 V. 斯福尔扎',
      title: '工人自学成才',
      lead: '马可瓦尔多夜校学习绘画，作品在社区展出',
      content: [
        '本报讯，某工厂工人马可瓦尔多先生利用业余时间在夜校学习绘画，近日在社区文化中心举办了个人作品展。',
        '"我从小就喜欢画画，但一直没有机会，"马可瓦尔多先生说，"现在孩子们都大了，我终于有时间追求自己的梦想。"',
        '展览共展出20幅作品，主题多为城市生活场景。"虽然技法还不够成熟，但充满了生活的真实感受，"一位观众评价道。',
        '马可瓦尔多表示，会继续学习绘画，希望有朝一日能举办正式画展。'
      ],
      issue: '141'
    }
  ],
  winter: [
    {
      date: { day: '8', month: '12月' },
      tag: '冬季特稿',
      reporter: '记者 W. 帕拉维奇尼',
      title: '地铁里的"免费取暖客"',
      lead: '失业工人发现地铁是最暖和的地方',
      content: [
        '【本报讯】随着寒冬来临，越来越多的失业工人涌入地铁车厢取暖。地铁公司昨日发表声明，称将加强巡逻，禁止乘客"非正常占用"地铁设施。',
        '据调查，部分工人每天晚上在地铁上"过夜"，直到清晨才离开。他们选择地铁是因为"这里有暖气，比家里暖和多了"。',
        '本报追踪报道的马可瓦尔多先生也是其中一员。"煤气费太贵了，"他说，"地铁只需要一张票就能坐一整晚。"',
        '地铁公司发言人表示，这种行为"影响其他乘客"，并将采取措施。'
      ],
      issue: '142'
    },
    {
      date: { day: '15', month: '12月' },
      tag: '圣诞专题',
      reporter: '记者 X. 奥尔西尼',
      title: '自制圣诞树引发火灾',
      lead: '马可瓦尔多用废品做圣诞树，差点烧了家',
      content: [
        '【本报讯】昨日，马可瓦尔多先生用废品制作的"环保圣诞树"突然起火，所幸发现及时，未造成人员伤亡。',
        '"我只是想节约一点，"马可瓦尔多解释道，"真正的圣诞树太贵了，我就用旧报纸、塑料瓶做了个替代品。"',
        '然而，他在树上缠绕的电线发生短路，引发了火灾。"当时烟冒得很高，把我妻子吓坏了，"他说。',
        '消防部门提醒市民，圣诞装饰一定要注意用电安全，切勿使用不合格的电器产品。'
      ],
      issue: '143'
    },
    {
      date: { day: '5', month: '1月' },
      tag: '社会新闻',
      reporter: '记者 Y. 兰弗兰基',
      title: '雪人离奇失踪案',
      lead: '孩子们堆的雪人一夜之间不见了，谁干的？',
      content: [
        '本报讯，昨日，马可瓦尔多先生的孩子们在社区广场堆了一个雪人，但第二天早上，雪人却不见了。',
        '"我们花了整个下午才堆好，"孩子们伤心地说，"还给它戴了帽子和围巾。"马可瓦尔多先生随即向物业投诉，但对方表示不负责看管雪人。',
        '有邻居猜测可能是有人故意破坏，也有人认为是天气原因导致融化。马可瓦尔多则怀疑是有人"偷走了雪人"。',
        '"这不是雪人的问题，是原则问题，"他愤怒地说。'
      ],
      issue: '144'
    },
    {
      date: { day: '18', month: '1月' },
      tag: '健康新闻',
      reporter: '记者 Z. 马菲',
      title: '流感季下的工人困境',
      lead: '马可瓦尔多带病上班被开除',
      content: [
        '【本报讯】流感季节来临，但许多工人因为害怕扣工资而不敢请假。马可瓦尔多先生就是其中之一，他在发烧38度的情况下坚持上班，结果因操作失误被开除。',
        '"我如果不工作，就没有工资，没有工资就没法给孩子买药，"马可瓦尔多先生说，"所以我只能硬撑着去上班。"',
        '然而，他在工作中因身体不适操作失误，造成了设备损坏。工厂老板当即决定将其开除。',
        '工会已介入此案，认为工厂的做法不合情理。目前双方仍在协商中。'
      ],
      issue: '145'
    },
    {
      date: { day: '8', month: '2月' },
      tag: '节日新闻',
      reporter: '记者 AA. 科尔西尼',
      title: '情人节特别报道',
      lead: '马可瓦尔多送给妻子的礼物：一盆在路边挖的野草',
      content: [
        '【本报讯】情人节当天，马可瓦尔多先生送给妻子一盆从路边挖来的野草，引发网友热议。',
        '"我买不起鲜花，"马可瓦尔多坦诚道，"但我觉得这些野草也很美，而且它们在城市的水泥缝隙里顽强生长，就像我们一样。"',
        '他的妻子表示，一开始很惊讶，但后来很感动。"这是他第一次送我礼物，虽然不是玫瑰花，但更有意义，"她说。',
        '本报认为，在这个消费主义盛行的时代，马可瓦尔多的礼物或许更值得思考——真正的爱意，不在于礼物的价格。'
      ],
      issue: '146'
    }
  ]
}

const currentSeasonNews = computed(() => newsData[activeSeason.value] || [])

const toggleNews = (index) => {
  if (expandedNews.value === index) {
    expandedNews.value = null
  } else {
    expandedNews.value = index
  }
}

const exitWorld = () => {
  router.push('/yearbook/fiction')
}
</script>

<style scoped>
/* Main Container */
.marcovaldo-world {
  min-height: 100vh;
  background-color: var(--swiss-white);
}

/* Exit Button */
.exit-btn {
  position: fixed;
  top: 2rem;
  left: 2rem;
  z-index: 100;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  padding: 0.75rem 1.5rem;
  background-color: var(--swiss-black);
  color: var(--swiss-white);
  border: 2px solid var(--swiss-black);
  cursor: pointer;
  transition: all 0.15s ease-out;
}

.exit-btn:hover {
  background-color: #6a8a5a;
  border-color: #6a8a5a;
}

.exit-arrow {
  margin-right: 0.5rem;
}

/* Book Header */
.book-header {
  padding: 6rem 2rem 3rem 2rem;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 4rem;
  align-items: center;
}

.book-vol {
  font-family: 'Inter', sans-serif;
  font-weight: 900;
  font-size: 0.875rem;
  letter-spacing: 0.2em;
  color: #6a8a5a;
  margin: 0 0 1rem 0;
}

.book-title {
  font-family: 'Inter', sans-serif;
  font-weight: 900;
  font-size: clamp(2.5rem, 5vw, 4rem);
  text-transform: uppercase;
  letter-spacing: -0.03em;
  line-height: 1;
  margin: 0 0 0.5rem 0;
}

.book-subtitle {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 1.125rem;
  font-style: italic;
  color: var(--swiss-text-secondary);
  margin: 0 0 0.5rem 0;
}

.book-author {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 0.875rem;
  letter-spacing: 0.1em;
  color: var(--swiss-text-secondary);
  margin: 0;
}

.header-meta {
  text-align: center;
}

.meta-label {
  font-family: 'Inter', sans-serif;
  font-weight: 900;
  font-size: 0.625rem;
  letter-spacing: 0.2em;
  color: #6a8a5a;
  margin: 0 0 0.5rem 0;
}

.meta-years {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  color: var(--swiss-text-secondary);
  margin: 0;
}

/* Section Headers */
.section-header {
  padding: 3rem 2rem 2rem 2rem;
}

.section-number {
  font-family: 'Inter', sans-serif;
  font-weight: 900;
  font-size: 0.875rem;
  letter-spacing: 0.2em;
  color: #6a8a5a;
  margin: 0 0 1rem 0;
}

.section-title {
  font-family: 'Inter', sans-serif;
  font-weight: 900;
  font-size: 2.5rem;
  text-transform: uppercase;
  letter-spacing: -0.03em;
  line-height: 1;
  margin: 0 0 0.5rem 0;
}

.section-subtitle {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 0.875rem;
  letter-spacing: 0.25em;
  color: var(--swiss-text-secondary);
  margin: 0;
}

/* Section 01: NEWS ARCHIVE */
.section-news {
  padding-bottom: 2rem;
}

/* Season Tabs */
.season-tabs {
  display: flex;
  gap: 1rem;
  padding: 0 2rem 1rem 2rem;
  padding-left: 12rem;
}

.season-tab {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  padding: 0.75rem 1.5rem;
  background-color: var(--swiss-white);
  color: var(--swiss-text-secondary);
  border: 2px solid var(--swiss-black);
  cursor: pointer;
  transition: all 0.15s ease-out;
}

.season-tab:hover {
  background-color: var(--swiss-muted);
}

.season-tab.active {
  background-color: #6a8a5a;
  border-color: #6a8a5a;
  color: var(--swiss-white);
}

/* News Grid */
.news-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  padding: 2rem;
  padding-left: 12rem;
}

.news-card {
  cursor: pointer;
  transition: all 0.15s ease-out;
  padding: 2rem;
  background-color: var(--swiss-white);
  position: relative;
}

.news-card:not(.expanded):hover {
  background-color: #6a8a5a;
  border-color: #6a8a5a;
}

.news-card:not(.expanded):hover .news-date,
.news-card:not(.expanded):hover .news-tag,
.news-card:not(.expanded):hover .news-reporter,
.news-card:not(.expanded):hover .news-title,
.news-card:not(.expanded):hover .news-lead {
  color: var(--swiss-white) !important;
}

.news-card.expanded {
  background-color: var(--swiss-white) !important;
  border-color: var(--swiss-black) !important;
}

/* News Header */
.news-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid var(--swiss-black);
}

.news-date {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.date-day {
  font-family: 'Inter', sans-serif;
  font-weight: 900;
  font-size: 2.5rem;
  line-height: 1;
  color: #6a8a5a;
}

.date-month {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--swiss-text-secondary);
  margin-top: 0.25rem;
}

.news-meta {
  text-align: right;
}

.news-tag {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 0.625rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #8b0000;
  margin: 0 0 0.25rem 0;
}

.news-reporter {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 0.75rem;
  font-style: italic;
  color: var(--swiss-text-secondary);
  margin: 0;
}

/* News Content */
.news-content {
  margin-bottom: 1rem;
}

.news-title {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 1.125rem;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  line-height: 1.3;
  margin: 0 0 0.75rem 0;
  color: var(--swiss-black);
}

.news-lead {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1.6;
  color: var(--swiss-text-secondary);
  margin: 0;
}

/* News Details (Expanded) */
.news-details {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 2px solid var(--swiss-black);
}

.detail-body {
  margin-bottom: 1rem;
}

.detail-body p {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1.8;
  color: var(--swiss-text-secondary);
  margin: 0 0 1rem 0;
}

.detail-body p:last-child {
  margin-bottom: 0;
}

.detail-footer {
  padding-top: 1rem;
  border-top: 1px solid var(--swiss-border);
}

.news-section {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 0.75rem;
  font-style: italic;
  color: #6a8a5a;
}

/* Expanded hover fix */
.news-card.expanded:hover {
  background-color: var(--swiss-white) !important;
  border-color: var(--swiss-black) !important;
}

.news-card.expanded:hover .news-date,
.news-card.expanded:hover .news-tag,
.news-card.expanded:hover .news-reporter,
.news-card.expanded:hover .news-title,
.news-card.expanded:hover .news-lead,
.news-card.expanded:hover .detail-body p,
.news-card.expanded:hover .news-section {
  color: var(--swiss-black) !important;
}

.news-card.expanded:hover .news-lead,
.news-card.expanded:hover .detail-body p {
  color: var(--swiss-text-secondary) !important;
}

/* Section 02: THEMES */
.themes-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  padding: 2rem;
  padding-left: 12rem;
}

.theme-card {
  padding: 2rem;
  background-color: var(--swiss-white);
  border: 2px solid var(--swiss-black);
  text-align: center;
  transition: all 0.15s ease-out;
}

.theme-card:hover {
  background-color: #6a8a5a;
  border-color: #6a8a5a;
}

.theme-card:hover .theme-name,
.theme-card:hover .theme-desc {
  color: var(--swiss-white) !important;
}

.theme-icon {
  width: 40px;
  height: 40px;
  margin: 0 auto 1rem;
  position: relative;
}

/* Theme Icons */
.theme-urban::before {
  content: '▢';
  font-size: 32px;
  color: var(--swiss-black);
}

.theme-observer::before {
  content: '◎';
  font-size: 32px;
  color: var(--swiss-black);
}

.theme-working::before {
  content: '⚙';
  font-size: 28px;
  color: var(--swiss-black);
}

.theme-irony::before {
  content: '☺';
  font-size: 28px;
  color: var(--swiss-black);
}

.theme-seasonal::before {
  content: '◯';
  font-size: 32px;
  color: var(--swiss-black);
}

.theme-poesis::before {
  content: '✦';
  font-size: 28px;
  color: var(--swiss-black);
}

.theme-name {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  margin: 0 0 0.5rem 0;
  color: var(--swiss-black);
}

.theme-desc {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 0.75rem;
  line-height: 1.5;
  color: var(--swiss-text-secondary);
  margin: 0;
}

/* Section 03: QUOTES */
.section-quotes {
  padding: 2rem;
  padding-bottom: 4rem;
}

.quotes-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  padding: 2rem;
  padding-left: 12rem;
}

.quote-card {
  background-color: var(--swiss-white);
  border: 2px solid var(--swiss-black);
  padding: 2rem;
  position: relative;
  display: flex;
  flex-direction: column;
  transition: all 0.15s ease-out;
}

.quote-card:hover {
  border-color: #6a8a5a;
  transform: translateY(-2px);
}

/* Quote Spine - Green Theme */
.quote-spine {
  width: 12px;
  height: 16px;
  background-color: #6a8a5a;
  position: absolute;
  top: -1px;
  left: -1px;
}

.quote-spine-green {
  background-color: #6a8a5a;
}

.quote-spine::before,
.quote-spine::after {
  content: '';
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 1px;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.3);
}

.quote-spine::before {
  left: 33%;
}

.quote-spine::after {
  left: 66%;
}

/* Gradient Border Lines */
.quote-border-top {
  height: 2px;
  background: linear-gradient(90deg,
    var(--swiss-black) 0%,
    #6a8a5a 50%,
    var(--swiss-black) 100%
  );
  margin: 0 0 1.5rem 0;
}

.quote-border-bottom {
  height: 2px;
  background: linear-gradient(90deg,
    var(--swiss-black) 0%,
    #6a8a5a 50%,
    var(--swiss-black) 100%
  );
  margin: 1.5rem 0 1rem 0;
}

.quote-text {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 0.9375rem;
  line-height: 1.7;
  color: var(--swiss-black);
  margin: 0;
  flex: 1;
}

.quote-source {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding-top: 0.5rem;
  border-top: 1px solid var(--swiss-border);
}

.source-name {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--swiss-black);
}

.source-role {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 0.625rem;
  letter-spacing: 0.15em;
  color: var(--swiss-text-secondary);
}

/* Responsive */
@media (max-width: 1024px) {
  .book-header,
  .section-header,
  .season-tabs,
  .news-grid,
  .themes-grid,
  .section-quotes {
    margin-left: 0;
    padding-left: 2rem;
  }

  .news-grid {
    grid-template-columns: 1fr;
  }

  .themes-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .quotes-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .book-header {
    grid-template-columns: 1fr;
    padding: 4rem 1rem 2rem 1rem;
  }

  .header-meta {
    order: -1;
    margin-bottom: 1rem;
  }

  .season-tabs {
    flex-wrap: wrap;
  }

  .news-grid,
  .themes-grid,
  .quotes-grid {
    grid-template-columns: 1fr;
    padding: 1rem;
  }
}
</style>

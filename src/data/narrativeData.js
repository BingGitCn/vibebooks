// 《困于沙丘》叙事数据
// 双线叙事：战国历史 + 民国考古

export const narrativeData = {
  // Chapter 1: 流沙 - 发现
  chapter1: {
    opening: {
      main: "1930年，西北科学考察团在沙丘发现了第一批竹简。",
      sub: "风，吹了三千年，掩埋了一个王朝的背影。"
    }
  },

  // Chapter 2: 残简 - 探索
  chapter2: {
    bambooSlips: [
      {
        id: 1,
        historical: "赵雍胡服骑射，让赵国称霸中原",
        archaeological: "这些竹简证实了史书记载，但还有疑问...",
        period: "公元前307年"
      },
      {
        id: 2,
        historical: "主父传位于子何，是为惠文王",
        archaeological: "为何传位后又后悔？这段历史语焉不详",
        period: "公元前299年"
      },
      {
        id: 3,
        historical: "主父之乱，公子成与李兑起兵",
        archaeological: "竹简在此处残缺，似乎有人刻意损毁",
        period: "公元前297年"
      }
    ]
  },

  // Chapter 3: 双线 - 对照
  chapter3: {
    timeline: [
      {
        year: -299,
        title: "退位传子",
        warring: "赵雍传位于子何，是为惠文王。主父自号主父。",
        republican: "1930年秋，考古队在沙丘宫遗址发现传位诏书残片",
        scene: "throne_abdication"
      },
      {
        year: -297,
        title: "主父之乱",
        warring: "公子成与李兑起兵，围攻主父。主父逃入沙丘宫。",
        republican: "出土竹简记录了宫廷政变的细节，与史书略有出入",
        scene: "palace_coup"
      },
      {
        year: -296,
        title: "困守沙丘",
        warring: "主父被困沙丘宫，不得出。公子成围宫三月。",
        republican: "发掘出大量封泥，显示当时封锁严密",
        scene: "trapped_in_palace"
      },
      {
        year: -295,
        title: "饿死宫中",
        warring: "三月后，宫门大开，主父已死。死状凄惨。",
        republican: "在宫室角落发现人骨，经鉴定为赵武灵王遗骸",
        scene: "death_by_starvation"
      }
    ]
  },

  // Chapter 4: 困兽 - 悲剧
  chapter4: {
    corners: [
      {
        id: 1,
        position: "top-left",
        narrative: "三月不雨，粮草已绝",
        detail: "沙丘宫内储粮渐尽，主父命人掏雀而食。"
      },
      {
        id: 2,
        position: "top-right",
        narrative: "公子成重兵包围",
        detail: "宫门外旌旗蔽日，救兵不得入。"
      },
      {
        id: 3,
        position: "bottom-left",
        narrative: "内无粮草，外无救兵",
        detail: "主父曾为一代雄主，今竟困死于此。"
      },
      {
        id: 4,
        position: "bottom-right",
        narrative: "三月后，主父饿死",
        detail: "公元前295年，赵武灵王崩于沙丘宫。"
      }
    ]
  },

  // Chapter 5: 回响 - 反思
  chapter5: {
    biography: {
      name: "赵武灵王",
      reign: "公元前325年 - 公元前295年",
      achievements: [
        "胡服骑射，军事改革",
        "灭中山，扩地千里",
        "使赵国称霸中原"
      ],
      tragedy: [
        "传位失误，引发内乱",
        "困死沙丘，饿死宫中",
        "一代雄主，悲剧收场"
      ]
    },
    reflection: {
      mainQuote: "没有路的时候，我们会迷路；路多了的时候，我们也会迷路。",
      commentary: "赵武灵王一生雄才大略，却因传位问题，最终困死沙丘。历史的迷雾从未完全散去，我们只能通过残简，窥见真相的一角。",
      historicalImpact: "胡服骑射的改革影响了后世数百年，但赵武灵王本人的结局，却成为历史的遗憾。"
    }
  }
}

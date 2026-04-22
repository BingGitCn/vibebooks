// 心理学概念数据 -- The Unexamined Mind
export const questions = [
  {
    id: 1,
    text: '你是否做了一个自己也无法解释的决定？',
    conceptSlug: 'cognitive-dissonance',
    order: 1
  },
  {
    id: 2,
    text: '你害怕什么，却不承认？',
    conceptSlug: 'repression',
    order: 2
  },
  {
    id: 3,
    text: '哪段记忆总在深夜回来？',
    conceptSlug: 'intrusive-thought',
    order: 3
  },
  {
    id: 4,
    text: '你最亲密的人，真正了解你吗？',
    conceptSlug: 'johari-window',
    order: 4
  },
  {
    id: 5,
    text: '如果没人评判，你会成为谁？',
    conceptSlug: 'shadow-self',
    order: 5
  }
]

export const concepts = [
  {
    id: 1,
    code: '001',
    slug: 'cognitive-dissonance',
    name: '认知失调',
    nameEn: 'COGNITIVE DISSONANCE',
    year: 1957,
    researcher: 'Leon Festinger',
    oneLine: '当信念与行为冲突时，人会改变信念，而非行为。',

    // 思维实验
    experiment: {
      scenario: '想象你花了三年在一个选择上。你开始怀疑它是错的。但你告诉自己——',
      choices: [
        { text: '我还来得及', feeling: '你在用希望填补裂缝。' },
        { text: '我不敢回头', feeling: '你在用恐惧封死出口。' }
      ],
      reveal: '无论选哪个，你的身体都微微紧张了。那就是认知失调在说话。'
    },

    // 实验室
    lab: {
      source: 'Festinger & Carlsmith, 1959',
      quote: '人有一种维持内部一致性的强烈驱力。当信念与行为不一致时，人会经历心理不适，并试图消除它。',
      poll: {
        question: '面对信念与行为的冲突，你通常会——',
        options: [
          { label: '改变信念', percent: 57 },
          { label: '改变行为', percent: 12 },
          { label: '什么都不改', percent: 31 }
        ],
        voters: 2847
      }
    },

    // 文学回响
    literary: {
      quote: '人是这样一种动物，他们对自己撒的谎，比对别人撒的谎更多。',
      author: '阿尔贝·加缪',
      source: '《堕落》'
    },

    // 自检镜
    mirror: {
      prompt: '回想最近一次你为某个决定辩护的场景。',
      question: '你是在说服别人，还是在说服自己？',
      options: [
        { label: '说服别人', insight: '也许你早已说服了自己——只是方式是回避而非面对。' },
        { label: '说服自己', insight: '能察觉到这一点，说明你在触碰真实的边界。' },
        { label: '不确定', insight: '不确定本身就是一个信号——它意味着你的自我认知正在松动。' }
      ]
    },

    // 关联概念
    related: ['confirmation-bias', 'rationalization', 'self-perception-theory', 'choice-blindness']
  },
  {
    id: 2,
    code: '002',
    slug: 'repression',
    name: '压抑',
    nameEn: 'REPRESSION',
    year: 1915,
    researcher: 'Sigmund Freud',
    oneLine: '你并非遗忘了恐惧，只是将它埋在了意识无法触及的地方。',

    experiment: {
      scenario: '有什么东西你不敢看，却总是从眼角瞥见。你选择——',
      choices: [
        { text: '转身面对它', feeling: '你准备好了。但你真的准备好了吗？' },
        { text: '移开视线', feeling: '安全。但安全也是一种牢笼。' }
      ],
      reveal: '被压抑的不是记忆本身，而是记忆携带的情感。它会以另一种形式回来——焦虑、梦境、身体的疼痛。'
    },

    lab: {
      source: 'Freud, 1915 / Holmes, 1990',
      quote: '压抑是无意识的第一道防线。它不是遗忘，而是主动地将不可承受的体验推入黑暗。',
      poll: {
        question: '你认为童年有没有影响你现在的行为？',
        options: [
          { label: '有很大影响', percent: 62 },
          { label: '有一些影响', percent: 28 },
          { label: '几乎没有', percent: 10 }
        ],
        voters: 3102
      }
    },

    literary: {
      quote: '未被表达的情绪永远不会消失。它们只是被活埋了，并将在未来以更加丑陋的方式涌现。',
      author: '弗洛伊德',
      source: '对话录'
    },

    mirror: {
      prompt: '回想一种你反复出现的身体不适——头痛、胃痛、肩颈僵硬。',
      question: '医生说没什么问题。你有没有想过，它在替你说什么？',
      options: [
        { label: '想过', insight: '身体是最诚实的记录者。它记录了你拒绝承认的一切。' },
        { label: '没想过', insight: '现在开始想也不晚。身体一直在等你倾听。' },
        { label: '不愿想', insight: '这个"不愿"本身，就是压抑在工作的证据。' }
      ]
    },

    related: ['intrusive-thought', 'defense-mechanisms', 'shadow-self', 'trauma-response']
  },
  {
    id: 3,
    code: '003',
    slug: 'intrusive-thought',
    name: '侵入性思维',
    nameEn: 'INTRUSIVE THOUGHT',
    year: 1978,
    researcher: 'Stanley Rachman',
    oneLine: '那个你不想要的念头，恰恰证明你是一个正常的人。',

    experiment: {
      scenario: '深夜，你站在阳台上。一个念头突然出现：如果我跳下去呢？你——',
      choices: [
        { text: '被吓到，赶紧退回房间', feeling: '恐惧是健康的反应。但那个念头本身并不意味着你真的想跳。' },
        { text: '愣住，心跳加速', feeling: '你的身体在回应一个你并不认同的想法。这就是侵入性思维的力量。' }
      ],
      reveal: '研究显示，93% 的人都有过侵入性思维。它不是你"想要"的，而是大脑的安全检查系统在运转。'
    },

    lab: {
      source: 'Rachman & de Silva, 1978',
      quote: '侵入性思维几乎普遍存在。正常人与患者的区别不在于是否出现，而在于如何应对。',
      poll: {
        question: '你有没有过"突然冒出不想有的念头"？',
        options: [
          { label: '经常', percent: 41 },
          { label: '偶尔', percent: 52 },
          { label: '几乎没有', percent: 7 }
        ],
        voters: 4215
      }
    },

    literary: {
      quote: '思想是自由的，它们来来去去，没有人能控制它们。被思想吓到，才是真正的牢笼。',
      author: '费尔南多·佩索阿',
      source: '《不安之书》'
    },

    mirror: {
      prompt: '回想一个反复出现在你脑海、但你极力抗拒的念头。',
      question: '你有没有试着不去想它？效果如何？',
      options: [
        { label: '越压抑越强烈', insight: '讽刺的是，"不要想白熊"的实验证明：压抑反而强化了念头。' },
        { label: '勉强能控制', insight: '控制需要消耗大量心理能量。长期如此，你会疲惫不堪。' },
        { label: '已经学会了共存', insight: '接纳——而非对抗——是真正走出循环的开始。' }
      ]
    },

    related: ['cognitive-dissonance', 'repression', 'rumination', 'metacognition']
  },
  {
    id: 4,
    code: '004',
    slug: 'johari-window',
    name: '乔哈里视窗',
    nameEn: 'JOHARI WINDOW',
    year: 1955,
    researcher: 'Joseph Luft & Harrington Ingham',
    oneLine: '你知道的自己和别人看到的你，是两个不同的形状。它们之间的缝隙，藏着真相。',

    experiment: {
      scenario: '你最好的朋友说了一句话："你有没有发现，你总是……"你没让他们说完。因为——',
      choices: [
        { text: '你已经知道他们要说什么', feeling: '你真的知道吗？还是你在害怕？' },
        { text: '你不想听到', feeling: '不想听到的东西，往往是最需要听到的。' }
      ],
      reveal: '每个人都有一个"盲区"——别人看得见、自己却看不见的部分。乔哈里视窗就是一面镜子。'
    },

    lab: {
      source: 'Luft & Ingham, 1955',
      quote: '人际交往的本质是信息的交换。我们每个人都是由四个窗口组成的：开放区、盲区、隐藏区和未知区。',
      poll: {
        question: '你觉得最了解你的是——',
        options: [
          { label: '自己', percent: 34 },
          { label: '亲密的人', percent: 45 },
          { label: '没有人', percent: 21 }
        ],
        voters: 2156
      }
    },

    literary: {
      quote: '我们看见的不是一个世界，而是我们愿意看见的那个世界。',
      author: '阿娜伊斯·宁',
      source: '日记'
    },

    mirror: {
      prompt: '回想最近一次别人对你的评价让你不舒服。',
      question: '那种不舒服，是因为他们说错了，还是因为他们说对了？',
      options: [
        { label: '说错了', insight: '也许。但也值得问自己：为什么这个"错误"让你如此不舒服？' },
        { label: '说对了', insight: '承认这一点需要勇气。你的盲区正在缩小。' },
        { label: '说不清', insight: '说不清的区域，往往是乔哈里视窗中最大的一块——未知区。' }
      ]
    },

    related: ['cognitive-dissonance', 'shadow-self', 'projection', 'self-perception-theory']
  },
  {
    id: 5,
    code: '005',
    slug: 'shadow-self',
    name: '阴影自我',
    nameEn: 'SHADOW SELF',
    year: 1951,
    researcher: 'Carl Jung',
    oneLine: '你最讨厌别人身上的那个特质，恰恰是你自己拒绝承认的部分。',

    experiment: {
      scenario: '你极度反感一个人。他们的某种特质让你几乎无法忍受。停下来想想——那个特质是什么？',
      choices: [
        { text: '自私', feeling: '也许你从未允许自己"自私"过。' },
        { text: '虚伪', feeling: '也许你也有一个不敢示人的面具。' }
      ],
      reveal: '荣格说：我们对别人的强烈反感，往往是阴影的投射。你不是在厌恶他们——你是在恐惧自己。'
    },

    lab: {
      source: 'Jung, 1951 / Projection Theory',
      quote: '一个人如果无法面对自己的阴影，他就永远无法真正认识自己。阴影不是敌人，而是被遗忘的自我。',
      poll: {
        question: '你有没有在自己讨厌的人身上，看到过自己的影子？',
        options: [
          { label: '有过，很不安', percent: 48 },
          { label: '有过，但不愿承认', percent: 33 },
          { label: '从来没有', percent: 19 }
        ],
        voters: 3789
      }
    },

    literary: {
      quote: '知道自己的黑暗，是最好的应对他人黑暗的方法。',
      author: '荣格',
      source: '《红书》'
    },

    mirror: {
      prompt: '写下三个你最讨厌别人的特质。现在，诚实地问自己——',
      question: '你身上有没有那个特质，哪怕只有一点点？',
      options: [
        { label: '有', insight: '这不是弱点。这是完整自我的开始。荣格称之为"个体化"。' },
        { label: '没有', insight: '荣格会说：你的阴影正在回答这个问题。答案藏在你拒绝看的地方。' },
        { label: '不确定', insight: '不确定是通往确定的入口。试着在那个特质上多停留一会儿。' }
      ]
    },

    related: ['repression', 'johari-window', 'projection', 'defense-mechanisms']
  },
  {
    id: 6,
    code: '006',
    slug: 'confirmation-bias',
    name: '确认偏误',
    nameEn: 'CONFIRMATION BIAS',
    year: 1960,
    researcher: 'Peter Wason',
    oneLine: '你并非在寻找真相。你只是在寻找支持自己观点的证据。',

    experiment: {
      scenario: '你相信一件事。有人拿出证据反驳你。你的第一反应是——',
      choices: [
        { text: '仔细看看他们的证据', feeling: '你愿意接受挑战。但你的大脑已经在找漏洞了。' },
        { text: '一定哪里有问题', feeling: '你还没看，就已经下了结论。这就是确认偏误。' }
      ],
      reveal: 'Wason 的实验证明：人会自然地寻找支持自己信念的证据，而忽略反驳它的证据。你的理性，没有你想象的那么理性。'
    },

    lab: {
      source: 'Wason, 1960 / Nickerson, 1998',
      quote: '确认偏误是所有认知偏误中最普遍、最顽固的一种。它让我们相信自己在客观思考，实际上只是在进行辩护。',
      poll: {
        question: '你觉得自己能客观评估与自己观点相反的证据吗？',
        options: [
          { label: '能，我尽量客观', percent: 73 },
          { label: '有时候能', percent: 22 },
          { label: '很难', percent: 5 }
        ],
        voters: 5124
      }
    },

    literary: {
      quote: '人的大脑是一个出色的律师——它不是在寻找真相，而是在为自己的立场辩护。',
      author: '乔纳森·海特',
      source: '《正义之心》'
    },

    mirror: {
      prompt: '回想一个你坚定持有的观点——政治的、人生的、关于某个人的。',
      question: '你最后一次认真阅读反对这个观点的文章，是什么时候？',
      options: [
        { label: '最近读过', insight: '你比大多数人做得好。但问题是：你是为了反驳而读，还是为了理解而读？' },
        { label: '很久了', insight: '你的信念是一座没有受过攻击的城堡。它的坚固，可能只是因为没有被考验过。' },
        { label: '从不', insight: '诚实值得尊重。现在是一个好的开始。' }
      ]
    },

    related: ['cognitive-dissonance', 'rationalization', 'choice-blindness', 'anchoring-bias']
  },

  {
    id: 7,
    code: '007',
    slug: 'rationalization',
    name: '合理化',
    nameEn: 'RATIONALIZATION',
    year: 1908,
    researcher: 'Ernest Jones / Anna Freud',
    oneLine: '你给出的每一个理由，可能都不是真正的原因。',

    experiment: {
      scenario: '你做了一个让所有人意外的决定。当别人问你为什么，你——',
      choices: [
        { text: '立刻给出了理由', feeling: '那个理由，是你做决定之前就有了，还是之后才编的？' },
        { text: '想了想，说不清', feeling: '说不清的那个瞬间，也许是最诚实的。' }
      ],
      reveal: '合理化是大脑的公关部门——它不负责做决定，只负责让决定看起来合理。'
    },

    lab: {
      source: 'Jones, 1908 / Nisbett & Wilson, 1977',
      quote: '人对自己行为原因的觉察，往往不是直接观察，而是事后构建的叙事。我们比想象中更不了解自己。',
      poll: {
        question: '你做重要决定时，通常靠——',
        options: [
          { label: '理性分析', percent: 38 },
          { label: '直觉', percent: 44 },
          { label: '说不清', percent: 18 }
        ],
        voters: 2967
      }
    },

    literary: {
      quote: '我们不是先理解再行动；我们是先行动，然后发明理解。',
      author: '乔治·爱略特',
      source: '《米德尔马契》'
    },

    mirror: {
      prompt: '回想一个你最近做的决定，你给出了一个很好的理由。',
      question: '如果那个理由不成立，你还会做同样的决定吗？',
      options: [
        { label: '会', insight: '那么那个理由并不是真正的原因。它在为你服务，而不是引导你。' },
        { label: '不会', insight: '那至少这个理由是真实的。但值得检查：还有没有其他隐藏的动机？' },
        { label: '不确定', insight: '不确定意味着你的决定可能有多个原因——有些你能看见，有些不能。' }
      ]
    },

    related: ['cognitive-dissonance', 'confirmation-bias', 'self-perception-theory', 'defense-mechanisms']
  },

  {
    id: 8,
    code: '008',
    slug: 'self-perception-theory',
    name: '自我知觉理论',
    nameEn: 'SELF-PERCEPTION THEORY',
    year: 1967,
    researcher: 'Daryl Bem',
    oneLine: '你不是因为高兴才笑，你是因为笑了才发现自己高兴。',

    experiment: {
      scenario: '有人问你："你喜欢什么类型的人？"你想了想，发现自己描述的，和你的历任伴侣完全不同。',
      choices: [
        { text: '也许我并不了解自己', feeling: '这个觉察本身就是自我知觉理论的入口。' },
        { text: '人都会变的', feeling: '你用"变化"来解释矛盾。这也是一种合理化。' }
      ],
      reveal: 'Bem 提出：我们不是通过内省来认识自己的，而是通过观察自己的行为来"推断"自己的态度——就像观察别人一样。'
    },

    lab: {
      source: 'Bem, 1967',
      quote: '个体通过观察自己的行为和行为的情境，来推断自己的态度——就像一个外部观察者一样。',
      poll: {
        question: '你觉得你最了解自己的哪个方面？',
        options: [
          { label: '我喜欢什么', percent: 22 },
          { label: '我会怎么做', percent: 51 },
          { label: '都不太了解', percent: 27 }
        ],
        voters: 1834
      }
    },

    literary: {
      quote: '我无法直接认识自己，只能通过我做的事来推断——就像阅读自己的日记，而不是审视自己的灵魂。',
      author: '普鲁斯特',
      source: '《追忆似水年华》'
    },

    mirror: {
      prompt: '不要想。看看你过去一周的行为——你做了什么、没做什么、回避了什么。',
      question: '你的行为，比你的想法，更诚实地反映了你是谁吗？',
      options: [
        { label: '是的', insight: '那么也许你应该少问"我怎么想"，多看"我怎么做"。' },
        { label: '不是', insight: '想法和行为之间的裂缝，往往就是自我欺骗的空间。' },
        { label: '不一定', insight: '这个"不一定"，正是自我知觉理论的核心——我们对自己的了解，远没有我们以为的那么直接。' }
      ]
    },

    related: ['cognitive-dissonance', 'rationalization', 'johari-window', 'choice-blindness']
  },

  {
    id: 9,
    code: '009',
    slug: 'defense-mechanisms',
    name: '心理防御机制',
    nameEn: 'DEFENSE MECHANISMS',
    year: 1936,
    researcher: 'Anna Freud',
    oneLine: '你的大脑有一整套保护系统，让你看不见真相——为了保护你。',

    experiment: {
      scenario: '有人说了一句刺痛你的话。你——',
      choices: [
        { text: '假装没听见', feeling: '否认——最原始的防御。它让危险"不存在"。' },
        { text: '反击，指出对方的问题', feeling: '投射——把不舒服的感受转移给别人。' }
      ],
      reveal: '防御机制不是"不好"的。它们是你曾经在无助时学会的生存策略。问题是：你还在用吗？'
    },

    lab: {
      source: 'A. Freud, 1936 / Vaillant, 1992',
      quote: '防御机制是无意识的策略，用以减轻焦虑和保护自尊。从否认到幽默，从幼稚到成熟——它们构成了人格的免疫系统。',
      poll: {
        question: '面对压力时，你最常用的方式是——',
        options: [
          { label: '假装没事', percent: 35 },
          { label: '转移注意力', percent: 40 },
          { label: '直接面对', percent: 25 }
        ],
        voters: 4567
      }
    },

    literary: {
      quote: '真相就像光一样，人抱怨它刺眼，却不是因为光不好，而是因为习惯了黑暗。',
      author: '叔本华',
      source: '散文集'
    },

    mirror: {
      prompt: '回想最近一次你感到焦虑或不安，但迅速让自己"没事了"。',
      question: '你是真的没事了，还是按下了"跳过"按钮？',
      options: [
        { label: '真的没事', insight: '也许。但防御机制的诡异之处在于——你不会察觉它正在工作。' },
        { label: '按下了跳过', insight: '能承认这一点，说明你的觉察力已经在穿透防御层了。' },
        { label: '分不清', insight: '分不清本身就是防御机制的特征——它让你无法区分真实感受和伪装的平静。' }
      ]
    },

    related: ['repression', 'projection', 'rationalization', 'cognitive-dissonance']
  },

  {
    id: 10,
    code: '010',
    slug: 'projection',
    name: '投射',
    nameEn: 'PROJECTION',
    year: 1911,
    researcher: 'Sigmund Freud',
    oneLine: '你在别人身上看到的，往往是自己内心的投射。',

    experiment: {
      scenario: '你走进一个房间，所有人都在笑。你的第一反应——',
      choices: [
        { text: '他们在笑我', feeling: '你以为你看到的是事实，但也许那只是你的不安在说话。' },
        { text: '他们很快乐', feeling: '你用善意解释了这件事。但善意的反面，也可能是一种回避。' }
      ],
      reveal: '投射是心灵的一面镜子：你看到的世界，不是世界本来的样子，而是你内心的样子。'
    },

    lab: {
      source: 'Freud, 1911 / Holmes, 1978',
      quote: '投射是一种无意识过程，个体将自己无法接受的情感、动机或特质归因于他人。',
      poll: {
        question: '你觉得自己看人准吗？',
        options: [
          { label: '很准', percent: 44 },
          { label: '一般', percent: 42 },
          { label: '经常看错', percent: 14 }
        ],
        voters: 3012
      }
    },

    literary: {
      quote: '别人的缺点让我们不快，往往是因为我们自己也有那些缺点，而我们对自己很苛刻。',
      author: '蒙田',
      source: '《随笔集》'
    },

    mirror: {
      prompt: '现在，想一个你不喜欢的人。列出三个你不喜欢他们的原因。',
      question: '这三个原因里，有没有哪一个，在你自己身上也存在？',
      options: [
        { label: '有', insight: '荣格说这就是阴影。投射的本质是：你在外部世界看到了自己拒绝承认的内部世界。' },
        { label: '没有', insight: '也许。但请注意——最强烈的否认，往往出现在最接近真相的时候。' },
        { label: '不确定', insight: '不确定是一个好的起点。试着在那个不舒服的感觉上停留几秒钟。' }
      ]
    },

    related: ['shadow-self', 'defense-mechanisms', 'johari-window', 'repression']
  },

  {
    id: 11,
    code: '011',
    slug: 'choice-blindness',
    name: '选择盲视',
    nameEn: 'CHOICE BLINDNESS',
    year: 2005,
    researcher: 'Petter Johansson',
    oneLine: '你以为你知道自己选了什么。但如果有人悄悄换了你的选择，你可能根本不会发现。',

    experiment: {
      scenario: '你在两张照片中选了更好看的一张。然后有人把照片拿走，再递给你——另一张。然后问你：为什么选这张？',
      choices: [
        { text: '我选的是这张吗？', feeling: '你开始怀疑自己了。大多数人不会。' },
        { text: '因为……（开始解释）', feeling: '你在为一个你其实没做过的选择辩护。这就是选择盲视。' }
      ],
      reveal: 'Johansson 的实验发现：当人们的选择被悄悄调换后，超过 70% 的人没有发现，并且为"自己的选择"编造了完整的理由。'
    },

    lab: {
      source: 'Johansson et al., 2005 / Hall et al., 2010',
      quote: '选择盲视揭示了自我认知的一个根本问题：我们对自己偏好的觉察，可能远没有我们想象的那么直接和可靠。',
      poll: {
        question: '你相信你的每一个选择都是有意识做出的吗？',
        options: [
          { label: '相信', percent: 31 },
          { label: '不确定', percent: 52 },
          { label: '不相信', percent: 17 }
        ],
        voters: 2567
      }
    },

    literary: {
      quote: '人是这样一种生物：他们先选择，然后发明选择的理由，最后相信那个理由从一开始就存在。',
      author: '尼采',
      source: '《善恶的彼岸》'
    },

    mirror: {
      prompt: '回想最近一次购物、投票或做决定。你清楚地记得自己为什么选了这个吗？',
      question: '如果你的"原因"是事后才想到的，那真正驱动你选择的是什么？',
      options: [
        { label: '不知道', insight: '诚实。也许你的直觉、情绪或无意识偏好，比你以为的更有话语权。' },
        { label: '感觉很对', insight: '"感觉对了"本身就是一种选择。只是它发生在你能解释之前。' },
        { label: '确实是理性选择', insight: '也许。但 Johansson 的研究提醒我们：对自己保持一丝怀疑，是一种智慧。' }
      ]
    },

    related: ['self-perception-theory', 'rationalization', 'confirmation-bias', 'cognitive-dissonance']
  },

  {
    id: 12,
    code: '012',
    slug: 'anchoring-bias',
    name: '锚定效应',
    nameEn: 'ANCHORING BIAS',
    year: 1974,
    researcher: 'Tversky & Kahneman',
    oneLine: '你以为是自己在做判断，其实是第一个数字替你做了。',

    experiment: {
      scenario: '你走进一家店，看到一件外套标价 5000。然后你看到另一件 2000 的——突然觉得它很划算。',
      choices: [
        { text: '确实划算', feeling: '它真的划算吗？还是因为 5000 把你的标准拉高了？' },
        { text: '还是有感觉哪里不对', feeling: '你的直觉在告诉你：这个参照物本身可能是假的。' }
      ],
      reveal: '锚定效应证明：人的判断不是从零开始的。你接收到的第一个信息——无论多荒谬——都会成为你的"锚"。'
    },

    lab: {
      source: 'Tversky & Kahneman, 1974',
      quote: '人们在估计未知量时，会过度依赖最初接收到的信息——即使这个信息与判断完全无关。',
      poll: {
        question: '你觉得你买东西受"原价"标签影响大吗？',
        options: [
          { label: '很大', percent: 55 },
          { label: '有一些', percent: 35 },
          { label: '不受影响', percent: 10 }
        ],
        voters: 3890
      }
    },

    literary: {
      quote: '我们不是在衡量现实的尺度，而是在衡量我们被告知的尺度与现实之间的差距。',
      author: '丹尼尔·卡尼曼',
      source: '《思考，快与慢》'
    },

    mirror: {
      prompt: '回想你对"成功"、"正常"、"够好"的定义。这些标准是从哪里来的？',
      question: '你的第一个"锚"——是谁放下的？',
      options: [
        { label: '父母或家庭', insight: '家庭是最早的锚。它在你还不知道"锚"是什么的时候，就已经定下了。' },
        { label: '社会或文化', insight: '社交媒体时代，锚无处不在。你的"正常"，可能只是算法的产物。' },
        { label: '我自己', insight: '也许。但值得追问：你的"自己"，又是由什么塑造的？' }
      ]
    },

    related: ['confirmation-bias', 'rationalization', 'choice-blindness', 'cognitive-dissonance']
  }
]

// 概念关系图谱
export const conceptRelations = {
  'cognitive-dissonance': ['confirmation-bias', 'rationalization', 'self-perception-theory', 'choice-blindness'],
  'repression': ['intrusive-thought', 'defense-mechanisms', 'shadow-self', 'projection'],
  'intrusive-thought': ['cognitive-dissonance', 'repression', 'rumination', 'metacognition'],
  'johari-window': ['cognitive-dissonance', 'shadow-self', 'projection', 'self-perception-theory'],
  'shadow-self': ['repression', 'johari-window', 'projection', 'defense-mechanisms'],
  'confirmation-bias': ['cognitive-dissonance', 'rationalization', 'choice-blindness', 'anchoring-bias'],
  'rationalization': ['cognitive-dissonance', 'confirmation-bias', 'self-perception-theory', 'defense-mechanisms'],
  'self-perception-theory': ['cognitive-dissonance', 'rationalization', 'johari-window', 'choice-blindness'],
  'defense-mechanisms': ['repression', 'projection', 'rationalization', 'cognitive-dissonance'],
  'projection': ['shadow-self', 'defense-mechanisms', 'johari-window', 'repression'],
  'choice-blindness': ['self-perception-theory', 'rationalization', 'confirmation-bias', 'cognitive-dissonance'],
  'anchoring-bias': ['confirmation-bias', 'rationalization', 'choice-blindness', 'cognitive-dissonance']
}

// 根据 slug 获取概念
export function getConceptBySlug(slug) {
  return concepts.find(c => c.slug === slug)
}

// 根据 slug 获取关联概念
export function getRelatedConcepts(slug) {
  const relatedSlugs = conceptRelations[slug] || []
  return relatedSlugs.map(s => concepts.find(c => c.slug === s)).filter(Boolean)
}

// 根据 question id 获取对应概念
export function getConceptByQuestionId(questionId) {
  const q = questions.find(q => q.id === questionId)
  if (!q) return null
  return getConceptBySlug(q.conceptSlug)
}

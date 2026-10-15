import type { Copy } from './types.ts'

/**
 * Simplified Chinese. DRAFT: not yet reviewed by a native speaker. The language is built only when its switch in
 * `site.features.languages` is on, so none of this is public until someone fluent has read it.
 * The Traditional Chinese file (zhHant.ts) is generated from this one; edit this file and regenerate.
 */
export const zhHans: Copy = {
  locale: 'zh-hans',

  meta: {
    homeTitle: 'SitePilot | 温哥华本地商家的专属网站',
    homeDescription: '为温哥华和北温哥华的本地服务型商家制作专属单页网站。查看网站案例，并索取报价。',
    caseTitle: (name, isLive) => `${name}：${isLive ? '我制作的在线网站' : '概念项目'} | SitePilot`,
  },

  common: {
    skipToContent: '跳到内容',
    requestQuote: '索取报价',
    seeMyWork: '查看我的作品',
    openMenu: '打开菜单',
    closeMenu: '关闭菜单',
    mainNav: '主导航',
    mobileNav: '移动端导航',
    footerNav: '页脚',
    languageNav: '语言',
    backToTop: '回到顶部',
    privacy: '隐私',
    home: '首页',
    work: '作品',
    guides: '指南',
    breadcrumb: '页面路径',
    opensNewTab: (name) => `：${name}（在新标签页打开）`,
  },

  nav: { work: '作品', package: '服务内容', process: '流程', about: '关于', faq: '常见问题' },

  hero: {
    headline: '为温哥华本地服务型商家 量身定制的网站。',
    markedWords: [],
    lede: '展示您的作品，说明您的服务，让客户轻松索取报价。',
    facts: ['先出书面报价，再开始工作', '由我亲自设计和制作', '温哥华和北温哥华'],
    conceptCaption: (name, businessType) => `概念演示：${name}，为一家虚构的${businessType}商家所做的设计。`,
    viewExample: '查看示例',
  },

  work: {
    eyebrow: '精选作品',
    heading: '我做过什么，以及我如何设计。',
    lede: '两个在线网站、两个概念项目，以及为虚构商家做的设计概念，每一个都标明了它是什么。',
    statusLive: '在线网站',
    statusConcept: '概念项目',
    contribution: '我的工作：',
    visitLive: '访问在线网站',
    openLivePreview: '打开在线预览',
    readCaseStudy: '阅读案例详情',
    conceptDemo: '概念演示',
    viewExample: '查看示例',
    openLarger: (name) => `打开较大预览：${name}`,
    openPhone: (name) => `打开手机预览：${name}`,
  },

  projects: {
    'farsh-aquatics': {
      type: '私人游泳课程，温哥华和北岸',
      caption: '我设计并制作的温哥华游泳教学商家网站',
      summary: '一个为私人游泳教学和救生服务制作的单页网站，让家长一眼就能看到两项服务，并立刻打电话、发短信或发邮件。',
      contribution: '品牌形象和单页网站：标志、名片和网站本身。',
      decisions: [
        '打电话、发短信和发邮件的按钮放在页眉和首屏，家长在页面任何位置都能联系。',
        '两项服务——教练和救生——各有独立的板块，访客能很快找到自己需要的那一项。',
      ],
      alt: '“Farsh Aquatics”首页：明亮的蓝色页面，包含标志、商家名称、简短介绍，以及打电话和发邮件的按钮。',
    },
    '604kars': {
      type: 'Turo 车辆托管，大温哥华地区',
      caption: '我设计并制作的大温哥华车辆托管网站',
      summary: '一个为大温哥华地区车辆托管服务制作的落地页，用来说明为车主处理哪些事务，并让车主申请估算。',
      contribution: '网站设计与开发，包括估算表单和手机端导航。',
      decisions: [
        '一个交互式估算器让车主查看每月金额，其假设条件直接写在下方。',
        '服务被拆分为六项通俗易懂的工作，车主能清楚看到处理哪些事务。',
      ],
      alt: '“604 Kars”首页：一个衬线字体标题，讲述车停在车道上没有任何收入，并有获取估算的按钮和交互式收益估算器。',
      note: '收益估算器展示的是示例数字。网站在其下方直接写明了假设条件，这些数字并非实际结果。',
    },
    'ganjineh-ofogh': {
      type: '双语住宅塔楼网站',
      caption: '一个住宅塔楼的双语网站',
      summary: '一个住宅塔楼的波斯语和英语网站，带有大楼及其四套公寓的交互式 3D 模型。',
      contribution: '整个网站的设计与开发，包括双语页面和交互式 3D 查看器。',
      decisions: [
        '默认语言为波斯语，每个页面都有对应的英文版本，语言切换会保留您当前的位置。',
        '3D 查看器让访客在咨询之前先浏览塔楼和每一套公寓。',
      ],
      alt: '“Ganjineh Ofogh”首页：塔楼的英文和波斯文名称，旁边是一张建筑的效果图。',
    },
    mend: {
      type: '开发中的产品落地页',
      caption: '一个开发中应用的落地页',
      summary:
        'Mend 的落地页。Mend 是一款仍在开发中的自助式工具，面向约 2 至 12 岁孩子的家长和照护者，页面带有示意预览画面和候补名单。',
      contribution: '落地页的设计与开发，包括预览画面和候补名单表单。',
      decisions: [
        '页面以一个安静的时刻和一个行动开篇：加入候补名单。',
        '预览画面用三个步骤（暂停、梳理、重新连接）展示这个想法，并明确标注为示意，而非正式应用。',
      ],
      alt: '“Mend”首页：深色页面，标题为“You yelled.”，下方是一句关于事后安静时刻的话，以及候补名单的邮箱输入框。',
      note: 'Mend 尚未发布。页面上的预览画面是示意性的样图，页面本身也是这样说明的。',
    },
  },

  examples: {
    cleaning: {
      businessType: '家庭清洁',
      intent: '为帮助忙碌的家庭了解服务包含什么并申请清洁报价而设计。',
      approach: '明亮友好，服务以简短的列表呈现，报价表单始终触手可及。',
      action: '索取报价',
    },
    landscaping: {
      businessType: '园艺景观',
      intent: '为帮助屋主了解一年四季养护什么并预约上门而设计。',
      approach: '平和质朴，服务简明排列，全年按季节划分。',
      action: '预约上门',
    },
  },

  package: {
    eyebrow: '您的网站套餐',
    heading: '一个专注的页面，为您的业务而建。',
    lede: '它回答客户在致电之前会问的问题：您做什么、您的作品是什么样子，以及如何联系您。',
    groups: [
      { title: '设计', text: '为您的业务量身设计的单页网站，在手机和电脑上都显示良好。' },
      { title: '内容', text: '您的服务、您自己的作品照片和联系方式，清晰有序地呈现。' },
      { title: '咨询', text: '报价申请表和醒目的联系按钮，让客户知道如何联系您。' },
      { title: '上线', text: '为搜索引擎准备的页面标题与描述，以及分享链接时的整洁预览。' },
    ],
    quoteLead: '先给您书面报价。',
    quoteBody:
      '开始工作之前，报价会明确费用、工作范围、时间安排、主机和域名的安排，以及任何持续费用。超出单页的内容，例如额外的页面或功能，将另行报价。',
    factors: [
      { title: '已准备好的内容', text: '您的服务、照片和联系方式。' },
      { title: '超出一页的内容', text: '额外的页面或功能，单独列项报价。' },
      { title: '主机和域名', text: '您已经拥有什么，以及希望由我安排什么。' },
      { title: '时间', text: '您的资料何时准备好，以及您希望何时上线。' },
    ],
  },

  process: {
    eyebrow: '流程',
    heading: '我们如何合作。',
    steps: [
      { title: '介绍您的业务。', text: '告诉我您做什么、服务哪些客户，以及希望网站起到什么作用。' },
      { title: '提供您的内容。', text: '服务项目、照片、联系方式，以及您已有的品牌素材。' },
      { title: '查看您的网站。', text: '在最终版本确认之前，先审阅设计和内容。' },
      { title: '确认并安排上线。', text: '确认最终网站，并安排发布方式。' },
    ],
  },

  audience: {
    eyebrow: '我为谁服务',
    heading: '为本地服务型商家而做。',
    lede: '如果客户通过搜索、打听或手机上的一个链接找到您，一个清晰的页面能让下一步一目了然。请选择最接近您业务的一项。',
    readPage: '阅读该页面',
    forName: (name) => `：${name}`,
    guidesLead: '正在计划做网站？两篇简短指南：',
  },

  about: {
    eyebrow: '关于',
    heading: '您直接与我合作。',
    glance: [
      { label: '所在地', value: '温哥华和北温哥华，不列颠哥伦比亚省' },
      { label: '谁来制作', value: '我本人，直接对接，没有中间环节。' },
      { label: '开始工作之前', value: '一份由您确认的书面报价' },
      { label: '沟通方式', value: '通过电子邮件，用简明的语言' },
    ],
    paragraphs: [
      '我是 Amir。每一个网站都由我亲自设计和制作，所以您发来消息时，对面就是实际做事的人。',
      '近期的作品包括：为温哥华一家私人游泳教学商家制作的单页网站；为一家车辆托管服务制作的、带交互式估算器的落地页；以及一个带有住宅塔楼交互式 3D 模型的双语概念网站。',
      '我专注于为温哥华和北温哥华的本地服务型商家制作实用的网站，范围保持简单、语言保持平实，让您清楚知道会得到什么，以及接下来会发生什么。',
    ],
  },

  faq: {
    eyebrow: '常见问题',
    heading: '联系我之前。',
    moreLead: '还有其他问题？',
    askInForm: '在表单中提问',
    orEmail: '，或发送邮件至 ',
    moreEnd: '。',
    items: [
      {
        question: '我需要已经有网站吗？',
        answer:
          '不需要。很多本地商家是从社交媒体页面和口碑开始的。如果您已有的网站显得过时，我可以把它重做成一个清晰的单页。请在表单中填写您现有网站的地址，我会先看一看。',
      },
      {
        question: '我需要提供什么？',
        answer: '您的商家名称、您提供的服务、您服务的区域、联系方式，以及您作品的照片。标志和品牌色会有帮助，但不是必须的。',
      },
      {
        question: '之后可以增加页面或功能吗？',
        answer: '可以。告诉我您的想法，我会把它作为单独一项放进您的报价，让您在了解全部情况后再决定。',
      },
      {
        question: '主机和域名包含在内吗？',
        answer: '这取决于您已经拥有什么，所以会写进您的报价。如果您已有域名，请在留言中提到。',
      },
      {
        question: '需要多长时间？',
        answer: '主要取决于您的照片和资料多快准备好。我会随报价给您一个时间安排，而不是一开始就猜。',
      },
    ],
  },

  siteCheck: {
    eyebrow: '已经有网站了？',
    heading: '先从免费的网站检查开始。',
    text: '把您的网址发给我，我会回复我首先会修改的地方。您不需要新网站也可以来问，没有您的确认，不会开始任何工作。',
    button: '申请网站检查',
    starterMessage: '请看一下我现有的网站，并告诉我您首先会修改什么。',
  },

  contact: {
    eyebrow: '开始吧',
    heading: '索取报价。',
    lede: '告诉我您的业务和您的需求。我会回复您，一起讨论范围和下一步。',
    nextTitle: '接下来会怎样',
    nextSteps: [
      '您发来一条消息，写多写少都可以。',
      '我阅读后通过电子邮件回复，一起讨论您的需求。',
      '如果合适，我会发送一份书面报价。在您确认之前，不会开始任何工作。',
    ],
    preferEmail: '更喜欢发邮件？',
    copyEmail: '复制邮箱地址',
    copied: '已复制',
    copiedNote: (email) => `${email} 已复制到剪贴板。`,
    copyFailed: '无法复制。请选中地址后手动复制。',
    privacyTitle: '您的信息如何使用',
    privacyForm: '您发送的内容会通过第三方表单服务发给我，仅用于回复您关于网站的问题。',
    privacyMailto: '表单会打开您自己的邮件应用，本网站不会保存任何内容。您发送的内容仅用于回复您关于网站的问题。',
    privacyDelete: '如需删除您的信息，请给我发邮件。',
  },

  form: {
    name: '姓名',
    email: '电子邮箱',
    message: '请介绍一下您的业务',
    messageHint: '您做什么，以及您希望网站帮您做什么。',
    addDetails: '补充更多信息',
    optional: '（选填）',
    businessName: '商家名称',
    businessType: '业务类型',
    chooseOne: '请选择',
    phone: '电话',
    existingWebsite: '现有网站',
    websitePlaceholder: 'yourbusiness.ca',
    helpTitle: '您需要哪种帮助？',
    businessTypes: [
      { value: 'Cleaning', label: '清洁' },
      { value: 'Contracting or renovation', label: '承包或装修' },
      { value: 'Landscaping', label: '园艺景观' },
      { value: 'Auto detailing or automotive service', label: '汽车美容或汽车服务' },
      { value: 'Barber or salon', label: '理发或美发沙龙' },
      { value: 'Independent service provider', label: '独立服务提供者' },
      { value: 'Other', label: '其他' },
    ],
    needs: [
      { value: 'A new website', label: '一个新网站' },
      { value: 'An update to my current website', label: '更新我现有的网站' },
      { value: 'Help deciding', label: '帮我拿主意' },
      { value: 'Something else', label: '其他' },
    ],
    errors: {
      nameRequired: '请填写您的姓名。',
      emailRequired: '请填写您的邮箱，以便我回复。',
      emailInvalid: '请输入有效的邮箱地址，例如 name@example.com。',
      phoneInvalid: '请检查电话号码，或留空。',
      websiteInvalid: '请输入类似 yourbusiness.ca 的网址，或留空。',
      messageRequired: '请简单介绍一下您的业务和需求。',
      messageShort: '请再补充一些细节，以便我给出有用的回复。',
    },
    checkFields: (count) => (count === 1 ? '请检查标出的字段。' : `请检查标出的 ${count} 个字段。`),
    sending: '正在发送…',
    send: '发送报价申请',
    openEmail: '打开邮件应用发送',
    sentDirect: '将直接发给我。我会通过电子邮件回复。',
    mailtoNote: '这会打开您的邮件应用，并填好您的信息，等您发送。',
    successTitle: (firstName) => `谢谢，${firstName}。您的申请已发送。`,
    successBody: (email) => `我会阅读后回复 ${email}，一起讨论您的需求和下一步。`,
    sendAnother: '再发送一份申请',
    errorTitle: '抱歉，您的申请未能发送。',
    errorBefore: '您填写的信息还在。请重试，或发邮件至 ',
    errorAfter: '。',
    emailOpenedTitle: '您的邮件应用现在应该已打开，并填好了您的信息。',
    emailOpenedBefore: '请在其中点击发送，才能联系到我。目前还没有发送任何内容。如果没有打开邮件窗口，请复制您的信息并发送至 ',
    emailOpenedAfter: '。',
    copyDetails: '复制我的信息',
    detailsCopied: '已复制',
    copyUnavailable: '无法复制，请给我发邮件',
  },

  footer: {
    tagline: () => '为温哥华和北温哥华的本地服务型商家制作专属单页网站。',
    websitesFor: '网站服务对象',
    guides: '指南',
    copyright: (year, name) => `© ${year} ${name}。此处展示的示例网站是为虚构商家所做的概念设计。`,
  },

  trades: [
    {
      slug: 'cleaning-companies',
      name: '清洁公司',
      noun: '清洁公司',
      title: '温哥华清洁公司网站 | SitePilot',
      description: '为温哥华和北温哥华的清洁公司制作清晰的单页网站：服务内容、服务范围，以及方便的报价申请。',
      headline: '为您的清洁公司打造一个单页网站。',
      intro:
        '选择清洁服务的人想知道：每次上门包含什么、您是否服务他们所在的区域，以及如何获得报价。一个清晰的页面就能回答这三个问题。',
      checks: [
        { title: '每次服务包含什么', text: '日常清洁、深度清洁和搬家清洁，在不同的人眼里含义不同。请写清楚每一种包含哪些内容。' },
        { title: '服务范围', text: '写明您服务的社区或城市，让人不必再来询问。' },
        { title: '如何获得报价', text: '一个简短的报价表单，以及醒目的电话或邮件按钮，页面顶部和底部都要有。' },
        { title: '谁会进入家中', text: '用几句真诚的话介绍您和您的团队，让人放心预约。' },
      ],
      includes: [
        '以简短清晰的列表呈现您的服务',
        '您的服务范围',
        '您自己拍摄的完工照片',
        '在手机上好用的报价表单',
        '点击即可拨打的电话和邮件按钮',
        '适合搜索的页面标题与描述，以及分享链接时整洁的预览',
      ],
      faq: [
        {
          question: '我需要施工前后对比照片吗？',
          answer: '有帮助，但不是必须的。在良好光线下拍摄的几张清晰完工照片就足以开始，我会告诉您哪些值得补充。',
        },
        {
          question: '客户不打电话也能申请报价吗？',
          answer: '可以。页面有一个简短的报价表单，同时也显示您的电话和邮箱，让大家选择最方便的方式。',
        },
        {
          question: '我可以列出服务的区域吗？',
          answer: '可以。写明您服务的社区或城市，客户一眼就能知道您在他们附近工作。',
        },
      ],
    },
    {
      slug: 'contractors',
      name: '承包商和装修公司',
      noun: '承包公司',
      title: '温哥华承包商网站 | SitePilot',
      description: '为温哥华和北温哥华的承包商和装修公司制作单页网站：您承接的工程、案例，以及开启对话的简便方式。',
      headline: '为您的承包业务打造一个单页网站。',
      intro:
        '计划装修的人正在决定把自己的家交给谁。一个清晰展示您承接哪些工程、并且方便联系的页面，是开启这段对话的好起点。',
      checks: [
        { title: '您承接的工程', text: '厨房、浴室、露台、整体翻新：写明您做什么，以及哪些交给别人。' },
        { title: '完工案例', text: '挑几张真实项目的好照片，附上一句话说明做了什么。' },
        { title: '执照与保险', text: '如果您持有，请用您自己的话和您自己的资料如实写明。' },
        { title: '项目如何开始', text: '简短说明最初的几个步骤，让访客知道联系您之后会发生什么。' },
      ],
      includes: [
        '您承接的项目类型',
        '展示您自己完工作品的小型图库',
        '执照和保险信息（如果您希望展示）',
        '能问到关键问题的咨询表单',
        '在手机上好用的电话和邮件按钮',
        '您服务的区域',
      ],
      faq: [
        {
          question: '我需要很多项目照片吗？',
          answer: '不需要。几张好照片胜过许多质量一般的照片。如果您只有手机照片，我会告诉您哪些足够好、可以使用。',
        },
        {
          question: '表单可以询问项目情况吗？',
          answer: '可以。咨询表单可以询问工程类型和地点，让第一条消息就包含您需要知道的信息。',
        },
        {
          question: '我可以展示以往客户的名字吗？',
          answer: '只有在获得他们许可的情况下。如果有许可，我会加上。如果没有，作品自己会说话。',
        },
      ],
    },
    {
      slug: 'landscapers',
      name: '园艺和景观公司',
      noun: '景观公司',
      title: '温哥华园艺景观网站 | SitePilot',
      description: '为温哥华和北温哥华的园艺和景观公司制作单页网站：按季节列出的服务、您的作品，以及方便的报价申请。',
      headline: '为您的景观业务打造一个单页网站。',
      intro:
        '景观工作有季节性，也很直观。一个展示您的作品、按全年列出服务、并让人方便地预约上门的单页网站，非常适合这个行业。',
      checks: [
        { title: '您提供什么服务，在什么时候', text: '日常养护、种植、清理和季节性工作，让人看出哪些与自己有关。' },
        { title: '您的作品', text: '完工花园和庭院的照片，比任何描述都更有说服力。' },
        { title: '服务范围', text: '您覆盖的社区和城市，让人知道您能否到达。' },
        { title: '如何预约上门', text: '一个表单或按钮，说明下一步是报价或实地查看。' },
      ],
      includes: [
        '按客户的思路分组的服务',
        '展示您自己完工作品的图库',
        '您服务的区域',
        '预约上门的申请表单',
        '点击即可拨打的电话和邮件按钮',
        '日后可添加季节性说明的空间',
      ],
      faq: [
        {
          question: '页面可以随季节变化吗？',
          answer: '可以。我会让更换一行文字或一张照片很简单，较大的季节性改版可以另行报价。',
        },
        {
          question: '我只有手机照片，够用吗？',
          answer: '通常够用。在良好日光下拍的照片可以很好看。我会告诉您哪些值得使用、哪些需要重拍。',
        },
        {
          question: '我可以展示前后对比吗？',
          answer: '可以，如果您有前后两张照片。前后对比很容易放进单页网站。',
        },
      ],
    },
    {
      slug: 'barbers-and-salons',
      name: '理发店和美容美发沙龙',
      noun: '理发店或美发沙龙',
      title: '温哥华理发店和沙龙网站 | SitePilot',
      description: '为温哥华和北温哥华的理发店和美发沙龙制作单页网站：服务、营业时间、地点，以及清晰的预约方式。',
      headline: '为您的理发店或沙龙打造一个单页网站。',
      intro:
        '找理发店或沙龙的人想看到服务项目、找到店铺位置，并知道如何预约。把这些放在一个整洁的页面上、放在最前面，下一步就一目了然。',
      checks: [
        { title: '您提供的服务', text: '用简单的列表写出您做什么，附上您愿意提供的细节，例如每项服务需要多长时间。' },
        { title: '店在哪里、何时营业', text: '地址、地图链接和营业时间，用容易找到的文字写出。' },
        { title: '如何预约', text: '预约链接、电话号码或留言按钮，放在页面靠上的位置。' },
        { title: '店里的氛围', text: '几张店铺和作品的照片，让人知道会是什么样子。' },
      ],
      includes: [
        '清晰的服务列表',
        '营业时间、地址和地图链接',
        '预约按钮，可直接连到您现在使用的预约工具（如果有）',
        '店铺和作品的照片',
        '电话和留言按钮',
        '社交媒体账号链接（如果您希望）',
      ],
      faq: [
        {
          question: '我可以继续使用现在的预约应用吗？',
          answer: '可以。页面可以链接到您已经在用的预约工具，您不需要改变接受预约的方式。',
        },
        {
          question: '我可以链接我的 Instagram 吗？',
          answer: '可以。很多店铺在那里展示作品，页面可以链接过去，让访客看到更多。',
        },
        {
          question: '我需要有标志吗？',
          answer: '不需要。有标志当然更好，但清晰的店名和好照片就足以开始。',
        },
      ],
    },
    {
      slug: 'auto-detailing',
      name: '汽车美容和上门汽修',
      noun: '汽车美容公司',
      title: '温哥华汽车美容网站 | SitePilot',
      description: '为温哥华和北温哥华的汽车美容和汽车服务制作单页网站：服务套餐、服务范围，以及简便的预约申请。',
      headline: '为您的汽车美容业务打造一个单页网站。',
      intro:
        '客户想知道每项服务包含什么、您是上门服务还是需要他们到店，以及如何预约。一个把这些讲清楚的单页网站，能省去许多来回沟通。',
      checks: [
        { title: '每项服务包含什么', text: '用通俗的话描述每个套餐，让客户不必询问就能选择。' },
        { title: '服务在哪里进行', text: '您是在店里工作，还是上门服务，以及覆盖哪些区域。' },
        { title: '您的成果', text: '在良好光线下拍摄的完工车辆清晰照片。' },
        { title: '如何预约', text: '一个收集车型和所需服务的表单或按钮，让您的第一次回复就能很具体。' },
      ],
      includes: [
        '逐项列出的套餐或服务',
        '服务地点和覆盖区域',
        '展示您自己完工车辆的图库',
        '询问车型和服务的预约申请表单',
        '点击即可拨打的电话和留言按钮',
        '简短介绍您和您的工作方式',
      ],
      faq: [
        {
          question: '我可以只列出套餐而不写价格吗？',
          answer: '可以。展示什么由您决定。很多商家只描述每个套餐包含的内容，并邀请客户来询价。',
        },
        {
          question: '我是上门服务的，怎么体现？',
          answer: '页面可以明确写出您上门服务，并列出覆盖区域，让大家一开始就知道。',
        },
        {
          question: '表单可以询问车辆品牌和型号吗？',
          answer: '可以。预约表单可以询问车辆和服务，让您的第一次回复就有所需的信息。',
        },
      ],
    },
  ],

  guides: [
    {
      slug: 'what-a-local-business-website-needs',
      title: '本地商家网站需要什么 | SitePilot',
      description: '一份简明清单：本地服务型商家的单页网站应包含什么，以及哪些可以省略。',
      headline: '本地商家的单页网站 需要什么。',
      intro:
        '要显得专业、方便联系，并不需要大型网站。对大多数本地服务型商家来说，一个组织良好的页面就够了。以下是它应该包含的内容。',
      sections: [
        {
          heading: '从客户的问题出发',
          paragraphs: [
            '人们很少会读完整个网站。他们带着一两个问题而来：您做不做我需要的事、您是否在我附近服务、我该怎么联系。一个好的单页网站应该先回答这些。',
          ],
        },
        {
          heading: '必不可少的内容',
          items: [
            '用一句话说明您做什么，放在靠近顶部的位置',
            '您的服务范围：您服务的社区或城市',
            '您自己作品的真实照片',
            '在手机上无需滚动就能看到的报价或电话入口',
            '以真实文字呈现的联系方式，而不只是图片里的字',
            '一段简短的介绍，让人知道会和谁打交道',
          ],
        },
        {
          heading: '可以省略的内容',
          items: ['冗长的公司历史', '您不会持续更新的博客', '任何商家都能用的通用图库照片', '您提供过的每一项服务的清单'],
        },
        {
          heading: '让它在手机上好用',
          paragraphs: [
            '您的许多访客会拿着手机访问。按钮要足够大，方便点按；电话号码点击即可拨打；文字无需放大就能阅读。如果在手机上好用，通常在哪里都好用。',
          ],
        },
        {
          heading: '自己检查一下',
          paragraphs: [
            '请一位不了解您业务的人去找您的电话号码和服务区域。如果他几秒钟内就能找到，页面就在发挥作用。如果不能，这就是第一件要改的事。',
          ],
        },
      ],
    },
    {
      slug: 'how-to-prepare-for-a-website-quote',
      title: '如何为网站报价做准备 | SitePilot',
      description: '向网页设计师询价之前需要准备什么，以及一份清晰的报价应该包含哪些内容，让过程更快、也不会出现意外。',
      headline: '如何为网站报价做准备。',
      intro: '稍作准备，就能让报价更快、更准确，也方便您与其他报价比较。以下是需要准备的内容，以及一份好的报价应该说明什么。',
      sections: [
        {
          heading: '需要准备什么',
          items: [
            '您提供的服务，用您自己的话描述',
            '您服务的区域',
            '您作品的照片，即使只是手机拍的',
            '您希望展示的电话、邮箱和社交媒体账号',
            '您现有网站的地址（如果有）',
            '标志和品牌色（如果有，非必须）',
            '一两个您喜欢的网站，以及您喜欢它们的哪些方面',
          ],
        },
        {
          heading: '值得回答的问题',
          items: [
            '网站应该帮助您实现什么：来电、报价申请，还是预约？',
            '您最好的客户是谁，他们在联系您之前会问什么？',
            '有没有您不希望展示的内容？',
            '您是否已经拥有域名？',
          ],
        },
        {
          heading: '一份清晰的报价应该写明',
          items: [
            '包含什么，不包含什么',
            '总费用，以及付款时间',
            '时间安排，以及它取决于什么',
            '主机和域名的安排，以及各自归谁所有',
            '任何持续费用，写明白',
            '额外工作如何处理，单列一项',
          ],
        },
        {
          heading: '在您说“好”之前',
          paragraphs: [
            '在任何工作开始之前，您应该清楚范围、费用和下一步。如果报价在这些方面不清楚，请提问。一位好的设计师会乐意解释。',
          ],
        },
      ],
    },
  ],

  tradePage: {
    eyebrow: (name) => `为${name}制作网站`,
    crumb: (name) => `为${name}制作网站`,
    customersEyebrow: '客户关注什么',
    checksHeading: (noun) => `人们在联系${noun} 之前会查看什么。`,
    includesEyebrow: '您的页面包含什么',
    includesHeading: '一个专注的页面，为您的业务而建。',
    includesLede: '先出书面报价，让您在工作开始之前就清楚范围和费用。',
    recentEyebrow: '近期作品',
    recentHeading: '我设计并制作的网站。',
    recentLede: '都是真实项目，每一个都标明了它是什么。打开一个，看看它是怎样完成的。',
    faqHeading: (name) => `${name}常问的问题。`,
    faqLabel: '问题',
  },

  casePage: {
    whatIDid: '我做了什么',
    myPart: '我在其中的工作。',
    decisions: '值得一提的决定',
    worthKnowing: '需要说明：',
    more: '更多作品',
    screenshots: (name) => `${name} 截图`,
  },

  guidePage: { eyebrow: '指南', next: '下一篇指南：' },

  dialogs: {
    conceptDemo: '概念演示',
    fictional: (businessType) => `一家虚构的${businessType}商家。此演示中的按钮不会发送任何内容。`,
    previewSize: '预览尺寸',
    desktop: '电脑',
    phone: '手机',
    closeExample: '关闭示例',
    closePreview: '关闭预览',
    loading: '正在加载示例…',
    demoNotice: '这是概念演示，因此没有发送任何内容。在真实网站上，这会发给商家。',
    wantSite: '想为自己的业务做一个这样的网站吗？这个按钮会前往我真正的咨询表单。',
    requestForMyBusiness: '为我的业务索取报价',
  },
}

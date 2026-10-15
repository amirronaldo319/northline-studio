import type { Copy } from './types.ts'

/**
 * Traditional Chinese. GENERATED from zhHans.ts by an automatic Simplified-to-Traditional conversion (standard Traditional characters).
 * DRAFT: not yet reviewed by a native speaker. Edit zhHans.ts and regenerate rather than editing this file by hand,
 * unless a reviewer asks for a wording change that only applies to Traditional readers.
 */
export const zhHant: Copy = {
  locale: 'zh-hant',

  meta: {
    homeTitle: 'SitePilot | 溫哥華本地商家的專屬網站',
    homeDescription: '為溫哥華和北溫哥華的本地服務型商家制作專屬單頁網站。查看網站案例，並索取報價。',
    caseTitle: (name, isLive) => `${name}：${isLive ? '我製作的在線網站' : '概念項目'} | SitePilot`,
  },

  common: {
    skipToContent: '跳到內容',
    requestQuote: '索取報價',
    seeMyWork: '查看我的作品',
    openMenu: '打開菜單',
    closeMenu: '關閉菜單',
    mainNav: '主導航',
    mobileNav: '移動端導航',
    footerNav: '頁腳',
    languageNav: '語言',
    backToTop: '回到頂部',
    privacy: '隱私',
    home: '首頁',
    work: '作品',
    guides: '指南',
    breadcrumb: '頁面路徑',
    opensNewTab: (name) => `：${name}（在新標籤頁打開）`,
  },

  nav: { work: '作品', package: '服務內容', process: '流程', about: '關於', faq: '常見問題' },

  hero: {
    headline: '為溫哥華本地服務型商家 量身定製的網站。',
    markedWords: [],
    lede: '展示您的作品，說明您的服務，讓客戶輕鬆索取報價。',
    facts: ['先出書面報價，再開始工作', '由我親自設計和製作', '溫哥華和北溫哥華'],
    conceptCaption: (name, businessType) => `概念演示：${name}，為一家虛構的${businessType}商家所做的設計。`,
    viewExample: '查看示例',
  },

  work: {
    eyebrow: '精選作品',
    heading: '我做過什麼，以及我如何設計。',
    lede: '兩個在線網站、兩個概念項目，以及為虛構商家做的設計概念，每一個都標明了它是什麼。',
    statusLive: '在線網站',
    statusConcept: '概念項目',
    contribution: '我的工作：',
    visitLive: '訪問在線網站',
    openLivePreview: '打開在線預覽',
    readCaseStudy: '閱讀案例詳情',
    conceptDemo: '概念演示',
    viewExample: '查看示例',
    openLarger: (name) => `打開較大預覽：${name}`,
    openPhone: (name) => `打開手機預覽：${name}`,
  },

  projects: {
    'farsh-aquatics': {
      type: '私人游泳課程，溫哥華和北岸',
      caption: '我設計並製作的溫哥華游泳教學商家網站',
      summary: '一個為私人游泳教學和救生服務製作的單頁網站，讓家長一眼就能看到兩項服務，並立刻打電話、發短信或發郵件。',
      contribution: '品牌形象和單頁網站：標誌、名片和網站本身。',
      decisions: [
        '打電話、發短信和發郵件的按鈕放在頁眉和首屏，家長在頁面任何位置都能聯繫。',
        '兩項服務——教練和救生——各有獨立的板塊，訪客能很快找到自己需要的那一項。',
      ],
      alt: '“Farsh Aquatics”首頁：明亮的藍色頁面，包含標誌、商家名稱、簡短介紹，以及打電話和發郵件的按鈕。',
    },
    '604kars': {
      type: 'Turo 車輛託管，大溫哥華地區',
      caption: '我設計並製作的大溫哥華車輛託管網站',
      summary: '一個為大溫哥華地區車輛託管服務製作的落地頁，用來說明為車主處理哪些事務，並讓車主申請估算。',
      contribution: '網站設計與開發，包括估算表單和手機端導航。',
      decisions: [
        '一個交互式估算器讓車主查看每月金額，其假設條件直接寫在下方。',
        '服務被拆分為六項通俗易懂的工作，車主能清楚看到處理哪些事務。',
      ],
      alt: '“604 Kars”首頁：一個襯線字體標題，講述車停在車道上沒有任何收入，並有獲取估算的按鈕和交互式收益估算器。',
      note: '收益估算器展示的是示例數字。網站在其下方直接寫明了假設條件，這些數字並非實際結果。',
    },
    'ganjineh-ofogh': {
      type: '雙語住宅塔樓網站',
      caption: '一個住宅塔樓的雙語網站',
      summary: '一個住宅塔樓的波斯語和英語網站，帶有大樓及其四套公寓的交互式 3D 模型。',
      contribution: '整個網站的設計與開發，包括雙語頁面和交互式 3D 查看器。',
      decisions: [
        '默認語言為波斯語，每個頁面都有對應的英文版本，語言切換會保留您當前的位置。',
        '3D 查看器讓訪客在諮詢之前先瀏覽塔樓和每一套公寓。',
      ],
      alt: '“Ganjineh Ofogh”首頁：塔樓的英文和波斯文名稱，旁邊是一張建築的效果圖。',
    },
    mend: {
      type: '開發中的產品落地頁',
      caption: '一個開發中應用的落地頁',
      summary:
        'Mend 的落地頁。Mend 是一款仍在開發中的自助式工具，面向約 2 至 12 歲孩子的家長和照護者，頁面帶有示意預覽畫面和候補名單。',
      contribution: '落地頁的設計與開發，包括預覽畫面和候補名單表單。',
      decisions: [
        '頁面以一個安靜的時刻和一個行動開篇：加入候補名單。',
        '預覽畫面用三個步驟（暫停、梳理、重新連接）展示這個想法，並明確標註為示意，而非正式應用。',
      ],
      alt: '“Mend”首頁：深色頁面，標題為“You yelled.”，下方是一句關於事後安靜時刻的話，以及候補名單的郵箱輸入框。',
      note: 'Mend 尚未發佈。頁面上的預覽畫面是示意性的樣圖，頁面本身也是這樣說明的。',
    },
  },

  examples: {
    cleaning: {
      businessType: '家庭清潔',
      intent: '為幫助忙碌的家庭瞭解服務包含什麼並申請清潔報價而設計。',
      approach: '明亮友好，服務以簡短的列表呈現，報價表單始終觸手可及。',
      action: '索取報價',
    },
    landscaping: {
      businessType: '園藝景觀',
      intent: '為幫助屋主瞭解一年四季養護什麼並預約上門而設計。',
      approach: '平和質樸，服務簡明排列，全年按季節劃分。',
      action: '預約上門',
    },
  },

  package: {
    eyebrow: '您的網站套餐',
    heading: '一個專注的頁面，為您的業務而建。',
    lede: '它回答客戶在致電之前會問的問題：您做什麼、您的作品是什麼樣子，以及如何聯繫您。',
    groups: [
      { title: '設計', text: '入門方案使用範本，標準方案客製版面；均適配手機和電腦。' },
      { title: '內容', text: '您的服務、您自己的作品照片和聯繫方式，清晰有序地呈現。' },
      { title: '諮詢', text: '報價申請表和醒目的聯繫按鈕，讓客戶知道如何聯繫您。' },
      { title: '上線', text: '兩種方案均含頁面標題、描述和標題結構；標準方案另含分享圖片。' },
    ],
    quoteLead: '先給您書面報價。',
    quoteBody:
      '開始工作之前，報價會明確費用、工作範圍、時間安排、主機和域名的安排，以及任何持續費用。超出單頁的內容，例如額外的頁面或功能，將另行報價。',
    factors: [
      { title: '已準備好的內容', text: '您的服務、照片和聯繫方式。' },
      { title: '超出一頁的內容', text: '額外的頁面或功能，單獨列項報價。' },
      { title: '主機和域名', text: '您已經擁有什麼，以及希望由我安排什麼。' },
      { title: '時間', text: '您的資料何時準備好，以及您希望何時上線。' },
    ],
  },

  process: {
    eyebrow: '流程',
    heading: '我們如何合作。',
    steps: [
      { title: '介紹您的業務。', text: '告訴我您做什麼、服務哪些客戶，以及希望網站起到什麼作用。' },
      { title: '提供您的內容。', text: '服務項目、照片、聯繫方式，以及您已有的品牌素材。' },
      { title: '查看您的網站。', text: '在最終版本確認之前，先審閱設計和內容。' },
      { title: '確認並安排上線。', text: '確認最終網站，並安排發佈方式。' },
    ],
  },

  audience: {
    eyebrow: '我為誰服務',
    heading: '為本地服務型商家而做。',
    lede: '如果客戶通過搜索、打聽或手機上的一個鏈接找到您，一個清晰的頁面能讓下一步一目瞭然。請選擇最接近您業務的一項。',
    readPage: '閱讀該頁面',
    forName: (name) => `：${name}`,
    guidesLead: '正在計劃做網站？兩篇簡短指南：',
  },

  about: {
    eyebrow: '關於',
    heading: '您直接與我合作。',
    glance: [
      { label: '所在地', value: '溫哥華和北溫哥華，不列顛哥倫比亞省' },
      { label: '誰來製作', value: '我本人，直接對接，沒有中間環節。' },
      { label: '開始工作之前', value: '一份由您確認的書面報價' },
      { label: '溝通方式', value: '通過電子郵件，用簡明的語言' },
    ],
    paragraphs: [
      '我是 Amir。每一個網站都由我親自設計和製作，所以您發來消息時，對面就是實際做事的人。',
      '近期的作品包括：為溫哥華一傢俬人游泳教學商家制作的單頁網站；為一家車輛託管服務製作的、帶交互式估算器的落地頁；以及一個帶有住宅塔樓交互式 3D 模型的雙語概念網站。',
      '我專注於為溫哥華和北溫哥華的本地服務型商家制作實用的網站，範圍保持簡單、語言保持平實，讓您清楚知道會得到什麼，以及接下來會發生什麼。',
    ],
  },

  faq: {
    eyebrow: '常見問題',
    heading: '聯繫我之前。',
    moreLead: '還有其他問題？',
    askInForm: '在表單中提問',
    orEmail: '，或發送郵件至 ',
    moreEnd: '。',
    items: [
      {
        question: '我需要已經有網站嗎？',
        answer:
          '不需要。很多本地商家是從社交媒體頁面和口碑開始的。如果您已有的網站顯得過時，我可以把它重做成一個清晰的單頁。請在表單中填寫您現有網站的地址，我會先看一看。',
      },
      {
        question: '我需要提供什麼？',
        answer: '您的商家名稱、您提供的服務、您服務的區域、聯繫方式，以及您作品的照片。標誌和品牌色會有幫助，但不是必須的。',
      },
      {
        question: '之後可以增加頁面或功能嗎？',
        answer: '可以。告訴我您的想法，我會把它作為單獨一項放進您的報價，讓您在瞭解全部情況後再決定。',
      },
      {
        question: '主機和域名包含在內嗎？',
        answer: '不包含。主機、網域註冊和續費、信箱及付費工具按約定費用另計。可選維護 CA$29/月起，不含上述費用。網域歸您所有。',
      },
      {
        question: '需要多長時間？',
        answer: '主要取決於您的照片和資料多快準備好。我會隨報價給您一個時間安排，而不是一開始就猜。',
      },
    ],
  },

  siteCheck: {
    eyebrow: '已經有網站了？',
    heading: '先從免費的網站檢查開始。',
    text: '把您的網址發給我，我會回覆我首先會修改的地方。您不需要新網站也可以來問，沒有您的確認，不會開始任何工作。',
    button: '申請網站檢查',
    starterMessage: '請看一下我現有的網站，並告訴我您首先會修改什麼。',
  },

  contact: {
    eyebrow: '開始吧',
    heading: '索取報價。',
    lede: '告訴我您的業務和您的需求。我會回覆您，一起討論範圍和下一步。',
    nextTitle: '接下來會怎樣',
    nextSteps: [
      '您發來一條消息，寫多寫少都可以。',
      '我閱讀後通過電子郵件回覆，一起討論您的需求。',
      '如果合適，我會發送一份書面報價。在您確認之前，不會開始任何工作。',
    ],
    preferEmail: '更喜歡發郵件？',
    copyEmail: '複製郵箱地址',
    copied: '已複製',
    copiedNote: (email) => `${email} 已複製到剪貼板。`,
    copyFailed: '無法複製。請選中地址後手動複製。',
    privacyTitle: '您的信息如何使用',
    privacyForm: '您發送的內容會通過第三方表單服務發給我，僅用於回覆您關於網站的問題。',
    privacyMailto: '表單會打開您自己的郵件應用，本網站不會保存任何內容。您發送的內容僅用於回覆您關於網站的問題。',
    privacyDelete: '如需刪除您的信息，請給我發郵件。',
  },

  form: {
    name: '姓名',
    email: '電子郵箱',
    message: '請介紹一下您的業務',
    messageHint: '您做什麼，以及您希望網站幫您做什麼。',
    addDetails: '補充更多信息',
    optional: '（選填）',
    businessName: '商家名稱',
    businessType: '業務類型',
    chooseOne: '請選擇',
    phone: '電話',
    existingWebsite: '現有網站',
    websitePlaceholder: 'yourbusiness.ca',
    helpTitle: '您需要哪種幫助？',
    businessTypes: [
      { value: 'Cleaning', label: '清潔' },
      { value: 'Contracting or renovation', label: '承包或裝修' },
      { value: 'Landscaping', label: '園藝景觀' },
      { value: 'Auto detailing or automotive service', label: '汽車美容或汽車服務' },
      { value: 'Barber or salon', label: '理髮或美髮沙龍' },
      { value: 'Independent service provider', label: '獨立服務提供者' },
      { value: 'Other', label: '其他' },
    ],
    needs: [
      { value: 'A new website', label: '一個新網站' },
      { value: 'An update to my current website', label: '更新我現有的網站' },
      { value: 'Help deciding', label: '幫我拿主意' },
      { value: 'Something else', label: '其他' },
    ],
    errors: {
      nameRequired: '請填寫您的姓名。',
      emailRequired: '請填寫您的郵箱，以便我回復。',
      emailInvalid: '請輸入有效的郵箱地址，例如 name@example.com。',
      phoneInvalid: '請檢查電話號碼，或留空。',
      websiteInvalid: '請輸入類似 yourbusiness.ca 的網址，或留空。',
      messageRequired: '請簡單介紹一下您的業務和需求。',
      messageShort: '請再補充一些細節，以便我給出有用的回覆。',
    },
    checkFields: (count) => (count === 1 ? '請檢查標出的字段。' : `請檢查標出的 ${count} 個字段。`),
    sending: '正在發送…',
    send: '發送報價申請',
    openEmail: '打開郵件應用發送',
    sentDirect: '將直接發給我。我會通過電子郵件回覆。',
    mailtoNote: '這會打開您的郵件應用，並填好您的信息，等您發送。',
    successTitle: (firstName) => `謝謝，${firstName}。您的申請已發送。`,
    successBody: (email) => `我會閱讀後回覆 ${email}，一起討論您的需求和下一步。`,
    sendAnother: '再發送一份申請',
    errorTitle: '抱歉，您的申請未能發送。',
    errorBefore: '您填寫的信息還在。請重試，或發郵件至 ',
    errorAfter: '。',
    emailOpenedTitle: '您的郵件應用現在應該已打開，並填好了您的信息。',
    emailOpenedBefore: '請在其中點擊發送，才能聯繫到我。目前還沒有發送任何內容。如果沒有打開郵件窗口，請複製您的信息並發送至 ',
    emailOpenedAfter: '。',
    copyDetails: '複製我的信息',
    detailsCopied: '已複製',
    copyUnavailable: '無法複製，請給我發郵件',
  },

  footer: {
    tagline: () => '為溫哥華和北溫哥華的本地服務型商家制作專屬單頁網站。',
    websitesFor: '網站服務對象',
    guides: '指南',
    copyright: (year, name) => `© ${year} ${name}。此處展示的示例網站是為虛構商家所做的概念設計。`,
  },

  trades: [
    {
      slug: 'cleaning-companies',
      name: '清潔公司',
      noun: '清潔公司',
      title: '溫哥華清潔公司網站 | SitePilot',
      description: '為溫哥華和北溫哥華的清潔公司製作清晰的單頁網站：服務內容、服務範圍，以及方便的報價申請。',
      headline: '為您的清潔公司打造一個單頁網站。',
      intro:
        '選擇清潔服務的人想知道：每次上門包含什麼、您是否服務他們所在的區域，以及如何獲得報價。一個清晰的頁面就能回答這三個問題。',
      checks: [
        { title: '每次服務包含什麼', text: '日常清潔、深度清潔和搬家清潔，在不同的人眼裡含義不同。請寫清楚每一種包含哪些內容。' },
        { title: '服務範圍', text: '寫明您服務的社區或城市，讓人不必再來詢問。' },
        { title: '如何獲得報價', text: '一個簡短的報價表單，以及醒目的電話或郵件按鈕，頁面頂部和底部都要有。' },
        { title: '誰會進入家中', text: '用幾句真誠的話介紹您和您的團隊，讓人放心預約。' },
      ],
      includes: [
        '以簡短清晰的列表呈現您的服務',
        '您的服務範圍',
        '您自己拍攝的完工照片',
        '在手機上好用的報價表單',
        '點擊即可撥打的電話和郵件按鈕',
        '適合搜索的頁面標題與描述，以及分享鏈接時整潔的預覽',
      ],
      faq: [
        {
          question: '我需要施工前後對比照片嗎？',
          answer: '有幫助，但不是必須的。在良好光線下拍攝的幾張清晰完工照片就足以開始，我會告訴您哪些值得補充。',
        },
        {
          question: '客戶不打電話也能申請報價嗎？',
          answer: '可以。頁面有一個簡短的報價表單，同時也顯示您的電話和郵箱，讓大家選擇最方便的方式。',
        },
        {
          question: '我可以列出服務的區域嗎？',
          answer: '可以。寫明您服務的社區或城市，客戶一眼就能知道您在他們附近工作。',
        },
      ],
    },
    {
      slug: 'contractors',
      name: '承包商和裝修公司',
      noun: '承包公司',
      title: '溫哥華承包商網站 | SitePilot',
      description: '為溫哥華和北溫哥華的承包商和裝修公司製作單頁網站：您承接的工程、案例，以及開啟對話的簡便方式。',
      headline: '為您的承包業務打造一個單頁網站。',
      intro:
        '計劃裝修的人正在決定把自己的家交給誰。一個清晰展示您承接哪些工程、並且方便聯繫的頁面，是開啟這段對話的好起點。',
      checks: [
        { title: '您承接的工程', text: '廚房、浴室、露臺、整體翻新：寫明您做什麼，以及哪些交給別人。' },
        { title: '完工案例', text: '挑幾張真實項目的好照片，附上一句話說明做了什麼。' },
        { title: '執照與保險', text: '如果您持有，請用您自己的話和您自己的資料如實寫明。' },
        { title: '項目如何開始', text: '簡短說明最初的幾個步驟，讓訪客知道聯繫您之後會發生什麼。' },
      ],
      includes: [
        '您承接的項目類型',
        '展示您自己完工作品的小型圖庫',
        '執照和保險信息（如果您希望展示）',
        '能問到關鍵問題的諮詢表單',
        '在手機上好用的電話和郵件按鈕',
        '您服務的區域',
      ],
      faq: [
        {
          question: '我需要很多項目照片嗎？',
          answer: '不需要。幾張好照片勝過許多質量一般的照片。如果您只有手機照片，我會告訴您哪些足夠好、可以使用。',
        },
        {
          question: '表單可以詢問項目情況嗎？',
          answer: '可以。諮詢表單可以詢問工程類型和地點，讓第一條消息就包含您需要知道的信息。',
        },
        {
          question: '我可以展示以往客戶的名字嗎？',
          answer: '只有在獲得他們許可的情況下。如果有許可，我會加上。如果沒有，作品自己會說話。',
        },
      ],
    },
    {
      slug: 'landscapers',
      name: '園藝和景觀公司',
      noun: '景觀公司',
      title: '溫哥華園藝景觀網站 | SitePilot',
      description: '為溫哥華和北溫哥華的園藝和景觀公司製作單頁網站：按季節列出的服務、您的作品，以及方便的報價申請。',
      headline: '為您的景觀業務打造一個單頁網站。',
      intro:
        '景觀工作有季節性，也很直觀。一個展示您的作品、按全年列出服務、並讓人方便地預約上門的單頁網站，非常適合這個行業。',
      checks: [
        { title: '您提供什麼服務，在什麼時候', text: '日常養護、種植、清理和季節性工作，讓人看出哪些與自己有關。' },
        { title: '您的作品', text: '完工花園和庭院的照片，比任何描述都更有說服力。' },
        { title: '服務範圍', text: '您覆蓋的社區和城市，讓人知道您能否到達。' },
        { title: '如何預約上門', text: '一個表單或按鈕，說明下一步是報價或實地查看。' },
      ],
      includes: [
        '按客戶的思路分組的服務',
        '展示您自己完工作品的圖庫',
        '您服務的區域',
        '預約上門的申請表單',
        '點擊即可撥打的電話和郵件按鈕',
        '日後可添加季節性說明的空間',
      ],
      faq: [
        {
          question: '頁面可以隨季節變化嗎？',
          answer: '可以。我會讓更換一行文字或一張照片很簡單，較大的季節性改版可以另行報價。',
        },
        {
          question: '我只有手機照片，夠用嗎？',
          answer: '通常夠用。在良好日光下拍的照片可以很好看。我會告訴您哪些值得使用、哪些需要重拍。',
        },
        {
          question: '我可以展示前後對比嗎？',
          answer: '可以，如果您有前後兩張照片。前後對比很容易放進單頁網站。',
        },
      ],
    },
    {
      slug: 'barbers-and-salons',
      name: '理髮店和美容美髮沙龍',
      noun: '理髮店或美髮沙龍',
      title: '溫哥華理髮店和沙龍網站 | SitePilot',
      description: '為溫哥華和北溫哥華的理髮店和美髮沙龍製作單頁網站：服務、營業時間、地點，以及清晰的預約方式。',
      headline: '為您的理髮店或沙龍打造一個單頁網站。',
      intro:
        '找理髮店或沙龍的人想看到服務項目、找到店鋪位置，並知道如何預約。把這些放在一個整潔的頁面上、放在最前面，下一步就一目瞭然。',
      checks: [
        { title: '您提供的服務', text: '用簡單的列表寫出您做什麼，附上您願意提供的細節，例如每項服務需要多長時間。' },
        { title: '店在哪裡、何時營業', text: '地址、地圖鏈接和營業時間，用容易找到的文字寫出。' },
        { title: '如何預約', text: '預約鏈接、電話號碼或留言按鈕，放在頁面靠上的位置。' },
        { title: '店裡的氛圍', text: '幾張店鋪和作品的照片，讓人知道會是什麼樣子。' },
      ],
      includes: [
        '清晰的服務列表',
        '營業時間、地址和地圖鏈接',
        '預約按鈕，可直接連到您現在使用的預約工具（如果有）',
        '店鋪和作品的照片',
        '電話和留言按鈕',
        '社交媒體賬號鏈接（如果您希望）',
      ],
      faq: [
        {
          question: '我可以繼續使用現在的預約應用嗎？',
          answer: '可以。頁面可以鏈接到您已經在用的預約工具，您不需要改變接受預約的方式。',
        },
        {
          question: '我可以鏈接我的 Instagram 嗎？',
          answer: '可以。很多店鋪在那裡展示作品，頁面可以鏈接過去，讓訪客看到更多。',
        },
        {
          question: '我需要有標誌嗎？',
          answer: '不需要。有標誌當然更好，但清晰的店名和好照片就足以開始。',
        },
      ],
    },
    {
      slug: 'auto-detailing',
      name: '汽車美容和上門汽修',
      noun: '汽車美容公司',
      title: '溫哥華汽車美容網站 | SitePilot',
      description: '為溫哥華和北溫哥華的汽車美容和汽車服務製作單頁網站：服務套餐、服務範圍，以及簡便的預約申請。',
      headline: '為您的汽車美容業務打造一個單頁網站。',
      intro:
        '客戶想知道每項服務包含什麼、您是上門服務還是需要他們到店，以及如何預約。一個把這些講清楚的單頁網站，能省去許多來回溝通。',
      checks: [
        { title: '每項服務包含什麼', text: '用通俗的話描述每個套餐，讓客戶不必詢問就能選擇。' },
        { title: '服務在哪裡進行', text: '您是在店裡工作，還是上門服務，以及覆蓋哪些區域。' },
        { title: '您的成果', text: '在良好光線下拍攝的完工車輛清晰照片。' },
        { title: '如何預約', text: '一個收集車型和所需服務的表單或按鈕，讓您的第一次回覆就能很具體。' },
      ],
      includes: [
        '逐項列出的套餐或服務',
        '服務地點和覆蓋區域',
        '展示您自己完工車輛的圖庫',
        '詢問車型和服務的預約申請表單',
        '點擊即可撥打的電話和留言按鈕',
        '簡短介紹您和您的工作方式',
      ],
      faq: [
        {
          question: '我可以只列出套餐而不寫價格嗎？',
          answer: '可以。展示什麼由您決定。很多商家只描述每個套餐包含的內容，並邀請客戶來詢價。',
        },
        {
          question: '我是上門服務的，怎麼體現？',
          answer: '頁面可以明確寫出您上門服務，並列出覆蓋區域，讓大家一開始就知道。',
        },
        {
          question: '表單可以詢問車輛品牌和型號嗎？',
          answer: '可以。預約表單可以詢問車輛和服務，讓您的第一次回覆就有所需的信息。',
        },
      ],
    },
  ],

  guides: [
    {
      slug: 'what-a-local-business-website-needs',
      title: '本地商家網站需要什麼 | SitePilot',
      description: '一份簡明清單：本地服務型商家的單頁網站應包含什麼，以及哪些可以省略。',
      headline: '本地商家的單頁網站 需要什麼。',
      intro:
        '要顯得專業、方便聯繫，並不需要大型網站。對大多數本地服務型商家來說，一個組織良好的頁面就夠了。以下是它應該包含的內容。',
      sections: [
        {
          heading: '從客戶的問題出發',
          paragraphs: [
            '人們很少會讀完整個網站。他們帶著一兩個問題而來：您做不做我需要的事、您是否在我附近服務、我該怎麼聯繫。一個好的單頁網站應該先回答這些。',
          ],
        },
        {
          heading: '必不可少的內容',
          items: [
            '用一句話說明您做什麼，放在靠近頂部的位置',
            '您的服務範圍：您服務的社區或城市',
            '您自己作品的真實照片',
            '在手機上無需滾動就能看到的報價或電話入口',
            '以真實文字呈現的聯繫方式，而不只是圖片裡的字',
            '一段簡短的介紹，讓人知道會和誰打交道',
          ],
        },
        {
          heading: '可以省略的內容',
          items: ['冗長的公司歷史', '您不會持續更新的博客', '任何商家都能用的通用圖庫照片', '您提供過的每一項服務的清單'],
        },
        {
          heading: '讓它在手機上好用',
          paragraphs: [
            '您的許多訪客會拿著手機訪問。按鈕要足夠大，方便點按；電話號碼點擊即可撥打；文字無需放大就能閱讀。如果在手機上好用，通常在哪裡都好用。',
          ],
        },
        {
          heading: '自己檢查一下',
          paragraphs: [
            '請一位不瞭解您業務的人去找您的電話號碼和服務區域。如果他幾秒鐘內就能找到，頁面就在發揮作用。如果不能，這就是第一件要改的事。',
          ],
        },
      ],
    },
    {
      slug: 'how-to-prepare-for-a-website-quote',
      title: '如何為網站報價做準備 | SitePilot',
      description: '向網頁設計師詢價之前需要準備什麼，以及一份清晰的報價應該包含哪些內容，讓過程更快、也不會出現意外。',
      headline: '如何為網站報價做準備。',
      intro: '稍作準備，就能讓報價更快、更準確，也方便您與其他報價比較。以下是需要準備的內容，以及一份好的報價應該說明什麼。',
      sections: [
        {
          heading: '需要準備什麼',
          items: [
            '您提供的服務，用您自己的話描述',
            '您服務的區域',
            '您作品的照片，即使只是手機拍的',
            '您希望展示的電話、郵箱和社交媒體賬號',
            '您現有網站的地址（如果有）',
            '標誌和品牌色（如果有，非必須）',
            '一兩個您喜歡的網站，以及您喜歡它們的哪些方面',
          ],
        },
        {
          heading: '值得回答的問題',
          items: [
            '網站應該幫助您實現什麼：來電、報價申請，還是預約？',
            '您最好的客戶是誰，他們在聯繫您之前會問什麼？',
            '有沒有您不希望展示的內容？',
            '您是否已經擁有域名？',
          ],
        },
        {
          heading: '一份清晰的報價應該寫明',
          items: [
            '包含什麼，不包含什麼',
            '總費用，以及付款時間',
            '時間安排，以及它取決於什麼',
            '主機和域名的安排，以及各自歸誰所有',
            '任何持續費用，寫明白',
            '額外工作如何處理，單列一項',
          ],
        },
        {
          heading: '在您說“好”之前',
          paragraphs: [
            '在任何工作開始之前，您應該清楚範圍、費用和下一步。如果報價在這些方面不清楚，請提問。一位好的設計師會樂意解釋。',
          ],
        },
      ],
    },
  ],

  tradePage: {
    eyebrow: (name) => `為${name}製作網站`,
    crumb: (name) => `為${name}製作網站`,
    customersEyebrow: '客戶關注什麼',
    checksHeading: (noun) => `人們在聯繫${noun} 之前會查看什麼。`,
    includesEyebrow: '您的頁面包含什麼',
    includesHeading: '一個專注的頁面，為您的業務而建。',
    includesLede: '先出書面報價，讓您在工作開始之前就清楚範圍和費用。',
    recentEyebrow: '近期作品',
    recentHeading: '我設計並製作的網站。',
    recentLede: '都是真實項目，每一個都標明了它是什麼。打開一個，看看它是怎樣完成的。',
    faqHeading: (name) => `${name}常問的問題。`,
    faqLabel: '問題',
  },

  casePage: {
    whatIDid: '我做了什麼',
    myPart: '我在其中的工作。',
    decisions: '值得一提的決定',
    worthKnowing: '需要說明：',
    more: '更多作品',
    screenshots: (name) => `${name} 截圖`,
  },

  guidePage: { eyebrow: '指南', next: '下一篇指南：' },

  dialogs: {
    conceptDemo: '概念演示',
    fictional: (businessType) => `一家虛構的${businessType}商家。此演示中的按鈕不會發送任何內容。`,
    previewSize: '預覽尺寸',
    desktop: '電腦',
    phone: '手機',
    closeExample: '關閉示例',
    closePreview: '關閉預覽',
    loading: '正在加載示例…',
    demoNotice: '這是概念演示，因此沒有發送任何內容。在真實網站上，這會發給商家。',
    wantSite: '想為自己的業務做一個這樣的網站嗎？這個按鈕會前往我真正的諮詢表單。',
    requestForMyBusiness: '為我的業務索取報價',
  },
}

import { site } from '../config/site.ts'

/**
 * Translated pages. Each is a short version of the home page: what you get, how it works, how a quote works,
 * and how to get in touch by email.
 *
 * ALL OF THIS TEXT IS A DRAFT that has not been reviewed by a native speaker. A page is built only when its
 * switch in `site.features.languages` is on, so none of it is public until someone fluent has read it.
 */
export type LanguageCode = 'fa' | 'zh-hans' | 'zh-hant'

export interface LanguageStep {
  title: string
  text: string
}

export interface LanguageContent {
  code: LanguageCode
  /** Path below the site root, with a trailing slash. */
  path: string
  /** Value for the `lang` attribute. */
  htmlLang: string
  dir: 'ltr' | 'rtl'
  /** Name of the language written in that language, for the switcher button. */
  label: string
  /** Short form of the label, for tight spaces. */
  shortLabel: string
  /** CSS font-family list that covers the script without downloading a font. */
  fontStack: string
  title: string
  description: string
  eyebrow: string
  headline: string
  intro: string
  quoteButton: string
  quoteNote: string
  mailSubject: string
  packageTitle: string
  groups: readonly [LanguageStep, LanguageStep, LanguageStep, LanguageStep]
  processTitle: string
  steps: readonly [LanguageStep, LanguageStep, LanguageStep, LanguageStep]
  quoteTitle: string
  quoteText: string
  workLink: string
  contactTitle: string
}

export const LANGUAGES: Record<LanguageCode, LanguageContent> = {
  fa: {
    code: 'fa',
    path: 'fa/',
    htmlLang: 'fa',
    dir: 'rtl',
    label: 'فارسی',
    shortLabel: 'فارسی',
    fontStack: "Tahoma, 'Segoe UI', system-ui, sans-serif",
    title: 'نورثلاین استودیو | وب‌سایت برای کسب‌وکارهای محلی ونکوور',
    description:
      'وب‌سایت‌های یک‌صفحه‌ای اختصاصی برای کسب‌وکارهای خدماتی در ونکوور و نورث ونکوور. نمونه‌کارها را ببینید و درخواست قیمت بدهید.',
    eyebrow: 'به زبان فارسی',
    headline: 'وب‌سایت اختصاصی برای کسب‌وکارهای محلی ونکوور.',
    intro:
      'نمونه‌کارهایتان را نشان دهید، خدماتتان را روشن توضیح دهید و درخواست قیمت را برای مشتری آسان کنید. من، امیر، هر وب‌سایت را خودم طراحی می‌کنم و می‌سازم.',
    quoteButton: 'درخواست قیمت',
    quoteNote: 'پاسخ را با ایمیل دریافت می‌کنید.',
    mailSubject: 'درخواست قیمت وب‌سایت',
    packageTitle: 'یک صفحه‌ی متمرکز، ساخته‌شده برای کسب‌وکار شما.',
    groups: [
      {
        title: 'طراحی',
        text: 'یک صفحه‌ی اختصاصی که برای کسب‌وکار شما طراحی می‌شود و روی موبایل و کامپیوتر خوب نمایش داده می‌شود.',
      },
      { title: 'محتوا', text: 'خدمات، عکس‌های کار خودتان و اطلاعات تماس شما، به‌صورت روشن و مرتب.' },
      {
        title: 'درخواست‌ها',
        text: 'فرم درخواست قیمت و دکمه‌های تماس واضح، تا مشتری بداند چگونه با شما در ارتباط باشد.',
      },
      {
        title: 'راه‌اندازی',
        text: 'عنوان و توضیح صفحه برای موتورهای جستجو، و نمای مرتب لینک هنگام اشتراک‌گذاری.',
      },
    ],
    processTitle: 'روند کار.',
    steps: [
      { title: 'درباره‌ی کسب‌وکارتان بگویید.', text: 'بگویید چه کار می‌کنید، برای چه کسانی، و وب‌سایت قرار است چه کمکی بکند.' },
      { title: 'محتوایتان را بفرستید.', text: 'خدمات، عکس‌ها، اطلاعات تماس و هر چیزی از برند خودتان که دارید.' },
      { title: 'وب‌سایت را بررسی کنید.', text: 'طراحی و محتوا را ببینید، پیش از آنکه نسخه‌ی نهایی تأیید شود.' },
      { title: 'تأیید کنید و راه‌اندازی را هماهنگ کنید.', text: 'نسخه‌ی نهایی را تأیید کنید و نحوه‌ی انتشار را هماهنگ کنید.' },
    ],
    quoteTitle: 'ابتدا پیشنهاد قیمت مکتوب.',
    quoteText:
      'پیش از شروع کار، یک پیشنهاد قیمت مکتوب دریافت می‌کنید که هزینه، دامنه‌ی کار، زمان‌بندی و ترتیبات هاست و دامنه را روشن می‌کند. تا زمانی که آن را تأیید نکنید، کاری آغاز نمی‌شود. هر چه خارج از یک صفحه باشد، جداگانه قیمت‌گذاری می‌شود.',
    workLink: 'نمونه‌کارها (به انگلیسی)',
    contactTitle: 'برای شروع ایمیل بزنید.',
  },

  'zh-hans': {
    code: 'zh-hans',
    path: 'zh/',
    htmlLang: 'zh-Hans',
    dir: 'ltr',
    label: '简体中文',
    shortLabel: '简体',
    fontStack: "'PingFang SC', 'Microsoft YaHei', 'Noto Sans SC', 'Noto Sans CJK SC', system-ui, sans-serif",
    title: 'Northline Studio | 温哥华本地商家的专属网站',
    description: '为温哥华和北温哥华的本地服务型商家制作专属单页网站。查看案例，并索取报价。',
    eyebrow: '简体中文',
    headline: '为温哥华本地商家量身定制的网站。',
    intro:
      '展示您的作品，清楚介绍您的服务，让客户轻松索取报价。我是 Amir，每一个网站都由我亲自设计和制作。',
    quoteButton: '索取报价',
    quoteNote: '我会通过电子邮件回复您。',
    mailSubject: '网站报价申请',
    packageTitle: '一个专注的页面，为您的业务而建。',
    groups: [
      { title: '设计', text: '为您的业务量身设计的单页网站，在手机和电脑上都显示良好。' },
      { title: '内容', text: '您的服务、您自己的作品照片和联系方式，清晰有序地呈现。' },
      { title: '咨询', text: '报价申请表和醒目的联系按钮，让客户知道如何联系您。' },
      { title: '上线', text: '为搜索引擎准备的页面标题与描述，以及分享链接时的整洁预览。' },
    ],
    processTitle: '合作流程。',
    steps: [
      { title: '介绍您的业务。', text: '告诉我您做什么、服务哪些客户，以及希望网站起到什么作用。' },
      { title: '提供您的内容。', text: '服务项目、照片、联系方式，以及您已有的品牌素材。' },
      { title: '查看您的网站。', text: '在最终版本确认之前，先审阅设计和内容。' },
      { title: '确认并安排上线。', text: '确认最终网站，并安排发布方式。' },
    ],
    quoteTitle: '先给您书面报价。',
    quoteText:
      '开始工作之前，您会先收到一份书面报价，列明费用、工作范围、时间安排，以及主机和域名的安排。在您确认之前，不会开始任何工作。超出单页的内容将另行报价。',
    workLink: '查看案例（英文）',
    contactTitle: '发送电子邮件开始。',
  },

  'zh-hant': {
    code: 'zh-hant',
    path: 'zh-hant/',
    htmlLang: 'zh-Hant',
    dir: 'ltr',
    label: '繁體中文',
    shortLabel: '繁體',
    fontStack: "'PingFang TC', 'Microsoft JhengHei', 'Noto Sans TC', 'Noto Sans CJK TC', system-ui, sans-serif",
    title: 'Northline Studio | 溫哥華本地商家的專屬網站',
    description: '為溫哥華和北溫哥華的本地服務型商家製作專屬單頁網站。查看案例，並索取報價。',
    eyebrow: '繁體中文',
    headline: '為溫哥華本地商家量身訂製的網站。',
    intro:
      '展示您的作品，清楚介紹您的服務，讓客戶輕鬆索取報價。我是 Amir，每一個網站都由我親自設計和製作。',
    quoteButton: '索取報價',
    quoteNote: '我會透過電子郵件回覆您。',
    mailSubject: '網站報價申請',
    packageTitle: '一個專注的頁面，為您的業務而建。',
    groups: [
      { title: '設計', text: '為您的業務量身設計的單頁網站，在手機和電腦上都顯示良好。' },
      { title: '內容', text: '您的服務、您自己的作品照片和聯絡方式，清晰有序地呈現。' },
      { title: '諮詢', text: '報價申請表和醒目的聯絡按鈕，讓客戶知道如何聯絡您。' },
      { title: '上線', text: '為搜尋引擎準備的頁面標題與描述，以及分享連結時的整潔預覽。' },
    ],
    processTitle: '合作流程。',
    steps: [
      { title: '介紹您的業務。', text: '告訴我您做什麼、服務哪些客戶，以及希望網站發揮什麼作用。' },
      { title: '提供您的內容。', text: '服務項目、照片、聯絡方式，以及您已有的品牌素材。' },
      { title: '查看您的網站。', text: '在最終版本確認之前，先審閱設計和內容。' },
      { title: '確認並安排上線。', text: '確認最終網站，並安排發佈方式。' },
    ],
    quoteTitle: '先給您書面報價。',
    quoteText:
      '開始工作之前，您會先收到一份書面報價，列明費用、工作範圍、時間安排，以及主機和網域的安排。在您確認之前，不會開始任何工作。超出單頁的內容將另行報價。',
    workLink: '查看案例（英文）',
    contactTitle: '傳送電子郵件開始。',
  },
}

export const LANGUAGE_CODES = Object.keys(LANGUAGES) as LanguageCode[]

/** Languages switched on in the site config, in display order. */
export function enabledLanguages(): LanguageContent[] {
  return LANGUAGE_CODES.filter((code) => site.features.languages[code]).map((code) => LANGUAGES[code])
}

export function findLanguage(code: string): LanguageContent | undefined {
  return LANGUAGE_CODES.includes(code as LanguageCode) ? LANGUAGES[code as LanguageCode] : undefined
}

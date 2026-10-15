import type { Locale } from '@/i18n/types'

type OfferCopy = {
  intro: string; compare: string; heading: string; once: string; choose: string; note: string
  plans: { name: string; price: string; summary: string; items: string[] }[]
  careTitle: string; care: string; exclusions: string
}

export const offers: Record<Locale, OfferCopy> = {
  en: {
    intro: 'Professional one-page websites from CA$299. Start small, with a clear scope and no required care subscription.',
    compare: 'Compare packages', heading: 'A small start. Room to grow.', once: 'one-time', choose: 'Ask about',
    note: 'All prices in Canadian dollars, before applicable taxes. You supply final text, photos and branding. One revision round means one consolidated list of edits within the agreed scope. Extra pages, copywriting, translations, booking systems, payments and custom features are quoted separately. Hosting, domain registration, email and paid tools are billed separately at agreed costs; you own your domain. A written quote confirms the scope and schedule before work starts.',
    plans: [
      { name: 'Starter', price: 'CA$299', summary: 'A simple online home for a new or small business.', items: ['One template-based page, up to 4 sections, in one language', 'Your text and up to 5 supplied photos; brand colours applied', 'Mobile layout, call/email buttons and a basic inquiry form', 'Page title and description; one revision round'] },
      { name: 'Standard', price: 'CA$599', summary: 'More space and design attention for your services.', items: ['One tailored page, up to 7 sections, in one language', 'Your text and up to 12 supplied photos; layout tailored to your brand', 'Mobile layout, service/gallery sections and an inquiry form', 'Page title, description and sharing image; two revision rounds'] },
    ],
    careTitle: 'Optional website care from CA$29/month',
    care: 'For these static one-page sites: one edit request per month, up to 30 minutes total, for existing text or photo swaps, plus a monthly link/form check. Email support during business days; initial reply within 2 business days. Cancel before the next monthly renewal; unused time does not roll over.',
    exclusions: 'No redesigns, new sections, new features, emergency/on-call support or uptime commitments. Extra work needs a separate approved quote. Hosting, domain renewals, email, paid form services and other third-party charges are separate. You can choose the website without monthly care.',
  },
  fa: {
    intro: 'وب‌سایت حرفه‌ای یک‌صفحه‌ای از CA$299. شروعی کوچک با محدوده‌ی روشن و بدون الزام به اشتراک نگهداری.',
    compare: 'مقایسه‌ی بسته‌ها', heading: 'شروعی کوچک، با امکان رشد.', once: 'یک‌بار پرداخت', choose: 'درخواست اطلاعات',
    note: 'همه‌ی قیمت‌ها به دلار کانادا و پیش از مالیات‌های قابل اعمال است. متن نهایی، عکس‌ها و هویت برند را شما می‌دهید. هر نوبت اصلاح یعنی یک فهرست یک‌جای تغییرات در محدوده‌ی توافق‌شده. صفحه‌ی اضافه، تولید متن، ترجمه، سیستم رزرو، پرداخت و قابلیت‌های اختصاصی جداگانه قیمت‌گذاری می‌شوند. هاست، ثبت دامنه، ایمیل و ابزارهای پولی با هزینه‌ی توافق‌شده جداگانه حساب می‌شوند؛ مالک دامنه خودتان هستید. پیشنهاد مکتوب، محدوده و زمان‌بندی را پیش از شروع مشخص می‌کند.',
    plans: [
      { name: 'شروع', price: 'CA$299', summary: 'حضور آنلاین ساده برای کسب‌وکار کوچک یا تازه.', items: ['یک صفحه با قالب آماده، حداکثر ۴ بخش و یک زبان', 'متن شما و حداکثر ۵ عکس ارسالی؛ رنگ‌های برند شما', 'چیدمان موبایل، دکمه‌ی تماس و ایمیل و فرم ساده‌ی درخواست', 'عنوان و توضیح صفحه؛ یک نوبت اصلاح'] },
      { name: 'استاندارد', price: 'CA$599', summary: 'فضای بیشتر و طراحی متناسب‌تر با خدمات شما.', items: ['یک صفحه با چیدمان اختصاصی، حداکثر ۷ بخش و یک زبان', 'متن شما و حداکثر ۱۲ عکس ارسالی؛ چیدمان متناسب با برند', 'چیدمان موبایل، بخش خدمات و گالری و فرم درخواست', 'عنوان، توضیح و تصویر اشتراک‌گذاری؛ دو نوبت اصلاح'] },
    ],
    careTitle: 'نگهداری اختیاری وب‌سایت از CA$29 در ماه',
    care: 'برای همین سایت‌های استاتیک یک‌صفحه‌ای: ماهانه یک درخواست ویرایش، در مجموع حداکثر ۳۰ دقیقه، برای تعویض متن یا عکس موجود، به‌علاوه بررسی ماهانه‌ی لینک‌ها و فرم. پشتیبانی ایمیلی در روزهای کاری؛ پاسخ اولیه ظرف ۲ روز کاری. لغو پیش از تمدید ماه بعد ممکن است؛ زمان استفاده‌نشده منتقل نمی‌شود.',
    exclusions: 'بازطراحی، بخش یا قابلیت تازه، پشتیبانی اضطراری و تضمین دسترس‌پذیری شامل نمی‌شود. کار اضافه نیاز به قیمت جداگانه و تأیید شما دارد. هاست، تمدید دامنه، ایمیل، سرویس فرم پولی و سایر هزینه‌های خدمات بیرونی جداست. خرید سایت بدون نگهداری ماهانه هم ممکن است.',
  },
  'zh-hans': {
    intro: '专业单页网站 CA$299 起。范围清楚，无需订阅维护服务。', compare: '比较套餐', heading: '小预算起步，留有成长空间。', once: '一次性', choose: '咨询',
    note: '所有价格均为加元，未含适用税费。您提供最终文案、照片和品牌素材。每轮修改指在约定范围内提交一份汇总修改清单。额外页面、文案、翻译、预约系统、支付和定制功能另行报价。主机、域名、邮箱和付费工具按约定费用另计；域名归您所有。开工前以书面报价确认范围和时间。',
    plans: [
      { name: '入门', price: 'CA$299', summary: '适合小型或新成立企业的简单网站。', items: ['基于模板的单页网站，最多 4 个区块，单一语言', '您提供文案和最多 5 张照片；使用品牌配色', '手机布局、电话和邮箱按钮、基本咨询表单', '页面标题和描述；1 轮修改'] },
      { name: '标准', price: 'CA$599', summary: '更多空间展示服务，设计更贴合品牌。', items: ['定制布局的单页网站，最多 7 个区块，单一语言', '您提供文案和最多 12 张照片；布局贴合品牌', '手机布局、服务和图库区块、咨询表单', '标题、描述和分享图片；2 轮修改'] },
    ],
    careTitle: '可选网站维护 CA$29/月起', care: '适用于上述静态单页网站：每月 1 次修改请求，总计最多 30 分钟，仅限现有文字或照片替换，另含每月链接和表单检查。工作日邮件支持，2 个工作日内首次回复。可在下次续费前取消；未使用时间不累积。',
    exclusions: '不含重新设计、新区块、新功能、紧急或随叫随到支持、可用率保证。额外工作需另行报价并获批准。主机、域名续费、邮箱、付费表单和其他第三方费用另计。可只购买网站，不订阅维护。',
  },
  'zh-hant': {
    intro: '專業單頁網站 CA$299 起。範圍清楚，無需訂閱維護服務。', compare: '比較方案', heading: '小預算起步，留有成長空間。', once: '一次性', choose: '諮詢',
    note: '所有價格均為加元，未含適用稅費。您提供最終文案、照片和品牌素材。每輪修改指在約定範圍內提交一份彙整修改清單。額外頁面、文案、翻譯、預約系統、付款和客製功能另行報價。主機、網域、信箱和付費工具按約定費用另計；網域歸您所有。開工前以書面報價確認範圍和時間。',
    plans: [
      { name: '入門', price: 'CA$299', summary: '適合小型或新成立企業的簡單網站。', items: ['以範本建立的單頁網站，最多 4 個區塊，單一語言', '您提供文案和最多 5 張照片；使用品牌配色', '手機版面、電話和信箱按鈕、基本諮詢表單', '頁面標題和描述；1 輪修改'] },
      { name: '標準', price: 'CA$599', summary: '更多空間展示服務，設計更貼合品牌。', items: ['客製版面的單頁網站，最多 7 個區塊，單一語言', '您提供文案和最多 12 張照片；版面貼合品牌', '手機版面、服務和圖庫區塊、諮詢表單', '標題、描述和分享圖片；2 輪修改'] },
    ],
    careTitle: '可選網站維護 CA$29/月起', care: '適用於上述靜態單頁網站：每月 1 次修改請求，合計最多 30 分鐘，僅限現有文字或照片替換，另含每月連結和表單檢查。工作日郵件支援，2 個工作日內首次回覆。可在下次續費前取消；未使用時間不累積。',
    exclusions: '不含重新設計、新區塊、新功能、緊急或隨叫隨到支援、可用率保證。額外工作需另行報價並獲批准。主機、網域續費、信箱、付費表單和其他第三方費用另計。可只購買網站，不訂閱維護。',
  },
}

export const PACKAGE_EVENT = 'sitepilot:package'

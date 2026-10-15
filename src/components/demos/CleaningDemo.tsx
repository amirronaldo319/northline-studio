import { ArrowRight, Building2, CalendarCheck, Home, Phone, Sparkles, Truck } from 'lucide-react'
import { useCopy } from '@/i18n/context'
import { CleanArt } from './art'
import { DemoImage } from './DemoImage'
import type { DemoProps } from './types'

const TEAL = '#0e7c78'
const TEAL_SOFT = '#e3f3f1'
const SUN = '#f4c552'
const INK = '#14302e'

const SERVICES_EN = [
  { icon: Home, title: 'Regular cleaning', text: 'Weekly or every-other-week visits that keep your home on track.' },
  { icon: Sparkles, title: 'Deep cleaning', text: 'Baseboards, inside appliances, and the corners that get skipped.' },
  { icon: Truck, title: 'Move-in and move-out', text: 'A thorough clean so you can hand over the keys with confidence.' },
  { icon: Building2, title: 'Condos and apartments', text: 'Flexible visits that work around building access and parking.' },
]

const STEPS_EN = ['Tell us about your home', 'Get a clear quote', 'Pick a time that works']

export function CleaningDemo({ onDemoAction }: DemoProps) {
  const { locale } = useCopy()
  const fa = locale === 'fa'
  const text = (en: string, persian: string) => fa ? persian : en
  const SERVICES = fa ? [
    { icon: Home, title: 'نظافت منظم', text: 'نظافت هفتگی یا یک هفته در میان برای تمیز ماندن خانه.' },
    { icon: Sparkles, title: 'نظافت عمیق', text: 'قرنیزها، داخل لوازم و گوشه‌هایی که کمتر تمیز می‌شوند.' },
    { icon: Truck, title: 'پیش و پس از اسباب‌کشی', text: 'نظافت کامل برای تحویل خانه با خیال آسوده.' },
    { icon: Building2, title: 'آپارتمان‌ها', text: 'زمان‌بندی منعطف با توجه به دسترسی ساختمان و پارکینگ.' },
  ] : SERVICES_EN
  const STEPS = fa ? ['درباره‌ی منزلتان بگویید', 'قیمت روشن بگیرید', 'زمان مناسب را انتخاب کنید'] : STEPS_EN
  return (
    <div lang={fa ? 'fa' : 'en'} dir={fa ? 'rtl' : 'ltr'} className="@container bg-white font-sans" style={{ color: INK }}>
      <header className="flex items-center justify-between gap-4 px-5 py-4 @3xl:px-12 @3xl:py-5">
        <div className="flex items-center gap-2">
          <span className="grid size-8 place-items-center rounded-full text-white" style={{ background: TEAL }}>
            <Sparkles size={16} />
          </span>
          <span className="font-display text-lg font-bold tracking-tight">{text('Tidewell Cleaning', 'نظافت تایدول')}</span>
        </div>
        <nav className="hidden items-center gap-7 text-sm font-medium opacity-75 @3xl:flex" aria-label={text('Demo site', 'وب‌سایت نمایشی')}>
          <span>{text('Services', 'خدمات')}</span>
          <span>{text('How it works', 'روند کار')}</span>
          <span>{text('Areas', 'محدوده\u200cی خدمات')}</span>
        </nav>
        <button
          type="button"
          onClick={onDemoAction}
          className="rounded-full px-4 py-2 text-sm font-semibold text-white"
          style={{ background: TEAL }}
        >
          {text('Get a quote', 'دریافت قیمت')}
        </button>
      </header>

      <section className="px-5 pt-4 pb-10 @3xl:px-12 @3xl:pt-8 @3xl:pb-16">
        <div className="grid items-center gap-8 @3xl:grid-cols-2 @3xl:gap-12">
          <div>
            <span
              className="inline-block rounded-full px-3 py-1 text-xs font-semibold"
              style={{ background: TEAL_SOFT, color: TEAL }}
            >
              {text('Home cleaning in Vancouver', 'نظافت منزل در ونکوور')}
            </span>
            <h3 className="mt-4 font-display text-[2rem] leading-[1.05] font-bold tracking-tight @3xl:text-[3.25rem]">
              {text('A cleaner home, without the hassle.', 'خانه‌ای تمیزتر، بدون دردسر.')}
            </h3>
            <p className="mt-4 max-w-md text-base leading-relaxed opacity-80 @3xl:text-lg">
              {text('Regular and one-time cleaning for houses, condos, and apartments. Tell us what you need and we’ll send a clear quote.', 'نظافت منظم و یک‌باره برای خانه‌ها و آپارتمان‌ها. بگویید چه نیاز دارید تا قیمت روشنی ارائه کنیم.')}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={onDemoAction}
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold"
                style={{ background: SUN, color: INK }}
              >
                {text('Request a quote', 'درخواست قیمت')} <ArrowRight size={16} className="rtl:-scale-x-100" />
              </button>
              <span className="inline-flex items-center gap-2 rounded-full border px-5 py-3 font-semibold" style={{ borderColor: '#cfe3e0' }}>
                <Phone size={16} /> <bdi dir="ltr">(604) 555-0118</bdi>
              </span>
            </div>
          </div>
          <div className="relative">
            <DemoImage
              id="cleaning-hero"
              alt={fa ? 'فضای خانه‌ای تمیز و روشن' : undefined}
              className="aspect-[4/3] w-full rounded-[1.75rem]"
              fallback={<CleanArt className="aspect-[4/3] w-full rounded-[1.75rem]" />}
            />
            <div className="absolute -bottom-4 left-4 flex items-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-semibold shadow-lg">
              <CalendarCheck size={18} style={{ color: TEAL }} /> {text('Weekday and weekend visits', 'خدمات در روزهای هفته و آخر هفته')}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-10 @3xl:px-12 @3xl:py-14" style={{ background: TEAL_SOFT }}>
        <h4 className="font-display text-2xl font-bold tracking-tight @3xl:text-3xl">{text('What we clean', 'چه چیزهایی را تمیز می\u200cکنیم')}</h4>
        <div className="mt-6 grid gap-4 @xl:grid-cols-2 @4xl:grid-cols-4">
          {SERVICES.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-2xl bg-white p-5">
              <Icon size={22} style={{ color: TEAL }} />
              <div className="mt-3 font-semibold">{title}</div>
              <p className="mt-1 text-sm leading-relaxed opacity-75">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-8 px-5 py-10 @3xl:grid-cols-2 @3xl:px-12 @3xl:py-14">
        <div>
          <h4 className="font-display text-2xl font-bold tracking-tight @3xl:text-3xl">{text('Booking is simple', 'رزرو آسان است')}</h4>
          <ol className="mt-5 space-y-3">
            {STEPS.map((step, index) => (
              <li key={step} className="flex items-center gap-3">
                <span className="grid size-8 shrink-0 place-items-center rounded-full text-sm font-bold" style={{ background: SUN }}>
                  {index + 1}
                </span>
                <span className="font-medium">{step}</span>
              </li>
            ))}
          </ol>
        </div>
        <form
          className="rounded-2xl border p-5"
          style={{ borderColor: '#d8e9e6' }}
          onSubmit={(event) => {
            event.preventDefault()
            onDemoAction?.()
          }}
        >
          <div className="font-semibold">{text('Request a quote', 'درخواست قیمت')}</div>
          <p className="mt-1 text-xs opacity-70">{text('Demo form — nothing is sent.', 'فرم نمایشی است؛ چیزی ارسال نمی\u200cشود.')}</p>
          <div className="mt-4 grid gap-3 @md:grid-cols-2">
            <label className="text-sm">
              <span className="mb-1 block font-medium">{text('Name', 'نام')}</span>
              <input className="w-full rounded-lg border px-3 py-2" style={{ borderColor: '#cfe3e0' }} placeholder={text('Your name', 'نام شما')} />
            </label>
            <label className="text-sm">
              <span className="mb-1 block font-medium">{text('Home type', 'نوع منزل')}</span>
              <select className="w-full rounded-lg border bg-white px-3 py-2" style={{ borderColor: '#cfe3e0' }}>
                <option>{text('House', 'خانه')}</option>
                <option>{text('Condo or apartment', 'آپارتمان')}</option>
              </select>
            </label>
          </div>
          <button type="submit" className="mt-4 w-full rounded-full py-3 font-semibold text-white" style={{ background: TEAL }}>
            {text('Send request (demo)', 'ارسال درخواست (نمایشی)')}
          </button>
        </form>
      </section>

      <footer className="px-5 py-6 text-sm opacity-70 @3xl:px-12">{text('Tidewell Cleaning · Fictional business for a design concept', 'نظافت تایدول · کسب\u200cوکار فرضی برای نمایش یک طرح مفهومی')}</footer>
    </div>
  )
}

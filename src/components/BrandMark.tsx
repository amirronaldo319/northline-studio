import { site } from '@/config/site'

type Props = {
  tone?: 'light' | 'dark'
}

/** Text-based logo: a cobalt monogram tile followed by the business name. */
export function BrandMark({ tone = 'light' }: Props) {
  const nameColor = tone === 'light' ? 'text-ink' : 'text-white'
  const subColor = tone === 'light' ? 'text-ink-3' : 'text-white/65'

  return (
    <span className="inline-flex items-center gap-2.5">
      <span
        aria-hidden="true"
        className="relative grid size-8 place-items-center rounded-[10px] bg-cobalt font-display text-[1.05rem] leading-none font-bold text-white shadow-[0_1px_0_rgb(255_255_255/0.25)_inset]"
      >
        {site.brand.monogram}
        <span className="absolute right-[5px] bottom-[5px] size-[5px] rounded-full bg-sand" />
      </span>
      <span className="flex items-baseline gap-1.5 font-display leading-none">
        <span className={`text-[1.125rem] font-bold tracking-tight ${nameColor}`}>{site.brand.shortName}</span>
        <span className={`text-[0.95rem] font-medium tracking-tight ${subColor}`}>{site.brand.descriptor}</span>
      </span>
    </span>
  )
}

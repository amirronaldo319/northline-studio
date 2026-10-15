import { Fragment } from 'react'
import { ChevronRight } from 'lucide-react'
import { useCopy } from '@/i18n/context'

export interface Crumb {
  label: string
  /** Omit on the current page. */
  href?: string
}

/** A small trail above the page title: where this page sits, with a way back. */
export function Breadcrumb({ items }: { items: readonly Crumb[] }) {
  const t = useCopy()

  return (
    <nav aria-label={t.common.breadcrumb} className="enter text-sm text-ink-3" style={{ '--i': 0 } as React.CSSProperties}>
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, index) => (
          <Fragment key={item.label}>
            {index > 0 && <ChevronRight aria-hidden="true" size={14} className="text-ink-3/70 rtl:-scale-x-100" />}
            <li>
              {item.href ? (
                <a href={item.href} className="underline-offset-4 hover:text-ink hover:underline">
                  {item.label}
                </a>
              ) : (
                <span aria-current="page" className="text-ink-2">
                  <bdi>{item.label}</bdi>
                </span>
              )}
            </li>
          </Fragment>
        ))}
      </ol>
    </nav>
  )
}

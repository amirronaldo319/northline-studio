import { useCopy } from '@/i18n/context'

/**
 * A slow band of the kinds of business the site is made for, between the first screen and the work.
 * It is decoration (the same list is in the "Who I build for" section), so it is hidden from screen readers.
 * With reduced motion it does not move: it becomes a centred, wrapping list.
 */
export function TradeTicker() {
  const t = useCopy()
  const names = t.trades.map((trade) => trade.name.charAt(0).toUpperCase() + trade.name.slice(1))

  const group = (key: string) => (
    <ul key={key} className="trade-ticker-group">
      {names.map((name) => (
        <li key={name}>
          <span aria-hidden="true" className="trade-ticker-dot" />
          {name}
        </li>
      ))}
    </ul>
  )

  return (
    <div className="trade-ticker" aria-hidden="true">
      <div className="trade-ticker-track">
        {group('a')}
        {group('b')}
      </div>
    </div>
  )
}

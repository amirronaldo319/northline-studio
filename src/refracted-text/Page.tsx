import { RefractedText } from '@/components/refracted-text'
import { REFRACTED_TEXT } from './config'

/** Refracted Text on a near-black page, in the container the component is designed to sit in. */
export function Page() {
  return (
    <main className="refract-page">
      <a className="refract-back" href="../">
        ← SitePilot
      </a>
      <h1 className="refract-title">Refracted Text</h1>
      <div className="refract-stage" style={{ background: '#050505', padding: '3rem', containerType: 'inline-size' }}>
        <RefractedText {...REFRACTED_TEXT} />
      </div>
    </main>
  )
}

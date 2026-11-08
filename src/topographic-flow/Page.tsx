import { TopographicFlow } from '@/components/topographic-flow'
import { TOPOGRAPHIC_FLOW } from './config'

/** Topographic Flow filling the screen. The title and the way back are its children, laid over the contours. */
export function Page() {
  return (
    <main className="topo-page">
      <TopographicFlow {...TOPOGRAPHIC_FLOW}>
        <div className="topo-content">
          <a className="topo-back" href="../">
            ← SitePilot
          </a>
          <div className="topo-card">
            <h1 className="topo-title">Topographic Flow</h1>
            <p className="topo-lede">Contours that drift and break into survey lines. Move the pointer across them.</p>
          </div>
        </div>
      </TopographicFlow>
    </main>
  )
}

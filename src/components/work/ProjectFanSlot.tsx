import { Component, lazy, Suspense, type ReactNode } from 'react'
import { useCopy } from '@/i18n/context'
import { LazyMount } from '../LazyMount'
import { Words } from '../Words'

// The fan and its component files are a separate chunk, fetched only as the visitor nears it.
const ProjectFan = lazy(() => import('./ProjectFan').then((module) => ({ default: module.ProjectFan })))

/** If the fan cannot load or draw, the block (heading included) is left out; the galleries above still list every project. */
class FanBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    return this.state.failed ? null : this.props.children
  }
}

/**
 * Every project in a fan, at the foot of the Work section. It is an extra way in, not the only one: without script the
 * block is hidden (`.project-fan-slot` in index.css), so nothing is left that reads as broken.
 */
export function ProjectFanSlot() {
  const t = useCopy()
  return (
    <div className="project-fan-slot">
      <FanBoundary>
        <div className="container-page">
          <div className="section-intro reveal">
            <h3 id="fan-title" className="h-subsection">
              <Words text={t.work.fanHeading} />
            </h3>
            <p className="lede mt-4">{t.work.fanLede}</p>
          </div>
        </div>
        {/* Full width, like the galleries above: twelve cards need the room, and they close up on narrow screens. */}
        <LazyMount className="project-fan-mount mt-4 lg:mt-6" rootMargin="600px 0px">
          <Suspense fallback={null}>
            <ProjectFan />
          </Suspense>
        </LazyMount>
      </FanBoundary>
    </div>
  )
}

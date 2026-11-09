import { useRef, useState } from 'react'
import {
  SoapBubbleButton,
  SoapBubbleIconButton,
  SoapBubbleMaterial,
  SoapBubbleMenu,
  SoapBubbleSearch,
  SoapBubbleSlider,
  SoapBubbleToggle,
} from '@/components/soap-bubble'
import { LIGHT_GLASS } from '@/lib/lightGlass'

/**
 * Bubble UI on a light page. The page element is the backdrop: the glass captures it and bends and mirrors it, so the
 * colour and lines painted behind the controls are what you see refracted through them.
 */
export function BubbleUiPage() {
  const page = useRef<HTMLDivElement>(null)
  const [wifi, setWifi] = useState(true)
  const [volume, setVolume] = useState(40)

  return (
    <div ref={page} className="bubble-page" data-theme="light" style={{ background: '#f7f7f8', color: '#1b1d22' }}>
      <div className="bubble-art" aria-hidden="true" />
      {/* In a header, so the way back is inside a landmark like the rest of the page. */}
      <header>
        <a className="bubble-back" href="../">
          ← SitePilot
        </a>
      </header>
      <main className="bubble-main">
        <h1 className="bubble-title">Bubble UI</h1>
        <p className="bubble-lede">Controls made of soap film. Press, drag and toggle: they bend what is behind them.</p>

        <SoapBubbleMaterial backdrop={page} {...LIGHT_GLASS}>
          {/* 28px on a desktop; shrinks on a phone so the 19-em stack always fits the screen. */}
          <div style={{ display: 'grid', gap: '1em', fontSize: 'min(28px, calc((100vw - 2.5rem) / 19.2))', width: 'max-content' }}>
            <header style={{ display: 'flex', gap: '0.55em' }}>
              <SoapBubbleMenu
                round
                label="•••"
                triggerLabel="More"
                items={[{ label: 'Select chats' }, { label: 'Read all' }]}
              />
              <SoapBubbleIconButton aria-label="Camera" style={{ marginLeft: 'auto' }}>
                📷
              </SoapBubbleIconButton>
              <SoapBubbleIconButton aria-label="New" tint="rgb(52 199 89)" opacity={0.92}>
                +
              </SoapBubbleIconButton>
            </header>
            <SoapBubbleSearch placeholder="Search" />
            <SoapBubbleToggle checked={wifi} onCheckedChange={setWifi} aria-label="Wi-Fi" scale={2.75} />
            <SoapBubbleSlider value={volume} onValueChange={setVolume} label="Volume" from="#0a84ff" scale={3} />
            <SoapBubbleButton>Continue</SoapBubbleButton>
          </div>
        </SoapBubbleMaterial>
      </main>
    </div>
  )
}

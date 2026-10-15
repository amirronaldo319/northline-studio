import type { Inquiry } from './inquiry'

/** Dispatched on `window` by the site-check band; the inquiry form listens and prepares itself. */
export const SITE_CHECK_EVENT = 'sitepilot:site-check'

export const SITE_CHECK_MESSAGE = 'Please take a look at my current website and tell me what you would change first.'

/** Prepares the inquiry for a site check without overwriting anything the visitor has already typed. */
export function siteCheckPreset(current: Inquiry, starterMessage: string = SITE_CHECK_MESSAGE): Inquiry {
  return {
    ...current,
    need: 'An update to my current website',
    message: current.message.trim() ? current.message : starterMessage,
  }
}

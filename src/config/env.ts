/**
 * Deployment-specific values, read from `.env` (see `.env.example`).
 * Both are public — they ship in the browser bundle.
 */

/**
 * Form service endpoint that accepts a JSON POST (e.g. a Formspree form URL).
 * When empty, the inquiry form opens the visitor's email app instead.
 */
export const formEndpoint: string = (import.meta.env.VITE_FORM_ENDPOINT ?? '').trim()

/** Final public URL, e.g. "https://www.example.ca". Empty until the domain is chosen. */
export const siteUrl: string = (import.meta.env.VITE_SITE_URL ?? '').trim().replace(/\/+$/, '')

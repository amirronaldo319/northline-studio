/** The site's base path: "/" on its own domain, "/northline-studio/" on a GitHub Pages project URL. */
export const BASE_PATH: string = import.meta.env.BASE_URL.endsWith('/') ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`

/** URL of a page by its path below the site root (for example "cleaning-companies/"). Empty means home. */
export function pageHref(path: string): string {
  return `${BASE_PATH}${path}`
}

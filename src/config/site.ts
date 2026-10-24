/**
 * Business configuration — the single place to change brand, contact,
 * pricing, and deployment details. Everything public-facing reads from here.
 */

export const site = {
  brand: {
    /** Also the logo's alt text. The logo itself lives in `src/assets/brand`. */
    name: 'SitePilot',
    owner: 'Amir',
    tagline: 'Websites for local businesses in Vancouver and North Vancouver.',
  },

  contact: {
    email: 'heyamir319@gmail.com',
  },

  serviceArea: {
    primary: ['Vancouver', 'North Vancouver'],
    region: 'British Columbia',
    country: 'Canada',
    /** Human-readable label used in copy. */
    label: 'Vancouver and North Vancouver',
  },

  /** The single core offer. No price is published; each written quote states the fee. */
  package: {
    name: 'One-page website',
  },

  /**
   * Switches for work that is built but not yet public.
   * `languages`: translated pages (the dictionaries in src/i18n). A language that is off is not built, linked, or
   * listed in the sitemap. The wording of each is a draft until a native speaker has reviewed it.
   */
  features: {
    languages: { fr: true, fa: true, 'zh-hans': true, 'zh-hant': true } as Record<'fr' | 'fa' | 'zh-hans' | 'zh-hant', boolean>,
  },

  /** Optional social profiles. Leave empty until real accounts exist; nothing renders when empty. */
  social: [] as ReadonlyArray<{ label: string; href: string }>,
} as const

/**
 * Commercial terms that are NOT yet confirmed. These are intentionally
 * never rendered. Fill them in and add them to the page copy only once decided.
 */
export const pendingTerms = {
  turnaroundTime: null as string | null,
  includedRevisions: null as number | null,
  paymentSchedule: null as string | null,
  taxHandling: null as string | null,
  hosting: null as string | null,
  domainRegistration: null as string | null,
  maintenancePlan: null as string | null,
  refundPolicy: null as string | null,
} as const

export const mailtoHref = `mailto:${site.contact.email}`

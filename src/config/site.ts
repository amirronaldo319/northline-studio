/**
 * Business configuration — the single place to change brand, contact,
 * pricing, and deployment details. Everything public-facing reads from here.
 */

export const site = {
  brand: {
    name: 'Northline Studio',
    /** Shown beside the mark in the header and footer. */
    shortName: 'Northline',
    /** Word shown after the short name in the logo lockup. */
    descriptor: 'Studio',
    /** Single letter used in the logo tile and favicon. */
    monogram: 'N',
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

  /**
   * No price is published on the site. Fees are given in each written quote.
   * To show a price later, add it here and render it in sections/Pricing.tsx.
   */
  pricing: {
    packageName: 'One-page website',
  },

  /**
   * Package features confirmed for the one-page website.
   * `title` is the feature; `value` explains why it matters to the customer.
   */
  packageFeatures: [
    {
      id: 'layout',
      title: 'Custom layout',
      value: 'Designed around your business and the way your customers decide, not a generic template.',
    },
    {
      id: 'responsive',
      title: 'Mobile and desktop design',
      value: 'Most people will find you on their phone. The site is built to read and work well on any screen.',
    },
    {
      id: 'services',
      title: 'Services information',
      value: 'Clear sections that explain what you offer, so customers know they have the right business.',
    },
    {
      id: 'photos',
      title: 'Your business photos',
      value: 'Show real examples of your work using photos you supply.',
    },
    {
      id: 'contact',
      title: 'Contact details',
      value: 'Your phone, email, and service area, placed where customers expect to find them.',
    },
    {
      id: 'quote-form',
      title: 'Quote-request form',
      value: 'Give customers a simple place to tell you what they need.',
    },
    {
      id: 'buttons',
      title: 'Clear contact buttons',
      value: 'Call, email, or request a quote in one tap, without hunting through the page.',
    },
    {
      id: 'basics',
      title: 'Page titles, descriptions, and headings',
      value: 'The basic structure search engines and link previews read, set up properly from the start.',
    },
  ],

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

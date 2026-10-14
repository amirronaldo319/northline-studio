/**
 * Business configuration — the single place to change brand, contact,
 * pricing, and deployment details. Everything public-facing reads from here.
 */

export const site = {
  brand: {
    /** Also the logo's alt text. The logo itself lives in `src/assets/brand`. */
    name: 'Northline Studio',
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
   * What the one-page package includes, as four short groups.
   * Only confirmed scope belongs here. Unconfirmed terms stay in `pendingTerms`.
   */
  packageGroups: [
    {
      id: 'design',
      title: 'Design',
      text: 'A custom one-page layout built around your business, for phones and desktops.',
    },
    {
      id: 'content',
      title: 'Content',
      text: 'Your services, your own photos, and your contact details, laid out clearly.',
    },
    {
      id: 'inquiries',
      title: 'Inquiries',
      text: 'A quote-request form and clear contact buttons, so customers know how to reach you.',
    },
    {
      id: 'launch',
      title: 'Launch basics',
      text: 'A page title, description, and headings, plus how your link looks when it’s shared.',
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

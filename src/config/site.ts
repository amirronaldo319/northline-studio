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

  /** The single core offer. No price is published; each written quote states the fee. */
  package: {
    name: 'One-page website',
  },

  /**
   * What the one-page package includes, grouped by what it does for the customer.
   * Only confirmed scope belongs here. Unconfirmed terms stay in `pendingTerms`.
   */
  packageGroups: [
    {
      id: 'design',
      title: 'Design',
      items: [
        {
          title: 'Custom one-page layout',
          value: 'Built around your business and how your customers decide, not dropped into a template.',
        },
        {
          title: 'Phone and desktop layouts',
          value: 'Reads and works well on a small screen, where most people will find you.',
        },
      ],
    },
    {
      id: 'content',
      title: 'Your content',
      items: [
        {
          title: 'Services information',
          value: 'Clear sections that explain what you offer and who it’s for.',
        },
        {
          title: 'Your business photos',
          value: 'Real examples of your work, using photos you supply.',
        },
        {
          title: 'Contact details',
          value: 'Your phone, email, and service area, where customers expect to find them.',
        },
      ],
    },
    {
      id: 'inquiries',
      title: 'Getting in touch',
      items: [
        {
          title: 'Quote-request form',
          value: 'A simple place for customers to tell you what they need.',
        },
        {
          title: 'Clear contact buttons',
          value: 'Call, email, or request a quote in one tap.',
        },
      ],
    },
    {
      id: 'sharing',
      title: 'Search and sharing',
      items: [
        {
          title: 'Basic search and sharing details',
          value: 'A page title, description, and headings, plus how your link looks when it’s shared.',
        },
      ],
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

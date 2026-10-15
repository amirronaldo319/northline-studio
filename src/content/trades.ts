import type { FaqItem } from './faq.ts'

/**
 * Landing pages for the kinds of business this site is built for. Each page describes what customers of that
 * trade look for and what a page for it would include. It states no results and makes no claims about
 * search position or sales.
 */
export interface Trade {
  slug: string
  /** Plural, used in headings: "Websites for {name}". */
  name: string
  /** Singular, used in sentences. */
  noun: string
  title: string
  description: string
  headline: string
  intro: string
  /** What customers of this trade want to know before they get in touch. */
  checks: ReadonlyArray<{ title: string; text: string }>
  /** What a one-page site for this trade would contain. */
  includes: readonly string[]
  faq: readonly FaqItem[]
}

export const TRADES: readonly Trade[] = [
  {
    slug: 'cleaning-companies',
    name: 'cleaning companies',
    noun: 'cleaning company',
    title: 'Cleaning company websites in Vancouver | SitePilot',
    description:
      'A clear one-page website for Vancouver and North Vancouver cleaning companies: what is included, where you work, and an easy way to request a quote.',
    headline: 'A one-page website for your cleaning company.',
    intro:
      'People choosing a cleaner want to know what a visit includes, whether you work in their area, and how to get a price. One clear page can answer all three.',
    checks: [
      {
        title: 'What a visit includes',
        text: 'Regular, deep, and move-out cleans mean different things to different people. Spell out what each one covers.',
      },
      {
        title: 'Where you work',
        text: 'Name the neighbourhoods or cities you serve, so nobody has to ask.',
      },
      {
        title: 'How to get a price',
        text: 'A short quote form and a visible phone or email button, near the top and again at the end.',
      },
      {
        title: 'Who is coming into the home',
        text: 'A few honest lines about you and your team help people feel comfortable booking.',
      },
    ],
    includes: [
      'Your services as a short, scannable list',
      'The areas you cover',
      'Your own photos of finished work',
      'A quote form that works on a phone',
      'Tap-to-call and email buttons',
      'A page title and description for search, and a clean preview when the link is shared',
    ],
    faq: [
      {
        question: 'Do I need before-and-after photos?',
        answer:
          'They help, but they aren’t required. Clear photos of finished work in good light are enough to start, and I’ll tell you what’s worth adding.',
      },
      {
        question: 'Can customers ask for a quote without calling?',
        answer:
          'Yes. The page has a short quote form and also shows your phone and email, so people can choose whichever is easiest.',
      },
      {
        question: 'Can I list the areas I serve?',
        answer:
          'Yes. Naming your neighbourhoods or cities lets customers see straight away that you work near them.',
      },
    ],
  },
  {
    slug: 'contractors',
    name: 'contractors and renovators',
    noun: 'contracting business',
    title: 'Contractor websites in Vancouver | SitePilot',
    description:
      'A one-page website for Vancouver and North Vancouver contractors and renovators: the work you take on, examples, and a simple way to start a conversation.',
    headline: 'A one-page website for your contracting business.',
    intro:
      'Someone planning a renovation is deciding who to trust with their home. A clear page that shows the work you take on, and makes it easy to get in touch, is a good place to begin that conversation.',
    checks: [
      {
        title: 'The work you take on',
        text: 'Kitchens, bathrooms, decks, full renovations: say what you do, and what you leave to others.',
      },
      {
        title: 'Examples of finished work',
        text: 'A handful of strong photos of real jobs, with a line on what was done.',
      },
      {
        title: 'Licences and insurance',
        text: 'If you hold them, say so plainly, in your own words and with your own details.',
      },
      {
        title: 'How a project starts',
        text: 'A short explanation of the first steps, so a visitor knows what contacting you leads to.',
      },
    ],
    includes: [
      'The kinds of project you take on',
      'A small gallery of your own finished work',
      'Licence and insurance details, if you want them shown',
      'A quote or enquiry form that asks the useful questions',
      'Phone and email buttons that work on a phone',
      'The areas you serve',
    ],
    faq: [
      {
        question: 'Do I need a lot of project photos?',
        answer:
          'No. A few good ones are better than many weak ones. If you only have phone photos, I can tell you which are strong enough to use.',
      },
      {
        question: 'Can the form ask about the project?',
        answer:
          'Yes. The enquiry form can ask for the type of work and the location, so the first message already tells you what you need to know.',
      },
      {
        question: 'Can I show past clients’ names?',
        answer:
          'Only with their permission. If you have it, I’ll include it. If not, the work can speak for itself.',
      },
    ],
  },
  {
    slug: 'landscapers',
    name: 'landscapers and gardeners',
    noun: 'landscaping business',
    title: 'Landscaper websites in Vancouver | SitePilot',
    description:
      'A one-page website for Vancouver and North Vancouver landscapers and gardeners: your services by season, your work, and an easy way to ask for a quote.',
    headline: 'A one-page website for your landscaping business.',
    intro:
      'Landscaping is seasonal and visual. A single page that shows your work, lists what you offer through the year, and makes it easy to ask for a visit works well for it.',
    checks: [
      {
        title: 'What you offer, and when',
        text: 'Maintenance, planting, clean-ups, and seasonal work, laid out so people can see what applies to them.',
      },
      {
        title: 'Your work',
        text: 'Photos of finished gardens and yards speak louder than a description.',
      },
      {
        title: 'Where you work',
        text: 'The neighbourhoods and cities you cover, so people know whether you can reach them.',
      },
      {
        title: 'How to ask for a visit',
        text: 'A form or button that makes it clear a quote or site visit is the next step.',
      },
    ],
    includes: [
      'Your services, grouped the way customers think about them',
      'A gallery of your own finished work',
      'The areas you serve',
      'A request-a-visit form',
      'Tap-to-call and email buttons',
      'Space to add seasonal notes later',
    ],
    faq: [
      {
        question: 'Can the page change with the seasons?',
        answer:
          'Yes. I keep it simple to update a line or a photo, and I can take on bigger seasonal changes as a separate quote.',
      },
      {
        question: 'I only have phone photos. Is that enough?',
        answer:
          'Often, yes. Photos in good daylight can look very good. I’ll tell you which are worth using and what to retake.',
      },
      {
        question: 'Can I show before-and-after?',
        answer:
          'Yes, if you have both. Before-and-after pairs are easy to include on a one-page site.',
      },
    ],
  },
  {
    slug: 'barbers-and-salons',
    name: 'barbers and salons',
    noun: 'barber shop or salon',
    title: 'Barber and salon websites in Vancouver | SitePilot',
    description:
      'A one-page website for Vancouver and North Vancouver barbers and salons: services, hours, location, and a clear way for people to book.',
    headline: 'A one-page website for your barber shop or salon.',
    intro:
      'People looking for a barber or salon want to see the services, find the shop, and know how to book. Putting those on one clean page, ahead of everything else, makes the next step obvious.',
    checks: [
      {
        title: 'Services you offer',
        text: 'A simple list of what you do, with the detail you want to give, such as how long a service takes.',
      },
      {
        title: 'Where you are and when you’re open',
        text: 'Your address, a map link, and your hours, in text that is easy to find.',
      },
      {
        title: 'How to book',
        text: 'A booking link, a phone number, or a message button, shown near the top.',
      },
      {
        title: 'The look of the place',
        text: 'A few photos of the shop and the work, so people know what to expect.',
      },
    ],
    includes: [
      'Your services as a clear list',
      'Hours, address, and a map link',
      'A booking button that goes to your existing booking tool, if you use one',
      'Photos of the shop and your work',
      'Phone and message buttons',
      'Links to your social profiles, if you want them',
    ],
    faq: [
      {
        question: 'Can I keep using my booking app?',
        answer:
          'Yes. The page can link to the booking tool you already use, so you don’t need to change how you take appointments.',
      },
      {
        question: 'Can I link my Instagram?',
        answer:
          'Yes. Many shops show their work there, and the page can link to it so visitors can see more.',
      },
      {
        question: 'Do I need a logo?',
        answer:
          'No. A logo helps, but a clear name and good photos are enough to start.',
      },
    ],
  },
  {
    slug: 'auto-detailing',
    name: 'auto detailers and mobile mechanics',
    noun: 'auto detailing business',
    title: 'Auto detailing websites in Vancouver | SitePilot',
    description:
      'A one-page website for Vancouver and North Vancouver auto detailers and automotive services: packages, where you work, and a simple way to request a booking.',
    headline: 'A one-page website for your auto detailing business.',
    intro:
      'Customers want to know what each service includes, whether you come to them or they come to you, and how to book. A single page that lays those out clearly saves a lot of back and forth.',
    checks: [
      {
        title: 'What each service includes',
        text: 'Describe each package in plain terms, so a customer can choose without asking.',
      },
      {
        title: 'Where the work happens',
        text: 'Whether you work from a shop, or travel to the customer, and the areas you cover.',
      },
      {
        title: 'Your results',
        text: 'Clear photos of finished vehicles, shot in good light.',
      },
      {
        title: 'How to book',
        text: 'A form or button that collects the vehicle and the service wanted, so your first reply can be specific.',
      },
    ],
    includes: [
      'Your packages or services, one by one',
      'Where you work and the areas you serve',
      'A gallery of your own finished vehicles',
      'A booking request form that asks for the vehicle and service',
      'Tap-to-call and message buttons',
      'A short note about you and how you work',
    ],
    faq: [
      {
        question: 'Can I list packages without prices?',
        answer:
          'Yes. You decide what to show. Many businesses describe what each package includes and invite people to ask for a quote.',
      },
      {
        question: 'I travel to customers. How do I show that?',
        answer:
          'The page can say clearly that you come to them, and list the areas you cover, so people know straight away.',
      },
      {
        question: 'Can the form ask for the make and model?',
        answer:
          'Yes. The booking form can ask for the vehicle and the service, so your first reply already has what you need.',
      },
    ],
  },
]

export function findTrade(slug: string): Trade | undefined {
  return TRADES.find((trade) => trade.slug === slug)
}

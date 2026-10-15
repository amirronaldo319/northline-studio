/**
 * Short, practical guides. Plain advice a local business owner can use whether or not they ever hire me.
 * No statistics and no promises about results.
 */
export interface GuideSection {
  heading: string
  paragraphs?: readonly string[]
  items?: readonly string[]
}

export interface Guide {
  slug: string
  title: string
  description: string
  headline: string
  intro: string
  sections: readonly GuideSection[]
}

export const GUIDES: readonly Guide[] = [
  {
    slug: 'what-a-local-business-website-needs',
    title: 'What a local business website needs | SitePilot',
    description:
      'A plain checklist of what a one-page website for a local service business should include, and what you can leave out.',
    headline: 'What a local business website needs on one page.',
    intro:
      'You don’t need a big website to look professional and be easy to contact. For most local service businesses, one well-organised page does the job. Here is what it should hold.',
    sections: [
      {
        heading: 'Start with the questions customers ask',
        paragraphs: [
          'People rarely read a whole website. They arrive with one or two questions: do you do what I need, do you work near me, and how do I get in touch. A good one-page site answers those before anything else.',
        ],
      },
      {
        heading: 'The essentials',
        items: [
          'What you do, in one sentence, near the top',
          'Where you work: the neighbourhoods or cities you serve',
          'Real photos of your own work',
          'A way to ask for a quote or call, visible without scrolling on a phone',
          'Your contact details as real text, not only inside an image',
          'A short note about who you are, so people know who they’ll be dealing with',
        ],
      },
      {
        heading: 'What you can leave out',
        items: [
          'A long company history',
          'A blog you won’t keep up',
          'Stock photos that could belong to any business',
          'A list of every service you have ever offered',
        ],
      },
      {
        heading: 'Make it work on a phone',
        paragraphs: [
          'Many of your visitors will be holding a phone. Buttons should be big enough to tap, the phone number should call when tapped, and the text should be readable without zooming. If it works well on a phone, it will usually work well everywhere.',
        ],
      },
      {
        heading: 'Check it yourself',
        paragraphs: [
          'Ask someone who doesn’t know your business to find your phone number and your service area. If they can do it in a few seconds, the page is doing its job. If not, that is the first thing to fix.',
        ],
      },
    ],
  },
  {
    slug: 'how-to-prepare-for-a-website-quote',
    title: 'How to prepare for a website quote | SitePilot',
    description:
      'What to gather before asking a web designer for a quote, and what a clear quote should include, so the process is quicker and nothing surprises you.',
    headline: 'How to prepare for a website quote.',
    intro:
      'A little preparation makes a quote faster and more accurate, and helps you compare it with others. Here is what to gather, and what a good quote should say.',
    sections: [
      {
        heading: 'What to gather',
        items: [
          'The services you offer, in your own words',
          'The areas you serve',
          'Photos of your work, even if they are only phone photos',
          'Your phone number, email, and any social profiles you want shown',
          'The address of your current website, if you have one',
          'A logo and brand colours, if you have them (not required)',
          'One or two websites you like, and what you like about them',
        ],
      },
      {
        heading: 'Questions worth answering',
        items: [
          'What should the website help with: calls, quote requests, bookings?',
          'Who are your best customers, and what do they ask before they contact you?',
          'Is there anything you don’t want shown?',
          'Do you already own a domain name?',
        ],
      },
      {
        heading: 'What a clear quote should say',
        items: [
          'What is included, and what is not',
          'The total cost, and when payment is due',
          'The schedule, and what it depends on',
          'Hosting and domain arrangements, and who owns what',
          'Any ongoing costs, written out',
          'How extra work is handled, as a separate line',
        ],
      },
      {
        heading: 'Before you say yes',
        paragraphs: [
          'You should know the scope, the cost, and the next step before any work begins. If a quote leaves those unclear, ask. A good designer will be glad to explain.',
        ],
      },
    ],
  },
]

export function findGuide(slug: string): Guide | undefined {
  return GUIDES.find((guide) => guide.slug === slug)
}

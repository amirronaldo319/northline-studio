import { FAQ } from '../content/faq.ts'
import { GUIDES } from '../content/guides.ts'
import { PROJECT_DATA } from '../content/projectsData.ts'
import { TRADES } from '../content/trades.ts'
import { site } from '../config/site.ts'
import type { Copy, ProjectText } from './types.ts'

const projects: Record<string, ProjectText> = Object.fromEntries(
  PROJECT_DATA.map((project) => [
    project.id,
    {
      type: project.type,
      caption: project.caption,
      summary: project.summary,
      contribution: project.contribution,
      decisions: project.decisions,
      alt: project.alt,
      note: project.note,
    },
  ]),
)

export const en: Copy = {
  locale: 'en',

  meta: {
    homeTitle: 'SitePilot | Custom websites for Vancouver businesses',
    homeDescription:
      'Custom one-page websites for local service businesses in Vancouver and North Vancouver. See website examples and request a quote.',
    caseTitle: (name, isLive) => `${name}: ${isLive ? 'a live website I built' : 'a concept project'} | SitePilot`,
  },

  common: {
    skipToContent: 'Skip to content',
    requestQuote: 'Request a quote',
    seeMyWork: 'See my work',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    mainNav: 'Main',
    mobileNav: 'Mobile',
    footerNav: 'Footer',
    languageNav: 'Language',
    backToTop: 'Back to top',
    privacy: 'Privacy',
    home: 'Home',
    work: 'Work',
    guides: 'Guides',
    breadcrumb: 'Breadcrumb',
    opensNewTab: (name) => `: ${name} (opens in a new tab)`,
  },

  nav: { work: 'Work', package: 'Package', process: 'Process', about: 'About', faq: 'FAQ' },

  hero: {
    headline: 'Custom websites for Vancouver’s local service businesses.',
    markedWords: [3],
    lede: 'Show your work, explain your services, and make requesting a quote easy.',
    facts: ['Written quote before any work', 'Designed and built by me', 'Vancouver and North Vancouver'],
    conceptCaption: (name, businessType) =>
      `Concept demo: ${name}, a design for a fictional ${businessType.toLowerCase()} business.`,
    viewExample: 'View example',
  },

  work: {
    eyebrow: 'Selected work',
    heading: 'What I’ve built, and how I design.',
    lede: 'Two live websites, two concept projects, and design concepts for fictional businesses, each labelled for what it is.',
    statusLive: 'Live website',
    statusConcept: 'Concept project',
    contribution: 'My contribution:',
    visitLive: 'Visit live site',
    openLivePreview: 'Open live preview',
    readCaseStudy: 'Read the case study',
    conceptDemo: 'Concept demo',
    viewExample: 'View example',
    openLarger: (name) => `Open larger preview: ${name}`,
    openPhone: (name) => `Open phone preview: ${name}`,
  },

  projects,

  examples: {
    cleaning: {
      businessType: 'Home cleaning',
      intent: 'Designed to help busy households see what’s covered and ask for a cleaning quote.',
      approach: 'Bright and friendly, with services laid out as a short list and a quote form that stays within reach.',
      action: 'Request a quote',
    },
    landscaping: {
      businessType: 'Landscaping',
      intent: 'Designed to help homeowners see what is looked after through the seasons and ask for a visit.',
      approach: 'Calm and earthy, with services laid out plainly and the year broken into seasons.',
      action: 'Request a visit',
    },
  },

  package: {
    eyebrow: 'Your website package',
    heading: 'One focused page, built around your business.',
    lede: 'It answers the questions customers ask before they call: what you do, what your work looks like, and how to reach you.',
    groups: [
      { title: 'Design', text: 'A custom one-page layout built around your business, for phones and desktops.' },
      { title: 'Content', text: 'Your services, your own photos, and your contact details, laid out clearly.' },
      { title: 'Inquiries', text: 'A quote-request form and clear contact buttons, so customers know how to reach you.' },
      { title: 'Launch basics', text: 'A page title, description, and headings, plus how your link looks when it’s shared.' },
    ],
    quoteLead: 'A written quote comes first.',
    quoteBody:
      'Before work begins, it confirms the cost, scope, schedule, hosting and domain arrangements, and any ongoing costs. Anything beyond the single page, such as extra pages or features, is quoted separately.',
    factors: [
      { title: 'What’s ready', text: 'Your services, photos, and contact details.' },
      { title: 'Beyond one page', text: 'Extra pages or features, quoted as separate lines.' },
      { title: 'Hosting and domain', text: 'What you already have, and what you’d like arranged.' },
      { title: 'Timing', text: 'When your details are ready and when you’d like it live.' },
    ],
  },

  process: {
    eyebrow: 'Process',
    heading: 'How we’ll work together.',
    steps: [
      { title: 'Tell me about your business.', text: 'Share what you do, who you serve, and what you want the website to help with.' },
      { title: 'Share your content.', text: 'Send your services, photos, contact details, and any branding you already have.' },
      { title: 'Review your website.', text: 'Look over the design and content before the final version is approved.' },
      { title: 'Approve and arrange launch.', text: 'Confirm the final website and how it will go live.' },
    ],
  },

  audience: {
    eyebrow: 'Who I build for',
    heading: 'Made for local service businesses.',
    lede: 'If customers find you by searching, asking around, or opening a link on their phone, a clear page makes the next step obvious. Pick the one closest to your business.',
    readPage: 'Read the page',
    forName: (name) => ` for ${name}`,
    guidesLead: 'Planning a site? Two short guides:',
  },

  about: {
    eyebrow: 'About',
    heading: 'You work with me directly.',
    glance: [
      { label: 'Based in', value: `${site.serviceArea.label}, ${site.serviceArea.region}` },
      { label: 'Who builds it', value: 'Me, directly. No hand-offs.' },
      { label: 'Before work starts', value: 'A written quote you approve' },
      { label: 'How we talk', value: 'By email, in plain language' },
    ],
    paragraphs: [
      `I’m ${site.brand.owner}. I design and build every website myself, so when you send a message you’re talking to the person doing the work.`,
      'Recent builds include a one-page site for a Vancouver private swim-lesson business, a landing page with an interactive estimator for a car-hosting service, and a bilingual concept site with interactive 3D models of a residential tower.',
      `I focus on practical sites for local service businesses in ${site.serviceArea.label}, and I keep the scope simple and the language plain, so you know what you’re getting and what comes next.`,
    ],
  },

  faq: {
    eyebrow: 'FAQ',
    heading: 'Before you get in touch.',
    moreLead: 'Something else? ',
    askInForm: 'Ask in the form',
    orEmail: ' or email ',
    moreEnd: '.',
    items: FAQ,
  },

  siteCheck: {
    eyebrow: 'Already have a website?',
    heading: 'Start with a free site check.',
    text: 'Send me your web address and I’ll reply with what I’d change first. You don’t need a new site to ask, and nothing starts without your approval.',
    button: 'Ask for a site check',
    starterMessage: 'Please take a look at my current website and tell me what you would change first.',
  },

  contact: {
    eyebrow: 'Get started',
    heading: 'Request a quote.',
    lede: 'Tell me about your business and what you need. I’ll reply to talk through the scope and next steps.',
    nextTitle: 'What happens next',
    nextSteps: [
      'You send a message, with as much or as little as you like.',
      'I read it and reply by email to talk through what you need.',
      'If it’s a fit, I send a written quote. Nothing starts until you approve it.',
    ],
    preferEmail: 'Prefer email?',
    copyEmail: 'Copy email address',
    copied: 'Copied',
    copiedNote: (email) => `${email} is on your clipboard.`,
    copyFailed: 'Couldn’t copy. Please select the address and copy it manually.',
    privacyTitle: 'How your details are used',
    privacyForm:
      'What you send goes to me through a third-party form service and is used only to reply about your website.',
    privacyMailto:
      'The form opens your own email app, and nothing is stored on this site. What you send is used only to reply about your website.',
    privacyDelete: 'To have your details deleted, email me.',
  },

  form: {
    name: 'Name',
    email: 'Email',
    message: 'Tell me about your business',
    messageHint: 'What you do, and what you’d like the website to help with.',
    addDetails: 'Add more details',
    optional: '(optional)',
    businessName: 'Business name',
    businessType: 'Business type',
    chooseOne: 'Choose one',
    phone: 'Phone',
    existingWebsite: 'Existing website',
    websitePlaceholder: 'yourbusiness.ca',
    helpTitle: 'What kind of help do you need?',
    businessTypes: [
      { value: 'Cleaning', label: 'Cleaning' },
      { value: 'Contracting or renovation', label: 'Contracting or renovation' },
      { value: 'Landscaping', label: 'Landscaping' },
      { value: 'Auto detailing or automotive service', label: 'Auto detailing or automotive service' },
      { value: 'Barber or salon', label: 'Barber or salon' },
      { value: 'Independent service provider', label: 'Independent service provider' },
      { value: 'Other', label: 'Other' },
    ],
    needs: [
      { value: 'A new website', label: 'A new website' },
      { value: 'An update to my current website', label: 'An update to my current website' },
      { value: 'Help deciding', label: 'Help deciding' },
      { value: 'Something else', label: 'Something else' },
    ],
    errors: {
      nameRequired: 'Please enter your name.',
      emailRequired: 'Please enter your email so I can reply.',
      emailInvalid: 'Please enter a valid email address, like name@example.com.',
      phoneInvalid: 'Please check the phone number, or leave it blank.',
      websiteInvalid: 'Please enter a web address like yourbusiness.ca, or leave it blank.',
      messageRequired: 'Please tell me a little about your business and what you need.',
      messageShort: 'Please add a little more detail so I can reply usefully.',
    },
    checkFields: (count) => `Please check the ${count === 1 ? 'highlighted field' : `${count} highlighted fields`}.`,
    sending: 'Sending…',
    send: 'Send quote request',
    openEmail: 'Open email to send',
    sentDirect: 'Sent to me directly. I’ll reply by email.',
    mailtoNote: 'This opens your email app with your details ready to send.',
    successTitle: (firstName) => `Thanks, ${firstName}. Your request was sent.`,
    successBody: (email) => `I’ll read it and reply to ${email} to talk through what you need and the next steps.`,
    sendAnother: 'Send another request',
    errorTitle: 'Sorry, your request couldn’t be sent.',
    errorBefore: 'Your details are still here. Please try again, or email me at ',
    errorAfter: '.',
    emailOpenedTitle: 'Your email app should now be open with your details filled in.',
    emailOpenedBefore:
      'Press send there to reach me. Nothing has been sent yet. If no email window opened, copy your details and send them to ',
    emailOpenedAfter: '.',
    copyDetails: 'Copy my details',
    detailsCopied: 'Copied',
    copyUnavailable: 'Copy unavailable — please email me',
  },

  footer: {
    tagline: (area) => `Custom one-page websites for local service businesses in ${area}.`,
    websitesFor: 'Websites for',
    guides: 'Guides',
    copyright: (year, name) => `© ${year} ${name}. Example sites shown here are concepts for fictional businesses.`,
  },

  trades: TRADES,
  guides: GUIDES,

  tradePage: {
    eyebrow: (name) => `Websites for ${name}`,
    crumb: (name) => `Websites for ${name}`,
    customersEyebrow: 'What customers look for',
    checksHeading: (noun) => `What people check before they contact a ${noun}.`,
    includesEyebrow: 'What your page includes',
    includesHeading: 'One focused page, built around your business.',
    includesLede: 'A written quote comes first, so you know the scope and the cost before any work begins.',
    recentEyebrow: 'Recent work',
    recentHeading: 'Websites I’ve designed and built.',
    recentLede: 'Real projects, each labelled for what it is. Open one to see how it came together.',
    faqHeading: (name) => `Questions from ${name}.`,
    faqLabel: 'Questions',
  },

  casePage: {
    whatIDid: 'What I did',
    myPart: 'My part in it.',
    decisions: 'Decisions worth noting',
    worthKnowing: 'Worth knowing:',
    more: 'More of my work',
    screenshots: (name) => `${name} screenshots`,
  },

  guidePage: { eyebrow: 'Guide', next: 'Next guide:' },

  dialogs: {
    conceptDemo: 'Concept demo',
    fictional: (businessType) =>
      `A fictional ${businessType.toLowerCase()} business. Buttons in this demo don’t send anything.`,
    previewSize: 'Preview size',
    desktop: 'Desktop',
    phone: 'Phone',
    closeExample: 'Close example',
    closePreview: 'Close preview',
    loading: 'Loading example…',
    demoNotice: 'This is a concept demo, so nothing was sent. On a real site, this would reach the business.',
    wantSite: 'Want a site like this for your own business? This button goes to my real inquiry form.',
    requestForMyBusiness: 'Request a quote for my business',
  },
}

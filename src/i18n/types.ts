import type { FaqItem } from '../content/faq.ts'
import type { Guide } from '../content/guides.ts'
import type { Trade } from '../content/trades.ts'

/**
 * Everything a visitor can read, for one language. Every language file must provide every key (TypeScript
 * enforces it), so a translated page can never fall back to English halfway through a sentence.
 */
export type Locale = 'en' | 'fa' | 'zh-hans' | 'zh-hant'

export interface ProjectText {
  type: string
  caption: string
  summary: string
  contribution: string
  decisions: readonly [string, ...string[]]
  alt: string
  note?: string
}

export interface ExampleText {
  businessType: string
  intent: string
  approach: string
  action: string
}

export interface Step {
  title: string
  text: string
}

export interface FormErrorMessages {
  nameRequired: string
  emailRequired: string
  emailInvalid: string
  phoneInvalid: string
  websiteInvalid: string
  messageRequired: string
  messageShort: string
}

export interface Option {
  /** Stays in English: it is what arrives in the owner's inbox. */
  value: string
  /** What the visitor sees. */
  label: string
}

export interface Copy {
  locale: Locale

  meta: {
    homeTitle: string
    homeDescription: string
    caseTitle: (name: string, isLive: boolean) => string
  }

  common: {
    skipToContent: string
    requestQuote: string
    seeMyWork: string
    openMenu: string
    closeMenu: string
    mainNav: string
    mobileNav: string
    footerNav: string
    languageNav: string
    backToTop: string
    privacy: string
    home: string
    work: string
    guides: string
    breadcrumb: string
    opensNewTab: (name: string) => string
  }

  nav: Record<'work' | 'package' | 'process' | 'about' | 'faq', string>

  hero: {
    headline: string
    /** Positions of the words that carry the drawn underline. Empty for scripts written without spaces. */
    markedWords: readonly number[]
    lede: string
    facts: readonly [string, string, string]
    conceptCaption: (name: string, businessType: string) => string
    viewExample: string
  }

  work: {
    eyebrow: string
    heading: string
    lede: string
    statusLive: string
    statusConcept: string
    contribution: string
    visitLive: string
    openLivePreview: string
    readCaseStudy: string
    conceptDemo: string
    viewExample: string
    openLarger: (name: string) => string
    openPhone: (name: string) => string
  }

  projects: Record<string, ProjectText>
  examples: Record<string, ExampleText>

  package: {
    eyebrow: string
    heading: string
    lede: string
    groups: readonly [Step, Step, Step, Step]
    quoteLead: string
    quoteBody: string
    factors: readonly [Step, Step, Step, Step]
  }

  process: {
    eyebrow: string
    heading: string
    steps: readonly [Step, Step, Step, Step]
  }

  audience: {
    eyebrow: string
    heading: string
    lede: string
    readPage: string
    forName: (name: string) => string
    guidesLead: string
  }

  about: {
    eyebrow: string
    heading: string
    glance: ReadonlyArray<{ label: string; value: string }>
    paragraphs: readonly [string, string, string]
  }

  faq: {
    eyebrow: string
    heading: string
    /** Pieces of one sentence: `moreLead` + link + `orEmail` + email address + `moreEnd`. Spacing is included. */
    moreLead: string
    askInForm: string
    orEmail: string
    moreEnd: string
    items: readonly FaqItem[]
  }

  siteCheck: {
    eyebrow: string
    heading: string
    text: string
    button: string
    starterMessage: string
  }

  contact: {
    eyebrow: string
    heading: string
    lede: string
    nextTitle: string
    nextSteps: readonly [string, string, string]
    preferEmail: string
    copyEmail: string
    copied: string
    copiedNote: (email: string) => string
    copyFailed: string
    privacyTitle: string
    privacyForm: string
    privacyMailto: string
    privacyDelete: string
  }

  form: {
    name: string
    email: string
    message: string
    messageHint: string
    addDetails: string
    optional: string
    businessName: string
    businessType: string
    chooseOne: string
    phone: string
    existingWebsite: string
    websitePlaceholder: string
    helpTitle: string
    businessTypes: readonly Option[]
    needs: readonly Option[]
    errors: FormErrorMessages
    checkFields: (count: number) => string
    sending: string
    send: string
    openEmail: string
    sentDirect: string
    mailtoNote: string
    successTitle: (firstName: string) => string
    successBody: (email: string) => string
    sendAnother: string
    errorTitle: string
    errorBefore: string
    errorAfter: string
    emailOpenedTitle: string
    emailOpenedBefore: string
    emailOpenedAfter: string
    copyDetails: string
    detailsCopied: string
    copyUnavailable: string
  }

  footer: {
    tagline: (area: string) => string
    websitesFor: string
    guides: string
    copyright: (year: number, name: string) => string
  }

  trades: readonly Trade[]
  guides: readonly Guide[]

  tradePage: {
    eyebrow: (name: string) => string
    crumb: (name: string) => string
    customersEyebrow: string
    checksHeading: (noun: string) => string
    includesEyebrow: string
    includesHeading: string
    includesLede: string
    recentEyebrow: string
    recentHeading: string
    recentLede: string
    faqHeading: (name: string) => string
    faqLabel: string
  }

  casePage: {
    whatIDid: string
    myPart: string
    decisions: string
    worthKnowing: string
    more: string
    screenshots: (name: string) => string
  }

  guidePage: {
    eyebrow: string
    next: string
  }

  dialogs: {
    conceptDemo: string
    fictional: (businessType: string) => string
    previewSize: string
    desktop: string
    phone: string
    closeExample: string
    closePreview: string
    loading: string
    demoNotice: string
    wantSite: string
    requestForMyBusiness: string
  }
}

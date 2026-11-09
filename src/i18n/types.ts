import type { FaqItem } from '../content/faq.ts'
import type { Guide } from '../content/guides.ts'
import type { Trade } from '../content/trades.ts'
import type { ProjectStatus } from '../content/projectsData.ts'

/**
 * Everything a visitor can read, for one language. Every language file must provide every key (TypeScript
 * enforces it), so a translated page can never fall back to English halfway through a sentence.
 */
export type Locale = 'en' | 'fr' | 'fa' | 'zh-hans' | 'zh-hant'

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
    caseTitle: (name: string, status: ProjectStatus) => string
    workTitle: string
    workDescription: string
  }

  common: {
    skipToContent: string
    requestQuote: string
    /** The starting price, as short as it goes, for the phone quote bar. */
    fromPrice: string
    seeMyWork: string
    openMenu: string
    closeMenu: string
    mainNav: string
    mobileNav: string
    footerNav: string
    languageNav: string
    /** Marks the language being shown in the header's language menu, for screen readers. */
    currentLanguage: string
    /** The gallery's step buttons. */
    previous: string
    next: string
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
    /** Two lines, each set on its own line where the screen allows. */
    headline: readonly [string, string]
    /**
     * One short word or phrase of the second headline line that is also drawn as refracted glass. It must appear in
     * that line exactly. Latin script only (the effect's display face has no other glyphs), so some languages omit it.
     */
    headlineAccent?: string
    lede: string
    /** The starting price, on its own line under the lede. */
    priceLine: string
    explore: string
    seeWork: string
    /** Identifies the website under the hero: its name and its caption (which reads after the name). */
    visualCaption: (name: string, caption: string) => string
    conceptCaption: (name: string, businessType: string) => string
    viewExample: string
  }

  work: {
    eyebrow: string
    heading: string
    lede: string
    statusLive: string
    statusConcept: string
    statusPersonal: string
    contribution: string
    visitLive: string
    openLivePreview: string
    /** Shown instead of a link when a project's repository is private. */
    noPublicLink: string
    /** Label for the gallery of websites. */
    sitesLabel: string
    /** The Work page's websites section: its heading and the line under it. */
    sitesHeading: string
    sitesLede: string
    appsHeading: string
    appsLede: string
    viewProject: string
    allProjects: string
    /** The fan of every project: its heading, the line under it, and the name of the gallery region. */
    fanHeading: string
    fanLede: string
    fanLabel: string
    demosHeading: string
    demosLede: string
    readCaseStudy: string
    conceptDemo: string
    viewExample: string
    openLarger: (name: string) => string
    openPhone: (name: string) => string
  }

  /** The page that lists every project. */
  workPage: {
    eyebrow: string
    heading: string
    lede: string
  }

  projects: Record<string, ProjectText>
  examples: Record<string, ExampleText>

  package: {
    eyebrow: string
    heading: string
    lede: string
    /** Row titles of the package comparison, in the order of each plan's items. */
    groups: readonly [string, string, string, string]
    /** Names the comparison's first column for screen readers. */
    included: string
    /** Opens the full scope, costs and terms under the comparison. */
    termsSummary: string
  }

  process: {
    eyebrow: string
    heading: string
    steps: readonly [Step, Step, Step]
  }

  about: {
    eyebrow: string
    heading: string
    glance: ReadonlyArray<{ label: string; value: string }>
    paragraphs: readonly [string]
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
    button: string
    starterMessage: string
  }

  contact: {
    eyebrow: string
    heading: string
    lede: string
    /** One line beside the form's button. */
    reassurance: string
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
    allWork: string
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
    /** Label of the phone preview's width slider. */
    previewWidth: string
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

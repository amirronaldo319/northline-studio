/** Inquiry form model, validation, and delivery (form service or email fallback). */

export interface Inquiry {
  name: string
  email: string
  message: string
  /** Optional details start here. */
  business: string
  phone: string
  businessType: string
  website: string
  need: string
}

export type InquiryField = keyof Inquiry
export type InquiryErrors = Partial<Record<InquiryField, string>>

export const emptyInquiry: Inquiry = {
  name: '',
  email: '',
  message: '',
  business: '',
  phone: '',
  businessType: '',
  website: '',
  need: '',
}

/** Fields shown by default and required. */
export const REQUIRED_FIELDS = ['name', 'email', 'message'] as const satisfies readonly InquiryField[]

/** Fields behind the "Add more details" disclosure. All optional. */
export const OPTIONAL_FIELDS = ['business', 'businessType', 'phone', 'website', 'need'] as const satisfies readonly InquiryField[]

export function isOptionalField(field: InquiryField): boolean {
  return (OPTIONAL_FIELDS as readonly InquiryField[]).includes(field)
}

export const BUSINESS_TYPES = [
  'Cleaning',
  'Contracting or renovation',
  'Landscaping',
  'Auto detailing or automotive service',
  'Barber or salon',
  'Independent service provider',
  'Other',
] as const

export const NEED_OPTIONS = [
  'A new website',
  'An update to my current website',
  'Help deciding',
  'Something else',
] as const

const MIN_MESSAGE_LENGTH = 10
const MIN_PHONE_DIGITS = 7
const MAX_PHONE_DIGITS = 15
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const WEBSITE_PATTERN = /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}(\/\S*)?$/i

/** Messages shown beside invalid fields. The page passes its own language's; these are the English defaults. */
export interface InquiryMessages {
  nameRequired: string
  emailRequired: string
  emailInvalid: string
  phoneInvalid: string
  websiteInvalid: string
  messageRequired: string
  messageShort: string
}

export const ENGLISH_MESSAGES: InquiryMessages = {
  nameRequired: 'Please enter your name.',
  emailRequired: 'Please enter your email so I can reply.',
  emailInvalid: 'Please enter a valid email address, like name@example.com.',
  phoneInvalid: 'Please check the phone number, or leave it blank.',
  websiteInvalid: 'Please enter a web address like yourbusiness.ca, or leave it blank.',
  messageRequired: 'Please tell me a little about your business and what you need.',
  messageShort: 'Please add a little more detail so I can reply usefully.',
}

export function validateInquiry(inquiry: Inquiry, messages: InquiryMessages = ENGLISH_MESSAGES): InquiryErrors {
  const errors: InquiryErrors = {}
  const value = (field: InquiryField) => inquiry[field].trim()

  if (!value('name')) errors.name = messages.nameRequired

  if (!value('email')) {
    errors.email = messages.emailRequired
  } else if (!EMAIL_PATTERN.test(value('email'))) {
    errors.email = messages.emailInvalid
  }

  const phoneDigits = value('phone').replace(/\D/g, '')
  if (value('phone') && (phoneDigits.length < MIN_PHONE_DIGITS || phoneDigits.length > MAX_PHONE_DIGITS)) {
    errors.phone = messages.phoneInvalid
  }

  if (value('website') && !WEBSITE_PATTERN.test(value('website'))) {
    errors.website = messages.websiteInvalid
  }

  if (!value('message')) {
    errors.message = messages.messageRequired
  } else if (value('message').length < MIN_MESSAGE_LENGTH) {
    errors.message = messages.messageShort
  }

  return errors
}

function summaryLines(inquiry: Inquiry): string[] {
  const optional = (label: string, field: InquiryField) =>
    inquiry[field].trim() ? [`${label}: ${inquiry[field].trim()}`] : []

  return [
    `Name: ${inquiry.name.trim()}`,
    `Email: ${inquiry.email.trim()}`,
    ...optional('Business', 'business'),
    ...optional('Phone', 'phone'),
    ...optional('Business type', 'businessType'),
    ...optional('Existing website', 'website'),
    ...optional('Looking for', 'need'),
    '',
    'About my business and what I need:',
    inquiry.message.trim(),
  ]
}

export function formatInquiryText(inquiry: Inquiry): string {
  return summaryLines(inquiry).join('\n')
}

/** Subject line that names the business when given, and the person otherwise. */
export function inquirySubject(inquiry: Inquiry): string {
  return `Website inquiry from ${inquiry.business.trim() || inquiry.name.trim()}`
}

export function buildMailtoUrl(to: string, inquiry: Inquiry): string {
  const subject = inquirySubject(inquiry)
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(formatInquiryText(inquiry))}`
}

type FetchLike = (input: string, init: RequestInit) => Promise<Response>

/**
 * Sends the inquiry to a form service that accepts JSON (e.g. Formspree).
 * `honeypot` is forwarded as `_gotcha`, which Formspree uses to discard bot submissions.
 * Throws on network failure or a non-2xx response.
 */
export async function submitInquiry(
  endpoint: string,
  inquiry: Inquiry,
  honeypot: string,
  fetchImpl: FetchLike = fetch,
): Promise<void> {
  const trimmed = Object.fromEntries(Object.entries(inquiry).map(([key, val]) => [key, val.trim()]))

  const response = await fetchImpl(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      ...trimmed,
      _subject: inquirySubject(inquiry),
      _replyto: inquiry.email.trim(),
      _gotcha: honeypot,
    }),
  })

  if (!response.ok) {
    throw new Error(`Form service responded with status ${response.status}`)
  }
}

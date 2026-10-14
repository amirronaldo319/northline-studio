import { describe, expect, test, vi } from 'vitest'
import {
  buildMailtoUrl,
  emptyInquiry,
  formatInquiryText,
  inquirySubject,
  isOptionalField,
  submitInquiry,
  validateInquiry,
  type Inquiry,
} from './inquiry'

/** The smallest inquiry the form accepts: only the three required fields. */
const minimal: Inquiry = {
  ...emptyInquiry,
  name: 'Jordan Lee',
  email: 'jordan@example.com',
  message: 'I run a small cleaning company and need a simple website.',
}

const full: Inquiry = {
  ...minimal,
  business: 'Lee Cleaning',
  phone: '(604) 555-0123',
  businessType: 'Cleaning',
  website: 'leecleaning.ca',
  need: 'A new website',
}

describe('validateInquiry', () => {
  test('accepts an inquiry with only name, email, and message', () => {
    expect(validateInquiry(minimal)).toEqual({})
  })

  test('accepts an inquiry with every optional detail filled in', () => {
    expect(validateInquiry(full)).toEqual({})
  })

  test('requires only name, email, and message', () => {
    const errors = validateInquiry(emptyInquiry)
    expect(Object.keys(errors).sort()).toEqual(['email', 'message', 'name'])
  })

  test('does not require the business name', () => {
    expect(validateInquiry({ ...minimal, business: '' }).business).toBeUndefined()
  })

  test('treats whitespace-only values as empty', () => {
    expect(validateInquiry({ ...minimal, name: '   ' }).name).toBeDefined()
  })

  test('rejects an email without a domain', () => {
    expect(validateInquiry({ ...minimal, email: 'jordan@' }).email).toMatch(/valid email/i)
  })

  test('accepts an optional phone with common formatting', () => {
    expect(validateInquiry({ ...minimal, phone: '(604) 555-0123' }).phone).toBeUndefined()
  })

  test('rejects a phone number that is too short, but only when one is given', () => {
    expect(validateInquiry({ ...minimal, phone: '12345' }).phone).toBeDefined()
    expect(validateInquiry({ ...minimal, phone: '' }).phone).toBeUndefined()
  })

  test('accepts an existing website with or without protocol', () => {
    expect(validateInquiry({ ...minimal, website: 'leecleaning.ca' }).website).toBeUndefined()
    expect(validateInquiry({ ...minimal, website: 'https://www.leecleaning.ca/about' }).website).toBeUndefined()
  })

  test('rejects an existing website that is not a web address', () => {
    expect(validateInquiry({ ...minimal, website: 'my instagram' }).website).toBeDefined()
  })

  test('rejects a message that is too short to be useful', () => {
    expect(validateInquiry({ ...minimal, message: 'hi' }).message).toBeDefined()
  })
})

describe('isOptionalField', () => {
  test('flags the fields behind the disclosure as optional', () => {
    expect(['business', 'businessType', 'phone', 'website', 'need'].every((f) => isOptionalField(f as keyof Inquiry))).toBe(true)
  })

  test('does not flag required fields as optional', () => {
    expect(['name', 'email', 'message'].some((f) => isOptionalField(f as keyof Inquiry))).toBe(false)
  })
})

describe('inquirySubject', () => {
  test('names the business when one is given', () => {
    expect(inquirySubject(full)).toBe('Website inquiry from Lee Cleaning')
  })

  test('falls back to the sender’s name when no business is given', () => {
    expect(inquirySubject(minimal)).toBe('Website inquiry from Jordan Lee')
  })
})

describe('formatInquiryText', () => {
  test('lists only the details that were provided', () => {
    const text = formatInquiryText(minimal)
    expect(text).toContain('Name: Jordan Lee')
    expect(text).toContain('Email: jordan@example.com')
    expect(text).toContain('cleaning company')
    expect(text).not.toMatch(/Business:|Phone:|Existing website:|Looking for:/)
  })

  test('includes optional details when provided', () => {
    const text = formatInquiryText(full)
    expect(text).toContain('Business: Lee Cleaning')
    expect(text).toContain('Phone: (604) 555-0123')
    expect(text).toContain('Existing website: leecleaning.ca')
  })
})

describe('buildMailtoUrl', () => {
  test('addresses the email and encodes the details', () => {
    const url = buildMailtoUrl('owner@example.com', full)
    expect(url.startsWith('mailto:owner@example.com?')).toBe(true)
    const body = decodeURIComponent(url.split('body=')[1] ?? '')
    expect(body).toContain('Jordan Lee')
    expect(body).toContain('Lee Cleaning')
    expect(body).toContain('A new website')
  })

  test('works for a minimal inquiry with no business name', () => {
    const url = buildMailtoUrl('owner@example.com', minimal)
    const subject = decodeURIComponent(url.split('subject=')[1]?.split('&')[0] ?? '')
    expect(subject).toBe('Website inquiry from Jordan Lee')
  })
})

describe('submitInquiry', () => {
  test('posts JSON to the endpoint and resolves on a 2xx response', async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response('{}', { status: 200 }))
    await submitInquiry('https://forms.example/f/abc', full, '', fetchMock)
    expect(fetchMock).toHaveBeenCalledOnce()
    const [url, init] = fetchMock.mock.calls[0]
    expect(url).toBe('https://forms.example/f/abc')
    expect(init.method).toBe('POST')
    const payload = JSON.parse(init.body)
    expect(payload.email).toBe('jordan@example.com')
    expect(payload._subject).toBe('Website inquiry from Lee Cleaning')
    expect(payload._gotcha).toBe('')
  })

  test('sends a usable payload when optional details are blank', async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response('{}', { status: 200 }))
    await submitInquiry('https://forms.example/f/abc', minimal, '', fetchMock)
    const payload = JSON.parse(fetchMock.mock.calls[0][1].body)
    expect(payload.business).toBe('')
    expect(payload._subject).toBe('Website inquiry from Jordan Lee')
  })

  test('forwards a filled honeypot so the service can discard the submission', async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response('{}', { status: 200 }))
    await submitInquiry('https://forms.example/f/abc', minimal, 'bot-value', fetchMock)
    expect(JSON.parse(fetchMock.mock.calls[0][1].body)._gotcha).toBe('bot-value')
  })

  test('throws when the service responds with an error status', async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response('{}', { status: 500 }))
    await expect(submitInquiry('https://forms.example/f/abc', minimal, '', fetchMock)).rejects.toThrow()
  })

  test('throws when the network request fails', async () => {
    const fetchMock = vi.fn().mockRejectedValue(new TypeError('Failed to fetch'))
    await expect(submitInquiry('https://forms.example/f/abc', minimal, '', fetchMock)).rejects.toThrow()
  })
})

import { describe, expect, test, vi } from 'vitest'
import { buildMailtoUrl, emptyInquiry, submitInquiry, validateInquiry, type Inquiry } from './inquiry'

const valid: Inquiry = {
  ...emptyInquiry,
  name: 'Jordan Lee',
  business: 'Lee Cleaning',
  email: 'jordan@example.com',
  message: 'I need a simple website for my cleaning company.',
}

describe('validateInquiry', () => {
  test('returns no errors for a complete inquiry', () => {
    expect(validateInquiry(valid)).toEqual({})
  })

  test('requires name, business, email, and message', () => {
    const errors = validateInquiry(emptyInquiry)
    expect(Object.keys(errors).sort()).toEqual(['business', 'email', 'message', 'name'])
  })

  test('treats whitespace-only values as empty', () => {
    const errors = validateInquiry({ ...valid, name: '   ' })
    expect(errors.name).toBeDefined()
  })

  test('rejects an email without a domain', () => {
    expect(validateInquiry({ ...valid, email: 'jordan@' }).email).toMatch(/valid email/i)
  })

  test('accepts an optional phone with common formatting', () => {
    expect(validateInquiry({ ...valid, phone: '(604) 555-0123' }).phone).toBeUndefined()
  })

  test('rejects a phone number that is too short', () => {
    expect(validateInquiry({ ...valid, phone: '12345' }).phone).toBeDefined()
  })

  test('accepts an existing website with or without protocol', () => {
    expect(validateInquiry({ ...valid, website: 'leecleaning.ca' }).website).toBeUndefined()
    expect(validateInquiry({ ...valid, website: 'https://www.leecleaning.ca/about' }).website).toBeUndefined()
  })

  test('rejects an existing website that is not a web address', () => {
    expect(validateInquiry({ ...valid, website: 'my instagram' }).website).toBeDefined()
  })

  test('rejects a message that is too short to be useful', () => {
    expect(validateInquiry({ ...valid, message: 'hi' }).message).toBeDefined()
  })
})

describe('buildMailtoUrl', () => {
  test('addresses the email and encodes the details', () => {
    const url = buildMailtoUrl('owner@example.com', { ...valid, phone: '604 555 0123', need: 'A new website' })
    expect(url.startsWith('mailto:owner@example.com?')).toBe(true)
    const body = decodeURIComponent(url.split('body=')[1] ?? '')
    expect(body).toContain('Jordan Lee')
    expect(body).toContain('Lee Cleaning')
    expect(body).toContain('A new website')
    expect(body).toContain('I need a simple website')
  })

  test('omits optional fields that were left blank', () => {
    const body = decodeURIComponent(buildMailtoUrl('owner@example.com', valid).split('body=')[1] ?? '')
    expect(body).not.toContain('Phone:')
    expect(body).not.toContain('Existing website:')
  })
})

describe('submitInquiry', () => {
  test('posts JSON to the endpoint and resolves on a 2xx response', async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response('{}', { status: 200 }))
    await submitInquiry('https://forms.example/f/abc', valid, '', fetchMock)
    expect(fetchMock).toHaveBeenCalledOnce()
    const [url, init] = fetchMock.mock.calls[0]
    expect(url).toBe('https://forms.example/f/abc')
    expect(init.method).toBe('POST')
    const payload = JSON.parse(init.body)
    expect(payload.email).toBe('jordan@example.com')
    expect(payload._gotcha).toBe('')
  })

  test('throws when the service responds with an error status', async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response('{}', { status: 500 }))
    await expect(submitInquiry('https://forms.example/f/abc', valid, '', fetchMock)).rejects.toThrow()
  })

  test('throws when the network request fails', async () => {
    const fetchMock = vi.fn().mockRejectedValue(new TypeError('Failed to fetch'))
    await expect(submitInquiry('https://forms.example/f/abc', valid, '', fetchMock)).rejects.toThrow()
  })
})

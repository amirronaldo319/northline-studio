import { describe, expect, test, vi } from 'vitest'
import { copyText } from './clipboard'

describe('copyText', () => {
  test('resolves true only after the clipboard accepts the text', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    await expect(copyText('hello@example.com', { writeText })).resolves.toBe(true)
    expect(writeText).toHaveBeenCalledWith('hello@example.com')
  })

  test('resolves false when the clipboard rejects', async () => {
    const writeText = vi.fn().mockRejectedValue(new DOMException('denied', 'NotAllowedError'))
    await expect(copyText('hello@example.com', { writeText })).resolves.toBe(false)
  })

  test('resolves false when there is no clipboard API', async () => {
    await expect(copyText('hello@example.com', undefined)).resolves.toBe(false)
  })
})

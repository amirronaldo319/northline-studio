type ClipboardLike = Pick<Clipboard, 'writeText'> | undefined

/**
 * Copies text and reports whether it really worked. Never claims success on failure or when the
 * clipboard is unavailable (insecure context, denied permission, or an unsupported browser).
 */
export async function copyText(text: string, clipboard: ClipboardLike): Promise<boolean> {
  if (!clipboard || typeof clipboard.writeText !== 'function') return false
  try {
    await clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}

import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react'
import { AlertCircle, ChevronDown, Copy, Loader2 } from 'lucide-react'
import { PACKAGE_EVENT } from '@/content/offers'
import { formEndpoint } from '@/config/env'
import { mailtoHref, site } from '@/config/site'
import {
  buildMailtoUrl,
  emptyInquiry,
  formatInquiryText,
  isOptionalField,
  submitInquiry,
  validateInquiry,
  type Inquiry,
  type InquiryErrors,
  type InquiryField,
} from '@/lib/inquiry'
import { SITE_CHECK_EVENT, siteCheckPreset } from '@/lib/siteCheck'
import { useCopy } from '@/i18n/context'
import { Field } from './fields'
import { describedBy, fieldControlClasses } from './fieldStyles'
import { SuccessCheck } from '../ui/SuccessCheck'
import { buttonClasses } from '../ui/button'

type Status = 'idle' | 'submitting' | 'success' | 'error' | 'email-opened'

/** Order used to find the first invalid field. */
const FIELD_ORDER: InquiryField[] = ['name', 'email', 'message', 'business', 'businessType', 'phone', 'website', 'need']
const isConnected = formEndpoint.length > 0

export function InquiryForm() {
  const t = useCopy()
  const [values, setValues] = useState<Inquiry>(emptyInquiry)
  const [errors, setErrors] = useState<InquiryErrors>({})
  const [hasAttempted, setHasAttempted] = useState(false)
  const [status, setStatus] = useState<Status>('idle')
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [honeypot, setHoneypot] = useState('')
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'unavailable'>('idle')
  const isSubmittingRef = useRef(false)
  const formRef = useRef<HTMLFormElement>(null)
  const resultRef = useRef<HTMLDivElement>(null)

  // The site-check band (or a #site-check link) asks for the form to be ready for a website review.
  useEffect(() => {
    const prepare = () => {
      setValues((current) => siteCheckPreset(current, t.siteCheck.starterMessage))
      setErrors({})
      setHasAttempted(false)
      setIsDetailsOpen(true)
      setStatus('idle')
      window.setTimeout(() => formRef.current?.querySelector<HTMLElement>('[name="website"]')?.focus({ preventScroll: true }), 80)
    }
    window.addEventListener(SITE_CHECK_EVENT, prepare)
    if (window.location.hash === '#site-check') prepare()
    return () => window.removeEventListener(SITE_CHECK_EVENT, prepare)
  }, [t.siteCheck.starterMessage])

  useEffect(() => {
    const prepare = (event: Event) => {
      const detail = (event as CustomEvent<string>).detail
      if (typeof detail !== 'string') return
      setValues((current) => ({ ...current, message: current.message.includes(detail) ? current.message : [current.message, detail].filter(Boolean).join('\n') }))
      setStatus('idle')
      requestAnimationFrame(() => formRef.current?.querySelector<HTMLElement>('[name="name"]')?.focus({ preventScroll: true }))
    }
    window.addEventListener(PACKAGE_EVENT, prepare)
    return () => window.removeEventListener(PACKAGE_EVENT, prepare)
  }, [])

  const setField = (field: InquiryField, value: string) => {
    const next = { ...values, [field]: value }
    setValues(next)
    if (hasAttempted) setErrors(validateInquiry(next, t.form.errors))
    if (status === 'error' || status === 'email-opened') setStatus('idle')
  }

  const update = (field: InquiryField) => (event: ChangeEvent<HTMLTextAreaElement | HTMLSelectElement | HTMLInputElement>) =>
    setField(field, event.target.value)

  const focusField = (field: InquiryField) => {
    // Optional fields live behind the disclosure, so open it first, then focus once it has rendered.
    if (isOptionalField(field)) setIsDetailsOpen(true)
    requestAnimationFrame(() => formRef.current?.querySelector<HTMLElement>(`[name="${field}"]`)?.focus())
  }

  const showResult = (next: Status) => {
    setStatus(next)
    requestAnimationFrame(() => resultRef.current?.focus())
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (isSubmittingRef.current) return

    setHasAttempted(true)
    const found = validateInquiry(values, t.form.errors)
    setErrors(found)
    const firstInvalid = FIELD_ORDER.find((field) => found[field])
    if (firstInvalid) {
      focusField(firstInvalid)
      return
    }

    if (!isConnected) {
      window.location.href = buildMailtoUrl(site.contact.email, values)
      showResult('email-opened')
      return
    }

    isSubmittingRef.current = true
    setStatus('submitting')
    try {
      await submitInquiry(formEndpoint, values, honeypot)
      showResult('success')
    } catch {
      showResult('error')
    } finally {
      isSubmittingRef.current = false
    }
  }

  const copyDetails = async () => {
    try {
      await navigator.clipboard.writeText(formatInquiryText(values))
      setCopyState('copied')
    } catch {
      setCopyState('unavailable')
    }
  }

  const resetForm = () => {
    setValues(emptyInquiry)
    setErrors({})
    setHasAttempted(false)
    setIsDetailsOpen(false)
    setStatus('idle')
    requestAnimationFrame(() => formRef.current?.querySelector<HTMLElement>('[name="name"]')?.focus())
  }

  if (status === 'success') {
    const firstName = values.name.trim().split(/\s+/)[0]
    return (
      <div ref={resultRef} tabIndex={-1} role="status" className="form-card fx-in focus:outline-none">
        <SuccessCheck />
        <h3 className="mt-4 text-title2">{t.form.successTitle(firstName)}</h3>
        <p className="mt-3 leading-relaxed text-ink-2">{t.form.successBody(values.email.trim())}</p>
        <button type="button" onClick={resetForm} className="text-link mt-6">
          {t.form.sendAnother}
        </button>
      </div>
    )
  }

  const isSubmitting = status === 'submitting'
  const errorCount = Object.keys(errors).length

  const fieldProps = (field: InquiryField, hasHint = false) => ({
    id: `inquiry-${field}`,
    name: field,
    value: values[field],
    onChange: update(field),
    'aria-invalid': errors[field] ? true : undefined,
    'aria-describedby': describedBy(`inquiry-${field}`, errors[field], hasHint),
  })

  const inputProps = (field: InquiryField) => ({ ...fieldProps(field), className: fieldControlClasses })

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={handleSubmit}
      aria-labelledby="contact-title"
      className="form-card relative"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="inquiry-name" label={t.form.name} error={errors.name}>
          <input {...inputProps('name')} type="text" autoComplete="name" required />
        </Field>
        <Field id="inquiry-email" label={t.form.email} error={errors.email}>
          <input {...inputProps('email')} dir="ltr" type="email" autoComplete="email" inputMode="email" required />
        </Field>
      </div>

      <Field
        id="inquiry-message"
        label={t.form.message}
        error={errors.message}
        hint={t.form.messageHint}
       
        className="mt-4"
      >
        <textarea {...fieldProps('message', true)} rows={5} required className={`${fieldControlClasses} field-textarea resize-y`} />
      </Field>

      <div className="mt-5 border-t border-line pt-4">
        <button
          type="button"
          aria-expanded={isDetailsOpen}
          aria-controls="inquiry-details"
          onClick={() => setIsDetailsOpen((open) => !open)}
          className="disclosure-toggle"
        >
          {t.form.addDetails}
          <span className="font-normal text-ink-3">{t.form.optional}</span>
          <ChevronDown
            aria-hidden="true"
            size={17}
            className={`transition-transform duration-200 motion-reduce:transition-none ${isDetailsOpen ? 'rotate-180' : ''}`}
          />
        </button>

        <div id="inquiry-details" className="disclosure disclosure-pad" data-open={isDetailsOpen} inert={!isDetailsOpen}>
          <div className="disclosure-inner">

            <div className="mt-3 space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field id="inquiry-business" label={t.form.businessName} isOptional>
                  <input {...inputProps('business')} type="text" autoComplete="organization" />
                </Field>
                <Field id="inquiry-businessType" label={t.form.businessType} isOptional>
                  <div className="relative">
                    <select {...fieldProps('businessType')} className={`${fieldControlClasses} appearance-none pe-10`}>
                      <option value="">{t.form.chooseOne}</option>
                      {t.form.businessTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown aria-hidden="true" size={18} className="pointer-events-none absolute end-3.5 top-1/2 -translate-y-1/2 text-ink-3" />
                  </div>
                </Field>
                <Field id="inquiry-phone" label={t.form.phone} isOptional error={errors.phone}>
                  <input {...inputProps('phone')} dir="ltr" type="tel" autoComplete="tel" inputMode="tel" />
                </Field>
                <Field id="inquiry-website" label={t.form.existingWebsite} isOptional error={errors.website}>
                  <input
                    {...inputProps('website')}
                    dir="ltr"
                    type="text"
                    inputMode="url"
                    autoComplete="url"
                    placeholder={t.form.websitePlaceholder}
                    spellCheck={false}
                    autoCapitalize="none"
                  />
                </Field>
              </div>

              <fieldset>
                <legend className="mb-2.5 text-callout font-semibold">{t.form.helpTitle}</legend>
                <div className="flex flex-wrap gap-2">
                  {t.form.needs.map((option) => (
                    <label key={option.value} className="cursor-pointer">
                      <input
                        type="radio"
                        name="need"
                        value={option.value}
                        checked={values.need === option.value}
                        onChange={update('need')}
                        className="peer sr-only"
                      />
                      <span className="choice-pill">
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>
            </div>
                    </div>
        </div>
      </div>

      {/* Honeypot: hidden from people, often filled in by bots. The form service discards those. */}
      <div aria-hidden="true" className="absolute -start-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="inquiry-gotcha">Leave this field empty</label>
        <input id="inquiry-gotcha" type="text" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
      </div>

      {hasAttempted && errorCount > 0 && (
        <p role="alert" className="fx-in mt-5 flex items-center gap-2 rounded-lg bg-danger/8 px-4 py-3 text-footnote font-medium text-danger">
          <AlertCircle aria-hidden="true" size={18} className="shrink-0" />
          {t.form.checkFields(errorCount)}
        </p>
      )}

      {status === 'error' && (
        <div ref={resultRef} tabIndex={-1} role="alert" className="fx-in mt-5 rounded-lg border border-danger/25 bg-danger/5 p-4 text-callout focus:outline-none">
          <p className="font-semibold text-danger">{t.form.errorTitle}</p>
          <p className="mt-1 text-ink-2">
            {t.form.errorBefore}
            <a href={mailtoHref} dir="ltr" className="font-semibold text-accent underline underline-offset-4">
              {site.contact.email}
            </a>
            {t.form.errorAfter}
          </p>
        </div>
      )}

      {status === 'email-opened' && (
        <div ref={resultRef} tabIndex={-1} role="status" className="fx-in mt-5 rounded-lg border border-cobalt/25 bg-cobalt-soft/60 p-4 text-callout focus:outline-none">
          <p className="font-semibold">{t.form.emailOpenedTitle}</p>
          <p className="mt-1 text-ink-2">
            {t.form.emailOpenedBefore}
            <a href={mailtoHref} dir="ltr" className="font-semibold text-accent underline underline-offset-4">
              {site.contact.email}
            </a>
            {t.form.emailOpenedAfter}
          </p>
          <button type="button" onClick={copyDetails} className="text-link mt-3">
            <Copy aria-hidden="true" size={16} />
            {copyState === 'copied' ? t.form.detailsCopied : copyState === 'unavailable' ? t.form.copyUnavailable : t.form.copyDetails}
          </button>
        </div>
      )}

      <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
        <button
          type="submit"
          disabled={isSubmitting}
          aria-disabled={isSubmitting}
          className={buttonClasses('primary', 'lg', 'w-full sm:w-auto')}
        >
          {isSubmitting && <Loader2 aria-hidden="true" size={18} className="animate-spin motion-reduce:animate-none" />}
          {isSubmitting ? t.form.sending : t.common.requestQuote}
        </button>
        <p className="text-callout leading-snug text-ink-2">{t.contact.reassurance}</p>
      </div>
      <p className="mt-3 text-footnote text-ink-3">{isConnected ? t.form.sentDirect : t.form.mailtoNote}</p>
      <p className="sr-only" role="status" aria-live="polite">
        {isSubmitting ? t.form.sending : ''}
      </p>
    </form>
  )
}

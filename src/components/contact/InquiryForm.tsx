import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react'
import { AlertCircle, ChevronDown, Copy, Loader2, Mail, Send } from 'lucide-react'
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
import { buttonClasses } from '../ui/button'
import { Field } from './fields'
import { describedBy, inputClasses } from './fieldStyles'
import { SuccessCheck } from '../ui/SuccessCheck'

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

  const update = (field: InquiryField) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const next = { ...values, [field]: event.target.value }
    setValues(next)
    if (hasAttempted) setErrors(validateInquiry(next, t.form.errors))
    if (status === 'error' || status === 'email-opened') setStatus('idle')
  }

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
      <div ref={resultRef} tabIndex={-1} role="status" className="fx-in rounded-xl border border-success/25 bg-white p-6 focus:outline-none sm:p-8">
        <SuccessCheck />
        <h3 className="mt-4 text-2xl font-semibold">{t.form.successTitle(firstName)}</h3>
        <p className="mt-3 leading-relaxed text-ink-2">{t.form.successBody(values.email.trim())}</p>
        <button type="button" onClick={resetForm} className={buttonClasses('secondary', 'md', 'mt-6')}>
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

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={handleSubmit}
      aria-labelledby="contact-title"
      className="relative rounded-xl border border-line bg-white p-5 shadow-soft sm:p-7"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="inquiry-name" label={t.form.name} error={errors.name}>
          <input {...fieldProps('name')} type="text" autoComplete="name" required className={inputClasses} />
        </Field>
        <Field id="inquiry-email" label={t.form.email} error={errors.email}>
          <input {...fieldProps('email')} dir="ltr" type="email" autoComplete="email" inputMode="email" required className={`${inputClasses} text-start`} />
        </Field>
      </div>

      <Field
        id="inquiry-message"
        label={t.form.message}
        error={errors.message}
        hint={t.form.messageHint}
        className="mt-5"
      >
        <textarea {...fieldProps('message', true)} rows={5} required className={`${inputClasses} resize-y`} />
      </Field>

      <div className="mt-5 border-t border-line pt-4">
        <button
          type="button"
          aria-expanded={isDetailsOpen}
          aria-controls="inquiry-details"
          onClick={() => setIsDetailsOpen((open) => !open)}
          className="-ms-1 inline-flex min-h-11 items-center gap-2 rounded-lg px-1 text-[0.9375rem] font-semibold text-ink hover:text-cobalt"
        >
          <ChevronDown
            aria-hidden="true"
            size={18}
            className={`transition-transform duration-200 motion-reduce:transition-none ${isDetailsOpen ? 'rotate-180' : ''}`}
          />
          {t.form.addDetails}
          <span className="text-sm font-normal text-ink-3">{t.form.optional}</span>
        </button>

        <div id="inquiry-details" className="disclosure disclosure-pad" data-open={isDetailsOpen} inert={!isDetailsOpen}>
          <div className="disclosure-inner">

            <div className="mt-3 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field id="inquiry-business" label={t.form.businessName} isOptional>
                  <input {...fieldProps('business')} type="text" autoComplete="organization" className={inputClasses} />
                </Field>
                <Field id="inquiry-businessType" label={t.form.businessType} isOptional>
                  <div className="relative">
                    <select {...fieldProps('businessType')} className={`${inputClasses} appearance-none pe-10`}>
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
                  <input {...fieldProps('phone')} dir="ltr" type="tel" autoComplete="tel" inputMode="tel" className={`${inputClasses} text-start`} />
                </Field>
                <Field id="inquiry-website" label={t.form.existingWebsite} isOptional error={errors.website}>
                  <input
                    {...fieldProps('website')}
                    dir="ltr"
                    type="text"
                    inputMode="url"
                    autoComplete="url"
                    placeholder={t.form.websitePlaceholder}
                    spellCheck={false}
                    autoCapitalize="none"
                    className={`${inputClasses} text-start`}
                  />
                </Field>
              </div>

              <fieldset>
                <legend className="mb-2.5 text-[0.9375rem] font-semibold">{t.form.helpTitle}</legend>
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
                      <span className="inline-flex min-h-11 items-center rounded-full border border-line-strong bg-white px-4 text-[0.9375rem] font-medium text-ink-2 transition-colors peer-checked:border-cobalt peer-checked:bg-cobalt-soft peer-checked:text-ink peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-cobalt hover:border-ink/40">
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
        <p role="alert" className="fx-in mt-5 flex items-center gap-2 rounded-lg bg-danger/8 px-4 py-3 text-sm font-medium text-danger">
          <AlertCircle aria-hidden="true" size={18} className="shrink-0" />
          {t.form.checkFields(errorCount)}
        </p>
      )}

      {status === 'error' && (
        <div ref={resultRef} tabIndex={-1} role="alert" className="fx-in mt-5 rounded-lg border border-danger/25 bg-danger/5 p-4 text-[0.9375rem] focus:outline-none">
          <p className="font-semibold text-danger">{t.form.errorTitle}</p>
          <p className="mt-1 text-ink-2">
            {t.form.errorBefore}
            <a href={mailtoHref} dir="ltr" className="font-semibold text-cobalt underline underline-offset-4">
              {site.contact.email}
            </a>
            {t.form.errorAfter}
          </p>
        </div>
      )}

      {status === 'email-opened' && (
        <div ref={resultRef} tabIndex={-1} role="status" className="fx-in mt-5 rounded-lg border border-cobalt/25 bg-cobalt-soft/60 p-4 text-[0.9375rem] focus:outline-none">
          <p className="font-semibold">{t.form.emailOpenedTitle}</p>
          <p className="mt-1 text-ink-2">
            {t.form.emailOpenedBefore}
            <a href={mailtoHref} dir="ltr" className="font-semibold text-cobalt underline underline-offset-4">
              {site.contact.email}
            </a>
            {t.form.emailOpenedAfter}
          </p>
          <button type="button" onClick={copyDetails} className={buttonClasses('secondary', 'md', 'mt-3')}>
            <Copy aria-hidden="true" size={16} />
            {copyState === 'copied' ? t.form.detailsCopied : copyState === 'unavailable' ? t.form.copyUnavailable : t.form.copyDetails}
          </button>
        </div>
      )}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button type="submit" disabled={isSubmitting} aria-disabled={isSubmitting} className={buttonClasses('primary', 'lg', 'w-full sm:w-auto')}>
          {isSubmitting ? (
            <>
              <Loader2 aria-hidden="true" size={18} className="animate-spin motion-reduce:animate-none" />
              {t.form.sending}
            </>
          ) : isConnected ? (
            <>
              <Send aria-hidden="true" size={17} />
              {t.form.send}
            </>
          ) : (
            <>
              <Mail aria-hidden="true" size={18} />
              {t.form.openEmail}
            </>
          )}
        </button>
        <p className="text-sm text-ink-3">
          {isConnected ? t.form.sentDirect : t.form.mailtoNote}
        </p>
      </div>
      <p className="sr-only" role="status" aria-live="polite">
        {isSubmitting ? t.form.sending : ''}
      </p>
    </form>
  )
}

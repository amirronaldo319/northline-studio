import { useRef, useState, type ChangeEvent, type FormEvent } from 'react'
import { AlertCircle, CheckCircle2, ChevronDown, Copy, Loader2, Mail } from 'lucide-react'
import { formEndpoint } from '@/config/env'
import { mailtoHref, site } from '@/config/site'
import {
  BUSINESS_TYPES,
  NEED_OPTIONS,
  buildMailtoUrl,
  emptyInquiry,
  formatInquiryText,
  submitInquiry,
  validateInquiry,
  type Inquiry,
  type InquiryErrors,
  type InquiryField,
} from '@/lib/inquiry'
import { buttonClasses } from '../ui/button'
import { Field } from './fields'
import { describedBy, inputClasses } from './fieldStyles'

type Status = 'idle' | 'submitting' | 'success' | 'error' | 'email-opened'

const FIELD_ORDER: InquiryField[] = ['name', 'business', 'email', 'phone', 'website', 'message']
const isConnected = formEndpoint.length > 0

export function InquiryForm() {
  const [values, setValues] = useState<Inquiry>(emptyInquiry)
  const [errors, setErrors] = useState<InquiryErrors>({})
  const [hasAttempted, setHasAttempted] = useState(false)
  const [status, setStatus] = useState<Status>('idle')
  const [honeypot, setHoneypot] = useState('')
  const [copyLabel, setCopyLabel] = useState('Copy my details')
  const isSubmittingRef = useRef(false)
  const formRef = useRef<HTMLFormElement>(null)
  const resultRef = useRef<HTMLDivElement>(null)

  const update = (field: InquiryField) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const next = { ...values, [field]: event.target.value }
    setValues(next)
    if (hasAttempted) setErrors(validateInquiry(next))
    if (status === 'error' || status === 'email-opened') setStatus('idle')
  }

  const focusFirstError = (found: InquiryErrors) => {
    const first = FIELD_ORDER.find((field) => found[field])
    if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus()
  }

  const showResult = (next: Status) => {
    setStatus(next)
    requestAnimationFrame(() => resultRef.current?.focus())
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (isSubmittingRef.current) return

    setHasAttempted(true)
    const found = validateInquiry(values)
    setErrors(found)
    if (Object.keys(found).length > 0) {
      focusFirstError(found)
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
      setCopyLabel('Copied')
    } catch {
      setCopyLabel('Copy unavailable — please email me')
    }
  }

  const resetForm = () => {
    setValues(emptyInquiry)
    setErrors({})
    setHasAttempted(false)
    setStatus('idle')
    requestAnimationFrame(() => formRef.current?.querySelector<HTMLElement>('[name="name"]')?.focus())
  }

  if (status === 'success') {
    return (
      <div ref={resultRef} tabIndex={-1} role="status" className="rounded-[1.25rem] border border-success/25 bg-white p-6 focus:outline-none sm:p-8">
        <CheckCircle2 aria-hidden="true" size={32} className="text-success" />
        <h3 className="mt-4 text-2xl font-semibold">Thanks, {values.name.trim().split(' ')[0]}. Your inquiry was sent.</h3>
        <p className="mt-3 leading-relaxed text-ink-2">
          I’ll read the details for {values.business.trim()} and reply to {values.email.trim()} to talk through scope and
          next steps.
        </p>
        <button type="button" onClick={resetForm} className={buttonClasses('secondary', 'md', 'mt-6')}>
          Send another inquiry
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
      className="relative rounded-[1.25rem] border border-line bg-white p-5 shadow-soft sm:p-8"
    >
      <p className="mb-6 text-sm text-ink-3">All fields are required unless marked optional.</p>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="inquiry-name" label="Name" error={errors.name}>
          <input {...fieldProps('name')} type="text" autoComplete="name" required className={inputClasses} />
        </Field>
        <Field id="inquiry-business" label="Business name" error={errors.business}>
          <input {...fieldProps('business')} type="text" autoComplete="organization" required className={inputClasses} />
        </Field>
        <Field id="inquiry-email" label="Email" error={errors.email}>
          <input {...fieldProps('email')} type="email" autoComplete="email" inputMode="email" required className={inputClasses} />
        </Field>
        <Field id="inquiry-phone" label="Phone" isOptional error={errors.phone}>
          <input {...fieldProps('phone')} type="tel" autoComplete="tel" inputMode="tel" className={inputClasses} />
        </Field>
        <Field id="inquiry-businessType" label="Business type" isOptional>
          <div className="relative">
            <select {...fieldProps('businessType')} className={`${inputClasses} appearance-none pr-10`}>
              <option value="">Choose one</option>
              {BUSINESS_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <ChevronDown aria-hidden="true" size={18} className="pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2 text-ink-3" />
          </div>
        </Field>
        <Field id="inquiry-website" label="Existing website" isOptional error={errors.website} hint="If you have one.">
          <input
            {...fieldProps('website', true)}
            type="text"
            inputMode="url"
            autoComplete="url"
            placeholder="yourbusiness.ca"
            spellCheck={false}
            autoCapitalize="none"
            className={inputClasses}
          />
        </Field>
      </div>

      <fieldset className="mt-6">
        <legend className="mb-2.5 flex items-baseline gap-1.5 text-[0.9375rem] font-semibold">
          What are you looking for? <span className="text-sm font-normal text-ink-3">(optional)</span>
        </legend>
        <div className="flex flex-wrap gap-2">
          {NEED_OPTIONS.map((option) => (
            <label key={option} className="cursor-pointer">
              <input
                type="radio"
                name="need"
                value={option}
                checked={values.need === option}
                onChange={update('need')}
                className="peer sr-only"
              />
              <span className="inline-flex min-h-11 items-center rounded-full border border-line-strong bg-white px-4 text-[0.9375rem] font-medium text-ink-2 transition-colors peer-checked:border-cobalt peer-checked:bg-cobalt-soft peer-checked:text-ink peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-cobalt hover:border-ink/40">
                {option}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <Field id="inquiry-message" label="What do you need?" error={errors.message} hint="A few sentences is plenty: your services, and what you’d like the website to do." className="mt-6">
        <textarea {...fieldProps('message', true)} rows={5} required className={`${inputClasses} resize-y`} />
      </Field>

      {/* Honeypot: hidden from people, often filled in by bots. The form service discards those. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="inquiry-gotcha">Leave this field empty</label>
        <input id="inquiry-gotcha" type="text" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
      </div>

      {hasAttempted && errorCount > 0 && (
        <p role="alert" className="mt-6 flex items-center gap-2 rounded-xl bg-danger/8 px-4 py-3 text-sm font-medium text-danger">
          <AlertCircle aria-hidden="true" size={18} className="shrink-0" />
          Please check the {errorCount === 1 ? 'highlighted field' : `${errorCount} highlighted fields`}.
        </p>
      )}

      {status === 'error' && (
        <div ref={resultRef} tabIndex={-1} role="alert" className="mt-6 rounded-xl border border-danger/25 bg-danger/5 p-4 text-[0.9375rem] focus:outline-none">
          <p className="font-semibold text-danger">Sorry, your inquiry couldn’t be sent.</p>
          <p className="mt-1 text-ink-2">
            Your details are still here. Please try again, or email me at{' '}
            <a href={mailtoHref} className="font-semibold text-cobalt underline underline-offset-4">
              {site.contact.email}
            </a>
            .
          </p>
        </div>
      )}

      {status === 'email-opened' && (
        <div ref={resultRef} tabIndex={-1} role="status" className="mt-6 rounded-xl border border-cobalt/25 bg-cobalt-soft/60 p-4 text-[0.9375rem] focus:outline-none">
          <p className="font-semibold">Your email app should now be open with your details filled in.</p>
          <p className="mt-1 text-ink-2">
            Press send there to reach me. Nothing has been sent yet. If no email window opened, copy your details and send
            them to{' '}
            <a href={mailtoHref} className="font-semibold text-cobalt underline underline-offset-4">
              {site.contact.email}
            </a>
            .
          </p>
          <button type="button" onClick={copyDetails} className={buttonClasses('secondary', 'md', 'mt-3')}>
            <Copy aria-hidden="true" size={16} />
            {copyLabel}
          </button>
        </div>
      )}

      <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" disabled={isSubmitting} aria-disabled={isSubmitting} className={buttonClasses('primary', 'lg', 'w-full sm:w-auto')}>
          {isSubmitting ? (
            <>
              <Loader2 aria-hidden="true" size={18} className="animate-spin motion-reduce:animate-none" />
              Sending…
            </>
          ) : isConnected ? (
            'Request My Website'
          ) : (
            <>
              <Mail aria-hidden="true" size={18} />
              Request My Website
            </>
          )}
        </button>
        <p className="text-sm text-ink-3 sm:max-w-[18rem] sm:text-right">
          {isConnected
            ? 'I’ll reply by email. Your details are only used to respond to your inquiry.'
            : 'This opens your email app with your details ready to send.'}
        </p>
      </div>
      <p className="sr-only" role="status" aria-live="polite">
        {isSubmitting ? 'Sending your inquiry…' : ''}
      </p>
    </form>
  )
}

import { useState, lazy, Suspense } from 'react'
import { profileFacts } from '../content/profile'
import { ErrorBoundary } from './ErrorBoundary'

const ContactOrbCanvas = lazy(() =>
  import('./ContactOrbCanvas').then((m) => ({ default: m.ContactOrbCanvas }))
)

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    _honey: '',
  })
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Bot detection via honeypot field
    if (formData._honey) {
      setStatus('success')
      return
    }

    setStatus('submitting')
    setErrorMessage('')

    try {
      const targetEmail = profileFacts.contact.email
      const endpoint = `https://formsubmit.co/ajax/${targetEmail}`

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `[Portfolio Signal] Inquiry from ${formData.name}`,
          _template: 'table',
          _captcha: 'false',
        }),
      })

      const data = await response.json()

      if (response.ok && (data.success === 'true' || data.success === true)) {
        setStatus('success')
        setFormData({ name: '', email: '', message: '', _honey: '' })
      } else {
        throw new Error(data.message || 'Submission failed. Please try again or use direct email.')
      }
    } catch (err: unknown) {
      console.error('Contact submission error:', err)
      setStatus('error')
      setErrorMessage(
        err instanceof Error
          ? err.message
          : 'Unable to route transmission. You can reach out directly via email.'
      )
    }
  }

  if (status === 'success') {
    return (
      <div className="relative overflow-hidden flex h-full min-h-[380px] flex-col items-center justify-center border border-signal/40 bg-ink-soft/85 p-8 text-center shadow-[0_0_35px_rgba(255,138,61,0.15)] transition-all duration-500">
        <ErrorBoundary fallback={null}>
          <Suspense fallback={null}>
            <ContactOrbCanvas />
          </Suspense>
        </ErrorBoundary>
        <div className="relative z-10 flex flex-col items-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-signal bg-signal-soft text-signal shadow-[0_0_15px_rgba(255,138,61,0.25)]">
            <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <span className="font-mono text-[11px] uppercase tracking-widest text-signal">
            Transmission Confirmed
          </span>
          <h3 className="mt-2 font-display text-2xl font-bold text-paper">Signal Dispatched</h3>
          <p className="mt-3 max-w-sm font-body text-sm leading-relaxed text-muted">
            Your message has been routed directly to <span className="text-paper font-mono text-xs">{profileFacts.contact.email}</span>. I will review and respond shortly.
          </p>
          <button
            onClick={() => setStatus('idle')}
            className="mt-6 border border-line bg-ink/90 px-4 py-2 font-mono text-xs uppercase tracking-wider text-signal transition hover:border-signal hover:text-paper"
          >
            Send Another Signal ←
          </button>
        </div>
      </div>
    )
  }

  const mailtoFallback = `mailto:${profileFacts.contact.email}?subject=${encodeURIComponent(
    `[Portfolio Signal] Inquiry from ${formData.name || 'Visitor'}`
  )}&body=${encodeURIComponent(formData.message || '')}`

  return (
    <div className="relative overflow-hidden border border-line/80 bg-ink-soft/80 p-6 sm:p-8 backdrop-blur shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
      {/* 3D Reactive Orb Background */}
      <ErrorBoundary fallback={null}>
        <Suspense fallback={null}>
          <ContactOrbCanvas />
        </Suspense>
      </ErrorBoundary>

      <form onSubmit={handleSubmit} className="pointer-events-none relative z-10">
      {/* Honeypot field for bot protection (hidden) */}
      <input
        type="text"
        name="_honey"
        value={formData._honey}
        onChange={handleChange}
        style={{ display: 'none' }}
        tabIndex={-1}
        autoComplete="off"
      />

      <div className="grid gap-6">
        <div className="pointer-events-auto">
          <div className="mb-2 flex items-center justify-between">
            <label htmlFor="name" className="font-mono text-xs uppercase tracking-normal text-muted">
              Name
            </label>
            <span className="font-mono text-[10px] text-muted/60">REQUIRED</span>
          </div>
          <input
            required
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            disabled={status === 'submitting'}
            className="w-full border-b border-line/90 bg-ink/40 px-3 py-2.5 font-body text-paper placeholder-muted/40 transition focus:border-signal focus:bg-ink/75 focus:outline-none disabled:opacity-50"
            placeholder="Shreyas Mudholkar"
          />
        </div>

        <div className="pointer-events-auto">
          <div className="mb-2 flex items-center justify-between">
            <label htmlFor="email" className="font-mono text-xs uppercase tracking-normal text-muted">
              Email Address
            </label>
            <span className="font-mono text-[10px] text-muted/60">REQUIRED</span>
          </div>
          <input
            required
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            disabled={status === 'submitting'}
            className="w-full border-b border-line/90 bg-ink/40 px-3 py-2.5 font-body text-paper placeholder-muted/40 transition focus:border-signal focus:bg-ink/75 focus:outline-none disabled:opacity-50"
            placeholder="shreyasmudholkar12345@gmail.com"
          />
        </div>

        <div className="pointer-events-auto">
          <div className="mb-2 flex items-center justify-between">
            <label htmlFor="message" className="font-mono text-xs uppercase tracking-normal text-muted">
              Message
            </label>
            <span className="font-mono text-[10px] text-muted/60">REQUIRED</span>
          </div>
          <textarea
            required
            id="message"
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            disabled={status === 'submitting'}
            className="w-full resize-none border-b border-line/90 bg-ink/40 px-3 py-2.5 font-body text-paper placeholder-muted/40 transition focus:border-signal focus:bg-ink/75 focus:outline-none disabled:opacity-50"
            placeholder="How can we collaborate or what's on your mind?"
          />
        </div>

        {status === 'error' && (
          <div className="pointer-events-auto border border-red-500/40 bg-red-950/30 p-4 font-mono text-xs text-red-200">
            <p className="font-semibold text-red-400">Transmission Alert:</p>
            <p className="mt-1 text-muted/90">{errorMessage}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <a
                href={mailtoFallback}
                className="inline-flex items-center gap-1.5 border border-red-400/50 bg-red-900/30 px-3 py-1 text-paper hover:bg-red-800/40"
              >
                Send via Email Client ↗
              </a>
              <button
                type="button"
                onClick={() => setStatus('idle')}
                className="border border-line px-3 py-1 text-muted hover:text-paper"
              >
                Retry Form
              </button>
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={status === 'submitting'}
          data-magnetic
          className="pointer-events-auto group mt-2 inline-flex h-11 w-full items-center justify-between border border-line bg-ink/90 px-5 font-mono text-xs uppercase tracking-normal text-paper transition hover:border-signal hover:text-signal disabled:cursor-not-allowed disabled:opacity-50 shadow-[0_0_20px_rgba(255,138,61,0.12)]"
        >
          <span className="flex items-center gap-2">
            {status === 'submitting' && (
              <span className="h-2 w-2 animate-ping rounded-full bg-signal" />
            )}
            {status === 'submitting' ? 'Transmitting Signal...' : 'Send Message'}
          </span>
          <svg
            className="h-4 w-4 transition-transform group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>

        <p className="pointer-events-none text-center font-mono text-[10px] tracking-wide text-muted/60">
          Dispatches directly to {profileFacts.contact.email} • End-to-end verified
        </p>
      </div>
    </form>
    </div>
  )
}

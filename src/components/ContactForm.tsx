import { useState } from 'react'

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('submitting')
    // Simulate network request
    setTimeout(() => {
      setStatus('success')
    }, 1200)
  }

  if (status === 'success') {
    return (
      <div className="flex h-full min-h-64 flex-col items-center justify-center border border-line bg-ink-soft p-8 text-center transition-all duration-500">
        <div className="mb-4 h-12 w-12 rounded-full border border-signal bg-signal-soft text-signal grid place-items-center">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-display text-2xl font-semibold text-paper">Signal Sent</h3>
        <p className="mt-2 text-muted">Thank you for reaching out. I'll get back to you shortly.</p>
        <button 
          onClick={() => setStatus('idle')}
          className="mt-6 font-mono text-xs uppercase text-signal hover:text-paper transition"
        >
          Send another
        </button>
      </div>
    )
  }

  return (
    <form 
      onSubmit={handleSubmit}
      className="border border-line bg-ink-soft p-6 sm:p-8"
      data-magnetic
    >
      <div className="grid gap-6">
        <div>
          <label htmlFor="name" className="mb-2 block font-mono text-xs uppercase tracking-normal text-muted">Name</label>
          <input 
            required
            id="name"
            name="name"
            type="text" 
            className="w-full border-b border-line bg-transparent px-0 py-2 text-paper placeholder-muted/50 transition focus:border-signal focus:outline-none"
            placeholder="Shreyas Mudholkar"
          />
        </div>
        
        <div>
          <label htmlFor="email" className="mb-2 block font-mono text-xs uppercase tracking-normal text-muted">Email</label>
          <input 
            required
            id="email"
            name="email"
            type="email" 
            className="w-full border-b border-line bg-transparent px-0 py-2 text-paper placeholder-muted/50 transition focus:border-signal focus:outline-none"
            placeholder="shreyasmudholkar12345@gmail.com"
          />
        </div>
        
        <div>
          <label htmlFor="message" className="mb-2 block font-mono text-xs uppercase tracking-normal text-muted">Message</label>
          <textarea 
            required
            id="message"
            name="message"
            rows={4}
            className="w-full resize-none border-b border-line bg-transparent px-0 py-2 text-paper placeholder-muted/50 transition focus:border-signal focus:outline-none"
            placeholder="How can we collaborate or what's on your mind?"
          />
        </div>

        <button 
          type="submit" 
          disabled={status === 'submitting'}
          className="group mt-2 inline-flex h-11 w-full items-center justify-between border border-line bg-ink px-5 font-mono text-xs uppercase tracking-normal text-paper transition hover:border-signal hover:text-signal disabled:opacity-50"
        >
          <span>{status === 'submitting' ? 'Transmitting...' : 'Send Message'}</span>
          <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </form>
  )
}

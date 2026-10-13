import { useState } from 'react'
import './ContactForm.css'

type Status =
  | { kind: 'idle' }
  | { kind: 'sending' }
  | { kind: 'sent' }
  | { kind: 'error', message: string }

const FALLBACK_ERROR = "Your message couldn't be sent. Please try again later or reach out on LinkedIn."

function ContactForm() {
  const [status, setStatus] = useState<Status>({ kind: 'idle' })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form))
    setStatus({ kind: 'sending' })

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      // A missing API (e.g. under `npm run dev`) answers with HTML, not JSON
      const body = await res.json().catch(() => ({}))
      if (!res.ok) {
        setStatus({ kind: 'error', message: body.error ?? FALLBACK_ERROR })
        return
      }
      form.reset()
      setStatus({ kind: 'sent' })
    } catch {
      setStatus({ kind: 'error', message: FALLBACK_ERROR })
    }
  }

  if (status.kind === 'sent') {
    return (
      <div className='contact-status' role='status'>
        <p>Thanks! Your message is on its way, and I'll get back to you soon.</p>
        <button type='button' className='link-button contact-submit' onClick={() => setStatus({ kind: 'idle' })}>
          Send another
        </button>
      </div>
    )
  }

  const sending = status.kind === 'sending'

  return (
    <form className='contact-form' onSubmit={handleSubmit}>
      <label>
        Name
        <input name='name' type='text' autoComplete='name' required maxLength={100} disabled={sending} />
      </label>
      <label>
        Email
        <input name='email' type='email' autoComplete='email' required maxLength={254} disabled={sending} />
      </label>
      <label>
        {/* One span, so the label's flex column doesn't put "(optional)" on its own line */}
        <span>Phone <span className='contact-optional'>(optional)</span></span>
        <input
          name='phone'
          type='tel'
          autoComplete='tel'
          maxLength={30}
          // Browsers compile this with the regex `v` flag, which requires ( ) - to be escaped
          pattern={String.raw`[0-9+\(\)\.\s\-]*`}
          title='Digits, spaces and + ( ) - . only'
          disabled={sending}
        />
      </label>
      <label>
        Message
        <textarea name='message' rows={5} required maxLength={5000} disabled={sending} />
      </label>

      {/* Honeypot: hidden from people and screen readers, so only bots fill it in */}
      <div className='contact-honeypot' aria-hidden='true'>
        <label>
          Website
          <input name='website' type='text' tabIndex={-1} autoComplete='off' />
        </label>
      </div>

      <div className='contact-actions'>
        <button type='submit' className='link-button contact-submit' disabled={sending}>
          {sending ? 'Sending…' : 'Send message'}
        </button>
        <p className='contact-note'>Your details are only used to reply to you.</p>
      </div>

      {status.kind === 'error' && (
        <p className='contact-error' role='alert'>{status.message}</p>
      )}
    </form>
  )
}

export default ContactForm

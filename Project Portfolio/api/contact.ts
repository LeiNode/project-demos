// Vercel function behind the Connect page's contact form. It checks the
// submission and emails it to me through Resend's API. Nothing is stored, and
// visitors' details are never logged.
//
// Environment variables (set in Vercel → Project → Settings → Environment Variables):
//   RESEND_API_KEY      API key from resend.com
//   CONTACT_TO_EMAIL    where messages go
//   CONTACT_FROM_EMAIL  optional sender; defaults to Resend's shared test sender,
//                       which can only deliver to the Resend account's own address

declare const process: { env: Record<string, string | undefined> }

const MAX_BODY_BYTES = 10_000
const LIMITS = { name: 100, email: 254, phone: 30, message: 5000 }

// Best-effort only: each function instance keeps its own counts, and Vercel
// may run several instances, so this slows down a spammer rather than stopping one.
const RATE_LIMIT = 5
const RATE_WINDOW_MS = 10 * 60 * 1000
const recentByIp = new Map<string, number[]>()

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_PATTERN = /^[0-9+().\-\s]*$/

export type ContactFields = { name: string, email: string, phone: string, message: string }

const json = (status: number, body: object) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } })

// Collapses line breaks so a value can't add lines to the email's subject
const singleLine = (s: string) => s.replace(/[\r\n]+/g, ' ').trim()

export function validate(input: unknown): { fields: ContactFields } | { error: string } {
  const raw = (input ?? {}) as Record<string, unknown>
  const str = (key: string) => (typeof raw[key] === 'string' ? (raw[key] as string) : '')

  const fields = {
    name: singleLine(str('name')),
    email: singleLine(str('email')),
    phone: singleLine(str('phone')),
    message: str('message').trim(),
  }

  if (!fields.name) return { error: 'Please enter your name.' }
  if (!EMAIL_PATTERN.test(fields.email)) return { error: 'Please enter a valid email address.' }
  if (!PHONE_PATTERN.test(fields.phone)) return { error: 'Phone numbers can only contain digits, spaces and + ( ) - .' }
  if (!fields.message) return { error: 'Please enter a message.' }
  for (const key of Object.keys(LIMITS) as (keyof typeof LIMITS)[]) {
    if (fields[key].length > LIMITS[key]) return { error: `Your ${key} is too long.` }
  }
  return { fields }
}

function isRateLimited(ip: string, now: number) {
  const recent = (recentByIp.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS)
  recent.push(now)
  recentByIp.set(ip, recent)
  return recent.length > RATE_LIMIT
}

export async function POST(request: Request): Promise<Response> {
  // Browsers always send Origin on a cross-site POST, so this stops other
  // sites from submitting the form on a visitor's behalf
  const origin = request.headers.get('origin')
  if (origin && new URL(origin).host !== new URL(request.url).host) {
    return json(403, { error: 'Forbidden.' })
  }

  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_TO_EMAIL
  if (!apiKey || !to) {
    console.error('Contact form is not configured: set RESEND_API_KEY and CONTACT_TO_EMAIL')
    return json(500, { error: "The contact form isn't set up yet. Please reach out on LinkedIn instead." })
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown'
  if (isRateLimited(ip, Date.now())) {
    return json(429, { error: 'Too many messages. Please try again in a few minutes.' })
  }

  const text = await request.text()
  if (text.length > MAX_BODY_BYTES) return json(413, { error: 'Your message is too long.' })

  let body: unknown
  try {
    body = JSON.parse(text)
  } catch {
    return json(400, { error: 'Invalid request.' })
  }

  // Honeypot: a hidden field people never see, so anything in it came from a bot.
  // Answers as if it worked so the bot doesn't learn to skip it.
  if (typeof (body as Record<string, unknown>)?.website === 'string' && (body as Record<string, string>).website !== '') {
    return json(200, { ok: true })
  }

  const result = validate(body)
  if ('error' in result) return json(400, { error: result.error })
  const { name, email, phone, message } = result.fields

  // Plain text only, so nothing a visitor types is rendered as HTML in my inbox
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL || 'Portfolio Contact <onboarding@resend.dev>',
      to: [to],
      reply_to: email,
      subject: `Portfolio message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || '(not given)'}\n\n${message}`,
    }),
  })

  if (!res.ok) {
    // Status only; the response body could echo the visitor's details
    console.error(`Resend rejected the email: HTTP ${res.status}`)
    return json(502, { error: "Your message couldn't be sent. Please try again later or reach out on LinkedIn." })
  }

  return json(200, { ok: true })
}

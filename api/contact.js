import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const BASE = `
  font-family: 'Helvetica Neue', Arial, sans-serif;
  background: #F7F4EF;
  padding: 48px 24px;
  margin: 0;
`
const CARD = `
  background: #ffffff;
  max-width: 560px;
  margin: 0 auto;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid #E8E2D9;
`
const HEADER = `
  background: #1C1A18;
  padding: 28px 36px;
`
const BODY = `padding: 36px;`
const LABEL = `
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #8A8078;
  margin: 0 0 4px;
`
const VALUE = `
  font-size: 15px;
  color: #1C1A18;
  margin: 0 0 20px;
  line-height: 1.6;
`
const DIVIDER = `border: none; border-top: 1px solid #E8E2D9; margin: 24px 0;`
const FOOTER = `
  font-size: 12px;
  color: #8A8078;
  text-align: center;
  padding: 20px 36px 28px;
  line-height: 1.6;
`

function notificationHtml({ firstName, lastName, email, service, message }) {
  return `
    <body style="${BASE}">
      <div style="${CARD}">
        <div style="${HEADER}">
          <span style="font-size:12px;letter-spacing:0.15em;text-transform:uppercase;color:#8A8078;">MRC Digital</span>
          <h1 style="font-size:20px;color:#ffffff;margin:8px 0 0;font-weight:500;">New Inquiry</h1>
        </div>
        <div style="${BODY}">
          <p style="${LABEL}">From</p>
          <p style="${VALUE}">${firstName} ${lastName}</p>
          <p style="${LABEL}">Email</p>
          <p style="${VALUE}"><a href="mailto:${email}" style="color:#2E7D5E;">${email}</a></p>
          <p style="${LABEL}">Service</p>
          <p style="${VALUE}">${service || 'Not specified'}</p>
          ${message ? `<hr style="${DIVIDER}" /><p style="${LABEL}">Message</p><p style="${VALUE}">${message.replace(/\n/g, '<br>')}</p>` : ''}
        </div>
        <div style="${FOOTER}">Reply directly to this email to respond to ${firstName}.</div>
      </div>
    </body>
  `
}

function confirmationHtml({ firstName, service, message }) {
  return `
    <body style="${BASE}">
      <div style="${CARD}">
        <div style="${HEADER}">
          <span style="font-size:12px;letter-spacing:0.15em;text-transform:uppercase;color:#8A8078;">MRC Digital Consulting</span>
          <h1 style="font-size:20px;color:#ffffff;margin:8px 0 0;font-weight:500;">Thanks for reaching out, ${firstName}.</h1>
        </div>
        <div style="${BODY}">
          <p style="font-size:15px;color:#3A3530;line-height:1.7;margin:0 0 20px;">
            I've received your inquiry and I'm reviewing it now. I'll reach out within a few days to set up a call.
          </p>
          <p style="font-size:15px;color:#3A3530;line-height:1.7;margin:0 0 28px;">
            In the meantime, if anything changes or you have more to add, just reply to this email.
          </p>
          ${service || message ? `
          <hr style="${DIVIDER}" />
          <p style="${LABEL}">Your inquiry</p>
          ${service ? `<p style="${VALUE}"><strong>Service:</strong> ${service}</p>` : ''}
          ${message ? `<p style="${VALUE}">${message.replace(/\n/g, '<br>')}</p>` : ''}
          ` : ''}
        </div>
        <div style="${FOOTER}">
          Michael Chen · MRC Digital Consulting<br>
          <a href="https://mrcdigital.io" style="color:#2E7D5E;">mrcdigital.io</a>
        </div>
      </div>
    </body>
  `
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { firstName, lastName, email, service, message } = req.body

  if (!firstName || !email) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  try {
    await Promise.all([
      resend.emails.send({
        from: 'MRC Digital <contact@contact.mrcdigital.io>',
        to: 'michael@mrcdigital.io',
        reply_to: email,
        subject: `New inquiry from ${firstName} ${lastName}`,
        html: notificationHtml({ firstName, lastName, email, service, message }),
      }),
      resend.emails.send({
        from: 'Michael Chen at MRC Digital <contact@contact.mrcdigital.io>',
        to: email,
        reply_to: 'michael@mrcdigital.io',
        subject: `Got your message, ${firstName} — talk soon.`,
        html: confirmationHtml({ firstName, service, message }),
      }),
    ])

    res.status(200).json({ ok: true })
  } catch (err) {
    console.error('Resend error:', err)
    res.status(500).json({ error: 'Failed to send email' })
  }
}

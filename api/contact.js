import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { firstName, lastName, email, service, message } = req.body

  if (!firstName || !email) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  try {
    await resend.emails.send({
      from: 'MRC Digital <contact@contact.mrcdigital.io>',
      to: 'michael@mrcdigital.io',
      reply_to: email,
      subject: `New inquiry from ${firstName} ${lastName}`,
      text: [
        `Name: ${firstName} ${lastName}`,
        `Email: ${email}`,
        `Service: ${service || 'Not specified'}`,
        ``,
        `Message:`,
        message || '(none)',
      ].join('\n'),
    })

    res.status(200).json({ ok: true })
  } catch (err) {
    console.error('Resend error:', err)
    res.status(500).json({ error: 'Failed to send email' })
  }
}

import { useEffect, useState } from 'react'
import { useContactModal } from '../context/ContactModalContext'
import '../styles/contact-modal.css'

export default function ContactModal() {
  const { isOpen, close } = useContactModal()
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  // Close on Escape
  useEffect(() => {
    const handler = e => { if (e.key === 'Escape') close() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [close])

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const form = e.target
    const body = {
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      email: form.email.value,
      service: form.service.value,
      message: form.message.value,
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (!res.ok) throw new Error('Send failed')
      setSent(true)
      setTimeout(() => { setSent(false); close(); form.reset() }, 3000)
    } catch {
      setError('Something went wrong. Please email me directly at michael@mrcdigital.io.')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="cmodal-overlay" onClick={e => { if (e.target === e.currentTarget) close() }}>
      <div className="cmodal-box" role="dialog" aria-modal="true" aria-labelledby="cmodal-title">
        <button className="cmodal-close" onClick={close} aria-label="Close">×</button>

        {sent ? (
          <div className="cmodal-success">
            <div className="cmodal-success-icon">✓</div>
            <h3>Message sent!</h3>
            <p>I'll get back to you within one business day.</p>
          </div>
        ) : (
          <>
            <p className="cmodal-eyebrow">Get In Touch</p>
            <h2 id="cmodal-title" className="cmodal-title">Let's build something together</h2>
            <div className="cmodal-meta">
              <span>📧 michael@mrcdigital.com</span>
              <span>📍 Available Remotely, Worldwide</span>
            </div>

            <form className="cmodal-form" onSubmit={handleSubmit}>
              <div className="cmodal-row">
                <div className="cmodal-group">
                  <label className="cmodal-label">First Name</label>
                  <input name="firstName" type="text" className="cmodal-input" placeholder="Jane" required />
                </div>
                <div className="cmodal-group">
                  <label className="cmodal-label">Last Name</label>
                  <input name="lastName" type="text" className="cmodal-input" placeholder="Smith" required />
                </div>
              </div>
              <div className="cmodal-group">
                <label className="cmodal-label">Email</label>
                <input name="email" type="email" className="cmodal-input" placeholder="jane@company.com" required />
              </div>
              <div className="cmodal-group">
                <label className="cmodal-label">Service</label>
                <select name="service" className="cmodal-select">
                  <option value="">Select a service...</option>
                  <option>AI Customer Engagement Suite</option>
                  <option>Workflow Automation & AI Integration</option>
                  <option>Custom Applications & Internal Tools</option>
                  <option>Not Sure Yet</option>
                </select>
              </div>
              <div className="cmodal-group">
                <label className="cmodal-label">Tell Me About Your Project</label>
                <textarea name="message" className="cmodal-textarea" placeholder="What are you trying to build or solve?" />
              </div>
              {error && <p style={{ color: '#c0392b', fontSize: '0.85rem' }}>{error}</p>}
              <button type="submit" className="cmodal-submit" disabled={loading}>
                {loading ? 'Sending...' : 'Send Message →'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}

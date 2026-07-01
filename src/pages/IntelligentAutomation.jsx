import React, { useEffect, useState } from 'react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { useContactModal } from '../context/ContactModalContext'
import './intelligent-automation.css'

const WORKFLOWS = [
  {
    id: 'healthcare',
    label: 'Healthcare',
    description: 'Patient appointment lifecycle — from booking to re-engagement, fully automated.',
    nodes: [
      { type: 'trigger', icon: '📅', label: 'New Appt Booked',    sub: 'Trigger' },
      { type: 'action',  icon: '🏥', label: 'Update EHR',         sub: 'Google Sheets / EHR' },
      { type: 'action',  icon: '💬', label: 'Send Confirmation',  sub: 'SMS via Twilio' },
      { type: 'logic',   icon: '⏱', label: 'Wait 24 Hours',      sub: 'Delay Node' },
      { type: 'action',  icon: '🔔', label: 'Send Reminder',      sub: 'SMS + Email' },
      { type: 'logic',   icon: '↔',  label: 'If No-Show',         sub: 'Condition' },
      { type: 'output',  icon: '📲', label: 'Send Re-book Link',  sub: 'Automated Outreach' },
    ],
  },
  {
    id: 'hvac',
    label: 'HVAC',
    description: 'Turn every missed call into a booked job — automatically.',
    nodes: [
      { type: 'trigger', icon: '📞', label: 'Missed Call',        sub: 'Trigger' },
      { type: 'action',  icon: '💬', label: 'Text-Back Sent',     sub: 'SMS via Twilio' },
      { type: 'action',  icon: '👤', label: 'Lead Captured',      sub: 'CRM Entry' },
      { type: 'logic',   icon: '❓', label: 'Qualify via SMS',    sub: 'AI Qualification' },
      { type: 'action',  icon: '📅', label: 'Book Tech Slot',     sub: 'Calendar Booking' },
      { type: 'action',  icon: '🧾', label: 'Send Invoice',       sub: 'Stripe / QuickBooks' },
      { type: 'output',  icon: '⭐', label: 'Request Review',     sub: 'Google Review' },
    ],
  },
  {
    id: 'marketing',
    label: 'Marketing',
    description: 'Capture, nurture, and convert leads without lifting a finger.',
    nodes: [
      { type: 'trigger', icon: '📋', label: 'Form Submission',    sub: 'Trigger' },
      { type: 'action',  icon: '🗃',  label: 'Add to CRM',         sub: 'HubSpot / Salesforce' },
      { type: 'action',  icon: '🏷',  label: 'Tag & Segment',      sub: 'Lead Scoring' },
      { type: 'ai',      icon: '🧠', label: 'AI Reasoning',       sub: 'Score · Intent · Route' },
      { type: 'action',  icon: '📧', label: 'Start Email Seq.',   sub: 'Klaviyo / Mailchimp' },
      { type: 'logic',   icon: '↔',  label: 'If Opened Day 3',    sub: 'Condition' },
      { type: 'action',  icon: '📄', label: 'Send Case Study',    sub: 'Personalized Email' },
      { type: 'output',  icon: '🔔', label: 'Notify Sales',       sub: 'Slack Notification' },
    ],
  },
]

export default function IntelligentAutomation() {
  const { open: openModal } = useContactModal()
  const [activeTab, setActiveTab] = useState(0)

  useEffect(() => {
    const els = document.querySelectorAll('.ia-reveal')
    const io = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('ia-revealed'); io.unobserve(e.target) }
      }),
      { threshold: 0.1 }
    )
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  const workflow = WORKFLOWS[activeTab]

  return (
    <>
      <Nav />

      {/* HERO */}
      <section className="ia-hero">
        <div className="ia-hero-inner">
          <p className="ia-hero-eyebrow">Intelligent Automation</p>
          <h1 className="ia-hero-title">
            Stop doing work<br /><em>a machine can do.</em>
          </h1>
          <p className="ia-hero-sub">
            I build custom automation systems using n8n that eliminate repetitive work, connect your tools,
            and free your team to focus on what actually moves the needle.
          </p>
          <div className="ia-hero-actions">
            <button className="btn-primary" onClick={openModal}>Let's Connect</button>
            <a href="#workflows" className="ia-btn-ghost">See It In Action ↓</a>
          </div>
        </div>
      </section>

      {/* STATS */}
      <div className="ia-stats">
        {[
          { n: '11 hrs', label: 'lost per employee per week to manual, repetitive tasks' },
          { n: '94%',    label: 'of repetitive business tasks can be automated with existing tools' },
          { n: '6×',     label: 'faster execution speed vs. manual processes' },
          { n: '$30K+',  label: 'average annual savings per automated workflow' },
        ].map(s => (
          <div className="ia-stat-item ia-reveal" key={s.n}>
            <div className="ia-stat-num">{s.n}</div>
            <div className="ia-stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* PROBLEM */}
      <section className="ia-section" id="problem">
        <p className="section-label ia-reveal">The Problem</p>
        <h2 className="section-title ia-reveal">Your team is doing<br />work that shouldn't exist</h2>
        <p className="section-sub ia-reveal">
          Every hour spent copy-pasting, chasing follow-ups, and manually moving data between tools
          is revenue you're leaving on the table.
        </p>
        <div className="ia-problem-grid">
          {[
            {
              title: "Your tools don't talk to each other",
              body: "Data lives in silos. Your CRM doesn't update when a form is submitted. Your calendar doesn't sync when a payment clears. Your team fills in the gaps manually.",
            },
            {
              title: 'Manual work = human error',
              body: 'Fat-finger mistakes, missed follow-ups, inconsistent data. Every manual handoff is a chance for something to fall through the cracks — and it does.',
            },
            {
              title: "You're paying people to do robot work",
              body: "Skilled employees spending hours on data entry, copy-paste, and status updates. That's not why you hired them. That's not where your money should go.",
            },
          ].map(p => (
            <div className="ia-problem-card ia-reveal" key={p.title}>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WORKFLOW SHOWCASE */}
      <section className="ia-section ia-section--warm" id="workflows">
        <p className="section-label ia-reveal">Real Automations</p>
        <h2 className="section-title ia-reveal">What automation looks like<br />in your industry</h2>
        <p className="section-sub ia-reveal">
          These are real workflows I build — not hypotheticals. Click a tab to see how the pieces connect.
        </p>

        <div className="ia-tabs ia-reveal">
          {WORKFLOWS.map((w, i) => (
            <button
              key={w.id}
              className={`ia-tab${activeTab === i ? ' ia-tab--active' : ''}`}
              onClick={() => setActiveTab(i)}
            >
              {w.label}
            </button>
          ))}
        </div>

        <div className="ia-workflow-panel ia-reveal">
          <p className="ia-workflow-desc">{workflow.description}</p>
          <div className="ia-workflow-scroll">
            <div className="ia-workflow-graph">
              {workflow.nodes.map((node, i) => (
                <React.Fragment key={node.label}>
                  <div className={`ia-node ia-node--${node.type}`}>
                    <div className="ia-node-icon">{node.icon}</div>
                    <div className="ia-node-label">{node.label}</div>
                    <div className="ia-node-sub">{node.sub}</div>
                  </div>
                  {i < workflow.nodes.length - 1 && (
                    <div className="ia-connector">
                      <div className="ia-connector-line" />
                      <div className="ia-connector-arrow">›</div>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className="ia-node-legend">
            {[
              { type: 'trigger', label: 'Trigger' },
              { type: 'action',  label: 'Action' },
              { type: 'logic',   label: 'Logic / Condition' },
              { type: 'ai',      label: 'AI Reasoning' },
              { type: 'output',  label: 'Output' },
            ].map(l => (
              <div key={l.type} className="ia-legend-item">
                <div className={`ia-legend-dot ia-legend-dot--${l.type}`} />
                <span>{l.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="ia-section ia-section--dark" id="use-cases">
        <p className="section-label ia-reveal" style={{ color: 'var(--accent-light)' }}>Use Cases</p>
        <h2 className="section-title ia-reveal" style={{ color: 'var(--paper)' }}>
          If it's repetitive,<br />it can be automated.
        </h2>
        <p className="section-sub ia-reveal" style={{ color: 'var(--light)' }}>
          A sample of what I've built for clients — and what I can build for you.
        </p>
        <div className="ia-usecase-grid">
          {[
            { icon: '🎯', title: 'Lead Capture & CRM Sync',      desc: 'Form submitted → CRM updated, lead tagged, owner notified — all in under 3 seconds.' },
            { icon: '📅', title: 'Appointment Reminders',         desc: 'Automated SMS and email reminders at 24hr and 1hr before. No-shows drop significantly.' },
            { icon: '🧾', title: 'Invoice & Payment Workflows',   desc: 'Job completed → invoice generated → payment link sent → receipt filed automatically.' },
            { icon: '📊', title: 'Report Generation',             desc: 'Weekly KPI reports pulled from your tools, formatted, and sent to your inbox every Monday.' },
            { icon: '📱', title: 'Social Media Scheduling',       desc: 'New blog post or product → content drafted, scheduled, and published across platforms.' },
            { icon: '🔔', title: 'Internal Notifications',        desc: "New client? Big sale? Team alerted in Slack before you even look up from your screen." },
            { icon: '🔄', title: 'Data Sync Between Apps',        desc: 'Keep your CRM, accounting software, and spreadsheets in perfect sync — zero manual exports.' },
            { icon: '✉️', title: 'Follow-up Sequences',           desc: "Lead goes cold? Automated nudge sequences re-engage them without anyone picking up the phone." },
            { icon: '📄', title: 'Document Generation',           desc: 'Contracts, proposals, and onboarding docs auto-generated from templates when a deal closes.' },
          ].map(u => (
            <div className="ia-usecase-card ia-reveal" key={u.title}>
              <div className="ia-usecase-icon">{u.icon}</div>
              <h3 className="ia-usecase-title">{u.title}</h3>
              <p className="ia-usecase-desc">{u.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="ia-section" id="how-it-works">
        <p className="section-label ia-reveal">How It Works</p>
        <h2 className="section-title ia-reveal">From messy process<br />to clean automation</h2>
        <p className="section-sub ia-reveal">
          No months-long engagements. Most workflows are live within 1–2 weeks.
        </p>
        <div className="ia-steps">
          {[
            {
              n: '1', title: 'Audit',
              desc: "We map your current manual processes — what tools you use, where data moves, where it breaks down. I find the bottlenecks most teams don't even realize exist.",
            },
            {
              n: '2', title: 'Design',
              desc: 'I blueprint the automation logic before writing a single line. You review and approve the flow — so there are no surprises when it ships.',
            },
            {
              n: '3', title: 'Build & Test',
              desc: 'I build in n8n and test with real data from your systems. Edge cases get handled. Error alerts get wired up. Nothing ships untested.',
            },
            {
              n: '4', title: 'Deploy & Monitor',
              desc: "Full handoff with documentation. I monitor the first 30 days to catch anything unexpected — and you have a direct line to me if something needs tuning.",
            },
          ].map(s => (
            <div className="ia-step ia-reveal" key={s.n}>
              <div className="ia-step-num">{s.n}</div>
              <div className="ia-step-body">
                <h3 className="ia-step-title">{s.title}</h3>
                <p className="ia-step-desc">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section className="ia-section ia-section--dark" id="pricing">
        <p className="section-label ia-reveal" style={{ color: 'var(--accent-light)' }}>Pricing</p>
        <h2 className="section-title ia-reveal" style={{ color: 'var(--paper)' }}>
          One workflow or a whole system —<br />there's a fit for every stage.
        </h2>
        <p className="section-sub ia-reveal" style={{ color: 'var(--light)' }}>
          Every engagement includes setup, testing, documentation, and monitoring. No hidden fees.
        </p>
        <div className="ia-pricing-grid">
          {[
            {
              tier: 'Single Workflow', price: '$997', period: ' one-time',
              desc: 'One end-to-end automation built, tested, and deployed.',
              features: [
                '1 automated workflow',
                'Up to 3 app integrations',
                'Error alerting & logging',
                'Full documentation',
                '30-day support window',
              ],
              featured: false,
            },
            {
              tier: 'Automation Bundle', price: '$2,497', period: ' one-time',
              desc: 'A suite of connected automations that work as a system.',
              features: [
                'Up to 5 workflows',
                'Unlimited integrations',
                'Error alerting & logging',
                'Full documentation',
                '60-day support window',
                'Optimization session at day 30',
              ],
              featured: true,
            },
            {
              tier: 'Ongoing Retainer', price: '$997', period: '/mo',
              desc: 'Continuous automation build-out and system maintenance.',
              features: [
                'New workflow each month',
                'Unlimited integrations',
                'Priority support',
                'Monthly performance review',
                'Proactive monitoring',
                'Workflow updates as you grow',
              ],
              featured: false,
            },
          ].map(p => (
            <div className={`ia-price-card ia-reveal${p.featured ? ' ia-price-card--featured' : ''}`} key={p.tier}>
              {p.featured && <div className="ia-price-badge">Most Popular</div>}
              <div className="ia-price-tier">{p.tier}</div>
              <div className="ia-price-amount">{p.price}<span>{p.period}</span></div>
              <p className="ia-price-desc">{p.desc}</p>
              <ul className="ia-price-features">
                {p.features.map(f => <li key={f}>{f}</li>)}
              </ul>
              <button
                className={p.featured ? 'btn-primary' : 'ia-btn-outline'}
                onClick={openModal}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="ia-cta">
        <div className="ia-cta-inner ia-reveal">
          <h2>Every hour you spend on manual work<br />is an hour you're not spending on growth.</h2>
          <p>Tell me what's slowing you down. I'll show you what automation can do about it.</p>
          <button className="btn-primary" onClick={openModal}>Let's Connect →</button>
        </div>
      </section>

      <Footer />
    </>
  )
}

import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import EngagementDemo from '../components/EngagementDemo'
import { useContactModal } from '../context/ContactModalContext'
import './customer-engagement-suite.css'

export default function CustomerEngagementSuite() {
  const { open: openModal } = useContactModal()

  useEffect(() => {
    const els = document.querySelectorAll('.ces-reveal')
    const io = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('ces-revealed'); io.unobserve(e.target) }
      }),
      { threshold: 0.1 }
    )
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <>
      <Nav />

      {/* HERO */}
      <section className="ces-hero">
        <div className="ces-hero-inner">
          <p className="ces-hero-eyebrow">AI Customer Engagement Suite</p>
          <h1 className="ces-hero-title">
            Your next customer called.<br /><em>Nobody picked up.</em>
          </h1>
          <p className="ces-hero-sub">
            An AI agent that lives wherever your customers are — answering questions, booking appointments,
            and resolving issues 24/7. Set up in under a week. Less than the cost of a part-time hire.
          </p>
          <div className="ces-hero-actions">
            <button className="btn-primary" onClick={openModal}>Let's Connect</button>
            <a href="#how-it-works" className="ces-btn-ghost">See How It Works</a>
          </div>
        </div>
      </section>

      {/* STATS */}
      <div className="ces-stats">
        {[
          { n: '64%', label: 'of businesses using AI chatbots report more qualified leads' },
          { n: '82%', label: 'of customers prefer a chatbot over waiting for a human' },
          { n: '3×',  label: 'higher conversion rate vs. traditional contact forms' },
          { n: '40%', label: 'reduction in customer service costs on average' },
        ].map(s => (
          <div className="ces-stat-item ces-reveal" key={s.n}>
            <div className="ces-stat-num">{s.n}</div>
            <div className="ces-stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* PROBLEM */}
      <section className="ces-section" id="problem">
        <p className="section-label ces-reveal">The Problem</p>
        <h2 className="section-title ces-reveal">You're losing leads<br />you already paid for</h2>
        <p className="section-sub ces-reveal">
          You spend money on ads, SEO, and word-of-mouth. People find you. Then they leave —
          because nobody was there to help them in the moment.
        </p>
        <div className="ces-problem-grid">
          {[
            {
              title: 'Missed calls = missed revenue',
              body: "A patient calls after hours. A homeowner needs emergency HVAC at 11pm. Your voicemail doesn't book appointments — your competitor's AI does.",
            },
            {
              title: 'Slow response kills deals',
              body: "The business that responds first wins. If it takes 4 hours to reply to a website inquiry, that lead has already booked with someone else.",
            },
            {
              title: 'Support tickets pile up overnight',
              body: "Customers expect instant answers. When they don't get them, they churn, leave bad reviews, or open chargebacks. Your team can't be online 24/7.",
            },
          ].map(p => (
            <div className="ces-problem-card ces-reveal" key={p.title}>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="ces-section ces-section--warm" id="how-it-works">
        <p className="section-label ces-reveal">How It Works</p>
        <h2 className="section-title ces-reveal">From setup to booked appointments<br />in less than a week</h2>
        <p className="section-sub ces-reveal">
          We handle everything — no prompts to write, no code to touch, no integrations to figure out.
        </p>

        {/* Step 1 */}
        <div className="ces-step ces-reveal">
          <div className="ces-step-hdr">
            <div className="ces-step-num">1</div>
            <div>
              <div className="ces-step-day">Day 1–2</div>
              <h3 className="ces-step-title">Discovery & Training</h3>
            </div>
          </div>
          <div className="ces-step-grid">
            <div className="ces-step-body">
              <p>We start with a 30-minute onboarding call to understand your business inside and out — services, pricing, FAQs, policies, and anything a lead might ask at 10pm on a Tuesday.</p>
              <p>Then we build your AI's knowledge base. We pull content from your website, write custom Q&A pairs, and tune the agent to your tone. If a customer asks "Do you take Aetna?" or "Where's my order?" — your AI knows the answer.</p>
              <div className="ces-details">
                {[
                  { title: 'Custom-trained on your data', desc: 'Services, pricing, FAQs, insurance, location info, staff bios — everything a customer would ask your front desk.' },
                  { title: 'Matches your voice', desc: 'Friendly? Professional? Casual? We tune the tone so it sounds like your brand, not a generic bot.' },
                  { title: 'Guardrails built in', desc: "The AI knows what NOT to say — it won't give medical advice, make up pricing, or promise things you can't deliver." },
                ].map(d => (
                  <div className="ces-detail" key={d.title}>
                    <div className="ces-detail-dot" />
                    <div><strong>{d.title}</strong><span>{d.desc}</span></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="ces-step-visual">
              <div className="ces-mock-card">
                <div className="ces-mock-hdr">
                  <span className="ces-mock-dot" />
                  <span>Knowledge Base — Your Business</span>
                </div>
                {[
                  { tag: 'Services', text: 'All offerings, pricing tiers, package details, add-ons...' },
                  { tag: 'FAQs', text: '22+ Q&A pairs covering hours, policies, cancellations, new clients...' },
                  { tag: 'Policies', text: '24hr cancellation, payment plans, booking requirements...' },
                  { tag: 'Tone', text: 'Professional, warm, brand-matched — sounds like your team.' },
                ].map(r => (
                  <div className="ces-mock-row" key={r.tag}>
                    <div className="ces-mock-tag">{r.tag}</div>
                    <div className="ces-mock-text">{r.text}</div>
                  </div>
                ))}
                <div className="ces-mock-status">AI training complete — 98.2% confidence</div>
              </div>
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="ces-step ces-reveal">
          <div className="ces-step-hdr">
            <div className="ces-step-num">2</div>
            <div>
              <div className="ces-step-day">Day 2–3</div>
              <h3 className="ces-step-title">Calendar & CRM Integration</h3>
            </div>
          </div>
          <div className="ces-step-grid">
            <div className="ces-step-body">
              <p>Most chatbots answer questions but can't actually <em>do</em> anything. This AI connects directly to your real calendar and books confirmed appointments on the spot — no "someone will call you back."</p>
              <p>Every conversation is tracked in CRM, every lead is captured, and anyone who doesn't book flows into automated follow-up sequences. Chatted at midnight but didn't schedule? They get a text in the morning.</p>
              <div className="ces-details">
                {[
                  { title: 'Real-time calendar booking', desc: 'Syncs with Google Calendar, Outlook, or your practice management system. Checks availability live — no double-bookings.' },
                  { title: 'Instant confirmation', desc: 'Customer picks a slot → confirmation text + email within seconds. Automated reminders go out 24hr and 1hr before.' },
                  { title: 'Lead nurture on autopilot', desc: "Didn't book? They get a friendly follow-up sequence via text and email. No lead falls through the cracks." },
                ].map(d => (
                  <div className="ces-detail" key={d.title}>
                    <div className="ces-detail-dot" />
                    <div><strong>{d.title}</strong><span>{d.desc}</span></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="ces-step-visual">
              <div className="ces-mock-card">
                <div className="ces-mock-hdr">
                  <strong>Thursday, April 10</strong>
                  <span className="ces-cal-badge">3 booked by AI</span>
                </div>
                {[
                  { time: '9:00 AM',  name: 'Sarah M.',  type: 'Cleaning',     src: 'Website chat · 11:42 PM' },
                  { time: '11:30 AM', name: 'James R.',  type: 'Consultation', src: 'SMS · 7:15 AM' },
                  { time: '2:00 PM',  name: null },
                  { time: '3:30 PM',  name: 'Maria L.',  type: 'Follow-up',    src: 'Instagram DM · 6:08 AM' },
                ].map(s => (
                  <div className={`ces-cal-slot${!s.name ? ' ces-cal-open' : ''}`} key={s.time}>
                    <div className="ces-cal-time">{s.time}</div>
                    {s.name
                      ? <div className="ces-cal-info"><div className="ces-cal-name">{s.name} — {s.type}</div><div className="ces-cal-src">{s.src}</div></div>
                      : <div className="ces-cal-info"><div className="ces-cal-avail">Available</div></div>
                    }
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div className="ces-step ces-reveal">
          <div className="ces-step-hdr">
            <div className="ces-step-num">3</div>
            <div>
              <div className="ces-step-day">Day 3–5</div>
              <h3 className="ces-step-title">Deploy Across Every Channel</h3>
            </div>
          </div>
          <div className="ces-step-grid">
            <div className="ces-step-body">
              <p>Your AI doesn't just live on your website — it shows up everywhere your customers are. We deploy across live chat, SMS, Facebook Messenger, Instagram DMs, and Google Business messages.</p>
              <p>We also activate missed-call text-back: if someone calls and nobody picks up, they instantly get a text asking how we can help — and the AI takes it from there.</p>
              <div className="ces-details">
                {[
                  { title: 'Website live chat widget', desc: 'Clean, branded bubble on your site. Proactively greets visitors — "Hi! Need help booking?"' },
                  { title: 'SMS two-way texting', desc: 'Customers text your business number and the AI responds instantly. Feels like texting a real person.' },
                  { title: 'Facebook & Instagram DMs', desc: 'Someone DMs your page asking about pricing? The AI answers in seconds and books them.' },
                  { title: 'Missed-call text-back', desc: 'Missed a call? An automatic text fires immediately, starting a conversation that converts to a booking.' },
                ].map(d => (
                  <div className="ces-detail" key={d.title}>
                    <div className="ces-detail-dot" />
                    <div><strong>{d.title}</strong><span>{d.desc}</span></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="ces-step-visual">
              <div className="ces-mock-card ces-channels-card">
                {[
                  { label: 'Website Chat',            live: true },
                  { label: 'SMS / Text',              live: true },
                  { label: 'Facebook Messenger',      live: true },
                  { label: 'Instagram DMs',           live: true },
                  { label: 'Missed-Call Text-Back',   live: true },
                  { label: 'Google Business Messages',live: false },
                ].map(c => (
                  <div className="ces-channel-row" key={c.label}>
                    <div className="ces-channel-icon" />
                    <div className="ces-channel-label">{c.label}</div>
                    <div className={`ces-channel-status${c.live ? ' live' : ''}`}>
                      {c.live ? 'Live' : 'Soon'}
                    </div>
                  </div>
                ))}
                <div className="ces-channels-foot">
                  <strong>5 channels active</strong>
                  <span>One AI, everywhere at once</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Step 4 */}
        <div className="ces-step ces-reveal">
          <div className="ces-step-hdr">
            <div className="ces-step-num">4</div>
            <div>
              <div className="ces-step-day">Ongoing</div>
              <h3 className="ces-step-title">Monitor, Optimize & Report</h3>
            </div>
          </div>
          <div className="ces-step-grid">
            <div className="ces-step-body">
              <p>This isn't "set it and forget it." We actively monitor conversations weekly, catch anything the AI gets wrong, and fine-tune responses so it gets smarter over time.</p>
              <p>Every month, you get a clear report with the numbers that matter: conversations handled, appointments booked, top questions, and where leads came from. No vanity metrics.</p>
              <div className="ces-details">
                {[
                  { title: 'Monthly performance report', desc: 'Conversations, bookings, lead sources, top questions, accuracy — all in a clear dashboard you can actually understand.' },
                  { title: 'Continuous prompt tuning', desc: "New service? Price change? Seasonal promo? We update the AI so it's always current and accurate." },
                  { title: 'Conversation review & QA', desc: 'We read real conversations to catch edge cases, improve responses, and ensure nothing slips through.' },
                ].map(d => (
                  <div className="ces-detail" key={d.title}>
                    <div className="ces-detail-dot" />
                    <div><strong>{d.title}</strong><span>{d.desc}</span></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="ces-step-visual">
              <div className="ces-mock-card">
                <div className="ces-mock-hdr">
                  <strong>Monthly Report</strong>
                  <span>Your Business</span>
                </div>
                <div className="ces-report-stats">
                  {[
                    { num: '847',   label: 'Conversations' },
                    { num: '124',   label: 'Appts Booked' },
                    { num: '96.4%', label: 'Accuracy' },
                  ].map(r => (
                    <div className="ces-report-stat" key={r.label}>
                      <div className="ces-report-num">{r.num}</div>
                      <div className="ces-report-lbl">{r.label}</div>
                    </div>
                  ))}
                </div>
                <div className="ces-report-bars-lbl">Lead Sources</div>
                {[
                  { name: 'Website Chat', pct: 52 },
                  { name: 'SMS',          pct: 24 },
                  { name: 'Instagram',    pct: 14 },
                  { name: 'Missed Calls', pct: 10 },
                ].map(b => (
                  <div className="ces-bar-row" key={b.name}>
                    <span>{b.name}</span>
                    <div className="ces-bar-track"><div className="ces-bar-fill" style={{ width: `${b.pct}%` }} /></div>
                    <span>{b.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DEMO */}
      <EngagementDemo />

      {/* RESULTS */}
      <section className="ces-section ces-section--dark">
        <p className="section-label ces-reveal" style={{ color: 'var(--accent-light)' }}>The Numbers</p>
        <h2 className="section-title ces-reveal" style={{ color: 'var(--paper)' }}>
          What happens when every lead<br />gets an instant response
        </h2>
        <div className="ces-roi-grid">
          {[
            { num: '340%', label: 'Average first-year ROI from AI engagement implementation', source: 'Juniper Research, 2024' },
            { num: '11s',  label: 'Average response time with AI — vs. 4+ hours by email',   source: 'Hyperleap AI, 2026' },
            { num: '55%',  label: 'More high-quality leads vs. traditional contact forms',     source: 'FastBots Industry Report, 2026' },
          ].map(r => (
            <div className="ces-roi-card ces-reveal" key={r.num}>
              <div className="ces-roi-num">{r.num}</div>
              <div className="ces-roi-label">{r.label}</div>
              <div className="ces-roi-source">{r.source}</div>
            </div>
          ))}
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section className="ces-section" id="industries">
        <p className="section-label ces-reveal">Built For</p>
        <h2 className="section-title ces-reveal">Businesses that run<br />on customer relationships</h2>
        <p className="section-sub ces-reveal">
          If your revenue depends on leads converting and customers coming back, this suite is built for you.
        </p>
        <div className="ces-niche-grid">
          {[
            { title: 'Dental Practices',       desc: 'Answer insurance questions, book cleanings and consults, and follow up with no-shows — automatically.' },
            { title: 'PT, Chiro & Med Spas',   desc: 'Handle recurring scheduling, answer treatment FAQs, and capture new patient leads after hours.' },
            { title: 'HVAC & Home Services',   desc: "Never miss an emergency call again. Your AI answers 24/7 and books the next available slot on the spot." },
            { title: 'Law Firms',              desc: 'Qualify leads with intake questions, book consultations, and replace your $3,500/month intake coordinator.' },
            { title: 'E-commerce & DTC',       desc: 'Handle order status questions, returns, sizing help, and product recommendations automatically.' },
            { title: 'SaaS & Online Services', desc: 'Onboard new users, answer billing questions, and triage technical issues before they reach your support team.' },
          ].map(n => (
            <div className="ces-niche-card ces-reveal" key={n.title}>
              <h3>{n.title}</h3>
              <p>{n.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section className="ces-section ces-section--dark" id="pricing">
        <p className="section-label ces-reveal" style={{ color: 'var(--accent-light)' }}>Simple Pricing</p>
        <h2 className="section-title ces-reveal" style={{ color: 'var(--paper)' }}>
          Less than a part-time hire.<br />More reliable than a full-time one.
        </h2>
        <p className="section-sub ces-reveal" style={{ color: 'var(--light)' }}>
          Every plan includes setup, training, calendar integration, and ongoing optimization. No hidden fees.
        </p>
        <div className="ces-pricing-grid">
          {[
            {
              tier: 'Starter', price: '$497', period: '/mo',
              desc: 'For businesses adding AI engagement for the first time.',
              features: ['AI chatbot on your website', 'Trained on your services & FAQs', 'Direct calendar booking', 'CRM with lead tracking', 'Monthly performance report'],
              featured: false,
            },
            {
              tier: 'Growth', price: '$797', period: '/mo',
              desc: 'Multi-channel coverage for support, sales, and bookings.',
              features: ['Everything in Starter', 'SMS, Facebook & Instagram DMs', 'Missed-call text-back', 'Lead nurture sequences', 'Google review automation', 'Bi-weekly optimization'],
              featured: true,
            },
            {
              tier: 'Premium', price: '$1,497', period: '/mo',
              desc: 'Enterprise-grade for high-volume or multi-location operations.',
              features: ['Everything in Growth', 'AI voice agent for calls', 'Multi-location support', 'Custom workflow automations', 'Weekly optimization calls', 'Dedicated account manager'],
              featured: false,
            },
          ].map(p => (
            <div className={`ces-price-card ces-reveal${p.featured ? ' ces-price-card--featured' : ''}`} key={p.tier}>
              {p.featured && <div className="ces-price-badge">Most Popular</div>}
              <div className="ces-price-tier">{p.tier}</div>
              <div className="ces-price-amount">{p.price}<span>{p.period}</span></div>
              <p className="ces-price-desc">{p.desc}</p>
              <ul className="ces-price-features">
                {p.features.map(f => <li key={f}>{f}</li>)}
              </ul>
              <button className={p.featured ? 'btn-primary' : 'ces-btn-outline'} onClick={openModal}>Get Started</button>
            </div>
          ))}
        </div>
      </section>

      {/* ADD-ONS */}
      <section className="ces-section" id="addons">
        <p className="section-label ces-reveal">Add-Ons</p>
        <h2 className="section-title ces-reveal">Stack what you need.<br />Skip what you don't.</h2>
        <p className="section-sub ces-reveal">Available with any plan. Add during setup or bolt on later — no long-term commitment.</p>
        <div className="ces-addons-grid">
          {[
            { name: 'AI Voice Agent',             price: '$200/mo', desc: 'Answers inbound calls, handles FAQs, and books appointments by voice. A receptionist that never clocks out.' },
            { name: 'Review Automation',          price: '$100/mo', desc: 'After each appointment, customers get a text asking for a Google review. Happy customers go to Google — unhappy ones go to a private feedback form.' },
            { name: 'Reactivation Campaigns',     price: '$150/mo', desc: "Text and email sequences to re-engage customers who haven't booked in 60, 90, or 120+ days. Bring dormant revenue back to life." },
            { name: 'Intake Forms & Pre-Screening', price: '$75/mo', desc: "The AI collects client info, insurance details, or project specs before the appointment — so your staff doesn't have to." },
            { name: 'Payment & Deposit Collection', price: '$100/mo', desc: 'Collect deposits or full payments at time of booking. Integrated with Stripe so money hits your account before the customer shows up.' },
            { name: 'Multilingual Chat',          price: '$75/mo',  desc: 'Your AI responds in Spanish, French, Mandarin, or any language your customers speak. Auto-detects and switches.' },
            { name: 'Knowledge Base Integration', price: '$100/mo', desc: 'Connect your help docs, Notion, or Zendesk. The AI pulls from your real source of truth so answers stay accurate.' },
            { name: 'Human Handoff & Ticketing', price: '$125/mo', desc: 'When a conversation needs a human, the AI escalates to your team via Slack, email, or your ticketing system — with full context attached.' },
          ].map(a => (
            <div className="ces-addon-card ces-reveal" key={a.name}>
              <div className="ces-addon-name">{a.name}</div>
              <p className="ces-addon-desc">{a.desc}</p>
              <div className="ces-addon-price">{a.price}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="ces-cta">
        <div className="ces-cta-inner ces-reveal">
          <h2>Stop losing customers<br />to silence.</h2>
          <p>Whether you need an AI that books appointments, resolves support tickets, or both — we'll build it, train it, and run it for you.</p>
          <button className="btn-primary" onClick={openModal}>Let's Connect →</button>
        </div>
      </section>

      <Footer />
    </>
  )
}

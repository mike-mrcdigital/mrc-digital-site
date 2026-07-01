import { Link } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import { useContactModal } from './context/ContactModalContext'
import './styles/home.css'
import './pages/projects.css'

export default function App() {
  const { open: openModal } = useContactModal()

  return (
    <>
      <Nav />

      {/* HERO */}
      <section className="hero">
        <div className="hero-text">
          <p className="hero-eyebrow">MRC Digital Consulting</p>
          <h1 className="hero-title">
            Your business shouldn't run on<br />spreadsheets and <em>missed calls.</em>
          </h1>
          <p className="hero-sub">We identify where your business leaks time and money, then build the systems that fix it — from AI voice agents to live analytics dashboards, built to production standard.</p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={openModal}>Let's Connect</button>
            <a href="#portfolio" className="btn-ghost">See the Work</a>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-chat">
            <div className="hero-chat-hdr">
              <div className="hero-chat-av">AI</div>
              <div>
                <div className="hero-chat-name">MRC Assistant</div>
                <div className="hero-chat-status">Online now</div>
              </div>
            </div>
            <div className="hero-chat-msgs">
              <div className="hero-chat-msg hero-chat-msg--bot">Hi! Need help booking an appointment or have a question?</div>
              <div className="hero-chat-msg hero-chat-msg--user">Yes — do you have anything this Friday?</div>
              <div className="hero-chat-msg hero-chat-msg--bot">Let me check availability...<br /><br />Friday at 10 AM or 2 PM are open. Which works for you?</div>
              <div className="hero-chat-msg hero-chat-msg--user">10 AM please!</div>
              <div className="hero-chat-msg hero-chat-msg--bot hero-chat-msg--booked">✓ Booked — Friday at 10:00 AM. Confirmation sent!</div>
            </div>
            <div className="hero-chat-input">
              <div className="hero-chat-input-fake">Type a message...</div>
              <div className="hero-chat-send">↑</div>
            </div>
          </div>
          <p className="hero-chat-caption">Our AI Customer Engagement Chatbot</p>
          <Link to="/services/customer-engagement-suite" className="btn-primary hero-chat-cta">Get Yours Today</Link>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="services-section">
        <p className="section-label">What I Do</p>
        <h2 className="section-title">Services</h2>
        <p className="section-sub">Every engagement starts with one question: where is your business losing time and money? The answer tells us what to build.</p>
        <div className="services-grid">
          {[
            {
              num: '01', icon: '🚀', name: 'AI Customer Engagement Suite',
              desc: 'Most businesses lose 20-30% of potential leads to slow follow-up and missed calls. We fix that. You get a done-for-you AI engagement system — voice agents that answer every call, chatbots that qualify and nurture leads, and automated follow-up sequences that work while you sleep. Plug it into your existing workflow and start recovering revenue you didn\'t know you were losing.',
              tags: ['GoHighLevel Setup', 'Lead Nurturing', 'AI Chatbots', 'CRM Automation', 'Voice AI'],
              link: '/services/customer-engagement-suite'
            },
            {
              num: '02', icon: '⚡', name: 'Workflow Automation & AI Integration',
              desc: 'If someone on your team is doing the same thing more than twice a week, it\'s probably automatable. We map your most expensive manual processes — reporting, data entry, billing, follow-up — and build the automation layer that eliminates them. Then we go further: integrating an AI reasoning layer that makes your workflows smarter over time, not just faster.',
              tags: ['Workflow Automation', 'AI-Powered Logic', 'Scheduled Jobs', 'Process Optimization'],
              link: '/services/intelligent-automation'
            },
            {
              num: '03', icon: '🏗', name: 'Custom Applications & Internal Tools',
              desc: 'Sometimes the tool you need doesn\'t exist yet — and sometimes the data you already have is sitting unused because nobody can query it. We build custom applications that solve both problems: tools that fit the way your business actually works, and dashboards that operationalize your data so decisions get made on facts, not gut feel. We\'ve built a HIPAA-compliant analytics dashboard with an AI advisor that answers plain-language questions about live business data, a real-time social publishing engine, and a custom ad trafficking platform — all from scratch, because nothing in the market solved the problem.',
              tags: ['React / Next.js', 'Node.js', 'PostgreSQL', 'Cloud Deployment']
            }
          ].map(s => (
            s.link
              ? <Link to={s.link} className="service-item service-item--link" key={s.num}>
                  <div className="service-num">{s.num}</div>
                  <div className="service-icon">{s.icon}</div>
                  <div className="service-name">{s.name}</div>
                  <p className="service-desc">{s.desc}</p>
                  <div className="service-tags">
                    {s.tags.map(t => <span className="service-tag" key={t}>{t}</span>)}
                  </div>
                  <span className="service-learn-more">Learn more →</span>
                </Link>
              : <div className="service-item" key={s.num}>
                  <div className="service-num">{s.num}</div>
                  <div className="service-icon">{s.icon}</div>
                  <div className="service-name">{s.name}</div>
                  <p className="service-desc">{s.desc}</p>
                  <div className="service-tags">
                    {s.tags.map(t => <span className="service-tag" key={t}>{t}</span>)}
                  </div>
                </div>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="process-section">
        <p className="section-label">How It Works</p>
        <h2 className="section-title">A clear process,<br />start to finish</h2>
        <p className="section-sub">No ambiguity. No bloated teams. You work directly with me from discovery to delivery.</p>
        <div className="process-steps">
          {[
            { n: '1', title: 'Discovery', desc: 'We start with a focused conversation to understand your goals, constraints, and what success looks like for you.' },
            { n: '2', title: 'Proposal', desc: 'You receive a clear scope of work, timeline, and fixed-price quote — no vague estimates or hidden fees.' },
            { n: '3', title: 'Build', desc: 'I build in focused sprints with regular check-ins, so you always know where things stand.' },
            { n: '4', title: 'Deliver', desc: 'Full handoff with documentation, source code, and ongoing support options. Your project, fully yours.' },
          ].map(s => (
            <div className="process-step" key={s.n}>
              <div className="step-dot">{s.n}</div>
              <h3 className="step-title">{s.title}</h3>
              <p className="step-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="portfolio-section">
        <p className="section-label">Recent Work</p>
        <h2 className="section-title">Selected Projects</h2>
        <p className="section-sub">A sample of recent client work. More available on request.</p>
        <div className="portfolio-grid">
          <Link to="/projects/windowe-llc" className="portfolio-link">
            <div className="portfolio-item">
              <div className="portfolio-thumb portfolio-thumb-1">
                🏭
                <span className="portfolio-thumb-label">Windowe LLC</span>
              </div>
              <div className="portfolio-body">
                <div className="portfolio-type">Full Stack Web App · Ideation to Launch</div>
                <div className="portfolio-title">Windowe LLC</div>
                <p className="portfolio-desc">Built a full stack platform from the ground up for a logistics startup bringing transparency to warehousing costs and capacity. Took the product from initial concept through design, development, and live launch.</p>
                <div className="portfolio-stack">
                  {['React / Next.js', 'Node.js', 'PostgreSQL', 'REST API', 'Docker', 'DigitalOcean'].map(t => (
                    <span className="stack-tag" key={t}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </Link>
          <div className="portfolio-item">
            <div className="portfolio-thumb portfolio-thumb-2">
              🎙️
              <span className="portfolio-thumb-label">Erika AI</span>
            </div>
            <div className="portfolio-body">
              <div className="portfolio-type">AI VOICE AGENT · HEALTHCARE AUTOMATION</div>
              <div className="portfolio-title">Erika — AI Front Desk Agent</div>
              <p className="portfolio-desc">Built a custom AI voice agent for a physical therapy practice that handles inbound and outbound patient calls 24/7 — fully compliant with California AB 2905 AI disclosure requirements. No missed calls, no added headcount.</p>
              <div className="portfolio-stack">
                {['GoHighLevel', 'ElevenLabs', 'Cartesia TTS', 'Voice AI', 'AB 2905 Compliance'].map(t => (
                  <span className="stack-tag" key={t}>{t}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="portfolio-item">
            <div className="portfolio-thumb portfolio-thumb-3">
              📊
              <span className="portfolio-thumb-label">Patient Analytics</span>
            </div>
            <div className="portfolio-body">
              <div className="portfolio-type">AI-POWERED ANALYTICS · HIPAA-COMPLIANT</div>
              <div className="portfolio-title">Patient Analytics Dashboard</div>
              <p className="portfolio-desc">Designed and built a HIPAA-compliant analytics dashboard for a healthcare practice pulling live data from their practice management system, with a Claude-powered chatbot that answers plain-language questions about their own data and generates performance recommendations.</p>
              <div className="portfolio-stack">
                {['React/Vite', 'Node.js', 'PostgreSQL', 'AWS', 'Claude API', 'PTEverywhere API'].map(t => (
                  <span className="stack-tag" key={t}>{t}</span>
                ))}
              </div>
            </div>
          </div>
          <a href="https://kumo-ashen.vercel.app" target="_blank" rel="noopener noreferrer" className="portfolio-link">
            <div className="portfolio-item">
              <div className="portfolio-thumb portfolio-thumb-4">
                🍜
                <span className="portfolio-thumb-label">Kumo</span>
              </div>
              <div className="portfolio-body">
                <div className="portfolio-type">AI CONSUMER PRODUCT · LIVE</div>
                <div className="portfolio-title">Kumo — AI Recipe Platform</div>
                <p className="portfolio-desc">Co-built a consumer recipe app where users provide a recipe via URL, description, or library selection, and Claude generates contextual enhancements specific to that dish — technique upgrades, ingredient elevations, and method variations.</p>
                <div className="portfolio-stack">
                  {['React', 'Node.js', 'Claude API'].map(t => (
                    <span className="stack-tag" key={t}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </a>
        </div>
        <div className="portfolio-see-all">
          <Link to="/projects">See all projects →</Link>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="about-section">
        <div className="about-image">
          <img src="/images/mike.jpg" alt="Michael Chen" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 50%' }} />
        </div>
        <div className="about-content">
          <p className="section-label">About</p>
          <div className="divider" />
          <h2 className="section-title">Hi, I'm Michael Chen</h2>
          <p className="section-sub" style={{ marginBottom: '1rem' }}> I founded MRC Digital Consulting to make technical solutions accessible to businesses of all shapes and sizes. Every project is guided by my expertise, from discovery through delivery.</p>
          <p style={{ color: 'var(--mid)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1rem' }}>I've spent 15+ years in the media agency industry, leading enterprise platform governance, automation programs, and AI transformation initiatives at scale.</p>
          <p style={{ color: 'var(--mid)', fontSize: '0.95rem', lineHeight: 1.7 }}>I'm here to help, even if you're not sure what you may need. Sometimes the most valuable thing I do is to site down with a business, understand how it operates, and help figure out where technology can help. Let's connect!</p>
          <button className="btn-primary" onClick={openModal} style={{ marginTop: '2rem' }}>Let's Connect</button>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="contact-cta-section">
        <div className="contact-cta-inner">
          <h2 className="section-title" style={{ color: 'var(--paper)' }}>Let's build something together</h2>
          <p style={{ color: 'var(--light)', marginTop: '0.75rem', marginBottom: '2rem' }}>Have a project in mind? I'll get back to you within one business day.</p>
          <button className="btn-primary" onClick={openModal}>Let's Connect</button>
        </div>
      </section>

      <Footer />
    </>
  )
}

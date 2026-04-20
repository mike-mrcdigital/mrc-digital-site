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
            Digital solutions<br />built to <em>perform</em>
          </h1>
          <p className="hero-sub">Full stack applications, automation workflows, and API integrations tailored to your business — designed with precision, delivered on time.</p>
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
        <p className="section-sub">I partner with businesses to design, build, and automate digital systems that scale.</p>
        <div className="services-grid">
          {[
            {
              num: '01', icon: '🚀', name: 'AI Customer Engagement Suite',
              desc: 'Stop losing leads to slow follow-up. You get a battle-tested GoHighLevel account pre-loaded with lead nurturing automations and AI-powered chatbots — ready to engage, qualify, and convert from day one. Plug it into your existing workflow and start closing more without adding headcount.',
              tags: ['GoHighLevel Setup', 'Lead Nurturing', 'AI Chatbots', 'CRM Automation'],
              link: '/services/customer-engagement-suite'
            },
            {
              num: '02', icon: '⚡', name: 'Intelligent Automation',
              desc: 'Manual work is a tax on your business. I build custom automation systems that eliminate repetitive tasks, reduce overhead, and free your team to focus on what actually moves the needle — supercharged with an AI reasoning layer that makes your workflows smarter over time.',
              tags: ['Workflow Automation', 'AI-Powered Logic', 'Scheduled Jobs', 'Process Optimization']
            },
            {
              num: '03', icon: '🏗', name: 'Full Stack Applications',
              desc: 'Have an idea but no way to build it? I take your vision from concept to a fully functioning product — front to back. Clean code, scalable architecture, and a launch you can be proud of. Built by one senior engineer who owns it start to finish.',
              tags: ['React / Next.js', 'Node.js', 'PostgreSQL', 'Cloud Deployment']
            }
          ].map(s => (
            <div className="service-item" key={s.num}>
              <div className="service-num">{s.num}</div>
              <div className="service-icon">{s.icon}</div>
              <div className="service-name">{s.name}</div>
              <p className="service-desc">{s.desc}</p>
              <div className="service-tags">
                {s.tags.map(t => <span className="service-tag" key={t}>{t}</span>)}
              </div>
              {s.link && (
                <Link to={s.link} style={{ display: 'inline-block', marginTop: '1.25rem', fontSize: '0.8rem', color: 'var(--accent-light)', textDecoration: 'none', letterSpacing: '0.04em' }}>
                  Learn more →
                </Link>
              )}
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
          <div className="portfolio-placeholder">
            <div className="portfolio-placeholder-icon">＋</div>
            <p>Your next project here</p>
          </div>
        </div>
        <div className="portfolio-see-all">
          <Link to="/projects">See all projects →</Link>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="about-section">
        <div className="about-image">👨‍💻</div>
        <div className="about-content">
          <p className="section-label">About</p>
          <div className="divider" />
          <h2 className="section-title">Hi, I'm Michael Chen</h2>
          <p className="section-sub" style={{ marginBottom: '1rem' }}>I founded MRC Digital Consulting to give businesses access to senior-level engineering talent without the overhead of a large agency. Every project is built by me — no junior handoffs, no middlemen.</p>
          <p style={{ color: 'var(--mid)', fontSize: '0.95rem', lineHeight: 1.7 }}>I specialize in building full stack applications, automation systems, and API integrations that solve real business problems.</p>
          <div className="about-skills">
            {['React', 'Next.js', 'Node.js', 'Python', 'PostgreSQL', 'REST APIs', 'AWS', 'Docker', 'Automation'].map(s => (
              <span className="about-skill" key={s}>{s}</span>
            ))}
          </div>
          <div className="about-stats">
            <div className="about-stat">
              <div className="about-stat-value">100%</div>
              <div className="about-stat-label">Direct Access</div>
            </div>
            <div className="about-stat">
              <div className="about-stat-value">Fast</div>
              <div className="about-stat-label">Turnaround</div>
            </div>
          </div>
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

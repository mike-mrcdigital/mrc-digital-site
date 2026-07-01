import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useContactModal } from '../context/ContactModalContext'

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const close = () => { setOpen(false); setServicesOpen(false) }
  const { open: openModal } = useContactModal()

  return (
    <nav>
      <Link to="/" className="nav-logo" onClick={close}>MRC<span>.</span></Link>

      <button
        className={`nav-hamburger${open ? ' nav-hamburger--open' : ''}`}
        onClick={() => setOpen(o => !o)}
        aria-label={open ? 'Close menu' : 'Open menu'}
      >
        <span /><span /><span />
      </button>

      <ul className={`nav-links${open ? ' nav-links--open' : ''}`}>
        <li
          className="nav-item--has-sub"
          onMouseEnter={() => { if (window.innerWidth > 900) setServicesOpen(true) }}
          onMouseLeave={() => { if (window.innerWidth > 900) setServicesOpen(false) }}
        >
          <a
            href="/#services"
            onClick={e => {
              if (open) { e.preventDefault(); setServicesOpen(o => !o) }
              else { close() }
            }}
          >
            Services <span className="nav-chevron">▾</span>
          </a>
          <ul className={`nav-submenu${servicesOpen ? ' nav-submenu--open' : ''}`}>
            <div className="nav-submenu-inner">
              <li>
                <Link to="/services/customer-engagement-suite" onClick={close}>
                  AI Customer Engagement Suite
                </Link>
              </li>
              <li>
                <Link to="/services/intelligent-automation" onClick={close}>
                  Intelligent Automation
                </Link>
              </li>
            </div>
          </ul>
        </li>
        <li><a href="/#process" onClick={close}>Process</a></li>
        <li><a href="/#portfolio" onClick={close}>Work</a></li>
        <li><Link to="/blog" onClick={close}>Blog</Link></li>
        <li><a href="/#about" onClick={close}>About</a></li>
        <li><button className="nav-cta" onClick={() => { close(); openModal() }}>Let's Connect</button></li>
      </ul>
    </nav>
  )
}

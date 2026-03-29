import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Nav() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

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
        <li><a href="/#services" onClick={close}>Services</a></li>
        <li><a href="/#process" onClick={close}>Process</a></li>
        <li><a href="/#portfolio" onClick={close}>Work</a></li>
        <li><Link to="/blog" onClick={close}>Blog</Link></li>
        <li><a href="/#about" onClick={close}>About</a></li>
        <li><a href="/#contact" className="nav-cta" onClick={close}>Start a Project</a></li>
      </ul>
    </nav>
  )
}

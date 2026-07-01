import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [pathname])
  return null
}
import App from './App'
import BlogIndex from './pages/BlogIndex'
import BlogPost from './pages/BlogPost'
import ProjectsIndex from './pages/ProjectsIndex'
import ProjectDetail from './pages/ProjectDetail'
import CustomerEngagementSuite from './pages/CustomerEngagementSuite'
import IntelligentAutomation from './pages/IntelligentAutomation'
import { ContactModalProvider } from './context/ContactModalContext'
import ContactModal from './components/ContactModal'
import './styles/global.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContactModalProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/blog" element={<BlogIndex />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/projects" element={<ProjectsIndex />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/services/customer-engagement-suite" element={<CustomerEngagementSuite />} />
          <Route path="/services/intelligent-automation" element={<IntelligentAutomation />} />
        </Routes>
        <ContactModal />
      </BrowserRouter>
    </ContactModalProvider>
  </React.StrictMode>
)

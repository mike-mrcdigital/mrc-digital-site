import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import BlogIndex from './pages/BlogIndex'
import BlogPost from './pages/BlogPost'
import ProjectsIndex from './pages/ProjectsIndex'
import ProjectDetail from './pages/ProjectDetail'
import CustomerEngagementSuite from './pages/CustomerEngagementSuite'
import { ContactModalProvider } from './context/ContactModalContext'
import ContactModal from './components/ContactModal'
import './styles/global.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContactModalProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/blog" element={<BlogIndex />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/projects" element={<ProjectsIndex />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/services/customer-engagement-suite" element={<CustomerEngagementSuite />} />
        </Routes>
        <ContactModal />
      </BrowserRouter>
    </ContactModalProvider>
  </React.StrictMode>
)

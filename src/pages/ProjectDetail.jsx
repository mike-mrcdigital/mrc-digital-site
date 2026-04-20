import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { PortableText } from '@portabletext/react'
import { client, urlFor } from '../sanityClient'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { useContactModal } from '../context/ContactModalContext'
import './projects.css'

const PROJECT_QUERY = `*[_type == "project" && slug.current == $slug][0] {
  title, type, excerpt, body, mainImage, stack, externalUrl, completedAt
}`

export default function ProjectDetail() {
  const { open: openModal } = useContactModal()
  const { slug } = useParams()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    client.fetch(PROJECT_QUERY, { slug })
      .then(data => { setProject(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [slug])

  if (loading) return <><Nav /><div className="projects-loading-page">Loading...</div></>
  if (!project) return <><Nav /><div className="projects-loading-page">Project not found. <Link to="/projects">← Back to Projects</Link></div></>

  return (
    <>
      <Nav />
      <article className="project-page">
        <div className="project-header">
          <Link to="/projects" className="project-back">← All Projects</Link>
          {project.type && <div className="project-page-type">{project.type}</div>}
          <h1 className="project-page-title">{project.title}</h1>
          {project.excerpt && <p className="project-page-excerpt">{project.excerpt}</p>}
          <div className="project-page-meta">
            {project.completedAt && (
              <span>{new Date(project.completedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</span>
            )}
            {project.externalUrl && (
              <>
                <span>·</span>
                <a href={project.externalUrl} target="_blank" rel="noopener" className="project-live-link">
                  View Live Site ↗
                </a>
              </>
            )}
          </div>
          {project.stack?.length > 0 && (
            <div className="project-page-stack">
              {project.stack.map(t => <span key={t} className="stack-tag">{t}</span>)}
            </div>
          )}
        </div>

        {project.mainImage && (
          <div className="project-hero-img">
            <img src={urlFor(project.mainImage).width(1200).url()} alt={project.mainImage.alt || project.title} />
          </div>
        )}

        {project.body && (
          <div className="project-body">
            <PortableText value={project.body} />
          </div>
        )}

        <div className="project-footer">
          <Link to="/projects" className="btn-primary">← All Projects</Link>
          <button className="btn-ghost" onClick={openModal}>Let's Connect</button>
        </div>
      </article>
      <Footer />
    </>
  )
}

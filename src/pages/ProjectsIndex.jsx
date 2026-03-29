import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { client, urlFor } from '../sanityClient'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import './projects.css'

const PROJECTS_QUERY = `*[_type == "project"] | order(completedAt desc) {
  _id, title, slug, excerpt, type, stack, mainImage, completedAt
}`

export default function ProjectsIndex() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    client.fetch(PROJECTS_QUERY)
      .then(data => { setProjects(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  return (
    <>
      <Nav />
      <div className="projects-hero">
        <p className="section-label">Work</p>
        <h1 className="projects-hero-title">All Projects</h1>
        <p className="projects-hero-sub">A full look at client work — from full stack applications to automation systems and API integrations.</p>
      </div>

      <section className="projects-section">
        {loading && <p className="projects-loading">Loading projects...</p>}
        {!loading && projects.length === 0 && (
          <div className="projects-empty">
            <p>No projects yet — check back soon.</p>
          </div>
        )}
        <div className="projects-grid">
          {projects.map(project => (
            <Link to={`/projects/${project.slug.current}`} key={project._id} className="project-card">
              <div className="project-card-thumb">
                {project.mainImage
                  ? <img src={urlFor(project.mainImage).width(800).url()} alt={project.mainImage.alt || project.title} />
                  : <span className="project-card-thumb-icon">🏗</span>
                }
              </div>
              <div className="project-card-body">
                {project.type && <div className="project-card-type">{project.type}</div>}
                <h2 className="project-card-title">{project.title}</h2>
                {project.excerpt && <p className="project-card-excerpt">{project.excerpt}</p>}
                {project.stack?.length > 0 && (
                  <div className="project-card-stack">
                    {project.stack.map(t => <span key={t} className="stack-tag">{t}</span>)}
                  </div>
                )}
                <div className="project-card-meta">
                  {project.completedAt && (
                    <span>{new Date(project.completedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</span>
                  )}
                  <span className="project-read-more">View Project →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <Footer />
    </>
  )
}

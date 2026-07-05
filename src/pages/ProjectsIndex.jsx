import { useEffect, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { client, urlFor } from '../sanityClient'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import './projects.css'

const PROJECTS_QUERY = `*[_type == "project"] | order(completedAt desc) {
  _id, title, slug, excerpt, type, tags, stack, mainImage, completedAt
}`

export default function ProjectsIndex() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [activeType, setActiveType] = useState('All')

  useEffect(() => {
    client.fetch(PROJECTS_QUERY)
      .then(data => { setProjects(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const allTags = useMemo(() => (
    ['All', ...new Set(projects.flatMap(p => p.tags || []).filter(Boolean).sort())]
  ), [projects])

  const filtered = useMemo(() => (
    projects.filter(p => {
      const q = search.toLowerCase()
      const matchesSearch = !q ||
        p.title?.toLowerCase().includes(q) ||
        p.excerpt?.toLowerCase().includes(q) ||
        p.stack?.some(t => t.toLowerCase().includes(q))
      const matchesTag = activeType === 'All' || p.tags?.includes(activeType)
      return matchesSearch && matchesTag
    })
  ), [projects, search, activeType])

  return (
    <>
      <Nav />
      <div className="projects-hero">
        <h1 className="projects-hero-title">Projects</h1>
        <p className="projects-hero-sub">A full look at client work — from full stack applications to automation systems and API integrations.</p>
      </div>

      <section className="projects-section">
        <div className="projects-controls">
          <div className="projects-search-wrap">
            <span className="projects-search-icon">🔍</span>
            <input
              className="projects-search"
              type="text"
              placeholder="Search projects..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {search && (
              <button className="projects-search-clear" onClick={() => setSearch('')}>×</button>
            )}
          </div>
          {allTags.length > 1 && (
            <div className="projects-filters">
              {allTags.map(tag => (
                <button
                  key={tag}
                  className={`projects-filter-btn${activeType === tag ? ' projects-filter-btn--active' : ''}`}
                  onClick={() => setActiveType(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}
        </div>

        {loading && <p className="projects-loading">Loading projects...</p>}

        {!loading && filtered.length === 0 && (
          <div className="projects-empty">
            <p>{projects.length === 0 ? 'No projects yet — check back soon.' : 'No projects match your search.'}</p>
            {projects.length > 0 && (
              <button className="projects-reset" onClick={() => { setSearch(''); setActiveType('All') }}>
                Clear filters
              </button>
            )}
          </div>
        )}

        <div className="projects-grid">
          {filtered.map(project => (
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

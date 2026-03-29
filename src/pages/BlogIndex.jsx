import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { client, urlFor } from '../sanityClient'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import './blog.css'

const POSTS_QUERY = `*[_type == "post"] | order(publishedAt desc) {
  _id, title, slug, excerpt, publishedAt, mainImage,
  "categories": categories[]->title
}`

export default function BlogIndex() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    client.fetch(POSTS_QUERY)
      .then(data => { setPosts(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  return (
    <>
      <Nav />
      <div className="blog-hero">
        <p className="section-label">Insights & Updates</p>
        <h1 className="blog-hero-title">The MRC Blog</h1>
        <p className="blog-hero-sub">Thoughts on full stack development, automation, API design, and building digital products.</p>
      </div>

      <section className="blog-section">
        {loading && <p className="blog-loading">Loading posts...</p>}
        {!loading && posts.length === 0 && (
          <div className="blog-empty">
            <p>No posts yet — check back soon.</p>
          </div>
        )}
        <div className="blog-grid">
          {posts.map(post => (
            <Link to={`/blog/${post.slug.current}`} key={post._id} className="blog-card">
              {post.mainImage && (
                <div className="blog-card-img">
                  <img src={urlFor(post.mainImage).width(600).url()} alt={post.title} />
                </div>
              )}
              {!post.mainImage && <div className="blog-card-img-placeholder">✍️</div>}
              <div className="blog-card-body">
                {post.categories?.length > 0 && (
                  <div className="blog-card-cats">
                    {post.categories.map(c => <span key={c} className="blog-cat">{c}</span>)}
                  </div>
                )}
                <h2 className="blog-card-title">{post.title}</h2>
                {post.excerpt && <p className="blog-card-excerpt">{post.excerpt}</p>}
                <div className="blog-card-meta">
                  <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  <span className="blog-read-more">Read →</span>
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

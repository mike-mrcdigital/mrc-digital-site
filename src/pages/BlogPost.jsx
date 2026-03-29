import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { PortableText } from '@portabletext/react'
import { client, urlFor } from '../sanityClient'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import './blog.css'

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0] {
  title, body, publishedAt, mainImage, excerpt,
  "categories": categories[]->title
}`

export default function BlogPost() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    client.fetch(POST_QUERY, { slug })
      .then(data => { setPost(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [slug])

  if (loading) return <><Nav /><div className="blog-loading-page">Loading...</div></>
  if (!post) return <><Nav /><div className="blog-loading-page">Post not found. <Link to="/blog">← Back to Blog</Link></div></>

  return (
    <>
      <Nav />
      <article className="post-page">
        <div className="post-header">
          <Link to="/blog" className="post-back">← Back to Blog</Link>
          {post.categories?.length > 0 && (
            <div className="blog-card-cats" style={{ marginBottom: '1rem' }}>
              {post.categories.map(c => <span key={c} className="blog-cat">{c}</span>)}
            </div>
          )}
          <h1 className="post-title">{post.title}</h1>
          {post.excerpt && <p className="post-excerpt">{post.excerpt}</p>}
          <div className="post-meta">
            <span>Michael Chen</span>
            <span>·</span>
            <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
        </div>

        {post.mainImage && (
          <div className="post-hero-img">
            <img src={urlFor(post.mainImage).width(1200).url()} alt={post.title} />
          </div>
        )}

        <div className="post-body">
          {post.body && <PortableText value={post.body} />}
        </div>

        <div className="post-footer">
          <Link to="/blog" className="btn-primary">← Back to Blog</Link>
          <a href="/#contact" className="btn-ghost">Start a Project</a>
        </div>
      </article>
      <Footer />
    </>
  )
}

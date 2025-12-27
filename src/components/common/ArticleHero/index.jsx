import React from 'react'
import './ArticleHero.css'

export function ArticleHero({
  thumbnail,
  category,
  title,
  excerpt,
  date,
  author,
  onClick,
}) {
  const mapCategoryToVar = (cat) => {
    if (!cat) return 'var(--color-accent)'
    const key = String(cat).toLowerCase().replace(/\s+/g, '').replace(/[^a-z]/g, '')
    return `var(--color-${key})`
  }

  const badgeColor = mapCategoryToVar(category)

  const formatDate = (d) => {
    if (!d) return ''
    const dt = typeof d === 'string' || typeof d === 'number' ? new Date(d) : d
    if (Number.isNaN(dt.getTime())) return ''
    return dt.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
  }

  return (
    <article className="article-hero" onClick={onClick} aria-label={title}>
      <div className="article-hero__media">
        {thumbnail ? (
          <img src={thumbnail} alt={title} className="article-hero__image" />
        ) : (
          <div className="article-hero__image article-hero__image--placeholder" />
        )}
        {category && (
          <span className="article-hero__badge" style={{ backgroundColor: badgeColor }}>
            {category}
          </span>
        )}
      </div>

      <div className="article-hero__content">
        <h1 className="article-hero__title">{title}</h1>
        <div className="article-hero__meta">
          {author && <span className="article-hero__author">{author}</span>}
          {date && <span className="article-hero__date">{formatDate(date)}</span>}
        </div>
        {excerpt && <p className="article-hero__excerpt">{excerpt}</p>}
        <div className="article-hero__actions">
          <button className="article-hero__button" onClick={(e) => { e.stopPropagation(); onClick && onClick(); }}>
            Read article
          </button>
        </div>
      </div>
    </article>
  )
}

export default ArticleHero

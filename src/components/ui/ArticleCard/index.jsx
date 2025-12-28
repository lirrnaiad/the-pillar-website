import React from 'react'
import { Link } from 'react-router-dom'
import './ArticleCard.css'

// Named export as per project conventions
export function ArticleCard({
  thumbnail,
  category,
  title,
  excerpt,
  date,
  onClick,
  slug,
}) {
  // map a category string to a CSS variable like `var(--color-news)`
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

  const cardContent = (
    <>
      <div className="article-card__media">
        {thumbnail ? (
          <img src={thumbnail} alt={title} className="article-card__thumbnail" />
        ) : (
          <div className="article-card__thumbnail article-card__thumbnail--placeholder" />
        )}

        {category && (
          <span
            className="article-card__badge"
            style={{ backgroundColor: badgeColor }}
            aria-hidden="true"
          >
            {category}
          </span>
        )}
      </div>

      <div className="article-card__content">
        <h3 className="article-card__title">{title}</h3>
        {excerpt && <p className="article-card__excerpt">{excerpt}</p>}
        {date && <div className="article-card__meta">{formatDate(date)}</div>}
      </div>
    </>
  )

  if (slug) {
    return (
      <Link to={`/article/${slug}`} className="article-card article-card--link" aria-label={title}>
        {cardContent}
      </Link>
    )
  }

  return (
    <article className="article-card" onClick={onClick} aria-label={title}>
      {cardContent}
    </article>
  )
}

export default ArticleCard

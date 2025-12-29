import React from 'react'
import './ArticleHero.css'

export function ArticleHero({
  thumbnail,
  category,
  title,
  excerpt,
  date,
  variant = 'default', // 'default' or 'overlay'
}) {
  const rootClass = `article-hero ${variant === 'overlay' ? 'article-hero--overlay' : ''}`
  if (variant === 'overlay') {
    return (
      <article className={rootClass} onClick={onClick} aria-label={title}>
        <div
          className="article-hero__media article-hero__media--overlay"
          style={{ backgroundImage: `url(${thumbnail})` }}
          aria-hidden="true"
        >
          <div className="article-hero__overlay">
            <span className={`article-hero__badge article-hero__badge--overlay`} style={{ '--badge-color': `var(--color-${category?.toLowerCase() || 'news'})` }}>
              {category}
            </span>
            <h2 className="article-hero__title article-hero__title--overlay">{title}</h2>
            {excerpt && <p className="article-hero__excerpt article-hero__excerpt--overlay">{excerpt}</p>}
            <div className="article-hero__meta article-hero__meta--overlay">
              <time className="article-hero__date">{new Date(date).toLocaleDateString()}</time>
              {author && <span className="article-hero__author"> — {author}</span>}
            </div>
          </div>
        </div>
      </article>
    )
  }

  return (
    <article className={rootClass} onClick={onClick} aria-label={title}>
      <div className="article-hero__media">
        {thumbnail ? (
          <img src={thumbnail} alt={title} className="article-hero__image" />
        ) : (
          <div className="article-hero__image article-hero__image--placeholder" />
        )}
        {category && (
          <span className="article-hero__badge" style={{ '--badge-color': `var(--color-${category?.toLowerCase() || 'news'})` }}>
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
    return (
      <article className={rootClass} onClick={onClick} aria-label={title}>
        <div
          className="article-hero__media article-hero__media--overlay"
          style={{ backgroundImage: thumbnail ? `url(${thumbnail})` : 'none' }}
        >
          <div className="article-hero__overlay">
            {category && (
              <span className="article-hero__badge article-hero__badge--overlay" style={{ backgroundColor: badgeColor }}>
                {category}
              </span>
            )}
            <h2 className="article-hero__title article-hero__title--overlay">{title}</h2>
            <div className="article-hero__meta article-hero__meta--overlay">
              {author && <span className="article-hero__author">{author}</span>}
              {date && <span className="article-hero__date">{formatDate(date)}</span>}
            </div>
            {excerpt && <p className="article-hero__excerpt article-hero__excerpt--overlay">{excerpt}</p>}
          </div>
        </div>
      </article>
    )
  }

  return (
    <article className={rootClass} onClick={onClick} aria-label={title}>
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

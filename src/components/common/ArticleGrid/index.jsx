import React from 'react'
import './ArticleGrid.css'
import { ArticleCard } from '../../ui/ArticleCard'

export function ArticleGrid({ articles = [], onCardClick }) {
  return (
    <div className="article-grid" role="list">
      {articles.map((a) => (
        <div className="article-grid__item" key={a.id} role="listitem">
          <ArticleCard
            thumbnail={a.thumbnail}
            category={a.category}
            title={a.title}
            excerpt={a.excerpt}
            date={a.date}
            onClick={() => onCardClick && onCardClick(a)}
          />
        </div>
      ))}
    </div>
  )
}

export default ArticleGrid

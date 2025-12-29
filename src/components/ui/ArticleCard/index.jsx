import React from 'react';
import { Link } from 'react-router-dom';
import './ArticleCard.css';

const ArticleCard = ({ article, variant = 'default', className = '' }) => {
  const { headline, category, meta, image, link } = article;

  return (
    <article className={`article-card article-card--${variant} ${className}`}>
      <div className="article-card__image-wrapper">
        {image && (
          <img 
            src={image} 
            alt={headline} 
            className="article-card__image" 
            loading="lazy"
          />
        )}
        <div className="article-card__content">
          <span className="article-card__category">{category}</span>
          <h3 className="article-card__headline">{headline}</h3>
          <p className="article-card__meta">{meta}</p>
          <Link to={link || '#'} className="article-card__link">
            View Post
          </Link>
        </div>
      </div>
    </article>
  );
};

export default ArticleCard;

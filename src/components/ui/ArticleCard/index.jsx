import React from 'react';
import { Link } from 'react-router-dom';
import './ArticleCard.css';

/**
 * Get the route path based on article category
 */
const getArticleRoute = (article) => {
  if (!article || !article.category) return '/article/unknown';
  
  const categorySlug = article.category.slug?.toLowerCase() || article.category.name?.toLowerCase() || '';
  
  // Map category slugs to routes
  if (categorySlug === 'photos' || categorySlug.includes('photo')) {
    return `/photos/${article.slug}`;
  }
  if (categorySlug === 'cartoons' || categorySlug === 'cartoons-and-comics' || categorySlug.includes('cartoon') || categorySlug.includes('comic')) {
    return `/cartoons/${article.slug}`;
  }
  
  // Default to regular article route
  return `/article/${article.slug}`;
};

/**
 * Format date for display
 */
const formatDate = (dateString) => {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  } catch (e) {
    return dateString;
  }
};

/**
 * Format meta string (date and author)
 */
const formatMeta = (article) => {
  const parts = [];
  
  if (article.publishedAt) {
    parts.push(formatDate(article.publishedAt));
  }
  
  if (article.author) {
    const authorName = article.author.fullName || article.author.firstName || '';
    if (authorName) {
      parts.push(`by ${authorName}`);
    }
  }
  
  return parts.join(' | ');
};

const ArticleCard = ({ article, variant = 'default', className = '' }) => {
  // Handle both old format (with headline, category, meta, image, link) 
  // and new REST API format
  if (!article) return null;

  // Check if it's the old format
  if (article.headline && article.category && typeof article.category === 'string') {
    // Old format - use as-is
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
  }

  // New REST API format
  const title = article.title || 'Untitled';
  const categoryName = article.category?.name || 'Article';
  const meta = formatMeta(article);
  const imageUrl = article.cover?.url || null;
  const route = getArticleRoute(article);

  return (
    <article className={`article-card article-card--${variant} ${className}`}>
      <div className="article-card__image-wrapper">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={article.cover?.altText || title} 
            className="article-card__image" 
            loading="lazy"
          />
        ) : (
          <div className="article-card__image-placeholder" style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'var(--color-gray-200)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-gray-500)'
          }}>
            No Image
          </div>
        )}
        <div className="article-card__content">
          <span className="article-card__category">{categoryName}</span>
          <h3 className="article-card__headline">{title}</h3>
          {meta && <p className="article-card__meta">{meta}</p>}
          <Link to={route} className="article-card__link">
            View Post
          </Link>
        </div>
      </div>
    </article>
  );
};

export default ArticleCard;

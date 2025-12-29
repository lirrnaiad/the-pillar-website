import { Link } from 'react-router-dom';
import './HeroSection.css';

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
 * Get the route path based on article category
 */
const getArticleRoute = (article) => {
  if (!article || !article.category) return '/article/unknown';
  
  const categorySlug = article.category.slug?.toLowerCase() || article.category.name?.toLowerCase() || '';
  
  if (categorySlug === 'photos' || categorySlug.includes('photo')) {
    return `/photos/${article.slug}`;
  }
  if (categorySlug === 'cartoons' || categorySlug === 'cartoons-and-comics' || categorySlug.includes('cartoon') || categorySlug.includes('comic')) {
    return `/cartoons/${article.slug}`;
  }
  
  return `/article/${article.slug}`;
};

/**
 * HeroSection Component
 * Displays a featured article with background image, title, date, author, and "View Post" button
 * 
 * @param {Object} props
 * @param {Object} props.article - The featured article object
 * @param {string} props.categoryLabel - Category label to display (e.g., "NEWS", "OPINION")
 * @param {string} props.className - Additional CSS classes
 */
const HeroSection = ({ article, categoryLabel = '', className = '' }) => {
  if (!article) {
    return null;
  }

  const backgroundImage = article.cover?.url || null;
  const title = article.title || 'Untitled';
  const authorName = article.author?.fullName || article.author?.firstName || '';
  const publishedDate = article.publishedAt ? formatDate(article.publishedAt) : '';
  const metaText = publishedDate && authorName 
    ? `${publishedDate}    |    by ${authorName}`
    : publishedDate || authorName ? `${publishedDate}${authorName ? ` | by ${authorName}` : ''}` : '';
  const route = getArticleRoute(article);

  return (
    <section className={`hero-section ${className}`}>
      <div 
        className="hero-section__background"
        style={backgroundImage ? {
          backgroundImage: `url(${backgroundImage})`,
        } : {}}
      >
        <div className="hero-section__overlay"></div>
      </div>
      <div className="hero-section__content">
        {categoryLabel && (
          <span className="hero-section__category">{categoryLabel}</span>
        )}
        <h1 className="hero-section__title">{title}</h1>
        {metaText && (
          <p className="hero-section__meta">{metaText}</p>
        )}
        <Link to={route} className="hero-section__button">
          View Post
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;


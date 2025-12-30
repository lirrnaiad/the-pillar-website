import { Link } from 'react-router-dom';
import { useFeaturedArticleByCategoryAndTag, useArticlesByCategoryAndTag } from '../../../hooks/useArticlesRest';
import ArticleCard from '../../ui/ArticleCard';
import { Spinner } from '../../common';
import './SubcategoryFeaturedSection.css';

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
  if (categorySlug === 'cartoons' || categorySlug === 'cartoons-and-comics' || categorySlug === 'comics-and-cartoons' || categorySlug.includes('cartoon') || categorySlug.includes('comic')) {
    return `/cartoons/${article.slug}`;
  }
  if (categorySlug === 'videos' || categorySlug.includes('video')) {
    return `/videos/${article.slug}`;
  }
  
  return `/article/${article.slug}`;
};

/**
 * SubcategoryFeaturedSection Component
 * Displays a large featured article at the top and a 2x2 grid of 4 articles below
 * 
 * @param {Object} props
 * @param {string} props.categorySlug - Category slug
 * @param {string} props.tagName - Tag name to filter by
 * @param {string} props.title - Section title (e.g., "COMICS", "CARTOONS")
 * @param {number} props.gridLimit - Number of articles for the grid (default: 4)
 */
const SubcategoryFeaturedSection = ({ 
  categorySlug, 
  tagName, 
  title, 
  gridLimit = 4 
}) => {
  // Fetch featured article
  const { article: featuredArticle, loading: featuredLoading } = useFeaturedArticleByCategoryAndTag(
    categorySlug,
    tagName
  );

  // Fetch grid articles (we'll fetch 5 to account for excluding the featured one)
  const { articles: gridArticles, loading: gridLoading } = useArticlesByCategoryAndTag(
    categorySlug,
    tagName,
    {
      size: gridLimit + 1, // Fetch one extra to account for exclusion
      sortField: 'publishedAt',
      sortDirection: 'DESC',
      autoFetch: true,
    }
  );

  // Filter out the featured article from grid articles
  const filteredGridArticles = featuredArticle 
    ? gridArticles.filter(article => article.id !== featuredArticle.id).slice(0, gridLimit)
    : gridArticles.slice(0, gridLimit);

  const loading = featuredLoading || gridLoading;
  const hasContent = featuredArticle || filteredGridArticles.length > 0;

  if (loading) {
    return (
      <section className="subcategory-featured-section">
        <div className="container">
          <h2 className="subcategory-featured-section__title">{title}</h2>
          <div className="subcategory-featured-section__loading">
            <Spinner size="48px" />
          </div>
        </div>
      </section>
    );
  }

  if (!hasContent) {
    return null; // Don't render empty sections
  }

  const featuredRoute = featuredArticle ? getArticleRoute(featuredArticle) : null;
  const featuredImage = featuredArticle?.cover?.url || null;
  const featuredAuthorName = featuredArticle?.author?.fullName || featuredArticle?.author?.firstName || '';
  const featuredPublishedDate = featuredArticle?.publishedAt ? formatDate(featuredArticle.publishedAt) : '';
  const featuredMetaText = featuredPublishedDate && featuredAuthorName 
    ? `${featuredPublishedDate}    |    by ${featuredAuthorName}`
    : featuredPublishedDate || featuredAuthorName ? `${featuredPublishedDate}${featuredAuthorName ? ` | by ${featuredAuthorName}` : ''}` : '';

  return (
    <section className="subcategory-featured-section">
      <div className="container">
        <h2 className="subcategory-featured-section__title">{title}</h2>
        
        {/* Large Featured Article */}
        {featuredArticle && (
          <div className="subcategory-featured-section__featured">
            <Link to={featuredRoute} className="subcategory-featured-section__featured-link">
              <div 
                className="subcategory-featured-section__featured-image"
                style={featuredImage ? {
                  backgroundImage: `url(${featuredImage})`,
                } : {}}
              >
                <div className="subcategory-featured-section__featured-overlay"></div>
              </div>
              <div className="subcategory-featured-section__featured-content">
                <h3 className="subcategory-featured-section__featured-title">
                  {featuredArticle.title || 'Untitled'}
                </h3>
                {featuredMetaText && (
                  <p className="subcategory-featured-section__featured-meta">
                    {featuredMetaText}
                  </p>
                )}
              </div>
            </Link>
          </div>
        )}

        {/* 2x2 Grid of Articles */}
        {filteredGridArticles.length > 0 && (
          <div className="subcategory-featured-section__grid">
            {filteredGridArticles.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                variant="default"
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SubcategoryFeaturedSection;


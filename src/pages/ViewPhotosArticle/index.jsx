import { useParams, Link } from 'react-router-dom';
import { useArticleWithViews } from '../../hooks/useArticlesRest';
import { Spinner } from '../../components/common';
import './ViewPhotosArticle.css';

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

function ViewPhotosArticle() {
  const { slug } = useParams();
  const { article, loading, error } = useArticleWithViews(slug, true);

  if (loading) {
    return (
      <article className="photos-article">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem 0' }}>
            <Spinner size="72px" message="Loading photo article…" />
          </div>
        </div>
      </article>
    );
  }

  if (error || !article) {
    return (
      <article className="photos-article">
        <div className="container">
          <div className="photos-article__notfound">
            <h1>Article Not Found</h1>
            <p>The photo article you're looking for doesn't exist or has been removed.</p>
            <Link to="/photos" className="photos-article__back-link">
              Back to Photos
            </Link>
          </div>
        </div>
      </article>
    );
  }

  const authorName = article.author?.fullName || 
                     (article.author?.firstName && article.author?.lastName 
                       ? `${article.author.firstName} ${article.author.lastName}`
                       : article.author?.firstName || 'Unknown Author');
  const publishedDate = formatDate(article.publishedAt || article.createdAt);

  // Parse content to extract images if available
  // For now, we'll display the cover image prominently
  // In a real implementation, you might want to parse the content for multiple images

  return (
    <article className="photos-article">
      <div className="container">
        {/* Hero Section with Large Image */}
        {article.cover?.url && (
          <div className="photos-article__hero">
            <img 
              src={article.cover.url} 
              alt={article.cover.altText || article.title}
              className="photos-article__hero-image"
            />
            {article.cover.altText && (
              <p className="photos-article__hero-caption">{article.cover.altText}</p>
            )}
          </div>
        )}

        {/* Article Header */}
        <header className="photos-article__header">
          <h1 className="photos-article__title">{article.title}</h1>

          <div className="photos-article__meta">
            <div className="photos-article__byline">
              <span className="photos-article__date">{publishedDate}</span>
              {authorName && (
                <>
                  {' '}
                  <span className="photos-article__separator">|</span>
                  {' '}
                  <span className="photos-article__author">by {authorName}</span>
                </>
              )}
            </div>
            {article.excerpt && (
              <p className="photos-article__excerpt">{article.excerpt}</p>
            )}
          </div>
        </header>

        {/* Article Content */}
        <div className="photos-article__content">
          {article.content && (
            <div 
              className="photos-article__content-html"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          )}
          {!article.content && article.excerpt && (
            <p className="photos-article__description">{article.excerpt}</p>
          )}
        </div>
      </div>
    </article>
  );
}

export default ViewPhotosArticle;


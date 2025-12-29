import { useParams, Link } from 'react-router-dom';
import { useArticleWithViews } from '../../hooks/useArticlesRest';
import { Spinner } from '../../components/common';
import './ViewCartoonsArticle.css';

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

function ViewCartoonsArticle() {
  const { slug } = useParams();
  const { article, loading, error } = useArticleWithViews(slug, true);

  if (loading) {
    return (
      <article className="cartoons-article">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem 0' }}>
            <Spinner size="72px" message="Loading cartoon article…" />
          </div>
        </div>
      </article>
    );
  }

  if (error || !article) {
    return (
      <article className="cartoons-article">
        <div className="container">
          <div className="cartoons-article__notfound">
            <h1>Article Not Found</h1>
            <p>The cartoon article you're looking for doesn't exist or has been removed.</p>
            <Link to="/cartoons" className="cartoons-article__back-link">
              Back to Cartoons
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

  return (
    <article className="cartoons-article">
      <div className="container">
        {/* Hero Section with Large Image */}
        {article.cover?.url && (
          <div className="cartoons-article__hero">
            <img 
              src={article.cover.url} 
              alt={article.cover.altText || article.title}
              className="cartoons-article__hero-image"
            />
            {article.cover.altText && (
              <p className="cartoons-article__hero-caption">{article.cover.altText}</p>
            )}
          </div>
        )}

        {/* Article Header */}
        <header className="cartoons-article__header">
          <h1 className="cartoons-article__title">{article.title}</h1>

          <div className="cartoons-article__meta">
            <div className="cartoons-article__byline">
              <span className="cartoons-article__date">{publishedDate}</span>
              {authorName && (
                <>
                  {' '}
                  <span className="cartoons-article__separator">|</span>
                  {' '}
                  <span className="cartoons-article__author">by {authorName}</span>
                </>
              )}
            </div>
            {article.excerpt && (
              <p className="cartoons-article__excerpt">{article.excerpt}</p>
            )}
          </div>
        </header>

        {/* Article Content */}
        <div className="cartoons-article__content">
          {article.content && (
            <div 
              className="cartoons-article__content-html"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          )}
          {!article.content && article.excerpt && (
            <p className="cartoons-article__description">{article.excerpt}</p>
          )}
        </div>
      </div>
    </article>
  );
}

export default ViewCartoonsArticle;


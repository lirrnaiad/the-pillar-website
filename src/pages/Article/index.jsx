import { useParams, Link } from 'react-router-dom';
import { useArticleWithViews, useArticles } from '../../hooks/useArticlesRest';
import { Spinner } from '../../components/common';
import ArticleCard from '../../components/ui/ArticleCard';
import './Article.css';

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
 * Get category color variable
 */
const getCategoryColor = (categoryName) => {
  if (!categoryName) return 'var(--color-gray-500)';
  const name = categoryName.toLowerCase();
  const colorMap = {
    'news': 'var(--color-news)',
    'feature': 'var(--color-feature)',
    'opinion': 'var(--color-opinion)',
    'sci-tech': 'var(--color-scitech)',
    'editorial': 'var(--color-editorial)',
    'sports': 'var(--color-sports)',
    'photos': 'var(--color-photos)',
    'cartoons': 'var(--color-cartoons)',
    'videos': 'var(--color-videos)',
  };
  return colorMap[name] || 'var(--color-primary)';
};

function Article() {
  const { slug } = useParams();
  const { article, loading, error } = useArticleWithViews(slug, true);

  // Fetch related articles from the same category
  const { articles: relatedArticles } = useArticles({
    categoryId: article?.category?.id?.toString(),
    size: 3,
    status: 'PUBLISHED',
    autoFetch: !!article?.category?.id,
  });

  // Filter out current article from related articles
  const filteredRelated = relatedArticles.filter(a => a.id !== article?.id).slice(0, 3);

  if (loading) {
    return (
      <article className="article">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem 0' }}>
            <Spinner size="72px" message="Loading article…" />
          </div>
        </div>
      </article>
    );
  }

  if (error || !article) {
    return (
      <article className="article">
        <div className="container">
          <div className="article__notfound">
            <h1>Article Not Found</h1>
            <p>The article you're looking for doesn't exist or has been removed.</p>
            <Link to="/" className="article__back-link">
              Back to Home
            </Link>
          </div>
        </div>
      </article>
    );
  }

  const categoryColor = getCategoryColor(article.category?.name);
  const authorName = article.author?.fullName || 
                     (article.author?.firstName && article.author?.lastName 
                       ? `${article.author.firstName} ${article.author.lastName}`
                       : article.author?.firstName || 'Unknown Author');
  const publishedDate = formatDate(article.publishedAt || article.createdAt);

  return (
    <article className="article article--full">
      <div className="container">
        {/* Hero Image */}
        {article.cover?.url && (
          <div className="article__hero">
            <img 
              src={article.cover.url} 
              alt={article.cover.altText || article.title}
              className="article__hero-image"
            />
            {article.cover.altText && (
              <p className="article__hero-caption">{article.cover.altText}</p>
            )}
          </div>
        )}

        {/* Article Header */}
        <header className="article__header">
          <div className="article__category-badge" style={{ backgroundColor: categoryColor }}>
            <Link to={`/${article.category?.slug || 'news'}`} className="article__category-link">
              {article.category?.name || 'Article'}
            </Link>
          </div>

          <h1 className="article__title">{article.title}</h1>

          <div className="article__meta">
            <div className="article__byline">
              <span className="article__date">{publishedDate}</span>
              {authorName && (
                <>
                  {' '}
                  <span className="article__separator">|</span>
                  {' '}
                  <span className="article__author">via {authorName}</span>
                </>
              )}
            </div>
            {article.excerpt && (
              <p className="article__excerpt">{article.excerpt}</p>
            )}
          </div>
        </header>

        {/* Article Body */}
        <div className="article__body">
          <div className="article__content">
            {/* Render article content as HTML */}
            {article.content && (
              <div 
                className="article__content-html"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            )}
            {!article.content && (
              <p>No content available for this article.</p>
            )}
          </div>

          {/* Sidebar - Related Articles */}
          {filteredRelated.length > 0 && (
            <aside className="article__sidebar">
              <div className="article__related">
                <h2 className="article__section-title">Related Articles</h2>
                <div className="article__related-list">
                  {filteredRelated.map((relatedArticle) => (
                    <ArticleCard
                      key={relatedArticle.id}
                      article={relatedArticle}
                      variant="default"
                    />
                  ))}
                </div>
              </div>
            </aside>
          )}
        </div>
      </div>
    </article>
  );
}

export default Article;

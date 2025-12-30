import { useParams, Link } from 'react-router-dom';
import { useArticleWithViews, useArticlesByCategoryAndTag } from '../../hooks/useArticlesRest';
import { Spinner } from '../../components/common';
import ArticleCard from '../../components/ui/ArticleCard';
import { getArticleSubcategory } from '../../utils/articleHelpers';
import './ViewVideosArticle.css';

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

function ViewVideosArticle() {
  const { slug } = useParams();
  const { article, loading, error } = useArticleWithViews(slug, true);

  // Get subcategory label
  const subcategoryLabel = article ? (getArticleSubcategory(article) || 'VIDEO') : 'VIDEO';

  // Fetch "More from Video Report" articles
  const { articles: videoReportArticles } = useArticlesByCategoryAndTag(
    'videos',
    'Video Report',
    {
      size: 3,
      sortField: 'publishedAt',
      sortDirection: 'DESC',
      autoFetch: !!article,
    }
  );

  // Fetch "More from Interview Video" articles
  const { articles: interviewVideoArticles } = useArticlesByCategoryAndTag(
    'videos',
    'Interview Video',
    {
      size: 3,
      sortField: 'publishedAt',
      sortDirection: 'DESC',
      autoFetch: !!article,
    }
  );

  // Filter out current article and limit to 2
  const filteredVideoReport = videoReportArticles
    .filter(a => a.id !== article?.id)
    .slice(0, 2);
  
  const filteredInterviewVideo = interviewVideoArticles
    .filter(a => a.id !== article?.id)
    .slice(0, 2);

  if (loading) {
    return (
      <article className="videos-article">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem 0' }}>
            <Spinner size="72px" message="Loading video article…" />
          </div>
        </div>
      </article>
    );
  }

  if (error || !article) {
    return (
      <article className="videos-article">
        <div className="container">
          <div className="videos-article__notfound">
            <h1>Article Not Found</h1>
            <p>The video article you're looking for doesn't exist or has been removed.</p>
            <Link to="/videos" className="videos-article__back-link">
              Back to Videos
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
  
  // Get caption from excerpt or content
  const caption = article.excerpt || '';

  return (
    <article className="videos-article">
      <div className="container">
        {/* Large Hero-like Image/Video Thumbnail */}
        {article.cover?.url && (
          <div className="videos-article__hero">
            <img 
              src={article.cover.url} 
              alt={article.cover.altText || article.title}
              className="videos-article__hero-image"
            />
            {/* If video URL exists, could embed video player here */}
          </div>
        )}

        {/* Article Info Section */}
        <div className="videos-article__info">
          <div className="videos-article__category">{subcategoryLabel.toUpperCase()}</div>
          <h1 className="videos-article__title">{article.title}</h1>
          <div className="videos-article__author-line">by {authorName}</div>
          {caption && (
            <p className="videos-article__caption">{caption}</p>
          )}
        </div>

        {/* More from Video Report Section */}
        {filteredVideoReport.length > 0 && (
          <section className="videos-article__more-section">
            <h2 className="videos-article__more-title">More from Video Report</h2>
            <div className="videos-article__more-grid">
              {filteredVideoReport.map((relatedArticle) => (
                <ArticleCard
                  key={relatedArticle.id}
                  article={relatedArticle}
                  variant="default"
                />
              ))}
            </div>
          </section>
        )}

        {/* More from Interview Video Section */}
        {filteredInterviewVideo.length > 0 && (
          <section className="videos-article__more-section">
            <h2 className="videos-article__more-title">More from Interview Video</h2>
            <div className="videos-article__more-grid">
              {filteredInterviewVideo.map((relatedArticle) => (
                <ArticleCard
                  key={relatedArticle.id}
                  article={relatedArticle}
                  variant="default"
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}

export default ViewVideosArticle;


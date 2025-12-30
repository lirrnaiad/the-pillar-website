import { useParams, Link } from 'react-router-dom';
import { useArticleWithViews, useArticlesByCategoryAndTag } from '../../hooks/useArticlesRest';
import { Spinner } from '../../components/common';
import ArticleCard from '../../components/ui/ArticleCard';
import ImageFrame from '../../components/photos/ImageFrame';
import { determineCartoonOrComic } from '../../utils/articleHelpers';
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

  // Determine category label
  const categoryLabel = article ? determineCartoonOrComic(article) : 'COMICS & CARTOONS';

  // Fetch "More from Cartoons" articles
  const { articles: cartoonsArticles } = useArticlesByCategoryAndTag(
    'cartoons',
    'Cartoons',
    {
      size: 3,
      sortField: 'publishedAt',
      sortDirection: 'DESC',
      autoFetch: !!article,
    }
  );

  // Fetch "More from Comics" articles
  const { articles: comicsArticles } = useArticlesByCategoryAndTag(
    'cartoons',
    'Comics',
    {
      size: 3,
      sortField: 'publishedAt',
      sortDirection: 'DESC',
      autoFetch: !!article,
    }
  );

  // Filter out current article and limit to 2
  const filteredCartoons = cartoonsArticles
    .filter(a => a.id !== article?.id)
    .slice(0, 2);
  
  const filteredComics = comicsArticles
    .filter(a => a.id !== article?.id)
    .slice(0, 2);

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
              Back to Comics & Cartoons
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
    <article className="cartoons-article">
      <div className="container">
        {/* Article Content - Vertical Stack */}
        <div className="cartoons-article__content">
          {/* Image */}
          <div className="cartoons-article__image-container">
            <ImageFrame
              src={article.cover?.url}
              alt={article.cover?.altText || article.title}
              variant="single"
            />
          </div>

          {/* Category */}
          <span className="cartoons-article__category">{categoryLabel}</span>

          {/* Title */}
          <h1 className="cartoons-article__title">{article.title}</h1>

          {/* Author */}
          <p className="cartoons-article__author">by {authorName}</p>

          {/* Caption */}
          {caption && (
            <p className="cartoons-article__caption">{caption}</p>
          )}
        </div>

        {/* More from Cartoons Section */}
        {filteredCartoons.length > 0 && (
          <section className="cartoons-article__more-section">
            <h2 className="cartoons-article__more-title">More from Cartoons</h2>
            <div className="cartoons-article__more-grid">
              {filteredCartoons.map((relatedArticle) => (
                <ArticleCard
                  key={relatedArticle.id}
                  article={relatedArticle}
                  variant="default"
                />
              ))}
            </div>
          </section>
        )}

        {/* More from Comics Section */}
        {filteredComics.length > 0 && (
          <section className="cartoons-article__more-section">
            <h2 className="cartoons-article__more-title">More from Comics</h2>
            <div className="cartoons-article__more-grid">
              {filteredComics.map((relatedArticle) => (
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

export default ViewCartoonsArticle;


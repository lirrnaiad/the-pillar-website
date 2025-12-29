import { useState } from 'react';
import { useArticlesByCategory } from '../../hooks/useArticlesRest';
import ArticleCard from '../../components/ui/ArticleCard';
import { Spinner } from '../../components/common';
import './News.css';

function News() {
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 12;

  // Fetch articles for News category
  // Using 'news' as the category slug - adjust if your backend uses a different slug
  const { articles, pagination, loading, error, refetch } = useArticlesByCategory('news', {
    page: currentPage,
    size: pageSize,
    sortField: 'publishedAt',
    sortDirection: 'DESC',
  });

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="news-page">
      {/* Hero Section */}
      <section className="news-hero">
        <div className="news-hero__background"></div>
        <div className="container">
          <div className="news-hero__content">
            <h1 className="news-hero__title">NEWS</h1>
            <p className="news-hero__description">
              Stay updated with the latest happenings in and around the University of Eastern Philippines campus.
            </p>
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section className="news-content">
        <div className="container">
          {loading && (
            <div className="news-loading">
              <Spinner size="72px" message="Loading news articles..." />
            </div>
          )}

          {error && (
            <div className="news-error">
              <h2>Error Loading Articles</h2>
              <p>{error}</p>
              <button onClick={refetch} className="news-error__retry">
                Try Again
              </button>
            </div>
          )}

          {!loading && !error && articles.length === 0 && (
            <div className="news-empty">
              <h2>No Articles Found</h2>
              <p>There are no news articles available at the moment.</p>
            </div>
          )}

          {!loading && !error && articles.length > 0 && (
            <>
              <div className="news-grid">
                {articles.map((article) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    variant="default"
                  />
                ))}
              </div>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="news-pagination">
                  <button
                    className="news-pagination__btn"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 0}
                    aria-label="Previous page"
                  >
                    Previous
                  </button>
                  
                  <div className="news-pagination__info">
                    Page {currentPage + 1} of {pagination.totalPages}
                  </div>
                  
                  <button
                    className="news-pagination__btn"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage >= pagination.totalPages - 1}
                    aria-label="Next page"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}

export default News;

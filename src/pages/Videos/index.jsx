import { useState } from 'react';
import { useArticlesByCategory } from '../../hooks/useArticlesRest';
import ArticleCard from '../../components/ui/ArticleCard';
import { Spinner } from '../../components/common';
import './Videos.css';

function Videos() {
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 12;

  // Fetch articles for Videos category
  const { articles, pagination, loading, error, refetch } = useArticlesByCategory('videos', {
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
    <div className="videos-page">
      {/* Hero Section */}
      <section className="videos-hero">
        <div className="videos-hero__background"></div>
        <div className="container">
          <div className="videos-hero__content">
            <h1 className="videos-hero__title">VIDEOS</h1>
            <p className="videos-hero__description">
              Multimedia content featuring video reports, documentaries, and special coverage.
            </p>
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section className="videos-content">
        <div className="container">
          {loading && (
            <div className="videos-loading">
              <Spinner size="72px" message="Loading video articles..." />
            </div>
          )}

          {error && (
            <div className="videos-error">
              <h2>Error Loading Articles</h2>
              <p>{error}</p>
              <button onClick={refetch} className="videos-error__retry">
                Try Again
              </button>
            </div>
          )}

          {!loading && !error && articles.length === 0 && (
            <div className="videos-empty">
              <h2>No Articles Found</h2>
              <p>There are no video articles available at the moment.</p>
            </div>
          )}

          {!loading && !error && articles.length > 0 && (
            <>
              <div className="videos-grid">
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
                <div className="videos-pagination">
                  <button
                    className="videos-pagination__btn"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 0}
                    aria-label="Previous page"
                  >
                    Previous
                  </button>
                  
                  <div className="videos-pagination__info">
                    Page {currentPage + 1} of {pagination.totalPages}
                  </div>
                  
                  <button
                    className="videos-pagination__btn"
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

export default Videos;

import { useState } from 'react';
import { useArticlesByCategory } from '../../hooks/useArticlesRest';
import ArticleCard from '../../components/ui/ArticleCard';
import { Spinner } from '../../components/common';
import './Editorial.css';

function Editorial() {
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 12;

  // Fetch articles for Editorial category
  const { articles, pagination, loading, error, refetch } = useArticlesByCategory('editorial', {
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
    <div className="editorial-page">
      {/* Hero Section */}
      <section className="editorial-hero">
        <div className="editorial-hero__background"></div>
        <div className="container">
          <div className="editorial-hero__content">
            <h1 className="editorial-hero__title">EDITORIAL</h1>
            <p className="editorial-hero__description">
              Official stances and views of The Pillar editorial board on pressing issues.
            </p>
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section className="editorial-content">
        <div className="container">
          {loading && (
            <div className="editorial-loading">
              <Spinner size="72px" message="Loading editorial articles..." />
            </div>
          )}

          {error && (
            <div className="editorial-error">
              <h2>Error Loading Articles</h2>
              <p>{error}</p>
              <button onClick={refetch} className="editorial-error__retry">
                Try Again
              </button>
            </div>
          )}

          {!loading && !error && articles.length === 0 && (
            <div className="editorial-empty">
              <h2>No Articles Found</h2>
              <p>There are no editorial articles available at the moment.</p>
            </div>
          )}

          {!loading && !error && articles.length > 0 && (
            <>
              <div className="editorial-grid">
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
                <div className="editorial-pagination">
                  <button
                    className="editorial-pagination__btn"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 0}
                    aria-label="Previous page"
                  >
                    Previous
                  </button>
                  
                  <div className="editorial-pagination__info">
                    Page {currentPage + 1} of {pagination.totalPages}
                  </div>
                  
                  <button
                    className="editorial-pagination__btn"
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

export default Editorial;

import { useState } from 'react';
import { useArticlesByCategory } from '../../hooks/useArticlesRest';
import ArticleCard from '../../components/ui/ArticleCard';
import { Spinner } from '../../components/common';
import './Opinion.css';

function Opinion() {
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 12;

  // Fetch articles for Opinion category
  const { articles, pagination, loading, error, refetch } = useArticlesByCategory('opinion', {
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
    <div className="opinion-page">
      {/* Hero Section */}
      <section className="opinion-hero">
        <div className="opinion-hero__background"></div>
        <div className="container">
          <div className="opinion-hero__content">
            <h1 className="opinion-hero__title">OPINION</h1>
            <p className="opinion-hero__description">
              Perspectives, commentaries, and viewpoints from our writers and contributors.
            </p>
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section className="opinion-content">
        <div className="container">
          {loading && (
            <div className="opinion-loading">
              <Spinner size="72px" message="Loading opinion articles..." />
            </div>
          )}

          {error && (
            <div className="opinion-error">
              <h2>Error Loading Articles</h2>
              <p>{error}</p>
              <button onClick={refetch} className="opinion-error__retry">
                Try Again
              </button>
            </div>
          )}

          {!loading && !error && articles.length === 0 && (
            <div className="opinion-empty">
              <h2>No Articles Found</h2>
              <p>There are no opinion articles available at the moment.</p>
            </div>
          )}

          {!loading && !error && articles.length > 0 && (
            <>
              <div className="opinion-grid">
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
                <div className="opinion-pagination">
                  <button
                    className="opinion-pagination__btn"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 0}
                    aria-label="Previous page"
                  >
                    Previous
                  </button>
                  
                  <div className="opinion-pagination__info">
                    Page {currentPage + 1} of {pagination.totalPages}
                  </div>
                  
                  <button
                    className="opinion-pagination__btn"
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

export default Opinion;

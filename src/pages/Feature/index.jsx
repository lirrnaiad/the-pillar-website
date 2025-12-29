import { useState } from 'react';
import { useArticlesByCategory } from '../../hooks/useArticlesRest';
import ArticleCard from '../../components/ui/ArticleCard';
import { Spinner } from '../../components/common';
import './Feature.css';

function Feature() {
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 12;

  // Fetch articles for Feature category
  const { articles, pagination, loading, error, refetch } = useArticlesByCategory('feature', {
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
    <div className="feature-page">
      {/* Hero Section */}
      <section className="feature-hero">
        <div className="feature-hero__background"></div>
        <div className="container">
          <div className="feature-hero__content">
            <h1 className="feature-hero__title">FEATURE</h1>
            <p className="feature-hero__description">
              In-depth stories and features that highlight the people, events, and issues that matter to our community.
            </p>
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section className="feature-content">
        <div className="container">
          {loading && (
            <div className="feature-loading">
              <Spinner size="72px" message="Loading feature articles..." />
            </div>
          )}

          {error && (
            <div className="feature-error">
              <h2>Error Loading Articles</h2>
              <p>{error}</p>
              <button onClick={refetch} className="feature-error__retry">
                Try Again
              </button>
            </div>
          )}

          {!loading && !error && articles.length === 0 && (
            <div className="feature-empty">
              <h2>No Articles Found</h2>
              <p>There are no feature articles available at the moment.</p>
            </div>
          )}

          {!loading && !error && articles.length > 0 && (
            <>
              <div className="feature-grid">
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
                <div className="feature-pagination">
                  <button
                    className="feature-pagination__btn"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 0}
                    aria-label="Previous page"
                  >
                    Previous
                  </button>
                  
                  <div className="feature-pagination__info">
                    Page {currentPage + 1} of {pagination.totalPages}
                  </div>
                  
                  <button
                    className="feature-pagination__btn"
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

export default Feature;

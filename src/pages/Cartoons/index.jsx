import { useState } from 'react';
import { useArticlesByCategory } from '../../hooks/useArticlesRest';
import ArticleCard from '../../components/ui/ArticleCard';
import { Spinner } from '../../components/common';
import './Cartoons.css';

function Cartoons() {
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 12;

  // Fetch articles for Cartoons category
  // Try different slug variations: 'cartoons', 'cartoons-and-comics', 'cartoons & comics'
  const { articles, pagination, loading, error, refetch } = useArticlesByCategory('cartoons', {
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
    <div className="cartoons-page">
      {/* Hero Section */}
      <section className="cartoons-hero">
        <div className="cartoons-hero__background"></div>
        <div className="container">
          <div className="cartoons-hero__content">
            <h1 className="cartoons-hero__title">CARTOONS & COMICS</h1>
            <p className="cartoons-hero__description">
              Editorial cartoons and comic strips that bring commentary with creativity and humor.
            </p>
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section className="cartoons-content">
        <div className="container">
          {loading && (
            <div className="cartoons-loading">
              <Spinner size="72px" message="Loading cartoons and comics..." />
            </div>
          )}

          {error && (
            <div className="cartoons-error">
              <h2>Error Loading Articles</h2>
              <p>{error}</p>
              <button onClick={refetch} className="cartoons-error__retry">
                Try Again
              </button>
            </div>
          )}

          {!loading && !error && articles.length === 0 && (
            <div className="cartoons-empty">
              <h2>No Articles Found</h2>
              <p>There are no cartoon or comic articles available at the moment.</p>
            </div>
          )}

          {!loading && !error && articles.length > 0 && (
            <>
              <div className="cartoons-grid">
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
                <div className="cartoons-pagination">
                  <button
                    className="cartoons-pagination__btn"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 0}
                    aria-label="Previous page"
                  >
                    Previous
                  </button>
                  
                  <div className="cartoons-pagination__info">
                    Page {currentPage + 1} of {pagination.totalPages}
                  </div>
                  
                  <button
                    className="cartoons-pagination__btn"
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

export default Cartoons;

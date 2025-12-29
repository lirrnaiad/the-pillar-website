import { useState } from 'react';
import { useArticlesByCategory } from '../../hooks/useArticlesRest';
import ArticleCard from '../../components/ui/ArticleCard';
import { Spinner } from '../../components/common';
import './Photos.css';

function Photos() {
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 12;

  // Fetch articles for Photos category
  // Using 'photos' as the category slug - adjust if your backend uses a different slug
  const { articles, pagination, loading, error, refetch } = useArticlesByCategory('photos', {
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
    <div className="photos-page">
      {/* Hero Section */}
      <section className="photos-hero">
        <div className="photos-hero__background"></div>
        <div className="container">
          <div className="photos-hero__content">
            <h1 className="photos-hero__title">PHOTOS</h1>
            <p className="photos-hero__description">
              Visual stories captured by our photojournalists documenting campus life and events.
            </p>
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section className="photos-content">
        <div className="container">
          {loading && (
            <div className="photos-loading">
              <Spinner size="72px" message="Loading photo articles..." />
            </div>
          )}

          {error && (
            <div className="photos-error">
              <h2>Error Loading Articles</h2>
              <p>{error}</p>
              <button onClick={refetch} className="photos-error__retry">
                Try Again
              </button>
            </div>
          )}

          {!loading && !error && articles.length === 0 && (
            <div className="photos-empty">
              <h2>No Articles Found</h2>
              <p>There are no photo articles available at the moment.</p>
            </div>
          )}

          {!loading && !error && articles.length > 0 && (
            <>
              <div className="photos-grid">
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
                <div className="photos-pagination">
                  <button
                    className="photos-pagination__btn"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 0}
                    aria-label="Previous page"
                  >
                    Previous
                  </button>
                  
                  <div className="photos-pagination__info">
                    Page {currentPage + 1} of {pagination.totalPages}
                  </div>
                  
                  <button
                    className="photos-pagination__btn"
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

export default Photos;

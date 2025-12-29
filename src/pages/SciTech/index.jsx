import { useState } from 'react';
import { useArticlesByCategory } from '../../hooks/useArticlesRest';
import ArticleCard from '../../components/ui/ArticleCard';
import { Spinner } from '../../components/common';
import './SciTech.css';

function SciTech() {
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 12;

  // Fetch articles for Sci-Tech category
  const { articles, pagination, loading, error, refetch } = useArticlesByCategory('sci-tech', {
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
    <div className="scitech-page">
      {/* Hero Section */}
      <section className="scitech-hero">
        <div className="scitech-hero__background"></div>
        <div className="container">
          <div className="scitech-hero__content">
            <h1 className="scitech-hero__title">SCI-TECH</h1>
            <p className="scitech-hero__description">
              Exploring science, technology, and innovation in our academic community and beyond.
            </p>
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section className="scitech-content">
        <div className="container">
          {loading && (
            <div className="scitech-loading">
              <Spinner size="72px" message="Loading sci-tech articles..." />
            </div>
          )}

          {error && (
            <div className="scitech-error">
              <h2>Error Loading Articles</h2>
              <p>{error}</p>
              <button onClick={refetch} className="scitech-error__retry">
                Try Again
              </button>
            </div>
          )}

          {!loading && !error && articles.length === 0 && (
            <div className="scitech-empty">
              <h2>No Articles Found</h2>
              <p>There are no sci-tech articles available at the moment.</p>
            </div>
          )}

          {!loading && !error && articles.length > 0 && (
            <>
              <div className="scitech-grid">
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
                <div className="scitech-pagination">
                  <button
                    className="scitech-pagination__btn"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 0}
                    aria-label="Previous page"
                  >
                    Previous
                  </button>
                  
                  <div className="scitech-pagination__info">
                    Page {currentPage + 1} of {pagination.totalPages}
                  </div>
                  
                  <button
                    className="scitech-pagination__btn"
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

export default SciTech;

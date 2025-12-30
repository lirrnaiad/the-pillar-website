import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useArticles } from '../../hooks/useArticlesRest';
import { useCategoriesRest } from '../../hooks/useCategoriesRest';
import ArticleCard from '../../components/ui/ArticleCard';
import SearchFilters from '../../components/search/SearchFilters';
import { Spinner } from '../../components/common';
import './Search.css';

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(0);
  
  // Get search query and filters from URL params
  const query = searchParams.get('q') || '';
  const categoryId = searchParams.get('categoryId') || null;
  const tagIds = searchParams.get('tagIds') ? searchParams.get('tagIds').split(',').map(Number) : null;
  const featured = searchParams.get('featured') === 'true' ? true : null;
  const sortField = searchParams.get('sortField') || 'publishedAt';
  const sortDirection = searchParams.get('sortDirection') || 'DESC';

  // Fetch articles with search and filters
  const { articles, pagination, loading, error } = useArticles({
    page: currentPage,
    size: 12,
    search: query || null,
    categoryId: categoryId ? Number(categoryId) : null,
    tagIds: tagIds,
    featured: featured,
    sortField: sortField,
    sortDirection: sortDirection,
    autoFetch: true,
  });

  // Reset to page 0 when filters change
  useEffect(() => {
    setCurrentPage(0);
  }, [query, categoryId, searchParams.get('tagIds'), featured, sortField, sortDirection]);

  const handleFilterChange = (newFilters) => {
    const params = new URLSearchParams();
    
    if (query) params.set('q', query);
    if (newFilters.categoryId) params.set('categoryId', newFilters.categoryId);
    if (newFilters.tagIds && newFilters.tagIds.length > 0) {
      params.set('tagIds', newFilters.tagIds.join(','));
    }
    if (newFilters.featured) params.set('featured', 'true');
    if (newFilters.sortField) params.set('sortField', newFilters.sortField);
    if (newFilters.sortDirection) params.set('sortDirection', newFilters.sortDirection);
    
    setSearchParams(params);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="search-page">
      <div className="container">
        {/* Search Header */}
        <div className="search-header">
          <h1 className="search-header__title">
            {query 
              ? `Search Results for "${query}"` 
              : (categoryId || (tagIds && tagIds.length > 0) || featured)
                ? 'Filtered Articles'
                : 'Search Articles'}
          </h1>
          {!loading && articles && (
            <p className="search-header__count">
              {pagination.totalElements} {pagination.totalElements === 1 ? 'result' : 'results'} found
            </p>
          )}
        </div>

        <div className="search-content">
          {/* Filters Sidebar */}
          <aside className="search-filters-sidebar">
            <SearchFilters
              currentFilters={{
                categoryId,
                tagIds: tagIds || [],
                featured: featured === true,
                sortField,
                sortDirection,
              }}
              onFilterChange={handleFilterChange}
            />
          </aside>

          {/* Results Section */}
          <main className="search-results">
            {loading ? (
              <div className="search-results__loading">
                <Spinner size="72px" message="Searching articles..." />
              </div>
            ) : error ? (
              <div className="search-results__error">
                <p>Error: {error}</p>
              </div>
            ) : articles && articles.length > 0 ? (
              <>
                <div className="search-results__grid">
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
                  <div className="search-results__pagination">
                    <button
                      className="search-results__pagination-btn"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={!pagination.hasPreviousPage}
                    >
                      Previous
                    </button>
                    <span className="search-results__pagination-info">
                      Page {currentPage + 1} of {pagination.totalPages}
                    </span>
                    <button
                      className="search-results__pagination-btn"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={!pagination.hasNextPage}
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="search-results__empty">
                <h2>No articles found</h2>
                <p>
                  {query
                    ? `No articles match your search "${query}". Try different keywords or adjust your filters.`
                    : 'Enter a search query to find articles.'}
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default Search;


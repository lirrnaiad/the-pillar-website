import { useState, useEffect, useMemo } from 'react';
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
  const tagId = searchParams.get('tagId') ? Number(searchParams.get('tagId')) : null;
  const featured = searchParams.get('featured') === 'true' ? true : null;
  const sortField = searchParams.get('sortField') || 'publishedAt';
  const sortDirection = searchParams.get('sortDirection') || 'DESC';

  // When search query exists, use search endpoint only (no other filters to backend)
  // When no search query, use normal filter endpoint
  const hasSearchQuery = query && query.trim() !== '';
  
  // Determine if we need client-side filtering (when multiple filters or search + filters)
  const needsClientSideFilter = hasSearchQuery || (categoryId && tagId) || (categoryId && featured) || (tagId && featured);
  
  // Fetch articles - if search exists or multiple filters, fetch more and filter client-side
  const { articles: rawArticles, pagination: rawPagination, loading, error } = useArticles({
    page: needsClientSideFilter ? 0 : currentPage, // Fetch all for client-side filtering
    size: needsClientSideFilter ? 1000 : 12, // Fetch more to allow client-side filtering
    search: hasSearchQuery ? query : null,
    // Backend priority: categoryId > featured > tagIds, so only send highest priority filter
    categoryId: needsClientSideFilter ? null : (categoryId ? Number(categoryId) : null),
    tagIds: needsClientSideFilter ? null : (!categoryId && tagId ? [tagId] : null),
    featured: needsClientSideFilter ? null : (!categoryId && featured ? featured : null),
    sortField: sortField,
    sortDirection: sortDirection,
    autoFetch: true,
  });

  // Client-side filtering when search query exists or multiple filters
  const { articles, pagination } = useMemo(() => {
    if (!rawArticles) {
      return { articles: [], pagination: rawPagination };
    }

    let filtered = [...rawArticles];

    // Apply client-side filters when search query exists OR multiple filters are set
    if (needsClientSideFilter) {
      // Filter by category
      if (categoryId) {
        filtered = filtered.filter(article => 
          article.category && article.category.id === Number(categoryId)
        );
      }

      // Filter by tag
      if (tagId) {
        filtered = filtered.filter(article => 
          article.tags && article.tags.some(tag => tag.id === tagId)
        );
      }

      // Filter by featured
      if (featured) {
        filtered = filtered.filter(article => article.featured === true);
      }

      // Sort
      filtered.sort((a, b) => {
        if (sortField === 'publishedAt') {
          const dateA = new Date(a.publishedAt || a.createdAt || 0);
          const dateB = new Date(b.publishedAt || b.createdAt || 0);
          return sortDirection === 'DESC' ? dateB - dateA : dateA - dateB;
        }
        return 0;
      });

      // Client-side pagination
      const pageSize = 12;
      const startIndex = currentPage * pageSize;
      const endIndex = startIndex + pageSize;
      const paginatedArticles = filtered.slice(startIndex, endIndex);
      const totalPages = Math.ceil(filtered.length / pageSize);
      
      return {
        articles: paginatedArticles,
        pagination: {
          ...rawPagination,
          totalElements: filtered.length,
          totalPages: totalPages,
          hasNextPage: endIndex < filtered.length,
          hasPreviousPage: currentPage > 0,
        },
      };
    }

    // No search query - use backend filtering results as-is
    return { articles: filtered, pagination: rawPagination };
  }, [rawArticles, rawPagination, needsClientSideFilter, categoryId, tagId, featured, sortField, sortDirection, currentPage]);

  // Reset to page 0 when filters change
  useEffect(() => {
    setCurrentPage(0);
  }, [query, categoryId, searchParams.get('tagId'), featured, sortField, sortDirection]);

  const handleFilterChange = (newFilters) => {
    const params = new URLSearchParams();
    
    if (query) params.set('q', query);
    if (newFilters.categoryId) params.set('categoryId', newFilters.categoryId);
    if (newFilters.tagId) {
      params.set('tagId', newFilters.tagId);
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
              : (categoryId || tagId || featured)
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
                tagId: tagId || null,
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


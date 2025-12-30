import { useState, useEffect } from 'react';
import { useCategoriesRest } from '../../../hooks/useCategoriesRest';
import './SearchFilters.css';

// Common tags based on the subcategories we've seen
const COMMON_TAGS = [
  { id: 1, name: 'Video Report', slug: 'video-report' },
  { id: 2, name: 'Interview Video', slug: 'interview-video' },
  { id: 3, name: 'KODAK', slug: 'kodak' },
  { id: 4, name: 'Comics', slug: 'comics' },
  { id: 5, name: 'Cartoons', slug: 'cartoons' },
  { id: 6, name: 'Campus Sports', slug: 'campus-sports' },
  { id: 7, name: 'Intercollegiate', slug: 'intercollegiate' },
  { id: 8, name: 'Academe', slug: 'academe' },
  { id: 9, name: 'National News', slug: 'national-news' },
];

const SearchFilters = ({ currentFilters, onFilterChange }) => {
  const { categories, loading: categoriesLoading } = useCategoriesRest();
  const [localFilters, setLocalFilters] = useState({
    categoryId: currentFilters.categoryId || '',
    tagIds: currentFilters.tagIds || [],
    featured: currentFilters.featured || false,
    sortField: currentFilters.sortField || 'publishedAt',
    sortDirection: currentFilters.sortDirection || 'DESC',
  });

  useEffect(() => {
    setLocalFilters({
      categoryId: currentFilters.categoryId || '',
      tagIds: currentFilters.tagIds || [],
      featured: currentFilters.featured || false,
      sortField: currentFilters.sortField || 'publishedAt',
      sortDirection: currentFilters.sortDirection || 'DESC',
    });
  }, [currentFilters]);

  const handleCategoryChange = (e) => {
    const newFilters = {
      ...localFilters,
      categoryId: e.target.value || null,
    };
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleTagToggle = (tagId) => {
    const newTagIds = localFilters.tagIds.includes(tagId)
      ? localFilters.tagIds.filter(id => id !== tagId)
      : [...localFilters.tagIds, tagId];
    
    const newFilters = {
      ...localFilters,
      tagIds: newTagIds,
    };
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleFeaturedChange = (e) => {
    const newFilters = {
      ...localFilters,
      featured: e.target.checked,
    };
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSortChange = (e) => {
    const [field, direction] = e.target.value.split('-');
    const newFilters = {
      ...localFilters,
      sortField: field,
      sortDirection: direction,
    };
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      categoryId: null,
      tagIds: [],
      featured: false,
      sortField: 'publishedAt',
      sortDirection: 'DESC',
    };
    setLocalFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const hasActiveFilters = 
    localFilters.categoryId ||
    localFilters.tagIds.length > 0 ||
    localFilters.featured ||
    localFilters.sortField !== 'publishedAt' ||
    localFilters.sortDirection !== 'DESC';

  return (
    <div className="search-filters">
      <div className="search-filters__header">
        <h2 className="search-filters__title">Filters</h2>
        {hasActiveFilters && (
          <button
            className="search-filters__clear"
            onClick={handleClearFilters}
            type="button"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Category Filter */}
      <div className="search-filters__section">
        <label className="search-filters__label" htmlFor="category-filter">
          Category
        </label>
        <select
          id="category-filter"
          className="search-filters__select"
          value={localFilters.categoryId || ''}
          onChange={handleCategoryChange}
          disabled={categoriesLoading}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Tags Filter */}
      <div className="search-filters__section">
        <label className="search-filters__label">Tags</label>
        <div className="search-filters__tags">
          {COMMON_TAGS.map((tag) => (
            <label key={tag.id} className="search-filters__tag">
              <input
                type="checkbox"
                checked={localFilters.tagIds.includes(tag.id)}
                onChange={() => handleTagToggle(tag.id)}
              />
              <span>{tag.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Featured Filter */}
      <div className="search-filters__section">
        <label className="search-filters__checkbox-label">
          <input
            type="checkbox"
            checked={localFilters.featured}
            onChange={handleFeaturedChange}
          />
          <span>Featured Only</span>
        </label>
      </div>

      {/* Sort Filter */}
      <div className="search-filters__section">
        <label className="search-filters__label" htmlFor="sort-filter">
          Sort By
        </label>
        <select
          id="sort-filter"
          className="search-filters__select"
          value={`${localFilters.sortField}-${localFilters.sortDirection}`}
          onChange={handleSortChange}
        >
          <option value="publishedAt-DESC">Date: Newest First</option>
          <option value="publishedAt-ASC">Date: Oldest First</option>
          {localFilters.sortField === 'publishedAt' && (
            <option value="relevance-DESC">Relevance</option>
          )}
        </select>
      </div>
    </div>
  );
};

export default SearchFilters;


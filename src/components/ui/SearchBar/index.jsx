import { useState, useRef, useEffect } from 'react';
import './SearchBar.css';

export function SearchBar({ 
  onSearch, 
  placeholder = 'Search articles...',
  variant = 'default',
  autoFocus = false 
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() && onSearch) {
      onSearch(searchQuery);
    }
  };

  const handleClear = () => {
    setSearchQuery('');
    inputRef.current?.focus();
  };

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <form 
      className={`search-bar search-bar--${variant} ${isFocused ? 'search-bar--focused' : ''}`}
      onSubmit={handleSubmit}
      role="search"
    >
      <div className="search-bar__container">
        <div className="search-bar__left-actions">
          <svg 
            className="search-bar__icon search-bar__icon--search" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
        </div>

        <input
          ref={inputRef}
          type="search"
          className="search-bar__input"
          placeholder={placeholder}
          value={searchQuery}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          aria-label={placeholder}
        />
        {searchQuery && (
          <div className="search-bar__right-actions">
            <button
              type="button"
              className="search-bar__clear-btn"
              onClick={handleClear}
              aria-label="Clear search input"
              title="Clear"
            >
              <svg 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
                aria-hidden="true"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        )}

        <button
          type="submit"
          className="search-bar__submit-btn"
          aria-label="Submit search query"
          title="Search"
        >
          <svg 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
        </button>
      </div>
    </form>
  );
}

export default SearchBar;

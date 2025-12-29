import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import './Header.css';
import { SearchBar } from '../../ui/SearchBar';

// The Pillar logo
import logoImage from '../../../assets/images/thepillar-logo.png';

const navLinks = [
  { to: '/news', label: 'News' },
  { to: '/feature', label: 'Feature' },
  { to: '/opinion', label: 'Opinion' },
  { to: '/sci-tech', label: 'Sci-Tech' },
  { to: '/editorial', label: 'Editorial' },
  { to: '/sports', label: 'Sports' },
  { to: '/photos', label: 'Photos' },
  { to: '/cartoons', label: 'Cartoons' },
  { to: '/videos', label: 'Videos' },
];

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  useEffect(() => {
    // Prevent background scroll when search modal is open
    if (isSearchOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }

    return () => document.body.classList.remove('no-scroll');
  }, [isSearchOpen]);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleSearch = (query) => {
    // Navigate to search results page with query parameter
    navigate(`/search?q=${encodeURIComponent(query)}`);
    setIsSearchOpen(false);
  };

  return (
    <header className="header">
      <div className="header__container">
        {/* Left side - Menu button */}
        <button 
          className="header__menu-btn"
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation menu"
        >
          <span className="header__menu-icon">
            <span></span>
            <span></span>
            <span></span>
          </span>
          <span className="header__menu-text">More</span>
        </button>

        {/* Center - Logo */}
        <Link to="/" className="header__logo">
          <img 
            src={logoImage} 
            alt="The Pillar Logo" 
            className="header__logo-image"
          />
          <div className="header__logo-text">
            <span className="header__logo-title">The PILLAR</span>
            <span className="header__logo-tagline">CRITICAL. FEARLESS. UNAPOLOGETIC.</span>
          </div>
        </Link>

        {/* Right side - About Us and Search */}
        <div className="header__actions">
          <NavLink to="/about" className="header__about-link">
            About Us
          </NavLink>
          <button 
            className="header__search-btn"
            onClick={toggleSearch}
            aria-label="Open search"
          >
            <svg 
              className="header__search-icon" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <span>Search</span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <nav className={`header__nav ${isMenuOpen ? 'header__nav--open' : ''}`}>
        <div className="header__nav-overlay" onClick={closeMenu}></div>
        <div className="header__nav-content">
          <button 
            className="header__nav-close"
            onClick={closeMenu}
            aria-label="Close menu"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
          <ul className="header__nav-list">
            {navLinks.map((link) => (
              <li key={link.to} className="header__nav-item">
                <NavLink 
                  to={link.to} 
                  className={({ isActive }) => 
                    `header__nav-link ${isActive ? 'header__nav-link--active' : ''}`
                  }
                  onClick={closeMenu}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Search Modal */}
      {isSearchOpen && (
        <div className="header__search-modal">
          <div className="header__search-overlay" onClick={toggleSearch}></div>
          <div className="header__search-content">
            <SearchBar 
              variant="modal"
              autoFocus={true}
              onSearch={handleSearch}
              placeholder="Search articles..."
            />
            <button 
              className="header__search-close"
              onClick={toggleSearch}
              aria-label="Close search"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;


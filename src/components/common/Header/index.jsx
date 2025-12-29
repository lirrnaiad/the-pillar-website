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
    // Prevent background scroll when search modal or menu is open
    if (isSearchOpen || isMenuOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }

    return () => document.body.classList.remove('no-scroll');
  }, [isSearchOpen, isMenuOpen]);

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
        {/* Main Header Row */}
        <div className="header__top">
          {/* Left: Hamburger Menu */}
          <div className="header__left">
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
          </div>

          {/* Center: Logo */}
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

          {/* Right: Actions */}
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
      </div>

      {/* Navigation Menu (Drawer) */}
      <nav className={`header__nav ${isMenuOpen ? 'header__nav--open' : ''}`}>
        <div className="header__nav-overlay" onClick={closeMenu}></div>
        <div className="header__nav-content">
          <button 
            className="header__nav-close"
            onClick={closeMenu}
            aria-label="Close menu"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          <ul className="header__nav-list">
            <li className="header__nav-item">
              <NavLink 
                to="/" 
                className={({ isActive }) => 
                  `header__nav-link ${isActive ? 'header__nav-link--active' : ''}`
                }
                onClick={closeMenu}
              >
                Home
              </NavLink>
            </li>
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
            {/* About Us in mobile menu as well */}
            <li className="header__nav-item">
              <NavLink 
                to="/about" 
                className={({ isActive }) => 
                  `header__nav-link ${isActive ? 'header__nav-link--active' : ''}`
                }
                onClick={closeMenu}
              >
                About Us
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>

      {/* Search Modal */}
      {isSearchOpen && (
        <div className="header__search-modal">
          <div className="header__search-overlay" onClick={toggleSearch}></div>
          <div className="header__search-content">
            <button 
              className="header__search-close"
              onClick={toggleSearch}
              aria-label="Close search"
            >
              ✕
            </button>
            <SearchBar 
              variant="modal"
              autoFocus={true}
              onSearch={handleSearch}
              placeholder="Search articles..."
            />
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
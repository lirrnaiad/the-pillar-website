import { useState, useEffect } from 'react';
import logoImage from '../../assets/placeholder/The PILLAR Logo.png';
import './Header.css';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <>
      <header className="header">
        <button 
          className={`header__menu-btn ${isMenuOpen ? 'header__menu-btn--open' : ''}`}
          onClick={toggleMenu}
          aria-label="Menu"
          aria-expanded={isMenuOpen}
        >
          <span className="header__menu-icon">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
        
        <a href="/" className="header__logo">
          <div className="header__logo-icon">
            <img 
              src={logoImage} 
              alt="The PILLAR Logo" 
              className="header__logo-img"
            />
          </div>
          <div className="header__logo-text">
            <h1 className="header__title">The PILLAR</h1>
            <p className="header__slogan">CRITICAL. FEARLESS. UNAPOLOGETIC.</p>
          </div>
        </a>
        
        <div className="header__actions">
          <a href="/" className="header__btn">Home</a>
          <button className="header__btn">About Us</button>
          <button className="header__btn header__btn--search" aria-label="Search">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="2"/>
              <path d="M13 13L17 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </header>

      {/* Sidebar Navigation Menu */}
      <nav className={`sidebar-nav ${isMenuOpen ? 'sidebar-nav--open' : ''}`}>
        <div className="sidebar-nav__overlay" onClick={closeMenu}></div>
        <div className="sidebar-nav__content">
          <ul className="sidebar-nav__list">
            <li className="sidebar-nav__item">
              <a href="/" className="sidebar-nav__link" onClick={closeMenu}>HOME</a>
            </li>
            <li className="sidebar-nav__item">
              <a href="/editorial" className="sidebar-nav__link" onClick={closeMenu}>EDITORIAL</a>
            </li>
            <li className="sidebar-nav__item">
              <a href="/news" className="sidebar-nav__link" onClick={closeMenu}>NEWS</a>
            </li>
            <li className="sidebar-nav__item">
              <a href="/feature" className="sidebar-nav__link" onClick={closeMenu}>FEATURE</a>
            </li>
            <li className="sidebar-nav__item">
              <a href="/opinion" className="sidebar-nav__link" onClick={closeMenu}>OPINION</a>
            </li>
            <li className="sidebar-nav__item">
              <a href="/scitech" className="sidebar-nav__link" onClick={closeMenu}>SCI-TECH</a>
            </li>
            <li className="sidebar-nav__item">
              <a href="/photos" className="sidebar-nav__link" onClick={closeMenu}>PHOTOS</a>
            </li>
            <li className="sidebar-nav__item">
              <a href="/cartoons" className="sidebar-nav__link" onClick={closeMenu}>CARTOONS AND COMICS</a>
            </li>
            <li className="sidebar-nav__item">
              <a href="/videos" className="sidebar-nav__link" onClick={closeMenu}>VIDEOS</a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Header;

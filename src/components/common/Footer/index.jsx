import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

// Monochrome logo for footer
import logoImage from '../../../assets/images/thepillar-logo-monochrome.png';

// Social media links
const socialLinks = [
  { 
    name: 'Facebook', 
    url: 'https://facebook.com/thepillaruep',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
      </svg>
    )
  },
  { 
    name: 'Email', 
    url: 'mailto:thepillar@uep.edu.ph',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
      </svg>
    )
  },
  { 
    name: 'TikTok', 
    url: 'https://tiktok.com/@thepillaruep',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
      </svg>
    )
  },
  { 
    name: 'Instagram', 
    url: 'https://instagram.com/thepillaruep',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    )
  },
  { 
    name: 'YouTube', 
    url: 'https://youtube.com/@thepillaruep',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    )
  },
];

function Footer() {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement newsletter signup with backend
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  return (
    <footer className="footer">
      <div className="footer__container">
        {/* Left Section - Logo and Description */}
        <div className="footer__brand">
          <Link to="/" className="footer__logo">
            <img 
              src={logoImage} 
              alt="The Pillar Logo" 
              className="footer__logo-image"
            />
            <span className="footer__logo-title">THE PILLAR</span>
          </Link>
          <p className="footer__description">
            <strong>The Pillar</strong> is the official student publication of the 
            University of Eastern Philippines-Main Campus. 
            Upholding its tenet: <strong>Critical. Fearless. Unapologetic.</strong>
          </p>
        </div>

        {/* Right Section - Social Links */}
        <div className="footer__social">
          <h4 className="footer__heading">Follow us:</h4>
          <div className="footer__social-links">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                className="footer__social-link"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Follow us on ${social.name}`}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="footer__bottom">
        <div className="footer__bottom-container">
          {/* Copyright */}
          <p className="footer__copyright">
            © <em>The Pillar. All Rights Reserved.</em>
          </p>

          {/* Newsletter Signup */}
          <div className="footer__newsletter">
            <label htmlFor="newsletter-email" className="footer__newsletter-label">
              Login to get your e-copies of newsletters:
            </label>
            <form className="footer__newsletter-form" onSubmit={handleNewsletterSubmit}>
              <input
                type="email"
                id="newsletter-email"
                className="footer__newsletter-input"
                placeholder="name123@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

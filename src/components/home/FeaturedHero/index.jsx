import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './FeaturedHero.css';

const FeaturedHero = ({ articles = [] }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % articles.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [articles.length]);

  if (!articles.length) return null;

  return (
    <div className="featured-hero">
      {articles.map((article, index) => (
        <div
          key={index}
          className={`featured-hero__slide ${
            index === activeIndex ? 'featured-hero__slide--active' : ''
          }`}
        >
          {article.image && (
            <img
              src={article.image}
              alt={article.headline}
              className="featured-hero__image"
            />
          )}
          <div className="featured-hero__overlay"></div>
          
          <div className="featured-hero__content">
            <span className="featured-hero__category">{article.category}</span>
            <h2 className="featured-hero__headline">{article.headline}</h2>
            <p className="featured-hero__meta">{article.meta}</p>
            <Link to={article.link || '#'} className="featured-hero__btn">
              Read Article
            </Link>
          </div>
        </div>
      ))}
      
      <div className="featured-hero__controls">
        {articles.map((_, index) => (
          <button
            key={index}
            className={`featured-hero__dot ${
              index === activeIndex ? 'featured-hero__dot--active' : ''
            }`}
            onClick={() => setActiveIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedHero;

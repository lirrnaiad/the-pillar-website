import React from 'react';
import './Card.css';

/**
 * Card Component
 * Props:
 * - image: string (image URL)
 * - imageAlt: string
 * - title: string
 * - excerpt: string
 * - category: string
 * - date: string (displayable)
 * - author: string
 * - link: string (optional) - href to article
 */
const Card = ({
  image,
  imageAlt = '',
  title,
  excerpt,
  category,
  date,
  author,
  link,
  className = '',
  ...props
}) => {
  const Container = link ? 'a' : 'div';
  const containerProps = link
    ? { href: link, className: `card ${className}` }
    : { className: `card ${className}` };

  return (
    <article className="card" {...props}>
      <Container {...containerProps} aria-label={title}>
        {image && (
          <div className="card__media">
            <img src={image} alt={imageAlt || title} className="card__image" />
            {category && <span className="card__category">{category}</span>}
          </div>
        )}

        <div className="card__body">
          {title && <h3 className="card__title">{title}</h3>}
          {excerpt && <p className="card__excerpt">{excerpt}</p>}

          <div className="card__meta">
            {author && <span className="card__author">{author}</span>}
            {date && <span className="card__date">{date}</span>}
          </div>
        </div>
      </Container>
    </article>
  );
};

export default Card;

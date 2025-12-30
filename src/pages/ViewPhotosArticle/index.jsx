import { useParams, Link } from 'react-router-dom';
import { useArticleWithViews } from '../../hooks/useArticlesRest';
import { Spinner } from '../../components/common';
import { parseImagesFromContent, extractCaptionFromContent } from '../../utils/articleHelpers';
import './ViewPhotosArticle.css';

/**
 * Format date for display
 */
const formatDate = (dateString) => {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  } catch (e) {
    return dateString;
  }
};

function ViewPhotosArticle() {
  const { slug } = useParams();
  const { article, loading, error } = useArticleWithViews(slug, true);

  if (loading) {
    return (
      <article className="photos-article">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem 0' }}>
            <Spinner size="72px" message="Loading photo article…" />
          </div>
        </div>
      </article>
    );
  }

  if (error || !article) {
    return (
      <article className="photos-article">
        <div className="container">
          <div className="photos-article__notfound">
            <h1>Article Not Found</h1>
            <p>The photo article you're looking for doesn't exist or has been removed.</p>
            <Link to="/photos" className="photos-article__back-link">
              Back to Photos
            </Link>
          </div>
        </div>
      </article>
    );
  }

  // Parse images from content
  const images = parseImagesFromContent(article.content || '');
  
  // Get caption for second image (caption + image side by side)
  const captionForSecondImage = images.length > 1 
    ? extractCaptionFromContent(article.content || '', 1) 
    : '';

  // Get author name for card format
  const authorName = article.author?.fullName || 
                     (article.author?.firstName && article.author?.lastName 
                       ? `${article.author.firstName} ${article.author.lastName}`
                       : article.author?.firstName || 'Unknown Author');

  // Render image gallery based on layout pattern
  const renderImageGallery = () => {
    if (images.length === 0) {
      // Fallback to cover image with card format if no images in content
      if (article.cover?.url) {
        return (
          <div className="photos-article__hero-card">
            <div className="photos-article__hero-image-wrapper">
              <img 
                src={article.cover.url} 
                alt={article.cover.altText || article.title}
                className="photos-article__hero-image"
              />
            </div>
            <div className="photos-article__hero-content">
              <span className="photos-article__hero-category">PHOTOS</span>
              <h1 className="photos-article__hero-title">{article.title}</h1>
              <p className="photos-article__hero-meta">by {authorName}</p>
              {article.excerpt && (
                <p className="photos-article__hero-caption">{article.excerpt}</p>
              )}
            </div>
          </div>
        );
      }
      // No cover image either - show placeholder card
      return (
        <div className="photos-article__hero-card">
          <div className="photos-article__hero-image-wrapper">
            <div className="photos-article__hero-placeholder">
              No Image
            </div>
          </div>
          <div className="photos-article__hero-content">
            <span className="photos-article__hero-category">PHOTOS</span>
            <h1 className="photos-article__hero-title">{article.title}</h1>
            <p className="photos-article__hero-meta">by {authorName}</p>
            {article.excerpt && (
              <p className="photos-article__hero-caption">{article.excerpt}</p>
            )}
          </div>
        </div>
      );
    }

    if (images.length === 1) {
      // Single image - show as thumbnail
      return (
        <div className="photos-article__thumbnail">
          <img 
            src={images[0].src} 
            alt={images[0].alt || article.title}
            className="photos-article__image"
          />
        </div>
      );
    }

    const gallery = [];
    const firstImage = images[0];
    const lastImage = images[images.length - 1];
    const middleImages = images.slice(1, -1);

    // 1. First image (thumbnail) - large, full width
    gallery.push(
      <div key="thumbnail" className="photos-article__thumbnail">
        <img 
          src={firstImage.src} 
          alt={firstImage.alt || article.title}
          className="photos-article__image"
        />
      </div>
    );

    // 2. Caption + Image side by side (if we have at least 2 images and more than 2 total)
    // If we have exactly 2 images, skip this and show second image as last image
    if (images.length > 2 && captionForSecondImage) {
      gallery.push(
        <div key="caption-image" className="photos-article__caption-image-row">
          <div className="photos-article__caption-text">
            {captionForSecondImage}
          </div>
          <div className="photos-article__caption-image">
            <img 
              src={images[1].src} 
              alt={images[1].alt || article.title}
              className="photos-article__image"
            />
          </div>
        </div>
      );
    } else if (images.length > 2) {
      // If no caption and more than 2 images, show second image as single
      gallery.push(
        <div key="image-1" className="photos-article__single-image">
          <img 
            src={images[1].src} 
            alt={images[1].alt || article.title}
            className="photos-article__image"
          />
        </div>
      );
    }

    // 3. Loop pattern for middle images (2-1 pattern)
    // Pattern: [Image][Image] → [Image] → [Image][Image] → [Image] → ...
    // Start from image 2 if we have more than 2 images, otherwise skip
    let imageIndex = images.length > 2 ? 2 : images.length;
    let patternIndex = 0; // 0 = two images, 1 = one image

    while (imageIndex < images.length - 1) {
      if (patternIndex === 0) {
        // Two images side by side
        if (imageIndex + 1 < images.length - 1) {
          gallery.push(
            <div key={`two-${imageIndex}`} className="photos-article__two-images">
              <img 
                src={images[imageIndex].src} 
                alt={images[imageIndex].alt || article.title}
                className="photos-article__image"
              />
              <img 
                src={images[imageIndex + 1].src} 
                alt={images[imageIndex + 1].alt || article.title}
                className="photos-article__image"
              />
            </div>
          );
          imageIndex += 2;
        } else {
          // Only one image left before last, show as single
          gallery.push(
            <div key={`single-${imageIndex}`} className="photos-article__single-image">
              <img 
                src={images[imageIndex].src} 
                alt={images[imageIndex].alt || article.title}
                className="photos-article__image"
              />
            </div>
          );
          imageIndex += 1;
        }
        patternIndex = 1;
      } else {
        // One image (full width)
        gallery.push(
          <div key={`single-${imageIndex}`} className="photos-article__single-image">
            <img 
              src={images[imageIndex].src} 
              alt={images[imageIndex].alt || article.title}
              className="photos-article__image"
            />
          </div>
        );
        imageIndex += 1;
        patternIndex = 0;
      }
    }

    // 4. Last image - full width, hits horizontal viewport borders
    // Only show if we have more than 1 image
    if (images.length > 1) {
      gallery.push(
        <div key="last-image" className="photos-article__last-image-wrapper">
          <img 
            src={lastImage.src} 
            alt={lastImage.alt || article.title}
            className="photos-article__image photos-article__last-image"
          />
        </div>
      );
    }

    return gallery;
  };

  return (
    <article className="photos-article">
      <div className="container">
        {/* Image Gallery */}
        <div className="photos-article__gallery">
          {renderImageGallery()}
        </div>
      </div>
    </article>
  );
}

export default ViewPhotosArticle;


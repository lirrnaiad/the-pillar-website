import { useParams, Link } from 'react-router-dom';
import { useArticleWithViews } from '../../hooks/useArticlesRest';
import { Spinner } from '../../components/common';
import { parseImagesFromContent, extractCaptionFromContent } from '../../utils/articleHelpers';
import ImageFrame from '../../components/photos/ImageFrame';
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
  
  // Filter out invalid images (empty src or invalid URLs)
  const validImages = images.filter(img => img && img.src && img.src.trim() !== '');
  
  // Get caption for second image (caption + image side by side)
  const captionForSecondImage = validImages.length > 1 
    ? extractCaptionFromContent(article.content || '', 1) 
    : '';

  // Get author name for card format
  const authorName = article.author?.fullName || 
                     (article.author?.firstName && article.author?.lastName 
                       ? `${article.author.firstName} ${article.author.lastName}`
                       : article.author?.firstName || 'Unknown Author');

  // Render image gallery based on layout pattern
  const renderImageGallery = () => {
    // Use validImages instead of images
    const displayImages = validImages.length > 0 ? validImages : images;
    
    if (displayImages.length === 0) {
      // Fallback to cover image with card format if no images in content
      // Always render gallery structure with placeholder
      return (
        <div className="photos-article__thumbnail">
          <ImageFrame
            src={article.cover?.url}
            alt={article.cover?.altText || article.title}
            variant="thumbnail"
          />
        </div>
      );
    }

    if (displayImages.length === 1) {
      // Single image - show as thumbnail
      return (
        <div className="photos-article__thumbnail">
          <ImageFrame
            src={displayImages[0].src}
            alt={displayImages[0].alt || article.title}
            variant="thumbnail"
          />
        </div>
      );
    }

    const gallery = [];
    const firstImage = displayImages[0];
    const lastImage = displayImages[displayImages.length - 1];
    const middleImages = displayImages.slice(1, -1);

    // 1. First image (thumbnail) - large, full width
    gallery.push(
      <div key="thumbnail" className="photos-article__thumbnail">
        <ImageFrame
          src={firstImage.src}
          alt={firstImage.alt || article.title}
          variant="thumbnail"
        />
      </div>
    );

    // 2. Caption + Image side by side (if we have at least 2 images and more than 2 total)
    // If we have exactly 2 images, skip this and show second image as last image
    if (displayImages.length > 2 && captionForSecondImage) {
      gallery.push(
        <div key="caption-image" className="photos-article__caption-image-row">
          <div className="photos-article__caption-text">
            {captionForSecondImage}
          </div>
          <div className="photos-article__caption-image">
            <ImageFrame
              src={displayImages[1].src}
              alt={displayImages[1].alt || article.title}
              variant="caption-image"
            />
          </div>
        </div>
      );
    } else if (displayImages.length > 2) {
      // If no caption and more than 2 images, show second image as single
      gallery.push(
        <div key="image-1" className="photos-article__single-image">
          <ImageFrame
            src={displayImages[1].src}
            alt={displayImages[1].alt || article.title}
            variant="single"
          />
        </div>
      );
    }

    // 3. Loop pattern for middle images (2-1 pattern)
    // Pattern: [Image][Image] → [Image] → [Image][Image] → [Image] → ...
    // Start from image 2 if we have more than 2 images, otherwise skip
    let imageIndex = displayImages.length > 2 ? 2 : displayImages.length;
    let patternIndex = 0; // 0 = two images, 1 = one image

    while (imageIndex < displayImages.length - 1) {
      if (patternIndex === 0) {
        // Two images side by side
        if (imageIndex + 1 < displayImages.length - 1) {
          gallery.push(
            <div key={`two-${imageIndex}`} className="photos-article__two-images">
              <ImageFrame
                src={displayImages[imageIndex].src}
                alt={displayImages[imageIndex].alt || article.title}
                variant="two-images"
              />
              <ImageFrame
                src={displayImages[imageIndex + 1].src}
                alt={displayImages[imageIndex + 1].alt || article.title}
                variant="two-images"
              />
            </div>
          );
          imageIndex += 2;
        } else {
          // Only one image left before last, show as single
          gallery.push(
            <div key={`single-${imageIndex}`} className="photos-article__single-image">
              <ImageFrame
                src={displayImages[imageIndex].src}
                alt={displayImages[imageIndex].alt || article.title}
                variant="single"
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
            <ImageFrame
              src={displayImages[imageIndex].src}
              alt={displayImages[imageIndex].alt || article.title}
              variant="single"
            />
          </div>
        );
        imageIndex += 1;
        patternIndex = 0;
      }
    }

    // 4. Last image - full width, hits horizontal viewport borders
    // Only show if we have more than 1 image
    if (displayImages.length > 1) {
      gallery.push(
        <div key="last-image" className="photos-article__last-image-wrapper">
          <ImageFrame
            src={lastImage.src}
            alt={lastImage.alt || article.title}
            variant="last-image"
            className="photos-article__last-image"
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


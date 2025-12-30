import { useState } from 'react';
import './ImageFrame.css';

/**
 * ImageFrame component with error handling and placeholder support
 * Ensures image frames always render even when images are missing or fail to load
 * 
 * @param {string} src - Image source URL
 * @param {string} alt - Alt text for the image
 * @param {string} variant - Gallery section type: 'thumbnail', 'single', 'two-images', 'last-image', 'caption-image'
 * @param {string} className - Additional CSS classes
 */
const ImageFrame = ({ src, alt = '', variant = 'single', className = '' }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Determine if we should show placeholder
  const showPlaceholder = !src || imageError;

  const handleImageError = () => {
    setImageError(true);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  // Base classes for the frame container
  const frameClasses = `photos-article__image-frame photos-article__image-frame--${variant} ${className}`.trim();

  return (
    <div className={frameClasses}>
      {showPlaceholder ? (
        <div className="photos-article__image-placeholder">
          No Image
        </div>
      ) : (
        <>
          {!imageLoaded && (
            <div className="photos-article__image-placeholder photos-article__image-placeholder--loading">
              Loading...
            </div>
          )}
          <img
            src={src}
            alt={alt}
            className={`photos-article__image ${imageLoaded ? 'photos-article__image--loaded' : 'photos-article__image--loading'}`}
            onError={handleImageError}
            onLoad={handleImageLoad}
            loading="lazy"
          />
        </>
      )}
    </div>
  );
};

export default ImageFrame;


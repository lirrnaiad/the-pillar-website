/**
 * Utility functions for article processing and parsing
 */

/**
 * Parse images from HTML content
 * Extracts all <img> tags and returns array of image objects
 * @param {string} htmlContent - HTML content string
 * @returns {Array<{src: string, alt: string, index: number}>} Array of image objects
 */
export const parseImagesFromContent = (htmlContent) => {
  if (!htmlContent) return [];

  // Create a temporary DOM element to parse HTML
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlContent;

  const images = [];
  const imgElements = tempDiv.querySelectorAll('img');

  imgElements.forEach((img, index) => {
    images.push({
      src: img.src || img.getAttribute('src') || '',
      alt: img.alt || img.getAttribute('alt') || '',
      index: index,
    });
  });

  return images;
};

/**
 * Extract caption text from HTML content
 * Looks for text content before or after images
 * @param {string} htmlContent - HTML content string
 * @param {number} imageIndex - Index of the image to get caption for
 * @returns {string} Caption text or empty string
 */
export const extractCaptionFromContent = (htmlContent, imageIndex = 0) => {
  if (!htmlContent) return '';

  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlContent;

  const imgElements = tempDiv.querySelectorAll('img');
  if (imageIndex >= imgElements.length) return '';

  const targetImg = imgElements[imageIndex];
  
  // Try to get text from parent element or sibling
  let caption = '';
  
  // Check if image is in a paragraph or div with text
  const parent = targetImg.parentElement;
  if (parent) {
    const textContent = parent.textContent?.trim() || '';
    // Remove the image src/alt from text content
    const cleanText = textContent.replace(targetImg.alt || '', '').trim();
    if (cleanText) {
      caption = cleanText;
    }
  }

  // If no caption found, check next sibling
  if (!caption && targetImg.nextSibling) {
    const nextText = targetImg.nextSibling.textContent?.trim() || '';
    if (nextText) {
      caption = nextText;
    }
  }

  return caption;
};

/**
 * Determine if article is a Cartoon or Comic based on tags
 * @param {Object} article - Article object
 * @returns {string} 'CARTOON', 'COMIC', or 'COMICS & CARTOONS'
 */
export const determineCartoonOrComic = (article) => {
  if (!article || !article.tags || !Array.isArray(article.tags)) {
    return 'COMICS & CARTOONS';
  }

  const tagNames = article.tags.map(tag => tag.name?.toLowerCase() || '');
  
  if (tagNames.includes('cartoons') || tagNames.includes('cartoon')) {
    return 'CARTOON';
  }
  if (tagNames.includes('comics') || tagNames.includes('comic')) {
    return 'COMIC';
  }

  return 'COMICS & CARTOONS';
};

/**
 * Get article subcategory tag name
 * @param {Object} article - Article object
 * @returns {string|null} Subcategory tag name or null
 */
export const getArticleSubcategory = (article) => {
  if (!article || !article.tags || !Array.isArray(article.tags)) {
    return null;
  }

  // Common subcategory tag names
  const subcategoryTags = [
    'Cartoons', 'Comics', 'Video Report', 'Interview Video', 'KODAK',
    'Campus Sports', 'Intercollegiate', 'Academe', 'National News'
  ];

  for (const tag of article.tags) {
    const tagName = tag.name || '';
    if (subcategoryTags.includes(tagName)) {
      return tagName;
    }
  }

  // Return first tag if no match found
  return article.tags.length > 0 ? (article.tags[0].name || null) : null;
};

/**
 * Get the route path based on article category
 * @param {Object} article - Article object
 * @returns {string} Route path
 */
export const getArticleRoute = (article) => {
  if (!article || !article.category) return '/article/unknown';
  
  const categorySlug = article.category.slug?.toLowerCase() || article.category.name?.toLowerCase() || '';
  
  if (categorySlug === 'photos' || categorySlug.includes('photo')) {
    return `/photos/${article.slug}`;
  }
  if (categorySlug === 'cartoons' || categorySlug === 'cartoons-and-comics' || categorySlug === 'comics-and-cartoons' || categorySlug.includes('cartoon') || categorySlug.includes('comic')) {
    return `/cartoons/${article.slug}`;
  }
  if (categorySlug === 'videos' || categorySlug.includes('video')) {
    return `/videos/${article.slug}`;
  }
  
  return `/article/${article.slug}`;
};


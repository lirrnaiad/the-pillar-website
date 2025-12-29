/**
 * Category Subcategories Configuration
 * Maps category slugs to their subcategory tag names (used as tags in backend)
 * 
 * Note: These tag names should match the actual tag names in the backend.
 * If tags don't exist, the subcategory sections will be empty.
 */
export const CATEGORY_SUBCATEGORIES = {
  'news': ['Academe', 'National News'],
  'opinion': ['Editorial', 'Opinion Piece'], // Placeholder - adjust as needed
  'feature': ['Feature Story', 'Interview'], // Placeholder - adjust as needed
  'editorial': ['Editorial', 'Column'], // Placeholder - adjust as needed
  'sci-tech': ['Science', 'Technology'], // Placeholder - adjust as needed
  'videos': ['Video Report', 'Interview Video'], // Placeholder - adjust as needed
};

/**
 * Get subcategories for a category slug
 * @param {string} categorySlug - Category slug
 * @returns {string[]} Array of subcategory tag names
 */
export const getSubcategoriesForCategory = (categorySlug) => {
  return CATEGORY_SUBCATEGORIES[categorySlug] || [];
};


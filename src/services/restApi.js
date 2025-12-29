/**
 * REST API Service for The Pillar Website
 * Integrates with the deployed backend at http://174.138.17.108:8080/api
 */

// Get API URL from environment variable, default to deployed backend
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://174.138.17.108:8080/api';

/**
 * Get authentication token from localStorage
 */
export const getAuthToken = () => {
  return localStorage.getItem('auth_token');
};

/**
 * Set authentication token in localStorage
 */
export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('auth_token', token);
  } else {
    localStorage.removeItem('auth_token');
  }
};

/**
 * Create headers with optional authentication
 */
const createHeaders = (requireAuth = false) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  if (requireAuth) {
    const token = getAuthToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  return headers;
};

/**
 * Make HTTP request to the API
 */
const apiRequest = async (endpoint, options = {}) => {
  const { requireAuth = false, method = 'GET', body = null, ...fetchOptions } = options;
  
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = createHeaders(requireAuth);

  try {
    const response = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : null,
      ...fetchOptions,
    });

    if (!response.ok) {
      // Try to parse error response
      let errorMessage = `HTTP error! status: ${response.status}`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorData.error || errorMessage;
      } catch (e) {
        // If response is not JSON, use status text
        errorMessage = response.statusText || errorMessage;
      }
      throw new Error(errorMessage);
    }

    // Handle 204 No Content responses
    if (response.status === 204) {
      return { data: null, error: null };
    }

    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    console.error('API Request Error:', error);
    return { data: null, error };
  }
};

/**
 * Build query string from parameters
 */
const buildQueryString = (params) => {
  const queryParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== '') {
      if (Array.isArray(value)) {
        // Handle array parameters (e.g., tagIds)
        value.forEach(item => queryParams.append(key, item));
      } else {
        queryParams.append(key, value);
      }
    }
  });

  const queryString = queryParams.toString();
  return queryString ? `?${queryString}` : '';
};

/**
 * Get articles with pagination and filtering
 * @param {Object} params - Query parameters
 * @returns {Promise} Response with articles data
 */
export const getArticles = async (params = {}) => {
  const {
    page = 0,
    size = 10,
    status = 'PUBLISHED',
    categoryId = null,
    tagIds = null,
    issueId = null,
    authorId = null,
    featured = null,
    search = null,
    sortField = 'publishedAt',
    sortDirection = 'DESC',
  } = params;

  const queryParams = {
    page,
    size,
    status,
    sortField,
    sortDirection,
    ...(categoryId && { categoryId }),
    ...(tagIds && { tagIds: Array.isArray(tagIds) ? tagIds.join(',') : tagIds }),
    ...(issueId && { issueId }),
    ...(authorId && { authorId }),
    ...(featured !== null && { featured }),
    ...(search && { search }),
  };

  const queryString = buildQueryString(queryParams);
  return apiRequest(`/articles${queryString}`);
};

/**
 * Get article by ID
 * @param {number|string} id - Article ID
 * @returns {Promise} Response with article data
 */
export const getArticleById = async (id) => {
  return apiRequest(`/articles/${id}`);
};

/**
 * Get article by slug
 * @param {string} slug - Article slug
 * @returns {Promise} Response with article data
 */
export const getArticleBySlug = async (slug) => {
  return apiRequest(`/articles/slug/${slug}`);
};

/**
 * Get articles by category slug
 * @param {string} categorySlug - Category slug
 * @param {Object} params - Additional query parameters (page, size, etc.)
 * @returns {Promise} Response with articles data
 */
export const getArticlesByCategory = async (categorySlug, params = {}) => {
  const {
    page = 0,
    size = 10,
    sortField = 'publishedAt',
    sortDirection = 'DESC',
  } = params;

  const queryParams = {
    page,
    size,
    sortField,
    sortDirection,
  };

  const queryString = buildQueryString(queryParams);
  return apiRequest(`/articles/category/${categorySlug}${queryString}`);
};

/**
 * Get featured articles
 * @param {number} limit - Number of articles to fetch
 * @returns {Promise} Response with featured articles
 */
export const getFeaturedArticles = async (limit = 5) => {
  const queryString = buildQueryString({ limit });
  return apiRequest(`/articles/featured${queryString}`);
};

/**
 * Get recent articles
 * @param {number} limit - Number of articles to fetch
 * @returns {Promise} Response with recent articles
 */
export const getRecentArticles = async (limit = 10) => {
  const queryString = buildQueryString({ limit });
  return apiRequest(`/articles/recent${queryString}`);
};

/**
 * Search articles
 * @param {string} query - Search query
 * @param {Object} params - Additional query parameters (page, size, etc.)
 * @returns {Promise} Response with search results
 */
export const searchArticles = async (query, params = {}) => {
  const {
    page = 0,
    size = 10,
  } = params;

  const queryParams = {
    query,
    page,
    size,
  };

  const queryString = buildQueryString(queryParams);
  return apiRequest(`/search/articles${queryString}`);
};

/**
 * Increment article view count
 * @param {number|string} id - Article ID
 * @returns {Promise} Response with updated article
 */
export const incrementArticleViews = async (id) => {
  return apiRequest(`/articles/${id}/views`, {
    method: 'POST',
  });
};

/**
 * Get categories
 * @returns {Promise} Response with categories
 */
export const getCategories = async () => {
  return apiRequest('/categories');
};

/**
 * Get category by slug
 * @param {string} slug - Category slug
 * @returns {Promise} Response with category data
 */
export const getCategoryBySlug = async (slug) => {
  return apiRequest(`/categories/slug/${slug}`);
};

/**
 * Transform REST API article response to frontend format
 * Handles the Spring Data Page format
 */
export const transformArticlesResponse = (response) => {
  if (!response || !response.data) {
    return {
      articles: [],
      pagination: {
        page: 0,
        size: 10,
        totalElements: 0,
        totalPages: 0,
      },
    };
  }

  const { content = [], totalElements = 0, totalPages = 0, number = 0, size = 10 } = response.data;

  return {
    articles: content,
    pagination: {
      page: number,
      size,
      totalElements,
      totalPages,
      hasNextPage: number < totalPages - 1,
      hasPreviousPage: number > 0,
    },
  };
};

/**
 * Transform single article response
 */
export const transformArticleResponse = (response) => {
  if (!response || !response.data) {
    return null;
  }

  return response.data;
};

export default {
  getArticles,
  getArticleById,
  getArticleBySlug,
  getArticlesByCategory,
  getFeaturedArticles,
  getRecentArticles,
  searchArticles,
  incrementArticleViews,
  getCategories,
  getCategoryBySlug,
  getAuthToken,
  setAuthToken,
  transformArticlesResponse,
  transformArticleResponse,
};


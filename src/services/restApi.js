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

  // #region agent log
  fetch('http://127.0.0.1:7243/ingest/2fc951a8-852a-48f3-969b-9e58fc53648e',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'restApi.js:48',message:'apiRequest START',data:{url,endpoint,method,requireAuth},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A,B,C,D,E'})}).catch(()=>{});
  // #endregion

  try {
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/2fc951a8-852a-48f3-969b-9e58fc53648e',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'restApi.js:52',message:'BEFORE fetch',data:{url,headers:Object.keys(headers)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C,D'})}).catch(()=>{});
    // #endregion

    const response = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : null,
      ...fetchOptions,
    });

    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/2fc951a8-852a-48f3-969b-9e58fc53648e',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'restApi.js:63',message:'AFTER fetch - response received',data:{status:response.status,statusText:response.statusText,ok:response.ok,url},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A,B,D'})}).catch(()=>{});
    // #endregion

    if (!response.ok) {
      // Try to parse error response
      let errorMessage = `HTTP error! status: ${response.status}`;
      let errorData = null;
      try {
        errorData = await response.json();
        errorMessage = errorData.message || errorData.error || errorMessage;
      } catch (e) {
        // If response is not JSON, use status text
        errorMessage = response.statusText || errorMessage;
      }

      // #region agent log
      fetch('http://127.0.0.1:7243/ingest/2fc951a8-852a-48f3-969b-9e58fc53648e',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'restApi.js:72',message:'HTTP error response',data:{status:response.status,errorMessage,errorData},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A,B,D'})}).catch(()=>{});
      // #endregion

      throw new Error(errorMessage);
    }

    // Handle 204 No Content responses
    if (response.status === 204) {
      // #region agent log
      fetch('http://127.0.0.1:7243/ingest/2fc951a8-852a-48f3-969b-9e58fc53648e',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'restApi.js:78',message:'204 No Content response',data:{url},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
      // #endregion
      return { data: null, error: null };
    }

    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/2fc951a8-852a-48f3-969b-9e58fc53648e',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'restApi.js:82',message:'BEFORE JSON parse',data:{status:response.status,url},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
    // #endregion

    const data = await response.json();

    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/2fc951a8-852a-48f3-969b-9e58fc53648e',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'restApi.js:86',message:'AFTER JSON parse - success',data:{url,dataKeys:data?Object.keys(data):null,hasContent:data?.content!==undefined,contentLength:data?.content?.length,hasData:!!data},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
    // #endregion

    return { data, error: null };
  } catch (error) {
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/2fc951a8-852a-48f3-969b-9e58fc53648e',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'restApi.js:91',message:'CATCH block - error occurred',data:{url,errorMessage:error?.message,errorName:error?.name,errorStack:error?.stack?.substring(0,200)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A,C,D'})}).catch(()=>{});
    // #endregion

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
  // #region agent log
  fetch('http://127.0.0.1:7243/ingest/2fc951a8-852a-48f3-969b-9e58fc53648e',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'restApi.js:264',message:'transformArticlesResponse START',data:{hasResponse:!!response,hasData:!!response?.data,dataKeys:response?.data?Object.keys(response.data):null},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
  // #endregion

  if (!response || !response.data) {
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/2fc951a8-852a-48f3-969b-9e58fc53648e',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'restApi.js:275',message:'transformArticlesResponse - no data, returning empty',data:{hasResponse:!!response,hasData:!!response?.data},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
    // #endregion
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

  // #region agent log
  fetch('http://127.0.0.1:7243/ingest/2fc951a8-852a-48f3-969b-9e58fc53648e',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'restApi.js:288',message:'transformArticlesResponse - extracting data',data:{contentLength:content?.length,totalElements,totalPages,number,size},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
  // #endregion

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


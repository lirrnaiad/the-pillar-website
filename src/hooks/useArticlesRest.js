import { useState, useEffect } from 'react';
import {
  getArticles,
  getArticleBySlug,
  getArticlesByCategory,
  getFeaturedArticles,
  getRecentArticles,
  incrementArticleViews,
  transformArticlesResponse,
  transformArticleResponse,
} from '../services/restApi';

/**
 * Hook to fetch articles with pagination and filtering
 * @param {Object} options - Query options
 * @returns {Object} { articles, pagination, loading, error, refetch }
 */
export const useArticles = (options = {}) => {
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
    autoFetch = true,
  } = options;

  const [articles, setArticles] = useState([]);
  const [pagination, setPagination] = useState({
    page: 0,
    size: 10,
    totalElements: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPreviousPage: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchArticles = async () => {
    setLoading(true);
    setError(null);

    try {
      const params = {
        page,
        size,
        status,
        sortField,
        sortDirection,
        ...(categoryId && { categoryId }),
        ...(tagIds && { tagIds }),
        ...(issueId && { issueId }),
        ...(authorId && { authorId }),
        ...(featured !== null && { featured }),
        ...(search && { search }),
      };

      const response = await getArticles(params);
      
      if (response.error) {
        throw response.error;
      }

      const transformed = transformArticlesResponse(response);
      setArticles(transformed.articles);
      setPagination(transformed.pagination);
    } catch (err) {
      console.error('Error fetching articles:', err);
      setError(err.message || 'Failed to fetch articles');
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch) {
      fetchArticles();
    }
  }, [page, size, status, categoryId, sortField, sortDirection, autoFetch]);

  return {
    articles,
    pagination,
    loading,
    error,
    refetch: fetchArticles,
  };
};

/**
 * Hook to fetch a single article by slug
 * @param {string} slug - Article slug
 * @param {boolean} autoFetch - Whether to fetch automatically
 * @returns {Object} { article, loading, error, refetch }
 */
export const useArticle = (slug, autoFetch = true) => {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchArticle = async () => {
    if (!slug) return;

    setLoading(true);
    setError(null);

    try {
      const response = await getArticleBySlug(slug);
      
      if (response.error) {
        throw response.error;
      }

      const transformed = transformArticleResponse(response);
      
      if (!transformed) {
        setError('Article not found');
        setArticle(null);
      } else {
        setArticle(transformed);
      }
    } catch (err) {
      console.error('Error fetching article:', err);
      setError(err.message || 'Failed to fetch article');
      setArticle(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch && slug) {
      fetchArticle();
    }
  }, [slug, autoFetch]);

  return { article, loading, error, refetch: fetchArticle };
};

/**
 * Hook to fetch articles by category
 * @param {string} categorySlug - Category slug
 * @param {Object} options - Query options
 * @returns {Object} { articles, pagination, loading, error, refetch }
 */
export const useArticlesByCategory = (categorySlug, options = {}) => {
  const {
    page = 0,
    size = 10,
    sortField = 'publishedAt',
    sortDirection = 'DESC',
    autoFetch = true,
  } = options;

  const [articles, setArticles] = useState([]);
  const [pagination, setPagination] = useState({
    page: 0,
    size: 10,
    totalElements: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPreviousPage: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchByCategory = async () => {
    if (!categorySlug) return;

    setLoading(true);
    setError(null);

    try {
      const params = {
        page,
        size,
        sortField,
        sortDirection,
      };

      const response = await getArticlesByCategory(categorySlug, params);
      
      if (response.error) {
        throw response.error;
      }

      const transformed = transformArticlesResponse(response);
      setArticles(transformed.articles);
      setPagination(transformed.pagination);
    } catch (err) {
      console.error('Error fetching articles by category:', err);
      setError(err.message || 'Failed to fetch articles');
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch && categorySlug) {
      fetchByCategory();
    }
  }, [categorySlug, page, size, sortField, sortDirection, autoFetch]);

  return {
    articles,
    pagination,
    loading,
    error,
    refetch: fetchByCategory,
  };
};

/**
 * Hook to fetch featured articles
 * @param {number} limit - Number of articles to fetch
 * @param {boolean} autoFetch - Whether to fetch automatically
 * @returns {Object} { articles, loading, error, refetch }
 */
export const useFeaturedArticles = (limit = 5, autoFetch = true) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchFeatured = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await getFeaturedArticles(limit);
      
      if (response.error) {
        throw response.error;
      }

      // Featured articles endpoint returns an array directly
      const articlesList = response.data || [];
      setArticles(articlesList);
    } catch (err) {
      console.error('Error fetching featured articles:', err);
      setError(err.message || 'Failed to fetch featured articles');
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch) {
      fetchFeatured();
    }
  }, [limit, autoFetch]);

  return { articles, loading, error, refetch: fetchFeatured };
};

/**
 * Hook to fetch recent articles
 * @param {number} limit - Number of articles to fetch
 * @param {boolean} autoFetch - Whether to fetch automatically
 * @returns {Object} { articles, loading, error, refetch }
 */
export const useRecentArticles = (limit = 10, autoFetch = true) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRecent = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await getRecentArticles(limit);
      
      if (response.error) {
        throw response.error;
      }

      // Recent articles endpoint returns an array directly
      const articlesList = response.data || [];
      setArticles(articlesList);
    } catch (err) {
      console.error('Error fetching recent articles:', err);
      setError(err.message || 'Failed to fetch recent articles');
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch) {
      fetchRecent();
    }
  }, [limit, autoFetch]);

  return { articles, loading, error, refetch: fetchRecent };
};

/**
 * Hook to increment article view count and fetch article
 * Useful for article detail pages
 * @param {string} slug - Article slug
 * @param {boolean} incrementViews - Whether to increment view count
 * @returns {Object} { article, loading, error, refetch }
 */
export const useArticleWithViews = (slug, incrementViews = true) => {
  const { article, loading, error, refetch: fetchArticle } = useArticle(slug);

  useEffect(() => {
    if (article && article.id && incrementViews) {
      // Increment view count when article is loaded
      incrementArticleViews(article.id).catch(err => {
        console.error('Error incrementing view count:', err);
        // Don't fail the whole request if view count increment fails
      });
    }
  }, [article, incrementViews]);

  return { article, loading, error, refetch: fetchArticle };
};


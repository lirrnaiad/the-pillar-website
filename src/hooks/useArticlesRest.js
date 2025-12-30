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
  }, [page, size, status, categoryId, tagIds, issueId, authorId, featured, search, sortField, sortDirection, autoFetch]);

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

/**
 * Hook to fetch the first featured article in a category
 * @param {string} categorySlug - Category slug
 * @param {boolean} autoFetch - Whether to fetch automatically
 * @returns {Object} { article, loading, error, refetch }
 */
export const useFeaturedArticleByCategory = (categorySlug, autoFetch = true) => {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchFeatured = async () => {
    if (!categorySlug) return;

    setLoading(true);
    setError(null);

    try {
      // Fetch featured articles for the category
      // We'll fetch by category and filter for featured, then take the first one
      const response = await getArticlesByCategory(categorySlug, {
        page: 0,
        size: 10,
        sortField: 'publishedAt',
        sortDirection: 'DESC',
      });
      
      if (response.error) {
        throw response.error;
      }

      const transformed = transformArticlesResponse(response);
      
      // Find the first featured article
      const featuredArticle = transformed.articles.find(a => a.featured === true) || transformed.articles[0];
      setArticle(featuredArticle || null);
    } catch (err) {
      console.error('Error fetching featured article by category:', err);
      setError(err.message || 'Failed to fetch featured article');
      setArticle(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch && categorySlug) {
      fetchFeatured();
    }
  }, [categorySlug, autoFetch]);

  return { article, loading, error, refetch: fetchFeatured };
};

/**
 * Hook to fetch the first featured article in a category filtered by tag
 * @param {string} categorySlug - Category slug
 * @param {string} tagName - Tag name to filter by
 * @param {boolean} autoFetch - Whether to fetch automatically
 * @returns {Object} { article, loading, error, refetch }
 */
export const useFeaturedArticleByCategoryAndTag = (categorySlug, tagName, autoFetch = true) => {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchFeatured = async () => {
    if (!categorySlug) return;

    setLoading(true);
    setError(null);

    try {
      // Fetch articles by category
      const response = await getArticlesByCategory(categorySlug, {
        page: 0,
        size: 20,
        sortField: 'publishedAt',
        sortDirection: 'DESC',
      });
      
      if (response.error) {
        throw response.error;
      }

      const transformed = transformArticlesResponse(response);
      
      // Filter by tag name (client-side)
      let filteredArticles = transformed.articles;
      if (tagName) {
        filteredArticles = transformed.articles.filter(article => {
          if (!article.tags || !Array.isArray(article.tags)) return false;
          return article.tags.some(tag => 
            tag.name === tagName || tag.slug === tagName.toLowerCase().replace(/\s+/g, '-')
          );
        });
      }
      
      // Find the first featured article, or the first article if none are featured
      const featuredArticle = filteredArticles.find(a => a.featured === true) || filteredArticles[0];
      setArticle(featuredArticle || null);
    } catch (err) {
      console.error('Error fetching featured article by category and tag:', err);
      setError(err.message || 'Failed to fetch featured article');
      setArticle(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch && categorySlug) {
      fetchFeatured();
    }
  }, [categorySlug, tagName, autoFetch]);

  return { article, loading, error, refetch: fetchFeatured };
};

/**
 * Hook to fetch articles by category and filter by tag (client-side filtering)
 * Since the API filters are mutually exclusive, we fetch by category and filter client-side
 * @param {string} categorySlug - Category slug
 * @param {string} tagName - Tag name to filter by
 * @param {Object} options - Query options
 * @returns {Object} { articles, loading, error, refetch }
 */
export const useArticlesByCategoryAndTag = (categorySlug, tagName, options = {}) => {
  const {
    page = 0,
    size = 10,
    sortField = 'publishedAt',
    sortDirection = 'DESC',
    autoFetch = true,
  } = options;

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchByCategoryAndTag = async () => {
    if (!categorySlug) return;

    setLoading(true);
    setError(null);

    try {
      // Fetch articles by category
      const params = {
        page,
        size: size * 2, // Fetch more to account for filtering
        sortField,
        sortDirection,
      };

      const response = await getArticlesByCategory(categorySlug, params);
      
      if (response.error) {
        throw response.error;
      }

      const transformed = transformArticlesResponse(response);
      
      // Filter by tag name (client-side)
      let filteredArticles = transformed.articles;
      if (tagName) {
        filteredArticles = transformed.articles.filter(article => {
          if (!article.tags || !Array.isArray(article.tags)) return false;
          return article.tags.some(tag => 
            tag.name === tagName || tag.slug === tagName.toLowerCase().replace(/\s+/g, '-')
          );
        });
      }

      // Limit to requested size
      filteredArticles = filteredArticles.slice(0, size);
      
      setArticles(filteredArticles);
    } catch (err) {
      console.error('Error fetching articles by category and tag:', err);
      setError(err.message || 'Failed to fetch articles');
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch && categorySlug) {
      fetchByCategoryAndTag();
    }
  }, [categorySlug, tagName, page, size, sortField, sortDirection, autoFetch]);

  return {
    articles,
    loading,
    error,
    refetch: fetchByCategoryAndTag,
  };
};


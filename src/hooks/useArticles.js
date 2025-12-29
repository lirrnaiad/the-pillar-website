import { useState, useEffect } from 'react';
import { query } from '../services/api';
import {
  GET_ARTICLES,
  GET_ARTICLE_BY_SLUG,
  GET_FEATURED_ARTICLES,
  GET_ARTICLES_BY_CATEGORY,
  GET_RECENT_ARTICLES,
  SEARCH_ARTICLES,
} from '../services/queries';

/**
 * Hook to fetch articles with pagination and filtering
 */
export const useArticles = (options = {}) => {
  const {
    first = 10,
    after = null,
    filter = null,
    sort = null,
    autoFetch = true,
  } = options;

  const [articles, setArticles] = useState([]);
  const [pageInfo, setPageInfo] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchArticles = async () => {
    setLoading(true);
    setError(null);

    try {
      const variables = {
        first,
        ...(after && { after }),
        ...(filter && { filter }),
        ...(sort && { sort }),
      };

      const { data, error: queryError } = await query(GET_ARTICLES, variables);

      if (queryError) {
        throw queryError;
      }

      if (data && data.articles) {
        setArticles(data.articles.edges.map((edge) => edge.node));
        setPageInfo(data.articles.pageInfo);
        setTotalCount(data.articles.totalCount);
      }
    } catch (err) {
      console.error('Error fetching articles:', err);
      setError(err.message || 'Failed to fetch articles');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch) {
      fetchArticles();
    }
  }, [first, after, JSON.stringify(filter), JSON.stringify(sort)]);

  return {
    articles,
    pageInfo,
    totalCount,
    loading,
    error,
    refetch: fetchArticles,
  };
};

/**
 * Hook to fetch a single article by slug
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
      const { data, error: queryError } = await query(GET_ARTICLE_BY_SLUG, {
        slug,
      });

      if (queryError) {
        throw queryError;
      }

      if (data && data.articleBySlug) {
        setArticle(data.articleBySlug);
      } else {
        setError('Article not found');
      }
    } catch (err) {
      console.error('Error fetching article:', err);
      setError(err.message || 'Failed to fetch article');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch && slug) {
      fetchArticle();
    }
  }, [slug]);

  return { article, loading, error, refetch: fetchArticle };
};

/**
 * Hook to fetch featured articles
 */
export const useFeaturedArticles = (first = 5, autoFetch = true) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchFeatured = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error: queryError } = await query(GET_FEATURED_ARTICLES, {
        first,
      });

      if (queryError) {
        throw queryError;
      }

      if (data && data.featuredArticles) {
        setArticles(data.featuredArticles);
      }
    } catch (err) {
      console.error('Error fetching featured articles:', err);
      setError(err.message || 'Failed to fetch featured articles');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch) {
      fetchFeatured();
    }
  }, [first]);

  return { articles, loading, error, refetch: fetchFeatured };
};

/**
 * Hook to fetch articles by category
 */
export const useArticlesByCategory = (categorySlug, options = {}) => {
  const { first = 10, after = null, sort = null, autoFetch = true } = options;

  const [articles, setArticles] = useState([]);
  const [pageInfo, setPageInfo] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchByCategory = async () => {
    if (!categorySlug) return;

    setLoading(true);
    setError(null);

    try {
      const variables = {
        categorySlug,
        first,
        ...(after && { after }),
        ...(sort && { sort }),
      };

      const { data, error: queryError } = await query(
        GET_ARTICLES_BY_CATEGORY,
        variables
      );

      if (queryError) {
        throw queryError;
      }

      if (data && data.articlesByCategory) {
        setArticles(data.articlesByCategory.edges.map((edge) => edge.node));
        setPageInfo(data.articlesByCategory.pageInfo);
        setTotalCount(data.articlesByCategory.totalCount);
      }
    } catch (err) {
      console.error('Error fetching articles by category:', err);
      setError(err.message || 'Failed to fetch articles');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch && categorySlug) {
      fetchByCategory();
    }
  }, [categorySlug, first, after, JSON.stringify(sort)]);

  return {
    articles,
    pageInfo,
    totalCount,
    loading,
    error,
    refetch: fetchByCategory,
  };
};

/**
 * Hook to fetch recent articles
 */
export const useRecentArticles = (first = 10, autoFetch = true) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRecent = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error: queryError } = await query(GET_RECENT_ARTICLES, {
        first,
      });

      if (queryError) {
        throw queryError;
      }

      if (data && data.recentArticles) {
        setArticles(data.recentArticles);
      }
    } catch (err) {
      console.error('Error fetching recent articles:', err);
      setError(err.message || 'Failed to fetch recent articles');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch) {
      fetchRecent();
    }
  }, [first]);

  return { articles, loading, error, refetch: fetchRecent };
};

/**
 * Hook to search articles
 */
export const useSearchArticles = (searchQuery, options = {}) => {
  const { first = 10, after = null, autoFetch = true } = options;

  const [articles, setArticles] = useState([]);
  const [pageInfo, setPageInfo] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const search = async () => {
    if (!searchQuery || searchQuery.trim() === '') {
      setArticles([]);
      setPageInfo(null);
      setTotalCount(0);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const variables = {
        query: searchQuery,
        first,
        ...(after && { after }),
      };

      const { data, error: queryError } = await query(SEARCH_ARTICLES, variables);

      if (queryError) {
        throw queryError;
      }

      if (data && data.searchArticles) {
        setArticles(data.searchArticles.edges.map((edge) => edge.node));
        setPageInfo(data.searchArticles.pageInfo);
        setTotalCount(data.searchArticles.totalCount);
      }
    } catch (err) {
      console.error('Error searching articles:', err);
      setError(err.message || 'Failed to search articles');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch && searchQuery) {
      search();
    }
  }, [searchQuery, first, after]);

  return {
    articles,
    pageInfo,
    totalCount,
    loading,
    error,
    search,
  };
};


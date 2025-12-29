import { useState, useEffect } from 'react';
import { query } from '../services/api';
import { GET_CATEGORIES, GET_CATEGORY_BY_SLUG } from '../services/queries';

/**
 * Hook to fetch all categories
 */
export const useCategories = (autoFetch = true) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCategories = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error: queryError } = await query(GET_CATEGORIES);

      if (queryError) {
        throw queryError;
      }

      if (data && data.categories) {
        setCategories(data.categories);
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
      setError(err.message || 'Failed to fetch categories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch) {
      fetchCategories();
    }
  }, []);

  return { categories, loading, error, refetch: fetchCategories };
};

/**
 * Hook to fetch a single category by slug
 */
export const useCategory = (slug, autoFetch = true) => {
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCategory = async () => {
    if (!slug) return;

    setLoading(true);
    setError(null);

    try {
      const { data, error: queryError } = await query(GET_CATEGORY_BY_SLUG, {
        slug,
      });

      if (queryError) {
        throw queryError;
      }

      if (data && data.categoryBySlug) {
        setCategory(data.categoryBySlug);
      } else {
        setError('Category not found');
      }
    } catch (err) {
      console.error('Error fetching category:', err);
      setError(err.message || 'Failed to fetch category');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch && slug) {
      fetchCategory();
    }
  }, [slug]);

  return { category, loading, error, refetch: fetchCategory };
};


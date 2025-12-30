import { useState, useEffect } from 'react';
import { getCategories } from '../services/restApi';

/**
 * Hook to fetch all categories from REST API
 * @param {boolean} autoFetch - Whether to fetch automatically
 * @returns {Object} { categories, loading, error, refetch }
 */
export const useCategoriesRest = (autoFetch = true) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCategories = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await getCategories();
      
      if (response.error) {
        throw response.error;
      }

      const categoriesList = response.data || [];
      setCategories(categoriesList);
    } catch (err) {
      console.error('Error fetching categories:', err);
      setError(err.message || 'Failed to fetch categories');
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch) {
      fetchCategories();
    }
  }, [autoFetch]);

  return { categories, loading, error, refetch: fetchCategories };
};


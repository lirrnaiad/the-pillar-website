import { GraphQLClient } from 'graphql-request';

// Get API URL from environment variable, default to localhost
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/graphql';

// Create GraphQL client instance
const client = new GraphQLClient(API_URL, {
  headers: {
    'Content-Type': 'application/json',
  },
});

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
 * Get authenticated GraphQL client with JWT token
 */
export const getAuthenticatedClient = () => {
  const token = getAuthToken();
  return new GraphQLClient(API_URL, {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
};

/**
 * Execute a GraphQL query
 * @param {string} query - GraphQL query string
 * @param {object} variables - Query variables
 * @param {boolean} requireAuth - Whether authentication is required
 * @returns {Promise} GraphQL response
 */
export const query = async (queryString, variables = {}, requireAuth = false) => {
  const gqlClient = requireAuth ? getAuthenticatedClient() : client;
  
  try {
    const data = await gqlClient.request(queryString, variables);
    return { data, error: null };
  } catch (error) {
    console.error('GraphQL Query Error:', error);
    return { data: null, error };
  }
};

/**
 * Execute a GraphQL mutation (always requires authentication)
 * @param {string} mutation - GraphQL mutation string
 * @param {object} variables - Mutation variables
 * @returns {Promise} GraphQL response
 */
export const mutate = async (mutationString, variables = {}) => {
  const gqlClient = getAuthenticatedClient();
  
  try {
    const data = await gqlClient.request(mutationString, variables);
    return { data, error: null };
  } catch (error) {
    console.error('GraphQL Mutation Error:', error);
    return { data: null, error };
  }
};

/**
 * Helper to create GraphQL query string from template literal
 * Useful for syntax highlighting and formatting
 */
export const gql = (strings, ...values) => {
  return strings.reduce((result, string, i) => {
    return result + string + (values[i] || '');
  }, '');
};

export default {
  query,
  mutate,
  getAuthToken,
  setAuthToken,
  getAuthenticatedClient,
  gql,
};


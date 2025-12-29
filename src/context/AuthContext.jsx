import { createContext, useContext, useState, useEffect } from 'react';
import { query, mutate, getAuthToken, setAuthToken } from '../services/api';
import { GET_ME } from '../services/queries';
import { LOGIN } from '../services/mutations';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is authenticated on mount
  useEffect(() => {
    const token = getAuthToken();
    if (token) {
      // Verify token by fetching current user
      fetchCurrentUser();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const { data, error } = await query(GET_ME, {}, true);
      if (data && data.me) {
        setUser(data.me);
        setIsAuthenticated(true);
      } else {
        // Token is invalid, clear it
        setAuthToken(null);
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Failed to fetch current user:', error);
      setAuthToken(null);
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const { data, error } = await mutate(LOGIN, { email, password });
      if (error) {
        throw error;
      }

      if (data && data.login) {
        const { token, user: userData } = data.login;
        setAuthToken(token);
        setUser(userData);
        setIsAuthenticated(true);
        return { success: true, user: userData };
      }
      throw new Error('Login failed');
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        error: error.response?.errors?.[0]?.message || error.message || 'Login failed',
      };
    }
  };

  const logout = () => {
    setAuthToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    logout,
    refreshUser: fetchCurrentUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};


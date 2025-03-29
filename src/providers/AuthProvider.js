'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { auth } from '@/lib/auth';
import { authRoutes } from '@/constants/navigation';
import notification from '@/lib/notification';

const AuthContext = createContext({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  logout: async () => {},
  register: async () => {},
  forgotPassword: async () => {},
  resetPassword: async () => {},
  verifyEmail: async () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    try {
      const isLoggedIn = auth.isLoggedIn();
      if (isLoggedIn) {
        setUser(auth.getUser());
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      const response = await auth.login(credentials.email, credentials.password);
      setUser(response.user);
      notification.success('Login successful');
      return response;
    } catch (error) {
      notification.error(error.message || 'Login failed');
      throw error;
    }
  };

  const logout = async () => {
    try {
      await auth.logout();
      setUser(null);
      router.push('/');
      notification.success('Logged out successfully');
    } catch (error) {
      notification.error(error.message || 'Logout failed');
      console.error('Logout failed:', error);
    }
  };

  const register = async (userData) => {
    try {
      const response = await auth.register(userData);
      notification.success('Registration successful. Please check your email for verification.');
      return response;
    } catch (error) {
      notification.error(error.message || 'Registration failed');
      throw error;
    }
  };

  const forgotPassword = async (email) => {
    try {
      const response = await auth.forgotPassword(email);
      notification.success('Password reset link sent to your email.');
      return response;
    } catch (error) {
      notification.error(error.message || 'Failed to send password reset link');
      throw error;
    }
  };

  const resetPassword = async (token, newPassword) => {
    try {
      const response = await auth.resetPassword(token, newPassword);
      notification.success('Password reset successfully!');
      return response;
    } catch (error) {
      notification.error(error.message || 'Failed to reset password');
      throw error;
    }
  };

  const verifyEmail = async (token) => {
    try {
      const response = await auth.verifyEmail(token);
      notification.success('Email verified successfully!');
      return response;
    } catch (error) {
      notification.error(error.message || 'Failed to verify email');
      throw error;
    }
  };

  // Protect dashboard routes
  useEffect(() => {
    if (!isLoading && pathname.startsWith('/dashboard') && !user) {
      router.push(authRoutes.login);
      notification.warning('Authentication required');
    }
  }, [isLoading, pathname, user, router]);

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    register,
    forgotPassword,
    resetPassword,
    verifyEmail,
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { User } from '../types';

// Define the shape of the context
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (code: string, newPassword: string, email: string) => Promise<void>;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
interface AuthProviderProps {
  children: ReactNode;
}

// Mock user for development
const MOCK_USER: User = {
  id: 'dev123456',
  email: 'dev@example.com',
  name: 'Development User',
  profilePicture: undefined,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Mock implementation of login
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      console.log('Logging in with email:', email, 'and password:', password);
      // Mock successful login after a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data
      const mockUser: User = {
        id: '1234567890',
        email,
        name: 'Demo User',
        profilePicture: undefined,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      setUser(mockUser);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Mock implementation of register
  const register = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    try {
      // Mock successful registration after a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real implementation, this would create a new user
      // We would then either auto-login or redirect to login
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Mock implementation of logout
  const logout = async () => {
    setIsLoading(true);
    try {
      // Mock successful logout after a delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Mock implementation of forgot password
  const forgotPassword = async (email: string) => {
    setIsLoading(true);
    try {
      // Mock successful forgot password request after a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real implementation, this would trigger an email with a reset code
    } catch (error) {
      console.error('Forgot password error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Mock implementation of reset password
  const resetPassword = async (code: string, newPassword: string, email: string) => {
    setIsLoading(true);
    try {
      // Mock successful password reset after a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real implementation, this would verify the code and update the password
    } catch (error) {
      console.error('Reset password error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Initialize auth state
  React.useEffect(() => {
    const initializeAuth = async () => {
      try {
        // In a real implementation, check if user is already logged in
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // For development, auto-authenticate with a mock user
        setIsAuthenticated(true);
        setUser(MOCK_USER);
      } catch (error) {
        console.error('Auth initialization error:', error);
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    
    initializeAuth();
  }, []);

  // Value to be provided by the context
  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 

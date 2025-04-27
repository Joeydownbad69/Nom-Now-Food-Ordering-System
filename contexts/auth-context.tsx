"use client";

import { createContext, useState, useEffect, ReactNode } from "react";
import { User, AuthState } from "@/types/user";

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  isLoading: false,
  error: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  updateUser: async () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isLoading: true,
    error: null,
  });
  
  // Check for existing session on load
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    
    if (storedUser && storedToken) {
      setAuthState({
        user: storedUser ? JSON.parse(storedUser) : null,
        token: storedToken,
        isLoading: false,
        error: null,
      });
    } else {
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);
  
  // For demo purposes, using mock data
  // In a real application, this would be API calls
  const login = async (email: string, password: string) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      // This would be an API call in production
      // Mock successful login for demo
      if (email === "user@example.com" && password === "password") {
        const mockUser: User = {
          id: 1,
          name: "John Doe",
          email: "user@example.com",
          phone: "123-456-7890",
          address: "123 Main St, City, State, 12345",
        };
        
        const mockToken = "mock-jwt-token";
        
        // Store in localStorage (would use cookies in production)
        localStorage.setItem("user", JSON.stringify(mockUser));
        localStorage.setItem("token", mockToken);
        
        setAuthState({
          user: mockUser,
          token: mockToken,
          isLoading: false,
          error: null,
        });
      } else {
        throw new Error("Invalid email or password");
      }
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : "An error occurred",
      }));
    }
  };
  
  const register = async (name: string, email: string, password: string) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      // This would be an API call in production
      // Mock successful registration for demo
      const mockUser: User = {
        id: 1,
        name,
        email,
        phone: "",
        address: "",
      };
      
      const mockToken = "mock-jwt-token";
      
      // Store in localStorage (would use cookies in production)
      localStorage.setItem("user", JSON.stringify(mockUser));
      localStorage.setItem("token", mockToken);
      
      setAuthState({
        user: mockUser,
        token: mockToken,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : "An error occurred",
      }));
    }
  };
  
  const logout = () => {
    // Clear stored data
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    
    // Reset state
    setAuthState({
      user: null,
      token: null,
      isLoading: false,
      error: null,
    });
  };
  
  const updateUser = async (userData: Partial<User>) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      // This would be an API call in production
      // Mock successful update for demo
      if (authState.user) {
        const updatedUser = { ...authState.user, ...userData };
        
        // Update localStorage
        localStorage.setItem("user", JSON.stringify(updatedUser));
        
        setAuthState(prev => ({
          ...prev,
          user: updatedUser,
          isLoading: false,
        }));
      }
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : "An error occurred",
      }));
    }
  };
  
  return (
    <AuthContext.Provider
      value={{
        user: authState.user,
        token: authState.token,
        isLoading: authState.isLoading,
        error: authState.error,
        login,
        register,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
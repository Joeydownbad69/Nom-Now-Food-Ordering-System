"use client";

import { createContext, useState, useEffect, ReactNode, useContext } from "react";
import { User, AuthState } from "@/types/user";
import { useRouter, usePathname } from "next/navigation";

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  userRole: 'customer' | 'admin' | 'restaurant' | null;
  login: (email: string, password: string) => Promise<void>;
  adminLogin: (email: string, password: string) => Promise<void>;
  restaurantLogin: (email: string, password: string, restaurantId: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  isLoading: false,
  error: null,
  userRole: null,
  login: async () => {},
  adminLogin: async () => {},
  restaurantLogin: async () => {},
  register: async () => {},
  logout: () => {},
  updateUser: async () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();
  const pathname = usePathname();
  
  const [authState, setAuthState] = useState<AuthState & { userRole: 'customer' | 'admin' | 'restaurant' | null }>({
    user: null,
    token: null,
    isLoading: true,
    error: null,
    userRole: null,
  });
  
  // Check for existing session on load
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("userRole");
    
    if (storedUser && storedToken) {
      setAuthState({
        user: JSON.parse(storedUser),
        token: storedToken,
        isLoading: false,
        error: null,
        userRole: (storedRole as 'customer' | 'admin' | 'restaurant' | null),
      });
    } else {
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);
  
  // Protect routes based on authentication and role
  useEffect(() => {
    if (authState.isLoading) return;
    
    // Admin routes protection
    if (pathname?.startsWith('/admin') && !pathname?.includes('/admin/login')) {
      if (authState.userRole !== 'admin') {
        router.push('/admin/login');
      }
    }
    
    // Restaurant routes protection
    if (pathname?.startsWith('/resto') && !pathname?.includes('/resto/login')) {
      if (authState.userRole !== 'restaurant') {
        router.push('/resto/login');
      }
    }
    
    // User protected routes
    if ((pathname?.startsWith('/profile') || pathname?.startsWith('/orders') || pathname?.startsWith('/checkout')) && !authState.token) {
      router.push('/login');
    }
  }, [pathname, authState.isLoading, authState.userRole, authState.token, router]);
  
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
        localStorage.setItem("userRole", "customer");
        
        setAuthState({
          user: mockUser,
          token: mockToken,
          isLoading: false,
          error: null,
          userRole: "customer",
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
  
  // Admin login
  const adminLogin = async (email: string, password: string) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      // Mock admin login for demo
      if (email.includes("admin")) {
        const mockAdminUser: User = {
          id: 999,
          name: "Admin User",
          email: email,
          phone: "999-999-9999",
          address: "Admin Office",
        };
        
        const mockToken = "admin-jwt-token";
        
        localStorage.setItem("user", JSON.stringify(mockAdminUser));
        localStorage.setItem("token", mockToken);
        localStorage.setItem("userRole", "admin");
        
        setAuthState({
          user: mockAdminUser,
          token: mockToken,
          isLoading: false,
          error: null,
          userRole: "admin",
        });
        
        router.push("/admin");
      } else {
        throw new Error("Invalid admin credentials");
      }
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : "An error occurred",
      }));
    }
  };
  
  // Restaurant login
  const restaurantLogin = async (email: string, password: string, restaurantId: string) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      // Mock restaurant login for demo
      if (email.includes("resto") || email.includes("restaurant")) {
        const mockRestoUser: User = {
          id: 500,
          name: "Restaurant Owner",
          email: email,
          phone: "555-555-5555",
          address: "Restaurant Location",
        };
        
        const mockToken = "resto-jwt-token";
        
        localStorage.setItem("user", JSON.stringify(mockRestoUser));
        localStorage.setItem("token", mockToken);
        localStorage.setItem("userRole", "restaurant");
        localStorage.setItem("restaurantId", restaurantId);
        
        setAuthState({
          user: mockRestoUser,
          token: mockToken,
          isLoading: false,
          error: null,
          userRole: "restaurant",
        });
        
        router.push("/resto");
      } else {
        throw new Error("Invalid restaurant credentials");
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
      localStorage.setItem("userRole", "customer");
      
      setAuthState({
        user: mockUser,
        token: mockToken,
        isLoading: false,
        error: null,
        userRole: "customer",
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
    localStorage.removeItem("userRole");
    localStorage.removeItem("restaurantId");
    
    // Reset state
    setAuthState({
      user: null,
      token: null,
      isLoading: false,
      error: null,
      userRole: null,
    });
    
    // Redirect based on current path
    if (pathname?.startsWith('/admin')) {
      router.push('/admin/login');
    } else if (pathname?.startsWith('/resto')) {
      router.push('/resto/login');
    } else {
      router.push('/login');
    }
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
  
  // Show loading spinner while checking authentication
  if (authState.isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div className="spinner" style={{ width: 48, height: 48, border: '6px solid #eee', borderTop: '6px solid #3498db', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }
  
  return (
    <AuthContext.Provider
      value={{
        user: authState.user,
        token: authState.token,
        isLoading: authState.isLoading,
        error: authState.error,
        userRole: authState.userRole,
        login,
        adminLogin,
        restaurantLogin,
        register,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
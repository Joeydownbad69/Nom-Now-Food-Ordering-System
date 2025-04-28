export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  address?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}
export interface User {
  id?: string;
  _id?: string;
  email: string;
  name: string;
  phone?: string;
  role: "user" | "admin" | "librarian" | "member";
  membershipDate?: string;
  active?: boolean;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

export interface AuthResponse {
  user: User;
  access_token: string;
}

export interface AuthContextType {
  user: User | null;
  login: (credentials: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => void;
  loading: boolean;
  isAuthenticated: boolean;
}

import api from "../lib/api";
import type {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  User,
} from "../types/auth.type";

export const authApi = {
  // Connexion
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    const response = await api.post("/auth/login", credentials);
    return response.data;
  },

  // Inscription
  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await api.post("/auth/register", data);
    return response.data;
  },

  // Déconnexion
  logout: async (): Promise<void> => {
    await api.post("/auth/logout");
  },

  // Obtenir les informations du profil utilisateur
  getProfile: async (): Promise<User> => {
    const response = await api.get("/auth/profile");
    return response.data;
  },

  // Vérifier si l'utilisateur est connecté
  checkAuth: async (): Promise<User> => {
    const response = await api.get("/auth/me");
    return response.data;
  },
};

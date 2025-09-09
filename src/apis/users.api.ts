import api from "../lib/api";
import type { User } from "../types/auth.type";

export const getAllUsers = async (): Promise<User[]> => {
  const response = await api.get("/users");
  return response.data.users || [];
};

export const getUserById = async (userId: string): Promise<User> => {
  const response = await api.get(`/users/${userId}`);
  if (!response.data.success) {
    throw new Error(response.data.message || "User not found");
  }
  return response.data.user;
};

export const deactivateUser = async (userId: string): Promise<void> => {
  await api.patch(`/users/${userId}/deactivate`);
};

export const activateUser = async (userId: string): Promise<void> => {
  await api.patch(`/users/${userId}/activate`);
};

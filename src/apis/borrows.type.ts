import { api } from "../lib/api";
import type {
  Borrow,
  CreateBorrowingRequest,
  UpdateBorrowingRequest,
  ReturnBookRequest,
} from "../types/borrows.type";

export const getAllBorrowings = async (): Promise<Borrow[]> => {
  const response = await api.get("/borrowings");
  return response.data;
};

export const createBorrowing = async (
  borrowing: CreateBorrowingRequest
): Promise<Borrow> => {
  const response = await api.post("/borrowings", borrowing);
  return response.data;
};

export const returnBorrowing = async (
  borrowingId: string,
  returnData?: ReturnBookRequest
): Promise<Borrow> => {
  const response = await api.post(
    `/borrowings/${borrowingId}/return`,
    returnData || {}
  );
  return response.data;
};

export const getUserBorrowings = async (userId: string): Promise<Borrow[]> => {
  const response = await api.get(`/borrowings/user/${userId}`);
  return response.data;
};

export const getActiveBorrowingsByUserId = async (
  userId: string
): Promise<Borrow[]> => {
  const response = await api.get(`/borrowings/user/${userId}/active`);
  return response.data;
};

export const getMyBorrowings = async (): Promise<Borrow[]> => {
  const response = await api.get("/borrowings/my-borrowings");
  return response.data;
};

export const getMyActiveBorrowings = async (): Promise<Borrow[]> => {
  const response = await api.get("/borrowings/my-active-borrowings");
  return response.data;
};

export const getBorrowingById = async (
  borrowingId: string
): Promise<Borrow> => {
  const response = await api.get(`/borrowings/${borrowingId}`);
  return response.data;
};

export const updateBorrowing = async (
  id: string,
  updateData: UpdateBorrowingRequest
): Promise<Borrow> => {
  const response = await api.patch(`/borrowings/${id}`, updateData);
  return response.data;
};

export const deleteBorrowing = async (borrowingId: string): Promise<void> => {
  await api.delete(`/borrowings/${borrowingId}`);
};

export const getBorrowingStats = async (): Promise<any> => {
  const response = await api.get("/borrowings/stats");
  return response.data;
};

export const getOverdueBorrowings = async (): Promise<Borrow[]> => {
  const response = await api.get("/borrowings/overdue");
  return response.data;
};

export const markOverdue = async (): Promise<void> => {
  await api.post("/borrowings/mark-overdue");
};

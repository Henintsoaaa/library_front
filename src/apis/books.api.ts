import api from "../lib/api";
import type { BookFormData, BookUpdateData } from "../types/book.type";

export const fetchBooks = async (page = 1, pageSize = 10) => {
  const response = await api.get(`/books?page=${page}&limit=${pageSize}`);
  return response.data;
};

export const createBook = async (bookData: BookFormData) => {
  const response = await api.post("/books", bookData);
  return response.data;
};

export const updateBook = async (bookId: string, bookData: BookUpdateData) => {
  const response = await api.put(`/books/${bookId}`, bookData);
  return response.data;
};

export const deleteBook = async (bookId: string) => {
  const response = await api.delete(`/books/${bookId}`);
  return response.data;
};

export const getBookDetails = async (bookId: string) => {
  const response = await api.get(`/books/${bookId}`);
  return response.data;
};

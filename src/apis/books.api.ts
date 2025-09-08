import api from "../lib/api";
import type {
  Book,
  CreateBookDto,
  UpdateBookDto,
  BooksResponse,
} from "../types/book.type";

export const booksApi = {
  // Récupérer tous les livres avec pagination
  getAll: async (
    page: number = 1,
    limit: number = 10
  ): Promise<BooksResponse> => {
    const response = await api.get(`/books?page=${page}&limit=${limit}`);
    return response.data;
  },

  // Récupérer un livre par ID
  getById: async (id: string): Promise<Book> => {
    const response = await api.get(`/books/${id}`);
    return response.data;
  },

  // Créer un nouveau livre (admin/librarian seulement)
  create: async (bookData: CreateBookDto): Promise<Book> => {
    const response = await api.post("/books", bookData);
    return response.data;
  },

  // Mettre à jour un livre (admin/librarian seulement)
  update: async (id: string, bookData: UpdateBookDto): Promise<Book> => {
    const response = await api.put(`/books/${id}`, bookData);
    return response.data;
  },

  // Supprimer un livre (admin/librarian seulement)
  delete: async (id: string): Promise<{ deleted: boolean }> => {
    const response = await api.delete(`/books/${id}`);
    return response.data;
  },
};

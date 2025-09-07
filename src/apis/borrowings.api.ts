import api from "../lib/api";
import type {
  Borrowing,
  BorrowingWithDetails,
  CreateBorrowingDto,
  UpdateBorrowingDto,
  ReturnBookDto,
  BorrowingStats,
} from "../types/borrowing.type";

export const borrowingsApi = {
  // Créer un nouvel emprunt
  create: async (borrowingData: CreateBorrowingDto): Promise<Borrowing> => {
    const response = await api.post("/borrowings", borrowingData);
    return response.data;
  },

  // Récupérer tous les emprunts (admin/librarian seulement)
  getAll: async (): Promise<BorrowingWithDetails[]> => {
    const response = await api.get("/borrowings");
    return response.data;
  },

  // Récupérer les statistiques des emprunts (admin/librarian seulement)
  getStats: async (): Promise<BorrowingStats> => {
    const response = await api.get("/borrowings/stats");
    return response.data;
  },

  // Récupérer les livres en retard (admin/librarian seulement)
  getOverdueBooks: async (): Promise<BorrowingWithDetails[]> => {
    const response = await api.get("/borrowings/overdue");
    return response.data;
  },

  // Marquer les emprunts en retard (admin/librarian seulement)
  markOverdue: async (): Promise<{ message: string }> => {
    const response = await api.post("/borrowings/mark-overdue");
    return response.data;
  },

  // Récupérer les emprunts d'un utilisateur spécifique
  getByUserId: async (userId: string): Promise<BorrowingWithDetails[]> => {
    const response = await api.get(`/borrowings/user/${userId}`);
    return response.data;
  },

  // Récupérer les emprunts actifs d'un utilisateur spécifique
  getActiveByUserId: async (
    userId: string
  ): Promise<BorrowingWithDetails[]> => {
    const response = await api.get(`/borrowings/user/${userId}/active`);
    return response.data;
  },

  // Récupérer mes emprunts (membre)
  getMyBorrowings: async (): Promise<BorrowingWithDetails[]> => {
    const response = await api.get("/borrowings/my-borrowings");
    return response.data;
  },

  // Récupérer mes emprunts actifs (membre)
  getMyActiveBorrowings: async (): Promise<BorrowingWithDetails[]> => {
    const response = await api.get("/borrowings/my-active-borrowings");
    return response.data;
  },

  // Récupérer un emprunt par ID
  getById: async (id: string): Promise<BorrowingWithDetails> => {
    const response = await api.get(`/borrowings/${id}`);
    return response.data;
  },

  // Retourner un livre (admin/librarian seulement)
  returnBook: async (
    id: string,
    returnData?: ReturnBookDto
  ): Promise<Borrowing> => {
    const response = await api.post(
      `/borrowings/${id}/return`,
      returnData || {}
    );
    return response.data;
  },

  // Mettre à jour un emprunt (admin/librarian seulement)
  update: async (
    id: string,
    updateData: UpdateBorrowingDto
  ): Promise<Borrowing> => {
    const response = await api.patch(`/borrowings/${id}`, updateData);
    return response.data;
  },

  // Supprimer un emprunt (admin seulement)
  delete: async (id: string): Promise<{ deleted: boolean }> => {
    const response = await api.delete(`/borrowings/${id}`);
    return response.data;
  },
};

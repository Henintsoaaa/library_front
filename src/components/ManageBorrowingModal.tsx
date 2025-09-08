import React, { useState, useEffect } from "react";
import { borrowingsApi } from "../apis/borrowings.api";
import { useAuth } from "../context/AuthContext";
import type { BorrowingWithDetails } from "../types/borrowing.type";
import type { Book } from "../types/book.type";

interface ManageBorrowingModalProps {
  book: Book | null;
  isOpen: boolean;
  onClose: () => void;
  onBorrowingUpdated?: () => void;
}

export const ManageBorrowingModal: React.FC<ManageBorrowingModalProps> = ({
  book,
  isOpen,
  onClose,
  onBorrowingUpdated,
}) => {
  const [borrowing, setBorrowing] = useState<BorrowingWithDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (isOpen && book && user) {
      loadUserBorrowing();
    }
  }, [isOpen, book, user]);

  const loadUserBorrowing = async () => {
    if (!book || !user) return;

    try {
      setLoading(true);
      setError(null);

      // Récupérer les emprunts actifs de l'utilisateur
      const activeBorrowings = await borrowingsApi.getMyActiveBorrowings();

      // Chercher un emprunt actif pour ce livre
      const currentBorrowing = activeBorrowings.find(
        (b) => b.bookId === book._id
      );

      setBorrowing(currentBorrowing || null);
    } catch (err) {
      setError("Erreur lors du chargement des informations d'emprunt");
      console.error("Error loading borrowing:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBorrowing = async () => {
    if (!book || !user) return;

    if (!window.confirm(`Voulez-vous emprunter le livre "${book.title}" ?`)) {
      return;
    }

    try {
      setActionLoading(true);
      setError(null);

      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + 14); // 2 semaines par défaut

      const borrowingData = {
        userId: user.id,
        bookId: book._id,
        dueDate: dueDate.toISOString(),
      };

      await borrowingsApi.create(borrowingData);
      setSuccess("Livre emprunté avec succès!");

      // Recharger les informations d'emprunt
      await loadUserBorrowing();

      if (onBorrowingUpdated) {
        onBorrowingUpdated();
      }
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "Erreur lors de l'emprunt du livre";
      setError(errorMessage);
      console.error("Error creating borrowing:", err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleReturnBook = async () => {
    if (!borrowing) return;

    if (!window.confirm("Confirmer le retour de ce livre ?")) {
      return;
    }

    try {
      setActionLoading(true);
      setError(null);

      await borrowingsApi.returnBook(borrowing._id);
      setSuccess("Livre retourné avec succès!");

      // Recharger les informations d'emprunt
      await loadUserBorrowing();

      if (onBorrowingUpdated) {
        onBorrowingUpdated();
      }
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "Erreur lors du retour du livre";
      setError(errorMessage);
      console.error("Error returning book:", err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleClose = () => {
    setError(null);
    setSuccess(null);
    setBorrowing(null);
    onClose();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR");
  };

  const isOverdue = (borrowing: BorrowingWithDetails) => {
    if (borrowing.status === "returned") return false;
    const dueDate = new Date(borrowing.dueDate);
    const today = new Date();
    return dueDate < today;
  };

  if (!isOpen || !book) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800">Gérer l'emprunt</h3>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Informations du livre */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-2">{book.title}</h4>
            <p className="text-sm text-gray-600">par {book.author}</p>
            <p className="text-sm text-gray-600">ISBN: {book.isbn}</p>
            {book.copies !== undefined && (
              <p className="text-sm text-gray-600">
                Exemplaires disponibles:
                <span
                  className={`ml-1 font-bold ${
                    book.copies > 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {book.copies}
                </span>
              </p>
            )}
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg mb-4">
              {success}
            </div>
          )}

          {loading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
              <span className="ml-3 text-gray-600">Chargement...</span>
            </div>
          ) : borrowing ? (
            <div>
              {/* Informations de l'emprunt actuel */}
              <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h5 className="font-semibold text-blue-800 mb-2">
                  Emprunt actuel
                </h5>
                <div className="space-y-2 text-sm">
                  <p className="text-blue-700">
                    <span className="font-medium">Date d'emprunt:</span>{" "}
                    {formatDate(borrowing.borrowDate)}
                  </p>
                  <p className="text-blue-700">
                    <span className="font-medium">Date limite:</span>{" "}
                    {formatDate(borrowing.dueDate)}
                    {isOverdue(borrowing) && (
                      <span className="ml-2 bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-semibold">
                        En retard
                      </span>
                    )}
                  </p>
                  <p className="text-blue-700">
                    <span className="font-medium">Statut:</span>
                    <span
                      className={`ml-1 px-2 py-1 rounded-full text-xs font-semibold ${
                        borrowing.status === "borrowed"
                          ? isOverdue(borrowing)
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-blue-100 text-blue-800"
                          : borrowing.status === "overdue"
                          ? "bg-red-100 text-red-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {borrowing.status === "borrowed" && isOverdue(borrowing)
                        ? "En retard"
                        : borrowing.status === "borrowed"
                        ? "Emprunté"
                        : borrowing.status === "overdue"
                        ? "En retard"
                        : "Retourné"}
                    </span>
                  </p>
                </div>
              </div>

              {/* Actions pour l'emprunt existant */}
              {(borrowing.status === "borrowed" ||
                borrowing.status === "overdue") && (
                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors duration-200"
                    onClick={handleClose}
                    disabled={actionLoading}
                  >
                    Fermer
                  </button>
                  <button
                    type="button"
                    className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition-all duration-200 flex items-center"
                    onClick={handleReturnBook}
                    disabled={actionLoading}
                  >
                    {actionLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                        Retour en cours...
                      </>
                    ) : (
                      <>
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        Retourner le livre
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div>
              {/* Aucun emprunt actuel */}
              <div className="mb-6 p-4 bg-gray-100 rounded-lg text-center">
                <p className="text-gray-600 mb-2">
                  Vous n'avez pas emprunté ce livre
                </p>
                <p className="text-sm text-gray-500">
                  Vous pouvez l'emprunter maintenant si des exemplaires sont
                  disponibles
                </p>
              </div>

              {/* Action pour créer un nouvel emprunt */}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors duration-200"
                  onClick={handleClose}
                  disabled={actionLoading}
                >
                  Fermer
                </button>
                <button
                  type="button"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-all duration-200 flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handleCreateBorrowing}
                  disabled={actionLoading || book.copies === 0}
                >
                  {actionLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                      Emprunt en cours...
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                      {book.copies === 0
                        ? "Non disponible"
                        : "Emprunter ce livre"}
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

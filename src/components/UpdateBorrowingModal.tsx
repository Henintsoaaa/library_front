import React, { useState, useEffect } from "react";
import { borrowingsApi } from "../apis/borrowings.api";
import { useAuth } from "../context/AuthContext";
import type {
  BorrowingWithDetails,
  UpdateBorrowingDto,
} from "../types/borrowing.type";

interface UpdateBorrowingModalProps {
  borrowing: BorrowingWithDetails | null;
  isOpen: boolean;
  onClose: () => void;
  onBorrowingUpdated?: () => void;
}

export const UpdateBorrowingModal: React.FC<UpdateBorrowingModalProps> = ({
  borrowing,
  isOpen,
  onClose,
  onBorrowingUpdated,
}) => {
  const [returnDate, setReturnDate] = useState("");
  const [status, setStatus] = useState<"borrowed" | "returned" | "overdue">(
    "borrowed"
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const { user } = useAuth();

  const canUpdateBorrowings =
    user?.role === "admin" || user?.role === "librarian";

  useEffect(() => {
    if (borrowing) {
      setReturnDate(borrowing.returnDate || "");
      setStatus(borrowing.status);
      setError(null);
      setSuccess(null);
    }
  }, [borrowing]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!borrowing) return;

    try {
      setLoading(true);
      setError(null);

      const updateData: UpdateBorrowingDto = {
        status,
      };

      if (returnDate) {
        updateData.returnDate = new Date(returnDate).toISOString();
      }

      await borrowingsApi.update(borrowing._id, updateData);
      setSuccess("Emprunt mis à jour avec succès!");

      if (onBorrowingUpdated) {
        onBorrowingUpdated();
      }

      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Erreur lors de la mise à jour de l'emprunt"
      );
      console.error("Error updating borrowing:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setError(null);
    setSuccess(null);
    onClose();
  };

  if (!isOpen || !borrowing || !canUpdateBorrowings) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800">
              Modifier l'emprunt
            </h3>
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

          <div className="mb-4 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-2">
              {borrowing.book?.title}
            </h4>
            <p className="text-sm text-gray-600">
              par {borrowing.book?.author}
            </p>
            <p className="text-sm text-gray-600">
              Emprunté par: {borrowing.user?.name}
            </p>
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

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Statut
              </label>
              <select
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                value={status}
                onChange={(e) =>
                  setStatus(
                    e.target.value as "borrowed" | "returned" | "overdue"
                  )
                }
              >
                <option value="borrowed">Emprunté</option>
                <option value="returned">Retourné</option>
                <option value="overdue">En retard</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Date de retour (optionnel)
              </label>
              <input
                type="date"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors duration-200"
                onClick={handleClose}
                disabled={loading}
              >
                Annuler
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-all duration-200 flex items-center"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                    Mise à jour...
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
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Mettre à jour
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

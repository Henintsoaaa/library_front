import React, { useState, useEffect } from "react";
import { borrowingsApi } from "../apis/borrowings.api";
import { useAuth } from "../context/AuthContext";
import { BooksList } from "./BooksList";
import type { Book } from "../types/book.type";
import type { CreateBorrowingDto } from "../types/borrowing.type";

interface CreateBorrowingFormProps {
  onBorrowingCreated?: () => void;
  preselectedUserId?: string;
}

export const CreateBorrowingForm: React.FC<CreateBorrowingFormProps> = ({
  onBorrowingCreated,
  preselectedUserId,
}) => {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [userId, setUserId] = useState(preselectedUserId || "");
  const [dueDate, setDueDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showBookSelection, setShowBookSelection] = useState(false);
  const { user } = useAuth();

  const canCreateBorrowings =
    user?.role === "admin" ||
    user?.role === "librarian" ||
    user?.role === "member";
  const isMember = user?.role === "member";

  useEffect(() => {
    if (isMember && user?.id) {
      setUserId(user.id);
    }
    // Définir une date d'échéance par défaut (2 semaines à partir d'aujourd'hui)
    const defaultDueDate = new Date();
    defaultDueDate.setDate(defaultDueDate.getDate() + 14);
    setDueDate(defaultDueDate.toISOString().split("T")[0]);
  }, [user, isMember]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedBook) {
      setError("Veuillez sélectionner un livre");
      return;
    }

    if (!userId) {
      setError("L'ID utilisateur est requis");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const borrowingData: CreateBorrowingDto = {
        userId,
        bookId: selectedBook._id,
        dueDate: new Date(dueDate).toISOString(),
      };

      await borrowingsApi.create(borrowingData);
      setSuccess("Emprunt créé avec succès!");

      // Réinitialiser le formulaire
      if (!preselectedUserId) {
        setUserId("");
      }
      setSelectedBook(null);
      const defaultDueDate = new Date();
      defaultDueDate.setDate(defaultDueDate.getDate() + 14);
      setDueDate(defaultDueDate.toISOString().split("T")[0]);
      setShowBookSelection(false);

      if (onBorrowingCreated) {
        onBorrowingCreated();
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Erreur lors de la création de l'emprunt"
      );
      console.error("Error creating borrowing:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleBookSelect = (book: Book) => {
    setSelectedBook(book);
    setShowBookSelection(false);
  };

  const handleRemoveSelectedBook = () => {
    setSelectedBook(null);
  };

  if (!canCreateBorrowings) {
    return (
      <div className="alert alert-warning">
        Vous n'avez pas les permissions nécessaires pour créer des emprunts.
      </div>
    );
  }

  return (
    <div className="create-borrowing-form max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 animate-fade-in">
        <div className="border-b border-gray-200 pb-4 mb-6">
          <div className="flex items-center">
            <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-2xl mr-3">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <h4 className="text-xl font-bold text-gray-800 m-0">
              Créer un nouvel emprunt
            </h4>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-2xl mb-6 animate-fade-in">
            <div className="flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                ></path>
              </svg>
              {error}
            </div>
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-2xl mb-6 animate-fade-in">
            <div className="flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                ></path>
              </svg>
              {success}
            </div>
          </div>
        )}

        {!showBookSelection ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {!isMember && (
                <div>
                  <label
                    htmlFor="userId"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    ID Utilisateur <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    id="userId"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    required
                    disabled={!!preselectedUserId}
                    placeholder="Entrez l'ID de l'utilisateur"
                  />
                </div>
              )}

              <div>
                <label
                  htmlFor="dueDate"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Date d'échéance <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  id="dueDate"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  required
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Livre sélectionné <span className="text-red-500">*</span>
              </label>
              {selectedBook ? (
                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex-1">
                      <h6 className="font-bold text-gray-800 mb-1">
                        {selectedBook.title}
                      </h6>
                      <p className="text-gray-600 mb-1">
                        par {selectedBook.author}
                      </p>
                      <small className="text-gray-500">
                        ISBN: {selectedBook.isbn}
                      </small>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="bg-white text-gray-600 border border-gray-300 px-4 py-2 rounded-2xl font-medium hover:bg-gray-50 transition-colors duration-200"
                        onClick={handleRemoveSelectedBook}
                      >
                        Changer de livre
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-200 w-full sm:w-auto"
                  onClick={() => setShowBookSelection(true)}
                >
                  <svg
                    className="w-5 h-5 mr-2 inline"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  Sélectionner un livre
                </button>
              )}
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-gray-200">
              <button
                type="button"
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-2xl font-medium hover:bg-gray-300 transition-colors duration-200 order-2 sm:order-1"
                onClick={() => {
                  setSelectedBook(null);
                  if (!preselectedUserId) {
                    setUserId("");
                  }
                  const defaultDueDate = new Date();
                  defaultDueDate.setDate(defaultDueDate.getDate() + 14);
                  setDueDate(defaultDueDate.toISOString().split("T")[0]);
                  setError(null);
                  setSuccess(null);
                }}
                disabled={loading}
              >
                Réinitialiser
              </button>
              <button
                type="submit"
                className={`bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-200 order-1 sm:order-2 ${
                  loading ? "opacity-75 cursor-not-allowed" : ""
                }`}
                disabled={loading || !selectedBook}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                    Création...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <svg
                      className="w-5 h-5 mr-2"
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
                    Créer l'emprunt
                  </div>
                )}
              </button>
            </div>
          </form>
        ) : (
          <div>
            <div className="mb-6">
              <button
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-2xl font-medium hover:bg-gray-300 transition-colors duration-200 flex items-center"
                onClick={() => setShowBookSelection(false)}
              >
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
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Retour au formulaire
              </button>
            </div>
            <BooksList onBookSelect={handleBookSelect} />
          </div>
        )}
      </div>
    </div>
  );
};

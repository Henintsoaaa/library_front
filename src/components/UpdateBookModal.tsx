import React, { useState } from "react";
import { booksApi } from "../apis/books.api";
import type { Book, UpdateBookDto } from "../types/book.type";

interface UpdateBookModalProps {
  book: Book;
  onUpdate: (book: Book) => void;
  onClose: () => void;
}

export default function UpdateBookModal({
  book,
  onUpdate,
  onClose,
}: UpdateBookModalProps) {
  const [updatedBook, setUpdatedBook] = useState<Book>(book);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setUpdatedBook((prev) => ({
      ...prev,
      [name]:
        type === "number" ? (value === "" ? undefined : Number(value)) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Create the update DTO with only changed fields
      const updateData: UpdateBookDto = {};

      if (updatedBook.title !== book.title)
        updateData.title = updatedBook.title;
      if (updatedBook.author !== book.author)
        updateData.author = updatedBook.author;
      if (updatedBook.isbn !== book.isbn) updateData.isbn = updatedBook.isbn;
      if (updatedBook.category !== book.category)
        updateData.category = updatedBook.category;
      if (updatedBook.publishedYear !== book.publishedYear)
        updateData.publishedYear = updatedBook.publishedYear;
      if (updatedBook.copies !== book.copies)
        updateData.copies = updatedBook.copies;

      await booksApi.update(book._id, updateData);
      onUpdate(updatedBook);
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Erreur lors de la mise à jour du livre"
      );
      console.error("Error updating book:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-auto max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h5 className="text-xl font-bold text-gray-800">
              Modifier le livre
            </h5>
            <button
              type="button"
              className="text-gray-400 hover:text-gray-600 p-2 rounded-2xl hover:bg-gray-100 transition-colors duration-200 touch-target"
              onClick={onClose}
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

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Titre <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  id="title"
                  name="title"
                  value={updatedBook.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="author"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Auteur <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  id="author"
                  name="author"
                  value={updatedBook.author}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="isbn"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  ISBN <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  id="isbn"
                  name="isbn"
                  value={updatedBook.isbn}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Catégorie
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  id="category"
                  name="category"
                  value={updatedBook.category || ""}
                  onChange={handleChange}
                  placeholder="Fiction, Science, Histoire..."
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="publishedYear"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Année de publication
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  id="publishedYear"
                  name="publishedYear"
                  value={updatedBook.publishedYear || ""}
                  onChange={handleChange}
                  min="1000"
                  max={new Date().getFullYear()}
                  placeholder="2024"
                />
              </div>

              <div>
                <label
                  htmlFor="copies"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Nombre d'exemplaires
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  id="copies"
                  name="copies"
                  value={updatedBook.copies || ""}
                  onChange={handleChange}
                  min="0"
                  placeholder="1"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-gray-200">
              <button
                type="button"
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-2xl font-medium hover:bg-gray-300 transition-colors duration-200 order-2 sm:order-1"
                onClick={onClose}
                disabled={loading}
              >
                Annuler
              </button>
              <button
                type="submit"
                className={`bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-200 order-1 sm:order-2 ${
                  loading ? "opacity-75 cursor-not-allowed" : ""
                }`}
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                    Mise à jour...
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
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Mettre à jour
                  </div>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

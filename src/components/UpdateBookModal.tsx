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
    <div
      className="modal show d-block fixed inset-0 overflow-y-auto flex items-center justify-center p-4 bg-black/20"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Modifier le livre</h5>
            <button
              type="button"
              className="text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              onClick={onClose}
            >
              <svg
                className="w-5 h-5"
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
          <div className="modal-body">
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label
                  htmlFor="title"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Titre
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  id="title"
                  name="title"
                  value={updatedBook.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="author"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Auteur
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  id="author"
                  name="author"
                  value={updatedBook.author}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="isbn"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  ISBN
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  id="isbn"
                  name="isbn"
                  value={updatedBook.isbn}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="category"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Catégorie
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  id="category"
                  name="category"
                  value={updatedBook.category || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="publishedYear"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Année de publication
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  id="publishedYear"
                  name="publishedYear"
                  value={updatedBook.publishedYear || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="copies"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Exemplaires
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  id="copies"
                  name="copies"
                  value={updatedBook.copies || ""}
                  onChange={handleChange}
                  min="0"
                />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors duration-200"
              onClick={onClose}
              disabled={loading}
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200 disabled:opacity-50"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Mise à jour..." : "Mettre à jour"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

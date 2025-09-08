import React, { useState } from "react";
import { booksApi } from "../apis/books.api";
import type { CreateBookDto, Book } from "../types/book.type";

interface AddBookFormProps {
  onBookAdded: (book: Book) => void;
  onCancel: () => void;
}

export const AddBookForm: React.FC<AddBookFormProps> = ({
  onBookAdded,
  onCancel,
}) => {
  const [formData, setFormData] = useState<CreateBookDto>({
    title: "",
    author: "",
    isbn: "",
    category: "",
    publishedYear: undefined,
    copies: 1,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const bookData: CreateBookDto = {
        ...formData,
        category: formData.category || undefined,
        publishedYear: formData.publishedYear || undefined,
      };

      const newBook = await booksApi.create(bookData);
      onBookAdded(newBook);

      // Reset form
      setFormData({
        title: "",
        author: "",
        isbn: "",
        category: "",
        publishedYear: undefined,
        copies: 1,
      });
    } catch (err) {
      setError("Erreur lors de l'ajout du livre");
      console.error("Error creating book:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "publishedYear" || name === "copies"
          ? value
            ? parseInt(value)
            : undefined
          : value,
    }));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 animate-fade-in">
        <div className="border-b border-gray-200 pb-4 mb-6">
          <div className="flex items-center">
            <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-2xl mr-3">
              <svg
                className="w-6 h-6 text-green-600"
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
            </div>
            <h5 className="text-xl font-bold text-gray-800 m-0">
              Ajouter un nouveau livre
            </h5>
          </div>
        </div>{" "}
        <div className="p-6">
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

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Titre du livre <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="Titre du livre"
                />
              </div>{" "}
              <div>
                <label
                  htmlFor="author"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Auteur <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  id="author"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  required
                  placeholder="Nom de l'auteur"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="isbn"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  ISBN <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  id="isbn"
                  name="isbn"
                  value={formData.isbn}
                  onChange={handleChange}
                  required
                  placeholder="978-XXXXXXXXXX"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="Fiction, Science, Histoire..."
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="publishedYear"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Année de publication
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  id="publishedYear"
                  name="publishedYear"
                  value={formData.publishedYear || ""}
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  id="copies"
                  name="copies"
                  value={formData.copies || 1}
                  onChange={handleChange}
                  min="1"
                  placeholder="1"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-gray-200">
              <button
                type="button"
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-2xl font-medium hover:bg-gray-300 transition-colors duration-200 order-2 sm:order-1"
                onClick={onCancel}
                disabled={loading}
              >
                Annuler
              </button>
              <button
                type="submit"
                className={`bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg hover:from-green-700 hover:to-green-800 transform hover:scale-105 transition-all duration-200 order-1 sm:order-2 ${
                  loading ? "opacity-75 cursor-not-allowed" : ""
                }`}
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                    Ajout en cours...
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
                    Ajouter le livre
                  </div>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

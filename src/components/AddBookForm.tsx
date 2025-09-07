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
    <div className="card">
      <div className="card-header">
        <h5 className="mb-0">Ajouter un nouveau livre</h5>
      </div>
      <div className="card-body">
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group mb-3">
                <label htmlFor="title">Titre *</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group mb-3">
                <label htmlFor="author">Auteur *</label>
                <input
                  type="text"
                  className="form-control"
                  id="author"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="form-group mb-3">
                <label htmlFor="isbn">ISBN *</label>
                <input
                  type="text"
                  className="form-control"
                  id="isbn"
                  name="isbn"
                  value={formData.isbn}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group mb-3">
                <label htmlFor="category">Catégorie</label>
                <input
                  type="text"
                  className="form-control"
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="Fiction, Science, Histoire..."
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="form-group mb-3">
                <label htmlFor="publishedYear">Année de publication</label>
                <input
                  type="number"
                  className="form-control"
                  id="publishedYear"
                  name="publishedYear"
                  value={formData.publishedYear || ""}
                  onChange={handleChange}
                  min="1000"
                  max={new Date().getFullYear()}
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group mb-3">
                <label htmlFor="copies">Nombre d'exemplaires</label>
                <input
                  type="number"
                  className="form-control"
                  id="copies"
                  name="copies"
                  value={formData.copies || 1}
                  onChange={handleChange}
                  min="1"
                />
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-end gap-2">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancel}
              disabled={loading}
            >
              Annuler
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? "Ajout en cours..." : "Ajouter le livre"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

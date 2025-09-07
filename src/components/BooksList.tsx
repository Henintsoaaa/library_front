import React, { useState, useEffect } from "react";
import { booksApi } from "../apis/books.api";
import { useAuth } from "../context/AuthContext";
import type { Book } from "../types/book.type";

interface BooksListProps {
  onBookSelect?: (book: Book) => void;
  showActions?: boolean;
}

export const BooksList: React.FC<BooksListProps> = ({
  onBookSelect,
  showActions = false,
}) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useAuth();

  const canManageBooks = user?.role === "admin";

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      setLoading(true);
      const booksData = await booksApi.getAll();
      setBooks(booksData);
      setError(null);
    } catch (err) {
      setError("Erreur lors du chargement des livres");
      console.error("Error loading books:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBook = async (bookId: string) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce livre ?")) {
      return;
    }

    try {
      await booksApi.delete(bookId);
      setBooks(books.filter((book) => book._id !== bookId));
    } catch (err) {
      setError("Erreur lors de la suppression du livre");
      console.error("Error deleting book:", err);
    }
  };

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="text-center p-4">
        <div className="spinner-border" role="status">
          <span className="sr-only">Chargement...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="books-list">
      <div className="mb-4">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h3>Catalogue des livres ({filteredBooks.length})</h3>
          </div>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Rechercher par titre, auteur ou catégorie..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {filteredBooks.length === 0 ? (
        <div className="text-center p-4">
          <p className="text-muted">Aucun livre trouvé</p>
        </div>
      ) : (
        <div className="row">
          {filteredBooks.map((book) => (
            <div key={book._id} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{book.title}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    par {book.author}
                  </h6>

                  <div className="mb-2">
                    <small className="text-muted">
                      <strong>ISBN:</strong> {book.isbn}
                    </small>
                  </div>

                  {book.category && (
                    <div className="mb-2">
                      <span className="badge badge-secondary">
                        {book.category}
                      </span>
                    </div>
                  )}

                  {book.publishedYear && (
                    <div className="mb-2">
                      <small className="text-muted">
                        <strong>Année:</strong> {book.publishedYear}
                      </small>
                    </div>
                  )}

                  {book.copies !== undefined && (
                    <div className="mb-2">
                      <small className="text-muted">
                        <strong>Exemplaires:</strong> {book.copies}
                      </small>
                    </div>
                  )}
                </div>

                {(showActions || onBookSelect) && (
                  <div className="card-footer">
                    <div className="btn-group w-100" role="group">
                      {onBookSelect && (
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => onBookSelect(book)}
                        >
                          Sélectionner
                        </button>
                      )}

                      {showActions && canManageBooks && (
                        <>
                          <button
                            className="btn btn-outline-primary btn-sm"
                            onClick={() => {
                              /* TODO: Implement edit */
                            }}
                          >
                            Modifier
                          </button>
                          <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => handleDeleteBook(book._id)}
                          >
                            Supprimer
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

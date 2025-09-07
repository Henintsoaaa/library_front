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
    <div className="create-borrowing-form">
      <h4>Créer un nouvel emprunt</h4>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {success && (
        <div className="alert alert-success" role="alert">
          {success}
        </div>
      )}

      {!showBookSelection ? (
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="row">
            {!isMember && (
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="userId">
                    ID Utilisateur <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="userId"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    required
                    disabled={!!preselectedUserId}
                    placeholder="Entrez l'ID de l'utilisateur"
                  />
                </div>
              </div>
            )}

            <div className={isMember ? "col-md-6" : "col-md-6"}>
              <div className="form-group">
                <label htmlFor="dueDate">
                  Date d'échéance <span className="text-danger">*</span>
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="dueDate"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  required
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>
              Livre sélectionné <span className="text-danger">*</span>
            </label>
            {selectedBook ? (
              <div className="card">
                <div className="card-body">
                  <div className="row align-items-center">
                    <div className="col">
                      <h6 className="card-title mb-1">{selectedBook.title}</h6>
                      <p className="card-text text-muted mb-0">
                        par {selectedBook.author}
                      </p>
                      <small className="text-muted">
                        ISBN: {selectedBook.isbn}
                      </small>
                    </div>
                    <div className="col-auto">
                      <button
                        type="button"
                        className="btn btn-outline-secondary btn-sm"
                        onClick={handleRemoveSelectedBook}
                      >
                        Changer de livre
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={() => setShowBookSelection(true)}
              >
                Sélectionner un livre
              </button>
            )}
          </div>

          <div className="form-group">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading || !selectedBook}
            >
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm mr-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Création...
                </>
              ) : (
                "Créer l'emprunt"
              )}
            </button>
            <button
              type="button"
              className="btn btn-secondary ml-2"
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
            >
              Réinitialiser
            </button>
          </div>
        </form>
      ) : (
        <div>
          <div className="mb-3">
            <button
              className="btn btn-secondary"
              onClick={() => setShowBookSelection(false)}
            >
              ← Retour au formulaire
            </button>
          </div>
          <BooksList onBookSelect={handleBookSelect} />
        </div>
      )}
    </div>
  );
};

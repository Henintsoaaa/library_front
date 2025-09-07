import React, { useState, useEffect } from "react";
import { borrowingsApi } from "../apis/borrowings.api";
import { useAuth } from "../context/AuthContext";
import type { BorrowingWithDetails } from "../types/borrowing.type";

export const OverdueBooksList: React.FC = () => {
  const [overdueBooks, setOverdueBooks] = useState<BorrowingWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const canViewOverdue = user?.role === "admin" || user?.role === "librarian";

  useEffect(() => {
    if (canViewOverdue) {
      loadOverdueBooks();
    } else {
      setLoading(false);
    }
  }, [canViewOverdue]);

  const loadOverdueBooks = async () => {
    try {
      setLoading(true);
      const overdueData = await borrowingsApi.getOverdueBooks();
      setOverdueBooks(overdueData);
      setError(null);
    } catch (err) {
      setError("Erreur lors du chargement des livres en retard");
      console.error("Error loading overdue books:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleReturnBook = async (borrowingId: string) => {
    if (!window.confirm("Confirmer le retour de ce livre en retard ?")) {
      return;
    }

    try {
      await borrowingsApi.returnBook(borrowingId);
      await loadOverdueBooks();
    } catch (err) {
      setError("Erreur lors du retour du livre");
      console.error("Error returning book:", err);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR");
  };

  const getDaysOverdue = (dueDateString: string) => {
    const dueDate = new Date(dueDateString);
    const today = new Date();
    const diffTime = today.getTime() - dueDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (!canViewOverdue) {
    return (
      <div className="alert alert-warning">
        Vous n'avez pas les permissions nécessaires pour voir les livres en
        retard.
      </div>
    );
  }

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
    <div className="overdue-books-list">
      <div className="mb-4">
        <h3 className="text-danger">
          <i className="fas fa-exclamation-triangle"></i>
          Livres en retard ({overdueBooks.length})
        </h3>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {overdueBooks.length === 0 ? (
        <div className="alert alert-success">
          <i className="fas fa-check-circle"></i>
          Aucun livre en retard ! Tous les emprunts sont à jour.
        </div>
      ) : (
        <>
          <div className="alert alert-info">
            <strong>Info:</strong> Les livres listés ci-dessous ont dépassé leur
            date limite de retour.
          </div>

          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead className="thead-dark">
                <tr>
                  <th>Utilisateur</th>
                  <th>Livre</th>
                  <th>Date limite</th>
                  <th>Jours de retard</th>
                  <th>Date d'emprunt</th>
                  <th>Statut</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {overdueBooks.map((borrowing) => {
                  const daysOverdue = getDaysOverdue(borrowing.dueDate);
                  return (
                    <tr key={borrowing._id} className="table-warning">
                      <td>
                        <strong>
                          {borrowing.user?.name || "Utilisateur inconnu"}
                        </strong>
                        <br />
                        <small className="text-muted">
                          {borrowing.user?.email}
                        </small>
                        {borrowing.user?.phone && (
                          <>
                            <br />
                            <small className="text-muted">
                              <i className="fas fa-phone"></i>{" "}
                              {borrowing.user.phone}
                            </small>
                          </>
                        )}
                      </td>
                      <td>
                        <strong>
                          {borrowing.book?.title || "Livre inconnu"}
                        </strong>
                        <br />
                        <small className="text-muted">
                          par {borrowing.book?.author}
                        </small>
                        <br />
                        <small className="text-muted">
                          ISBN: {borrowing.book?.isbn}
                        </small>
                      </td>
                      <td>
                        <span className="text-danger">
                          <i className="fas fa-calendar-times"></i>
                          {formatDate(borrowing.dueDate)}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`badge ${
                            daysOverdue > 7 ? "badge-danger" : "badge-warning"
                          }`}
                        >
                          {daysOverdue} jour{daysOverdue > 1 ? "s" : ""}
                        </span>
                      </td>
                      <td>{formatDate(borrowing.borrowDate)}</td>
                      <td>
                        <span className="badge badge-danger">
                          {borrowing.status === "overdue"
                            ? "En retard (marqué)"
                            : "En retard"}
                        </span>
                      </td>
                      <td>
                        <button
                          className="btn btn-success btn-sm"
                          onClick={() => handleReturnBook(borrowing._id)}
                          title="Marquer comme retourné"
                        >
                          <i className="fas fa-check"></i>
                          Retourner
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="mt-3">
            <div className="alert alert-warning">
              <strong>Légende:</strong>
              <ul className="mb-0">
                <li>
                  <span className="badge badge-warning">1-7 jours</span> :
                  Retard modéré
                </li>
                <li>
                  <span className="badge badge-danger">8+ jours</span> : Retard
                  important
                </li>
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

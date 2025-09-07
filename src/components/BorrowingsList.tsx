import React, { useState, useEffect } from "react";
import { borrowingsApi } from "../apis/borrowings.api";
import { useAuth } from "../context/AuthContext";
import type {
  BorrowingWithDetails,
  BorrowingStats,
} from "../types/borrowing.type";

interface BorrowingsListProps {
  userId?: string;
  showStats?: boolean;
  activeOnly?: boolean;
}

export const BorrowingsList: React.FC<BorrowingsListProps> = ({
  userId,
  showStats = false,
  activeOnly = false,
}) => {
  const [borrowings, setBorrowings] = useState<BorrowingWithDetails[]>([]);
  const [stats, setStats] = useState<BorrowingStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const canManageBorrowings =
    user?.role === "admin" || user?.role === "librarian";
  const isUserView = userId || user?.role === "member";

  useEffect(() => {
    loadBorrowings();
    if (showStats && canManageBorrowings) {
      loadStats();
    }
  }, [userId, activeOnly]);

  const loadBorrowings = async () => {
    try {
      setLoading(true);
      let borrowingsData: BorrowingWithDetails[];

      if (userId) {
        // Charger les emprunts d'un utilisateur spécifique
        if (activeOnly) {
          borrowingsData = await borrowingsApi.getActiveByUserId(userId);
        } else {
          borrowingsData = await borrowingsApi.getByUserId(userId);
        }
      } else if (user?.role === "member") {
        // Charger mes emprunts
        if (activeOnly) {
          borrowingsData = await borrowingsApi.getMyActiveBorrowings();
        } else {
          borrowingsData = await borrowingsApi.getMyBorrowings();
        }
      } else if (canManageBorrowings) {
        // Charger tous les emprunts (admin/librarian)
        borrowingsData = await borrowingsApi.getAll();
      } else {
        borrowingsData = [];
      }

      setBorrowings(borrowingsData);
      setError(null);
    } catch (err) {
      setError("Erreur lors du chargement des emprunts");
      console.error("Error loading borrowings:", err);
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      if (canManageBorrowings) {
        const statsData = await borrowingsApi.getStats();
        setStats(statsData);
      }
    } catch (err) {
      console.error("Error loading stats:", err);
    }
  };

  const handleReturnBook = async (borrowingId: string) => {
    if (!window.confirm("Confirmer le retour de ce livre ?")) {
      return;
    }

    try {
      await borrowingsApi.returnBook(borrowingId);
      await loadBorrowings();
      if (showStats) {
        await loadStats();
      }
    } catch (err) {
      setError("Erreur lors du retour du livre");
      console.error("Error returning book:", err);
    }
  };

  const handleMarkOverdue = async () => {
    try {
      await borrowingsApi.markOverdue();
      await loadBorrowings();
      if (showStats) {
        await loadStats();
      }
    } catch (err) {
      setError("Erreur lors du marquage des retards");
      console.error("Error marking overdue:", err);
    }
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

  const getStatusBadge = (borrowing: BorrowingWithDetails) => {
    const baseClasses = "badge ";
    switch (borrowing.status) {
      case "borrowed":
        return (
          baseClasses +
          (isOverdue(borrowing) ? "badge-warning" : "badge-primary")
        );
      case "returned":
        return baseClasses + "badge-success";
      case "overdue":
        return baseClasses + "badge-danger";
      default:
        return baseClasses + "badge-secondary";
    }
  };

  const getStatusText = (borrowing: BorrowingWithDetails) => {
    if (borrowing.status === "borrowed" && isOverdue(borrowing)) {
      return "En retard";
    }
    switch (borrowing.status) {
      case "borrowed":
        return "Emprunté";
      case "returned":
        return "Retourné";
      case "overdue":
        return "En retard";
      default:
        return borrowing.status;
    }
  };

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
    <div className="borrowings-list">
      {showStats && stats && canManageBorrowings && (
        <div className="row mb-4">
          <div className="col-md-3">
            <div className="card text-center">
              <div className="card-body">
                <h5 className="card-title text-primary">
                  {stats.totalBorrowings}
                </h5>
                <p className="card-text">Total emprunts</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-center">
              <div className="card-body">
                <h5 className="card-title text-info">
                  {stats.activeBorrowings}
                </h5>
                <p className="card-text">Emprunts actifs</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-center">
              <div className="card-body">
                <h5 className="card-title text-success">
                  {stats.returnedBorrowings}
                </h5>
                <p className="card-text">Retournés</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-center">
              <div className="card-body">
                <h5 className="card-title text-danger">
                  {stats.overdueBorrowings}
                </h5>
                <p className="card-text">En retard</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mb-4">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h3>
              {isUserView
                ? activeOnly
                  ? "Emprunts actifs"
                  : "Mes emprunts"
                : "Gestion des emprunts"}{" "}
              ({borrowings.length})
            </h3>
          </div>
          <div className="col-md-6 text-right">
            {canManageBorrowings && (
              <button
                className="btn btn-warning btn-sm"
                onClick={handleMarkOverdue}
              >
                Marquer les retards
              </button>
            )}
          </div>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {borrowings.length === 0 ? (
        <div className="text-center p-4">
          <p className="text-muted">Aucun emprunt trouvé</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                {!isUserView && <th>Utilisateur</th>}
                <th>Livre</th>
                <th>Date d'emprunt</th>
                <th>Date limite</th>
                {!activeOnly && <th>Date de retour</th>}
                <th>Statut</th>
                {canManageBorrowings && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {borrowings.map((borrowing) => (
                <tr key={borrowing._id}>
                  {!isUserView && (
                    <td>
                      {borrowing.user?.name || "Utilisateur inconnu"}
                      <br />
                      <small className="text-muted">
                        {borrowing.user?.email}
                      </small>
                    </td>
                  )}
                  <td>
                    <strong>{borrowing.book?.title || "Livre inconnu"}</strong>
                    <br />
                    <small className="text-muted">
                      {borrowing.book?.author}
                    </small>
                  </td>
                  <td>{formatDate(borrowing.borrowDate)}</td>
                  <td>
                    {formatDate(borrowing.dueDate)}
                    {isOverdue(borrowing) &&
                      borrowing.status !== "returned" && (
                        <>
                          <br />
                          <small className="text-danger">
                            <i className="fas fa-exclamation-triangle"></i> En
                            retard
                          </small>
                        </>
                      )}
                  </td>
                  {!activeOnly && (
                    <td>
                      {borrowing.returnDate
                        ? formatDate(borrowing.returnDate)
                        : "-"}
                    </td>
                  )}
                  <td>
                    <span className={getStatusBadge(borrowing)}>
                      {getStatusText(borrowing)}
                    </span>
                  </td>
                  {canManageBorrowings && (
                    <td>
                      {borrowing.status === "borrowed" ||
                      borrowing.status === "overdue" ? (
                        <button
                          className="btn btn-success btn-sm"
                          onClick={() => handleReturnBook(borrowing._id)}
                        >
                          Retourner
                        </button>
                      ) : (
                        <span className="text-muted">-</span>
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

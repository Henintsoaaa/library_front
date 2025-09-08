import React, { useState, useEffect } from "react";
import { borrowingsApi } from "../apis/borrowings.api";
import { useAuth } from "../context/AuthContext";
import { UpdateBorrowingModal } from "./UpdateBorrowingModal";
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
  const [selectedBorrowing, setSelectedBorrowing] =
    useState<BorrowingWithDetails | null>(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
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
      } else if (user?.role === "user") {
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

  const handleUpdateBorrowing = (borrowing: BorrowingWithDetails) => {
    setSelectedBorrowing(borrowing);
    setShowUpdateModal(true);
  };

  const handleDeleteBorrowing = async (borrowingId: string) => {
    if (
      !window.confirm(
        "Êtes-vous sûr de vouloir supprimer cet emprunt ? Cette action est irréversible."
      )
    ) {
      return;
    }

    try {
      await borrowingsApi.delete(borrowingId);
      await loadBorrowings();
      if (showStats) {
        await loadStats();
      }
    } catch (err) {
      setError("Erreur lors de la suppression de l'emprunt");
      console.error("Error deleting borrowing:", err);
    }
  };

  const handleBorrowingUpdated = () => {
    loadBorrowings();
    if (showStats) {
      loadStats();
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
    switch (borrowing.status) {
      case "borrowed":
        return isOverdue(borrowing)
          ? "bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-semibold"
          : "bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-semibold";
      case "returned":
        return "bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold";
      case "overdue":
        return "bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-semibold";
      default:
        return "bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-semibold";
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
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
        <span className="ml-3 text-gray-600">Chargement...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {showStats && stats && canManageBorrowings && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center border border-blue-100">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {stats.totalBorrowings}
            </div>
            <p className="text-gray-600">Total emprunts</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center border border-cyan-100">
            <div className="text-3xl font-bold text-cyan-600 mb-2">
              {stats.activeBorrowings}
            </div>
            <p className="text-gray-600">Emprunts actifs</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center border border-green-100">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {stats.returnedBorrowings}
            </div>
            <p className="text-gray-600">Retournés</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center border border-red-100">
            <div className="text-3xl font-bold text-red-600 mb-2">
              {stats.overdueBorrowings}
            </div>
            <p className="text-gray-600">En retard</p>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
        <h3 className="text-2xl font-bold text-gray-800">
          {isUserView
            ? activeOnly
              ? "Emprunts actifs"
              : "Mes emprunts"
            : "Gestion des emprunts"}{" "}
          <span className="text-blue-600">({borrowings.length})</span>
        </h3>
        {canManageBorrowings && (
          <button
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-2xl font-medium transition-colors duration-200 flex items-center"
            onClick={handleMarkOverdue}
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
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
            Marquer les retards
          </button>
        )}
      </div>

      {error && (
        <div
          className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-2xl mb-6"
          role="alert"
        >
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

      {borrowings.length === 0 ? (
        <div className="text-center py-12">
          <svg
            className="mx-auto h-12 w-12 text-gray-400 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
          <p className="text-gray-500 text-lg">Aucun emprunt trouvé</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {!isUserView && (
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Utilisateur
                    </th>
                  )}
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Livre
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date d'emprunt
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date limite
                  </th>
                  {!activeOnly && (
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date de retour
                    </th>
                  )}
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                  {canManageBorrowings && (
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {borrowings.map((borrowing, index) => (
                  <tr
                    key={borrowing._id}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    {!isUserView && (
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {borrowing.user?.name || "Utilisateur inconnu"}
                          </div>
                          <div className="text-sm text-gray-500">
                            {borrowing.user?.email}
                          </div>
                        </div>
                      </td>
                    )}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {borrowing.book?.title || "Livre inconnu"}
                        </div>
                        <div className="text-sm text-gray-500">
                          {borrowing.book?.author}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatDate(borrowing.borrowDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {formatDate(borrowing.dueDate)}
                      </div>
                      {isOverdue(borrowing) &&
                        borrowing.status !== "returned" && (
                          <div className="text-xs text-red-600 flex items-center mt-1">
                            <svg
                              className="w-3 h-3 mr-1"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                clipRule="evenodd"
                              />
                            </svg>
                            En retard
                          </div>
                        )}
                    </td>
                    {!activeOnly && (
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {borrowing.returnDate
                          ? formatDate(borrowing.returnDate)
                          : "-"}
                      </td>
                    )}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={getStatusBadge(borrowing)}>
                        {getStatusText(borrowing)}
                      </span>
                    </td>
                    {canManageBorrowings && (
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex gap-2">
                          {borrowing.status === "borrowed" ||
                          borrowing.status === "overdue" ? (
                            <button
                              className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center"
                              onClick={() => handleReturnBook(borrowing._id)}
                            >
                              <svg
                                className="w-4 h-4 mr-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                              Retourner
                            </button>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}

                          <button
                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center"
                            onClick={() => handleUpdateBorrowing(borrowing)}
                          >
                            <svg
                              className="w-4 h-4 mr-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              />
                            </svg>
                            Modifier
                          </button>

                          {user?.role === "admin" && (
                            <button
                              className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center"
                              onClick={() =>
                                handleDeleteBorrowing(borrowing._id)
                              }
                            >
                              <svg
                                className="w-4 h-4 mr-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                              Supprimer
                            </button>
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <UpdateBorrowingModal
        borrowing={selectedBorrowing}
        isOpen={showUpdateModal}
        onClose={() => setShowUpdateModal(false)}
        onBorrowingUpdated={handleBorrowingUpdated}
      />
    </div>
  );
};

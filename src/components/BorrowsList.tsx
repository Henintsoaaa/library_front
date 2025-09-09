import { useEffect, useState, useMemo } from "react";
import { useAuth } from "../context/AuthContext";
import {
  getAllBorrowings,
  getMyBorrowings,
  returnBorrowing,
} from "../apis/borrows.api";
import { getBookDetails } from "../apis/books.api";
import { getUserById } from "../apis/users.api";
import type { Borrow } from "../types/borrows.type";
import type { Book } from "../types/book.type";
import type { User } from "../types/auth.type";

interface BorrowWithBook extends Borrow {
  book?: Book;
  user?: User;
}

export default function BorrowsList() {
  const [borrows, setBorrows] = useState<BorrowWithBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    const fetchBorrows = async () => {
      try {
        setLoading(true);
        let data: Borrow[] = [];
        if (user?.role === "user") {
          data = await getMyBorrowings();
        } else {
          data = await getAllBorrowings();
        }

        // Fetch book details for each borrow
        const borrowsWithBooks = await Promise.all(
          data.map(async (borrow) => {
            try {
              const book = await getBookDetails(borrow.bookId);
              let userDetails = undefined;

              // Fetch user details only for admin users
              if (user?.role === "admin") {
                try {
                  userDetails = await getUserById(borrow.userId);
                } catch (userError) {
                  console.error(
                    `Error fetching user ${borrow.userId}:`,
                    userError
                  );
                  // Fallback: create a basic user object with ID
                  userDetails = {
                    id: borrow.userId,
                    _id: borrow.userId,
                    name: "Utilisateur inconnu",
                    email: "",
                    role: "user" as const,
                  };
                }
              }

              return { ...borrow, book, user: userDetails };
            } catch (error) {
              console.error(`Error fetching book ${borrow.bookId}:`, error);
              return borrow;
            }
          })
        );

        setBorrows(borrowsWithBooks);
      } catch (error) {
        console.error("Error fetching borrows:", error);
        setError("Failed to fetch borrows. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchBorrows();
  }, [user]);

  const returnBook = async (borrowId: string) => {
    try {
      const updatedBorrow = await returnBorrowing(borrowId);
      setBorrows((prevBorrows) =>
        prevBorrows.map((b) =>
          (b.id || b._id) === (updatedBorrow.id || updatedBorrow._id)
            ? updatedBorrow
            : b
        )
      );
      alert("Livre retourné avec succès!");
    } catch (error: any) {
      console.error("Error returning book:", error);
      const errorMessage =
        error.response?.data?.message ||
        "Une erreur est survenue lors du retour du livre.";
      alert(`Erreur: ${errorMessage}`);
    }
  };

  const filteredBorrows = useMemo(() => {
    let filtered = borrows;

    // Pour les utilisateurs normaux, masquer les livres retournés
    if (user?.role === "user") {
      filtered = filtered.filter((borrow) => borrow.status !== "returned");
    }

    // Appliquer la recherche si il y a un terme de recherche
    if (searchTerm) {
      filtered = filtered.filter((borrow) => {
        const book = borrow.book;
        if (!book) return false;
        return (
          book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          borrow.status.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
    }

    return filtered;
  }, [borrows, searchTerm, user?.role]);

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "borrowed":
        return { variant: "default", color: "bg-blue-100 text-blue-800" };
      case "returned":
        return { variant: "secondary", color: "bg-green-100 text-green-800" };
      case "overdue":
        return { variant: "destructive", color: "bg-red-100 text-red-800" };
      default:
        return { variant: "secondary", color: "bg-gray-100 text-gray-800" };
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date() && !dueDate.includes("returned");
  };

  if (loading) {
    return (
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="text-center animate-fade-in-up">
              <h1 className="heading-lg text-gradient mb-6">
                {user?.role === "user" ? "Mes Emprunts" : "Tous les Emprunts"}
              </h1>
              <div className="max-w-md mx-auto">
                <div className="h-12 bg-gray-200 rounded-xl animate-pulse skeleton"></div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="modern-card p-6 animate-pulse">
                <div className="flex justify-between items-start mb-4">
                  <div className="h-6 bg-gray-200 rounded-full w-20 skeleton"></div>
                  <div className="h-4 bg-gray-200 rounded w-16 skeleton"></div>
                </div>
                <div className="h-6 bg-gray-200 rounded mb-4 skeleton"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded skeleton"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6 skeleton"></div>
                  <div className="h-4 bg-gray-200 rounded w-4/6 skeleton"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="modern-card p-8 text-center animate-bounce-in">
            <div className="mx-auto h-16 w-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mb-4">
              <svg
                className="h-8 w-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Une erreur est survenue
            </h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="btn-gradient text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              Réessayer
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="text-center animate-fade-in-up mb-8">
            <h1 className="heading-lg text-gradient mb-6">
              {user?.role === "user" ? "Mes Emprunts" : "Tous les Emprunts"}
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              {user?.role === "user"
                ? "Suivez vos emprunts et leurs dates de retour"
                : "Gérez tous les emprunts de la bibliothèque"}
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8 animate-fade-in-up animation-delay-200">
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher par titre, auteur, catégorie ou statut..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-4 pl-14 text-gray-900 bg-white/90 backdrop-blur-sm border border-gray-300 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-lg transition-all duration-200 text-lg"
              />
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg
                  className="h-6 w-6 text-gray-400"
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
              </div>
            </div>
          </div>

          {/* Results count */}
          <div className="text-center text-gray-600 mb-8 animate-fade-in-up animation-delay-300">
            <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200">
              <svg
                className="w-4 h-4 mr-2 text-blue-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              {filteredBorrows.length === borrows.length
                ? `${borrows.length} emprunts`
                : `${filteredBorrows.length} sur ${borrows.length} emprunts trouvés`}
            </div>
          </div>
        </div>

        {filteredBorrows.length === 0 ? (
          <div className="text-center py-16 animate-fade-in-up animation-delay-400">
            <div className="mx-auto h-24 w-24 bg-gradient-to-br from-gray-300 to-gray-400 rounded-3xl flex items-center justify-center mb-6">
              <svg
                className="h-12 w-12 text-white"
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
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {searchTerm ? "Aucun emprunt trouvé" : "Aucun emprunt"}
            </h2>
            <p className="text-lg text-gray-600 max-w-md mx-auto">
              {searchTerm
                ? "Essayez de modifier vos termes de recherche"
                : user?.role === "user"
                ? "Vous n'avez pas d'emprunts en cours"
                : "Aucun emprunt n'a été enregistré"}
            </p>
          </div>
        ) : (
          <div className="animate-fade-in-up animation-delay-400">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-blue-50 to-purple-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Livre
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Auteur
                      </th>
                      {user?.role === "admin" && (
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Emprunteur
                        </th>
                      )}
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Statut
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Date d'emprunt
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Échéance
                      </th>
                      {user?.role === "user" && (
                        <>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Action
                          </th>
                        </>
                      )}

                      {user?.role === "admin" && (
                        <>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            ISBN
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Emplacement
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Date de retour
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Action
                          </th>
                        </>
                      )}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredBorrows.map((borrow, index) => {
                      const id = borrow.id || borrow._id;
                      const statusInfo = getStatusVariant(borrow.status);
                      const overdue =
                        isOverdue(borrow.dueDate) &&
                        borrow.status === "borrowed";

                      return (
                        <tr
                          key={id}
                          className={`hover:bg-gray-50 transition-colors duration-200 ${
                            index % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                          }`}
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              {/*<div className="flex h-10 w-10">
                                 <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                                   <svg
                                    className="h-6 w-6 text-white"
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
                              </div>*/}
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {borrow.book?.title || "Livre inconnu"}
                                </div>
                                {borrow.book?.category && (
                                  <div className="text-sm text-gray-500">
                                    {borrow.book.category}
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900">
                              {borrow.book?.author || "Auteur inconnu"}
                            </div>
                          </td>
                          {user?.role === "admin" && (
                            <td className="px-6 py-4">
                              <div className="text-sm text-gray-900">
                                {borrow.user ? (
                                  <div>
                                    <div className="font-medium">
                                      {borrow.user.name}
                                    </div>
                                    <div className="text-gray-500">
                                      {borrow.user.email}
                                    </div>
                                  </div>
                                ) : (
                                  <span className="text-gray-500">
                                    Utilisateur inconnu
                                  </span>
                                )}
                              </div>
                            </td>
                          )}

                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                statusInfo.color
                              } ${
                                overdue
                                  ? "bg-red-100 text-red-800 animate-pulse"
                                  : ""
                              }`}
                            >
                              {borrow.status === "borrowed" && overdue
                                ? "En retard"
                                : borrow.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900">
                              {formatDate(borrow.borrowDate)}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div
                              className={`text-sm ${
                                overdue
                                  ? "text-red-600 font-semibold"
                                  : "text-gray-900"
                              }`}
                            >
                              {formatDate(borrow.dueDate)}
                              {overdue && (
                                <div className="text-xs text-red-500 mt-1">
                                  En retard
                                </div>
                              )}
                            </div>
                          </td>
                          {user?.role === "user" && (
                            <td className="px-6 py-4">
                              {borrow.status === "borrowed" ? (
                                <button
                                  onClick={() => returnBook(String(id))}
                                  className="btn-gradient text-white px-4 py-2 rounded-2xl text-sm font-medium shadow hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                                >
                                  Retourner
                                </button>
                              ) : (
                                <span className="text-sm text-gray-500">
                                  N/A
                                </span>
                              )}
                            </td>
                          )}
                          {user?.role === "admin" && (
                            <>
                              <td className="px-6 py-4">
                                <div className="text-sm text-gray-900 font-mono">
                                  {borrow.book?.isbn || "N/A"}
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <div className="text-sm text-gray-900">
                                  {borrow.book?.location || "N/A"}
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <div className="text-sm text-gray-900">
                                  {borrow.returnDate
                                    ? formatDate(borrow.returnDate)
                                    : "-"}
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                {borrow.status === "borrowed" ? (
                                  <button
                                    onClick={() => returnBook(String(id))}
                                    className="btn-gradient text-white px-4 py-2 rounded-2xl text-sm font-medium shadow hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                                  >
                                    Retourner
                                  </button>
                                ) : (
                                  <span className="text-sm text-gray-500">
                                    N/A
                                  </span>
                                )}
                              </td>
                            </>
                          )}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

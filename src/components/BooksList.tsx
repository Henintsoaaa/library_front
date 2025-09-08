import React, { useState, useEffect } from "react";
import { booksApi } from "../apis/books.api";
import { borrowingsApi } from "../apis/borrowings.api";
import { useAuth } from "../context/AuthContext";
import type { Book, BooksResponse, PaginationInfo } from "../types/book.type";
import type { CreateBorrowingDto } from "../types/borrowing.type";
import UpdateBookModal from "./UpdateBookModal";
import DeleteBookModal from "./DeleteBookModal";
import { ManageBorrowingModal } from "./ManageBorrowingModal";

interface BooksListProps {
  onBookSelect?: (book: Book) => void;
  showActions?: boolean;
  showBorrowAction?: boolean;
  showManageBorrowingAction?: boolean;
}

export const BooksList: React.FC<BooksListProps> = ({
  onBookSelect,
  showActions = false,
  showBorrowAction = false,
  showManageBorrowingAction = false,
}) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [bookToDelete, setBookToDelete] = useState<Book | null>(null);
  const [showManageBorrowingModal, setShowManageBorrowingModal] =
    useState(false);
  const [bookToManageBorrowing, setBookToManageBorrowing] =
    useState<Book | null>(null);
  const [pagination, setPagination] = useState<PaginationInfo>({
    page: 1,
    limit: 5,
    total: 0,
    totalPages: 0,
  });
  const { user } = useAuth();

  const canManageBooks = user?.role === "admin" || user?.role === "librarian";
  const canBorrowBooks =
    user?.role === "member" ||
    user?.role === "admin" ||
    user?.role === "librarian";

  const [triggerLoad, setTriggerLoad] = useState(0);

  // Initial load
  useEffect(() => {
    loadBooks(1, 5); // Use smaller limit to ensure pagination shows
  }, []);

  // Load on pagination changes
  useEffect(() => {
    if (triggerLoad > 0) {
      loadBooks(pagination.page, pagination.limit);
    }
  }, [triggerLoad, pagination.page, pagination.limit]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setPagination((prev) => ({ ...prev, page: newPage }));
      setTriggerLoad((prev) => prev + 1);
    }
  };

  const handleLimitChange = (newLimit: number) => {
    setPagination((prev) => ({ ...prev, limit: newLimit, page: 1 }));
    setTriggerLoad((prev) => prev + 1);
  };

  const loadBooks = async (page: number = 1, limit: number = 10) => {
    try {
      setLoading(true);
      const response: BooksResponse = await booksApi.getAll(page, limit);
      console.log("Books API response:", response);
      setBooks(response.books);
      setPagination(response.pagination);
      console.log("Pagination set:", response.pagination);
      setError(null);
    } catch (err) {
      setError("Erreur lors du chargement des livres");
      console.error("Error loading books:", err);
    } finally {
      setLoading(false);
    }
  };

  // show the update book modal
  const handleUpdateBook = (book: Book) => {
    setSelectedBook(book);
    setShowUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
    setSelectedBook(null);
  };

  const handleBookUpdated = async (updatedBook: Book) => {
    try {
      // Extract only the updatable fields from the Book object
      const updateData = {
        title: updatedBook.title,
        author: updatedBook.author,
        isbn: updatedBook.isbn,
        category: updatedBook.category,
        publishedYear: updatedBook.publishedYear,
        copies: updatedBook.copies,
      };

      await booksApi.update(updatedBook._id, updateData);
      await loadBooks(pagination.page, pagination.limit); // Reload current page
      setShowUpdateModal(false);
      setSelectedBook(null);
    } catch (err) {
      setError("Erreur lors de la mise à jour du livre");
      console.error("Error updating book:", err);
    }
  };

  const handleDeleteBook = (book: Book) => {
    setBookToDelete(book);
    setShowDeleteModal(true);
  };

  const confirmDeleteBook = async () => {
    if (!bookToDelete) return;
    try {
      await booksApi.delete(bookToDelete._id);
      // If we're on a page that becomes empty after deletion, go to previous page
      const newTotal = pagination.total - 1;
      const newTotalPages = Math.ceil(newTotal / pagination.limit);
      const newPage =
        pagination.page > newTotalPages ? newTotalPages : pagination.page;

      if (newPage !== pagination.page) {
        setPagination((prev) => ({
          ...prev,
          page: newPage,
          total: newTotal,
          totalPages: newTotalPages,
        }));
      } else {
        await loadBooks(pagination.page, pagination.limit);
      }

      setShowDeleteModal(false);
      setBookToDelete(null);
    } catch (err) {
      setError("Erreur lors de la suppression du livre");
      console.error("Error deleting book:", err);
    }
  };

  const cancelDeleteBook = () => {
    setShowDeleteModal(false);
    setBookToDelete(null);
  };

  const handleBorrowBook = async (book: Book) => {
    if (!user?.id) {
      setError("Vous devez être connecté pour emprunter un livre");
      return;
    }

    if (!window.confirm(`Voulez-vous emprunter le livre "${book.title}" ?`)) {
      return;
    }

    try {
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + 14); // 2 semaines par défaut

      const borrowingData: CreateBorrowingDto = {
        userId: user.id,
        bookId: book._id,
        dueDate: dueDate.toISOString(),
      };

      await borrowingsApi.create(borrowingData);
      alert("Livre emprunté avec succès!");
    } catch (err) {
      const errorMessage =
        err instanceof Error && "response" in err
          ? (err as any).response?.data?.message
          : "Erreur lors de l'emprunt du livre";
      setError(errorMessage);
      console.error("Error borrowing book:", err);
    }
  };

  const handleManageBorrowing = (book: Book) => {
    setBookToManageBorrowing(book);
    setShowManageBorrowingModal(true);
  };

  const handleCloseManageBorrowingModal = () => {
    setShowManageBorrowingModal(false);
    setBookToManageBorrowing(null);
  };

  const handleBorrowingUpdated = () => {
    // Recharger la liste des livres pour mettre à jour les disponibilités
    loadBooks(pagination.page, pagination.limit);
  };

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
        <span className="ml-3 text-gray-600">Chargement...</span>
      </div>
    );
  }

  console.log("Pagination check:", pagination);

  return (
    <div className="container mx-auto px-4 animate-fade-in">
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-end gap-4">
          <div className="md:w-1/2">
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl h-12 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="Rechercher par titre, auteur ou catégorie..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
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

      {filteredBooks.length === 0 ? (
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
          <p className="text-gray-500 text-lg">Aucun livre trouvé</p>
        </div>
      ) : (
        <div className="grid gird-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBooks.map((book) => (
            <div key={book._id} className="animate-slide-in-left">
              <div className="bg-white rounded-xl shadow-lg h-full flex flex-col overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-200">
                <div className="flex-1 p-6">
                  <h5 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
                    {book.title}
                  </h5>
                  <h6 className="text-sm font-medium text-gray-600 mb-4">
                    par {book.author}
                  </h6>

                  <div className="space-y-2">
                    <div className="text-sm text-gray-600">
                      <span className="font-semibold">ISBN:</span> {book.isbn}
                    </div>

                    {book.category && (
                      <div>
                        <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-semibold">
                          {book.category}
                        </span>
                      </div>
                    )}

                    {book.publishedYear && (
                      <div className="text-sm text-gray-600">
                        <span className="font-semibold">Année:</span>{" "}
                        {book.publishedYear}
                      </div>
                    )}

                    {book.copies !== undefined && (
                      <div className="text-sm text-gray-600">
                        <span className="font-semibold">Exemplaires:</span>
                        <span
                          className={`ml-1 font-bold ${
                            book.copies > 0 ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {book.copies}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {(showActions ||
                  onBookSelect ||
                  showBorrowAction ||
                  showManageBorrowingAction) && (
                  <div className="border-t border-gray-100 px-6 py-4">
                    <div className="flex flex-wrap gap-2">
                      {onBookSelect && (
                        <button
                          className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-2xl font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex-1"
                          onClick={() => onBookSelect(book)}
                        >
                          Sélectionner
                        </button>
                      )}

                      {showBorrowAction && canBorrowBooks && !onBookSelect && (
                        <button
                          className="bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-2 rounded-2xl font-medium hover:from-green-700 hover:to-green-800 transition-all duration-200 flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                          onClick={() => handleBorrowBook(book)}
                          disabled={book.copies === 0}
                        >
                          {book.copies === 0 ? "Non disponible" : "Emprunter"}
                        </button>
                      )}

                      {showManageBorrowingAction &&
                        canBorrowBooks &&
                        !onBookSelect && (
                          <button
                            className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-4 py-2 rounded-2xl font-medium hover:from-purple-700 hover:to-purple-800 transition-all duration-200 flex-1"
                            onClick={() => handleManageBorrowing(book)}
                          >
                            <svg
                              className="w-4 h-4 mr-2 inline"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5H7a2 2 0 00-2 2v11a2 2 0 002 2h9.586a1 1 0 00.707-.293l2.414-2.414A1 1 0 0018 17.586V7a2 2 0 00-2-2h-2m-6 6v2m0-2V7m0 4h2m-2-4h2"
                              />
                            </svg>
                            Gérer emprunt
                          </button>
                        )}

                      {showActions && canManageBooks && (
                        <>
                          <button
                            className="bg-white text-blue-600 border border-blue-600 px-3 py-2 rounded-2xl font-medium hover:bg-blue-50 transition-colors duration-200 flex-1"
                            onClick={() => {
                              handleUpdateBook(book);
                            }}
                          >
                            Modifier
                          </button>
                          <button
                            className="bg-white text-red-600 border border-red-600 px-3 py-2 rounded-2xl font-medium hover:bg-red-50 transition-colors duration-200 flex-1"
                            onClick={() => handleDeleteBook(book)}
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

      {/* Pagination Controls */}
      {(pagination.totalPages > 1 || pagination.total > 0) && (
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Afficher</span>
            <select
              value={pagination.limit}
              onChange={(e) => handleLimitChange(Number(e.target.value))}
              className="px-2 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
            <span className="text-sm text-gray-600">par page</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(pagination.page - 1)}
              disabled={pagination.page <= 1}
              className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Précédent
            </button>

            <div className="flex items-center gap-1">
              {Array.from(
                { length: Math.min(5, pagination.totalPages) },
                (_, i) => {
                  const pageNum = Math.max(1, pagination.page - 2) + i;
                  if (pageNum > pagination.totalPages) return null;

                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`px-3 py-2 text-sm font-medium rounded-md ${
                        pageNum === pagination.page
                          ? "bg-blue-600 text-white"
                          : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                }
              )}
            </div>

            <button
              onClick={() => handlePageChange(pagination.page + 1)}
              disabled={pagination.page >= pagination.totalPages}
              className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Suivant
            </button>
          </div>

          <div className="text-sm text-gray-600">
            Page {pagination.page} sur {pagination.totalPages} (
            {pagination.total} livres au total)
          </div>
        </div>
      )}

      {showUpdateModal && selectedBook && (
        <UpdateBookModal
          book={selectedBook}
          onUpdate={handleBookUpdated}
          onClose={handleCloseUpdateModal}
        />
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && bookToDelete && (
        <DeleteBookModal
          book={bookToDelete}
          onConfirm={confirmDeleteBook}
          onCancel={cancelDeleteBook}
        />
      )}

      {/* Manage Borrowing Modal */}
      {showManageBorrowingModal && bookToManageBorrowing && (
        <ManageBorrowingModal
          book={bookToManageBorrowing}
          isOpen={showManageBorrowingModal}
          onClose={handleCloseManageBorrowingModal}
          onBorrowingUpdated={handleBorrowingUpdated}
        />
      )}
    </div>
  );
};

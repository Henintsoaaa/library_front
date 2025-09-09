import { useEffect, useState, useMemo } from "react";
import { fetchBooks } from "../apis/books.api";
import type { Book } from "../types/book.type";
import BookDetail from "./BookDetail";
import DeleteBookModal from "./DeleteBookModal";
import EditBookModal from "./EditBookModal";
import { useAuth } from "../context/AuthContext";

export default function BookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
  const [showDetail, setShowDetail] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [bookToDelete, setBookToDelete] = useState<Book | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [bookToEdit, setBookToEdit] = useState<Book | null>(null);

  const { user } = useAuth();

  useEffect(() => {
    const getBooks = async () => {
      try {
        // Fetch all books by setting a large limit
        const data = await fetchBooks(1, 10000);
        console.log("Fetched books data:", data);
        console.log("Books array:", data.books);
        setBooks(data.books);
      } catch (err) {
        console.error("Error fetching books:", err);
        setError("Failed to fetch books. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    getBooks();
  }, []);

  const filteredBooks = useMemo(() => {
    if (!searchTerm) return books;
    return books.filter(
      (book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.isbn.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [books, searchTerm]);

  const getAvailabilityStatus = (copies: number | undefined) => {
    if (copies === undefined)
      return { status: "Unknown", variant: "secondary" as const };
    if (copies === 0)
      return { status: "Unavailable", variant: "destructive" as const };
    if (copies <= 2) return { status: "Limited", variant: "outline" as const };
    return { status: "Available", variant: "default" as const };
  };

  const handleCloseDetail = () => {
    setShowDetail(false);
    setSelectedBookId(null);
  };

  const handleDeleteBook = (book: Book) => {
    setBookToDelete(book);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = (bookId: string) => {
    setBooks((prevBooks) =>
      prevBooks.filter((book) => (book.id || (book as any)._id) !== bookId)
    );
    if (selectedBookId === bookId) {
      handleCloseDetail();
    }
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setBookToDelete(null);
  };

  const handleEditBook = (book: Book) => {
    setBookToEdit(book);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setBookToEdit(null);
  };

  const handleUpdateBook = (updatedBook: Book) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        (book.id || (book as any)._id) ===
        (updatedBook.id || (updatedBook as any)._id)
          ? updatedBook
          : book
      )
    );
    setShowEditModal(false);
    setBookToEdit(null);
  };

  const handleClick = (bookId: string) => {
    console.log("Book clicked, ID:", bookId);
    setSelectedBookId(bookId);
    setShowDetail(true);
  };

  if (loading) {
    return (
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="text-center animate-fade-in-up">
              <h1 className="heading-lg text-gradient mb-6">
                Collection de Livres
              </h1>
              <div className="max-w-md mx-auto">
                <div className="h-12 bg-gray-200 rounded-xl animate-pulse skeleton"></div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
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
              Collection de Livres
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Découvrez notre vaste collection de livres disponibles pour
              l'emprunt
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8 animate-fade-in-up animation-delay-200">
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher par titre, auteur, catégorie ou ISBN..."
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
              {filteredBooks.length === books.length
                ? `${books.length} livres disponibles`
                : `${filteredBooks.length} sur ${books.length} livres trouvés`}
            </div>
          </div>
        </div>

        {filteredBooks.length === 0 ? (
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
              {searchTerm ? "Aucun livre trouvé" : "Aucun livre disponible"}
            </h2>
            <p className="text-lg text-gray-600 max-w-md mx-auto">
              {searchTerm
                ? "Essayez de modifier vos termes de recherche"
                : "Les livres apparaîtront ici une fois ajoutés à la bibliothèque"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in-up animation-delay-400">
            {filteredBooks.map((book, index) => {
              const id = book.id || (book as any)._id;
              if (!id) {
                console.error("Book has no id:", book);
                return null;
              }
              const availability = getAvailabilityStatus(book.copies);
              return (
                <div
                  key={id}
                  className={`modern-card p-6 group cursor-pointer animate-scale-in animation-delay-${Math.min(
                    index * 100,
                    1000
                  )}`}
                  onClick={() => {
                    user?.role === "user" && handleClick(String(id));
                  }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        availability.variant === "default"
                          ? "bg-green-100 text-green-800"
                          : availability.variant === "outline"
                          ? "bg-yellow-100 text-yellow-800"
                          : availability.variant === "destructive"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {availability.status}
                    </span>
                    {book.copies !== undefined && (
                      <span className="text-sm text-gray-500 font-medium">
                        {book.copies} exemplaires
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200 leading-tight">
                    {book.title}
                  </h3>

                  <div className="space-y-3 mb-4">
                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-1">
                        Auteur
                      </p>
                      <p className="text-gray-900">{book.author}</p>
                    </div>

                    {book.category && (
                      <div>
                        <p className="text-sm font-semibold text-gray-700 mb-1">
                          Catégorie
                        </p>
                        <p className="text-gray-900">{book.category}</p>
                      </div>
                    )}
                  </div>

                  {user?.role === "admin" && (
                    <div className="border-t border-gray-200 pt-4 space-y-3">
                      <div>
                        <p className="text-sm font-semibold text-gray-700 mb-1">
                          ISBN
                        </p>
                        <p className="text-gray-900 font-mono text-sm">
                          {book.isbn}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-700 mb-1">
                          Emplacement
                        </p>
                        <p className="text-gray-900">{book.location}</p>
                      </div>
                      <div className="flex space-x-2 pt-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditBook(book);
                          }}
                          className="flex-1 btn-gradient text-white px-4 py-2 rounded-xl font-semibold text-sm shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                        >
                          Modifier
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteBook(book);
                          }}
                          className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-xl font-semibold text-sm shadow-lg hover:from-red-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-200"
                        >
                          Supprimer
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Modals */}
        {showDetail && selectedBookId && (
          <BookDetail bookId={selectedBookId} onClose={handleCloseDetail} />
        )}
        {showDeleteModal && bookToDelete && (
          <DeleteBookModal
            book={bookToDelete}
            onClose={handleCloseDeleteModal}
            onDelete={handleConfirmDelete}
          />
        )}
        {showEditModal && bookToEdit && (
          <EditBookModal
            book={bookToEdit}
            onClose={handleCloseEditModal}
            onUpdate={handleUpdateBook}
          />
        )}
      </div>
    </div>
  );
}

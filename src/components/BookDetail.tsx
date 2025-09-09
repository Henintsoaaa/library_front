import { useEffect, useState, useRef } from "react";
import { getBookDetails } from "../apis/books.api";
import { createBorrowing } from "../apis/borrows.api";
import { useAuth } from "../context/AuthContext";
import { useToast } from "./ui/toast";

interface BookDetailProps {
  bookId: string;
  onClose: () => void;
}

export default function BookDetail({ bookId, onClose }: BookDetailProps) {
  const [book, setBook] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const toast = useToast();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bookId) {
      console.log("Fetching book details for ID:", bookId);
      setLoading(true);
      setError(null);

      // Scroll to top of modal when it opens
      setTimeout(() => {
        modalRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);

      getBookDetails(bookId)
        .then((data) => {
          console.log("Book data received:", data);
          setBook(data);
        })
        .catch((err) => {
          console.error("Error fetching book details:", err);
          setError("Failed to load book details. Please try again.");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [bookId]);

  const handleBorrow = async () => {
    if (book && user) {
      try {
        const bookId = book.id || book._id;
        const userId = user.id || user._id;

        if (!bookId) {
          console.error("Book ID not found:", book);
          toast.error("Book ID is missing. Please try again.");
          return;
        }

        if (!userId) {
          console.error("User ID not found:", user);
          toast.error("User ID is missing. Please try again.");
          return;
        }

        const borrowingData = {
          userId: userId,
          bookId: bookId,
        };
        console.log("Sending borrowing request:", borrowingData);

        await createBorrowing(borrowingData);
        toast.success("Book borrowed successfully!");
        // Refresh book details to update availableCopies in UI
        const updatedBook = await getBookDetails(bookId);
        setBook(updatedBook);
      } catch (error: any) {
        console.error("Error borrowing book:", error);
        console.error("Error details:", error.response?.data);
        toast.error("Failed to borrow book. Please try again.");
      }
    } else if (!user) {
      toast.error("You must be logged in to borrow books.");
    } else {
      console.log("Missing data - User or Book is undefined");
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="modern-card p-8 max-w-md w-full animate-scale-in">
          <div className="text-center">
            <div className="mx-auto h-16 w-16 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 rounded-full flex items-center justify-center mb-4 animate-pulse">
              <svg
                className="h-8 w-8 text-white animate-spin"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Chargement...
            </h3>
            <p className="text-gray-600">Récupération des détails du livre</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="modern-card p-8 max-w-md w-full animate-bounce-in">
          <div className="text-center">
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
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Erreur</h3>
            <p className="text-red-600 mb-6">{error}</p>
            <div className="flex space-x-3">
              <button
                onClick={() => window.location.reload()}
                className="btn-gradient text-white px-4 py-2 rounded-xl font-semibold text-sm flex-1"
              >
                Réessayer
              </button>
              <button
                onClick={onClose}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-xl font-semibold text-sm flex-1 hover:bg-gray-200 transition-colors duration-200"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div
        ref={modalRef}
        className="modern-card max-w-4xl w-full max-h-[85vh] overflow-y-auto animate-scale-in"
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
            <div className="flex items-center">
              <div className="h-10 w-10 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 rounded-lg flex items-center justify-center mr-3">
                <svg
                  className="h-5 w-5 text-white"
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
              <h1 className="text-xl font-bold text-gradient">Book Details</h1>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-2 rounded-xl hover:bg-gray-100 transition-all duration-200"
            >
              <svg
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Book Information */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-3">
                  {book.title}
                </h2>
                <p className="text-xl text-gray-600 mb-4">par {book.author}</p>

                {/* Availability Status */}
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-800 text-sm font-semibold">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                  {book.availableCopies > 0 ? "Disponible" : "Non disponible"}
                </div>
              </div>

              {/* Book Details Grid */}
              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Informations
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white rounded-xl p-4">
                    <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                      ISBN
                    </span>
                    <p className="text-gray-900 font-mono mt-1">{book.isbn}</p>
                  </div>
                  {book.category && (
                    <div className="bg-white rounded-xl p-4">
                      <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                        Catégorie
                      </span>
                      <p className="text-gray-900 mt-1">{book.category}</p>
                    </div>
                  )}
                  {book.publishedYear && (
                    <div className="bg-white rounded-xl p-4">
                      <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                        Année de publication
                      </span>
                      <p className="text-gray-900 mt-1">{book.publishedYear}</p>
                    </div>
                  )}
                  {book.copies !== undefined && (
                    <div className="bg-white rounded-xl p-4">
                      <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                        Exemplaires totaux
                      </span>
                      <p className="text-gray-900 mt-1">{book.copies}</p>
                    </div>
                  )}
                  {book.availableCopies !== undefined && (
                    <div className="bg-white rounded-xl p-4">
                      <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                        Exemplaires disponibles
                      </span>
                      <p className="text-gray-900 mt-1 font-semibold">
                        {book.availableCopies}
                      </p>
                    </div>
                  )}
                  {book.location && (
                    <div className="bg-white rounded-xl p-4">
                      <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                        Emplacement
                      </span>
                      <p className="text-gray-900 mt-1">{book.location}</p>
                    </div>
                  )}
                </div>
                {book.description && (
                  <div className="bg-gray-50 rounded-2xl p-6 mt-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Description
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {book.description}
                    </p>
                  </div>
                )}
              </div>

              {/* Book Cover and Actions */}
              <div className="flex flex-col items-center space-y-6">
                <div className="w-full max-w-xs">
                  <div className="aspect-[3/4] w-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center shadow-lg">
                    <div className="text-center">
                      <svg
                        className="mx-auto h-16 w-16 text-gray-400 mb-4"
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
                      <span className="text-gray-500 font-medium">
                        Couverture du livre
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="w-full max-w-xs space-y-3">
                  {user ? (
                    book.availableCopies > 0 ? (
                      <button
                        className="w-full btn-gradient text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center"
                        onClick={handleBorrow}
                      >
                        <svg
                          className="w-5 h-5 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          />
                        </svg>
                        Emprunter
                      </button>
                    ) : (
                      <button
                        disabled
                        className="w-full bg-gray-400 text-white py-4 rounded-xl font-semibold text-lg cursor-not-allowed"
                      >
                        Non disponible
                      </button>
                    )
                  ) : (
                    <button
                      disabled
                      className="w-full bg-gray-400 text-white py-4 rounded-xl font-semibold text-lg cursor-not-allowed"
                    >
                      Connectez-vous pour emprunter
                    </button>
                  )}

                  <button className="w-full bg-white border-2 border-gray-300 text-gray-700 py-3 rounded-xl font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 flex items-center justify-center">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                    Ajouter aux favoris
                  </button>
                </div>

                {/* Quick Stats */}
                <div className="w-full max-w-xs bg-gray-50 rounded-2xl p-4">
                  <div className="text-center space-y-2">
                    <div>
                      <div className="text-2xl font-bold text-blue-600">
                        {book.copies || 0}
                      </div>
                      <div className="text-xs text-gray-600">
                        Exemplaires totaux
                      </div>
                    </div>
                    <div className="border-t border-gray-200 pt-2">
                      <div className="text-2xl font-bold text-green-600">
                        {book.availableCopies || 0}
                      </div>
                      <div className="text-xs text-gray-600">Disponibles</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

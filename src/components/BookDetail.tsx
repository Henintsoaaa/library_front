import { useEffect, useState } from "react";
import { getBookDetails } from "../apis/books.api";

interface BookDetailProps {
  bookId: string;
  onClose: () => void;
}

export default function BookDetail({ bookId, onClose }: BookDetailProps) {
  const [book, setBook] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (bookId) {
      console.log("Fetching book details for ID:", bookId);
      setLoading(true);
      setError(null);
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

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <span className="block mt-4 text-gray-700">
              Loading book details...
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4 border-b pb-4">
              <h1 className="text-2xl font-bold text-gray-900">Error</h1>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 text-3xl leading-none"
              >
                ×
              </button>
            </div>
            <p className="text-red-600 text-center">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          <div className="flex justify-between items-center mb-6 border-b pb-4">
            <h1 className="text-3xl font-bold text-gray-900">Book Details</h1>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-3xl leading-none"
            >
              ×
            </button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="text-3xl font-semibold text-gray-900 mb-2">
                  {book.title}
                </h2>
                <p className="text-xl text-gray-600">by {book.author}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <span className="font-medium text-gray-700 w-32">ISBN:</span>
                  <span className="text-gray-900">{book.isbn}</span>
                </div>
                {book.category && (
                  <div className="flex items-center">
                    <span className="font-medium text-gray-700 w-32">
                      Category:
                    </span>
                    <span className="text-gray-900">{book.category}</span>
                  </div>
                )}
                {book.publishedYear && (
                  <div className="flex items-center">
                    <span className="font-medium text-gray-700 w-32">
                      Published Year:
                    </span>
                    <span className="text-gray-900">{book.publishedYear}</span>
                  </div>
                )}
                {book.copies !== undefined && (
                  <div className="flex items-center">
                    <span className="font-medium text-gray-700 w-32">
                      Total Copies:
                    </span>
                    <span className="text-gray-900">{book.copies}</span>
                  </div>
                )}
                {book.availableCopies !== undefined && (
                  <div className="flex items-center">
                    <span className="font-medium text-gray-700 w-32">
                      Available Copies:
                    </span>
                    <span className="text-gray-900">
                      {book.availableCopies}
                    </span>
                  </div>
                )}
                {book.location && (
                  <div className="flex items-center">
                    <span className="font-medium text-gray-700 w-32">
                      Location:
                    </span>
                    <span className="text-gray-900">{book.location}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col justify-center items-center">
              <div className="w-48 h-64 bg-gray-200 rounded-lg flex items-center justify-center mb-4">
                <span className="text-gray-500">Book Cover</span>
              </div>
              <button className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Emprunter
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

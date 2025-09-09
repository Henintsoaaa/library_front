import { useEffect, useState, useMemo } from "react";
import { fetchBooks } from "../apis/books.api";
import type { Book } from "../types/book.type";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
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
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-center mb-4 text-gray-900">
            Library Collection
          </h1>
          <div className="max-w-md mx-auto">
            <div className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <Card key={index} className="animate-pulse">
              <CardHeader>
                <div className="h-6 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Card className="max-w-md mx-auto">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-red-500 text-6xl mb-4">⚠️</div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Something went wrong
              </h2>
              <p className="text-gray-600">{error}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-center mb-6 text-gray-900">
          Library Collection
        </h1>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search books by title, author, category, or ISBN..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pl-12 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
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
        <div className="text-center text-gray-600 mb-6">
          {filteredBooks.length === books.length
            ? `Showing all ${books.length} books`
            : `Found ${filteredBooks.length} of ${books.length} books`}
        </div>
      </div>

      {filteredBooks.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📚</div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            {searchTerm ? "No books found" : "No books available"}
          </h2>
          <p className="text-gray-600">
            {searchTerm
              ? "Try adjusting your search terms"
              : "Books will appear here once added to the library"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBooks.map((book) => {
            const id = book.id || (book as any)._id;
            if (!id) {
              console.error("Book has no id:", book);
              return null;
            }
            const availability = getAvailabilityStatus(book.copies);
            return (
              <Card
                key={id}
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                onClick={() => {
                  user?.role === "user" && handleClick(String(id));
                }}
              >
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant={availability.variant} className="text-xs">
                      {availability.status}
                    </Badge>
                    {book.copies !== undefined && (
                      <span className="text-sm text-gray-500">
                        {book.copies} copies
                      </span>
                    )}
                  </div>
                  <CardTitle className="text-lg leading-tight group-hover:text-blue-600 transition-colors">
                    {book.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        Author
                      </p>
                      <p className="text-gray-900">{book.author}</p>
                    </div>
                  </div>
                  {user?.role === "admin" && (
                    <div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          ISBN
                        </p>
                        <p className="text-gray-900">{book.isbn}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          Location
                        </p>
                        <p className="text-gray-900">{book.location}</p>
                      </div>
                      <div className="mt-4 flex space-x-2">
                        <button
                          onClick={() => handleEditBook(book)}
                          className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                          Modifier
                        </button>
                        <button
                          onClick={() => handleDeleteBook(book)}
                          className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                        >
                          Supprimer
                        </button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
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
  );
}

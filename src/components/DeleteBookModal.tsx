import { useState } from "react";
import { deleteBook } from "../apis/books.api";
import type { Book } from "../types/book.type";

interface DeleteBookModalProps {
  book: Book;
  onClose: () => void;
  onDelete: (bookId: string) => void;
}

export default function DeleteBookModal({
  book,
  onClose,
  onDelete,
}: DeleteBookModalProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteBook(book.id || (book as any)._id);
      onDelete(book.id || (book as any)._id);
      onClose();
    } catch (err) {
      console.error("Error deleting book:", err);
      // Optionally set an error state here to inform the user
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h2 className="text-xl font-semibold mb-4">Delete Book</h2>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete "{book.title}" by {book.author}? This
          action cannot be undone.
        </p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
            disabled={isDeleting}
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

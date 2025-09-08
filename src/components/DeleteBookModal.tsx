import type { Book } from "../types/book.type";

interface DeleteBookModalProps {
  book: Book;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteBookModal({
  book,
  onConfirm,
  onCancel,
}: DeleteBookModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
            <svg
              className="h-6 w-6 text-red-600"
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
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Confirmer la suppression
          </h3>
          <p className="text-sm text-gray-600 mb-6">
            Êtes-vous sûr de vouloir supprimer le livre{" "}
            <span className="font-semibold">"{book.title}"</span> ? Cette action
            est irréversible.
          </p>
          <div className="flex space-x-3">
            <button
              type="button"
              className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-xl font-medium hover:bg-gray-300 transition-colors duration-200"
              onClick={onCancel}
            >
              Annuler
            </button>
            <button
              type="button"
              className="flex-1 bg-red-600 text-white px-4 py-2 rounded-xl font-medium hover:bg-red-700 transition-colors duration-200"
              onClick={onConfirm}
            >
              Supprimer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";

interface BorrowHistory {
  id: string;
  bookTitle: string;
  author: string;
  borrowDate: string;
  returnDate: string;
  dueDate: string;
  status: "returned" | "overdue" | "active";
  rating?: number;
  review?: string;
}

export default function History() {
  const [filter, setFilter] = useState<
    "all" | "active" | "returned" | "overdue"
  >("all");

  // Données simulées d'historique d'emprunts
  const borrowHistory: BorrowHistory[] = [
    {
      id: "1",
      bookTitle: "Le Petit Prince",
      author: "Antoine de Saint-Exupéry",
      borrowDate: "2024-01-15",
      returnDate: "2024-01-25",
      dueDate: "2024-01-30",
      status: "returned",
      rating: 5,
      review:
        "Un livre magnifique qui m'a fait réfléchir sur l'enfance et l'amitié.",
    },
    {
      id: "2",
      bookTitle: "1984",
      author: "George Orwell",
      borrowDate: "2024-01-10",
      returnDate: "2024-01-20",
      dueDate: "2024-01-25",
      status: "returned",
      rating: 4,
      review: "Une dystopie fascinante qui résonne encore aujourd'hui.",
    },
    {
      id: "3",
      bookTitle: "Harry Potter et la Pierre Philosophale",
      author: "J.K. Rowling",
      borrowDate: "2024-01-05",
      returnDate: "",
      dueDate: "2024-01-20",
      status: "overdue",
    },
    {
      id: "4",
      bookTitle: "Les Misérables",
      author: "Victor Hugo",
      borrowDate: "2023-12-20",
      returnDate: "2024-01-10",
      dueDate: "2024-01-05",
      status: "returned",
      rating: 5,
      review: "Un chef-d'œuvre de la littérature française.",
    },
    {
      id: "5",
      bookTitle: "Dune",
      author: "Frank Herbert",
      borrowDate: "2023-12-15",
      returnDate: "2023-12-30",
      dueDate: "2023-12-28",
      status: "returned",
      rating: 4,
    },
    {
      id: "6",
      bookTitle: "Le Seigneur des Anneaux",
      author: "J.R.R. Tolkien",
      borrowDate: "2023-12-01",
      returnDate: "",
      dueDate: "2023-12-15",
      status: "active",
    },
    {
      id: "7",
      bookTitle: "Orgueil et Préjugés",
      author: "Jane Austen",
      borrowDate: "2023-11-20",
      returnDate: "2023-12-05",
      dueDate: "2023-12-01",
      status: "returned",
      rating: 5,
      review:
        "Une histoire d'amour intemporelle avec des personnages mémorables.",
    },
    {
      id: "8",
      bookTitle: "Fahrenheit 451",
      author: "Ray Bradbury",
      borrowDate: "2023-11-15",
      returnDate: "2023-11-25",
      dueDate: "2023-11-30",
      status: "returned",
      rating: 4,
    },
  ];

  const filteredHistory = borrowHistory.filter((item) => {
    if (filter === "all") return true;
    return item.status === filter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-blue-100 text-blue-800";
      case "returned":
        return "bg-green-100 text-green-800";
      case "overdue":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "En cours";
      case "returned":
        return "Retourné";
      case "overdue":
        return "En retard";
      default:
        return status;
    }
  };

  const renderStars = (rating?: number) => {
    if (!rating) return null;
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-4 h-4 ${
              i < rating ? "text-yellow-400" : "text-gray-300"
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Historique des emprunts
          </h2>
          <p className="text-gray-600">
            Suivez tous vos emprunts passés et actuels
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mt-4 sm:mt-0">
          {[
            { key: "all", label: "Tous", count: borrowHistory.length },
            {
              key: "active",
              label: "En cours",
              count: borrowHistory.filter((h) => h.status === "active").length,
            },
            {
              key: "returned",
              label: "Retournés",
              count: borrowHistory.filter((h) => h.status === "returned")
                .length,
            },
            {
              key: "overdue",
              label: "En retard",
              count: borrowHistory.filter((h) => h.status === "overdue").length,
            },
          ].map(({ key, label, count }) => (
            <button
              key={key}
              onClick={() => setFilter(key as any)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                filter === key
                  ? "bg-blue-500 text-white shadow-lg"
                  : "bg-white text-gray-700 border border-gray-300 hover:border-gray-400"
              }`}
            >
              {label} ({count})
            </button>
          ))}
        </div>
      </div>

      {/* History List */}
      <div className="space-y-4">
        {filteredHistory.map((item, index) => (
          <div
            key={item.id}
            className="modern-card p-6 animate-fade-in-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              {/* Book Info */}
              <div className="flex-1">
                <div className="flex items-start space-x-4">
                  {/* Book Cover Placeholder */}
                  <div className="flex-shrink-0 w-16 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-white"
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

                  {/* Book Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">
                      {item.bookTitle}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      par {item.author}
                    </p>

                    {/* Dates */}
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        Emprunté le{" "}
                        {new Date(item.borrowDate).toLocaleDateString("fr-FR")}
                      </div>
                      <div className="flex items-center">
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        À rendre le{" "}
                        {new Date(item.dueDate).toLocaleDateString("fr-FR")}
                      </div>
                      {item.returnDate && (
                        <div className="flex items-center">
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          Retourné le{" "}
                          {new Date(item.returnDate).toLocaleDateString(
                            "fr-FR"
                          )}
                        </div>
                      )}
                    </div>

                    {/* Rating and Review */}
                    {item.rating && (
                      <div className="mt-3">
                        <div className="flex items-center space-x-2 mb-2">
                          {renderStars(item.rating)}
                          <span className="text-sm text-gray-600">
                            {item.rating}/5 étoiles
                          </span>
                        </div>
                        {item.review && (
                          <p className="text-sm text-gray-700 italic bg-gray-50 p-3 rounded-lg">
                            "{item.review}"
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Status */}
              <div className="mt-4 lg:mt-0 lg:ml-6">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                    item.status
                  )}`}
                >
                  {getStatusText(item.status)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredHistory.length === 0 && (
        <div className="modern-card p-12 text-center">
          <div className="mx-auto h-24 w-24 bg-gradient-to-r from-gray-400 to-gray-500 rounded-2xl flex items-center justify-center mb-4">
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
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Aucun emprunt trouvé
          </h3>
          <p className="text-gray-600">
            Aucun emprunt ne correspond à votre filtre actuel.
          </p>
        </div>
      )}
    </div>
  );
}

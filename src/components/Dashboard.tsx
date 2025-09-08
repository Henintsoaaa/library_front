import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { BooksList } from "./BooksList";
import { AddBookForm } from "./AddBookForm";
import { BorrowingsDashboard } from "./BorrowingsDashboard";
import type { Book } from "../types/book.type";

type ActiveTab = "welcome" | "catalog" | "add-book" | "borrowings";

export const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<ActiveTab>("welcome");
  const [refreshBooks, setRefreshBooks] = useState(0);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  };

  const handleBookAdded = (_book: Book) => {
    setRefreshBooks((prev) => prev + 1);
    setActiveTab("catalog");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "catalog":
        return (
          <div className="animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
              <h2 className="text-2xl font-bold text-gray-800">
                Catalogue des livres
              </h2>
              {(user?.role === "admin" || user?.role === "librarian") && (
                <button
                  className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-200 flex items-center"
                  onClick={() => setActiveTab("add-book")}
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  Ajouter un livre
                </button>
              )}
            </div>
            <BooksList
              key={refreshBooks}
              showActions={user?.role === "admin" || user?.role === "librarian"}
              showBorrowAction={user?.role === "member"}
            />
          </div>
        );

      case "add-book":
        return (
          <div className="animate-fade-in">
            <AddBookForm
              onBookAdded={handleBookAdded}
              onCancel={() => setActiveTab("catalog")}
            />
          </div>
        );

      case "borrowings":
        return (
          <div className="animate-fade-in">
            <BorrowingsDashboard />
          </div>
        );

      default:
        return (
          <div className="animate-fade-in">
            <div className="text-center py-8">
              <h2 className="text-3xl font-bold text-gradient mb-4">
                Bienvenue dans votre bibliothèque
              </h2>
              <p className="text-gray-600 text-lg mb-12">
                Vous êtes connecté en tant que{" "}
                <span className="font-semibold text-blue-600">
                  {user?.name}
                </span>{" "}
                ({user?.email})
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                <div
                  className="bg-white rounded-xl shadow-lg p-6 text-center cursor-pointer transform hover:scale-105 transition-all duration-200 hover:shadow-xl border-2 border-transparent hover:border-blue-200"
                  onClick={() => setActiveTab("borrowings")}
                >
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4 mx-auto">
                    <svg
                      className="w-6 h-6 text-blue-600"
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
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {user?.role === "admin" || user?.role === "librarian"
                      ? "Gestion des emprunts"
                      : "Mes emprunts"}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {user?.role === "admin" || user?.role === "librarian"
                      ? "Gérer tous les emprunts et retards"
                      : "Consultez vos livres empruntés"}
                  </p>
                </div>

                <div
                  className="bg-white rounded-xl shadow-lg p-6 text-center cursor-pointer transform hover:scale-105 transition-all duration-200 hover:shadow-xl border-2 border-transparent hover:border-green-200"
                  onClick={() => setActiveTab("catalog")}
                >
                  <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-4 mx-auto">
                    <svg
                      className="w-6 h-6 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    Catalogue
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Parcourez la collection de livres
                  </p>
                </div>

                {(user?.role === "admin" || user?.role === "librarian") && (
                  <div
                    className="bg-white rounded-xl shadow-lg p-6 text-center cursor-pointer transform hover:scale-105 transition-all duration-200 hover:shadow-xl border-2 border-transparent hover:border-purple-200"
                    onClick={() => setActiveTab("add-book")}
                  >
                    <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mb-4 mx-auto">
                      <svg
                        className="w-6 h-6 text-purple-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      Ajouter un livre
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Ajouter de nouveaux livres au catalogue
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <nav className="bg-white shadow-lg border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gradient">
                📚 Bibliothèque - Tableau de bord
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">
                Bonjour,{" "}
                <span className="font-semibold text-gray-800">
                  {user?.name}
                </span>
              </span>
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-semibold">
                {user?.role === "admin"
                  ? "Administrateur"
                  : user?.role === "librarian"
                  ? "Bibliothécaire"
                  : user?.role === "member"
                  ? "Membre"
                  : "Utilisateur"}
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center"
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
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Navigation tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <nav className="flex space-x-8 overflow-x-auto">
            <button
              className={`py-4 px-2 whitespace-nowrap border-b-2 font-medium text-sm transition-colors duration-200 flex items-center ${
                activeTab === "welcome"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              onClick={() => setActiveTab("welcome")}
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
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Accueil
            </button>

            <button
              className={`py-4 px-2 whitespace-nowrap border-b-2 font-medium text-sm transition-colors duration-200 flex items-center ${
                activeTab === "catalog"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              onClick={() => setActiveTab("catalog")}
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
                  d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
                />
              </svg>
              Catalogue
            </button>

            <button
              className={`py-4 px-2 whitespace-nowrap border-b-2 font-medium text-sm transition-colors duration-200 flex items-center ${
                activeTab === "borrowings"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              onClick={() => setActiveTab("borrowings")}
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
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              {user?.role === "admin" || user?.role === "librarian"
                ? "Gestion des emprunts"
                : "Mes emprunts"}
            </button>

            {(user?.role === "admin" || user?.role === "librarian") && (
              <button
                className={`py-4 px-2 whitespace-nowrap border-b-2 font-medium text-sm transition-colors duration-200 flex items-center ${
                  activeTab === "add-book"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
                onClick={() => setActiveTab("add-book")}
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
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Ajouter un livre
              </button>
            )}
          </nav>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">{renderContent()}</main>
    </div>
  );
};

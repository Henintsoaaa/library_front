import React from "react";
import type { User } from "../../types/user.type";
import { BooksList } from "../BooksList";

type ActiveTab = "welcome" | "catalog" | "add-book" | "borrowings";

interface CatalogSectionProps {
  user: User | null;
  setActiveTab: (tab: ActiveTab) => void;
  refreshBooks: number;
}

export const CatalogSection: React.FC<CatalogSectionProps> = ({
  user,
  setActiveTab,
  refreshBooks,
}) => {
  const isAdminOrLibrarian =
    user?.role === "admin" || user?.role === "librarian";

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-800">
          Catalogue des livres
        </h2>
        {isAdminOrLibrarian && (
          <button
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-200 flex items-center"
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
        showActions={isAdminOrLibrarian}
        showBorrowAction={false}
        showManageBorrowingAction={user?.role === "member"}
      />
    </div>
  );
};

import React from "react";
import type { User } from "../../types/user.type";
import { DashboardCard } from "./DashboardCard";

type ActiveTab = "welcome" | "catalog" | "add-book" | "borrowings";

interface WelcomeSectionProps {
  user: User | null;
  setActiveTab: (tab: ActiveTab) => void;
}

export const WelcomeSection: React.FC<WelcomeSectionProps> = ({
  user,
  setActiveTab,
}) => {
  const isAdminOrLibrarian =
    user?.role === "admin" || user?.role === "librarian";

  const borrowingsIcon = (
    <div className="bg-gradient-to-br from-blue-400 to-blue-600">
      <svg
        className="w-8 h-8 text-white"
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
  );

  const catalogIcon = (
    <div className="bg-gradient-to-br from-emerald-400 to-emerald-600">
      <svg
        className="w-8 h-8 text-white"
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
  );

  const addBookIcon = (
    <div className="bg-gradient-to-br from-purple-400 to-purple-600">
      <svg
        className="w-8 h-8 text-white"
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
  );

  return (
    <div className="animate-fade-in">
      <div className="text-center py-8">
        <h2 className="heading-lg text-gradient mb-4 animate-fade-in-up">
          Bienvenue dans votre bibliothèque
        </h2>
        <p className="text-gray-600 text-lg mb-12">
          Vous êtes connecté en tant que{" "}
          <span className="font-semibold text-blue-600">{user?.name}</span> (
          {user?.email})
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <DashboardCard
            title={isAdminOrLibrarian ? "Gestion des emprunts" : "Mes emprunts"}
            description={
              isAdminOrLibrarian
                ? "Gérer tous les emprunts et retards"
                : "Consultez vos livres empruntés"
            }
            icon={borrowingsIcon}
            onClick={() => setActiveTab("borrowings")}
            animationDelay="0s"
          />

          <DashboardCard
            title="Catalogue"
            description="Parcourez la collection de livres"
            icon={catalogIcon}
            onClick={() => setActiveTab("catalog")}
            animationDelay="0.2s"
          />

          {isAdminOrLibrarian && (
            <DashboardCard
              title="Ajouter un livre"
              description="Ajouter de nouveaux livres au catalogue"
              icon={addBookIcon}
              onClick={() => setActiveTab("add-book")}
              animationDelay="0.4s"
            />
          )}
        </div>
      </div>
    </div>
  );
};

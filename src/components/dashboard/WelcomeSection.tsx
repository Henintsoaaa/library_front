import React from "react";
import type { User } from "../../types/user.type";
import { DashboardCard } from "./DashboardCard";

type ActiveTab = "welcome" | "catalog" | "add-book";

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
          Bienvenue dans votre BiblioTech
        </h2>
        <p className="text-gray-600 text-lg mb-12">
          Vous êtes connecté en tant que{" "}
          <span className="font-semibold text-blue-600">{user?.name}</span> (
          {user?.email})
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          <DashboardCard
            title="Catalogue"
            description="Parcourez la collection de livres"
            icon={catalogIcon}
            onClick={() => setActiveTab("catalog")}
            animationDelay="0s"
          />

          {isAdminOrLibrarian && (
            <DashboardCard
              title="Ajouter un livre"
              description="Ajouter de nouveaux livres au catalogue"
              icon={addBookIcon}
              onClick={() => setActiveTab("add-book")}
              animationDelay="0.2s"
            />
          )}
        </div>
      </div>
    </div>
  );
};

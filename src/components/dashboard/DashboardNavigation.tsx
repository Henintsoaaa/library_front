import React from "react";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import type { User } from "../../types/user.type";

type ActiveTab = "welcome" | "catalog" | "add-book";

interface DashboardNavigationProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  user: User | null;
}

export const DashboardNavigation: React.FC<DashboardNavigationProps> = ({
  activeTab,
  setActiveTab,
  user,
}) => {
  const isAdminOrLibrarian =
    user?.role === "admin" || user?.role === "librarian";

  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4">
        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as ActiveTab)}
        >
          <TabsList className="h-auto flex-col sm:flex-row w-full justify-start sm:justify-center overflow-x-auto scrollbar-hide rounded-2xl bg-gray-50 border border-gray-200 p-1 gap-1">
            <TabsTrigger
              value="welcome"
              className="flex items-center gap-2 px-3 py-2 text-xs sm:text-sm data-[state=active]:bg-white data-[state=active]:border data-[state=active]:border-gray-300 rounded-xl flex-shrink-0 w-full sm:w-auto justify-center sm:justify-start"
            >
              <svg
                className="w-4 h-4 flex-shrink-0"
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
              <span className="hidden xs:inline">Accueil</span>
            </TabsTrigger>

            <TabsTrigger
              value="catalog"
              className="flex items-center gap-2 px-3 py-2 text-xs sm:text-sm data-[state=active]:bg-white data-[state=active]:border data-[state=active]:border-gray-300 rounded-xl flex-shrink-0 w-full sm:w-auto justify-center sm:justify-start"
            >
              <svg
                className="w-4 h-4 flex-shrink-0"
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
              <span className="hidden xs:inline">Catalogue</span>
            </TabsTrigger>

            {isAdminOrLibrarian && (
              <TabsTrigger
                value="add-book"
                className="flex items-center gap-2 px-3 py-2 text-xs sm:text-sm data-[state=active]:bg-white data-[state=active]:border data-[state=active]:border-gray-300 rounded-xl flex-shrink-0 w-full sm:w-auto justify-center sm:justify-start"
              >
                <svg
                  className="w-4 h-4 flex-shrink-0"
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
                <span className="hidden xs:inline">Ajouter un livre</span>
              </TabsTrigger>
            )}
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
};

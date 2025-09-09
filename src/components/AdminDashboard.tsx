import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import BookList from "./BookList";
import { useState } from "react";
import CreateBookModal from "./CreateBookModal";
import BorrowsList from "./BorrowsList";

export default function AdminDashboard() {
  const [showCreateBookModal, setShowCreateBookModal] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleCreateBook = () => {
    setShowCreateBookModal(true);
  };

  const handleBookCreated = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Admin Dashboard Header */}
      <div className="modern-card p-6">
        <div className="flex flex-col xl:flex-row items-center justify-between">
          <div className="text-center xl:text-left mb-6 xl:mb-0">
            <div className="flex items-center justify-center xl:justify-start mb-3">
              <div className="h-12 w-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mr-3">
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Administration
                </h1>
                <p className="text-gray-600">
                  Gérez la bibliothèque et surveillez les activités
                </p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleCreateBook}
              className="btn-gradient text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
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
          </div>
        </div>

        {/* Admin Stats */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-1">245</div>
              <div className="text-sm text-gray-600">Total Livres</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-1">67</div>
              <div className="text-sm text-gray-600">Emprunts Actifs</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-1">34</div>
              <div className="text-sm text-gray-600">Utilisateurs</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-1">12</div>
              <div className="text-sm text-gray-600">En Retard</div>
            </div>
          </div>
        </div>
      </div>

      {/* Create Book Modal */}
      <CreateBookModal
        isOpen={showCreateBookModal}
        onClose={() => setShowCreateBookModal(false)}
        onBookCreated={handleBookCreated}
      />

      {/* Tabs Navigation */}
      <Tabs defaultValue="overview" className="w-full">
        <div className="modern-card p-2 mb-8">
          <TabsList className="grid w-full grid-cols-3 bg-transparent gap-2">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white data-[state=active]:shadow-lg px-6 py-3 rounded-xl font-semibold transition-all duration-200 hover:bg-gray-100"
            >
              <svg
                className="w-5 h-5 mr-2"
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
              Gestion Livres
            </TabsTrigger>
            <TabsTrigger
              value="loans"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white data-[state=active]:shadow-lg px-6 py-3 rounded-xl font-semibold transition-all duration-200 hover:bg-gray-100"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                />
              </svg>
              Emprunts
            </TabsTrigger>
            <TabsTrigger
              value="history"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white data-[state=active]:shadow-lg px-6 py-3 rounded-xl font-semibold transition-all duration-200 hover:bg-gray-100"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              Rapports
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Tab Contents */}
        <TabsContent value="overview" className="animate-fade-in-up">
          <BookList key={refreshKey} />
        </TabsContent>

        <TabsContent value="loans" className="animate-fade-in-up">
          <div className="modern-card p-8 text-center">
            <div className="mx-auto h-16 w-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mb-4">
              <svg
                className="h-8 w-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                />
              </svg>
            </div>
            <BorrowsList />
          </div>
        </TabsContent>

        <TabsContent value="history" className="animate-fade-in-up">
          <div className="modern-card p-8 text-center">
            <div className="mx-auto h-16 w-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4">
              <svg
                className="h-8 w-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Rapports et Statistiques
            </h3>
            <p className="text-gray-600">
              Analyses détaillées de l'utilisation de la bibliothèque
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Fonctionnalité en développement
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

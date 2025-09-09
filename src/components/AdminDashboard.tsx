import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import BookList from "./BookList";
import { useState } from "react";
import CreateBookModal from "./CreateBookModal";

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
    <div>
      <h1>Tableau de bord de l'administrateur</h1>
      <button
        onClick={handleCreateBook}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Ajouter un livre
      </button>
      <CreateBookModal
        isOpen={showCreateBookModal}
        onClose={() => setShowCreateBookModal(false)}
        onBookCreated={handleBookCreated}
      />
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3 text-center">
          <TabsTrigger
            value="overview"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
          >
            Livres
          </TabsTrigger>
          <TabsTrigger
            value="loans"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
          >
            Emprunts
          </TabsTrigger>
          <TabsTrigger
            value="history"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
          >
            Historique
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <BookList key={refreshKey} />
        </TabsContent>
        <TabsContent value="loans">{/* Contenu pour Emprunts */}</TabsContent>
        <TabsContent value="history">
          {/* Contenu pour Historique */}
        </TabsContent>
      </Tabs>
    </div>
  );
}

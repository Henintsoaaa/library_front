import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import BookList from "./BookList";

export default function UserDashboard() {
  return (
    <div>
      <h1>Tableau de bord de l'utilisateur</h1>
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
          <BookList />
        </TabsContent>
        <TabsContent value="loans">{/* Contenu pour Emprunts */}</TabsContent>
        <TabsContent value="history">
          {/* Contenu pour Historique */}
        </TabsContent>
      </Tabs>
    </div>
  );
}

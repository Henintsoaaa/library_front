import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { BorrowingsList } from "./BorrowingsList";
import { CreateBorrowingForm } from "./CreateBorrowingForm";
import { OverdueBooksList } from "./OverdueBooksList";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";

type TabType = "all" | "active" | "create" | "overdue" | "stats";

export const BorrowingsDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const { user } = useAuth();

  const isAdmin = user?.role === "admin";
  const isLibrarian = user?.role === "librarian";
  const isMember = user?.role === "member";
  const canManage = isAdmin || isLibrarian;

  const handleBorrowingCreated = () => {
    setRefreshTrigger((prev) => prev + 1);
    setActiveTab("all");
  };

  return (
    <div className="borrowings-dashboard">
      {/* Navigation tabs */}
      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as TabType)}
        className="mb-4"
      >
        <TabsList>
          <TabsTrigger value="all">
            {isMember ? "Mes emprunts" : "Tous les emprunts"}
          </TabsTrigger>
          <TabsTrigger value="active">Emprunts actifs</TabsTrigger>
          <TabsTrigger value="create">Nouvel emprunt</TabsTrigger>
          {canManage && (
            <>
              <TabsTrigger value="overdue">
                <i className="fas fa-exclamation-triangle mr-1"></i>
                Retards
              </TabsTrigger>
              <TabsTrigger value="stats">Statistiques</TabsTrigger>
            </>
          )}
        </TabsList>

        <TabsContent value="all">
          <BorrowingsList key={`all-${refreshTrigger}`} showStats={canManage} />
        </TabsContent>
        <TabsContent value="active">
          <BorrowingsList key={`active-${refreshTrigger}`} activeOnly={true} />
        </TabsContent>
        <TabsContent value="create">
          <CreateBorrowingForm onBorrowingCreated={handleBorrowingCreated} />
        </TabsContent>
        {canManage && (
          <>
            <TabsContent value="overdue">
              <OverdueBooksList key={`overdue-${refreshTrigger}`} />
            </TabsContent>
            <TabsContent value="stats">
              <BorrowingsList
                key={`stats-${refreshTrigger}`}
                showStats={true}
              />
            </TabsContent>
          </>
        )}
      </Tabs>

      {/* Quick actions pour les administrateurs */}
      {canManage && (
        <div className="mt-4 p-3 bg-light rounded">
          <h5 className="mb-3 text-lg font-semibold">Actions rapides</h5>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <button
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-2xl font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center justify-center"
              onClick={() => setActiveTab("create")}
            >
              <i className="fas fa-plus mr-2"></i>
              Nouvel emprunt
            </button>

            <button
              className="bg-gradient-to-r from-orange-600 to-orange-700 text-white px-4 py-2 rounded-2xl font-medium hover:from-orange-700 hover:to-orange-800 transition-all duration-200 flex items-center justify-center"
              onClick={() => setActiveTab("overdue")}
            >
              <i className="fas fa-exclamation-triangle mr-2"></i>
              Voir les retards
            </button>

            <button
              className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-4 py-2 rounded-2xl font-medium hover:from-purple-700 hover:to-purple-800 transition-all duration-200 flex items-center justify-center"
              onClick={() => setActiveTab("stats")}
            >
              <i className="fas fa-chart-bar mr-2"></i>
              Statistiques
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { AddBookForm } from "./AddBookForm";
import { BorrowingsDashboard } from "./BorrowingsDashboard";
import type { Book } from "../types/book.type";
import Navbar from "./Navbar";
import {
  DashboardNavigation,
  WelcomeSection,
  CatalogSection,
} from "./dashboard";

type ActiveTab = "welcome" | "catalog" | "add-book" | "borrowings";

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<ActiveTab>("welcome");
  const [refreshBooks, setRefreshBooks] = useState(0);

  const handleBookAdded = (_book: Book) => {
    setRefreshBooks((prev) => prev + 1);
    setActiveTab("catalog");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "catalog":
        return (
          <CatalogSection
            user={user}
            setActiveTab={setActiveTab}
            refreshBooks={refreshBooks}
          />
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
        return <WelcomeSection user={user} setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <Navbar />
      {/* Navigation tabs */}
      <DashboardNavigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        user={user}
      />

      <main className="container mx-auto px-4 py-8">{renderContent()}</main>
    </div>
  );
};

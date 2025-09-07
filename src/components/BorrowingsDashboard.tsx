import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { BorrowingsList } from "./BorrowingsList";
import { CreateBorrowingForm } from "./CreateBorrowingForm";
import { OverdueBooksList } from "./OverdueBooksList";

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

  const getTabContent = () => {
    switch (activeTab) {
      case "all":
        return (
          <BorrowingsList key={`all-${refreshTrigger}`} showStats={canManage} />
        );
      case "active":
        return (
          <BorrowingsList key={`active-${refreshTrigger}`} activeOnly={true} />
        );
      case "create":
        return (
          <CreateBorrowingForm onBorrowingCreated={handleBorrowingCreated} />
        );
      case "overdue":
        return <OverdueBooksList key={`overdue-${refreshTrigger}`} />;
      case "stats":
        return (
          <BorrowingsList key={`stats-${refreshTrigger}`} showStats={true} />
        );
      default:
        return null;
    }
  };

  return (
    <div className="borrowings-dashboard">
      {/* Navigation tabs */}
      <div className="mb-4">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "all" ? "active" : ""}`}
              onClick={() => setActiveTab("all")}
            >
              {isMember ? "Mes emprunts" : "Tous les emprunts"}
            </button>
          </li>

          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "active" ? "active" : ""}`}
              onClick={() => setActiveTab("active")}
            >
              Emprunts actifs
            </button>
          </li>

          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "create" ? "active" : ""}`}
              onClick={() => setActiveTab("create")}
            >
              Nouvel emprunt
            </button>
          </li>

          {canManage && (
            <>
              <li className="nav-item">
                <button
                  className={`nav-link ${
                    activeTab === "overdue" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("overdue")}
                >
                  <span className="text-danger">
                    <i className="fas fa-exclamation-triangle"></i>
                    Retards
                  </span>
                </button>
              </li>

              <li className="nav-item">
                <button
                  className={`nav-link ${
                    activeTab === "stats" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("stats")}
                >
                  Statistiques
                </button>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Tab content */}
      <div className="tab-content">{getTabContent()}</div>

      {/* Quick actions pour les administrateurs */}
      {canManage && (
        <div className="mt-4 p-3 bg-light rounded">
          <h5>Actions rapides</h5>
          <div className="btn-group" role="group">
            <button
              className="btn btn-outline-primary btn-sm"
              onClick={() => setActiveTab("create")}
            >
              <i className="fas fa-plus"></i>
              Nouvel emprunt
            </button>

            <button
              className="btn btn-outline-warning btn-sm"
              onClick={() => setActiveTab("overdue")}
            >
              <i className="fas fa-exclamation-triangle"></i>
              Voir les retards
            </button>

            <button
              className="btn btn-outline-info btn-sm"
              onClick={() => setActiveTab("stats")}
            >
              <i className="fas fa-chart-bar"></i>
              Statistiques
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

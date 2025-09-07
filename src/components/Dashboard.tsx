import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { BooksList } from "./BooksList";
import { AddBookForm } from "./AddBookForm";
import type { Book } from "../types/book.type";

type ActiveTab = "welcome" | "catalog" | "add-book" | "borrowings";

export const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<ActiveTab>("welcome");
  const [refreshBooks, setRefreshBooks] = useState(0);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  };

  const handleBookAdded = (_book: Book) => {
    setRefreshBooks((prev) => prev + 1);
    setActiveTab("catalog");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "catalog":
        return (
          <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2>Catalogue des livres</h2>
              {user?.role === "admin" && (
                <button
                  className="btn btn-primary"
                  onClick={() => setActiveTab("add-book")}
                >
                  <i className="fa fa-plus me-2"></i>
                  Ajouter un livre
                </button>
              )}
            </div>
            <BooksList
              key={refreshBooks}
              showActions={user?.role === "admin"}
            />
          </div>
        );

      case "add-book":
        return (
          <div>
            <AddBookForm
              onBookAdded={handleBookAdded}
              onCancel={() => setActiveTab("catalog")}
            />
          </div>
        );

      case "borrowings":
        return (
          <div>
            <h2>Mes emprunts</h2>
            <div className="alert alert-info">
              <i className="fa fa-info-circle me-2"></i>
              Fonctionnalité en cours de développement
            </div>
          </div>
        );

      default:
        return (
          <div className="dashboard-welcome">
            <div className="text-center">
              <h2 className="dashboard-title">
                Bienvenue dans votre bibliothèque
              </h2>
              <p className="dashboard-subtitle">
                Vous êtes connecté en tant que {user?.name} ({user?.email})
              </p>

              <div className="dashboard-grid">
                <div
                  className="dashboard-card cursor-pointer"
                  onClick={() => setActiveTab("borrowings")}
                >
                  <h3 className="dashboard-card-title">
                    <i className="fa fa-book me-2"></i>
                    Mes emprunts
                  </h3>
                  <p className="dashboard-card-description">
                    Consultez vos livres empruntés
                  </p>
                </div>

                <div
                  className="dashboard-card cursor-pointer"
                  onClick={() => setActiveTab("catalog")}
                >
                  <h3 className="dashboard-card-title">
                    <i className="fa fa-library me-2"></i>
                    Catalogue
                  </h3>
                  <p className="dashboard-card-description">
                    Parcourez la collection de livres
                  </p>
                </div>

                {user?.role === "admin" && (
                  <div
                    className="dashboard-card cursor-pointer"
                    onClick={() => setActiveTab("add-book")}
                  >
                    <h3 className="dashboard-card-title">
                      <i className="fa fa-plus me-2"></i>
                      Ajouter un livre
                    </h3>
                    <p className="dashboard-card-description">
                      Ajouter de nouveaux livres au catalogue
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="dashboard">
      <nav className="dashboard-nav">
        <div className="container">
          <div className="navbar">
            <div>
              <h1 className="navbar-brand">Bibliothèque - Tableau de bord</h1>
            </div>
            <div className="navbar-nav">
              <span className="nav-link">
                Bonjour, <strong>{user?.name}</strong>
              </span>
              <span
                className="btn btn-secondary"
                style={{ fontSize: "0.75rem", padding: "0.25rem 0.5rem" }}
              >
                {user?.role === "admin" ? "Administrateur" : "Utilisateur"}
              </span>
              <button onClick={handleLogout} className="btn btn-danger">
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Navigation tabs */}
      <div className="container mt-3">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "welcome" ? "active" : ""}`}
              onClick={() => setActiveTab("welcome")}
            >
              <i className="fa fa-home me-1"></i>
              Accueil
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "catalog" ? "active" : ""}`}
              onClick={() => setActiveTab("catalog")}
            >
              <i className="fa fa-library me-1"></i>
              Catalogue
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${
                activeTab === "borrowings" ? "active" : ""
              }`}
              onClick={() => setActiveTab("borrowings")}
            >
              <i className="fa fa-book me-1"></i>
              Mes emprunts
            </button>
          </li>
          {user?.role === "admin" && (
            <li className="nav-item">
              <button
                className={`nav-link ${
                  activeTab === "add-book" ? "active" : ""
                }`}
                onClick={() => setActiveTab("add-book")}
              >
                <i className="fa fa-plus me-1"></i>
                Ajouter un livre
              </button>
            </li>
          )}
        </ul>
      </div>

      <main className="container dashboard-content mt-4">
        {renderContent()}
      </main>
    </div>
  );
};

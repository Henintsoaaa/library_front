import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
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

      <main className="container dashboard-content">
        <div className="dashboard-welcome">
          <div className="text-center">
            <h2 className="dashboard-title">
              Bienvenue dans votre bibliothèque
            </h2>
            <p className="dashboard-subtitle">
              Vous êtes connecté en tant que {user?.name} ({user?.email})
            </p>

            <div className="dashboard-grid">
              <div className="dashboard-card">
                <h3 className="dashboard-card-title">Mes emprunts</h3>
                <p className="dashboard-card-description">
                  Consultez vos livres empruntés
                </p>
              </div>

              <div className="dashboard-card">
                <h3 className="dashboard-card-title">Catalogue</h3>
                <p className="dashboard-card-description">
                  Parcourez la collection de livres
                </p>
              </div>

              {user?.role === "admin" && (
                <div className="dashboard-card">
                  <h3 className="dashboard-card-title">Administration</h3>
                  <p className="dashboard-card-description">
                    Gérez les livres et les utilisateurs
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

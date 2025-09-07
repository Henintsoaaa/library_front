import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const Home: React.FC = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="dashboard">
      <nav>
        <div className="container">
          <div className="navbar">
            <div>
              <h1 className="navbar-brand">Bibliothèque</h1>
            </div>
            <div className="navbar-nav">
              <Link to="/about" className="nav-link">
                À propos
              </Link>
              {isAuthenticated ? (
                <>
                  <span className="nav-link">Bonjour, {user?.name}</span>
                  <Link to="/dashboard" className="btn btn-primary">
                    Tableau de bord
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/login" className="nav-link">
                    Connexion
                  </Link>
                  <Link to="/register" className="btn btn-primary">
                    S'inscrire
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="container">
        <div className="hero">
          <h1 className="hero-title">Bienvenue dans notre Bibliothèque</h1>
          <p className="hero-subtitle">
            Découvrez une vaste collection de livres, gérez vos emprunts et
            profitez d'une expérience de lecture enrichissante.
          </p>

          {!isAuthenticated && (
            <div className="hero-buttons">
              <Link to="/register" className="btn btn-primary">
                Créer un compte
              </Link>
              <Link to="/login" className="btn btn-secondary">
                Se connecter
              </Link>
            </div>
          )}

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📚</div>
              <h3 className="feature-title">Vaste Collection</h3>
              <p className="feature-description">
                Accédez à des milliers de livres dans tous les genres
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">⏰</div>
              <h3 className="feature-title">Gestion Simplifiée</h3>
              <p className="feature-description">
                Gérez facilement vos emprunts et réservations
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🔍</div>
              <h3 className="feature-title">Recherche Avancée</h3>
              <p className="feature-description">
                Trouvez rapidement les livres qui vous intéressent
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
